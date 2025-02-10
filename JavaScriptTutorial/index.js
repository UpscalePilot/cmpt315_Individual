// This is a comment
console.log("Hello World");


let person = {
    name: 'Ben',
    age: 33
}

console.log(person);

person.name = 'Benjamin';
console.log(person.name);

person['name'] = 'Ben';
console.log(person['name']);


let selectedColors = ['red', 'blue'];
console.log(selectedColors);
selectedColors[2] = 'green';
console.log(selectedColors);
console.log(selectedColors.length);

function greet(name, lastName) {
    console.log('Hello ' + name + ' ' + lastName);
}


function square(number) {
    return number * number;
}

console.log(square(2));

let number = square(2);
console.log(number);