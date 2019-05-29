class Jugador {

    static balas = [];

    constructor(app, jugador, enemigos) {
        this.app = app;
        this.jugador = jugador;
        this.enemigos = enemigos;
        this.vida = 3;
        this.puntaje = 0;
        this.x;
        this.y;
        this.vel = 6;
        switch (this.jugador) {
            case 1:
                this.x = 1300 / 4;
                this.y = 700 - 60;
                this.teclaI = 'a';
                this.teclaD = 'd';
                this.teclaF = ' ';
                this.limiteI = 84;
                this.limiteD = 600 - 84;
                break;
            case 2:
                this.x = (1300 / 4) * 3;
                this.y = 700 - 60;
                this.teclaI = this.app.LEFT_ARROW;
                this.teclaD = this.app.RIGHT_ARROW;
                this.teclaF = '0';
                this.limiteI = 700 + 84;
                this.limiteD = 1300 - 84;
                break;

        }
        this.update = this.update.bind(this);
        this.upd = setInterval(this.update, 20);
        this.validar = this.validar.bind(this);
        this.val = setInterval(this.validar, 10);
    }

    show() {
        if (this.jugador == 1) {
            this.app.image(Logica.player1, this.x, this.y);
        }
        if (this.jugador == 2) {
            this.app.image(Logica.player2, this.x, this.y);
        }

        for (let i = 0; i < this.vida; i++) {
            this.app.image(Logica.vida, (this.x - 40) + (40*i), this.y-60);         
        }
    }

    update() {
        if (this.moverDer == true && this.x < this.limiteD) {
            this.x += this.vel;
        }
        if (this.moverIzq == true && this.x > this.limiteI) {
            this.x -= this.vel;
        }

        for (let i = 0; i < Jugador.balas.length; i++) {
            if(Jugador.balas[i].vivo == false){
                Jugador.bala[i].stopInterval();
                Jugador.balas.splice(i,1);
            }
            
        }

    }

    press() {
        if (this.jugador == 1) {
            if (this.app.key == this.teclaI) {
                this.moverIzq = true;
                this.moverDer = false;
            }
            if (this.app.key == this.teclaD) {
                this.moverIzq = false;
                this.moverDer = true;
            }
        }

        if (this.jugador == 2) {
            if (this.app.keyCode == this.teclaI) {
                this.moverIzq = true;
                this.moverDer = false;
            }
            if (this.app.keyCode == this.teclaD) {
                this.moverIzq = false;
                this.moverDer = true;
            }
        }
    }

    released() {

        if (this.jugador == 1) {
            if (this.app.key == this.teclaI) {
                this.moverIzq = false;
            }
            if (this.app.key == this.teclaD) {
                this.moverDer = false;
            }
            if (this.app.key == this.teclaF) {
                Jugador.balas.push(new Bala(this.app,this.x,this.y,this.jugador));
                Logica.guenos.play();
            }
        }

        if (this.jugador == 2) {
            if (this.app.keyCode == this.teclaI) {
                this.moverIzq = false;
            }
            if (this.app.keyCode == this.teclaD) {
                this.moverDer = false;
            }
            if (this.app.key == this.teclaF) {
                Jugador.balas.push(new Bala(this.app,this.x,this.y,this.jugador));
                Logica.guenos.play();
            }
        }
    }

    stopInterval() {
        clearInterval(this.upd);
        clearInterval(this.val);
    }


    validar(){
        for (let i = 0; i < Enemigo.balasE.length; i++) {
            let bala = Enemigo.balasE[i];
            if (this.app.dist(bala.x,bala.y,this.x, this.y)<40) {
                bala.stopInterval();
                Enemigo.balasE.splice(i,1);
                this.vida-=1;
            }
        }
        for (let i = 0; i < this.enemigos.length; i++) {
            let enemigo = this.enemigos[i];
            if (this.app.dist(enemigo.x,enemigo.y,this.x, this.y)<40) {
                this.enemigos.splice(i,1);
                this.vida-=1;
            }
        }
    }
}