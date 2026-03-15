const form = document.getElementById("reportForm");
const container = document.getElementById("itemsContainer");

let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];

function displayItems(){
container.innerHTML = "";

items.forEach((item)=>{
const div = document.createElement("div");
div.classList.add("item");

div.innerHTML = `
<h3>${item.type}: ${item.name}</h3>
<p>${item.description}</p>
${item.image ? `<img src="${item.image}">` : ""}
`;

container.appendChild(div);
});
}

displayItems();

form.addEventListener("submit",(e)=>{
e.preventDefault();

const type = document.getElementById("type").value;
const name = document.getElementById("itemName").value;
const description = document.getElementById("description").value;
const file = document.getElementById("imageUpload").files[0];

if(file){
const reader = new FileReader();

reader.onload = function(){
const image = reader.result;

items.push({
type:type,
name:name,
description:description,
image:image
});

localStorage.setItem("lostFoundItems", JSON.stringify(items));
displayItems();
form.reset();
}

reader.readAsDataURL(file);

}else{

items.push({
type:type,
name:name,
description:description,
image:null
});

localStorage.setItem("lostFoundItems", JSON.stringify(items));
displayItems();
form.reset();
}
});