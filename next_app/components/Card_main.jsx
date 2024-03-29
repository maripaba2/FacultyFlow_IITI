// components/Card.js
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
export default function CustomCard({ title, subtitle, description, imageUrl, icon }) {
  return (
    <Card className="asm text-white transition-transform hover:shadow-lg hover:-translate-y-0.5 " style={{backgroundColor:'#ecb321'}} typeof="button" itemType="button">
   
      <CardHeader className="mb-0 mt-2 display-flex items-start justify-center text-center" typeof="button" itemType="button">
        <h1 className="font-bold text-large">{title}</h1>
      </CardHeader>
      <CardBody className="overflow-visible py-2" typeof="button" itemType="button">
        <i className={icon} style={{display:"flex", alignItems:'center', justifyContent:'center', fontSize:"6rem", position:'relative', top:'-1rem', color:'#cc5a0f'}}></i>
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
