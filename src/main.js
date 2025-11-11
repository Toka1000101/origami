import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { lightScene } from './light';
import { playBoatAnimation } from './animation';
let mixer;
const clock = new THREE.Clock();
export function buildScene(scene, camera) {
	lightScene(scene);
  const loader = new GLTFLoader();
  const url = 'assets/cartoon_paper_boat.glb';
  function onLoad(gltf) {
		mixer = playBoatAnimation(gltf, scene, 0.7);
  }
  loader.load(
		url, 
		onLoad,
		(progress) => console.log('Loading:', (progress.loaded / progress.total * 100) + '%'),
		(error) => console.error('Load error:', error)
	);
}

export function update(camera) { 
	if (mixer) {
		mixer.update(clock.getDelta());
	}
}

