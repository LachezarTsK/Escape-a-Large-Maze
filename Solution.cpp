
#include <queue>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
    
    inline static const int TOTAL_ROWS = pow(10, 6);
    inline static const int TOTAL_COLUMNS = TOTAL_ROWS;
    inline static const array<array<int, 2>, 4> MOVES{ {{1, 0}, {-1, 0}, {0, 1}, {0, -1}} };

    struct Point {
        int row{};
        int column{};
        Point(int row, int column) : row{row}, column{column}{}
    };

public:
    bool isEscapePossible(const vector<vector<int>>& blocked, const vector<int>& source, const vector<int>& target) const {
        unordered_set<int> setBlocked{ initializeSetBlockedPoints(blocked, source, target) };
        return breadthFirstSearch(setBlocked, source, target) && breadthFirstSearch(setBlocked, target, source);
    }

private:
    bool breadthFirstSearch(const unordered_set<int>& setBlocked, const vector<int>& source, const vector<int>& target) const {
        unordered_set<int> setVisited;
        setVisited.insert(hashPoint(source[0], source[1]));
        queue<Point> queue;
        queue.emplace(Point(source[0], source[1]));
        int numberOfMoves = 0;

        while (!queue.empty()) {

            ++numberOfMoves;
            for (int i = queue.size(); i > 0; --i) {

                Point current = queue.front();
                queue.pop();
                if (numberOfMoves > setBlocked.size() || (current.row == target[0] && current.column == target[1])) {
                    return true;
                }

                for (const auto& move : MOVES) {
                    int nextRow = current.row + move[0];
                    int nextColumn = current.column + move[1];

                    //C++20: setVisited.contains(...), setBlocked.contains(...), done the old way for compatibility.
                    if (isInMatrix(nextRow, nextColumn) && setVisited.find(hashPoint(nextRow, nextColumn)) == setVisited.end()
                        && setBlocked.find(hashPoint(nextRow, nextColumn)) == setBlocked.end()) {
                        queue.emplace(Point(nextRow, nextColumn));
                        setVisited.insert(hashPoint(nextRow, nextColumn));
                    }
                }
            }
        }
        return false;
    }

    unordered_set<int> initializeSetBlockedPoints(const vector<vector<int>>& blocked, const vector<int>& source, const vector<int>& target) const {
        unordered_set<int> setBlocked;
        for (const auto& blockedPoint : blocked) {
            if (distance(blockedPoint, source) <= blocked.size() || distance(blockedPoint, target) <= blocked.size()) {
                setBlocked.insert(hashPoint(blockedPoint[0], blockedPoint[1]));
            }
        }
        return setBlocked;
    }

    bool isInMatrix(int row, int column) const {
        return row >= 0 && row < TOTAL_ROWS && column >= 0 && column < TOTAL_COLUMNS;
    }

    int hashPoint(int row, int column) const {
        return 991 * row + column;
    }

    int distance(const vector<int>& firstPoint, const vector<int>& secondPoint) const {
        return abs(firstPoint[0] - secondPoint[0]) + abs(firstPoint[1] - secondPoint[1]);
    }
};
