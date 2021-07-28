/**
https://programmers.co.kr/learn/courses/30/lessons/42747
 */

/**
 * 코드참고
 */
function solution(citations) {
    let result = 0;
    for (let h = 0; h <= Math.max(...citations); h++) {
        let { n1, n2 } = citations.reduce((acc, item) => {
            if (item >= h) acc.n1.push(item);
            else acc.n2.push(item);
            return acc;
        }, { n1: [], n2: [] });
        if (n1.length >= h && citations.length - n1.length === n2.length) result = h;
    }
    return result;
}

(function run() {
    let data = [
        [3, 0, 6, 1, 5],
        [1, 1]
    ]
    for (let item of data) {
        console.log(solution(item));
    }
})();
