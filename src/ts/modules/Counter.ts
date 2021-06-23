export default function Counter({ $app }: { $app: HTMLElement }) {
  let countValue = 10;
  let countDisplay: HTMLInputElement | null;

  const render = () => {
    $app.innerHTML = `
      <div class="container">
        <h1>ui counter</h1>
        <div class="counter">
          <a class="minus-button"><span>-</span></a>
          <input name="count" type="text" class="count-display" value="10">
          <a class="plus-button"><span>+</span></a>
        </div>
      </div>
    `;
  };

  const onPlusButtonClicked = () => {
    if (countValue < 12) {
      countValue += 1;
    }
    if (countDisplay) {
      countDisplay.value = countValue.toString();
    }
  };

  const onMinusButtonClicked = () => {
    if (countValue > 8) {
      countValue -= 1;
    }
    if (countDisplay) {
      countDisplay.value = countValue.toString();
    }
  };

  const init = () => {
    render();
    countDisplay = document.querySelector('.count-display');
    document.querySelector('.plus-button')?.addEventListener('click', onPlusButtonClicked);
    document.querySelector('.minus-button')?.addEventListener('click', onMinusButtonClicked);
  };

  init();
}
