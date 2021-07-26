/**
https://programmers.co.kr/learn/courses/30/lessons/42576
 */

/**
 * 속하지 않은 하나의 원소를 찾는 문제. 하나의 원소를 제외하곤 동일함.
 * 정렬되지 않은 각각의 Array..
 * 정렬 후 같은 위치의 원소를 1:1 매칭시키고 다르면 정답. n 번 순회로 끝냄.
 */

function solution(participant, completion) {
    participant = participant.sort();
    completion = completion.sort();
    for(let i = 0 ; i < participant.length - 1 ; i++) {
        if(participant[i] !== completion[i]) {
            return participant[i];
        }
    }
    return participant.pop();
}

function run(){
    let data = [
        [["leo", "kiki", "eden"], ["eden", "kiki"]],
        [["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"]],
        [["mislav", "stanko", "mislav", "ana"],["stanko", "ana", "mislav"]]
    ]
    for(let item of data){
        console.log(solution(item[0], item[1]));
    }
}
run();
