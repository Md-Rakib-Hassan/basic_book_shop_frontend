import CustomerReview from "../../components/CustomerReview";
import NewsLater from "../../components/NewsLater";
import WhyUs from "../../components/WhyUs";
import { useGetBookQuery } from "../../redux/features/books/bookApi";
import LoadingPage from "../LoadingPage";
import Banner from "./Banner";
import BookSwiper from "./BookSwiper";
import Testimonial from "./Testimonial";

const Index = () => {
    const { isLoading, currentData } = useGetBookQuery('');
  if(isLoading) return <LoadingPage></LoadingPage>
    const { data } = currentData;
    return (
        <div>
            <div className="">
        <Banner></Banner>
      </div>
      <div className="w-[80%] mx-auto">
        <BookSwiper data={data} title="Current Bestseller" types="bestSeller" key={'best1'}></BookSwiper>
        <BookSwiper data={data} title="Top Rated Books" types="topRated" key={'top'}></BookSwiper>
          <BookSwiper data={data} title="" types="limitedOffer" key={'offer'}></BookSwiper>
          <WhyUs></WhyUs>
          {/* <Testimonial></Testimonial> */}
          <CustomerReview></CustomerReview>
          <NewsLater></NewsLater>
      </div>
        </div>
    );
};

export default Index;