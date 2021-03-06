import React from "react";
import UserCard from "./UserCard";
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
            {/* <h3 className="sidebar__heading">Chat</h3> */}
            <img className="sidebar__logo" src="/logo.png" alt="logo" />
            <div className="sidebar__users">
                {
                    data.users.map(item => {
                        return <UserCard key={item.id} item={item} />
                    })
                }
            </div>
            <button onClick={() => {
                localStorage.removeItem('jwt')
                setLoggedIn(false)
            }}><span>Sign Out</span></button>
        </div>
    )
}

export default SideBar;