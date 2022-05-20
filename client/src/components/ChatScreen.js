import { useMutation, useQuery } from '@apollo/client';
import React,{useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GET_MESSAGES } from '../graphql/queries';
import MessageCard from './MessageCard';
import SendIcon from '@mui/icons-material/Send'
import { SEND_MESSAGE } from '../graphql/mutations';


const ChatScreen = () => {
  const {id,name} = useParams()
  const [text, setText] = useState()
  const [messages, setMessages] = useState([])
  const {loading, error , data} = useQuery(GET_MESSAGES, {
    variables: {
      receiverId: +id
    }, onCompleted(data) {
      setMessages(data.messagesByUser)
    }
  })
  const chatWindowRef = useRef(null)

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted(data) {
      setMessages((prevMessages) => [...prevMessages, data.createMessage])
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  })


  if (loading) {
    return 'Loading...';
}

  if (error) return `Error! ${error.message}`;
  
  return (
    <div className="ChatScreen">
        <div className="ChatScreen__heading">
            <img className="usercard__avatar" src={`https://avatars.dicebear.com/api/initials/${name}.svg`} alt="test" />
            <h2>{name}</h2>
        </div>
        <div ref={chatWindowRef} className="ChatScreen__messages">
            {
              messages.map(msg => {
                  return <MessageCard text={msg.text} date={msg.createdAt} direction={msg.senderId == id ? "start" : "end"} />
              })
            }

        </div>
        <div className="ChatScreen__enter">
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter a message" className="ChatScreen__enter-input" type="text" />
            <SendIcon fontSize="large" onClick = {() => {
              sendMessage({
                variables: {
                  receiverId: +id,
                  text: text
                }
              })
            }} />
        </div>
    </div>
  )
}

export default ChatScreen