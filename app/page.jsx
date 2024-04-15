//home component
"use client";
import React, { useState,useEffect } from "react";
import Card from "@components/Card_main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from '../components/Modal'
import Funds from "@app/Funds/page";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {NextUIProvider} from '@nextui-org/react'
import Sidebar from "@components/Sidebar/Sidebar"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import './globals.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// import Search from "@components/Search"
export default function RootLayout({ children }) {
  const { data: session } = useSession();
  const [displayedFundIds, setDisplayedFundIds] = useState([]);

    useEffect(() => {
        const checkDeadline = async () => {
            try {
                const response = await fetch("/api/deadline");
                const deadlineData = await response.json();

                deadlineData.forEach(item => {
                    
                  const deadlineDate = new Date(item.deadlineDate);
                  const currentDate = new Date();

                  // Calculate the start and end of the current week
                  
                  const startOfWeek = new Date(currentDate);
                  // startOfWeek.setHours(0, 0, 0, 0 - currentDate.getDay()); // Set to the first day of the week (Sunday)
                  
                  const endOfWeek = new Date(startOfWeek);
                  
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      

                  // const endOfWeek = new Date(startOfWeek.getDate() + 7);
                  // endOfWeek.setDate(startOfWeek.); // Set to the last day of the week (Saturday)
                  if (
                    deadlineDate >= startOfWeek &&
                    deadlineDate <= endOfWeek &&
                    !displayedFundIds.includes(item.fundId)
                )
                console.log('yeah');
                {
                  {const year = deadlineDate.getFullYear();
                    const month = String(deadlineDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const day = String(deadlineDate.getDate()).padStart(2, '0');
                      toast.warn(`The deadline for ${item.name} is within the current week at: ${year}-${month}-${day} `);
                      setDisplayedFundIds(prevIds => [...prevIds, item.fundId]);
                  }
                }
            });
        } catch (error) {
              console.error('Error:', error);
          }
      };

      checkDeadline();
  }, []);

  return (
  <section className="appage w-full flex-center flex-col">
    {!session? 
    <>
    

      <h1 className="head_text text-center">
        Welcome to
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Faculty Flow</span>!
      </h1>
      <p className="desc text-center">
        Faculty Flow is a user-friendly data manager tool.<br />
        Have an event to add? <span className="font-bold">Flow</span> it!
      </p>
    </> : 
    <>
    <ToastContainer />
      <h1 className="head_text text-center">
        Hello,
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">{session.user.name}</span>!
      </h1>
      <section className="desc text-center">
        Faculty Flow is a user-friendly data manager tool.<br />
        Have an event to add? <span className="font-bold">Flow</span> it!
      </section>
    </>
    }
    <div className=" flex flex-row" style={{position:"relative",bottom:"-5vw"}}>
    <div data-toggle="modal" data-target="#exampleModalLong">
      <Link href = "/Travel">
        <Card
          title="Travel"
          subtitle="Subtitle 1"
          description="Description 1"
          imageUrl="/images/card1.jpg"
          icon="bi bi-luggage-fill"
        />
      </Link>
    </div>

    <div data-toggle="modal" data-target="#exampleModalLong">
      <Link href = "/Demo">
        <Card
          title="Funds"
          subtitle="Subtitle 2"
          description="Description 2"
          imageUrl="/images/card2.jpg"
          icon="bi bi-cash-coin"
        />
      </Link>
    </div>

    <div  data-toggle="modal" data-target="#exampleModalLong">
        <Link href = "/Inventory">
        <Card
          title="Inventory"
          subtitle="Subtitle 2"
          description="Description 2"
          imageUrl="/images/card2.jpg"
          icon="bi bi-tools"
        />
      </Link>
    </div>

    
      <div  data-toggle="modal" data-target="#exampleModalLong">
        <Link href = "/Documents">
          <Card
            title="Documents"
            subtitle="Subtitle 2"
            description="Description 2"
            imageUrl="/images/card2.jpg"
            icon="bi bi-file-earmark-zip-fill"
          />
        </Link>
      </div>
    
    </div>

  </section>
  // <section><Funds/></section>
  // <section><Search/></section>
);
}

// export default Home;

