import { useEffect, useState } from "react"
import { getUsers } from "../auth/LoginProvider"
import { getReviews } from "./PostProvider"

export const Posts = () => {
    const[reviews, setReviews] = useState([])
    useEffect(
        () => {
            getReviews().then(
                (reviewsArray) => {
                    setReviews(reviewsArray)
                }
            )
        }, []
    )
    
    return<>
    <h1 className="text-center font-title text-2xl">Community Posts</h1>
    <div className="ml-4 font-title">
    {
        reviews.map(review => {
            return <section className="pl-4 border w-80">
                <div className="text=xl">{review.title}</div>
                <div className="w-72" > <img src={review.img} /></div>
                <div>{review.description}</div>
                <div>{review.rating}</div>
                <div className="mb-4">Posted by {review?.user?.fullName} on {review.date}</div>
            </section>
        })
    }
    </div>
    </>
}