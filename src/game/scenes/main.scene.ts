
import {Cameras, GameObjects, Scene} from 'phaser';
import owely from '../../assets/owletMonster/Owlet_Monster_4.png';
import pinkey from '../../assets/pinkMonster/Pink_Monster_4.png';
import board from "../../board/Board";
import {AntColor} from "../../ant/AntColor";
import {AntStatus} from "../../ant/AntStatue";
import explosion1 from '../../assets/audio/ad79.mp3'
import explosion2 from '../../assets/audio/ad81.mp3'
import Ant from "../../ant/Ant";

export class MainScene extends Scene {
  private sprite!: GameObjects.Sprite;
  private pinkeyText!: GameObjects.Text;
  private owleyText!: GameObjects.Text;
  private camera!: Cameras.Scene2D.Camera;

  private explode!: any;

  private lastChange!: number;
  private delay: number = 400;

  private imageWidth: number = 32;
  private imageHeight: number = 32;

  private isClickMode = false;

  init() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor('#24252A');

    this.lastChange = 0;
  }

  preload() {

    this.load.spritesheet({
      key: 'pink',
      url: pinkey,
      frameConfig: {
        frameWidth: this.imageWidth,
        frameHeight: this.imageHeight
      }
    });

    this.load.spritesheet({
      key: 'owel',
      url: owely,
      frameConfig: {
        frameWidth: this.imageWidth,
        frameHeight: this.imageHeight
      }
    });

    this.load.audio('explode1', explosion1);
    this.load.audio('explode2', explosion2);
  }

  create() {
    const {centerX, centerY} = this.camera;
    this.anims.create({
      key: 'owel-idle',
      frames: this.anims.generateFrameNumbers('owel', {frames: [0, 1, 2, 3]}),
      frameRate: 10,
      repeat: 100
    });
    this.anims.create({
      key: 'owel-dead',
      frames: this.anims.generateFrameNumbers('owel', {frames: [4, 5, 6, 7, 8, 9, 10, 11]}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'owel-birth',
      frames: this.anims.generateFrameNumbers('owel', {frames: [9, 8, 7, 6, 5, 4]}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'pink-idle',
      frames: this.anims.generateFrameNumbers('pink', {frames: [0, 1, 2, 3]}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'pink-dead',
      frames: this.anims.generateFrameNumbers('pink', {frames: [4, 5, 6, 7, 8, 9, 10, 11]}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'pink-birth',
      frames: this.anims.generateFrameNumbers('pink', {frames: [9, 8, 7, 6, 5, 4]}),
      frameRate: 10,
      repeat: -1
    });

    this.input.on('pointerdown', () => {
      this.isClickMode = true;
    });

    this.input.on('pointerup', () => {
      this.isClickMode = false;
    });
    this.input.on('gameobjectover', (pointer: any, gameObject: any) => {
      if (this.isClickMode) {
        const ant: Ant = gameObject.getData("ant");
        ant.status = AntStatus.die;
        this.sound.play(ant.color === AntColor.Black ? 'explode1' : 'explode2', {
          name: 'punch',
          start: 0.5,
          duration: 1,
          config: {}
        });
      }
    });

    this.add.graphics()
      .fillStyle(0xffff00, 0.95)
      .lineStyle(5, 0xFF00FF, 1.0)
      .fillRoundedRect(10, 10, 300, 60, 10)
      .strokeRoundedRect(10, 10, 300, 60, 10)
      .setDepth(2);

    this.add.graphics()
      .fillStyle(0xffff00, 0.95)
      .lineStyle(5, 0xFF00FF, 1.0)
      .fillRoundedRect(this.scale.width - 310 , 10, 300, 60, 10)
      .strokeRoundedRect(this.scale.width - 310, 10, 300, 60, 10)
      .setDepth(2);

    this.pinkeyText = this.add.text(20, 20, "", {
      fontFamily: "Arial Black",
      fontSize: '30px',
      color: "#c51b7d"
    }).setStroke('#de77ae', 10).setDepth(2);
    this.owleyText = this.add.text(this.scale.width - 300, 20, "", {
      fontFamily: "Arial Black",
      fontSize: '30px',
      color: "#c51b7d"
    }).setStroke('#de77ae', 10).setDepth(2);

  }

  update() {
    const scale = 2;

    const time = arguments[0];
    if (this.lastChange + this.delay < time) {
      this.lastChange = time;
      let allSprites = this.children.list.filter(x => x instanceof Phaser.GameObjects.Sprite);
      allSprites.forEach(x => x.destroy());

      board.nextMove();

      let countBlack = 0;
      let countRed = 0;

      const ants = board.getStatus();

      console.log(ants.length);
      ants.map(ant => {
        const character = (ant.color === AntColor.Red) ? 'pink' : 'owel';
        if (ant.color === AntColor.Black){countBlack+=1}else{countRed+=1}

        switch (ant.status) {
          case AntStatus.birth:
            this.add.sprite(ant.posX * this.imageWidth * scale, ant.posY * this.imageHeight * scale, character)
              .setScale(scale)
              .setFlipX((Math.random() * 2) > 1.0)
              .play({key: character + '-birth', repeat: -1});
            break;
          case AntStatus.die:
            this.add.sprite(ant.posX * this.imageWidth * scale, ant.posY * this.imageHeight * scale, character)
              .setScale(scale)
              .setFlipX((Math.random() * 2) > 1.0)
              .play({key: character + '-dead', repeat: -1});
            break;
          default:
            this.add.sprite(ant.posX * this.imageWidth * scale, ant.posY * this.imageHeight * scale, character)
              .setFrame(Math.floor(Math.random() * 4))
              .setScale(scale * (0.7 + ((100 - ant.damage) / 300)))
              .setFlipX((Math.random() * 2) > 1.0)
              .play({key: character + '-idle', repeat: -1})
              .setDataEnabled()
              .setData('ant', ant)
              .setInteractive()

        }
      });
      this.owleyText.setText("Owley : " + countBlack);
      this.pinkeyText.setText("Pinkey : " + countRed);

    }

  }
}
