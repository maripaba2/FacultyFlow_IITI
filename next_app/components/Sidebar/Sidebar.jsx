


import React from 'react';
import {Poppins, Roboto} from '@next/font/google'

const roboto = Poppins({
  subsets:['latin'],
  weight:'300',
  
})

function Sidebar() {
  return (
    <div className={`sidebarall font-roboto items-center ${roboto.className}`}>
      <h1 className="text-center justify-center align-center flex" style={{fontSize:"43px", right:"-140px", position:"relative"}}><b>REMAINING TASKS</b></h1>
      <div className="shadow-md w-[32vw] h-[51vh] bg-transparent border-3 border-yellow-400 rounded-l-large rounded-medium text-gray-700 hover:bg-gray-100 m-4 flex flex-wrap">
        <div className="w-1/2 flex flex-col justify-between">
          <section className="mt-7 mb-7 mr-4 ml-7 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[21vh] hover:translate-y-[-3px] transition duration-300" style={{fontSize:"20px"}}>XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
          <section className="mb-10 mr-4 ml-7 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[20vh] hover:translate-y-[-3px] transition duration-300" style={{fontSize:"20px"}}>XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <section className="mt-7 mb-7 mr-7 ml-4 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[21vh] hover:translate-y-[-3px] transition duration-300" style={{fontSize:"20px"}}>XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
          <section className="mb-10 mr-7 ml-4 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[20vh] hover:translate-y-[-3px] transition duration-300" style={{fontSize:"20px"}}>XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section> 
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;
