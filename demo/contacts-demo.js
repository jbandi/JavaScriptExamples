(function(window) {

    var cdemo = window.cdemo;

    var yelp = {}, yelpKey = 'BzkG0eKlTgxErtaJyIxQCA';

    yelp.log = function(msg) {
        console.log(msg);
    };

    $(document).on('pageinit', '#main', function() {
        var contactRepository = new cdemo.SimpleContactRepository();
        var contact = new cdemo.SimpleContact('Kai', 'Toedter', 'kai@toedter.com');
        contactRepository.addContact(contact);
        contact = new cdemo.SimpleContact('John', 'Doe', 'john@doe.com');
        contactRepository.addContact(contact);
        contact = new cdemo.SimpleContact('Jane', 'Miller', 'jane@miller.com');
        contactRepository.addContact(contact);
        var list = "";
        $.each(contactRepository.getContacts(), function(i, item) {
            list += '<li>';
            list += "<h3>" + item.getFirstName() + ' ' + item.getLastName() + "</h3>";
            list += "<p>" + item.getEMail()  + "</p>";
            list += '</li>';
        });
        $("#contactList ul").append(list).listview("refresh");
    });

    $(document).on('pageinit', '#new', function() {
        $('form').submit(function() {
            label = $('[name=label]').val();
            address = $('[name=address]').val();
            radius = $('[name=radius]').val();

            $.mobile.changePage('#main');
            yelp.callAddress(label, address, radius);
            return false;
        });
    });

    yelp.callLatLong = function(label, lat, long, radius) {
        var params = '&lat=' + lat + '&long=' + long;
        callWithParams(label, params, radius);
    };

    yelp.callAddress = function(label, address, radius) {
        var params = '&location=' + address;
        callWithParams(label, params, radius);
    };

    callWithParams = function(label, params, radius) {
        if (!radius)
            radius = 2;

        $('.ui-title').text(label + ' (' + radius + ' km)');
        $("ul:jqmData(role='listview')").empty();
        $.mobile.loading('show');
        $.ajax({
            type : 'GET',
            url : 'http://api.yelp.com/business_review_search?ywsid=' + yelpKey + '&term=Bars' + params + '&radius='
                    + radius,
            crossDomain : true,
            dataType : 'jsonp',

            error : function(msg) {
                console.log('got error: ' + msg.statusText);
                $.mobile.loading('hide');
            },
            success : function(msg) {
                $.mobile.loading('hide');

                // console.log(msg.message);
                if (msg.message.text == 'OK') {
                    var list = "";
                    $.each(msg.businesses, function(i, item) {
                        list += '<li><a href="' + item.url + '">';
                        list += '<img src="' + item.photo_url + '" />';
                        list += '<img src="' + item.rating_img_url + '" />';
                        list += "<h3>" + item.name + "</h3>";
                        list += "<p>" + item.address1 + ", " + item.city + "</p>";
                        list += '</a></li>';
                    });
                    $("#yelpList ul").append(list).listview("refresh");
                    // or
                    // $("ul:jqmData(role='listview')").append(list).listview("refresh");
                }
            }
        });
    };

    window.yelp = yelp;
}(window));