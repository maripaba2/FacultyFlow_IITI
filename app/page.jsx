//home component
"use client";
import React, { useState ,useEffect} from "react";
import Card from "@components/Card_main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from '../components/Modal'
import Funds from "@app/Funds/page";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {NextUIProvider} from '@nextui-org/react'
import Sidebar from "@components/Sidebar/Sidebar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Search from "@components/Search"
function Home(){
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
    }, []); // Empty dependency array to ensure the effect runs only once on mount

    const handleButtonClick = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        await checkDeadline(); // Call the checkDeadline function
    }
 return(<section className="w-full flex-center flex-col">
   <ToastContainer />
 <h1 className="head_text text-center">
   Welcome to
   <br className="max-md:hidden" />
   <span className="orange_gradient text-center">Faculty Flow</span>
 </h1>
 <p className="desc text-center">
   Faculty Flow is a user-friendly blah blah blah
 </p>
 <div className=" flex flex-row ">
 <Link href="/Travel">
   <button>
     <Card
       title="Travel"
       subtitle="Subtitle 1"
       description="Description 1"
       imageUrl="/images/card1.jpg"
       icon="bi bi-luggage-fill"
     />
   </button>
 </Link>

 <Link href = "/Funds">
   <button  data-toggle="modal" data-target="#exampleModalLong">
     <Card
       title="Funds"
       subtitle="Subtitle 2"
       description="Description 2"
       imageUrl="/images/card2.jpg"
       icon="bi bi-cash-coin"
     />
   </button>
 </Link>

 <Link href = "/Inventory">
   <button  data-toggle="modal" data-target="#exampleModalLong">
     <Card
       title="Inventory"
       subtitle="Subtitle 2"
       description="Description 2"
       imageUrl="/images/card2.jpg"
       icon="bi bi-tools"
     />
   </button>
 </Link>

 <Link href = "/Documents">
   <button  data-toggle="modal" data-target="#exampleModalLong">
     <Card
       title="Documents"
       subtitle="Subtitle 2"
       description="Description 2"
       imageUrl="/images/card2.jpg"
       icon="bi bi-file-earmark-zip-fill"
     />
   </button>
 </Link>
 </div>

</section>);
  
  // <section><Funds/></section>
  // <section><Search/></section>
  };

export default Home;

