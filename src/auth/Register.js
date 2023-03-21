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
            <form className="signIn p-4 mt-48" onSubmit={handleRegister}>
                <h1 className=" text-3xl item-center mb-4 border-b-2 border-gray-700">Please Register</h1>
                <fieldset  className="form-group" >
                    <label className="" htmlFor="fullName"> Name </label>
                    <input onChange={updateUser}
                           type="text" id="fullName" className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[200px]" required autoFocus />
                </fieldset>
                <fieldset className="mb-3">
                    <label className="" htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="mx-auto rounded-lg border-slate-500 border-2 mt-2 w-[200px] " required />
                </fieldset>
                <fieldset>
                    <button className="btn btn-justColor font-light btn-sm" type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
        </>
}