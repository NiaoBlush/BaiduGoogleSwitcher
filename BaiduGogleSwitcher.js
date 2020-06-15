// ==UserScript==
// @name            切换百度谷歌搜索结果
// @name            BaiduGoogleResultSwitcher
// @namespace       https://github.com/NiaoBlush/BaiduGoogleSwitcher
// @version         1.0
// @description     切换百度谷歌搜索结果
// @author          NiaoBlush
// @license         MIT
// @grant           none
// @include         https://www.google.com/search?*
// @include         https://www.baidu.com/s?*
// ==/UserScript==

(function () {
    'use strict';

    const switcherBtnId = "baidu-google-switcher-btn-id";
    const site = getCurrentSite();
    console.log(site)


    // const urlParams = new URLSearchParams(window.location.search);
    // const currentLang = urlParams.get("lr") || "en";
    // const btnId = "btn-language-switcher";
    //
    let parent = document.getElementsByTagName("g-header-menu")[1].parentElement;
    let className = parent.lastElementChild.className;
    //
    let button = document.createElement("a");
    // button.innerText = currentLang === 'en' ? "lang_zh-CN" : "en";
    button.className = className;
    button.id = switcherBtnId;
    const imgSize = 20;
    button.innerText = "1"
    // button.style.fontSize= `${imgSize}px`;
    button.style.background = "url(https://www.google.com/favicon.ico) center no-repeat";
    button.style.backgroundSize = `${imgSize}px ${imgSize}px`


    // button.style.height = `${imgSize}px`;
    // button.style.width = `${imgSize}px`;
    // button.style.padding = "0px";
    // button.style.position = "absolute"
    // button.style.bottom = "5px";
    // button.style.cursor = "hand";

    // button.onclick = () => reload();
    //
    parent.appendChild(button);

    function getCurrentSite() {
        if (location.hostname.indexOf("baidu") > -1) {
            return "baidu";
        } else if (location.hostname.indexOf("google") > -1) {
            return "google";
        } else {
            return "unknown host";
        }
    }

    function getKeyword() {
        const urlParams = new URLSearchParams(window.location.search);
        let keyword = "";
        if (site === "baidu") {
            keyword = urlParams.get("wd");
        } else if (site === "google") {
            keyword = urlParams.get("q");
        }
        return keyword;
    }

    function redirect() {
        document.getElementById(switcherBtnId).innerText = "reloading";
        let url = "";
        if (site === "baidu") {
            url = `https://www.baidu.com/s?wd=${getKeyword()}`;
        } else if (site === "google") {
            url = `https://www.google.com/search?q=${getKeyword()}`;
        }
        if (url) {
            location.href = url;
        }
    }

})();
