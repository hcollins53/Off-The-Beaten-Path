import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="font-body bg-lion flex row justify-evenly">
            <li>
            <Link className="navbar__link" to="/trails">Home</Link>
            </li>
            <li>
            <Link className="navbar__link" to="/todoList">Want</Link>
            </li>
            <li>
            <Link className="navbar__link" to="/completed">Completed</Link>
            </li>
            <li>
            <Link className="navbar__link" to="/community">Community</Link>
            </li>
             <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("travel_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
        </ul>
    )
}