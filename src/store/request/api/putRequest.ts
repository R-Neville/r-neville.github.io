import { instance } from './instance'

export interface IPutRequest<A, D> {
    url: string
    params?: A
    data: D
}

export async function putRequest<Params, Data, Output>(
    args: IPutRequest<Params, Data>,
): Promise<Output> {
    return instance
        .put<Output>(`/api${args.url ?? ''}`, args.data, {
            params: args.params,
        })
        .then((response) => {
            const result = response.data
            return result
        })
}
