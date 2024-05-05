"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Form from "@components/Form";

const UploadPrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const from = searchParams.get("from");
  const title = searchParams.get("title");
  const hiddenFileInput = useRef(null);
  const [load, setLoad] = useState(false);
  const [lg, setLg] = useState(false);
  const [tick, setTick] = useState(false);  
  const [ae, setAe] = useState(false);
 
  const handleChange = event => {
    setLg(false);
    setAe(false);
    setLoad(true);

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      const drive = async () => {        
        const uid = await session?.userid;
        const email = await session?.user.email;
        const response = await fetch('/api/drive', {
          method: 'POST',
          body: i,
          headers: {
            'Content-Type': i.type,
            "name": i.name,
            "id": id,
            "userid": uid,
            "email": email,
            "from": from,
          },
        });
    
        const res = await response.json();
        if(res.error === "File too large."){
          setLg(true)
          setTick(false);
        }
        else if(res.error){
          setAe(true);
          setTick(false);
        }
        if(res.message){
          setTick(true);
          setLg(false);
          setAe(false);
        }
        setLoad(false);
      }
  
      drive();
    }
  };

  // useEffect(()=>{getPromptDetails();}, [inventoriesId]);

  return (
    <div>
      <span className="text-4xl font-bold text-center block mb-4 mt-10">{title}</span>
      <label for="file-upload" className="flex items-center justify-center rounded-md mt-[10vh] w-[30vw] h-[25vh] duration-250 text-2xl bg-peela text-white cursor-pointer hover:bg-amber-400">
          <input id="file-upload" type="file" name="filename" className="hidden" ref={hiddenFileInput} onChange={handleChange} />
          <span>Upload</span>
      </label>
      {load && <div className="flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>}
      {lg && <span className="text-2xl text-red-500 font-bold text-center block mb-4 mt-4">File too large!</span>}
      {!lg && ae && <span className="text-2xl text-red-500 font-bold text-center block mb-4 mt-4">An unexpected error occurred.</span>}
      {tick && <span className="text-2xl text-green-500 font-bold text-center block mb-4 mt-4">File uploaded successfully!</span>}
    </div>

    

  );
};

export default UploadPrompt;