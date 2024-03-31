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
                  <div className="relative z-50 shadow-md w-[45vw] h-[15vh] bg-gray-100 flex flex-col rounded-lg text-gray-700 hover:bg-gray-200 m-4 mt-7" style={{ width: "27rem", height: "4.6rem", borderRadius: "1rem" }}>
                  <div className="w-[100%] bg-transparent border-peela rounded-r-large rounded-l-large flex justify-between items-center px-4 py-2" style={{ borderWidth: "3px" }}>
                    <h1 className="C3 font-bold text-xl">{post.title}</h1>
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold text-blue-900">Type : {post.type}</h2>
                      <h2 className="text-lg font-semibold text-blue-900">Price : {post.price}</h2>
                    </div>
                    <div> 
                      <h2 className="text-lg font-semibold text-blue-900">Entry 3: {post.entry}</h2>
                      {/* <h2 className="text-lg font-semibold text-blue-900">Entry 4: {}</h2> */}
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
