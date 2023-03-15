import {  useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserProfileById } from "../auth/LoginProvider"
import { useRef } from 'react';
import { AddNewMessage } from "./MessageProvider";
import { getUserSentMessages } from "./MessageProvider";
import { getUserReceivedMessages } from "./MessageProvider";

export const MessageDetails = ({fullMessages, userId, updateReceivedMessages, updateSentMessages}) => {
    const[userProfile, updateUser] = useState({})
    const[isLoading, setIsLoading] = useState(true)
    const[myMessages, setMyMessages]= useState([])
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()
    useEffect(
        () => {
           if(userId) {
            getUserProfileById(userId).then(
                (data) => {
                    const singleUser = data
                    updateUser(singleUser)
                    setIsLoading(false)
                })}}, [userId]
    )
    useEffect(
        () => {
            getMessages()
        }, [userProfile]
    )
    const getMessages = () => {
        if(fullMessages.length)
       { let messages = fullMessages.filter(message => message.senderId === parseInt(userId) || message.receiverId === parseInt(userId))
        setMyMessages(messages)}
    }
    const SortMessages = () => {
       return myMessages?.map(message =>{
            if(message.senderId === parseInt(userId)) {
              return <div className="chat chat-start">
               <div className="mb-2 chat-bubble"> {message.body} </div> <div className="chat-footer opacity-50">
               Delivered
               </div></div>
           }     
           else {
               return <div className="chat chat-end">
               <div className="mb-2 chat-bubble"> {message.body} </div> <div className="chat-footer opacity-50">
               Delivered
               </div></div>
           }} )
        
    }
    const inputRef = useRef(null)

   const handleSendButtonClick = (event) => {
    event.preventDefault()
    const newMessage = {
        senderId: hikeUser.id,
        receiverId: parseInt(userId),
        body: inputRef.current.value,
        date: new Date().toLocaleString()
    }
    AddNewMessage(newMessage).then(
        getUserSentMessages(hikeUser).then((sentMessagesArray) => {
            updateSentMessages(sentMessagesArray)
         }).then(
        getUserReceivedMessages(hikeUser).then((receivedMessagesArray) => {
            updateReceivedMessages(receivedMessagesArray)
        })).then(
            getMessages()
        )
   
    )
}
   
    return <> 
    <div className="ml-6 p-4 flex flex-col h-96 w-11/12 border-2 border-slate-500 bg-silver h-full">
    <div className="h-full">
    <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center mb-4">
            {
                userProfile ? <img src={userProfile[0]?.image} className="h-[25px] rounded-full mr-4" />
                : ""
            }
            {
                userProfile ? `${userProfile[0]?.user?.fullName}`
                : ""
            }
        
        </div>
        <div>
       
        </div>
    <section className="">
    
    {
        SortMessages()
    }
     
    </section>
    </div>
    </div>
   <div className="flex justify-center">
    <input type="text" placeholder="Type a message"
    ref={inputRef}
    className="rounded-lg  placeholder:text-sm mr-4"
    />
    <button className="btn btn-sm btn-lightSand" 
    onClick={(clickEvent) => handleSendButtonClick(clickEvent)}
    >send</button>
   </div>
    </div>
    </>
}

