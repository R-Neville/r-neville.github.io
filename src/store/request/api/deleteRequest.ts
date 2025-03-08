import { instance } from './instance'

export interface IDeleteRequest<A> {
    url: string
    params?: A
}

export async function deleteRequest<Params, Output>(
    args: IDeleteRequest<Params>,
): Promise<Output> {
    return instance
        .delete<Output>(`/api${args.url ?? ''}`, { params: args.params })
        .then((response) => {
            const result = response.data
            return result
        })
}
