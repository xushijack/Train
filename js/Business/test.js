
function getTrainLine() {
    var url = 'https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=2016-08-23&from_station=HGH&to_station=BJP&callback=success_jsonpCallback1';

    $.ajax({
        type: "get",
        async: false,
        url: url,
        dataType: "jsonp",
        jsonp: "callbackparam",
        jsonpCallback: "success_jsonpCallback1",
        success: function (json) {
            alert(json);
        },
        error: function (e) {
            console.log('失败！');
        }
    });
}