import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const RootLayout = () => {
    const {currentUser} = useSelector((state)=>state.currentUser);
    return (<>
        {currentUser !== undefined ? <div className="d-flex w-100 align-items-center">
            <h1 className="text-white ms-3">{currentUser.name}</h1>
                                        <Navigation />
                                    </div> 
            : <h1>Root</h1>}
        <Outlet />
    </>)
}

export default RootLayout