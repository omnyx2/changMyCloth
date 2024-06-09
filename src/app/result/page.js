'use client'
import {useState, useEffect} from 'react';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import Link from "next/link"
import { Suspense } from "react"
import ImageLayouts from "./imgLayouts";
import PrintWrapper from './printComponent';
const getResultImagesList = async (id) => { 
  const options = {
    method: 'GET',
  };
  const res = await fetch(`/api/getResultImageList/?id=${id}`, options);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default function Home() {
  const [id, setId] = useState("")
  const [imageList, setImageList] = useState([]);
  
  const params = useSearchParams();
  useEffect(()=>{
    setId(params.get('id'))
  }, [])

  useEffect(() => {
    if(id === "") return;
    getResultImagesList(id).then((data) => {
      setImageList([...data.imageList]);
    }).catch((err) => {
      //dummy
      setImageList([
        'test_result/1.jpg',
        'test_result/2.jpg',
        'test_result/3.jpg',
        'test_result/4.jpg',
      ])
      console.log("failed to image load dummy on", err);
    })
  },[id])
  return (
 
    <main className="flex flex-col w-[100vw] min-h-screen items-center justify-center  p-20  bg-black">
      {
        imageList.length === 0 ? (
          <div className="absolute w-[calc(100vw-5em]] h-[100vh] flex items-center justify-center  opacity-100 bg-black">
            <div className="text-white text-2xl animate-pulse">
              On Loading...
            </div>
          </div>
        )
        :<>
        <img src="background.jpg" className="absolute w-[100vw] bottom-0 h-[100vw] grayscale bg-gradient-to-t object-cover-fit opacity-50 animate-comeUp" alt="background"/>
        <div className="block w-full h-20 flex-col font-countach items-center justify-center">
            <div className="absolute w-[calc(100vw-5rem]] top-4 translate-x-[calc(8vw)] font-extrabold font-sans text-orange-500 text-[2rem] z-100">
              Choose Options for Recommandation, Please!
              <p className="text-lg pt-2">
                4/4 step
              </p>
              <p className="text-lg font-normal">
                Thanks! Please enjoy your style with FashAI!
            </p>
            </div>
        </div>
        {/* A4를 안에 넣는 것이므로 종이의 세로가 더길어 h가 기준이 되어야한다. */}
        <div className="bg-transparent a4-ratio-75vh">
          <PrintWrapper>
            <div className="pt-0 a4-ratio-75vh">
                <div className="p-4 border-4 w-full h-full border-orange-500 bg-black animate-fadeIn">
                  <ImageLayouts imageList={imageList}/>
                </div>
            </div>
          </PrintWrapper>
        </div>

        </>

      }
        
   
    </main>
   );
}
