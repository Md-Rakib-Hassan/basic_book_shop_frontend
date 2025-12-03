import WhyUs from "../../components/WhyUs";
import { useGetAcademicBooksQuery, useGetAcademicFiltersQuery, useGetBookQuery, useGetFreeBooksQuery } from "../../redux/features/books/bookApi";
import LoadingPage from "../LoadingPage";
import Banner from "./Banner";
import BookSwiper from "./BookSwiper";
import Hero from "./Hero";
import WhyBookNest from "./WhyBookNest";
import HowItWorks from "./HowItWorks";
import Stats from "./Stats";
import FAQ from "./FAQ";
import Newsletter from "./Newsletter";
import AcademicZoneBanner from "./AcademicZoneBanner";
import FreeBookBanner from "./FreeBookBanner";
// import Testimonial from "./Testimonial";

const Index = () => {
  const { isLoading, currentData } = useGetBookQuery([{name:"sort",value:"latest"}]);
  const { isFreeBookLoading, data: freeBooks } = useGetFreeBooksQuery(null);
  const { data: academicBook, isLoading: academic } = useGetAcademicBooksQuery(null);
    const { currentData: insub, isLoading:insubLoading } = useGetAcademicFiltersQuery(null);
  


  if (isLoading || isFreeBookLoading || academic||insubLoading) return <LoadingPage></LoadingPage>;
  const { data } = currentData;
  const { userCount, bookCount } = insub?.data;
  
  // console.log(insub);

  // console.log(academicBook);

  return (
    <div>
      <div className="">
        <Hero userCount={userCount} bookCount={bookCount}></Hero>
        <FreeBookBanner books={freeBooks?.data}></FreeBookBanner>
        <WhyBookNest></WhyBookNest>
        <AcademicZoneBanner></AcademicZoneBanner>
        <HowItWorks></HowItWorks>
      </div>
      <div className="w-[80%] mx-auto mb-16">
        <BookSwiper
          data={data}
          title="Recent Books"
          types="books"
          key={"best1"}
        ></BookSwiper>
        <BookSwiper
          data={freeBooks.data}
          title="Free Books"
          types="freebook"
          key={"top"}
        ></BookSwiper>
        
      </div>
      <Banner></Banner>
      <div className="w-[80%] mx-auto mb-10">
        <BookSwiper
          data={academicBook?.data}
          title="Academic Book"
          types="academic"
          key={"offer"}
        ></BookSwiper>
      </div>
      <Stats userCount={userCount} bookCount={bookCount} />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Index;
