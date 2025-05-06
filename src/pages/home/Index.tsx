import WhyUs from "../../components/WhyUs";
import { useGetBookQuery } from "../../redux/features/books/bookApi";
import LoadingPage from "../LoadingPage";
import Banner from "./Banner";
import BookSwiper from "./BookSwiper";
import Hero from "./Hero";
import WhyBookNest from "./WhyBookNest";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Stats from "./Stats";
import MembershipPlans from "./MembershipPlans";
import FAQ from "./FAQ";
import Newsletter from "./Newsletter";
// import Testimonial from "./Testimonial";

const Index = () => {
  const { isLoading, currentData } = useGetBookQuery("");

  if (isLoading) return <LoadingPage></LoadingPage>;
  const { data } = currentData;

  return (
    <div>
      <div className="">
        <Hero></Hero>
        <WhyBookNest></WhyBookNest>
        <HowItWorks></HowItWorks>
      </div>
      <div className="w-[80%] mx-auto mb-16">
        <BookSwiper
          data={data}
          title="Current Bestseller"
          types="bestSeller"
          key={"best1"}
        ></BookSwiper>
        <BookSwiper
          data={data}
          title="Top Rated Books"
          types="topRated"
          key={"top"}
        ></BookSwiper>
        
      </div>
      <Banner></Banner>
      <div className="w-[80%] mx-auto mb-10">
        <BookSwiper
          data={data}
          title="Limited Time Offer"
          types="limitedOffer"
          key={"offer"}
        ></BookSwiper>
      </div>
      <Testimonials />
      <Stats />
      <MembershipPlans />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Index;
