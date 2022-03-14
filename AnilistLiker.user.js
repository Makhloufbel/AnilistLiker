// ==UserScript==
// @name         Anilist
// @namespace    https://github.com/Makhloufbel/AnilistLiker
// @homepage     https://github.com/Makhloufbel
// @version      0.3.2b
// @description  Allows users to quickly like posts on Anilist just by one click ,this version allow you to blacklist  or whitelist any user for ease of use
// @author       Makhloufbel
// @match        https://anilist.co/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// @charset      UTF-8
// @require      http://code.jquery.com/jquery-1.9.1.min.js
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_deleteValue
// @grant        GM_listValues
// ==/UserScript==



(function () {
    'use strict';
    const css = `
    .dropdown-menu {
    display: flex;
    position: absolute;
    top: .5em;
    left: 58%;
    width: 200px;
    }
.dropdown-menu label {
    background: #fff/*#1e83e5*/;
    color: #fff;
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid #fff;
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);
    display: block;
    float: left;
    position: relative;
    padding: 5px 25px 5px 10px;
    cursor: pointer;
    border-radius: 0.3em;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4),inset 0 10px 30px rgba(255, 255, 255, 0.3),0 0 0 3px rgba(100, 100, 100, 0.1),2px 2px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
}
.dropdown-menu label:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.6);
    border-right: 6px solid transparent;
    margin-left: -3px;
    margin-top: -3px;
}
.dropdown-menu label:hover {
    background: #4caffa;
}
.dropdown-menu input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}
.dropdown-menu ul {
    background-color:rgb(var(--color-background));
    position: absolute;
    top: 22px;
    list-style-type: none;
    padding: 5px 0;
    font-size: 13px;
    border: 1px solid #ddd;
    border-radius: 0.3em;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    display: none;
}
.dropdown-menu ul:after,
.dropdown-menu ul:before {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    bottom: 100%;
    border: solid transparent;
}
.dropdown-menu ul:after {
    border-bottom-color: #fff;
    border-width: 6px;
    left: 15%;
    margin-left: -6px;
}
.dropdown-menu ul:before {
    border-bottom-color: #ddd;
    border-width: 7px;
    left: 15%;
    margin-left: -7px;
}
.dropdown-menu a {
    text-decoration: none;
    color: rgb(var(--color-text));
    display: block;
    padding: 5px 15px;
}
.dropdown-menu li:last-of-type {
    margin-top: 4px;
    border-top: 1px solid silver;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
}
.dropdown-menu a:hover {
    background: #0088cc;
    color: #fff;
}
.dropdown-menu input[type="checkbox"]:checked ~ ul {
    display: block;
}
.dropdown-menu input[type="checkbox"]:checked ~ label {
    left: 1px;
    top: 1px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 10px 30px rgba(255, 255, 255, 0.3), 0 0 0 3px rgba(100, 100, 100, 0.05);
    background: #4caffa;
}
    div.ddm1{
        cursor: pointer !important;
        transition: .6s;
        opacity: 0 !important;
    }
    div.details:hover > .ddm1{
    opacity: 1!important;
    transition: .6s;
    }
#myButton {
    background-color: #fbeee0;
    border: 2px solid #422800;
    border-radius: 30px;
    box-shadow: #422800 4px 4px 0 0;
    color: #422800;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    font-size: 16px;
    padding: 0 18px;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}
#myButton {
    background-color: #fff;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10000;
}
#myButton:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px,2px);
}
@media (min-width:768px) {
    #myButton {
        min-width: 120px;
        padding: 0 25px;
    }
}

`;
    document
        .head
        .insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
    var blacklist = GM_getValue('bl', []);
    var _blacklist = GM_getValue('_bl', []);
    function tamperMonkey() {
        GM_registerMenuCommand('clear all blacklist', () => {
            blacklist = [];
            GM_setValue('bl', blacklist);
            _blacklist = [];
            GM_setValue('_bl', _blacklist);
            alert(' ALL has been removed !!!')
        });
        GM_registerMenuCommand('show blacklist', () => {
            var b = GM_getValue('_bl', _blacklist);
            alert(b)
        })
    };
    tamperMonkey();
    GM_log(GM_listValues());
    const random = (length = 8) => {
        return Math
            .random()
            .toString(16)
            .substr(2, length)
    };
    function dropper() {
        let e = document.querySelectorAll("div.details");
        for (let b of e) {
            if (!b.className.includes('Activated')) {
                let i = random(10);
                let dropdownMenu = document.createElement('div');
                dropdownMenu.classList = 'dropdown-menu ddm1';
                dropdownMenu.innerHTML = '<input type="checkbox" name="toggle" id="toggle-' + i + '"><label for="toggle-' + i + '">Black List</label>';
                let ul = document.createElement('ul');
                let bl = document.createElement('li');
                bl.innerHTML = '<a title = "blacklist ' + b.children[0].innerText + '">add</a>';
                let wl = document.createElement('li');
                wl.innerHTML = '<a title = "whitelist ' + b.children[0].innerText + '">remove</a>';
                ul.append(bl, wl);
                dropdownMenu.append(ul);
                bl.onclick = () => {
                    blacklist = GM_getValue('bl', []);
                    _blacklist = GM_getValue('_bl', []);
                    var value = value = String('https://anilist.co/user/' + b.children[0].innerText + '/');
                    var val = b.children[0].innerText;
                    if (!blacklist.includes(value)) {
                        blacklist.push(value);
                        _blacklist.push(val);
                        GM_setValue('bl', blacklist);
                        GM_setValue('_bl', _blacklist);
                        alert(val + ' has been blacklisted !');
                    } else {
                        alert(val + ' is already blacklisted !')
                    }
                    GM_log(GM_listValues());
                };
                wl.onclick = () => {
                    blacklist = GM_getValue('bl', []);
                    _blacklist = GM_getValue('_bl', []);
                    var value = value = String('https://anilist.co/user/' + b.children[0].innerText + '/');
                    var val = b.children[0].innerText;
                    if (blacklist.includes(value)) {
                        blacklist.splice(blacklist.indexOf(value), 1);
                        _blacklist.splice(_blacklist.indexOf(val), 1);
                        GM_setValue('_bl', _blacklist);
                        GM_setValue('bl', blacklist);
                        alert(val + ' has been whitelisted !');
                    } else {
                        alert(val + ' is not blacklisted !')
                    }
                };
                b
                    .children[0]
                    .after(dropdownMenu);
                b
                    .classList
                    .add("Activated")
            }
        }
    };
    function main() {
        var btn = document.createElement('div');
        btn.innerHTML = '<button id="myButton" type="button">LIKE ALL!</button>';
        btn.setAttribute('id', 'myContainer');
        btn.onclick = () => {
            let username = document
                .getElementsByClassName("links")[0]
                .getElementsByClassName("link")[1]
                .href;
            let likes = document.querySelectorAll(".button:not(.liked)");
            if (!blacklist.includes(username)) {
                blacklist.push(username)
            }
            function eventFire(el, etype) {
                if (el.fireEvent) {
                    el.fireEvent('on' + etype)
                } else {
                    var evObj = document.createEvent('Events');
                    evObj.initEvent(etype, true, false);
                    el.dispatchEvent(evObj)
                }
            }
            let myLikes = [];
            let boo = true;
            for (let c of likes) {
                boo = true;
                for (let e of blacklist) {
                    if (c.closest('.wrap').getElementsByClassName("name")[0].href == e) {
                        boo = false
                    }
                }
                if (boo == true) {
                    myLikes.push(c)
                }
            }
            for (let elt of myLikes) {
                eventFire(elt, 'click')
            }
        };
        document
            .body
            .after(btn)
    };
    main();
    const onMutate = function (mutationsList) {
        if (window.location.href == 'https://anilist.co/home') {
            dropper()
        }
    };
    const observer = new MutationObserver(onMutate);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
