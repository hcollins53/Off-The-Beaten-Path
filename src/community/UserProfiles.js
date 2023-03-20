import { getUserProfiles } from "./PostProvider"
import { useState, useEffect } from "react"
import { EachProfile } from "./EachUserProfile"

export const UserProfiles = () => {
    const[userProfiles, setUserProfiles] = useState([])
    
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
            (userProfile) => <EachProfile id={userProfile.userId} userProfile={userProfile}/> )  
    }

  </article>
   </>
}