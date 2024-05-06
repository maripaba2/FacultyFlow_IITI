"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar/Sidebar";
import Detailbar from "@components/TrvCards/detailBar"
// import AddDetailBar from '@components/Cards/addDetailBar';
import SearchCoins from "@components/SearchCoins";
// import Add from "@components/Cards/addDetailBar"
import '@app/globals.css'
import "@components/Cards/cardscss.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [date, setDate] = useState(new Date());
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [comment, setComment] = useState("");
  const [link, setLink] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [query, setQuery] = useState('')

  const handleSubmit = async () => {
    const mid = await session?.user.id;
    const response = await fetch(`/api/travels/search?query=${query}&creator=${mid}`);
    const fundsdata = await response.json();
    setAllPosts(fundsdata);
  };    

  useEffect(() => {
    handleSubmit();
  },[allPosts, session]);
  

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this entry?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/travels/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = Funds.filter((item) => item._id !== post._id);

        setAllPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createPrompt = async (e) => {
    e.preventDefault();

    const mid = await session?.user.id;
    const email = await session?.user.email;

    try {
      const response = await fetch("/api/travels/new", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          place: place,
          arrival: arrival,
          departure: departure,
          type: type,
          userId: mid,
          email:email
        }),
      });

      if (response.ok) {
        router.push("/Travel");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatePrompt = async (post) => {
    try {
      const response = await fetch(`/api/travels/${post._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          title:title,
          place:place ,
          arrival:arrival,
          departure: departure,
          
          type: type,
        }),
      });

      if (response.ok) {
        router.push("/Travel");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (post) => {
    router.push(`/update?id=${post._id}`);
  };
  const handleUpload = (post) => {
    router.push(`/upload-prompt?id=${post._id}&from=travel&title=${post.title}`);
  };

  return (
    <div className="sm:grid sm:grid-cols-3 md:gap-4 flex flex-col-reverse">
      <div className="col-span-2">
        <div className="adi dadi mt-5">
              <input className="text-black border-2 w-[45vw] border-black rounded-full px-3 py-2" type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          <br />
          <br />
          <div className="">
          <ScrollShadow hideScrollBar className={`${roboto.className} dbcf sm:w-[45vw] sm:h-[50vh] relative `}>
              {allPosts.map((post, index) => (
                <>
                  <Detailbar key={post._id} arrival={post.arrival} place={post.place} title={post.title} departure={post.departure} link = {post.link}
                  type={post.type}  handleDelete={() => handleDelete && handleDelete(post)} handleEdit={() => handleEdit && handleEdit(post)} handleUpload={() => handleUpload && handleUpload(post)} />
                  <br />
                </>
              ))}
          </ScrollShadow>
</div>

      {/* ADD-DETAILBAR */}

      <div className="  w-[100%] h-[50vw] text-xl shadow-md sm:w-[45vw] sm:h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100">
          <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
              <input type='text' className="text-xl font-bold ml-7 mt-1.5 h-[1.5rem] w-[60%] pl-2 mb-2"onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
              <div className="flex text-[0.65rem] justify-space-around mt-1 translate-x-[-20%]">
                  <div className="w-[35%] translate-y-[32%] translate-x-[-30%] sm:translate-x-[-150%] sm:translate-y-[16%]">

                     
                      <input onChange={(e) => setDeparture(e.target.value)} type='text' className="w-[180%] mb-1 pl-2 mt-1" placeholder="Departure(yyyy/mm/dd)" required />
                      <input onChange={(e) => setArrival(e.target.value)} type='text' className="w-[180%] mb-1 pl-2" placeholder="Arrival(yyyy/mm/dd)" required />
                      
    
                      <input onChange={(e) => setType(e.target.value)} type='text' className="w-[80%] mb-0.5 pl-2" placeholder="Type" required />
                  </div>
                  <div className="w-[35%] translate-y-[36%] ml-10 translate-x-[-50%]">
                     
                  </div>
              </div>
              <div>
                <h1 className="text-xl font-bold mt-1.5 translate-x-4"><input onChange={(e) => setPlace(e.target.value)} className="w-[70%] h-[1.5rem] pl-2 " type='text' placeholder="Location" /></h1>

                
              </div>       
          </div>
          <button  onClick={createPrompt} className="flex justify-between bg-peela duration-250 w-[7%] h-[100%] hover:bg-amber-400 hover:duration-100 rounded-r-large border-2 border-amber-600">
          <img alt='logo' src="/assets/images/Plus.png" className="m-auto object-contain w-[60%]"/>
          </button>
        </div>
      {/* <AddDetailBar/> */}
      

          </div>
        </div>
        <div className="right-5 m-auto mb-10 ml-40 translate-y-[-8%] flex flex-col justify-center items-center h-full">
          <Link href='https://www.iiti.ac.in/' className='black_btn mt-2 w-[14vw] h-[7vh] text-md'>
              IIT Indore
          </Link>
          <Link href='http://intranet.iiti.ac.in/' className='black_btn mt-2 w-[14vw] h-[7vh] text-md'>
              Leave Form
          </Link>
          <Link href='http://me.iiti.ac.in/' className='black_btn mt-2 w-[14vw] h-[7vh] text-md'>
              ME Deparment
          </Link>
      </div>

      </div>
  );
};

export default page;