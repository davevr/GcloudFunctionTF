const { gql } = require('apollo-server-cloud-functions');

const typeDefs = gql`

    type Query {
        levels : [Level]
    }
    
    type Mutation {
        
        createLevel (newLevelData: LevelInput) : Level
    }

    input LevelInput {
        name: String
        description: String
        sheep: [SheepInput!]
        width: Float!
        height: Float!
        exit: SingleInput!
        allowedTime: Int!
        fences: [FenceInput]
        electricFences: [SingleInput]
        bushes: [SingleInput]
        puddles: [PuddleInput]
        mudPuddles: [PuddleInput]
        holes: [RabbitHoleInput]
        dogs: [DogRunInput]
        stars: [StarInput]
    }
    
    
    type Level {
        id: ID!
        name: String
        description: String
        sheep: [SheepObj!]
        width: Float!
        height: Float!
        exit: SingleObj!
        allowedTime: Int!
        fences: [FenceObj]
        electricFences: [SingleObj]
        bushes: [SingleObj]
        puddles: [PuddleObj]
        mudPuddles: [PuddleObj]
        holes: [RabbitHole]
        dogs: [DogRun]
        stars: [Star]
    }
    
    type SheepObj {
        xLoc: Float!
        zLoc: Float!
    }

    input SheepInput {
        xLoc: Float!
        zLoc: Float!
    }
    
    type SingleObj {
        xLoc: Float!
        zLoc: Float!
        angle: Float!
    }

    input SingleInput {
        xLoc: Float!
        zLoc: Float!
        angle: Float!
    }
    
    type FenceObj {
        startX: Float!
        startZ: Float!
        endX: Float!
        endZ: Float!
    }

    input FenceInput {
        startX: Float!
        startZ: Float!
        endX: Float!
        endZ: Float!
    }
    
    type PuddleObj {
        xLoc: Float!
        zLoc: Float!
        width: Float!
        height: Float!
        angle: Float!
    }

    input PuddleInput {
        xLoc: Float!
        zLoc: Float!
        width: Float!
        height: Float!
        angle: Float!
    }
    
    type DogRun {
        startX: Float!
        startZ: Float!
        endX: Float!
        endZ: Float!
        speed: Float!
    }

    input DogRunInput {
        startX: Float!
        startZ: Float!
        endX: Float!
        endZ: Float!
        speed: Float!
    }
    
    type Hole {
        xLoc: Float!
        zLoc: Float!
    }

    input HoleInput {
        xLoc: Float!
        zLoc: Float!
    }
    
    type RabbitHole {
        entryHole: Hole!
        exitHole: Hole!
    }

    input RabbitHoleInput {
        entryHole: HoleInput!
        exitHole: HoleInput!
    }
    
    type Star {
        xLoc: Float!
        zLoc: Float!
        bonus: Int!
    }

    input StarInput {
        xLoc: Float!
        zLoc: Float!
        bonus: Int!
    }
    
`;

module.exports = typeDefs;
