"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const inventoriesId = searchParams.get("id");
  const [post, setPost] = useState({ title: "", deadline: "",place: "",price:"",type: "" });
  const [submitting, setIsSubmitting] = useState(false);

 
    const getPromptDetails = async () => {
      const response = await fetch(`/api/inventories/${inventoriesId}`);
      console.log(response.body);
      const data =  response.body;

      setPost({
        title: data.title,
       
      });
    }

    useEffect(()=>{getPromptDetails();}, [inventoriesId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!inventoriesId) return alert("Missing FundsId!");

    try {
      const response = await fetch(`/api/inventories/${inventoriesId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
         
          deadline: post.deadline,
          type: post.type,
          place: post.place,
          price: post.price,
        }),
      });

      if (response.ok) {
       router.push("/Inventory");
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
      inventid = {inventoriesId}
      from = "inventory"
    />
  );
};

export default UpdatePrompt;