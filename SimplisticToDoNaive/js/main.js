window.onload = function(){
    var addBtn = document.getElementById("addBtn");

    addBtn.addEventListener("click", addText);
}


function addText(){
    var input = document.getElementById("input");
    var node=document.createElement("h3");
    var textnode=document.createTextNode(input.value);
    node.appendChild(textnode);
    document.getElementById("do").appendChild(node);
    input.value = "";
}