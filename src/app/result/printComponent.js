'use client'
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const PrintWrapper = ({ children }) => {
    const componentRef = useRef();
  
    return (
      <div className='relative w-full h-full text-white '>
        <ReactToPrint
          trigger={() => <button className='absolute w-40 h-10 right-0 top-0 translate-y-[-130%] bg-white text-black font-extrabold font-countach rounded-full'>PrintOut!</button>}
          content={() => componentRef.current}
        />
        <div  className='relative w-full h-full ' ref={componentRef}>
          {children}
        </div>
      </div>
    );
  };
  

export default PrintWrapper;