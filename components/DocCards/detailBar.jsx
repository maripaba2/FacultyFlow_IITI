
import Link from "next/link";
import Image from "next/image";

export default function RootLayout( props ) {
  return (
    <div className="db shadow-md w-[100%] h-[18%] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100">
      
      <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
        <div className=" w-[45%] flex flex-col align-center content-center  pt-3" style={{paddingLeft:"2rem"}}>       
          <h1 className="C3 font-bold ml-0 mt-0" style={{fontSize:"1.5rem"}}><u>{ props.title }</u></h1>
            <h2 style={{fontSize:"14px"}}>Place:{ props.place } </h2>
            <h2 style={{fontSize:"14px"}}>Arrival:{ props.arrival }</h2>
            <h2 style={{fontSize:"14px"}}>Type:{ props.type }</h2>
            <h2 style={{fontSize:"14px"}}>Departure:{props.departure }</h2>
        </div>

        <div className="flex translate-x-[50%] mt-[6.5vh] z-10 mb-[15vh] w-[15%]" style={{zIndex:"10", right:"-5vw", position:"relative"}}>
          <button className="w-[7vw]" onClick={()=>{}}><img alt='logo' src="/assets/images/Drive.png" className="m-auto w-[8rem] mb-20" style={{}}/></button>
          <div className="w-[7vw] pl-6">
            { props.link && <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button> }
            { !props.link && <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">Upload</button> }
          </div>
        </div>
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