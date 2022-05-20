import React from "react";
import SideBar from "../components/SideBar";
import { Route, Routes } from 'react-router-dom'
import Welcome from "../components/Welcome";
import ChatScreen from "../components/ChatScreen";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/:id/:name" element={<ChatScreen />} />
        </Routes>
    )
}

const HomeScreen = ({ setLoggedIn }) => {
    return (
        <div className="Home">
            <SideBar setLoggedIn = {setLoggedIn} />
            <AllRoutes />
        </div>
    )
}

export default HomeScreen;