import { createSlice } from '@reduxjs/toolkit'
import { setIsMobile, setSidebarState } from './thunks'

export type View = 'splash' | 'contact' | 'music'

export interface ISidebarState {
    open: boolean
    type: 'general'
    float: boolean
}

interface IConfigState {
    isMobile: boolean
    sidebarState: ISidebarState
    currentView: View
}

const initialState: IConfigState = {
    isMobile: false,
    sidebarState: {
        open: false,
        type: 'general',
        float: false,
    },
    currentView: 'splash',
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setIsMobile.fulfilled, (state, action) => {
            state.isMobile = action.payload
        })

        builder.addCase(setSidebarState.fulfilled, (state, action) => {
            state.sidebarState = action.payload
        })
    },
})

export * from './api'
export * from './model'
export * from './thunks'

export default configSlice.reducer
