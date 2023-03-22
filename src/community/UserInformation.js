import { useEffect, useState } from "react"
import { useParams, Link} from "react-router-dom"
import { getUserProfileById } from "../auth/LoginProvider"
import { GetUserWishListById } from "../Trails/TrailProvider"
import { getUserCompletedListById } from "../Trails/TrailProvider"


export const UserInformation = () => {
    const {userId} = useParams()
    const[userProfile, setUser] = useState({})
    const [wishList, setWishList] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(
        () => {
            getUserProfileById(userId).then(
                (data) => {
                    const singleUser = data[0]
                    setUser(singleUser)
                }
            )
        }, [userId]
    )
    useEffect(
        () => {
            GetUserWishListById(userId).then(
                (wishArray) => {
                    setWishList(wishArray)
            }
            ).then(
                getUserCompletedListById(userId).then(
                    (completedArray) => {
                        setCompleted(completedArray)
                    }
                )
            )
        }, []
    )
    return <>
    <article className="font-title text-center mx-auto pt-4 h-screen ">
        <div className="flex flex-col justify-center pb-10">
            <div className="text-3xl p-4">{userProfile?.user?.fullName}</div>
            <div className="">
                <img className="mx-auto rounded-full shadow-xl w-[150px] h-[150px]" src={userProfile.image} />
            </div>
            </div>   

        <div className="flex flex-row justify-evenly">
            <div>
            <div className="text-xl mb-4"> {userProfile?.user?.fullName}'s' Wishlist  </div>
            <div className="h-96 carousel carousel-vertical rounded-box">
                {
                    wishList.map(wish => {
                        return <div className="carousel-item h-80 m-4 p-6 flex flex-col rounded-xl border-black border-2 shadow-2xl  bg-silver w-auto " key={wish.id}>
                        <div className="mb-4 text-xl text-center">
                            <Link to={`/trails/${wish.trailId}`}>{wish?.trail?.name}</Link></div>
                        <div className="w-72 mx-auto"><img className="h-56 mx-auto" src={wish?.trail?.img}/></div></div>
                    })
                }
            </div>
            </div>
            <div>
            <div className="mb-4 text-xl"> {userProfile?.user?.fullName}'s' Completed List </div>
            <div className="h-96 carousel carousel-vertical rounded-box">
                {
                    completed.map(complete => {
                        return <section className="m-4 p-6 carousel-item h-80 rounded-xl border-black border-2 shadow-2xl flex w-auto flex-col bg-silver" key={complete.id}>
                            <div className="text-center text-xl mb-4">
                            <Link to={`/trails/${complete.trailId}`}>{complete?.trail?.name}
                            </Link>
                            </div>
                            <div className="w-[288px] mx-auto"><img  className="h-56 mx-auto" src={complete?.trail?.img}/></div>
                            </section>
                })
            }
            </div>
            </div>
            </div>
            <Link className="btn btn-justColor font-light m-6" to={`/posts/${userId}`}>
            {userProfile?.user?.fullName}'s Reviews
            </Link>
    </article>
    </>
}