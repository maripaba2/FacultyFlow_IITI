//home component
"use client";
import React, { useState } from "react";
import Card from "@components/Card_main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from '../components/Modal'
import Funds from "@app/Funds/page";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {NextUIProvider} from '@nextui-org/react'
import Sidebar from "@components/Sidebar/Sidebar"

import Chatbot from "../components/chatbot2";
import Bot from "../components/buttonChatbot";


// import Search from "@components/Search"
const Home = () => (
  

    
  <section className="w-full flex-center flex-col">
   
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

  </section>
  
  // <section><Funds/></section>
  // <section><Search/></section>
);

export default Home;

