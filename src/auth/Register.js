import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { findEmail } from "./LoginProvider"
import { getRegister } from "./LoginProvider"


export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        getRegister(user)
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("hike_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/trails")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        findEmail(user.email)
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return <>
    <div className="title">Off the Beaten Path</div>
        <main className="mb-4 font-title w-screen h-screen image"style={{ textAlign: "center" }}>
            <form className="signIn mt-48" onSubmit={handleRegister}>
                <h1 className=" text-3xl item-center mb-4 border-b-2 border-gray-700">Please Register</h1>
                <fieldset>
                    <label className="mr-4" htmlFor="fullName"> Name </label>
                    <input onChange={updateUser}
                           type="text" id="fullName" className="form-control" required autoFocus />
                </fieldset>
                <fieldset>
                    <label className="ml-4" htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control mr-4" required />
                </fieldset>
                <fieldset>
                    <button className="bg-slate-200 rounded-lg underline bg-opacity-80 mb-2" type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
        </>
}