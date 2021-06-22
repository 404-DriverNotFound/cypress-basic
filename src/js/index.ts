/* eslint-disable import/extensions */
/* eslint-disable no-new */
import Counter from './modules/Counter.js';

export default function App(): void {
  new Counter({ $app: document.querySelector('#app') });
}

App();
