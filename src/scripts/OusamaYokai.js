class OusamaYokai extends Enemigo{
    constructor(app,enemigo){
        super(app,enemigo);
        this.velX = 4;
        this.velY = 3;
        this.vida = 50;
        switch (this.enemigo) {
            case 1:
                this.x = 300;
                break;
            case 2:
                this.x = 1000;
                break;
        }
        this.disparar = true;
        this.puntaje = 10;
        this.tam = 100;
        this.detener = this.detener.bind(this);
        this.stop = setInterval(this.detener,20);
    }

    show(){
    this.app.image(Logica.ousamaYokai,this.x,this.y);    
    }

    detener(){
        if (this.y >= 150) {
            this.velY = 0;
            clearInterval(this.stop);
        }
    }

    
}