// components/Card.js
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function CustomCard({ title, subtitle, description, imageUrl }) {
  return (
    <Card className="asm bg-yellow-400 text-white transition-transform hover:shadow-lg hover:-translate-y-0.5 ">
      <CardHeader className="mb-0 mt-2 mx-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{subtitle}</p>
        <small className="text-default-500">{description}</small>
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={imageUrl}
          width={270}
        />
      </CardBody>
    </Card>
  );
}
