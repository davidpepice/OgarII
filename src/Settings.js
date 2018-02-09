module.exports = Object.seal({
    /** @type {String} */
    socketAcceptedOrigins: null,
    socketPort: 443,

    worldMapX: 0,
    worldMapY: 0,
    worldMapW: 7071,
    worldMapH: 7071,
    worldFinderMaxLevel: 32,
    worldFinderMaxItems: 32,
    worldSafeSpawnTries: 16,

    pelletMinSize: 10,
    pelletMaxSize: 40,
    pelletGrowTicks: 25 * 60,
    pelletCount: 1000,

    playerViewScaleMult: 1,
    playerMinViewScale: 0.01
});