import AppLoader from './appLoader';
import type { NewsResponse, HttpCallback } from '../../types/api.types';

class AppController extends AppLoader {
    public getSources(callback: HttpCallback<NewsResponse>) {
        super.getResp(
            'sources',
            {},
            callback
        );
    }

    public getNews(e: Event, callback: HttpCallback<NewsResponse>)  {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target?.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        'everything',
                        {
                        sources: sourceId,
                        },
                        callback
                    );
                }
                return;
            }
            target = target?.parentNode as HTMLElement;
        }
    }
}

export default AppController;
