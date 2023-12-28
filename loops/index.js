const numbers = [1,2,3,4,5,6,7,8,9,10,11,"help",12,13,14]
// without loop
// console.log(numbers[0])
// console.log(numbers[1])
// console.log(numbers[2])
// console.log(numbers[3])

// loop
// - for loop
// - forEach loop 
// - for of loop
// - while loop

// for loop
// length = 15               
// 0 < 15
// 1 < 15
// 2 < 15
// 3 < 15
// 15 < 15
// // ========
// 16 < 15 // break

// for (let index=0; index <= numbers.length; index++) {
//   console.log(index, numbers[index])
//   const value = numbers[index]
//   if (value === "help") {
//     continue;
//   }
// }

// forEach loop
// numbers.forEach(function(value, index) {
//   console.log(index)
//   if(value === "help") {
//     console.log("found you")
//   }
// })


//  while loop
let count = 1;
while (count <= 15) {
  if (count === 5) {
    count ++;
    continue;
  }
  console.log(count)
  count ++;
  if (count === 10) {
    break;
  }
}


