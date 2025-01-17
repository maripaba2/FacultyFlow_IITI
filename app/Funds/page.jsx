"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar/Sidebar";
import Detailbar from "@components/Cards/detailBar"
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
  const [title, setTitle] = useState("a");
  const [arrival, setArrival] = useState("a");
  const [departure, setDeparture] = useState("a");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("a");
  const [place, setPlace] = useState("a");
  const [comment, setComment] = useState("a");
  const [link, setLink] = useState("a");
  const [allPosts, setAllPosts] = useState([]);
  const [query, setQuery] = useState('')

  const handleSubmit = async () => {
    

    const response = await fetch(`/api/funds`)
   
    const fundsdata = await response.json();
    // const filteredPosts = fundsdata.filter(
    //   (item) => item.creator._id === session?.user?.id
    // );
    
    setAllPosts(fundsdata);
    
   };
   useEffect(() => {
    handleSubmit();
  });
  

  const handleDelete = async (post) => {
    const mid = await session?.user.id;
    const hasConfirmed = confirm("Are you sure you want to delete this fund?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/funds/${post._id.toString()}`, {
          method: "DELETE",
        });

        const entry="Deleted";
        const response2 = await fetch("/api/logs/new", {
          method: "POST",
          body: JSON.stringify({
            userId: mid,
            title: post.title,
            type: post.type,
            entry : entry,
            price: post.price,
            date :new Date().toDateString()
          }),
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
    console.log(mid);
    console.log("HEHEHEHE");

    try {
      const response = await fetch("/api/funds/new", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          place: place,
          arrival: arrival,
          departure: departure,
          price: price,
          comment: comment,
          link: link,
          type: type,
          userId: mid,
        }),
      });

      const entry="Added";
      const response2 = await fetch("/api/logs/new", {
        method: "POST",
        body: JSON.stringify({
          userId: mid,
          title: title,
          type: type,
          entry : entry,
          price: price,
          date : new Date().toDateString()
        }),
      });

      if (response.ok) {
        router.push("/Funds");
      }
      console.log("hi");
    } catch (error) {
      console.log(error);
    }
  };
  const updatePrompt = async (post) => {
    try {
      const response = await fetch(`/api/funds/${post._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          title:title,
          place:place ,
          arrival:arrival,
          departure: departure,
          price:price,
          comment: comment,
          link:link,
          type: type,
        }),
      });

      if (response.ok) {
        router.push("/Funds");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSubmitting(false);
      console.log("Edited.");
    }
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const currentDate = new Date();
  const filteredPosts = allPosts
  .filter(post => new Date(post.arrival) >= currentDate) // Filter posts with arrival dates after or equal to currentDate
  .sort((a, b) => new Date(a.arrival) - new Date(b.arrival)) // Sort posts by ascending order of arrival dates
  .slice(0, 4);

  return (
<div className="sm:grid sm:grid-cols-3 md:gap-4 flex flex-col-reverse">
      <div className="col-span-2">
        <div className="adi">
         
          <div className="text-center">
      
      <div className="text-center">
        <form onSubmit={() => { handleSubmit(); }} >
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Search " value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
    </div>
      
   </div>
          <br />
          <br />
          <div className="">
            
          <ScrollShadow hideScrollBar className={`${roboto.className} dbcf w-[45vw] h-[50vh] relative `}>
              {allPosts.map((post, index) => (
                <>
                  <Detailbar key={post._id} arrival={post.arrival} place={post.place} title={post.title} departure={post.departure} price={post.price} comment={post.comment}
                  type={post.type} link = {post.link} handleDelete={() => handleDelete && handleDelete(post)} handleEdit={() => handleEdit && handleEdit(post)} />
                  <br />
                </>
              ))}
          </ScrollShadow>


      {/* ADD-DETAILBAR */}


      <form>       
      <div className=" h-[50vw] text-xl shadow-md sm:w-[45vw] sm:h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100">
          <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
              <input type='text' className="text-xl font-bold ml-7 mt-1.5 h-[1.5rem] w-[80%]"onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
              <div className="flex text-[0.65rem] justify-space-around mt-1 translate-x-[-20%]">
                  <div className="w-[35%] translate-y-[32%] translate-x-[-130%]">

                      <input onChange={(e) => setPlace(e.target.value)}  type='text' className="w-[80%] mb-0.5" placeholder="Place" required />
                      <input onChange={(e) => setDeparture(e.target.value)} type='text' className="w-[80%] mb-0.5" placeholder="Departure" required />
                      <input onChange={(e) => setArrival(e.target.value)} type='text' className="w-[80%] mb-0.5" placeholder="Arrival" required />
                      <input onChange={(e) => setType(e.target.value)} type='text' className="w-[80%] mb-0.5" placeholder="Type" required />
                  </div>
                  <div className="w-[35%] translate-y-[36%] ml-10 translate-x-[-50%]">
                      <input onChange={(e) => setComment(e.target.value)} type='text' className="leading-[0.775rem] h-[57%] text-start text-pretty" placeholder="Comment" required />
                  </div>
              </div>
              <div>
                <h1 className="text-xl font-bold mt-1.5 translate-x-4">$ <input onChange={(e) => setPrice(e.target.value)} className="w-[50%] h-[1.5rem]" type='text' placeholder="/-" /></h1>
                <div className="flex w-[30%] translate-x-[-190%] mt-[6.5vh]" >
                  <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250">View</button>
                  <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button>
                </div>
              </div>       
          </div>
          <button  onClick={createPrompt} className="flex justify-between bg-peela duration-250 w-[7%] h-[100%] hover:bg-amber-400 hover:duration-100 rounded-r-large border-2 border-amber-600">
          <img alt='logo' src="/assets/images/Plus.png" className="m-auto object-contain w-[60%]"/>
          </button>
        </div>
      </form>
      {/* <AddDetailBar/> */}

          </div>
        </div>
      </div>
      <div className="col-span-1">
        <Sidebar 
            sidebartitle={"REMAINING FUNDS"}
            customForm={<form onSubmit={()=>{}} className="flex-col text-center align-center">
            {/* Your form fields */}
            <h1>enter amount to be added:</h1><br/>
            <h1 className="text-xl font-bold  translate-x-4 pr-7">$<input onChange={() => {}} className="w-[50%] h-[1.5rem]" type='text' placeholder="/-" /></h1>
            <button type="submit" className="bg-yellow-700 text-white py-1 mt-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50">Submit</button>

          </form>}

        />
      </div>
    </div>
  );
};

export default page;
