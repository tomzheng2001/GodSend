import React from "react";

const MessageCard = ({text, date, direction}) => {
    return (
        <div style={{"display": "flex","justifyContent": `${direction}`}} className="MessageDir">
            <div className="MessageCard">
                <p className="MessageCard__text">{text}</p>
                <p className="MessageCard__date">{new Date(date).toLocaleTimeString()}</p>
            </div>
        </div>
    )
}

export default MessageCard;