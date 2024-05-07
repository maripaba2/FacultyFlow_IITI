import Link from "next/link";
import { useRouter } from "next/navigation";

const Form = ({ type, post, setPost, submitting, handleSubmit, inventid, from }) => {
  const router = useRouter();
  
  const changeUpload = async () => {
    router.push(`/upload-prompt?id=${inventid}&from=${from}&title=`)
  }

  return (
    <form  onSubmit={handleSubmit}>
      <div className="shadow-md w-[45vw] h-[18vh] bg-off-white flex rounded-medium text-gray-700 hover:bg-gray-100 m-4">
          <div className="w-[93%] bg-transparent  rounded-l-large flex">
              <input  value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })} type='text' className="text-xl font-bold ml-7 mt-1.5 h-[1.5rem] w-[80%]" placeholder="Title" required />
              <div className="flex text-[0.65rem] justify-space-around mt-1 translate-x-[-20%]">
                  <div className="w-[35%] translate-y-[32%] translate-x-[-130%]">
                      {/* <h4 className="-mb-0.5 text-nowrap"><span>Place</span><span>: </span><span><input type='text' className="w-[80%]" /></span></h4>
                      <h4 className="-mb-0.5 text-clip"><span>Departure</span><span>: </span><span>Time/Date</span></h4>
                      <h4 className="-mb-0.5 text-nowrap"><span>Arrival</span><span>: </span><span>Time/Date</span></h4>
                      <h4 className="-mb-0.5 text-nowrap"><span>Type</span><span>: </span><span>Type</span></h4> */}
                      <input  value={post.place}
            onChange={(e) => setPost({ ...post, place: e.target.value })} type='text' className="w-[80%] mb-0.5" placeholder="Place" required />
                      <input  value={post.deadline}
            onChange={(e) => setPost({ ...post, deadline: e.target.value })} type='text' className="w-[80%] mb-0.5" placeholder="Deadline" required />
                      
                      <input  value={post.type}
            onChange={(e) => setPost({ ...post, type: e.target.value })} type='text' className="w-[80%] mb-0.5" placeholder="Type" required />
                  </div>
                  <div className="w-[35%] translate-y-[36%] ml-10 translate-x-[-50%]">
                     
                  </div>
              </div>
              <div>
                <h1 className="text-xl font-bold mt-1.5 translate-x-4">$ <input  value={post.price}
            onChange={(e) => setPost({ ...post, price: e.target.value })} className="w-[50%] h-[1.5rem]" type='text' placeholder="/-" /></h1>
                <div className="w-[100%] mt-[5vh] text-md" >
                  <button className="bg-peela hover:duration-100 hover:bg-halka-peela mr-2 rounded-md duration-250 p-0.5" onClick = {changeUpload}>Edit Link</button>
                  {/* <button className="bg-peela hover:duration-100 hover:bg-halka-peela ml-2 rounded-md duration-250">View</button> */}
                </div>
              </div>       
          </div>
          {/* <button onClick={addEntry()} className="flex justify-between bg-peela duration-250 w-[7%] h-[100%] hover:bg-amber-400 hover:duration-100 rounded-r-large border-2 border-amber-600">
              <img src = "Plus.png" className="h-[3.5vh] m-auto"/>
          </button> */}
      </div>
      <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
    </form>
  );
  // return (
  //   <section className='w-full max-w-full flex-start flex-col'>
  //     <h1 className='head_text text-left'>
  //       <span className='blue_gradient'>{type} Post</span>
  //     </h1>
  //     <p className='desc text-left max-w-md'>
  //       {type} and share amazing prompts with the world, and let your
  //       imagination run wild with any AI-powered platform
  //     </p>

  //     <form
  //       onSubmit={handleSubmit}
  //       className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
  //     >
  //       <label>
  //         <span className='font-satoshi font-semibold text-base text-gray-700'>
  //           Your AI Prompt
  //         </span>

  //         <textarea
  //           value={post.title}
  //           onChange={(e) => setPost({ ...post, title: e.target.value })}
  //           placeholder='Write your post here'
  //           required
  //           className='form_textarea '
  //         />
  //       </label>

  //       <label>
  //         <span className='font-satoshi font-semibold text-base text-gray-700'>
  //           Field of Prompt{" "}
  //           <span className='font-normal'>
  //             (#product, #webdevelopment, #idea, etc.)
  //           </span>
  //         </span>
  //         <input
  //           value={post.arrival}
  //           onChange={(e) => setPost({ ...post, arrival: e.target.value })}
  //           type='text'
  //           placeholder='#Tag'
  //           required
  //           className='form_input'
  //         />
  //       </label>

  //       <div className='flex-end mx-3 mb-5 gap-4'>
  //         <Link href='/' className='text-gray-500 text-sm'>
  //           Cancel
  //         </Link>

  //         <button
  //           type='submit'
  //           disabled={submitting}
  //           className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
  //         >
  //           {submitting ? `${type}ing...` : type}
  //         </button>
  //       </div>
  //     </form>
  //   </section>
  // );
};

export default Form;
