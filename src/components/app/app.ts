import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { NewsResponse, Source, Article } from '../../types/api.types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.addEventListener('click', (e) => {
                this.controller.getNews(e, 
                    (data: NewsResponse) => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: NewsResponse) => this.view.drawSources(data));
    }
}

export default App;
