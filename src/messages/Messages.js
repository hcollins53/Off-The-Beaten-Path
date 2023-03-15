import {  useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserSentMessages } from "./MessageProvider"
import { getUserReceivedMessages } from "./MessageProvider"
import { MessageDetails } from "./MessageDetails"
import { getUserProfile } from "../auth/LoginProvider"
import { UserNamesListed } from "./LeftSide"

export const UserMessages = () => {
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const [userProfile, updateUserProfile] = useState({})
    const[sentMessages, updateSentMessages] = useState([])
    const[receivedMessages, updateReceivedMessages] = useState([])
    const[fullMessages, setFullMessages] = useState([])
    const[ isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState("")
    const[check, setCheck] = useState(true)
    const[usersDisplayed, setUsersDisplayed] = useState([])
    useEffect(
        () => {
            getUserProfile(hikeUser).then(
                (userData) => {
                    const singleUser = userData[0]
                    updateUserProfile(singleUser)
                })
        }, []
    )
    useEffect(
        () => {
            getUserSentMessages(hikeUser).then((sentMessagesArray) => {
                updateSentMessages(sentMessagesArray)
             })
            getUserReceivedMessages(hikeUser).then((receivedMessagesArray) => {
                updateReceivedMessages(receivedMessagesArray)
            })
            
        }, []
    )

    useEffect(() => {
        if (receivedMessages.length && sentMessages.length) {
            const newSentMessages = sentMessages.map(sentMessage => {
              const messages = receivedMessages.filter(receivedMessage => {
                return sentMessage.receiverId === receivedMessage.senderId;
              })
              messages.push(sentMessage)
              return messages;
            })
          
            const newReceivedMessages = receivedMessages.map(receivedMessage => {
              const messages = sentMessages.filter(sentMessage => {
                return receivedMessage.senderId === sentMessage.receiverId;
              })
              messages.push(receivedMessage);
              return messages;
            })
        //    const merged = [...newSentMessages, ...newReceivedMessages]
        //   console.log(merged)
            const mergedMessages = newSentMessages.concat(newReceivedMessages).reduce((acc, messages) => [...acc, ...messages], [])
            const uniqueMessages = mergedMessages.filter((message, index, array) => {
                for (let i = 0; i < index; i++) {
                  if (array[i].senderId === message.senderId && array[i].receiverId === message.receiverId && array[i].body === message.body) {
                    return false
                  }
                }
                return true
              })
            setFullMessages(uniqueMessages)
            setIsLoading(false)

}}, [receivedMessages, sentMessages])
     useEffect(
        () => {
            if(fullMessages.length) {
                const uniqueNames = fullMessages.filter((message, index, array) => {
                    for (let i = 0; i < index; i++) {
                      if (array[i].senderId === message.senderId && array[i].receiverId === message.receiverId || array[i].receiverId === message.senderId && array[i].senderId === message.receiverId ) {
                        return false
                      }
                    }
                    return true
                  })
                setUsersDisplayed(uniqueNames)
            }
        }, [fullMessages]
     ) 
     
    useEffect(
        () => {
            UserNameClicked()
        }, [id]
    )
    
        const UserNameClicked = (id) => {
            if(id) {
          setId(id)
          setCheck(false)
        } }  
   
    return <>
    <div className="w-screen h-screen overflow-hidden font-title">
    <div className="flex justify-start chat-bp:justify-center items-center h-screen"> 
    <div className="min-w-[340px] max-w-[500px] w-full h-full">
    <div className="flex flex-col border-r border-neutral-700 w-full h-screen pl-4">
        <div className="flex justify-between items-center h-[20px] p-3 mt-2">
        {
                userProfile ? <img src={userProfile.image} className="rounded-full w-[25px]" />
                : <img src="./logo.jpg" className="rounded-full w-[25px]" />
        }
        </div>
        <div className="flex justify-between items-center h-[60px] p-2">
            <input 
            type="text"
            placeholder="Search or start a new chat" 
            className="rounded-lg text-gray-500 text-sm font-light outline-none px-4 py-2 w-[400px] h-[35px] placeholder:text-sm placeholder:font-light"/>
         </div>
         <div className="">
       {
        isLoading && usersDisplayed.length ? ""
        : usersDisplayed.map(user => <UserNamesListed UserNameClicked={UserNameClicked} userToDisplay={user}/>)
       }
        <div className="text-center pt-2">
    { 
    <Link to="/message/create">
        Create a Message</Link>
        }
    </div>
    </div>
    </div>
    </div>
    
    <div className=" w-full h-screen">
    {
        check ? ""
        :  <MessageDetails fullMessages={fullMessages} userId={id} updateReceivedMessages={updateReceivedMessages} updateSentMessages={updateSentMessages}/>
    }
    </div>
    </div>
    </div>
    </>
}