import { AxiosError } from 'axios'

export interface IApiError {
    message: string
}

export interface IApiErrorResponseData {
    errors: IApiError[]
}

export type ApiErrorResponse = AxiosError<IApiErrorResponseData>
