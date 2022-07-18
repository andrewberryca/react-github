import React from "react";
import {Repo} from "../models/models";

export function RepoCard ({repo}: {repo : Repo}) {
    return (
        <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-300 transition-all cursor-pointer">
            <a href={repo.html_url} target="_blank">
            <h2 className="text-lg font-bold">{repo.full_name}</h2>
            <p className="text-sm">
                Forks: <span className="font-bold mr-3">{repo.forks}</span>
                Watchers: <span className="font-bold">{repo.watchers}</span>
            </p>
            <p className="text-sm font-thin">{repo?.description}</p>
            </a>
        </div>
    )
}