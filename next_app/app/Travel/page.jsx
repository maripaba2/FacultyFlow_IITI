"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar/Sidebar";
import Detailbar from "@components/TrvCards/detailBar";
// import Add from "@components/Cards/addDetailBar"
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
  const fetchPosts = async () => {
    const response = await fetch("/api/funds");
    const fundsdata = await response.json();
    const filteredPosts = fundsdata.filter(
      (item) => item.creator._id === session?.user?.id
    );

    setAllPosts(filteredPosts);
  };

  useEffect(() => {
    fetchPosts();
  });

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this fund?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/funds/${post._id.toString()}`, {
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
          title: "b",
          place: "b",
          arrival: "b",
          departure: "b",
          price: 1000,
          comment: "b",
          link: "b",
          type: "b",
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
  return (
    <div>
    <div className="grid grid-cols-3 gap-4" >
      <div className="col-span-2">
        <div className="adi">
          {/* <button onClick={createPrompt} className="mt-5 w-full black_btn" style={{position:'relative', left:"-5rem"}}>
            inven_larva
          </button> */}
          <br />
          <br />
          <div className="" >
        
          <ScrollShadow hideScrollBar className="w-[768px] h-[600px]" style={{position:'relative', left:"-5rem"}}>
            <div className={`w-[22rem] ${roboto.className}`}>
              {allPosts.map((post, index) => (

                <div key={post._id} className="bg-transparent">
                  <Detailbar arrival={post.arrival} place={post.place} functionA={handleDelete} className={`${roboto.className}`} style={{fontSize:"30px"}}/>
                  <div className="flex relative" style={{top:"-5rem", left:"33rem", position:"relative", width:"5rem"}}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white mx-3 px-3 py-2 rounded mr-2" onClick={() => { handleDelete(post); }}> DELETE</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white mx-3 px-3 py-2 rounded" onClick={() => { updatePrompt(post); }}> VIEW </button>
                  </div>
                </div>
              ))}
            </div>
            </ScrollShadow>

            <form>
      <div className={`shadow-md w-[39vw] h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100 m-4 text-xl ${roboto.className}`} style={{position:'relative', left:"-5rem"}}>
          <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
              <input type='text' className="text-xl font-bold ml-7 mt-1.5 h-[1.5rem] w-[80%]" placeholder="Title" required />
              <div className="flex text-[0.65rem] justify-space-around mt-1 translate-x-[-20%]">
                  <div className="w-[35%] translate-y-[32%] translate-x-[-130%]">
                      <input onChange={(e) => setPlace(e.target.value)}  ontype='text' className="w-[80%] mb-0.5" placeholder="Place" required />
                      <input onChange={(e) => setDeparture(e.target.value)} type='text' className="w-[80%] mb-0.5" placeholder="Departure" required />
                      <input onChange={(e) => setArrival(e.target.value)} ontype='text' className="w-[80%] mb-0.5" placeholder="Arrival" required />
                      <input onChange={(e) => setType(e.target.value)} type='text' className="w-[80%] mb-0.5" placeholder="Type" required />
                  </div>
                  <div className="w-[35%] translate-y-[36%] ml-10 translate-x-[-50%]">
                      <input onChange={(e) => setLink(e.target.value)} type='text' className="leading-[0.775rem] h-[57%] text-start text-pretty" placeholder="Comment" required />
                  </div>
              </div>
              <div>
                <h1 className="text-xl font-bold mt-1.5 translate-x-4">$ <input className="w-[50%] h-[1.5rem]" type='text' placeholder="/-" /></h1>
                {/* <div className="flex w-[30%] translate-x-[-190%] mt-[6.5vh]" >
                  <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250">View</button>
                  <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button>
                </div> */}
              </div>       
          </div>
          <button  onClick={createPrompt} className="flex justify-between bg-peela duration-250 w-[7%] h-[100%] hover:bg-amber-400 hover:duration-100 rounded-r-large border-2 border-amber-600">
              <Image alt='logo' width={20} height={40} src="/assets/images/Plus.png" className="h-[3.5vh] m-auto object-contain ml-3"/>
          </button>
      </div>
    </form>

          </div>
        </div>
      </div>
      <div className="col-span-1">
        <Sidebar sidebartitle={"TRAVEL DEADLINES"}/>
      </div>
    </div>
    </div>
  );
};

export default page;
