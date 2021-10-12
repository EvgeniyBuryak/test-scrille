
/**
 * Важно! Каждый элемент массива разрешается использовать не более одного раза!
 * 
 * @param {массив целых чисел} arr 
 * @param {создать функцию, которая сгруппирует числа по сумме их пар} sum 
 * 
 * result: [[3, 2], [5, 0]]
 */

function getPairs(arr, sum) {
    
    //const newArr = Array.from(new Set(arr)); <- не подходит

    //return arr.forEach( (value, index) => {
        //arr.slice.
        /*return arr.reduce ( (prev, curr) => {
            if (prev + curr == sum) {
                return [prev, curr];
            }
            else {
                return prev;
            }
        })*/
    //});

    
    const hash  = {};    
    arr.forEach(elem => { // запоминает количество похожих элементов массива
        hash[elem] ? hash[elem] += 1 :hash[elem] = 1;
    });
    
    //return hash;
    /*
    let counter = 0;
    arr.forEach(elem => {

        let k = sum - elem;
        if(k === 0 && hash[sum] > 1) {
            counter++;
        } else if (k !== 0 && hash[sum] > 0) {
            counter++;
        }
    });
    */
    //return counter;

    return arr.map( (firstV, index) => arr.slice(index + 1).map( secondV => { 
            if (firstV + secondV == sum) {
                hash[firstV] -= 1;
                hash[secondV] -= 1;
                if (hash[firstV] >= 0 & hash[secondV] >= 0)
                    return [firstV, secondV];
            }
        }))
        .flat()
        .filter( pair => Array.isArray(pair) ); // выводит [[3, 2], [3, 2], [5, 0]], что неверно
        //.filter( pair => {
            //if (hash[pair[0]] < 0) { hash[pair[0]] += 1; return false; }
            //else if (hash[pair[1]] < 0) { hash[pair[1]] += 1; return false; }
            //else return true;
        //});
        //return hash;
        /*.filter( (pair, index) => {
            console.log(pair);
            console.log(index);
            let i = index;
            return arr.slice(i).find( (value, index) => {
                
                if (value == pair[0]) {
                    i = i + index + 1;
                    console.log(`inside: ${value}`);
                    console.log(`inside index: ${i}`);
                    return true;
                }
            });
            //console.log(value == pair[index])
        });*/
}

// sum  = 5
const result = getPairs([22, 3, 5, 0, 2, 2], 5);
console.log(result);
console.log('result: [[3, 2], [5, 0]]');

const result1 = getPairs([-5, 33, 2, 2, 3, 5, 0, 10, 3], 5);
console.log(result1);
console.log('result: [[-5, 10], [2, 3], [2, 3], [5, 0]]');

const result2 = getPairs([5, 5, 5, 0, 0, 0, 5], 5);
console.log(result2);
console.log('result: [[5, 0], [5, 0], [5, 0]]');

// sum=6
const result3 = getPairs([3, 3, 6, 0], 6);
console.log(result3);
console.log('result: [[3, 3], [6, 0]]');


function getProfit(arr) {
    return arr.map( (firstV, index) => arr.slice(index + 1).map( (secondV, indexSecond) => { 
        //return [index, index + 1 + indexSecond, secondV - firstV];
        return [secondV - firstV, index, index + 1 + indexSecond];
    })) // собираем элементы парами и ставим им вес
    .flat()
    //.filter( pair => pair[2] > 0 )
    //.reduce( (prev, curr) => prev[2] > curr[2] ? prev : curr ) // находим наибольшую разницу
    .reduce( (prev, curr) => prev[0] > curr[0] ? prev : curr ) // находим наибольшую разницу
    //.reduce( (prev, curr) => curr <= 0 ? [] : prev.concat(curr), []);
    //.slice(0,2);
    .reduce( (prev, curr) => { 
        if (curr <= 0) return -1;
        else return Array.isArray(prev) ? prev.concat(curr) : [];
    }, [])
    .slice(1, 3);
}

console.log(getProfit([13, 6, 3, 4, 10, 2, 3]));
console.log('result: [2, 4]');

console.log(getProfit([6, 5, 4, 3]));
console.log('result: []');

console.log(getProfit([3, 3, 3, 3]));
console.log('result: []');

function resultsMatched(arr, sum, expectedArr) {
    let res = getPairs(arr, sum);
    //console.log(`Third task: ${res}`);

    if (res.length != expectedArr.length)
        return false;

        /*res.map( pair => expectedArr.map(secPair=> {
            for (let i = 0; i < 2; i++) {
                if (res[i] != expectedArr[i])
                return false;
            }}))*/
    /*
    const results = res.flat().filter(i=>!expectedArr.flat().includes(i))
    .concat(expectedArr.flat().filter(i=>!res.flat().includes(i)));

    const isCool = false;

    return isCool && results;
    */

    
    const diff = (a1, a2) => {
        return a1.filter(i=>!a2.includes(i))
        .concat(a2.filter(i=>!a1.includes(i)));
    }

    const listCompare = [];
    
    for (let i = 0; i < res.length; i++) {
        let diffArr = diff(res[i], expectedArr[i]);
        if (diffArr.length != 0)
            listCompare.push(diffArr);
        //if (res[i] != expectedArr[i])
            //return false;
    }

    //return diff(listCompare[0], listCompare[1]).length != 0 ? false : true;

    const resIndex = res.reduce( (prevIndex, pair) => prevIndex.concat(expectedArr.findIndex( (secPair, index) => {
        if(pair[0] == secPair[0] && pair[1] == secPair[1] && !prevIndex.find(v=>v==index))
            { 
                //prevIndex.push(index);//'' + secPair[0] + secPair[1];//true;
                return true;
            }
        //return false;
    })),[]).findIndex(v=>v==-1);
    
    const results = expectedArr.map( pair => pair.reverse() ).filter( pair => {
        if(pair[0] == res[resIndex][0] && pair[1] == res[resIndex][1])
            return true;        
    });
    //.find(value=>value==true) );//.every(value=>value==true);
    console.log(results);
    //console.log(res.filter( pair => expectedArr.includes(pair)));
    //return true;
}
// [-5,10][2,3][2,3][5,0]
console.log(resultsMatched([-5, 33, 2, 2, 3, 5, 0, 10, 3], 5, [[ -5, 10], [2, 3], [5, 0], [3, 2]]));
// true
