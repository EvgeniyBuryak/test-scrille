
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

        

    return arr.map( (value, index) => arr.slice(index + 1).map( secondValue => { 
            if (value + secondValue == sum) {
                return [value, secondValue];
            }
        }))
        .flat()
        .filter( pair => Array.isArray(pair) ); // выводит [[3, 2], [3, 2], [5, 0]], что неверно
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
/*
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
*/