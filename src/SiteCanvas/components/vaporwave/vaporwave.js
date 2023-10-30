import * as THREE from "three";

async function loadVaporwave() {
  // const {x, y, z} = (3, 32, 32);
  const sunLight = new THREE.SpotLight("purple", 200);
  sunLight.position.set(-5, 0, 15);
  const sunTexture = new THREE.TextureLoader().load("../../../../assets/VapoSunFlat.jpg");
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: sunTexture,
    }),
  );

  return { sun, sunLight };
}

export { loadVaporwave };
