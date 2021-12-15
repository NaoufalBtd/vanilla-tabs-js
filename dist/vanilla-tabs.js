"use strict";
function _classCallCheck(e, t) {
	if (!(e instanceof t))
		throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
	for (var s = 0; s < t.length; s++) {
		var a = t[s];
		(a.enumerable = a.enumerable || !1),
			(a.configurable = !0),
			"value" in a && (a.writable = !0),
			Object.defineProperty(e, a.key, a);
	}
}
function _createClass(e, t, s) {
	return (
		t && _defineProperties(e.prototype, t), s && _defineProperties(e, s), e
	);
}
var VanillaTabs = (function () {
	function e(t) {
		_classCallCheck(this, e),
			(this.options = Object.assign(
				{
					selector: ".tabs",
					type: "horizontal",
					responsiveBreak: 767.98,
					activeIndex: 0,
				},
				t
			)),
			(this.elems = document.querySelectorAll(this.options.selector)),
			(this.skipIfInitialized = function (e) {
				e.classList.contains("tabs__initialized");
			}),
			this.buildUI(),
			this.handleNavigation(),
			this.handleResponsive();
	}
	return (
		_createClass(e, [
			{
				key: "buildUI",
				value: function () {
					var e = this;
					this.elems.forEach(function (t, s) {
						var a = t,
							i = a.childNodes,
							n = [],
							r = e.options.type;
						e.skipIfInitialized(a),
							a.classList.add("style__" + e.options.type),
							a.classList.add("tabs__initialized");
						for (var l = 0; l < i.length; l++) {
							var c = i[l];
							if (c.nodeType != Node.TEXT_NODE) {
								c.classList.add("tabs__content");
								var o = c.dataset.title ? c.dataset.title : "";
								var icon = c.dataset.img ? c.dataset.img : "";
								n.push({ title: o, icon });
								var _ = c.innerHTML;
								(c.innerHTML =
									'<div class="tabs__content_wrapper">' + _ + "</div>"),
									c.insertAdjacentHTML(
										"afterbegin",
										'<div class="tabs__nav_link">' +
											`<img src="${icon}" class="tabs__nav_icon">` +
											o +
											"</div>"
									);
							}
						}
						var v = "";
						n.forEach(function (e) {
							v =
								v +
								'<div class="tabs__nav_link">' +
								`<img src="${e.icon}" class="tabs__nav_icon">` +
								e.title +
								"</div>";
						}),
							a.insertAdjacentHTML(
								"afterbegin",
								'<li class="tabs__nav">' + v + "</li>"
							);
						var d = Number(e.options.activeIndex);
						"accordion" != r &&
							-1 != d &&
							(d > n.length - 1 &&
								(console.warn(
									"VANILLA TABS: Active tab number from settings is bigger than tabs count. Please remember, that index starts from Zero! To avoid crashes, activeIndex option was reverted to 0."
								),
								(d = 0)),
							a
								.querySelectorAll(".tabs__nav > .tabs__nav_link")
								[d].classList.add("is__active"),
							a
								.querySelectorAll(".tabs__content")
								[d].classList.add("is__active"),
							a
								.querySelectorAll(".tabs__content > .tabs__nav_link")
								[d].classList.add("is__active"));
					});
				},
			},
			{
				key: "handleNavigation",
				value: function () {
					var e = this,
						t = this.elems,
						s = this.options.type;
					t.forEach(function (t, a) {
						var i = t;
						e.skipIfInitialized(i);
						const childrenList = i.querySelectorAll(".tabs__nav_link");
						Array.prototype.forEach.call(childrenList, (child) => {
							child.addEventListener("click", function (e) {
								if (
									e.currentTarget &&
									e.currentTarget.classList.contains("tabs__nav_link")
								) {
									var t;
									e.preventDefault(),
										(t =
											"tabs__nav" == e.currentTarget.parentElement.classList
												? Array.prototype.slice
														.call(e.currentTarget.parentElement.children)
														.indexOf(e.currentTarget)
												: Array.prototype.slice
														.call(
															e.currentTarget.parentElement.parentElement
																.children
														)
														.indexOf(e.currentTarget.parentElement) - 1);
									var a = i.getElementsByClassName("tabs__content"),
										n = i.querySelectorAll(".tabs__nav > .tabs__nav_link"),
										r = i.querySelectorAll(".tabs__content > .tabs__nav_link");
									if (
										("accordion" == s ||
											i.classList.contains("is__responsive")) &&
										e.currentTarget.classList.contains("is__active")
									)
										return (
											a[t].classList.remove("is__active"),
											n[t].classList.remove("is__active"),
											void r[t].classList.remove("is__active")
										);
									for (var l = 0; l < a.length; l++)
										a[l].classList.remove("is__active");
									a[t].classList.add("is__active"),
										n.forEach(function (e) {
											e.classList.remove("is__active");
										}),
										n[t].classList.add("is__active"),
										r.forEach(function (e) {
											e.classList.remove("is__active");
										}),
										r[t].classList.add("is__active");
								}
							});
						});
					});
				},
			},
			{
				key: "handleResponsive",
				value: function () {
					var e = this,
						t = this.elems,
						s = this.options.type;
					window.addEventListener("resize", function () {
						t.forEach(function (t, a) {
							var i = t,
								n = i.getElementsByClassName("tabs__content"),
								r = i.querySelectorAll(".tabs__nav > .tabs__nav_link"),
								l = i.querySelectorAll(".tabs__content > .tabs__nav_link");
							e.skipIfInitialized(i),
								document.documentElement.clientWidth > 768
									? (i.classList.remove("is__responsive"),
									  "accordion" != s &&
											0 ==
												i.querySelectorAll(".tabs__nav_link.is__active")
													.length &&
											(n[0].classList.add("is__active"),
											r[0].classList.add("is__active"),
											l[0].classList.add("is__active")))
									: i.classList.add("is__responsive");
						});
					}),
						window.dispatchEvent(new Event("resize"));
				},
			},
		]),
		e
	);
})();
