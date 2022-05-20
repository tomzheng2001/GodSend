import React, { useState } from "react";
import UserCard from "./UserCard";
import LogoutIcon from '@mui/icons-material/Logout';
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";

const SideBar = ({ setLoggedIn }) => {

    const { loading, error, data } = useQuery(GET_ALL_USERS)

    if (loading) {
        return 'Loading...';
    }

    if (error) return `Error! ${error.message}`;

    console.log(loading, error, data)

    return (
        <div className="sidebar">
            <h3 className="sidebar__heading">Chat</h3>
            <LogoutIcon onClick={() => {
                localStorage.removeItem('jwt')
                setLoggedIn(false)
            }} />
            <div className="sidebar__users">
                {
                    data.users.map(item => {
                        return <UserCard key={item.id} item={item} />
                    })
                }
            </div>
        </div>
    )
}

export default SideBar;