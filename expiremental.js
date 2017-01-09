// ==UserScript==
// @name         steam card max price
// @namespace    https://github.com/deathxlent/steamcardexchangeviewer
// @version      233
// @description  hehe
// @author       deathxlent
// @match        http://www.steamcardexchange.net/index.php?inventory
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    $("#content-advert").prepend("<table id='high_cards' class='price-list-table'><thead><tr><th>游戏id</th><th>卡名</th><th>Cards in Stock</th><th>价格</th><th>积分</th><th>操作</th></tr></thead><tbody></tbody></table>");
    $('#inventorylist > tbody > tr > td:nth-child(4)').each(function(){
        var game_id=$(this).attr("id").replace('set-','');
        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://www.steamcardexchange.net/index.php?inventorygame-appid-"+game_id,
            responseType: 'blob',
            onload: function (res) {
                $(res.responseText).find(".inventory-game-card-item").each(function(){
                    var game_item=$(this);
                    var card_name='';
                    var card_amount='';
                    var element_button='';
                    var card_price='';
                    game_item.find('.card-name').each(function(){
                        card_name=$(this).text();
                    });
                    game_item.find('.card-amount').each(function(){
                        card_amount=$(this).text();
                    });
                    game_item.find('.element-button').each(function(){
                        element_button=$(this).html();
                    });
                    game_item.find('.card-price').each(function(){
                        card_price=$(this).html();
                    });
                    if(card_amount!='Stock: 0' && card_amount!='Stock: 1'){
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: "http://steamcommunity.com/market/listings/753/"+game_id+"-"+escape(card_name),
                            onload: function (res) {
                                console.log($(this).responseText);
                                var marketLoadOrderSpread = res.responseText.match(/Market_LoadOrderSpread\( (\d+)/);
                                if (marketLoadOrderSpread !== null) {
                                    var item_id = marketLoadOrderSpread[1];
                                    GM_xmlhttpRequest({
                                        method: 'GET',
                                        url: "http://steamcommunity.com/market/itemordershistogram?country=CN&language=english&currency=23&item_nameid="+item_id+"&two_factor=0",
                                        responseType: 'json',
                                        onload: function (res) {
                                            var high_price=res.response.sell_order_graph[0][0];
                                            if(high_price>0.4){
                                                $("#high_cards").append("<tr><td>"+game_id+"</td><td>"+card_name+"</td><td>"+card_amount+"</td><td>"+high_price+"</td><td>"+card_price+"</td><td>"+element_button+"</td></tr>");
                                                console.log(game_id+":"+card_name);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    });
})();