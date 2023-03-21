import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getReview } from "./PostProvider"
import { EditUserPost } from "./PostProvider"



export const EditPost = () => {
    const navigate = useNavigate()
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const {reviewId} = useParams()
    const[rating, setRating] = useState(null)
    
    const[review, update] = useState({
        title: "",
        trailId: "",
        userId: "",
        description: "",
        rating: 0,
        img: "",
    })
    useEffect(
    () => {
        getReview(reviewId).then(
            (data) => {
                const singleReview = data[0]
                update(singleReview)
            }
        )
    },[]
  )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

       EditUserPost(review)
            .then(() => {
               navigate(`/posts/${hikeUser.id}`)
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
            <div className="border-2 border-black shadow-xl rounded-xl p-10 bg-silver text-center">
            <fieldset className="m-2">
                <div className="flex justify-center flex-col">
                    <label className="mb-2">Title of Post:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 "
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
            <fieldset className="m-4">
                <div className="flex justify-center flex-col">
                    <label htmlFor="description">Your thoughts on the trail: </label>
                    <input required autoFocus
                        type="text"
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[500px]"
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
            <fieldset className="m-4">
            <label className="mr-4" htmlFor="rating">How would you rate this trail out of 5:</label>
                <div className="rating">
                    <input type="radio" name="rating-2" value="1" className="mask mask-star bg-orange-400" onClick={handleRating} />
                    <input type="radio" name="rating-2" value="2" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    <input type="radio" name="rating-2" value="3" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    <input type="radio" name="rating-2" value="4" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    <input type="radio" name="rating-2" value="5" className="mask mask-star bg-orange-400" onClick={handleRating}/>
                    </div>    
            </fieldset>
            <fieldset className="m-4">
                <div className="flex justify-center flex-col">
                    <label htmlFor="image">Post a link to an image of the Trail:</label>
                    <input required autoFocus
                        type="text"
                        className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[300px]"
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
             className="btn btn-justColor font-light mt-2">
                Submit Edit
            </button>
            </div>
        </form>
        </article>
    )


}