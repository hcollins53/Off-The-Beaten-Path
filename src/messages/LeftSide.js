import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUsers } from "../auth/LoginProvider"
import { getUserProfileById } from "../auth/LoginProvider"


export const UserNamesListed = ({ fullMessage, UserNameClicked}) => {
    const[users, setUsers] =useState([])
    const[user, setUser] = useState(null)
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const [userProfile, updateUserProfile] = useState({})
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
            if(users.length && fullMessage.length)
          {findUser()}
        }, [users, fullMessage]
    )
    useEffect(
        () => {
            if(user)
            {getUserProfileById(user.id).then(
                (userData) => {
                    const singleUser = userData[0]
                    updateUserProfile(singleUser)
                })}
        }, [user]
    )
        const findUser = () => {
            fullMessage.map(
                message => {
                    const sender = users.find((u) => u.id === message.senderId)
                    const receiver = users.find((u) => u.id === message.receiverId)
                    if (sender.id !== hikeUser.id) {
                        setUser(sender)
                        } else {
                        setUser(receiver)
                        }
        })}
    const handleClickUserName = (event) => {
        event.preventDefault()
        const value = event.target.value
        UserNameClicked(value)
    }

    return <> 
        <div className="flex flex-row py-2 border-b border-gray-700 hover:bg-silver">
            {
                userProfile ? <img className="rounded-full w-[25px] mr-2" src={userProfile?.image} />
                : ""
            }
           <div className="">
            { user ?
            <button 
            onClick={(clickEvent) => handleClickUserName(clickEvent)} value={user.id} >
          {
            user ? `${user.fullName}` 
            : ""
          }
          </button>
          : ""
        }
        </div>
        </div>
    </>
}


// filter through sent and received messages to find the one that matches the userId not the hike user.
//add those to an array 