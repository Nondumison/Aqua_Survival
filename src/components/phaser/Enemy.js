import Phaser from "phaser";

export default class Enemy {
  constructor(scene) {
    this.scene = scene;
    this.enemy = null;
  }

  create() {
    const { worldWidth, worldHeight } = this.scene;
    this.enemy = this.scene.physics.add.sprite(
      Phaser.Math.Between(0, worldWidth),
      Phaser.Math.Between(0, worldHeight),
      "enemyFish"
    );
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setScale(0.6);
    this.move();
  }

  move() {
    this.enemy.setVelocity(
      Phaser.Math.Between(-100, 100),
      Phaser.Math.Between(-100, 100)
    );
    this.enemy.setFlipX(this.enemy.body.velocity.x < 0);

    this.scene.time.delayedCall(
      Phaser.Math.Between(1000, 3000),
      this.move.bind(this),
      [],
      this
    );
  }

  stop() {
    this.enemy.setVelocity(0, 0);
  }
}
