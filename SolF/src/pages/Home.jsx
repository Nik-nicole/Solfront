import React from "react";
import Header from "../components/Home/Header.jsx";
import ObjectiveSection from "../components/Home/Objetive";
import Welcome from "../components/Home/Welcome";
import Feature from "../components/Home/Feature.jsx";   
import Tools from "../components/Home/Tools.jsx";
import Footer from "../components/Home/Footer.jsx";

const Home = ({})=>{
    return(
        <>
    
        <Header/>
        <Welcome/>
        <ObjectiveSection/>
        <Feature/>
        <Tools/>
        <Footer/>
        
        
        </>
    ) 
}
export default Home;




