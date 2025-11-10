import * as THREE from 'three';
export function lightScene(scene) {
	const light = new THREE.AmbientLight( 0xffffff, 1 );
	scene.add(light);
}
