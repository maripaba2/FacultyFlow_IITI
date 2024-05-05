"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar/Sidebar";
import Detailbar from "@components/InvCards/detailBar"
// import AddDetailBar from '@components/Cards/addDetailBar';
import SearchCoins from "@components/SearchCoins";
// import Add from "@components/Cards/addDetailBar"
import '@app/globals.css'
import "@components/Cards/cardscss.css"

import {Poppins, Roboto} from '@next/font/google'
import { ScrollShadow } from "@nextui-org/react";

const roboto = Poppins({
  subsets:['latin'],
  weight:'300',
  fontSize:'50px'
  
})
const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [title, setTitle] = useState("");
  
  const [deadline, setDeadline] = useState("");
  
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  
  const [allPosts, setAllPosts] = useState([]);
  const [query, setQuery] = useState('');

  const handleSubmit = async () => {
    const mid = await session?.user.id;
    const response = await fetch(`/api/inventories/search?query=${query}&creator=${mid}`);
    const fundsdata = await response.json();

    setAllPosts(fundsdata);
   };
   useEffect(() => {
    handleSubmit();
  },[allPosts]);
  

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this fund?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/inventories/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = Funds.filter((item) => item._id !== post._id);

        setAllPosts(filteredPosts);
        console.log("ho");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createPrompt = async (e) => {
    e.preventDefault();
    const mid = await session?.user.id;

    try {
      const response = await fetch("/api/inventories/new", {
        method: "POST",
        body: JSON.stringify({
          title:title,
          place:place,
          deadline:deadline,
          price:price,
          type: type,
          userId: mid,
        }),
      });

      if (response.ok) {
        router.push("/Inventory");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatePrompt = async (post) => {
    try {
      const response = await fetch(`/api/inventories/${post._id.toString()}&from=inventory`, {
        method: "PATCH",
        body: JSON.stringify({
          title:title,
          place:place ,
         
          deadline:deadline,
          price:price,
          
          type: type,
          
        }),
      });
      
      if (response.ok) {
        router.push("/Inventory");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleUpload = (post) => {
    router.push(`/upload-prompt?id=${post._id}&from=inventory&title=${post.title}`);
  };
  const currentDate = new Date();
  const filteredPosts = allPosts
  .filter(post => new Date(post.deadline) >= currentDate) // Filter posts with arrival dates after or equal to currentDate
  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Sort posts by ascending order of arrival dates
  .slice(0, 4);

  console.log(allPosts);

  return (
<div className="sm:grid sm:grid-cols-3 md:gap-4 flex flex-col-reverse">
      <div className="col-span-2">
        <div className="adi dadi mt-5">
              <input className="text-black border-2 w-[45vw] border-black rounded-full px-3 py-2" type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <br />
          <br />
          <div className="">
            
          <ScrollShadow hideScrollBar className={`${roboto.className} sm:w-[45vw] sm:h-[50vh] relative`}>
              {allPosts.map((post, index) => (
                <>
                  <Detailbar key={post._id} arrival={post.arrival} place={post.place} title={post.title} deadline={post.deadline} price={post.price} comment={post.company}
                  type={post.task} link = {post.link} id = {post._id} email = {session?.user.email} userid = {session?.user.email} w = "inventory" handleDelete={() => handleDelete && handleDelete(post)} handleEdit={() => handleEdit && handleEdit(post)} handleUpload={() => handleUpload && handleUpload(post)} />
                  <br />
                </>
              ))}
          </ScrollShadow>


      {/* ADD-DETAILBAR */}
    
      <div className="w-[100%] h-[50vw] text-xl shadow-md sm:w-[45vw] sm:h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100">
          <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
              <input type='text' className="text-xl font-bold ml-7 mt-1.5 h-[1.5rem] w-[80%]"onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
              <div className="flex text-[0.65rem] justify-space-around mt-1 translate-x-[-20%]">
                  <div className="w-[35%] translate-y-[32%] translate-x-[-30%] sm:translate-x-[-150%] sm:translate-y-[16%]">

                      <input onChange={(e) => setPlace(e.target.value)}  type='text' className="w-[80%] mb-0.5" placeholder="Place" required />
                      <input onChange={(e) => setDeadline(e.target.value)} type='text' className="w-[180%] mb-0.5" placeholder="Deadline(yyyy/mm/dd)" required />
                     
                      <input onChange={(e) => setType(e.target.value)} type='text' className="w-[80%] mb-0.5" placeholder="Type" required />
                  </div>
                  
              </div>
              <div>
                <h1 className="text-xl font-bold mt-1.5 translate-x-4">₹ <input onChange={(e) => setPrice(e.target.value)} className="w-[50%] h-[1.5rem]" type='text' placeholder="/-" /></h1>

                <div class="flex-col mt-[4vw] sm: flex sm:flex-row  sm:w-[30%] sm:translate-x-[-190%] sm:mt-[6.5vh]">
                  <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250">View</button>
                  <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250 mt-[2vw] mr-[2vw] sm:mt-[0vw] sm:mr-[0vw]">View</button>
                </div>
              </div>       
          </div>
          <button  onClick={(e)=>{createPrompt(e);}} className="flex justify-between bg-peela duration-250 w-[7%] h-[100%] hover:bg-amber-400 hover:duration-100 rounded-r-large border-2 border-amber-600">
          <img alt='logo' src="/assets/images/Plus.png" className="m-auto object-contain w-[60%]"/>
          </button>
        </div>
    
      {/* <AddDetailBar/> */}

          </div>
        </div>
      </div>
      <div className="col-span-1">
      <div className="sidebarall font-roboto items-center">
  <h2 className="text-center" style={{ fontSize: "2rem" }}>REMAINING TASKS</h2>
  <div className="shadow-md w-[32vw] h-[45vh] bg-transparent border-3 border-yellow-400 rounded-l-large rounded-medium text-gray-700 hover:bg-gray-100 m-4 flex flex-wrap">
    {filteredPosts.map((post, index) => (
      <div key={index} className="w-1/2 flex flex-col">
        <section className="mt-7 mb-7 mr-4 ml-7 rounded-large hover:bg-yellow-400 text-center pt-2 bg-yellow-300 h-[15vh] hover:translate-y-[-3px] transition duration-300">
          {post.title}<br />
          
          Deadline: {post.deadline}<br />
         
        </section>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default page;
