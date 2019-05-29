new p5(function (app) {
   
    var log = new Logica(app);

    app.setup = function () {
       app.createCanvas(1300, 700);
        app.colorMode(app.HSB, 360, 100, 100);
        app.imageMode(app.CENTER);

    }

    app.preload = function (){
        log.preCargar();
    }

    app.draw = function () {
        app.background(0,0,100);
        log.show();
    }

    app.mousePressed = function () {
        log.mPressed();
    }

    app.keyPressed = function () {
        log.keyPressed();
    }


    app.keyReleased = function () {
        log.keyReleased();
    }

});