/**
https://programmers.co.kr/learn/courses/30/lessons/42578
 */
/**
 * 예를 들어 부위 2개에 각각 두 가지씩 있다고하면 나올 수 있는 조합은 4가지 (2C1 * 2C1)..
 * 입지 않았다는 케이스를 각 부위에 추가해야됨. 조합은 9가지(3C1 * 3C1)..
 * 아무거도 입지 않은 경우는 제외. 고로 8
 */
function solution(clothes) {
    clothes = clothes.reduce((acc, item)=>{
        acc[item[1]] = acc[item[1]] || [];
        acc[item[1]].push(item[0]);
        return acc;
    }, {});
    
    let answer = Object.keys(clothes).reduce((acc, item)=>{
        acc *= clothes[item].length + 1
        return acc;
    }, 1);
    return answer - 1;
}

(function run(){
    let data = [
        [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["bluesunglasses1", "eyewear"], ["green_turban", "headgear"]],
        [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]],
    ]
    for(let item of data){
        console.log(solution(item));
    }
})();
