import { createAsyncThunk } from '@reduxjs/toolkit'

const setIsMobile = createAsyncThunk(
    'config/setIsMobile',
    (value: boolean) => value,
)

export { setIsMobile }
