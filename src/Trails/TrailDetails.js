import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getWeather } from "./TrailProvider"
import { AddNewWishList } from "./TrailProvider"
import { getTrailById } from "./TrailProvider"


export const TrailDetails = () => {
    const {trailId} = useParams()
    const [trail, updateTrail] = useState({})
    const [weather, setWeather] = useState({})
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
    useEffect(
        () => {
            getWeather(trail).then(
                (data) => {
                    setWeather(data)
                }
            )
        }, [trail]
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
        <div className="w-72">
            <img src={trail.img} />
        </div>
        <button
            onClick={(clickEvent) => handleAddButton(clickEvent)}
            className="btn btn-primary">
                Add To Wish List
        </button>
    </section>
    <section>
       Today's weather for {trail.name}
       <div> It has some {weather?.weather[0]?.description} </div>
       <div>The temperature is {weather?.main?.temp}°F</div>
        <div>It feels like {weather?.main?.feels_like}°F</div>
        <div>The humidity is {weather?.main?.humidity}%</div>
    </section>
    </>
}