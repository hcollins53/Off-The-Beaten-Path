import { useState, useEffect } from "react"
import { getUserProfile } from "../auth/LoginProvider"
import {  useNavigate } from "react-router-dom"
import { getTrails } from "../Trails/TrailProvider"
import { EditUserProfile } from "./PostProvider"


export const UserProfileEdit = () => {
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const [trails, setTrails] = useState([])
    const [userProfile, updateUserProfile] = useState({
            image: "",
            favoriteHike: "",
            description: "",
            area: ""
    })
    const navigate = useNavigate()
    useEffect(
        () => {
            getTrails()
             .then((trailsArray) => {
                setTrails(trailsArray)
             })
        },
        [] 
    )
    useEffect(
        () => {
            getUserProfile(hikeUser).then(
                (data) => {
                    const singleProfile = data[0]
                    updateUserProfile(singleProfile)
                })
        }, [])

    const handleSubmitEdit = (event) => {
        event.preventDefault()
        EditUserProfile(userProfile).then(() => {
            navigate("/profile")
        })
    }
    return <>
    <form className="">
            <h2 className="">Update User Profile</h2>
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
                                updateUserProfile(copy)
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
                                updateUserProfile(copy)
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
                                updateUserProfile(copy)
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
                                updateUserProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSubmitEdit(clickEvent)}
             className="btn btn-primary">
                Save Edit
            </button>
        </form>
    </>
}