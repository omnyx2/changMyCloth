'use client'
import {useState, useEffect} from 'react';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import Link from "next/link"
import { Suspense } from "react"


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
    });
    
  },[id])
  return (
 
    <main className="flex min-h-screen grid grid-cols-2 items-center justify-between p-24">
      {/* <Image src="/public/" alt="logo" width={100} height={100} /> */}
      {imageList.map((image, index) => {
        return (
          <div key={index} className="image-container">
            <img
              src={"/results/" + id + '/' + image}
              alt="image"
              className="w-full"
            />
          </div>
        )
      })}
    </main>
   );
}
