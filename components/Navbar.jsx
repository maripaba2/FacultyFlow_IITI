"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [title,setTitle]=useState('a');
  const [arrival,setArrival]=useState('a');
  const [departure,setDeparture]=useState('a');
  const [price,setPrice]=useState(0);
  const [type,setType]=useState('a');
  const [place,setPlace]=useState('a');
  const [comment,setComment]=useState('a');
  const [link,setLink]=useState('a');
 
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  
  const createPrompt = async (e) => {
   
    e.preventDefault();
    

    try {
      const response = await fetch("/api/funds/new", {
        method: "POST",
        body: JSON.stringify({
         title:title,
         place:place,
         arrival:arrival,
         departure:departure,
         price:price,
         comment:comment,
         link:link,
         type:type,
          userId: session?.user.id,
          
        }),
      });

      if (response.ok) {
        router.push("/");
      }
      console.log('hi');
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <nav className='flex-between w-full pt-3'>
      
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/Chatbot.png'
          alt='logo'
          width={50}
          height={50}
          className='object-contain'
        />
        {/* <p className='logo_text'>Promptopia</p> */}
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/CalLog' className='black_btn'>
              Calender
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn bg-black hover:!bg-transparent hover:text-black'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/CalLog'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Calender
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;