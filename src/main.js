import * as THREE from 'three';
import gsap from 'gsap';

// aspect ration of A4 paper is sqrRoot(2) : 1
// which is approximatelly 1.414:1
const A4size = 1.414;
function createPaper(size, options = {}) {
	const {
		segments = 10,
		showGrid = true,
		gridColor = 0x000000,
		paperColor = 0xFFFFFF,
		A4size = 1.414 // √2 ≈ A4 ratio
	} = options;

	const geom = new THREE.PlaneGeometry(size, size * A4size,10,10);
	const mat = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF,
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
	paper.add(horizontalCrease);
}

export function buildScene(scene, camera) {
	let paper = createPaper(30);
	scene.add(paper);
	addPlaneCreaseLines(paper);
}

export function update(camera) { 
}

