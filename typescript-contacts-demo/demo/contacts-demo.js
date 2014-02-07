(function (window) {

    var cdemo = window.cdemo;
    var contactRepository = new cdemo.SimpleContactRepository();

    $(document).on('pageinit', '#main', function () {
        initContacts();
        updateContactList();
    });

    $(document).on('pageinit', '#new', function () {
        $('form').submit(function () {
            var firstName = $('[name=firstName]').val();
            var lastName = $('[name=lastName]').val();
            var email = $('[name=email]').val();

            var contact = new cdemo.SimpleContact(firstName, lastName, email);
            contactRepository.addContact(contact);

            $.mobile.changePage('#main');
            updateContactList();
            return false;
        });
    });

    function updateContactList() {
        var list = "";
        $.each(contactRepository.getContacts(), function (i, item) {
            list += '<li>';
            list += "<h3>" + item.getFirstName() + ' ' + item.getLastName() + "</h3>";
            list += "<p>" + item.getEMail() + "</p>";
            list += '</li>';
        });
        $("#contactList ul li").remove();
        $("#contactList ul").append(list).listview("refresh");
    }

    function initContacts() {
        contactRepository.clear();
        var contact = new cdemo.SimpleContact('Kai', 'Toedter', 'kai@toedter.com');
        contactRepository.addContact(contact);
        contact = new cdemo.SimpleContact('John', 'Doe', 'john@doe.com');
        contactRepository.addContact(contact);
        contact = new cdemo.SimpleContact('Jane', 'Miller', 'jane@miller.com');
        contactRepository.addContact(contact);
        updateContactList();
    }

    cdemo.initContacts = initContacts;

    function clearContacts() {
        contactRepository.clear();
         updateContactList();
    }

    cdemo.clearContacts = clearContacts;

}(window));