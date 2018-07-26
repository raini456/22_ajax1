(function () {

    var output = document.querySelector('#output');
    var btn = document.querySelector('#btn');
    var btnCSV = document.querySelector('#btnCSV');
    var btnJSON = document.querySelector('#btnJSON');
    var btnHoliday = document.querySelector('#btnHoliday');
    var btnLoading = document.querySelector('#btnLoading');

    var ajax = function (url, params, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                //ajaxLoad(false);
                callback(this.responseText);
            }
        };
        params = (params) ? '?' + params : '';
        xhr.open('get', url + params, true);
        //ajaxLoad(true);
        xhr.send(null);
    };

    var viewResponse = function (response) {
        output.innerText = 'Brutto:' + response;
    };

    btn.addEventListener('click', function () {
        var param = 'x=' + this.getAttribute('data-x');
        ajax('data.php', param, viewResponse);
    });

    var viewHotel = function (response) {
//      console.log(response);
        var csv = response.split(';');
        console.log(csv);
        var str = 'Hotel: ' + csv[0] + ' (' + csv[1] + ' Sterne)';
        output.innerText = str;
    };

    btnCSV.addEventListener('click', function () {
        ajax('datadb.php', null, viewHotel);
    });




    var viewHotelJSON = function (jsonstr) {
        var hotel = JSON.parse(jsonstr);
        var str = 'Hotel: ' + hotel.name + ' (' + hotel.stars + ' Sterne)';
        output.innerText = str;
    };



    btnJSON.addEventListener('click', function () {
        ajax('dataJSON.php', null, viewHotelJSON);
    });




    var viewHolidaycheckTravel = function (jsonstr) {
        var travel = JSON.parse(jsonstr);

        output.innerHTML = templateFlight(travel.g0.data);
    };

    var templateFlight = function (data) {
        var html = '';
        html += '<div>' +
                '<h3>Airport: ' + data["0"].flight.departureAirportName + '</h3>' +
                '<hr>' +
                '<p>Datum: ' + data["0"].departureDate.formatted + '</p>' +
                '</div>';
        return html;
    };

    btnHoliday.addEventListener('click', function () {
        ajax('holidaycheck.json', null, viewHolidaycheckTravel);
    });



    var ajaxLoad = function (status, parent) {
        parent = parent || document.body;
        var loader = document.querySelector('.loader');
        if (loader === null) {
            loader = document.createElement('div');
            loader.className = 'loader';
            document.body.appendChild(loader);
        }
        if (status) {
            loader.className = 'loader active';
            parent.appendChild(loader);
        } else {
            loader.className = 'loader';
            document.body.appendChild(loader);
        }
    };

    var viewAfterLoading = function () {
        ajaxLoad(false);
        output.innerText = 'Loading fertig';
    };

    btnLoading.addEventListener('click', function () {
        ajaxLoad(true);
        ajax('loading.php', null, viewAfterLoading);
    });




})();