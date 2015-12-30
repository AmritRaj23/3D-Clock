//Author: Amrit Raj
//Date: 22.11.2015
//Topic: A three dimensional clock

// Initialize webGL with camera and lights
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(255,255,255)');
// create scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,
                                         0.1, 1000);
camera.position.z = 24;
camera.position.y = 1;

var ambientLight = new THREE.AmbientLight(0x909090);
scene.add(ambientLight);
var light = new THREE.DirectionalLight(0x444444); 
light.position.set( 1.5,1,1 );
scene.add(light);
//--------------------------------------------------------------------------------------------
/*Clock base design*/ 
var radiusTop =20;
var radiusBottom = 20;
var height = 0.5;
var radiusSegments =32;
var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments );
var material = new THREE.MeshBasicMaterial( {color: 'red'} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.rotation.x = Math.PI/2; 
scene.add( cylinder );
//----------------------------------------------------------------------------------------------
/*blob in the center design*/
var material2 = new THREE.MeshBasicMaterial( {color: 'black', opacity:1.0, transparent:true} );
var width = 1;
var heightHourClock = 1.5;
var depth = 3;
var blob = new THREE.Mesh( new THREE.CylinderGeometry( width, heightHourClock, depth ), material2 );
blob.position.x = 0;
blob.position.y = 0;
blob.position.z = 0;
cylinder.add(blob);
//----------------------------------------------------------------------------------------------
/*small ticks design*/ 
var heightOfSmallTicks = 1;
var geometryTicksSmall = new THREE.CylinderGeometry( 0.5, 0.5, heightOfSmallTicks, 64, 64, false, 0, 6.3);
var materialTicksSmall = new THREE.MeshBasicMaterial( {color: 'black'} );
for(var i= 0; i<60; i++) {
	
	var smallTicks = new THREE.Mesh(geometryTicksSmall,materialTicksSmall);  //Create new tick 			
	if(i%5!=0){ //dont want to display the big ticks for the 5 minutes (are done later separately so that there is no overlap)
		smallTicks.position.x = (radiusTop -heightOfSmallTicks)  * Math.cos(i * 0.10472); //0.10472 in radians = 6 degrees
		smallTicks.position.y = (radiusTop -heightOfSmallTicks) * Math.sin(i * 0.10472); 		
		smallTicks.rotation.x = Math.PI / 2;
		smallTicks.rotation.y = Math.PI / 2;	
		scene.add(smallTicks);
	}
}
//----------------------------------------------------------------------------------------------
/*big ticks design*/ 

var heightOfBigTicks = 4; //The 12o'clock tick is made later, hence 4 ticks.
var colourOfBigTicks = 'black';
var geometryBigTicks = new THREE.CylinderGeometry( 0.5, 0.5, heightOfBigTicks, 64, 64, false, 0, 6.3);
var materialBigTicks = new THREE.MeshBasicMaterial( {color: colourOfBigTicks} );
for(var i= 0; i<12; i++) {
		
	var bigTicks = new THREE.Mesh(geometryBigTicks,materialBigTicks);  //Create new tick 	
	if(i!=3){
	bigTicks.position.x = (radiusTop -heightOfSmallTicks)  * Math.cos(i * 0.523599); //0.523599 in radians = 30 degrees
	bigTicks.position.y = (radiusTop -heightOfSmallTicks) * Math.sin(i * 0.523599); 
	bigTicks.rotation.y = Math.PI / 2;	
	bigTicks.rotation.x = Math.PI / 2;		
	scene.add(bigTicks);
	}
}
//----------------------------------------------------------------------------------------------
/*12 o'clock tick design*/ 
var heightOfBigTicks = 4;
var geometry12OclockTicks = new THREE.CylinderGeometry( 0.5, 0.5, heightOfBigTicks, 64, 64, false, 0, 6.3);
var material12OclockTicks = new THREE.MeshBasicMaterial( {color:'blue'} );
var TwelveOclockTicks = new THREE.Mesh(geometry12OclockTicks,material12OclockTicks);
TwelveOclockTicks.position.x = (radiusTop -heightOfSmallTicks)  * Math.cos(Math.PI/2); //12 o'clock position of x coordinate
TwelveOclockTicks.position.y = (radiusTop -heightOfSmallTicks) * Math.sin(Math.PI/2); //12 o'clock position of y coordinate
TwelveOclockTicks.rotation.y = Math.PI / 2;
TwelveOclockTicks.rotation.x = Math.PI / 2;
scene.add( TwelveOclockTicks); 	
//--------------------------------------------------------------------------------------------------------
/*Design of the second, minute and hour hands*/

var geometrySecHandCylinder = new THREE.SphereGeometry( 2, 32, 32 , 0, 6.3,0, 6.3);
var geometryMinuteHandCylinder = new THREE.SphereGeometry( 2, 32, 32 , 0, 6.3,0, 6.3);
var geometryHourHand = new THREE.SphereGeometry( 2, 32, 32 , 0, 6.3,0, 6.3);

var materialHourHandCylinder = new THREE.MeshBasicMaterial( {color: 'black'} );
/*creating front side hands*/
var hourHandCylinderFrontSide = new THREE.Mesh(geometryHourHand, materialHourHandCylinder);
var secHandCylinderFrontSide = new THREE.Mesh(geometrySecHandCylinder, materialHourHandCylinder);
var minuteHandCylinderFrontSide = new THREE.Mesh(geometryMinuteHandCylinder, materialHourHandCylinder);
/*creating back side hands*/
var hourHandCylinderBackSide = new THREE.Mesh(geometryHourHand, materialHourHandCylinder);
var minuteHandCylinderBackSide = new THREE.Mesh(geometryMinuteHandCylinder, materialHourHandCylinder);
var secondHandCylinderBackSide = new THREE.Mesh(geometrySecHandCylinder, materialHourHandCylinder);

/*Positioning and scaling the hands for front side*/
secHandCylinderFrontSide.position.z+=(1);
secHandCylinderFrontSide.scale.x = 0.2;
secHandCylinderFrontSide.scale.y = 4.9;
secHandCylinderFrontSide.scale.z = 0.2;

minuteHandCylinderFrontSide.position.z+=(1) ;
minuteHandCylinderFrontSide.scale.x = 0.2;
minuteHandCylinderFrontSide.scale.y = 3.9;
minuteHandCylinderFrontSide.scale.z = 0.2;

hourHandCylinderFrontSide.position.z+=(1);
hourHandCylinderFrontSide.scale.x = 0.2;
hourHandCylinderFrontSide.scale.y = 2.9;
hourHandCylinderFrontSide.scale.z = 0.2;

/*Positioning and scaling the hands for back side*/
secondHandCylinderBackSide.position.z+= (-1);
secondHandCylinderBackSide.scale.x = 0.2;
secondHandCylinderBackSide.scale.y = 4.9;
secondHandCylinderBackSide.scale.z = 0.2;

minuteHandCylinderBackSide.position.z += (-1);
minuteHandCylinderBackSide.scale.x = 0.2;
minuteHandCylinderBackSide.scale.y = 3.9;
minuteHandCylinderBackSide.scale.z = 0.2;

hourHandCylinderBackSide.position.z+= (-1);
hourHandCylinderBackSide.scale.x = 0.2;
hourHandCylinderBackSide.scale.y = 2.9;
hourHandCylinderBackSide.scale.z = 0.2;
/*adding hands to the scene*/
scene.add(secHandCylinderFrontSide);
scene.add(minuteHandCylinderFrontSide);
scene.add(hourHandCylinderFrontSide);
scene.add(minuteHandCylinderBackSide);
scene.add(hourHandCylinderBackSide);
scene.add(secondHandCylinderBackSide );
	
//* Render loop
var controls = new THREE.TrackballControls( camera, canvas );
controls.rotateSpeed = 2;

function render() {
    requestAnimationFrame(render);
	
	var d = new Date();
	var secondTime = d.getSeconds(); //Hamburg time's seconds
	var minuteTime = d.getMinutes();//Hamburg time's minutes
	var hourTime = d.getHours(); //Hamburg time's hours
	var NewDelhiTimeHour = hourTime + 4; //New delhi is 4 hours 30 minutes and 2 seconds ahead of Hamburg, Germany.
	var NewDelhiTimeMinute = minuteTime + 30; 	
	var NewDelhiSecondTime = secondTime + 2; 	
		
	
	if(secondTime<46){ //Checking because of the index of the ticks that are offset by 15 when created, so 15 needs to be added to compensate.(60-15 = 45).
		/*movement of the hands on the front side*/
		secHandCylinderFrontSide.position.x = ((radiusTop/2 -17)  * Math.cos((secondTime+15) * 0.10472)); //+15 because of index of ticks that are created using the for loop.
		secHandCylinderFrontSide.position.y = -1*((radiusTop/2 -17) * Math.sin((secondTime+15) * 0.10472)); //0.10472 in radians = 6 degrees
		secHandCylinderFrontSide.rotation.z=-1*(secondTime*0.10472);
		
		minuteHandCylinderFrontSide.position.x = ((radiusTop/2 -16)  * Math.cos((minuteTime+15) * 0.10472)); 
		minuteHandCylinderFrontSide.position.y = -1*((radiusTop/2 -16) * Math.sin((minuteTime+15) * 0.10472)); 
		minuteHandCylinderFrontSide.rotation.z=-1*(minuteTime*0.10472);
		
		/*movement of the hands at the back side*/
		secondHandCylinderBackSide.position.x = -1*((radiusTop/2 -17)  * Math.cos((NewDelhiSecondTime+15) * 0.10472)); 
		secondHandCylinderBackSide.position.y = -1*((radiusTop/2 -17) * Math.sin((NewDelhiSecondTime+15) * 0.10472)); 
		secondHandCylinderBackSide.rotation.z=1*(NewDelhiSecondTime*0.10472);
		
		minuteHandCylinderBackSide.position.x = -1*((radiusTop/2 -16)  * Math.cos((NewDelhiTimeMinute+15) * 0.10472)); 
		minuteHandCylinderBackSide.position.y = -1*((radiusTop/2 -16) * Math.sin((NewDelhiTimeMinute+15) * 0.10472)); 
		minuteHandCylinderBackSide.rotation.z=1*(NewDelhiTimeMinute*0.10472);		
	}
		
	if(secondTime>45){ //Checking so as to compensate for the index of the ticks. 45 is subtracted to complete the circle.
		/*movement of the hands on the front side*/
		secHandCylinderFrontSide.position.x = (radiusTop/2 -17)  * Math.cos((secondTime-45) * 0.10472); //-45 because of index of ticks that are created using the for loop.
		secHandCylinderFrontSide.position.y = -1*(radiusTop/2 -17) * Math.sin((secondTime-45) * 0.10472); 
		secHandCylinderFrontSide.rotation.z=-1*(secondTime*0.10472);
		
		minuteHandCylinderFrontSide.position.x = (radiusTop/2 -16)  * Math.cos((minuteTime-45) * 0.104729);
		minuteHandCylinderFrontSide.position.y = -1*(radiusTop/2 -16) * Math.sin((minuteTime-45) * 0.10472); 
		minuteHandCylinderFrontSide.rotation.z=-1*(minuteTime*0.10472);
		/*movement of the hands on the back side*/
		secondHandCylinderBackSide.position.x = -1*((radiusTop/2 -17)  * Math.cos((NewDelhiSecondTime-45) * 0.10472));
		secondHandCylinderBackSide.position.y =-1*((radiusTop/2 -17) * Math.sin((NewDelhiSecondTime-45) * 0.10472)); 
		secondHandCylinderBackSide.rotation.z=1*(NewDelhiSecondTime*0.10472);
		
		minuteHandCylinderBackSide.position.x = -1*((radiusTop/2 -16)  * Math.cos((NewDelhiTimeMinute-45) * 0.10472)); 
		minuteHandCylinderBackSide.position.y = -1*((radiusTop/2 -16) * Math.sin((NewDelhiTimeMinute-45) * 0.10472)); 
		minuteHandCylinderBackSide.rotation.z=1*(NewDelhiTimeMinute*0.10472);		
	}
	
	if((hourTime>0||hourTime<11) || (NewDelhiTimeHour>0||NewDelhiTimeHour<11 )){ //If am time
		/*movement of the hands on the front side*/
		hourHandCylinderFrontSide.position.x = (radiusTop/2 -14)  * Math.cos(((hourTime+(minuteTime/60))+15) * 0.523599); //0.523599 in radians = 30 degrees
		hourHandCylinderFrontSide.position.y = -1*(radiusTop/2 -14) * Math.sin(((hourTime+(minuteTime/60))+15) * 0.523599); 
		hourHandCylinderFrontSide.rotation.z=-1*((hourTime+(minuteTime/60))*0.10472);
		/*movement of the hands on the back side*/
		hourHandCylinderBackSide.position.x = -1*(radiusTop/2 -14)  * Math.cos(((NewDelhiTimeHour+(NewDelhiTimeMinute/60))+15) * 0.523599);
		hourHandCylinderBackSide.position.y = -1*(radiusTop/2 -14) * Math.sin(((NewDelhiTimeHour+(NewDelhiTimeMinute/60))+15) * 0.523599); 
		hourHandCylinderBackSide.rotation.z=1*((NewDelhiTimeHour+(NewDelhiTimeMinute/60))*0.523599);
	}

	if((hourTime>11||hourTime<23) || (NewDelhiTimeHour>11 ||NewDelhiTimeHour<23)){ //If pm time
		/*movement of the hands on the front side*/
		hourHandCylinderFrontSide.position.x = (radiusTop/2 -14)  * Math.cos(((hourTime+(minuteTime/60))-45) * 0.523599); //rotating the hour hand with minute increments to show gradual increase
		hourHandCylinderFrontSide.position.y = -1*(radiusTop/2 -14) * Math.sin(((hourTime+(minuteTime/60))-45) * 0.523599); 
		hourHandCylinderFrontSide.rotation.z=-1*((hourTime+(minuteTime/60))*0.523599);
		/*movement of the hands on the back side*/
		hourHandCylinderBackSide.position.x = -1*(radiusTop/2 -14)  * Math.cos(((NewDelhiTimeHour+(NewDelhiTimeMinute/60))-45) * 0.523599);
		hourHandCylinderBackSide.position.y = -1*(radiusTop/2 -14) * Math.sin(((NewDelhiTimeHour+(NewDelhiTimeMinute/60))-45) * 0.523599); 
		hourHandCylinderBackSide.rotation.z= 1*(((NewDelhiTimeHour+(NewDelhiTimeMinute/60))*0.523599));
	}
    controls.update();
    renderer.render(scene, camera);
}

render();
