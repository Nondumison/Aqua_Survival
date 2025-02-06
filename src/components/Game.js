import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import AquaSurvivalGame from "./phaser/AquaSurvivalGame";

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      scene: [AquaSurvivalGame],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      parent: "game-container",
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div
      id="game-container"
      ref={gameRef}
      style={{
        width: "80vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    />
  );
};

export default Game;
