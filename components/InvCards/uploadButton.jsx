"use client"

import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FacultyFlow | LARVA",
  description: "Generated by create next app",
};

export default function RootLayout(props) {
  const hiddenFileInput = useRef(null);
  console.log("PAMPAMPAM!");
  console.log(props.id);
  console.log("PAMPAMPAM!");

  const handleChange = event => {
    console.log(props.id);
    // if (event.target.files && event.target.files[0]) {
    //   const i = event.target.files[0];

    //   const drive = async () => {        
    //     const response = await fetch('/api/drive', {
    //       method: 'POST',
    //       body: i,
    //       headers: {
    //         'Content-Type': i.type,
    //         "name": i.name,
    //         "id": props.id,
    //         "userid": props.userid,
    //         "email": props.email,
    //         "from": props.from,
    //       },
    //     });
    
    //     const res = await response.json();
    //   }
  
    //   drive();
    // }
  };

  return (
    // <form onSubmit={addEntry()}>
    <>
        <label for="file-upload" className="inline-block rounded-md ml-2 duration-250 text-xs bg-peela text-gray-700 cursor-pointer hover:bg-amber-400">
            <input id="file-upload" type="file" name="filename" className="hidden" ref={hiddenFileInput}
                  onChange={handleChange} />
            <span>Upload</span>
        </label>
    </>
    // </form>
  );
}