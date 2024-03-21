
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({ place, arrival }) {
  return (
    <div className="shadow-md w-[45vw] h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100 m-4" style={{width:"47rem"}}>
      
      <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
        <div className="flex flex-col align-center content-center pl-20 pt-3">       
          <h1 className="C3  font-bold ml-7 mt-2.5" style={{fontSize:"35px"}}>NAME</h1>
        </div>
      </div>
      <div className="flex justify-between bg-halka-laal duration-250 w-[7%] h-[100%] hover:bg-darker-halka-laal hover:duration-100 rounded-r-large border-2 border-dark-halka-laal"><button > <Link href="#"><Image alt='logo' width={20} height={40} src="/assets/images/Trash.png" className="h-[3.5vh] m-auto object-contain ml-3" /></Link></button>
      </div>
    </div>
  );
}
//<Image src='/assets/images/Trash.png' alt='logo' width={50} height={50} className='object-contain'/>