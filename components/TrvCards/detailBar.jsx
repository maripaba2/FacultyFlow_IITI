
import Link from "next/link";
import Image from "next/image";

import { useRef } from "react";

export default function RootLayout( props ) {
  const hiddenFileInput = useRef(null);
  const url = "https://drive.google.com/file/d/" + props.link;

  return (
    <div className="db shadow-md w-[100%] h-[18%] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100">
      
      <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
        <div className=" w-[45%] flex flex-col align-center content-center  pt-3" style={{paddingLeft:"2rem"}}>       
          <h1 className="C3 font-bold ml-0 mt-0" style={{fontSize:"1.5rem"}}>{ props.title }</h1>
          
            <h2 style={{fontSize:"14px"}}>Arrival:{ props.arrival }</h2>
            <h2 style={{fontSize:"14px"}}>Type:{ props.type }</h2>
            <h2 style={{fontSize:"14px"}}>Departure:{props.departure }</h2>
        </div>
        <div className="flex-col justify-space-around mt-2 ml-3 w-[30%]"style={{fontSize:"0.8rem"}}>
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, vel dolorum libero voluptates reprehenderit */}
            
        </div>
        <div className="flex translate-x-[-4%] mt-[10.5vh] z-10 m-auto" style={{zIndex:"10"}}>
          <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250" onClick={props.handleEdit}>Edit</button>
          { props.link && <a href = {url} target="_blank"><button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button></a> }
          { !props.link && 
              // <UploadButton id = {props.id} email = {props.email} from = {props.w} userid = {props.userid} onClick={props.handleUpload}/>
              <div className="inline-block rounded-md ml-2 duration-250 text-xs bg-peela text-gray-700 cursor-pointer hover:bg-amber-400" onClick={props.handleUpload}>Upload</div>
          }
        </div>

        <h3 className="C3 text-xl font-bold mt-1.5 mr-5 text-nowrap">{ props.place }</h3>
      </div>
      <div className="z-10 flex justify-between bg-halka-laal duration-250 w-[7%] h-[100%] hover:bg-darker-halka-laal hover:duration-100 rounded-r-large border-2 border-dark-halka-laal">
        <button onClick={props.handleDelete}> 
          <img alt='logo' src="/assets/images/Trash.png" className="m-auto w-[60%]"/>
        </button>
      </div>
    </div>
  );
}
//<Image src='/assets/images/Trash.png' alt='logo' width={50} height={50} className='object-contain'/>