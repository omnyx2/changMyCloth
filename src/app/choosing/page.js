'use client'
import Image from "next/image";
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { send } from "process";
import { useRouter } from 'next/navigation'

import React, { useRef, useCallback, useEffect, useState } from 'react';
 async function getImageList() {
  const url = '/api/getImageList';
  const res = await fetch(
    url,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
const sendImagesList = async (list) => { 
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({imageList: list}),
  };
  const res = await fetch('/api/requestClothStyles', options);
  console.log(options)
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  console.log(res)
  return res.json();
}

const makeImageList = (imageList, selectedImages, handleImageClick) => {
  if (!imageList) {
    return <div>loading...</div>
  }
  return imageList.map((image, index) => {
    return (
      <div 
      key={index}
      className={`image-container ${selectedImages.includes(image) ? 'selected' : ''}`}
      onClick={() => handleImageClick(image)} 
      >
        <Image
          src={"/presets/" + image}
          alt="image"
          width={100}
          height={100}
        />
      </div>
    )
  })
}

function searchFiles(gender, season, style, files) {
  let indexString = "";
  console.log(gender, season, style)
  if(gender === 'male') indexString += '1';
  if(gender === 'female')  indexString += '2';
  if (season === 'spring') indexString += '1';
  if (season === 'summer') indexString += '2' ;
  if (season === 'fall') indexString += '3' 
  if (season === 'winder') indexString += '4'; 
  if (season === 'fall') indexString += '3' 
  if (season === 'winder') indexString += '4'; 
  if (style === 'formal') indexString += '1';
  if (style === 'casual') indexString += '2';

  console.log("se", indexString)
  if(indexString.length < 2) return [];
   return files.filter(file => file.substr(0,3).includes(indexString));
}

export default function Home() {
  const [imageList, setImageList] = useState([]);
  const [choosenImageList, setChoosenImageList] = useState([]);
  const [weather, setWeather] = useState(-1); // ["spring", "summer", "fall", "winter"]
  const [gender, setGender] = useState(-1); // ["spring", "summer", "fall", "winter"]
  const [clothStyle, setClothStyle] = useState(-1);
  const [waiting, setWaiting] = useState(false);
  const params = useSearchParams();
  const router = useRouter()

  useEffect(() => {
    setWeather(params.get('weather'))
    setGender(params.get('gender'))
    setClothStyle(params.get('clothStyle'))
  }, []);

  useEffect(() => {
    getImageList().then((data) => {
      setImageList(searchFiles(gender, weather,clothStyle, data.imageList));
    });
  },[clothStyle])
  useEffect(() => {
   
  }, [waiting]);

  const handleImageClick = (image) => {
    if(choosenImageList.length > 3) {
      // alert("5개 이상 선택할 수 없습니다.")
      return;
    }
    else if (choosenImageList.includes(image)) {
      // Remove image from selectedImages if already selected
      setChoosenImageList(choosenImageList.filter(img => img !== image));
    } else {
      // Add image to selectedImages
      setChoosenImageList([...choosenImageList, image]);
    }
  };
  const handleRequetClothStyle = async () => {
    setWaiting(true);
    sendImagesList(choosenImageList).then((data) => {
      if(data) {
        router.push({
          pathname: '/result',
          query: { requestId: data.requestId }
        })
      }
    }).catch((err) => {
      setWaiting(false);
      console.log(err)
      alert("요청 실패");
    })
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        waiting ? 
        <div>loading...</div> : 
        (
          <div>
            <div className="p-10" onClick={() => handleRequetClothStyle()}>
            <p>
              원하는 코디 골라보기
              </p>
              <p>
                최대 4개
              </p>
          </div>
          <div className="w-100vw grid grid-cols-5">
            { 
              makeImageList(imageList,choosenImageList, handleImageClick)
            }
          </div>
          </div>
        )
      }
      
  </main>
  );
}
