/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function (b) {
        var c = !1,
            d = this;
        a(this).one(a.support.transition.end, function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b()
    })
}(jQuery), + function (a) {
    "use strict";
    var b = '[data-dismiss="alert"]',
        c = function (c) {
            a(c).on("click", b, this.close)
        };
    c.prototype.close = function (b) {
        function c() {
            f.trigger("closed.bs.alert").remove()
        }
        var d = a(this),
            e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
        return a.fn.alert = d, this
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(jQuery), + function (a) {
    "use strict";
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.isLoading = !1
    };
    b.DEFAULTS = {
        loadingText: "loading..."
    }, b.prototype.setState = function (b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", f.resetText || d.data("resetText", d[e]()), d[e](f[b] || this.options[b]), setTimeout(a.proxy(function () {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, b.prototype.toggle = function () {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
        return a.fn.button = c, this
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
    })
}(jQuery), + function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, b.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function (b) {
        var c = this,
            d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, b.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, b.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = a.Event("slide.bs.carousel", {
            relatedTarget: e[0],
            direction: g
        });
        return this.$element.trigger(j), j.isDefaultPrevented() ? void 0 : (this.sliding = !0, f && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function () {
            var b = a(i.$indicators.children()[i.getActiveIndex()]);
            b && b.addClass("active")
        })), a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () {
            e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                i.$element.trigger("slid.bs.carousel")
            }, 0)
        }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), f && this.cycle(), this)
    };
    var c = a.fn.carousel;
    a.fn.carousel = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
                g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
        var c, d = a(this),
            e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
            f = a.extend({}, e.data(), d.data()),
            g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(jQuery), + function (a) {
    "use strict";
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {
        toggle: !0
    }, b.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, b.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning) return;
                    c.collapse("hide"), d || c.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
                var f = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) return f.call(this);
                var g = a.camelCase(["scroll", e].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
            }
        }
    }, b.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function () {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }, b.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            !e && f.toggle && "show" == c && (c = !c), e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = c, this
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var c, d = a(this),
            e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""),
            f = a(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : d.data(),
            i = d.attr("data-parent"),
            j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h)
    })
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        a(d).remove(), a(e).each(function () {
            var d = c(a(this)),
                e = {
                    relatedTarget: this
                };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        })
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }
    var d = ".dropdown-backdrop",
        e = "[data-toggle=dropdown]",
        f = function (b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    f.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                f.toggleClass("open").trigger("shown.bs.dropdown", h), e.focus()
            }
            return !1
        }
    }, f.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d),
                    g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click();
                var h = " li:not(.divider):visible a",
                    i = f.find("[role=menu]" + h + ", [role=listbox]" + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).focus()
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = g, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu], [role=listbox]", f.prototype.keydown)
}(jQuery), + function (a) {
    "use strict";
    var b = function (b, c) {
        this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    b.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, b.prototype.toggle = function (a) {
        return this[this.isShown ? "hide" : "show"](a)
    }, b.prototype.show = function (b) {
        var c = this,
            d = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        }))
    }, b.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, b.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
        }, this))
    }, b.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, b.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
        })
    }, b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, b.prototype.backdrop = function (b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var c = a.fn.modal;
    a.fn.modal = function (c, d) {
        return this.each(function () {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d)
        })
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
        return a.fn.modal = c, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this),
            d = c.attr("href"),
            e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
            f = e.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(d) && d
            }, e.data(), c.data());
        c.is("a") && b.preventDefault(), e.modal(f, this).one("hide", function () {
            c.is(":visible") && c.focus()
        })
    }), a(document).on("show.bs.modal", ".modal", function () {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        a(document.body).removeClass("modal-open")
    })
}(jQuery), + function (a) {
    "use strict";
    var b = function (a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function (b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, b.prototype.getDelegateOptions = function () {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, b.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show()
    }, b.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, b.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented()) return;
            var c = this,
                d = this.tip();
            this.setContent(), this.options.animation && d.addClass("fade");
            var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement,
                f = /\s?auto?\s?/i,
                g = f.test(e);
            g && (e = e.replace(f, "") || "top"), d.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(e), this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
            var h = this.getPosition(),
                i = d[0].offsetWidth,
                j = d[0].offsetHeight;
            if (g) {
                var k = this.$element.parent(),
                    l = e,
                    m = document.documentElement.scrollTop || document.body.scrollTop,
                    n = "body" == this.options.container ? window.innerWidth : k.outerWidth(),
                    o = "body" == this.options.container ? window.innerHeight : k.outerHeight(),
                    p = "body" == this.options.container ? 0 : k.offset().left;
                e = "bottom" == e && h.top + h.height + j - m > o ? "top" : "top" == e && h.top - m - j < 0 ? "bottom" : "right" == e && h.right + i > n ? "left" : "left" == e && h.left - i < p ? "right" : e, d.removeClass(l).addClass(e)
            }
            var q = this.getCalculatedOffset(e, h, i, j);
            this.applyPlacement(q, e), this.hoverState = null;
            var r = function () {
                c.$element.trigger("shown.bs." + c.type)
            };
            a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r()
        }
    }, b.prototype.applyPlacement = function (b, c) {
        var d, e = this.tip(),
            f = e[0].offsetWidth,
            g = e[0].offsetHeight,
            h = parseInt(e.css("margin-top"), 10),
            i = parseInt(e.css("margin-left"), 10);
        isNaN(h) && (h = 0), isNaN(i) && (i = 0), b.top = b.top + h, b.left = b.left + i, a.offset.setOffset(e[0], a.extend({
            using: function (a) {
                e.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), e.addClass("in");
        var j = e[0].offsetWidth,
            k = e[0].offsetHeight;
        if ("top" == c && k != g && (d = !0, b.top = b.top + g - k), /bottom|top/.test(c)) {
            var l = 0;
            b.left < 0 && (l = -2 * b.left, b.left = 0, e.offset(b), j = e[0].offsetWidth, k = e[0].offsetHeight), this.replaceArrow(l - f + j, j, "left")
        } else this.replaceArrow(k - g, k, "top");
        d && e.offset(b)
    }, b.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, b.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, b.prototype.hide = function () {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    }, b.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, b.prototype.hasContent = function () {
        return this.getTitle()
    }, b.prototype.getPosition = function () {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset())
    }, b.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, b.prototype.getTitle = function () {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, b.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, b.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, b.prototype.enable = function () {
        this.enabled = !0
    }, b.prototype.disable = function () {
        this.enabled = !1
    }, b.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, b.prototype.toggle = function (b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, b.prototype.destroy = function () {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = c, this
    }
}(jQuery), + function (a) {
    "use strict";
    var b = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, b.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, b.prototype.getContent = function () {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, b.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]())
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () {
        return a.fn.popover = c, this
    }
}(jQuery), + function (a) {
    "use strict";

    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
    }
    b.DEFAULTS = {
        offset: 10
    }, b.prototype.refresh = function () {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]); {
            var c = this;
            this.$body.find(this.selector).map(function () {
                var d = a(this),
                    e = d.data("target") || d.attr("href"),
                    f = /^#./.test(e) && a(e);
                return f && f.length && f.is(":visible") && [
                    [f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]
                ] || null
            }).sort(function (a, b) {
                return a[0] - b[0]
            }).each(function () {
                c.offsets.push(this[0]), c.targets.push(this[1])
            })
        }
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            d = c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(jQuery), + function (a) {
    "use strict";
    var b = function (b) {
        this.element = a(b)
    };
    b.prototype.show = function () {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
                f = a.Event("show.bs.tab", {
                    relatedTarget: e
                });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                })
            }
        }
    }, b.prototype.activate = function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }
        var f = c.find("> .active"),
            g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
        return a.fn.tab = c, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show")
    })
}(jQuery), + function (a) {
    "use strict";
    var b = function (c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {
        offset: 0
    }, b.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(b.RESET).addClass("affix");
        var a = this.$window.scrollTop(),
            c = this.$element.offset();
        return this.pinnedOffset = c.top - a
    }, b.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, b.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var c = a(document).height(),
                d = this.$window.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                g = f.top,
                h = f.bottom;
            "top" == this.affixed && (e.top += d), "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""),
                    k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
                    top: c - h - this.$element.height()
                }))
            }
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () {
        return a.fn.affix = c, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var b = a(this),
                c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(jQuery);
/*
 * swiper 2.4.3
 * Mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2010-2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: January 29, 2014
*/
var Swiper=function(a,b){function c(a,b){return document.querySelectorAll?(b||document).querySelectorAll(a):jQuery(a,b)}function d(a){"use strict";return"[object Array]"===Object.prototype.toString.apply(a)?!0:!1}function e(){var a=F-I;return b.freeMode&&(a=F-I),b.slidesPerView>C.slides.length&&(a=0),0>a&&(a=0),a}function f(){function a(a){var c=new Image;c.onload=function(){C.imagesLoaded++,C.imagesLoaded==C.imagesToLoad.length&&(C.reInit(),b.onImagesReady&&C.fireCallback(b.onImagesReady,C))},c.src=a}var d=C.h.addEventListener,e="wrapper"==b.eventTarget?C.wrapper:C.container;if(C.browser.ie10||C.browser.ie11?(d(e,C.touchEvents.touchStart,p),d(document,C.touchEvents.touchMove,q),d(document,C.touchEvents.touchEnd,r)):(C.support.touch&&(d(e,"touchstart",p),d(e,"touchmove",q),d(e,"touchend",r)),b.simulateTouch&&(d(e,"mousedown",p),d(document,"mousemove",q),d(document,"mouseup",r))),b.autoResize&&d(window,"resize",C.resizeFix),g(),C._wheelEvent=!1,b.mousewheelControl){void 0!==document.onmousewheel&&(C._wheelEvent="mousewheel");try{WheelEvent("wheel"),C._wheelEvent="wheel"}catch(f){}C._wheelEvent||(C._wheelEvent="DOMMouseScroll"),C._wheelEvent&&d(C.container,C._wheelEvent,j)}if(b.keyboardControl&&d(document,"keydown",i),b.updateOnImagesReady){C.imagesToLoad=c("img",C.container);for(var h=0;h<C.imagesToLoad.length;h++)a(C.imagesToLoad[h].getAttribute("src"))}}function g(){var a,d=C.h.addEventListener;if(b.preventLinks){var e=c("a",C.container);for(a=0;a<e.length;a++)d(e[a],"click",n)}if(b.releaseFormElements){var f=c("input, textarea, select",C.container);for(a=0;a<f.length;a++)d(f[a],C.touchEvents.touchStart,o,!0)}if(b.onSlideClick)for(a=0;a<C.slides.length;a++)d(C.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<C.slides.length;a++)d(C.slides[a],C.touchEvents.touchStart,l)}function h(){var a,d=C.h.removeEventListener;if(b.onSlideClick)for(a=0;a<C.slides.length;a++)d(C.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<C.slides.length;a++)d(C.slides[a],C.touchEvents.touchStart,l);if(b.releaseFormElements){var e=c("input, textarea, select",C.container);for(a=0;a<e.length;a++)d(e[a],C.touchEvents.touchStart,o,!0)}if(b.preventLinks){var f=c("a",C.container);for(a=0;a<f.length;a++)d(f[a],"click",n)}}function i(a){var b=a.keyCode||a.charCode;if(37==b||39==b||38==b||40==b){for(var c=!1,d=C.h.getOffset(C.container),e=C.h.windowScroll().left,f=C.h.windowScroll().top,g=C.h.windowWidth(),h=C.h.windowHeight(),i=[[d.left,d.top],[d.left+C.width,d.top],[d.left,d.top+C.height],[d.left+C.width,d.top+C.height]],j=0;j<i.length;j++){var k=i[j];k[0]>=e&&k[0]<=e+g&&k[1]>=f&&k[1]<=f+h&&(c=!0)}if(!c)return}M?((37==b||39==b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),39==b&&C.swipeNext(),37==b&&C.swipePrev()):((38==b||40==b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),40==b&&C.swipeNext(),38==b&&C.swipePrev())}function j(a){var c=C._wheelEvent,d=0;if(a.detail)d=-a.detail;else if("mousewheel"==c)if(b.mousewheelControlForceToAxis)if(M){if(!(Math.abs(a.wheelDeltaX)>Math.abs(a.wheelDeltaY)))return;d=a.wheelDeltaX}else{if(!(Math.abs(a.wheelDeltaY)>Math.abs(a.wheelDeltaX)))return;d=a.wheelDeltaY}else d=a.wheelDelta;else if("DOMMouseScroll"==c)d=-a.detail;else if("wheel"==c)if(b.mousewheelControlForceToAxis)if(M){if(!(Math.abs(a.deltaX)>Math.abs(a.deltaY)))return;d=-a.deltaX}else{if(!(Math.abs(a.deltaY)>Math.abs(a.deltaX)))return;d=-a.deltaY}else d=Math.abs(a.deltaX)>Math.abs(a.deltaY)?-a.deltaX:-a.deltaY;if(b.freeMode){var f=C.getWrapperTranslate()+d;if(f>0&&(f=0),f<-e()&&(f=-e()),C.setWrapperTransition(0),C.setWrapperTranslate(f),C.updateActiveSlide(f),0==f||f==-e())return}else(new Date).getTime()-U>60&&(0>d?C.swipeNext():C.swipePrev()),U=(new Date).getTime();return b.autoplay&&C.stopAutoplay(!0),a.preventDefault?a.preventDefault():a.returnValue=!1,!1}function k(a){C.allowSlideClick&&(m(a),C.fireCallback(b.onSlideClick,C,a))}function l(a){m(a),C.fireCallback(b.onSlideTouch,C,a)}function m(a){if(a.currentTarget)C.clickedSlide=a.currentTarget;else{var c=a.srcElement;do if(c.className.indexOf(b.slideClass)>-1)break;while(c=c.parentNode);C.clickedSlide=c}C.clickedSlideIndex=C.slides.indexOf(C.clickedSlide),C.clickedSlideLoopIndex=C.clickedSlideIndex-(C.loopedSlides||0)}function n(a){return C.allowLinks?void 0:(a.preventDefault?a.preventDefault():a.returnValue=!1,b.preventLinksPropagation&&"stopPropagation"in a&&a.stopPropagation(),!1)}function o(a){return a.stopPropagation?a.stopPropagation():a.returnValue=!1,!1}function p(a){if(b.preventLinks&&(C.allowLinks=!0),C.isTouched||b.onlyExternal)return!1;if(b.noSwiping&&(a.target||a.srcElement)&&s(a.target||a.srcElement))return!1;if($=!1,thresholdFirstMove=!1,C.isTouched=!0,Z="touchstart"==a.type,!Z||1==a.targetTouches.length){C.callPlugins("onTouchStartBegin"),Z||C.isAndroid||(a.preventDefault?a.preventDefault():a.returnValue=!1);var c=Z?a.targetTouches[0].pageX:a.pageX||a.clientX,d=Z?a.targetTouches[0].pageY:a.pageY||a.clientY;C.touches.startX=C.touches.currentX=c,C.touches.startY=C.touches.currentY=d,C.touches.start=C.touches.current=M?c:d,C.setWrapperTransition(0),C.positions.start=C.positions.current=C.getWrapperTranslate(),C.setWrapperTranslate(C.positions.start),C.times.start=(new Date).getTime(),H=void 0,b.moveStartThreshold>0&&(W=!1),b.onTouchStart&&C.fireCallback(b.onTouchStart,C),C.callPlugins("onTouchStartEnd")}}function q(a){if(C.isTouched&&!b.onlyExternal&&(!Z||"mousemove"!=a.type)){var c=Z?a.targetTouches[0].pageX:a.pageX||a.clientX,d=Z?a.targetTouches[0].pageY:a.pageY||a.clientY;if("undefined"==typeof H&&M&&(H=!!(H||Math.abs(d-C.touches.startY)>Math.abs(c-C.touches.startX))),"undefined"!=typeof H||M||(H=!!(H||Math.abs(d-C.touches.startY)<Math.abs(c-C.touches.startX))),H)return void(C.isTouched=!1);if(a.assignedToSwiper)return void(C.isTouched=!1);if(a.assignedToSwiper=!0,b.preventLinks&&(C.allowLinks=!1),b.onSlideClick&&(C.allowSlideClick=!1),b.autoplay&&C.stopAutoplay(!0),!Z||1==a.touches.length){if(C.isMoved||(C.callPlugins("onTouchMoveStart"),b.loop&&(C.fixLoop(),C.positions.start=C.getWrapperTranslate()),b.onTouchMoveStart&&C.fireCallback(b.onTouchMoveStart,C)),C.isMoved=!0,a.preventDefault?a.preventDefault():a.returnValue=!1,C.touches.current=M?c:d,C.positions.current=(C.touches.current-C.touches.start)*b.touchRatio+C.positions.start,C.positions.current>0&&b.onResistanceBefore&&C.fireCallback(b.onResistanceBefore,C,C.positions.current),C.positions.current<-e()&&b.onResistanceAfter&&C.fireCallback(b.onResistanceAfter,C,Math.abs(C.positions.current+e())),b.resistance&&"100%"!=b.resistance){if(C.positions.current>0){var f=1-C.positions.current/I/2;C.positions.current=.5>f?I/2:C.positions.current*f}if(C.positions.current<-e()){var g=(C.touches.current-C.touches.start)*b.touchRatio+(e()+C.positions.start),f=(I+g)/I,h=C.positions.current-g*(1-f)/2,i=-e()-I/2;C.positions.current=i>h||0>=f?i:h}}if(b.resistance&&"100%"==b.resistance&&(C.positions.current>0&&(!b.freeMode||b.freeModeFluid)&&(C.positions.current=0),C.positions.current<-e()&&(!b.freeMode||b.freeModeFluid)&&(C.positions.current=-e())),!b.followFinger)return;if(b.moveStartThreshold)if(Math.abs(C.touches.current-C.touches.start)>b.moveStartThreshold||W){if(!W)return W=!0,void(C.touches.start=C.touches.current);C.setWrapperTranslate(C.positions.current)}else C.positions.current=C.positions.start;else C.setWrapperTranslate(C.positions.current);return(b.freeMode||b.watchActiveIndex)&&C.updateActiveSlide(C.positions.current),b.grabCursor&&(C.container.style.cursor="move",C.container.style.cursor="grabbing",C.container.style.cursor="-moz-grabbin",C.container.style.cursor="-webkit-grabbing"),X||(X=C.touches.current),Y||(Y=(new Date).getTime()),C.velocity=(C.touches.current-X)/((new Date).getTime()-Y)/2,Math.abs(C.touches.current-X)<2&&(C.velocity=0),X=C.touches.current,Y=(new Date).getTime(),C.callPlugins("onTouchMoveEnd"),b.onTouchMove&&C.fireCallback(b.onTouchMove,C),!1}}}function r(){if(H&&C.swipeReset(),!b.onlyExternal&&C.isTouched){C.isTouched=!1,b.grabCursor&&(C.container.style.cursor="move",C.container.style.cursor="grab",C.container.style.cursor="-moz-grab",C.container.style.cursor="-webkit-grab"),C.positions.current||0===C.positions.current||(C.positions.current=C.positions.start),b.followFinger&&C.setWrapperTranslate(C.positions.current),C.times.end=(new Date).getTime(),C.touches.diff=C.touches.current-C.touches.start,C.touches.abs=Math.abs(C.touches.diff),C.positions.diff=C.positions.current-C.positions.start,C.positions.abs=Math.abs(C.positions.diff);var a=C.positions.diff,c=C.positions.abs,d=C.times.end-C.times.start;5>c&&300>d&&0==C.allowLinks&&(b.freeMode||0==c||C.swipeReset(),b.preventLinks&&(C.allowLinks=!0),b.onSlideClick&&(C.allowSlideClick=!0)),setTimeout(function(){b.preventLinks&&(C.allowLinks=!0),b.onSlideClick&&(C.allowSlideClick=!0)},100);var f=e();if(!C.isMoved&&b.freeMode)return C.isMoved=!1,b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),void C.callPlugins("onTouchEnd");if(!C.isMoved||C.positions.current>0||C.positions.current<-f)return C.swipeReset(),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),void C.callPlugins("onTouchEnd");if(C.isMoved=!1,b.freeMode){if(b.freeModeFluid){var g,h=1e3*b.momentumRatio,i=C.velocity*h,j=C.positions.current+i,k=!1,l=20*Math.abs(C.velocity)*b.momentumBounceRatio;-f>j&&(b.momentumBounce&&C.support.transitions?(-l>j+f&&(j=-f-l),g=-f,k=!0,$=!0):j=-f),j>0&&(b.momentumBounce&&C.support.transitions?(j>l&&(j=l),g=0,k=!0,$=!0):j=0),0!=C.velocity&&(h=Math.abs((j-C.positions.current)/C.velocity)),C.setWrapperTranslate(j),C.setWrapperTransition(h),b.momentumBounce&&k&&C.wrapperTransitionEnd(function(){$&&(b.onMomentumBounce&&C.fireCallback(b.onMomentumBounce,C),C.callPlugins("onMomentumBounce"),C.setWrapperTranslate(g),C.setWrapperTransition(300))}),C.updateActiveSlide(j)}return(!b.freeModeFluid||d>=300)&&C.updateActiveSlide(C.positions.current),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),void C.callPlugins("onTouchEnd")}G=0>a?"toNext":"toPrev","toNext"==G&&300>=d&&(30>c||!b.shortSwipes?C.swipeReset():C.swipeNext(!0)),"toPrev"==G&&300>=d&&(30>c||!b.shortSwipes?C.swipeReset():C.swipePrev(!0));var m=0;if("auto"==b.slidesPerView){for(var n,o=Math.abs(C.getWrapperTranslate()),p=0,q=0;q<C.slides.length;q++)if(n=M?C.slides[q].getWidth(!0):C.slides[q].getHeight(!0),p+=n,p>o){m=n;break}m>I&&(m=I)}else m=E*b.slidesPerView;"toNext"==G&&d>300&&(c>=m*b.longSwipesRatio?C.swipeNext(!0):C.swipeReset()),"toPrev"==G&&d>300&&(c>=m*b.longSwipesRatio?C.swipePrev(!0):C.swipeReset()),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),C.callPlugins("onTouchEnd")}}function s(a){var c=!1;do a.className.indexOf(b.noSwipingClass)>-1&&(c=!0),a=a.parentElement;while(!c&&a.parentElement&&-1==a.className.indexOf(b.wrapperClass));return!c&&a.className.indexOf(b.wrapperClass)>-1&&a.className.indexOf(b.noSwipingClass)>-1&&(c=!0),c}function t(a,b){var c,d=document.createElement("div");return d.innerHTML=b,c=d.firstChild,c.className+=" "+a,c.outerHTML}function u(a,c,d){function e(){var c=+new Date,d=c-g;h+=i*d/(1e3/60),k="toNext"==j?h>a:a>h,k?(C.setWrapperTranslate(Math.round(h)),C._DOMAnimating=!0,window.setTimeout(function(){e()},1e3/60)):(b.onSlideChangeEnd&&C.fireCallback(b.onSlideChangeEnd,C),C.setWrapperTranslate(a),C._DOMAnimating=!1)}var f="to"==c&&d.speed>=0?d.speed:b.speed,g=+new Date;if(C.support.transitions||!b.DOMAnimation)C.setWrapperTranslate(a),C.setWrapperTransition(f);else{var h=C.getWrapperTranslate(),i=Math.ceil((a-h)/f*(1e3/60)),j=h>a?"toNext":"toPrev",k="toNext"==j?h>a:a>h;if(C._DOMAnimating)return;e()}C.updateActiveSlide(a),b.onSlideNext&&"next"==c&&C.fireCallback(b.onSlideNext,C,a),b.onSlidePrev&&"prev"==c&&C.fireCallback(b.onSlidePrev,C,a),b.onSlideReset&&"reset"==c&&C.fireCallback(b.onSlideReset,C,a),("next"==c||"prev"==c||"to"==c&&1==d.runCallbacks)&&v(c)}function v(a){if(C.callPlugins("onSlideChangeStart"),b.onSlideChangeStart)if(b.queueStartCallbacks&&C.support.transitions){if(C._queueStartCallbacks)return;C._queueStartCallbacks=!0,C.fireCallback(b.onSlideChangeStart,C,a),C.wrapperTransitionEnd(function(){C._queueStartCallbacks=!1})}else C.fireCallback(b.onSlideChangeStart,C,a);if(b.onSlideChangeEnd)if(C.support.transitions)if(b.queueEndCallbacks){if(C._queueEndCallbacks)return;C._queueEndCallbacks=!0,C.wrapperTransitionEnd(function(c){C.fireCallback(b.onSlideChangeEnd,c,a)})}else C.wrapperTransitionEnd(function(c){C.fireCallback(b.onSlideChangeEnd,c,a)});else b.DOMAnimation||setTimeout(function(){C.fireCallback(b.onSlideChangeEnd,C,a)},10)}function w(){for(var a=C.paginationButtons,b=0;b<a.length;b++)C.h.removeEventListener(a[b],"click",y)}function x(){for(var a=C.paginationButtons,b=0;b<a.length;b++)C.h.addEventListener(a[b],"click",y)}function y(a){for(var b,c=a.target||a.srcElement,d=C.paginationButtons,e=0;e<d.length;e++)c===d[e]&&(b=e);C.swipeTo(b)}function z(){_=setTimeout(function(){b.loop?(C.fixLoop(),C.swipeNext(!0)):C.swipeNext(!0)||(b.autoplayStopOnLast?(clearTimeout(_),_=void 0):C.swipeTo(0)),C.wrapperTransitionEnd(function(){"undefined"!=typeof _&&z()})},b.autoplay)}function A(){C.calcSlides(),b.loader.slides.length>0&&0==C.slides.length&&C.loadSlides(),b.loop&&C.createLoop(),C.init(),f(),b.pagination&&C.createPagination(!0),b.loop||b.initialSlide>0?C.swipeTo(b.initialSlide,0,!1):C.updateActiveSlide(0),b.autoplay&&C.startAutoplay(),C.centerIndex=C.activeIndex,b.onSwiperCreated&&C.fireCallback(b.onSwiperCreated,C),C.callPlugins("onSwiperCreated")}if(document.body.__defineGetter__&&HTMLElement){var B=HTMLElement.prototype;B.__defineGetter__&&B.__defineGetter__("outerHTML",function(){return(new XMLSerializer).serializeToString(this)})}if(window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;return"float"===b&&(b="styleFloat"),c.test(b)&&(b=b.replace(c,function(){return arguments[2].toUpperCase()})),a.currentStyle[b]?a.currentStyle[b]:null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1}),(document.querySelectorAll||window.jQuery)&&"undefined"!=typeof a&&(a.nodeType||0!==c(a).length)){var C=this;C.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0},C.positions={start:0,abs:0,diff:0,current:0},C.times={start:0,end:0},C.id=(new Date).getTime(),C.container=a.nodeType?a:c(a)[0],C.isTouched=!1,C.isMoved=!1,C.activeIndex=0,C.centerIndex=0,C.activeLoaderIndex=0,C.activeLoopIndex=0,C.previousIndex=null,C.velocity=0,C.snapGrid=[],C.slidesGrid=[],C.imagesToLoad=[],C.imagesLoaded=0,C.wrapperLeft=0,C.wrapperRight=0,C.wrapperTop=0,C.wrapperBottom=0,C.isAndroid=navigator.userAgent.toLowerCase().indexOf("android")>=0;var D,E,F,G,H,I,J={eventTarget:"wrapper",mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,simulateTouch:!0,followFinger:!0,shortSwipes:!0,longSwipesRatio:.5,moveStartThreshold:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,preventLinksPropagation:!1,noSwiping:!1,noSwipingClass:"swiper-no-swiping",initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelControlForceToAxis:!1,useCSS3Transforms:!0,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,loop:!1,loopAdditionalSlides:0,calculateHeight:!1,cssWidthAndHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var K in J)if(K in b&&"object"==typeof b[K])for(var L in J[K])L in b[K]||(b[K][L]=J[K][L]);else K in b||(b[K]=J[K]);C.params=b,b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0),b.loop&&(b.resistance="100%");var M="horizontal"===b.mode,N=["mousedown","mousemove","mouseup"];C.browser.ie10&&(N=["MSPointerDown","MSPointerMove","MSPointerUp"]),C.browser.ie11&&(N=["pointerdown","pointermove","pointerup"]),C.touchEvents={touchStart:C.support.touch||!b.simulateTouch?"touchstart":N[0],touchMove:C.support.touch||!b.simulateTouch?"touchmove":N[1],touchEnd:C.support.touch||!b.simulateTouch?"touchend":N[2]};for(var O=C.container.childNodes.length-1;O>=0;O--)if(C.container.childNodes[O].className)for(var P=C.container.childNodes[O].className.split(" "),Q=0;Q<P.length;Q++)P[Q]===b.wrapperClass&&(D=C.container.childNodes[O]);C.wrapper=D,C._extendSwiperSlide=function(a){return a.append=function(){return b.loop?a.insertAfter(C.slides.length-C.loopedSlides):(C.wrapper.appendChild(a),C.reInit()),a},a.prepend=function(){return b.loop?(C.wrapper.insertBefore(a,C.slides[C.loopedSlides]),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):C.wrapper.insertBefore(a,C.wrapper.firstChild),C.reInit(),a},a.insertAfter=function(c){if("undefined"==typeof c)return!1;var d;return b.loop?(d=C.slides[c+1+C.loopedSlides],d?C.wrapper.insertBefore(a,d):C.wrapper.appendChild(a),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):(d=C.slides[c+1],C.wrapper.insertBefore(a,d)),C.reInit(),a},a.clone=function(){return C._extendSwiperSlide(a.cloneNode(!0))},a.remove=function(){C.wrapper.removeChild(a),C.reInit()},a.html=function(b){return"undefined"==typeof b?a.innerHTML:(a.innerHTML=b,a)},a.index=function(){for(var b,c=C.slides.length-1;c>=0;c--)a===C.slides[c]&&(b=c);return b},a.isActive=function(){return a.index()===C.activeIndex?!0:!1},a.swiperSlideDataStorage||(a.swiperSlideDataStorage={}),a.getData=function(b){return a.swiperSlideDataStorage[b]},a.setData=function(b,c){return a.swiperSlideDataStorage[b]=c,a},a.data=function(b,c){return c?(a.setAttribute("data-"+b,c),a):a.getAttribute("data-"+b)},a.getWidth=function(b){return C.h.getWidth(a,b)},a.getHeight=function(b){return C.h.getHeight(a,b)},a.getOffset=function(){return C.h.getOffset(a)},a},C.calcSlides=function(a){var c=C.slides?C.slides.length:!1;C.slides=[],C.displaySlides=[];for(var d=0;d<C.wrapper.childNodes.length;d++)if(C.wrapper.childNodes[d].className)for(var e=C.wrapper.childNodes[d].className,f=e.split(" "),i=0;i<f.length;i++)f[i]===b.slideClass&&C.slides.push(C.wrapper.childNodes[d]);for(d=C.slides.length-1;d>=0;d--)C._extendSwiperSlide(C.slides[d]);c!==!1&&(c!==C.slides.length||a)&&(h(),g(),C.updateActiveSlide(),C.params.pagination&&C.createPagination(),C.callPlugins("numberOfSlidesChanged"))},C.createSlide=function(a,c,d){var c=c||C.params.slideClass,d=d||b.slideElement,e=document.createElement(d);return e.innerHTML=a||"",e.className=c,C._extendSwiperSlide(e)},C.appendSlide=function(a,b,c){return a?a.nodeType?C._extendSwiperSlide(a).append():C.createSlide(a,b,c).append():void 0},C.prependSlide=function(a,b,c){return a?a.nodeType?C._extendSwiperSlide(a).prepend():C.createSlide(a,b,c).prepend():void 0},C.insertSlideAfter=function(a,b,c,d){return"undefined"==typeof a?!1:b.nodeType?C._extendSwiperSlide(b).insertAfter(a):C.createSlide(b,c,d).insertAfter(a)},C.removeSlide=function(a){if(C.slides[a]){if(b.loop){if(!C.slides[a+C.loopedSlides])return!1;C.slides[a+C.loopedSlides].remove(),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()}else C.slides[a].remove();return!0}return!1},C.removeLastSlide=function(){return C.slides.length>0?(b.loop?(C.slides[C.slides.length-1-C.loopedSlides].remove(),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):C.slides[C.slides.length-1].remove(),!0):!1},C.removeAllSlides=function(){for(var a=C.slides.length-1;a>=0;a--)C.slides[a].remove()},C.getSlide=function(a){return C.slides[a]},C.getLastSlide=function(){return C.slides[C.slides.length-1]},C.getFirstSlide=function(){return C.slides[0]},C.activeSlide=function(){return C.slides[C.activeIndex]},C.fireCallback=function(){var a=arguments[0];if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)"function"==typeof a[c]&&a[c](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);else"[object String]"===Object.prototype.toString.call(a)?b["on"+a]&&C.fireCallback(b["on"+a]):a(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},C.addCallback=function(a,b){"use strict";var c,e=this;return e.params["on"+a]?d(this.params["on"+a])?this.params["on"+a].push(b):"function"==typeof this.params["on"+a]?(c=this.params["on"+a],this.params["on"+a]=[],this.params["on"+a].push(c),this.params["on"+a].push(b)):void 0:(this.params["on"+a]=[],this.params["on"+a].push(b))},C.removeCallbacks=function(a){return C.params["on"+a]?C.params["on"+a]=null:void 0};var R=[];for(var S in C.plugins)if(b[S]){var T=C.plugins[S](C,b[S]);T&&R.push(T)}C.callPlugins=function(a,b){b||(b={});for(var c=0;c<R.length;c++)a in R[c]&&R[c][a](b)},!C.browser.ie10&&!C.browser.ie11||b.onlyExternal||C.wrapper.classList.add("swiper-wp8-"+(M?"horizontal":"vertical")),b.freeMode&&(C.container.className+=" swiper-free-mode"),C.initialized=!1,C.init=function(a,c){var d=C.h.getWidth(C.container),e=C.h.getHeight(C.container);if(d!==C.width||e!==C.height||a){C.width=d,C.height=e,I=M?d:e;var f=C.wrapper;if(a&&C.calcSlides(c),"auto"===b.slidesPerView){var g=0,h=0;b.slidesOffset>0&&(f.style.paddingLeft="",f.style.paddingRight="",f.style.paddingTop="",f.style.paddingBottom=""),f.style.width="",f.style.height="",b.offsetPxBefore>0&&(M?C.wrapperLeft=b.offsetPxBefore:C.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(M?C.wrapperRight=b.offsetPxAfter:C.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(M?(C.wrapperLeft=(I-this.slides[0].getWidth(!0))/2,C.wrapperRight=(I-C.slides[C.slides.length-1].getWidth(!0))/2):(C.wrapperTop=(I-C.slides[0].getHeight(!0))/2,C.wrapperBottom=(I-C.slides[C.slides.length-1].getHeight(!0))/2)),M?(C.wrapperLeft>=0&&(f.style.paddingLeft=C.wrapperLeft+"px"),C.wrapperRight>=0&&(f.style.paddingRight=C.wrapperRight+"px")):(C.wrapperTop>=0&&(f.style.paddingTop=C.wrapperTop+"px"),C.wrapperBottom>=0&&(f.style.paddingBottom=C.wrapperBottom+"px"));var i=0,j=0;C.snapGrid=[],C.slidesGrid=[];for(var k=0,l=0;l<C.slides.length;l++){var m=C.slides[l].getWidth(!0),n=C.slides[l].getHeight(!0);b.calculateHeight&&(k=Math.max(k,n));var o=M?m:n;if(b.centeredSlides){var p=l===C.slides.length-1?0:C.slides[l+1].getWidth(!0),q=l===C.slides.length-1?0:C.slides[l+1].getHeight(!0),r=M?p:q;if(o>I){for(var s=0;s<=Math.floor(o/(I+C.wrapperLeft));s++)C.snapGrid.push(0===s?i+C.wrapperLeft:i+C.wrapperLeft+I*s);C.slidesGrid.push(i+C.wrapperLeft)}else C.snapGrid.push(j),C.slidesGrid.push(j);j+=o/2+r/2}else{if(o>I)for(var s=0;s<=Math.floor(o/I);s++)C.snapGrid.push(i+I*s);else C.snapGrid.push(i);C.slidesGrid.push(i)}i+=o,g+=m,h+=n}b.calculateHeight&&(C.height=k),M?(F=g+C.wrapperRight+C.wrapperLeft,f.style.width=g+"px",f.style.height=C.height+"px"):(F=h+C.wrapperTop+C.wrapperBottom,f.style.width=C.width+"px",f.style.height=h+"px")}else if(b.scrollContainer){f.style.width="",f.style.height="";var t=C.slides[0].getWidth(!0),u=C.slides[0].getHeight(!0);F=M?t:u,f.style.width=t+"px",f.style.height=u+"px",E=M?t:u}else{if(b.calculateHeight){var k=0,u=0;M||(C.container.style.height=""),f.style.height="";for(var l=0;l<C.slides.length;l++)C.slides[l].style.height="",k=Math.max(C.slides[l].getHeight(!0),k),M||(u+=C.slides[l].getHeight(!0));var n=k;C.height=n,M?u=n:(I=n,C.container.style.height=I+"px")}else var n=M?C.height:C.height/b.slidesPerView,u=M?C.height:C.slides.length*n;var m=M?C.width/b.slidesPerView:C.width,t=M?C.slides.length*m:C.width;E=M?m:n,b.offsetSlidesBefore>0&&(M?C.wrapperLeft=E*b.offsetSlidesBefore:C.wrapperTop=E*b.offsetSlidesBefore),b.offsetSlidesAfter>0&&(M?C.wrapperRight=E*b.offsetSlidesAfter:C.wrapperBottom=E*b.offsetSlidesAfter),b.offsetPxBefore>0&&(M?C.wrapperLeft=b.offsetPxBefore:C.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(M?C.wrapperRight=b.offsetPxAfter:C.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(M?(C.wrapperLeft=(I-E)/2,C.wrapperRight=(I-E)/2):(C.wrapperTop=(I-E)/2,C.wrapperBottom=(I-E)/2)),M?(C.wrapperLeft>0&&(f.style.paddingLeft=C.wrapperLeft+"px"),C.wrapperRight>0&&(f.style.paddingRight=C.wrapperRight+"px")):(C.wrapperTop>0&&(f.style.paddingTop=C.wrapperTop+"px"),C.wrapperBottom>0&&(f.style.paddingBottom=C.wrapperBottom+"px")),F=M?t+C.wrapperRight+C.wrapperLeft:u+C.wrapperTop+C.wrapperBottom,b.cssWidthAndHeight||(parseFloat(t)>0&&(f.style.width=t+"px"),parseFloat(u)>0&&(f.style.height=u+"px"));var i=0;C.snapGrid=[],C.slidesGrid=[];for(var l=0;l<C.slides.length;l++)C.snapGrid.push(i),C.slidesGrid.push(i),i+=E,b.cssWidthAndHeight||(parseFloat(m)>0&&(C.slides[l].style.width=m+"px"),parseFloat(n)>0&&(C.slides[l].style.height=n+"px"))}C.initialized?(C.callPlugins("onInit"),b.onInit&&C.fireCallback(b.onInit,C)):(C.callPlugins("onFirstInit"),b.onFirstInit&&C.fireCallback(b.onFirstInit,C)),C.initialized=!0}},C.reInit=function(a){C.init(!0,a)},C.resizeFix=function(a){C.callPlugins("beforeResizeFix"),C.init(b.resizeReInit||a),b.freeMode?C.getWrapperTranslate()<-e()&&(C.setWrapperTransition(0),C.setWrapperTranslate(-e())):(C.swipeTo(b.loop?C.activeLoopIndex:C.activeIndex,0,!1),b.autoplay&&(C.support.transitions&&"undefined"!=typeof _?"undefined"!=typeof _&&(clearTimeout(_),_=void 0,C.startAutoplay()):"undefined"!=typeof ab&&(clearInterval(ab),ab=void 0,C.startAutoplay()))),C.callPlugins("afterResizeFix")},C.destroy=function(){var a=C.h.removeEventListener,c="wrapper"==b.eventTarget?C.wrapper:C.container;C.browser.ie10||C.browser.ie11?(a(c,C.touchEvents.touchStart,p),a(document,C.touchEvents.touchMove,q),a(document,C.touchEvents.touchEnd,r)):(C.support.touch&&(a(c,"touchstart",p),a(c,"touchmove",q),a(c,"touchend",r)),b.simulateTouch&&(a(c,"mousedown",p),a(document,"mousemove",q),a(document,"mouseup",r))),b.autoResize&&a(window,"resize",C.resizeFix),h(),b.paginationClickable&&w(),b.mousewheelControl&&C._wheelEvent&&a(C.container,C._wheelEvent,j),b.keyboardControl&&a(document,"keydown",i),b.autoplay&&C.stopAutoplay(),C.callPlugins("onDestroy"),C=null};var U=(new Date).getTime();if(b.grabCursor){var V=C.container.style;V.cursor="move",V.cursor="grab",V.cursor="-moz-grab",V.cursor="-webkit-grab"}C.allowSlideClick=!0,C.allowLinks=!0;var W,X,Y,Z=!1,$=!0;C.swipeNext=function(a){!a&&b.loop&&C.fixLoop(),!a&&b.autoplay&&C.stopAutoplay(!0),C.callPlugins("onSwipeNext");var c=C.getWrapperTranslate(),d=c;if("auto"==b.slidesPerView){for(var f=0;f<C.snapGrid.length;f++)if(-c>=C.snapGrid[f]&&-c<C.snapGrid[f+1]){d=-C.snapGrid[f+1];break}}else{var g=E*b.slidesPerGroup;d=-(Math.floor(Math.abs(c)/Math.floor(g))*g+g)}return d<-e()&&(d=-e()),d==c?!1:(u(d,"next"),!0)},C.swipePrev=function(a){!a&&b.loop&&C.fixLoop(),!a&&b.autoplay&&C.stopAutoplay(!0),C.callPlugins("onSwipePrev");var c,d=Math.ceil(C.getWrapperTranslate());if("auto"==b.slidesPerView){c=0;for(var e=1;e<C.snapGrid.length;e++){if(-d==C.snapGrid[e]){c=-C.snapGrid[e-1];break}if(-d>C.snapGrid[e]&&-d<C.snapGrid[e+1]){c=-C.snapGrid[e];break}}}else{var f=E*b.slidesPerGroup;c=-(Math.ceil(-d/f)-1)*f}return c>0&&(c=0),c==d?!1:(u(c,"prev"),!0)},C.swipeReset=function(){C.callPlugins("onSwipeReset");{var a,c=C.getWrapperTranslate(),d=E*b.slidesPerGroup;-e()}if("auto"==b.slidesPerView){a=0;for(var f=0;f<C.snapGrid.length;f++){if(-c===C.snapGrid[f])return;if(-c>=C.snapGrid[f]&&-c<C.snapGrid[f+1]){a=C.positions.diff>0?-C.snapGrid[f+1]:-C.snapGrid[f];break}}-c>=C.snapGrid[C.snapGrid.length-1]&&(a=-C.snapGrid[C.snapGrid.length-1]),c<=-e()&&(a=-e())}else a=0>c?Math.round(c/d)*d:0;return b.scrollContainer&&(a=0>c?c:0),a<-e()&&(a=-e()),b.scrollContainer&&I>E&&(a=0),a==c?!1:(u(a,"reset"),!0)},C.swipeTo=function(a,c,d){a=parseInt(a,10),C.callPlugins("onSwipeTo",{index:a,speed:c}),b.loop&&(a+=C.loopedSlides);var f=C.getWrapperTranslate();if(!(a>C.slides.length-1||0>a)){var g;return g="auto"==b.slidesPerView?-C.slidesGrid[a]:-a*E,g<-e()&&(g=-e()),g==f?!1:(d=d===!1?!1:!0,u(g,"to",{index:a,speed:c,runCallbacks:d}),!0)}},C._queueStartCallbacks=!1,C._queueEndCallbacks=!1,C.updateActiveSlide=function(a){if(C.initialized&&0!=C.slides.length){if(C.previousIndex=C.activeIndex,"undefined"==typeof a&&(a=C.getWrapperTranslate()),a>0&&(a=0),"auto"==b.slidesPerView){if(C.activeIndex=C.slidesGrid.indexOf(-a),C.activeIndex<0){for(var c=0;c<C.slidesGrid.length-1&&!(-a>C.slidesGrid[c]&&-a<C.slidesGrid[c+1]);c++);var d=Math.abs(C.slidesGrid[c]+a),e=Math.abs(C.slidesGrid[c+1]+a);C.activeIndex=e>=d?c:c+1}}else C.activeIndex=Math[b.visibilityFullFit?"ceil":"round"](-a/E);if(C.activeIndex==C.slides.length&&(C.activeIndex=C.slides.length-1),C.activeIndex<0&&(C.activeIndex=0),C.slides[C.activeIndex]){C.calcVisibleSlides(a);for(var f=new RegExp("\\s*"+b.slideActiveClass),g=new RegExp("\\s*"+b.slideVisibleClass),c=0;c<C.slides.length;c++)C.slides[c].className=C.slides[c].className.replace(f,"").replace(g,""),C.visibleSlides.indexOf(C.slides[c])>=0&&(C.slides[c].className+=" "+b.slideVisibleClass);if(C.slides[C.activeIndex].className+=" "+b.slideActiveClass,b.loop){var h=C.loopedSlides;C.activeLoopIndex=C.activeIndex-h,C.activeLoopIndex>=C.slides.length-2*h&&(C.activeLoopIndex=C.slides.length-2*h-C.activeLoopIndex),C.activeLoopIndex<0&&(C.activeLoopIndex=C.slides.length-2*h+C.activeLoopIndex),C.activeLoopIndex<0&&(C.activeLoopIndex=0)}else C.activeLoopIndex=C.activeIndex;b.pagination&&C.updatePagination(a)}}},C.createPagination=function(a){if(b.paginationClickable&&C.paginationButtons&&w(),C.paginationContainer=b.pagination.nodeType?b.pagination:c(b.pagination)[0],b.createPagination){var d="",e=C.slides.length,f=e;b.loop&&(f-=2*C.loopedSlides);for(var g=0;f>g;g++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+'"></'+b.paginationElement+">";C.paginationContainer.innerHTML=d}C.paginationButtons=c("."+b.paginationElementClass,C.paginationContainer),a||C.updatePagination(),C.callPlugins("onCreatePagination"),b.paginationClickable&&x()},C.updatePagination=function(a){if(b.pagination&&!(C.slides.length<1)){var d=c("."+b.paginationActiveClass,C.paginationContainer);if(d){var e=C.paginationButtons;if(0!=e.length){for(var f=0;f<e.length;f++)e[f].className=b.paginationElementClass;var g=b.loop?C.loopedSlides:0;if(b.paginationAsRange){C.visibleSlides||C.calcVisibleSlides(a);for(var h=[],f=0;f<C.visibleSlides.length;f++){var i=C.slides.indexOf(C.visibleSlides[f])-g;b.loop&&0>i&&(i=C.slides.length-2*C.loopedSlides+i),b.loop&&i>=C.slides.length-2*C.loopedSlides&&(i=C.slides.length-2*C.loopedSlides-i,i=Math.abs(i)),h.push(i)}for(f=0;f<h.length;f++)e[h[f]]&&(e[h[f]].className+=" "+b.paginationVisibleClass);b.loop?e[C.activeLoopIndex].className+=" "+b.paginationActiveClass:e[C.activeIndex].className+=" "+b.paginationActiveClass}else b.loop?e[C.activeLoopIndex]&&(e[C.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass):e[C.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass}}}},C.calcVisibleSlides=function(a){var c=[],d=0,e=0,f=0;M&&C.wrapperLeft>0&&(a+=C.wrapperLeft),!M&&C.wrapperTop>0&&(a+=C.wrapperTop);for(var g=0;g<C.slides.length;g++){d+=e,e="auto"==b.slidesPerView?M?C.h.getWidth(C.slides[g],!0):C.h.getHeight(C.slides[g],!0):E,f=d+e;var h=!1;b.visibilityFullFit?(d>=-a&&-a+I>=f&&(h=!0),-a>=d&&f>=-a+I&&(h=!0)):(f>-a&&-a+I>=f&&(h=!0),d>=-a&&-a+I>d&&(h=!0),-a>d&&f>-a+I&&(h=!0)),h&&c.push(C.slides[g])}0==c.length&&(c=[C.slides[C.activeIndex]]),C.visibleSlides=c};var _=void 0,ab=void 0;C.startAutoplay=function(){if(C.support.transitions){if("undefined"!=typeof _)return!1;if(!b.autoplay)return;C.callPlugins("onAutoplayStart"),z()
}else{if("undefined"!=typeof ab)return!1;if(!b.autoplay)return;C.callPlugins("onAutoplayStart"),ab=setInterval(function(){b.loop?(C.fixLoop(),C.swipeNext(!0)):C.swipeNext(!0)||(b.autoplayStopOnLast?(clearInterval(ab),ab=void 0):C.swipeTo(0))},b.autoplay)}},C.stopAutoplay=function(a){if(C.support.transitions){if(!_)return;_&&clearTimeout(_),_=void 0,a&&!b.autoplayDisableOnInteraction&&C.wrapperTransitionEnd(function(){z()}),C.callPlugins("onAutoplayStop")}else ab&&clearInterval(ab),ab=void 0,C.callPlugins("onAutoplayStop")},C.loopCreated=!1,C.removeLoopedSlides=function(){if(C.loopCreated)for(var a=0;a<C.slides.length;a++)C.slides[a].getData("looped")===!0&&C.wrapper.removeChild(C.slides[a])},C.createLoop=function(){if(0!=C.slides.length){C.loopedSlides="auto"==b.slidesPerView?b.loopedSlides||1:b.slidesPerView+b.loopAdditionalSlides,C.loopedSlides>C.slides.length&&(C.loopedSlides=C.slides.length);var a,c="",d="",e="",f=C.slides.length,g=Math.floor(C.loopedSlides/f),h=C.loopedSlides%f;for(a=0;g*f>a;a++){var i=a;if(a>=f){var j=Math.floor(a/f);i=a-f*j}e+=C.slides[i].outerHTML}for(a=0;h>a;a++)d+=t(b.slideDuplicateClass,C.slides[a].outerHTML);for(a=f-h;f>a;a++)c+=t(b.slideDuplicateClass,C.slides[a].outerHTML);var k=c+e+D.innerHTML+e+d;for(D.innerHTML=k,C.loopCreated=!0,C.calcSlides(),a=0;a<C.slides.length;a++)(a<C.loopedSlides||a>=C.slides.length-C.loopedSlides)&&C.slides[a].setData("looped",!0);C.callPlugins("onCreateLoop")}},C.fixLoop=function(){var a;C.activeIndex<C.loopedSlides?(a=C.slides.length-3*C.loopedSlides+C.activeIndex,C.swipeTo(a,0,!1)):("auto"==b.slidesPerView&&C.activeIndex>=2*C.loopedSlides||C.activeIndex>C.slides.length-2*b.slidesPerView)&&(a=-C.slides.length+C.activeIndex+C.loopedSlides,C.swipeTo(a,0,!1))},C.loadSlides=function(){var a="";C.activeLoaderIndex=0;for(var c=b.loader.slides,d=b.loader.loadAllSlides?c.length:b.slidesPerView*(1+b.loader.surroundGroups),e=0;d>e;e++)a+="outer"==b.loader.slidesHTMLType?c[e]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+e+'">'+c[e]+"</"+b.slideElement+">";C.wrapper.innerHTML=a,C.calcSlides(!0),b.loader.loadAllSlides||C.wrapperTransitionEnd(C.reloadSlides,!0)},C.reloadSlides=function(){var a=b.loader.slides,c=parseInt(C.activeSlide().data("swiperindex"),10);if(!(0>c||c>a.length-1)){C.activeLoaderIndex=c;var d=Math.max(0,c-b.slidesPerView*b.loader.surroundGroups),e=Math.min(c+b.slidesPerView*(1+b.loader.surroundGroups)-1,a.length-1);if(c>0){var f=-E*(c-d);C.setWrapperTranslate(f),C.setWrapperTransition(0)}if("reload"===b.loader.logic){C.wrapper.innerHTML="";for(var g="",h=d;e>=h;h++)g+="outer"==b.loader.slidesHTMLType?a[h]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+h+'">'+a[h]+"</"+b.slideElement+">";C.wrapper.innerHTML=g}else{for(var i=1e3,j=0,h=0;h<C.slides.length;h++){var k=C.slides[h].data("swiperindex");d>k||k>e?C.wrapper.removeChild(C.slides[h]):(i=Math.min(k,i),j=Math.max(k,j))}for(var h=d;e>=h;h++){if(i>h){var l=document.createElement(b.slideElement);l.className=b.slideClass,l.setAttribute("data-swiperindex",h),l.innerHTML=a[h],C.wrapper.insertBefore(l,C.wrapper.firstChild)}if(h>j){var l=document.createElement(b.slideElement);l.className=b.slideClass,l.setAttribute("data-swiperindex",h),l.innerHTML=a[h],C.wrapper.appendChild(l)}}}C.reInit(!0)}},A()}};Swiper.prototype={plugins:{},wrapperTransitionEnd:function(a,b){function c(){if(a(e),e.params.queueEndCallbacks&&(e._queueEndCallbacks=!1),!b)for(d=0;d<g.length;d++)e.h.removeEventListener(f,g[d],c)}var d,e=this,f=e.wrapper,g=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"];if(a)for(d=0;d<g.length;d++)e.h.addEventListener(f,g[d],c)},getWrapperTranslate:function(a){var b,c,d,e,f=this.wrapper;return"undefined"==typeof a&&(a="horizontal"==this.params.mode?"x":"y"),this.support.transforms&&this.params.useCSS3Transforms?(d=window.getComputedStyle(f,null),window.WebKitCSSMatrix?e=new WebKitCSSMatrix(d.webkitTransform):(e=d.MozTransform||d.OTransform||d.MsTransform||d.msTransform||d.transform||d.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),b=e.toString().split(",")),"x"==a&&(c=window.WebKitCSSMatrix?e.m41:parseFloat(16==b.length?b[12]:b[4])),"y"==a&&(c=window.WebKitCSSMatrix?e.m42:parseFloat(16==b.length?b[13]:b[5]))):("x"==a&&(c=parseFloat(f.style.left,10)||0),"y"==a&&(c=parseFloat(f.style.top,10)||0)),c||0},setWrapperTranslate:function(a,b,c){var d,e=this.wrapper.style,f={x:0,y:0,z:0};3==arguments.length?(f.x=a,f.y=b,f.z=c):("undefined"==typeof b&&(b="horizontal"==this.params.mode?"x":"y"),f[b]=a),this.support.transforms&&this.params.useCSS3Transforms?(d=this.support.transforms3d?"translate3d("+f.x+"px, "+f.y+"px, "+f.z+"px)":"translate("+f.x+"px, "+f.y+"px)",e.webkitTransform=e.MsTransform=e.msTransform=e.MozTransform=e.OTransform=e.transform=d):(e.left=f.x+"px",e.top=f.y+"px"),this.callPlugins("onSetWrapperTransform",f),this.params.onSetWrapperTransform&&this.fireCallback(this.params.onSetWrapperTransform,this,f)},setWrapperTransition:function(a){var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=a/1e3+"s",this.callPlugins("onSetWrapperTransition",{duration:a}),this.params.onSetWrapperTransition&&this.fireCallback(this.params.onSetWrapperTransition,this,a)},h:{getWidth:function(a,b){var c=window.getComputedStyle(a,null).getPropertyValue("width"),d=parseFloat(c);return(isNaN(d)||c.indexOf("%")>0)&&(d=a.offsetWidth-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),b&&(d+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),d},getHeight:function(a,b){if(b)return a.offsetHeight;var c=window.getComputedStyle(a,null).getPropertyValue("height"),d=parseFloat(c);return(isNaN(d)||c.indexOf("%")>0)&&(d=a.offsetHeight-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),b&&(d+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),d},getOffset:function(a){var b=a.getBoundingClientRect(),c=document.body,d=a.clientTop||c.clientTop||0,e=a.clientLeft||c.clientLeft||0,f=window.pageYOffset||a.scrollTop,g=window.pageXOffset||a.scrollLeft;return document.documentElement&&!window.pageYOffset&&(f=document.documentElement.scrollTop,g=document.documentElement.scrollLeft),{top:b.top+f-d,left:b.left+g-e}},windowWidth:function(){return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:void 0},windowHeight:function(){return window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:void 0},windowScroll:function(){return"undefined"!=typeof pageYOffset?{left:window.pageXOffset,top:window.pageYOffset}:document.documentElement?{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}:void 0},addEventListener:function(a,b,c,d){"undefined"==typeof d&&(d=!1),a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},removeEventListener:function(a,b,c,d){"undefined"==typeof d&&(d=!1),a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)}},setTransform:function(a,b){var c=a.style;c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=b},setTranslate:function(a,b){var c=a.style,d={x:b.x||0,y:b.y||0,z:b.z||0},e=this.support.transforms3d?"translate3d("+d.x+"px,"+d.y+"px,"+d.z+"px)":"translate("+d.x+"px,"+d.y+"px)";c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=e,this.support.transforms||(c.left=d.x+"px",c.top=d.y+"px")},setTransition:function(a,b){var c=a.style;c.webkitTransitionDuration=c.MsTransitionDuration=c.msTransitionDuration=c.MozTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var a=document.createElement("div").style;return"webkitPerspective"in a||"MozPerspective"in a||"OPerspective"in a||"MsPerspective"in a||"perspective"in a}(),transforms:window.Modernizr&&Modernizr.csstransforms===!0||function(){var a=document.createElement("div").style;return"transform"in a||"WebkitTransform"in a||"MozTransform"in a||"msTransform"in a||"MsTransform"in a||"OTransform"in a}(),transitions:window.Modernizr&&Modernizr.csstransitions===!0||function(){var a=document.createElement("div").style;return"transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"MsTransition"in a||"OTransition"in a}()},browser:{ie8:function(){var a=-1;if("Microsoft Internet Explorer"==navigator.appName){var b=navigator.userAgent,c=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");null!=c.exec(b)&&(a=parseFloat(RegExp.$1))}return-1!=a&&9>a}(),ie10:window.navigator.msPointerEnabled,ie11:window.navigator.pointerEnabled}},(window.jQuery||window.Zepto)&&!function(a){a.fn.swiper=function(b){var c=new Swiper(a(this)[0],b);return a(this).data("swiper",c),c}}(window.jQuery||window.Zepto),"undefined"!=typeof module&&(module.exports=Swiper);

/*!
 * justifiedGallery - v3.7.0
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2018 Miro Mannino
 * Licensed under the MIT license.
 */

! function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = function (t, i) {
        return void 0 === i && (i = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), e(i), i
    } : e(jQuery)
}(function (g) {
    var r = function (t, i) {
        this.settings = i, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
            entriesBuff: [],
            width: 0,
            height: 0,
            aspectRatio: 0
        }, this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.yield = {
            every: 2,
            flushed: 0
        }, this.border = 0 <= i.border ? i.border : i.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.rows = 0, this.spinner = {
            phase: 0,
            timeSlot: 150,
            $el: g('<div class="spinner"><span></span><span></span><span></span></div>'),
            intervalId: null
        }, this.scrollBarOn = !1, this.checkWidthIntervalId = null, this.galleryWidth = t.width(), this.$gallery = t
    };
    r.prototype.getSuffix = function (t, i) {
        var e, s;
        for (e = i < t ? t : i, s = 0; s < this.suffixRanges.length; s++)
            if (e <= this.suffixRanges[s]) return this.settings.sizeRangeSuffixes[this.suffixRanges[s]];
        return this.settings.sizeRangeSuffixes[this.suffixRanges[s - 1]]
    }, r.prototype.removeSuffix = function (t, i) {
        return t.substring(0, t.length - i.length)
    }, r.prototype.endsWith = function (t, i) {
        return -1 !== t.indexOf(i, t.length - i.length)
    }, r.prototype.getUsedSuffix = function (t) {
        for (var i in this.settings.sizeRangeSuffixes)
            if (this.settings.sizeRangeSuffixes.hasOwnProperty(i)) {
                if (0 === this.settings.sizeRangeSuffixes[i].length) continue;
                if (this.endsWith(t, this.settings.sizeRangeSuffixes[i])) return this.settings.sizeRangeSuffixes[i]
            } return ""
    }, r.prototype.newSrc = function (t, i, e, s) {
        var n;
        if (this.settings.thumbnailPath) n = this.settings.thumbnailPath(t, i, e, s);
        else {
            var r = t.match(this.settings.extension),
                o = null !== r ? r[0] : "";
            n = t.replace(this.settings.extension, ""), n = this.removeSuffix(n, this.getUsedSuffix(n)), n += this.getSuffix(i, e) + o
        }
        return n
    }, r.prototype.showImg = function (t, i) {
        this.settings.cssAnimation ? (t.addClass("entry-visible"), i && i()) : (t.stop().fadeTo(this.settings.imagesAnimationDuration, 1, i), t.find(this.settings.imgSelector).stop().fadeTo(this.settings.imagesAnimationDuration, 1, i))
    }, r.prototype.extractImgSrcFromImage = function (t) {
        var i = void 0 !== t.data("safe-src") ? t.data("safe-src") : t.attr("src");
        return t.data("jg.originalSrc", i), i
    }, r.prototype.imgFromEntry = function (t) {
        var i = t.find(this.settings.imgSelector);
        return 0 === i.length ? null : i
    }, r.prototype.captionFromEntry = function (t) {
        var i = t.find("> .caption");
        return 0 === i.length ? null : i
    }, r.prototype.displayEntry = function (t, i, e, s, n, r) {
        t.width(s), t.height(r), t.css("top", e), t.css("left", i);
        var o = this.imgFromEntry(t);
        if (null !== o) {
            o.css("width", s), o.css("height", n), o.css("margin-left", -s / 2), o.css("margin-top", -n / 2);
            var a = o.attr("src"),
                h = this.newSrc(a, s, n, o[0]);
            o.one("error", function () {
                o.attr("src", o.data("jg.originalSrc"))
            });
            var l = function () {
                a !== h && o.attr("src", h)
            };
            "skipped" === t.data("jg.loaded") ? this.onImageEvent(a, g.proxy(function () {
                this.showImg(t, l), t.data("jg.loaded", !0)
            }, this)) : this.showImg(t, l)
        } else this.showImg(t);
        this.displayEntryCaption(t)
    }, r.prototype.displayEntryCaption = function (t) {
        var i = this.imgFromEntry(t);
        if (null !== i && this.settings.captions) {
            var e = this.captionFromEntry(t);
            if (null === e) {
                var s = i.attr("alt");
                this.isValidCaption(s) || (s = t.attr("title")), this.isValidCaption(s) && (e = g('<div class="caption">' + s + "</div>"), t.append(e), t.data("jg.createdCaption", !0))
            }
            null !== e && (this.settings.cssAnimation || e.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(t))
        } else this.removeCaptionEventsHandlers(t)
    }, r.prototype.isValidCaption = function (t) {
        return void 0 !== t && 0 < t.length
    }, r.prototype.onEntryMouseEnterForCaption = function (t) {
        var i = this.captionFromEntry(g(t.currentTarget));
        this.settings.cssAnimation ? i.addClass("caption-visible").removeClass("caption-hidden") : i.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
    }, r.prototype.onEntryMouseLeaveForCaption = function (t) {
        var i = this.captionFromEntry(g(t.currentTarget));
        this.settings.cssAnimation ? i.removeClass("caption-visible").removeClass("caption-hidden") : i.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
    }, r.prototype.addCaptionEventsHandlers = function (t) {
        var i = t.data("jg.captionMouseEvents");
        void 0 === i && (i = {
            mouseenter: g.proxy(this.onEntryMouseEnterForCaption, this),
            mouseleave: g.proxy(this.onEntryMouseLeaveForCaption, this)
        }, t.on("mouseenter", void 0, void 0, i.mouseenter), t.on("mouseleave", void 0, void 0, i.mouseleave), t.data("jg.captionMouseEvents", i))
    }, r.prototype.removeCaptionEventsHandlers = function (t) {
        var i = t.data("jg.captionMouseEvents");
        void 0 !== i && (t.off("mouseenter", void 0, i.mouseenter), t.off("mouseleave", void 0, i.mouseleave), t.removeData("jg.captionMouseEvents"))
    }, r.prototype.clearBuildingRow = function () {
        this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
    }, r.prototype.prepareBuildingRow = function (t) {
        var i, e, s, n, r, o = !0,
            a = 0,
            h = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
            l = h / this.buildingRow.aspectRatio,
            g = this.settings.rowHeight,
            u = this.buildingRow.width / h > this.settings.justifyThreshold;
        if (t && "hide" === this.settings.lastRow && !u) {
            for (i = 0; i < this.buildingRow.entriesBuff.length; i++) e = this.buildingRow.entriesBuff[i], this.settings.cssAnimation ? e.removeClass("entry-visible") : (e.stop().fadeTo(0, .1), e.find("> img, > a > img").fadeTo(0, 0));
            return -1
        }
        for (t && !u && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow && (o = !1, 0 < this.rows && (o = (g = (this.offY - this.border - this.settings.margins * this.rows) / this.rows) * this.buildingRow.aspectRatio / h > this.settings.justifyThreshold)), i = 0; i < this.buildingRow.entriesBuff.length; i++) s = (e = this.buildingRow.entriesBuff[i]).data("jg.width") / e.data("jg.height"), o ? (n = i === this.buildingRow.entriesBuff.length - 1 ? h : l * s, r = l) : (n = g * s, r = g), h -= Math.round(n), e.data("jg.jwidth", Math.round(n)), e.data("jg.jheight", Math.ceil(r)), (0 === i || r < a) && (a = r);
        return this.buildingRow.height = a, o
    }, r.prototype.flushRow = function (t) {
        var i, e, s, n = this.settings,
            r = this.border;
        if (e = this.prepareBuildingRow(t), t && "hide" === n.lastRow && -1 === e) this.clearBuildingRow();
        else {
            if (this.maxRowHeight && this.maxRowHeight < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight), t && ("center" === n.lastRow || "right" === n.lastRow)) {
                var o = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * n.margins;
                for (s = 0; s < this.buildingRow.entriesBuff.length; s++) o -= (i = this.buildingRow.entriesBuff[s]).data("jg.jwidth");
                "center" === n.lastRow ? r += o / 2 : "right" === n.lastRow && (r += o)
            }
            var a = this.buildingRow.entriesBuff.length - 1;
            for (s = 0; s <= a; s++) i = this.buildingRow.entriesBuff[this.settings.rtl ? a - s : s], this.displayEntry(i, r, this.offY, i.data("jg.jwidth"), i.data("jg.jheight"), this.buildingRow.height), r += i.data("jg.jwidth") + n.margins;
            this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border, this.setGalleryTempHeight(this.galleryHeightToSet + this.getSpinnerHeight()), (!t || this.buildingRow.height <= n.rowHeight && e) && (this.offY += this.buildingRow.height + n.margins, this.rows += 1, this.clearBuildingRow(), this.settings.triggerEvent.call(this, "jg.rowflush"))
        }
    };
    var i = 0;

    function e() {
        return g("body").height() > g(window).height()
    }
    r.prototype.rememberGalleryHeight = function () {
        i = this.$gallery.height(), this.$gallery.height(i)
    }, r.prototype.setGalleryTempHeight = function (t) {
        i = Math.max(t, i), this.$gallery.height(i)
    }, r.prototype.setGalleryFinalHeight = function (t) {
        i = t, this.$gallery.height(t)
    }, r.prototype.checkWidth = function () {
        this.checkWidthIntervalId = setInterval(g.proxy(function () {
            if (this.$gallery.is(":visible")) {
                var t = parseFloat(this.$gallery.width());
                e() === this.scrollBarOn ? Math.abs(t - this.galleryWidth) > this.settings.refreshSensitivity && (this.galleryWidth = t, this.rewind(), this.rememberGalleryHeight(), this.startImgAnalyzer(!0)) : (this.scrollBarOn = e(), this.galleryWidth = t)
            }
        }, this), this.settings.refreshTime)
    }, r.prototype.isSpinnerActive = function () {
        return null !== this.spinner.intervalId
    }, r.prototype.getSpinnerHeight = function () {
        return this.spinner.$el.innerHeight()
    }, r.prototype.stopLoadingSpinnerAnimation = function () {
        clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.setGalleryTempHeight(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
    }, r.prototype.startLoadingSpinnerAnimation = function () {
        var t = this.spinner,
            i = t.$el.find("span");
        clearInterval(t.intervalId), this.$gallery.append(t.$el), this.setGalleryTempHeight(this.offY + this.buildingRow.height + this.getSpinnerHeight()), t.intervalId = setInterval(function () {
            t.phase < i.length ? i.eq(t.phase).fadeTo(t.timeSlot, 1) : i.eq(t.phase - i.length).fadeTo(t.timeSlot, 0), t.phase = (t.phase + 1) % (2 * i.length)
        }, t.timeSlot)
    }, r.prototype.rewind = function () {
        this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.offY = this.border, this.rows = 0, this.clearBuildingRow()
    }, r.prototype.updateEntries = function (t) {
        var i;
        return t && null != this.lastFetchedEntry ? i = g(this.lastFetchedEntry).nextAll(this.settings.selector).toArray() : (this.entries = [], i = this.$gallery.children(this.settings.selector).toArray()), 0 < i.length && (g.isFunction(this.settings.sort) ? i = this.sortArray(i) : this.settings.randomize && (i = this.shuffleArray(i)), this.lastFetchedEntry = i[i.length - 1], this.settings.filter ? i = this.filterArray(i) : this.resetFilters(i)), this.entries = this.entries.concat(i), !0
    }, r.prototype.insertToGallery = function (t) {
        var i = this;
        g.each(t, function () {
            g(this).appendTo(i.$gallery)
        })
    }, r.prototype.shuffleArray = function (t) {
        var i, e, s;
        for (i = t.length - 1; 0 < i; i--) e = Math.floor(Math.random() * (i + 1)), s = t[i], t[i] = t[e], t[e] = s;
        return this.insertToGallery(t), t
    }, r.prototype.sortArray = function (t) {
        return t.sort(this.settings.sort), this.insertToGallery(t), t
    }, r.prototype.resetFilters = function (t) {
        for (var i = 0; i < t.length; i++) g(t[i]).removeClass("jg-filtered")
    }, r.prototype.filterArray = function (t) {
        var e = this.settings;
        if ("string" === g.type(e.filter)) return t.filter(function (t) {
            var i = g(t);
            return i.is(e.filter) ? (i.removeClass("jg-filtered"), !0) : (i.addClass("jg-filtered").removeClass("jg-visible"), !1)
        });
        if (g.isFunction(e.filter)) {
            for (var i = t.filter(e.filter), s = 0; s < t.length; s++) - 1 === i.indexOf(t[s]) ? g(t[s]).addClass("jg-filtered").removeClass("jg-visible") : g(t[s]).removeClass("jg-filtered");
            return i
        }
    }, r.prototype.destroy = function () {
        clearInterval(this.checkWidthIntervalId), g.each(this.entries, g.proxy(function (t, i) {
            var e = g(i);
            e.css("width", ""), e.css("height", ""), e.css("top", ""), e.css("left", ""), e.data("jg.loaded", void 0), e.removeClass("jg-entry");
            var s = this.imgFromEntry(e);
            s.css("width", ""), s.css("height", ""), s.css("margin-left", ""), s.css("margin-top", ""), s.attr("src", s.data("jg.originalSrc")), s.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(e);
            var n = this.captionFromEntry(e);
            e.data("jg.createdCaption") ? (e.data("jg.createdCaption", void 0), null !== n && n.remove()) : null !== n && n.fadeTo(0, 1)
        }, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
    }, r.prototype.analyzeImages = function (t) {
        for (var i = this.lastAnalyzedIndex + 1; i < this.entries.length; i++) {
            var e = g(this.entries[i]);
            if (!0 === e.data("jg.loaded") || "skipped" === e.data("jg.loaded")) {
                var s = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
                    n = e.data("jg.width") / e.data("jg.height");
                if (s / (this.buildingRow.aspectRatio + n) < this.settings.rowHeight && (this.flushRow(!1), ++this.yield.flushed >= this.yield.every)) return void this.startImgAnalyzer(t);
                this.buildingRow.entriesBuff.push(e), this.buildingRow.aspectRatio += n, this.buildingRow.width += n * this.settings.rowHeight, this.lastAnalyzedIndex = i
            } else if ("error" !== e.data("jg.loaded")) return
        }
        0 < this.buildingRow.entriesBuff.length && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.settings.triggerEvent.call(this, t ? "jg.resize" : "jg.complete"), this.setGalleryFinalHeight(this.galleryHeightToSet)
    }, r.prototype.stopImgAnalyzerStarter = function () {
        this.yield.flushed = 0, null !== this.imgAnalyzerTimeout && (clearTimeout(this.imgAnalyzerTimeout), this.imgAnalyzerTimeout = null)
    }, r.prototype.startImgAnalyzer = function (t) {
        var i = this;
        this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function () {
            i.analyzeImages(t)
        }, .001)
    }, r.prototype.onImageEvent = function (t, i, e) {
        if (i || e) {
            var s = new Image,
                n = g(s);
            i && n.one("load", function () {
                n.off("load error"), i(s)
            }), e && n.one("error", function () {
                n.off("load error"), e(s)
            }), s.src = t
        }
    }, r.prototype.init = function () {
        var a = !1,
            h = !1,
            l = this;
        g.each(this.entries, function (t, i) {
            var e = g(i),
                s = l.imgFromEntry(e);
            if (e.addClass("jg-entry"), !0 !== e.data("jg.loaded") && "skipped" !== e.data("jg.loaded"))
                if (null !== l.settings.rel && e.attr("rel", l.settings.rel), null !== l.settings.target && e.attr("target", l.settings.target), null !== s) {
                    var n = l.extractImgSrcFromImage(s);
                    if (s.attr("src", n), !1 === l.settings.waitThumbnailsLoad) {
                        var r = parseFloat(s.prop("width")),
                            o = parseFloat(s.prop("height"));
                        if (!isNaN(r) && !isNaN(o)) return e.data("jg.width", r), e.data("jg.height", o), e.data("jg.loaded", "skipped"), h = !0, l.startImgAnalyzer(!1), !0
                    }
                    e.data("jg.loaded", !1), a = !0, l.isSpinnerActive() || l.startLoadingSpinnerAnimation(), l.onImageEvent(n, function (t) {
                        e.data("jg.width", t.width), e.data("jg.height", t.height), e.data("jg.loaded", !0), l.startImgAnalyzer(!1)
                    }, function () {
                        e.data("jg.loaded", "error"), l.startImgAnalyzer(!1)
                    })
                } else e.data("jg.loaded", !0), e.data("jg.width", e.width() | parseFloat(e.css("width")) | 1), e.data("jg.height", e.height() | parseFloat(e.css("height")) | 1)
        }), a || h || this.startImgAnalyzer(!1), this.checkWidth()
    }, r.prototype.checkOrConvertNumber = function (t, i) {
        if ("string" === g.type(t[i]) && (t[i] = parseFloat(t[i])), "number" !== g.type(t[i])) throw i + " must be a number";
        if (isNaN(t[i])) throw "invalid number for " + i
    }, r.prototype.checkSizeRangesSuffixes = function () {
        if ("object" !== g.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
        var t = [];
        for (var i in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(i) && t.push(i);
        for (var e = {
                0: ""
            }, s = 0; s < t.length; s++)
            if ("string" === g.type(t[s])) try {
                e[parseInt(t[s].replace(/^[a-z]+/, ""), 10)] = this.settings.sizeRangeSuffixes[t[s]]
            } catch (t) {
                throw "sizeRangeSuffixes keys must contains correct numbers (" + t + ")"
            } else e[t[s]] = this.settings.sizeRangeSuffixes[t[s]];
        this.settings.sizeRangeSuffixes = e
    }, r.prototype.retrieveMaxRowHeight = function () {
        var t = null,
            i = this.settings.rowHeight;
        if ("string" === g.type(this.settings.maxRowHeight)) t = this.settings.maxRowHeight.match(/^[0-9]+%$/) ? i * parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100 : parseFloat(this.settings.maxRowHeight);
        else {
            if ("number" !== g.type(this.settings.maxRowHeight)) {
                if (!1 === this.settings.maxRowHeight || null == this.settings.maxRowHeight) return null;
                throw "maxRowHeight must be a number or a percentage"
            }
            t = this.settings.maxRowHeight
        }
        if (isNaN(t)) throw "invalid number for maxRowHeight";
        return t < i && (t = i), t
    }, r.prototype.checkSettings = function () {
        this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border");
        var t = ["justify", "nojustify", "left", "center", "right", "hide"];
        if (-1 === t.indexOf(this.settings.lastRow)) throw "lastRow must be one of: " + t.join(", ");
        if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || 1 < this.settings.justifyThreshold) throw "justifyThreshold must be in the interval [0,1]";
        if ("boolean" !== g.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
        if ("boolean" !== g.type(this.settings.captions)) throw "captions must be a boolean";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || 1 < this.settings.captionSettings.visibleOpacity) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || 1 < this.settings.captionSettings.nonVisibleOpacity) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), this.checkOrConvertNumber(this.settings, "refreshSensitivity"), "boolean" !== g.type(this.settings.randomize)) throw "randomize must be a boolean";
        if ("string" !== g.type(this.settings.selector)) throw "selector must be a string";
        if (!1 !== this.settings.sort && !g.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
        if (!1 !== this.settings.filter && !g.isFunction(this.settings.filter) && "string" !== g.type(this.settings.filter)) throw "filter must be false, a string or a filter function"
    }, r.prototype.retrieveSuffixRanges = function () {
        var t = [];
        for (var i in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(i) && t.push(parseInt(i, 10));
        return t.sort(function (t, i) {
            return i < t ? 1 : t < i ? -1 : 0
        }), t
    }, r.prototype.updateSettings = function (t) {
        this.settings = g.extend({}, this.settings, t), this.checkSettings(), this.border = 0 <= this.settings.border ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
    }, r.prototype.defaults = {
        sizeRangeSuffixes: {},
        thumbnailPath: void 0,
        rowHeight: 120,
        maxRowHeight: !1,
        margins: 1,
        border: -1,
        lastRow: "nojustify",
        justifyThreshold: .9,
        waitThumbnailsLoad: !0,
        captions: !0,
        cssAnimation: !0,
        imagesAnimationDuration: 500,
        captionSettings: {
            animationDuration: 500,
            visibleOpacity: .7,
            nonVisibleOpacity: 0
        },
        rel: null,
        target: null,
        extension: /\.[^.\\/]+$/,
        refreshTime: 200,
        refreshSensitivity: 0,
        randomize: !1,
        rtl: !1,
        sort: !1,
        filter: !1,
        selector: "a, div:not(.spinner)",
        imgSelector: "> img, > a > img",
        triggerEvent: function (t) {
            this.$gallery.trigger(t)
        }
    }, g.fn.justifiedGallery = function (n) {
        return this.each(function (t, i) {
            var e = g(i);
            e.addClass("justified-gallery");
            var s = e.data("jg.controller");
            if (void 0 === s) {
                if (null != n && "object" !== g.type(n)) {
                    if ("destroy" === n) return;
                    throw "The argument must be an object"
                }
                s = new r(e, g.extend({}, r.prototype.defaults, n)), e.data("jg.controller", s)
            } else if ("norewind" === n);
            else {
                if ("destroy" === n) return void s.destroy();
                s.updateSettings(n), s.rewind()
            }
            s.updateEntries("norewind" === n) && s.init()
        })
    }
});

/*!
	Colorbox 1.6.4
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function (t, e, i) {
    function n(i, n, o) {
        var r = e.createElement(i);
        return n && (r.id = Z + n), o && (r.style.cssText = o), t(r)
    }

    function o() {
        return i.innerHeight ? i.innerHeight : t(i).height()
    }

    function r(e, i) {
        i !== Object(i) && (i = {}), this.cache = {}, this.el = e, this.value = function (e) {
            var n;
            return void 0 === this.cache[e] && (n = t(this.el).attr("data-cbox-" + e), void 0 !== n ? this.cache[e] = n : void 0 !== i[e] ? this.cache[e] = i[e] : void 0 !== X[e] && (this.cache[e] = X[e])), this.cache[e]
        }, this.get = function (e) {
            var i = this.value(e);
            return t.isFunction(i) ? i.call(this.el, this) : i
        }
    }

    function h(t) {
        var e = W.length,
            i = (A + t) % e;
        return 0 > i ? e + i : i
    }

    function a(t, e) {
        return Math.round((/%/.test(t) ? ("x" === e ? E.width() : o()) / 100 : 1) * parseInt(t, 10))
    }

    function s(t, e) {
        return t.get("photo") || t.get("photoRegex").test(e)
    }

    function l(t, e) {
        return t.get("retinaUrl") && i.devicePixelRatio > 1 ? e.replace(t.get("photoRegex"), t.get("retinaSuffix")) : e
    }

    function d(t) {
        "contains" in x[0] && !x[0].contains(t.target) && t.target !== v[0] && (t.stopPropagation(), x.focus())
    }

    function c(t) {
        c.str !== t && (x.add(v).removeClass(c.str).addClass(t), c.str = t)
    }

    function g(e) {
        A = 0, e && e !== !1 && "nofollow" !== e ? (W = t("." + te).filter(function () {
            var i = t.data(this, Y),
                n = new r(this, i);
            return n.get("rel") === e
        }), A = W.index(_.el), -1 === A && (W = W.add(_.el), A = W.length - 1)) : W = t(_.el)
    }

    function u(i) {
        t(e).trigger(i), ae.triggerHandler(i)
    }

    function f(i) {
        var o;
        if (!G) {
            if (o = t(i).data(Y), _ = new r(i, o), g(_.get("rel")), !U) {
                U = $ = !0, c(_.get("className")), x.css({
                    visibility: "hidden",
                    display: "block",
                    opacity: ""
                }), I = n(se, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"), b.css({
                    width: "",
                    height: ""
                }).append(I), j = T.height() + k.height() + b.outerHeight(!0) - b.height(), D = C.width() + H.width() + b.outerWidth(!0) - b.width(), N = I.outerHeight(!0), z = I.outerWidth(!0);
                var h = a(_.get("initialWidth"), "x"),
                    s = a(_.get("initialHeight"), "y"),
                    l = _.get("maxWidth"),
                    f = _.get("maxHeight");
                _.w = Math.max((l !== !1 ? Math.min(h, a(l, "x")) : h) - z - D, 0), _.h = Math.max((f !== !1 ? Math.min(s, a(f, "y")) : s) - N - j, 0), I.css({
                    width: "",
                    height: _.h
                }), J.position(), u(ee), _.get("onOpen"), O.add(F).hide(), x.focus(), _.get("trapFocus") && e.addEventListener && (e.addEventListener("focus", d, !0), ae.one(re, function () {
                    e.removeEventListener("focus", d, !0)
                })), _.get("returnFocus") && ae.one(re, function () {
                    t(_.el).focus()
                })
            }
            var p = parseFloat(_.get("opacity"));
            v.css({
                opacity: p === p ? p : "",
                cursor: _.get("overlayClose") ? "pointer" : "",
                visibility: "visible"
            }).show(), _.get("closeButton") ? B.html(_.get("close")).appendTo(b) : B.appendTo("<div/>"), w()
        }
    }

    function p() {
        x || (V = !1, E = t(i), x = n(se).attr({
            id: Y,
            "class": t.support.opacity === !1 ? Z + "IE" : "",
            role: "dialog",
            tabindex: "-1"
        }).hide(), v = n(se, "Overlay").hide(), L = t([n(se, "LoadingOverlay")[0], n(se, "LoadingGraphic")[0]]), y = n(se, "Wrapper"), b = n(se, "Content").append(F = n(se, "Title"), R = n(se, "Current"), P = t('<button type="button"/>').attr({
            id: Z + "Previous"
        }), K = t('<button type="button"/>').attr({
            id: Z + "Next"
        }), S = t('<button type="button"/>').attr({
            id: Z + "Slideshow"
        }), L), B = t('<button type="button"/>').attr({
            id: Z + "Close"
        }), y.append(n(se).append(n(se, "TopLeft"), T = n(se, "TopCenter"), n(se, "TopRight")), n(se, !1, "clear:left").append(C = n(se, "MiddleLeft"), b, H = n(se, "MiddleRight")), n(se, !1, "clear:left").append(n(se, "BottomLeft"), k = n(se, "BottomCenter"), n(se, "BottomRight"))).find("div div").css({
            "float": "left"
        }), M = n(se, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"), O = K.add(P).add(R).add(S)), e.body && !x.parent().length && t(e.body).append(v, x.append(y, M))
    }

    function m() {
        function i(t) {
            t.which > 1 || t.shiftKey || t.altKey || t.metaKey || t.ctrlKey || (t.preventDefault(), f(this))
        }
        return x ? (V || (V = !0, K.click(function () {
            J.next()
        }), P.click(function () {
            J.prev()
        }), B.click(function () {
            J.close()
        }), v.click(function () {
            _.get("overlayClose") && J.close()
        }), t(e).bind("keydown." + Z, function (t) {
            var e = t.keyCode;
            U && _.get("escKey") && 27 === e && (t.preventDefault(), J.close()), U && _.get("arrowKey") && W[1] && !t.altKey && (37 === e ? (t.preventDefault(), P.click()) : 39 === e && (t.preventDefault(), K.click()))
        }), t.isFunction(t.fn.on) ? t(e).on("click." + Z, "." + te, i) : t("." + te).live("click." + Z, i)), !0) : !1
    }

    function w() {
        var e, o, r, h = J.prep,
            d = ++le;
        if ($ = !0, q = !1, u(he), u(ie), _.get("onLoad"), _.h = _.get("height") ? a(_.get("height"), "y") - N - j : _.get("innerHeight") && a(_.get("innerHeight"), "y"), _.w = _.get("width") ? a(_.get("width"), "x") - z - D : _.get("innerWidth") && a(_.get("innerWidth"), "x"), _.mw = _.w, _.mh = _.h, _.get("maxWidth") && (_.mw = a(_.get("maxWidth"), "x") - z - D, _.mw = _.w && _.w < _.mw ? _.w : _.mw), _.get("maxHeight") && (_.mh = a(_.get("maxHeight"), "y") - N - j, _.mh = _.h && _.h < _.mh ? _.h : _.mh), e = _.get("href"), Q = setTimeout(function () {
                L.show()
            }, 100), _.get("inline")) {
            var c = t(e).eq(0);
            r = t("<div>").hide().insertBefore(c), ae.one(he, function () {
                r.replaceWith(c)
            }), h(c)
        } else _.get("iframe") ? h(" ") : _.get("html") ? h(_.get("html")) : s(_, e) ? (e = l(_, e), q = _.get("createImg"), t(q).addClass(Z + "Photo").bind("error." + Z, function () {
            h(n(se, "Error").html(_.get("imgError")))
        }).one("load", function () {
            d === le && setTimeout(function () {
                var e;
                _.get("retinaImage") && i.devicePixelRatio > 1 && (q.height = q.height / i.devicePixelRatio, q.width = q.width / i.devicePixelRatio), _.get("scalePhotos") && (o = function () {
                    q.height -= q.height * e, q.width -= q.width * e
                }, _.mw && q.width > _.mw && (e = (q.width - _.mw) / q.width, o()), _.mh && q.height > _.mh && (e = (q.height - _.mh) / q.height, o())), _.h && (q.style.marginTop = Math.max(_.mh - q.height, 0) / 2 + "px"), W[1] && (_.get("loop") || W[A + 1]) && (q.style.cursor = "pointer", t(q).bind("click." + Z, function () {
                    J.next()
                })), q.style.width = q.width + "px", q.style.height = q.height + "px", h(q)
            }, 1)
        }), q.src = e) : e && M.load(e, _.get("data"), function (e, i) {
            d === le && h("error" === i ? n(se, "Error").html(_.get("xhrError")) : t(this).contents())
        })
    }
    var v, x, y, b, T, C, H, k, W, E, I, M, L, F, R, S, K, P, B, O, _, j, D, N, z, A, q, U, $, G, Q, J, V, X = {
            html: !1,
            photo: !1,
            iframe: !1,
            inline: !1,
            transition: "elastic",
            speed: 300,
            fadeOut: 300,
            width: !1,
            initialWidth: "600",
            innerWidth: !1,
            maxWidth: !1,
            height: !1,
            initialHeight: "450",
            innerHeight: !1,
            maxHeight: !1,
            scalePhotos: !0,
            scrolling: !0,
            opacity: .9,
            preloading: !0,
            className: !1,
            overlayClose: !0,
            escKey: !0,
            arrowKey: !0,
            top: !1,
            bottom: !1,
            left: !1,
            right: !1,
            fixed: !1,
            data: void 0,
            closeButton: !0,
            fastIframe: !0,
            open: !1,
            reposition: !0,
            loop: !0,
            slideshow: !1,
            slideshowAuto: !0,
            slideshowSpeed: 2500,
            slideshowStart: "start slideshow",
            slideshowStop: "stop slideshow",
            photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
            retinaImage: !1,
            retinaUrl: !1,
            retinaSuffix: "@2x.$1",
            current: "image {current} of {total}",
            previous: "previous",
            next: "next",
            close: "close",
            xhrError: "This content failed to load.",
            imgError: "This image failed to load.",
            returnFocus: !0,
            trapFocus: !0,
            onOpen: !1,
            onLoad: !1,
            onComplete: !1,
            onCleanup: !1,
            onClosed: !1,
            rel: function () {
                return this.rel
            },
            href: function () {
                return t(this).attr("href")
            },
            title: function () {
                return this.title
            },
            createImg: function () {
                var e = new Image,
                    i = t(this).data("cbox-img-attrs");
                return "object" == typeof i && t.each(i, function (t, i) {
                    e[t] = i
                }), e
            },
            createIframe: function () {
                var i = e.createElement("iframe"),
                    n = t(this).data("cbox-iframe-attrs");
                return "object" == typeof n && t.each(n, function (t, e) {
                    i[t] = e
                }), "frameBorder" in i && (i.frameBorder = 0), "allowTransparency" in i && (i.allowTransparency = "true"), i.name = (new Date).getTime(), i.allowFullscreen = !0, i
            }
        },
        Y = "colorbox",
        Z = "cbox",
        te = Z + "Element",
        ee = Z + "_open",
        ie = Z + "_load",
        ne = Z + "_complete",
        oe = Z + "_cleanup",
        re = Z + "_closed",
        he = Z + "_purge",
        ae = t("<a/>"),
        se = "div",
        le = 0,
        de = {},
        ce = function () {
            function t() {
                clearTimeout(h)
            }

            function e() {
                (_.get("loop") || W[A + 1]) && (t(), h = setTimeout(J.next, _.get("slideshowSpeed")))
            }

            function i() {
                S.html(_.get("slideshowStop")).unbind(s).one(s, n), ae.bind(ne, e).bind(ie, t), x.removeClass(a + "off").addClass(a + "on")
            }

            function n() {
                t(), ae.unbind(ne, e).unbind(ie, t), S.html(_.get("slideshowStart")).unbind(s).one(s, function () {
                    J.next(), i()
                }), x.removeClass(a + "on").addClass(a + "off")
            }

            function o() {
                r = !1, S.hide(), t(), ae.unbind(ne, e).unbind(ie, t), x.removeClass(a + "off " + a + "on")
            }
            var r, h, a = Z + "Slideshow_",
                s = "click." + Z;
            return function () {
                r ? _.get("slideshow") || (ae.unbind(oe, o), o()) : _.get("slideshow") && W[1] && (r = !0, ae.one(oe, o), _.get("slideshowAuto") ? i() : n(), S.show())
            }
        }();
    t[Y] || (t(p), J = t.fn[Y] = t[Y] = function (e, i) {
        var n, o = this;
        return e = e || {}, t.isFunction(o) && (o = t("<a/>"), e.open = !0), o[0] ? (p(), m() && (i && (e.onComplete = i), o.each(function () {
            var i = t.data(this, Y) || {};
            t.data(this, Y, t.extend(i, e))
        }).addClass(te), n = new r(o[0], e), n.get("open") && f(o[0])), o) : o
    }, J.position = function (e, i) {
        function n() {
            T[0].style.width = k[0].style.width = b[0].style.width = parseInt(x[0].style.width, 10) - D + "px", b[0].style.height = C[0].style.height = H[0].style.height = parseInt(x[0].style.height, 10) - j + "px"
        }
        var r, h, s, l = 0,
            d = 0,
            c = x.offset();
        if (E.unbind("resize." + Z), x.css({
                top: -9e4,
                left: -9e4
            }), h = E.scrollTop(), s = E.scrollLeft(), _.get("fixed") ? (c.top -= h, c.left -= s, x.css({
                position: "fixed"
            })) : (l = h, d = s, x.css({
                position: "absolute"
            })), d += _.get("right") !== !1 ? Math.max(E.width() - _.w - z - D - a(_.get("right"), "x"), 0) : _.get("left") !== !1 ? a(_.get("left"), "x") : Math.round(Math.max(E.width() - _.w - z - D, 0) / 2), l += _.get("bottom") !== !1 ? Math.max(o() - _.h - N - j - a(_.get("bottom"), "y"), 0) : _.get("top") !== !1 ? a(_.get("top"), "y") : Math.round(Math.max(o() - _.h - N - j, 0) / 2), x.css({
                top: c.top,
                left: c.left,
                visibility: "visible"
            }), y[0].style.width = y[0].style.height = "9999px", r = {
                width: _.w + z + D,
                height: _.h + N + j,
                top: l,
                left: d
            }, e) {
            var g = 0;
            t.each(r, function (t) {
                return r[t] !== de[t] ? (g = e, void 0) : void 0
            }), e = g
        }
        de = r, e || x.css(r), x.dequeue().animate(r, {
            duration: e || 0,
            complete: function () {
                n(), $ = !1, y[0].style.width = _.w + z + D + "px", y[0].style.height = _.h + N + j + "px", _.get("reposition") && setTimeout(function () {
                    E.bind("resize." + Z, J.position)
                }, 1), t.isFunction(i) && i()
            },
            step: n
        })
    }, J.resize = function (t) {
        var e;
        U && (t = t || {}, t.width && (_.w = a(t.width, "x") - z - D), t.innerWidth && (_.w = a(t.innerWidth, "x")), I.css({
            width: _.w
        }), t.height && (_.h = a(t.height, "y") - N - j), t.innerHeight && (_.h = a(t.innerHeight, "y")), t.innerHeight || t.height || (e = I.scrollTop(), I.css({
            height: "auto"
        }), _.h = I.height()), I.css({
            height: _.h
        }), e && I.scrollTop(e), J.position("none" === _.get("transition") ? 0 : _.get("speed")))
    }, J.prep = function (i) {
        function o() {
            return _.w = _.w || I.width(), _.w = _.mw && _.mw < _.w ? _.mw : _.w, _.w
        }

        function a() {
            return _.h = _.h || I.height(), _.h = _.mh && _.mh < _.h ? _.mh : _.h, _.h
        }
        if (U) {
            var d, g = "none" === _.get("transition") ? 0 : _.get("speed");
            I.remove(), I = n(se, "LoadedContent").append(i), I.hide().appendTo(M.show()).css({
                width: o(),
                overflow: _.get("scrolling") ? "auto" : "hidden"
            }).css({
                height: a()
            }).prependTo(b), M.hide(), t(q).css({
                "float": "none"
            }), c(_.get("className")), d = function () {
                function i() {
                    t.support.opacity === !1 && x[0].style.removeAttribute("filter")
                }
                var n, o, a = W.length;
                U && (o = function () {
                    clearTimeout(Q), L.hide(), u(ne), _.get("onComplete")
                }, F.html(_.get("title")).show(), I.show(), a > 1 ? ("string" == typeof _.get("current") && R.html(_.get("current").replace("{current}", A + 1).replace("{total}", a)).show(), K[_.get("loop") || a - 1 > A ? "show" : "hide"]().html(_.get("next")), P[_.get("loop") || A ? "show" : "hide"]().html(_.get("previous")), ce(), _.get("preloading") && t.each([h(-1), h(1)], function () {
                    var i, n = W[this],
                        o = new r(n, t.data(n, Y)),
                        h = o.get("href");
                    h && s(o, h) && (h = l(o, h), i = e.createElement("img"), i.src = h)
                })) : O.hide(), _.get("iframe") ? (n = _.get("createIframe"), _.get("scrolling") || (n.scrolling = "no"), t(n).attr({
                    src: _.get("href"),
                    "class": Z + "Iframe"
                }).one("load", o).appendTo(I), ae.one(he, function () {
                    n.src = "//about:blank"
                }), _.get("fastIframe") && t(n).trigger("load")) : o(), "fade" === _.get("transition") ? x.fadeTo(g, 1, i) : i())
            }, "fade" === _.get("transition") ? x.fadeTo(g, 0, function () {
                J.position(0, d)
            }) : J.position(g, d)
        }
    }, J.next = function () {
        !$ && W[1] && (_.get("loop") || W[A + 1]) && (A = h(1), f(W[A]))
    }, J.prev = function () {
        !$ && W[1] && (_.get("loop") || A) && (A = h(-1), f(W[A]))
    }, J.close = function () {
        U && !G && (G = !0, U = !1, u(oe), _.get("onCleanup"), E.unbind("." + Z), v.fadeTo(_.get("fadeOut") || 0, 0), x.stop().fadeTo(_.get("fadeOut") || 0, 0, function () {
            x.hide(), v.hide(), u(he), I.remove(), setTimeout(function () {
                G = !1, u(re), _.get("onClosed")
            }, 1)
        }))
    }, J.remove = function () {
        x && (x.stop(), t[Y].close(), x.stop(!1, !0).remove(), v.remove(), G = !1, x = null, t("." + te).removeData(Y).removeClass(te), t(e).unbind("click." + Z).unbind("keydown." + Z))
    }, J.element = function () {
        return t(_.el)
    }, J.settings = X)
})(jQuery, document, window);