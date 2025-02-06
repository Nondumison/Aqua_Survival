import Phaser from "phaser";

export default class Octopus {
  constructor(scene) {
    this.scene = scene;
    this.octopusGroup = null;
  }

  create() {
    this.octopusGroup = this.scene.physics.add.group();
    this.scene.time.addEvent({
      delay: 2000,
      callback: this.spawn,
      callbackScope: this,
      loop: true,
    });
  }

  spawn() {
    const octopus = this.octopusGroup.create(
      Phaser.Math.Between(0, this.scene.worldWidth),
      Phaser.Math.Between(0, this.scene.worldHeight),
      "octopus"
    );
    octopus.setCollideWorldBounds(true);
    octopus.setScale(0.5);

    this.scene.tweens.add({
      targets: octopus,
      y: octopus.y - 5,
      yoyo: true,
      repeat: -1,
      duration: 500,
    });

    this.scene.time.delayedCall(8000, () => octopus.destroy());
  }

  stop() {
    this.octopusGroup.children.iterate((octopus) => {
      if (octopus.anims) octopus.anims.stop();
    });
  }
}
