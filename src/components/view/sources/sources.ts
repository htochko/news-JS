import './sources.css';
import type { Source } from '../../../types/api.types';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLMetaElement;

        data.forEach((item) => {
            const sourceClone = (sourceItemTemp?.content as unknown as DocumentFragment)?.cloneNode(true) as DocumentFragment;;

            const sourceNameContainer = sourceClone.querySelector('.source__item-name');
            if (sourceNameContainer) {
                sourceNameContainer.textContent = item.name;
            }
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
