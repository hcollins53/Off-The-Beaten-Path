import { useEffect, useState } from "react"
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
    //center image!!
    return<>
    <div className="h-full">
    <h1 className="text-center font-title text-4xl pt-10 pb-6">Community Posts</h1>
    <div className="font-title text-center flex flex-wrap justify-center">
    {
        reviews.map(review => {
            return <section className="p-4 m-10 border w-96 h-full ml-80 mr-80 flex flex-col border-2 border-black shadow-xl rounded-xl">
                <div className="text=2xl mb-2">{review.title}</div>
                <div className="w-80 mb-4 ml-6" > <img src={review.img} /></div>
                <div>{review.description}</div>
                <div>{review.rating}</div>
                <div className="mb-4">Posted by {review?.user?.fullName} on {review.date}</div>
            </section>
        })
    }
    </div>
    </div>
    </>
}