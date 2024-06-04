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
const sendImagesList = async (list, id) => { 
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({imageList: list, id: id}),
  };
  const res = await fetch('/api/requestClothStyles', options);
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
const serverURL=""
// async function getMiddleWorks(id){
//   const url = "/api/getSequenceImage?id="+id;
//   const res = await fetch(
//     url,
//     {
//       method: "GET",
//     }
//   );
//   console.log(res)
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res.json();
// }

function LoadingBeautiful({id}){

  return (
    <div>
       <div>loading...</div>
       {
          imageLoadName === "" ?
          <div>loading...</div>
          :
          <img src={"results/"+id+"/"+imageLoadName} alt="image" className="w-full"/>
       }
    </div>)
}

export default function Home() {
  const [imageList, setImageList] = useState([]);
  const [id, setId] = useState("");
  const [choosenImageList, setChoosenImageList] = useState([]);
  const [weather, setWeather] = useState(-1); // ["spring", "summer", "fall", "winter"]
  const [gender, setGender] = useState(-1); // ["spring", "summer", "fall", "winter"]
  const [clothStyle, setClothStyle] = useState(-1);
  const [waiting, setWaiting] = useState(false);
  const params = useSearchParams();
  const router = useRouter()

  useEffect(() => {
    setId(params.get('id'))
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
      alert("5개 이상 선택할 수 없습니다.")
      return ;
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
    sendImagesList(choosenImageList, id).then((data) => {
      console.log(data)
      if(data.data === 'done') {
        router.push(`/result?id=${id}`)
      }
    }).catch((err) => {
      setWaiting(false);
      console.log(err)
      alert("요청 실패");
    })
  }
  return (
    <main className="flex z-10 min-h-screen flex-col items-center justify-between p-24">
      {
        waiting ? 
        <div>loading...</div> : 
        (
          <div className="w-100vw z-10 mt-80 grid grid-cols-5 grap border-solid border-red-600 border-4	">
            { 
              makeImageList(imageList,choosenImageList, handleImageClick)
            }
          </div>
        )
      }
        <div class="bottom-bar ">
            <button class="button p-0" >
              <Link href={`/filtering?id=${id}`}>
                GoTo back page
              </Link>
            </button>
            <button class="button p-0"> 가장 입어보고 싶은 패션을 골라주세요!</button>
              <button class="button p-0" >
 
                <div className="animate-spin"
                onClick={handleRequetClothStyle}
                style={{
                  borderRadius: '5px',
                  fontSize: '1em',
                  justifyContent: "center",                
                  margin: '5px',
                  cursor: 'pointer',
                  backgroundColor:  'rgb(222 155 114)',
                  color: 'white' 
                }}>
                  Neeeeeeeexxxxxttttt!
                </div>
        
              </button>
          </div>
  </main>
  );
}
