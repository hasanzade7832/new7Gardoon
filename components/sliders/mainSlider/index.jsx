import SliderDetails from "./sliderDetails";

const getData=async()=>{
   const data=await fetch("https://7gardoon-servers.liara.run/api/get-active-sliders",{cache:"no-store"});
   return data.json();
}

const MainSlider = async () => {
   const data=await getData();
   return (
      <SliderDetails data={data}/>
   );
}

export default MainSlider;