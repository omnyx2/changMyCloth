'use client'
import Link from "next/link"
import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import {isMobile} from 'react-device-detect';

function Spinner() {
  return (
  <div className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-4 border-blue-800"></div>
</div>)
}
async function deleteImage(){
  const url = '/api/saveImage';
  const res = await fetch(
    url,
    {
      method: "DELETE",
    }
  ); 
  console.log(res);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function sendImages(formData) {
  const url = '/api/saveImage';
  const res = await fetch(
    url,
    {
      method: "POST",
      body: formData,
    }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data.data
}
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

export default function Home() {
  const [isCaptured, setIsCaptured] = useState(false);
  const [imageId, setImageId] = useState("");
  const [loading, setLoading] = useState(true);
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    const reqID = new Date().getTime()
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
    
    const formData = new FormData();
    formData.append('image', blob);
    formData.append('id', reqID);
    const id = await sendImages(formData);
    setImageId(id); 
  }, [webcamRef]);

  useEffect(() => { 
      setTimeout(() => setLoading(false), 1_000)
  },[])


  const retakingPicture = () => {
    if(imageId === "") return alert("사진을 먼저 찍어주세요");
    deleteImage(imageId); 
    setIsCaptured("");
  }
  const handleCapture = (target) => {
    if(isMobile){
      console.log('h')
      return(
        <input
                accept="image/*" 
                id="icon-button-file"
                type="file"
                capture="environment"
                onChange={(e) => handleCapture(e.target)}
              />)
    }

      }

  return (
    <main className="relative p-0 m-0 flex w-[100vw] h-[100vh] flex-row items-center justify-between ">
      {
        loading ? 
          <Spinner />
        :
        <div className={`center-absolute rounded-lx letf-24 w-[60vw] h-auto px-[5vw] h-[100vh] ${isCaptured}-w transition-all duration-300 ease-in `}>
          <Webcam
                     screenshotFormat="image/jpeg"
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            className="w-full h-auto"
          />
        </div>
      }
      {handleCapture}
          
        <div className="absolute w-[40vw] top-[29vh] right-24">
          <img src={`/person/${imageId}.jpg`} className={`w-0 h-0 opacity-0 translate-x-[20] transition-all duration-300 ease-in ${isCaptured}`} alt="you"/>
        </div>
        <div class="absolute bottom-bar">
            <button class="button"  onClick={capture} >Take your photo</button>
            <button class="button" onClick={ () => retakingPicture()}>Re Take photo!</button>
            <button class="button" >
              <Link href={{
              pathname: "/filtering",
              query: { id: imageId}
              }}>
                I love it Next!
              </Link>
              </button>
          </div>  
  </main>
  );
}
