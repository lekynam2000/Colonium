import Game from './build/game.js';
import { getPiece, getSquareBoard } from './drawMaterial.js';
function init() {
  var game = new Game();
  window.game = game;
  var scene = new THREE.Scene();

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
  var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  var squareBoard = getSquareBoard(game.width, game.height);
  squareBoard.children.forEach((board, index) => {
    let row = Math.floor(index / game.width);
    let col = index % game.width;
    let group = new THREE.Group();
    group.name = 'piece';
    domEvents.addEventListener(
      board,
      'mouseover',
      (event) => {
        event.target.material.opacity *= 0.5;
        document.body.style.cursor = 'pointer';
        renderer.render(scene, camera);
      },
      false
    );
    domEvents.addEventListener(
      board,
      'mouseout',
      (event) => {
        event.target.material.opacity *= 2;
        document.body.style.cursor = 'context-menu';
        renderer.render(scene, camera);
      },
      false
    );
    domEvents.addEventListener(
      board,
      'click',
      () => {
        if (game.gameMatrix[row][col].player > -1) {
          game.play(game.phase, row, col);
          update(renderer, scene, camera, domEvents, game);
        }
      },
      false
    );
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
  controls.enableRotate = false;
  update(renderer, scene, camera, domEvents, game);
}
function update(renderer, scene, camera, domEvents, game) {
  updateGameBoard(scene, game, domEvents);
  renderer.render(scene, camera);
  // controls.update();
}
function updateGameBoard(scene, game, domEvents) {
  var squareBoard = scene.getObjectByName('board');
  squareBoard.children.forEach((board, index) => {
    let row = Math.floor(index / game.width);
    let col = index % game.width;
    let group = board.getObjectByName('piece');
    if (group.children.length > 0) {
      if (game.gameMatrix[row][col].dot == 0) {
        group.children = [];
      }
    }
    if (game.gameMatrix[row][col].dot > 0) {
      let piece = getPiece(
        game.gameMatrix[row][col].dot,
        game.colorArray[game.gameMatrix[row][col].player]
      );
      group.children = [];
      group.add(piece);
      // console.log(group.children.length);
    }
  });
}
init();
