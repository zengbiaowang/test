'use strict'
function jsonp(json){
	json = json || {};
	if(!json.url)return;
	json.cbName = json.cbName||'cb';
	json.data = json.data||{};
	json.data[json.cbName] = 'show'+Math.random();
	json.data[json.cbName] = json.data[json.cbName].replace('.','');
	var arr = [];
	for(var name in json.data){
		arr.push(name+'='+encodeURIComponent(json.data[name]));
	}
	var str = arr.join('&');
	window[json.data[json.cbName]] = function(result){
		json.success&&json.success(result);
	};
	var oH = document.getElementsByTagName('head')[0];
	var oS = document.createElement('script');
	oS.src = json.url+'?'+str;
	oH.appendChild(oS);
}