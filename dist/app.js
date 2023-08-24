import { Game } from "./modules/game.js";
document.addEventListener("DOMContentLoaded", function () {
    console.log("Start the game!");
    const counter = document.querySelector("#counter");
    const egg = document.querySelector("#egg");
    const result = document.querySelector("#result");
    const actionButton = document.querySelector("#action-btn");
    const game = new Game();
    game.init({
        actionButtonElement: actionButton,
        resultElement: result,
        counterElement: counter,
        eggElement: egg,
    });
});
