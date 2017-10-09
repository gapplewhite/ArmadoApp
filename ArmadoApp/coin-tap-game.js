// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
window.countFPS = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}());
var $out = $('#out');

(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            //$out.html(countFPS());//Contar los frames
            
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



(function() {
			
		



		 

}());





(function () {
			
	var numCoins = totalobjetos,//0= personaje, 3=enemigo 1= terreno1 objetos en la escena
		score = 0,
		myJumpAudio = new Audio('sound/jump02.wav'), 
		TotalInsectos = 0,// Se rellena al cargar el Jason
		ContInsectosAtrapados = 0,
	    coins = [],
		TipoCoins=[0],//define si el objeto es un terreno, personaje, item o enemigo
		MovCoins=[0],//define el tiempo de mpvimiento del objeto, si es estatico o se mueve
		solounavez=0,
		AnguloMovCoins=0,//Registra el valor de un agulo para hacer u movimiento ondulatorio en los objetos
		ActivoCoins=[0],//define si el objeto esta activo o no!.
		InvisibleCoins=[0],//define si el objeto esta fuera del rango de vision y no se dibuja
		NumberOfFramesCoins=[0],//define la cantidad 
		IndexObjetoEscena=0;//Define que objeto se esta dibujando en la escena
		IndexHeroEscena=0;//Define cual es el indice del heroe
		ActivoEditando=0; //0 si no se esta editando, 1 si se esta editando
		IndiceEditando=-1;//Este indice define que objeto se esta editando, si es igual a -1, no se esta editando ninguno
		keyPress=0;//GAA define si camiina o no
        //SpriteBegin=1;//GAA define el sprite desde donde empieza la animacion		
		//SpriteEnd=7;//GAA define el sprite desde donde termina la animacion
		//SpriteLevel1=226;//GAA altura del piso 2 del Sprite
		//SpriteLevel2=452;//GAA altura del piso 3 del Sprite
		
		DeltaPosX=12;//GAA incremento de PosX
		ContaVelocidadX=12;
		PosX=320.75;//320.75;//GAA Offset del CENTRO Sprite en X
		PosXa=320.75;//320.75;
		PosXc=0;//10;//GAA Offset del CENTRO Se Mueve con el Scrolling
		PosXScroll=0; //lleva todo el incremento del PosXc
		
		ADeltaPosX=10;//GAA incremento de PosX anterior
		APosX=320.75;//GAA Offset valor anterior
		APosXc=10;//GAA Offset valor anterior
		APosXa=0;//GAA Avance valor anterior
		ContDeltaPosX=0.3;// Valor Constante de incremento de aceleracion
		//CAMBIO RADICAL DE MOVIMIENTO EN Y TRATANDO DE COPIAR EL EXITO EN X:
		
		DeltaPosY=0.5;//GAA incremento de PosY

		PosY=400;//GAA Offset del CENTRO Sprite en Y
		PosYc=0;//GAA Offset del CENTRO Se Mueve con el Scrolling
		PosYSalto=0;
		OffsetYSalto=0;//sumatoria de PosYSalto
		//PosYa=400;//GAA Offset del CENTRO Sprite en Y
		ADeltaPosY=0.5;//GAA incremento de PosX anterior
		APosY=2000;//320.75;//GAA Offset valor anterior
		APosYc=2000;//0;//GAA Offset valor anterior
		APosYa=2010;//0;//GAA Avance valor anterior
		//------------enemigo mov vertical----------------------------------
		eDeltaPosX=0.5;//GAA incremento de PosX
		ePosX=0;//GAA Offset del CENTRO Sprite en X
		//------------enemigo mov vertical----------------------------------
	


		//-----------Del Salto del Heroe--------------------------\/------------	
		Saltando=0;
		DeltaPosY=0;
		Gravedad=2;//Aceleracion constante hacia abajo
		ConstVelocidadInicial=30;
		VelocidadInicial=ConstVelocidadInicial;//Velocidad inicial o impulso inicial del salto
		DeltaSalto=0; //Define el cambio de posicion vertical en cada salto
		TiempoSalto=0;//Tiempo trascurrido desde que se ejecuta un salto.
		MaxAltura=400;//Constante, define el piso de la escena
		Piso=400;
		Techo=0;
		//-----------Del Salto del Heroe--------------------------/\------------
		//-----------Del Salto del Enemigo--------------------------\/------------	
		eSaltando=0;
		eDeltaPosY=0;
		eGravedad=2;//Aceleracion constante hacia abajo
		eConstVelocidadInicial=7;
		eVelocidadInicial=eConstVelocidadInicial;//Velocidad inicial o impulso inicial del salto
		eDeltaSalto=0; //Define el cambio de posicion vertical en cada salto
		eTiempoSalto=0;//Tiempo trascurrido desde que se ejecuta un salto.
		eMaxAltura=350;//Constante, define el piso de la escena
		ePiso=350;
		LocXA=0;
		LocYA=0;
		LocXAi=0;
		LocYAi=0;
		//ePosY=400;//GAA Offset
		//-----------Del Salto del Enemigo--------------------------/\------------
		EscaladeColisionHeroY=100;//Reduce la el espacio de colision del heroe
		EscaladeColisionHeroX=50;//Reduce la el espacio de colision del heroe
		PosY=MaxAltura;//desplazamiento vertical
		PosYa=MaxAltura;//desplazamiento vertical
		SpriteLevel = 0;//GAA define la altura del Sprite que se esta tomando
		keyLeftPress=0;//Se activa cuando esta presionado el cursor izquierdo
		keyRightPress=0;//Se activa cuando esta presionado el cursor derecho
		keySpacePress=0;//Se activa cuando esta presionada la barra espaciadora
		keyFirePress=0;//Se activa cuando esta presionada la B
		key_S_Press=0;//Se activa cuando esta presionada la tecla S
		key_X_Press=0;//Se activa cuando esta presionada la tecla X
		MAXbulletDistance=2000; //Maxima distancia que recorre la Bala antes de morir
		bulletDistance=0;//Se activa e incremnta cuando esta bala esta volando
		bulletdireccion=0;//Direccion en la que va la bala 1 derecha 2 izquierda
		bulletVelocidadInicial=35;//Velocidad inicial o impulso inicial del salto
		bulletDeltaSalto=0; //Define el cambio de posicion vertical en cada salto
		bulletTiempoSalto=0;//Tiempo trascurrido desde que se ejecuta un salto.
		
		bullet2Distance=0;//Se activa e incrementa cuando esta bala esta volando
		bullet2direccion=0;//Direccion en la que va la bala 1 derecha 2 izquierda
		herodireccion=0;//Direccion en la que mira el heroe 1 derecha 2 izquierda
		ModoScroll=1;//Se activa para que se mueva el escenario y no el personaje
		ColisionDetectada=0;//Se activa cuando se detecta una colision
		SobreAlgoDetectado=0;
		Tiempo=9500;//Lleva un conteo del tiempo transcurrido a modo Timer
		TiempoL1=0;//500;//Lleva un conteo del letrero
		TiempoL2=0;//Lleva un conteo del letrero
		TiempoL3=0;//Lleva un conteo del letrero
		TiempoL4=0;//Lleva un conteo del letrero
		TiempoIntro1=1;//Lleva un conteo  del tiempo introductorio del Juego
		GAMEOVER=0;//Define cuando el juego Termino
		MaxRadarFrec=0;//Define la intermitencia del radar del enemigo, que tanto parpadea
		ContRadarFrec=0;//Contador de la intermitencia del radar del enemigo que tanto parpadea
		BanderaSaltoMultiple=0;//Al activarse esta bandera se permite que el personaje salte sobre salto.
		TiempoPresionado=0;//Cuenta el tiempo que se tiene presionado e dedo en pantalla
		Terreno1= [50, 50, 2,1];//Manejo de bloques1 x,y,largo,indice
		var DataJSON;


		//var xmlhttp = new XMLHttpRequest();
		//var url = "file:///C:/Users/gerardo.applewhite/Dropbox/Central%20de%20Alarmas/HTML/coin-tap-game/data.json";
		
		 

	function gameLoop () {
	
	  var i;
	
	  window.requestAnimationFrame(gameLoop);
	  		TextoFinal="fps:";
			TextoFinal=TextoFinal.concat(countFPS());
			document.getElementById("fps").innerHTML = TextoFinal;//"Restantes:";//TotalInsectos-ContInsectosAtrapados;

	  
	  if(ModoScroll==1){// Ajuste de la pantalla cuando no hay Scroll
		if(APosX>320.75){
			APosX-=1.0;
			APosXc+=1.0;
		}
		if(APosX<320.75){
			APosX+=1.0;
			APosXc-=1.0;
		}
		
	  }
	  /*
	  if(PosY-PosYSalto>300){
		PosYSalto+=1.0;
	  }
	  if(PosY-PosYSalto<300){
		PosYSalto-=1.0;
	  }*/

	  // Clear the canvas
	  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

		//console.log("PosY:");
		//console.log(PosY);
		//console.log("MaxY:");
		//console.log(MaxAltura);  
		if(TiempoL1==0 && TiempoL2==0){//No actualizar nada durante Letrero de INTRO
			restantes=TotalInsectos-ContInsectosAtrapados;
			totales="Restantes:";
			TextoFinal=totales.concat(restantes.toString());
			TextoFinal=TextoFinal.concat("       /Tiempo: ");
			TextoFinal=TextoFinal.concat(Tiempo.toString());
			document.getElementById("score").innerHTML = TextoFinal;//"Restantes:";//TotalInsectos-ContInsectosAtrapados;
			//LOOP donde se dibujan y actualizan TODOS los objetos \/
		  for (i = 0; i < coins.length; i++) {
			  IndexObjetoEscena=i;//hace Global el indice del objeto que se dibuja
			  //if(ActivoCoins[i]==1){// Solo solo activos se procesan
				coins[i].update();
				coins[i].render();
			//}
		  }
		}else{// Solo mostramos el letrero de INTRO
			if(TiempoL1>0){// Vemos solo el INTRO
				IndexObjetoEscena=27;
				coins[27].render();
			}
			if(TiempoL2>0){//Vemos solo el mensaje que Perdiste
				IndexObjetoEscena=28;
				coins[28].render();
			}
		}
	  //LETREROS----------\/---------------------------------------------
	 if(Tiempo>0){
			Tiempo--;//Incremento del tiempo en cada Loop
	}	
	 else{
	  if(GAMEOVER==0){
		TiempoL2=100;//Mensaje que perdiste
		GAMEOVER=1;//Fin del Juego
		}
	}
		
	  if(TiempoL4>0){
		TiempoL4--;//Incremento del tiempo en cada Loop
		ActivoCoins[30]=1;//Borramos el letrero
		if(TiempoL4<2){
			window.location.reload();//Reiniciamos el juego
		}
	  }else{
		ActivoCoins[30]=0;//Borramos el letrero
	  }	
      if(TiempoL3>0){
		TiempoL3--;//Incremento del tiempo en cada Loop
		ActivoCoins[29]=1;
	  }else{
		ActivoCoins[29]=0;//Borramos el letrero	 
	  }
	  if(TiempoL2>0){
		TiempoL2--;//Incremento del tiempo en cada Loop
		ActivoCoins[28]=1;
		if(TiempoL2<2){
			window.location.reload();//Reiniciamos el juego
		}
	  }else{

		ActivoCoins[28]=0;//Borramos el letrero
	  }
		
	  if(TiempoL1>0){//LETREROO INTRO
		TiempoL1--;//Incremento del tiempo en cada Loop
		ActivoCoins[27]=1;
	  }else{
		ActivoCoins[27]=0;//Borramos el letrero
	  }
	  if(PosXa>48000&& GAMEOVER==0){//Logro escapar de la granja
		TiempoL4=200;
		GAMEOVER=1;
	  }
	  //LETREROS----------/\-----------------------------------------------	

	  /*
	  if(MaxAltura>400)
		PosYc+=0.1;
	  if(MaxAltura<400)
		PosYc-=0.1;*/
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = options.frameIndex,
			FUNC_sprite_VAR_that_tickCount = 0,
			FUNC_sprite_VAR_that_SpriteBegin=options.SpriteBegin,//GAA define el sprite desde donde empieza la animacion		
			FUNC_sprite_VAR_that_SpriteEnd=options.SpriteEnd,//GAA define el sprite desde donde termina la animacion
			FUNC_sprite_VAR_that_SpriteLevel1=options.SpriteLevel1,//GAA altura del piso 2 del Sprite
			FUNC_sprite_VAR_that_SpriteLevel2=options.SpriteLevel2,//GAA altura del piso 3 del Sprite
			FUNC_sprite_VAR_that_degree=0,//GAA angulo de giro del Sprite
			flag_degree=0;			
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;

		that.context = options.context;
		that.width = Math.round(Number(options.width));
		that.height =Math.round(Number(options.height));
		that.x = 0;
		that.y = Math.round(Number(MaxAltura));
		that.image = options.image;
		that.scaleRatio = 1;
		that.degree = 90;
		
		that.update = function () {
		var inicio=0;
		var inicio2=0;
		var fin=0;
		var cont=0;
		var colision=0;// No hay colision por el momento
		var diff=0;
							//Vertices Primer Rectangulo desde el lado iz en sentido de las manecillas del reloj
		var A1x;
		var B1y;
		var C1x;
		var D1y;
					//Vertices Segundo Rectangulo
		var A2x;
		var B2y;
		var C2x;
		var D2y;
		var De_1a_2;//Se pasa de validar de un cuadro el primero contra todos lo demas, y luego de los demas al primero.
			if(TipoCoins[IndexObjetoEscena]==0 ){//dibujando al personaje y no esta corriendo el intro
				 if(TiempoIntro1>0){
	 			//Durante este periodo se anual todo movimiento
	 			keyLeftPress=0;//Se activa cuando esta presionado el cursor izquierdo
				keyRightPress=0;//Se activa cuando esta presionado el cursor derecho
				keySpacePress=0;//Se activa cuando esta presionada la barra espaciadora
				keyFirePress=0;//Se activa cuando esta presionada la B
				key_S_Press=0;//Se activa cuando esta presionada la tecla S
				key_X_Press=0;//Se activa cuando esta presionada la tecla X
			 }
				//Piso -=PosYc;//Piso del Heroe
				//ePiso -=PosYc;//Piso del enemigo
				//MaxAltura -=PosYc;
				//PosYa-=PosYc;
				//if(OffsetYSalto==0)
					PosYSalto=0;

				//else
				//	PosYSalto=-OffsetYSalto;
					
				PosYSalto=0;
				APosXc=0;//Borramos el valor incrementado en el modo scroll
				PosYc=0;//Borramos el valor incrementado en el modo scroll
				//--Tecla de Cursor Izquierdo------------------------------\/----------
				if(keyLeftPress==1){
					keyPress=1;
					FUNC_sprite_VAR_that_SpriteBegin=4;// el 4 es quieto
					FUNC_sprite_VAR_that_SpriteEnd=7;
					herodireccion=2;//heroe mira a la izquierda
					if(ADeltaPosX<ContaVelocidadX)
						ADeltaPosX+=ContDeltaPosX;//Incremento como aceleracion
					else
						SpriteLevel=FUNC_sprite_VAR_that_SpriteLevel1;//usamos el nivel de Sprite corriendo
				}
				if(keyLeftPress==2){// Se levanto la tecla
					FUNC_sprite_VAR_that_tickCount = 8;
					frameIndex=FUNC_sprite_VAR_that_SpriteBegin;
					SpriteLevel=0;//Regresamos al nivel de Sprite caminando
					keyLeftPress=0;//Modo inactivo
				}
				//--Tecla de Cursor Izquierdo------------------------------/\----------
				//--Tecla de Cursor Derecho--------------------------------\/----------
				if(keyRightPress==1){
					keyPress=1;
					FUNC_sprite_VAR_that_SpriteBegin=0;// el cero es quieto
					FUNC_sprite_VAR_that_SpriteEnd=3;
					herodireccion=1;//heroe mira a la derecha
					if(ADeltaPosX>-ContaVelocidadX)
						ADeltaPosX-=ContDeltaPosX;//Incremento como aceleracion
					else
						SpriteLevel=FUNC_sprite_VAR_that_SpriteLevel1;//usamos el nivel de Sprite corriendo
				}
				if(keyRightPress==2){// Se levanto la tecla
					FUNC_sprite_VAR_that_tickCount = 8;
					frameIndex=FUNC_sprite_VAR_that_SpriteBegin;
					SpriteLevel=0;//Regresamos al nivel de Sprite caminando
					keyRightPress=0;//Modo inactivo
				}
				//--Tecla de Cursor Derecho--------------------------------/\----------
				//--Tecla S--------------------------,,----------------------\/----------
				if(key_S_Press==1){	
					if(PosY>=Piso){//No estamos saltando
						if(ADeltaPosX>-10 && ADeltaPosX<10) //no vamos tan rapido
							SpriteLevel=FUNC_sprite_VAR_that_SpriteLevel2;//usamos el nivel de Golpeando
						    PosY=Piso-1;//por arriba de 500 es consideraro salto
						//PosYa=Piso-1;//por arriba de 500 es consideraro salto
						TiempoSalto=0;
					}else{//Ya esta Saltando
						if(BanderaSaltoMultiple){
							TiempoSalto=0;//PERMITE MULTIPLES SALTOS
							VelocidadInicial=ConstVelocidadInicial;//Velocidad inicial o impulso inicial del salto
							BanderaSaltoMultiple=0;//Solo un salto multiple a la vez
						}
					}
					key_S_Press=2;//Automaticamente la apgamos para que sea compatible con el mouse
				}
				if(key_S_Press==2){
					key_S_Press=0;
				}
				//--Tecla S------------------------------------------------/\----------
				//--Tecla X------------------------------------------------\/----------
				if(key_X_Press==1){	
					ModoScroll=!ModoScroll;
				}
				if(key_X_Press==2){
					key_X_Press=0;
					
				}
				//--Tecla X------------------------------------------------/\----------
				//--Tecla Barra espaciadora------------------------------------------------\/----------
				if(keySpacePress==1){
					if(frameIndex<5){ //personaje mirando a la izquierda empezamos el swin del golpe de ese lado
						FUNC_sprite_VAR_that_SpriteBegin=0;
						FUNC_sprite_VAR_that_SpriteEnd=3;
					}
					else{//personaje mirando a la derecha empezamos el swin del golpe de ese lado
						FUNC_sprite_VAR_that_SpriteBegin=4;
						FUNC_sprite_VAR_that_SpriteEnd=7;
					}
					SpriteLevel=FUNC_sprite_VAR_that_SpriteLevel2;//usamos el nivel de Golpeando
					keyPress=1;// varias frame deben correr
				}
				if(keySpacePress==2){
					keySpacePress=0;
				}
				//--Tecla Barra espaciadora------------------------------------------------/\----------
				if(keyPress>0){// hay movimiento pendiente por procesar
					FUNC_sprite_VAR_that_tickCount += 1;//GAA debe ser keyPress>1 para que los frames se muevan
					if(keyPress>0)// Si todavia podemos disminuir algo
						keyPress--;//Disminuimos el valor leido
				}
				//----Desaceleracion en X----------------\/---------------------------------------------
					if(ModoScroll==0)
						APosX+=ADeltaPosX;
					else
						APosXc+=ADeltaPosX;
					APosXa+=ADeltaPosX;// Este es valor absoluto de las pos avanzada	
					DeltaPosX=ADeltaPosX;
					if(ADeltaPosX>0.1)
						ADeltaPosX-=0.15;
					if(ADeltaPosX<-0.1)
						ADeltaPosX+=0.15;
					//console.log(DeltaPosX); 
					//console.log(APosX);	
				//----Desaceleracion en X----------------/\---------------------------------------------
				//----Aceleracion en Y----------------\/---------------------------------------------

				if(PosY<Piso){ //El personaje esta cayendo
						//console.log(Piso);
						//console.log(PosY);
					if(ModoScroll==0){
						PosY-=(VelocidadInicial-Gravedad*TiempoSalto);
					}
					else{
						PosYSalto=(0.5*(VelocidadInicial-Gravedad*TiempoSalto));
						PosY-=PosYSalto;
						//PosY-=0.5*((VelocidadInicial-Gravedad*TiempoSalto));// Efecto de des centrear al personaje para que cuando salte se vea en el centro de la pantalla y no en la parte de abajo
					}
					//FUNC_sprite_VAR_that_tickCount += 1;
					TiempoSalto+=0.8;
					ContDeltaPosX=0.9;//Reduccion de la capacidad de moverse en el aire en X
				}
				else{//Se termina la caida o NO ESTa CAYENDO
						ContDeltaPosX=1.2;//Restablecimiento de la capacidad de moverse en Tierra
						TiempoSalto=Math.round(VelocidadInicial/Gravedad);//Se restablece el tiempo del moviemento parabolico a cero
					VelocidadInicial=ConstVelocidadInicial;//Velocidad inicial o impulso inicial del salto

										if(OffsetYSalto!=0 && PosY>=400 && Piso>=400){
											PosYSalto=-OffsetYSalto;
										}
										else
											PosYSalto=0;
											
				}
				//----Aceleracion en Y----------------/\---------------------------------------------
				//--------------------Colision con Objetos Heroe--------------------------\/------------------------------------
				// EN X
				ColisionDetectada=0;//Se limpia la bandera
				SobreAlgoDetectado=0;//Se limpia la bandera

				for(cont=0;cont<numCoins;cont++){
					//Vertices Primer Rectangulo desde el lado iz en sentido de las manecillas del reloj
					if(IndexObjetoEscena==cont)// No Hacemos estas validaciones con el mismo objeto o enemigo
						cont++;
					De_1a_2=0;//Se pasa de validar de un cuadro el primero contra todos lo demas, y luego de los demas al primero.
					while(De_1a_2<2){// Priemro asignamos los vaLores de A1x a D2y y luego al revez
						if(De_1a_2==0){
							A1x=APosX+EscaladeColisionHeroX;
							B1y=PosY+EscaladeColisionHeroY;
							C1x=APosX+(coins[IndexHeroEscena].width * coins[IndexHeroEscena].scaleRatio)/(NumberOfFramesCoins[IndexHeroEscena])-EscaladeColisionHeroX;
							D1y=PosY+(coins[IndexHeroEscena].height* coins[IndexHeroEscena].scaleRatio);
							//Vertices Segundo Rectangulo
							A2x=coins[cont].x;
							B2y=coins[cont].y;
							C2x=coins[cont].x+(coins[cont].width * coins[cont].scaleRatio)/(NumberOfFramesCoins[cont]);
							D2y=coins[cont].y+coins[cont].height* coins[cont].scaleRatio;
						}else{
							A2x=APosX+EscaladeColisionHeroX;
							B2y=PosY+EscaladeColisionHeroY;
							C2x=APosX+(coins[IndexHeroEscena].width * coins[IndexHeroEscena].scaleRatio)/(NumberOfFramesCoins[IndexHeroEscena])-EscaladeColisionHeroX;
							D2y=PosY+coins[IndexHeroEscena].height* coins[IndexHeroEscena].scaleRatio;
							//Vertices Segundo Rectangulo
							A1x=coins[cont].x;
							B1y=coins[cont].y;
							C1x=coins[cont].x+(coins[cont].width * coins[cont].scaleRatio)/(NumberOfFramesCoins[cont]);
							D1y=coins[cont].y+coins[cont].height* coins[cont].scaleRatio;
						}
						if(((A2x>A1x && A2x<C1x)||(C2x>A1x && C2x<C1x) ||(A2x<A1x && C2x>C1x)) && ((B2y>B1y && B2y<D1y)||(D2y>B1y && D2y<D1y) ||(B2y<B1y && D2y>D1y)) ){
								if(TipoCoins[cont]==1 && ActivoCoins[cont]==1){//Es un Objeto
									
									if(B2y>B1y && B2y<D1y && De_1a_2==1){//Colision por abajo mata el salto
										
										//VelocidadInicial=0;
									}
									if((B1y<B2y && D1y>B2y) &&(D1y-B2y<55)/*Arriba o cerca del borde*/&& De_1a_2==0){//Colision por arriba mata el salto
										//console.log(OffsetYSalto);
										//console.log(PosY);
										//console.log(Piso);
										
										Piso=-coins[IndexHeroEscena].height* coins[IndexHeroEscena].scaleRatio+coins[cont].y;
										PosY=-coins[IndexHeroEscena].height* coins[IndexHeroEscena].scaleRatio+coins[cont].y;
										PosYSalto=0;
										ColisionDetectada++;
										TiempoSalto=Math.round(VelocidadInicial/Gravedad);//Se restablece el tiempo del moviemento parabolico a cero
										VelocidadInicial=ConstVelocidadInicial;//Velocidad inicial o impulso inicial del salto
										
										//PosYc=0;

										
									}
									else{
										//......\/.................Se DEtiene el movimiento al colisionar.................
	
										//....../\.................Se DEtiene el movimiento al colisionar.................			
										//----Desaceleracion en X----------------\/---------------------------------------------
										if(A2x<C1x && C1x<C2x && De_1a_2==1)//		| |<--o
											DeltaPosX=Math.abs(A2x)-Math.abs(C1x);
										if(C2x>A1x && A1x>A2x && De_1a_2==1)//		o-->| |
											DeltaPosX=Math.abs(C2x)-Math.abs(A1x);	
										if(/*C2x>A1x && A1x>A2x &&*/ (D1y-B2y)<30 && De_1a_2==1){// Entonces esta colision puede ser de abajo hacia arriba, y anulamos el salto
										
										DeltaPosX=0;
										VelocidadInicial=0;
										}else
											//alert(DeltaPosX);
											if(ModoScroll==0)
												APosX-=DeltaPosX;
											else
												APosXc=-DeltaPosX;
											APosXa-=DeltaPosX;// Este es valor absoluto de las pos avanzada	
											ADeltaPosX=-DeltaPosX;
											//alert(De_1a_2);
											
										//----Desaceleracion en X----------------/\---------------------------------------------
									}
								}
								if(TipoCoins[cont]==2 && ActivoCoins[cont]==1){//Es un Item,esta activo y lo toma
									ContInsectosAtrapados++;
									ActivoCoins[cont]=0;//Desactivamos el objeto
									TiempoL3=50;
									//if(ConstVelocidadInicial<38)
									//	ConstVelocidadInicial++;// Aumenta el nivel de salto a medida que comemos mas hormigas
									ContDeltaPosX+=0.05;// Aumenta el nivel de aceleracion
									ContaVelocidadX+=0.5;
									if(ContInsectosAtrapados>5){//Tengo mas de 5 corazones se activa el canon
										ActivoCoins[72]=1;
									}
								}
								if(TipoCoins[cont]==10 && ActivoCoins[cont]==1){//Es un Item para SALTAR ARRIBA
									ActivoCoins[cont]=0;//Desactivamos el objeto
									VelocidadInicial=1.5*ConstVelocidadInicial;// Un salto casi doble de alto del normal
									BanderaSaltoMultiple=1;// Permitimos el salto multiple
									key_S_Press=1;//Activamos el salto
								}
								if(TipoCoins[cont]==11 && ActivoCoins[cont]==1){//Es un Item paraIMPULSAR DERECHA
									ActivoCoins[cont]=0;//Desactivamos el objeto
									FUNC_sprite_VAR_that_SpriteBegin=4;// el cero es quieto
									FUNC_sprite_VAR_that_SpriteEnd=7;
									ADeltaPosX=+30;
									APosXa+=ADeltaPosX;// Este es valor absoluto de las pos avanzada							
								}
								if(TipoCoins[cont]==12 && ActivoCoins[cont]==1){//Es un Item paraIMPULSAR BAJO
									ActivoCoins[cont]=0;//Desactivamos el objeto
									TiempoSalto=Math.round(VelocidadInicial/Gravedad)+40;//Se restablece el tiempo del moviemento parabolico a mas abjo que cero
									VelocidadInicial=ConstVelocidadInicial;//Velocidad inicial o impulso inicial del salto
								}
								if(TipoCoins[cont]==13 && ActivoCoins[cont]==1){//Es un Item paraIMPULSAR IZQUIERDA
									ActivoCoins[cont]=0;//Desactivamos el objeto
									FUNC_sprite_VAR_that_SpriteBegin=0;// el cero es quieto
									FUNC_sprite_VAR_that_SpriteEnd=3;
									ADeltaPosX=-30;
									APosXa+=ADeltaPosX;// Este es valor absoluto de las pos avanzada							
								}
								if(TipoCoins[cont]==4 && ActivoCoins[cont]==1 && GAMEOVER==0){//Me atrapo el enemigo reiniciamos el juego
									TiempoL2=300;//Mensaje que perdiste
									GAMEOVER=1;//Fin del Juego
									//window.location.reload();//Reiniciamos el juego
									$.post("updatepuntos.php",
								        {
								       	  tiempo: (3500-Tiempo),
								          items: ContInsectosAtrapados,
								          ID:UID
								        },
								        function(data,status){
								            alert("Lo Lograste! estos son los resultados: " + data + "\nStatus: " + status);
								        });								
								}
						}
						De_1a_2++;//Repetimos pero intercambiando los valores
				}
				//--------------------Colision con Objetos Heroe--------------------------/\------------------------------------	
				}
				//--------------------Colision con Objetos--------------------------/\------------------------------------
				if(ColisionDetectada==0){
					//Tomo los nuevos valores
					Piso=MaxAltura;
					

				}
					//console.log(Piso);
					PosX=APosX;//Tomo los valores anteriores
					PosXa=APosXa;//Tomo los valores anteriores
					PosXc=APosXc;//Tomo los valores anteriores
					


			}
			//console.log(PosXa+coins[0].x);
            
			//that.x = PosX;
			//that.y = PosY;
			if(TipoCoins[IndexObjetoEscena]==14 && ActivoCoins[72]==1){//dibujando la bala1
				if(keyFirePress==1 && bulletDistance==0){// Solo sale si la primera bala ya murio
					ActivoCoins[IndexObjetoEscena]=1; //Activo la bala
					that.x=Math.round(Number(PosX));//tomo el valor del personaje para posicion incial bala
					that.y=Math.round(Number(PosY+100));
					keyFirePress=0;
					if(herodireccion==2)//Tomo la direccion de la Bala a la izquierda
						bulletdireccion=2;//Bala sale a la izquierda
					if(herodireccion==1)//Tomo la direccion de la Bala a la derecha
						bulletdireccion=1;//Bala sale a la derecha
				}
			}
			if(TipoCoins[IndexObjetoEscena]==15 && ActivoCoins[72]==1){//dibujando la bala2
				if(keyFirePress==1 && bulletDistance!=0 && bullet2Distance==0){ //Solo sale si la primera bala esta en curso y la segunda no esta volano
					ActivoCoins[IndexObjetoEscena]=1; //Activo la bala
					that.x=Math.round(Number(PosX));//tomo el valor del personaje para posicion incial bala
					that.y=Math.round(Number(PosY));
					keyFirePress=0;
					if(herodireccion==2)//Tomo la direccion de la Bala a la izquierda
						bullet2direccion=2;//Bala sale a la izquierda
					if(herodireccion==1)//Tomo la direccion de la Bala a la derecha
						bullet2direccion=1;//Bala sale a la derecha
				}
			}
			if(TipoCoins[IndexObjetoEscena]==4/*IndexObjetoEscena==3*/){//dibujando al enemigo
				FUNC_sprite_VAR_that_tickCount += 1;
				e_PosX=that.x;
				e_PosY=that.y;
				//Funciones de Perseguir al heroe-------------------------------------------------------------
				/*
				if(e_PosX>PosX){
					if(eDeltaPosX>-10.0)
						eDeltaPosX-=0.17;//Incremento como aceleracion
					FUNC_sprite_VAR_that_SpriteEnd=3;
					FUNC_sprite_VAR_that_SpriteBegin=0;
					//that.x-=6;
				}
				if(e_PosX<PosX){
					if(eDeltaPosX<10.0)
						eDeltaPosX+=0.17;//Incremento como aceleracion
					FUNC_sprite_VAR_that_SpriteEnd=7;
					FUNC_sprite_VAR_that_SpriteBegin=4;
					//that.x+=6;
				}*/
				//Funciones de Perseguir al heroe-------------------------------------------------------------
				//Funciones de huir del heroe----------------------------------------------\/---------------
				if(e_PosX>5000){
					if(eDeltaPosX>-14.0)
						eDeltaPosX-=0.31;//Incremento como aceleracion
					FUNC_sprite_VAR_that_SpriteEnd=3;
					FUNC_sprite_VAR_that_SpriteBegin=0;
					//that.x-=6;
				}
				if(e_PosX<5000){
					if(eDeltaPosX<14.0)
						eDeltaPosX+=0.31;//Incremento como aceleracion
					FUNC_sprite_VAR_that_SpriteEnd=7;
					FUNC_sprite_VAR_that_SpriteBegin=4;
					//that.x+=6;
				}
				//Funciones de huir del heroe----------------------------------------------/\--------------
				//----Desaceleracion en X----------------\/---------------------------------------------
					e_PosX+=eDeltaPosX;// Este es valor absoluto de las pos avanzada	
					if(eDeltaPosX>0.1)
						eDeltaPosX-=0.15;
					if(eDeltaPosX<-0.1)
						eDeltaPosX+=0.15;
				//----Desaceleracion en X----------------/\---------------------------------------------
				//---Iniciar el Salto del enemigo--------\/---------------------------------------------
				
					if(e_PosY>=ePiso){//No estamos saltando
						eVelocidadInicial=eConstVelocidadInicial;//Velocidad inicial o impulso inicial del salto
						e_PosY=ePiso-0.01;//por arriba de 500 es consideraro salto
						e_PosY=ePiso-0.01;//por arriba de 500 es consideraro salto
						eTiempoSalto=0;
					}
				//---Iniciar el Salto del enemigo--------/\---------------------------------------------
				//----Aceleracion en Y----------------\/---------------------------------------------
				if(e_PosY<ePiso){ //El personaje esta cayendo
					e_PosY-=eVelocidadInicial-eGravedad*eTiempoSalto;
					eTiempoSalto+=0.03;
				}
				if(e_PosY>=ePiso){//Se termina la caida
					e_PosY=ePiso;
				}
				
				
				
				SobreAlgoDetectado=0;//Se limpia la bandera
				ePiso=MaxAltura;
				for(cont=0;cont<numCoins;cont++){
					if(IndexObjetoEscena==cont)// No Hacemos estas validaciones con el mismo objeto o enemigo
						cont++;
					//--------------------Colision con Objetos Enemigo--------------------------\/------------------------------------	
					//Vertices Primer Rectangulo desde el lado iz en sentido de las manecillas del reloj
					De_1a_2=0;//Se pasa de validar de un cuadro el primero contra todos lo demas, y luego de los demas al primero.
					while(De_1a_2<2){// Priemro asignamos los vaLores de A1x a D2y y luego al revez
						if(De_1a_2==0){
							A1x=e_PosX;
							B1y=e_PosY;
							C1x=e_PosX+(coins[IndexObjetoEscena].width * coins[IndexObjetoEscena].scaleRatio)/(NumberOfFramesCoins[IndexObjetoEscena]);
							D1y=e_PosY+coins[IndexObjetoEscena].height* coins[IndexObjetoEscena].scaleRatio;
							//Vertices Segundo Rectangulo
							A2x=coins[cont].x;
							B2y=coins[cont].y;
							C2x=coins[cont].x+(coins[cont].width * coins[cont].scaleRatio)/(NumberOfFramesCoins[cont]);
							D2y=coins[cont].y+coins[cont].height* coins[cont].scaleRatio;
						}else{
							A2x=e_PosX;
							B2y=e_PosY;
							C2x=e_PosX+(coins[IndexObjetoEscena].width * coins[IndexObjetoEscena].scaleRatio)/(NumberOfFramesCoins[IndexObjetoEscena]);
							D2y=e_PosY+coins[IndexObjetoEscena].height* coins[IndexObjetoEscena].scaleRatio;
							//Vertices Segundo Rectangulo
							A1x=coins[cont].x;
							B1y=coins[cont].y;
							C1x=coins[cont].x+(coins[cont].width * coins[cont].scaleRatio)/(NumberOfFramesCoins[cont]);
							D1y=coins[cont].y+coins[cont].height* coins[cont].scaleRatio;
						}
						if(((A2x>A1x && A2x<C1x)||(C2x>A1x && C2x<C1x) ||(A2x<A1x && C2x>C1x)) && ((D2y>B1y && D2y<D1y )||(B2y>B1y && B2y<D1y) ||(B2y<B1y && D2y>D1y ))){

								if(TipoCoins[cont]==1 && ActivoCoins[cont]==1){//Es un Objeto
								/*
									if(B2y>B1y && B2y<D1y && De_1a_2==1){//Colision por abajo mata el salto
										eVelocidadInicial=0;
									}
									e_PosX=that.x+(e_PosX-that.x);//Tomo los valores anteriores
									eDeltaPosX=-eDeltaPosX*0.9;
								*/	
								}
								if((TipoCoins[cont]==14 || TipoCoins[cont]==15) && ActivoCoins[cont]==1){//Es una BALA

									//e_PosX=-1150+PosX;//Lo envio al principio
									e_PosX-=10;
									
								}
						}
						De_1a_2++;//Repetimos pero intercambiando los valores
					}
					//--------------------Colision con Objetos Heroe--------------------------/\------------------------------------
					//-------------------heroe-Sobre algo-------------------------------------\/------------------------------------
					inicio=e_PosX-coins[cont].x/*+100*/;
					inicio2=e_PosX+(coins[IndexObjetoEscena].width * coins[IndexObjetoEscena].scaleRatio)/(NumberOfFramesCoins[IndexObjetoEscena])-coins[cont].x;
					
					fin=(coins[cont].width * coins[cont].scaleRatio)/NumberOfFramesCoins[cont];
					
					inicioY=(e_PosY)-coins[cont].y+coins[IndexObjetoEscena].height;
					finY=(coins[cont].height * coins[cont].scaleRatio);
					if(cont!=IndexHeroEscena/*cont>0*/ /*&& cont!=3/*el enemigo no cuenta*/){// Es un terreno, validar  coins[i].x + coins[i].getFrameWidth() / 2 * coins[i].scaleRatio)
						//if(PosX>(coins[IndexObjetoEscena].x ) && PosX<(coins[IndexObjetoEscena].x + coins[IndexObjetoEscena].getFrameWidth() * coins[IndexObjetoEscena].scaleRatio)  ){
						if(inicio>0 && inicio<fin && inicioY<=0 && inicioY<finY && TipoCoins[cont]==1/*Es un Objeto*/){//Estoy arriba del 
								if((ePiso>(coins[cont].y-coins[IndexObjetoEscena].height))){//escoger el mas alto
									ePiso=coins[cont].y-coins[IndexObjetoEscena].height;
								}
								if(SobreAlgoDetectado==0)
									ePiso=coins[cont].y-coins[IndexObjetoEscena].height;
								SobreAlgoDetectado=1;
								
						}

					}
					//-------------------heroe-Sobre algo-------------------------------------/\------------------------------------
				}
				
				that.y=Math.round(Number(e_PosY));
				that.x=Math.round(Number(e_PosX));
				//----Aceleracion en Y----------------/\---------------------------------------------
			}
			if(TipoCoins[IndexObjetoEscena]==9/*IndexObjetoEscena==3*/ && TiempoIntro1==0){//Radar del enemigo
				that.y=Math.round(Number(e_PosY));
				if((e_PosX-PosX)>0)
					that.x=1000;
				else
					that.x=10;
				ContRadarFrec++;
				if(ContRadarFrec>MaxRadarFrec){	
					ActivoCoins[IndexObjetoEscena]=!ActivoCoins[IndexObjetoEscena];//Desactivamos el objeto
					ContRadarFrec=0;
				}					
				MaxRadarFrec=Math.abs(e_PosX-PosX)/100;
				//console.log((e_PosX-PosX+320)/50);
			}
			
			if(TipoCoins[IndexObjetoEscena]==16){//Accesorio del hero

				if(herodireccion==2)//Tomo la direccion de la Bala a la izquierda
					frameIndex=1;
				if(herodireccion==1)//Tomo la direccion de la Bala a la derecha
					frameIndex=0;
				that.x = Math.round(Number(PosX+80));// Movimiento transerido solo al personaje
				that.y = Math.round(Number(PosY+35));// Movimiento transferido solo al personaje
			}
			if(TipoCoins[IndexObjetoEscena]==17){//Yupi
				if(that.x<e_PosX){//capturada por el compa
					that.y=Math.round(Number(e_PosY));
					that.x=Math.round(Number(e_PosX));
					TiempoIntro1=0;//Podemos movernos
				}
			}
			
            if (FUNC_sprite_VAR_that_tickCount > 8/*ticksPerFrame*/ /*&& (IndexObjetoEscena==1 || IndexObjetoEscena==3)*/) {//Esta funcion es llamada por cada objeto paara cambiar de frame

				FUNC_sprite_VAR_that_tickCount = 0;
	
                // If the current frame index is in range
                if (frameIndex < FUNC_sprite_VAR_that_SpriteEnd) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = FUNC_sprite_VAR_that_SpriteBegin;
                }
            }
			

        };
		
		that.render = function () {
			var altura=0;
			var frameoffset;
			var widthTotal;
			var widthParcial;
			frameoffset=0;
			widthTotal=that.width;
			widthParcial=that.width;
			degree=0;
			//hacemos invisible todo lo que no esta en el campo de vision
			
			if(that.x>1200 || that.x<-1200){//fuera de la pantalla que ve el usuario
				InvisibleCoins[IndexObjetoEscena]=1;//Lo hacemos invisible
			}else{
				InvisibleCoins[IndexObjetoEscena]=0;//Lo hacemos visible
			}
			
			if(TipoCoins[IndexObjetoEscena]==0/*IndexObjetoEscena==0*/){//dibujando al personaje
				altura=SpriteLevel;
				that.x = Math.round(Number(PosX));// Movimiento transerido solo al personaje
				that.y = Math.round(Number(PosY));// Movimiento transferido solo al personaje
				if(solounavez==0){
				//solounavez=1;
				frameIndex=4;
				//alert("fi:"+frameIndex);
				//alert("indice:"+IndexObjetoEscena);
				}
				frameoffset=frameIndex * that.width / NumberOfFramesCoins[IndexObjetoEscena];
				widthTotal=that.width / NumberOfFramesCoins[IndexObjetoEscena];
				widthParcial=that.width / NumberOfFramesCoins[IndexObjetoEscena] * that.scaleRatio;
				degree=FUNC_sprite_VAR_that_degree-90;
				if(FUNC_sprite_VAR_that_degree>135)
					flag_degree=1;
				if(FUNC_sprite_VAR_that_degree<45)
					flag_degree=0;
				if(flag_degree==0)	
					FUNC_sprite_VAR_that_degree+=1;
				else
					FUNC_sprite_VAR_that_degree-=1;
					/*anular el angulo de prueba*/FUNC_sprite_VAR_that_degree=90;
					
			}
			if(TipoCoins[IndexObjetoEscena]==16/*Dibujando a los accesorios del personaje*/){
				if(solounavez==0){
				solounavez=1;
				frameIndex=1;
				}
				frameoffset=frameIndex * that.width / NumberOfFramesCoins[IndexObjetoEscena];
				widthTotal=that.width / NumberOfFramesCoins[IndexObjetoEscena];
				widthParcial=that.width / NumberOfFramesCoins[IndexObjetoEscena] * that.scaleRatio;
			}
			
			if(TipoCoins[IndexObjetoEscena]==4/*IndexObjetoEscena==3*/){//dibujando al enemigo
				frameoffset=frameIndex * that.width / NumberOfFramesCoins[IndexObjetoEscena];
				widthTotal=that.width / NumberOfFramesCoins[IndexObjetoEscena];
				widthParcial=that.width / NumberOfFramesCoins[IndexObjetoEscena] * that.scaleRatio;
				
			}
			if(TipoCoins[IndexObjetoEscena]==14){//dibujando la bala
				if(bulletdireccion==2){ //hacia la izquierda
					that.x+=45;// avance de la bala
					bulletDistance+=45;
					that.y-=(bulletVelocidadInicial-Gravedad*(0.5)*bulletTiempoSalto);//incremento vertical parabolico
					bulletTiempoSalto++;
				}
				if(bulletdireccion==1){ //hacia la derecha
					that.x-=45;// avance de la bala
					bulletDistance+=45;
					that.y-=(bulletVelocidadInicial-Gravedad*(0.5)*bulletTiempoSalto);//incremento vertical parabolico
					bulletTiempoSalto++;
				}
				
				if(bulletDistance>MAXbulletDistance){
					bulletDistance=0;//Muere la Bala
					bulletdireccion=0;
					bulletTiempoSalto=0;
					ActivoCoins[IndexObjetoEscena]=0;
				}
				
			}
			if(TipoCoins[IndexObjetoEscena]==15){//dibujando la bala2
				if(bullet2direccion==2){ //hacia la izquierda
					that.x+=45;// avance de la bala
					bullet2Distance+=45;
				}
				if(bullet2direccion==1){ //hacia la derecha
					that.x-=45;// avance de la bala
					bullet2Distance+=45;
				}
				
				if(bullet2Distance>MAXbulletDistance){
					bullet2Distance=0;//Muere la Bala
					bullet2direccion=0;
					ActivoCoins[IndexObjetoEscena]=0;
				}
				
			}
			if(TipoCoins[IndexObjetoEscena]==5){//dibujando la tierra o hierba
				if((that.x+2*(that.width / NumberOfFramesCoins[IndexObjetoEscena]))<(320.75)){// Se quedo atras este objeto fuera de la escena
					that.x+=4*(that.width / NumberOfFramesCoins[IndexObjetoEscena]);//O acercamos al personaje
					//console.log(that.x);
				}
				if((that.x-2*(that.width / NumberOfFramesCoins[IndexObjetoEscena]))>(302.75)){// Se quedo atras este objeto fuera de la escena
					that.x-=4*(that.width / NumberOfFramesCoins[IndexObjetoEscena]);//O acercamos al personaje
					//that.x-=3*that.width / NumberOfFramesCoins[IndexObjetoEscena];//O acercamos al personaje
				}
				
			}
			if(TipoCoins[IndexObjetoEscena]!=0 && TipoCoins[IndexObjetoEscena]!=16 && TipoCoins[IndexObjetoEscena]!=7 && TipoCoins[IndexObjetoEscena]!=8/*letreros*/){//Se mueven los objetos
				that.x -= PosXc; // Movimiento transferido a los objetos
				that.y -= PosYc; // Movimiento transferido a los objetos
				//console.log(PosYc);
			}
			
			
			if(TipoCoins[IndexObjetoEscena]==5 || TipoCoins[IndexObjetoEscena]==13 || TipoCoins[IndexObjetoEscena]==14 || TipoCoins[IndexObjetoEscena]==12 || TipoCoins[IndexObjetoEscena]==11 || TipoCoins[IndexObjetoEscena]== 10|| TipoCoins[IndexObjetoEscena]==2 || TipoCoins[IndexObjetoEscena]==1 || TipoCoins[IndexObjetoEscena]==4 /*|| TipoCoins[IndexObjetoEscena]==7*/ || TipoCoins[IndexObjetoEscena]==8/*No letreros*/){//Se mueven los objetos

				that.y += PosYSalto; // Movimiento transferido a los objetos
			}
			if(IndexObjetoEscena==1){//en solo uno hacemos esto:
					OffsetYSalto+=PosYSalto;
					PosXScroll+=PosXc;
					
					AnguloMovCoins+=0.02;// Sollo aqui incrementamos el valor del angulo del movimiento de los objetos
				       if(AnguloMovCoins>360)
						AnguloMovCoins=0;
			}
			
			
			if(TipoCoins[IndexObjetoEscena]==7){//Se mueven los objetos
				that.x -= 0.1*PosXc; // Movimiento transferido a los objetos
				that.y -= 0.1*PosYc; // Movimiento transferido a los objetos
			}
			
			if(MovCoins[IndexObjetoEscena]==1){//Este Movimiento es de arriba a abajo
				that.y -= 2*Math.sin(AnguloMovCoins);
			}
			if(MovCoins[IndexObjetoEscena]==2){//Este Movimiento es de I a Der
				that.x -= 2*Math.sin(AnguloMovCoins);
			}
			if(MovCoins[IndexObjetoEscena]==3){//Este Movimiento es de A a Bajo
				that.y -= 2*Math.sin(-AnguloMovCoins);
			}
			if(MovCoins[IndexObjetoEscena]==4){//Este Movimiento es de I a Der
				that.x -= 2*Math.sin(-AnguloMovCoins);
			}
			if(MovCoins[IndexObjetoEscena]==5){//Este Movimiento Circular
				that.y -= 2*Math.sin(AnguloMovCoins);
				that.x -= 2*Math.cos(AnguloMovCoins);
			}


			
			//Trasladar y Rotar las imagenes		
			that.context.translate(that.x,that.y);
			that.context.rotate((-degree) * Math.PI / 180);
			try{
				  // Draw the animation
				  if(ActivoCoins[IndexObjetoEscena]==1 && InvisibleCoins[IndexObjetoEscena]==0){ // Dibujamos solo si esta activo y es visible dentro del campo de vision
					  that.context.drawImage(
						that.image,
						frameoffset,
						altura,
						widthTotal,
						that.height,
						0,//that.x,
						0,//that.y,
						widthParcial,
						that.height);//sin escalar
						//that.height * that.scaleRatio);
					}
				}catch(err) {
					document.getElementById("coinTapGame").innerHTML = err.message;
				}
			// re trasladar y des Rotar las imagenes
			that.context.rotate((degree) * Math.PI / 180);
			that.context.translate(-that.x,-that.y);
			//if(IndexObjetoEscena==2){//dibujando al personaje
			/*
				//VERTICALES
				//Linea de diagnostico
				that.context.strokeStyle = '#00f00f';
				that.context.beginPath();
				that.context.moveTo(that.x,that.y);
				that.context.lineTo(that.x,that.y+that.height* that.scaleRatio);
				that.context.stroke();
				that.context.strokeStyle = '#000000';
				
				//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(that.x+that.width * that.scaleRatio/NumberOfFramesCoins[IndexObjetoEscena],that.y);
				that.context.lineTo(that.x+that.width * that.scaleRatio/NumberOfFramesCoins[IndexObjetoEscena],that.y+that.height* that.scaleRatio);
				that.context.stroke();
				//HORIZANTALES
				//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(that.x,that.y);
				that.context.lineTo(that.x+that.width * that.scaleRatio/NumberOfFramesCoins[IndexObjetoEscena],that.y);
				that.context.stroke();
				
				//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(that.x,that.y+that.height* that.scaleRatio);
				that.context.lineTo(that.x+that.width * that.scaleRatio/NumberOfFramesCoins[IndexObjetoEscena],that.y+that.height* that.scaleRatio);
				that.context.stroke();
			*/
			//}
			/*
			if(IndexObjetoEscena==1){//dibujando al personaje
				//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(that.x,that.y);
				that.context.lineTo(that.x,that.y+600);
				that.context.stroke();
			}
			if(TipoCoins[IndexObjetoEscena]==0){//dibujando al personaje
				//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(that.x,that.y);
				that.context.lineTo(that.x,that.y+that.height);
				that.context.strokeStyle = '#00ffff';
				that.context.stroke();
				that.context.strokeStyle = '#000000';
				
								//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(that.x+(that.width * that.scaleRatio)/8*0.5,that.y);
				that.context.lineTo(that.x+(that.width * that.scaleRatio)/8*0.5,that.y+that.height);
				that.context.strokeStyle = '#00ffff';
				that.context.stroke();
				that.context.strokeStyle = '#000000';
			}
			if(TipoCoins[IndexObjetoEscena]==4){//dibujando al personaje
				//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(0,MaxAltura);
				that.context.lineTo(900,MaxAltura);
				that.context.strokeStyle = '#ff0000';
				that.context.stroke();
				that.context.strokeStyle = '#000000';
			}
			if(TipoCoins[IndexObjetoEscena]==4){//dibujando al personaje
				//Linea de diagnostico
				that.context.beginPath();
				that.context.moveTo(0,Piso);
				that.context.lineTo(900,Piso);
				that.context.strokeStyle = '#A000A0';
				that.context.stroke();
				that.context.strokeStyle = '#000000';
			}
			*/
		};
		
		that.getFrameWidth = function () {
			return that.width / NumberOfFramesCoins[IndexObjetoEscena];
		};
		
		return that;
	}
	
	function destroyCoin (coin) {
	
		var i;
		
		for (i = 0; i < coins.length; i += 1) {
			if (coins[i] === coin) {
				coins[i] = null;
				coins.splice(i, 1);
				break;
			}
		}
	}
	
	function spawnCoin () {
	
		var coinIndex,
			coinImg;
	
		// Create sprite sheet
		coinImg = new Image();	
	
		coinIndex = coins.length;
		
		//Load JSON
		DataJSON = JSON.parse(dataJ2);

			coins[coinIndex] = sprite({
				context: canvas.getContext("2d"),
				width: DataJSON[coinIndex].width,
				height: DataJSON[coinIndex].height,
				image: coinImg,
				numberOfFrames: DataJSON[coinIndex].numberOfFrames,
				frameIndex:0,
				ticksPerFrame: DataJSON[coinIndex].ticksPerFrame,
				//SpriteBegin: 0,//GAA define el sprite desde donde empieza la animacion		
				//SpriteEnd: 1,//GAA define el sprite desde donde termina la animacion
				SpriteEnd: DataJSON[coinIndex].SpriteEnd,//GAA define el sprite desde donde termina la animacion
				SpriteBegin: DataJSON[coinIndex].SpriteBegin,//GAA define el sprite desde donde empieza la animacion		
				SpriteLevel1: DataJSON[coinIndex].SpriteLevel1,//GAA altura del piso 2 del Sprite
				SpriteLevel2: DataJSON[coinIndex].SpriteLevel2,//GAA altura del piso 3 del Sprite
			});
		TipoCoins[coinIndex]=(DataJSON[coinIndex].indice);//Me dice el tipo de objeto que es
		MovCoins[coinIndex]=(DataJSON[coinIndex].mov);//Me dice el tipo de Movimiento del objeto que es

		if(TipoCoins[coinIndex]==2)//Si es un item
			TotalInsectos++; //Amuento el Total de insectos que hay que attrapar
		ActivoCoins[coinIndex]=DataJSON[coinIndex].estado;//Todos los objetos vienen activos
		InvisibleCoins[coinIndex]=0;//Todos los objetos son visibles
		NumberOfFramesCoins[coinIndex]=DataJSON[coinIndex].numberOfFrames;//Anoto el numero de frames por imagen
		coins[coinIndex].x = Math.random() * (canvas.width - coins[coinIndex].getFrameWidth() * coins[coinIndex].scaleRatio);
		coins[coinIndex].y = Math.random() * (canvas.height - coins[coinIndex].height * coins[coinIndex].scaleRatio);
		//coins[coinIndex].scaleRatio = Math.random() * 0.5 + 0.5;
		coins[coinIndex].scaleRatio = 1; // un solo tamano
		// Load sprite sheet
			coinImg.src = DataJSON[coinIndex].scr;
			coins[coinIndex].x=DataJSON[coinIndex].X;
			coins[coinIndex].y=DataJSON[coinIndex].Y;
			coins[coinIndex].scaleRatio=DataJSON[coinIndex].escala;
		if(TipoCoins[coinIndex]==0/*coinIndex==0*/){// Este indice es exclusivo del heroe
			//coinImg.src = DataJSON[coinIndex].scr;
			//coins[0].scaleRatio = DataJSON[coinIndex].escala; //0.5 + 0.5;
			//APosX=canvas.width/2 - coins[coinIndex].getFrameWidth()* coins[coinIndex].scaleRatio;//Lo cargamos en el centro inicialmente
			coins[coinIndex].y=canvas.height/2 /*- coins[0].height*coins[0].scaleRatio*/;
			IndexHeroEscena=coinIndex;//Registro el indice de heroe
			coins[coinIndex].SpriteBegin=4;
			coins[coinIndex].frameIndex=4;

			//console.log(IndexHeroEscena);
		}else
		{
			coins[coinIndex].x+=-PosXi;//Correr el escenario hacia otra parte en el principo, menos al heroe
			PosXScroll=PosXi;
			PosXa-=PosXScroll;
		}

		//if(coinIndex>=5)
		//	coinImg.src = "images/moneda.png";
			
	}

	
	function getElementPosition (element) {
	
       var parentOffset,
       	   pos = {
               x: element.offsetLeft,
               y: element.offsetTop 
           };
           
       if (element.offsetParent) {
           parentOffset = getElementPosition(element.offsetParent);
           pos.x += parentOffset.x;
           pos.y += parentOffset.y;
       }
       return pos;
    }
	
	function distance (p1, p2) {
	
		var dx = p1.x - p2.x,
			dy = p1.y - p2.y;
			
		return Math.sqrt(dx * dx + dy * dy);
	}
	function salto1 (e) {
			var i,
			loc = {},
			dist,
			coinsToDestroy = [];
		var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
        LocXAi=LocXA = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
	LocYAi=LocYA = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser
        //statusdiv.innerHTML = 'Status: touchstart<br> ClientX: ' + startx + 'px'
        e.preventDefault();

	}
	function salto2 (e) {
			var i,
			loc = {},
			tapX,
			tapY,
			dist,
			coinsToDestroy = [];
		var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
        tapX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
		tapY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser
        //statusdiv.innerHTML = 'Status: touchstart<br> ClientX: ' + startx + 'px'
        e.preventDefault();

		if(tapX+18<LocXA){
			keyRightPress=1;
			keyLeftPress=2;
		}
		if(tapX>LocXA+18){
			keyLeftPress=1;
			keyRightPress=2;
		}
		if((tapY+13<LocYA)/*&&!(tapX>LocXA+15)&&!(tapX+15<LocXA)*/ ){
			key_S_Press=1;
			myJumpAudio.play();
		}

		LocXA = tapX; // get x position of touch point relative to left edge of browser
		LocYA = tapY; // get x position of touch point relative to left edge of browser	
		TiempoPresionado++;
		//console.log(TiempoPresionado);
	}
	function salto3 (e) {
			var i,
			loc = {},
			tapX,
			tapY,
			dist,
			coinsToDestroy = [];/*
			pos = getElementPosition(canvas),
			tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
			tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;
		*/
		var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
        tapX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
		tapY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser
		
        //statusdiv.innerHTML = 'Status: touchstart<br> ClientX: ' + startx + 'px'
        e.preventDefault();
		//Si nunguna de las anteriores,,, es un disparo
		if((Math.abs(tapX-LocXAi)<8)&&(Math.abs(tapY-LocYAi)<8)&&TiempoPresionado<10){
			keyFirePress=1;
		}
		//key_S_Press=0;
		//keyRightPress=0;
		//keyLeftPress=0;
		TiempoPresionado=0;

	}
	function tap (e) {
	
		var i,j,SupX,SupY,
			loc = {},
			dist,
			coinsToDestroy = [];
			pos = getElementPosition(canvas),
			tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
			tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;

		loc.x = (tapX - pos.x) * canvasScaleRatio;
		loc.y = (tapY - pos.y) * canvasScaleRatio;
		

		SupX=parseInt(loc.x+PosXScroll);
		SupY=parseInt(loc.y-OffsetYSalto);
		//alert("Esta pagina se va a volver a cargar");
		//window.location.replace("https://centracomsa.com/Armado/coin-tap-game.php?x=" + (PosXScroll));
		
		if(ActivoEditando==1){
		// Estaba editando, voy a Guardar
					//ActivoCoins[i]=0;//Desactivar obejro
		ActivoEditando=0;//ya no se puede entrar a editar en este clic			
		//console.log("indice: ");
					$.post("updatejson.php",
				        {
				       	  x: SupX,
				          y: SupY,
				          estado:1,
				          width: "80",
				          height: "108",
				          ID: IndiceEditando
				        },
				        function(data,status){
				            alert("Datasa: " + data + "\nStatus: " + status);
				        });
				        
		}else{	
			j=1;
			for (i = 0; i < coins.length; i++) {
	
				// Distance between tap and coin
				dist = distance({
					x: (coins[i].x),//Esquina superior izquierda de los objetos
					y: (coins[i].y )
				}, {
					x: loc.x,
					y: loc.y
				});

				// Check for tap collision with coin		
				if (dist < 100) {
					 if(ActivoEditando==0 && ( TipoCoins[IndexObjetoEscena]==1 || TipoCoins[IndexObjetoEscena]==13 || TipoCoins[IndexObjetoEscena]==12 || TipoCoins[IndexObjetoEscena]==11 || TipoCoins[IndexObjetoEscena]==10 || TipoCoins[IndexObjetoEscena]==6 || TipoCoins[IndexObjetoEscena]==2)){	        
					 	IndiceEditando=j;//Tomo el indice del objeto cliceado
						//console.log
						if (confirm("Desea mover el objeto?#"+j) == true) {
							alert("Editando el objeto #:"+j);
							ActivoEditando=1;
						} else {
							if (confirm("Desea borrar el objeto?#"+j) == true) { //Desactivamos este objeto
								$.post("updatejson.php",
							        {
							       	  x: SupX,
							          y: SupY,
							          estado:0,
							          width: "80",
							          height: "108",
							          ID: IndiceEditando
							        },
							        function(data,status){
							            alert("Dataaaa: " + data + "\nStatus: " + status);
							        });
								
							}else{
							}
							    
						}
						
						
						if (confirm("Desea agregar movimiento al objeto?#"+j) == true) { //agregamos movimiento a este objeto
									$.post("listomovimientos.php",
								        {
								       	  x: SupX,
								          ID: IndiceEditando
								        },
								        function(data,status){
								            //alert("Dataaaa: " + data + "\nStatus: " + status);
								            var person = prompt("Por favor escoger el ID del movimiento:\n"+ data + "\nStatus: " + status, "1");
										if (person == null || person == "") {
										    
										} else {
										
											$.post("addmovimiento.php",
										        {
										       	  mov: person,
										          ID: IndiceEditando
										        },
										        function(data,status){
										            alert("Data: " + data + "\nStatus: " + status);
										            alert("Esta pagina se va a volver a cargar");
											    window.location.replace("https://centraticket.com/Armado/coin-tap-game.php?x=" + (PosXScroll));
										        });
										    
										}
								        });
								
								}
							

					}
				        
	
				}
				j++;
			}
			if(ActivoEditando==0){
					if (confirm("deseas agregar un objeto aqui??") == true) {//vamos a agregar un nuevo objeto
					
					
						$.post("listobjetos.php",
					        {
					       	  x: SupX,
					          ID: IndiceEditando
					        },
					        function(data,status){
					            //alert("Dataaaa: " + data + "\nStatus: " + status);
					            var person = prompt("Por favor escoger el objeto:\n"+ data + "\nStatus: " + status, "1");
							if (person == null || person == "") {
							    
							} else {
							
								$.post("addescenario.php",
							        {
							       	  x: SupX,
							          y: SupY,
							          width: "80",
							          height: "108",
							          ID: person
							        },
							        function(data,status){
							            alert("Dataaaa: " + data + "\nStatus: " + status);
							            alert("Esta pagina se va a volver a cargar");
								    window.location.replace("https://centraticket.com/Armado/coin-tap-game.php?x=" + (PosXScroll));
							        });
							    
							}
					        });
					        
					        
					        
				        
					    
					} else {
					    
					}
				}
		}

		// Destroy tapped coins
		for (i = 0; i < coinsToDestroy.length; i += 1) {
		
			score += parseInt(coinsToDestroy[i].scaleRatio * 10, 10);
			destroyCoin(coinsToDestroy[i]);	
			setTimeout(spawnCoin, 1000);	
		}
		
		if (coinsToDestroy.length) {
			document.getElementById("score").innerHTML = score;
		}
	}
	function MouseMove (e) {
			var i,
			loc = {},
			dist,
			coinsToDestroy = [];
			pos = getElementPosition(canvas),
			tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
			tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;

		loc.x = (tapX - pos.x) * canvasScaleRatio;
		loc.y = (tapY - pos.y) * canvasScaleRatio;
		
		if(ActivoEditando==1){
			coins[IndiceEditando-1].x=loc.x;
			coins[IndiceEditando-1].y=loc.y;
		}

	}
	function dealWithKeyboardDOWN(e) {
    // gets called when any of the keyboard events are overheard
		//frameIndex = -10;
		switch(e.keyCode){
		case 65://A
			keyLeftPress=1;//La Tecla Izquierda esta presionada
		break;
		case 66://B
			keyFirePress=1;//La Tecla Disparo esta presionada
		break;
		case 83://S
			key_S_Press=1;//La Tecla  S esta presionada
			//PosY=MaxAltura-1;//por arriba de 500 es consideraro salto
			//TiempoSalto=0;
		break;
		case 37:
			keyRightPress=1;//La Tecla Derecha esta presionada
		break;
		case 39:
			keyLeftPress=1;//La Tecla Izquierda esta presionada
		break;
		case 32://Barra espaciadora
			keySpacePress=1;
		break;
		case 88://TeclaX
			key_X_Press=1;
		break		
		default:
		}
	}
	function dealWithKeyboardUP(e) {
    // gets called when any of the keyboard events are overheard
		//frameIndex = -10;
		switch(e.keyCode){
		case 65://A
			keyLeftPress=2;//La Tecla Izquierda fue levantada!
		break;
		case 66://B
			keyFirePress=2;//La Tecla Disparo fue levantada
		break;		
		case 83://S
			key_S_Press=2;//La Tecla  S fue levantada!
		break;
		case 32://Barra espaciadora
			keySpacePress=2;
		break
		case 37:
			keyRightPress=2;//La Tecla Derecha fue levantada!
			break;
		case 39:
			keyLeftPress=2;//La Tecla Izquierda fue levantada!
			break;
		case 88://TeclaX
			key_X_Press=2;
		break
		default:
			if(keyPress==0){
				ADeltaPosX=0.5;
				SpriteLevel=0;//Regresamos al nivel de Sprite caminando
			}
		}
	}
	// Get canvas

		
	/*
	myAudio.addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
	}, false);
	myAudio.play();

*/
	canvas = document.getElementById("coinTapGame");
	canvas.width = 1096;//screen.width;
	canvas.height = 965;//screen.height;;
	//console.log(canvas.width);
	//console.log(canvas.height);
	
	for (i = 0; i < numCoins; i += 1) {
	
		spawnCoin();
	}
	
	gameLoop();
	
	//canvas.addEventListener("touchstart", tap);
	canvas.addEventListener("mousedown", tap);
	canvas.addEventListener("touchstart", salto1);
	canvas.addEventListener("touchmove", salto2);
	canvas.addEventListener("touchend", salto3);
	canvas.addEventListener("mousemove", MouseMove);
	//canvas.addEventListener("keydown", dealWithKeyboardDOWN);
	//Get Key press By GAA
	document.onkeydown = dealWithKeyboardDOWN;
	//document.onkeypress = dealWithKeyboardDOWN;
	document.onkeyup= dealWithKeyboardUP;

	//alert("Data: ");
//$(document).ready(function(){
   // $("button").click(function(){

    //});
//});

	


} ());

