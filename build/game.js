var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Game = /** @class */ (function () {
    function Game(map, players) {
        if (map === void 0) { map = null; }
        if (players === void 0) { players = 4; }
        this.colorArray = [
            0xfc0303,
            0xf1f514,
            0x3f8c0b,
            0x09cde3,
            0x0918e3,
            0xe309ad,
            0xe3092d,
            0x1a1717,
        ];
        this.status = [];
        this.queue = [];
        this.players = players;
        if (map) {
            this.gameMatrix = map;
        }
        else {
            this.gameMatrix = this.createSquareMatrix();
            for (var i = 0; i < players; i++) {
                this.status[i] = { dots: 3, pieces: 1 };
            }
        }
        this.turn = 0;
        this.phase = 0;
    }
    Game.prototype.play = function (player, row, col) {
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
        if (this.gameMatrix[row][col].dot >= 4) {
            this.explode([{ row: row, col: col }], player);
        }
        if (this.phase === this.players - 1) {
            this.turn++;
            this.phase = 0;
        }
        else {
            this.phase++;
        }
    };
    Game.prototype.createSquareMatrix = function () {
        var defaultMap = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push({ dot: 0, player: null });
            }
            defaultMap.push(row);
        }
        defaultMap[2][2] = { dot: 3, player: 0 };
        defaultMap[2][7] = { dot: 3, player: 1 };
        defaultMap[7][2] = { dot: 3, player: 2 };
        defaultMap[7][7] = { dot: 3, player: 3 };
        return defaultMap;
    };
    Game.prototype.valid = function (row, col) {
        if (!this.gameMatrix)
            return false;
        var height = this.gameMatrix.length;
        var width = this.gameMatrix[0].length;
        if (0 <= row &&
            row < height &&
            0 <= col &&
            col < width &&
            this.gameMatrix[row][col].dot >= 0) {
            return true;
        }
        return false;
    };
    Game.prototype.explode = function (arr, player) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var el = arr_1[_i];
            var row = el.row;
            var col = el.col;
            if (this.gameMatrix[row][col].dot >= 4) {
                this.gameMatrix[row][col].dot -= 4;
                if (this.gameMatrix[row][col].dot >= 4) {
                    this.queue;
                }
            }
        }
        for (var _a = 0, arr_2 = arr; _a < arr_2.length; _a++) {
            var el = arr_2[_a];
            var row = el.row;
            var col = el.col;
            for (var r = row - 1; r < row + 2; r += 2) {
                for (var c = col - 1; c < col + 2; c += 2) {
                    if (this.valid(r, c)) {
                        this.gameMatrix[r][c].dot += 1;
                        this.gameMatrix[r][c].player = player;
                        if (this.gameMatrix[r][c].dot >= 4) {
                            this.queue.unshift({ row: r, col: c });
                        }
                    }
                }
            }
        }
        while (this.queue.length > 0) {
            var currQueue = __spreadArrays(this.queue);
            this.queue = [];
            this.explode(currQueue, player);
        }
    };
    Game.prototype.calculateStatus = function () { };
    return Game;
}());
export default Game;
//# sourceMappingURL=game.js.map