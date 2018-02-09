const World = require("../worlds/World");

/** @abstract */
class Cell {
    /**
     * @param {World} world
     * @param {Number} x
     * @param {Number} y
     * @param {Number} size
     * @param {({r: Number, g: Number, b: Number})} color
     */
    constructor(world, x, y, size, color) {
        this.world = world;

        this.birthTick = world.handle.tick;
        /** @private */
        this._x = x;
        this._y = y;
        this._size = size;
        this._color = color;
        /** @type {{x: Number, y: Number, w: Number, h: Number}} */
        this.range = null;
        /** @type {{dx: Number, dy: Number, d: Number}} */
        this.boost = {
            dx: 0,
            dy: 0,
            d: 0
        };

        /** @type {String} */
        this._name = this._skin = null;
        /** @type {Cell|null} */
        this.eatenBy = null;

        this.posChanged =
            this.sizeChanged =
            this.colorChanged =
            this.nameChanged =
            this.skinChanged =
            false;
    }

    /**
     * @abstract
     * @returns {Number}
     */
    get type() { throw new Error("Must be overriden"); }
    /** 
     * @abstract
     * @returns {Boolean}
    */
    get avoidWhenSpawning() { throw new Error("Must be overriden"); }

    get x() { return this._x; }
    get y() { return this._y; }
    /** @param {Number} value */
    set x(value) { this._x = value; this.posChanged = true; }
    /** @param {Number} value */
    set y(value) { this._y = value; this.posChanged = true; }

    get size() { return this._size; }
    /** @param {Number} value */
    set size(value) { this._size = value; this.sizeChanged = true; }

    get squareSize() { return this.size * this.size; }
    /** @param {Number} value */
    set squareSize(value) { this.size = Math.sqrt(value); }

    get mass() { return this.size * this.size / 100; }
    /** @param {Number} value */
    set mass(value) { this.size = Math.sqrt(100 * value); }

    get name() { return this._name; }
    /** @param {String} value */
    set name(value) { this._name = value; this.nameChanged = true; }

    get skin() { return this._skin; }
    /** @param {String} value */
    set skin(value) { this._skin = value; this.skinChanged = true; }

    /**
     * @param {Cell} other
     * @returns {(0|1|2|3)} 0 for none, 1 for rigid, 2 for eat, 3 for inverted eat
     */
    getEatResult(other) {
        throw new Error("Must be overriden");
    }

    onSpawned() { }
    onTick() {
        this.posChanged =
            this.sizeChanged =
            this.colorChanged =
            this.nameChanged =
            this.skinChanged =
            false;
    }
    /** @param {Cell} other */
    onAte(other) {
        this.squareSize += other.squareSize;
    }
    /** @param {Cell} other */
    onEaten(other) {
        this.eatenBy = other;
    }
    onRemoved() { }
}

module.exports = Cell;