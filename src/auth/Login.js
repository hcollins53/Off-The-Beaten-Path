
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { getLogin } from "./LoginProvider";


export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getLogin( email )
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("hike_user", JSON.stringify({
                        id: user.id,
                    }))

                    navigate("/trails")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }
return(
    <main className="font-body w-screen h-screen image">
    <section className="flex justify-center pt-56">
        <form className="signIn" onSubmit={handleLogin}>
            <h2 className="signIn_h2">Please sign in</h2>
            <fieldset className="ml-4 mr-4">
                <label htmlFor="inputEmail"> Email address </label>
                <input type="email"
                    value={email}
                    onChange={evt => set(evt.target.value)}
                    className="form-control"
                    required autoFocus />
            </fieldset>
            <fieldset className="">
                <button type="submit" className="ml-24 btn rounded-full btn-sm btn-lion rounded mb-2">
                    Sign in
                </button>
            </fieldset>
            <section className="flex justify-center relative mb-2">
            <Link className="ml-48 underline text-sm" to="/register">Not a member yet?</Link>
        </section>
        </form>
    </section>
</main>
)
}
