import Phaser from "phaser";
import Player from "./Player";
import Enemy from "./Enemy";
import Octopus from "./Octopus";
import BackgroundFish from "./BackgroundFish";
import GameManager from "./GameManager";

export default class AquaSurvivalGame extends Phaser.Scene {
  constructor() {
    super({ key: "AquaSurvivalGame" });
    this.gameStarted = false;
    this.startButton = null;
  }

  preload() {
    //this.load.image("background", "assets/underwater.png");
    this.load.image("background", "assets/bg1.webp");
    this.load.image("beach", "assets/bgbeach.png");
    this.load.image("heart", "assets/heart.png"); // Heart image
    this.load.spritesheet("fish", "assets/swim1.png", {
      frameWidth: 498,
      frameHeight: 327,
    });
    this.load.image("bubble", "assets/bubbles.png");
    this.load.image("playerFish", "assets/fish3.png");
    this.load.image("enemyFish", "assets/enemy.png");
    this.load.image("octopus", "assets/octopus.png");

    this.load.audio("backgroundMusic", "assets/background.mp3");
    this.load.audio("collectSound", "assets/collect.mp3");
    this.load.audio("collisionSound", "assets/collision.mp3");
  }

  create() {
    this.backgroundMusic = this.sound.add("backgroundMusic", { loop: true });

    const { width, height } = this.scale;
    this.worldWidth = width * 1.5;
    this.worldHeight = height * 1.5;

    // Add beach background (initially visible)
    this.beach = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "beach")
      .setOrigin(0.5);

    // Add underwater background (initially hidden)
    this.background = this.add
      .tileSprite(0, 0, this.worldWidth, this.worldHeight, "background")
      .setOrigin(0, 0)
      .setVisible(false); // Hide underwater background initially

    // Start button
    this.startButton = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 100,
        "Start Game",
        {
          fontSize: "48px",
          fill: "#fff",
          fontFamily: "Arial",
        }
      )
      .setOrigin(0.5)
      .setInteractive();

    this.startButton.on("pointerdown", () => {
      this.startButton.destroy(); // Remove the start button

      // Zoom and fade effect for the beach background
      this.tweens.add({
        targets: this.beach,
        scaleX: 2, // Zoom in horizontally
        scaleY: 2, // Zoom in vertically
        alpha: 0, // Fade out
        duration: 2000, // 2 seconds
        ease: "Linear",
        onComplete: () => {
          this.beach.destroy(); // Remove the beach background
          this.background.setVisible(true); // Show the underwater background
          this.backgroundMusic.play(); // Start background music
          this.startGame(); // Start the game after the transition
        },
      });
    });

    // Create animations
    this.anims.create({
      key: "swim",
      frames: this.anims.generateFrameNumbers("fish", {
        start: 0,
        end: 3,
      }),
      frameRate: 2,
      repeat: -1,
    });

    // Initialize groups (but don't create objects yet)
    this.bubblesGroup = this.add.group();
    this.player = new Player(this);
    this.enemy = new Enemy(this);
    this.octopus = new Octopus(this);
    this.backgroundFish = new BackgroundFish(this);
    this.gameManager = new GameManager(this);
  }

  startGame() {
    this.gameStarted = true;

    // Create game objects after the transition
    this.player.create();
    this.enemy.create();
    this.octopus.create();
    this.backgroundFish.create();
    this.gameManager.create();

    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set up physics world bounds
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
  }

  update() {
    if (!this.gameStarted) return;

    // Update underwater background position
    if (this.background && this.background.visible) {
      this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
      this.background.tilePositionY = this.cameras.main.scrollY * 0.5;
    }

    // Update player movement
    this.player.update(this.cursors);
  }
}
