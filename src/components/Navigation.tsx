import React from "react";
import {Link} from "react-router-dom";

export function Navigation() {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-600 text-white">
            <h3 className="font-bold">
                GitHub Search
            </h3>
            <span>
                <Link to = "/" className="mr-3">Home</Link>
                <Link to = "/favourite">Favourite</Link>
            </span>

        </nav>
    )
}
