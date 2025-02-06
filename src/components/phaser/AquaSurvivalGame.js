import Phaser from "phaser";
import Player from "./Player";
import Enemy from "./Enemy";
import Octopus from "./Octopus";
import BackgroundFish from "./BackgroundFish";
import GameManager from "./GameManager";

export default class AquaSurvivalGame extends Phaser.Scene {
  constructor() {
    super({ key: "AquaSurvivalGame" });
  }

  preload() {
    this.load.image("background", "assets/underwater.png");

    this.load.spritesheet("fish", "assets/swim1.png", {
      frameWidth: 498,
      frameHeight: 327,
    });
    this.load.image("bubble", "assets/bubbles.png");
    this.load.image("playerFish", "assets/fish1.png");
    this.load.image("enemyFish", "assets/enemy.png");
    this.load.image("octopus", "assets/octopus.png");
  }

  create() {
    const { width, height } = this.scale;
    this.worldWidth = width * 1.5;
    this.worldHeight = height * 1.5;
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

    this.background = this.add
      .tileSprite(0, 0, this.worldWidth, this.worldHeight, "background")
      .setOrigin(0, 0);

    this.bubblesGroup = this.add.group();

    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.octopus = new Octopus(this);
    this.backgroundFish = new BackgroundFish(this);
    this.gameManager = new GameManager(this);

    this.player.create();
    this.enemy.create();
    this.octopus.create();
    this.backgroundFish.create();
    this.gameManager.create();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
    this.background.tilePositionY = this.cameras.main.scrollY * 0.5;

    this.player.update(this.cursors);
  }
}
