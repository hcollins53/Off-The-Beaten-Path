import { useEffect, useState } from "react"
import { getUser } from "../auth/LoginProvider"
import { AddNewCompletedToList } from "./TrailProvider"
import { GetUserWishList } from "./TrailProvider"
import { useNavigate, Link } from "react-router-dom"
import { DeleteWish } from "./TrailProvider"

export const WishList = () => {
    const [wishList, setWishList] = useState([])
    const [user, updateUser] = useState({})
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()
    const [screenHeight, setScreeHight] = useState("")

    const getWishList = () => {
        GetUserWishList(hikeUser).then(
            (wishArray) => {
                setWishList(wishArray)
                if(wishArray.length > 3){
                    setScreeHight("full")
                } else {
                    setScreeHight("screen")
                }
            })
    }
    useEffect(
      () => {
        getWishList()
        
      } , []
    )
    useEffect(
        () => {
            getUser(hikeUser).then(
                (userData) => {
                    const singleUser = userData[0]
                    updateUser(singleUser)
                }
            )
        }, []
    )
    const handleAddToCompleted = (event, wish) => {
        event.preventDefault()
        const AddCompleted = {
            trailId: wish?.trail?.id,
            userId: hikeUser.id,
            date: new Date()
        }

        AddNewCompletedToList(AddCompleted).then(
            response => response.json())
        .then(() => {
            DeleteWish(wish).then(() => {
                navigate("/completed")
            })
        }) 
    }
    const deleteButton = (wish) => {
        return <button onClick={() => {
            DeleteWish(wish).then(() => {
                   getWishList()
                })  
        }} className="btn-sm btn-color2">Delete</button>
    }
    
    return <>
    <div className={`h-${screenHeight}`}>
    <h1 className="text-3xl font-title text-center pt-6">{user?.fullName}'s Wish List</h1>
    <section className="font-title pt-10 flex flex-wrap justify-center">
        {
            wishList.map(wish => {
                return <section className="m-4 p-10 rounded-xl border-black border-2 shadow-2xl mb-10 bg-silver w-96 " key={wish.id}>
                    <div className="mb-4 text-2xl text-center">
                        <Link to={`/trails/${wish.trailId}`}>{wish?.trail?.name}</Link></div>
                    <div className="w-72 mb-4 item-center"><img src={wish?.trail?.img}/></div>
                    <div className="flex flex-row">
                    <button onClick={(clickEvent) => handleAddToCompleted(clickEvent, wish)}
                    className="btn-sm mr-2 btn-color2 ">
                        Completed Trail
                    </button>
                   {
                    deleteButton(wish)
                   }
                    </div>
                    </section>
            })
        }
    </section>
    </div>
    </>
}