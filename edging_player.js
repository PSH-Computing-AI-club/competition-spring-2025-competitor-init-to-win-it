// Edging Player randomly selects to draw a line either from the inner most
// edges of the game board grid and fan out or selects from the outer most
// edges of the game board grid and fan in.

import { sampleArray } from './common.js';

const { SLOT_KIND } = Engine;
const { board: gameBoard } = Game;

const { expandedColumns, expandedRows, grid } = gameBoard;

function findEdgeSpacers(layer) {
    const edgeSpacers = [];

    for (let x = layer + 1; x < (expandedColumns - layer); x += 2) {
        const gameBoardSlot = grid[layer][x];
        const opposingBoardSlot = grid[expandedRows - layer - 1][x];

        if (gameBoardSlot.slotKind === SLOT_KIND.spacer) {
            edgeSpacers.push(gameBoardSlot);
        }

        if (opposingBoardSlot.slotKind === SLOT_KIND.spacer) {
            edgeSpacers.push(opposingBoardSlot);
        }
    }

    for (let y = layer + 1; y < (expandedRows - layer); y += 2) {
        const gameBoardSlot = grid[y][layer];
        const opposingGameBoardSlot = grid[y][expandedColumns - layer - 1];

        if (gameBoardSlot.slotKind === SLOT_KIND.spacer) {
            edgeSpacers.push(gameBoardSlot);
        }

        if (opposingGameBoardSlot.slotKind === SLOT_KIND.spacer) {
            edgeSpacers.push(opposingGameBoardSlot);
        }
    }

    return edgeSpacers;
}

export default () => {
    const availableSpacers = [];

    const shouldScanOutwards = Math.random() % 2 === 0;
    const maximumEdgeLayers = Math.ceil(
        Math.min(expandedRows / 2, expandedColumns / 2),
    );

    for (
        let layer = shouldScanOutwards ? maximumEdgeLayers : 0;
        shouldScanOutwards ? (layer >= 0) : (layer < maximumEdgeLayers);
        shouldScanOutwards ? layer-- : layer++
    ) {
        availableSpacers.push(...findEdgeSpacers(layer));

        if (availableSpacers.length > 0) {
            break;
        }
    }

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
