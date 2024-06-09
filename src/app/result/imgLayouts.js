'use clinent'
import React, { useRef } from 'react';
import useResizeObserver from './hooks';
import Image from 'next/image';


// const imageList = [
//     'person/1717568942502.jpg',
//     'presets/11101.jpg',
//     'https://images.unsplash.com/photo-1612838320302-3b3b3b3b3b3b',
//     'https://images.unsplash.com/photo-1612838320302-3b3b3b3b3b3b',
//     'https://images.unsplash.com/photo-1612838320302-3b3b3b3b3b3b',
// ]

const ImageWithTextBorders = ({ src, alt, textTop, textRight, textBottom, textLeft }) => {
    const containerRef = useRef(null);
    const { width, height } = useResizeObserver(containerRef);
    const isWide = width > height;
    return (
      <div className="relative w-full h-full text-[0.8rem] font-bold text-black">
        <Image src={"/"+src} alt={alt} fill={true} style={{
            objectFit: 'cover', // cover, contain, none
          }} />
        <span className="absolute w-full top-0 left-0 text-center translate-y-[-1.8em] bg-transparent px-1">{textTop} </span>
        <span className={`absolute  right-0 bottom-0 translate-x-[1em] origin-right bg-transparent px-1 rotate-90`}>{textRight}  </span>
        <span className="absolute w-full bottom-0 left-0 text-center  translate-y-7 bg-transparent px-1">{textBottom}</span>
        <span className={`absolute left-0 bottom-0 translate-x-[-1.2em] bg-transparent origin-left  px-1 rotate-[270deg]`}>{textLeft}</span>
      </div>
    );
};
const ImageBox = ({ src, alt, deco }) => {
    const containerRef = useRef(null);
    const { width, height } = useResizeObserver(containerRef);
    const isWide = width > height;
    return (
        <div className={`relative top-0 left-0  w-full h-full bg-black ${isWide ? 'w-full h-auto' : 'w-auto h-full'} `}>
            <div  className={`relative inset-0 w-full h-full object-cover top-0 left-0`}>
                <ImageWithTextBorders src={src} alt={alt} textTop={deco.top} textRight={deco.right} textBottom={deco.bottom} textLeft={deco.left} />
            </div>
      </div>
    );
  };

export default function Home({imageList}) {
    const containerRef = useRef(null);
    const { width, height } = useResizeObserver(containerRef);
    const isWide = width > height;
    const deco1= {
        top: 'Wear AI Fashion',
        right: '',
        bottom: '',
        left: 'Photos ►',
    }
    const deco2 = {
        top: 'Easy to wear on cloth',
        right: 'Photos ►',
        bottom: '',
        left: '',
    }
    const deco3 = {
        top: '',
        right: '',
        bottom: 'FASHAI<Data Engineering>',
        left: 'Left ►        Tomorrow your style will be awesome!',
    }
    const deco4 = {
        top: ' ',
        right: 'Right ►   Tomorrow your style will be prefect!',
        bottom: Date().toLocaleString().slice(0, 16),
        left: ' ',
    }
    return (
    <div className={`relative w-full h-full` }>
        <div className={`relative w-full h-full grid grid-cols-2 gap-4 p-8 grid-flow-cols grid-rows-2 justify-center items-center bg-white`}>
            <ImageBox src={imageList[0]} alt="Sample Image" deco={deco1} />
            <ImageBox src={imageList[1]} alt="Sample Image" deco={deco2} />
            <ImageBox src={imageList[2]} alt="Sample Image" deco={deco3} />
            <ImageBox src={imageList[3]} alt="Sample Image" deco={deco4} />  
        </div>
    </div>
    );
}
function layoutOne() {
  return (
    <div className="layoutOne">
        <div>

        </div>
    </div>
  )
}

// function layoutListOne(imageList) {
//     return imageList.map((image, index) => {
//         return layoutHandler(imageList)
//     })
// }

// function layoutHandler(imageList) {
//     if(imageList.length === 1) {
//         return layouts()['1']
//     }
//     if(imageList.length === 1) {
//         return layouts()['1']
//     }
//     if(imageList.length === 1) {
//         return layouts()['1']
//     }
// }

function layouts() {
  return {
    '1': layoutOne,
    '2': layoutOne,
    '3': layoutOne,
    '4': layoutOne,
  }
}