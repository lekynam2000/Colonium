export function getPiece(n, color, side = 4.5) {
  var height = side / 2;
  var CylinderGeometry = new THREE.CylinderGeometry(side, side, height, 50);
  var CylinderMaterial = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.4,
  });
  var cylinder = new THREE.Mesh(CylinderGeometry, CylinderMaterial);

  var RingGeometry = new THREE.RingGeometry(
    (3.7 * side) / 5,
    (4.2 * side) / 5,
    100
  );
  var RingMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  var ring = new THREE.Mesh(RingGeometry, RingMaterial);

  ring.position.y += 0.501 * height;
  switch (n) {
    case 1:
      let dot = getDot(side / 5);
      ring.add(dot);
      break;
    case 2:
      let dot1 = getDot(side / 5);
      let dot2 = getDot(side / 5);
      dot1.position.x += 0.3 * side;
      dot2.position.x -= 0.3 * side;
      ring.add(dot1);
      ring.add(dot2);
      break;
    case 3:
      let r = 0.35 * side;
      let t;
      for (let i = 0; i < 3; i++) {
        t = -Math.PI / 2 - (2 * Math.PI * i) / 3;
        let dot = getDot(side / 5);
        dot.position.x = r * Math.cos(t);
        dot.position.y = r * Math.sin(t);
        ring.add(dot);
      }
      break;
    case 4:
      let circlePos = [
        { x: -1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: -1 },
      ];
      for (let i = 0; i < 4; i++) {
        let dot = getDot(side / 5);
        dot.position.x = 0.3 * side * circlePos[i].x;
        dot.position.y = 0.3 * side * circlePos[i].y;
        ring.add(dot);
      }
      break;
    default:
      var loader = new THREE.FontLoader();
      loader.load('./asset/Roboto_Bold.json', function (font) {
        let geometry = new THREE.TextGeometry(n, {
          font: font,
          size: 4,
          height: 0,
        });
        let material = new THREE.MeshBasicMaterial();
        let text = new THREE.Mesh(geometry, material);
        text.rotation.x = Math.PI;
        text.position.x = -1.5;
        text.position.y = 2;
        ring.add(text);
      });
  }
  ring.rotation.x = Math.PI / 2;

  cylinder.add(ring);
  cylinder.rotation.x = -Math.PI / 2;
  cylinder.position.z += -height * 0.501;
  return cylinder;
}
export function getDot(side) {
  var dotMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  var dotGeo = new THREE.CircleGeometry(side, 50);
  var mesh = new THREE.Mesh(dotGeo, dotMaterial);
  return mesh;
}
export function getSquare(size, color) {
  var mainRecGeo = new THREE.PlaneGeometry(0.8 * size, size);
  var sideRecGeo = new THREE.PlaneGeometry(0.1 * size, 0.8 * size);
  var cornerCircleGeo = new THREE.CircleGeometry(
    0.1 * size,
    16,
    0,
    Math.PI / 2
  );
  var material = new THREE.MeshPhongMaterial({
    color: color,
    opacity: 0.6,
    transparent: true,
  });
  var mainRec = new THREE.Mesh(mainRecGeo, material);
  var leftRec = new THREE.Mesh(sideRecGeo, material);
  var rightRec = new THREE.Mesh(sideRecGeo, material);
  var circlePos = [
    { x: -1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
  ];
  leftRec.position.x = -0.45 * size;
  rightRec.position.x = +0.45 * size;
  mainRec.add(leftRec);
  mainRec.add(rightRec);

  for (let i = 0; i < 4; i++) {
    let circle = new THREE.Mesh(cornerCircleGeo, material);
    circle.position.x = 4 * circlePos[i].x;
    circle.position.y = 4 * circlePos[i].y;
    circle.rotation.z = (Math.PI * (1 - i)) / 2;
    mainRec.add(circle);
  }
  mainRec.rotation.x = Math.PI / 2;
  mainRec.material.side = THREE.DoubleSide;
  return mainRec;
}
export function getSquareBoard(
  width,
  height,
  size = 10,
  step = 1,
  color = 0xdddddd
) {
  var i;
  var board = new THREE.Group();
  for (i = 0; i < width * height; i++) {
    let square = getSquare(size, color);
    square.position.x = (size + step) * (i % width);
    square.position.z = (size + step) * Math.floor(i / width);
    board.add(square);
  }
  board.position.x = (-(width - 1) * (size + step)) / 2;
  board.position.z = (-(height - 1) * (size + step)) / 2;
  return board;
}
