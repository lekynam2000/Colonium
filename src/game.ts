import { Square } from './model';

export default class Game {
  colorArray = [
    0xfc0303,
    0xf1f514,
    0x3f8c0b,
    0x09cde3,
    0x0918e3,
    0xe309ad,
    0xe3092d,
    0x1a1717,
  ];
  public gameMatrix: Square[][];
  public turn: number;
  public phase: number;
  public queue: { row: number; col: number }[];
  public players: number;
  public status: { dots: number; pieces: number }[] = [];
  public width: number;
  public height: number;
  constructor(map: any[] = null, players: number = 4) {
    this.queue = [];
    this.players = players;
    if (map) {
      this.gameMatrix = map;
    } else {
      this.gameMatrix = this.createSquareMatrix();
      for (let i = 0; i < players; i++) {
        this.status[i] = { dots: 3, pieces: 1 };
      }
      this.width = 10;
      this.height = 10;
    }
    this.turn = 0;
    this.phase = 0;
  }
  play(player: number, row: number, col: number) {
    if (this.gameMatrix[row][col].player !== player) {
      throw new Error('Invalid move');
    }
    if (!this.valid(row, col)) {
      throw new Error('Invalid location');
    }
    if (player !== this.phase) {
      throw new Error('Not your turn');
    }
    this.gameMatrix[row][col].dot += 1;
    console.log(this.gameMatrix[row][col]);
    if (this.gameMatrix[row][col].dot >= 4) {
      this.explode([{ row, col }], player);
    }
    if (this.phase === this.players - 1) {
      this.turn++;
      this.phase = 0;
    } else {
      this.phase++;
    }
  }
  createSquareMatrix(): Square[][] {
    let defaultMap: Square[][] = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push({ dot: 0, player: null });
      }
      defaultMap.push(row);
    }
    defaultMap[2][2] = { dot: 3, player: 0 };
    defaultMap[2][7] = { dot: 3, player: 1 };
    defaultMap[7][2] = { dot: 3, player: 2 };
    defaultMap[7][7] = { dot: 3, player: 3 };
    return defaultMap;
  }
  valid(row: number, col: number): boolean {
    if (!this.gameMatrix) return false;
    let height = this.gameMatrix.length;
    let width = this.gameMatrix[0].length;
    if (
      0 <= row &&
      row < height &&
      0 <= col &&
      col < width &&
      this.gameMatrix[row][col].dot >= 0
    ) {
      return true;
    }
    return false;
  }
  explode(arr, player) {
    for (let el of arr) {
      let row = el.row;
      let col = el.col;
      if (this.gameMatrix[row][col].dot >= 4) {
        this.gameMatrix[row][col].dot -= 4;
        if (this.gameMatrix[row][col].dot == 0) {
          this.gameMatrix[row][col].player = null;
        }
        if (this.gameMatrix[row][col].dot >= 4) {
          this.queue.unshift({ row, col });
        }
      }
    }
    for (let el of arr) {
      let row = el.row;
      let col = el.col;
      for (let r = row - 1; r < row + 2; r += 2) {
        if (this.valid(r, col)) {
          this.gameMatrix[r][col].dot += 1;
          this.gameMatrix[r][col].player = player;
          if (this.gameMatrix[r][col].dot >= 4) {
            this.queue.unshift({ row: r, col: col });
          }
        }
      }
      for (let c = col - 1; c < col + 2; c += 2) {
        if (this.valid(row, c)) {
          this.gameMatrix[row][c].dot += 1;
          this.gameMatrix[row][c].player = player;
          if (this.gameMatrix[row][c].dot >= 4) {
            this.queue.unshift({ row: row, col: c });
          }
        }
      }
    }
    while (this.queue.length > 0) {
      let currQueue = [...this.queue];
      this.queue = [];
      this.explode(currQueue, player);
    }
  }

  calculateStatus() {}
}
