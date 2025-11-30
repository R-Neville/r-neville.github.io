import { createSlice } from '@reduxjs/toolkit'

const requestSlice = createSlice({
    name: 'request',
    initialState: {},
    reducers: {},
})

export * from './api'
export * from './model'
export * from './thunks'

export default requestSlice.reducer
