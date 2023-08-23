import { Egg, EggState } from "./egg.js";

interface GameParams {
    counterElement: HTMLParagraphElement | null;
    eggElement: HTMLImageElement | null;
}

interface IGame extends GameParams {}

export class Game implements IGame {
    // nasze dictionary
    counterElement: HTMLParagraphElement | null = null;
    eggElement: HTMLImageElement | null = null;
    stopWatch: number | null = null;
    secondsPassed: number = 0;
    eggInstance: Egg = new Egg();

    init(params: GameParams) {
        if (!params.counterElement || !params.eggElement) {
            throw new Error("One of elements not found");
        }

        this.counterElement = params.counterElement;
        this.eggElement = params.eggElement;

        this.displayEggClicks();
        this.mountEgg();

        console.log("this", this);
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
            this.secondsPassed++;
        }, 1000);
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

    mountEgg() {
        if (!this.eggElement) {
            throw new Error("Egg element not found");
        }

        const eggImageSrc = this.eggInstance.assets.get(EggState.Egg);

        if (!eggImageSrc) {
            throw new Error("Egg image src not found");
        }

        this.eggElement.src = eggImageSrc;
        this.eggElement.addEventListener("click", this.updateEggClick.bind(this));
    }
}