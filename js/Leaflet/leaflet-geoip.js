L.GeoIP = L.extend({

    getPosition: function (ip) {
        var url = "http://freegeoip.net/json/";
        var result = L.latLng(0, 0);

        if (ip !== undefined) {
            url = url + ip;
        } else {
            //lookup our own ip address
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                var geoip_response = JSON.parse(xhr.responseText);
                result.lat = geoip_response.latitude;
                result.lng = geoip_response.longitude;
            } else {
                console.log("Leaflet.GeoIP.getPosition failed because its XMLHttpRequest got this response: " + xhr.status);
            }
        };
        xhr.send();
        return result;
    },
    /*
     * 定位当前位置
     */
    getCurPosition: function (map, zoom, ip) {
        var url = 'http://api.map.baidu.com/location/ip?ak=5cf32b027c8927baa94c0fc655ab422a&qq-pf-to=pcqq.discussion&coor=bd09ll&callback=success_jsonpCallback';
        //http://api.map.baidu.com/ag/coord/convert?from=3&to=5&x=120.14264&y=30.193123
        $.ajax({
            type: "get",
            async: false,
            url: url,
            dataType: "jsonp",
            jsonp: "callbackparam",
            jsonpCallback: "success_jsonpCallback",
            success: function (json) {
                var address = json['content']['address'];
                var detail = json['content']['address_detail'];
                var point = json['content']['point'];

                var x = (Number)(point['x']);
                var y = (Number)(point['y']);
                var city = detail['city'];
                var province = detail['province'];
                var district = detail['district'];
                var street = detail['street'];

                map.setView([y, x], zoom);

                var latlng = bd_google_encrypt(y, x);
                L.marker(latlng).addTo(map);
            },
            error: function (e) {
                console.log('失败！');
            }
        });
    },
    centerMapOnPosition: function (map, zoom, ip) {
        L.GeoIP.getCurPosition(map, zoom, ip);
    }
});