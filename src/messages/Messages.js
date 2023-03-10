import {  useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserSentMessages } from "./MessageProvider"
import { getUserReceivedMessages } from "./MessageProvider"

export const UserMessages = () => {
    const[sentMessages, updateSentMessages] = useState([])
    const[receivedMessages, updateReceivedMessages] = useState([])
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
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
    return <>
    <Link to="/message/create">
        Create a Message</Link></>
}