import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { lightScene } from './light';
let boat;
let mixer;
const clock = new THREE.Clock();
function playAnimationPercent(gltf, scene, percent = 0.5) {
  const model = gltf.scene;
  scene.add(model);
  model.scale.set(10, 10, 10);

  const mixer = new THREE.AnimationMixer(model);
  const clip = gltf.animations[0];

  const action = mixer.clipAction(clip);
  action.setLoop(THREE.LoopOnce);
  action.clampWhenFinished = true;
  action.play();

  const targetDuration = clip.duration * percent;
  action.getClip().duration = targetDuration;

  return mixer;
}
export function buildScene(scene, camera) {
	lightScene(scene);
  const loader = new GLTFLoader();
  const url = 'assets/cartoon_paper_boat.glb';
  function onLoad(gltf) {
		mixer = playAnimationPercent(gltf, scene);
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

