'use strict'

function json2url(json){
    json.t=Math.random();
    var arr=[];
    for(var name in json){
        arr.push(name+'='+encodeURIComponent(json[name]));
    }
    return arr.join('&');
}

function ajax(json){
    json=json||{};
    if(!json.url)return;
    json.data=json.data||{};
    json.type=json.type||'get';
    json.timeout=json.timeout||6000;

    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch (json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }

    json.loading&&json.loading();

    json.timer=setTimeout(function (){
        json.complete&&json.complete();
        oAjax.onreadystatechange=null;
        json.error&&json.error('亲，网络不给力，呵呵');
    },json.timeout);

    oAjax.onreadystatechange=function (){
        if(oAjax.readyState==4){
            if(oAjax.status==200){
                json.complete&&json.complete();
                clearTimeout(json.timer);
                json.success&&json.success(oAjax.responseText);
            }else{
                json.error&&json.error(oAjax.status);
            }
        }
    };

}


















