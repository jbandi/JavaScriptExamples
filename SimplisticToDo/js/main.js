/* global $ */

$(registerButtonHandler);

function registerButtonHandler(){
    "use strict";
     var addBtn = document.getElementById('addBtn');

    $('#addBtn').on('click', addText);
}

function addText(){
    "use strict";
    var input = document.getElementById('input');
    var node=document.createElement("h3");
    var textnode=document.createTextNode(input.value);
    node.appendChild(textnode);
    document.getElementById('do').appendChild(node);
    input.value = "";
}