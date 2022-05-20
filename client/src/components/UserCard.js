import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ( {item: {firstName, lastName, id }}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/${id}/${firstName} ${lastName}`)} className="usercard">
            <img className="usercard__avatar" src={`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`} alt="test" />
            <h4 className="usercard__name">{firstName} {lastName}</h4>
        </div>
    )
}

export default UserCard;