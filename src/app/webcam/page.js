'use client'
import Link from "next/link"
import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import {isMobile} from 'react-device-detect';
import PrettyBackground from "./PrettyBackground";
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
    <main className="relative p-0 m-0 flex w-[100vw] h-[100vh]   bg-black">
      <div className="absolute h-0 w-full font-paralines text-[10rem]  text-violet-300 opacity-[0.7] text-center translate-y-[18rem]">
          PHOTOTIME
      </div>
      <div className="absolute left-0 top-0 translate-x-[20vw] translate-y-[10vh] w-[60vw] h-auto">
        <PrettyBackground/>
      </div>

      {
        loading ? 
          <Spinner />
        :
        <div className={`center-absolute rounded-lx  w-full h-auto px-[5vw] transition-all duration-300 ease-in `}>
          <div className="block flex flex-cols w-[100%] items-end translate-y-40">
            {
              isCaptured === "picture-taken" ?
              <img src={`/person/${imageId}.jpg`} className={`w-[40%] h-auto transition-all duration-300 ease-in animate-marginDown`} alt="you"/>
              :
              <Webcam
              screenshotFormat="image/jpeg"
              audio={false}
              ref={webcamRef}
              videoConstraints={videoConstraints}
              className="w-[40%] h-auto  animate-marginUp transition-all duration-300 ease-in"
            />

            }
             <div className="p-10 text-white"></div>
              <div className="w-[90%] p-4">
                <div className="font-extrabold  font-sans text-white text-[2rem]">
                  Take your Great Photo!
                </div>
                <div className="font-bold my-4 indent-2 font-sans text-white text-[1rem]">
                  For Change your cloth with AI We needs to take your One face photo
                </div>
              <div className="w-full">            
              {
                isCaptured !== "picture-taken" ? 
                  <div className="my-16 flex flex-col justify-end items-end">
                  <button 
                    class="button z-[100] bg-white text-black text-xl font-bold rounded-full w-36 h-12 flex flex-col items-center justify-center"  
                    onClick={capture}>Capture!</button>
                  </div>
                :
                <div className="my-16 w-full flex flex-row justify-between items-end">
                        <button
                    class="button z-[100] bg-white text-black text-xl font-bold rounded-full w-36 h-12 flex flex-col items-center justify-center"  
                    onClick={() => retakingPicture()}>Re Capture!</button>
                    <button class="button z-[100] bg-violet-300 text-black text-xl font-bold rounded-full w-36 h-12 flex flex-col items-center justify-center" >
                        <Link href={{
                        pathname: "/filtering",
                        query: { id: imageId}
                        }}>
                          Conform!
                        </Link>
                    </button>
                </div>
              }
            </div>
          </div>
          </div>
          <div className="absolute w-[40vw] top-[29vh] right-24">
         </div>
        </div>

      }   
  </main>
  );
}
