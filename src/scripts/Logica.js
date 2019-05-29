class Logica {

  constructor(app) {
    this.app = app;
    this.pantalla = 0;
  }

  preCargar() {
    this.app.soundFormats('wav', 'mp3');
    Logica.guenos = this.app.loadSound('./src/song/Guenos.mp3');
    Logica.guenos.setVolume(0.4);
    this.musica = this.app.loadSound("./src/song/Spooky.mp3");
    this.musica.setLoop(true);
    Logica.malos = this.app.loadSound("./src/song/Malos.mp3");
    Logica.malos.setVolume(0.1);
    this.inicio = this.app.loadImage('./src/img/Inicio.png');
    this.instrucciones = this.app.loadImage('./src/img/Instrucciones.png');
    this.gana1 = this.app.loadImage('./src/img/Gana1.png');
    this.gana2 = this.app.loadImage('./src/img/Gana2.png');
    this.marcoTiempo = this.app.loadImage('./src/img/marco.png');
    this.barraTiempo = this.app.loadImage('./src/img/time.png');
    this.escenario1 = this.app.loadImage('./src/img/Mapa1.png');
    this.escenario2 = this.app.loadImage('./src/img/Mapa2.png');
    Logica.player1 = this.app.loadImage('./src/img/Player1.png');
    Logica.vida = this.app.loadImage('./src/img/vidas.png');
    Logica.player2 = this.app.loadImage('./src/img/Player2.png');
    Logica.proyectil1 = this.app.loadImage('./src/img/Proyectil1.png');
    Logica.proyectil2 = this.app.loadImage('./src/img/Proyectil2.png');
    Logica.nekai = this.app.loadImage('./src/img/Enemigo1.png');
    Logica.yokai = this.app.loadImage('./src/img/Enemigo2.png');
    Logica.ousamaYokai = this.app.loadImage('./src/img/Jefe.png');
    Logica.balaE = this.app.loadImage('./src/img/BalaEnemigo.png');
  }

  show() {
    switch (this.pantalla) {
      case 0:
        this.app.image(this.inicio, this.app.width / 2, this.app.height / 2);
        break;

      case 1:
        this.app.image(this.instrucciones, this.app.width / 2, this.app.height / 2);
        break;

      case 2:
        this.app.image(this.escenario1, this.map1x, this.map1y);
        this.app.image(this.escenario2, this.map2x, this.map2y);
        this.app.image(this.escenario1, this.map1x, this.map1y2);
        this.app.image(this.escenario2, this.map2x, this.map2y2);
        for (let i = 0; i < Jugador.balas.length; i++) {
          Jugador.balas[i].show();
        }
        for (let i = 0; i < Enemigo.balasE.length; i++) {
          Enemigo.balasE[i].show();
        }
        for (let i = 0; i < this.jugadores.length; i++) {
          this.jugadores[i].show();
        }
        this.generadorDeEnemigos.show();
        if (this.tiempoL > 0) {
        this.app.image(this.barraTiempo,this.app.width / 2, this.app.height / 2,this.barraTiempo.width,this.tiempoL);
        }
        this.app.image(this.marcoTiempo,this.app.width / 2, this.app.height / 2, this.marcoTiempo.width, 700);
        
        break;

      case 3:
        this.app.image(this.gana1, this.app.width / 2, this.app.height / 2);
        break;

      case 4:
        this.app.image(this.gana2, this.app.width / 2, this.app.height / 2);
        break;

    }



  }

  update() {
    this.map1y += this.velM1;
    this.map2y += this.velM2;
    this.map1y2 += this.velM1;
    this.map2y2 += this.velM2;
    if (this.map1y >= this.app.height + 2870) {
      this.map1y = this.map1y2 - 2870;
    }
    if (this.map1y2 >= this.app.height + 2870) {
      this.map1y2 = this.map1y - 2870;
    }
    if (this.map2y >= this.app.height + 2870) {
      this.map2y = this.map2y2 - 2870;
    }
    if (this.map2y2 >= this.app.height + 2870) {
      this.map2y2 = this.map2y - 2870;
    }
    if (this.pantalla == 2) {
      for (let i = 0; i < this.jugadores.length; i++) {
        if (this.jugadores[i].vida <= 0) {
          switch (i) {
            case 0:
              this.pantalla = 4;
              break;
            case 1:
              this.pantalla = 3;
              break;
          }
        }
      }
      for (let i = 0; i < this.enemigos.length; i++) {
        if (this.enemigos[i] instanceof OusamaYokai && this.enemigos[i].vida <= 0) {
          if (this.jugadores[0].puntaje < this.jugadores[1].puntaje) {
            this.pantalla = 4;
          } else {
            this.pantalla = 3;
          }
        }
      }
    }
  }

  keyPressed() {
    switch (this.pantalla) {
      case 0:

        break;

      case 1:

        break;

      case 2:
        for (let i = 0; i < this.jugadores.length; i++) {
          this.jugadores[i].press();
        }
        break;


    }
  }

  keyReleased() {
    switch (this.pantalla) {
      case 0:
        if (this.app.keyCode == this.app.ENTER) {
          this.pantalla = 1;
        }
        break;

      case 1:
        if (this.app.keyCode == this.app.ENTER) {
          this.pantalla = 2;
          this.segundos = 0;
          this.minutos = 0;
          this.map1x = (1300 / 4) - 30;
          this.map2x = ((1300 / 4) * 3) + 30;
          this.map1y = this.app.height / 2;
          this.map2y = this.app.height / 2;
          this.velM1 = 4;
          this.velM2 = 4;
          this.jugadores = [];
          this.enemigos = [];
          this.tiempoL = 660;
          this.generadorDeEnemigos = new GeneradorEnemigos(this.app, this.enemigos, this.jugadores);
          for (let i = 0; i < 2; i++) {
            this.jugadores.push(new Jugador(this.app, i + 1, this.enemigos));
          }
          this.update = this.update.bind(this);
          this.upd = setInterval(this.update, 20);
          this.temporizador = this.temporizador.bind(this);
          this.temp = setInterval(this.temporizador, 1000);
          this.map1y2 = this.map1y - 2870;
          this.map2y2 = this.map2y - 2870;
          this.musica.play();
        }
        break;

      case 2:
        for (let i = 0; i < this.jugadores.length; i++) {
          this.jugadores[i].released();
        }
        break;

      case 3:
          if (this.app.keyCode == this.app.ENTER) {
        this.pantalla = 0;
        for (let i = 0; i < this.enemigos.length; i++) {
          this.enemigos[i].stopInterval();
        }
        for (let i = 0; i < Enemigo.balasE.length; i++) {
          Enemigo.balasE.splice(i,1);
          
        }

        Enemigo.borrarTodo();

        for (let i = 0; i < this.jugadores.length; i++) {
          this.jugadores[i].stopInterval();
        }
        this.generadorDeEnemigos.stopInterval();
        clearInterval(this.upd);
        clearInterval(this.temp);
        this.upd = null;
        this.temp = null;
      }
        break;

      case 4:
          if (this.app.keyCode == this.app.ENTER) {
        this.pantalla = 0;
        for (let i = 0; i < this.enemigos.length; i++) {
          this.enemigos[i].stopInterval();
        }
        for (let i = 0; i < Enemigo.balasE.length; i++) {
          Enemigo.balasE.splice(i,1);
          
        }

        Enemigo.borrarTodo();

        for (let i = 0; i < this.jugadores.length; i++) {
          this.jugadores[i].stopInterval();
        }

        this.generadorDeEnemigos = null;
        clearInterval(this.upd);
        clearInterval(this.temp);
        this.upd = null;
        this.temp = null;
      }
        break;


    }
  }


  temporizador() {
    this.segundos++;
    if (this.segundos % 20 == 0) {
      this.velM1 += 2;
      this.velM2 += 2;
      this.generadorDeEnemigos.subirDificultad();
    }

    if (this.segundos % 16 == 0) {
      this.tiempoL -= 78;
    }

    if (this.minutos == 1 && this.segundos == 1) {
      this.generadorDeEnemigos.generarJefe();
    }

    if (this.segundos == 60) {
      this.minutos++;
      this.segundos = 0;
    }
  }


}
