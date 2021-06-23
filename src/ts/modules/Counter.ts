/* eslint-disable no-param-reassign */
export default function Counter({ $app }: { $app: HTMLDivElement | null }) {
  const render = (): void => {
    $app.innerHTML = `
       <div class="container">
          <h1>ui counter</h1>
          <div class="counter">
            <a href="#" class="minus-button"><span>-</span></a>
            <input name="count" type="text" class="count-display" value="10">
            <a href="#" class="plus-button"><span>+</span></a>
          </div>
        </div>`;
  };

  const onMinusButtonClicked = () => {
    const $countDisplay: HTMLInputElement = document.querySelector('.count-display');
    const num: number = Number($countDisplay.value);
    if (Number.isNaN(num) || num < 8 || num > 12) {
      $countDisplay.value = '10';
    } else if (num > 8) {
      $countDisplay.value = String(num - 1);
    }
  };

  const onPlusButtonClicked = () => {
    const $countDisplay: HTMLInputElement = document.querySelector('.count-display');
    const num: number = Number($countDisplay.value);
    if (Number.isNaN(num) || num < 8 || num > 12) {
      $countDisplay.value = '10';
    } else if (num < 12) {
      $countDisplay.value = String(num + 1);
    }
  };

  const setEventListener = () => {
    const $minusButton: HTMLAnchorElement = document.querySelector('.minus-button');
    const $plusButton: HTMLAnchorElement = document.querySelector('.plus-button');

    $minusButton.addEventListener('click', onMinusButtonClicked);
    $plusButton.addEventListener('click', onPlusButtonClicked);
  };

  const init = () => {
    render();
    setEventListener();
  };

  init();
}
