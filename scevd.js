// ==UserScript==
// @name         steam card exchange simple viewer-detail
// @namespace    https://github.com/deathxlent/steamcardexchangeviewer
// @version      0.1
// @description  union inventory and showcase
// @author       deathxlent
// @match        http://www.steamcardexchange.net/index.php?inventorygame-appid-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     var game_id=0;
     $('.button-blue').each(function(){
         if($(this).html()=='SHOWCASE'){
             game_id=$(this).attr('href').replace('index.php?gamepage-appid-','');
         }
     });
     $.ajax({
         url:'http://www.steamcardexchange.net/index.php?gamepage-appid-'+game_id,
         type:'GET',
         async:true,
         dataType:'text',
         success:function(data){
    console.log(game_id);
             $('#content-area').append("<div id='div_d'></div>");
             var obj=jQuery.parseHTML(data);
             var htmlStr='';
             $(obj).find('.showcase-element-container').each(function(){
                 htmlStr+=$(this).prop("outerHTML");
             });
    console.log(htmlStr);
             $('#div_d').html(htmlStr);
    console.log('donw');
         }
     });
})();