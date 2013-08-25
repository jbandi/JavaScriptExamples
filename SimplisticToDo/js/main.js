window.onload = function(){
    "use strict";
     var addBtn = document.getElementById('addBtn');
//    addBtn.onclick = function(){
//        addText();
//    }

    //  Alternative technique:
    if(addBtn.addEventListener){
        addBtn.addEventListener("click", function() { addText();});
    } else { // For IE < 9
        addBtn.attachEvent("onclick", function() { addText();});
    }
};

function addText(){
    "use strict";
    var input = document.getElementById('input');
    var node=document.createElement("h3");
    var textnode=document.createTextNode(input.value);
    node.appendChild(textnode);
    document.getElementById('do').appendChild(node);
    input.value = "";
}