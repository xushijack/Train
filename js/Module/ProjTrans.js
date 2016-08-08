
/*
 * 墨卡托转经纬度坐标
 */
//经纬度转墨卡托
function lonlat2mercator(lonlat) {
    var mercator = { x: 0, y: 0 };
    var x = lonlat.x * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lonlat.y) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    mercator.x = x;
    mercator.y = y;
    return mercator;
}

//墨卡托转经纬度
function mercator2lonlat(mercator) {
    var lonlat = { x: 0, y: 0 };
    var x = mercator.x / 20037508.34 * 180;
    var y = mercator.y / 20037508.34 * 180;
    y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
    lonlat.x = x;
    lonlat.y = y;
    return lonlat;
}
var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
var pi = Math.PI;
var ee = 0.00669342162296594323;
var a = 6378245.0;
/// <summary>
/// 中国正常坐标系GCJ02协议的坐标，转到 百度地图对应的 BD09 协议坐标
/// </summary>
/// <param name="lat">维度</param>
/// <param name="lng">经度</param>
function Convert_GCJ02_To_BD09(lat, lng) {
    var x = lng, y = lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    lng = z * Math.cos(theta) + 0.0065;
    lat = z * Math.sin(theta) + 0.006;
    return [lat, lng];
}

/// <summary>
/// 百度地图对应的 BD09 协议坐标，转到 中国正常坐标系GCJ02协议的坐标
/// </summary>
/// <param name="lat">维度</param>
/// <param name="lng">经度</param>
function Convert_BD09_To_GCJ02(lat, lng) {
    var x = lng - 0.0065, y = lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    lng = z * Math.cos(theta);
    lat = z * Math.sin(theta);
    return [lat, lng];
}
/**
	 * wgLat 纬度
	 * wgLon 经度
	 * WGS-84 到 GCJ-02 的转换（即 GPS 加偏）
	 * */
function wgs_gcj_encrypts(wgLat, wgLon) {
    var point = [];
    if (outOfChina(wgLat, wgLon)) {
        point.push(wgLat);
        point.push(wgLon);
        return point;
    }
    var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
    var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
    var radLat = wgLat / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    var lat = wgLat + dLat;
    var lon = wgLon + dLon;
    point.push(lat);
    point.push(lon);
    return point;
}

function outOfChina(lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;
    return false;
}

function transformLat(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLon(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}

/**
	 * wgLat 纬度
	 * wgLon 经度
	 * BD-09转换GCJ-02
	 * 百度转google
	 * */
function bd_google_encrypt(bd_lat, bd_lon) {
    var point = new Array();
    var x = bd_lon - 0.0065, y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lon = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    point.push(gg_lat);
    point.push(gg_lon);
    return point;
}

/*
 * 百度转谷歌
 */
function bd_google(bd_lat, bd_lon) {
    var latlon1 = Convert_BD09_To_GCJ02(bd_lat, bd_lon);
    var latlon2 = wgs_gcj_encrypts(bd_lat, bd_lon);

    return [(latlon1[0] + latlon2[0]) / 2, (latlon1[1] + latlon2[1]) / 2];
}