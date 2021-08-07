/**
https://programmers.co.kr/learn/courses/30/lessons/42840
 */

/**
 * 쉬움
 */
function solution(answers) {
    const arr = [
        {
            name: 1,
            ans: [1, 2, 3, 4, 5],
            idx: 0,
            result: 0
        }, {
            name: 2,
            ans: [2, 1, 2, 3, 2, 4, 2, 5],
            idx: 0,
            result: 0
        }, {
            name: 3,
            ans: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
            idx: 0,
            result: 0
        },
    ];

    for (let item1 of answers) {
        for (let item2 of arr) {
            if (item1 === item2.ans[item2.idx]) item2.result++;
            item2.idx = ++item2.idx % item2.ans.length;
        }
    }
    arr.sort((a,b)=>{
        return b.result - a.result || a.name - b.name;
    });
    const max = arr[0].result;
    const result = [];
    arr.map(item=>{
        if(max === item.result) result.push(item.name);
    });
    return result;
}

(function run() {
    let data = [
        [1, 2, 3, 4, 5],
        [1, 3, 2, 4, 2],
        [3,3,2,3]
    ]
    for (let item of data) {
        console.log(solution(item));
    }
})();
