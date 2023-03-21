import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getTrails } from "../Trails/TrailProvider"
import { AddNewProfile } from "./PostProvider"


export const UserProfileForm = () => {
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()
    const [trails, setTrails] = useState([])
    const [userProfile, update] = useState({
        userId: 0,
        image: "",
        favoriteHike: "",
        description: "",
        area: ""
    })
    useEffect(
        () => {
            getTrails()
             .then((trailsArray) => {
                setTrails(trailsArray)
             })
        },
        [] 
    )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newUserProfile = {
            userId: hikeUser.id,
        image: userProfile.image,
        favoriteHike: userProfile.favoriteHike,
        description: userProfile.description,
        area: userProfile.area
        }
        AddNewProfile(newUserProfile).then(
            () => {
                navigate("/profile")
                //how to rerender the navBar too
            }
        )
    }
    return <> 
    <article className="flex justify-center font-title h-screen">
    <form className="">
    <h2 className="text-center text-2xl p-4">Make a User Profile</h2>
    <div className="border-2 border-black shadow-xl rounded-xl p-10 bg-silver text-center">
    <fieldset className="mb-4">
        <div className="flex justify-center flex-col">
            <label htmlFor="image">Profile picture:</label>
            <input
                required autoFocus
                type="text"
                className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                placeholder="image URL"
                value={userProfile.image}
                onChange={
                    (evt) => {
                        const copy = {...userProfile}
                        copy.image = evt.target.value
                        update(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset className="mb-4">
        <div className="flex justify-center flex-col">
            <label htmlFor="favoriteHike">Favorite Hike:</label>
            <select 
                className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[220px]"
                    onChange={
                    (evt) => {
                        const copy = {...userProfile}
                        copy.favoriteHike = evt.target.value
                        update(copy)
                    }}>
                <option name= "favoriteHike">Choose a favorite hike</option>

                {
                trails.map((trail) => {
                   return (
                    <option 
                        value={trail.name}> {trail.name}</option> 
                   )
                })
            } 
                 </select>
        </div>
    </fieldset>
    <fieldset className="mb-4">
        <div className="flex justify-center flex-col">
            <label htmlFor="">Description:</label>
            <input type="text"
            className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                value={userProfile.description}
                onChange={
                    (evt) => {
                        const copy = {...userProfile}
                        copy.description = evt.target.value
                        update(copy)
                    }
                } />
        </div>
    </fieldset>
    <fieldset className="mb-4">
        <div className="flex justify-center flex-col">
            <label htmlFor="">Area You live in:</label>
            <input type="text"
            className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
                value={userProfile.area}
                onChange={
                    (evt) => {
                        const copy = {...userProfile}
                        copy.area = evt.target.value
                        update(copy)
                    }
                } />
        </div>
    </fieldset>
    <button 
     onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
     className="btn btn-justColor font-light">
        Save User Profile
    </button>
    </div>
</form>
</article>
</>
}