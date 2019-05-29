class BalaEnemigo {

    constructor(app,x,y){
    this.app=app;
    this.x=x;
    this.y=y;
    this.vel = 4;
    this.vivo = true;
    this.update=this.update.bind(this);
    this.move = setInterval(this.update,20);
    }
    
    show(){
            this.app.image(Logica.balaE, this.x, this.y);
    }
    
    update(){
        this.y+= this.vel;
        if (this.y  >= 750) {
            this.vivo = false;
        }
    }

    stopInterval(){
        clearInterval(this.move);
    }
    
    }