import React from "react";
import {useAppSelector} from "../hooks/redux";

export function FavouritePage() {

    const {favourite} = useAppSelector(state => state.github)

    if (favourite.length === 0) return <p className="text-center">No items..</p>

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            <ul className="list-none">
                { favourite.map(f => (
                    <li key={f}>
                        <a href = {f} target="_blank">{f}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
