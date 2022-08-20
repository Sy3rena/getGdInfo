require('isomorphic-fetch');

const GD = require('gd.js');
const fs = require('fs');
const config = require('./config.json');

const name = config.username;
const lvlID = config.lvlID;

const gd = new GD({
    logLevel: 0,
    dbURL: "http://www.boomlings.com/database"
});

const getUserInfo = async () => {
    const player = await gd.users.get(name);
    console.log('USER accountID: ' + player.accountID);
    console.log('USER userID: ' + player.userID);
    console.log('USER stars: ' + player.stats.stars);
    console.log('USER diamonds: ' + player.stats.diamonds);
    console.log('USER secret coins: ' + player.stats.coins.normal);
    console.log('USER user coins: ' + player.stats.coins.user);
    console.log('USER demons: ' + player.stats.demons);
    console.log('USER creator points: ' + player.stats.cp);
    console.log('USER rank: ' + player.stats.rank);
    console.log('USER color icon: ')
    console.table(player.cosmetics.colors.primary);
    console.log('USER role: ')
    console.table(player.permissions);
    const rawIconResponse = await player.cosmetics.renderIcon('cube', true);
    const dest = fs.createWriteStream(name + ' icon.png');
    rawIconResponse.body.pipe(dest);
}

const getLevelInfo = async () => {
    const lvl1 = await gd.levels.search({query: lvlID});
    console.log('LEVEL lvl name: ' + lvl1.name);
    console.log('LEVEL lvl descripton: ' + lvl1.description);
    console.log('LEVEL lvl difficulty: ');
    console.table(lvl1.difficulty);
    console.log('LEVEL gameVersion: ' + lvl1.gameVersion);
    console.log('LEVEL song: ');
    console.table(lvl1.song);
    console.log('LEVEL objects: ' + lvl1.stats.objects);
    console.log('LEVEL length: ');
    console.table(lvl1.stats.length);
    console.log('LEVEL likes: ' + lvl1.stats.likes);
    console.log('LEVEL version: ' + lvl1.stats.version);
}

getUserInfo();
getLevelInfo();