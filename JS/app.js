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
const [nonnatural,firsteven,...sO_on] = arr;    //destructing array
console.log(sO_on);

arr.filter(x=>x.arr<10);                //filter



function sum(){                             //arguments_object
    console.log(arguments)
}
sum(2,3,4,5,6,7,8);

function gym(gold,silver,...everyoneremain){            //rest_params
    console.log('first prize goes to: ${gold}');
    console.log('second prize goes to: ${silver}');
    console.log('everyone prize goes to: ${everyoneremain}');
}

gym('umang','diya','ram','shyam','yug','rohan');


