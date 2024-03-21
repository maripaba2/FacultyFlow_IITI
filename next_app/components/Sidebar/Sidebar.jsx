// import React from 'react';

// const Side = () => {
//   return (
//     <div>
//       <div className="aouter-card bg-white border-4 border-yellow-400 rounded-lg shadow-lg p-5 max-w-20rem min-w-18rem">
//         <div className="grid grid-cols-2 grid-rows-2 gap-5">
//           <div className="acard bg-yellow-400 rounded-lg flex flex-col justify-center items-center p-10">
//             <span className="text-xl font-bold">Travel</span>
//             <span className="text-base font-normal">Rs: 80085</span>
//           </div>

//           <div className="acard bg-yellow-400 rounded-lg flex flex-col justify-center items-center p-10">
//             <span className="text-xl font-bold">Travel</span>
//             <span className="text-base font-normal">Rs: 80085</span>
//           </div>

//           <div className="acard bg-yellow-400 rounded-lg flex flex-col justify-center items-center p-10">
//             <span className="text-xl font-bold">Travel</span>
//             <span className="text-base font-normal">Rs: 80085</span>
//           </div>

//           <div className="acard bg-yellow-400 rounded-lg flex flex-col justify-center items-center p-10">
//             <span className="text-xl font-bold">Travel</span>
//             <span className="text-base font-normal">Rs: 80085</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Side;




import React from 'react';
import '@fontsource/roboto'; // Importing Roboto font from Google Fonts

function Sidebar() {
  return (
    <div className="sidebarall font-roboto items-center">
      <h2 className="text-center " style={{fontSize:"2rem"}}>REMAINING TASKS</h2>
      <div className="shadow-md w-[32vw] h-[40vh] bg-transparent border-3 border-yellow-400 rounded-l-large rounded-medium text-gray-700 hover:bg-gray-100 m-4 flex flex-wrap">
        <div className="w-1/2 flex flex-col justify-between">
          <section className="mt-7 mb-7 mr-4 ml-7 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[15vh] hover:translate-y-[-3px] transition duration-300">XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
          <section className="mb-10 mr-4 ml-7 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[15vh] hover:translate-y-[-3px] transition duration-300">XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <section className="mt-7 mb-7 mr-7 ml-4 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[15vh] hover:translate-y-[-3px] transition duration-300">XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section>
          <section className="mb-10 mr-7 ml-4 rounded-large hover:bg-yellow-400  text-center pt-2 bg-yellow-300 h-[15vh] hover:translate-y-[-3px] transition duration-300">XYZ motors<br/>Place: IC lab<br/>Deadline:26 Oct<br/>Task: eat cake</section> 
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
