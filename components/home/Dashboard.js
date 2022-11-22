import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [timeState, setTimeState] = useState({
    token: "",
    month: "11",
    year: "2022",
  });

  const getData = async () => {
    try {
      const response = await axios.post("/api/traffic", timeState);

      if (response.data.success) {
        console.log(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitGetData = (e) => {
    e.preventDefault();
    getData();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTimeState({
      ...timeState,
      token: token,
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mx-auto px-10 py-10">
        <div className="flex mx-auto">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <form onSubmit={submitGetData}>
            <input
              datepicker=""
              datepicker-buttons=""
              type="text"
              id="datepicker-input"
              className="bg-gray-50 border border-gray-300 text-slate-100 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
              placeholder="Select date"
            ></input>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mx-3">
              GET DATA
            </button>
          </form>
        </div>
        <div className="flex justify-center py-3 px-5">
          <div id="loading"></div>
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden p-100">
          <div className="flex justify-center py-3 px-5">
            <div className="container flex justify-center mx-auto">
              <div className="flex flex-col">
                <div className="w-full">
                  <div className="border-b border-gray-200 shadow">
                    <table>
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-2 text-lg text-gray-500">
                            Ngày
                          </th>
                          <th className="px-6 py-2 text-lg text-gray-500">
                            Upload
                          </th>
                          <th className="px-6 py-2 text-lg text-gray-500">
                            Download
                          </th>
                          <th className="px-6 py-2 text-lg text-gray-500">
                            Tổng data
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
