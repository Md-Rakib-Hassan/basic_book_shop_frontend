import WhyUs from "../../components/WhyUs";
import { useGetBookQuery } from "../../redux/features/books/bookApi";
import LoadingPage from "../LoadingPage";
import Banner from "./Banner";
import BookSwiper from "./BookSwiper";
import Hero from "./Hero";
import WhyBookNest from "./WhyBookNest";
import HowItWorks from "./HowItWorks";
// import Testimonial from "./Testimonial";

const Index = () => {
  const { isLoading, currentData } = useGetBookQuery('');

  if(isLoading) return <LoadingPage></LoadingPage>
  const { data } = currentData;

  
  


    return (
        <div>
        <div className="">
          <Hero></Hero>
          <WhyBookNest></WhyBookNest>
          <HowItWorks></HowItWorks>
        <Banner></Banner>
      </div>
        <div className="w-[80%] mx-auto">
        <BookSwiper data={data} title="Current Bestseller" types="bestSeller" key={'best1'}></BookSwiper>
        <BookSwiper data={data} title="Top Rated Books" types="topRated" key={'top'}></BookSwiper>
          <BookSwiper data={data} title="" types="limitedOffer" key={'offer'}></BookSwiper>
          <WhyUs></WhyUs>

      </div>
        </div>
    );
};

export default Index;