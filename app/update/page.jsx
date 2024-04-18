"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form3";

const UpdatePrompt = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const travelsId = searchParams.get("id");
  const [post, setPost] = useState({ title: "", departure: "",place: "",arrival:"",type: "" });
  const [submitting, setIsSubmitting] = useState(false);

 
    const getPromptDetails = async () => {
      console.log('ved');
      const response = await fetch(`/api/travels/${travelsId}`);
      console.log(response.body);
      const data =  response.body;

      setPost({
        title: data.title,
       
      });
    }

    useEffect(()=>{getPromptDetails();}, [travelsId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!travelsId) return alert("Missing FundsId!");

    try {
      const response = await fetch(`/api/travels/${travelsId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
         
          departure: post.departure,
          type: post.type,
          arrival: post.arrival,
          place: post.place,
        }),
      });

      if (response.ok) {
       router.push("/Travel");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;