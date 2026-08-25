import Benchmark from "./ScoreChallenge/Benchmark/Benchmark";
import Features from "./ScoreChallenge/Features/Features";
import Footer from "./ScoreChallenge/Footer/Footer";
import Hero from "./ScoreChallenge/Hero/Hero";
import HowItWorks from "./ScoreChallenge/HowItWorks/HowItWorks";
import MenuCard from "./ScoreChallenge/Navbar/MenuCard";
import Navbar from "./ScoreChallenge/Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import DummyPage from "./ScoreChallenge/Navbar/DummyPage";

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
      const [isDummyOpen, setIsDummyPage] = useState(false)

  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} setIsDummyPage={setIsDummyPage}/>
      
      {isOpen && <MenuCard setIsDummyPage={setIsDummyPage} setIsOpen={setIsOpen}/>}
      {isDummyOpen && <DummyPage setIsDummyPage={setIsDummyPage}/>}
      <Hero />
      <Features />
      <HowItWorks />
      <Benchmark />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App;