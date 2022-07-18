import React, {useEffect, useState} from "react";
import {useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";

export function HomePage() {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 4 /** The minimum number of symbols in GitHub username **/
    })

useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
}, [debounced, data])

    return (
        <div className="flex justify-center pt-5 mx-auto h-screen w-screen">
            {isError && <p className="text-center text-red-700">Something isn't right..</p>}
            <div className="relative w-[600px]">
                <input
                type="text"
                className="border py-4 px-4 w-full h-[50px] mb-4"
                placeholder=".. Search GitHub by User name"
                value={search}
                onChange={e => setSearch(e.target.value)}
                />

                {dropdown &&  <ul className="absolute top-[50px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
                    { isLoading && <p className="text-center">Loading..</p> }
                    { data?.map(user => (
                        <li
                        key={user.id}
                        className="py-2 px-4 hover:text-white transition-colors cursor-pointer"

                        >{user.login}</li>
                    ))}
                </ul>}
            </div>
        </div>
    )
}
