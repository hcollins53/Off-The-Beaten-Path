import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AddNewReview } from "./PostProvider"

export const Review = () => {
    const navigate = useNavigate()
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const {trailId} = useParams()
    const[rating, setRating] = useState(null)
   
    const[review, update] = useState({
        title: "",
        trailId: "",
        userId: "",
        description: "",
        rating: 0,
        img: "",
        date: ""
    })
  
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newReview= {
            title: review.title,
            trailId: parseInt(trailId),
            userId: hikeUser.id,
            description: review.description,
            rating: rating,
            img: review.img,
            date: new Date().toLocaleDateString()
        }
       AddNewReview(newReview)
            .then(() => {
               navigate("/posts")
            }) 
    }
    const handleRating = (event) => {
        setRating(event.target.value)
        //setIsChecked(true)
    }
    return (
        <article className="flex justify-center">
        <form className="font-title h-screen">
            <h2 className="text-4xl pt-10 pb-10 text-center">Review this trail</h2>
            <div className="border-2 border-black shadow-xl rounded-xl p-10 bg-slate-200 text-center">
            <fieldset className="mb-2">
                <div className="form-group">
                    <label className="mb-2">Title of Post:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control mt-2 mx-auto"
                        value={review.title}
                        onChange={
                            (evt) => {
                                const copy = {...review}
                                copy.title = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="mb-2">
                <div className="form-group">
                    <label htmlFor="description">Your thoughts on the trail: </label>
                    <input required autoFocus
                        type="text"
                        className="form-control mt-2 mx-auto"
                        value={review.description}
                        onChange={
                            (evt) => {
                                const copy = {...review}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="mb-2">
            <label className="mr-4" htmlFor="rating">How would you rate this trail out of 5:</label>
                <div className="rating">
                    <input type="radio" name="rating-2" value="1" className="mask mask-star bg-orange-400" onClick={handleRating} />
                    <input type="radio" name="rating-2" value="2" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    <input type="radio" name="rating-2" value="3" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    <input type="radio" name="rating-2" value="4" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    <input type="radio" name="rating-2" value="5" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    </div>    
            </fieldset>
            <fieldset className="mb-4">
                <div className="form-group">
                    <label htmlFor="image">Post a link to an image of the Trail:</label>
                    <input required autoFocus
                        type="text"
                        className="form-control mt-2 mx-auto"
                        value={review.img}
                        onChange={
                            (evt) => {
                                const copy = {...review}
                                copy.img = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
             className="btn btn-justColor font-light">
                Submit New Review
            </button>
            </div>
        </form>
        </article>
    )

}

{/* <input required autoFocus
                        type="number"
                        className="form-control mt-2 ml-12"
                        value={review.rating}
                        onChange={
                            (evt) => {
                                const copy = {...review}
                                copy.rating = parseInt(evt.target.value)
                                update(copy)
                            }
                        } /> */}