import Game from './build/game.js';
import { getPiece, getSquareBoard } from './drawMaterial.js';
function init() {
  var game = new Game();
  window.game = game;
  var scene = new THREE.Scene();
  var squareBoard = getSquareBoard(game.width, game.height);
  squareBoard.children.forEach((board, index) => {
    let row = Math.floor(index / game.width);
    let col = index % game.width;
    let group = new THREE.Group();
    group.name = 'piece';
    if (game.gameMatrix[row][col].dot > 0) {
      let piece = getPiece(
        game.gameMatrix[row][col].dot,
        game.colorArray[game.gameMatrix[row][col].player]
      );
      group.add(piece);
    }
    board.add(group);
  });
  squareBoard.name = 'board';
  scene.add(squareBoard);

  var light = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(light);
  var camera = new THREE.PerspectiveCamera(
    70, // field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000
  );
  camera.position.y = 90;
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('webgl').appendChild(renderer.domElement);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  update(renderer, scene, camera, controls, game);
}
function update(renderer, scene, camera, controls, game) {
  updateGameBoard(scene, game);
  renderer.render(scene, camera);
  // controls.update();
  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls, game);
  });
}
function updateGameBoard(scene, game) {
  var squareBoard = scene.getObjectByName('board');
  squareBoard.children.forEach((board, index) => {
    let row = Math.floor(index / game.width);
    let col = index % game.width;
    let group = board.getObjectByName('piece');
    if (group.children.length > 0) {
      if (game.gameMatrix[row][col].dot == 0) {
        group.children = 0;
      }
    } else if (game.gameMatrix[row][col].dot > 0) {
      let piece = getPiece(
        game.gameMatrix[row][col].dot,
        game.colorArray[game.gameMatrix[row][col].player]
      );
      group.add(piece);
    }
  });
}
init();
