import { AppDispatch } from '#/store'
import {
    ApiErrorResponse,
    GetRequest,
    deleteRequest,
    processApiErrorResponse,
} from '#/store/request'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface IPingParams {}

export const ping = createAsyncThunk('config/ping', async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch as AppDispatch

    const result = await deleteRequest<IPingParams, true>(
        new GetRequest<IPingParams>('/echo', {}),
    ).catch((error: ApiErrorResponse) => {
        void dispatch(processApiErrorResponse(error))
        return null
    })
})
