export declare enum ApiStatus {
    Success = "ok",
    Error = "error"
}
export declare enum MethodsAllowed {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}
export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}
export interface NewsResponse {
    status: ApiStatus;
    totalResults?: number;
    sources?: Source[];
    articles?: Article[];
}
export type HttpCallback<T> = (data: T) => void;
export type Options = Record<string, string>;
//# sourceMappingURL=api.types.d.ts.map