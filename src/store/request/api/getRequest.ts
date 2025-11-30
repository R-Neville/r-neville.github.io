import { instance } from './instance'

export interface IGetRequest<A> {
    url: string
    params?: A
}

export async function getRequest<Params, Output>(
    args: IGetRequest<Params>,
): Promise<Output> {
    return instance
        .get<Output>(`/api${args.url ?? ''}`, { params: args.params })
        .then((response) => {
            const result = response.data
            return result
        })
}
