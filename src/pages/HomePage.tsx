import React, {useEffect, useState} from "react";
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import {RepoCard} from "../components/RepoCards";

export function HomePage() {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 4, /** The minimum number of symbols in GitHub username **/
        refetchOnFocus: true
    })

    const [fetchRepos, {isLoading: reposLoading, data: repos}] = useLazyGetUserReposQuery()

useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
}, [debounced, data])

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    return (
        <div className="flex justify-center pt-5 mx-auto h-screen w-screen">
            {isError && <p className="text-center text-red-700">Something isn't right..</p>}
            <div className="relative w-[600px]">
                <input
                type="text"
                className="border py-4 px-4 w-full h-[40px] mb-4"
                placeholder=".. Search GitHub by User name"
                value={search}
                onChange={e => setSearch(e.target.value)}
                />

                {dropdown &&  <ul className="absolute top-[40px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
                    { isLoading && <p className="text-center">Loading..</p> }
                    { data?.map(user => (
                        <li
                        key={user.id}
                        onClick={() => clickHandler(user.login)}
                        className="py-2 px-4 hover:text-white transition-colors cursor-pointer"

                        >{user.login}</li>
                    ))}
                </ul>}
                <div className="container">
                    {reposLoading && <p className="text-center">Repos loading..</p>}
                    { repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
                </div>
            </div>
        </div>
    )
}
