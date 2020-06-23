
var degree = 3
	, knots = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
	, pts = [ 	[ [0, 0, -10], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] , 	[40, 0, 0], [50, 0, 0] ],
				[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] , [40, -10, 0], [50, -10, 0]	],
				[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] , [40, -20, -2], [50, -20, -12] 	],
				[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, -23], 	[30, -30, 0] , [40, -30, 0], [50, -30, 0]     ],
				[ [0, -40, 0], 	[10, -40, 0], 	[20, -40, 0], 	[30, -40, 4] , [40, -40, -20], [50, -40, 0]     ],
				[ [0, -50, 12], [10, -50, 0], 	[20, -50, 20], 	[30, -50, 0] , [50, -50, -10], [50, -50, -15]     ],     ];




var controlPoints = [];
var controlMeshes = [];
addControlPoints();

var srf = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degree, degree, knots, knots, pts);
                                        //controlPoints.map(pt => { return pt.position }) );
var mesh = srf.toThreeGeometry();
addMeshToScene( mesh );



var dragControls = new THREE.DragControls(controlMeshes, camera, renderer.domElement);
dragControls.addEventListener( 'drag', function ( event) {

    var _len = pts.length;
    var _obj = event.object;

    UpdatePts(_obj.idx, _obj.position);

    controls.enabled = false;
    
}.bind(pts) );

dragControls.addEventListener( 'dragend', function ( event ) {

    //event.object.material.emissive.set( 0xaaaaaa );
    controls.enabled = true;
    
} );


function UpdatePts(_idx, _pos)
{   
    //debugger;

    var _i = Math.floor(_idx / pts.length);
    var _j = _idx % pts.length;

   pts[_i][_j] = [_pos.x, _pos.y, _pos.z];

   recomputeGeometry();
    
}

function recomputeGeometry()
{
    if(scene.getObjectByName("nurbs-surface"))
    {   
        var srf = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degree, degree, knots, knots, pts);
                                        //controlPoints.map(pt => { return pt.position }) );
        var mesh = srf.toThreeGeometry();

        //debugger;
        scene.getObjectByName("nurbs-surface").geometry = mesh;
    }
}


function addControlPoints() {

   for(var i = 0; i < pts.length; i++) {
        var pt = pts[i];
        var _cptarray = [];
        for(var j = 0; j < pt.length; j++) {
            _cpt = makeCube();
            
            _cpt.position.set(pt[j][0], pt[j][1], pt[j][2]);
            _cpt.scale.x=10;
            _cpt.scale.y=10;
            _cpt.scale.z=10;

            _cpt.idx= (i*pts.length + j);

            _cptarray.push(_cpt);
            controlMeshes.push(_cpt);

            scene.add(_cpt);
        }
        controlPoints.push(_cptarray);
    }

}

function makeCube() {
    var geom = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var cube = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
      color: "red"
    }));
    return cube;
  }