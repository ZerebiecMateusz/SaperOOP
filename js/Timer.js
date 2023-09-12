import { Ui } from "./Ui.js";

export class Timer extends Ui {
    #element = null;
    #interval = null;
    numberOfSecond = 0;
    maxNumberOfSeconds = 999;

    init() {
        this.#element = this.getElement(this.UiSelectors.timer)
    }

    #startTimer() {
        this.#interval = setInterval(() => this.#updateTimer(), 1000);
      }
      stopTimer() {
        clearInterval(this.#interval);
      }
    
      resetTimer() {
        this.numberOfSeconds = 0;
        this.#setTimerValue(this.numberOfSeconds);
        this.stopTimer();
        this.#startTimer();
      }
    

    #updateTimer() {
        this.numberOfSecond++;
        this.numberOfSecond <= this.maxNumberOfSeconds ?
        this.#setTimerValue(this.numberOfSecond) : this.stopTimer();
    }

    #setTimerValue(value) {
        this.#element.textContent = value;
    };
}