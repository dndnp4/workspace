/**
https://programmers.co.kr/learn/courses/30/lessons/42579
 */
/**
 * genres 별 plays 의 합을 오름차순 정렬, 각 원소의 최대 n 개가 포함된 plays 인덱스를 출력
 * 장르 내에서 횟수가 같을 때 plays 인덱스가 중복되지 않게 출력
 */
function solution(genres, plays) {
    let answer = [];
    /**
     * 재생된 횟수가 같을 때 한 번 출력된 idx 는 출력되지 않도록 flag 추가
     */
    plays = plays.map(item=>{
        return {value : item, flag : false};
    });
    /* 
        plays = [
            { value: 400, flag: false },
            { value: 600, flag: false },
            { value: 150, flag: false },
            { value: 600, flag: false },
            { value: 500, flag: false },
            { value: 500, flag: false }
        ]
    */
    let data = genres.reduce((acc, item, idx)=>{
        acc[item] = acc[item] || { arr : [], sum : 0};
        acc[item].arr.push(plays[idx].value);
        acc[item].sum += plays[idx].value;
        return acc;
    },{});
    /* 
        data = {
            classic: { arr: [ 400, 150, 500, 500 ], sum: 1550 },
            pop: { arr: [ 600, 600 ], sum: 1200 }
        }
    */
    data = Object.keys(data).map(item=>{
        return Object.assign({type : item}, data[item]);
    }).sort((a,b)=>b.sum - a.sum);

    // 장르별 출시 개수
    let max = 2;

    for(let item of data){
        item.arr = item.arr.sort((a,b)=>a-b);
        for(var i = 0 ; i < max; i++){
            if(item.arr.length - 1 < 0) continue;
            let v = item.arr.pop();
            let idx = plays.findIndex(i=>{
                if(i.value === v && !i.flag) {
                    i.flag = true;
                    return true;
                }
                return false;
            });
            answer.push(idx);
        }
    }
    return answer;
}

(function run(){
    let data = [
        // [["classic", "pop", "classic", "classic", "pop", 'foo', 'foo'], [500, 600, 150, 800, 2500, 200, 300]],
        [["classic", "pop", "classic", "pop", "classic", "classic"], [400, 600, 150, 600, 500, 500]]
    ]
    for(let item of data){
        console.log(solution(item[0], item[1]));
    }
})();
