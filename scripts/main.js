(function () {
  "use strict";

  // States
  let firstInit = true,
    lastOperator = 0,
    result = 0;

  // DOM Elements
  const output = document.querySelector("#output");
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
      output.value = text;
      firstInit = false;
    } else {
      output.value += text;
    }
  }

  /** @param {MouseEvent} event */
  function onOperatorButtonClicked(event) {
    if (!!output.value) {
      result = +output.value;
    }
    lastOperator = +event.target.dataset.opId;
    clearLcd();
  }

  /** @param {MouseEvent} event */
  function onButtonEqualClicked(/* event */) {
    if (lastOperator == 0) return;
    const currentNum = +output.value;
    if (lastOperator === 1) {
      result = result + currentNum;
    } else if (lastOperator === 2) {
      result = result - currentNum;
    } else if (lastOperator === 3) {
      result = result * currentNum;
    } else if (lastOperator === 4) {
      result = result / currentNum;
    }
    clearLcd();
    lastOperator = 0;
    output.value = result;
  }

  /** @param {MouseEvent} event */
  function onButtonClearClicked(/* event */) {
    output.value = 0;
    result = 0;
    lastOperator = 0;
    firstInit = true;
  }

  function clearLcd() {
    if (!firstInit) output.value = "";
  }
})();
