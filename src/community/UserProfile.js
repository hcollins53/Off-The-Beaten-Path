import { useState, useEffect } from "react"
import { getUserProfile } from "../auth/LoginProvider"
import { Link } from "react-router-dom"


export const UserProfile = () => {
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const [userProfile, updateUserProfile] = useState({})
    useEffect(
        () => {
            getUserProfile(hikeUser).then(
                (userData) => {
                    const singleUser = userData[0]
                    updateUserProfile(singleUser)
                })
        }, []
    )

    return <>
    {
        userProfile ? <article className="font-title text-center">
        <div className="text-2xl p-4">{userProfile?.user?.fullName}</div>
        <div className="flex justify-center pb-4">
            <img className="rounded-full shadow-xl w-60" src={userProfile.image} />
        </div>
        <div className="mb-2">Favorite hike: {userProfile.favoriteHike}</div>
        <div className="mb-2">How avid of a hiker are you: {userProfile.description}</div>
        <div className="mb-2">{userProfile.area}</div>
        <div>
            <Link to={`/profile/edit/${userProfile.id}`}>Edit Profile</Link>
        </div>
    </article>
    : <Link className="font-title flex justify-center pt-40 text-2xl" to={`/profile/create/${hikeUser.id}`}>Add User Profile</Link>
    }
    

    </>
}