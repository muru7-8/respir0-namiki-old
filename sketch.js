
// Programado por Nic Motta
// 2021
// MURU7.8

// Configuracion navegacion nodos
let nuevoX;
let nuevoY;
let boxSize = 30;
let xOffset = 0.0;
let yOffset = 0.0;
let apretado = false;

// Configuracion texto de nodos
let xTexto = 150;
let yTexto = 40;
let tamañoTexto = 150;

// Texto inicial - pregunta
let textoInicial = "Ella nos acaricia, nos conecta y nos mantiene vivxs.";

// Footer
let footer = "MURU 7.8 | Respir0 Namiki | v 1.0 | 2021";

let valorMin = 400;
let valorMax = 1000;

let tMin = 250;
let tMax = 500;
let tFondo;
let tEstado = false;

let loading = true;

let rNicMotta, rClaudiaValente, rLeandroBarbeito, rLupitaChavez, rLaHabana, rMuruFusion, rMapa;


// Definir cada objeto con su informacion correspondiente, posicion en X, Y, offset, texto, color, etc
let nicMotta = {
              nombre:"Nic Motta", 
              ciudad:"San Fernando", 
              provincia:"Buenos Aires", 
              pais:"Argentina",
              coordenadas: "",
              valorCo2: 1124,
              texto: "",
              posicionX: -200,
              posicionY: -300,
              valorMap: 0,
              };

let claudiaValente = {
                nombre:"Claudia Valente", 
                ciudad:"Jose C. Paz", 
                provincia:"Buenos Aires", 
                pais:"Argentina",
                coordenadas: "",
                valorCo2: 480,
                posicionX: -1000,
                posicionY: 200,
                };

let leandroBarbeito = {
                nombre:"Leandro Barbeito", 
                ciudad:"Lomas del Mirador", 
                provincia:"Buenos Aires", 
                pais:"Argentina",
                coordenadas: "",
                valorCo2: 665,
                posicionX: 300,
                posicionY: 600,
                };

let lupitaChavez = {
                nombre:"Lupita Chavez", 
                ciudad:"Tepic", 
                provincia:"Nayarit", 
                pais:"Mexico",
                coordenadas: "",
                valorCo2: 1200,
                texto: "",
                posicionX: -1000,
                posicionY: -1000,
                };


let bienalHabana = {
                  nombre:"Bienal de La Habana", 
                  ciudad:"", 
                  provincia:"La Habana", 
                  pais:"Cuba",
                  coordenadas: "",
                  valorCo2: 567,
                  texto: "",
                  posicionX: -500,
                  posicionY: -1500,
                  };

let muruFusion = {
                  nombre:"MURU 7.8 - Fusion", 
                  ciudad:"Ciudad de Buenos Aires", 
                  provincia:"Buenos Aires", 
                  pais:"Argentina",
                  coordenadas: "",
                  valorCo2: "",
                  texto: "",
                  posicionX: 500,
                  posicionY: 100,
                  };


let mapa = {
                  nombre:"Ver mapa de dispositivos activos", 
                  ciudad:"", 
                  provincia:"", 
                  pais:"",
                  coordenadas: "",
                  valorCo2: "",
                  texto: "",
                  posicionX: 700,
                  posicionY: -300,
                  };
                  

let fondoSemilla;
let menuUno, menuDos, menuTres, menuCuatro, menuCinco, menuSeis, menuSiete, menuOcho;

let polygonClaudiaValente, polygonNicMotta, polygonLeandroBarbeito, polygonLupitaChavez, polygonMuruFusion, polygonLaHabana;


function preload() {
 fondoSemilla = loadImage("./assets/fondoSemilla.png");
 sonidoFondo = loadSound('assets/sound/sonidoSemilla.mp3');
 gifBrus = loadImage("./assets/brus.gif");
 mapPin = loadImage("./assets/mapicon.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  nuevoX = width / 2.0;
  nuevoY = height / 2.0;
  rectMode(CENTER);
  strokeWeight(1);
  textLeading(18); // Espacio entre lineas de texto
  textFont("Exo");
  imageMode(CENTER);
  
  textAlign(CENTER);

  // Modelos de mapa / menu
  mapModel = createSprite(100, 100);
  mapModel.addAnimation('normal', mapPin);
  mapModel.scale = 0.18;
  mapModel.mouseActive = true;
 
  // Modelos de cada persona
  nicMottaModel = createSprite(100, 100);
  nicMottaModel.addAnimation('normal', gifBrus);
  nicMottaModel.scale = 0.4;
  nicMottaModel.mouseActive = true;

  claudiaValenteModel = createSprite(100, 100);
  claudiaValenteModel.addAnimation('normal', gifBrus);
  claudiaValenteModel.scale = 0.4;
  claudiaValenteModel.mouseActive = true;

  // Modelos de cada persona
  lupitaChavezModel = createSprite(100, 100);
  lupitaChavezModel.addAnimation('normal', gifBrus);
  lupitaChavezModel.scale = 0.4;
  lupitaChavezModel.mouseActive = true;

  // Modelos de cada persona
  leandroBarbeitoModel = createSprite(100, 100);
  leandroBarbeitoModel.addAnimation('normal', gifBrus);
  leandroBarbeitoModel.scale = 0.4;
  leandroBarbeitoModel.mouseActive = true;

  // Modelos de cada persona
  bienalHabanaModel = createSprite(100, 100);
  bienalHabanaModel.addAnimation('normal', gifBrus);
  bienalHabanaModel.scale = 0.4;
  bienalHabanaModel.mouseActive = true;

  // Modelos de cada persona
  muruFusionModel = createSprite(100, 100);
  muruFusionModel.addAnimation('normal', gifBrus);
  muruFusionModel.scale = 0.4;
  muruFusionModel.mouseActive = true;


    // Initialize Firebase
    let config = {
      apiKey: "AIzaSyB72EJgyU1K8SAuNPgRtoaOJywraSFNByY",
      authDomain: "respir0-namiki.firebaseapp.com",
      databaseURL: "https://respir0-namiki-default-rtdb.firebaseio.com",
      projectId: "respir0-namiki",
      storageBucket: "",
      messagingSenderId: ""
  }
    firebase.initializeApp(config); 
    database = firebase.database();
    
    let ref = database.ref('usuarios');
    ref.on('value', gotData, errData);

  // 

  tFondo = tMin;

  // RANDOMS UTILES

  rClaudiaValente = random(-150, 150);
  rNicMotta = random(-150, 150);
  rLeandroBarbeito = random(-150, 150);
  rLupitaChavez = random(-150, 150);
  rLaHabana = random(-150, 150);
  rMuruFusion = random(-150, 150);
  rMap = random(-150, 150);


  setInterval(tModelo, 100);

  sonidoFondo.loop();


  polygonClaudiaValente = new Polygon();
  polygonNicMotta = new Polygon();
  polygonLeandroBarbeito = new Polygon();
  polygonLupitaChavez = new Polygon();
  polygonMuruFusion = new Polygon();
  polygonLaHabana = new Polygon();
  
  }
  
  function gotData (data) {
      //console.log(data.val());
    var usuarios = data.val();
      var keys = Object.keys(usuarios);
      //console.log(keys);
    
    for (var i = 0; i < keys.length; i++) {
      var nombres = keys[i];
        var co2 = usuarios[nombres].nombre;
        //console.log(nombres + " / " + co2);	
          
      }
    //console.log(usuarios[keys[1]]);
    muruFusion.valorCo2 = usuarios[keys[1]];
    //console.log(nicMotta.valorCo2);
  }
  
  function errData(err) {
    console.log('Error!');
      console.log(err);
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }


function draw() {
    background(0);
    
    

    noFill();
    noStroke();


    // TAMAÑO MODELOS


    // FONDOS MODELOS
    image(fondoSemilla, nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, tFondo + rNicMotta, tFondo + rNicMotta);
    image(fondoSemilla, claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, tFondo + rClaudiaValente, tFondo + rClaudiaValente);
    image(fondoSemilla, leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, tFondo + rLeandroBarbeito, tFondo + rLeandroBarbeito);
    image(fondoSemilla, lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, tFondo + rLupitaChavez, tFondo + rLupitaChavez);
    image(fondoSemilla, bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, tFondo + rLaHabana, tFondo + rLaHabana);
    image(fondoSemilla, muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, tFondo + rMuruFusion, tFondo + rMuruFusion);
    image(fondoSemilla, mapa.posicionX + nuevoX, mapa.posicionY + nuevoY, tFondo + rMap, tFondo + rMap);
    
    // CIRCULOS SEMAFOROS
    ellipse(nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, 500);
    ellipse(claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, 500);
    ellipse(leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, 500);
    ellipse(lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, 500);
    ellipse(bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, 500);
    ellipse(muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, 500);


    // LINEAS CONECTORAS
    stroke(80, 100);
    line(nicMotta.posicionX + nuevoX, nicMotta.posicionY + nuevoY, nuevoX, nuevoY);
    line(claudiaValente.posicionX + nuevoX, claudiaValente.posicionY + nuevoY, nuevoX, nuevoY);
    line(leandroBarbeito.posicionX + nuevoX, leandroBarbeito.posicionY + nuevoY, nuevoX, nuevoY);
    line(lupitaChavez.posicionX + nuevoX, lupitaChavez.posicionY + nuevoY, nuevoX, nuevoY);
    line(bienalHabana.posicionX + nuevoX, bienalHabana.posicionY + nuevoY, nuevoX, nuevoY);
    line(muruFusion.posicionX + nuevoX, muruFusion.posicionY + nuevoY, nuevoX, nuevoY);
    line(mapa.posicionX + nuevoX, mapa.posicionY + nuevoY, nuevoX, nuevoY);
    fill(80);
    ellipse(nuevoX, nuevoY, 20);
    noFill();
    noStroke();


    // Centro de espacio virtual - pregunta
    text(textoInicial, nuevoX, nuevoY, tamañoTexto, tamañoTexto);
  

    // Colores semaforo para CO2
    nicMotta.valorMap = map(nicMotta.valorCo2, valorMin, valorMax, 0, 255);
    let colorNicMotta = color(nicMotta.valorMap, 120, 0, 100);
    polygonNicMotta.x = nicMotta.posicionX + nuevoX;
    polygonNicMotta.y = nicMotta.posicionY + nuevoY;
    polygonNicMotta.size = tFondo / 6 + rNicMotta / 10;
    polygonNicMotta.color = colorNicMotta;
    polygonNicMotta.sides = 25;
    polygonNicMotta.spin = 45 + frameCount / 3;
    polygonNicMotta.show();

    claudiaValente.valorMap = map(claudiaValente.valorCo2, valorMin, valorMax, 0, 255);
    let colorClaudiaValente = color(claudiaValente.valorMap, 120, 0, 100);
    polygonClaudiaValente.x = claudiaValente.posicionX + nuevoX;
    polygonClaudiaValente.y = claudiaValente.posicionY + nuevoY;
    polygonClaudiaValente.size = tFondo / 6 + rClaudiaValente / 10;
    polygonClaudiaValente.color = colorClaudiaValente;
    polygonClaudiaValente.sides = 25;
    polygonClaudiaValente.spin = 45 + frameCount / 4;
    polygonClaudiaValente.show();

    leandroBarbeito.valorMap = map(leandroBarbeito.valorCo2, valorMin, valorMax, 0, 255);
    let colorLeandroBarbeito = color(leandroBarbeito.valorMap, 120, 0, 100);
    polygonLeandroBarbeito.x = leandroBarbeito.posicionX + nuevoX;
    polygonLeandroBarbeito.y = leandroBarbeito.posicionY + nuevoY;
    polygonLeandroBarbeito.size = tFondo / 6 + rLeandroBarbeito / 10;
    polygonLeandroBarbeito.color = colorLeandroBarbeito;
    polygonLeandroBarbeito.sides = 25;
    polygonLeandroBarbeito.spin = 45 + frameCount / 5;
    polygonLeandroBarbeito.show();

    lupitaChavez.valorMap = map(lupitaChavez.valorCo2, valorMin, valorMax, 0, 255);
    let colorLupitaChavez = color(lupitaChavez.valorMap, 120, 0, 100);
    polygonLupitaChavez.x = lupitaChavez.posicionX + nuevoX;
    polygonLupitaChavez.y = lupitaChavez.posicionY + nuevoY;
    polygonLupitaChavez.size = tFondo / 6 + rLupitaChavez / 10;
    polygonLupitaChavez.color = colorLupitaChavez;
    polygonLupitaChavez.sides = 25;
    polygonLupitaChavez.spin = 45 + frameCount / 4;
    polygonLupitaChavez.show();

    bienalHabana.valorMap = map(bienalHabana.valorCo2, valorMin, valorMax, 0, 255);
    let colorLaHabana = color(bienalHabana.valorMap, 120, 0, 100);
    polygonLaHabana.x = bienalHabana.posicionX + nuevoX;
    polygonLaHabana.y = bienalHabana.posicionY + nuevoY;
    polygonLaHabana.size = tFondo / 6 + rLaHabana / 10;
    polygonLaHabana.color = colorLaHabana;
    polygonLaHabana.sides = 25;
    polygonLaHabana.spin = 45 + frameCount / 3;
    polygonLaHabana.show();

    muruFusion.valorMap = map(muruFusion.valorCo2, valorMin, valorMax, 0, 255);
    let colorMuruFusion = color(muruFusion.valorMap, 120, 0, 100);
    polygonMuruFusion.x = muruFusion.posicionX + nuevoX;
    polygonMuruFusion.y = muruFusion.posicionY + nuevoY;
    polygonMuruFusion.size = tFondo / 6 + rMuruFusion / 10;
    polygonMuruFusion.color = colorMuruFusion;
    polygonMuruFusion.sides = 25;
    polygonMuruFusion.spin = 45 + frameCount / 5;
    polygonMuruFusion.show();




    // Color de los textos
    fill(200);

    // Footer informacion MURU 7.8
    textStyle(NORMAL);
    textSize(12);
    text(footer, windowWidth / 2, windowHeight - 10);


    // Centro de espacio virtual - pregunta
    textStyle(BOLD);
    textSize(18)
    text(textoInicial, nuevoX, nuevoY, tamañoTexto + 180, tamañoTexto)


        /// MEDIDOR CO2
        let alfa = 200;
        fill(200, alfa);
        text("CO2", windowWidth * 0.95, windowHeight * 0.19);
    
        fill(200, 0, 0, alfa);
        rect(windowWidth * 0.95, windowHeight * 0.36, 3, 400/3);
        text("10000 ppm", windowWidth * 0.95, windowHeight * 0.23);
    
        fill(255, 200, 0, alfa)
        rect(windowWidth * 0.95, windowHeight * 0.505, 3, 400/3);
    
        fill(100, 150, 0, alfa)
        rect(windowWidth * 0.95, windowHeight * 0.65, 3, 400/3);
        text("400 ppm", windowWidth * 0.95, windowHeight * 0.8);
    
        ///


    // Nodos dibujados
    textStyle(BOLD)
    textAlign(LEFT)
    textSize(15)

    text(nicMotta.nombre + "\n" + nicMotta.ciudad + "\n" + nicMotta.provincia + "\n" + nicMotta.pais + "\n" + "Valor Co2: " + nicMotta.valorCo2,
         nicMotta.posicionX + nuevoX + xTexto, nicMotta.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(claudiaValente.nombre + "\n" + claudiaValente.ciudad + "\n" + claudiaValente.provincia + "\n" + claudiaValente.pais + "\n" + "Valor Co2: " + claudiaValente.valorCo2,
         claudiaValente.posicionX + nuevoX + xTexto, claudiaValente.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(lupitaChavez.nombre + "\n" + lupitaChavez.ciudad + "\n" + lupitaChavez.provincia + "\n" + lupitaChavez.pais + "\n" + "Valor Co2: " + lupitaChavez.valorCo2,
         lupitaChavez.posicionX + nuevoX + xTexto, lupitaChavez.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(leandroBarbeito.nombre + "\n" + leandroBarbeito.ciudad + "\n" + leandroBarbeito.provincia + "\n" + leandroBarbeito.pais + "\n" + "Valor Co2: " + leandroBarbeito.valorCo2,
         leandroBarbeito.posicionX + nuevoX + xTexto, leandroBarbeito.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(bienalHabana.nombre + "\n" + bienalHabana.ciudad + "\n" + bienalHabana.provincia + "\n" + bienalHabana.pais + "\n" + "Valor Co2: " + bienalHabana.valorCo2,
         bienalHabana.posicionX + nuevoX + xTexto, bienalHabana.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(muruFusion.nombre + "\n" + muruFusion.ciudad + "\n" + muruFusion.provincia + "\n" + muruFusion.pais + "\n" + "Valor Co2: " + muruFusion.valorCo2,
         muruFusion.posicionX + nuevoX + xTexto, muruFusion.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    text(mapa.nombre + "\n",
         mapa.posicionX + nuevoX + xTexto, mapa.posicionY + nuevoY + yTexto,
         tamañoTexto, tamañoTexto
         );

    nicMottaModel.position.x = nicMotta.posicionX + nuevoX;
    nicMottaModel.position.y = nicMotta.posicionY + nuevoY;

    if(nicMottaModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    claudiaValenteModel.position.x = claudiaValente.posicionX + nuevoX;
    claudiaValenteModel.position.y = claudiaValente.posicionY + nuevoY;

    if(claudiaValenteModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    leandroBarbeitoModel.position.x = leandroBarbeito.posicionX + nuevoX;
    leandroBarbeitoModel.position.y = leandroBarbeito.posicionY + nuevoY;

    if(leandroBarbeitoModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    lupitaChavezModel.position.x = lupitaChavez.posicionX + nuevoX;
    lupitaChavezModel.position.y = lupitaChavez.posicionY + nuevoY;

    if(lupitaChavezModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    bienalHabanaModel.position.x = bienalHabana.posicionX + nuevoX;
    bienalHabanaModel.position.y = bienalHabana.posicionY + nuevoY;

    if(bienalHabanaModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    muruFusionModel.position.x = muruFusion.posicionX + nuevoX;
    muruFusionModel.position.y = muruFusion.posicionY + nuevoY;

    if(muruFusionModel.mouseIsPressed){
      // Abrir pop-up con el texto de cara persona
    }

    mapModel.position.x = mapa.posicionX + nuevoX;
    mapModel.position.y = mapa.posicionY + nuevoY;

    if(mapModel.mouseIsPressed){
      window.location.href = "./mapa.html";
    }

    drawSprites();
    

}

function mousePressed() {
    apretado = true;
    xOffset = mouseX - nuevoX;
    yOffset = mouseY - nuevoY;
    cursor(MOVE);

    
}


function mouseDragged() {
    if (apretado) {
     nuevoX = mouseX - xOffset;
     nuevoY = mouseY - yOffset;
    }
}

function mouseReleased() {
  apretado = false;
  cursor(ARROW);
}

function keyPressed(){  // Reset / poner un boton para volver al centro con algun tipo de delay, mas fluido
  //resetMap()
 
}

let sonido = true;

function playSound(){

  sonido = !sonido;

  if (sonido == true) {
    sonidoFondo.loop();
  }
  else {
    sonidoFondo.stop();
  }
  
}

function resetMap(){

  nuevoX = width / 2.0;
  nuevoY = height / 2.0;
}

let estadoMenu = true;
function mostrarMenu(){
  let menuRosa = document.getElementById('menuRosa');

  estadoMenu = !estadoMenu;

  if (estadoMenu == true) {
    
  }

  if (estadoMenu == false) {
    menuRosa.style.visibility = "visible";
  }
  else { menuRosa.style.visibility = "hidden"; }
   
}


function tModelo(){
  
  if (tEstado == false) {
    tFondo++;
  }
  
  if (tFondo == tMax) {
    tEstado = true;
  }

  if (tEstado == true) {
    tFondo--;
  }

  if (tFondo == tMin) {
    tEstado = false;
  }

}


	document.oncontextmenu = function(){return false}
