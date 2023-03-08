import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { WeatherIcon } from "./TrailProvider"
import { getWeather } from "./TrailProvider"
import { AddNewWishList } from "./TrailProvider"
import { getTrailById } from "./TrailProvider"


export const TrailDetails = () => {
    const {trailId} = useParams()
    const [trail, updateTrail] = useState({})
    const [weather, setWeather] = useState({})
    const [image, setImage] = useState("")
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()
    
    useEffect(
        () => {
            getTrailById({trailId})
                .then((data) => {
                   const singleTrail = data[0]
                   updateTrail(singleTrail)
                }).then(
                    
                )
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
        const getIcon = WeatherIcon(weather?.weather?.[0]?.icon)
        const backgroundImage = weather?.weather?.[0]?.main
       
           
            switch(backgroundImage) {
                case "Clear":
                   setImage("https://img95.lovepik.com/photo/40109/1395.gif_wh300.gif");
                   break;
                case "Clouds":
                    setImage("https://media.tenor.com/2eVevYiek64AAAAM/scary-weather.gif");
                    break;
                case "Rain":
                    setImage("https://media.tenor.com/D8N2aMZtd4YAAAAC/rain.gif");
                    break;
                case "Fog":
                    setImage("https://media.tenor.com/5ImWLS5QAJgAAAAC/foggy-fog.gif");
                    break;
                case "Snow":
                    setImage("https://media.tenor.com/l2yp4uABNAQAAAAM/snow-falling.gif");
                    break;
                case "Thunderstorms":
                    setImage("https://i.pinimg.com/originals/95/50/61/9550611aa1fd2611b1d6f286a4e812bf.gif");
                    break;   
            }
    
    return <>
    <article className="flex mt-4">
    <section className="ml-8">
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
    <section className="ml-32 text-center shadow-lg rounded p-4" >
        <div><img src={image}/></div>
      <div className="text-xl mb-4">{trail.name} </div>
       <div className=""> {weather?.weather?.[0]?.description} </div>
       <div className="ml-28" > <img src={getIcon}/></div>
       <div className="text-5xl mb-2" >{weather?.main?.temp}°F</div>
        <div>It feels like {weather?.main?.feels_like}°F</div>
        <div>The humidity is {weather?.main?.humidity}%</div>
    </section>
    </article>
    </>
}

