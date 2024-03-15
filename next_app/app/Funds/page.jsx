"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar/Sidebar";
import Detailbar from "@components/Cards/detailBar"
import "@components/Cards/cardscss.css"
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
      (item) => item.creator._id === session?.user.id
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
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="adi">
          <button onClick={createPrompt} className="mt-5 w-full black_btn">
            larva
          </button>
          <br />
          <br />
          <div className="">
            <div className="cardd">
              {allPosts.map((post, index) => (

                <div key={post._id} className="bg-white">
                  <Detailbar arrival={post.arrival} _id={post._id} functionA={handleDelete}/>
                  <div className="flex relative" style={{top:"-5rem", left:"9rem", position:"relative"}}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={() => { handleDelete(post); }}> Delete</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => { updatePrompt(post); }}> Edit </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <Sidebar />
      </div>
    </div>
  );
};

export default page;
