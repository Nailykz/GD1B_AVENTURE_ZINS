var player;
var ennemis;
var items;
var coffres;
var fakecoffres;
var murs;
var keys;

var player_hp = 5;
var invincible = false;

var full_heart_1;
var full_heart_2;
var full_heart_3;
var full_heart_4;
var full_heart_5;
var empty_heart_1;
var empty_heart_2;
var empty_heart_3;
var empty_heart_4;
var empty_heart_5;

var argent;
var Thunder;
var canThunder = false;
var newThunder;
var newArgent;
var argent_compte;
var nombre_Argent = 0;
var argent_icon;
var gotsceptre = false;
var sceptre_icon;

var dash_icon;
var canDash = false;
var dash = 1;
var justDashed = false;

var trophee;
var hastrophee = false;

var moving = false;
var canCollect;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){   
        this.load.image('tiles', 'assets/tileset_placeholder.jpg');
        this.load.tilemapTiledJSON('map_1', 'map_1.json');
        this.load.spritesheet('player', 'assets/player.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('Argent', 'assets/monnaie.png'); 
        this.load.image('ennemi', 'assets/ennemi.png');
        this.load.image('chest', 'assets/chest.png');
        this.load.image('fakechest', 'assets/chest.png');
        this.load.spritesheet('player', 'assets/player.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('Thunder', 'assets/Thunder.png', {frameWidth: 37, frameHeight: 37});
        this.load.image('full_heart', 'assets/full_heart.png');
        this.load.image('empty_heart', 'assets/empty_heart.png');
        this.load.image('sceptre_icon', 'assets/sceptre.png');
        this.load.image('dash_icon', 'assets/dash.png');
        this.load.image('trophee', 'assets/trophee.png');
    }
    create(){
        
        const map = this.make.tilemap({key: 'map_1'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const terrain = map.createLayer('terrain', tileset, 0, 0);
        const bloquant = map.createLayer('bloquant', tileset, 0, 0);
        const zone = map.createLayer('zone', tileset, 0, 0);

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(500, 500, 'player');
        full_heart_1 = this.add.sprite(50,50, 'full_heart');
        full_heart_2 = this.add.sprite(100,50, 'full_heart');
        full_heart_3 = this.add.sprite(150,50, 'full_heart');
        full_heart_4 = this.add.sprite(200,50, 'full_heart');
        full_heart_5 = this.add.sprite(250,50, 'full_heart');
        
        empty_heart_1 = this.add.sprite(50,50, 'empty_heart').setVisible(false);
        empty_heart_2 = this.add.sprite(100,50, 'empty_heart').setVisible(false);
        empty_heart_3 = this.add.sprite(150,50, 'empty_heart').setVisible(false);
        empty_heart_4 = this.add.sprite(200,50, 'empty_heart').setVisible(false);
        empty_heart_5 = this.add.sprite(250,50, 'empty_heart').setVisible(false);
        
        argent_icon = this.add.sprite(350, 50, 'Argent').setScale(0.5);
        argent_icon.setScrollFactor(0);

        
        argent_compte = this.add.text(370, 35, nombre_Argent, { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        
        Thunder = this.physics.add.group();
        
        sceptre_icon = this.physics.add.sprite(50, 600, 'sceptre_icon');
        sceptre_icon.setScale(2);
        if (!canThunder){
            sceptre_icon.setVisible(false);
        }
        sceptre_icon.setScrollFactor(0);
        
        dash_icon = this.physics.add.sprite(100, 650, 'dash_icon');
        dash_icon.setScale(2);
        if (!canDash){
            dash_icon.setVisible(false);
        }
        dash_icon.setScrollFactor(0);
        
        trophee = this.physics.add.sprite(150, 700, 'trophee');
        trophee.setScale(2);
        if (!hastrophee){
            trophee.setVisible(false);
        }
        trophee.setScrollFactor(0);
        
        this.physics.add.collider(player, bloquant);
        this.physics.add.overlap(player, zone, changementZone, null, this);

        
        function changementZone(player, zone){
            if (player.y >= 650 && player.x >= 500 && player.x <= 700){
                this.scene.start("sceneFour"); //end
            }
            if (player.x >= 200 && player.x <= 250 && player.y >= 200 && player.y <= 250){
                this.scene.start("sceneThree"); //house
            }
            if (player.y <= 70){
                this.scene.start("sceneTwo"); //dash
            }
        }
        
        
        this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 2 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
        
        this.anims.create({
        key: 'Thunder_right',
        frames: this.anims.generateFrameNumbers('Thunder', { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'Thunder_left',
        frames: this.anims.generateFrameNumbers('Thunder', { start: 2, end: 2 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'Thunder_up',
        frames: this.anims.generateFrameNumbers('Thunder', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
        key: 'Thunder_down',
        frames: this.anims.generateFrameNumbers('Thunder', { start: 3, end: 3}),
        frameRate: 10,
        repeat: -1
        });
        
        
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });        
    }
    
    update(){         
            if (moving == true){
                moving = false;
            } 
            if (player_hp == 4){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
            }
            else if (player_hp == 3){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
            }
            else if (player_hp == 2){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
            }
            else if (player_hp == 1){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
            }
            else if (player_hp == 0){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
                full_heart_1.setVisible(false);
                empty_heart_1.setVisible(true);
            }    
        
            argent_compte.setText(nombre_Argent);
            if (canDash){
                    if (keys.shift.isDown && !justDashed){
                        justDashed = true;
                        dash = 3;
                        setTimeout(function(){dash = 1}, 600);
                    }
                    if (keys.shift.isUp){
                        justDashed = false;
                    }
                }
            if (!canThunder){
                    if (keys.right.isDown){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if (keys.left.isDown){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if (keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if (keys.up.isDown){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if (keys.down.isDown){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if (keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                }
        
            if (canThunder == true){
                
                    if (keys.right.isDown){
                        player.setVelocityX(200 * dash);
                        player.anims.play('right', true);
                    }
                    else if (keys.left.isDown){
                        player.setVelocityX(-200 * dash);
                        player.anims.play('left', true);
                    }
                    else if (keys.right.isUp && keys.left.isUp){
                        player.setVelocityX(0);
                    }
                    if (keys.up.isDown){
                        player.setVelocityY(-200 * dash);
                        player.anims.play('up', true);
                    }
                    else if (keys.down.isDown){
                        player.setVelocityY(200 * dash);
                        player.anims.play('down', true);
                    }
                    else if (keys.up.isUp && keys.down.isUp){
                        player.setVelocityY(0);
                    }
                    if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp){
                        canThunder = false;
                        player.setVelocity(0);
                        attaque(-32,0);
                        newThunder.anims.play('Thunder_left', true);
                        setTimeout(function(){newThunder.destroy()}, 200);
                        setTimeout(function(){canThunder = true}, 200);
                    }
                    if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp){
                        canThunder = false;
                        player.setVelocity(0);
                        attaque(32,0);
                        newThunder.anims.play('Thunder_right', true);
                        setTimeout(function(){newThunder.destroy()}, 200);
                        setTimeout(function(){canThunder = true}, 200);
                    }
                    if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp){
                        canThunder = false;
                        player.setVelocity(0);
                        attaque(0,-32);
                        newThunder.anims.play('Thunder_up', true);
                        setTimeout(function(){newThunder.destroy()}, 200);
                        setTimeout(function(){canThunder = true}, 200);
                    }
                    if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.left.isUp){
                        canThunder = false;
                        player.setVelocity(0);
                        attaque(0,32);
                        newThunder.anims.play('Thunder_down', true);
                        setTimeout(function(){newThunder.destroy()}, 200);
                        setTimeout(function(){canThunder = true}, 200);
                    }
                }
            }
        }
function attaque(x, y){
    newThunder = Thunder.create(player.x + x, player.y + y, 'Thunder');
}