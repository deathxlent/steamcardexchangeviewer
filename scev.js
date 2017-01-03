// ==UserScript==
// @name         steam card exchange simple viewer
// @namespace    https://github.com/deathxlent/steamcardexchangeviewer
// @version      0.1
// @description  just click the 'Sets Available' view showcase on the right side
// @author       deathxlent
// @match        http://www.steamcardexchange.net/index.php?inventory
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('#notification').prepend('<style>div.showcase-element {width: 120px; height:240px ;  position: relative;       float: left;    background-color: #18191B;    background-color: rgba(0, 0, 0, .3);}</style>');
    var noneedReg=new RegExp('<div class="showcase-element"></div>','g');
    $('#inventorylist > tbody > tr > td:nth-child(4)').each(function(){
		//$(this).unbind();
		$(this).css("border","1px #338FCC solid");
		$(this).css("cursor","pointer");
		$(this).bind("click",function(){
			var id=$(this).attr("id").replace('set-','');
			$("div").remove("#div_d");
			$.ajax({
				url:'http://www.steamcardexchange.net/index.php?gamepage-appid-'+id,
				type:'GET',
				async:true,
				dataType:'text',
				success:function(data){
					$('#notification').prepend("<div id='div_d' style='position:absolute;right:0;top:30%;height:80%;width:400px;'></div>");
					var obj=jQuery.parseHTML(data);
					var htmlStr='';
					$(obj).find('.showcase-element-container').each(function(){
						htmlStr+=$(this).attr('class').replace('showcase-element-container ','')+"<br/>"+$(this).html().replace(noneedReg,'');
					});
					$('#div_d').html(htmlStr);
				}
			});
		}
                    );
    });

})();
