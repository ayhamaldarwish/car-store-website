import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import CarList from "../components/CarList/CarList";
import AppStoreBanner from "../components/AppStoreBanner/AppStoreBanner";
import Contact from "../components/Contact/Contact";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <AppStoreBanner />
      <Contact />
    </>
  );
};

export default Home; 