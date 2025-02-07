export default class GameManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.scoreText = null;
    this.timer = 60;
    this.timerText = null;
    this.lives = 5;
    this.livesText = null;
  }

  create() {
    this.scoreText = this.scene.add.text(20, 20, `Score: ${this.score}`, {
      fontSize: "32px",
      fill: "#fff",
      fontFamily: "Arial",
    });

    this.timerText = this.scene.add.text(20, 60, `Timer:${this.timer}`, {
      fontSize: "32px",
      fill: "#fff",
      fontFamily: "Arial",
    });

    this.livesText = this.scene.add.text(20, 100, `Lives: ${this.lives}`, {
      fontSize: "32px",
      fill: "#fff",
      fontFamily: "Arial",
    });

    this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.scene.anims.create({
      key: "swim",
      frames: this.scene.anims.generateFrameNumbers("fish", {
        start: 0,
        end: 3,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.scene.cameras.main.setBounds(
      0,
      0,
      this.scene.worldWidth,
      this.scene.worldHeight
    );
    this.scene.cameras.main.startFollow(
      this.scene.player.player,
      true,
      0.05,
      0.05
    );
    this.scene.cameras.main.setZoom(1);

    this.scene.physics.add.collider(
      this.scene.player.player,
      this.scene.enemy.enemy,
      this.handleCollision,
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player.player,
      this.scene.octopus.octopusGroup,
      this.collectOctopus,
      null,
      this
    );
  }

  handleCollision() {
    this.scene.physics.pause();
    this.scene.player.stop();
    this.scene.enemy.stop();
    this.scene.octopus.stop();
    this.scene.backgroundFish.stop();

    this.scene.tweens.getTweens().forEach((tween) => tween.stop());
    this.scene.time.removeAllEvents();

    this.scene.player.player.setTint(0xff0000);
    this.scene.cameras.main.shake(500, 0.02);

    this.lives -= 1;
    this.livesText.setText(`Lives: ${this.lives}`);
    this.scene.sound.play("collisionSound");

    if (this.lives <= 0) {
      this.handleGameOver();
    } else {
      this.scene.player.player.setPosition(
        this.scene.worldWidth / 2,
        this.scene.worldHeight / 2
      );
    }
  }

  collectOctopus(player, octopus) {
    octopus.destroy();
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
    this.scene.sound.play("collectSound");

    if (this.score >= 5) {
      this.spawnBubble(player.x, player.y);
    }
  }

  spawnBubble(x, y) {
    const bubble = this.scene.bubblesGroup.create(x, y, "bubble");
    if (bubble) {
      bubble.setScale(0.8);
      this.scene.tweens.add({
        targets: bubble,
        y: y - 100,
        alpha: 0,
        duration: 1500,
        onComplete: () => bubble.destroy(),
      });
    }
  }
  updateTimer() {
    this.timer -= 1;
    this.timerText.setText(`Time: ${this.timer}`);

    if (this.timer <= 0) {
      this.handleGameOver();
    }
  }

  handleGameOver() {
    this.scene.physics.pause();
    this.scene.player.stop();
    this.scene.enemy.stop();
    this.scene.octopus.stop();
    this.scene.backgroundFish.stop();
    this.scene.backgroundMusic.stop();

    this.scene.add
      .text(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY,
        "Game Over!",
        {
          fontSize: "64px",
          fill: "#ff0000",
          fontFamily: "Arial",
        }
      )
      .setOrigin(0.5);
  }
}
