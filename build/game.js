var Game = /** @class */ (function () {
    function Game(map) {
        if (map === void 0) { map = null; }
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
        this.default = [];
        if (map) {
            this.gameMatrix = map;
        }
        else {
            this.gameMatrix = [];
        }
    }
    Game.prototype.createSquareMatrix = function (width, height) {
        let;
    };
    return Game;
}());
//# sourceMappingURL=game.js.map