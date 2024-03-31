import React from 'react';
import { Poppins } from '@next/font/google';

const roboto = Poppins({
  subsets:['latin'],
  weight:'300',
});

function Sidebar({ sidebartitle, customForm }) {
  return (
    <div className={`flex-col mt-9 sidebarall font-roboto items-center justify-center text-center ${roboto.className}`}>
      <h1 className="text-center justify-center align-center flex" style={{ fontSize: "2rem", right: "-5vw", position: "relative" }}><b>{sidebartitle}</b></h1>
      <div className="shadow-md w-[32vw] h-[51vh] bg-transparent border-3 border-yellow-400 rounded-l-large rounded-medium text-gray-700 hover:bg-gray-100 m-4 flex flex-wrap">
        <div className="w-1/2 flex flex-col justify-between">
          <section className="mt-7 mb-7 mr-4 ml-7 rounded-large hover:bg-yellow-400 text-center pt-2 bg-gradient-to-b from-yellow-300 to-yellow-100 hover:from-yellow-400 hover:to-yellow-200 h-[21vh] hover:translate-y-[-3px] transition duration-300" style={{ fontSize: "1rem" }}>XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
          <section className="mb-10 mr-4 ml-7 rounded-large hover:bg-yellow-400 text-center pt-2 bg-gradient-to-b from-yellow-300 to-yellow-100 hover:from-yellow-400 hover:to-yellow-200 h-[20vh] hover:translate-y-[-3px] transition duration-300" style={{ fontSize: "1rem" }}>XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <section className="mt-7 mb-7 mr-7 ml-4 rounded-large hover:bg-yellow-400 text-center pt-2 bg-gradient-to-b from-yellow-300 to-yellow-100 hover:from-yellow-400 hover:to-yellow-200 h-[21vh] hover:translate-y-[-3px] transition duration-300" style={{ fontSize: "1rem" }}>XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
          <section className="mb-10 mr-7 ml-4 rounded-large hover:bg-yellow-400 flex-col text-center pt-2 bg-gradient-to-b from-yellow-300 to-yellow-100 hover:from-yellow-400 hover:to-yellow-200 h-[20vh] hover:translate-y-[-3px] transition duration-300" style={{ fontSize: "1rem" }}>{customForm}</section> 
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
