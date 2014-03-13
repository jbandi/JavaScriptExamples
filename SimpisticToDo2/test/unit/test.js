/*global beforeEach, afterEach, describe, it, chai, addText */
(function () {
    'use strict';

    var expect = chai.expect;

    beforeEach(function(){

        // Set up dom for test
        var input = $('<input type="text" id="input"/>');
        var addBtn = $('<a id="addBtn" class="btn btn-primary btn-large" >Add &raquo;</a>');
        var todoList = $('<p id="do"> </p>');
        $(document.body).append(input);
        $(document.body).append(addBtn);
        $(document.body).append(todoList);
        console.log('before each')
    });

    afterEach(function() {
        $('#do').empty();
        console.log('after each')
    });

    describe('ToDo List', function () {
        it('should extend list when adding item', function () {

            var todoList1 = $('#do h3');
            console.log('Do list 1: ' + todoList1.length);

            expect(todoList1.length).to.equal(0);

            var input = $('input');
            input.val('First ToDo');

            addText();

            var todoList2 = $('#do h3');
            expect(todoList2.length).to.equal(1);
            expect(todoList2.eq(0).text()).to.equal('First ToDo');
        });
    });
})();
