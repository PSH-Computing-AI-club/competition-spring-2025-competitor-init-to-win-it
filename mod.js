import { sampleArray, getAdjacentSpacerSlots, shuffleArray } from './common.js';

const { SLOT_KIND } = Engine;
const { board: gameBoard } = Game;

const { expandedColumns, expandedRows, grid } = gameBoard;

// finds a box slot with a given priority level and selects an adjacent spacer to draw a line
function findPrioritySpacer(gameBoardSlots, ...priorityLineCounts) {
    const priorityBoxSlots = gameBoardSlots.filter(
        (gameBoardSlot) => {
            const { x, y } = gameBoardSlot;
            const surroundingLines = gameBoard.countSurroundingLines(x, y);
            return priorityLineCounts.includes(surroundingLines);
        },
    );

    // shuffle the priority slots to introduce randomness and avoid predictable patterns(everyday im shuffling)
    const shuffledPriorityBoxSlots = shuffleArray(priorityBoxSlots);
    for (const priorityBoxSlot of shuffledPriorityBoxSlots) {
        const adjacentSpacerSlots = getAdjacentSpacerSlots(priorityBoxSlot);
        if (adjacentSpacerSlots.length > 0) {
            return sampleArray(adjacentSpacerSlots);
        }
    }
    return null;
}

// dinds a defensive move by selecting a random available spacer slot
function findDefensiveMove() {
    const availableSpacers = gameBoard.walkSpacers().filter(
        (slot) => slot.slotKind === SLOT_KIND.spacer
    ).toArray();

    // shuffle the spacers to avoid predictable defensive patterns
    const shuffledSpacers = shuffleArray(availableSpacers);
    return sampleArray(shuffledSpacers);
}

export default () => {
    // collect all available boxes on the board
    const availableBoxes = gameBoard
        .walkBoxes()
        .filter((gameBoardSlot) => gameBoardSlot.slotKind === SLOT_KIND.box)
        .toArray();

    // prioritize moves that complete a box first
    let gameBoardSlot = findPrioritySpacer(availableBoxes, 3);

    // if no immediate box completion, look for safe initial moves
    if (!gameBoardSlot) {
        gameBoardSlot = findPrioritySpacer(availableBoxes, 0, 1);
    }

    // ff no initial safe moves, look for neutral moves that dont set up the opponent
    if (!gameBoardSlot) {
        gameBoardSlot = findPrioritySpacer(availableBoxes, 2);
    }

    // ff no strategic move is found, fall back to a defensive move (dont be a loser)
    if (!gameBoardSlot) {
        gameBoardSlot = findDefensiveMove();
    }

    // return chosen move if available :) hopefully
    if (gameBoardSlot !== null) {
        const { x, y } = gameBoardSlot;
        return { x, y };
    }

    return null; // NOT VALID
};