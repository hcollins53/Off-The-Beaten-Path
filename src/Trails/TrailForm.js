import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddNewTrail } from "./TrailProvider"


export const AddTrail = () => {
    const navigate = useNavigate()
    const[trail, update] = useState({
        name: "",
        length: "",
        elevationGain: "",
        difficulty: "",
        lat: "",
        lon: "",
        img: "",
        permit: "",
        fees: ""
    })
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newTrail= {
            name: trail.name,
            length: trail.length,
            elevationGain: trail.elevationGain,
            difficulty: trail.difficulty,
            lat: trail.lat,
            lon: trail.lon,
            img: trail.img,
            permit: trail.permit,
            fees: trail.fees
        }

       AddNewTrail(newTrail).then(
            response => response.json())
            .then(() => {
               navigate("/trails")
            }) 

    }
    return (
        <form className="font-title text-center h-screen">
            <h2 className="pt-6 text-2xl mb-4">Add New Trail</h2>
            <div className="border-2 border-black shadow-xl rounded-xl flex flex-col mx-auto p-10 bg-silver text-center w-[800px]">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-2"
                        placeholder="Name of the trail"
                        value={trail.name}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="length">How long is the trail:</label>
                    <input required autoFocus
                        type="number"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-2"
                        placeholder="length in miles"
                        value={trail.length}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.length = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="elevationGain">What is the elevation gain:</label>
                    <input required autoFocus
                        type="number"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-2"
                        placeholder="in feet"
                        value={trail.elevationGain}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.elevationGain = parseInt(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="difficulty">What is the difficulty:</label>
                    <input required autoFocus
                        type="text"
                        placeholder="difficulty"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-2"
                        value={trail.difficulty}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.difficulty = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lat">What is the latitude of the trail location:</label>
                    <input required autoFocus
                        type="number"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-2"
                        value={trail.lat}
                        placeholder="latitude"
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.lat = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lon">What is the longitude of the trail location:</label>
                    <input required autoFocus
                        type="number"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-2"
                        value={trail.lon}
                        placeholder="longitude"
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.lon = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Post a link to an image of the Trail:</label>
                    <input required autoFocus
                        type="text"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-4"
                        placeholder="URL of image"
                        value={trail.img}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.img = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Do you need a permit:</label>
                    <input required autoFocus
                        type="text"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-4"
                        placeholder="Yes or no/ a brief description"
                        value={trail.permit}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.permit = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">How much are the fees if there are any:</label>
                    <input required autoFocus
                        type="text"
                        className="ml-2 rounded-lg border-slate-500 border-2 mt-2 mb-6"
                        placeholder="amount"
                        value={trail.fees}
                        onChange={
                            (evt) => {
                                const copy = {...trail}
                                copy.fees = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="mx-auto btn btn-justColor font-light w-[200px]">
                Submit New Trail
            </button>
            </div>
        </form>
    )

}
