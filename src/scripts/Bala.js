class Bala {

constructor(app,x,y,jugador){
this.app=app;
this.jugador=jugador;
this.x=x;
this.y=y;
this.vivo = true;
this.vel = 6;
this.update=this.update.bind(this);
setInterval(this.update,20);
}

show(){
    if (this.jugador == 1) {
        this.app.image(Logica.proyectil1, this.x, this.y);
    }
    if (this.jugador == 2) {
        this.app.image(Logica.proyectil2, this.x, this.y);
    }
}

update(){
    this.y-= this.vel;
    if (this.y < -150) {
        this.vivo = false;
    }
}


stopInterval(){
    clearInterval(this.move);
}

}