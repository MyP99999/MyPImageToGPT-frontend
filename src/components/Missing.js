import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <article className="text-center border-2 border-black p-6 bg-gray-400">
                <h1 className="font-bold text-3xl">Oops!</h1>
                <p className="text-xl">Page Not Found</p>
                <div>
                    <Link to="/">
                        <p className="font-bold text-blue-600 text-xl">
                            Visit Our <span className="font-extrabold underline text-blue-700">Homepage</span> 
                        </p>
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default Missing
