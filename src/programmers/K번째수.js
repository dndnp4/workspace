/**
https://programmers.co.kr/learn/courses/30/lessons/42748
 */

/**
 * 쉬움
 */
function solution(array, commands) {
    return commands.map(item=>array.slice(item[0] - 1, item[1]).sort((a,b)=>a-b)[item[2] - 1]);
}

(function run() {
    let data = [
        [[1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]],
        [[0,0,0], [[1,1,1]]]
    ]
    for (let item of data) {
        console.log(solution(item[0], item[1]));
    }
})();
