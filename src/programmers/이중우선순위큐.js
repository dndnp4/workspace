/**
https://programmers.co.kr/learn/courses/30/lessons/42628
 */

/**
 * I 일때 push 후 내림차순 정렬
 * D 1 일때 앞에서 빼고 -1 일때 뒤에서 뺌
 */
function solution(operations) {
    let arr = [];
    for(let item of operations){
        let [cmd, value] = item.split(' ');
        value = parseInt(value);
        switch(cmd) {
            case 'I':{
                arr.push(value);
                arr.sort((a,b)=>b-a);
                break;
            }
            case 'D':{
                if(value === 1) {
                    arr.shift();
                }else {
                    arr.pop();
                } 
                break;
            }
        }
    }
    return arr.length ? [Math.max(...arr), Math.min(...arr)] : [0, 0];
}

(function run() {
    let data = [
        ["I 16","D 1"],
        ["I 7","I 5","I -5","D -1"]
    ]
    for (let item of data) {
        console.log(solution(item));
    }
})();
