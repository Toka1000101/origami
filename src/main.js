import * as THREE from 'three';
import gsap from 'gsap';

// aspect ration of A4 paper is sqrRoot(2) : 1
// which is approximatelly 1.414:1
function createPaper(size, options = {}) {
	const {
		segments = 10,
		showGrid = true,
		gridColor = 0x000000,
		paperColor = 0x808080,
		A4size = 1.414 // √2 ≈ A4 ratio
	} = options;

	const geom = new THREE.PlaneGeometry(size, size * A4size, segments, segments);
	const mat = new THREE.MeshBasicMaterial({
		color: paperColor,
		side: THREE.DoubleSide,
	});
	
	const paper = new THREE.Mesh(geom, mat);
	const paperGroup = new THREE.Group();
	paperGroup.add(paper);

	if(showGrid) {
		const wireframe = new THREE.WireframeGeometry(geom);
		const lineMaterial = new THREE.LineBasicMaterial({ color: gridColor });
		const grid = new THREE.LineSegments(wireframe, lineMaterial);
		grid.position.z = 0.01;
		paperGroup.add(grid);
	}	
	paperGroup.rotation.x = -Math.PI / 2;

	paperGroup.userData.geom = geom;
	return paperGroup;
}

function createaCreaseLine(p1, p2) {
	let points = [
		new THREE.Vector3(p1[0], 0, p1[1]),
		new THREE.Vector3(p2[0], 0, p2[1]),
	];
	let geom = new THREE.BufferGeometry().setFromPoints(points);
	let mat = new THREE.LineBasicMaterial({ color: 0x4527A0, linewidth: 5 });
	let line = new THREE.Line(geom, mat);
	line.rotation.x = Math.PI/2;
	return line;
}	

function addPlaneCreaseLines(paper) {
	let height = paper.children[0].geometry.parameters.height;
	let width = paper.children[0].geometry.parameters.width;
	let verticalCrease = createaCreaseLine([0, height/2],[0, -height/2]);
	let horizontalCrease = createaCreaseLine([width/2, 0], [-width/2, 0]);
	paper.add(verticalCrease);
	// paper.add(horizontalCrease);
}

function showVerteces(paper) {
	const geom = paper.userData.geom;
	const positions = geom.attributes.position;

	const pointsGeom = new THREE.BufferGeometry();
	pointsGeom.setAttribute('position', positions.clone()); 

	const pointsMat = new THREE.PointsMaterial({
		color: 0xffffff,
		size: 0.8,
		sizeAttenuation: true
	});

	const vertexPoints = new THREE.Points(pointsGeom, pointsMat);
	paper.add(vertexPoints);
}

function applyFold(paper, angleDeg) {
  const geom = paper.userData.geom;
  const positions = geom.attributes.position.array;
  const rad = THREE.MathUtils.degToRad(angleDeg);

  const axis = new THREE.Vector3(0, 1, 0);
  const origin = new THREE.Vector3(0, 0, 0);
  const rot = new THREE.Matrix4().makeRotationAxis(axis, rad);

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    if (x > 0) {
      const v = new THREE.Vector3(x, positions[i+1], positions[i+2]);
      v.sub(origin).applyMatrix4(rot).add(origin);
      positions[i] = v.x;
      positions[i+1] = v.y;
      positions[i+2] = v.z;
    }
  }
  geom.attributes.position.needsUpdate = true;
  geom.computeVertexNormals();
}

function foldPaper(paper, targetAngle, duration = 10.0, ease = "power2.inOut") {
  gsap.to({ angle: 0 }, {
    angle: targetAngle,
    duration: duration,
    ease: ease,
    onUpdate: function () {
      applyFold(paper, this.targets()[0].angle);
    }
  });
}

export function buildScene(scene, camera) {
	let paper = createPaper(30,{showGrid:false});
	// showVerteces(paper);
	scene.add(paper);
	addPlaneCreaseLines(paper);
	// applyFold(paper, 90);
	foldPaper(paper, 90);
}

export function update(camera) { 
}

