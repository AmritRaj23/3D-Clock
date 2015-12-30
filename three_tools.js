// Helper functions for THREE lib

// Apparently, THREE matrices are column major (see Vector3.applyMatrix3 in source code).
// The documentation seems to indicate something different ...
function printMat(m, fixed) {
    if(fixed===undefined) fixed = 2;


    var len = Math.sqrt(m.elements.length);
    for(var r=0;r<len; ++r) {
        var str = '';
        for (var c=0; c<len; ++c) {
            var num = m.elements[c*len+r];
            if (num>=0) str += ' ' + num.toFixed(fixed) + ' ';
            else str += num.toFixed(fixed) + ' ';
        }
        console.log(str);
    }
}

/**
 * add x,y,z coordinate axes to scene
 */
function addWorldAxes(parent, opts) {

    // Default arguments
    if(opts === undefined) opts={}; 
    if(opts.len===undefined) opts.len = 1.5;
    if(opts.thick===undefined) opts.thick = opts.len/100;
   
    // Material and Geometry
    var redMat = new THREE.MeshBasicMaterial({color: 'red'});
    var greenMat = new THREE.MeshBasicMaterial({color: 'green'});
    var blueMat = new THREE.MeshBasicMaterial({color: 'blue'});
    var axisGeo = new THREE.CylinderGeometry(opts.thick, opts.thick, opts.len, 48);
    var headGeo = new THREE.CylinderGeometry(0, 3*opts.thick, 3*opts.thick, 48);

    // x-axis
    var xAxis = new THREE.Object3D();
    var ax = new THREE.Mesh(axisGeo, redMat);
    xAxis.add(ax);
    var head = new THREE.Mesh(headGeo, redMat);
    head.position.y = opts.len/2+opts.thick;
    xAxis.add(head);
    xAxis.rotation.z = -Math.PI/2;
    xAxis.position.x = opts.len/6;
    parent.add(xAxis);

    // y-axis
    var yAxis = new THREE.Object3D();
    ax = new THREE.Mesh(axisGeo, greenMat);
    yAxis.add(ax);
    head = new THREE.Mesh(headGeo, greenMat);
    head.position.y = opts.len/2+opts.thick;
    yAxis.add(head);
    yAxis.position.y=opts.len/6;
    parent.add(yAxis);

    // z-axis
    var zAxis = new THREE.Object3D();
    ax = new THREE.Mesh(axisGeo, blueMat);
    zAxis.add(ax);
    head = new THREE.Mesh(headGeo, blueMat);
    head.position.y = opts.len/2+opts.thick;
    zAxis.add(head);
    zAxis.rotation.x = Math.PI/2;
    zAxis.position.z = opts.len/6;
    parent.add(zAxis);
}

