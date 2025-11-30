import { createAsyncThunk } from '@reduxjs/toolkit'
import { ISidebarState } from '..'

const setSidebarState = createAsyncThunk(
    'config/setIsSidebarVisible',
    (state: ISidebarState) => state,
)

export { setSidebarState }
