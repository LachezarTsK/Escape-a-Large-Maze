
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

public class Solution {

    private static final int TOTAL_ROWS = (int) Math.pow(10, 6);
    private static final int TOTAL_COLUMNS = TOTAL_ROWS;
    private static final int[][] MOVES = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    private record Point(int row, int column) {}

    public boolean isEscapePossible(int[][] blocked, int[] source, int[] target) {
        Set<Integer> setBlocked = initializeSetBlockedPoints(blocked, source, target);
        return breadthFirstSearch(setBlocked, source, target) && breadthFirstSearch(setBlocked, target, source);
    }

    private boolean breadthFirstSearch(Set<Integer> setBlocked, int[] source, int[] target) {
        Set<Integer> setVisited = new HashSet<>();
        setVisited.add(hashPoint(source[0], source[1]));
        Queue<Point> queue = new LinkedList<>();
        queue.add(new Point(source[0], source[1]));
        int numberOfMoves = 0;

        while (!queue.isEmpty()) {

            ++numberOfMoves;
            for (int i = queue.size(); i > 0; --i) {

                Point current = queue.poll();
                if (numberOfMoves > setBlocked.size() || (current.row == target[0] && current.column == target[1])) {
                    return true;
                }

                for (int[] move : MOVES) {
                    int nextRow = current.row + move[0];
                    int nextColumn = current.column + move[1];
                    if (isInMatrix(nextRow, nextColumn) && setVisited.add(hashPoint(nextRow, nextColumn))
                            && !setBlocked.contains(hashPoint(nextRow, nextColumn))) {
                        queue.add(new Point(nextRow, nextColumn));
                    }
                }
            }
        }
        return false;
    }

    private Set<Integer> initializeSetBlockedPoints(int[][] blocked, int[] source, int[] target) {
        Set<Integer> setBlocked = new HashSet<>();
        for (int[] blockedPoint : blocked) {
            if (distance(blockedPoint, source) <= blocked.length || distance(blockedPoint, target) <= blocked.length) {
                setBlocked.add(hashPoint(blockedPoint[0], blockedPoint[1]));
            }
        }
        return setBlocked;
    }

    private boolean isInMatrix(int row, int column) {
        return row >= 0 && row < TOTAL_ROWS && column >= 0 && column < TOTAL_COLUMNS;
    }

    private int hashPoint(int row, int column) {
        return 991 * row + column;
    }

    private int distance(int[] firstPoint, int[] secondPoint) {
        return Math.abs(firstPoint[0] - secondPoint[0]) + Math.abs(firstPoint[1] - secondPoint[1]);
    }
}
