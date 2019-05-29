class Nekai extends Enemigo{
    constructor(app,enemigo){
        super(app,enemigo);
        this.velX = 1;
        this.velY = 2;
        this.vida = 4;
        this.disparar = false;
        this.puntaje = 1;
        this.tam = 40;

    }

    show(){
    this.app.image(Logica.nekai,this.x,this.y);    
    }

    
}