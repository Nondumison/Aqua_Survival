export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.player = null;
  }

  create() {
    const { worldWidth, worldHeight } = this.scene;
    this.player = this.scene.physics.add.sprite(
      worldWidth / 2,
      worldHeight / 2,
      "playerFish"
    );
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.3);
  }

  update(cursors) {
    this.player.setVelocity(0);

    if (cursors.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.setRotation(Math.PI / 2);
      this.player.setFlipX(false);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(200);
      this.player.setRotation(-Math.PI / 2);
      this.player.setFlipX(false);
    } else if (cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.setRotation(0);
      this.player.setFlipX(false);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.setRotation(0);
      this.player.setFlipX(true);
    }
  }

  stop() {
    this.player.setTint(0xff0000);
    this.player.anims.stop();
  }
}
