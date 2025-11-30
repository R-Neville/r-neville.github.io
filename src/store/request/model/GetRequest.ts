import { IDeleteRequest } from '../api'

class GetRequest<P> implements IDeleteRequest<P> {
    url: string
    params: P

    constructor(url: string, params: P) {
        this.url = url
        this.params = params
    }
}

export { GetRequest }
