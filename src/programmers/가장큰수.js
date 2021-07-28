/**
https://programmers.co.kr/learn/courses/30/lessons/42746
 */

/**
 * 쉬움
 */
function solution(numbers) {
    if (Math.max(...numbers) === 0) return '0';
    return numbers.map(String).sort((a, b) => (b + a) - (a + b)).join('');
}

(function run() {
    let data = [
        [6, 10, 2],
        [3, 30, 34, 5, 9],
        [0, 0, 0],
        [1, 10, 100],
        [90, 908, 89, 898, 10, 101, 1, 8, 9],
        [31, 314, 3000]
    ]
    for (let item of data) {
        console.log(solution(item));
    }
})();
