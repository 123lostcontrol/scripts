// ==UserScript==
// @name         Activate B50 Card
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  激活金曲计分卡2023
// @author       You
// @match        *://www.ckg48.com/event/s321/star/activate.html
// @match        *://b50.ckg48.com/web/active.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Start activating star card.");
    if (typeof jQuery === 'undefined') {
        window.setTimeout(arguments.callee, 100);
        return;
    }
    $('#activeBtn').before("<a href='javascript:;' class='vi_ac_btn' id='batch-activate-btn'>批量激活</a>");
    $('#batch-activate-btn').before("<a href='javascript:;' class='vi_ac_btn' id='read-card-btn'>读取卡号</a>");
    $('#read-card-btn').before('<textarea id="card-numbers" rows="5" cols="15" style="background: white; width: 100%; max-width: 830px; margin-bottom: 5px" placeholder="粘贴需激活计分卡号 每行一个"></textarea>');
    $('#card-numbers').after("<div id='confirm-card-count'>已读取计分卡 <span id='card-count' style='color: aqua; font-weight:bold'>0</span> 张 | 已提交 <span id='completed-card-count' style='color: lime; font-weight:bold'>0</span> 张</div>");
    $(".vi_ac_btn").css({"margin": "10px", "display": "inline-block"});

    var cardNumbers = [];
    var i = 0;

    $('#read-card-btn').click(function(){
        cardNumbers = [];
        i = 0;
        $.each($('#card-numbers').val().trim().split(/\n/), function(i, line){
            if(line.trim()){
                cardNumbers.push(line.trim());
            }
        });
        $('#card-count').text(cardNumbers.length);
        $('#completed-card-count').text(i);
        console.log("Card numbers length: " + cardNumbers.length);
        console.log("Card numbers saved: ");
        console.log(cardNumbers);
    });

    $('#batch-activate-btn').click(function(){
        if (i < cardNumbers.length) {
            console.log("Activate card number: " + cardNumbers[i]);
            $('#code').val(cardNumbers[i]);
            $('#activeBtn').click();
            window.setTimeout(function() {$('.layui-layer .layui-layer-close').click();}, 2500);
            window.setTimeout(function() {$('#batch-activate-btn').click();}, 3500);
            i++;
            $('#completed-card-count').text(i);
        } else {
            window.alert("当前卡组已全部激活完成");
        }
    });
})();
