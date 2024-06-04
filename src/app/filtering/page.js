'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link  from "next/link"
import { useSearchParams } from "next/navigation";

const tabs = (list, curElem, handleOnClick) => {
  
  return list.map((item, index) => {
    return (
      <div
          key={index}
          onClick={() => handleOnClick(item)}
          style={{
            borderRadius: '5px',
            fontSize: '1.5em',
            justifyContent: "center",
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            margin: '5px',
            cursor: 'pointer',
            backgroundColor: curElem === item ? 'rgb(222 155 114)' : 'white',
            color: curElem === item ? 'white' : 'black'
          }}
        >
        <p className="text-2xl font-serif">{item}</p>
      </div>
      
    );
  });
}



export default function Home() {
  const [weather, setWeather] = useState(-1); // ["spring", "summer", "fall", "winter"
  const [gender, setGender] = useState(-1); // ["spring", "summer", "fall", "winter"
  const [clothStyle, setClothStyle] = useState(-1);  
  const [id, setId] = useState("");
  const params = useSearchParams();

  const weatherList = ["spring", "summer", "fall", "winter"];
  const genderList = ["female","male"];
  const clothStyleList = ["casual", "formal"];
  useEffect(()=>{
    setId(params.get('id'))
  }, [])
  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="flex h-full flex-col items-center ">
  
        <div className="flex flex-row ">
        { tabs (genderList, gender, setGender)} 
        </div>
        <div className="flex flex-row">
        { tabs (weatherList, weather, setWeather)} 
        </div>
        <div className="flex flex-row">
        { tabs (clothStyleList, clothStyle, setClothStyle)} 
        </div> 
      </div>
      <div class="bottom-bar">
            <button class="button" >
              <Link href="/webcam">
              GoTo back page
              </Link>
            </button>
            <button class="button"> 3/4</button>
              <button class="button" >
              <Link href={{
                pathname: '/choosing',
                query: { weather, gender, clothStyle, id}
                }}>
                <div className="animate-bounce"
                style={{
                  borderRadius: '5px',
                  fontSize: '1em',
                  justifyContent: "center",                
                  margin: '5px',
                  cursor: 'pointer',
                  backgroundColor:  'rgb(222 155 114)',
                  color: 'white' 
                }}>
                  Recommand Models Please!
                </div>
              </Link>
              </button>
          </div>
  </main>
  );
}
