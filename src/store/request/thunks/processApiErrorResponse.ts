import { AppDispatch } from '#/store'
import { showErrorModal } from '#/store/error/thunks/showErrorModal'
import { ApiErrorResponse } from '#/store/request/model/ApiErrorResponse'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const processApiErrorResponse = createAsyncThunk(
    'axios/processApiErrorResponse',
    (error: ApiErrorResponse, thunkAPI) => {
        const dispatch = thunkAPI.dispatch as AppDispatch

        const messages: string[] = []

        if (error.response !== undefined) {
            error.response.data.errors.forEach((error) => {
                messages.push(error.message)
            })
        }

        void dispatch(showErrorModal(messages))
    },
)
