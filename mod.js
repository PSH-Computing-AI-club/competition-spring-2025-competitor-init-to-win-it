//player that tries its best... init to be mediocre...
import { sampleArray, getAdjacentSpacerSlots, shuffleArray } from './common.js';

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

// Evaluates move priorities dynamically based on the game state
function evaluateMovePriority(move) {
    let score = 0;
    const surroundingLines = gameBoard.countSurroundingLines(move.x, move.y);

    // Higher score for moves that capture boxes
    if (surroundingLines === 3) {
        score += 100;
    }
    
    // Penalize moves that might give the opponent an advantage
    if (surroundingLines === 2) {
        score -= 20;
    }

    // Increase priority if fewer boxes remain
    const remainingBoxes = gameBoard.remainingBoxes;
    if (remainingBoxes < 10) {
        score += 30;
    }

    return { move, score };
}

// Finds the best move based on capturing boxes and strategic positioning
function categorizeMoves() {
    const legalMoves = gameBoard.walkSpacers()
        .filter((slot) => slot.slotKind === SLOT_KIND.spacer)
        .toArray();

    let evaluatedMoves = legalMoves.map(evaluateMovePriority);
    
    // Sort moves by highest priority first
    evaluatedMoves.sort((a, b) => b.score - a.score);
    return evaluatedMoves.map(entry => entry.move);
}

// Prevents opponent from creating chains by blocking setup moves
function denyOpponentSetup() {
    const legalMoves = gameBoard.walkSpacers()
        .filter((slot) => slot.slotKind === SLOT_KIND.spacer)
        .toArray();

    for (const move of legalMoves) {
        if (gameBoard.countSurroundingLines(move.x, move.y) === 2) {
            return move; // Block chain setup
        }
    }
    return null;
}

// Prioritizes capturing available boxes before strategic positioning
function greedyMove() {
    const boxBoardSlot = gameBoard.walkBoxes()
        .filter((gameBoardSlot) => gameBoard.countSurroundingLines(gameBoardSlot.x, gameBoardSlot.y) === 3)
        .take(1)
        .next().value ?? null;

    if (boxBoardSlot !== null) {
        const [firstAdjacentSpacer] = getAdjacentSpacerSlots(boxBoardSlot);
        return firstAdjacentSpacer;
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
    
    // If no strategic move is found, fall back to optimized move selection
    const selectedMove = greedyMove() ?? denyOpponentSetup() ?? sampleArray(categorizeMoves());
    return selectedMove ? { x: selectedMove.x, y: selectedMove.y } : null;
};
