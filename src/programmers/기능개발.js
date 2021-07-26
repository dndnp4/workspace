/**
https://programmers.co.kr/learn/courses/30/lessons/42586
 */

/**
 * 걸리는 시간 = 올림( (100 - 진도)/속도 ) => 배열로 생성
 * 이후 결과배열에 1씩 더해주면서 순서대로 계산.. 어렵게 생각할거없음. 
 */
function solution(progresses, speeds) {
    let answer = [], idx;
    let days, now;
    for (let i = 0; i < progresses.length; i++) {
        days = (Math.ceil((100 - progresses[i]) / speeds[i]));
        if(!answer.length) {
            idx = 0;
            now = days;
            answer.push(1);
        }else {
            if(now >= days ) {
                answer[idx]++;
            }else {
                now = days;
                answer.push(1);
                idx++;
            }
        }
    }
    return answer;
}

(function run() {
    let data = [
        [[93, 30, 55], [1, 30, 5]],
        [[95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]]
    ]
    for (let item of data) {
        console.log(solution(item[0], item[1]));
    }
})();
