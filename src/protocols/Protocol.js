/**
 * @abstract
 */
class Protocol {
    /**
     * @param {Connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     * @returns {string}
     */
    static get protocolName() { throw new Error("Must be implemented"); }
    get protocolName() { return this.constructor.protocolName; }

    get listener() { return this.connection.listener; }
    get handle() { return this.connection.listener.handle; }
    get logger() { return this.connection.listener.handle.logger; }
    get settings() { return this.connection.listener.handle.settings; }

    /**
     * @abstract
     * @param {Reader} reader
     * @returns {boolean}
     */
    distinguishes(reader) { throw new Error("Must be implemented"); }

    /**
     * @abstract
     * @param {Reader} reader
     */
    onSocketMessage(reader) { throw new Error("Must be implemented"); }

    /**
     * @abstract
     * @param {ChatSource} source
     * @param {string} message
     */
    onChatMessage(source, message) { throw new Error("Must be implemented"); }
    /**
     * @abstract
     * @param {PlayerCell} cell
     */
    onNewOwnedCell(cell) { throw new Error("Must be implemented"); }
    /**
     * @param {World} world
     * @param {boolean} includeServerInfo
     */
    onNewWorldBounds(world, includeServerInfo) { throw new Error("Must be implemented"); }
    /**
     * @abstract
     * @param {LeaderboardType} type
     * @param {LeaderboardDataType[type][]} data
     * @param {LeaderboardDataType[type]=} selfData
     */
    onLeaderboardUpdate(type, data, selfData) { throw new Error("Must be implemented"); }
    /**
     * @abstract
     * @param {ViewArea} viewArea
     */
    onSpectatePosition(viewArea) { throw new Error("Must be implemented"); }
    /**
     * @abstract
     * @param {Cell[]} add
     * @param {Cell[]} upd
     * @param {Cell[]} eat
     * @param {Cell[]} del
     */
    onVisibleCellUpdate(add, upd, eat, del) { throw new Error("Must be implemented"); }

    /**
     * @param {Buffer} data
     */
    send(data) { this.connection.send(data); }
    /**
     * @param {number=} code
     * @param {string=} reason
     */
    fail(code, reason) {
        this.connection.closeSocket(code || 1003, reason || "Unspecified protocol fail");
    }
}

module.exports = Protocol;

const Reader = require("../primitives/Reader");
const Cell = require("../cells/Cell");
const PlayerCell = require("../cells/PlayerCell");
const Connection = require("../sockets/Connection");
