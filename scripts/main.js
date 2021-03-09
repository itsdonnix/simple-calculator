(function () {
  "use strict";

  // States
  let firstInit = true,
    lastOperator = 0,
    result = 0;

  // DOM Elements
  const output = document.querySelector("output");
  const buttonsWrapper = document.querySelector(".buttons");

  buttonsWrapper.querySelectorAll("button").forEach((button) => {
    if (!isNaN(button.innerText)) {
      // Num buttons
      button.addEventListener("click", onNumButtonClicked);
    } else if (button.id === "button-clear") {
      button.addEventListener("click", onButtonClearClicked);
    } else if (button.id === "button-equal") {
      button.addEventListener("click", onButtonEqualClicked);
    } else {
      // Operator buttons
      button.addEventListener("click", onOperatorButtonClicked);
    }
  });

  /** @param {MouseEvent} event */
  function onNumButtonClicked(event) {
    const text = event.target.innerText;
    if (firstInit) {
      output.textContent = text;
      firstInit = false;
    } else {
      output.textContent += text;
    }
  }

  /** @param {MouseEvent} event */
  function onOperatorButtonClicked(event) {
    result = +output.innerText;
    lastOperator = +event.target.dataset.opId;
    clearLcd();
  }

  /** @param {MouseEvent} event */
  function onButtonEqualClicked(/* event */) {
    if (lastOperator == 0) return;
    if (lastOperator === 1) {
      result = result + +output.innerText;
    } else if (lastOperator === 2) {
      result = result - +output.innerText;
    } else if (lastOperator === 3) {
      result = result * +output.innerText;
    } else if (lastOperator === 4) {
      result = result / +output.innerText;
    }
    clearLcd();
    lastOperator = 0;
    output.innerText = result;
  }

  /** @param {MouseEvent} event */
  function onButtonClearClicked(/* event */) {
    output.innerText = 0;
    result = 0;
    lastOperator = 0;
    firstInit = true;
  }

  function clearLcd() {
    if (!firstInit) output.innerText = "";
  }
})();
