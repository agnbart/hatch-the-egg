export enum EggState {
    Egg = "egg",
    Tamagotchi = "tamagotchi",
}

export class Egg {
    eggClicks: number = 0;
    assets = new Map([
        [EggState.Egg, "assets/egg.svg"],
        [EggState.Tamagotchi, "assets/tamagotchi.svg"],
    ]);

    tapEgg() {
        this.eggClicks++;
    }
}