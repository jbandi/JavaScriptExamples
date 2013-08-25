'use strict';

describe('controllers', function(){

    beforeEach(function() {
        var input = $("<input type='text' id='input'/>");
        var addBtn = $('<a id="addBtn" class="btn btn-primary btn-large" href="#" >Add &raquo;</a>');
        var todoList = $('<p id="do"> </p>');
        $(document.body).append(input);
        $(document.body).append(addBtn);
        $(document.body).append(todoList);
    });

    it('should ....', function() {
        var input = $('input');
        input.val = 'First ToDo';

        addText();

        var itemCount = $('#do h3').length;
        expect(itemCount).toBe(1);
    });
});