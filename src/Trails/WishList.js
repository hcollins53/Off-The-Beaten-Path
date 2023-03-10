import { useEffect, useState } from "react"
import { getUser } from "../auth/LoginProvider"
import { AddNewCompletedToList } from "./TrailProvider"
import { GetUserWishList } from "./TrailProvider"
import { useNavigate } from "react-router-dom"
import { DeleteWish } from "./TrailProvider"

export const WishList = () => {
    const [wishList, setWishList] = useState([])
    const [user, updateUser] = useState({})
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    const navigate = useNavigate()

    const getWishList = () => {
        GetUserWishList(hikeUser).then(
            (wishArray) => {
                setWishList(wishArray)
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
        }} className="btn btn-primary">Delete</button>
    }
    
    return <>
    <div className="h-screen">
    <h1 className="text-3xl font-title text-center pt-6">{user?.fullName}'s Wish List</h1>
    <section className="font-title pt-10 flex flex-wrap justify-center">
        {
            wishList.map(wish => {
                return <section className="m-4 p-10 rounded-xl border-black border-2 shadow-2xl mb-10" key={wish.id}>
                    <div className="mb-4 text-xl text-center">{wish?.trail?.name}</div>
                    <div className="w-72 ml-2 mb-4 item-center"><img src={wish?.trail?.img}/></div>
                    <div>
                    <button onClick={(clickEvent) => handleAddToCompleted(clickEvent, wish)}
                    className="btn btn-primary ml-6 mr-4">
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