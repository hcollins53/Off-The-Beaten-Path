import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUsers } from "../auth/LoginProvider"
import { AddNewMessage } from "./MessageProvider"

export const MessageForm = () => {
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const[users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => {
            getUsers().then(
                (userArray) => {
                    setUsers(userArray)
                }
            )
        }, []
    )
    const[message, updateMessage] = useState({
        senderId: 0,
        receiverId: 0,
        body: "",
        date: ""
    })
    const handleSaveButtonClick =(event) => {
        event.preventDefault()
        const newMessage = {
            senderId: hikeUser.id,
            receiverId: message.receiverId,
            body: message.body,
            date: new Date().toLocaleString()
        }
        AddNewMessage(newMessage).then(
            () => {
                navigate("/messages")
            }
        )
    }
    return <>
    <form className="font-title pt-20 text-center h-screen flex flex-wrap justify-center">
        <div className="border-slate-500 border-2 w-96 pb-4 h-96 rounded-xl shadow-xl">
    <h2 className="text-2xl p-10">Send a new message</h2>
    <fieldset>
        <div className="pb-4">
            <label htmlFor="receiverId">Who are you wanting to send a message to?</label>
            <select 
                className="ml-2 rounded-lg border-slate-500 border-2 mt-2" 
                    onChange={
                    (evt) => {
                        const copy = {...message}
                        copy.receiverId = parseInt(evt.target.value)
                        updateMessage(copy)
                    }}>
                <option name= "receiverId">Choose a receiver</option>

                {
                users.map((users) => {
                   return (
                    <option 
                        value={users.id}> {users.fullName}</option> 
                   )})
            } 
         </select>
        </div>
    </fieldset>
    <fieldset>
        <div className="pb-10">
            <label htmlFor="body">What do you wish to say?</label>
            <input
                required autoFocus
                type="text"
                className="ml-2 rounded-lg border-slate-500 border-2"
                value={message.body}
                onChange={
                    (evt) => {
                        const copy = {...message}
                        copy.body = evt.target.value
                        updateMessage(copy)
                    }
                } />
        </div>
    </fieldset>
    <button 
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
         Send Message
    </button>
    </div>
    </form>
    </>
}