import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { GetUserWishList } from "./TrailProvider"
import { getUserCompletedList } from "./TrailProvider"
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
    const[wishList, setWishList] = useState([])
    const[completedList, setCompletedList] = useState([])
    console.log(trailId)
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
            GetUserWishList(hikeUser).then(
                (wishArray) => {
                    setWishList(wishArray)
                }
            ).then(
                getUserCompletedList(hikeUser).then(
                    (completedArray) => {
                        setCompletedList(completedArray)
                    }
                )
            )
        },[]
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
                trailId: parseInt(trailId),
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
                case "Mist":
                    setClass("mist");
                    break; 
            }

        }, [weather]
       )
           
      
        const AddToWishListButton = () => {
            const filteredWishList = wishList.filter(wish => {
                return wish.trailId === parseInt(trailId)})
            const filteredCompletedList = completedList.filter(completed => {
                return completed.trailId === parseInt(trailId)})
          
            if (filteredWishList.length || filteredCompletedList.length) {
              return ""
            } else{
          
            return  (
                <button
                  onClick={(clickEvent) => handleAddButton(clickEvent)}
                  className="font-title btn-color2 mt-10 btn-sm">
                  Add To Wish List
                </button>
              )
            }
          }
    
    return <>
    <article className="h-screen">
    <h1 className="text-4xl font-title text-center pt-10 font-bold bg-paleDogwood">{trail.name}</h1>
    <section className="flex pt-16 justify-evenly">
    <section className="text-center font-body flex-col bg-paleDogwood">
        <div className="group h-full w-full [perspective:1000px] ">
        <div className="relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <div className="w-72 mb-2 h-full w-82 absolute inset-0">
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
       
        </div>
        </div>
        </div>
        </div>
    </section>
    <section className={` text-center text-black shadow-2xl rounded-xl font-title font-bold p-4 w-80 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] ${image}`}>
        <div className="bg-slate-100 bg-opacity-30">
      <div className="text-xl mb-10">{trail.name} </div>
       <div className="mb-4"> {weather?.weather?.[0]?.description} </div>
       <div className="ml-28 mb-4" > <img src={icon}/></div>
       <div className="text-5xl mb-14 " >{weather?.main?.temp}°F</div>
        <div className="mb-4">It feels like {weather?.main?.feels_like}°F</div>
        <div>The humidity is {weather?.main?.humidity}%</div>
        </div>
    </section>
    </section>
    <div className="flex justify-center">
       { AddToWishListButton()}
    
        </div>
        </article>
    </>
}

