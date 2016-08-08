var map;
/*
 * 地图初始化
 */
function initMap() {

    var normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
        maxZoom: 18,
        minZoom: 5
    }),
        satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
            maxZoom: 18,
            minZoom: 5
        }),
        terrainMap = L.tileLayer.chinaProvider('Google.Terrain.Map', {
            maxZoom: 18,
            minZoom: 5
        });

    var baseLayers = {
        "地图": normalMap,
        "影像": satelliteMap,
        "地形": terrainMap
    }

    var overlayLayers = {

    }

    map = L.map("map", {
        //center: [30.26, 120.2],
        //zoom: 13,
        layers: [normalMap],
        zoomControl: false,
        attributionControl: false
    });

    L.control.layers(baseLayers, overlayLayers).addTo(map);
    L.control.zoom({
        zoomInTitle: '放大',
        zoomOutTitle: '缩小',
        position: 'bottomright'
    }).addTo(map);

    var zoom = 13;
    L.GeoIP.centerMapOnPosition(map, zoom);

    //var latlon1 = Convert_BD09_To_GCJ02(30.193123, 120.14264);
    //var latlon2 = wgs_gcj_encrypts(30.193123, 120.14264);
    //L.marker(bd_google_encrypt(30.194977, 120.147859)).addTo(map);//测试
    L.marker(bd_google_encrypt(30.29718, 120.219521)).addTo(map);//杭州东站120.219521, 30.29718
    L.marker(bd_google_encrypt(30.249896, 120.188193)).addTo(map);//杭州站/城站120.188193, 30.249896
    L.marker(bd_google_encrypt(30.177795, 120.300328)).addTo(map);//杭州火车南站120.300328, 30.177795
    L.marker(bd_google_encrypt(30.347802, 120.176641)).addTo(map);//杭州北站120.176641, 30.347802
    L.marker(bd_google_encrypt(30.386612, 120.302844)).addTo(map);//余杭站120.302844, 30.386612
    L.marker(bd_google_encrypt(30.2936, 20.1614)).addTo(map);//当前位置120.302844, 30.386612
    getTrainLine();
}
