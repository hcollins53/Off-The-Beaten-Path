import { useEffect, useState } from "react"
import { getReviews } from "./PostProvider"
import { Link } from "react-router-dom"

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
    const stars = {icon1:"★", icon2:"★★", icon3: "★★★", icon4:"★★★★", icon5:"★★★★★"}
        const StarAmounts = (rating) => {
            if(rating === 1){
                return stars.icon1
            }else if
                (rating === 2){
                    return stars.icon2
            } else if(rating === 3){
                return stars.icon3
            }else if(rating === 4){
                return stars.icon4
            }else if(rating === 5){
                return stars.icon5
            }
        }
    return<>
    <div className="h-full">
    <h1 className="text-center font-title text-4xl pt-10 pb-6">Community Posts</h1>
    <div className="font-title text-center flex flex-wrap justify-center">
    {
        reviews.map(review => {
            const starIcon = StarAmounts(review.rating)
            return <section className="p-4 m-10 border w-96 h-full ml-80 mr-80 flex flex-col border-2 border-black shadow-xl rounded-xl bg-silver">
                <div className="text=2xl mb-2">{review.title}</div>
                <div className="w-80 mb-4 mx-auto" >
                <Link to={`/trails/${review.trailId}`}> <img className="mx-auto" src={review.img} />
                </Link>
               </div>
                <div>{review.description}</div>
                <div>Rating: {starIcon} </div>
                <div className="mb-4">Posted by {review?.user?.fullName} on {review.date}</div>
            </section>
        })
    }
    </div>
    </div>
    </>
}