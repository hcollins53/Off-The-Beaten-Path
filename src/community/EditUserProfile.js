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
    <form className="font-title text-center h-screen">
            <h2 className="text-2xl p-10">Update User Profile</h2>
            <fieldset>
                <div className="pb-4">
                    <label htmlFor="image">Profile picture:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="ml-2 rounded-lg border-slate-500 border-2"
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
                <div className="pb-4">
                    <label htmlFor="favoriteHike">Favorite Hike:</label>
                    <select 
                        className="ml-2 rounded-lg border-slate-500 border-2" 
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
                <div className="pb-4">
                    <label htmlFor="">Description:</label>
                    <input type="text"
                        className="ml-2 rounded-lg border-slate-500 border-2"
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
                <div className="pb-6">
                    <label htmlFor="">Area You live in:</label>
                    <input type="text"
                    className="ml-2 rounded-lg border-slate-500 border-2"
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
             className="btn btn-justColor font-light">
                Save Edit
            </button>
        </form>
    </>
}