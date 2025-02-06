import Phaser from "phaser";

export default class BackgroundFish {
  constructor(scene) {
    this.scene = scene;
    this.fishGroup = this.scene.physics.add.group();
  }

  create() {
    this.scene.time.addEvent({
      delay: 3000,
      callback: this.spawn,
      callbackScope: this,
      loop: true,
    });
  }

  spawn() {
    const fish = this.scene.physics.add.sprite(
      Phaser.Math.Between(0, this.scene.worldWidth),
      Phaser.Math.Between(0, this.scene.worldHeight),
      "fish"
    );
    fish.setVelocity(
      Phaser.Math.Between(-100, 100),
      Phaser.Math.Between(-100, 100)
    );
    fish.setCollideWorldBounds(true);
    fish.anims.play("swim", true);
    fish.setScale(0.2);

    this.fishGroup.add(fish);

    this.scene.time.delayedCall(8000, () => {
      fish.destroy();
      this.fishGroup.remove(fish);
    });
  }

  stop() {
    this.fishGroup.getChildren().forEach((child) => {
      if (child.anims) child.anims.stop();
    });
  }
}
