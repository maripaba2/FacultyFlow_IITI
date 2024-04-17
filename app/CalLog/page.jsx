"use client"
import { useState,useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const page = () => {
    const { data: session } = useSession();
    const [allPosts, setAllPosts] = useState([]);
    const [link, setLink] = useState("");
    const [linkid, setLinkid] = useState("");

    const fetchPosts = async () => {
      const response = await fetch("/api/logs");
      const fundsdata = await response.json();
      const filteredPosts = fundsdata.filter(
        (item) => item.creator?._id === session?.user?.id
      );
  
      setAllPosts(filteredPosts);
    };

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
      fetchPosts();
      fetchCalender();
    });

  return (
    <div>
        <div className="cardd">
              {allPosts.map((post, index) => (
                 <div className="relative z-50 shadow-md w-[45vw] h-[15vh] bg-gray-100 flex flex-col rounded-lg text-gray-700 hover:bg-gray-200 m-4 mt-7" style={{ width: "25rem", height: "4.6rem", borderRadius: "1rem" }}>
     <div className="w-[100%] bg-transparent border-peela rounded-r-large rounded-l-large flex justify-between items-center px-4" style={{ borderWidth: "3px", height:"4.6rem" }}>
    <div className="flex flex-col ml-8">
       <h1 className="mt-0 C3 font-bold text-x">{post.title}</h1>
      <h3 className="text-sm font-semibold text-blue-900">Added/deleted :{post.entry} </h3>
      <h3 className="text-sm font-semibold text-blue-900">Type :{post.type} </h3>
    </div>
    <div className="mt-6 mr-6"> 
      <h3 className="text-sm font-semibold text-blue-900">Price:{post.price} </h3>
      <h3 className="text-sm font-semibold text-blue-900">Added/deleted on :{post.date} </h3>
    </div>
  </div>
</div>

                  
              ))}
            </div>

            <div>
              <div className="flex items-center justify-center sm:items-center sm:flex sm:justify-center mt-5">
            <input
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] text-black border border-gray-400 rounded-small px-3 py-2 mx-3 focus:outline-none focus:border-blue-500 sm:mt-[2vw]"
            type="Calender link"
            placeholder="Calender link"
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] bg-red-500 text-white px-4 py-2 rounded-md border border-red-600 hover:bg-red-600 duration-200 mt-[2vw] mb-[5vw]"
            onClick={(e) => {
              createPrompt(e);
            }}
          >
            Add Calender link
          </button>
          <button
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] bg-red-500 text-white px-4 py-2 rounded-md border border-red-600 hover:bg-red-600 duration-200 mt-[2vw] mb-[5vw]"
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            Delete link
          </button>
        </div>
            </div>
    <div className="w-100 h-100">
        <iframe src={link}  width="1000" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
    </div>
  );
};

export default page;