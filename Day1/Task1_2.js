// Function to return only positive numbers
function getPositiveNumbers(arr) {
    return arr.filter(num => num > 0);
  }
  
  // Function to return squares of even numbers
  function getSquaredEvens(arr) {
    return arr
      .filter(num => num % 2 === 0)
      .map(num => num * num);
  }
  
  console.log(getPositiveNumbers([-3, 5, 0, 9, -1])); // [5, 0, 9]
console.log(getSquaredEvens([1, 2, 3, 4, 5]));      // [4, 16]




  // Function using ternary operator
function getFee(isMember) {
    return isMember ? '$2.00' : '$10.00';
  }

  console.log(getFee(true));  // '$2.00'
console.log(getFee(false)); // '$10.00'