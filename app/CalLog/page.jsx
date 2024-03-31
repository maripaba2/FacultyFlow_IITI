"use client"
import { useState,useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const page = () => {
    const { data: session } = useSession();
    const [allPosts, setAllPosts] = useState([]);
    const fetchPosts = async () => {
      const response = await fetch("/api/logs");
      const fundsdata = await response.json();
      const filteredPosts = fundsdata.filter(
        (item) => item.creator?._id === session?.user?.id
      );
  
      setAllPosts(filteredPosts);
    };

  
    useEffect(() => {
      fetchPosts();
    });

  return (
    <div>
        <div className="cardd">
              {allPosts.map((post, index) => (
                 <div className="relative z-50 shadow-md w-[45vw] h-[15vh] bg-gray-100 flex flex-col rounded-lg text-gray-700 hover:bg-gray-200 m-4 mt-7" style={{ width: "25rem", height: "4.6rem", borderRadius: "1rem" }}>
     <div className="w-[100%] bg-transparent border-peela rounded-r-large rounded-l-large flex justify-between items-center px-4" style={{ borderWidth: "3px", height:"4.6rem" }}>
    <div className="flex flex-col ml-8">
       <h1 className="mt-0 C3 font-bold text-x">{post.title}</h1>
      <h3 className="text-sm font-semibold text-blue-900">Entry 1:{post.entry} </h3>
      <h3 className="text-sm font-semibold text-blue-900">Entry 2: </h3>
    </div>
    <div className="mt-6 mr-6"> 
      <h3 className="text-sm font-semibold text-blue-900">Entry 3: </h3>
      <h3 className="text-sm font-semibold text-blue-900">Entry 4: </h3>
    </div>
  </div>
</div>

                  
              ))}
            </div>
    <div className="w-100 h-100">
        <iframe src="https://calendar.google.com/calendar/embed?src=362fefbdbb4c5397e98b05167aefcc47aad114e64f8f8afde9eef6fde2a874e1%40group.calendar.google.com&ctz=UTC"  width="1000" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
    </div>
  );
};

export default page;