// Greedy Player looks for the first box with three lines surrounding it and
// captures it. If there is no boxes that meets that criteria, then the player
// picks a random available move.

import { getAdjacentSpacerSlots, sampleArray } from './common.js';

const { SLOT_KIND } = Engine;
const { board: gameBoard } = Game;

export default () => {
    const boxBoardSlot = gameBoard
        .walkBoxes()
        .filter((gameBoardSlot) => {
            const { slotKind } = gameBoardSlot;

            return slotKind === SLOT_KIND.box;
        })
        .filter((gameBoardSlot) => {
            const { x, y } = gameBoardSlot;

            return gameBoard.countSurroundingLines(x, y) === 3;
        })
        .take(1)
        .next().value ?? null;

    if (boxBoardSlot !== null) {
        const [firstAdjacentSpacer] = getAdjacentSpacerSlots(boxBoardSlot);
        const { x, y } = firstAdjacentSpacer;

        return {
            x,
            y,
        };
    }

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
