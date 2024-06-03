'use client'
import Link from "next/link"
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

async function sendImages(formData) {
  const url = '/api/saveImage';
  const res = await fetch(
    url,
    {
      method: "POST",
      body: formData,
    }
  );
  console.log(res);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function Home() {
  const [isCaptured, setIsCaptured] = useState(false);
  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    setIsCaptured("picture-taken");
    const imageSrc = webcamRef.current.getScreenshot();
    const byteString = atob(imageSrc.split(',')[1]);
    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    
    const filename = `webcam-image-${Date.now()}.png`;
    const formData = new FormData();
    formData.append('image', blob);
    // formData.append('filename', filename);
    sendImages(formData); 

  }, [webcamRef]);
 
  return (
    <main className="relative p-0 m-0 flex w-[100vw] min-h-screen flex-row items-center justify-between px-[5vw] ">
      <div className={`absolute letf-24 top-[14vh] w-[80vw] px-[5vw] h-[100vh] translate-x-[20vw] ${isCaptured}-w transition-all duration-300 ease-in `}>
        <Webcam
          audio={false}
          ref={webcamRef}
        />
        <button onClick={capture}>캡처</button>
      </div>
        <div className="absolute w-[40vw] top-[29vh] right-24">
        <img src="/person/person.jpg" className={`w-0 h-0 opacity-0 translate-x-[20] transition-all duration-300 ease-in ${isCaptured}`} alt="you"/>
         <div className="w-[40vw] flex flex-row justify-between ">
          <div className={`opacity-0 transition-all duration-300 ease-in ${isCaptured}`} onClick={ () => setIsCaptured("")}>
            다시찍기: Retaking
          </div >
          <div className={`opacity-0 transition-all duration-300 ease-in ${isCaptured}`}>
            <Link href={"/filtering"}>
            확인: confirm
            </Link>
          </div>
     
        </div>
        </div>  
  </main>
  );
}
