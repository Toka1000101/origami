import * as THREE from 'three';
export function playBoatAnimation(gltf, scene, percent = 0.5) {
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
