import { Link } from "react-router-dom"

export const EachProfile = ({id, userProfile}) => {
    const localHiker = localStorage.getItem("hike_user")
    const hikeUser = JSON.parse(localHiker)
    return (
        userProfile.userId !== hikeUser.id ? 
             <section className="font-title text-center pt-10 h-screen w-[200px]">
            <div className="text-lg p-6">{userProfile?.user?.fullName}</div>
            <div className="flex justify-center pb-10">
                <Link to={`/userProfile/${id}`}>
                <img className="rounded-full shadow-xl w-[200px] h-[200px]" src={userProfile.image} />
                </Link>
            </div>
            <div className="mb-2">Favorite hike: {userProfile.favoriteHike}</div>
            <div className="mb-2 w-[200px]">How avid of a hiker are you: {userProfile.description}</div>
            <div className="mb-2">{userProfile.area}</div>
            </section>
            : ""
        
    )  
}