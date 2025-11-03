import * as THREE from 'three';

function createGround(size) {
	const geom = new THREE.PlaneGeometry(size, size);
	const mat = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide,
	});
	const plane = new THREE.Mesh(geom, mat);
	plane.rotation.x = -Math.PI / 2;
	return plane;
}

export function buildScene(scene, camera) {
	let ground = createGround(30);
	scene.add(ground);
}

export function update(camera) { 

}


