import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { lightScene } from './light';
let boat;
let mixer;
const clock = new THREE.Clock();

export function buildScene(scene, camera) {

	lightScene(scene);

  const loader = new GLTFLoader();
  const url = 'assets/cartoon_paper_boat.glb';

  function onLoad(gltf) {
    console.log(gltf.scene);
    boat = gltf.scene;
    boat.scale.set(20, 20, 20);
    scene.add(boat);
		console.log(gltf.animations);
		let model = gltf.scene;
		// model.scale.set(0.5,0.5,0.5);
		mixer = new THREE.AnimationMixer(model);
		const action = mixer.clipAction(gltf.animations[0]);
    action.play();
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

