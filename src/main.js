import * as THREE from 'three';

// aspect ration of A4 paper is sqrRoot(2) : 1
// which is approximatelly 1.414:1
const A4size = 1.414;
function createPaper(size) {
	const geom = new THREE.PlaneGeometry(size, size * A4size);
	const mat = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide,
	});
	const paper = new THREE.Mesh(geom, mat);
	paper.rotation.x = -Math.PI / 2;
	return paper;
}
function createaCreaseLine(p1, p2) {
	let points = [
		new THREE.Vector3(p1[0], 0, p1[1]),
		new THREE.Vector3(p2[0], 0, p2[1]),
	];
	let geom = new THREE.BufferGeometry().setFromPoints(points);
	let mat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
	let line = new THREE.Line(geom, mat);
	line.rotation.x = Math.PI/2;
	return line;
}	

function addPlaneCreaseLines(paper) {
	let height = paper.geometry.parameters.height;
	let width = paper.geometry.parameters.width;
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


