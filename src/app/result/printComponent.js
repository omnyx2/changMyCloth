'use client'
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const PrintWrapper = ({ children }) => {
    const componentRef = useRef();

    return (
      <div className='text-white w-full h-full '>
        <div className="relative w-0 h-0">
        <ReactToPrint
          trigger={() => <button className='w-40 h-10 translate-y-[-200%] translate-x-[60vw] bg-white text-black font-extrabold font-countach rounded-full'>PrintOut!</button>}
          content={() => componentRef.current}
        />
        </div>
        
        <div className='w-full h-full mt-20 bg-white' ref={componentRef}>
          {children}
        </div>
      </div>
    );
  };
  

export default PrintWrapper;