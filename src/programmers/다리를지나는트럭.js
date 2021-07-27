/**
https://programmers.co.kr/learn/courses/30/lessons/42583
 */

/**
 * 0으로 채운 bridge_length 만큼의 bridge 생성 후 실제 다리를 지나는 것처럼 enqueue, dequeue 반복
 * 퍼포먼스 점검이 필요함..
 */
function solution(bridge_length, weight, truck_weights) {
    let bridge = new Array(bridge_length).fill(0);
    let answer = 0;
    while (true) {
        bridge.shift();
        let sum = bridge.reduce((acc, item) => { return acc + item }, 0);
        if (sum + truck_weights[0] <= weight) {
            bridge.push(truck_weights.shift());
        } else {
            bridge.push(0);
        }
        answer++;
        if (!truck_weights.length) break;
    }
    return answer + bridge_length;
}
(function run() {
    let data = [
        [2, 10, [7, 4, 5, 6]],
        [100, 100, [10]],
        [100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]],
        // [1,2,[1,1,1]],
        // [1,1,[1,1,1]],
        [4, 2, [1, 1, 1, 1]],
        [5, 7, [4, 3, 4, 3, 4]]
    ]
    for (let item of data) {
        console.log(solution(item[0], item[1], item[2]));
    }
})();
