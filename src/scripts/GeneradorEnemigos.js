class GeneradorEnemigos {

    constructor(app, enemigos, jugadores) {
        this.app = app;
        this.enemigos = enemigos;
        this.jugadores = jugadores;
        this.vel = 4;
        this.nNekai = 0;
        this.nYokai = 0;
        this.update = this.update.bind(this);
        this.g1 = setInterval(this.update, 20);
        this.generarNekai = this.generarNekai.bind(this);
        this.g2 = setInterval(this.generarNekai, 7000);
        this.generarYokai = this.generarYokai.bind(this);
        this.g3 = setInterval(this.generarYokai, 15000);
    }

    show() {
        for (let i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].show();
        }
    }

    update() {
        for (let i = 0; i < this.enemigos.length; i++) {
            if (this.enemigos[i].isVivo()==false) {
                if (this.enemigos[i].enemigo == 1 && this.enemigos[i].vida <= 0) {
                    this.jugadores[0].puntaje += this.enemigos[i].puntaje;
                }
                if (this.enemigos[i].enemigo == 2 && this.enemigos[i].vida <= 0) {
                    this.jugadores[1].puntaje += this.enemigos[i].puntaje;
                }
                this.enemigos[i].stopInterval();
                this.enemigos.splice(i,1);
            }
        }
    }

    generarNekai() {
        for (let i = 0; i < this.nNekai; i++) {
            this.enemigos.push(new Nekai(this.app, 1));
        }
        for (let i = 0; i < this.nNekai; i++) {
            this.enemigos.push(new Nekai(this.app, 2));
        }
    }


    generarYokai() {
        for (let i = 0; i < Math.round(this.nYokai); i++) {
            this.enemigos.push(new Yokai(this.app, 1));
        }
        for (let i = 0; i < Math.round(this.nYokai); i++) {
            this.enemigos.push(new Yokai(this.app, 2));
        }
    }

    generarJefe() {
        this.enemigos.push(new OusamaYokai(this.app, 1));
        this.enemigos.push(new OusamaYokai(this.app, 2));
    }

    stopInterval(){
        clearInterval(this.g1);
        clearInterval(this.g2);
        clearInterval(this.g3);
    }


    subirDificultad() {
        this.nNekai += 0.4;
        this.nYokai += 0.4;
        Enemigo.subirDificultad();
    }

}