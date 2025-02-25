import React from "react";
import Models from "../components/Model/Models";
import Toolbar from "../components/Model/Toolbar";
import Header from "../components/Home/Header";

const DashboardModel =()=>{
    
    
    return(
        <>
            <Header showNavLinks={true} showAuthButtons={false} />

            <Models/>
            <Toolbar />
        </>
    )
}
export default DashboardModel;