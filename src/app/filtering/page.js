'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link"

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
            backgroundColor: curElem === item ? 'purple' : 'white',
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
  const weatherList = ["spring", "summer", "fall", "winter"];
  const genderList = ["female","male"];
  const clothStyleList = ["casual", "formal"];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={{
        pathname: '/choosing',
        query: { weather, gender, clothStyle}
        }}>
        <div className=" p-24">
          선택완료
        </div>
      </Link>
      <div className="flex flex-row">
       { tabs (genderList, gender, setGender)} 
      </div>
      <div className="flex flex-row">
       { tabs (weatherList, weather, setWeather)} 
      </div>
      <div className="flex flex-row">
       { tabs (clothStyleList, clothStyle, setClothStyle)} 
      </div> 
  </main>
  );
}
