import axios from "axios";
import ResponseCard from "./ResponseCard";
import "react-toastify/dist/ReactToastify.css";
import { users, invoiceTypes } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useEffect, useRef } from "react";
import ProfileAvatarDropdown from "./ProfileAvatarDropdown";

function InvoiceUpload({ username, setUsername, users }) {
  const [invoiceType, setInvoiceType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInvoiceDropdownOpen, setIsInvoiceDropdownOpen] = useState(false);
  const [isLoadingQuery, setIsLoadingQuery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [query, setQuery] = useState("");
  const responseRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUserSelect = (user) => {
    setUsername(user.name);
    setIsDropdownOpen(false);
  };

  const handleInvoiceTypeSelect = (type) => {
    setInvoiceType(type);
    setIsInvoiceDropdownOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("username", username);
    formData.append("invoice_type", invoiceType);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Uploaded Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Upload!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = async (event) => {
    event.preventDefault();
    setIsLoadingQuery(true);

    try {
      const apiResponse = await axios.post("http://localhost:8080/query", {
        query: query,
        username: username,
        invoice_type: invoiceType,
      });
      setResponse(apiResponse.data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingQuery(false);
    }
  };

  // Simulate typing animation
  useEffect(() => {
    if (response && responseRef.current) {
      let i = 0;
      const interval = setInterval(() => {
        responseRef.current.textContent = response.substring(0, i);
        i++;
        if (i > response.length) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [response]);

  return (
    <div className="flex">
      <div className="container mx-auto p-8 flex flex-col items-center justify-between min-h-screen">
        <ToastContainer />
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Invoice Upload
          </h1>{" "}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="invoiceType"
                className="block text-sm font-medium text-white-700 my-1"
              >
                Invoice Type:
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsInvoiceDropdownOpen(!isInvoiceDropdownOpen)
                  }
                  className="w-full bg-black text-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left inline-flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {invoiceType ? (
                    <div className="flex items-center">
                      {invoiceTypes.find(
                        (type) => type.value === invoiceType
                      ) ? (
                        <img
                          src={
                            invoiceTypes.find(
                              (type) => type.value === invoiceType
                            ).image
                          }
                          alt={invoiceType}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                      ) : null}{" "}
                      <span className="font-semibold">{invoiceType}</span>
                    </div>
                  ) : (
                    <span className="font-medium">Select Invoice Type</span>
                  )}
                </button>
                {isInvoiceDropdownOpen && (
                  <ul className="absolute z-10 w-full bg-black border border-gray-300 rounded-md shadow-sm mt-1">
                    {invoiceTypes.map((type) => (
                      <li
                        key={type.name}
                        onClick={() => handleInvoiceTypeSelect(type.value)}
                        className="hover:bg-blue-950 px-4 py-2 cursor-pointer flex items-center"
                      >
                        <img
                          src={type.image}
                          alt={type.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <span className="font-medium">{type.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-white-700 my-1"
              >
                Select File:
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              Upload
            </button>
          </form>
        </div>
        <div className="mt-auto">
          {" "}
          <div className="mt-auto w-[650px] max-w-[650px]">
            <div className="flex justify-center">
              <form
                onSubmit={handleQuerySubmit}
                className="w-full flex items-center"
              >
                <input
                  type="text"
                  placeholder="Enter your query"
                  value={query}
                  onChange={handleQueryChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-r-none h-12"
                />
                <button
                  type="submit"
                  className="h-[50px] bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-l-none h-12 ml-1"
                >
                  <img src="/search.png" alt="Search" className="h-7 w-8" />
                </button>
              </form>
            </div>
          </div>
          {response && <ResponseCard response={response} />}
        </div>
      </div>
    </div>
  );
}

export default InvoiceUpload;
