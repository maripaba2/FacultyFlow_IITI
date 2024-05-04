
import Link from "next/link";
import Image from "next/image";
import UploadButton from "./uploadButton"

import { useRef } from "react";

export default function RootLayout( props ) {
  const hiddenFileInput = useRef(null);
  const url = "https://drive.google.com/file/d/" + props.link;

  return (
    <div className="db shadow-md w-[100%] h-[50vw] text-xl sm:w-[45vw] sm:h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100">
      
      <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
        <div className=" w-[45%] flex flex-col align-center content-center pt-3" style={{paddingLeft:"2rem"}}>       
          <h1 className="C3 font-bold ml-0 mt-0 text-2xl">{ props.title }</h1>
            <h2 className="text-sm">Location: { props.place } </h2>
            <h2 className="text-sm">Type: { props.type }</h2>
            <h2 className="text-sm">Deadline: {props.deadline }</h2>
        </div>
        <div className="flex translate-x-[-4%] mt-[10.5vh] z-10 m-auto" style={{zIndex:"10"}}>
          <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250" onClick={props.handleEdit}>Edit</button>
          { props.link && <a href = {url} target="_blank"><button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button></a> }
          { !props.link && 
              // <UploadButton id = {props.id} email = {props.email} from = {props.w} userid = {props.userid} onClick={props.handleUpload}/>
              <div className="inline-block rounded-md ml-2 duration-250 text-xs bg-peela text-gray-700 cursor-pointer hover:bg-amber-400" onClick={props.handleUpload}>Upload</div>
          }
        </div>
        <h3 className="C3 text-xl font-bold mt-1.5 mr-5 text-nowrap">₹{ props.price }</h3>
      </div>
      <div className="z-10 flex justify-between bg-halka-laal duration-250 w-[7%] h-[100%] hover:bg-darker-halka-laal hover:duration-100 rounded-r-large border-2 border-dark-halka-laal">
        <button onClick={props.handleDelete}> 
          <img alt='logo' src="/assets/images/Trash.png" className="m-auto w-[60%]"/>
        </button>
      </div>
    </div>
  );
}