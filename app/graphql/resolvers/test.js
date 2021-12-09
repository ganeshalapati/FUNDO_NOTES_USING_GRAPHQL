// let countvalue = new Promise(function(req,rej){
//     setTimeout(()=>{
//         resizeBy("promise reolved")

// },2000)
// })
// async function asyncFunc(){
//     let result = await countvalue;
//     console.log(result)
//     console.log("hello")
// }
// asyncFunc();

// // typeDefs: graphqlSchema,
// // resolvers: graphqlResolver,
// // context: isAuth

// let basicObj = {};
// basicObj.surprise="cake";
// basicObj['surprise'];

// let obj3= {"movie":"suryavamsham"};
// let arr4 = [4,5,6,'favourite'];
// let obj2 = {
//     'key1':'value1',
//     'key2':2,
//     'key3':obj3,
//     'key4':arr4

// };
// console.log(Object.keys(obj2));

// const num = [1,2,3,4,5,6,7,8,9];

// const obj = Object.assign( {} ,num);

// console.log(obj);

// let arr = new Array(1,2,3);
// let arr2 = [2,3];
// let arr3 = Array.from(arr2);

// console.log(arr);
// console.log(arr2);
// console.log(arr3);

// arr.push(4,5,6);
// console.log(arr);

// function factorial(n){
//     if(n == 0 || n == 1){
//         return 1;
//     }else{
//         return n * factorial(n-1);
//     }
// }
// let n = 0;
// answer = factorial(n)
// console.log("The factorial of " + n + " is " + answer);

const newArr=[];
for(let i=1;i<=500; i++){
    newArr.push(i)
}
console.log(newArr);

const newDoubleArr= newArr.map(ele=>ele*2);
console.log(newDoubleArr);

//const evenArr = newArr.fileter(ele => ele%2 =0)