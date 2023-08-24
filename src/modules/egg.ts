export enum EggState {
    Egg = "egg",
    Tamagotchi = "tamagotchi",
}

interface EggParams {
    clicksToHatch: number;
    onEggHatch: () => void;
}

export class Egg {
    eggClicks: number = 0;
    // można ustawić na sztywno = 30, albo można sparametryzować w construktorze
    clicksToHatch: number;
    assets = new Map([
        [EggState.Egg, "assets/egg.svg"],
        [EggState.Tamagotchi, "assets/tamagotchi.svg"],
    ]);
    onEggHatch: () => void;

    constructor({clicksToHatch, onEggHatch} : EggParams) {
        this.clicksToHatch = clicksToHatch;
        this.onEggHatch = onEggHatch;
    }

    tapEgg() {
        if (this.eggClicks >= this.clicksToHatch) {
            return;
        }

        this.eggClicks++;

        if (this.eggClicks >= this.clicksToHatch) {
            this.onEggHatch();
        }
    }
}