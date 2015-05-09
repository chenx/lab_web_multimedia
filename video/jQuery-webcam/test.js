//
// https://github.com/infusion/jQuery-webcam
// http://www.xarg.org/project/jquery-webcam-plugin/
//

var pos = 0;
var ctx = null;
var cam = null;
var image = null;
var save_ct = 0;

jQuery("#webcam").webcam({

    width: 320,
    height: 240,
    mode: "callback",
    //swffile: "jscam_canvas_only.swf",
    swffile: "jscam.swf",

    onTick: function(remain) {

    if (0 == remain) {
        jQuery("#status").text("Cheese!");
    } else {
        jQuery("#status").text(remain + " seconds remaining...");
    }
},

onSave: function(data) {
    ++ save_ct;
    //appendMsg('save ... row ' + save_ct);

    var col = data.split(";");
    var img = image;

    for(var i = 0; i < 320; i++) {
        var tmp = parseInt(col[i]);
        img.data[pos + 0] = (tmp >> 16) & 0xff;
        img.data[pos + 1] = (tmp >> 8) & 0xff;
        img.data[pos + 2] = tmp & 0xff;
        img.data[pos + 3] = 0xff;
        pos+= 4;
    }
    //appendMsg('pos = ' + pos);

    if (pos >= 0x4B000) {
        //appendMsg('draw.........');
        ctx.putImageData(img, 0, 0);
        pos = 0;
    }
},

onCapture: function () {
    appendMsg('onCapture');
    save_ct = 0;
    webcam.save();

/*
    jQuery("#flash").css("display", "block");
    jQuery("#flash").fadeOut(100, function () {
        jQuery("#flash").css("opacity", 1);
    });
*/
},

debug: function (type, string) {
    jQuery("#status").html(type + ": " + string);
},

onLoad: function () {

    var cams = webcam.getCameraList();
    for(var i in cams) {
        jQuery("#cams").append("<li>" + cams[i] + "</li>");
    }
}
});

function getPageSize() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = window.innerWidth + window.scrollMaxX;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;

    if (self.innerHeight) { // all except Explorer
        if(document.documentElement.clientWidth){
            windowWidth = document.documentElement.clientWidth;
        } else {
            windowWidth = self.innerWidth;
        }
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if(yScroll < windowHeight){
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if(xScroll < windowWidth){
        pageWidth = xScroll;
    } else {
        pageWidth = windowWidth;
    }

    return [pageWidth, pageHeight];
}

window.addEventListener("load", function() {

    jQuery("body").append("<div id=\"flash\"></div>");

    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        ctx = document.getElementById("canvas").getContext("2d");
        ctx.clearRect(0, 0, 320, 240);

        var img = new Image();
        img.src = "./image/logo.gif";
        img.onload = function() {
            ctx.drawImage(img, 129, 89);
        }
        image = ctx.getImageData(0, 0, 320, 240);
    }

    var pageSize = getPageSize();
    //document.write('pageSize: ' + pageSize[0] + ',' + pageSize[1]);
    jQuery("#flash").css({ height: pageSize[1] + "px" });
    //alert(pageSize[1]);

}, false);

window.addEventListener("resize", function() {

    var pageSize = getPageSize();
    jQuery("#flash").css({ height: pageSize[1] + "px" });

}, false);



function appendMsg(msg) {
    var v = $('#msg').html();
    $('#msg').html(v + msg + '<br/>');
}
function clearMsg() {
    $('#msg').html('');
}


var stream = null;
var stream_ct = 0;

function startRecord() {
     webcam.resumeCamera();
     stream = setInterval(record, 200);
}

function record() {
     clearMsg();
     ++ stream_ct;
     appendMsg('start record: ' + stream_ct);
     webcam.capture();
}

function stopRecord() {
     if (null != stream) clearInterval(stream);
     stream = null;
     stream_ct = 0;
     appendMsg('recording stopped');

     webcam.pauseCamera();
     appendMsg('pause cam');
}
