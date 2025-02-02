/**
 * ## API Reference
 *
 * To begin using this API Reference click on a category of APIs
 * listed on the left sidebar or at the bottom of this page.
 *
 * ## AI Player Scripting Help
 *
 * For general documentation on how to script your AI Player visit
 * the [AI Player Scripting FAQs](https://github.com/PSH-Computing-AI-club/competition-spring-2025/blob/main/ai-player-scripting.md).
 *
 * ## Global APIs
 *
 * - {@linkcode Engine}
 * - {@linkcode Game}
 *
 * ## All Available Namespaces + Types
 *
 * @module
 */

/**
 * Utility Global APIs
 *
 * @category Util
 */
declare namespace Util {
    // ---------- util/event.ts ----------

    /**
     * Represents the callback supplied by subscribers to be called every dispatch.
     *
     * @category Util
     */
    type IEventCallback<T> = (value: T) => void;

    /**
     * Represents an interface to publish event data via a singleton instance.
     *
     * @category Util
     */
    interface IEvent<T> {
        /**
         * Dispatches new event details to every subscriber
         * @param details
         */
        dispatch(details: T): void;

        /**
         * Subscribes to new incoming event dispatches.
         * @param callback
         * @returns
         */
        subscribe(callback: IEventCallback<T>): IEventSubscription<T>;
    }

    /**
     * Represents an inteface for a subscribed event callback that can be destroyed.
     *
     * @category Util
     */
    interface IEventSubscription<T> {
        readonly callback: IEventCallback<T>;

        destroy(): void;
    }
}

/**
 * Game Engine Global APIs
 *
 * @category Engine
 *
 * @example
 *
 * ```javascript
 * const SLOT_KIND = Engine.SLOT_KIND;
 *
 * ... do something w/ game board slot kind enumeration ...
 * ```
 */
declare namespace Engine {
    // ---------- worker/engine_namespace.ts ----------

    // ---------- engine/errors.ts ----------

    /**
     * Represents options passed to {@linkcode Engine.InvalidPlacementError}.
     *
     * @category Engine
     */
    export interface InvalidPlacementErrorOptions extends ErrorOptions {
        /**
         * Represents the {@linkcode Engine.IPlayerTurn} instance that
         * triggered the error instance being thrown.
         */
        readonly playerTurn: IPlayerTurn;
    }

    /**
     * Represents options passed to {@linkcode Engine.InvalidQueryError}.
     *
     * @category Engine
     */
    export interface InvalidQueryErrorOptions extends ErrorOptions {
        /**
         * Represents the x-coordinate that triggered the error
         * instance being thrown.
         */
        readonly x: number;

        /**
         * Represents the y-coordinate that trigger the error
         * instance being thrown.
         */
        readonly y: number;
    }

    /**
     * Represents options passed to {@linkcode Engine.PlayerComputeThrowError}.
     *
     * @category Engine
     */
    export interface PlayerComputeThrowErrorOptions extends ErrorOptions {
        /**
         * Represents the error thrown by the {@linkcode Engine.IPlayer}
         * instance.
         */
        readonly error: Error;

        /**
         * Represents the {@linkcode Engine.IPlayer} instance that threw
         * an error during compute.
         */
        readonly player: IPlayer;
    }

    /**
     * Represents options passed to {@linkcode Engine.PlayerForfeitError}.
     *
     * @category Engine
     */
    export interface PlayerForfeitErrorOptions extends ErrorOptions {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that returned
         * `null` during their move computation.
         */
        readonly player: IPlayer;
    }

    /**
     * Represents options passed to {@linkcode Engine.PlayerTimeoutError}.
     *
     * @category Engine
     */
    export interface PlayerTimeoutErrorOptions extends ErrorOptions {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that did
         * not compute its move within the {@linkcode Engine.IGameSessionOptions.timeout}
         * configured timelimit.
         */
        readonly player: IPlayer;
    }

    /**
     * Represents when an invalid xy-pair coordinates is used to
     * make a move.
     *
     * @category Engine
     */
    export class InvalidPlacementError extends Error {
        /**
         * Represents the {@linkcode Engine.IPlayerTurn} instance that
         * triggered the error instance being thrown.
         */
        readonly playerTurn: IPlayerTurn;

        /**
         * Constructor for {@linkcode Engine.InvalidPlacementError}.
         *
         * @param message Message the error will print to console.
         * @param options Options to configure {@linkcode Engine.InvalidPlacementError}.
         */
        constructor(message: string, options: InvalidPlacementErrorOptions);
    }

    /**
     * Represents when an invalid xy-pair coordinates is used to
     * query the current game state.
     *
     * @category Engine
     */
    export class InvalidQueryError extends Error {
        /**
         * Represents the x-coordinate that triggered the error
         * instance being thrown.
         */
        readonly x: number;

        /**
         * Represents the y-coordinate that triggered the error
         * instance being thrown.
         */
        readonly y: number;

        /**
         * Constructor for {@linkcode Engine.InvalidQueryError}.
         *
         * @param message Message the error will print to console.
         * @param options Options to configure {@linkcode Engine.InvalidQueryError}.
         */
        constructor(message: string, options: InvalidQueryErrorOptions);
    }

    /**
     * Represents when the game state tries to select the next
     * {@linkcode IPlayer} instance to compute a move and none are
     * found.
     *
     * @category Engine
     */
    export class NoNextPlayerError extends Error {
        /**
         * Constructor for {@linkcode Engine.NoNextPlayerError}.
         *
         * @param message Message the error will print to console.
         * @param options Options to configure {@linkcode Engine.NoNextPlayerError}.
         */
        constructor(message: string, options?: ErrorOptions);
    }

    /**
     * Represents when an {@linkcode Engine.IPlayer} instance that threw
     * an error when its {@linkcode Engine.IPlayer.computePlayerMove} was called.
     *
     * @category Engine
     */
    export class PlayerComputeThrowError extends Error {
        /**
         * Represents the error thrown by the {@linkcode Engine.IPlayer}
         * instance.
         */
        readonly error: Error;

        /**
         * Represents the {@linkcode Engine.IPlayer} instance that threw
         * an error during compute.
         */
        readonly player: IPlayer;

        /**
         * Constructor for {@linkcode Engine.PlayerComputeThrowError}.
         *
         * @param message Message the error will print to console.
         * @param options Options to configure {@linkcode Engine.PlayerComputeThrowError}.
         */
        constructor(
            message: string,
            options: PlayerComputeThrowErrorOptions,
        );
    }

    /**
     * Represents when an {@linkcode Engine.IPlayer} instance that
     * returned a `null` value when its {@linkcode Engine.IPlayer.computePlayerMove}
     * was called.
     *
     * @category Engine
     */
    export class PlayerForfeitError extends Error {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that returned
         * `null` during their move computation.
         */
        readonly player: IPlayer;

        /**
         * Constructor for {@linkcode Engine.PlayerForfeitError}.
         *
         * @param message Message the error will print to console.
         * @param options Options to configure {@linkcode Engine.PlayerForfeitError}.
         */
        constructor(
            message: string,
            options: PlayerForfeitErrorOptions,
        );
    }

    /**
     * Represents when an {@linkcode Engine.IPlayer} instance that did
     * not compute its move within the {@linkcode Engine.IGameSessionOptions.timeout}
     * configured timelimit when its {@linkcode Engine.IPlayer.computePlayerMove}
     * was called.
     *
     * @category Engine
     */
    export class PlayerTimeoutError extends Error {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that did
         * not compute its move within the {@linkcode Engine.IGameSessionOptions.timeout}
         * configured timelimit.
         */
        readonly player: IPlayer;

        /**
         * Constructor for {@linkcode Engine.PlayerTimeoutError}.
         *
         * @param message Message the error will print to console.
         * @param options Options to configure {@linkcode Engine.PlayerTimeoutError}.
         */
        constructor(
            message: string,
            options: PlayerTimeoutErrorOptions,
        );
    }

    // ---------- engine/player.ts ----------

    /**
     * Represents options passed to {@linkcode Engine.IPlayerConstructor}.
     *
     * @category Engine
     */
    export interface IPlayerOptions {
        /**
         * Represents the initial character assigned to the
         * {@linkcode IPlayer} instance.
         */
        readonly playerInitial: string;

        /**
         * Represents the seed the {@linkcode Engine.IPlayer} instance
         * should configure their random number generator with.
         */
        readonly seed: number;

        /**
         * Represents a "stringification" function that serializes
         * the {@linkcode Engine.IPlayer} instance into a human-readable string.
         *
         * @returns Identifier for the {@linkcode IPlayer} instance.
         */
        toString(): string;
    }

    /**
     * Represents a common interface for AI players to implement. This
     * allows the game engine to communicate with AI players using
     * a strict specification without edge cases.
     *
     * @category Engine
     */
    export interface IPlayer extends IPlayerOptions {
        /**
         * The callback function for AI players that passes them
         * the current game state so they can return a computed move.
         *
         * @param gameSession
         * @param gameBoard
         * @returns The move that the {@linkcode Engine.IPlayer} instance computed.
         */
        computePlayerMove(
            gameSession: IGameSession,
            gameBoard: IGameBoard,
        ): Promise<IPlayerMove | null>;
    }

    /**
     * Represents a common interface for AI players to implement. This
     * allows for the game engine to construct AI players without having
     * to implement edge cases.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IPlayer}.
     * @returns The configured {@linkcode Engine.IPlayer} instance.
     */
    export type IPlayerConstructor<
        Options extends IPlayerOptions = IPlayerOptions,
        Player extends IPlayer = IPlayer,
    > = (
        options: Options,
    ) => Player;

    // ---------- engine/player_move.ts ----------

    /**
     * Represents a move computed by an AI player.
     *
     * @category Engine
     */
    export interface IPlayerMove {
        /**
         * Represents the x-coordinate the AI player tried to draw a
         * line at.
         */
        readonly x: number;

        /**
         * Represents the x-coordinate the AI player tried to draw a
         * line at.
         */
        readonly y: number;
    }

    /**
     * Returns if the supplied xy-pair coordinates is a legal move.
     *
     * > **IMPORTANT**: This function does _NOT_ check if the coordinate
     * > pair already had a line draw at the location.
     *
     * @category Engine
     *
     * @param x The x-coordinate to check.
     * @param y The y-coordinate to check.
     * @returns If the coordinates are a legal move.
     */
    export function isLegalMove(x: number, y: number): boolean;

    /**
     * Returns a new instance of {@linkcode Engine.IPlayerMove}.
     *
     * @category Engine
     *
     * @throws [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
     * if configured {@linkcode Engine.IPlayerMove.x} and {@linkcode Engine.IPlayerMove.y}
     * fields are not of {@linkcode Engine.SLOT_KIND.spacer} kind.
     *
     * @param options Options to configure {@linkcode Engine.IPlayerMove}.
     * @returns The configured {@linkcode Engine.IPlayerMove} instance.
     */
    export function makePlayerMove(options: IPlayerMove): IPlayerMove;

    // ---------- engine/player_turn.ts ----------

    /**
     * Represents a turn taken by an AI player that was committed to
     * the game state.
     *
     * @category Engine
     */
    export interface IPlayerTurn extends IPlayerMove {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance who
         * took the committed turn.
         */
        readonly player: IPlayer;

        /**
         * Represents the turn number of when this turn was committed.
         *
         * > **NOTE**: This number is zero-indexed!
         */
        readonly turnIndex: number;
    }

    /**
     * Returns a new {@linkcode Engine.IPlayerTurn} instance.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IPlayerTurn}.
     * @returns The configured {@linkcode Engine.IPlayerTurn} instance.
     */
    export function makePlayerTurn(options: IPlayerTurn): IPlayerTurn;

    /**
     * Returns a new {@linkcode Engine.IPlayerTurn} instance that was
     * partially configured via an {@linkcode Engine.IPlayerMove} instance.
     *
     * @category Engine
     *
     * @param moveOptions {@linkcode Engine.IPlayerMove} instance to pull data from.
     * @param turnOptions Abbreviated options to configure {@linkcode Engine.IPlayerTurn}.
     * @returns The configured {@linkcode Engine.IPlayerTurn} instance.
     */
    export function makePlayerTurnFromPlayerMove(
        moveOptions: IPlayerMove,
        turnOptions: Omit<IPlayerTurn, keyof IPlayerMove>,
    ): IPlayerTurn;

    // ---------- engine/game_board_slot.ts ----------

    /**
     * Represents an enumeration of all possible types of game board grid
     * slots that can be stored in {@linkcode Engine.IGameBoard.grid}.
     *
     * @enum
     * @category Engine
     */
    export const SLOT_KIND: {
        /**
         * Represents that the game board grid slot is a dot boundary.
         *
         * > **NOTE**: Lines cannot be placed by AI players on this
         * > slot kind.
         *
         * > **NOTE**: All game board grid slots of
         * > {@linkcode Engine.SLOT_KIND.dot} kind have coordinates
         * > following the `(even, even)` xy-pair pattern.
         */
        readonly dot: 'SLOT_DOT';

        /**
         * Represents that the game board grid slot is an empty box
         * that does not yet have an initial inside of it.
         *
         * > **NOTE**: Lines cannot be placed by AI players on this
         * > slot kind.
         *
         * > **NOTE**: All game board grid slots of
         * > {@linkcode Engine.SLOT_KIND.box} kind have coordinates
         * > following the `(odd, odd)` xy-pair pattern.
         */
        readonly box: 'SLOT_BOX';

        /**
         * Represents that the game board grid slot is a box that
         * has an initial inside of it. Thus, the box is captured.
         *
         * > **NOTE**: Lines cannot be placed by AI players on this
         * > slot kind.
         *
         * > **NOTE**: All game board grid slots of
         * > {@linkcode Engine.SLOT_KIND.initial} kind have coordinates
         * > following the `(odd, odd)` xy-pair pattern.
         */
        readonly initial: 'SLOT_INITIAL';

        /**
         * Represents that the game board grid slot is an empty
         * spacer between dot boundary slots.
         *
         * > **NOTE**: All game board grid slots of
         * > {@linkcode Engine.SLOT_KIND.spacer} kind have coordinates
         * > following the `(even, odd)` or `(odd, even)` xy-pair patterns.
         */
        readonly spacer: 'SLOT_SPACER';

        /**
         * Represents that the game board grid slot is a spacer
         * between dot boundary slots that has line drawn on it.
         *
         * > **NOTE**: Lines cannot be placed by AI players on this
         * > slot kind.
         *
         * > **NOTE**: All game board grid slots of
         * > {@linkcode Engine.SLOT_KIND.spacer} kind have coordinates
         * > following the `(even, odd)` or `(odd, even)` xy-pair patterns.
         */
        readonly line: 'SLOT_LINE';
    };

    /**
     * Represents a string union of all possible slot kind identifiers
     * there are.
     *
     * @category Engine
     */
    export type SlotKind =
        | 'SLOT_DOT'
        | 'SLOT_BOX'
        | 'SLOT_INITIAL'
        | 'SLOT_SPACER'
        | 'SLOT_LINE';

    /**
     * Represents options passed to {@linkcode Engine.makeGameBoardSlot}.
     *
     * @category Engine
     */
    export interface IGameBoardSlotOptions {
        /**
         * Represents an {@linkcode Engine.IPlayerTurn} instance associated
         * with the game board grid slot.
         *
         * > **NOTE**: This field is only filled when a line has been placed
         * > on a spacer slot or a box has been captured.
         */
        readonly playerTurn?: IPlayerTurn | null;

        /**
         * Represents the x-coordinate of where the game board grid slot
         * is located at in {@linkcode Engine.IGameBoard.grid}.
         */
        readonly x: number;

        /**
         * Represents the y-coordinate of where the game board grid slot
         * is located at in {@linkcode Engine.IGameBoard.grid}.
         */
        readonly y: number;
    }

    /**
     * Represents the common interface to all game board grid slot kinds.
     *
     * @category Engine
     */
    export interface IBaseBoardSlot extends Required<IGameBoardSlotOptions> {
        /**
         * Represents what kind the game board grid slot is.
         *
         * > **NOTE**: This value is computed by {@linkcode Engine.makeGameBoardSlot}
         * > based on the xy-pair coordinates.
         */
        readonly slotKind: SlotKind;

        /**
         * Returns if the game board grid slot is a horizontal spacer.
         *
         * > **NOTE**: This function only checks the coordinate pair. It
         * > does not check if `{@link IBaseBoardSlot.slotKind} === {@link SLOT_KIND.spacer}`.
         *
         * @returns If the game board grid slot is horizontal.
         */
        isHorizontalSpacer(): boolean;

        /**
         * Returns if the game board grid slot is a vertical spacer.
         *
         * > **NOTE**: This function only checks the coordinate pair. It
         * > does not check if `{@link IBaseBoardSlot.slotKind} === {@link SLOT_KIND.spacer}`.
         *
         * @returns if the game board grid slot is vertical.
         */
        isVerticalSpacer(): boolean;
    }

    /**
     * Represents a game board grid slot instance whose {@linkcode IBoxBoardSlot.slotKind}
     * field is always set to {@linkcode SLOT_KIND.box} and never
     * has an associated {@linkcode Engine.IPlayerTurn} assigned to it.
     *
     * @category Engine
     */
    export interface IBoxBoardSlot extends IBaseBoardSlot {
        /**
         * Represents an {@linkcode Engine.IPlayerTurn} instance associated
         * with the game board grid slot.
         *
         * > **NOTE**: This field is always `null` for this game board
         * > grid slot kind.
         */
        readonly playerTurn: null;

        /**
         * Represents what kind the game board grid slot is.
         *
         * > **NOTE**: This field is always {@linkcode SLOT_KIND.box}
         * > for this game board grid slot kind.
         */
        readonly slotKind: typeof SLOT_KIND['box'];

        /**
         * Returns `" "` to represent an empty box.
         *
         * @returns The empty box representation string.
         */
        toString(): ' ';
    }

    /**
     * Represents a game board grid slot instance whose {@linkcode IDotBoardSlot.slotKind}
     * field is always set to {@linkcode SLOT_KIND.dot} and never
     * has an associated {@linkcode Engine.IPlayerTurn} assigned to it.
     *
     * @category Engine
     */
    export interface IDotBoardSlot extends IBaseBoardSlot {
        /**
         * Represents an {@linkcode Engine.IPlayerTurn} instance associated
         * with the game board grid slot.
         *
         * > **NOTE**: This field is always `null` for this game board
         * > grid slot kind.
         */
        readonly playerTurn: null;

        /**
         * Represents what kind the game board grid slot is.
         *
         * > **NOTE**: This field is always {@linkcode SLOT_KIND.dot}
         * > for this game board grid slot kind.
         */
        readonly slotKind: typeof SLOT_KIND['dot'];

        /**
         * Returns `"."` to represent a dot boundary.
         *
         * @returns The dot boundary string representation.
         */
        toString(): '.';
    }

    /**
     * Represents a game board grid slot instance whose {@linkcode IInitialBoardSlot.slotKind}
     * field is always set to {@linkcode SLOT_KIND.initial} and always
     * has an associated {@linkcode Engine.IPlayerTurn} assigned to it.
     *
     * @category Engine
     */
    export interface IInitialBoardSlot extends IBaseBoardSlot {
        /**
         * Represents an {@linkcode Engine.IPlayerTurn} instance associated
         * with the game board grid slot.
         *
         * > **NOTE**: This field is always valid for this game board
         * > grid slot kind.
         */
        readonly playerTurn: IPlayerTurn;

        /**
         * Represents what kind the game board grid slot is.
         *
         * > **NOTE**: This field is always {@linkcode SLOT_KIND.initial}
         * > for this game board grid slot kind.
         */
        readonly slotKind: typeof SLOT_KIND['initial'];

        /**
         * Returns the initial of the AI player who captured the box.
         *
         * @returns The AI player's initial string representation.
         */
        toString(): string;
    }

    /**
     * Represents a game board grid slot instance whose {@linkcode ILineBoardSlot.slotKind}
     * field is always set to {@linkcode SLOT_KIND.line} and always
     * has an associated {@linkcode Engine.IPlayerTurn} assigned to it.
     *
     * @category Engine
     */
    export interface ILineBoardSlot extends IBaseBoardSlot {
        /**
         * Represents an {@linkcode Engine.IPlayerTurn} instance associated
         * with the game board grid slot.
         *
         * > **NOTE**: This field is always valid for this game board
         * > grid slot kind.
         */
        readonly playerTurn: IPlayerTurn;

        /**
         * Represents what kind the game board grid slot is.
         *
         * > **NOTE**: This field is always {@linkcode SLOT_KIND.line}
         * > for this game board grid slot kind.
         */
        readonly slotKind: typeof SLOT_KIND['line'];

        /**
         * Returns `"-"` or `"|"` depending on if line is horizontal
         * or vertical.
         *
         * @returns The pipe character string representation of a line.
         */
        toString(): '-' | '|';
    }

    /**
     * Represents a game board grid slot instance whose {@linkcode ISpacerBoardSlot.slotKind}
     * field is always set to {@linkcode SLOT_KIND.spacer} and never
     * has an associated {@linkcode Engine.IPlayerTurn} assigned to it.
     *
     * @category Engine
     */
    export interface ISpacerBoardSlot extends IBaseBoardSlot {
        /**
         * Represents an {@linkcode Engine.IPlayerTurn} instance associated
         * with the game board grid slot.
         *
         * > **NOTE**: This field is always `null` for this game board
         * > grid slot kind.
         */
        readonly playerTurn: null;

        /**
         * Represents what kind the game board grid slot is.
         *
         * > **NOTE**: This field is always {@linkcode SLOT_KIND.spacer}
         * > for this game board grid slot kind.
         */
        readonly slotKind: typeof SLOT_KIND['spacer'];

        /**
         * Returns `" "` to represent an empty spacer.
         *
         * @returns The empty spacer representation string.
         */
        toString(): ' ';
    }

    /**
     * Represents a game board grid slot instance that could be a
     * captured or empty box.
     *
     * > **NOTE**: This is used in APIs like {@linkcode Engine.IGameBoard.walkBoxes}
     * > which can return either kind.
     *
     * @category Engine
     */
    export type IBoxLikeBoardSlot = IBoxBoardSlot | IInitialBoardSlot;

    /**
     * Represents a game board grid slot instance that could be a
     * drawn line or empty spacer.
     *
     * > **NOTE**: This is used in APIs like {@linkcode Engine.IGameBoard.walkSpacers}
     * > which can return either kind.
     *
     * @category Engine
     */
    export type ISpacerLikeBoardSlot = ILineBoardSlot | ISpacerBoardSlot;

    /**
     * Represents all possible game board grid slot instances.
     *
     * > **NOTE**: This is used in APIs like {@linkcode Engine.IGameBoard.grid}
     * > which can return any kind.
     *
     * @category Engine
     */
    export type IGameBoardSlot =
        | IBoxBoardSlot
        | IDotBoardSlot
        | IInitialBoardSlot
        | ILineBoardSlot
        | ISpacerBoardSlot;

    /**
     * Returns the associated {@linkcode Engine.SLOT_KIND} kind matching
     * the following xy-pair coordinates criteria:
     *
     * - (even, even) — {@linkcode Engine.SLOT_KIND.dot}
     * - (odd, odd) — {@linkcode Engine.SLOT_KIND.box}
     * - (odd, even) — {@linkcode Engine.SLOT_KIND.spacer}
     * - (even, odd) — {@linkcode Engine.SLOT_KIND.spacer}
     *
     * > **NOTE**: Use this function to compute a {@linkcode Engine.SLOT_KIND}
     * > as if there were no {@linkcode Engine.IPlayerTurn} instance
     * > associated with the coordinates.
     *
     * @category Engine
     *
     * @param x The x-coordinate to compute from.
     * @param y The y-coordinate to compute from.
     * @returns The associated {@linkcode Engine.SLOT_KIND}.
     */
    export function determineInitialSlotKind(x: number, y: number): SlotKind;

    /**
     * Returns the associated {@linkcode Engine.SLOT_KIND} kind matching
     * the following xy-pair coordinates criteria:
     *
     * - (even, even) — {@linkcode Engine.SLOT_KIND.dot}
     * - (odd, odd) — {@linkcode Engine.SLOT_KIND.initial}
     * - (odd, even) — {@linkcode Engine.SLOT_KIND.line}
     * - (even, odd) — {@linkcode Engine.SLOT_KIND.line}
     *
     * > **NOTE**: Use this function to compute a {@linkcode Engine.SLOT_KIND}
     * > as if there was a {@linkcode Engine.IPlayerTurn} instance
     * > associated with the coordinates.
     *
     * @category Engine
     *
     * @param x The x-coordinate to compute from.
     * @param y The y-coordinate to compute from.
     * @returns The associated {@linkcode Engine.SLOT_KIND}.
     */
    export function determinePlacedSlotKind(x: number, y: number): SlotKind;

    /**
     * Returns if a xy-pair coordinates are a horizontal spacer.
     *
     * > **NOTE**: This function only checks the coordinate pair. It
     * > does not check {@linkcode SLOT_KIND}.
     *
     * @category Engine
     *
     * @param x The x-coordinate to check.
     * @param y The y-coordinate to check.
     * @returns If the coordinate pair are horizontal.
     */
    export function isHorizontalSpacer(x: number, y: number): boolean;

    /**
     * Returns if a xy-pair coordinates are a vertical spacer.
     *
     * > **NOTE**: This function only checks the coordinate pair. It
     * > does not check {@linkcode SLOT_KIND}.
     *
     * @category Engine
     *
     * @param x The x-coordinate to check.
     * @param y The y-coordinate to check.
     * @returns If the coordinate pair are vertical.
     */
    export function isVerticalSpacer(x: number, y: number): boolean;

    /**
     * Returns a new {@linkcode Engine.IGameBoardSlot} instance.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IGameBoardSlot}.
     * @returns The configured {@linkcode Engine.IGameBoardSlot} instance.
     */
    export function makeGameBoardSlot(
        options: IGameBoardSlotOptions,
    ): IGameBoardSlot;

    // ---------- engine/game_board.ts ----------

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameBoard.EVENT_APPLIED_CAPTURE} callbacks.
     *
     * @category Engine
     */
    export interface IAppliedCaptureEvent {
        /**
         * Represents the state of the game board grid slot _after_
         * the updated state is applied.
         */
        readonly newBoardSlot: IInitialBoardSlot;

        /**
         * Represents the state of the game board grid slot _before_
         * the updated state is applied.
         */
        readonly oldBoardSlot: IBoxBoardSlot;
    }

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameBoard.EVENT_PLACE_LINE} callbacks.
     *
     * @category Engine
     */
    export interface IPlacedLineEvent {
        /**
         * Represents the state of the game board grid slot _after_
         * the updated state is applied.
         */
        readonly newBoardSlot: ILineBoardSlot;

        /**
         * Represents the state of the game board grid slot _before_
         * the updated state is applied.
         */
        readonly oldBoardSlot: ISpacerBoardSlot;
    }

    /**
     * Represents options passed to {@linkcode Engine.makeGameBoard}.
     *
     * @category Engine
     */
    export interface IGameBoardOptions {
        /**
         * Represents the column dimension of the dot boundary grid.
         */
        readonly columns: number;

        /**
         * Represents the row dimension of the dot boundary grid.
         */
        readonly rows: number;
    }

    /**
     * Represents the game state manager that handles the game board grid,
     * placement of lines, and other interactions.
     *
     * @category Engine
     */
    export interface IGameBoard extends IGameBoardOptions {
        /**
         * Represents an event fired when the game board grid was modified
         * to have a fill in an initial at an empty box.
         *
         * @event
         *
         * @example
         *
         * ```javascript
         * // Subscribe to the event with a callback.
         * Game.session
         *     .EVENT_APPLIED_CAPTURE
         *     .subscribe((event) => {
         *         // Retrieve the new game board slot data.
         *         const newBoardSlot = event.newBoardSlot;
         *
         *         ... do something with the data...
         *     });
         * ```
         */
        readonly EVENT_APPLIED_CAPTURE: Util.IEvent<IAppliedCaptureEvent>;

        /**
         * Represents an event fired when the game board grid was modified
         * to have a line placed at an empty spacer.
         *
         * @event
         *
         * @example
         *
         * ```javascript
         * // Subscribe to the event with a callback.
         * Game.session
         *     .EVENT_PLACED_LINE
         *     .subscribe((event) => {
         *         // Retrieve the new game board slot data.
         *         const newBoardSlot = event.newBoardSlot;
         *
         *         ... do something with the data...
         *     });
         * ```
         */
        readonly EVENT_PLACED_LINE: Util.IEvent<IPlacedLineEvent>;

        /**
         * Represents how many boxes have been captured in the game
         * board grid.
         *
         * > **NOTE**: This field updates as the game progresses.
         */
        readonly boxesClaimed: number;

        /**
         * Represents how many columns have to be added to the game
         * board grid to expand it.
         *
         * @see Engine.IGameBoardGrid.expandedColumns
         */
        readonly columnPadding: number;

        /**
         * Represents the amount of columns allocated to the expanded
         * 2D array stored in {@linkcode Engine.IGameBoard.grid}.
         */
        readonly expandedColumns: number;

        /**
         * Represents the amount of rows allocated to the expanded
         * 2D array stored in {@linkcode Engine.IGameBoard.grid}.
         */
        readonly expandedRows: number;

        /**
         * Represents how many horizontal spacers between dot boundaries
         * exist in the game board grid.
         */
        readonly horizontalSpacers: number;

        /**
         * Represents a 2D array that stores every game board grid slot
         * first by row then by column.
         *
         * The 2D array is an expanded version of a {@linkcode Engine.IGameBoardOptions.columns}
         * x {@linkcode Engine.IGameBoardOptions.rows} grid of dots. The
         * grid is expanded by adding {@linkcode Engine.IGameBoard.columnPadding}
         * x {@linkcode Engine.IGameBoard.rowPadding} of columns x rows.
         *
         * @example
         *
         * For example, 3x5 2D grid of dots would normally look like this:
         *
         * ```plaintext
         * .....
         * .....
         * .....
         * ```
         *
         * But when using the padding values from {@linkcode Engine.IGameBoard.columnPadding}
         * and {@linkcode Engine.IGameBoard.rowPadding}, the dot grid
         * is expanded into a 2D grid that include spacing between the dots:
         *
         * ```plaintext
         * . . . . .
         *
         * . . . . .
         *
         * . . . . .
         * ```
         *
         * Each character, including spacing characters, is its own game
         * board grid slot.
         *
         * Let's say you wanted to access this box:
         *
         * ```plaintext
         * . . . . .
         *    X
         * . . . . .
         *
         * . . . . .
         * ```
         *
         * It is at the xy-pair coordinates (3, 1). You would reference it
         * like so:
         *
         * ```javascript
         * // Store our coordinates in variables.
         * const x = 3;
         * const y = 1;
         *
         * // Access the yth row first and then the xth column.
         * const boxRef1 = Game.board.grid[y][x];
         *
         * // Or more directory without variables:
         * const boxRef2 = Game.board.grid[1][3];
         * ```
         *
         * @example
         *
         * ```javascript
         * // Cache the variables for future use below.
         * const SLOT_KIND = Engine.SLOT_KIND;
         * const expandedColumns = Game.board.expandedColumns;
         * const expandedRows = Game.board.expandedRows;
         * const grid = Game.board.grid;
         *
         * export default () => {
         *     // We are going to loop through every row and column
         *     // using a standard for-loop.
         *     for (let y = 0; y <= expandedRows; y++) {
         *         for (let x = 0; x <= expandedColumns; x++) {
         *             const gameBoardSlot = grid[y][x];
         *
         *             // We are looking only for empty spacers.
         *             if (gameBoardSlot.slotKind === SLOT_KIND.spacer) {
         *                 // We will have our AI player return the first one is finds.
         *                 return {
         *                     x,
         *                     y
         *                 };
         *             }
         *         }
         *     }
         *
         *     // Since we did not find anything, forfeit.
         *     return null;
         * };
         * ```
         */
        readonly grid: readonly (readonly IGameBoardSlot[])[];

        /**
         * Represents the remaining amount of empty boxes that have not
         * been captured yet.
         *
         * > **NOTE**: This field updates as the game progresses.
         */
        readonly remainingBoxes: number;

        /**
         * Represents how many spacers have not yet had a line placed on
         * them.
         *
         * > **NOTE**: This field updates as the game progresses.
         */
        readonly remainingSpacers: number;

        /**
         * Represents how many rows have to be added to the game
         * board grid to expand it.
         *
         * @see Engine.IGameBoardGrid.expandedRows
         */
        readonly rowPadding: number;

        /**
         * Represents how many spacers have had lines placed on them
         * in the game board grid.
         *
         * > **NOTE**: This field updates as the game progresses.
         */
        readonly spacersClaimed: number;

        /**
         * Represents how many boxes (empty + initial'd) exist total in
         * the game board grid.
         */
        readonly totalBoxes: number;

        /**
         * Represents how many spacers (empty + line) exist total in
         * the game board grid.
         */
        readonly totalSpacers: number;

        /**
         * Represents how many vertical spacers between dot boundaries
         * exist in the game board grid.
         */
        readonly verticalSpacers: number;

        /**
         * Applies any captures to empty boxes that have four lines
         * around them.
         *
         * > **WARNING**: Do not use this API unless you are using it on a
         * > {@linkcode Engine.IGameBoard} instance you have created
         * > with {@linkcode Engine.makeGameBoard}!
         * >
         * > The instance exposed as the singleton {@linkcode Game.board}
         * > is a copy of the game engine's main game state.
         * >
         * > You cannot directly alter the game engine's main game state.
         *
         * @returns The amount of captures made.
         */
        applyCaptures(): number;

        /**
         * Returns the amount of lines surrounding a box (empty or initial'd).
         *
         * @example
         *
         * ```javascript
         * // Cache the singleton for future use below.
         * const SLOT_KIND = Engine.SLOT_KIND;
         * const board = Game.board;
         *
         * export default () => {
         *     // `IGameBoard.walkBoxes` uses an optimized traversal algorithm. So,
         *     // let's use that method instead looping `IGameBoard.grid` w/ for-loops.
         *     for (const box of board.walkBoxes()) {
         *         // We only want boxes that have not already been captured.
         *         if (box.slotKind === SLOT_KIND.initial) {
         *             continue;
         *         }
         *
         *         // We only want boxes that we can capture right away.
         *         if (board.countSurroundingLines(box.x, box.y) !== 3) {
         *             continue;
         *         }
         *
         *         // We found our first box we can capture, return its coordinates.
         *         return {
         *             x: box.x,
         *             y: box.y
         *         };
         *     }
         *
         *     // Since we did not find anything, forfeit.
         *     return null;
         * };
         * ```
         *
         * @throws {@linkcode Engine.InvalidQueryError} If the xy-pair coordinates are not a box.
         *
         * @param x The x-coordinate to pull data from.
         * @param y The y-coordinate to pull data from.
         * @returns The amount of lines surrounding the box.
         */
        countSurroundingLines(x: number, y: number): number;

        /**
         * Returns the {@linkcode IPlayerTurn} instance that placed the most
         * recent line surrounding the box.
         *
         * @throws {@linkcode Engine.InvalidQueryError} If the xy-pair coordinates are not a box.
         *
         * @param x The x-coordinate to pull data from.
         * @param y The y-coordinate to pull data from.
         * @returns The most recent turn, if any.
         */
        determinePriorityPlayerTurn(x: number, y: number): IPlayerTurn | null;

        /**
         * Places a line at an empty spacer using data from a
         * {@linkcode Engine.IPlayerTurn} instance.
         *
         * > **WARNING**: Do not use this API unless you are using it on a
         * > {@linkcode Engine.IGameBoard} instance you have created
         * > with {@linkcode Engine.makeGameBoard}!
         * >
         * > The instance exposed as the singleton {@linkcode Game.board}
         * > is a copy of the game engine's main game state.
         * >
         * > You cannot directly alter the game engine's main game state.
         *
         * @throws {@linkcode Engine.InvalidPlacementError} If the xy-pair coordinates are not a an empty spacer.
         *
         * @param playerTurn The {@linkcode Engine.IPlayerTurn} instance to pull data from.
         */
        placeLine(playerTurn: IPlayerTurn): void;

        /**
         * Returns a visualized version of the game board grid as a string.
         *
         * @example
         *
         * ```plaintext
         *    0
         *    012345678
         * 00 . . .-.-.
         *  1 |
         *  2 .-.-.-.-.
         *  3       |B|
         *  4 . .-.-.-.
         *
         * @returns Visualization of the game board grid.
         * ```
         */
        toString(): string;

        /**
         * Returns a generator that yields all boxes (empty + initial'd)
         * via an optimized for-loop.
         *
         * @example
         *
         * ```javascript
         * // Cache the singleton for future use below.
         * const board = Game.board;
         *
         * export default () => {
         *     for (const box of board.walkBoxes()) {
         *         ... do stuff ...
         *     }
         * };
         * ```
         *
         * @returns
         */
        walkBoxes(): Generator<IBoxLikeBoardSlot>;

        /**
         * Returns a generator that yields all dot boundaries
         * via an optimized for-loop.
         *
         * @example
         *
         * ```javascript
         * // Cache the singleton for future use below.
         * const board = Game.board;
         *
         * export default () => {
         *     for (const dot of board.walkSpacers()) {
         *         ... do stuff ...
         *     }
         * };
         * ```
         *
         * @returns
         */
        walkDots(): Generator<IDotBoardSlot>;

        /**
         * Returns a generator that yields all spacers (empty + line)
         * via an optimized for-loop.
         *
         * @example
         *
         * ```javascript
         * // Cache the singleton for future use below.
         * const board = Game.board;
         *
         * export default () => {
         *     for (const spacer of board.walkSpacers()) {
         *         ... do stuff ...
         *     }
         * };
         * ```
         *
         * @returns
         */
        walkSpacers(): Generator<ISpacerLikeBoardSlot>;
    }

    /**
     * Returns a new {@linkcode Engine.IGameBoard} instance.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IGameBoard}.
     * @returns The configured {@linkcode Engine.IGameBoard} instance.
     */
    export function makeGameBoard(options: IGameBoardOptions): IGameBoard;

    // ---------- engine/game_session.ts ----------

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameSession.EVENT_PLAYER_FORFEIT} callbacks.
     *
     * @category Engine
     */
    export interface IPlayerForfeitEvent {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that the
         * dispatched event pertains to.
         */
        readonly player: IPlayer;

        /**
         * Represents the turn index that the dispatched event pertains
         * to.
         */
        readonly turnIndex: number;
    }

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameSession.EVENT_PLAYER_TIMEOUT} callbacks.
     *
     * @category Engine
     */
    export interface IPlayerTimeoutEvent {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that the
         * dispatched event pertains to.
         */
        readonly player: IPlayer;

        /**
         * Represents the turn index that the dispatched event pertains
         * to.
         */
        readonly turnIndex: number;
    }

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameSession.EVENT_TURN_ERROR} callbacks.
     *
     * @category Engine
     */
    export interface ITurnErrorEvent {
        /**
         * Represents the runtime error instance thrown by the AI player.
         */
        readonly error: Error;

        /**
         * Represents the {@linkcode Engine.IPlayer} instance that the
         * dispatched event pertains to.
         */
        readonly player: IPlayer;

        /**
         * Represents the turn index that the dispatched event pertains
         * to.
         */
        readonly turnIndex: number;
    }

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameSession.EVENT_TURN_END} callbacks.
     *
     * @category Engine
     */
    export interface ITurnEndEvent {
        /**
         * Represents the amount of empty boxes the AI player captured from
         * the move they made.
         *
         * > **NOTE**: An AI player can only ever capture one or two empty
         * > boxes per-turn.
         * >
         * > They can however chain multiple turns to get more captures.
         */
        readonly capturesMade: number;

        /**
         * Represents the {@linkcode Engine.IPlayer} instance that the
         * dispatched event pertains to.
         */
        readonly player: IPlayer;

        /**
         * Represents the turn index that the dispatched event pertains
         * to.
         */
        readonly turnIndex: number;
    }

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameSession.EVENT_TURN_MOVE} callbacks.
     *
     * @category Engine
     */
    export interface ITurnMoveEvent {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that the
         * dispatched event pertains to.
         */
        readonly player: IPlayer;

        /**
         * Represents the {@linkcode Engine.IPlayerMove} instance that the
         * AI player computed.
         */
        readonly playerMove: IPlayerMove;

        /**
         * Represents the turn index that the dispatched event pertains
         * to.
         */
        readonly turnIndex: number;
    }

    /**
     * Represents the event details dispatched to
     * {@linkcode Engine.IGameSession.EVENT_TURN_START} callbacks.
     *
     * @category Engine
     */
    export interface ITurnStartEvent {
        /**
         * Represents the {@linkcode Engine.IPlayer} instance that the
         * dispatched event pertains to.
         */
        readonly player: IPlayer;

        /**
         * Represents the turn index that the dispatched event pertains
         * to.
         */
        readonly turnIndex: number;
    }

    /**
     * Represents the options passed to {@linkcode Engine.makeGameSession}.
     *
     * @category Engine
     */
    export interface IGameSessionOptions {
        /**
         * Represents the {@linkcode Engine.IGameBoard} engine that the
         * {@linkcode Engine.IGameSession} is being configured to manage.
         */
        readonly gameBoard: IGameBoard;

        /**
         * Represents the AI players who will be managed by the
         * {@linkcode Engine.IGameSession} instance.
         */
        readonly players: IPlayer[];

        /**
         * Represents the maximum amount of milliseconds that AI players
         * managed by the {@linkcode Engine.IGameSession} instance have
         * to compute their moves when {@linkcode Engine.computeNextPlayerTurn}
         * is called.
         */
        readonly timeout: number;
    }

    /**
     * Represents the game state manager that handles turn order and player
     * interaction.
     *
     * @category Engine
     */
    export interface IGameSession extends IGameSessionOptions {
        /**
         * Represents an event fired when an AI player forefeits.
         *
         * @event
         *
         * > **NOTE**: When this event is fired the game is terminated.
         *
         * @example
         *
         * ```javascript
         * // Subscribe to the event with a callback;
         * Game.session
         *     .EVENT_PLAYER_FORFEIT
         *     .subscribe((event) => {
         *         // Retrieve the player who forfeited.
         *         const playerWhoForfeited = event.player;
         *
         *         ... do something with this information ...
         *     });
         * ```
         */
        readonly EVENT_PLAYER_FORFEIT: Util.IEvent<IPlayerForfeitEvent>;

        /**
         * Represents an event fired when an AI player fails to compute
         * their move in the configured {@linkcode Engine.IGameSessionOptions.timeout}.
         *
         * @event
         *
         * @example
         *
         * ```javascript
         * // Subscribe to the event with a callback.
         * Game.session
         *     .EVENT_PLAYER_TIMEOUT
         *     .subscribe((event) => {
         *         // Retrieve the player who timed out.
         *         const playerWhoTimedout = event.player;
         *
         *         ... do something with this information ...
         *     });
         * ```
         */
        readonly EVENT_PLAYER_TIMEOUT: Util.IEvent<IPlayerTimeoutEvent>;

        /**
         * Represents an event fired when an AI player finishes their turn.
         *
         * @event
         *
         * @example
         *
         * ```javascript
         * // Cache the singleton for future usage below.
         * const me = Game.player;
         *
         * // Define some tracking variables for usage below.
         * let lastPlayer = null;
         * let lastPlayerChainCount = 0;
         *
         * Game.session
         *     .EVENT_TURN_END
         *     .subscribe((event) => {
         *         // Cache the player who ended their turn for use below.
         *         const player = event.player;
         *
         *         if (player !== lastPlayer) {
         *             // The player who is ending their turn is a different
         *             // player.
         *             lastPlayerChainCount = 0;
         *         } else {
         *             // The player has had multiple turns in a row via
         *             // chaining box captures.
         *             lastPlayerChainCount = lastPlayerChainCount + 1;
         *         }
         *
         *         // We need to always update this to properly keep track of
         *         // who went last regardless if there was a turn chain.
         *         lastPlayer = player;
         *     });
         *
         * export default () => {
         *     // Predefine a move variable we will assign below.
         *     let move;
         *
         *     if (lastPlayerChainCount > 0 && lastPlayer !== me) {
         *         // Use a specific strategy if our opponent(s) have been
         *         // making big chain box captures.
         *         move = ... calculate a move ...;
         *     } else {
         *         // Otherwise, if our AI player has been making big capture
         *         // chains or the opponent(s) have not been, then we use
         *         // another strategy.
         *         move = ... calculate a move ...;
         *     }
         *
         *     // Return the xy-pair coordinates of the calculated move.
         *     return {
         *         x: move.x,
         *         y: move.y
         *     };
         * };
         * ```
         */
        readonly EVENT_TURN_END: Util.IEvent<ITurnEndEvent>;

        /**
         * Represents an event fired when an AI player throws a runtime error.
         *
         * @event
         *
         * > **NOTE**: When this event is fired the game is terminated.
         *
         * @example
         *
         * ```javascript
         * // Subscribe to the event with a callback.
         * Game.session
         *     .EVENT_TURN_ERROR
         *     .subscribe((event) => {
         *         // Retrieve the player who errored.
         *         const playerWhoErrored = event.player;
         *
         *         ... do something with this information ...
         *     });
         * ```
         */
        readonly EVENT_TURN_ERROR: Util.IEvent<ITurnErrorEvent>;

        /**
         * Represents an event fired when an AI player computed their move.
         *
         * @event
         *
         * @example
         *
         * ```javascript
         * // Define some tracking variables for usage below.
         * let lastMoveMade = null;
         *
         * // Subscribe to the event with a callback.
         * Game.session
         *     .EVENT_TURN_MOVE
         *     .subscribe((event) => {
         *         // Retrieve the last move made.
         *         lastMoveMade = event.playerMove;
         *      });
         *
         * export default () => {
         *     // Predefine a move variable we will assign below.
         *     let move;
         *
         *     if (lastMoveMade === null) {
         *         // No move has been made yet. Meaning, we need to calculate
         *         // the opening move.
         *         move = ... calculate a move ...;
         *     } else {
         *         // Otherwise, an AI player has made a move before. Why
         *         // not try the strategy of using `lastMoveMade.x` / `lastMoveMade.y`
         *         // to calculate a move in the opposite quadrant of the
         *         // game board grid.
         *         move = ... calculate a move ...;
         *     }
         *
         *     // Return the xy-pair coordinates of the calculated move.
         *     return {
         *         x: move.x,
         *         y: move.y
         *     };
         * };
         * ```
         */
        readonly EVENT_TURN_MOVE: Util.IEvent<ITurnMoveEvent>;

        /**
         * Represents an event fired when an AI player starts their turn.
         *
         * @event
         *
         * @example
         *
         * ```javascript
         * // Subscribe to the event with a callback.
         * Game.session
         *     .EVENT_TURN_START
         *     .subscribe((event) => {
         *         // Retrieve the player whose turn it is.
         *         const playerWhoseTurnItIs = event.player;
         *
         *         ... do something with this information ...
         *     });
         * ```
         */
        readonly EVENT_TURN_START: Util.IEvent<ITurnStartEvent>;

        /**
         * Represents the all the turns taken by AI players thus far
         * in the current game.
         *
         * > **NOTE**: This array grows with turns as the game progresses.
         *
         * @example
         *
         * ```javascript
         * // Cache the singletons for future usage below.
         * const me = Game.player;
         * const session = Game.session;
         *
         * export default () => {
         *     // Get the amount of turns our AI player has taken so far.
         *     const turnsWeHaveMade = session
         *         .playerTurns
         *         // Filter out all turns made by our AI player.
         *         .filter((playerTurn) => playerTurn.player === me)
         *         .length;
         *
         *     // Predefine a move variable we will assign below.
         *     let move;
         *
         *     if (turnsWeHaveMade < 6) {
         *         // If we have made less than six turns, then maybe the
         *         // strategy should be to player less aggressively to
         *         // confuse the opponent.
         *         move = ... calculate a move ...;
         *     } else {
         *         // Otherwise, start ramping up once we make at least
         *         // five moves.
         *         move = ... calculate a move ...;
         *     }
         * };
         * ```
         */
        readonly playerTurns: IPlayerTurn[];

        /**
         * Applies a computed {@linkcode Engine.IPlayerTurn} instance to
         * the game state.
         *
         * > **WARNING**: Do not use this API unless you are using it on a
         * > {@linkcode Engine.IGameSession} instance you have created
         * > with {@linkcode Engine.makeGameSession}!
         * >
         * > The instance exposed as the singleton {@linkcode Game.session}
         * > is a copy of the game engine's main game state.
         * >
         * > You cannot directly alter the game engine's main game state.
         *
         * @param playerTurn The {@linkcode Engine.IPlayerTurn} instance being used
         * to make the turn.
         * @returns The amount of captures made in the turn.
         */
        applyPlayerTurn(playerTurn: IPlayerTurn): number;

        /**
         * Uses the next AI player in turn order to compute their move
         * that will then be converted into a {@linkcode Engine.IPlayerTurn}
         * instance.
         *
         * > **WARNING**: Do not use this API unless you are using it on a
         * > {@linkcode Engine.IGameSession} instance you have created
         * > with {@linkcode Engine.makeGameSession}!
         * >
         * > The instance exposed as the singleton {@linkcode Game.session}
         * > is a copy of the game engine's main game state.
         * >
         * > You cannot directly alter the game engine's main game state.
         *
         * @returns The computed {@linkcode Engine.IPlayerTurn} instance.
         */
        computeNextPlayerTurn(): Promise<IPlayerTurn>;

        /**
         * Shifts the internal turn order by popping the current player
         * from the top of the double ended queue and pushed to the back.
         *
         * > **WARNING**: Do not use this API unless you are using it on a
         * > {@linkcode Engine.IGameSession} instance you have created
         * > with {@linkcode Engine.makeGameSession}!
         * >
         * > The instance exposed as the singleton {@linkcode Game.session}
         * > is a copy of the game engine's main game state.
         * >
         * > You cannot directly alter the game engine's main game state.
         *
         * @param capturesMade The number of captures made from an AI player's turn.
         */
        shiftTurnOrder(capturesMade: number): void;
    }

    /**
     * Returns a new {@linkcode Engine.IGameSession} instance.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IGameSession}.
     * @returns The configured {@linkcode Engine.IGameSession} instance.
     */
    export function makeGameSession(options: IGameSessionOptions): IGameSession;

    // ---------- engine/game_result.ts ----------

    /**
     * Represents an enumeration of all possible win kind identifiers
     * there are.
     *
     * @enum
     * @category Engine
     */
    export const WIN_KIND: {
        /**
         * Represents that no players in a Dots and Boxes game scored
         * any points.
         *
         * > **NOTE**: This could be due to players forfeiting or
         * > stalemating.
         */
        readonly no_contest: 'WIN_NO_CONTEST';

        /**
         * Represents that a single player won the Dots and Boxes game.
         */
        readonly singular: 'WIN_SINGULAR';

        /**
         * Represents the multiple players won a Dots and Boxes game.
         *
         * > **NOTE**: This is due to the highest score calculated
         * > was by multiple players.
         */
        readonly multiple: 'WIN_MULTIPLE';
    };

    /**
     * Represents a string union of all possible win kind identifiers
     * there are.
     *
     * @category Engine
     */
    export type WinKind = 'WIN_NO_CONTEST' | 'WIN_SINGULAR' | 'WIN_MULTIPLE';

    /**
     * Represents options passed to {@linkcode Engine.makeGameResult}.
     *
     * @category Engine
     */
    export interface IGameResultOptions {
        /**
         * Represents a mapping of players and their current scores.
         */
        readonly scores: ReadonlyMap<IPlayer, number>;
    }

    /**
     * Represents the computed scoring result of a game state.
     *
     * @category Engine
     */
    export interface IGameResult extends IGameResultOptions {
        /**
         * Represents the highest score found in {@linkcode Engine.IGameResultOptions.scores}.
         */
        readonly highestScore: number;

        /**
         * Represents what kind of win condition that was computed
         * from the scores found in {@linkcode Engine.IGameResultOptions.scores}.
         */
        readonly winKind: WinKind;

        /**
         * Represents a set containing the players who has the
         * highest scores found in {@linkcode Engine.IGameResultOptions.scores}.
         */
        readonly winningPlayers: ReadonlySet<IPlayer>;
    }

    /**
     * Returns a new instance of {@linkcode Engine.IGameResult}.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IGameResult}.
     * @returns The configured {@linkcode Engine.IGameResult} instance.
     */
    export function makeGameResult(options: IGameResultOptions): IGameResult;

    /**
     * Returns a computed scoring result of a Dots and Boxes given any game
     * session and game board.
     *
     * @category Engine
     *
     * @param gameSession {@linkcode Engine.IGameSession} instance to pull data from.
     * @param gameBoard {@linkcode Engine.IGameBoard} instance to pull data from.
     * @returns The configured {@linkcode Engine.IGameResult} instance.
     */
    export function computeGameResultFromGame(
        gameSession: IGameSession,
        gameBoard: IGameBoard,
    ): IGameResult;

    // ---------- engine/constant_player.ts ----------

    /**
     * Represents the options passed to {@linkcode Engine.makeConstantPlayer}.
     *
     * @category Engine
     */
    export interface IConstantPlayerOptions extends IPlayerOptions {
        /**
         * Represents the x-coordinate that the {@linkcode Engine.IConstantPlayer}
         * instance will always compute.
         */
        readonly x: number;

        /**
         * Represents the y-coordinate that the {@linkcode Engine.IConstantPlayer}
         * instance will always compute.
         */
        readonly y: number;
    }

    /**
     * Represents an AI player that always returns a move at a specific
     * set of coordinates when it is their turn to compute a move.
     *
     * @category Engine
     */
    export type IConstantPlayer = IPlayer & IConstantPlayerOptions;

    /**
     * Returns a new instance of {@linkcode Engine.IConstantPlayer}.
     *
     * > **NOTE**: This function implements {@linkcode Engine.IPlayerConstructor}.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IConstantPlayer}.
     * @returns The configured {@linkcode Engine.IConstantPlayer} instance.
     */
    export function makeConstantPlayer(
        options: IConstantPlayerOptions,
    ): IConstantPlayer;

    // ---------- engine/dummy_player.ts ----------

    /**
     * Represents the options passed to {@linkcode Engine.makeDummyPlayer}.
     *
     * @category Engine
     */
    export type IDummyPlayerOptions = IPlayerOptions;

    /**
     * Represents an AI player that always throws an error when it is
     * their turn to compute a move.
     *
     * @category Engine
     */
    export type IDummyPlayer = IPlayer;

    /**
     * Returns a new instance of {@linkcode Engine.IDummyPlayer}.
     *
     * > **NOTE**: This function implements {@linkcode Engine.IPlayerConstructor}.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IDummyPlayer}.
     * @returns The configured {@linkcode Engine.IDummyPlayer} instance.
     */
    export function makeDummyPlayer(
        options: IDummyPlayerOptions,
    ): IDummyPlayer;

    // ---------- engine/forfeit_player.ts ----------

    /**
     * Represents the options passed to {@linkcode Engine.makeForfeitPlayer}.
     *
     * @category Engine
     */
    export type IForfeitPlayerOptions = IPlayerOptions;

    /**
     * Represents an AI player that always forfeits when it is
     * their turn to compute a move.
     *
     * @category Engine
     */
    export type IForfeitPlayer = IPlayer;

    /**
     * Returns a new instance of {@linkcode Engine.IForfeitPlayer}.
     *
     * > **NOTE**: This function implements {@linkcode Engine.IPlayerConstructor}.
     *
     * @category Engine
     *
     * @param options Options to configure {@linkcode Engine.IForfeitPlayer}.
     * @returns The configured {@linkcode Engine.IForfeitPlayer} instance.
     */
    export function makeForfeitPlayer(
        options: IForfeitPlayerOptions,
    ): IForfeitPlayer;
}

/**
 * Game State Global Singletons
 *
 * @category Game
 *
 * @example
 *
 * ```javascript
 * const board = Game.board;
 *
 * ... do something w/ board singleton ...
 * ```
 */
declare namespace Game {
    // ---------- worker/game_namespace.ts ----------

    /**
     * Represents the {@linkcode Engine.IGameBoard} singleton that
     * is reflective of the current game state.
     *
     * @category Game
     *
     * @example
     *
     * ```javascript
     * // Cache the singleton for future usage below.
     * const grid = Game.board.grid;
     *
     * export default () => {
     *     // Create a move using the state of the grid.
     *     const move = ... calculate move w/ grid ...;
     *
     *     // Return the xy-pair coordinates of the calculated move.
     *     return {
     *         x: move.x,
     *         y: move.y
     *     };
     * };
     * ```
     */
    export const board: Engine.IGameBoard;

    /**
     * Represents the {@linkcode Engine.IGameSession} singleton that
     * is reflective of the current game state.
     *
     * @category Game
     *
     * @example
     *
     * ```javascript
     * // Cache the singletons for future usage below.
     * const me = Game.player;
     * const turns = Game.session.playerTurns;
     *
     * export default () => {
     *     // Predefine a move variable we will assign below.
     *     let move;
     *
     *     if (turns.length === 0) {
     *         // No opening moves have been made yet, so let's use a
     *         // specific strategy for that case.
     *         move = ...compute a move...;
     *     } else if (turns[0].player === me) {
     *         // An opening move was made and our player made it. So,
     *         // let's use different strategy.
     *         move = ...compute a move...;
     *     } else {
     *         // An opening move was made but our player _did not_
     *         // make it. So, again, let's use another strategy.
     *         move = ...compute a move...;
     *     }
     *
     *     // Return the xy-pair coordinates of the calculated move.
     *     return {
     *         x: move.x,
     *         y: move.y
     *     };
     * };
     * ```
     */
    export const session: Engine.IGameSession;

    /**
     * Represents the {@linkcode Engine.IPlayer} singleton that the game engine
     * uses to track your AI player's moves.
     *
     * @category Game
     *
     * @example
     *
     * ```javascript
     * // Cache the engine APIs for future usage below.
     * const SLOT_KIND = Engine.SLOT_KIND;
     *
     * // Cache the singletons for future usage below.
     * const board = Game.board;
     * const me = Game.player;
     *
     * export default () => {
     *     // Define some variables to track scores.
     *     let myScore = 0;
     *     let opponentScore = 0;
     *
     *     // `IGameBoard.walkBoxes` uses an optimized traversal algorithm. So,
     *     // let's use that method instead looping `IGameBoard.grid` w/ for-loops.
     *     for (const box of board.walkBoxes()) {
     *         // We only want boxes that have already been captured.
     *         if (box.slotKind === SLOT_KIND.box) {
     *             continue;
     *         }
     *
     *         // If the `IPlayerTurn` instance associated with the box game
     *         // board grid slot matches out player, then we will increment
     *         // our tracked score.
     *         //
     *         // Otherwise, that means an opponent(s) scored points.
     *         if (box.playerTurn.player === me) {
     *             myScore = myScore + 1;
     *         } else {
     *             opponentScore = opponentScore + 1;
     *         }
     *     }
     *
     *     // Predefine a move variable we will assign below.
     *     let move;
     *
     *     // We might use different strategies depending on if the
     *     // opponent(s) are ahead in the match.
     *     if (myScore < opponentScore) {
     *         move = ...compute a move...;
     *     } else {
     *         move = ...compute a move;
     *     }
     *
     *     // Return the xy-pair coordinates of the calculated move.
     *     return {
     *         x: move.x,
     *         y: move.y
     *     };
     * };
     * ```
     */
    export const player: Engine.IPlayer;
}

/**
 * Player Scripting Environment Meta Global APIs
 *
 * @category PlayerScript
 */
declare namespace PlayerScript {
    // ---------- worker/player_script.ts ----------

    /**
     * Represents the compute callback returned by custom AI players.
     *
     * @category PlayerScript
     */
    export type IComputePlayerMoveCallback = () =>
        | Promise<Engine.IPlayerMove | null>
        | Engine.IPlayerMove
        | null;
}
