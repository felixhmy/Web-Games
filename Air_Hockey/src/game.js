var game = {

    players:{
        p1:{
            x: null,
            y: null,
            score: null,
            body: null
        },
        p2:{
            x: null,
            y: null,
            score: null,
            body: null
        }
    },
    disco:{
        x: null,
        y: null,
        body: null
    },

    hoverMute: false,
    mins: null,
    secs: null,
    timeLeft: null,
    over: null,
    golp2: null,
    golp1: null,

    Start()
    {
        this.timeLeft = 300;
        audioAssets.musica.sound.volume = 0.1;
        this.players.p1.score = 0;
        this.players.p2.score = 0;
        this.mins = 5;
        this.secs = 0; 
        this.over = false;
        this.golp2 = false;
        this.golp1 = false;

        audioAssets.golpe.sound.volume = 1;
        audioAssets.golpe.sound.loop = false;

        audioAssets.gol.sound.volume = 0.5;
        audioAssets.gol.sound.loop = false;
        
        CreateWorld(ctx);

        CreateBox(world, (canvas.width / 2) / scale, 0, canvas.width / scale, 0.2, {type: b2Body.b2_staticBody, restitution: 0.1});
        CreateBox(world, (canvas.width / 2) / scale, canvas.height/scale, canvas.width / scale, 0.2, {type: b2Body.b2_staticBody, restitution: 0.1});
        CreateBox(world, 0, (canvas.height / 2) / scale, 0.2, canvas.height, {type: b2Body.b2_staticBody, restitution: 0.1});
        CreateBox(world, canvas.width / scale, (canvas.height / 2) / scale, 0.2, canvas.height, {type: b2Body.b2_staticBody, restitution: 0.1});

        this.disco.body = CreateCircle(world, (canvas.width / 2) / scale, (canvas.height / 2) / scale, 0.3, { restitution: 0.95 });
        this.players.p1.body = CreateCircle(world, 100 / scale, (canvas.height / 2) / scale, 0.4, { restitution: 0 });
        this.players.p2.body = CreateCircle(world, (canvas.width - 100) / scale, (canvas.height / 2) / scale, 0.4, { restitution: 0 });
    },

    Update(deltaTime)
    {   
        if(!this.over){
            this.secs = this.secs - deltaTime;
            this.timeLeft = this.timeLeft - deltaTime;
        }
        
        if(this.secs < 1 && !this.over){
            this.secs = 60;
            this.mins = this.mins - 1;
        }
        if(this.timeLeft <= 0){
            this.over = true;
            this.timeLeft = 0;
            this.mins = 0;
            this.secs = 0.1;
        }

        if(Input.mouse.x > canvas.width - 100 && Input.mouse.x < canvas.width - 25 && Input.mouse.y > 25 && Input.mouse.y < 100){
            this.hoverMute = true;
        }
        else{
            this.hoverMute = false;
        }
        
        if(this.hoverMute && Input.mouse.down){
            if(audioAssets.musica.sound.muted == false){
                audioAssets.musica.sound.muted = true;
                audioAssets.golpe.sound.muted = true;
                audioAssets.gol.sound.muted = true;
            }
            else{
                audioAssets.musica.sound.muted = false;
                audioAssets.golpe.sound.muted = false;
                audioAssets.gol.sound.muted = false;
            }
        }

        this.players.p1.x = this.players.p1.body.m_xf.position.x * scale;
        this.players.p1.y = this.players.p1.body.m_xf.position.y * scale;

        this.players.p2.x = this.players.p2.body.m_xf.position.x * scale;
        this.players.p2.y = this.players.p2.body.m_xf.position.y * scale;

        this.disco.x = this.disco.body.m_xf.position.x * scale;
        this.disco.y = this.disco.body.m_xf.position.y * scale;

        if(this.players.p1.x > canvas.width/2 - 30){
            this.players.p1.body.SetLinearVelocity(new b2Vec2(-0.75,0));
        }
        if(this.players.p2.x < canvas.width/2 + 30){
            this.players.p2.body.SetLinearVelocity(new b2Vec2(0.75,0));
        }
        
        world.Step(deltaTime, 8, 3);
        world.ClearForces();

        if(Input.IsKeyPressed(KEY_D)){
            this.players.p1.body.ApplyForce(new b2Vec2(5,0), new b2Vec2(5, 0));
        }
        if(Input.IsKeyPressed(KEY_W)){
            this.players.p1.body.ApplyForce(new b2Vec2(0,5), new b2Vec2(0, 5));
        }
        if(Input.IsKeyPressed(KEY_A)){
            this.players.p1.body.ApplyForce(new b2Vec2(-5,0), new b2Vec2(-5, 0));
        }
        if(Input.IsKeyPressed(KEY_S)){
            this.players.p1.body.ApplyForce(new b2Vec2(0,-5), new b2Vec2(0, -5));
        }

        if(Input.IsKeyPressed(KEY_RIGHT)){
            this.players.p2.body.ApplyForce(new b2Vec2(5,0), new b2Vec2(5, 0));
        }
        if(Input.IsKeyPressed(KEY_UP)){
            this.players.p2.body.ApplyForce(new b2Vec2(0,5), new b2Vec2(0, 5));
        }
        if(Input.IsKeyPressed(KEY_LEFT)){
            this.players.p2.body.ApplyForce(new b2Vec2(-5,0), new b2Vec2(-5, 0));
        }
        if(Input.IsKeyPressed(KEY_DOWN)){
            this.players.p2.body.ApplyForce(new b2Vec2(0,-5), new b2Vec2(0, -5));
        }

        if(this.disco.x < 60 || this.disco.x > canvas.width - 60 || this.disco.y < 60 || this.disco.y > canvas.height - 60){
            audioAssets.golpe.sound.play();
        }

        if(this.disco.x < 60 && this.disco.y > canvas.height/2 - 100 && this.disco.y < canvas.height/2 + 100 && !this.golp2){
            this.players.p2.score = this.players.p2.score + 1;
            this.golp2 = true;
            audioAssets.gol.sound.play();
        }
        if(this.disco.x > 60 || this.disco.y < canvas.height/2 - 100 || this.disco.y > canvas.height/2 + 100){
            if(this.golp2){
                this.golp2 = false;
            }
        }

        if(this.disco.x > canvas.width - 60 && this.disco.y > canvas.height/2 - 100 && this.disco.y < canvas.height/2 + 100 && !this.golp1){
            this.players.p1.score = this.players.p1.score + 1;
            this.golp1 = true;
            audioAssets.gol.sound.play();
        }
        if(this.disco.x < canvas.width - 60 || this.disco.y < canvas.height/2 - 100 || this.disco.y > canvas.height/2 + 100){
            if(this.golp1){
                this.golp1 = false;
            }
        }

        if(this.over){
            currentGameState = GAME_STATE.gameOver;
            Start();
        }
    },

    Draw(ctx)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(graphicAssets.tableroSprite.image, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(graphicAssets.player2Sprite.image, this.players.p1.x - 40, canvas.height - this.players.p1.y - 40, 80, 80);
        ctx.drawImage(graphicAssets.player1Sprite.image, this.players.p2.x - 40, canvas.height - this.players.p2.y - 40, 80, 80);
        ctx.drawImage(graphicAssets.discoSprite.image, this.disco.x - 30, canvas.height - this.disco.y - 30, 60, 60);
        
        //DrawWorldDebug(ctx);

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.font = "12px Arial";
        ctx.textAlign = "start";
        ctx.fillText("FPS=" + FPS, 25, 30);
        ctx.fillText("deltaTime=" + globalDT, 25, 45);
        ctx.fillText("currentFPS=" + (1/globalDT).toFixed(2), 25, 60);

        ctx.textAlign = "center";
        ctx.fillStyle = "#1d72b88c";
        ctx.font = "72px Arial";
        ctx.fillText(this.players.p1.score, canvas.width / 4, 100);

        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillText(this.players.p2.score, canvas.width / 4 * 3, 100);

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        if(this.secs < 10){
            ctx.fillText("0" + this.mins + ":0" + Math.trunc(this.secs), canvas.width / 2, 100);
        }
        else{
            ctx.fillText("0" + this.mins + ":" + Math.trunc(this.secs), canvas.width / 2, 100);
        }

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(canvas.width / 2 - 250, 25, 500, 15);
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.fillRect(canvas.width / 2 - 250, 25, (500 * (this.timeLeft / 300)), 15);
        
        if(audioAssets.musica.sound.muted){
            ctx.drawImage(graphicAssets.muted.image, canvas.width - 100, 25, 75, 75);
        }
        else{
            ctx.drawImage(graphicAssets.unmuted.image, canvas.width - 100, 25, 75, 75);
        }
    }
}
            