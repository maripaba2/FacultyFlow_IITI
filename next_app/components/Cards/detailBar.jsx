

export default function RootLayout({ place, arrival }) {
  return (
    <div className="shadow-md w-[45vw] h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100 m-4" style={{width:"47rem", fontFamily:"Poppins"}}>
      
      <div className="w-[93%] bg-transparent border-2 border-peela rounded-l-large flex">
        <div className="flex flex-col">
       
          <h3 className="C3 text-lg font-bold ml-7 mt-1.5">Title</h3>
            <h2>{place } is the place</h2>
            <h2>{arrival}is the arrival date</h2>
        </div>
        <div className="flex text-[0.65rem] justify-space-around mt-1">

      </div>
        <div className="flex translate-x-[-4%] mt-[10.5vh] z-10 m-auto" style={{zIndex:"10"}}>
          <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250">View</button>
          <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button>
        </div>
        <h3 className="C3 text-xl font-bold mt-1.5 mr-5 text-nowrap">$ 42069</h3>
      </div>
      <div className="flex justify-between bg-halka-laal duration-250 w-[7%] h-[100%] hover:bg-darker-halka-laal hover:duration-100 rounded-r-large border-2 border-dark-halka-laal"><button > <img src="Trash.png" className="h-[3.5vh] m-auto" /></button>
      </div>
    </div>
  );
}
