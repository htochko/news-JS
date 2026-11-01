import AppLoader from './appLoader';
import type { NewsResponse, HttpCallback } from '../../types/api.types';
declare class AppController extends AppLoader {
    getSources(callback: HttpCallback<NewsResponse>): void;
    getNews(e: Event, callback: HttpCallback<NewsResponse>): void;
}
export default AppController;
//# sourceMappingURL=controller.d.ts.map