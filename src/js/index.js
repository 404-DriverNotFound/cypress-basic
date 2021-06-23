/* eslint-disable import/no-unresolved */
/* eslint-disable no-new */
import Counter from './modules/Counter.js';
export default function App() {
    new Counter({ $app: document.querySelector('#app') });
}
App();
