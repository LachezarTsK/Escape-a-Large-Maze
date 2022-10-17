
/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
var isEscapePossible = function (blocked, source, target) {
    this.TOTAL_ROWS = Math.pow(10, 6);
    this.TOTAL_COLUMNS = TOTAL_ROWS;
    this.MOVES = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const setBlocked = initializeSetBlockedPoints(blocked, source, target);
    return breadthFirstSearch(setBlocked, source, target) && breadthFirstSearch(setBlocked, target, source);
};

/**
 * @param {number} row
 * @param {number} column
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
}

/**
 * @param {Set<number>} setBlocked
 * @param {number} source
 * @param {number} target
 * @return {boolean}
 */
function breadthFirstSearch(setBlocked, source, target) {
    const setVisited = new Set();
    setVisited.add(hashPoint(source[0], source[1]));
    const queue = new Queue();
    queue.enqueue(new Point(source[0], source[1]));
    let numberOfMoves = 0;

    while (!queue.isEmpty()) {

        ++numberOfMoves;
        for (let i = queue.size(); i > 0; --i) {

            let current = queue.dequeue();
            if (numberOfMoves > setBlocked.size || (current.row === target[0] && current.column === target[1])) {
                return true;
            }

            for (let move of this.MOVES) {
                let nextRow = current.row + move[0];
                let nextColumn = current.column + move[1];
                if (isInMatrix(nextRow, nextColumn) && !setVisited.has(hashPoint(nextRow, nextColumn))
                    && !setBlocked.has(hashPoint(nextRow, nextColumn))) {
                    queue.enqueue(new Point(nextRow, nextColumn));
                    setVisited.add(hashPoint(nextRow, nextColumn));
                }
            }
        }
    }
    return false;
}

/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {Set<number>}
 */
function initializeSetBlockedPoints(blocked, source, target) {
    const setBlocked = new Set();
    for (let blockedPoint of blocked) {
        if (distance(blockedPoint, source) <= blocked.length || distance(blockedPoint, target) <= blocked.length) {
            setBlocked.add(hashPoint(blockedPoint[0], blockedPoint[1]));
        }
    }
    return setBlocked;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function isInMatrix(row, column) {
    return row >= 0 && row < this.TOTAL_ROWS && column >= 0 && column < this.TOTAL_COLUMNS;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
function hashPoint(row, column) {
    return 991 * row + column;
}

/**
 * @param {number[]} firstPoint
 * @param {number[]} secondPoint
 * @return {number}
 */
function distance(firstPoint, secondPoint) {
    return Math.abs(firstPoint[0] - secondPoint[0]) + Math.abs(firstPoint[1] - secondPoint[1]);
}
