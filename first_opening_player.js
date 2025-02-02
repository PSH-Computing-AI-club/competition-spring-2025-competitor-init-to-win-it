// First Opening Player finds the first line that is available for it to draw.

const { SLOT_KIND } = Engine;
const { board: gameBoard } = Game;

export default () => {
    const gameBoardSlot = gameBoard
        .walkSpacers()
        .filter(
            (gameBoardSlot) => {
                const { slotKind } = gameBoardSlot;

                return slotKind === SLOT_KIND.spacer;
            },
        )
        .take(1)
        .next()
        .value ?? null;

    if (gameBoardSlot !== null) {
        const { x, y } = gameBoardSlot;

        return {
            x,
            y,
        };
    }

    return null;
};
