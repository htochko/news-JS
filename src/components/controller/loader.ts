// src/components/controller/loader.ts
import type { HttpCallback, NewsResponse, Options } from '../../types/api.types';
import { MethodsAllowed } from '../../types/api.types';


class Loader {
    private baseLink: string;
    private options: Options;
    
    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        endpoint: string, 
        options = {},
        callback: HttpCallback<NewsResponse>
    ): void {
        this.load(MethodsAllowed.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        const queryParams = new URLSearchParams();

        Object.entries(urlOptions).forEach(([key, value]) => {
            queryParams.append(key, value);
        });
        return `${this.baseLink}${endpoint}?${queryParams.toString()}`;
    }

    private load(method: MethodsAllowed, endpoint: string, callback: HttpCallback<NewsResponse>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;