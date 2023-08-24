import { Egg, EggState } from "./egg.js";

interface GameParams {
    counterElement: HTMLParagraphElement | null;
    eggElement: HTMLImageElement | null;
    resultElement: HTMLParagraphElement | null;
    actionButtonElement: HTMLButtonElement | null;
}

interface IGame extends GameParams {}

export class Game implements IGame {
    // nasze dictionary
    counterElement: HTMLParagraphElement | null = null;
    resultElement: HTMLParagraphElement | null = null;
    eggElement: HTMLImageElement | null = null;
    actionButtonElement: HTMLButtonElement | null = null;
    stopWatch: number | null = null;
    secondsPassed: number = 0;
    eggInstance: Egg = new Egg({
        clicksToHatch: 5,
        onEggHatch: this.hatchEgg.bind(this)
    });

    init(params: GameParams) {
        if (!params.counterElement || !params.eggElement) {
            throw new Error("One of elements not found");
        }

        this.counterElement = params.counterElement;
        this.eggElement = params.eggElement;
        this.resultElement = params.resultElement;
        this.actionButtonElement = params.actionButtonElement;

        this.displayEggClicks();
        this.mountEgg();

        console.log("Game started");
    }

    displayEggClicks() {
        if (!this.counterElement) {
            throw new Error("Counter element not found");
        }

        this.counterElement.innerText = String(this.eggInstance.eggClicks);
    }

    startStopWatch(){
        this.stopWatch = setInterval(() => {
            this.secondsPassed = this.secondsPassed + 100;
        }, 100);
    }

    showResetButton() {
        if (!this.actionButtonElement) {
            throw new Error("No action button element");
        }

        this.actionButtonElement.innerHTML = "Restart"
        this.actionButtonElement.classList.remove("hidden");
        this.actionButtonElement.addEventListener("click", () => this.restartGame());
    }

    hideResetButton() {
        if (!this.actionButtonElement) {
            throw new Error("No action button element");
        }
        this.actionButtonElement.classList.add("hidden");
        this.actionButtonElement.removeEventListener("click", () => this.restartGame());
    }

    restartGame() {
        this.secondsPassed = 0;
        this.displayResult();
        this.eggInstance.eggClicks = 0;
        this.displayEggClicks();
        this.displayEgg();
        this.hideResetButton();
    }

    stopStopWatch() {
        if (!this.stopWatch) {
            throw new Error ("Stopwatch not found");
        }

        clearInterval(this.stopWatch);
    }

    updateEggClick(){
        this.eggInstance.tapEgg();
        this.displayEggClicks();

        switch (this.eggInstance.eggClicks) {
            case 1:
                this.startStopWatch();
                break;
        }
    }

    displayEgg() {
        if (!this.eggElement) {
            throw new Error("Egg element not found");
        }

        const eggImageSrc = this.eggInstance.assets.get(EggState.Egg);

        if (!eggImageSrc) {
            throw new Error("Egg image src not found");
        }

        this.eggElement.src = eggImageSrc;
    }

    mountEgg() {
        if (!this.eggElement) {
            throw new Error("Egg element not found");
        }

        this.displayEgg();
        this.eggElement.addEventListener("click", this.updateEggClick.bind(this));
    }

    displayResult() {
        if (!this.resultElement) {
            throw new Error("Result element not found");
        }

        this.resultElement.innerText = !!this.secondsPassed ? (this.secondsPassed / 1000).toString() + " seconds" : "";
    }

    hatchEgg() {
        if (!this.eggElement) {
            throw new Error("Egg element not found");
        }

        const eggImageSrc = this.eggInstance.assets.get(EggState.Tamagotchi);

        if (!eggImageSrc) {
            throw new Error("Egg image src not found");
        }

        if (!this.resultElement) {
            throw new Error("Result element not found");
        }

        this.eggElement.src = eggImageSrc;

        this.displayResult();
        this.stopStopWatch();
        this.showResetButton();
    }
}