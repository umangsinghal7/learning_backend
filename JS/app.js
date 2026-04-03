function collectEggs(){
    let totalEggs = 6;
    console.log(totalEggs);
}
const square= function(nums){
    return nums*nums;             //expression function
}
const add = (x,y) => {
    return x+y;                  //arrow function with block body
}
const cube = nums => nums*nums*nums;   //arrow functionand implicit return

console.log(square(5));
console.log(cube(3));
console.log(add(2,3));


console.log("hello");
setTimeout(() => {
    console.log("hiii")     //set timeout after 5 seconds
},5000)


// setInterval(() => {
//     console.log("intervals bby")    //run after every interval dont stop
// },2000);

const arr = [1,2,3,4,5,6,7,8,9,10]

arr.filter(x=>x.arr<10);