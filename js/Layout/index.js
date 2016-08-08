/**
 * 存放页面布局、事件等操作方法
 * 
 * 
 * 
 * 
 */

/*
 * 文档入口
 */
$(function () {
    initKendoUI();
    registerEvents();
    initMap();
});

/*
 * 初始化kendoUI控件
 */
function initKendoUI() {
    $("#searchPanel").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
}

/*
 * 布局控制
 */
function page_resize() {

}

/*
 * 注册事件
 */
function registerEvents() {
    $('#btnSearch').click();
}