const PlayingRouter = require("../primitives/PlayingRouter");

/**
 * @abstract
*/
class Bot extends PlayingRouter {
    /**
     * @param {World} world
     */
    constructor(world) {
        super(world.handle.listener);
        this.createPlayer();
        world.addPlayer(this.player);
    }

    static get isExternal() { return false; }

    close() {
        super.close();
        this.listener.handle.removePlayer(this.player.id);
        this.disconnected = true;
        this.disconnectionTick = this.listener.handle.tick;
    }
}

module.exports = Bot;

const World = require("../worlds/World");
