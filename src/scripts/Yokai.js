class Yokai extends Enemigo{
    constructor(app,enemigo){
        super(app,enemigo);
        this.velX = 3;
        this.velY = 3;
        this.vida = 8;
        this.disparar = true;
        this.puntaje = 2;
        this.tam = 40;
    }

    show(){
    this.app.image(Logica.yokai,this.x,this.y);    
    }

    
}