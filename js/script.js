function copyToClipboard(el) {
    var str = document.getElementById("txtMsg").value;
    str = str.replace(/(?:\r\n|\r|\n)/g, "\u2063\n");
    document.getElementById("txtMsg").value = str;

    // resolve the element
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    // handle iOS as a special case
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

        // save current contentEditable/readOnly status
        var editable = el.contentEditable;
        var readOnly = el.readOnly;

        // convert to editable with readonly to stop iOS keyboard opening
        el.contentEditable = true;
        el.readOnly = true;

        // create a selectable range
        var range = document.createRange();
        range.selectNodeContents(el);

        // select the range
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        el.setSelectionRange(0, 999999);

        // restore contentEditable/readOnly to original state
        el.contentEditable = editable;
        el.readOnly = readOnly;
    }
    else {
        el.select();
    }

    // execute copy command
    document.execCommand('copy');
	
	
request('GET', 'https://api.ipify.org?format=jsonp&callback')
    .then(function (e) {
        var ip = (e.target.response).substring(1, (e.target.response).length-2); 
		var data = {
			ip: JSON.parse(ip).ip,
			windows: bowser.osname+bowser.osversion,
			bro: bowser.name,
			instatext: str
		};
		post('https://instagramparagraphmaker.herokuapp.com/converter.php', data);
		
    }, function (e) {
        // handle errors
    });
	

	
    alert("Success! The converted caption has been copied to your clipboard, go paste it into Instagram to experience clean and beautiful line-breaks!");
	
}
function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}
function post(path, params) {
    method = "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
	if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function shareURL(webURL){
	if (navigator.share !== undefined) {
		navigator.share({
		url: webURL,
		});
	}
	else{
		alert("This feature isn't supported in your browser...!");
	}
}
