import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUsers } from "../auth/LoginProvider"


export const LeftSide = ({id, fullMessage}) => {
    const[users, setUsers] =useState([])
    const[user, updateUser] = useState({})
    
    // const[sentMessages, updateSentMessages] = useState([])
    // const[receivedMessages, updateReceivedMessages] = useState([])
    // let fullMessages = []
    useEffect(
        () => {
            getUsers().then(
                (userArray) => {
                    setUsers(userArray)
                })
        }, []
    )
    useEffect(
        () => {
            if(users.length)
           {let foundUser = findUser()
           updateUser(foundUser) }
        }, [users]
    )
        const findUser = () => {
           fullMessage.map(
            (message) =>
            {users.find(user => {
            return user.id === message.receiverId
            })}
           )}
        
    // sentMessages.map(sentMessage => {
    //    let messages = receivedMessages.filter(receivedMessage => (sentMessage.senderId === receivedMessage.receiverId))
    //    fullMessages.push(messages)
    // })
    // receivedMessages.map(
    //     receivedMessage => {
    //         let secondMessages = sentMessages.filter(sentMessage => (sentMessage.receiverId === receivedMessage.senderId))
    //         fullMessages.push(secondMessages)
    //     }
    // )
  console.log(user)
    return <> 
           <div>
          {
            user ? `${user.fullName}`
            : ""
          }
        </div>
    </>
}


// filter through sent and received messages to find the one that matches the userId not the hike user.
//add those to an array 