import { useEffect, useState } from "react"
import { getTrails } from "./TrailProvider"
import { Trails } from "./Trails"
import { Link, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet/src/layer/marker/Icon'

export const MapMarker = (trails) => {
   return trails.map(trail => {
    return <>
    
    <Marker  position={[trail?.lat, trail?.lon]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41]})}>
      <Popup className="font-title">
      <Link to={`/trails/${trail.id}`}> {trail.name} </Link>
      </Popup>
      </Marker>
    
      </>   
    })
      
    
  }



export const TrailList = ({searchTermState, sortByDifficulty, sortByMileage, sortByElevation}) => {
    const [trails, setTrails] = useState([])
    const[filteredTrails, setFilteredTrails] = useState([])
    const navigate = useNavigate()
   
    useEffect(
        () => {
            getTrails()
             .then((trailsArray) => {
                setTrails(trailsArray)
                setFilteredTrails(trailsArray)
             })
             
        },
        [] 
    )
    useEffect(
        () => {
            if(sortByDifficulty === ""){
                setFilteredTrails(trails)

            } else {
            const searchedTrails = trails.filter(trail => {
                return trail.difficulty.includes(sortByDifficulty)
            })
            setFilteredTrails(searchedTrails)
        }
        }, [sortByDifficulty]
    )
    useEffect(
        () => {
            if(sortByMileage === ""){
                setFilteredTrails(trails)

            } else {
            const searchedTrails = trails.filter(trail => {
               if(sortByMileage === "3"){
                    if(trail.length <= 3){
                        return trail
                    }
               } else if(sortByMileage === "6"){
                if(trail.length > 3 && trail.length <= 6){
                    return trail
                }
               }
               else if(sortByMileage === "6.1"){
                if(trail.length >= 6){
                    return trail
                }
               }
            })
            setFilteredTrails(searchedTrails)
        }
        }, [sortByMileage]
    )
    useEffect(
        () => {
            if(sortByElevation === ""){
                setFilteredTrails(trails)

            } else {
            const searchedTrails = filteredTrails.filter(trail => {
                if(sortByElevation === "700"){
                     if(trail.elevationGain <= 700){
                         return trail
                     }
                } else if(sortByElevation === "1500"){
                 if(trail.elevationGain > 700 && trail.elevationGain <= 1500){
                     return trail
                 }
                }
                else if(sortByElevation === "1501"){
                 if(trail.elevationGain >= 1500){
                     return trail
                 }
                }
             })
            setFilteredTrails(searchedTrails)
            }
        }, [sortByElevation]
    )
    useEffect(
        () => {
            if(searchTermState === "") {
                setFilteredTrails(trails)
            } else {
           const searchedTrails = filteredTrails.filter(trail => {
           return (trail.name.toLowerCase().startsWith(searchTermState.toLowerCase()))
        })
           setFilteredTrails(searchedTrails)
    
        }
    },
        [searchTermState]
    )
    function MyMapComponent() {
            return (
                <MapContainer center={[47.6588, -117.4260]} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            filteredTrails ?
          MapMarker(filteredTrails)
          :
          MapMarker(trails)
         }
        
        </MapContainer>
            )
    }
    return <>
        <article className="flex font-title h-screen">
        <article className=""> 
        <section className="overflow-auto overflow-y-scroll overflow-hidden h-3/4">
            {
                searchTermState || sortByDifficulty ?
                filteredTrails.map((trail) => <Trails key={trail.id} id={trail.id} trail={trail} /> )
                :
                filteredTrails.map((trail) => <Trails key={trail.id} id={trail.id} trail={trail} /> )
            }
        </section>
            <section>
            <Link className="underline text-blue pl-4" to="/create">Can't find the trail you're looking for? </Link>
        </section>
        </article>
        <section id="map" className="">
        {
            MyMapComponent()
        }
    </section>
    </article>
    </>
}