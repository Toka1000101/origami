import * as THREE from 'three';

function createGround(size) {
	const geom = new THREE.PlaneGeometry(size, size);
	const mat = new THREE.MeshStandardMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide,
		roughness: 0.8,
		metalness: 0.1
	});
	const plane = new THREE.Mesh(geom, mat);
	plane.rotation.x = -Math.PI / 2;
	return plane;
}

export function buildScene(scene, camera) {
	

}

export function update(camera) { 

}


