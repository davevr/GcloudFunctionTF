const {DataSource} = require('apollo-datasource');

class WTFAPI extends DataSource {
    constructor(props) {
        const {store} = props;
        super();
        this.store = store;
        this.inited = false;

    }

    async handleCreate() {
        if (!this.inited) {
            this.inited = true;

        }
    }


    async initialize(config) {
        if (!this.inited)
            await this.handleCreate();

        const context = config.context;

        this.context = context;

    }

    async getLevels() {
        const levels = await this.store.Level.findAll();
        for (const curLevel of levels) {
            curLevel.description = "test 09: " + curLevel.description;
        }
        return levels;
    }

    async getSheepForLevel(levelId) {
        const sheep = await this.store.SheepObj.findAll({
        where: {
            levelId: levelId}
        });

        return sheep;
    }

    async getExitForLevel(levelId) {
        const exitObj = await this.store.ExitObj.findOne({
            where: {
                levelId: levelId}
        });

        return exitObj;
    }

    async getFencesForLevel(levelId) {
        const fences = await this.store.FenceObj.findAll({
            where: {
                levelId: levelId}
        });

        return fences;
    }

    async getEFenceForLevel(levelId) {
        const eFences = await this.store.EFenceObj.findAll({
            where: {
                levelId: levelId}
        });

        return eFences;
    }

    async getBushesForLevel(levelId) {
        const bushes = await this.store.BushObj.findAll({
            where: {
                levelId: levelId}
        });

        return bushes;
    }

    async getPuddlesForLevel(levelId) {
        const puddles = await this.store.PuddleObj.findAll({
            where: {
                levelId: levelId}
        });

        return puddles;
    }

    async getMudPuddlesForLevel(levelId) {
        const mudPuddles = await this.store.MudPuddleObj.findAll({
            where: {
                levelId: levelId}
        });

        return mudPuddles;
    }

    async getHolesForLevel(levelId) {
        const rabbitHoles = await this.store.RabbitHole.findAll({
            where: {
                levelId: levelId}
        });

        let rabbitHoleData = [];

        for (let curHole of rabbitHoles) {
            let curHoleData = curHole.dataValues;
            let entryHole = {
                xLoc: curHole.xLocEntry,
                zLoc: curHole.zLocEntry,
            };
            let exitHole = {
                xLoc: curHole.xLocExit,
                zLoc: curHole.zLocExit,
            };

            curHoleData.entryHole = entryHole;
            curHoleData.exitHole = exitHole;

            rabbitHoleData.push(curHoleData);
        }

        return rabbitHoleData;
    }

    async getDogsForLevel(levelId) {
        const dogs = await this.store.DogRun.findAll({
            where: {
                levelId: levelId}
        });

        return dogs;
    }

    async getStarsForLevel(levelId) {
        const stars = await this.store.Star.findAll({
            where: {
                levelId: levelId}
        });

        return stars;
    }

    async createLevel(newLevelData) {
        // to do:  create the level
        const newLevel = await this.store.Level.create(newLevelData);

        // add exit
        newLevelData.exit.levelId = newLevel.id;
        const newExit = await this.store.ExitObj.create(newLevelData.exit);

        // add sheep
        for (let curSheep of newLevelData.sheep) {
            curSheep.levelId = newLevel.id;
            await this.store.SheepObj.create(curSheep);
        }

        // add fences
        if (newLevelData.fences) {
            for (let curFence of newLevelData.fences) {
                curFence.levelId = newLevel.id;
                await this.store.FenceObj.create(curFence);
            }
        }

        // add electic fences
        if (newLevelData.electricFences) {
            for (let curFence of newLevelData.electricFences) {
                curFence.levelId = newLevel.id;
                await this.store.EFenceObj.create(curFence);
            }
        }

        // bushes
        if (newLevelData.bushes) {
            for (let curBush of newLevelData.bushes) {
                curBush.levelId = newLevel.id;
                await this.store.BushObj.create(curBush);
            }
        }

        // puddles
        if (newLevelData.puddles) {
            for (let curPuddle of newLevelData.puddles) {
                curPuddle.levelId = newLevel.id;
                await this.store.PuddleObj.create(curPuddle);
            }
        }

        // mud puddles
        if (newLevelData.mudPuddles) {
            for (let curPuddle of newLevelData.mudPuddles) {
                curPuddle.levelId = newLevel.id;
                await this.store.MudPuddleObj.create(curPuddle);
            }
        }

        // holes
        if (newLevelData.holes) {
            for (let curHole of newLevelData.holes) {
                curHole.levelId = newLevel.id;
                curHole.xLocEntry = curHole.entryHole.xLoc;
                curHole.zLocEntry = curHole.entryHole.zLoc;
                curHole.xLocExit = curHole.exitHole.xLoc;
                curHole.zLocExit = curHole.exitHole.zLoc;
                await this.store.RabbitHole.create(curHole);
            }
        }

        // dogs
        if (newLevelData.dogs) {
            for (let curDog of newLevelData.dogs) {
                curDog.levelId = newLevel.id;
                await  this.store.DogRun.create(curDog);
            }
        }

        // stars
        if (newLevelData.stars) {
            for (let curStar of newLevelData.stars) {
                curStar.levelId = newLevel.id;
                await this.store.Star.create(curStar);
            }
        }
        return newLevel;
    }
}

module.exports = WTFAPI;

