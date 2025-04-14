//console.log(name);
//var name = "rajvi";

//for(let i=0; i<5; i++)
    //{
      // setTimeout((e)=>{
        //console.log(i);
       //}, 1000); 
//}


// function cars(carname){
//     this.carname=carname;
// }
// const VW=new cars("j");

// console.log(cars);

// const person = {
//     name : "rajvi",
//     age: 23,
//     job: "Dev"
// }
//  console.log(person.age)


//  const {name,age } = person
//  console.log(age)

// const number=[10,20,30]

// const[first,second] = number
// console.log(first);


// let a=1;
// let b=2;

//  [b,a]=[a,b]
// console.log(a);

// const number=[10,20,30,40,50,60,70]

// const[f,s,...rest]=number;
// console.log(rest);


// class person{
//     greet(){
//         console.log("hello");
//     }
// }
    const student = new person();
    student.greet();

class prof extends person{
    graduate(){
        console.log("graduate");
    }
}