import { getUserProfiles } from "./PostProvider"
import { useState, useEffect } from "react"

export const UserProfiles = () => {
    const[userProfiles, setUserProfiles] = useState([])
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    useEffect(
        () => {
            getUserProfiles().then(
                (profileArray) => {
                    setUserProfiles(profileArray)
                }
            )
        }
        )

    return <>
    <article className="flex flex-wrap flex-row justify-evenly">
    {   
        userProfiles.map(
            (userProfile) => {
                if(userProfile.userId !== hikeUser.id){
            return <section className="font-title text-center pt-10 h-screen w-[200px]">
            <div className="text-lg p-6">{userProfile?.user?.fullName}</div>
            <div className="flex justify-center pb-10">
                <img className="rounded-full shadow-xl w-[200px] h-[200px]" src={userProfile.image} />
            </div>
            <div className="mb-2">Favorite hike: {userProfile.favoriteHike}</div>
            <div className="mb-2 w-[200px]">How avid of a hiker are you: {userProfile.description}</div>
            <div className="mb-2">{userProfile.area}</div>
            </section>
                }
            })  
    }
  </article>
   </>
}