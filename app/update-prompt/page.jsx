"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const fundsId = searchParams.get("id");
  const [post, setPost] = useState({ title: "", arrival: "",departure: "",place: "",price:"",comment:"",type: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      console.log('ved');
      const response = await fetch(`/api/funds/${fundsId}`);
      console.log(response.body);
      const data =  response.body;

      setPost({
        title: data.title,
        arrival: data.arrival,
      });
    };

    if (fundsId) getPromptDetails();
  }, [fundsId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!fundsId) return alert("Missing FundsId!");

    try {
      const response = await fetch(`/api/funds/${fundsId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          arrival: post.arrival,
          departure: post.departure,
          type: post.type,
          place: post.place,
          price: post.price,
        }),
      });

      if (response.ok) {
       router.push("/Funds");
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