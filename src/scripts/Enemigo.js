class Enemigo {

    static balasE = [];

    constructor(app, enemigo) {
        this.app = app;
        this.enemigo = enemigo;
        this.y = this.app.random(-100, -50);
        this.velX;
        this.velY;
        this.vida;
        this.disparar;
        this.puntaje;
        this.tam;
        this.vivo = true;
        switch (this.enemigo) {
            case 1:
                this.limiteI = 84;
                this.limiteD = 600 - 84;
                this.x = this.app.random(this.limiteI, this.limiteD);
                break;
            case 2:
                this.limiteI = 700 + 84;
                this.limiteD = 1300 - 84;
                this.x = this.app.random(this.limiteI, this.limiteD);
                break;
        }
        this.update = this.update.bind(this);
        this.move = setInterval(this.update, 30);
        this.disparando = this.disparando.bind(this);
        this.disp = setInterval(this.disparando, 1500);
        this.validar = this.validar.bind(this);
        this.val = setInterval(this.validar, 10);
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        if (this.x >= this.limiteD || this.x <= this.limiteI) {
            this.velX *= -1;
        }

        if (this.y >= this.app.height + 100) {
            this.vivo == false;
        }

        if (this.vida <= 0) {
            this.vivo = false;
        }

        for (let i = 0; i < Enemigo.balasE.length; i++) {
            if (Enemigo.balasE[i].vivo == false) {
            Enemigo.balasE[i].stopInterval();   
            Enemigo.balasE.splice(i,1);
            }
        }
    }

    disparando() {
        if (this.y > 20 && this.disparar == true && this.y < this.app.height - 200) {
            Enemigo.balasE.push(new BalaEnemigo(this.app, this.x, this.y));
            Logica.malos.play();
        }
    }

    stopInterval() {
        clearInterval(this.move);
        clearInterval(this.val);
        clearInterval(this.disp);
    }

    static subirDificultad() {
        this.velX += (this.velX) * 0.3;
        this.velY += (this.velY) * 0.3;
    }

    static borrarTodo(){
        Enemigo.balasE = [];
    }


    validar() {
        for (let i = 0; i < Jugador.balas.length; i++) {
            let bala = Jugador.balas[i];
            if (this.app.dist(this.x, this.y,bala.x,bala.y)<this.tam) {
                Jugador.balas.splice(i,1);
                this.vida-=2;
            }
        }
    }

    isVivo() {
        return this.vivo;
    }
}