const newElement = document.createElement("h2");
newElement.textContent ="Strike is comming";
newElement.id = "second";

//select element
const element = document.getElementById("first");
element.after(newElement);

const newElement2 = document.createElement('h3');
newElement2.textContent ="Holi aa rahi hai";
newElement2.id = "third";
newElement2.className ="Holi";


console.log(newElement2);