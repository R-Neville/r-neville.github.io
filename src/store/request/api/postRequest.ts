import { instance } from './instance'

export interface IPostRequest<A, D> {
    url: string
    params?: A
    data: D
}

export async function postRequest<Params, Data, Output>(
    args: IPostRequest<Params, Data>,
): Promise<Output> {
    return instance
        .post<Output>(`/api${args.url ?? ''}`, args.data, {
            params: args.params,
        })
        .then((response) => {
            const result = response.data
            return result
        })
}
