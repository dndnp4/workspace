/**
https://programmers.co.kr/learn/courses/30/lessons/42587
 */

/**
 * 각 인덱스를 순차적으로 순회하는 것을 반복함.
 * 해당 인덱스에서 최대 값을 때 그 자리를 null 로 채움. Math.max 에 null이 포함되어 있으면 대상에 포함안되기때문.
 * null 로 채운 후 location 과 인덱스가 일치하면 중지.
 */
function solution(priorities, location) {
    var answer = 0;
    for (let i = 0; ; i++, i %= priorities.length) {
        let max = Math.max(...priorities);
        if (max === priorities[i]) {
            priorities[i] = null;
            answer++;
        }
        if (i === location && !priorities[i]) break;
    }
    return answer;
}

(function run() {
    let data = [
        [[2, 1, 3, 2], 2],
        [[1, 1, 9, 1, 1, 1], 0]
    ]
    for (let item of data) {
        console.log(solution(item[0], item[1]));
    }
})();
