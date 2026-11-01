import './news.css';
import type {Article} from '../../../types/api.types';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLMetaElement;

        news.forEach((item, idx) => {
            const newsClone = (newsItemTemp?.content as unknown as DocumentFragment).cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const newsImgContainer = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (newsImgContainer) {
                newsImgContainer.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            }
            
            const newsMetaAuthorConteiner = newsClone.querySelector('.news__meta-author') as HTMLElement;
            if (newsMetaAuthorConteiner) {
                newsMetaAuthorConteiner.textContent = item.author || item.source.name;
            }
           
            const newsMetaDateContainer = newsClone.querySelector('.news__meta-date') as HTMLElement;
            if (newsMetaDateContainer) {
                newsMetaDateContainer.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            }
            
            const newsTitleContainer = newsClone.querySelector('.news__description-title');
            if (newsTitleContainer) {
                newsTitleContainer.textContent = item.title;
            }
            
            const newsDescriptionSourceContainer = newsClone.querySelector('.news__description-source') as HTMLElement;
            if (newsDescriptionSourceContainer) {
                newsDescriptionSourceContainer.textContent = item.source.name;
            }

            const newsDescriptionContainer = newsClone.querySelector('.news__description-content') as HTMLElement;
            if (newsDescriptionContainer) {
                newsDescriptionContainer.textContent = item.description;
            }

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
