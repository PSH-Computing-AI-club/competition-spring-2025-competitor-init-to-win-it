// Split Personality Player randomly selects two of the sample players to use
// for a match. During a game session the player randomly selected between
// the two selected players to use for a move computation.

import { sampleArray } from './common.js';

import FirstOpeningPlayer from './first_opening_player.js';
import EdgingPlayer from './edging_player.js';
import GreedyPlayer from './greedy_player.js';
import RandomPlayer from './random_player.js';
import StrategicPlayer from './strategic_player.js';

const AGGRESSIVE_PERSONALITY = sampleArray([
    GreedyPlayer,
    StrategicPlayer,
]);

const DOOFUS_PERSONALITY = sampleArray([
    FirstOpeningPlayer,
    EdgingPlayer,
    RandomPlayer,
]);

export default () => {
    return Math.random() >= 0.25
        ? AGGRESSIVE_PERSONALITY()
        : DOOFUS_PERSONALITY();
};
