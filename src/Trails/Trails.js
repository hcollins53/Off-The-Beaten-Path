import { Link } from "react-router-dom"

export const Trails = ({id, trail}) => {

    return <>
    <article className="">
    <section className="mb-2 ml-4 flex flex-col shadow-lg">
    <Link to={`/trails/${id}`}>
        <img className="h-52 w-72 rounded-lg" src={trail.img}/>
        </Link>
        <div>
        <Link to={`/trails/${id}`}> {trail.name} </Link>
        </div>
    </section>
    </article>
    </>
}