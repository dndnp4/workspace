/**
https://programmers.co.kr/learn/courses/30/lessons/42627
 */

/**
 * 현재 시간에 들어온 jobs 를 처리시간 순으로 정렬하고 순차적으로 처리.
 * 처리된 job 은 jobs에서 제거
 */
function solution(jobs) {
    // 첫 데이터가 정렬이 제대로 안된상태.. 들어온 순서대로 우선정렬하고 동일한 시간일 때 처리시간 순으로 정렬해줌.
    jobs.sort((a,b)=>a[0] - b[0] || a[1] - b[1]);
    let time = jobs[0][1];
    let now = jobs[0][1] + jobs[0][0];
    let cnt = jobs.length;
    let target;
    jobs.shift();
    while (jobs.length) {
        target = jobs.filter(item => now >= item[0]);
        if (target.length) {
            target.sort((a, b) => a[1] - b[1]);
            let work = target.shift();
            let idx = jobs.findIndex(item => item[0] === work[0] && item[1] === work[1]);
            jobs.splice(idx, 1);
            time += work[1] + now - work[0];
            now += work[1];
        } else {
            jobs.sort((a, b) => a[0] - b[0]);
            now = jobs[0][0];
        }
    }
    return Math.floor(time / cnt);
}

(function run() {
    let data = [
        // [[[0, 3], [1, 9], [2, 6]]],
        // [[[1, 10], [3, 3], [10, 3]]],
        // [[[0, 10], [4, 10], [5, 11], [15, 2]]],
        // [[[0, 10]]],
        // [[[0, 3], [1, 9], [2, 6], [4, 3]]],
        // [[[0, 1], [1, 2], [500, 6]]],
        // [[[0, 3], [1, 9], [500, 6]]],
        // [[[24, 10], [28, 39], [43, 20], [37, 5], [47, 22], [20, 47], [15, 2], [15, 34], [35, 43], [26, 1]]],
        // [[[1, 9], [1, 4], [1, 5], [1, 7], [1, 3]]],
        // [[[0, 9], [0, 4], [0, 5], [0, 7], [0, 3]]],
        [[[0, 3], [0, 2], [1, 9], [2, 6]]]
    ]
    for (let item of data) {
        console.log(solution(item[0]));
    }
})();
