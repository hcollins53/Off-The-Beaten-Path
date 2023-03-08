import { useEffect, useState } from "react"
import { getUsers } from "../auth/LoginProvider"
import { getReviews } from "./PostProvider"

export const Posts = () => {
    const[reviews, setReviews] = useState([])
    const [users, setUsers] = useState([])
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
    <h1>Community Posts</h1>
    <div>
    {
        reviews.map(review => {
            return <section>
                <div className="text=xl">{review.title}</div>
                <div className="w-72" > <img src={review.img} /></div>
                <div>{review.description}</div>
                <div>{review.rating}</div>
                <div>Posted by {review?.user?.fullName} on {review.date}</div>
            </section>
        })
    }
    </div>
    </>
}