import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AddNewWishList } from "./TrailProvider"
import { getTrailById } from "./TrailProvider"


export const TrailDetails = () => {
    const {trailId} = useParams()
    const [trail, updateTrail] = useState({})
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()
    useEffect(
        () => {
            getTrailById({trailId})
                .then((data) => {
                   const singleTrail = data[0]
                   updateTrail(singleTrail)
                })
        },
        [trailId]
    )
        const handleAddButton = (event) => {
            event.preventDefault()
            const AddWishList = {
                trailId: trailId,
                userId: hikeUser.id
            }

            AddNewWishList(AddWishList).then(
                response => response.json())
            .then(() => {
               navigate("/wishList")
            }) 
            
        }
    return <>
    <section>
        <h1>{trail.name}</h1>
        <div>
        length: {trail.length} miles
        </div>
        <div>
            Elevation Gain: {trail.elevationGain} ft
        </div>
        <div>
            Difficulty: {trail.difficulty}
        </div>
        <div>
            <img src={trail.img} />
        </div>
        <button
            onClick={(clickEvent) => handleAddButton(clickEvent)}
            className="btn btn-primary">
                Add To Wish List
        </button>
    </section>
    </>
}