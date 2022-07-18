import React from "react";
import {useSearchUsersQuery} from "../store/github/github.api";

export function HomePage() {
    const {isLoading, isError, data} = useSearchUsersQuery('andrewberryca')

    console.log(data)
    return (
        <div>Home</div>
    )
}
