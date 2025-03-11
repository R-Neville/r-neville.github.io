import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
import config from './config'
import error from './error'
import request from './request'

const reducer = combineReducers({
    config,
    error,
    request,
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        if (import.meta.env.DEV) {
            return getDefaultMiddleware({ serializableCheck: false }).concat(
                logger,
            )
        }
        return getDefaultMiddleware({ serializableCheck: false })
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export * from './config'
export * from './error'
export * from './request'
