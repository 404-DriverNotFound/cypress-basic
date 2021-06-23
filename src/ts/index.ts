import Counter from './modules/Counter.js';

export default function App() {
  new (Counter as any)({
    $app: document.querySelector('#app'),
  });
}

App();
