import { PointLight } from "three";
import { AmbientLight } from "three";

async function createLights() {
  const ambientLight = new AmbientLight("white", 4);

  const latteLight = new PointLight("purple", 20);

  latteLight.position.set(30, 30, -40);

  return { ambientLight, latteLight };
}

export { createLights };
