import {Game} from "./modules/game.js";

document.addEventListener("DOMContentLoaded", function () {

    console.log("Start the game!");

    const counter = document.querySelector(
        "#counter"
    ) as HTMLParagraphElement | null;
    const egg = document.querySelector("#egg") as HTMLImageElement | null;
    const result = document.querySelector("#result") as HTMLImageElement | null;
    const actionButton = document.querySelector("#action-btn") as HTMLButtonElement | null;

    const game = new Game();

    game.init({
        actionButtonElement: actionButton,
        resultElement: result,
        counterElement: counter,
        eggElement: egg,
    });
})