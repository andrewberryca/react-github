import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_FAV_KEY = 'RFK'

interface GithubState {
    favourite: string[]
}

const initialState: GithubState = {
    favourite: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourite.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourite))
        },

        removeFavourite(state, action: PayloadAction<string>) {
            state.favourite = state.favourite.filter(f => f !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourite))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer
