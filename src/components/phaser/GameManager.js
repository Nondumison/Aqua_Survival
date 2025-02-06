export default class GameManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
  }

  create() {
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

    console.log("Game Over!");
  }

  collectOctopus(player, octopus) {
    octopus.destroy();
    this.score += 1;

    if (this.score >= 5) {
      this.scene.spawnBubble(player.x, player.y);
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
}
