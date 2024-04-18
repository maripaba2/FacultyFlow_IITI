"use client"
import { useState,useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const page = () => {
    const { data: session } = useSession();
    const [link, setLink] = useState("");
    const [linkid, setLinkid] = useState("");

    const fetchCalender = async () => {
      const response2 = await fetch("/api/callog");
      const Calender_link2 = await response2.json();
      const Calender_link = Calender_link2.filter(
        (item) => item.creator?._id === session?.user?.id
      );
  
      console.log(Calender_link);
      if(Calender_link.length!==0)setLink(Calender_link[0].Link);
      if(Calender_link.length!==0)setLinkid(Calender_link[0]._id);
    };

    const createPrompt = async (e) => {
      e.preventDefault();
      console.log(link);
      const mid = await session?.user.id;
  
      try {
        const response = await fetch("/api/callog/new", {
          method: "POST",
          body: JSON.stringify({
            link:link, 
            userId: mid,
          }),
        });
        if(response.ok){
          console.log("please");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleDelete = async (e) => {
      e.preventDefault();
      console.log(linkid);
      const mid = await session?.user.id;
      const hasConfirmed = confirm("Are you sure you want to delete this fund?");
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/callog/${linkid}`, {
            method: "DELETE",
          });
  
          setLink("");
          if(response.ok){
            console.log("ho");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    useEffect(() => {
      fetchCalender();
    });

  return (
    <div>

            <div>
              <div className="flex items-center justify-center sm:items-center sm:flex sm:justify-center mt-5">
            <input
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] text-black border border-gray-400 rounded-small px-3 py-2 mx-3 focus:outline-none focus:border-blue-500 sm:mt-[2vw]"
            type="Calender link"
            placeholder="Calender link"
            onChange={(e) => setLink(e.target.value)}
          />
          {!linkid && <button
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] bg-red-500 text-white px-4 py-2 rounded-md border border-red-600 hover:bg-red-600 duration-200 mt-[2vw] mb-[5vw]"
            onClick={(e) => {
              createPrompt(e);
            }}
          >
            Add Calender link
          </button>}
          
          {linkid && <button
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] bg-red-500 text-white px-4 py-2 rounded-md border border-red-600 hover:bg-red-600 duration-200 mt-[2vw] mb-[5vw]"
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            Delete link
          </button>}
        </div>
            </div>
    <div className="w-100 h-100">
        <iframe src={link}  width="1000" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
    </div>
  );
};

export default page;