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
    return <> <form className="">
    <h2 className="">Make a User Profile</h2>
    <fieldset>
        <div className="">
            <label htmlFor="image">Profile picture:</label>
            <input
                required autoFocus
                type="text"
                className="form-control"
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
    <fieldset>
        <div className="">
            <label htmlFor="favoriteHike">Favorite Hike:</label>
            <select 
                className="" 
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
    <fieldset>
        <div className="">
            <label htmlFor="">Description:</label>
            <input type="text"
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
    <fieldset>
        <div className="">
            <label htmlFor="">Area You live in:</label>
            <input type="text"
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
     className="btn btn-color2">
        Save User Profile
    </button>
</form></>
}