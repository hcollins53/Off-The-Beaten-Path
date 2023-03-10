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
    const [image, setClass] = useState("")
    const[icon, setIcon] =useState("")
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
    const getWeatherInformation = () => {
        if(trail.name) {
            getWeather(trail).then(
                (data) => {
                    setWeather(data)
                    setIcon(WeatherIcon(data?.weather?.[0]?.icon))
                }
            )}
    }
    useEffect(
        () => {
            getWeatherInformation()
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
    
        
       useEffect(
        () => {
            const backgroundImage = weather?.weather?.[0]?.main
            switch(backgroundImage) {
                case "Clear":
                   setClass("clear");
                   break;
                case "Clouds":
                    setClass("clouds");
                    break;
                case "Rain":
                    setClass("rain");
                    break;
                case "Fog":
                    setClass("fog");
                    break;
                case "Snow":
                    setClass("snow");
                    break;
                case "Thunderstorms":
                    setClass("thunderstorms");
                    break;   
            }

        }, [weather]
       )
           
    //   const handleReadMore = (event) => {
    //     event.preventDefault()
    //     detailsHTML()
    //   } 
    //   const detailsHTML = () => {
    //     <div>More information like trail conditions & directions from the interstate</div> 
    //   }     
    
    return <>
    <h1 className="text-4xl font-title text-center pt-10 font-bold">{trail.name}</h1>
    <article className="flex pt-16 justify-center">
    <section className="text-center font-body flex-col bg-platinum">
        <div className="group h-full w-full [perspective:1000px] ">
        <div className="relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <div className="w-72 mb-2 absolute inset-0">
            <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src={trail.img} />
        </div>
        <h1 className="text-xl mb-2">Sawtooth Lake and Alpine Peak h</h1>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/40 px-12 text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] ">
        <div className="flex min-h-full flex-col items-center justify-center font-title">
        <div className="mb-4">
        length: {trail.length} miles
        </div>
        <div className="mb-4">
            Elevation Gain: {trail.elevationGain} ft
        </div>
        <div className="mb-4">
            Difficulty: {trail.difficulty}
        </div>
        {/* <button
        onClick={(clickEvent) => handleReadMore(clickEvent)}
            >
            Read more
        </button> */}
        </div>
        </div>
        </div>
        </div>
    </section>
    <section className={`ml-32 text-center text-black shadow-2xl rounded-xl font-title font-bold p-4 w-80 mt-4 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] ${image}`}>
        <div className="bg-slate-100 bg-opacity-30">
      <div className="text-xl mb-10">{trail.name} </div>
       <div className="mb-4"> {weather?.weather?.[0]?.description} </div>
       <div className="ml-28 mb-4" > <img src={icon}/></div>
       <div className="text-5xl mb-14 " >{weather?.main?.temp}°F</div>
        <div className="mb-4">It feels like {weather?.main?.feels_like}°F</div>
        <div>The humidity is {weather?.main?.humidity}%</div>
        </div>
    </section>
    </article>
    <div className="flex justify-center">
        {/* {
            detailsHTML()
        } */}
    <button
            onClick={(clickEvent) => handleAddButton(clickEvent)}
            className="btn btn-primary mt-10">
                Add To Wish List
        </button>
        </div>
    </>
}

