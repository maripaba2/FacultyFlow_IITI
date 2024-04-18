"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form2 from "@components/Form2";

const UpdatePrompt = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const fundsId = searchParams.get("id");
  const [post, setPost] = useState({ name: "", amount:0,date:"" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      console.log('ved');
      const response = await fetch(`/api/funds/${fundsId}`);
      console.log(response.body);
      const data =  response.body;

      setPost({
       name:data.name,
       amount:data.amount,
       date:data.date
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
          name:post.name,
          amount:post.amount,
          date:post.date
        }),
      });

      if (response.ok) {
       router.push("/Demo");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form2
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;