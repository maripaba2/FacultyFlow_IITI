"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const page = () => {
  const router = useRouter();
  const [dep, setDep] = useState("");

  const [tot, setTot] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState([]);
  const [allEntry, setAllEntry] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartment2, setSelectedDepartment2] = useState("");
  const [departmentBalances, setDepartmentBalances] = useState({});

  const handleSelectChange = async (event) => {
    const value = await event.target.value;
    setSelectedDepartment(value);
  };
  const handleSelectChange2 = async (event) => {
    const value = await event.target.value;
    setSelectedDepartment2(value);
  };
  const handleSubmit = async () => {
    const response = await fetch(`/api/funds`);
    const response2 = await fetch(`/api/funds/get_entry`);

    const fundsdata = await response.json();
    const filteredPosts = fundsdata.filter(
      (item) => item.creator._id === session?.user?.id
    );

    setAllPosts(filteredPosts);
    const entrydata = await response2.json();
    const filteredEntries = entrydata.filter(
      (item) => item.creator._id === session?.user?.id
    );

    setAllEntry(filteredEntries);
  };
  useEffect(() => {
    handleSubmit();
    const balances = {};

    allPosts.forEach((post) => {
      const price = parseFloat(post.price);

      if (!isNaN(price)) {
        if (!balances[post.department]) {
          balances[post.department] = price;
        } else {
          balances[post.department] += price;
        }
      } else {
        console.log(`Invalid price for post ${post._id}: ${post.price}`);
      }
    });

    allEntry.forEach((post) => {
      const amount = parseFloat(post.amount);
      if (!isNaN(amount)) {
        if (!balances[post.department]) {
          balances[post.department] = -amount;
        } else {
          balances[post.department] -= amount;
        }
      } else {
        console.log(`Invalid amount for post ${post._id}: ${post.amount}`);
      }
    });

    setDepartmentBalances(balances);
  }, [allPosts]);

  const createPrompt = async (e) => {
    e.preventDefault();

    const mid = await session?.user.id;

    try {
      const response = await fetch("/api/funds/new", {
        method: "POST",
        body: JSON.stringify({
          dep: dep,
          tot: tot,

          userId: mid,
        }),
      });

      if (response.ok) {
        router.push("/Demo");
      }
      console.log("please");
    } catch (error) {
      console.log(error);
    }
  };
  const createPrompt2 = async (e) => {
    e.preventDefault();

    const mid = await session?.user.id;
    console.log("call");
    try {
      const response = await fetch("/api/funds/new2", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          amount: amount,
          date: date + 1,
          userId: mid,
          department: selectedDepartment,
        }),
      });

      const entry = "Added";
      const response2 = await fetch("/api/logs/new", {
        method: "POST",
        body: JSON.stringify({
          userId: mid,
          title: name,
          type: selectedDepartment,
          entry: entry,
          price: amount,
          date: new Date().toDateString(),
        }),
      });

      console.log("hi");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (post) => {
    const mid = await session?.user.id;
    const hasConfirmed = confirm("Are you sure you want to delete this fund?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/funds/${post._id.toString()}`, {
          method: "DELETE",
        });

        const entry = "Deleted";
        const response2 = await fetch("/api/logs/new", {
          method: "POST",
          body: JSON.stringify({
            userId: mid,
            title: post.name,
            type: post.department,
            entry: entry,
            price: post.amount,
            date: new Date().toDateString(),
          }),
        });

        const filteredPosts = Funds.filter((item) => item._id !== post._id);

        setAllPosts(filteredPosts);
        console.log("ho");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const updatePrompt = async (post) => {
    try {
      const response = await fetch(`/api/funds/${post._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          amount: amount,
          date: date,
        }),
      });

      if (response.ok) {
        router.push("/Funds");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSubmitting(false);
      console.log("Edited.");
    }
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt2?id=${post._id}`);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="flex flex-col align-center justify-center">
      <div className="flex flex-col align-center justify-center items-center ">
        <div className="    ml-4 flex flex-col align-center text-center justify-center bg-transparent border-3  sm:pl-3 border-yellow-400 rounded-l-large rounded-medium text-gray-700 w-[50%] items-center bg-yellow-200">
          <h2>Department Balances:</h2>
          <ul>
            {Object.entries(departmentBalances).map(([department, balance]) => (
              <li key={department}>
                {department}: &#x20b9;{balance}
              </li>
            ))}
          </ul>
        </div>
      </div>


      <form>
        <div className=" items-center justify-center flex flex-col sm:flex-row">
          <input
            className="h-[13vw] w-[50vw] sm:w-[20vw] sm:h-[3vw] text-black border border-gray-400 rounded-small px-3 py-2 mx-3 focus:outline-none focus:border-blue-500 mt-[2vw]"
            type="text"
            placeholder="Department"
            onChange={(e) => setDep(e.target.value)}
          />
          <input
            className="h-[13vw] w-[50vw] sm:w-[20vw] sm:h-[3vw] text-black border border-gray-400 rounded-small px-3 py-2 mx-3 focus:outline-none focus:border-blue-500 sm:mt-[2vw]"
            type="text"
            placeholder="Total"
            onChange={(e) => setTot(e.target.value)}
          />
          <button
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] bg-red-500 text-white px-4 py-2 rounded-md border border-red-600 hover:bg-red-600 duration-200 mt-[2vw] "
            onClick={(e) => {
              createPrompt(e);
            }}
          >
            Add Department
          </button>
        </div>
      </form>

      <hr class="border border-black-300 my-6" />
      <form>
        <div className="flex align-center justify-center">
          <select
            value={selectedDepartment}
            onChange={handleSelectChange}
            className="w-45 h-15 mt-2 mb-5 block sm:w-35 py-1 px-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">Select a department</option>
            {allPosts.map((post, index) => (
              <option key={index} value={post.department}>
                {post.department}
              </option>
            ))}
          </select>
        </div>
        <div className=" items-center justify-center flex flex-col sm:flex-row">
          <input
            className="h-[13vw] w-[50vw] sm:w-[20vw] sm:h-[3vw] text-black border border-gray-400 rounded-small px-3 py-2 mx-3 focus:outline-none focus:border-blue-500 mt-[2vw]"
            type="text"
            placeholder="Name "
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[13vw] w-[50vw] sm:w-[20vw] sm:h-[3vw] text-black border border-gray-400 rounded-small px-3 py-2 mx-3 focus:outline-none focus:border-blue-500 mt-[2vw]"
            type="text"
            placeholder="Amount "
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex flex-col">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
            <button
              className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] bg-red-500 text-white px-4 py-2 rounded-md border border-red-600 hover:bg-red-600 duration-200 mt-[2vw] mb-[2vw]"
              onClick={(e) => {
                createPrompt2(e);
              }}
            >
              Add Funds{" "}
            </button>
          </div>
        </div>
        {/* <div className="flex items-center justify-center sm:items-center sm:flex sm:justify-center"> */}
        {/* <button
            className="h-[10vw] w-[30vw] sm:w-[15vw] sm:h-[3vw] bg-red-500 text-white px-4 py-2 rounded-md border border-red-600 hover:bg-red-600 duration-200 mt-[2vw]"
            onClick={(e) => {
              createPrompt2(e);
            }}
          >
            Add Funds{" "}
          </button> */}
        {/* </div> */}
      </form>

      <hr class="border border-black-300 my-6" />

      <div className="flex align-center justify-center">
        <select
          value={selectedDepartment2}
          onChange={handleSelectChange2}
          className="w-45 h-15 mt-2 mb-5 block sm:w-35 py-1 px-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          <option value="" disabled hidden>
            Select a department
          </option>
          {allPosts.map((post, index) => (
            <option key={index} value={post.department}>
              {post.department}
            </option>
          ))}
        </select>
      </div>

      <div class="ml-[9vw] mt-3 flex align-center justify-center rounded-lg border border-gray-200 shadow-md w-[100%] sm:ml-[1vw]">
        <table class=" border-collapse bg-white text-left text-sm text-gray-500 w-[100%]">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Amount
              </th>

              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Date
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {allEntry &&
              allEntry.map(
                (post, index) =>
                  post.department === selectedDepartment2 ||
                  selectedDepartment2 === "" ? (
                    // <h1>{post.name}</h1>
                    <tr class="hover:bg-gray-50">
                      <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="text-sm">
                          <div class="font-medium text-gray-700">
                            {post.name}
                          </div>
                          <div class="text-gray-400">{post.department}</div>
                        </div>
                      </th>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          &#x20b9; {post.amount}
                        </span>
                      </td>

                      <td class="px-6 py-4">
                        <div class="flex gap-2">
                          <span class="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                            {" "}
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex justify-end gap-4">
                          <button
                            onClick={() => {
                              handleDelete(post);
                            }}
                          >
                            {" "}
                            <a x-data="{ tooltip: 'Delete' }" href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-6 w-6"
                                x-tooltip="tooltip"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </a>
                          </button>
                          <button
                            onClick={() => {
                              handleEdit(post);
                            }}
                          >
                            <a x-data="{ tooltip: 'Edite' }" href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-6 w-6"
                                x-tooltip="tooltip"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>
                            </a>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : null // or <></> if you prefer
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
