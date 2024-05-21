"use client";
import { useState, useEffect } from "react";

import DashboardCtrl from "../dashboard-ctrl";

import MiddlerBannerAll from "../forms/middleBannerForms";
import SlidersAll from "../forms/sliderForms";
import PostForms from "../forms/postForms";
import CategoryForms from "../forms/categoryForms";

const MainDashboard = () => {
   const [contentChanger, setcontentChanger] = useState("midBan");
   const [details, setdetails] = useState(<MiddlerBannerAll />);
   useEffect(() => {
      if (contentChanger == "midBan") {
         setdetails(<MiddlerBannerAll />);
      } else if (contentChanger == "sliders") {
         setdetails(<SlidersAll />);
      } else if (contentChanger == "posts") {
         setdetails(<PostForms />);
      } else if (contentChanger == "categories") {
         setdetails(<CategoryForms />);
      }
   }, [contentChanger]);

   return (
      <div className=" flex justify-between items-start gap-4 container mx-auto">
         <DashboardCtrl setcontentChanger={setcontentChanger} />
         <div className=" w-full">{details}</div>
      </div>
   );
};

export default MainDashboard;
