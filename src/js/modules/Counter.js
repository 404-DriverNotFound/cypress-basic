/* eslint-disable no-param-reassign */
export default function Counter({ $app }) {
    const render = () => {
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
    const setEventListener = () => {
        const $minusButton = document.querySelector('.minus-button');
        const $plusButton = document.querySelector('.plus-button');
        const $countDisplay = document.querySelector('.count-display');
        $minusButton.addEventListener('click', () => {
            if (Number($countDisplay.value) > 8) {
                $countDisplay.value = String(Number($countDisplay.value) - 1);
            }
        });
        $plusButton.addEventListener('click', () => {
            if (Number($countDisplay.value) < 12) {
                $countDisplay.value = String(Number($countDisplay.value) + 1);
            }
        });
    };
    const init = () => {
        render();
        setEventListener();
    };
    init();
}
