//home component
"use client";
import React, { useState } from "react";
import Card from "@components/Card_main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from '../components/Modal'

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
      <button  data-toggle="modal" data-target="#exampleModalLong">
        <Card
          title="Travel"
          subtitle="Subtitle 1"
          description="Description 1"
          imageUrl="/images/card1.jpg"
          icon="bi bi-luggage-fill"
        />
      </button>
      <button  data-toggle="modal" data-target="#exampleModalLong">
        <Card
          title="Funds"
          subtitle="Subtitle 2"
          description="Description 2"
          imageUrl="/images/card2.jpg"
          icon="bi bi-cash-coin"
        />
      </button>
      <button  data-toggle="modal" data-target="#exampleModalLong">
        <Card
          title="Inventory"
          subtitle="Subtitle 2"
          description="Description 2"
          imageUrl="/images/card2.jpg"
          icon="bi bi-tools"
        />
      </button>
      <button  data-toggle="modal" data-target="#exampleModalLong">
        <Card
          title="Documents"
          subtitle="Subtitle 2"
          description="Description 2"
          imageUrl="/images/card2.jpg"
          icon="bi bi-file-earmark-zip-fill"
        />
      </button>
    </div>
  </section>
);

export default Home;
