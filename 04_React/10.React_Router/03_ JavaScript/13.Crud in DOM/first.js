const newElement = document.createElement("h2");
newElement.textContent ="Strike is Comming ";
newElement.id ="second";


// select element
const element = document.getElementById("first");
element.after(newElement);
//element.before(newElement);


const newElement2 = document.createElement("h3");
newElement2.textContent = "Holi aa rhi hai";
newElement2.id = "third";

// newElement2.className ="Holi";
newElement2.classList.add("Holi");

newElement2.style.backgroundColor ="brown";
newElement2.style.fontSize = "20px";

element.before(newElement2)//isse humne third wale ko first wale se uper daal diya


console.log(newElement2);
console.log(newElement2.getAttribute("id"));//to get id attribute (details)
console.log(newElement2.getAttribute("class"));//to get id class (details)


const list = document.createElement("li");
list.textContent = "Milk"

const list2 = document.createElement("li");
list2.textContent = "Cake"

const list3 = document.createElement("li");
list3.textContent = "Halwa"

const list4 = document.createElement("li");
list4.textContent = "Paneer"

const unorderedElement = document.getElementById("listing");
unorderedElement.append(list,list2);//we can add multiple elements 
unorderedElement.prepend(list3); // list 3 will be on the top

//create list using array
const arr = ["Milk", "Halwa", "Paneer","tofu","Tea"];
const unorderElement = document.getElementById("listing");
const fragment = document.createDocumentFragment();

// array k form m aati hai list backend m 
for(let food of arr){
    const list = document.createElement("li");
    list.textContent = food;
    fragment.append(list);
}

unorderedElement.append(fragment);
unorderElement.append(fragment);

const s1 = document.getElementById("first");
s1.remove();

const month = document.getElementById("ten");

//These are Older Methods 
// console.log(month.children);
const lister = document.createElement("li");
lister.textContent = "<img src='https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&fm=jpg&q=60&w=3000'>";
//isko wo poora HTML ki trh treat krega (mtlb jaise HTML wale m changes hote hai wo sb perform krega)
//isko use nhi krna chahiye(jb bhi user data ko display krana ho)
lister.innerHTML = "<img src='https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&fm=jpg&q=60&w=3000'>"


month.prepend(lister);
// month.insertAdjacentElement("afterend",lister)