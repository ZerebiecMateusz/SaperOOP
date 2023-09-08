import { Ui } from "./Ui.js";
export class ResetButton extends Ui {
    element = this.getElement(this.UiSelectors.resetButton)
    changeEmotion(emotion) {
        this.element.querySelector('use').setAttribute('href', `./assets/sprite.svg#${emotion}`);
    }
} 