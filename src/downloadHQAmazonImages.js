// ==UserScript==
// @name         Download Amazon Images Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.com/dp/*
// @grant        GM_addStyle
// @grant        GM_download
// ==/UserScript==

/*--- Create a button in a container div.  It will be styled and
    positioned with CSS.
*/

var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'download hq images</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    /*--- For our dummy action, we'll just add a line of text to the top
        of the screen.
    var zNode       = document.createElement ('p');
    zNode.innerHTML = 'The button was clicked.';
    document.getElementById ("myContainer").appendChild (zNode);
    */

    // get image popup to get high resolution img
    document.getElementById ("main-image-container").getElementsByClassName('selected')[0].getElementsByClassName('a-declarative')[0].click()

    // select each thumbnail to retrieve main image which is high-resolution
    image_popup = document.getElementById('ivImagesTab')
    thumbnails = image_popup.getElementsByClassName('ivThumb')
    image_thumbnails = []
    Array.prototype.forEach.call(thumbnails, function(thumbnail) {
        if (typeof thumbnail.id !== 'undefined' && thumbnail.id !== '') {
            image_thumbnails.push(thumbnail)
        }
    });
    console.log(image_thumbnails);

    Array.prototype.forEach.call(image_thumbnails, function(thumbnail) {
        thumbnail.onclick = e => {
            // open new tab
            // window.open(newImageUrl(document.getElementById('ivLargeImage').children[0].src), '_blank')
            GM_download(newImageUrl(document.getElementById('ivLargeImage').children[0].src), thumbnail.id)
        }
    });


}

function newImageUrl(url) {
    split = url.split("/")
    image_tag = split[split.length - 1]
    image_tags = image_tag.split(".")
    image_id = image_tags[0]
    image_format = image_tags[image_tags.length - 1]
    new_image_tag = [image_id, 'US800', image_format].join(".");
    split.splice(split.length - 1, 1, new_image_tag)
    newUrl = split.join("/");
    return newUrl
}


//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
        top:                    800px;
        left:                   0;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}
