head.js(_baseUrl + "static/script/lib/zepto.min.js", _baseUrl + "static/script/lib/idangerous/idangerous.swiper-2.1.min.js", _baseUrl + "static/script/lib/idangerous/idangerous.swiper-2.1.min.js", function () {
    var g = "",
        f = "",
        d = "",
        b = "",
        a = "MjM5NjIzOTM0MA==",
        c;
    trim = function (h) {
        return h.replace(/^\s*|\s*$/g, "")
    };
    parseParams = function (o) {
        if (!o) {
            return {}
        }
        var h = o.split("&"),
            n = {},
            m = "";
        for (var k = 0, j = h.length; k < j; k++) {
            m = h[k].split("=");
            n[m[0]] = m[1]
        }
        return n
    };
    htmlDecode = function (h) {
        return h.replace(/&#39;/g, "'").replace(/<br\s*(\/)?\s*>/g, "\n").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    };
    share_scene = function (j, i) {
        var l = "";
        if (g != "") {
            l = "tid=" + g + "&aid=" + 54
        }
        var k = j.split("?")[1] || "";
        k = k.split("#")[0];
        if (k == "") {
            return
        }
        var h = [k, "scene=" + i];
        (l != "") && (h.push(l));
        k = h.join("&");
        return j.split("?")[0] + "?" + k + "#" + (j.split("#")[1] || "")
    };
    showTimer = function (n) {
        var k = new Date(),
            m = new Date(n.year, n.mon - 1, n.day, n.hour, n.min, n.sec),
            o = k.getTime() - m.getTime(),
            l = parseInt(o / 1000),
            j = Math.floor(l / (60 * 60 * 24)),
            h = Math.floor((l - j * 24 * 60 * 60) / 3600);
        minute = Math.floor((l - j * 24 * 60 * 60 - h * 3600) / 60), second = Math.floor(l - j * 24 * 60 * 60 - h * 3600 - minute * 60);
        var i = "<li>" + j + "</li><li>" + h + "</li><li>" + minute + "</li><li>" + second + "</li>";
        $(".timeNum").html(i)
    };
    simuEvent = function (k) {
        var h = document.createElement("A");
        h.on("click", function i(l) {
            this.off("click", i);
            k()
        }, false);
        var j = document.createEvent("MouseEvent");
        j.initMouseEvent("click", true, true, this, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        h.dispatchEvent(j)
    };
    musicEnd = function (h, i) {
        if (typeof h != "undefined" && typeof i != "undefined") {
            h.addEventListener("ended", function () {
                if (i.find("img") < 0) {
                    return
                } else {
                    h.currentTime = 0;
                    i.html("f")
                }
            }, false)
        }
    };
    var e = document.createElement("audio");
    playerControl = function (n, l, k) {
        var n = typeof n == "undefined" ? "" : n,
            l = typeof l == "undefined" ? "" : l,
            h = k.find("i"),
            j = _baseUrl + "static/images/topic/missingplane/pause.png",
            m = _baseUrl + "static/images/topic/missingplane/play.png";
        $("#pageOne .news li i img").remove();
        $("#pageOne .news li i span").show();
        if (l == "stop") {
            $("#pageOne .news .audio").attr("data-status", "stop");
            h.find("span").hide();
            if (h.find("img").length > 0) {
                h.find("img").remove()
            }
            $('<img src="' + j + '" id="pauseImg" />').appendTo(h);
            k.attr("data-status", "play");
            e.src = n;
            e.play();
            musicEnd(e, k)
        } else {
            if (l == "play" || l == "pause") {
                e.pause();
                k.attr("data-status", "stop");
                if (h.find("img").length > 0) {
                    h.find("img").remove()
                }
                h.find("span").hide();
                $('<img src="' + m + '" id="playImg" />').appendTo(h)
            } else {
                if (typeof e != "undefined") {}
            }
        }
    };
    showWeather = function () {
        var h = " ";
        $.getJSON(_baseUrl + "index.php/topic/getWeather", function (i) {})
    };
    getMoreContent = function (k, j, i) {
        var h = i;
        $.ajax({
            url: _baseUrl + "index.php/topic/getList",
            data: {
                from: k,
                count: j
            },
            type: "POST",
            dataType: "JSON",
            success: function (n) {
                var n = n.replace(/\\'/g, "'"),
                    o = JSON.parse(n),
                    l = [];
                for (var m = 0; m < o.length; m++) {
                    i++;
                    html = '<li data-contentid="' + o[m].id + '"><div class="list article clearfix"><i><span>' + i + '</span></i><div class="topRight"><h3 class="clearfix">' + o[m].subject + '</h3><p class="createTime">' + o[m].create_time + '</p></div><div style="display:none" class="content clearix">' + o[m].content + '</div> <p class="created"></p><p class="icon moreIcon"><img src="' + _baseUrl + 'static/images/topic/missingplane/down1.png"></p></div><div class="bgcover"></div> </li>';
                    l.push(html)
                }
                l = l.join("");
                $(l).appendTo($("#pageOne .news ul"));
                $("#pageOne .news .readMore").hide()
            },
            error: function () {
                alert("data load fail")
            }
        })
    };
    $(function () {
        window.setInterval(function () {
            var k = {
                year: "2014",
                mon: "3",
                day: "8",
                hour: "1",
                min: "30",
                sec: "0"
            };
            showTimer(k)
        }, 1000);
        var j = [{
            id: "pageOne",
            coverImg: _baseUrl + "static/images/topic/missingplane/home_bg.jpg"
        }, {
            id: "pageTwo",
            coverImg: _baseUrl + "static/images/topic/missingplane/ditu.png"
        }, {
            id: "pageThree",
            coverImg: _baseUrl + "static/images/topic/missingplane/ditu.png"
        }, {
            id: "pageFour",
            coverImg: false
        }];
        $("#nav li").live("tap", function () {
            if ($(this).parent().hasClass("action")) {
                return
            } else {
                $(".bodyCover").fadeIn(0);
                $(".page").hide();
                $("html")[0].scrollTop = 0;
                $("body")[0].scrollTop = 0;
                var k = $(this).index(),
                    l = j[k];
                if (l.coverImg) {
                    $("#bodyCoverDiv img").attr("src", l.coverImg).show()
                } else {
                    $("#bodyCoverDiv img").hide()
                }
                $("#" + j[k]["id"]).fadeIn(200, function () {
                    $(".bodyCover").hide();
                    $("#nav ul li.action").removeClass("action");
                    $("#nav ul li:eq(" + k + ")").addClass("action")
                })
            }
        });
        var h = false;
        $("#pageOne .news li .audio").live("click", function () {
            if (!k) {
                k = true;
                setTimeout(function () {
                    k = false
                }, 100);
                var k = $(this).data("status"),
                    m = $(this).find(".soundSource").val(),
                    l = $(this);
                playerControl(m, k, l)
            }
            return false
        });
        $("#pageOne .news li .audio").unbind("tap");
        $("#pageOne .news li .article").live("tap", function (o) {
            var m = $(this).find(".content"),
                l = $(this).find(".icon"),
                k = l.find("img"),
                p = _baseUrl + "static/images/topic/missingplane/down1.png",
                q = l.hasClass("earIcon") ? true : false,
                n = $(this);
            if (q) {} else {
                if (m.css("display") != "none") {
                    m.hide();
                    k.attr("src", p)
                } else {
                    m.fadeIn();
                    k.attr("src", _baseUrl + "static/images/topic/missingplane/up.png")
                }
            }
        });
        var i = {
            searchInfoImg: "areaHtml",
            oceanInfoImg: "oceanHtml",
            trackInfoImg: "trackHtml"
        };
        $(".fullScreenIcon").live("click", function () {
            var l = $(this).parent();
            if (l.hasClass("searchInfoImg")) {} else {
                if (l.hasClass("trackInfoImg")) {
                    var m = i.trackInfoImg
                } else {
                    var m = i.oceanInfoImg
                }
            } if (typeof (m) != "undefined") {
                htmlstr = $("#" + m).text()
            } else {
                window.location.href = _baseUrl + "index.php/topic/map";
                return
            }
            $("#fullScreenSlider").html(htmlstr).fadeIn(0);
            var k = new Swiper(".swiper-container", {
                pagination: ".pagination",
                paginationClickable: true,
                moveStartThreshold: 100
            })
        });
        $(".toSmall").live("click", function () {
            var k = $(this).parent();
            k.parent().css("display", "none");
            k.remove()
        });
        $("#pageOne .news .readMore").live("tap", function () {
            var l = $("#pageOne .news li :last").data("contentid"),
                k = $("#pageOne .news li :last").find("i").text();
            getMoreContent(l, "5", k)
        });
        (function () {
            onBridgeReady = function () {
                var r = "",
                    s = "http://www.nidserve.com/static/images/topic/missingplane/icon/icon_640x640.jpg",
                    l = "http://www.nidserve.com/topic/mh370",
                    p = l + "/s?__biz=MjM5NjIzOTM0MA==&mid=200254422&idx=1&sn=",
                    q = htmlDecode("MH370航班联合搜寻行动"),
                    n = htmlDecode("MH370失踪航班第一手资讯，持续更新中！"),
                    k = "";
                n = n || p;
                if ("1" == "0") {
                    WeixinJSBridge.call("hideOptionMenu")
                }
                WeixinJSBridge.on("menu:share:appmessage", function (t) {
                    WeixinJSBridge.invoke("sendAppMessage", {
                        appid: r,
                        img_url: s,
                        img_width: "640",
                        img_height: "640",
                        link: share_scene(p, 1),
                        desc: n,
                        title: q
                    }, function (u) {})
                });
                WeixinJSBridge.on("menu:share:timeline", function (t) {
                    WeixinJSBridge.invoke("shareTimeline", {
                        img_url: s,
                        img_width: "640",
                        img_height: "640",
                        link: share_scene(p, 2),
                        desc: n,
                        title: q
                    }, function (u) {})
                });
                var o = "";
                WeixinJSBridge.on("menu:share:weibo", function (t) {
                    WeixinJSBridge.invoke("shareWeibo", {
                        content: q + share_scene(p, 3),
                        url: share_scene(p, 3)
                    }, function (u) {})
                });
                WeixinJSBridge.on("menu:share:facebook", function (t) {
                    report(p, k, 4);
                    WeixinJSBridge.invoke("shareFB", {
                        img_url: s,
                        img_width: "640",
                        img_height: "640",
                        link: share_scene(p, 4),
                        desc: n,
                        title: q
                    }, function (u) {})
                });
                WeixinJSBridge.on("menu:general:share", function (t) {
                    var u = 0;
                    switch (t.shareTo) {
                    case "friend":
                        u = 1;
                        break;
                    case "timeline":
                        u = 2;
                        break;
                    case "weibo":
                        u = 3;
                        break
                    }
                    t.generalShare({
                        appid: r,
                        img_url: s,
                        img_width: "640",
                        img_height: "640",
                        link: share_scene(p, u),
                        desc: n,
                        title: q
                    }, function (v) {})
                });
                var m = {
                    "network_type:fail": "fail",
                    "network_type:edge": "2g",
                    "network_type:wwan": "3g",
                    "network_type:wifi": "wifi"
                };
                if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke) {
                    WeixinJSBridge.invoke("getNetworkType", {}, function (t) {
                        c = m[t.err_msg];
                        initpicReport()
                    })
                }
            };
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false)
                } else {
                    if (document.attachEvent) {
                        document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady)
                    }
                }
            } else {
                onBridgeReady()
            }
        })();
        (function () {
            var k = [];
            getInsData = function () {
                var l = "https://api.instagram.com/v1/tags/mh370/media/recent?access_token=29561604.0d9e12b.f6b44a37388246918f27c9fa26b9a11c";
                callback = function (p) {
                    var r = p.data;
                    for (var n = 0; n < r.length; n++) {
                        var m = r[n].images;
                        if (m.thumbnail.url.indexOf("origincache") < 0) {
                            k.push(r[n])
                        }
                    }
                    var q = document.documentElement.scrollTop + document.body.scrollTop,
                        o = parseInt($("#pageOne .news .readMore").offset().top) - 300;
                    if (q > o && $("#pageOne .insData .images span").length > 0 && k.length > 0) {
                        showFirstData()
                    }
                };
                $.ajax({
                    url: l,
                    type: "get",
                    dataType: "jsonp",
                    jsonpCallback: "callback",
                    data: {},
                    success: callback,
                    error: function () {
                        alert("数据载入错误")
                    }
                })
            };
            getInsData();
            showFirstData = function () {
                var n = [];
                for (var o = 0; o < 6; o++) {
                    if (k[o]) {
                        var q = k[o].caption ? k[o].caption.text : "",
                            m = k[o].user,
                            l = k[o].images,
                            p = '<div class="img clearfix"><img src="' + l.low_resolution.url + '" /><p class="nick">@' + m.username + "</p></div>";
                        n.push(p)
                    }
                }
                $("#pageOne .first .images").html(n.join(""));
                $("#pageOne .first .img:eq(0)").addClass("doubble");
                $("#pageOne .readMoreIns").fadeIn()
            };
            $(window).scroll(function () {
                var l = parseInt($("#pageOne .news .readMore").offset().top) - 300,
                    m = document.documentElement.scrollTop + document.body.scrollTop;
                if (m > l && $("#pageOne .insData .images span").length > 0 && k.length > 0) {
                    showFirstData()
                }
            });
            showInstagram = function () {
                var s = k;
                if (s.length > 0) {
                    var l = [];
                    for (var p = 0; p < 6; p++) {
                        var u = s[p].caption ? s[p].caption.text : "",
                            o = s[p].user,
                            t = s[p].images,
                            r = s[p].created_time,
                            n = new Date(parseInt(r) * 1000).toLocaleString().replace(/:\d{1,2}$/, " "),
                            m = n.substring(n.length - 6, n.length);
                        var q = '<div class="item clearfix"><div class="images clearfix"><div class="head"><div class="avater"><img src="' + o.profile_picture + '" /></div><div class="nick">' + o.username + '</div><div class="publishTime">' + m + '</div></div><div class="img clearfix"><img src="' + t.low_resolution.url + '" /></div><p>' + u + '</p></div><div class="bgcover"></div></div>';
                        l.push(q)
                    }
                    $("#pageOne .readMoreIns").hide();
                    $("#pageOne .insData .first").after(l.join(""))
                }
            };
            $("#pageOne .readMoreIns").live("tap", function () {
                showInstagram()
            })
        })();
        (function () {
            lightUp = function (l) {
                var k = _baseUrl + "index.php/topic/counter";
                $.ajax({
                    url: k,
                    data: {},
                    dataType: "JSON",
                    type: "POST",
                    success: function (m) {
                        l.css("opacity", "1");
                        var m = m.replace(/\\'/g, "'"),
                            n = JSON.parse(m);
                        if (n.res == "1") {
                            $("#pageOne .lightup .pray span").html(n.count)
                        } else {
                            alert("你已点亮过")
                        }
                    },
                    error: function () {
                        console.log("点亮出错！")
                    }
                })
            };
            $("#pageOne .lightup .light").bind("touchstart", function () {
                $(this).css("opacity", "0.5");
                lightUp($(this))
            })
        })();
        (function () {
            $("#pageOne .bigNumList .others").bind("tap", function () {
                var k = $(this).find(".itemContent");
                if (k.css("display") != "none") {
                    k.hide()
                } else {
                    k.show()
                }
            })
        })();
        (function () {
            applicationCache.onchecking = function () {};
            applicationCache.ondownloading = function () {};
            applicationCache.onnoupdate = function () {};
            applicationCache.onprogress = function () {};
            applicationCache.oncached = function () {};
            applicationCache.onupdateready = function () {
                alert("本地缓存正在更新中。。。");
                applicationCache.swapCache();
                location.reload()
            };
            applicationCache.onobsolete = function () {};
            applicationCache.onerror = function (k) {}
        })()
    })
});