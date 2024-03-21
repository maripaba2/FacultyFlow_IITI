
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({ place, arrival }) {
  return (
    <div className="shadow-md w-[45vw] h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100 m-4" style={{width:"47rem"}}>
      
      <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
        <div className="flex flex-col align-center content-center pl-20 pt-3">       
          <h1 className="C3  font-bold ml-7 mt-1.5" style={{fontSize:"30px"}}>Title</h1>
            <h2 style={{fontSize:"14px"}}>{place } is the place</h2>
            <h2 style={{fontSize:"14px"}}>{arrival}is the arrival date</h2>
        </div>
        <div className="flex justify-space-around mt-1">

      </div>
        <div className="flex translate-x-[-4%] mt-[10.5vh] z-10 m-auto" style={{zIndex:"10"}}>
          <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250">View</button>
          <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button>
        </div>
        <h3 className="C3 text-xl font-bold mt-1.5 mr-5 text-nowrap">$ 42069</h3>
      </div>
      <div className="flex justify-between bg-halka-laal duration-250 w-[7%] h-[100%] hover:bg-darker-halka-laal hover:duration-100 rounded-r-large border-2 border-dark-halka-laal"><button > <Link href="#"><Image alt='logo' width={20} height={40} src="/assets/images/Trash.png" className="h-[3.5vh] m-auto object-contain ml-3" /></Link></button>
      </div>
    </div>
  );
}
//<Image src='/assets/images/Trash.png' alt='logo' width={50} height={50} className='object-contain'/>