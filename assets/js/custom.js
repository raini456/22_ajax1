(function () {

    var output = document.querySelector('#output');
    var btn = document.querySelector('#btn');
    var btnCSV = document.querySelector('#btnCSV');
    var btnJSON = document.querySelector('#btnJSON');
    var btnHoliday = document.querySelector('#btnHoliday');
    var btnLoading = document.querySelector('#btnLoading');
    var btnHotels = document.querySelector('#btnHotels');
    var tableHotels = document.querySelector('#tableHotels');
    var formInsert = document.querySelector('#formInsert');


    var ajax = function (url, params, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.readyState===200) {
                //ajaxLoad(false);
                callback(this.responseText);
            }
        };
        params = (params) ? '?' + params : '';
        xhr.open('get', url + params, true);
        //ajaxLoad(true);
        xhr.send(null);
    };
    var ajaxPost = function (url, params, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && xhr.status === 200) {
                callback(this.responseText);
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.open('post', url, true);
        xhr.send(params);
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
//    var templateHotels = function(data){
//        console.log(data);
//        
//        var html="<table class='table table-bordered'><thead>"+
//                "<tr>"+
//                    "<th>Name</th>"+
//                    "<th>Stars</th>"+
//                "</tr>"+
//            "</thead>"+
//            "<tbody>";
//        for (var i = 0, max = data.lenght; i < max; i++) {
//            html +=       
//             "<tr>"+
//                "<td>" + data[i].name +"</td>"+
//                "<td>" + data[i].stars +"</td>"+
//            "<tr>";
//        }
//
//        html +="</tbody>"+
//                "</table>";
//    
//      tableHotels1.innerHTML=html;
//      return html;
//    }

    var viewHotels = function (jsonstr) {
        var table, thead, tbody, th, tr, td, txt;
        var hotels = JSON.parse(jsonstr);
        table = document.createElement('table');
        thead = document.createElement('thead');
        tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.className = 'table';

        tr = document.createElement('tr');
        thead.appendChild(tr);

        th = document.createElement('th');
        txt = document.createTextNode('Hotel');
        th.appendChild(txt);
        tr.appendChild(th);

        th = document.createElement('th');
        txt = document.createTextNode('Sterne');
        th.appendChild(txt);
        tr.appendChild(th);

        for (var i = 0, max = hotels.length; i < max; i++) {
            tr = document.createElement('tr');
            for (var key in hotels[i]) {
                td = document.createElement('td');
                txt = document.createTextNode(hotels[i][key]);
                td.appendChild(txt);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        tableHotels.appendChild(table);
        ajaxLoad(false);
        //output.innerHTML = hotels(travel.g0.data);
    };


    btnHoliday.addEventListener('click', function () {
        ajax('holidaycheck.json', null, viewHolidaycheckTravel);
    });

//   btnHotels.addEventListener('click', function(){        
//        ajaxLoad(true);
//        ajax('getHotels.php', null, viewHotels);
//    });
    btnHotels.addEventListener('click', function () {
        ajaxLoad(true);
        ajax('getHotels.php', null, viewHotels);
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
    formInsert.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = this.elements['nameHotel'];
        var stars = this.elements['starsHotel'];
        console.log(name, stars);
        var params = 'name=' + name.value + '&stars=' + stars.value;
        ajaxPost('insertHotel.php', params, function(){});
    });
})();