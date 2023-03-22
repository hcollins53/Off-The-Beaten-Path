import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { GetUserWishList } from "./TrailProvider"
import { getSunriseOrSunsetTimes } from "./TrailProvider"
import { getAirQuality } from "./TrailProvider"
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
    const [sunrise, setSunrise] = useState("")
    const[sunset, setSunset] = useState("")
    const[airQuality, setAirQuality] = useState([])
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
            getSunriseOrSunsetTimes(trail).then(
                (timesObject) => {
                    const moment = require('moment');
                const timeString = timesObject.results.sunrise;
                const time24 = moment(timeString, 'h:mm:ss A').format('HH:mm:ss');
                    const utcDate = new Date(`January 1, 1970 ${time24} UTC`)
                    const sunrise = utcDate.toLocaleTimeString([], {timeZone: 'America/Los_Angeles'})
                    setSunrise(sunrise)
                    const timeString2 = timesObject.results.sunset;
                const time2 = moment(timeString2, 'h:mm:ss A').format('HH:mm:ss');
                    const utcDate2 = new Date(`January 1, 1970 ${time2} UTC`)
                    const sunset = utcDate2.toLocaleTimeString([], {timeZone: 'America/Los_Angeles'})
                    setSunset(sunset)
                })
            getAirQuality(trail).then(
                (airArray) => {
                    setAirQuality(airArray.data)
                }
            )
            
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
      
    const CheckAquisLevel = () => {
        if(airQuality?.current?.pollution?.aqius <= 50) {
            return <div className="flex flex-col justify-end mr-2">
                <img className ="w-12 mx-auto mb-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvfaa5iSyHpKCaM2knBZvbvUoZU4feWk8LQ&usqp=CAU"/>
                <div className="w-[200px] text-center">Air Quality is satisfactory and poses little or no risk</div>
            </div>
        } else if(airQuality?.current?.pollution?.aqius > 50 || airQuality?.current?.pollution?.aqius <= 100){
            return <div className="flex flex-col justify-end mr-2">
                <img className ="w-12 mx-auto mb-2" src="https://cdn3.vectorstock.com/i/1000x1000/90/02/yellow-sad-face-negative-people-emotion-icon-vector-14659002.jpg" />
                <div className="w-[200px] text-center">Sensitive groups should greatly reduce outdoor activity as they may experience respiratory symptoms</div>
            </div>
        }else if(airQuality?.current?.pollution?.aqius > 100 || airQuality?.current?.pollution?.aqius <= 150){
            return <div className="flex flex-col justify-end mr-2">
                <img className ="w-12 mx-auto mb-2" src="https://c8.alamy.com/zooms/9/03ebc19a77d742ae8e82810d4c19f75e/pftcjm.jpg" />
                <div className="w-[200px] text-center">General Public is at risk to experience irritation and respiratory problems. The public should greatly reduce outdoor activities</div>
            </div>
        }else if(airQuality?.current?.pollution?.aqius > 150 || airQuality?.current?.pollution?.aqius <= 200){
            return <div className="flex flex-col justify-end mr-2">
                <img className ="w-12 mx-auto mb-2" src="https://cdn0.iconfinder.com/data/icons/universal-web-mobile-3-4/65/297-512.png" />
                <div className="w-[200px] text-center">Increased likelihood of adverse effects and aggravation to the heart and lungs among general public</div>
            </div>
        }
    }
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
        <div>
        <label htmlFor="my-modal-3" className="btn btn-justColor font-light">Read more</label>
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
    <div>
    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal ">
  <div className="modal-box relative justify-between flex flex-row bg-silver">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div className="flex justify-evenly ">
        <div className="mr-10">
        <div className="flex flex-col">
        <img className="w-20 h-20 mb-2 rounded-full" src="https://i.pinimg.com/originals/5e/75/cc/5e75cc9a9fc5e901a4adf868395e2ddf.gif" />
         <div className="ml-2"> {sunrise} </div>
         </div>
        <div className="flex flex-col">
         <img className="w-20 h-20 rounded-full" src="http://31.media.tumblr.com/af2638122f8a0ffa58384a93b650336d/tumblr_mpagsu9jjs1sr77jco1_500.gif" />
         <div className="ml-2  ">
         {sunset}
        </div>
        </div>
        </div>
        <div className="my-auto">
     {
        CheckAquisLevel()
     }
 </div>
 <div className="flex flex-col justify-center">
 <div className="mb-4">
   Do I need a permit? {trail.permit}
 </div>
 <div>
    Fees: {trail.fees}
 </div>
 </div>
 </div>
  </div>
  </div>
    </div>
        </article>
    </>
}

