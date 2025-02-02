// Random Player randomly selects from a pool of available lines to draw.

import { sampleArray } from './common.js';

const { SLOT_KIND } = Engine;
const { board: gameBoard } = Game;

export default () => {
    const availableSpacers = gameBoard
        .walkSpacers()
        .filter(
            (gameBoardSlot) => {
                const { slotKind } = gameBoardSlot;

                return slotKind === SLOT_KIND.spacer;
            },
        )
        .toArray();

    const gameBoardSlot = sampleArray(availableSpacers);

    if (gameBoardSlot !== null) {
        const { x, y } = gameBoardSlot;

        return {
            x,
            y,
        };
    }

    return null;
};
