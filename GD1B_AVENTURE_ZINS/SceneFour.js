class SceneFour extends Phaser.Scene{
    constructor(){
        super("sceneFour");
    }
    init(data){
    }
    preload(){   
        this.load.tilemapTiledJSON('map_3', 'map_3.json');
    }
    create(){
        
        const map = this.make.tilemap({key: 'map_3'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const terrain = map.createLayer('terrain', tileset, 0, 0);
        const bloquant = map.createLayer('bloquant', tileset, 0, 0);
        const zone = map.createLayer('zone', tileset, 0, 0);
        const itemObjects = map.getObjectLayer('item').objects
        const ennemisObjects = map.getObjectLayer('ennemis').objects;

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(560, 80, 'player').setScale(.5);
        
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
            argent = this.physics.add.group({
            setScrollFactor : 0
        });
        argent_compte = this.add.text(370, 35, nombre_Argent, { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        
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
        
        items = this.physics.add.group();
        
        ennemis = this.physics.add.group();

        Thunder = this.physics.add.group();

        this.physics.add.collider(player, bloquant);
        this.physics.add.collider(player, items, collecteCoffre, null, this);
        this.physics.add.overlap(player, zone, changementZone, null, this);
        this.physics.add.collider(ennemis, bloquant);
        this.physics.add.collider(player, ennemis, hitOnPlayer, null, this);
        this.physics.add.overlap(Thunder, ennemis, cutCut, null, this);

        for (const item of itemObjects){
            items.create(item.x, item.y, 'chest')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }

        for (const ennemi of ennemisObjects){
            ennemis.create(ennemi.x, ennemi.y, 'ennemi')
                .setScale(0.2)
        }
        
        function collecteFauxCoffre(player, fakecoffres){
            fakecoffres.destroy();
            this.add.text(player.x+400, player.y+300, 'Un coffre vide', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }); 
        }

        function collecteCoffre(player, coffres){
            coffres.destroy();
            hastrophee = true;
            trophee.setVisible(true);
            this.add.text(player.x+400, player.y+300, 'Vous avez gagn??', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }); 
            this.physics.pause();
        }

        function changementZone(player, zone){
            if (player.x <= 600 && player.x >= 500 && player.y <= 50){
                this.scene.start("sceneOne");
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

function hitOnPlayer(player, ennemis){
    if (invincible == false){
        player_hp = player_hp - 2;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
            this.add.text(player.x+50, player.y+50, 'Vous ??tes mort', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        }   
        setTimeout(function(){invincible = false}, 1000);
    }
}

function cutCut(Thunder, ennemis){
    ennemis.destroy();
    newArgent = argent.create(ennemis.x, ennemis.y, 'Argent').setScale(0.3);
    newArgent.setAcceleration(0, -250);
    canCollect = false;
    setTimeout(function(){newArgent.setAcceleration(0,200)}, 300);
    setTimeout(function(){newArgent.setAcceleration(0,0); newArgent.setVelocityY(0); canCollect = true}, 1200);
}