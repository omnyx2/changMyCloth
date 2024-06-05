'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link  from "next/link"
import { useSearchParams } from "next/navigation";
import fileNameIndex from "./fileNameLogic";
 const Wave = ({children}) => {
  return (
    <div className="w-full min-h-screen px-6 pt-5 pb-3 text-blue-400 flex flex-col bg-black">
      <div className="block w-full h-[25%]">
      <div className="relative t-0 w-full h-[25%]">
        <div className="absoulte text-xl font-tilda-petite w-full h-[1em] t-0 text-center pb-0 font-bold">
          REVOLUTIONIZE REVOLUTIONIZE REVOLUTIONIZE REVOLUTIONIZE REVOLUTIONIZE REVOLUTIONIZE
        </div>
        <div className="absoulte mt-0 pt-0 pb-0 mb-0 tracking-tight p-0 t-0 font-paralines translate-y-[-2rem] letter-2 text-[12rem]  text-center">
          FASHAI
        </div>
        <div className=" absoulte text-xl font-tilda-petite w-full h-auto t-80 text-center translate-y-[-2rem] p-0 font-bold">
           YOUR STYLE YOUR STYLE YOUR STYLE YOUR STYLE YOUR STYLE YOUR STYLE YOUR STYLE YOUR   
        </div>
      </div>
      </div>
      <div className="pb-8"></div>
      <div className="relative background-image-pure h-full">
        {children}
      </div>
    </div>
  )
}


<button
onClick={() => retakingPicture()}>Re Capture!</button>
const tabs = (list, curElem, handleOnClick) => {
  
  return list.map((item, index) => {
    return (
      <div
          class="button z-[100] font-tilda-petite bg-white text-black text-xl font-bold rounded-full w-24 h-10 flex flex-col items-center justify-center"  
          key={index}
          onClick={() => handleOnClick(item)}
          style={{
            insetShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '2px',
            margin: '6px',
            cursor: 'pointer',
            backgroundColor: curElem === item ? '#60A5FA' : 'white',
            color: curElem === item ? 'white' : 'black',
            zIndex: 1,
            opacity:  curElem === item ? 0.8 : 0.7,
          }}
        >
     {item}
      </div>
    );
  });
}

const ImageRecommandationIllution = (initImgIdx) => {
  return(
    <>
      <img src={`/presets/${initImgIdx}01.jpg`} className="absolute w-[40vw] animate-blinkUP top-16 translate-x-[calc(4vw)] " alt="logo"/>
      <img src={`/presets/${initImgIdx}02.jpg`} className="absolute w-[40vw] animate-blinkDOWN top-16 translate-x-[calc(4vw)] " alt="logo"/>
    </>
  )
}

export default function Home() {
  const [weather, setWeather] = useState("spring"); // ["spring", "summer", "fall", "winter"
  const [gender, setGender] = useState("female"); // ["spring", "summer", "fall", "winter"
  const [clothStyle, setClothStyle] = useState("casual");
  const [initImgIdx, setInitImgIdx] = useState("221");
  const [id, setId] = useState("");
  const params = useSearchParams();

  const weatherList = ["spring", "summer", "fall", "winter"];
  const genderList = ["female","male"];
  const clothStyleList = ["casual", "formal"];
  useEffect(()=>{
    setId(params.get('id'))
  }, [])
  useEffect(()=>{
    setInitImgIdx(fileNameIndex(gender,weather,clothStyle))
    console.log(initImgIdx)
  },
  [gender, weather, clothStyle])
  return (
     <main className="flex pt-20 min-h-screen justify-center items-center">
    <Wave>
      {
        ImageRecommandationIllution(initImgIdx)
      }
      <div className="block w-full h-[55vh] flex-col font-countach items-center justify-center">
        <div className="absolute w-[40vw] top-16 translate-x-[calc(50vw)] font-extrabold font-sans text-white text-[2rem] z-100">
          Choose Options for Recommandation, Please!
          <p className="text-lg pt-4">
            3/4 step
          </p>
          <p className="text-lg font-normal">
            By, Choosing the option AI will take recommand cloth-sets in this store only for you.
          </p>

        </div>
        <div className="absolute top-80 translate-x-[calc(50vw)]">
          <div className="flex h-full flex-col items-center ">
            <div className="flex flex-row translate-x-[-4em] ">
            { tabs (genderList, gender, setGender)} 
            </div>
            <div className="flex flex-row my-4">
            { tabs (weatherList, weather, setWeather)} 
            </div>
            <div className="flex flex-row  translate-x-[4em] ">
            { tabs (clothStyleList, clothStyle, setClothStyle)} 
            </div> 
          </div>
        </div>
        

  
        <Link
          className="absolute bottom-16 translate-x-[calc(50vw)]" 
          href={{
          pathname: '/choosing',
          query: { weather, gender, clothStyle, id}
          }}>
          <div 
            className="button  w-[40vw] z-[100] font-tilda-petite bg-black text-white text-xl font-bold rounded-full w-24 h-10 flex flex-col items-center justify-center"  
          >
            Done
          </div>
        </Link>
        </div>
      </Wave>
      
  </main>
   );
}
