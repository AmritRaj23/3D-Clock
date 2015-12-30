// Initialize webGL
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('black');    // set background color

// Create a new Three.js scene with camera and light
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin
var ambientLight = new THREE.AmbientLight("white");
scene.add(ambientLight);


// Create geometry
var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// material specifies how triangle looks like
var mat = new THREE.MeshPhongMaterial({color: "white",
                                       wireframe:true,
                                       wireframeLinewidth:2} );

// Combine geometry and material to a new object:
var obj = new THREE.Mesh(geo, mat);

scene.add(obj);

// addWorldAxes(scene);
// Draw everything
var controls = new THREE.TrackballControls( camera, canvas );
function render() {
   requestAnimationFrame(render);

   controls.update();
   renderer.render(scene, camera);
}
render();
