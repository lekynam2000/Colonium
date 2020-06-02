import Game from './build/game.js';
import { getPiece, getSquareBoard } from './drawMaterial.js';
function init(map = null) {
  var scene = new THREE.Scene();
  var piece = getPiece(6, 4.5);
  var squareBoard = getSquareBoard(5, 10, 10, 1, 0xdddddd);
  scene.add(squareBoard);
  squareBoard.children[30].add(piece);
  var light = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(light);
  var camera = new THREE.PerspectiveCamera(
    45, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000
  );
  camera.position.y = 90;
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('webgl').appendChild(renderer.domElement);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  update(renderer, scene, camera, controls);
}
function update(renderer, scene, camera, controls) {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls);
  });
}

init();
var game = new Game();
console.log(game);
