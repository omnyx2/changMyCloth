'use client'
import Image from "next/image";
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { send } from "process";
import { useRouter } from 'next/navigation'
import { Suspense } from "react"

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

const makeImageList = (choosenGridCol, imageList, selectedImages, handleImageClick) => {
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
          width={600/choosenGridCol}
          height={100}
        />
      </div>
    )
  })
}

const ChooseGridColButton = ({i, gridColNum, setGridColNum}) => {
  return (
    <div className="flex flex-row rouneded-full w-10 h-10 m-1">
      <button
        onClick={() => setGridColNum(i)}
        className="button"
        style={{
            backgroundColor: gridColNum === i ? 'white' : 'black',
            color: gridColNum === i ? 'black' : 'white',
          }}
      >
        {i}
      </button>
    </div>
  )
}
const ChooseGridColTabs = ({choosenGridCol, setChoosenGridCol}) => {
  const tabs = [1,2,3,4,5,6].map((i, idx)=> <ChooseGridColButton i={i} key={i} gridColNum={choosenGridCol} setGridColNum={setChoosenGridCol}/>)
  return tabs;
}

function searchFiles(gender, season, style, files) {
  let indexString = "";
  console.log(gender, season, style)
  if(gender === 'male') indexString += '1';
  if(gender === 'female')  indexString += '2';
  if (season === 'spring') indexString += '1';
  if (season === 'summer') indexString += '2' ;
  if (season === 'fall') indexString += '3' 
  if (season === 'winter') indexString += '4'; 
  if (style === 'formal') indexString += '1';
  if (style === 'casual') indexString += '2';

  console.log("se", indexString)
  if(indexString.length < 2) return [];
  console.log(files.filter(file => file.substr(0,3).includes(indexString)))
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
  const [choosenGridCol, setChoosenGridCol] = useState(5);
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
  useEffect(()=>{
    console.log(choosenGridCol)
  },[choosenGridCol])
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
      router.push(`/result?id=${id}`)
    }).catch((err) => {
      setWaiting(false);
      console.log(err)
      alert("Now it's dummmy mode for test! Check when demo is opened!");
      router.push(`/result?id=${id}`)

    })
  }
  return (
     <main className="flex min-h-screen w-full flex-row bg-black items-center justify-between p-0">
      <div className="w-full h-[100vh] m-0 flex items-center flex-col">
        <div className="sticky bg-black top-0 h-[25%] w-full h-auto justify-center items-center flex flex-col p-20">
        <div className="absolute w-34 h-34  top-0 left-4 p-16">
            <button class="rounded-full m-0 p-0 w-full h-full font-extralight font-bangers font-extrathin text-[3rem] text-white flex justify-center items-center" >
            <Link href={`/filtering?id=${id}`} className="w-full z-10 h-full">
                      X
                      </Link>
            </button>
          </div>
          <div className="text-white font-mono ">
            You can choose Table Column to check easire your style!
          </div>
          <div className="text-white font-mono mb-10">
          Where all NEW FW In ourstore with AI !
          </div>
          <div className="animate-blur justify-center flex flex-row mb-4">
          <ChooseGridColTabs choosenGridCol={choosenGridCol} setChoosenGridCol={setChoosenGridCol}/>
          </div>  
          <div className="animate-blur font-mono text-xl w-[20rem] font-bold rounded-full h-10 flex items-center justify-center  bg-orange-500 opacity-80 text-black m-10"
                onClick={handleRequetClothStyle}>
                Make me with New FW!
           </div>
        </div>

      {
        waiting ? 
        <div>loading...</div> : 
        (
          <div className={`mt-[10em] grid grap border-solid transition-all bg-black duration-300 ease-in-out`}
            style={{
              gridTemplateColumns:`repeat( ${choosenGridCol}, 1fr)`
            }}
            >
            { 
              makeImageList(choosenGridCol,imageList,choosenImageList, handleImageClick)
            }
          </div>
        )
      } 
       
        </div>
  </main>
   );

}
