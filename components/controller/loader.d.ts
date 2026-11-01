import type { HttpCallback, NewsResponse, Options } from '../../types/api.types';
declare class Loader {
    private baseLink;
    private options;
    constructor(baseLink: string, options: Options);
    getResp(endpoint: string, options: {} | undefined, callback: HttpCallback<NewsResponse>): void;
    private errorHandler;
    private makeUrl;
    private load;
}
export default Loader;
//# sourceMappingURL=loader.d.ts.map