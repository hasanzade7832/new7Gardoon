"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AllPosts = ({ setmidBanDetCtrl, setrandNumForBannerClick }) => {
   const goTopCtrl = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };
   const [posts, setposts] = useState([-1]);

   const [numbersOfBtns, setnumbersOfBtns] = useState([-1]);
   const [filteredBtns, setfilteredBtns] = useState([-1]);
   const [pageNumber, setpageNumber] = useState(1);
   const [allPostsNumber, setallPostsNumber] = useState(0);
   const paginate = 10;

   useEffect(() => {
      axios
         .get(
            `https://7gardoon-servers.liara.run/api/posts?pn=${pageNumber}&&pgn=${paginate}`
         )
         .then((d) => {
            // console.log(d.data);
            setposts(d.data.GoalPosts);
            setnumbersOfBtns(
               Array.from(
                  Array(Math.ceil(d.data.AllPostsNum / paginate)).keys()
               )
            );
            setallPostsNumber(d.data.AllPostsNum);
         })
         .catch((e) => {
            toast.error("خطا در لود اطلاعات", {
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
            console.log(e);
         });
   }, [pageNumber]);

   useEffect(() => {
      if (numbersOfBtns[0] != -1 && numbersOfBtns.length>0) {
         const arr = [];
         numbersOfBtns.map((n) => {
            if (
               n == 0 ||
               (n < pageNumber + 1 && n > pageNumber - 3) ||
               n == numbersOfBtns.length - 1
            ) {
               arr.push(n);
            }
         });
         setfilteredBtns(arr);
      }
      else if(numbersOfBtns.length==0){
         setfilteredBtns([]);
      }
   }, [numbersOfBtns]);

   return (
      <div className=" flex flex-col gap-8">
         <div className=" flex justify-end">
            <div className=" w-32 h-10 rounded bg-indigo-500 flex justify-center items-center text-white">
               {allPostsNumber} پست
            </div>
         </div>
         <div className=" flex flex-col gap-6">
            {posts[0] == -1 ? (
               <div className=" flex justify-center items-center p-12">
                  <Image
                     alt="loading"
                     width={120}
                     height={120}
                     src={"/loading.svg"}
                  />
               </div>
            ) : posts.length < 1 ? (
               <div className=" flex justify-center items-center w-full p-8">
                  پستی موجود نیست...
               </div>
            ) : (
               posts.map((da, i) => (
                  <Box
                     setrandNumForBannerClick={setrandNumForBannerClick}
                     setmidBanDetCtrl={setmidBanDetCtrl}
                     key={i}
                     data={da}
                  />
               ))
            )}
         </div>
         <div className=" flex justify-center gap-4 items-center">
            {filteredBtns[0] == -1 ? (
               <div className=" flex justify-center items-center p-12">
                  <Image
                     alt="loading"
                     width={40}
                     height={40}
                     src={"/loading.svg"}
                  />
               </div>
            ) : (
               filteredBtns.map((da, i) => (
                  <button
                     className=" bg-indigo-500 text-white w-8 h-8 flex justify-center items-center rounded transition-all duration-500 hover:bg-orange-500"
                     onClick={() => {
                        setpageNumber(da + 1);
                        setposts([-1]);
                        goTopCtrl();
                     }}
                     key={i}
                  >
                     {da + 1}
                  </button>
               ))
            )}
         </div>
         <ToastContainer
            bodyClassName={() => "font-[shabnam] text-sm flex items-center"}
            position="top-right"
            autoClose={3000}
            theme="colored"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </div>
   );
};

export default AllPosts;
