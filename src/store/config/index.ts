import { createSlice } from '@reduxjs/toolkit'
import ModuleDefinition from './model/ModuleDefinition'
import { setIsMobile, setSidebarState } from './thunks'
import { setCurrentModule } from './thunks/setCurrentModule'

export interface ISidebarState {
    open: boolean
    type: 'general'
    float: boolean
}

interface IConfigState {
    isMobile: boolean
    sidebarState: ISidebarState
    currentModule: ModuleDefinition
}

const initialState: IConfigState = {
    isMobile: false,
    sidebarState: {
        open: true,
        type: 'general',
        float: false,
    },
    currentModule: new ModuleDefinition('info', 'index'),
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

        builder.addCase(setCurrentModule.fulfilled, (state, action) => {
            state.currentModule = action.payload
        })
    },
})

export * from './api'
export * from './model'
export * from './thunks'

export default configSlice.reducer
