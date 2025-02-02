// Strategic Player makes pools of boxes that have not been captured yet in the
// following priority:
//
// - Boxes with 3 surrounding lines.
// - Boxes with 1 or 0 surrounding lines.
// - Boxes with 2 surrounding lines.
//
// Each priority of boxes is checked in order for if there are available boxes
// matching that priority. Once an available box is found, the player picks
// a random available line to draw surrounding that box as its move.

import { getAdjacentSpacerSlots, sampleArray } from './common.js';

const { SLOT_KIND } = Engine;
const { board: gameBoard } = Game;

function findPrioritySpacer(gameBoardSlots, ...priorityLineCounts) {
    const priorityBoxSlots = gameBoardSlots.filter(
        (gameBoardSlot) => {
            const { x, y } = gameBoardSlot;

            const surroundingLines = gameBoard.countSurroundingLines(x, y);

            return priorityLineCounts.includes(surroundingLines);
        },
    );

    const priorityBoxSlot = sampleArray(priorityBoxSlots);

    if (priorityBoxSlot !== null) {
        const adjacentSpacerSlots = getAdjacentSpacerSlots(priorityBoxSlot);

        return sampleArray(adjacentSpacerSlots);
    }

    return null;
}

export default () => {
    const availableBoxes = gameBoard
        .walkBoxes()
        .filter(
            (gameBoardSlot) => {
                const { slotKind } = gameBoardSlot;

                return slotKind === SLOT_KIND.box;
            },
        )
        .toArray();

    const gameBoardSlot = findPrioritySpacer(availableBoxes, 3) ??
        findPrioritySpacer(availableBoxes, 0, 1) ??
        findPrioritySpacer(availableBoxes, 2);

    if (gameBoardSlot !== null) {
        const { x, y } = gameBoardSlot;

        return {
            x,
            y,
        };
    }

    return null;
};
