import { getUserById } from "../auth/LoginProvider"
import { useEffect, useState } from "react"
import { getUserProfileById } from "../auth/LoginProvider"

export const MessageDetails = ({fullMessages, userId}) => {
    const[userProfile, updateUser] = useState({})
    const[isLoading, setIsLoading] = useState(true)
    const[myMessages, setMyMessages]= useState([])
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
       { let messages = fullMessages.map(fullMessage => fullMessage.filter(message => (message.receiverId === parseInt(userId) || message.senderId === parseInt(userId)))).filter(fullMessage => fullMessage.length)
        setMyMessages(messages)}
    }
    const SortMessages = () => {
       return myMessages[0]?.map(myMessage =>  {
         if(myMessage.senderId === parseInt(userId)) {
           return <div className="chat chat-start">
            <div className="mb-2 chat-bubble"> {myMessage.body} </div> <div className="chat-footer opacity-50">
            Delivered
            </div></div>
        }     
        else {
            return <div className="chat chat-end">
            <div className="mb-2 chat-bubble"> {myMessage.body} </div> <div className="chat-footer opacity-50">
            Delivered
            </div></div>
        }} )
    }
    return <> 
    <div className="ml-6 p-4 flex flex-col h-96 w-11/12 border-2 border-slate-500 bg-silver">
    <div className="h-100">
    <div className="flex flex-col h-72">
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
   <div>
    <input type="text" placeholder="Type a message"
    className="rounded-lg  placeholder:text-sm "
    />
   </div>
    </div>
    </>
}

