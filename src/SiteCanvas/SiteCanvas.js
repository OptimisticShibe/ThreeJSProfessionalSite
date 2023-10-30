import { loadCoffee } from "./components/coffee/coffee.js";
import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Loop } from "./systems/Loop.js";

import { MathUtils, TextureLoader } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BEAN_RATIO } from "../../utils/constants.js";
import { plusOrMinus } from "../../utils/utils.js";
import { vaporwaveBg } from "../../assets/vaporwave4.jpg";

let camera;
let controls;
let renderer;
let scene;
let loop;
let beanRotate = [];

// TODO: spinner etc. while shit loads
camera = createCamera();
renderer = createRenderer();
scene = createScene();
loop = new Loop(camera, scene, renderer);
// controls = createControls(camera, renderer.domElement);
window.addEventListener("resize", createRenderer);

const { ambientLight, latteLight } = await createLights();

scene.add(ambientLight, latteLight);

setBackground();
// Load models, textures
const { coffeeMachine, coffeeCup, coffeeBean, coffeeBeanLight } = await loadCoffee();

// Function calls to generate coffee stars
// TODO: low poly in back, high in front
// coffeeBeanStarfield(coffeeBean, 10, 1.5, true);
coffeeBeanStarfield(coffeeBeanLight, 0.3, 0.01, false);

const gridHelper = new THREE.GridHelper(200, 50);

scene.add(coffeeMachine, coffeeCup);
// sun.position.z = 15;
// sun.position.setX(-5);

function start() {
  loop.start();
}
function stop() {
  loop.stop();
}

function coffeeBeanStarfield(coffeeBean, scale, scaleModifier, lowPoly = true) {
  // const beanNumber = lowPoly ? 2000 : 1000;
  const beanRatio = (numBeans) => {
    let results = [BEAN_RATIO.startingBean];
    for (let i = 1; i < numBeans; i++) {
      const staticX = BEAN_RATIO.xInc * i;
      const staticY = BEAN_RATIO.yInc * i;
      const posAdj = { x: BEAN_RATIO.xInc * i * plusOrMinus(), y: (BEAN_RATIO.yInc + Math.random() * plusOrMinus()) * i, z: 1 * i };
      const prevBean = results[i - 1];
      const adjustedBean = { x: staticX + posAdj.x, y: staticY + posAdj.y, z: prevBean.z + posAdj.z, roationDirection: plusOrMinus() };
      // Manually remove beans up in our face
      adjustedBean.z <= 5 && adjustedBean.z >= -3 ? (adjustedBean.z = -8) : "";
      results.push(adjustedBean);
    }
    results.unshift({
      x: 0,
      y: 1.482895135734938,
      z: -8,
      roationDirection: -1,
    });
    return results;
  };
  const beanCoords = beanRatio(12);
  const adj = 0.1;
  beanCoords.forEach((bean) => {
    let newBean = coffeeBean.clone();
    newBean.position.set(bean.x, bean.y, bean.z);
    newBean.scale.set(scale - adj * scaleModifier, scale - adj * scaleModifier, scale - adj * scaleModifier);
    newBean.roationDirection = bean.roationDirection;
    beanRotate.push(newBean);
    scene.add(newBean);
  });
}

function moveCamera(t = 0) {
  coffeeMachine.rotation.z += 0.03;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

function animate() {
  requestAnimationFrame(animate);
  if (beanRotate.length) {
    beanRotate.forEach((bean) => {
      const w = Math.floor(Math.random() * 5);
      bean.rotation.z += 0.004 * w * bean.roationDirection;
      bean.rotation.x += 0.003 * w * bean.roationDirection;
      bean.rotation.y += 0.001 * w * bean.roationDirection;
    });
  }
  coffeeCup.rotation.z += 0.003;
  coffeeMachine.rotation.x += 0.004;
  coffeeMachine.rotation.y += 0.0001;
  coffeeMachine.rotation.z += 0.005;
}

function setBackground() {
  const BG_IMAGE_FILE = vaporwaveBg;
  const bgImg = new Image();
  bgImg.src = BG_IMAGE_FILE;
  bgImg.onload = () => {
    const bgTexture = new TextureLoader().load(BG_IMAGE_FILE);
    bgTexture.minFilter = THREE.LinearFilter;
    scene.background = bgTexture;
    const canvas = document.querySelector("#bg");
    const canvasAspect = canvas.clientWidth / canvas.clientHeight;
    const imageAspect = bgImg.width / bgImg.height;
    const aspect = imageAspect / canvasAspect;

    scene.background.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
    scene.background.repeat.x = aspect > 1 ? 1 / aspect : 1;

    scene.background.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
    scene.background.repeat.y = aspect > 1 ? 1 : aspect;
  };
}

start();
document.querySelector("main").addEventListener("scroll", () => moveCamera(document.querySelector("main").scrollTop * -1));
moveCamera();
animate();
