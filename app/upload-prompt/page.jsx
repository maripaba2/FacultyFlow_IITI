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
  const hiddenFileInput = useRef(null);
 
  const handleChange = event => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      const drive = async () => {        
        const uid = await session?.userid;
        const response = await fetch('/api/drive', {
          method: 'POST',
          body: i,
          headers: {
            'Content-Type': i.type,
            "name": i.name,
            "id": id,
            "userid": uid,
            // "email": props.email,
            "from": from,
          },
        });
    
        const res = await response.json();
      }
  
      drive();
    }
  };

  // useEffect(()=>{getPromptDetails();}, [inventoriesId]);

  return (
    <label for="file-upload" className="inline-block rounded-md ml-2 duration-250 text-xs bg-peela text-gray-700 cursor-pointer hover:bg-amber-400">
            <input id="file-upload" type="file" name="filename" className="hidden" ref={hiddenFileInput}
                  onChange={handleChange} />
            <span>Upload</span>
    </label>
  );
};

export default UploadPrompt;