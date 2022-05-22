import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React,{useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GET_MESSAGES } from '../graphql/queries';
import MessageCard from './MessageCard';
import { SEND_MESSAGE } from '../graphql/mutations';
import { MSG_SUB } from '../graphql/subscriptions';


const ChatScreen = () => {
  const {id,name} = useParams()
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const {loading, error , data} = useQuery(GET_MESSAGES, {
    variables: {
      receiverId: +id
    }, onCompleted(data) {
      setMessages(data.messagesByUser)
    }
  })
  const chatWindowRef = useRef(null)

  const [sendMessage] = useMutation(SEND_MESSAGE)

  const { data:subData } = useSubscription(MSG_SUB, {
    onSubscriptionData({subscriptionData:{data}}) {

        setMessages((prevMessages) => [...prevMessages, data.messageAdded])
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
      
    }
  })

  if (subData) console.log(subData)

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
                  return <MessageCard key={msg.id} text={msg.text} date={msg.createdAt} direction={msg.senderId == id ? "start" : "end"} />
              })
            }

        </div>
        <div className="ChatScreen__enter">
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter a message" className="ChatScreen__enter-input" type="text" />
            <button fontSize="large" onClick = {() => {
              sendMessage({
                variables: {
                  receiverId: +id,
                  text: text
                }
              })
            }}><span>send</span></button>
        </div>
    </div>
  )
}

export default ChatScreen