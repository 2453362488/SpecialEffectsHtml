var adcnt = 0;
setInterval(function() {
	adcnt++;
}, 999);
var _SETTINGS = {
	MarketJSGameCenter: {
		Activator: {
			Enabled: !1,
			Position: {
				Top: "15%",
				Left: "0"
			}
		},
		API: {
			Enabled: !1,
			Log: {
				Events: {
					InitializeGame: !0,
					EndGame: !0,
					Level: {
						Begin: !0,
						End: !0,
						Win: !0,
						Lose: !0,
						Draw: !0
					}
				}
			}
		}
	},
	API: {
		Enabled: !1,
		Log: {
			Events: {
				InitializeGame: !0,
				EndGame: !0,
				Level: {
					Begin: !0,
					End: !0,
					Win: !0,
					Lose: !0,
					Draw: !0
				}
			}
		}
	},
	Ad: {
		Mobile: {
			Preroll: {
				Enabled: !1,
				Duration: 5,
				Width: 300,
				Height: 250,
				Rotation: {
					Enabled: !1,
					Weight: {
						MobileAdInGamePreroll: 40,
						MobileAdInGamePreroll2: 40,
						MobileAdInGamePreroll3: 20
					}
				}
			},
			Header: {
				Enabled: !1,
				Duration: 5,
				Width: 320,
				Height: 50,
				Rotation: {
					Enabled: !1,
					Weight: {
						MobileAdInGameHeader: 40,
						MobileAdInGameHeader2: 40,
						MobileAdInGameHeader3: 20
					}
				}
			},
			Footer: {
				Enabled: !1,
				Duration: 5,
				Width: 320,
				Height: 50,
				Rotation: {
					Enabled: !1,
					Weight: {
						MobileAdInGameFooter: 40,
						MobileAdInGameFooter2: 40,
						MobileAdInGameFooter3: 20
					}
				}
			},
			End: {
				Enabled: !1,
				Duration: 1,
				Width: 300,
				Height: 250,
				Rotation: {
					Enabled: !1,
					Weight: {
						MobileAdInGameEnd: 40,
						MobileAdInGameEnd2: 40,
						MobileAdInGameEnd3: 20
					}
				}
			}
		}
	},
	Language: {
		Default: "en"
	},
	DeveloperBranding: {
		Splash: {
			Enabled: !1
		},
		Logo: {
			Enabled: !1,
			Link: "http://google.com",
			LinkEnabled: !1,
			NewWindow: !0,
			Width: 166,
			Height: 61
		}
	},
	Branding: {
		Splash: {
			Enabled: !1
		},
		Logo: {
			Enabled: !1,
			Link: "http://google.com",
			LinkEnabled: !1,
			NewWindow: !0,
			Width: 166,
			Height: 61
		}
	},
	MoreGames: {
		Enabled: !1,
		Link: "https://lagged.com/",
		NewWindow: !0
	},
	Gamecenter: {
		Enabled: !1
	}
};
var _STRINGS = {
		Ad: {
			Mobile: {
				Preroll: {
					ReadyIn: "The game is ready in ",
					Loading: "Your game is loading...",
					Close: "Close"
				},
				Header: {
					ReadyIn: "The game is ready in ",
					Loading: "Your game is loading...",
					Close: "Close"
				},
				End: {
					ReadyIn: "Advertisement ends in ",
					Loading: "Please wait ...",
					Close: "Close"
				}
			}
		},
		Splash: {
			Loading: "Loading...",
			LogoLine1: "Some text here",
			LogoLine2: "powered by MarketJS",
			LogoLine3: "none",
			TapToStart: "TAP TO START"
		},
		Game: {
			settings: "Settings",
			music: "Music",
			sound: "Sound",
			levelselect: "Level Select",
			paused: "Paused",
			level: "Level %1",
			shotleft: "Balls remaining : %1",
			goal: "GOAL!!!",
			levelcomplete: "Completed!",
			playtime: "Time %1",
			stars: "Stars",
			timebonus: "Time",
			score: "Score",
			highscore: "High Score : %1",
			newhighscore: "New High Score!",
			total: "Total : %1",
			tips: "Tips",
			tutor1: "Hold and drag the ball across screen to aim. Release to shoot.",
			tutor2: "You can aim the blue ball only once.",
			tutor3: "Jumping crabs can get in the way.",
			tutor4: "Jumping crabs can also be used to bounce off.",
			tutor5: "You can't control the yellow ball. Use the orange ball to make a goal with it."
		},
		Buttons: {
			ok: "OK"
		},
		Results: {
			Title: "High score"
		}
	},
	fontReady = !1,
	fonts = {
		font1: "luckiest-guy"
	},
	_t = function(b) {
		for (var c = b, d = 1; d < arguments.length; d++) c = c.replace("%" + d, arguments[d]);
		return c
	},
	curState = function() {
		return ig.game.controller
	},
	csound = {
		sfxPlay: function(b) {
			try {
				return ig.soundHandler.sfxPlayer.play(b)
			} catch (c) {}
		},
		sfxStop: function(b) {
			return ig.soundHandler.sfxPlayer.soundList[b].stop()
		},
		sfx: {
			isPlaying: function(b) {
				return ig.soundHandler.sfxPlayer.soundList[b].playing()
			}
		}
	},
	LZString = function() {
		function b(b, c) {
			if (!d[b]) {
				d[b] = {};
				for (var e = 0; e < b.length; e++) d[b][b.charAt(e)] = e
			}
			return d[b][c]
		}
		var c = String.fromCharCode,
			d = {},
			e = {
				compressToBase64: function(b) {
					if (null == b) return "";
					b = e._compress(b, 6, function(b) {
						return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b)
					});
					switch (b.length % 4) {
						default:
							case 0:
							return b;
						case 1:
								return b + "===";
						case 2:
								return b + "==";
						case 3:
								return b + "="
					}
				},
				decompressFromBase64: function(c) {
					return null == c ? "" : "" == c ? null : e._decompress(c.length, 32, function(d) {
						return b("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c.charAt(d))
					})
				},
				compressToUTF16: function(b) {
					return null == b ? "" : e._compress(b, 15, function(b) {
						return c(b + 32)
					}) + " "
				},
				decompressFromUTF16: function(b) {
					return null == b ? "" : "" == b ? null : e._decompress(b.length, 16384, function(c) {
						return b.charCodeAt(c) - 32
					})
				},
				compressToUint8Array: function(b) {
					b = e.compress(b);
					for (var c = new Uint8Array(2 * b.length), d = 0, l = b.length; l > d; d++) {
						var j = b.charCodeAt(d);
						c[2 * d] = j >>> 8;
						c[2 * d + 1] = j % 256
					}
					return c
				},
				decompressFromUint8Array: function(b) {
					if (null === b || void 0 === b) return e.decompress(b);
					for (var d = Array(b.length / 2), m = 0, l = d.length; l > m; m++) d[m] = 256 * b[2 * m] + b[2 * m + 1];
					var j = [];
					return d.forEach(function(b) {
						j.push(c(b))
					}), e.decompress(j.join(""))
				},
				compressToEncodedURIComponent: function(b) {
					return null == b ? "" : e._compress(b, 6, function(b) {
						return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(b)
					})
				},
				decompressFromEncodedURIComponent: function(c) {
					return null == c ? "" : "" == c ? null : (c = c.replace(/ /g, "+"), e._decompress(c.length, 32, function(d) {
						return b("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", c.charAt(d))
					}))
				},
				compress: function(b) {
					return e._compress(b, 16, function(b) {
						return c(b)
					})
				},
				_compress: function(b, c, d) {
					if (null == b) return "";
					var e, j, q, z = {},
						y = {},
						A = "",
						B = "",
						E = "",
						F = 2,
						s = 3,
						I = 2,
						G = [],
						C = 0,
						H = 0;
					for (q = 0; q < b.length; q += 1)
						if (A = b.charAt(q), Object.prototype.hasOwnProperty.call(z, A) || (z[A] = s++, y[A] = !0), B = E + A, Object.prototype.hasOwnProperty.call(z, B)) E = B;
						else {
							if (Object.prototype.hasOwnProperty.call(y, E)) {
								if (256 > E.charCodeAt(0)) {
									for (e = 0; I > e; e++) C <<= 1, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++;
									j = E.charCodeAt(0);
									for (e = 0; 8 > e; e++) C = C << 1 | 1 & j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j >>= 1
								} else {
									j = 1;
									for (e = 0; I > e; e++) C = C << 1 | j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j = 0;
									j = E.charCodeAt(0);
									for (e = 0; 16 > e; e++) C = C << 1 | 1 & j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j >>= 1
								}
								F--;
								0 == F && (F = Math.pow(2, I), I++);
								delete y[E]
							} else {
								j = z[E];
								for (e = 0; I > e; e++) C = C << 1 | 1 & j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j >>= 1
							}
							F--;
							0 == F && (F = Math.pow(2, I), I++);
							z[B] = s++;
							E = String(A)
						}
					if ("" !== E) {
						if (Object.prototype.hasOwnProperty.call(y, E)) {
							if (256 > E.charCodeAt(0)) {
								for (e = 0; I > e; e++) C <<= 1, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++;
								j = E.charCodeAt(0);
								for (e = 0; 8 > e; e++) C = C << 1 | 1 & j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j >>= 1
							} else {
								j = 1;
								for (e = 0; I > e; e++) C = C << 1 | j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j = 0;
								j = E.charCodeAt(0);
								for (e = 0; 16 > e; e++) C = C << 1 | 1 & j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j >>= 1
							}
							F--;
							0 == F && (F = Math.pow(2, I), I++);
							delete y[E]
						} else {
							j = z[E];
							for (e = 0; I > e; e++) C = C << 1 | 1 & j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j >>= 1
						}
						F--;
						0 == F && (Math.pow(2, I), I++)
					}
					j = 2;
					for (e = 0; I > e; e++) C = C << 1 | 1 & j, H == c - 1 ? (H = 0, G.push(d(C)), C = 0) : H++, j >>= 1;
					for (;;) {
						if (C <<= 1, H == c - 1) {
							G.push(d(C));
							break
						}
						H++
					}
					return G.join("")
				},
				decompress: function(b) {
					return null == b ? "" : "" == b ? null : e._decompress(b.length, 32768, function(c) {
						return b.charCodeAt(c)
					})
				},
				_decompress: function(b, d, e) {
					var l, j, q, z, y, A, B = [],
						E = 4,
						F = 4,
						s = 3;
					j = "";
					var I = [],
						G = e(0),
						C = d,
						H = 1;
					for (l = 0; 3 > l; l += 1) B[l] = l;
					j = 0;
					z = Math.pow(2, 2);
					for (y = 1; y != z;) q = G & C, C >>= 1, 0 == C && (C = d, G = e(H++)), j |= (0 < q ? 1 : 0) * y, y <<= 1;
					switch (j) {
						case 0:
							j = 0;
							z = Math.pow(2, 8);
							for (y = 1; y != z;) q = G & C, C >>= 1, 0 == C && (C = d, G = e(H++)), j |= (0 < q ? 1 : 0) * y, y <<= 1;
							A = c(j);
							break;
						case 1:
							j = 0;
							z = Math.pow(2, 16);
							for (y = 1; y != z;) q = G & C, C >>= 1, 0 == C && (C = d, G = e(H++)), j |= (0 < q ? 1 : 0) * y, y <<= 1;
							A = c(j);
							break;
						case 2:
							return ""
					}
					l = B[3] = A;
					for (I.push(A);;) {
						if (H > b) return "";
						j = 0;
						z = Math.pow(2, s);
						for (y = 1; y != z;) q = G & C, C >>= 1, 0 == C && (C = d, G = e(H++)), j |= (0 < q ? 1 : 0) * y, y <<= 1;
						switch (A = j) {
							case 0:
								j = 0;
								z = Math.pow(2, 8);
								for (y = 1; y != z;) q = G & C, C >>= 1, 0 == C && (C = d, G = e(H++)), j |= (0 < q ? 1 : 0) * y, y <<= 1;
								B[F++] = c(j);
								A = F - 1;
								E--;
								break;
							case 1:
								j = 0;
								z = Math.pow(2, 16);
								for (y = 1; y != z;) q = G & C, C >>= 1, 0 == C && (C = d, G = e(H++)), j |= (0 < q ? 1 : 0) * y, y <<= 1;
								B[F++] = c(j);
								A = F - 1;
								E--;
								break;
							case 2:
								return I.join("")
						}
						if (0 == E && (E = Math.pow(2, s), s++), B[A]) j = B[A];
						else {
							if (A !== F) return null;
							j = l + l.charAt(0)
						}
						I.push(j);
						B[F++] = l + j.charAt(0);
						E--;
						l = j;
						0 == E && (E = Math.pow(2, s), s++)
					}
				}
			};
		return e
	}();
"function" == typeof define && define.amd ? define(function() {
	return LZString
}) : "undefined" != typeof module && null != module && (module.exports = LZString);
var FontDetect = function() {
	function b() {
		if (!c) {
			c = !0;
			var b = document.body,
				d = document.body.firstChild,
				m = document.createElement("div");
			m.id = "fontdetectHelper";
			e = document.createElement("span");
			e.innerText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			m.appendChild(e);
			b.insertBefore(m, d);
			m.style.position = "absolute";
			m.style.visibility = "hidden";
			m.style.top = "-200px";
			m.style.left = "-100000px";
			m.style.width = "100000px";
			m.style.height = "200px";
			m.style.fontSize = "100px"
		}
	}
	var c = !1,
		d = ["serif", "sans-serif", "monospace", "cursive", "fantasy"],
		e = null;
	return {
		onFontLoaded: function(d, e, m, l) {
			if (d) {
				var j = l && l.msInterval ? l.msInterval : 100,
					q = l && l.msTimeout ? l.msTimeout : 2E3;
				if (e || m) {
					if (c || b(), this.isFontLoaded(d)) return void(e && e(d));
					var z = this,
						y = (new Date).getTime(),
						A = setInterval(function() {
							if (z.isFontLoaded(d)) return clearInterval(A), void e(d);
							(new Date).getTime() - y > q && (clearInterval(A), m && m(d))
						}, j)
				}
			}
		},
		isFontLoaded: function(f) {
			var g = 0,
				m = 0;
			c || b();
			for (var l = 0; l < d.length; ++l) {
				if (e.style.fontFamily = '"' + f + '",' + d[l], g = e.offsetWidth, 0 < l && g != m) return !1;
				m = g
			}
			return !0
		},
		whichFont: function(b) {
			b = (b instanceof Element ? window.getComputedStyle(b).getPropertyValue("font-family") : window.jQuery ? $(b).css("font-family") : "").split(",");
			for (var c = b.shift(); c;) {
				for (var c = c.replace(/^\s*['"]?\s*([^'"]*)\s*['"]?\s*$/, "$1"), e = 0; e < d.length; e++)
					if (c == d[e]) return c;
				if (this.isFontLoaded(c)) return c;
				c = b.shift()
			}
			return null
		}
	}
}();
var MobileAdInGamePreroll = { 
};
var MobileAdInGameHeader = { 
};
var MobileAdInGameFooter = { 
};
var MobileAdInGameEnd = { 
};
! function(b, c) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = b.document ? c(b, !0) : function(b) {
		if (!b.document) throw Error("jQuery requires a window with a document");
		return c(b)
	} : c(b)
}("undefined" != typeof window ? window : this, function(b, c) {
	function d(b, c) {
		c = c || Y;
		var d = c.createElement("script");
		d.text = b;
		c.head.appendChild(d).parentNode.removeChild(d)
	}

	function e(b) {
		var c = !!b && "length" in b && b.length,
			d = p.type(b);
		return "function" !== d && !p.isWindow(b) && ("array" === d || 0 === c || "number" == typeof c && 0 < c && c - 1 in b)
	}

	function f(b, c) {
		return b.nodeName && b.nodeName.toLowerCase() === c.toLowerCase()
	}

	function g(b, c, d) {
		return p.isFunction(c) ? p.grep(b, function(b, ka) {
			return !!c.call(b, ka, b) !== d
		}) : c.nodeType ? p.grep(b, function(b) {
			return b === c !== d
		}) : "string" != typeof c ? p.grep(b, function(b) {
			return -1 < Ja.call(c, b) !== d
		}) : Hc.test(c) ? p.filter(c, b, d) : (c = p.filter(c, b), p.grep(b, function(b) {
			return -1 < Ja.call(c, b) !== d && 1 === b.nodeType
		}))
	}

	function m(b, c) {
		for (;
			(b = b[c]) && 1 !== b.nodeType;);
		return b
	}

	function l(b) {
		return b
	}

	function j(b) {
		throw b;
	}

	function q(b, c, d, e) {
		var j;
		try {
			b && p.isFunction(j = b.promise) ? j.call(b).done(c).fail(d) : b && p.isFunction(j = b.then) ? j.call(b, c, d) : c.apply(void 0, [b].slice(e))
		} catch (n) {
			d.apply(void 0, [n])
		}
	}

	function z() {
		Y.removeEventListener("DOMContentLoaded", z);
		b.removeEventListener("load", z);
		p.ready()
	}

	function y() {
		this.expando = p.expando + y.uid++
	}

	function A(b, c, d) {
		var e;
		if (void 0 === d && 1 === b.nodeType)
			if (e = "data-" + c.replace(Ic, "-$&").toLowerCase(), d = b.getAttribute(e), "string" == typeof d) {
				try {
					d = "true" === d || "false" !== d && ("null" === d ? null : d === +d + "" ? +d : Jc.test(d) ? JSON.parse(d) : d)
				} catch (j) {}
				pa.set(b, c, d)
			} else d = void 0;
		return d
	}

	function B(b, c, d, e) {
		var j, n = 1,
			f = 20,
			x = e ? function() {
				return e.cur()
			} : function() {
				return p.css(b, c, "")
			},
			g = x(),
			l = d && d[3] || (p.cssNumber[c] ? "" : "px"),
			u = (p.cssNumber[c] || "px" !== l && +g) && nb.exec(p.css(b, c));
		if (u && u[3] !== l) {
			l = l || u[3];
			d = d || [];
			u = +g || 1;
			do n = n || ".5", u /= n, p.style(b, c, u + l); while (n !== (n = x() / g) && 1 !== n && --f)
		}
		return d && (u = +u || +g || 0, j = d[1] ? u + (d[1] + 1) * d[2] : +d[2], e && (e.unit = l, e.start = u, e.end = j)), j
	}

	function E(b, c) {
		for (var d, e, j = [], n = 0, f = b.length; n < f; n++)
			if (e = b[n], e.style)
				if (d = e.style.display, c) {
					if ("none" === d && (j[n] = T.get(e, "display") || null, j[n] || (e.style.display = "")), "" === e.style.display && Bb(e)) {
						d = j;
						var x = n,
							g, l = void 0;
						g = e.ownerDocument;
						var u = e.nodeName;
						g = (e = Zb[u]) ? e : (l = g.body.appendChild(g.createElement(u)), e = p.css(l, "display"), l.parentNode.removeChild(l), "none" === e && (e = "block"), Zb[u] = e, e);
						d[x] = g
					}
				} else "none" !== d && (j[n] = "none", T.set(e, "display", d));
		for (n = 0; n < f; n++) null != j[n] && (b[n].style.display = j[n]);
		return b
	}

	function F(b, c) {
		var d;
		return d = "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(c || "*") : "undefined" != typeof b.querySelectorAll ? b.querySelectorAll(c || "*") : [], void 0 === c || c && f(b, c) ? p.merge([b], d) : d
	}

	function s(b, c) {
		for (var d = 0, e = b.length; d < e; d++) T.set(b[d], "globalEval", !c || T.get(c[d], "globalEval"))
	}

	function I(b, c, d, e, j) {
		for (var n, f, x, g, l = c.createDocumentFragment(), u = [], r = 0, M = b.length; r < M; r++)
			if (n = b[r], n || 0 === n)
				if ("object" === p.type(n)) p.merge(u, n.nodeType ? [n] : n);
				else if (Kc.test(n)) {
			f = f || l.appendChild(c.createElement("div"));
			x = ($b.exec(n) || ["", ""])[1].toLowerCase();
			x = sa[x] || sa._default;
			f.innerHTML = x[1] + p.htmlPrefilter(n) + x[2];
			for (x = x[0]; x--;) f = f.lastChild;
			p.merge(u, f.childNodes);
			f = l.firstChild;
			f.textContent = ""
		} else u.push(c.createTextNode(n));
		l.textContent = "";
		for (r = 0; n = u[r++];)
			if (e && -1 < p.inArray(n, e)) j && j.push(n);
			else if (g = p.contains(n.ownerDocument, n), f = F(l.appendChild(n), "script"), g && s(f), d)
			for (x = 0; n = f[x++];) ac.test(n.type || "") && d.push(n);
		return l
	}

	function G() {
		return !0
	}

	function C() {
		return !1
	}

	function H() {
		try {
			return Y.activeElement
		} catch (b) {}
	}

	function R(b, c, d, e, j, n) {
		var f, x;
		if ("object" == typeof c) {
			"string" != typeof d && (e = e || d, d = void 0);
			for (x in c) R(b, x, d, e, c[x], n);
			return b
		}
		if (null == e && null == j ? (j = d, e = d = void 0) : null == j && ("string" == typeof d ? (j = e, e = void 0) : (j = e, e = d, d = void 0)), !1 === j) j = C;
		else if (!j) return b;
		return 1 === n && (f = j, j = function(b) {
			return p().off(b), f.apply(this, arguments)
		}, j.guid = f.guid || (f.guid = p.guid++)), b.each(function() {
			p.event.add(this, c, j, e, d)
		})
	}

	function K(b, c) {
		return f(b, "table") && f(11 !== c.nodeType ? c : c.firstChild, "tr") ? p(">tbody", b)[0] || b : b
	}

	function fa(b) {
		return b.type = (null !== b.getAttribute("type")) + "/" + b.type, b
	}

	function O(b) {
		var c = Lc.exec(b.type);
		return c ? b.type = c[1] : b.removeAttribute("type"), b
	}

	function P(b, c) {
		var d, e, j, n, f, x;
		if (1 === c.nodeType) {
			if (T.hasData(b) && (d = T.access(b), e = T.set(c, d), x = d.events))
				for (j in delete e.handle, e.events = {}, x) {
					d = 0;
					for (e = x[j].length; d < e; d++) p.event.add(c, j, x[j][d])
				}
			pa.hasData(b) && (n = pa.access(b), f = p.extend({}, n), pa.set(c, f))
		}
	}

	function ba(b, c, e, j) {
		c = bb.apply([], c);
		var n, f, x, g, l = 0,
			u = b.length,
			r = u - 1,
			M = c[0],
			q = p.isFunction(M);
		if (q || 1 < u && "string" == typeof M && !da.checkClone && Mc.test(M)) return b.each(function(d) {
			var n = b.eq(d);
			q && (c[0] = M.call(this, d, n.html()));
			ba(n, c, e, j)
		});
		if (u && (n = I(c, b[0].ownerDocument, !1, b, j), f = n.firstChild, 1 === n.childNodes.length && (n = f), f || j)) {
			f = p.map(F(n, "script"), fa);
			for (x = f.length; l < u; l++) g = n, l !== r && (g = p.clone(g, !0, !0), x && p.merge(f, F(g, "script"))), e.call(b[l], g, l);
			if (x) {
				n = f[f.length - 1].ownerDocument;
				p.map(f, O);
				for (l = 0; l < x; l++) g = f[l], ac.test(g.type || "") && !T.access(g, "globalEval") && p.contains(n, g) && (g.src ? p._evalUrl && p._evalUrl(g.src) : d(g.textContent.replace(Oc, ""), n))
			}
		}
		return b
	}

	function V(b, c, d) {
		for (var e = c ? p.filter(c, b) : b, j = 0; null != (c = e[j]); j++) d || 1 !== c.nodeType || p.cleanData(F(c)), c.parentNode && (d && p.contains(c.ownerDocument, c) && s(F(c, "script")), c.parentNode.removeChild(c));
		return b
	}

	function r(b, c, d) {
		var e, j, n, f, x = b.style;
		return d = d || Cb(b), d && (f = d.getPropertyValue(c) || d[c], "" !== f || p.contains(b.ownerDocument, b) || (f = p.style(b, c)), !da.pixelMarginRight() && Rb.test(f) && bc.test(c) && (e = x.width, j = x.minWidth, n = x.maxWidth, x.minWidth = x.maxWidth = x.width = f, f = d.width, x.width = e, x.minWidth = j, x.maxWidth = n)), void 0 !== f ? f + "" : f
	}

	function t(b, c) {
		return {
			get: function() {
				return b() ? void delete this.get : (this.get = c).apply(this, arguments)
			}
		}
	}

	function J(b) {
		var c = p.cssProps[b];
		if (!c) {
			var c = p.cssProps,
				d;
			a: if (d = b, !(d in cc)) {
				for (var e = d[0].toUpperCase() + d.slice(1), j = dc.length; j--;)
					if (d = dc[j] + e, d in cc) break a;
				d = void 0
			}
			c = c[b] = d || b
		}
		return c
	}

	function D(b, c, d) {
		return (b = nb.exec(c)) ? Math.max(0, b[2] - (d || 0)) + (b[3] || "px") : c
	}

	function N(b, c, d, e, j) {
		var n = 0;
		for (c = d === (e ? "border" : "content") ? 4 : "width" === c ? 1 : 0; 4 > c; c += 2) "margin" === d && (n += p.css(b, d + Ta[c], !0, j)), e ? ("content" === d && (n -= p.css(b, "padding" + Ta[c], !0, j)), "margin" !== d && (n -= p.css(b, "border" + Ta[c] + "Width", !0, j))) : (n += p.css(b, "padding" + Ta[c], !0, j), "padding" !== d && (n += p.css(b, "border" + Ta[c] + "Width", !0, j)));
		return n
	}

	function aa(b, c, d) {
		var e, j = Cb(b),
			n = r(b, c, j),
			f = "border-box" === p.css(b, "boxSizing", !1, j);
		return Rb.test(n) ? n : (e = f && (da.boxSizingReliable() || n === b.style[c]), "auto" === n && (n = b["offset" + c[0].toUpperCase() + c.slice(1)]), n = parseFloat(n) || 0, n + N(b, c, d || (f ? "border" : "content"), e, j) + "px")
	}

	function Q(b, c, d, e, j) {
		return new Q.prototype.init(b, c, d, e, j)
	}

	function n() {
		Db && (!1 === Y.hidden && b.requestAnimationFrame ? b.requestAnimationFrame(n) : b.setTimeout(n, p.fx.interval), p.fx.tick())
	}

	function u() {
		return b.setTimeout(function() {
			cb = void 0
		}), cb = p.now()
	}

	function L(b, c) {
		var d, e = 0,
			j = {
				height: b
			};
		for (c = c ? 1 : 0; 4 > e; e += 2 - c) d = Ta[e], j["margin" + d] = j["padding" + d] = b;
		return c && (j.opacity = j.width = b), j
	}

	function x(b, c, d) {
		for (var e, j = (M.tweeners[c] || []).concat(M.tweeners["*"]), n = 0, f = j.length; n < f; n++)
			if (e = j[n].call(d, c, b)) return e
	}

	function M(b, c, d) {
		var e, j, n = 0,
			f = M.prefilters.length,
			g = p.Deferred().always(function() {
				delete l.elem
			}),
			l = function() {
				if (j) return !1;
				for (var c = cb || u(), c = Math.max(0, r.startTime + r.duration - c), d = 1 - (c / r.duration || 0), e = 0, n = r.tweens.length; e < n; e++) r.tweens[e].run(d);
				return g.notifyWith(b, [r, d, c]), 1 > d && n ? c : (n || g.notifyWith(b, [r, 1, 0]), g.resolveWith(b, [r]), !1)
			},
			r = g.promise({
				elem: b,
				props: p.extend({}, c),
				opts: p.extend(!0, {
					specialEasing: {},
					easing: p.easing._default
				}, d),
				originalProperties: c,
				originalOptions: d,
				startTime: cb || u(),
				duration: d.duration,
				tweens: [],
				createTween: function(c, d) {
					var e = p.Tween(b, r.opts, c, d, r.opts.specialEasing[c] || r.opts.easing);
					return r.tweens.push(e), e
				},
				stop: function(c) {
					var d = 0,
						e = c ? r.tweens.length : 0;
					if (j) return this;
					for (j = !0; d < e; d++) r.tweens[d].run(1);
					return c ? (g.notifyWith(b, [r, 1, 0]), g.resolveWith(b, [r, c])) : g.rejectWith(b, [r, c]), this
				}
			});
		c = r.props;
		d = r.opts.specialEasing;
		var q, t, D, W;
		for (e in c)
			if (q = p.camelCase(e), t = d[q], D = c[e], Array.isArray(D) && (t = D[1], D = c[e] = D[0]), e !== q && (c[q] = D, delete c[e]), W = p.cssHooks[q], W && "expand" in W)
				for (e in D = W.expand(D), delete c[q], D) e in c || (c[e] = D[e], d[e] = t);
			else d[q] = t;
		for (; n < f; n++)
			if (e = M.prefilters[n].call(r, b, c, r.opts)) return p.isFunction(e.stop) && (p._queueHooks(r.elem, r.opts.queue).stop = p.proxy(e.stop, e)), e;
		return p.map(c, x, r), p.isFunction(r.opts.start) && r.opts.start.call(b, r), r.progress(r.opts.progress).done(r.opts.done, r.opts.complete).fail(r.opts.fail).always(r.opts.always), p.fx.timer(p.extend(l, {
			elem: b,
			anim: r,
			queue: r.opts.queue
		})), r
	}

	function W(b) {
		return (b.match(ta) || []).join(" ")
	}

	function S(b) {
		return b.getAttribute && b.getAttribute("class") || ""
	}

	function ha(b, c, d, e) {
		var j;
		if (Array.isArray(c)) p.each(c, function(c, j) {
			d || Pc.test(b) ? e(b, j) : ha(b + "[" + ("object" == typeof j && null != j ? c : "") + "]", j, d, e)
		});
		else if (d || "object" !== p.type(c)) e(b, c);
		else
			for (j in c) ha(b +
				"[" + j + "]", c[j], d, e)
	}

	function na(b) {
		return function(c, d) {
			"string" != typeof c && (d = c, c = "*");
			var e, j = 0,
				n = c.toLowerCase().match(ta) || [];
			if (p.isFunction(d))
				for (; e = n[j++];) "+" === e[0] ? (e = e.slice(1) || "*", (b[e] = b[e] || []).unshift(d)) : (b[e] = b[e] || []).push(d)
		}
	}

	function Ka(b, c, d, e) {
		function j(x) {
			var g;
			return n[x] = !0, p.each(b[x] || [], function(b, ka) {
				var x = ka(c, d, e);
				return "string" != typeof x || f || n[x] ? f ? !(g = x) : void 0 : (c.dataTypes.unshift(x), j(x), !1)
			}), g
		}
		var n = {},
			f = b === Sb;
		return j(c.dataTypes[0]) || !n["*"] && j("*")
	}

	function qa(b, c) {
		var d, e, j = p.ajaxSettings.flatOptions || {};
		for (d in c) void 0 !== c[d] && ((j[d] ? b : e || (e = {}))[d] = c[d]);
		return e && p.extend(!0, b, e), b
	}
	var Ba = [],
		Y = b.document,
		Eb = Object.getPrototypeOf,
		xa = Ba.slice,
		bb = Ba.concat,
		db = Ba.push,
		Ja = Ba.indexOf,
		La = {},
		eb = La.toString,
		Ma = La.hasOwnProperty,
		ob = Ma.toString,
		pb = ob.call(Object),
		da = {},
		p = function(b, c) {
			return new p.fn.init(b, c)
		},
		qb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		Fb = /^-ms-/,
		Gb = /-([a-z])/g,
		rb = function(b, c) {
			return c.toUpperCase()
		};
	p.fn = p.prototype = {
		jquery: "3.2.1",
		constructor: p,
		length: 0,
		toArray: function() {
			return xa.call(this)
		},
		get: function(b) {
			return null == b ? xa.call(this) : 0 > b ? this[b + this.length] : this[b]
		},
		pushStack: function(b) {
			b = p.merge(this.constructor(), b);
			return b.prevObject = this, b
		},
		each: function(b) {
			return p.each(this, b)
		},
		map: function(b) {
			return this.pushStack(p.map(this, function(c, d) {
				return b.call(c, d, c)
			}))
		},
		slice: function() {
			return this.pushStack(xa.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(b) {
			var c = this.length;
			b = +b + (0 > b ? c : 0);
			return this.pushStack(0 <= b && b < c ? [this[b]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor()
		},
		push: db,
		sort: Ba.sort,
		splice: Ba.splice
	};
	p.extend = p.fn.extend = function() {
		var b, c, d, e, j, n, f = arguments[0] || {},
			x = 1,
			g = arguments.length,
			l = !1;
		"boolean" == typeof f && (l = f, f = arguments[x] || {}, x++);
		"object" == typeof f || p.isFunction(f) || (f = {});
		for (x === g && (f = this, x--); x < g; x++)
			if (null != (b = arguments[x]))
				for (c in b) d = f[c], e = b[c], f !== e && (l && e && (p.isPlainObject(e) || (j = Array.isArray(e))) ? (j ? (j = !1, n = d && Array.isArray(d) ? d : []) : n = d && p.isPlainObject(d) ? d : {}, f[c] = p.extend(l, n, e)) : void 0 !== e && (f[c] = e));
		return f
	};
	p.extend({
		expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(b) {
			throw Error(b);
		},
		noop: function() {},
		isFunction: function(b) {
			return "function" === p.type(b)
		},
		isWindow: function(b) {
			return null != b && b === b.window
		},
		isNumeric: function(b) {
			var c = p.type(b);
			return ("number" === c || "string" === c) && !isNaN(b - parseFloat(b))
		},
		isPlainObject: function(b) {
			var c, d;
			return !(!b || "[object Object]" !== eb.call(b)) && (!(c = Eb(b)) || (d = Ma.call(c, "constructor") && c.constructor, "function" == typeof d && ob.call(d) === pb))
		},
		isEmptyObject: function(b) {
			for (var c in b) return !1;
			return !0
		},
		type: function(b) {
			return null == b ? b + "" : "object" == typeof b || "function" == typeof b ? La[eb.call(b)] || "object" : typeof b
		},
		globalEval: function(b) {
			d(b)
		},
		camelCase: function(b) {
			return b.replace(Fb, "ms-").replace(Gb, rb)
		},
		each: function(b, c) {
			var d, j = 0;
			if (e(b))
				for (d = b.length; j < d && !1 !== c.call(b[j], j, b[j]); j++);
			else
				for (j in b)
					if (!1 === c.call(b[j], j, b[j])) break;
			return b
		},
		trim: function(b) {
			return null == b ? "" : (b + "").replace(qb, "")
		},
		makeArray: function(b, c) {
			var d = c || [];
			return null != b && (e(Object(b)) ? p.merge(d, "string" == typeof b ? [b] : b) : db.call(d, b)), d
		},
		inArray: function(b, c, d) {
			return null == c ? -1 : Ja.call(c, b, d)
		},
		merge: function(b, c) {
			for (var d = +c.length, e = 0, j = b.length; e < d; e++) b[j++] = c[e];
			return b.length = j, b
		},
		grep: function(b, c, d) {
			for (var e = [], j = 0, n = b.length, f = !d; j < n; j++) d = !c(b[j], j), d !== f && e.push(b[j]);
			return e
		},
		map: function(b, c, d) {
			var j, n, f = 0,
				x = [];
			if (e(b))
				for (j = b.length; f < j; f++) n = c(b[f], f, d), null != n && x.push(n);
			else
				for (f in b) n = c(b[f], f, d), null != n && x.push(n);
			return bb.apply([], x)
		},
		guid: 1,
		proxy: function(b, c) {
			var d, e, j;
			if ("string" == typeof c && (d = b[c], c = b, b = d), p.isFunction(b)) return e = xa.call(arguments, 2), j = function() {
				return b.apply(c || this, e.concat(xa.call(arguments)))
			}, j.guid = b.guid = b.guid || p.guid++, j
		},
		now: Date.now,
		support: da
	});
	"function" == typeof Symbol && (p.fn[Symbol.iterator] = Ba[Symbol.iterator]);
	p.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(b, c) {
		La["[object " + c + "]"] = c.toLowerCase()
	});
	var ya, fb = b,
		ca = function(b, c, d, e) {
			var j, n, f, x, g, l = c && c.ownerDocument,
				r = c ? c.nodeType : 9;
			if (d = d || [], "string" != typeof b || !b || 1 !== r && 9 !== r && 11 !== r) return d;
			if (!e && ((c ? c.ownerDocument || c : ua) !== Z && va(c), c = c || Z, la)) {
				if (11 !== r && (x = Qc.exec(b)))
					if (j = x[1])
						if (9 === r) {
							if (!(n = c.getElementById(j))) return d;
							if (n.id === j) return d.push(n), d
						} else {
							if (l && (n = l.getElementById(j)) && sb(c, n) && n.id === j) return d.push(n), d
						}
				else {
					if (x[2]) return Na.apply(d, c.getElementsByTagName(b)), d;
					if ((j = x[3]) && ea.getElementsByClassName && c.getElementsByClassName) return Na.apply(d, c.getElementsByClassName(j)), d
				}
				if (ea.qsa && !Hb[b + " "] && (!ja || !ja.test(b))) {
					if (1 !== r) l = c, g = b;
					else if ("object" !== c.nodeName.toLowerCase()) {
						(f = c.getAttribute("id")) ? f = f.replace(ec, fc): c.setAttribute("id", f = ia);
						n = Oa(b);
						for (j = n.length; j--;) n[j] = "#" + f + " " + Ua(n[j]);
						g = n.join(",");
						l = Tb.test(b) && gb(c.parentNode) || c
					}
					if (g) try {
						return Na.apply(d, l.querySelectorAll(g)), d
					} catch (u) {} finally {
						f === ia && c.removeAttribute("id")
					}
				}
			}
			return hb(b.replace(Ib, "$1"), c, d, e)
		},
		ib = function() {
			function b(d, e) {
				return c.push(d + " ") > X.cacheLength && delete b[c.shift()], b[d + " "] = e
			}
			var c = [];
			return b
		},
		oa = function(b) {
			return b[ia] = !0, b
		},
		ra = function(b) {
			var c = Z.createElement("fieldset");
			try {
				return !!b(c)
			} catch (d) {
				return !1
			} finally {
				c.parentNode && c.parentNode.removeChild(c)
			}
		},
		jb = function(b, c) {
			for (var d = b.split("|"), e = d.length; e--;) X.attrHandle[d[e]] = c
		},
		tb = function(b, c) {
			var d = c && b,
				e = d && 1 === b.nodeType && 1 === c.nodeType && b.sourceIndex - c.sourceIndex;
			if (e) return e;
			if (d)
				for (; d = d.nextSibling;)
					if (d === c) return -1;
			return b ? 1 : -1
		},
		ub = function(b) {
			return function(c) {
				return "input" === c.nodeName.toLowerCase() && c.type === b
			}
		},
		Jb = function(b) {
			return function(c) {
				var d = c.nodeName.toLowerCase();
				return ("input" === d || "button" === d) && c.type === b
			}
		},
		vb = function(b) {
			return function(c) {
				return "form" in c ? c.parentNode && !1 === c.disabled ? "label" in c ? "label" in c.parentNode ? c.parentNode.disabled === b : c.disabled === b : c.isDisabled === b || c.isDisabled !== !b && Rc(c) === b : c.disabled === b : "label" in c && c.disabled === b
			}
		},
		Ca = function(b) {
			return oa(function(c) {
				return c = +c, oa(function(d, e) {
					for (var j, n = b([], d.length, c), f = n.length; f--;) d[j = n[f]] && (d[j] = !(e[j] = d[j]))
				})
			})
		},
		gb = function(b) {
			return b && "undefined" != typeof b.getElementsByTagName && b
		},
		wb = function() {},
		Ua = function(b) {
			for (var c = 0, d = b.length, e = ""; c < d; c++) e += b[c].value;
			return e
		},
		Va = function(b, c, d) {
			var e = c.dir,
				j = c.next,
				n = j || e,
				f = d && "parentNode" === n,
				x = Sc++;
			return c.first ? function(c, d, j) {
				for (; c = c[e];)
					if (1 === c.nodeType || f) return b(c, d, j);
				return !1
			} : function(c, d, g) {
				var l, r, u, U = [Da, x];
				if (g)
					for (; c = c[e];) {
						if ((1 === c.nodeType || f) && b(c, d, g)) return !0
					} else
						for (; c = c[e];)
							if (1 === c.nodeType || f)
								if (u = c[ia] || (c[ia] = {}), r = u[c.uniqueID] || (u[c.uniqueID] = {}), j && j === c.nodeName.toLowerCase()) c = c[e] || c;
								else {
									if ((l = r[n]) && l[0] === Da && l[1] === x) return U[2] = l[2];
									if (r[n] = U, U[2] = b(c, d, g)) return !0
								}
				return !1
			}
		},
		Wa = function(b) {
			return 1 < b.length ? function(c, d, e) {
				for (var j = b.length; j--;)
					if (!b[j](c, d, e)) return !1;
				return !0
			} : b[0]
		},
		Pa = function(b, c, d, e, j) {
			for (var n, f = [], x = 0, g = b.length, l = null != c; x < g; x++)(n = b[x]) && (d && !d(n, e, j) || (f.push(n), l && c.push(x)));
			return f
		},
		Xa = function(b, c, d, e, j, n) {
			return e && !e[ia] && (e = Xa(e)), j && !j[ia] && (j = Xa(j, n)), oa(function(n, f, x, g) {
				var l, r, u = [],
					M = [],
					q = f.length,
					p;
				if (!(p = n)) {
					p = c || "*";
					for (var t = x.nodeType ? [x] : x, D = [], W = 0, L = t.length; W < L; W++) ca(p, t[W], D);
					p = D
				}
				p = !b || !n && c ? p : Pa(p, u, b, x, g);
				t = d ? j || (n ? b : q || e) ? [] : f : p;
				if (d && d(p, t, x, g), e) {
					l = Pa(t, M);
					e(l, [], x, g);
					for (x = l.length; x--;)(r = l[x]) && (t[M[x]] = !(p[M[x]] = r))
				}
				if (n) {
					if (j || b) {
						if (j) {
							l = [];
							for (x = t.length; x--;)(r = t[x]) && l.push(p[x] = r);
							j(null, t = [], l, g)
						}
						for (x = t.length; x--;)(r = t[x]) && -1 < (l = j ? Ya(n, r) : u[x]) && (n[l] = !(f[l] = r))
					}
				} else t = Pa(t === f ? t.splice(q, t.length) : t), j ? j(null, f, t, g) : Na.apply(f, t)
			})
		},
		Za = function(b) {
			var c, d, e, j = b.length,
				n = X.relative[b[0].type];
			d = n || X.relative[" "];
			for (var f = n ? 1 : 0, x = Va(function(b) {
					return b === c
				}, d, !0), g = Va(function(b) {
					return -1 < Ya(c, b)
				}, d, !0), l = [function(b, d, e) {
					b = !n && (e || d !== Qa) || ((c = d).nodeType ? x(b, d, e) : g(b, d, e));
					return c = null, b
				}]; f < j; f++)
				if (d = X.relative[b[f].type]) l = [Va(Wa(l), d)];
				else {
					if (d = X.filter[b[f].type].apply(null, b[f].matches), d[ia]) {
						for (e = ++f; e < j && !X.relative[b[e].type]; e++);
						return Xa(1 < f && Wa(l), 1 < f && Ua(b.slice(0, f - 1).concat({
							value: " " === b[f - 2].type ? "*" : ""
						})).replace(Ib, "$1"), d, f < e && Za(b.slice(f, e)), e < j && Za(b = b.slice(e)), e < j && Ua(b))
					}
					l.push(d)
				}
			return Wa(l)
		},
		Ea, ea, X, Ra, kb, Oa, $a, hb, Qa, wa, Fa, va, Z, ma, la, ja, za, Sa, sb, ia = "sizzle" + 1 * new Date,
		ua = fb.document,
		Da = 0,
		Sc = 0,
		gc = ib(),
		hc = ib(),
		Hb = ib(),
		Ub = function(b, c) {
			return b === c && (Fa = !0), 0
		},
		Tc = {}.hasOwnProperty,
		ab = [],
		Uc = ab.pop,
		Vc = ab.push,
		Na = ab.push,
		ic = ab.slice,
		Ya = function(b, c) {
			for (var d = 0, e = b.length; d < e; d++)
				if (b[d] === c) return d;
			return -1
		},
		Wc = /[\x20\t\r\n\f]+/g,
		Ib = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
		Xc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
		Yc = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
		Zc = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,
		$c = RegExp(":((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"),
		ad = /^(?:\\.|[\w-]|[^\x00-\xa0])+$/,
		Kb = {
			ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
			CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
			TAG: /^((?:\\.|[\w-]|[^\x00-\xa0])+|[*])/,
			ATTR: RegExp("^\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\]"),
			PSEUDO: RegExp("^:((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"),
			CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
			bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"),
			needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
		},
		bd = /^(?:input|select|textarea|button)$/i,
		cd = /^h\d$/i,
		xb = /^[^{]+\{\s*\[native \w/,
		Qc = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		Tb = /[+~]/,
		Ga = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig,
		Ha = function(b, c, d) {
			b = "0x" + c - 65536;
			return b !== b || d ? c : 0 > b ? String.fromCharCode(b + 65536) : String.fromCharCode(b >> 10 | 55296, 1023 & b | 56320)
		},
		ec = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fc = function(b, c) {
			return c ? "\x00" === b ? "\ufffd" : b.slice(0, -1) + "\\" + b.charCodeAt(b.length - 1).toString(16) + " " : "\\" + b
		},
		jc = function() {
			va()
		},
		Rc = Va(function(b) {
			return !0 === b.disabled && ("form" in b || "label" in b)
		}, {
			dir: "parentNode",
			next: "legend"
		});
	try {
		Na.apply(ab = ic.call(ua.childNodes), ua.childNodes), ab[ua.childNodes.length].nodeType
	} catch (Fd) {
		Na = {
			apply: ab.length ? function(b, c) {
				Vc.apply(b, ic.call(c))
			} : function(b, c) {
				for (var d = b.length, e = 0; b[d++] = c[e++];);
				b.length = d - 1
			}
		}
	}
	ea = ca.support = {};
	kb = ca.isXML = function(b) {
		b = b && (b.ownerDocument || b).documentElement;
		return !!b && "HTML" !== b.nodeName
	};
	va = ca.setDocument = function(b) {
		var c, d;
		b = b ? b.ownerDocument || b : ua;
		return b !== Z && 9 === b.nodeType && b.documentElement ? (Z = b, ma = Z.documentElement, la = !kb(Z), ua !== Z && (d = Z.defaultView) && d.top !== d && (d.addEventListener ? d.addEventListener("unload", jc, !1) : d.attachEvent && d.attachEvent("onunload", jc)), ea.attributes = ra(function(b) {
			return b.className = "i", !b.getAttribute("className")
		}), ea.getElementsByTagName = ra(function(b) {
			return b.appendChild(Z.createComment("")), !b.getElementsByTagName("*").length
		}), ea.getElementsByClassName = xb.test(Z.getElementsByClassName), ea.getById = ra(function(b) {
			return ma.appendChild(b).id = ia, !Z.getElementsByName || !Z.getElementsByName(ia).length
		}), ea.getById ? (X.filter.ID = function(b) {
			var c = b.replace(Ga, Ha);
			return function(b) {
				return b.getAttribute("id") === c
			}
		}, X.find.ID = function(b, c) {
			if ("undefined" != typeof c.getElementById && la) {
				var d = c.getElementById(b);
				return d ? [d] : []
			}
		}) : (X.filter.ID = function(b) {
			var c = b.replace(Ga, Ha);
			return function(b) {
				return (b = "undefined" != typeof b.getAttributeNode && b.getAttributeNode("id")) && b.value === c
			}
		}, X.find.ID = function(b, c) {
			if ("undefined" != typeof c.getElementById && la) {
				var d, e, j, n = c.getElementById(b);
				if (n) {
					if (d = n.getAttributeNode("id"), d && d.value === b) return [n];
					j = c.getElementsByName(b);
					for (e = 0; n = j[e++];)
						if (d = n.getAttributeNode("id"), d && d.value === b) return [n]
				}
				return []
			}
		}), X.find.TAG = ea.getElementsByTagName ? function(b, c) {
			return "undefined" != typeof c.getElementsByTagName ? c.getElementsByTagName(b) : ea.qsa ? c.querySelectorAll(b) : void 0
		} : function(b, c) {
			var d, e = [],
				j = 0,
				n = c.getElementsByTagName(b);
			if ("*" === b) {
				for (; d = n[j++];) 1 === d.nodeType && e.push(d);
				return e
			}
			return n
		}, X.find.CLASS = ea.getElementsByClassName && function(b, c) {
			if ("undefined" != typeof c.getElementsByClassName && la) return c.getElementsByClassName(b)
		}, za = [], ja = [], (ea.qsa = xb.test(Z.querySelectorAll)) && (ra(function(b) {
			ma.appendChild(b).innerHTML = "<a id='" + ia + "'></a><select id='" + ia + "-\r\\' msallowcapture=''><option selected=''></option></select>";
			b.querySelectorAll("[msallowcapture^='']").length && ja.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
			b.querySelectorAll("[selected]").length || ja.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
			b.querySelectorAll("[id~=" + ia + "-]").length || ja.push("~=");
			b.querySelectorAll(":checked").length || ja.push(":checked");
			b.querySelectorAll("a#" + ia + "+*").length || ja.push(".#.+[+~]")
		}), ra(function(b) {
			b.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
			var c = Z.createElement("input");
			c.setAttribute("type", "hidden");
			b.appendChild(c).setAttribute("name", "D");
			b.querySelectorAll("[name=d]").length && ja.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
			2 !== b.querySelectorAll(":enabled").length && ja.push(":enabled", ":disabled");
			ma.appendChild(b).disabled = !0;
			2 !== b.querySelectorAll(":disabled").length && ja.push(":enabled", ":disabled");
			b.querySelectorAll("*,:x");
			ja.push(",.*:")
		})), (ea.matchesSelector = xb.test(Sa = ma.matches || ma.webkitMatchesSelector || ma.mozMatchesSelector || ma.oMatchesSelector || ma.msMatchesSelector)) && ra(function(b) {
			ea.disconnectedMatch = Sa.call(b, "*");
			Sa.call(b, "[s!='']:x");
			za.push("!=", ":((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)")
		}), ja = ja.length && RegExp(ja.join("|")), za = za.length && RegExp(za.join("|")), c = xb.test(ma.compareDocumentPosition), sb = c || xb.test(ma.contains) ? function(b, c) {
			var d = 9 === b.nodeType ? b.documentElement : b,
				e = c && c.parentNode;
			return b === e || !(!e || 1 !== e.nodeType || !(d.contains ? d.contains(e) : b.compareDocumentPosition && 16 & b.compareDocumentPosition(e)))
		} : function(b, c) {
			if (c)
				for (; c = c.parentNode;)
					if (c === b) return !0;
			return !1
		}, Ub = c ? function(b, c) {
			if (b === c) return Fa = !0, 0;
			var d = !b.compareDocumentPosition - !c.compareDocumentPosition;
			return d ? d : (d = (b.ownerDocument || b) === (c.ownerDocument || c) ? b.compareDocumentPosition(c) : 1, 1 & d || !ea.sortDetached && c.compareDocumentPosition(b) === d ? b === Z || b.ownerDocument === ua && sb(ua, b) ? -1 : c === Z || c.ownerDocument === ua && sb(ua, c) ? 1 : wa ? Ya(wa, b) - Ya(wa, c) : 0 : 4 & d ? -1 : 1)
		} : function(b, c) {
			if (b === c) return Fa = !0, 0;
			var d, e = 0;
			d = b.parentNode;
			var j = c.parentNode,
				n = [b],
				ka = [c];
			if (!d || !j) return b === Z ? -1 : c === Z ? 1 : d ? -1 : j ? 1 : wa ? Ya(wa, b) - Ya(wa, c) : 0;
			if (d === j) return tb(b, c);
			for (d = b; d = d.parentNode;) n.unshift(d);
			for (d = c; d = d.parentNode;) ka.unshift(d);
			for (; n[e] === ka[e];) e++;
			return e ? tb(n[e], ka[e]) : n[e] === ua ? -1 : ka[e] === ua ? 1 : 0
		}, Z) : Z
	};
	ca.matches = function(b, c) {
		return ca(b, null, null, c)
	};
	ca.matchesSelector = function(b, c) {
		if ((b.ownerDocument || b) !== Z && va(b), c = c.replace(Zc, "='$1']"), ea.matchesSelector && la && !Hb[c + " "] && (!za || !za.test(c)) && (!ja || !ja.test(c))) try {
			var d = Sa.call(b, c);
			if (d || ea.disconnectedMatch || b.document && 11 !== b.document.nodeType) return d
		} catch (e) {}
		return 0 < ca(c, Z, null, [b]).length
	};
	ca.contains = function(b, c) {
		return (b.ownerDocument || b) !== Z && va(b), sb(b, c)
	};
	ca.attr = function(b, c) {
		(b.ownerDocument || b) !== Z && va(b);
		var d = X.attrHandle[c.toLowerCase()],
			d = d && Tc.call(X.attrHandle, c.toLowerCase()) ? d(b, c, !la) : void 0;
		return void 0 !== d ? d : ea.attributes || !la ? b.getAttribute(c) : (d = b.getAttributeNode(c)) && d.specified ? d.value : null
	};
	ca.escape = function(b) {
		return (b + "").replace(ec, fc)
	};
	ca.error = function(b) {
		throw Error("Syntax error, unrecognized expression: " + b);
	};
	ca.uniqueSort = function(b) {
		var c, d = [],
			e = 0,
			j = 0;
		if (Fa = !ea.detectDuplicates, wa = !ea.sortStable && b.slice(0), b.sort(Ub), Fa) {
			for (; c = b[j++];) c === b[j] && (e = d.push(j));
			for (; e--;) b.splice(d[e], 1)
		}
		return wa = null, b
	};
	Ra = ca.getText = function(b) {
		var c, d = "",
			e = 0;
		if (c = b.nodeType)
			if (1 === c || 9 === c || 11 === c) {
				if ("string" == typeof b.textContent) return b.textContent;
				for (b = b.firstChild; b; b = b.nextSibling) d += Ra(b)
			} else {
				if (3 === c || 4 === c) return b.nodeValue
			}
		else
			for (; c = b[e++];) d += Ra(c);
		return d
	};
	X = ca.selectors = {
		cacheLength: 50,
		createPseudo: oa,
		match: Kb,
		attrHandle: {},
		find: {},
		relative: {
			">": {
				dir: "parentNode",
				first: !0
			},
			" ": {
				dir: "parentNode"
			},
			"+": {
				dir: "previousSibling",
				first: !0
			},
			"~": {
				dir: "previousSibling"
			}
		},
		preFilter: {
			ATTR: function(b) {
				return b[1] = b[1].replace(Ga, Ha), b[3] = (b[3] || b[4] || b[5] || "").replace(Ga, Ha), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
			},
			CHILD: function(b) {
				return b[1] = b[1].toLowerCase(), "nth" === b[1].slice(0, 3) ? (b[3] || ca.error(b[0]), b[4] = +(b[4] ? b[5] + (b[6] || 1) : 2 * ("even" === b[3] || "odd" === b[3])), b[5] = +(b[7] + b[8] || "odd" === b[3])) : b[3] && ca.error(b[0]), b
			},
			PSEUDO: function(b) {
				var c, d = !b[6] && b[2];
				return Kb.CHILD.test(b[0]) ? null : (b[3] ? b[2] = b[4] || b[5] || "" : d && $c.test(d) && (c = Oa(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (b[0] = b[0].slice(0, c), b[2] = d.slice(0, c)), b.slice(0, 3))
			}
		},
		filter: {
			TAG: function(b) {
				var c = b.replace(Ga, Ha).toLowerCase();
				return "*" === b ? function() {
					return !0
				} : function(b) {
					return b.nodeName && b.nodeName.toLowerCase() === c
				}
			},
			CLASS: function(b) {
				var c = gc[b + " "];
				return c || (c = RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)")) && gc(b, function(b) {
					return c.test("string" == typeof b.className && b.className || "undefined" != typeof b.getAttribute && b.getAttribute("class") || "")
				})
			},
			ATTR: function(b, c, d) {
				return function(e) {
					e = ca.attr(e, b);
					return null == e ? "!=" === c : !c || (e += "", "=" === c ? e === d : "!=" === c ? e !== d : "^=" === c ? d && 0 === e.indexOf(d) : "*=" === c ? d && -1 < e.indexOf(d) : "$=" === c ? d && e.slice(-d.length) === d : "~=" === c ? -1 < (" " + e.replace(Wc, " ") + " ").indexOf(d) : "|=" === c && (e === d || e.slice(0, d.length + 1) === d + "-"))
				}
			},
			CHILD: function(b, c, d, e, j) {
				var n = "nth" !== b.slice(0, 3),
					f = "last" !== b.slice(-4),
					x = "of-type" === c;
				return 1 === e && 0 === j ? function(b) {
					return !!b.parentNode
				} : function(c, d, g) {
					var l, r, u, U, M, q;
					d = n !== f ? "nextSibling" : "previousSibling";
					var p = c.parentNode,
						t = x && c.nodeName.toLowerCase();
					g = !g && !x;
					var D = !1;
					if (p) {
						if (n) {
							for (; d;) {
								for (U = c; U = U[d];)
									if (x ? U.nodeName.toLowerCase() === t : 1 === U.nodeType) return !1;
								q = d = "only" === b && !q && "nextSibling"
							}
							return !0
						}
						if (q = [f ? p.firstChild : p.lastChild], f && g) {
							U = p;
							u = U[ia] || (U[ia] = {});
							r = u[U.uniqueID] || (u[U.uniqueID] = {});
							l = r[b] || [];
							D = (M = l[0] === Da && l[1]) && l[2];
							for (U = M && p.childNodes[M]; U = ++M && U && U[d] || (D = M = 0) || q.pop();)
								if (1 === U.nodeType && ++D && U === c) {
									r[b] = [Da, M, D];
									break
								}
						} else if (g && (U = c, u = U[ia] || (U[ia] = {}), r = u[U.uniqueID] || (u[U.uniqueID] = {}), l = r[b] || [], M = l[0] === Da && l[1], D = M), !1 === D)
							for (;
								(U = ++M && U && U[d] || (D = M = 0) || q.pop()) && (!(x ? U.nodeName.toLowerCase() === t : 1 === U.nodeType) || !++D || !(g && (u = U[ia] || (U[ia] = {}), r = u[U.uniqueID] || (u[U.uniqueID] = {}), r[b] = [Da, D]), U === c)););
						return D -= j, D === e || 0 === D % e && 0 <= D / e
					}
				}
			},
			PSEUDO: function(b, c) {
				var d, e = X.pseudos[b] || X.setFilters[b.toLowerCase()] || ca.error("unsupported pseudo: " + b);
				return e[ia] ? e(c) : 1 < e.length ? (d = [b, b, "", c], X.setFilters.hasOwnProperty(b.toLowerCase()) ? oa(function(b, d) {
					for (var j, n = e(b, c), f = n.length; f--;) j = Ya(b, n[f]), b[j] = !(d[j] = n[f])
				}) : function(b) {
					return e(b, 0, d)
				}) : e
			}
		},
		pseudos: {
			not: oa(function(b) {
				var c = [],
					d = [],
					e = $a(b.replace(Ib, "$1"));
				return e[ia] ? oa(function(b, c, d, j) {
					var n;
					d = e(b, null, j, []);
					for (j = b.length; j--;)(n = d[j]) && (b[j] = !(c[j] = n))
				}) : function(b, j, n) {
					return c[0] = b, e(c, null, n, d), c[0] = null, !d.pop()
				}
			}),
			has: oa(function(b) {
				return function(c) {
					return 0 < ca(b, c).length
				}
			}),
			contains: oa(function(b) {
				return b = b.replace(Ga, Ha),
					function(c) {
						return -1 < (c.textContent || c.innerText || Ra(c)).indexOf(b)
					}
			}),
			lang: oa(function(b) {
				return ad.test(b || "") || ca.error("unsupported lang: " + b), b = b.replace(Ga, Ha).toLowerCase(),
					function(c) {
						var d;
						do
							if (d = la ? c.lang : c.getAttribute("xml:lang") || c.getAttribute("lang")) return d = d.toLowerCase(), d === b || 0 === d.indexOf(b + "-"); while ((c = c.parentNode) && 1 === c.nodeType);
						return !1
					}
			}),
			target: function(b) {
				var c = fb.location && fb.location.hash;
				return c && c.slice(1) === b.id
			},
			root: function(b) {
				return b === ma
			},
			focus: function(b) {
				return b === Z.activeElement && (!Z.hasFocus || Z.hasFocus()) && !(!b.type && !b.href && !~b.tabIndex)
			},
			enabled: vb(!1),
			disabled: vb(!0),
			checked: function(b) {
				var c = b.nodeName.toLowerCase();
				return "input" === c && !!b.checked || "option" === c && !!b.selected
			},
			selected: function(b) {
				return b.parentNode && b.parentNode.selectedIndex, !0 === b.selected
			},
			empty: function(b) {
				for (b = b.firstChild; b; b = b.nextSibling)
					if (6 > b.nodeType) return !1;
				return !0
			},
			parent: function(b) {
				return !X.pseudos.empty(b)
			},
			header: function(b) {
				return cd.test(b.nodeName)
			},
			input: function(b) {
				return bd.test(b.nodeName)
			},
			button: function(b) {
				var c = b.nodeName.toLowerCase();
				return "input" === c && "button" === b.type || "button" === c
			},
			text: function(b) {
				var c;
				return "input" === b.nodeName.toLowerCase() && "text" === b.type && (null == (c = b.getAttribute("type")) || "text" === c.toLowerCase())
			},
			first: Ca(function() {
				return [0]
			}),
			last: Ca(function(b, c) {
				return [c - 1]
			}),
			eq: Ca(function(b, c, d) {
				return [0 > d ? d + c : d]
			}),
			even: Ca(function(b, c) {
				for (var d = 0; d < c; d += 2) b.push(d);
				return b
			}),
			odd: Ca(function(b, c) {
				for (var d = 1; d < c; d += 2) b.push(d);
				return b
			}),
			lt: Ca(function(b, c, d) {
				for (c = 0 > d ? d + c : d; 0 <= --c;) b.push(c);
				return b
			}),
			gt: Ca(function(b, c, d) {
				for (d = 0 > d ? d + c : d; ++d < c;) b.push(d);
				return b
			})
		}
	};
	X.pseudos.nth = X.pseudos.eq;
	for (Ea in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) X.pseudos[Ea] = ub(Ea);
	for (Ea in {
			submit: !0,
			reset: !0
		}) X.pseudos[Ea] = Jb(Ea);
	wb.prototype = X.filters = X.pseudos;
	X.setFilters = new wb;
	Oa = ca.tokenize = function(b, c) {
		var d, e, j, n, f, x, g;
		if (f = hc[b + " "]) return c ? 0 : f.slice(0);
		f = b;
		x = [];
		for (g = X.preFilter; f;) {
			d && !(e = Xc.exec(f)) || (e && (f = f.slice(e[0].length) || f), x.push(j = []));
			d = !1;
			(e = Yc.exec(f)) && (d = e.shift(), j.push({
				value: d,
				type: e[0].replace(Ib, " ")
			}), f = f.slice(d.length));
			for (n in X.filter) !(e = Kb[n].exec(f)) || g[n] && !(e = g[n](e)) || (d = e.shift(), j.push({
				value: d,
				type: n,
				matches: e
			}), f = f.slice(d.length));
			if (!d) break
		}
		return c ? f.length : f ? ca.error(b) : hc(b, x).slice(0)
	};
	ya = ($a = ca.compile = function(b, c) {
		var d, e = [],
			j = [],
			n = Hb[b + " "];
		if (!n) {
			c || (c = Oa(b));
			for (d = c.length; d--;) n = Za(c[d]), n[ia] ? e.push(n) : j.push(n);
			d = Hb;
			var f = 0 < e.length,
				x = 0 < j.length,
				n = function(b, c, d, n, ka) {
					var g, l, r, u = 0,
						M = "0",
						U = b && [],
						q = [],
						p = Qa,
						t = b || x && X.find.TAG("*", ka),
						D = Da += null == p ? 1 : Math.random() || 0.1,
						W = t.length;
					for (ka && (Qa = c === Z || c || ka); M !== W && null != (g = t[M]); M++) {
						if (x && g) {
							l = 0;
							for (c || g.ownerDocument === Z || (va(g), d = !la); r = j[l++];)
								if (r(g, c || Z, d)) {
									n.push(g);
									break
								}
							ka && (Da = D)
						}
						f && ((g = !r && g) && u--, b && U.push(g))
					}
					if (u += M, f && M !== u) {
						for (l = 0; r = e[l++];) r(U, q, c, d);
						if (b) {
							if (0 < u)
								for (; M--;) U[M] || q[M] || (q[M] = Uc.call(n));
							q = Pa(q)
						}
						Na.apply(n, q);
						ka && !b && 0 < q.length && 1 < u + e.length && ca.uniqueSort(n)
					}
					return ka && (Da = D, Qa = p), U
				},
				n = f ? oa(n) : n,
				n = d(b, n);
			n.selector = b
		}
		return n
	}, hb = ca.select = function(b, c, d, e) {
		var j, n, f, x, g, l = "function" == typeof b && b,
			r = !e && Oa(b = l.selector || b);
		if (d = d || [], 1 === r.length) {
			if (n = r[0] = r[0].slice(0), 2 < n.length && "ID" === (f = n[0]).type && 9 === c.nodeType && la && X.relative[n[1].type]) {
				if (c = (X.find.ID(f.matches[0].replace(Ga, Ha), c) || [])[0], !c) return d;
				l && (c = c.parentNode);
				b = b.slice(n.shift().value.length)
			}
			for (j = Kb.needsContext.test(b) ? 0 : n.length; j-- && !(f = n[j], X.relative[x = f.type]);)
				if ((g = X.find[x]) && (e = g(f.matches[0].replace(Ga, Ha), Tb.test(n[0].type) && gb(c.parentNode) || c))) {
					if (n.splice(j, 1), b = e.length && Ua(n), !b) return Na.apply(d, e), d;
					break
				}
		}
		return (l || $a(b, r))(e, c, !la, d, !c || Tb.test(b) && gb(c.parentNode) || c), d
	}, ea.sortStable = ia.split("").sort(Ub).join("") === ia, ea.detectDuplicates = !!Fa, va(), ea.sortDetached = ra(function(b) {
		return 1 & b.compareDocumentPosition(Z.createElement("fieldset"))
	}), ra(function(b) {
		return b.innerHTML = "<a href='#'></a>", "#" === b.firstChild.getAttribute("href")
	}) || jb("type|href|height|width", function(b, c, d) {
		if (!d) return b.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2)
	}), ea.attributes && ra(function(b) {
		return b.innerHTML = "<input/>", b.firstChild.setAttribute("value", ""), "" === b.firstChild.getAttribute("value")
	}) || jb("value", function(b, c, d) {
		if (!d && "input" === b.nodeName.toLowerCase()) return b.defaultValue
	}), ra(function(b) {
		return null == b.getAttribute("disabled")
	}) || jb("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(b, c, d) {
		var e;
		if (!d) return !0 === b[c] ? c.toLowerCase() : (e = b.getAttributeNode(c)) && e.specified ? e.value : null
	}), ca);
	p.find = ya;
	p.expr = ya.selectors;
	p.expr[":"] = p.expr.pseudos;
	p.uniqueSort = p.unique = ya.uniqueSort;
	p.text = ya.getText;
	p.isXMLDoc = ya.isXML;
	p.contains = ya.contains;
	p.escapeSelector = ya.escape;
	var lb = function(b, c, d) {
			for (var e = [], j = void 0 !== d;
				(b = b[c]) && 9 !== b.nodeType;)
				if (1 === b.nodeType) {
					if (j && p(b).is(d)) break;
					e.push(b)
				}
			return e
		},
		kc = function(b, c) {
			for (var d = []; b; b = b.nextSibling) 1 === b.nodeType && b !== c && d.push(b);
			return d
		},
		lc = p.expr.match.needsContext,
		mc = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
		Hc = /^.[^:#\[\.,]*$/;
	p.filter = function(b, c, d) {
		var e = c[0];
		return d && (b = ":not(" + b + ")"), 1 === c.length && 1 === e.nodeType ? p.find.matchesSelector(e, b) ? [e] : [] : p.find.matches(b, p.grep(c, function(b) {
			return 1 === b.nodeType
		}))
	};
	p.fn.extend({
		find: function(b) {
			var c, d, e = this.length,
				j = this;
			if ("string" != typeof b) return this.pushStack(p(b).filter(function() {
				for (c = 0; c < e; c++)
					if (p.contains(j[c], this)) return !0
			}));
			d = this.pushStack([]);
			for (c = 0; c < e; c++) p.find(b, j[c], d);
			return 1 < e ? p.uniqueSort(d) : d
		},
		filter: function(b) {
			return this.pushStack(g(this, b || [], !1))
		},
		not: function(b) {
			return this.pushStack(g(this, b || [], !0))
		},
		is: function(b) {
			return !!g(this, "string" == typeof b && lc.test(b) ? p(b) : b || [], !1).length
		}
	});
	var nc, dd = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
	(p.fn.init = function(b, c, d) {
		var e, j;
		if (!b) return this;
		if (d = d || nc, "string" == typeof b) {
			if (e = "<" === b[0] && ">" === b[b.length - 1] && 3 <= b.length ? [null, b, null] : dd.exec(b), !e || !e[1] && c) return !c || c.jquery ? (c || d).find(b) : this.constructor(c).find(b);
			if (e[1]) {
				if (c = c instanceof p ? c[0] : c, p.merge(this, p.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : Y, !0)), mc.test(e[1]) && p.isPlainObject(c))
					for (e in c) p.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
				return this
			}
			return j = Y.getElementById(e[2]), j && (this[0] = j, this.length = 1), this
		}
		return b.nodeType ? (this[0] = b, this.length = 1, this) : p.isFunction(b) ? void 0 !== d.ready ? d.ready(b) : b(p) : p.makeArray(b, this)
	}).prototype = p.fn;
	nc = p(Y);
	var ed = /^(?:parents|prev(?:Until|All))/,
		fd = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	p.fn.extend({
		has: function(b) {
			var c = p(b, this),
				d = c.length;
			return this.filter(function() {
				for (var b = 0; b < d; b++)
					if (p.contains(this, c[b])) return !0
			})
		},
		closest: function(b, c) {
			var d, e = 0,
				j = this.length,
				n = [],
				f = "string" != typeof b && p(b);
			if (!lc.test(b))
				for (; e < j; e++)
					for (d = this[e]; d && d !== c; d = d.parentNode)
						if (11 > d.nodeType && (f ? -1 < f.index(d) : 1 === d.nodeType && p.find.matchesSelector(d, b))) {
							n.push(d);
							break
						}
			return this.pushStack(1 < n.length ? p.uniqueSort(n) : n)
		},
		index: function(b) {
			return b ? "string" == typeof b ? Ja.call(p(b), this[0]) : Ja.call(this, b.jquery ? b[0] : b) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(b, c) {
			return this.pushStack(p.uniqueSort(p.merge(this.get(), p(b, c))))
		},
		addBack: function(b) {
			return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
		}
	});
	p.each({
		parent: function(b) {
			return (b = b.parentNode) && 11 !== b.nodeType ? b : null
		},
		parents: function(b) {
			return lb(b, "parentNode")
		},
		parentsUntil: function(b, c, d) {
			return lb(b, "parentNode", d)
		},
		next: function(b) {
			return m(b, "nextSibling")
		},
		prev: function(b) {
			return m(b, "previousSibling")
		},
		nextAll: function(b) {
			return lb(b, "nextSibling")
		},
		prevAll: function(b) {
			return lb(b, "previousSibling")
		},
		nextUntil: function(b, c, d) {
			return lb(b, "nextSibling", d)
		},
		prevUntil: function(b, c, d) {
			return lb(b, "previousSibling", d)
		},
		siblings: function(b) {
			return kc((b.parentNode || {}).firstChild, b)
		},
		children: function(b) {
			return kc(b.firstChild)
		},
		contents: function(b) {
			return f(b, "iframe") ? b.contentDocument : (f(b, "template") && (b = b.content || b), p.merge([], b.childNodes))
		}
	}, function(b, c) {
		p.fn[b] = function(d, e) {
			var j = p.map(this, c, d);
			return "Until" !== b.slice(-5) && (e = d), e && "string" == typeof e && (j = p.filter(e, j)), 1 < this.length && (fd[b] || p.uniqueSort(j), ed.test(b) && j.reverse()), this.pushStack(j)
		}
	});
	var ta = /[^\x20\t\r\n\f]+/g;
	p.Callbacks = function(b) {
		var c;
		if ("string" == typeof b) {
			var d = {};
			c = (p.each(b.match(ta) || [], function(b, c) {
				d[c] = !0
			}), d)
		} else c = p.extend({}, b);
		b = c;
		var e, j, n, f, x = [],
			g = [],
			l = -1,
			r = function() {
				f = f || b.once;
				for (n = e = !0; g.length; l = -1)
					for (j = g.shift(); ++l < x.length;) !1 === x[l].apply(j[0], j[1]) && b.stopOnFalse && (l = x.length, j = !1);
				b.memory || (j = !1);
				e = !1;
				f && (x = j ? [] : "")
			},
			u = {
				add: function() {
					return x && (j && !e && (l = x.length - 1, g.push(j)), function Nc(c) {
						p.each(c, function(c, d) {
							p.isFunction(d) ? b.unique && u.has(d) || x.push(d) : d && d.length && "string" !== p.type(d) && Nc(d)
						})
					}(arguments), j && !e && r()), this
				},
				remove: function() {
					return p.each(arguments, function(b, c) {
						for (var d; - 1 < (d = p.inArray(c, x, d));) x.splice(d, 1), d <= l && l--
					}), this
				},
				has: function(b) {
					return b ? -1 < p.inArray(b, x) : 0 < x.length
				},
				empty: function() {
					return x && (x = []), this
				},
				disable: function() {
					return f = g = [], x = j = "", this
				},
				disabled: function() {
					return !x
				},
				lock: function() {
					return f = g = [], j || e || (x = j = ""), this
				},
				locked: function() {
					return !!f
				},
				fireWith: function(b, c) {
					return f || (c = c || [], c = [b, c.slice ? c.slice() : c], g.push(c), e || r()), this
				},
				fire: function() {
					return u.fireWith(this, arguments), this
				},
				fired: function() {
					return !!n
				}
			};
		return u
	};
	p.extend({
		Deferred: function(c) {
			var d = [
					["notify", "progress", p.Callbacks("memory"), p.Callbacks("memory"), 2],
					["resolve", "done", p.Callbacks("once memory"), p.Callbacks("once memory"), 0, "resolved"],
					["reject", "fail", p.Callbacks("once memory"), p.Callbacks("once memory"), 1, "rejected"]
				],
				e = "pending",
				n = {
					state: function() {
						return e
					},
					always: function() {
						return f.done(arguments).fail(arguments), this
					},
					"catch": function(b) {
						return n.then(null, b)
					},
					pipe: function() {
						var b = arguments;
						return p.Deferred(function(c) {
							p.each(d, function(d, e) {
								var j = p.isFunction(b[e[4]]) && b[e[4]];
								f[e[1]](function() {
									var b = j && j.apply(this, arguments);
									b && p.isFunction(b.promise) ? b.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[e[0] + "With"](this, j ? [b] : arguments)
								})
							});
							b = null
						}).promise()
					},
					then: function(c, e, n) {
						function f(c, d, e, n) {
							return function() {
								var g = this,
									r = arguments,
									u = function() {
										var b, u;
										if (!(c < x)) {
											if (b = e.apply(g, r), b === d.promise()) throw new TypeError("Thenable self-resolution");
											u = b && ("object" == typeof b || "function" == typeof b) && b.then;
											p.isFunction(u) ? n ? u.call(b, f(x, d, l, n), f(x, d, j, n)) : (x++, u.call(b, f(x, d, l, n), f(x, d, j, n), f(x, d, l, d.notifyWith))) : (e !== l && (g = void 0, r = [b]), (n || d.resolveWith)(g, r))
										}
									},
									ka = n ? u : function() {
										try {
											u()
										} catch (b) {
											p.Deferred.exceptionHook && p.Deferred.exceptionHook(b, ka.stackTrace), c + 1 >= x && (e !== j && (g = void 0, r = [b]), d.rejectWith(g, r))
										}
									};
								c ? ka() : (p.Deferred.getStackHook && (ka.stackTrace = p.Deferred.getStackHook()), b.setTimeout(ka))
							}
						}
						var x = 0;
						return p.Deferred(function(b) {
							d[0][3].add(f(0, b, p.isFunction(n) ? n : l, b.notifyWith));
							d[1][3].add(f(0, b, p.isFunction(c) ? c : l));
							d[2][3].add(f(0, b, p.isFunction(e) ? e : j))
						}).promise()
					},
					promise: function(b) {
						return null != b ? p.extend(b, n) : n
					}
				},
				f = {};
			return p.each(d, function(b, c) {
				var j = c[2],
					x = c[5];
				n[c[1]] = j.add;
				x && j.add(function() {
					e = x
				}, d[3 - b][2].disable, d[0][2].lock);
				j.add(c[3].fire);
				f[c[0]] = function() {
					return f[c[0] + "With"](this === f ? void 0 : this, arguments), this
				};
				f[c[0] + "With"] = j.fireWith
			}), n.promise(f), c && c.call(f, f), f
		},
		when: function(b) {
			var c = arguments.length,
				d = c,
				e = Array(d),
				j = xa.call(arguments),
				n = p.Deferred(),
				f = function(b) {
					return function(d) {
						e[b] = this;
						j[b] = 1 < arguments.length ? xa.call(arguments) : d;
						--c || n.resolveWith(e, j)
					}
				};
			if (1 >= c && (q(b, n.done(f(d)).resolve, n.reject, !c), "pending" === n.state() || p.isFunction(j[d] && j[d].then))) return n.then();
			for (; d--;) q(j[d], f(d), n.reject);
			return n.promise()
		}
	});
	var gd = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	p.Deferred.exceptionHook = function(c, d) {
		b.console && b.console.warn && c && gd.test(c.name) && b.console.warn("jQuery.Deferred exception: " + c.message, c.stack, d)
	};
	p.readyException = function(c) {
		b.setTimeout(function() {
			throw c;
		})
	};
	var Vb = p.Deferred();
	p.fn.ready = function(b) {
		return Vb.then(b)["catch"](function(b) {
			p.readyException(b)
		}), this
	};
	p.extend({
		isReady: !1,
		readyWait: 1,
		ready: function(b) {
			(!0 === b ? --p.readyWait : p.isReady) || (p.isReady = !0, !0 !== b && 0 < --p.readyWait || Vb.resolveWith(Y, [p]))
		}
	});
	p.ready.then = Vb.then;
	"complete" === Y.readyState || "loading" !== Y.readyState && !Y.documentElement.doScroll ? b.setTimeout(p.ready) : (Y.addEventListener("DOMContentLoaded", z), b.addEventListener("load", z));
	var Ia = function(b, c, d, e, j, n, f) {
			var x = 0,
				g = b.length,
				l = null == d;
			if ("object" === p.type(d))
				for (x in j = !0, d) Ia(b, c, x, d[x], !0, n, f);
			else if (void 0 !== e && (j = !0, p.isFunction(e) || (f = !0), l && (f ? (c.call(b, e), c = null) : (l = c, c = function(b, c, d) {
					return l.call(p(b), d)
				})), c))
				for (; x < g; x++) c(b[x], d, f ? e : e.call(b[x], x, c(b[x], d)));
			return j ? b : l ? c.call(b) : g ? c(b[0], d) : n
		},
		Lb = function(b) {
			return 1 === b.nodeType || 9 === b.nodeType || !+b.nodeType
		};
	y.uid = 1;
	y.prototype = {
		cache: function(b) {
			var c = b[this.expando];
			return c || (c = {}, Lb(b) && (b.nodeType ? b[this.expando] = c : Object.defineProperty(b, this.expando, {
				value: c,
				configurable: !0
			}))), c
		},
		set: function(b, c, d) {
			var e;
			b = this.cache(b);
			if ("string" == typeof c) b[p.camelCase(c)] = d;
			else
				for (e in c) b[p.camelCase(e)] = c[e];
			return b
		},
		get: function(b, c) {
			return void 0 === c ? this.cache(b) : b[this.expando] && b[this.expando][p.camelCase(c)]
		},
		access: function(b, c, d) {
			return void 0 === c || c && "string" == typeof c && void 0 === d ? this.get(b, c) : (this.set(b, c, d), void 0 !== d ? d : c)
		},
		remove: function(b, c) {
			var d, e = b[this.expando];
			if (void 0 !== e) {
				if (void 0 !== c) {
					Array.isArray(c) ? c = c.map(p.camelCase) : (c = p.camelCase(c), c = c in e ? [c] : c.match(ta) || []);
					for (d = c.length; d--;) delete e[c[d]]
				}(void 0 === c || p.isEmptyObject(e)) && (b.nodeType ? b[this.expando] = void 0 : delete b[this.expando])
			}
		},
		hasData: function(b) {
			b = b[this.expando];
			return void 0 !== b && !p.isEmptyObject(b)
		}
	};
	var T = new y,
		pa = new y,
		Jc = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		Ic = /[A-Z]/g;
	p.extend({
		hasData: function(b) {
			return pa.hasData(b) || T.hasData(b)
		},
		data: function(b, c, d) {
			return pa.access(b, c, d)
		},
		removeData: function(b, c) {
			pa.remove(b, c)
		},
		_data: function(b, c, d) {
			return T.access(b, c, d)
		},
		_removeData: function(b, c) {
			T.remove(b, c)
		}
	});
	p.fn.extend({
		data: function(b, c) {
			var d, e, j, n = this[0],
				f = n && n.attributes;
			if (void 0 === b) {
				if (this.length && (j = pa.get(n), 1 === n.nodeType && !T.get(n, "hasDataAttrs"))) {
					for (d = f.length; d--;) f[d] && (e = f[d].name, 0 === e.indexOf("data-") && (e = p.camelCase(e.slice(5)), A(n, e, j[e])));
					T.set(n, "hasDataAttrs", !0)
				}
				return j
			}
			return "object" == typeof b ? this.each(function() {
				pa.set(this, b)
			}) : Ia(this, function(c) {
				var d;
				if (n && void 0 === c) {
					if ((d = pa.get(n, b), void 0 !== d) || (d = A(n, b), void 0 !== d)) return d
				} else this.each(function() {
					pa.set(this, b, c)
				})
			}, null, c, 1 < arguments.length, null, !0)
		},
		removeData: function(b) {
			return this.each(function() {
				pa.remove(this, b)
			})
		}
	});
	p.extend({
		queue: function(b, c, d) {
			var e;
			if (b) return c = (c || "fx") + "queue", e = T.get(b, c), d && (!e || Array.isArray(d) ? e = T.access(b, c, p.makeArray(d)) : e.push(d)), e || []
		},
		dequeue: function(b, c) {
			c = c || "fx";
			var d = p.queue(b, c),
				e = d.length,
				j = d.shift(),
				n = p._queueHooks(b, c),
				f = function() {
					p.dequeue(b, c)
				};
			"inprogress" === j && (j = d.shift(), e--);
			j && ("fx" === c && d.unshift("inprogress"), delete n.stop, j.call(b, f, n));
			!e && n && n.empty.fire()
		},
		_queueHooks: function(b, c) {
			var d = c + "queueHooks";
			return T.get(b, d) || T.access(b, d, {
				empty: p.Callbacks("once memory").add(function() {
					T.remove(b, [c + "queue", d])
				})
			})
		}
	});
	p.fn.extend({
		queue: function(b, c) {
			var d = 2;
			return "string" != typeof b && (c = b, b = "fx", d--), arguments.length < d ? p.queue(this[0], b) : void 0 === c ? this : this.each(function() {
				var d = p.queue(this, b, c);
				p._queueHooks(this, b);
				"fx" === b && "inprogress" !== d[0] && p.dequeue(this, b)
			})
		},
		dequeue: function(b) {
			return this.each(function() {
				p.dequeue(this, b)
			})
		},
		clearQueue: function(b) {
			return this.queue(b || "fx", [])
		},
		promise: function(b, c) {
			var d, e = 1,
				j = p.Deferred(),
				n = this,
				f = this.length,
				x = function() {
					--e || j.resolveWith(n, [n])
				};
			"string" != typeof b && (c = b, b = void 0);
			for (b = b || "fx"; f--;)(d = T.get(n[f], b + "queueHooks")) && d.empty && (e++, d.empty.add(x));
			return x(), j.promise(c)
		}
	});
	var oc = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		nb = RegExp("^(?:([+-])=|)(" + oc + ")([a-z%]*)$", "i"),
		Ta = ["Top", "Right", "Bottom", "Left"],
		Bb = function(b, c) {
			return b = c || b, "none" === b.style.display || "" === b.style.display && p.contains(b.ownerDocument, b) && "none" === p.css(b, "display")
		},
		pc = function(b, c, d, e) {
			var j, n = {};
			for (j in c) n[j] = b.style[j], b.style[j] = c[j];
			d = d.apply(b, e || []);
			for (j in c) b.style[j] = n[j];
			return d
		},
		Zb = {};
	p.fn.extend({
		show: function() {
			return E(this, !0)
		},
		hide: function() {
			return E(this)
		},
		toggle: function(b) {
			return "boolean" == typeof b ? b ? this.show() : this.hide() : this.each(function() {
				Bb(this) ? p(this).show() : p(this).hide()
			})
		}
	});
	var qc = /^(?:checkbox|radio)$/i,
		$b = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
		ac = /^$|\/(?:java|ecma)script/i,
		sa = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	sa.optgroup = sa.option;
	sa.tbody = sa.tfoot = sa.colgroup = sa.caption = sa.thead;
	sa.th = sa.td;
	var Kc = /<|&#?\w+;/,
		Mb = Y.createDocumentFragment().appendChild(Y.createElement("div")),
		Nb = Y.createElement("input");
	Nb.setAttribute("type", "radio");
	Nb.setAttribute("checked", "checked");
	Nb.setAttribute("name", "t");
	Mb.appendChild(Nb);
	da.checkClone = Mb.cloneNode(!0).cloneNode(!0).lastChild.checked;
	Mb.innerHTML = "<textarea>x</textarea>";
	da.noCloneChecked = !!Mb.cloneNode(!0).lastChild.defaultValue;
	!0;
	var Ob = Y.documentElement,
		hd = /^key/,
		id = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rc = /^([^.]*)(?:\.(.+)|)/;
	p.event = {
		global: {},
		add: function(b, c, d, e, j) {
			var n, f, x, g, l, r, u, M, q, t;
			if (l = T.get(b)) {
				d.handler && (n = d, d = n.handler, j = n.selector);
				j && p.find.matchesSelector(Ob, j);
				d.guid || (d.guid = p.guid++);
				(g = l.events) || (g = l.events = {});
				(f = l.handle) || (f = l.handle = function(c) {
					return "undefined" != typeof p && p.event.triggered !== c.type ? p.event.dispatch.apply(b, arguments) : void 0
				});
				c = (c || "").match(ta) || [""];
				for (l = c.length; l--;) x = rc.exec(c[l]) || [], q = t = x[1], x = (x[2] || "").split(".").sort(), q && (u = p.event.special[q] || {}, q = (j ? u.delegateType : u.bindType) || q, u = p.event.special[q] || {}, r = p.extend({
					type: q,
					origType: t,
					data: e,
					handler: d,
					guid: d.guid,
					selector: j,
					needsContext: j && p.expr.match.needsContext.test(j),
					namespace: x.join(".")
				}, n), (M = g[q]) || (M = g[q] = [], M.delegateCount = 0, u.setup && !1 !== u.setup.call(b, e, x, f) || b.addEventListener && b.addEventListener(q, f)), u.add && (u.add.call(b, r), r.handler.guid || (r.handler.guid = d.guid)), j ? M.splice(M.delegateCount++, 0, r) : M.push(r), p.event.global[q] = !0)
			}
		},
		remove: function(b, c, d, e, j) {
			var n, f, x, g, l, r, u, M, q, t, D, W = T.hasData(b) && T.get(b);
			if (W && (g = W.events)) {
				c = (c || "").match(ta) || [""];
				for (l = c.length; l--;)
					if (x = rc.exec(c[l]) || [], q = D = x[1], t = (x[2] || "").split(".").sort(), q) {
						u = p.event.special[q] || {};
						q = (e ? u.delegateType : u.bindType) || q;
						M = g[q] || [];
						x = x[2] && RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)");
						for (f = n = M.length; n--;) r = M[n], !j && D !== r.origType || d && d.guid !== r.guid || x && !x.test(r.namespace) || e && e !== r.selector && ("**" !== e || !r.selector) || (M.splice(n, 1), r.selector && M.delegateCount--, u.remove && u.remove.call(b, r));
						f && !M.length && (u.teardown && !1 !== u.teardown.call(b, t, W.handle) || p.removeEvent(b, q, W.handle), delete g[q])
					} else
						for (q in g) p.event.remove(b, q + c[l], d, e, !0);
				p.isEmptyObject(g) && T.remove(b, "handle events")
			}
		},
		dispatch: function(b) {
			var c = p.event.fix(b),
				d, e, j, n, f, x, g = Array(arguments.length);
			e = (T.get(this, "events") || {})[c.type] || [];
			var l = p.event.special[c.type] || {};
			g[0] = c;
			for (d = 1; d < arguments.length; d++) g[d] = arguments[d];
			if (c.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, c)) {
				x = p.event.handlers.call(this, c, e);
				for (d = 0;
					(n = x[d++]) && !c.isPropagationStopped();) {
					c.currentTarget = n.elem;
					for (e = 0;
						(f = n.handlers[e++]) && !c.isImmediatePropagationStopped();) c.rnamespace && !c.rnamespace.test(f.namespace) || (c.handleObj = f, c.data = f.data, j = ((p.event.special[f.origType] || {}).handle || f.handler).apply(n.elem, g), void 0 !== j && !1 === (c.result = j) && (c.preventDefault(), c.stopPropagation()))
				}
				return l.postDispatch && l.postDispatch.call(this, c), c.result
			}
		},
		handlers: function(b, c) {
			var d, e, j, n, f, x = [],
				g = c.delegateCount,
				l = b.target;
			if (g && l.nodeType && !("click" === b.type && 1 <= b.button))
				for (; l !== this; l = l.parentNode || this)
					if (1 === l.nodeType && ("click" !== b.type || !0 !== l.disabled)) {
						n = [];
						f = {};
						for (d = 0; d < g; d++) e = c[d], j = e.selector + " ", void 0 === f[j] && (f[j] = e.needsContext ? -1 < p(j, this).index(l) : p.find(j, this, null, [l]).length), f[j] && n.push(e);
						n.length && x.push({
							elem: l,
							handlers: n
						})
					}
			return l = this, g < c.length && x.push({
				elem: l,
				handlers: c.slice(g)
			}), x
		},
		addProp: function(b, c) {
			Object.defineProperty(p.Event.prototype, b, {
				enumerable: !0,
				configurable: !0,
				get: p.isFunction(c) ? function() {
					if (this.originalEvent) return c(this.originalEvent)
				} : function() {
					if (this.originalEvent) return this.originalEvent[b]
				},
				set: function(c) {
					Object.defineProperty(this, b, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: c
					})
				}
			})
		},
		fix: function(b) {
			return b[p.expando] ? b : new p.Event(b)
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== H() && this.focus) return this.focus(), !1
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === H() && this.blur) return this.blur(), !1
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					if ("checkbox" === this.type && this.click && f(this, "input")) return this.click(), !1
				},
				_default: function(b) {
					return f(b.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(b) {
					void 0 !== b.result && b.originalEvent && (b.originalEvent.returnValue = b.result)
				}
			}
		}
	};
	p.removeEvent = function(b, c, d) {
		b.removeEventListener && b.removeEventListener(c, d)
	};
	p.Event = function(b, c) {
		return this instanceof p.Event ? (b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented || void 0 === b.defaultPrevented && !1 === b.returnValue ? G : C, this.target = b.target && 3 === b.target.nodeType ? b.target.parentNode : b.target, this.currentTarget = b.currentTarget, this.relatedTarget = b.relatedTarget) : this.type = b, c && p.extend(this, c), this.timeStamp = b && b.timeStamp || p.now(), void(this[p.expando] = !0)) : new p.Event(b, c)
	};
	p.Event.prototype = {
		constructor: p.Event,
		isDefaultPrevented: C,
		isPropagationStopped: C,
		isImmediatePropagationStopped: C,
		isSimulated: !1,
		preventDefault: function() {
			var b = this.originalEvent;
			this.isDefaultPrevented = G;
			b && !this.isSimulated && b.preventDefault()
		},
		stopPropagation: function() {
			var b = this.originalEvent;
			this.isPropagationStopped = G;
			b && !this.isSimulated && b.stopPropagation()
		},
		stopImmediatePropagation: function() {
			var b = this.originalEvent;
			this.isImmediatePropagationStopped = G;
			b && !this.isSimulated && b.stopImmediatePropagation();
			this.stopPropagation()
		}
	};
	p.each({
		altKey: !0,
		bubbles: !0,
		cancelable: !0,
		changedTouches: !0,
		ctrlKey: !0,
		detail: !0,
		eventPhase: !0,
		metaKey: !0,
		pageX: !0,
		pageY: !0,
		shiftKey: !0,
		view: !0,
		"char": !0,
		charCode: !0,
		key: !0,
		keyCode: !0,
		button: !0,
		buttons: !0,
		clientX: !0,
		clientY: !0,
		offsetX: !0,
		offsetY: !0,
		pointerId: !0,
		pointerType: !0,
		screenX: !0,
		screenY: !0,
		targetTouches: !0,
		toElement: !0,
		touches: !0,
		which: function(b) {
			var c = b.button;
			return null == b.which && hd.test(b.type) ? null != b.charCode ? b.charCode : b.keyCode : !b.which && void 0 !== c && id.test(b.type) ? 1 & c ? 1 : 2 & c ? 3 : 4 & c ? 2 : 0 : b.which
		}
	}, p.event.addProp);
	p.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(b, c) {
		p.event.special[b] = {
			delegateType: c,
			bindType: c,
			handle: function(b) {
				var d, e = b.relatedTarget,
					j = b.handleObj;
				return e && (e === this || p.contains(this, e)) || (b.type = j.origType, d = j.handler.apply(this, arguments), b.type = c), d
			}
		}
	});
	p.fn.extend({
		on: function(b, c, d, e) {
			return R(this, b, c, d, e)
		},
		one: function(b, c, d, e) {
			return R(this, b, c, d, e, 1)
		},
		off: function(b, c, d) {
			var e, j;
			if (b && b.preventDefault && b.handleObj) return e = b.handleObj, p(b.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
			if ("object" == typeof b) {
				for (j in b) this.off(j, c, b[j]);
				return this
			}
			return !1 !== c && "function" != typeof c || (d = c, c = void 0), !1 === d && (d = C), this.each(function() {
				p.event.remove(this, b, d, c)
			})
		}
	});
	var jd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
		kd = /<script|<style|<link/i,
		Mc = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Lc = /^true\/(.*)/,
		Oc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	p.extend({
		htmlPrefilter: function(b) {
			return b.replace(jd, "<$1></$2>")
		},
		clone: function(b, c, d) {
			var e, j, n, f, x = b.cloneNode(!0),
				g = p.contains(b.ownerDocument, b);
			if (!da.noCloneChecked && !(1 !== b.nodeType && 11 !== b.nodeType || p.isXMLDoc(b))) {
				f = F(x);
				n = F(b);
				e = 0;
				for (j = n.length; e < j; e++) {
					var l = n[e],
						r = f[e],
						u = r.nodeName.toLowerCase();
					"input" === u && qc.test(l.type) ? r.checked = l.checked : "input" !== u && "textarea" !== u || (r.defaultValue = l.defaultValue)
				}
			}
			if (c)
				if (d) {
					n = n || F(b);
					f = f || F(x);
					e = 0;
					for (j = n.length; e < j; e++) P(n[e], f[e])
				} else P(b, x);
			return f = F(x, "script"), 0 < f.length && s(f, !g && F(b, "script")), x
		},
		cleanData: function(b) {
			for (var c, d, e, j = p.event.special, n = 0; void 0 !== (d = b[n]); n++)
				if (Lb(d)) {
					if (c = d[T.expando]) {
						if (c.events)
							for (e in c.events) j[e] ? p.event.remove(d, e) : p.removeEvent(d, e, c.handle);
						d[T.expando] = void 0
					}
					d[pa.expando] && (d[pa.expando] = void 0)
				}
		}
	});
	p.fn.extend({
		detach: function(b) {
			return V(this, b, !0)
		},
		remove: function(b) {
			return V(this, b)
		},
		text: function(b) {
			return Ia(this, function(b) {
				return void 0 === b ? p.text(this) : this.empty().each(function() {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = b)
				})
			}, null, b, arguments.length)
		},
		append: function() {
			return ba(this, arguments, function(b) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && K(this, b).appendChild(b)
			})
		},
		prepend: function() {
			return ba(this, arguments, function(b) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var c = K(this, b);
					c.insertBefore(b, c.firstChild)
				}
			})
		},
		before: function() {
			return ba(this, arguments, function(b) {
				this.parentNode && this.parentNode.insertBefore(b, this)
			})
		},
		after: function() {
			return ba(this, arguments, function(b) {
				this.parentNode && this.parentNode.insertBefore(b, this.nextSibling)
			})
		},
		empty: function() {
			for (var b, c = 0; null != (b = this[c]); c++) 1 === b.nodeType && (p.cleanData(F(b, !1)), b.textContent = "");
			return this
		},
		clone: function(b, c) {
			return b = null != b && b, c = null == c ? b : c, this.map(function() {
				return p.clone(this, b, c)
			})
		},
		html: function(b) {
			return Ia(this, function(b) {
				var c = this[0] || {},
					d = 0,
					e = this.length;
				if (void 0 === b && 1 === c.nodeType) return c.innerHTML;
				if ("string" == typeof b && !kd.test(b) && !sa[($b.exec(b) || ["", ""])[1].toLowerCase()]) {
					b = p.htmlPrefilter(b);
					try {
						for (; d < e; d++) c = this[d] || {}, 1 === c.nodeType && (p.cleanData(F(c, !1)), c.innerHTML = b);
						c = 0
					} catch (j) {}
				}
				c && this.empty().append(b)
			}, null, b, arguments.length)
		},
		replaceWith: function() {
			var b = [];
			return ba(this, arguments, function(c) {
				var d = this.parentNode;
				0 > p.inArray(this, b) && (p.cleanData(F(this)), d && d.replaceChild(c, this))
			}, b)
		}
	});
	p.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(b, c) {
		p.fn[b] = function(b) {
			for (var d = [], e = p(b), j = e.length - 1, n = 0; n <= j; n++) b = n === j ? this : this.clone(!0), p(e[n])[c](b), db.apply(d, b.get());
			return this.pushStack(d)
		}
	});
	var bc = /^margin/,
		Rb = RegExp("^(" + oc + ")(?!px)[a-z%]+$", "i"),
		Cb = function(c) {
			var d = c.ownerDocument.defaultView;
			return d && d.opener || (d = b), d.getComputedStyle(c)
		},
		Qb = function() {
			if (Aa) {
				Aa.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
				Aa.innerHTML = "";
				Ob.appendChild(Pb);
				var c = b.getComputedStyle(Aa);
				sc = "1%" !== c.top;
				tc = "2px" === c.marginLeft;
				uc = "4px" === c.width;
				Aa.style.marginRight = "50%";
				vc = "4px" === c.marginRight;
				Ob.removeChild(Pb);
				Aa = null
			}
		},
		sc, uc, vc, tc, Pb = Y.createElement("div"),
		Aa = Y.createElement("div");
	Aa.style && (Aa.style.backgroundClip = "content-box", Aa.cloneNode(!0).style.backgroundClip = "", da.clearCloneStyle = "content-box" === Aa.style.backgroundClip, Pb.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", Pb.appendChild(Aa), p.extend(da, {
		pixelPosition: function() {
			return Qb(), sc
		},
		boxSizingReliable: function() {
			return Qb(), uc
		},
		pixelMarginRight: function() {
			return Qb(), vc
		},
		reliableMarginLeft: function() {
			return Qb(), tc
		}
	}));
	!0;
	var ld = /^(none|table(?!-c[ea]).+)/,
		wc = /^--/,
		md = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		xc = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		dc = ["Webkit", "Moz", "ms"],
		cc = Y.createElement("div").style;
	p.extend({
		cssHooks: {
			opacity: {
				get: function(b, c) {
					if (c) {
						var d = r(b, "opacity");
						return "" === d ? "1" : d
					}
				}
			}
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": "cssFloat"
		},
		style: function(b, c, d, e) {
			if (b && 3 !== b.nodeType && 8 !== b.nodeType && b.style) {
				var j, n, f, x = p.camelCase(c),
					g = wc.test(c),
					l = b.style;
				return g || (c = J(x)), f = p.cssHooks[c] || p.cssHooks[x], void 0 === d ? f && "get" in f && void 0 !== (j = f.get(b, !1, e)) ? j : l[c] : (n = typeof d, "string" === n && (j = nb.exec(d)) && j[1] && (d = B(b, c, j), n = "number"), null != d && d === d && ("number" === n && (d += j && j[3] || (p.cssNumber[x] ? "" : "px")), da.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (l[c] = "inherit"), f && "set" in f && void 0 === (d = f.set(b, d, e)) || (g ? l.setProperty(c, d) : l[c] = d)), void 0)
			}
		},
		css: function(b, c, d, e) {
			var j, n, f, x = p.camelCase(c);
			return wc.test(c) || (c = J(x)), f = p.cssHooks[c] || p.cssHooks[x], f && "get" in f && (j = f.get(b, !0, d)), void 0 === j && (j = r(b, c, e)), "normal" === j && c in xc && (j = xc[c]), "" === d || d ? (n = parseFloat(j), !0 === d || isFinite(n) ? n || 0 : j) : j
		}
	});
	p.each(["height", "width"], function(b, c) {
		p.cssHooks[c] = {
			get: function(b, d, e) {
				if (d) return !ld.test(p.css(b, "display")) || b.getClientRects().length && b.getBoundingClientRect().width ? aa(b, c, e) : pc(b, md, function() {
					return aa(b, c, e)
				})
			},
			set: function(b, d, e) {
				var j, n = e && Cb(b);
				e = e && N(b, c, e, "border-box" === p.css(b, "boxSizing", !1, n), n);
				return e && (j = nb.exec(d)) && "px" !== (j[3] || "px") && (b.style[c] = d, d = p.css(b, c)), D(b, d, e)
			}
		}
	});
	p.cssHooks.marginLeft = t(da.reliableMarginLeft, function(b, c) {
		if (c) return (parseFloat(r(b, "marginLeft")) || b.getBoundingClientRect().left - pc(b, {
			marginLeft: 0
		}, function() {
			return b.getBoundingClientRect().left
		})) + "px"
	});
	p.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(b, c) {
		p.cssHooks[b + c] = {
			expand: function(d) {
				var e = 0,
					j = {};
				for (d = "string" == typeof d ? d.split(" ") : [d]; 4 > e; e++) j[b + Ta[e] + c] = d[e] || d[e - 2] || d[0];
				return j
			}
		};
		bc.test(b) || (p.cssHooks[b + c].set = D)
	});
	p.fn.extend({
		css: function(b, c) {
			return Ia(this, function(b, c, d) {
				var e, j = {},
					n = 0;
				if (Array.isArray(c)) {
					d = Cb(b);
					for (e = c.length; n < e; n++) j[c[n]] = p.css(b, c[n], !1, d);
					return j
				}
				return void 0 !== d ? p.style(b, c, d) : p.css(b, c)
			}, b, c, 1 < arguments.length)
		}
	});
	p.Tween = Q;
	Q.prototype = {
		constructor: Q,
		init: function(b, c, d, e, j, n) {
			this.elem = b;
			this.prop = d;
			this.easing = j || p.easing._default;
			this.options = c;
			this.start = this.now = this.cur();
			this.end = e;
			this.unit = n || (p.cssNumber[d] ? "" : "px")
		},
		cur: function() {
			var b = Q.propHooks[this.prop];
			return b && b.get ? b.get(this) : Q.propHooks._default.get(this)
		},
		run: function(b) {
			var c, d = Q.propHooks[this.prop];
			return this.options.duration ? this.pos = c = p.easing[this.easing](b, this.options.duration * b, 0, 1, this.options.duration) : this.pos = c = b, this.now = (this.end - this.start) * c + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : Q.propHooks._default.set(this), this
		}
	};
	Q.prototype.init.prototype = Q.prototype;
	Q.propHooks = {
		_default: {
			get: function(b) {
				var c;
				return 1 !== b.elem.nodeType || null != b.elem[b.prop] && null == b.elem.style[b.prop] ? b.elem[b.prop] : (c = p.css(b.elem, b.prop, ""), c && "auto" !== c ? c : 0)
			},
			set: function(b) {
				p.fx.step[b.prop] ? p.fx.step[b.prop](b) : 1 !== b.elem.nodeType || null == b.elem.style[p.cssProps[b.prop]] && !p.cssHooks[b.prop] ? b.elem[b.prop] = b.now : p.style(b.elem, b.prop, b.now + b.unit)
			}
		}
	};
	Q.propHooks.scrollTop = Q.propHooks.scrollLeft = {
		set: function(b) {
			b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
		}
	};
	p.easing = {
		linear: function(b) {
			return b
		},
		swing: function(b) {
			return 0.5 - Math.cos(b * Math.PI) / 2
		},
		_default: "swing"
	};
	p.fx = Q.prototype.init;
	p.fx.step = {};
	var cb, Db, nd = /^(?:toggle|show|hide)$/,
		od = /queueHooks$/;
	p.Animation = p.extend(M, {
		tweeners: {
			"*": [function(b, c) {
				var d = this.createTween(b, c);
				return B(d.elem, b, nb.exec(c), d), d
			}]
		},
		tweener: function(b, c) {
			p.isFunction(b) ? (c = b, b = ["*"]) : b = b.match(ta);
			for (var d, e = 0, j = b.length; e < j; e++) d = b[e], M.tweeners[d] = M.tweeners[d] || [], M.tweeners[d].unshift(c)
		},
		prefilters: [function(b, c, d) {
			var e, j, n, f, g, l, r, u, M = "width" in c || "height" in c,
				q = this,
				t = {},
				D = b.style,
				W = b.nodeType && Bb(b),
				L = T.get(b, "fxshow");
			d.queue || (f = p._queueHooks(b, "fx"), null == f.unqueued && (f.unqueued = 0, g = f.empty.fire, f.empty.fire = function() {
				f.unqueued || g()
			}), f.unqueued++, q.always(function() {
				q.always(function() {
					f.unqueued--;
					p.queue(b, "fx").length || f.empty.fire()
				})
			}));
			for (e in c)
				if (j = c[e], nd.test(j)) {
					if (delete c[e], n = n || "toggle" === j, j === (W ? "hide" : "show")) {
						if ("show" !== j || !L || void 0 === L[e]) continue;
						W = !0
					}
					t[e] = L && L[e] || p.style(b, e)
				}
			if (l = !p.isEmptyObject(c), l || !p.isEmptyObject(t))
				for (e in M && 1 === b.nodeType && (d.overflow = [D.overflow, D.overflowX, D.overflowY], r = L && L.display, null == r && (r = T.get(b, "display")), u = p.css(b, "display"), "none" === u && (r ? u = r : (E([b], !0), r = b.style.display || r, u = p.css(b, "display"), E([b]))), ("inline" === u || "inline-block" === u && null != r) && "none" === p.css(b, "float") && (l || (q.done(function() {
						D.display = r
					}), null == r && (u = D.display, r = "none" === u ? "" : u)), D.display = "inline-block")), d.overflow && (D.overflow = "hidden", q.always(function() {
						D.overflow = d.overflow[0];
						D.overflowX = d.overflow[1];
						D.overflowY = d.overflow[2]
					})), l = !1, t) l || (L ? "hidden" in L && (W = L.hidden) : L = T.access(b, "fxshow", {
					display: r
				}), n && (L.hidden = !W), W && E([b], !0), q.done(function() {
					W || E([b]);
					T.remove(b, "fxshow");
					for (e in t) p.style(b, e, t[e])
				})), l = x(W ? L[e] : 0, e, q), e in L || (L[e] = l.start, W && (l.end = l.start, l.start = 0))
		}],
		prefilter: function(b, c) {
			c ? M.prefilters.unshift(b) : M.prefilters.push(b)
		}
	});
	p.speed = function(b, c, d) {
		var e = b && "object" == typeof b ? p.extend({}, b) : {
			complete: d || !d && c || p.isFunction(b) && b,
			duration: b,
			easing: d && c || c && !p.isFunction(c) && c
		};
		return p.fx.off ? e.duration = 0 : "number" != typeof e.duration && (e.duration in p.fx.speeds ? e.duration = p.fx.speeds[e.duration] : e.duration = p.fx.speeds._default), null != e.queue && !0 !== e.queue || (e.queue = "fx"), e.old = e.complete, e.complete = function() {
			p.isFunction(e.old) && e.old.call(this);
			e.queue && p.dequeue(this, e.queue)
		}, e
	};
	p.fn.extend({
		fadeTo: function(b, c, d, e) {
			return this.filter(Bb).css("opacity", 0).show().end().animate({
				opacity: c
			}, b, d, e)
		},
		animate: function(b, c, d, e) {
			var j = p.isEmptyObject(b),
				n = p.speed(c, d, e);
			c = function() {
				var c = M(this, p.extend({}, b), n);
				(j || T.get(this, "finish")) && c.stop(!0)
			};
			return c.finish = c, j || !1 === n.queue ? this.each(c) : this.queue(n.queue, c)
		},
		stop: function(b, c, d) {
			var e = function(b) {
				var c = b.stop;
				delete b.stop;
				c(d)
			};
			return "string" != typeof b && (d = c, c = b, b = void 0), c && !1 !== b && this.queue(b || "fx", []), this.each(function() {
				var c = !0,
					j = null != b && b + "queueHooks",
					n = p.timers,
					f = T.get(this);
				if (j) f[j] && f[j].stop && e(f[j]);
				else
					for (j in f) f[j] && f[j].stop && od.test(j) && e(f[j]);
				for (j = n.length; j--;) n[j].elem !== this || null != b && n[j].queue !== b || (n[j].anim.stop(d), c = !1, n.splice(j, 1));
				!c && d || p.dequeue(this, b)
			})
		},
		finish: function(b) {
			return !1 !== b && (b = b || "fx"), this.each(function() {
				var c, d = T.get(this),
					e = d[b + "queue"];
				c = d[b + "queueHooks"];
				var j = p.timers,
					n = e ? e.length : 0;
				d.finish = !0;
				p.queue(this, b, []);
				c && c.stop && c.stop.call(this, !0);
				for (c = j.length; c--;) j[c].elem === this && j[c].queue === b && (j[c].anim.stop(!0), j.splice(c, 1));
				for (c = 0; c < n; c++) e[c] && e[c].finish && e[c].finish.call(this);
				delete d.finish
			})
		}
	});
	p.each(["toggle", "show", "hide"], function(b, c) {
		var d = p.fn[c];
		p.fn[c] = function(b, e, j) {
			return null == b || "boolean" == typeof b ? d.apply(this, arguments) : this.animate(L(c, !0), b, e, j)
		}
	});
	p.each({
		slideDown: L("show"),
		slideUp: L("hide"),
		slideToggle: L("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(b, c) {
		p.fn[b] = function(b, d, e) {
			return this.animate(c, b, d, e)
		}
	});
	p.timers = [];
	p.fx.tick = function() {
		var b, c = 0,
			d = p.timers;
		for (cb = p.now(); c < d.length; c++) b = d[c], b() || d[c] !== b || d.splice(c--, 1);
		d.length || p.fx.stop();
		cb = void 0
	};
	p.fx.timer = function(b) {
		p.timers.push(b);
		p.fx.start()
	};
	p.fx.interval = 13;
	p.fx.start = function() {
		Db || (Db = !0, n())
	};
	p.fx.stop = function() {
		Db = null
	};
	p.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	p.fn.delay = function(c, d) {
		return c = p.fx ? p.fx.speeds[c] || c : c, d = d || "fx", this.queue(d, function(d, e) {
			var j = b.setTimeout(d, c);
			e.stop = function() {
				b.clearTimeout(j)
			}
		})
	};
	var mb = Y.createElement("input"),
		pd = Y.createElement("select").appendChild(Y.createElement("option"));
	mb.type = "checkbox";
	da.checkOn = "" !== mb.value;
	da.optSelected = pd.selected;
	mb = Y.createElement("input");
	mb.value = "t";
	mb.type = "radio";
	da.radioValue = "t" === mb.value;
	var yc, yb = p.expr.attrHandle;
	p.fn.extend({
		attr: function(b, c) {
			return Ia(this, p.attr, b, c, 1 < arguments.length)
		},
		removeAttr: function(b) {
			return this.each(function() {
				p.removeAttr(this, b)
			})
		}
	});
	p.extend({
		attr: function(b, c, d) {
			var e, j, n = b.nodeType;
			if (3 !== n && 8 !== n && 2 !== n) return "undefined" == typeof b.getAttribute ? p.prop(b, c, d) : (1 === n && p.isXMLDoc(b) || (j = p.attrHooks[c.toLowerCase()] || (p.expr.match.bool.test(c) ? yc : void 0)), void 0 !== d ? null === d ? void p.removeAttr(b, c) : j && "set" in j && void 0 !== (e = j.set(b, d, c)) ? e : (b.setAttribute(c, d + ""), d) : j && "get" in j && null !== (e = j.get(b, c)) ? e : (e = p.find.attr(b, c), null == e ? void 0 : e))
		},
		attrHooks: {
			type: {
				set: function(b, c) {
					if (!da.radioValue && "radio" === c && f(b, "input")) {
						var d = b.value;
						return b.setAttribute("type", c), d && (b.value = d), c
					}
				}
			}
		},
		removeAttr: function(b, c) {
			var d, e = 0,
				j = c && c.match(ta);
			if (j && 1 === b.nodeType)
				for (; d = j[e++];) b.removeAttribute(d)
		}
	});
	yc = {
		set: function(b, c, d) {
			return !1 === c ? p.removeAttr(b, d) : b.setAttribute(d, d), d
		}
	};
	p.each(p.expr.match.bool.source.match(/\w+/g), function(b, c) {
		var d = yb[c] || p.find.attr;
		yb[c] = function(b, c, e) {
			var j, n, f = c.toLowerCase();
			return e || (n = yb[f], yb[f] = j, j = null != d(b, c, e) ? f : null, yb[f] = n), j
		}
	});
	var qd = /^(?:input|select|textarea|button)$/i,
		rd = /^(?:a|area)$/i;
	p.fn.extend({
		prop: function(b, c) {
			return Ia(this, p.prop, b, c, 1 < arguments.length)
		},
		removeProp: function(b) {
			return this.each(function() {
				delete this[p.propFix[b] || b]
			})
		}
	});
	p.extend({
		prop: function(b, c, d) {
			var e, j, n = b.nodeType;
			if (3 !== n && 8 !== n && 2 !== n) return 1 === n && p.isXMLDoc(b) || (c = p.propFix[c] || c, j = p.propHooks[c]), void 0 !== d ? j && "set" in j && void 0 !== (e = j.set(b, d, c)) ? e : b[c] = d : j && "get" in j && null !== (e = j.get(b, c)) ? e : b[c]
		},
		propHooks: {
			tabIndex: {
				get: function(b) {
					var c = p.find.attr(b, "tabindex");
					return c ? parseInt(c, 10) : qd.test(b.nodeName) || rd.test(b.nodeName) && b.href ? 0 : -1
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});
	da.optSelected || (p.propHooks.selected = {
		get: function(b) {
			b = b.parentNode;
			return b && b.parentNode && b.parentNode.selectedIndex, null
		},
		set: function(b) {
			b = b.parentNode;
			b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
		}
	});
	p.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
		p.propFix[this.toLowerCase()] = this
	});
	p.fn.extend({
		addClass: function(b) {
			var c, d, e, j, n, f, x = 0;
			if (p.isFunction(b)) return this.each(function(c) {
				p(this).addClass(b.call(this, c, S(this)))
			});
			if ("string" == typeof b && b)
				for (c = b.match(ta) || []; d = this[x++];)
					if (j = S(d), e = 1 === d.nodeType && " " + W(j) + " ") {
						for (f = 0; n = c[f++];) 0 > e.indexOf(" " + n + " ") && (e += n + " ");
						e = W(e);
						j !== e && d.setAttribute("class", e)
					}
			return this
		},
		removeClass: function(b) {
			var c, d, e, j, n, f, x = 0;
			if (p.isFunction(b)) return this.each(function(c) {
				p(this).removeClass(b.call(this, c, S(this)))
			});
			if (!arguments.length) return this.attr("class", "");
			if ("string" == typeof b && b)
				for (c = b.match(ta) || []; d = this[x++];)
					if (j = S(d), e = 1 === d.nodeType && " " + W(j) + " ") {
						for (f = 0; n = c[f++];)
							for (; - 1 < e.indexOf(" " + n + " ");) e = e.replace(" " + n + " ", " ");
						e = W(e);
						j !== e && d.setAttribute("class", e)
					}
			return this
		},
		toggleClass: function(b, c) {
			var d = typeof b;
			return "boolean" == typeof c && "string" === d ? c ? this.addClass(b) : this.removeClass(b) : p.isFunction(b) ? this.each(function(d) {
				p(this).toggleClass(b.call(this, d, S(this), c), c)
			}) : this.each(function() {
				var c, e, j, n;
				if ("string" === d) {
					e = 0;
					j = p(this);
					for (n = b.match(ta) || []; c = n[e++];) j.hasClass(c) ? j.removeClass(c) : j.addClass(c)
				} else void 0 !== b && "boolean" !== d || (c = S(this), c && T.set(this, "__className__", c), this.setAttribute && this.setAttribute("class", c || !1 === b ? "" : T.get(this, "__className__") || ""))
			})
		},
		hasClass: function(b) {
			var c, d = 0;
			for (b = " " + b + " "; c = this[d++];)
				if (1 === c.nodeType && -1 < (" " + W(S(c)) + " ").indexOf(b)) return !0;
			return !1
		}
	});
	var sd = /\r/g;
	p.fn.extend({
		val: function(b) {
			var c, d, e, j = this[0];
			if (arguments.length) return e = p.isFunction(b), this.each(function(d) {
				var j;
				1 === this.nodeType && (j = e ? b.call(this, d, p(this).val()) : b, null == j ? j = "" : "number" == typeof j ? j += "" : Array.isArray(j) && (j = p.map(j, function(b) {
					return null == b ? "" : b + ""
				})), c = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()], c && "set" in c && void 0 !== c.set(this, j, "value") || (this.value = j))
			});
			if (j) return c = p.valHooks[j.type] || p.valHooks[j.nodeName.toLowerCase()], c && "get" in c && void 0 !== (d = c.get(j, "value")) ? d : (d = j.value, "string" == typeof d ? d.replace(sd, "") : null == d ? "" : d)
		}
	});
	p.extend({
		valHooks: {
			option: {
				get: function(b) {
					var c = p.find.attr(b, "value");
					return null != c ? c : W(p.text(b))
				}
			},
			select: {
				get: function(b) {
					var c, d, e = b.options,
						j = b.selectedIndex,
						n = "select-one" === b.type,
						x = n ? null : [],
						g = n ? j + 1 : e.length;
					for (d = 0 > j ? g : n ? j : 0; d < g; d++)
						if (c = e[d], (c.selected || d === j) && !c.disabled && (!c.parentNode.disabled || !f(c.parentNode, "optgroup"))) {
							if (b = p(c).val(), n) return b;
							x.push(b)
						}
					return x
				},
				set: function(b, c) {
					for (var d, e, j = b.options, n = p.makeArray(c), f = j.length; f--;) e = j[f], (e.selected = -1 < p.inArray(p.valHooks.option.get(e), n)) && (d = !0);
					return d || (b.selectedIndex = -1), n
				}
			}
		}
	});
	p.each(["radio", "checkbox"], function() {
		p.valHooks[this] = {
			set: function(b, c) {
				if (Array.isArray(c)) return b.checked = -1 < p.inArray(p(b).val(), c)
			}
		};
		da.checkOn || (p.valHooks[this].get = function(b) {
			return null === b.getAttribute("value") ? "on" : b.value
		})
	});
	var zc = /^(?:focusinfocus|focusoutblur)$/;
	p.extend(p.event, {
		trigger: function(c, d, e, j) {
			var n, f, x, g, l, r, u, M = [e || Y],
				q = Ma.call(c, "type") ? c.type : c;
			n = Ma.call(c, "namespace") ? c.namespace.split(".") : [];
			if (f = x = e = e || Y, 3 !== e.nodeType && 8 !== e.nodeType && !zc.test(q + p.event.triggered) && (-1 < q.indexOf(".") && (n = q.split("."), q = n.shift(), n.sort()), l = 0 > q.indexOf(":") && "on" + q, c = c[p.expando] ? c : new p.Event(q, "object" == typeof c && c), c.isTrigger = j ? 2 : 3, c.namespace = n.join("."), c.rnamespace = c.namespace ? RegExp("(^|\\.)" + n.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = void 0, c.target || (c.target = e), d = null == d ? [c] : p.makeArray(d, [c]), u = p.event.special[q] || {}, j || !u.trigger || !1 !== u.trigger.apply(e, d))) {
				if (!j && !u.noBubble && !p.isWindow(e)) {
					g = u.delegateType || q;
					for (zc.test(g + q) || (f = f.parentNode); f; f = f.parentNode) M.push(f), x = f;
					x === (e.ownerDocument || Y) && M.push(x.defaultView || x.parentWindow || b)
				}
				for (n = 0;
					(f = M[n++]) && !c.isPropagationStopped();) c.type = 1 < n ? g : u.bindType || q, (r = (T.get(f, "events") || {})[c.type] && T.get(f, "handle")) && r.apply(f, d), (r = l && f[l]) && r.apply && Lb(f) && (c.result = r.apply(f, d), !1 === c.result && c.preventDefault());
				return c.type = q, j || c.isDefaultPrevented() || u._default && !1 !== u._default.apply(M.pop(), d) || !Lb(e) || l && p.isFunction(e[q]) && !p.isWindow(e) && (x = e[l], x && (e[l] = null), p.event.triggered = q, e[q](), p.event.triggered = void 0, x && (e[l] = x)), c.result
			}
		},
		simulate: function(b, c, d) {
			b = p.extend(new p.Event, d, {
				type: b,
				isSimulated: !0
			});
			p.event.trigger(b, null, c)
		}
	});
	p.fn.extend({
		trigger: function(b, c) {
			return this.each(function() {
				p.event.trigger(b, c, this)
			})
		},
		triggerHandler: function(b, c) {
			var d = this[0];
			if (d) return p.event.trigger(b, c, d, !0)
		}
	});
	p.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(b, c) {
		p.fn[c] = function(b, d) {
			return 0 < arguments.length ? this.on(c, null, b, d) : this.trigger(c)
		}
	});
	p.fn.extend({
		hover: function(b, c) {
			return this.mouseenter(b).mouseleave(c || b)
		}
	});
	da.focusin = "onfocusin" in b;
	da.focusin || p.each({
		focus: "focusin",
		blur: "focusout"
	}, function(b, c) {
		var d = function(b) {
			p.event.simulate(c, b.target, p.event.fix(b))
		};
		p.event.special[c] = {
			setup: function() {
				var e = this.ownerDocument || this,
					j = T.access(e, c);
				j || e.addEventListener(b, d, !0);
				T.access(e, c, (j || 0) + 1)
			},
			teardown: function() {
				var e = this.ownerDocument || this,
					j = T.access(e, c) - 1;
				j ? T.access(e, c, j) : (e.removeEventListener(b, d, !0), T.remove(e, c))
			}
		}
	});
	var zb = b.location,
		Ac = p.now(),
		Wb = /\?/;
	p.parseXML = function(c) {
		var d;
		if (!c || "string" != typeof c) return null;
		try {
			d = (new b.DOMParser).parseFromString(c, "text/xml")
		} catch (e) {
			d = void 0
		}
		return d && !d.getElementsByTagName("parsererror").length || p.error("Invalid XML: " + c), d
	};
	var Pc = /\[\]$/,
		Bc = /\r?\n/g,
		td = /^(?:submit|button|image|reset|file)$/i,
		ud = /^(?:input|select|textarea|keygen)/i;
	p.param = function(b, c) {
		var d, e = [],
			j = function(b, c) {
				var d = p.isFunction(c) ? c() : c;
				e[e.length] = encodeURIComponent(b) + "=" + encodeURIComponent(null == d ? "" : d)
			};
		if (Array.isArray(b) || b.jquery && !p.isPlainObject(b)) p.each(b, function() {
			j(this.name, this.value)
		});
		else
			for (d in b) ha(d, b[d], c, j);
		return e.join("&")
	};
	p.fn.extend({
		serialize: function() {
			return p.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var b = p.prop(this, "elements");
				return b ? p.makeArray(b) : this
			}).filter(function() {
				var b = this.type;
				return this.name && !p(this).is(":disabled") && ud.test(this.nodeName) && !td.test(b) && (this.checked || !qc.test(b))
			}).map(function(b, c) {
				var d = p(this).val();
				return null == d ? null : Array.isArray(d) ? p.map(d, function(b) {
					return {
						name: c.name,
						value: b.replace(Bc, "\r\n")
					}
				}) : {
					name: c.name,
					value: d.replace(Bc, "\r\n")
				}
			}).get()
		}
	});
	var vd = /%20/g,
		wd = /#.*$/,
		xd = /([?&])_=[^&]*/,
		yd = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		zd = /^(?:GET|HEAD)$/,
		Ad = /^\/\//,
		Cc = {},
		Sb = {},
		Dc = "*/".concat("*"),
		Xb = Y.createElement("a");
	Xb.href = zb.href;
	p.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: zb.href,
			type: "GET",
			isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(zb.protocol),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Dc,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": JSON.parse,
				"text xml": p.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(b, c) {
			return c ? qa(qa(b, p.ajaxSettings), c) : qa(p.ajaxSettings, b)
		},
		ajaxPrefilter: na(Cc),
		ajaxTransport: na(Sb),
		ajax: function(c, d) {
			function e(c, d, x, l) {
				var M, q, z, J, Q = d;
				if (!r) {
					r = !0;
					g && b.clearTimeout(g);
					j = void 0;
					f = l || "";
					S.readyState = 0 < c ? 4 : 0;
					l = 200 <= c && 300 > c || 304 === c;
					if (x) {
						z = t;
						for (var y = S, N, A, aa, ha, B = z.contents, G = z.dataTypes;
							"*" === G[0];) G.shift(), void 0 === N && (N = z.mimeType || y.getResponseHeader("Content-Type"));
						if (N)
							for (A in B)
								if (B[A] && B[A].test(N)) {
									G.unshift(A);
									break
								}
						if (G[0] in x) aa = G[0];
						else {
							for (A in x) {
								if (!G[0] || z.converters[A + " " + G[0]]) {
									aa = A;
									break
								}
								ha || (ha = A)
							}
							aa = aa || ha
						}
						x = aa ? (aa !== G[0] && G.unshift(aa), x[aa]) : void 0;
						z = x
					}
					var C;
					a: {
						x = t;N = z;A = S;aa = l;
						var I, qa, na;z = {};y = x.dataTypes.slice();
						if (y[1])
							for (I in x.converters) z[I.toLowerCase()] = x.converters[I];
						for (ha = y.shift(); ha;)
							if (x.responseFields[ha] && (A[x.responseFields[ha]] = N), !na && aa && x.dataFilter && (N = x.dataFilter(N, x.dataType)), na = ha, ha = y.shift())
								if ("*" === ha) ha = na;
								else if ("*" !== na && na !== ha) {
							if (I = z[na + " " + ha] || z["* " + ha], !I)
								for (C in z)
									if (qa = C.split(" "), qa[1] === ha && (I = z[na + " " + qa[0]] || z["* " + qa[0]])) {
										!0 === I ? I = z[C] : !0 !== z[C] && (ha = qa[0], y.unshift(qa[1]));
										break
									}
							if (!0 !== I)
								if (I && x["throws"]) N = I(N);
								else try {
									N = I(N)
								} catch (Ka) {
									C = {
										state: "parsererror",
										error: I ? Ka : "No conversion from " + na + " to " + ha
									};
									break a
								}
						}
						C = {
							state: "success",
							data: N
						}
					}
					z = C;
					l ? (t.ifModified && (J = S.getResponseHeader("Last-Modified"), J && (p.lastModified[n] = J), J = S.getResponseHeader("etag"), J && (p.etag[n] = J)), 204 === c || "HEAD" === t.type ? Q = "nocontent" : 304 === c ? Q = "notmodified" : (Q = z.state, M = z.data, q = z.error, l = !q)) : (q = Q, !c && Q || (Q = "error", 0 > c && (c = 0)));
					S.status = c;
					S.statusText = (d || Q) + "";
					l ? L.resolveWith(D, [M, Q, S]) : L.rejectWith(D, [S, Q, q]);
					S.statusCode(m);
					m = void 0;
					u && W.trigger(l ? "ajaxSuccess" : "ajaxError", [S, t, l ? M : q]);
					s.fireWith(D, [S, Q]);
					u && (W.trigger("ajaxComplete", [S, t]), --p.active || p.event.trigger("ajaxStop"))
				}
			}
			"object" == typeof c && (d = c, c = void 0);
			d = d || {};
			var j, n, f, x, g, l, r, u, M, q, t = p.ajaxSetup({}, d),
				D = t.context || t,
				W = t.context && (D.nodeType || D.jquery) ? p(D) : p.event,
				L = p.Deferred(),
				s = p.Callbacks("once memory"),
				m = t.statusCode || {},
				z = {},
				J = {},
				Q = "canceled",
				S = {
					readyState: 0,
					getResponseHeader: function(b) {
						var c;
						if (r) {
							if (!x)
								for (x = {}; c = yd.exec(f);) x[c[1].toLowerCase()] = c[2];
							c = x[b.toLowerCase()]
						}
						return null == c ? null : c
					},
					getAllResponseHeaders: function() {
						return r ? f : null
					},
					setRequestHeader: function(b, c) {
						return null == r && (b = J[b.toLowerCase()] = J[b.toLowerCase()] || b, z[b] = c), this
					},
					overrideMimeType: function(b) {
						return null == r && (t.mimeType = b), this
					},
					statusCode: function(b) {
						var c;
						if (b)
							if (r) S.always(b[S.status]);
							else
								for (c in b) m[c] = [m[c], b[c]];
						return this
					},
					abort: function(b) {
						b = b || Q;
						return j && j.abort(b), e(0, b), this
					}
				};
			if (L.promise(S), t.url = ((c || t.url || zb.href) + "").replace(Ad, zb.protocol + "//"), t.type = d.method || d.type || t.method || t.type, t.dataTypes = (t.dataType || "*").toLowerCase().match(ta) || [""], null == t.crossDomain) {
				l = Y.createElement("a");
				try {
					l.href = t.url, l.href = l.href, t.crossDomain = Xb.protocol + "//" + Xb.host != l.protocol + "//" + l.host
				} catch (y) {
					t.crossDomain = !0
				}
			}
			if (t.data && t.processData && "string" != typeof t.data && (t.data = p.param(t.data, t.traditional)), Ka(Cc, t, d, S), r) return S;
			(u = p.event && t.global) && 0 === p.active++ && p.event.trigger("ajaxStart");
			t.type = t.type.toUpperCase();
			t.hasContent = !zd.test(t.type);
			n = t.url.replace(wd, "");
			t.hasContent ? t.data && t.processData && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && (t.data = t.data.replace(vd, "+")) : (q = t.url.slice(n.length), t.data && (n += (Wb.test(n) ? "&" : "?") + t.data, delete t.data), !1 === t.cache && (n = n.replace(xd, "$1"), q = (Wb.test(n) ? "&" : "?") + "_=" + Ac++ + q), t.url = n + q);
			t.ifModified && (p.lastModified[n] && S.setRequestHeader("If-Modified-Since", p.lastModified[n]), p.etag[n] && S.setRequestHeader("If-None-Match", p.etag[n]));
			(t.data && t.hasContent && !1 !== t.contentType || d.contentType) && S.setRequestHeader("Content-Type", t.contentType);
			S.setRequestHeader("Accept", t.dataTypes[0] && t.accepts[t.dataTypes[0]] ? t.accepts[t.dataTypes[0]] + ("*" !== t.dataTypes[0] ? ", " + Dc + "; q=0.01" : "") : t.accepts["*"]);
			for (M in t.headers) S.setRequestHeader(M, t.headers[M]);
			if (t.beforeSend && (!1 === t.beforeSend.call(D, S, t) || r)) return S.abort();
			if (Q = "abort", s.add(t.complete), S.done(t.success), S.fail(t.error), j = Ka(Sb, t, d, S)) {
				if (S.readyState = 1, u && W.trigger("ajaxSend", [S, t]), r) return S;
				t.async && 0 < t.timeout && (g = b.setTimeout(function() {
					S.abort("timeout")
				}, t.timeout));
				try {
					r = !1, j.send(z, e)
				} catch (N) {
					if (r) throw N;
					e(-1, N)
				}
			} else e(-1, "No Transport");
			return S
		},
		getJSON: function(b, c, d) {
			return p.get(b, c, d, "json")
		},
		getScript: function(b, c) {
			return p.get(b, void 0, c, "script")
		}
	});
	p.each(["get", "post"], function(b, c) {
		p[c] = function(b, d, e, j) {
			return p.isFunction(d) && (j = j || e, e = d, d = void 0), p.ajax(p.extend({
				url: b,
				type: c,
				dataType: j,
				data: d,
				success: e
			}, p.isPlainObject(b) && b))
		}
	});
	p._evalUrl = function(b) {
		return p.ajax({
			url: b,
			type: "GET",
			dataType: "script",
			cache: !0,
			async: !1,
			global: !1,
			"throws": !0
		})
	};
	p.fn.extend({
		wrapAll: function(b) {
			var c;
			return this[0] && (p.isFunction(b) && (b = b.call(this[0])), c = p(b, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && c.insertBefore(this[0]), c.map(function() {
				for (var b = this; b.firstElementChild;) b = b.firstElementChild;
				return b
			}).append(this)), this
		},
		wrapInner: function(b) {
			return p.isFunction(b) ? this.each(function(c) {
				p(this).wrapInner(b.call(this, c))
			}) : this.each(function() {
				var c = p(this),
					d = c.contents();
				d.length ? d.wrapAll(b) : c.append(b)
			})
		},
		wrap: function(b) {
			var c = p.isFunction(b);
			return this.each(function(d) {
				p(this).wrapAll(c ? b.call(this, d) : b)
			})
		},
		unwrap: function(b) {
			return this.parent(b).not("body").each(function() {
				p(this).replaceWith(this.childNodes)
			}), this
		}
	});
	p.expr.pseudos.hidden = function(b) {
		return !p.expr.pseudos.visible(b)
	};
	p.expr.pseudos.visible = function(b) {
		return !(!b.offsetWidth && !b.offsetHeight && !b.getClientRects().length)
	};
	p.ajaxSettings.xhr = function() {
		try {
			return new b.XMLHttpRequest
		} catch (c) {}
	};
	var Bd = {
			"0": 200,
			1223: 204
		},
		Ab = p.ajaxSettings.xhr();
	da.cors = !!Ab && "withCredentials" in Ab;
	da.ajax = Ab = !!Ab;
	p.ajaxTransport(function(c) {
		var d, e;
		if (da.cors || Ab && !c.crossDomain) return {
			send: function(j, n) {
				var f, x = c.xhr();
				if (x.open(c.type, c.url, c.async, c.username, c.password), c.xhrFields)
					for (f in c.xhrFields) x[f] = c.xhrFields[f];
				c.mimeType && x.overrideMimeType && x.overrideMimeType(c.mimeType);
				c.crossDomain || j["X-Requested-With"] || (j["X-Requested-With"] = "XMLHttpRequest");
				for (f in j) x.setRequestHeader(f, j[f]);
				d = function(b) {
					return function() {
						d && (d = e = x.onload = x.onerror = x.onabort = x.onreadystatechange = null, "abort" === b ? x.abort() : "error" === b ? "number" != typeof x.status ? n(0, "error") : n(x.status, x.statusText) : n(Bd[x.status] || x.status, x.statusText, "text" !== (x.responseType || "text") || "string" != typeof x.responseText ? {
							binary: x.response
						} : {
							text: x.responseText
						}, x.getAllResponseHeaders()))
					}
				};
				x.onload = d();
				e = x.onerror = d("error");
				void 0 !== x.onabort ? x.onabort = e : x.onreadystatechange = function() {
					4 === x.readyState && b.setTimeout(function() {
						d && e()
					})
				};
				d = d("abort");
				try {
					x.send(c.hasContent && c.data || null)
				} catch (l) {
					if (d) throw l;
				}
			},
			abort: function() {
				d && d()
			}
		}
	});
	p.ajaxPrefilter(function(b) {
		b.crossDomain && (b.contents.script = !1)
	});
	p.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function(b) {
				return p.globalEval(b), b
			}
		}
	});
	p.ajaxPrefilter("script", function(b) {
		void 0 === b.cache && (b.cache = !1);
		b.crossDomain && (b.type = "GET")
	});
	p.ajaxTransport("script", function(b) {
		if (b.crossDomain) {
			var c, d;
			return {
				send: function(e, j) {
					c = p("<script>").prop({
						charset: b.scriptCharset,
						src: b.url
					}).on("load error", d = function(b) {
						c.remove();
						d = null;
						b && j("error" === b.type ? 404 : 200, b.type)
					});
					Y.head.appendChild(c[0])
				},
				abort: function() {
					d && d()
				}
			}
		}
	});
	var Ec = [],
		Yb = /(=)\?(?=&|$)|\?\?/;
	p.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var b = Ec.pop() || p.expando + "_" + Ac++;
			return this[b] = !0, b
		}
	});
	p.ajaxPrefilter("json jsonp", function(c, d, e) {
		var j, n, f, x = !1 !== c.jsonp && (Yb.test(c.url) ? "url" : "string" == typeof c.data && 0 === (c.contentType || "").indexOf("application/x-www-form-urlencoded") && Yb.test(c.data) && "data");
		if (x || "jsonp" === c.dataTypes[0]) return j = c.jsonpCallback = p.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, x ? c[x] = c[x].replace(Yb, "$1" + j) : !1 !== c.jsonp && (c.url += (Wb.test(c.url) ? "&" : "?") + c.jsonp +
			"=" + j), c.converters["script json"] = function() {
			return f || p.error(j + " was not called"), f[0]
		}, c.dataTypes[0] = "json", n = b[j], b[j] = function() {
			f = arguments
		}, e.always(function() {
			void 0 === n ? p(b).removeProp(j) : b[j] = n;
			c[j] && (c.jsonpCallback = d.jsonpCallback, Ec.push(j));
			f && p.isFunction(n) && n(f[0]);
			f = n = void 0
		}), "script"
	});
	var Cd = da,
		Fc, Gc = Y.implementation.createHTMLDocument("").body;
	Fc = (Gc.innerHTML = "<form></form><form></form>", 2 === Gc.childNodes.length);
	Cd.createHTMLDocument = Fc;
	p.parseHTML = function(b, c, d) {
		if ("string" != typeof b) return [];
		"boolean" == typeof c && (d = c, c = !1);
		var e, j, n;
		return c || (da.createHTMLDocument ? (c = Y.implementation.createHTMLDocument(""), e = c.createElement("base"), e.href = Y.location.href, c.head.appendChild(e)) : c = Y), j = mc.exec(b), n = !d && [], j ? [c.createElement(j[1])] : (j = I([b], c, n), n && n.length && p(n).remove(), p.merge([], j.childNodes))
	};
	p.fn.load = function(b, c, d) {
		var e, j, n, f = this,
			x = b.indexOf(" ");
		return -1 < x && (e = W(b.slice(x)), b = b.slice(0, x)), p.isFunction(c) ? (d = c, c = void 0) : c && "object" == typeof c && (j = "POST"), 0 < f.length && p.ajax({
			url: b,
			type: j || "GET",
			dataType: "html",
			data: c
		}).done(function(b) {
			n = arguments;
			f.html(e ? p("<div>").append(p.parseHTML(b)).find(e) : b)
		}).always(d && function(b, c) {
			f.each(function() {
				d.apply(this, n || [b.responseText, c, b])
			})
		}), this
	};
	p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, c) {
		p.fn[c] = function(b) {
			return this.on(c, b)
		}
	});
	p.expr.pseudos.animated = function(b) {
		return p.grep(p.timers, function(c) {
			return b === c.elem
		}).length
	};
	p.offset = {
		setOffset: function(b, c, d) {
			var e, j, n, f, x, l, g = p.css(b, "position"),
				r = p(b),
				u = {};
			"static" === g && (b.style.position = "relative");
			x = r.offset();
			n = p.css(b, "top");
			l = p.css(b, "left");
			("absolute" === g || "fixed" === g) && -1 < (n + l).indexOf("auto") ? (e = r.position(), f = e.top, j = e.left) : (f = parseFloat(n) || 0, j = parseFloat(l) || 0);
			p.isFunction(c) && (c = c.call(b, d, p.extend({}, x)));
			null != c.top && (u.top = c.top - x.top + f);
			null != c.left && (u.left = c.left - x.left + j);
			"using" in c ? c.using.call(b, u) : r.css(u)
		}
	};
	p.fn.extend({
		offset: function(b) {
			if (arguments.length) return void 0 === b ? this : this.each(function(c) {
				p.offset.setOffset(this, b, c)
			});
			var c, d, e, j, n = this[0];
			if (n) return n.getClientRects().length ? (e = n.getBoundingClientRect(), c = n.ownerDocument, d = c.documentElement, j = c.defaultView, {
				top: e.top + j.pageYOffset - d.clientTop,
				left: e.left + j.pageXOffset - d.clientLeft
			}) : {
				top: 0,
				left: 0
			}
		},
		position: function() {
			if (this[0]) {
				var b, c, d = this[0],
					e = {
						top: 0,
						left: 0
					};
				return "fixed" === p.css(d, "position") ? c = d.getBoundingClientRect() : (b = this.offsetParent(), c = this.offset(), f(b[0], "html") || (e = b.offset()), e = {
					top: e.top +
						p.css(b[0], "borderTopWidth", !0),
					left: e.left + p.css(b[0], "borderLeftWidth", !0)
				}), {
					top: c.top - e.top - p.css(d, "marginTop", !0),
					left: c.left - e.left - p.css(d, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var b = this.offsetParent; b && "static" === p.css(b, "position");) b = b.offsetParent;
				return b || Ob
			})
		}
	});
	p.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(b, c) {
		var d = "pageYOffset" === c;
		p.fn[b] = function(e) {
			return Ia(this, function(b, e, j) {
				var n;
				return p.isWindow(b) ? n = b : 9 === b.nodeType && (n = b.defaultView), void 0 === j ? n ? n[c] : b[e] : void(n ? n.scrollTo(d ? n.pageXOffset : j, d ? j : n.pageYOffset) : b[e] = j)
			}, b, e, arguments.length)
		}
	});
	p.each(["top", "left"], function(b, c) {
		p.cssHooks[c] = t(da.pixelPosition, function(b, d) {
			if (d) return d = r(b, c), Rb.test(d) ? p(b).position()[c] + "px" : d
		})
	});
	p.each({
		Height: "height",
		Width: "width"
	}, function(b, c) {
		p.each({
			padding: "inner" + b,
			content: c,
			"": "outer" + b
		}, function(d, e) {
			p.fn[e] = function(j, n) {
				var f = arguments.length && (d || "boolean" != typeof j),
					x = d || (!0 === j || !0 === n ? "margin" : "border");
				return Ia(this, function(c, d, j) {
					var n;
					return p.isWindow(c) ? 0 === e.indexOf("outer") ? c["inner" + b] : c.document.documentElement["client" + b] : 9 === c.nodeType ? (n = c.documentElement, Math.max(c.body["scroll" + b], n["scroll" + b], c.body["offset" + b], n["offset" + b], n["client" + b])) : void 0 === j ? p.css(c, d, x) : p.style(c, d, j, x)
				}, c, f ? j : void 0, f)
			}
		})
	});
	p.fn.extend({
		bind: function(b, c, d) {
			return this.on(b, null, c, d)
		},
		unbind: function(b, c) {
			return this.off(b, null, c)
		},
		delegate: function(b, c, d, e) {
			return this.on(c, b, d, e)
		},
		undelegate: function(b, c, d) {
			return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", d)
		}
	});
	p.holdReady = function(b) {
		b ? p.readyWait++ : p.ready(!0)
	};
	p.isArray = Array.isArray;
	p.parseJSON = JSON.parse;
	p.nodeName = f;
	"function" == typeof define && define.amd && define("jquery", [], function() {
		return p
	});
	var Dd = b.jQuery,
		Ed = b.$;
	return p.noConflict = function(c) {
		return b.$ === p && (b.$ = Ed), c && b.jQuery === p && (b.jQuery = Dd), p
	}, c || (b.jQuery = b.$ = p), p
});

function getInternetExplorerVersion() {
	var b = -1;
	"Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
	return b
}
var ie = getInternetExplorerVersion();

function getQueryVariable(b) {
	for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
		var e = c[d].split("=");
		if (decodeURIComponent(e[0]) == b) return decodeURIComponent(e[1])
	}
};
this.jukebox = {};
jukebox.Player = function(b, c) {
	this.id = ++jukebox.__jukeboxId;
	this.origin = c || null;
	this.settings = {};
	for (var d in this.defaults) this.settings[d] = this.defaults[d];
	if ("[object Object]" === Object.prototype.toString.call(b))
		for (var e in b) this.settings[e] = b[e];
	"[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager);
	this.resource = this.isPlaying = null;
	this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) : this.settings.resources[0] || null;
	if (null === this.resource) throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
	this.__init();
	return this
};
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
	defaults: {
		resources: [],
		autoplay: !1,
		spritemap: {},
		flashMediaElement: "./swf/FlashMediaElement.swf",
		timeout: 1E3
	},
	__addToManager: function() {
		!0 !== this.__wasAddedToManager && (jukebox.Manager.add(this), this.__wasAddedToManager = !0)
	},
	__init: function() {
		var b = this,
			c = this.settings,
			d = {},
			e;
		jukebox.Manager && void 0 !== jukebox.Manager.features && (d = jukebox.Manager.features);
		if (!0 === d.html5audio) {
			this.context = new Audio;
			this.context.src = this.resource;
			if (null === this.origin) {
				var f = function(c) {
					b.__addToManager(c)
				};
				this.context.addEventListener("canplaythrough", f, !0);
				window.setTimeout(function() {
					b.context.removeEventListener("canplaythrough", f, !0);
					f("timeout")
				}, c.timeout)
			}
			this.context.autobuffer = !0;
			this.context.preload = !0;
			for (e in this.HTML5API) this[e] = this.HTML5API[e];
			1 < d.channels ? !0 === c.autoplay ? this.context.autoplay = !0 : void 0 !== c.spritemap[c.autoplay] && this.play(c.autoplay) : 1 === d.channels && void 0 !== c.spritemap[c.autoplay] && (this.backgroundMusic = c.spritemap[c.autoplay], this.backgroundMusic.started = Date.now ? Date.now() : +new Date, this.play(c.autoplay));
			1 == d.channels && !0 !== c.canPlayBackground && (window.addEventListener("pagehide", function() {
				null !== b.isPlaying && (b.pause(), b.__wasAutoPaused = !0)
			}), window.addEventListener("pageshow", function() {
				b.__wasAutoPaused && (b.resume(), delete b._wasAutoPaused)
			}))
		} else if (!0 === d.flashaudio) {
			for (e in this.FLASHAPI) this[e] = this.FLASHAPI[e];
			d = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
			this.__initFlashContext(d);
			!0 === c.autoplay ? this.play(0) : c.spritemap[c.autoplay] && this.play(c.autoplay)
		} else throw "Your Browser does not support Flash Audio or HTML5 Audio.";
	},
	__initFlashContext: function(b) {
		var c, d = this.settings.flashMediaElement,
			e, f = {
				flashvars: b.join("&"),
				quality: "high",
				bgcolor: "#000000",
				wmode: "transparent",
				allowscriptaccess: "always",
				allowfullscreen: "true"
			};
		if (navigator.userAgent.match(/MSIE/)) {
			c = document.createElement("div");
			document.getElementsByTagName("body")[0].appendChild(c);
			var g = document.createElement("object");
			g.id = "jukebox-flashstream-" + this.id;
			g.setAttribute("type", "application/x-shockwave-flash");
			g.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
			g.setAttribute("width", "0");
			g.setAttribute("height", "0");
			f.movie = d + "?x=" + (Date.now ? Date.now() : +new Date);
			f.flashvars = b.join("&amp;");
			for (e in f) b = document.createElement("param"), b.setAttribute("name", e), b.setAttribute("value", f[e]), g.appendChild(b);
			c.outerHTML = g.outerHTML;
			this.context = document.getElementById("jukebox-flashstream-" + this.id)
		} else {
			c = document.createElement("embed");
			c.id = "jukebox-flashstream-" + this.id;
			c.setAttribute("type", "application/x-shockwave-flash");
			c.setAttribute("width", "100");
			c.setAttribute("height", "100");
			f.play = !1;
			f.loop = !1;
			f.src = d + "?x=" + (Date.now ? Date.now() : +new Date);
			for (e in f) c.setAttribute(e, f[e]);
			document.getElementsByTagName("body")[0].appendChild(c);
			this.context = c
		}
	},
	backgroundHackForiOS: function() {
		if (void 0 !== this.backgroundMusic) {
			var b = Date.now ? Date.now() : +new Date;
			void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started = b, this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (b - this.backgroundMusic.started) / 1E3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start, this.play(this.backgroundMusic.lastPointer))
		}
	},
	play: function(b, c) {
		if (null !== this.isPlaying && !0 !== c) void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(b, this.id);
		else {
			var d = this.settings.spritemap,
				e;
			if (void 0 !== d[b]) e = d[b].start;
			else if ("number" === typeof b) {
				e = b;
				for (var f in d)
					if (e >= d[f].start && e <= d[f].end) {
						b = f;
						break
					}
			}
			void 0 !== e && "[object Object]" === Object.prototype.toString.call(d[b]) && (this.isPlaying = this.settings.spritemap[b], this.context.play && this.context.play(), this.wasReady = this.setCurrentTime(e))
		}
	},
	stop: function() {
		this.__lastPosition = 0;
		this.isPlaying = null;
		this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause();
		return !0
	},
	pause: function() {
		this.isPlaying = null;
		this.__lastPosition = this.getCurrentTime();
		this.context.pause();
		return this.__lastPosition
	},
	resume: function(b) {
		b = "number" === typeof b ? b : this.__lastPosition;
		if (null !== b) return this.play(b), this.__lastPosition = null, !0;
		this.context.play();
		return !1
	},
	HTML5API: {
		getVolume: function() {
			return this.context.volume || 1
		},
		setVolume: function(b) {
			this.context.volume = b;
			return 1E-4 > Math.abs(this.context.volume - b) ? !0 : !1
		},
		getCurrentTime: function() {
			return this.context.currentTime || 0
		},
		setCurrentTime: function(b) {
			try {
				return this.context.currentTime = b, !0
			} catch (c) {
				return !1
			}
		}
	},
	FLASHAPI: {
		getVolume: function() {
			return this.context && "function" === typeof this.context.getVolume ? this.context.getVolume() : 1
		},
		setVolume: function(b) {
			return this.context && "function" === typeof this.context.setVolume ? (this.context.setVolume(b), !0) : !1
		},
		getCurrentTime: function() {
			return this.context && "function" === typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0
		},
		setCurrentTime: function(b) {
			return this.context && "function" === typeof this.context.setCurrentTime ? this.context.setCurrentTime(b) : !1
		}
	}
};
if (void 0 === this.jukebox) throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(b) {
	this.features = {};
	this.codecs = {};
	this.__players = {};
	this.__playersLength = 0;
	this.__clones = {};
	this.__queue = [];
	this.settings = {};
	for (var c in this.defaults) this.settings[c] = this.defaults[c];
	if ("[object Object]" === Object.prototype.toString.call(b))
		for (var d in b) this.settings[d] = b[d];
	this.__detectFeatures();
	jukebox.Manager.__initialized = !1 === this.settings.useGameLoop ? window.setInterval(function() {
		jukebox.Manager.loop()
	}, 20) : !0
};
jukebox.Manager.prototype = {
	defaults: {
		useFlash: !1,
		useGameLoop: !1
	},
	__detectFeatures: function() {
		var b = window.Audio && new Audio;
		if (b && b.canPlayType && !1 === this.settings.useFlash) {
			for (var c = [{
					e: "3gp",
					m: ["audio/3gpp", "audio/amr"]
				}, {
					e: "aac",
					m: ["audio/aac", "audio/aacp"]
				}, {
					e: "amr",
					m: ["audio/amr", "audio/3gpp"]
				}, {
					e: "caf",
					m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"']
				}, {
					e: "m4a",
					m: 'audio/mp4{audio/mp4; codecs="mp4a.40.2,avc1.42E01E"{audio/mpeg4{audio/mpeg4-generic{audio/mp4a-latm{audio/MP4A-LATM{audio/x-m4a'.split("{")
				}, {
					e: "mp3",
					m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"]
				}, {
					e: "mpga",
					m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"]
				}, {
					e: "mp4",
					m: ["audio/mp4", "video/mp4"]
				}, {
					e: "ogg",
					m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
				}, {
					e: "wav",
					m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"]
				}, {
					e: "webm",
					m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"]
				}], d, e, f = 0, g = c.length; f < g; f++)
				if (e = c[f].e, c[f].m.length && "object" === typeof c[f].m)
					for (var m = 0, l = c[f].m.length; m < l; m++)
						if (d = c[f].m[m], "" !== b.canPlayType(d)) {
							this.codecs[e] = d;
							break
						} else this.codecs[e] || (this.codecs[e] = !1);
			this.features.html5audio = !(!this.codecs.mp3 && !this.codecs.ogg && !this.codecs.webm && !this.codecs.wav);
			this.features.channels = 8;
			b.volume = 0.1337;
			this.features.volume = !!(1E-4 > Math.abs(b.volume - 0.1337));
			navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
		}
		this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1;
		if (window.ActiveXObject) try {
			new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"), this.features.flashaudio = !0
		} catch (j) {}!0 === this.settings.useFlash && (this.features.flashaudio = !0);
		!0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "audio/mp3", this.codecs.mpga = "audio/mpeg", this.codecs.mp4 = "audio/mp4", this.codecs.m4a = "audio/mp4", this.codecs["3gp"] = "audio/3gpp", this.codecs.amr = "audio/amr", this.features.volume = !0, this.features.channels = 1)
	},
	__getPlayerById: function(b) {
		return this.__players && void 0 !== this.__players[b] ? this.__players[b] : null
	},
	__getClone: function(b, c) {
		for (var d in this.__clones) {
			var e = this.__clones[d];
			if (null === e.isPlaying && e.origin === b) return e
		}
		if ("[object Object]" === Object.prototype.toString.call(c)) {
			d = {};
			for (var f in c) d[f] = c[f];
			d.autoplay = !1;
			f = new jukebox.Player(d, b);
			f.isClone = !0;
			f.wasReady = !1;
			return this.__clones[f.id] = f
		}
		return null
	},
	loop: function() {
		if (0 !== this.__playersLength)
			if (this.__queue.length && this.__playersLength < this.features.channels) {
				var b = this.__queue[0],
					c = this.__getPlayerById(b.origin);
				if (null !== c) {
					var d = this.__getClone(b.origin, c.settings);
					null !== d && (!0 === this.features.volume && (c = this.__players[b.origin]) && d.setVolume(c.getVolume()), this.add(d), d.play(b.pointer, !0))
				}
				this.__queue.splice(0, 1)
			} else
				for (d in this.__queue.length && 1 === this.features.channels && (b = this.__queue[0], c = this.__getPlayerById(b.origin), null !== c && c.play(b.pointer, !0), this.__queue.splice(0, 1)), this.__players) b = this.__players[d], c = b.getCurrentTime() || 0, b.isPlaying && !1 === b.wasReady ? b.wasReady = b.setCurrentTime(b.isPlaying.start) : b.isPlaying && !0 === b.wasReady ? c > b.isPlaying.end && (!0 === b.isPlaying.loop ? b.play(b.isPlaying.start, !0) : b.stop()) : b.isClone && null === b.isPlaying ? this.remove(b) : void 0 !== b.backgroundMusic && null === b.isPlaying && c > b.backgroundMusic.end && b.backgroundHackForiOS()
	},
	getPlayableResource: function(b) {
		"[object Array]" !== Object.prototype.toString.call(b) && (b = [b]);
		for (var c = 0, d = b.length; c < d; c++) {
			var e = b[c],
				f = e.match(/\.([^\.]*)$/)[1];
			if (f && this.codecs[f]) return e
		}
		return null
	},
	add: function(b) {
		return b instanceof jukebox.Player && void 0 === this.__players[b.id] ? (this.__playersLength++, this.__players[b.id] = b, !0) : !1
	},
	remove: function(b) {
		return b instanceof jukebox.Player && void 0 !== this.__players[b.id] ? (this.__playersLength--, delete this.__players[b.id], !0) : !1
	},
	addToQueue: function(b, c) {
		return ("string" === typeof b || "number" === typeof b) && void 0 !== this.__players[c] ? (this.__queue.push({
			pointer: b,
			origin: c
		}), !0) : !1
	}
};
(function() {
	var b = function() {
		this.init()
	};
	b.prototype = {
		init: function() {
			var b = this || c;
			b._counter = 1E3;
			b._codecs = {};
			b._howls = [];
			b._muted = !1;
			b._volume = 1;
			b._canPlayEvent = "canplaythrough";
			b._navigator = "undefined" !== typeof window && window.navigator ? window.navigator : null;
			b.masterGain = null;
			b.noAudio = !1;
			b.usingWebAudio = !0;
			b.autoSuspend = !0;
			b.ctx = null;
			b.mobileAutoEnable = !0;
			b._setup();
			return b
		},
		volume: function(b) {
			var d = this || c;
			b = parseFloat(b);
			d.ctx || l();
			if ("undefined" !== typeof b && 0 <= b && 1 >= b) {
				d._volume = b;
				if (d._muted) return d;
				d.usingWebAudio && d.masterGain.gain.setValueAtTime(b, c.ctx.currentTime);
				for (var e = 0; e < d._howls.length; e++)
					if (!d._howls[e]._webAudio)
						for (var f = d._howls[e]._getSoundIds(), g = 0; g < f.length; g++) {
							var m = d._howls[e]._soundById(f[g]);
							m && m._node && (m._node.volume = m._volume * b)
						}
				return d
			}
			return d._volume
		},
		mute: function(b) {
			var d = this || c;
			d.ctx || l();
			d._muted = b;
			d.usingWebAudio && d.masterGain.gain.setValueAtTime(b ? 0 : d._volume, c.ctx.currentTime);
			for (var e = 0; e < d._howls.length; e++)
				if (!d._howls[e]._webAudio)
					for (var f = d._howls[e]._getSoundIds(), g = 0; g < f.length; g++) {
						var m = d._howls[e]._soundById(f[g]);
						m && m._node && (m._node.muted = b ? !0 : m._muted)
					}
			return d
		},
		unload: function() {
			for (var b = this || c, d = b._howls.length - 1; 0 <= d; d--) b._howls[d].unload();
			b.usingWebAudio && (b.ctx && "undefined" !== typeof b.ctx.close) && (b.ctx.close(), b.ctx = null, l());
			return b
		},
		codecs: function(b) {
			return (this || c)._codecs[b.replace(/^x-/, "")]
		},
		_setup: function() {
			var b = this || c;
			b.state = b.ctx ? b.ctx.state || "running" : "running";
			b._autoSuspend();
			if (!b.usingWebAudio)
				if ("undefined" !== typeof Audio) try {
					var d = new Audio;
					"undefined" === typeof d.oncanplaythrough && (b._canPlayEvent = "canplay")
				} catch (e) {
					b.noAudio = !0
				} else b.noAudio = !0;
			try {
				d = new Audio, d.muted && (b.noAudio = !0)
			} catch (f) {}
			b.noAudio || b._setupCodecs();
			return b
		},
		_setupCodecs: function() {
			var b = this || c,
				d = null;
			try {
				d = "undefined" !== typeof Audio ? new Audio : null
			} catch (e) {
				return b
			}
			if (!d || "function" !== typeof d.canPlayType) return b;
			var f = d.canPlayType("audio/mpeg;").replace(/^no$/, ""),
				g = b._navigator && b._navigator.userAgent.match(/OPR\/([0-6].)/g),
				g = g && 33 > parseInt(g[0].split("/")[1], 10);
			b._codecs = {
				mp3: !(g || !f && !d.canPlayType("audio/mp3;").replace(/^no$/, "")),
				mpeg: !!f,
				opus: !!d.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
				ogg: !!d.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
				oga: !!d.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
				wav: !!d.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
				aac: !!d.canPlayType("audio/aac;").replace(/^no$/, ""),
				caf: !!d.canPlayType("audio/x-caf;").replace(/^no$/, ""),
				m4a: !!(d.canPlayType("audio/x-m4a;") || d.canPlayType("audio/m4a;") || d.canPlayType("audio/aac;")).replace(/^no$/, ""),
				mp4: !!(d.canPlayType("audio/x-mp4;") || d.canPlayType("audio/mp4;") || d.canPlayType("audio/aac;")).replace(/^no$/, ""),
				weba: !!d.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
				webm: !!d.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
				dolby: !!d.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
				flac: !!(d.canPlayType("audio/x-flac;") || d.canPlayType("audio/flac;")).replace(/^no$/, "")
			};
			return b
		},
		_enableMobileAudio: function() {
			var b = this || c,
				d = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(b._navigator && b._navigator.userAgent),
				e = !!("ontouchend" in window || b._navigator && 0 < b._navigator.maxTouchPoints || b._navigator && 0 < b._navigator.msMaxTouchPoints);
			if (!b._mobileEnabled && b.ctx && (d || e)) {
				b._mobileEnabled = !1;
				!b._mobileUnloaded && 44100 !== b.ctx.sampleRate && (b._mobileUnloaded = !0, b.unload());
				b._scratchBuffer = b.ctx.createBuffer(1, 1, 22050);
				var f = function() {
					c._autoResume();
					var d = b.ctx.createBufferSource();
					d.buffer = b._scratchBuffer;
					d.connect(b.ctx.destination);
					"undefined" === typeof d.start ? d.noteOn(0) : d.start(0);
					"function" === typeof b.ctx.resume && b.ctx.resume();
					d.onended = function() {
						d.disconnect(0);
						b._mobileEnabled = !0;
						b.mobileAutoEnable = !1;
						document.removeEventListener("touchstart", f, !0);
						document.removeEventListener("touchend", f, !0)
					}
				};
				document.addEventListener("touchstart", f, !0);
				document.addEventListener("touchend", f, !0);
				return b
			}
		},
		_autoSuspend: function() {
			var b = this;
			if (b.autoSuspend && b.ctx && "undefined" !== typeof b.ctx.suspend && c.usingWebAudio) {
				for (var d = 0; d < b._howls.length; d++)
					if (b._howls[d]._webAudio)
						for (var e = 0; e < b._howls[d]._sounds.length; e++)
							if (!b._howls[d]._sounds[e]._paused) return b;
				b._suspendTimer && clearTimeout(b._suspendTimer);
				b._suspendTimer = setTimeout(function() {
					b.autoSuspend && (b._suspendTimer = null, b.state = "suspending", b.ctx.suspend().then(function() {
						b.state = "suspended";
						b._resumeAfterSuspend && (delete b._resumeAfterSuspend, b._autoResume())
					}))
				}, 3E4);
				return b
			}
		},
		_autoResume: function() {
			var b = this;
			if (b.ctx && "undefined" !== typeof b.ctx.resume && c.usingWebAudio) return "running" === b.state && b._suspendTimer ? (clearTimeout(b._suspendTimer), b._suspendTimer = null) : "suspended" === b.state ? (b.ctx.resume().then(function() {
				b.state = "running";
				for (var c = 0; c < b._howls.length; c++) b._howls[c]._emit("resume")
			}), b._suspendTimer && (clearTimeout(b._suspendTimer), b._suspendTimer = null)) : "suspending" === b.state && (b._resumeAfterSuspend = !0), b
		}
	};
	var c = new b,
		d = function(b) {
			!b.src || 0 === b.src.length ? console.error("An array of source files must be passed with any new Howl.") : this.init(b)
		};
	d.prototype = {
		init: function(b) {
			var d = this;
			c.ctx || l();
			d._autoplay = b.autoplay || !1;
			d._format = "string" !== typeof b.format ? b.format : [b.format];
			d._html5 = b.html5 || !1;
			d._muted = b.mute || !1;
			d._loop = b.loop || !1;
			d._pool = b.pool || 5;
			d._preload = "boolean" === typeof b.preload ? b.preload : !0;
			d._rate = b.rate || 1;
			d._sprite = b.sprite || {};
			d._src = "string" !== typeof b.src ? b.src : [b.src];
			d._volume = void 0 !== b.volume ? b.volume : 1;
			d._xhrWithCredentials = b.xhrWithCredentials || !1;
			d._duration = 0;
			d._state = "unloaded";
			d._sounds = [];
			d._endTimers = {};
			d._queue = [];
			d._playLock = !1;
			d._onend = b.onend ? [{
				fn: b.onend
			}] : [];
			d._onfade = b.onfade ? [{
				fn: b.onfade
			}] : [];
			d._onload = b.onload ? [{
				fn: b.onload
			}] : [];
			d._onloaderror = b.onloaderror ? [{
				fn: b.onloaderror
			}] : [];
			d._onplayerror = b.onplayerror ? [{
				fn: b.onplayerror
			}] : [];
			d._onpause = b.onpause ? [{
				fn: b.onpause
			}] : [];
			d._onplay = b.onplay ? [{
				fn: b.onplay
			}] : [];
			d._onstop = b.onstop ? [{
				fn: b.onstop
			}] : [];
			d._onmute = b.onmute ? [{
				fn: b.onmute
			}] : [];
			d._onvolume = b.onvolume ? [{
				fn: b.onvolume
			}] : [];
			d._onrate = b.onrate ? [{
				fn: b.onrate
			}] : [];
			d._onseek = b.onseek ? [{
				fn: b.onseek
			}] : [];
			d._onresume = [];
			d._webAudio = c.usingWebAudio && !d._html5;
			"undefined" !== typeof c.ctx && (c.ctx && c.mobileAutoEnable) && c._enableMobileAudio();
			c._howls.push(d);
			d._autoplay && d._queue.push({
				event: "play",
				action: function() {
					d.play()
				}
			});
			d._preload && d.load();
			return d
		},
		load: function() {
			var b = null;
			if (c.noAudio) this._emit("loaderror", null, "No audio support.");
			else {
				"string" === typeof this._src && (this._src = [this._src]);
				for (var d = 0; d < this._src.length; d++) {
					var l, y;
					if (this._format && this._format[d]) l = this._format[d];
					else {
						y = this._src[d];
						if ("string" !== typeof y) {
							this._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
							continue
						}(l = /^data:audio\/([^;,]+);/i.exec(y)) || (l = /\.([^.]+)$/.exec(y.split("?", 1)[0]));
						l && (l = l[1].toLowerCase())
					}
					l || console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
					if (l && c.codecs(l)) {
						b = this._src[d];
						break
					}
				}
				if (b) {
					this._src = b;
					this._state = "loading";
					"https:" === window.location.protocol && "http:" === b.slice(0, 5) && (this._html5 = !0, this._webAudio = !1);
					new e(this);
					if (this._webAudio) {
						var A = this,
							B = A._src;
						if (f[B]) A._duration = f[B].duration, m(A);
						else if (/^data:[^;]+;base64,/.test(B)) {
							b = atob(B.split(",")[1]);
							d = new Uint8Array(b.length);
							for (l = 0; l < b.length; ++l) d[l] = b.charCodeAt(l);
							g(d.buffer, A)
						} else {
							var E = new XMLHttpRequest;
							E.open("GET", B, !0);
							E.withCredentials = A._xhrWithCredentials;
							E.responseType = "arraybuffer";
							E.onload = function() {
								var b = (E.status + "")[0];
								"0" !== b && "2" !== b && "3" !== b ? A._emit("loaderror", null, "Failed loading audio file with status: " +
									E.status + ".") : g(E.response, A)
							};
							E.onerror = function() {
								A._webAudio && (A._html5 = !0, A._webAudio = !1, A._sounds = [], delete f[B], A.load())
							};
							try {
								E.send()
							} catch (F) {
								E.onerror()
							}
						}
					}
					return this
				}
				this._emit("loaderror", null, "No codec support for selected audio sources.")
			}
		},
		play: function(b, d) {
			var e = this,
				f = null;
			if ("number" === typeof b) f = b, b = null;
			else {
				if ("string" === typeof b && "loaded" === e._state && !e._sprite[b]) return null;
				if ("undefined" === typeof b) {
					b = "__default";
					for (var l = 0, g = 0; g < e._sounds.length; g++) e._sounds[g]._paused && !e._sounds[g]._ended && (l++, f = e._sounds[g]._id);
					1 === l ? b = null : f = null
				}
			}
			var m = f ? e._soundById(f) : e._inactiveSound();
			if (!m) return null;
			f && !b && (b = m._sprite || "__default");
			if ("loaded" !== e._state) {
				m._sprite = b;
				m._ended = !1;
				var F = m._id;
				e._queue.push({
					event: "play",
					action: function() {
						e.play(F)
					}
				});
				return F
			}
			if (f && !m._paused) return d || e._loadQueue("play"), m._id;
			e._webAudio && c._autoResume();
			var s = Math.max(0, 0 < m._seek ? m._seek : e._sprite[b][0] / 1E3),
				I = Math.max(0, (e._sprite[b][0] + e._sprite[b][1]) / 1E3 - s),
				G = 1E3 * I / Math.abs(m._rate);
			m._paused = !1;
			m._ended = !1;
			m._sprite = b;
			m._seek = s;
			m._start = e._sprite[b][0] / 1E3;
			m._stop = (e._sprite[b][0] + e._sprite[b][1]) / 1E3;
			m._loop = !(!m._loop && !e._sprite[b][2]);
			var C = m._node;
			if (e._webAudio) f = function() {
				e._refreshBuffer(m);
				C.gain.setValueAtTime(m._muted || e._muted ? 0 : m._volume, c.ctx.currentTime);
				m._playStart = c.ctx.currentTime;
				"undefined" === typeof C.bufferSource.start ? m._loop ? C.bufferSource.noteGrainOn(0, s, 86400) : C.bufferSource.noteGrainOn(0, s, I) : m._loop ? C.bufferSource.start(0, s, 86400) : C.bufferSource.start(0, s, I);
				Infinity !== G && (e._endTimers[m._id] = setTimeout(e._ended.bind(e, m), G));
				d || setTimeout(function() {
					e._emit("play", m._id)
				}, 0)
			}, "running" === c.state ? f() : (e.once("resume", f), e._clearTimer(m._id));
			else {
				var H = function() {
						C.currentTime = s;
						C.muted = m._muted || e._muted || c._muted || C.muted;
						C.volume = m._volume * c.volume();
						C.playbackRate = m._rate;
						try {
							var f = C.play();
							if ("undefined" !== typeof Promise && f instanceof Promise) {
								e._playLock = !0;
								var l = function() {
									e._playLock = !1;
									d || e._emit("play", m._id)
								};
								f.then(l, l)
							} else d || e._emit("play", m._id);
							C.playbackRate = m._rate;
							C.paused ? e._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.") : "__default" !== b || m._loop ? e._endTimers[m._id] = setTimeout(e._ended.bind(e, m), G) : (e._endTimers[m._id] = function() {
								e._ended(m);
								C.removeEventListener("ended", e._endTimers[m._id], !1)
							}, C.addEventListener("ended", e._endTimers[m._id], !1))
						} catch (g) {
							e._emit("playerror", m._id, g)
						}
					},
					f = window && window.ejecta || !C.readyState && c._navigator.isCocoonJS;
				if (3 <= C.readyState || f) H();
				else {
					var R = function() {
						H();
						C.removeEventListener(c._canPlayEvent, R, !1)
					};
					C.addEventListener(c._canPlayEvent, R, !1);
					e._clearTimer(m._id)
				}
			}
			return m._id
		},
		pause: function(b, c) {
			var d = this;
			if ("loaded" !== d._state || d._playLock) return d._queue.push({
				event: "pause",
				action: function() {
					d.pause(b)
				}
			}), d;
			for (var e = d._getSoundIds(b), f = 0; f < e.length; f++) {
				d._clearTimer(e[f]);
				var l = d._soundById(e[f]);
				if (l && !l._paused && (l._seek = d.seek(e[f]), l._rateSeek = 0, l._paused = !0, d._stopFade(e[f]), l._node))
					if (d._webAudio) {
						if (!l._node.bufferSource) continue;
						"undefined" === typeof l._node.bufferSource.stop ? l._node.bufferSource.noteOff(0) : l._node.bufferSource.stop(0);
						d._cleanBuffer(l._node)
					} else(!isNaN(l._node.duration) || Infinity === l._node.duration) && l._node.pause();
				c || d._emit("pause", l ? l._id : null)
			}
			return d
		},
		stop: function(b, c) {
			var d = this;
			if ("loaded" !== d._state) return d._queue.push({
				event: "stop",
				action: function() {
					d.stop(b)
				}
			}), d;
			for (var e = d._getSoundIds(b), f = 0; f < e.length; f++) {
				d._clearTimer(e[f]);
				var l = d._soundById(e[f]);
				if (l) {
					l._seek = l._start || 0;
					l._rateSeek = 0;
					l._paused = !0;
					l._ended = !0;
					d._stopFade(e[f]);
					if (l._node)
						if (d._webAudio) l._node.bufferSource && ("undefined" === typeof l._node.bufferSource.stop ? l._node.bufferSource.noteOff(0) : l._node.bufferSource.stop(0), d._cleanBuffer(l._node));
						else if (!isNaN(l._node.duration) || Infinity === l._node.duration) l._node.currentTime = l._start || 0, l._node.pause();
					c || d._emit("stop", l._id)
				}
			}
			return d
		},
		mute: function(b, d) {
			var e = this;
			if ("loaded" !== e._state) return e._queue.push({
				event: "mute",
				action: function() {
					e.mute(b, d)
				}
			}), e;
			if ("undefined" === typeof d)
				if ("boolean" === typeof b) e._muted = b;
				else return e._muted;
			for (var f = e._getSoundIds(d), l = 0; l < f.length; l++) {
				var g = e._soundById(f[l]);
				g && (g._muted = b, g._interval && e._stopFade(g._id), e._webAudio && g._node ? g._node.gain.setValueAtTime(b ? 0 : g._volume, c.ctx.currentTime) : g._node && (g._node.muted = c._muted ? !0 : b), e._emit("mute", g._id))
			}
			return e
		},
		volume: function() {
			var b = this,
				d = arguments,
				e, f;
			if (0 === d.length) return b._volume;
			1 === d.length || 2 === d.length && "undefined" === typeof d[1] ? 0 <= b._getSoundIds().indexOf(d[0]) ? f = parseInt(d[0], 10) : e = parseFloat(d[0]) : 2 <= d.length && (e = parseFloat(d[0]), f = parseInt(d[1], 10));
			var l;
			if ("undefined" !== typeof e && 0 <= e && 1 >= e) {
				if ("loaded" !== b._state) return b._queue.push({
					event: "volume",
					action: function() {
						b.volume.apply(b, d)
					}
				}), b;
				"undefined" === typeof f && (b._volume = e);
				f = b._getSoundIds(f);
				for (var g = 0; g < f.length; g++)
					if (l = b._soundById(f[g])) l._volume = e, d[2] || b._stopFade(f[g]), b._webAudio && l._node && !l._muted ? l._node.gain.setValueAtTime(e, c.ctx.currentTime) : l._node && !l._muted && (l._node.volume = e * c.volume()), b._emit("volume", l._id)
			} else return (l = f ? b._soundById(f) : b._sounds[0]) ? l._volume : 0;
			return b
		},
		fade: function(b, d, e, f) {
			var l = this;
			if ("loaded" !== l._state) return l._queue.push({
				event: "fade",
				action: function() {
					l.fade(b, d, e, f)
				}
			}), l;
			l.volume(b, f);
			for (var g = l._getSoundIds(f), m = 0; m < g.length; m++) {
				var F = l._soundById(g[m]);
				if (F) {
					f || l._stopFade(g[m]);
					if (l._webAudio && !F._muted) {
						var s = c.ctx.currentTime,
							I = s + e / 1E3;
						F._volume = b;
						F._node.gain.setValueAtTime(b, s);
						F._node.gain.linearRampToValueAtTime(d, I)
					}
					l._startFadeInterval(F, b, d, e, g[m], "undefined" === typeof f)
				}
			}
			return l
		},
		_startFadeInterval: function(b, c, d, e, f, l) {
			var g = this,
				m = c,
				s = d - c;
			f = Math.abs(s / 0.01);
			f = Math.max(4, 0 < f ? e / f : e);
			var I = Date.now();
			b._fadeTo = d;
			b._interval = setInterval(function() {
				var f = (Date.now() - I) / e;
				I = Date.now();
				m += s * f;
				m = Math.max(0, m);
				m = Math.min(1, m);
				m = Math.round(100 * m) / 100;
				g._webAudio ? b._volume = m : g.volume(m, b._id, !0);
				l && (g._volume = m);
				if (d < c && m <= d || d > c && m >= d) clearInterval(b._interval), b._interval = null, b._fadeTo = null, g.volume(d, b._id), g._emit("fade", b._id)
			}, f)
		},
		_stopFade: function(b) {
			var d = this._soundById(b);
			d && d._interval && (this._webAudio && d._node.gain.cancelScheduledValues(c.ctx.currentTime), clearInterval(d._interval), d._interval = null, this.volume(d._fadeTo, b), d._fadeTo = null, this._emit("fade", b));
			return this
		},
		loop: function() {
			var b = arguments,
				c, d;
			if (0 === b.length) return this._loop;
			if (1 === b.length)
				if ("boolean" === typeof b[0]) this._loop = c = b[0];
				else return (b = this._soundById(parseInt(b[0], 10))) ? b._loop : !1;
			else 2 === b.length && (c = b[0], d = parseInt(b[1], 10));
			d = this._getSoundIds(d);
			for (var e = 0; e < d.length; e++)
				if (b = this._soundById(d[e]))
					if (b._loop = c, this._webAudio && (b._node && b._node.bufferSource) && (b._node.bufferSource.loop = c)) b._node.bufferSource.loopStart = b._start || 0, b._node.bufferSource.loopEnd = b._stop;
			return this
		},
		rate: function() {
			var b = this,
				d = arguments,
				e, f;
			0 === d.length ? f = b._sounds[0]._id : 1 === d.length ? 0 <= b._getSoundIds().indexOf(d[0]) ? f = parseInt(d[0], 10) : e = parseFloat(d[0]) : 2 === d.length && (e = parseFloat(d[0]), f = parseInt(d[1], 10));
			var l;
			if ("number" === typeof e) {
				if ("loaded" !== b._state) return b._queue.push({
					event: "rate",
					action: function() {
						b.rate.apply(b, d)
					}
				}), b;
				"undefined" === typeof f && (b._rate = e);
				f = b._getSoundIds(f);
				for (var g = 0; g < f.length; g++)
					if (l = b._soundById(f[g])) {
						l._rateSeek = b.seek(f[g]);
						l._playStart = b._webAudio ? c.ctx.currentTime : l._playStart;
						l._rate = e;
						b._webAudio && l._node && l._node.bufferSource ? l._node.bufferSource.playbackRate.setValueAtTime(e, c.ctx.currentTime) : l._node && (l._node.playbackRate = e);
						var m = b.seek(f[g]),
							m = 1E3 * ((b._sprite[l._sprite][0] +
								b._sprite[l._sprite][1]) / 1E3 - m) / Math.abs(l._rate);
						if (b._endTimers[f[g]] || !l._paused) b._clearTimer(f[g]), b._endTimers[f[g]] = setTimeout(b._ended.bind(b, l), m);
						b._emit("rate", l._id)
					}
			} else return (l = b._soundById(f)) ? l._rate : b._rate;
			return b
		},
		seek: function() {
			var b = this,
				d = arguments,
				e, f;
			0 === d.length ? f = b._sounds[0]._id : 1 === d.length ? 0 <= b._getSoundIds().indexOf(d[0]) ? f = parseInt(d[0], 10) : b._sounds.length && (f = b._sounds[0]._id, e = parseFloat(d[0])) : 2 === d.length && (e = parseFloat(d[0]), f = parseInt(d[1], 10));
			if ("undefined" === typeof f) return b;
			if ("loaded" !== b._state) return b._queue.push({
				event: "seek",
				action: function() {
					b.seek.apply(b, d)
				}
			}), b;
			var l = b._soundById(f);
			if (l)
				if ("number" === typeof e && 0 <= e) {
					var g = b.playing(f);
					g && b.pause(f, !0);
					l._seek = e;
					l._ended = !1;
					b._clearTimer(f);
					g && b.play(f, !0);
					!b._webAudio && l._node && (l._node.currentTime = e);
					if (g && !b._webAudio) {
						var m = function() {
							b._playLock ? setTimeout(m, 0) : b._emit("seek", f)
						};
						setTimeout(m, 0)
					} else b._emit("seek", f)
				} else return b._webAudio ? (e = b.playing(f) ? c.ctx.currentTime - l._playStart : 0, l._seek + ((l._rateSeek ? l._rateSeek - l._seek : 0) + e * Math.abs(l._rate))) : l._node.currentTime;
			return b
		},
		playing: function(b) {
			if ("number" === typeof b) return (b = this._soundById(b)) ? !b._paused : !1;
			for (b = 0; b < this._sounds.length; b++)
				if (!this._sounds[b]._paused) return !0;
			return !1
		},
		duration: function(b) {
			var c = this._duration;
			(b = this._soundById(b)) && (c = this._sprite[b._sprite][1] / 1E3);
			return c
		},
		state: function() {
			return this._state
		},
		unload: function() {
			for (var b = this._sounds, d = 0; d < b.length; d++) b[d]._paused || this.stop(b[d]._id), this._webAudio || (/MSIE |Trident\//.test(c._navigator && c._navigator.userAgent) || (b[d]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"), b[d]._node.removeEventListener("error", b[d]._errorFn, !1), b[d]._node.removeEventListener(c._canPlayEvent, b[d]._loadFn, !1)), delete b[d]._node, this._clearTimer(b[d]._id);
			d = c._howls.indexOf(this);
			0 <= d && c._howls.splice(d, 1);
			b = !0;
			for (d = 0; d < c._howls.length; d++)
				if (c._howls[d]._src === this._src) {
					b = !1;
					break
				}
			f && b && delete f[this._src];
			c.noAudio = !1;
			this._state = "unloaded";
			this._sounds = [];
			return null
		},
		on: function(b, c, d, e) {
			b = this["_on" + b];
			"function" === typeof c && b.push(e ? {
				id: d,
				fn: c,
				once: e
			} : {
				id: d,
				fn: c
			});
			return this
		},
		off: function(b, c, d) {
			var e = this["_on" + b],
				f = 0;
			"number" === typeof c && (d = c, c = null);
			if (c || d)
				for (f = 0; f < e.length; f++) {
					if (b = d === e[f].id, c === e[f].fn && b || !c && b) {
						e.splice(f, 1);
						break
					}
				} else if (b) this["_on" + b] = [];
				else {
					c = Object.keys(this);
					for (f = 0; f < c.length; f++) 0 === c[f].indexOf("_on") && Array.isArray(this[c[f]]) && (this[c[f]] = [])
				}
			return this
		},
		once: function(b, c, d) {
			this.on(b, c, d, 1);
			return this
		},
		_emit: function(b, c, d) {
			for (var e = this["_on" + b], f = e.length - 1; 0 <= f; f--)
				if (!e[f].id || e[f].id === c || "load" === b) setTimeout(function(b) {
					b.call(this, c, d)
				}.bind(this, e[f].fn), 0), e[f].once && this.off(b, e[f].fn, e[f].id);
			this._loadQueue(b);
			return this
		},
		_loadQueue: function(b) {
			if (0 < this._queue.length) {
				var c = this._queue[0];
				c.event === b && (this._queue.shift(), this._loadQueue());
				b || c.action()
			}
			return this
		},
		_ended: function(b) {
			var d = b._sprite;
			if (!this._webAudio && b._node && !b._node.paused && !b._node.ended && b._node.currentTime < b._stop) return setTimeout(this._ended.bind(this, b), 100), this;
			d = !(!b._loop && !this._sprite[d][2]);
			this._emit("end", b._id);
			!this._webAudio && d && this.stop(b._id, !0).play(b._id);
			if (this._webAudio && d) {
				this._emit("play", b._id);
				b._seek = b._start || 0;
				b._rateSeek = 0;
				b._playStart = c.ctx.currentTime;
				var e = 1E3 * (b._stop - b._start) / Math.abs(b._rate);
				this._endTimers[b._id] = setTimeout(this._ended.bind(this, b), e)
			}
			this._webAudio && !d && (b._paused = !0, b._ended = !0, b._seek = b._start || 0, b._rateSeek = 0, this._clearTimer(b._id), this._cleanBuffer(b._node), c._autoSuspend());
			!this._webAudio && !d && this.stop(b._id, !0);
			return this
		},
		_clearTimer: function(b) {
			if (this._endTimers[b]) {
				if ("function" !== typeof this._endTimers[b]) clearTimeout(this._endTimers[b]);
				else {
					var c = this._soundById(b);
					c && c._node && c._node.removeEventListener("ended", this._endTimers[b], !1)
				}
				delete this._endTimers[b]
			}
			return this
		},
		_soundById: function(b) {
			for (var c = 0; c < this._sounds.length; c++)
				if (b === this._sounds[c]._id) return this._sounds[c];
			return null
		},
		_inactiveSound: function() {
			this._drain();
			for (var b = 0; b < this._sounds.length; b++)
				if (this._sounds[b]._ended) return this._sounds[b].reset();
			return new e(this)
		},
		_drain: function() {
			var b = this._pool,
				c = 0,
				d = 0;
			if (!(this._sounds.length < b)) {
				for (d = 0; d < this._sounds.length; d++) this._sounds[d]._ended && c++;
				for (d = this._sounds.length - 1; 0 <= d && !(c <= b); d--) this._sounds[d]._ended && (this._webAudio && this._sounds[d]._node && this._sounds[d]._node.disconnect(0), this._sounds.splice(d, 1), c--)
			}
		},
		_getSoundIds: function(b) {
			if ("undefined" === typeof b) {
				b = [];
				for (var c = 0; c < this._sounds.length; c++) b.push(this._sounds[c]._id);
				return b
			}
			return [b]
		},
		_refreshBuffer: function(b) {
			b._node.bufferSource = c.ctx.createBufferSource();
			b._node.bufferSource.buffer = f[this._src];
			b._panner ? b._node.bufferSource.connect(b._panner) : b._node.bufferSource.connect(b._node);
			if (b._node.bufferSource.loop = b._loop) b._node.bufferSource.loopStart = b._start || 0, b._node.bufferSource.loopEnd = b._stop;
			b._node.bufferSource.playbackRate.setValueAtTime(b._rate, c.ctx.currentTime);
			return this
		},
		_cleanBuffer: function(b) {
			if (c._scratchBuffer && b.bufferSource) {
				b.bufferSource.onended = null;
				b.bufferSource.disconnect(0);
				try {
					b.bufferSource.buffer = c._scratchBuffer
				} catch (d) {}
			}
			b.bufferSource = null;
			return this
		}
	};
	var e = function(b) {
		this._parent = b;
		this.init()
	};
	e.prototype = {
		init: function() {
			var b = this._parent;
			this._muted = b._muted;
			this._loop = b._loop;
			this._volume = b._volume;
			this._rate = b._rate;
			this._seek = 0;
			this._ended = this._paused = !0;
			this._sprite = "__default";
			this._id = ++c._counter;
			b._sounds.push(this);
			this.create();
			return this
		},
		create: function() {
			var b = this._parent,
				d = c._muted || this._muted || this._parent._muted ? 0 : this._volume;
			b._webAudio ? (this._node = "undefined" === typeof c.ctx.createGain ? c.ctx.createGainNode() : c.ctx.createGain(), this._node.gain.setValueAtTime(d, c.ctx.currentTime), this._node.paused = !0, this._node.connect(c.masterGain)) : (this._node = new Audio, this._errorFn = this._errorListener.bind(this), this._node.addEventListener("error", this._errorFn, !1), this._loadFn = this._loadListener.bind(this), this._node.addEventListener(c._canPlayEvent, this._loadFn, !1), this._node.src = b._src, this._node.preload = "auto", this._node.volume = d * c.volume(), this._node.load());
			return this
		},
		reset: function() {
			var b = this._parent;
			this._muted = b._muted;
			this._loop = b._loop;
			this._volume = b._volume;
			this._rate = b._rate;
			this._rateSeek = this._seek = 0;
			this._ended = this._paused = !0;
			this._sprite = "__default";
			this._id = ++c._counter;
			return this
		},
		_errorListener: function() {
			this._parent._emit("loaderror", this._id, this._node.error ? this._node.error.code : 0);
			this._node.removeEventListener("error", this._errorFn, !1)
		},
		_loadListener: function() {
			var b = this._parent;
			b._duration = Math.ceil(10 * this._node.duration) / 10;
			0 === Object.keys(b._sprite).length && (b._sprite = {
				__default: [0, 1E3 * b._duration]
			});
			"loaded" !== b._state && (b._state = "loaded", b._emit("load"), b._loadQueue());
			this._node.removeEventListener(c._canPlayEvent, this._loadFn, !1)
		}
	};
	var f = {},
		g = function(b, d) {
			c.ctx.decodeAudioData(b, function(b) {
				b && 0 < d._sounds.length && (f[d._src] = b, m(d, b))
			}, function() {
				d._emit("loaderror", null, "Decoding audio data failed.")
			})
		},
		m = function(b, c) {
			c && !b._duration && (b._duration = c.duration);
			0 === Object.keys(b._sprite).length && (b._sprite = {
				__default: [0, 1E3 * b._duration]
			});
			"loaded" !== b._state && (b._state = "loaded", b._emit("load"), b._loadQueue())
		},
		l = function() {
			try {
				"undefined" !== typeof AudioContext ? c.ctx = new AudioContext : "undefined" !== typeof webkitAudioContext ? c.ctx = new webkitAudioContext : c.usingWebAudio = !1
			} catch (b) {
				c.usingWebAudio = !1
			}
			var d = /iP(hone|od|ad)/.test(c._navigator && c._navigator.platform),
				e = c._navigator && c._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
				e = e ? parseInt(e[1], 10) : null;
			if (d && (e && 9 > e) && (d = /safari/.test(c._navigator && c._navigator.userAgent.toLowerCase()), c._navigator && c._navigator.standalone && !d || c._navigator && !c._navigator.standalone && !d)) c.usingWebAudio = !1;
			c.usingWebAudio && (c.masterGain = "undefined" === typeof c.ctx.createGain ? c.ctx.createGainNode() : c.ctx.createGain(), c.masterGain.gain.setValueAtTime(c._muted ? 0 : 1, c.ctx.currentTime), c.masterGain.connect(c.ctx.destination));
			c._setup()
		};
	"function" === typeof define && define.amd && define([], function() {
		return {
			Howler: c,
			Howl: d
		}
	});
	"undefined" !== typeof exports && (exports.Howler = c, exports.Howl = d);
	"undefined" !== typeof window ? (window.HowlerGlobal = b, window.Howler = c, window.Howl = d, window.Sound = e) : "undefined" !== typeof global && (global.HowlerGlobal = b, global.Howler = c, global.Howl = d, global.Sound = e)
})();
(function() {
	HowlerGlobal.prototype._pos = [0, 0, 0];
	HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
	HowlerGlobal.prototype.stereo = function(b) {
		if (!this.ctx || !this.ctx.listener) return this;
		for (var c = this._howls.length - 1; 0 <= c; c--) this._howls[c].stereo(b);
		return this
	};
	HowlerGlobal.prototype.pos = function(b, c, d) {
		if (!this.ctx || !this.ctx.listener) return this;
		c = "number" !== typeof c ? this._pos[1] : c;
		d = "number" !== typeof d ? this._pos[2] : d;
		if ("number" === typeof b) this._pos = [b, c, d], "undefined" !== typeof this.ctx.listener.positionX ? (this.ctx.listener.positionX.setTargetAtTime(this._pos[0], Howler.ctx.currentTime, 0.1), this.ctx.listener.positionY.setTargetAtTime(this._pos[1], Howler.ctx.currentTime, 0.1), this.ctx.listener.positionZ.setTargetAtTime(this._pos[2], Howler.ctx.currentTime, 0.1)) : this.ctx.listener.setPosition(this._pos[0], this._pos[1], this._pos[2]);
		else return this._pos;
		return this
	};
	HowlerGlobal.prototype.orientation = function(b, c, d, e, j, q) {
		if (!this.ctx || !this.ctx.listener) return this;
		var z = this._orientation;
		c = "number" !== typeof c ? z[1] : c;
		d = "number" !== typeof d ? z[2] : d;
		e = "number" !== typeof e ? z[3] : e;
		j = "number" !== typeof j ? z[4] : j;
		q = "number" !== typeof q ? z[5] : q;
		if ("number" === typeof b) this._orientation = [b, c, d, e, j, q], "undefined" !== typeof this.ctx.listener.forwardX ? (this.ctx.listener.forwardX.setTargetAtTime(b, Howler.ctx.currentTime, 0.1), this.ctx.listener.forwardY.setTargetAtTime(c, Howler.ctx.currentTime, 0.1), this.ctx.listener.forwardZ.setTargetAtTime(d, Howler.ctx.currentTime, 0.1), this.ctx.listener.upX.setTargetAtTime(b, Howler.ctx.currentTime, 0.1), this.ctx.listener.upY.setTargetAtTime(c, Howler.ctx.currentTime, 0.1), this.ctx.listener.upZ.setTargetAtTime(d, Howler.ctx.currentTime, 0.1)) : this.ctx.listener.setOrientation(b, c, d, e, j, q);
		else return z;
		return this
	};
	var b = Howl.prototype.init;
	Howl.prototype.init = function(c) {
		this._orientation = c.orientation || [1, 0, 0];
		this._stereo = c.stereo || null;
		this._pos = c.pos || null;
		this._pannerAttr = {
			coneInnerAngle: "undefined" !== typeof c.coneInnerAngle ? c.coneInnerAngle : 360,
			coneOuterAngle: "undefined" !== typeof c.coneOuterAngle ? c.coneOuterAngle : 360,
			coneOuterGain: "undefined" !== typeof c.coneOuterGain ? c.coneOuterGain : 0,
			distanceModel: "undefined" !== typeof c.distanceModel ? c.distanceModel : "inverse",
			maxDistance: "undefined" !== typeof c.maxDistance ? c.maxDistance : 1E4,
			panningModel: "undefined" !== typeof c.panningModel ? c.panningModel : "HRTF",
			refDistance: "undefined" !== typeof c.refDistance ? c.refDistance : 1,
			rolloffFactor: "undefined" !== typeof c.rolloffFactor ? c.rolloffFactor : 1
		};
		this._onstereo = c.onstereo ? [{
			fn: c.onstereo
		}] : [];
		this._onpos = c.onpos ? [{
			fn: c.onpos
		}] : [];
		this._onorientation = c.onorientation ? [{
			fn: c.onorientation
		}] : [];
		return b.call(this, c)
	};
	Howl.prototype.stereo = function(b, c) {
		var d = this;
		if (!d._webAudio) return d;
		if ("loaded" !== d._state) return d._queue.push({
			event: "stereo",
			action: function() {
				d.stereo(b, c)
			}
		}), d;
		var l = "undefined" === typeof Howler.ctx.createStereoPanner ? "spatial" : "stereo";
		if ("undefined" === typeof c)
			if ("number" === typeof b) d._stereo = b, d._pos = [b, 0, 0];
			else return d._stereo;
		for (var j = d._getSoundIds(c), q = 0; q < j.length; q++) {
			var z = d._soundById(j[q]);
			if (z)
				if ("number" === typeof b) z._stereo = b, z._pos = [b, 0, 0], z._node && (z._pannerAttr.panningModel = "equalpower", (!z._panner || !z._panner.pan) && e(z, l), "spatial" === l ? "undefined" !== typeof z._panner.positionX ? (z._panner.positionX.setValueAtTime(b, Howler.ctx.currentTime), z._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), z._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : z._panner.setPosition(b, 0, 0) : z._panner.pan.setValueAtTime(b, Howler.ctx.currentTime)), d._emit("stereo", z._id);
				else return z._stereo
		}
		return d
	};
	Howl.prototype.pos = function(b, c, d, l) {
		var j = this;
		if (!j._webAudio) return j;
		if ("loaded" !== j._state) return j._queue.push({
			event: "pos",
			action: function() {
				j.pos(b, c, d, l)
			}
		}), j;
		c = "number" !== typeof c ? 0 : c;
		d = "number" !== typeof d ? -0.5 : d;
		if ("undefined" === typeof l)
			if ("number" === typeof b) j._pos = [b, c, d];
			else return j._pos;
		for (var q = j._getSoundIds(l), z = 0; z < q.length; z++) {
			var y = j._soundById(q[z]);
			if (y)
				if ("number" === typeof b) y._pos = [b, c, d], y._node && ((!y._panner || y._panner.pan) && e(y, "spatial"), "undefined" !== typeof y._panner.positionX ? (y._panner.positionX.setValueAtTime(b, Howler.ctx.currentTime), y._panner.positionY.setValueAtTime(c, Howler.ctx.currentTime), y._panner.positionZ.setValueAtTime(d, Howler.ctx.currentTime)) : y._panner.setOrientation(b, c, d)), j._emit("pos", y._id);
				else return y._pos
		}
		return j
	};
	Howl.prototype.orientation = function(b, c, d, l) {
		var j = this;
		if (!j._webAudio) return j;
		if ("loaded" !== j._state) return j._queue.push({
			event: "orientation",
			action: function() {
				j.orientation(b, c, d, l)
			}
		}), j;
		c = "number" !== typeof c ? j._orientation[1] : c;
		d = "number" !== typeof d ? j._orientation[2] : d;
		if ("undefined" === typeof l)
			if ("number" === typeof b) j._orientation = [b, c, d];
			else return j._orientation;
		for (var q = j._getSoundIds(l), z = 0; z < q.length; z++) {
			var y = j._soundById(q[z]);
			if (y)
				if ("number" === typeof b) y._orientation = [b, c, d], y._node && (y._panner || (y._pos || (y._pos = j._pos || [0, 0, -0.5]), e(y, "spatial")), y._panner.orientationX.setValueAtTime(b, Howler.ctx.currentTime), y._panner.orientationY.setValueAtTime(c, Howler.ctx.currentTime), y._panner.orientationZ.setValueAtTime(d, Howler.ctx.currentTime)), j._emit("orientation", y._id);
				else return y._orientation
		}
		return j
	};
	Howl.prototype.pannerAttr = function() {
		var b = arguments,
			c, d;
		if (!this._webAudio) return this;
		if (0 === b.length) return this._pannerAttr;
		if (1 === b.length)
			if ("object" === typeof b[0]) c = b[0], "undefined" === typeof d && (c.pannerAttr || (c.pannerAttr = {
				coneInnerAngle: c.coneInnerAngle,
				coneOuterAngle: c.coneOuterAngle,
				coneOuterGain: c.coneOuterGain,
				distanceModel: c.distanceModel,
				maxDistance: c.maxDistance,
				refDistance: c.refDistance,
				rolloffFactor: c.rolloffFactor,
				panningModel: c.panningModel
			}), this._pannerAttr = {
				coneInnerAngle: "undefined" !== typeof c.pannerAttr.coneInnerAngle ? c.pannerAttr.coneInnerAngle : this._coneInnerAngle,
				coneOuterAngle: "undefined" !== typeof c.pannerAttr.coneOuterAngle ? c.pannerAttr.coneOuterAngle : this._coneOuterAngle,
				coneOuterGain: "undefined" !== typeof c.pannerAttr.coneOuterGain ? c.pannerAttr.coneOuterGain : this._coneOuterGain,
				distanceModel: "undefined" !== typeof c.pannerAttr.distanceModel ? c.pannerAttr.distanceModel : this._distanceModel,
				maxDistance: "undefined" !== typeof c.pannerAttr.maxDistance ? c.pannerAttr.maxDistance : this._maxDistance,
				refDistance: "undefined" !== typeof c.pannerAttr.refDistance ? c.pannerAttr.refDistance : this._refDistance,
				rolloffFactor: "undefined" !== typeof c.pannerAttr.rolloffFactor ? c.pannerAttr.rolloffFactor : this._rolloffFactor,
				panningModel: "undefined" !== typeof c.pannerAttr.panningModel ? c.pannerAttr.panningModel : this._panningModel
			});
			else return (b = this._soundById(parseInt(b[0], 10))) ? b._pannerAttr : this._pannerAttr;
		else 2 === b.length && (c = b[0], d = parseInt(b[1], 10));
		d = this._getSoundIds(d);
		for (var l = 0; l < d.length; l++)
			if (b = this._soundById(d[l])) {
				var j = b._pannerAttr,
					j = {
						coneInnerAngle: "undefined" !== typeof c.coneInnerAngle ? c.coneInnerAngle : j.coneInnerAngle,
						coneOuterAngle: "undefined" !== typeof c.coneOuterAngle ? c.coneOuterAngle : j.coneOuterAngle,
						coneOuterGain: "undefined" !== typeof c.coneOuterGain ? c.coneOuterGain : j.coneOuterGain,
						distanceModel: "undefined" !== typeof c.distanceModel ? c.distanceModel : j.distanceModel,
						maxDistance: "undefined" !== typeof c.maxDistance ? c.maxDistance : j.maxDistance,
						refDistance: "undefined" !== typeof c.refDistance ? c.refDistance : j.refDistance,
						rolloffFactor: "undefined" !== typeof c.rolloffFactor ? c.rolloffFactor : j.rolloffFactor,
						panningModel: "undefined" !== typeof c.panningModel ? c.panningModel : j.panningModel
					},
					q = b._panner;
				q ? (q.coneInnerAngle = j.coneInnerAngle, q.coneOuterAngle = j.coneOuterAngle, q.coneOuterGain = j.coneOuterGain, q.distanceModel = j.distanceModel, q.maxDistance = j.maxDistance, q.refDistance = j.refDistance, q.rolloffFactor = j.rolloffFactor, q.panningModel = j.panningModel) : (b._pos || (b._pos = this._pos || [0, 0, -0.5]), e(b, "spatial"))
			}
		return this
	};
	var c = Sound.prototype.init;
	Sound.prototype.init = function() {
		var b = this._parent;
		this._orientation = b._orientation;
		this._stereo = b._stereo;
		this._pos = b._pos;
		this._pannerAttr = b._pannerAttr;
		c.call(this);
		this._stereo ? b.stereo(this._stereo) : this._pos && b.pos(this._pos[0], this._pos[1], this._pos[2], this._id)
	};
	var d = Sound.prototype.reset;
	Sound.prototype.reset = function() {
		var b = this._parent;
		this._orientation = b._orientation;
		this._stereo = b._stereo;
		this._pos = b._pos;
		this._pannerAttr = b._pannerAttr;
		this._stereo ? b.stereo(this._stereo) : this._pos ? b.pos(this._pos[0], this._pos[1], this._pos[2], this._id) : this._panner && (this._panner.disconnect(0), this._panner = void 0, b._refreshBuffer(this));
		return d.call(this)
	};
	var e = function(b, c) {
		"spatial" === (c || "spatial") ? (b._panner = Howler.ctx.createPanner(), b._panner.coneInnerAngle = b._pannerAttr.coneInnerAngle, b._panner.coneOuterAngle = b._pannerAttr.coneOuterAngle, b._panner.coneOuterGain = b._pannerAttr.coneOuterGain, b._panner.distanceModel = b._pannerAttr.distanceModel, b._panner.maxDistance = b._pannerAttr.maxDistance, b._panner.refDistance = b._pannerAttr.refDistance, b._panner.rolloffFactor = b._pannerAttr.rolloffFactor, b._panner.panningModel = b._pannerAttr.panningModel, "undefined" !== typeof b._panner.positionX ? (b._panner.positionX.setValueAtTime(b._pos[0], Howler.ctx.currentTime), b._panner.positionY.setValueAtTime(b._pos[1], Howler.ctx.currentTime), b._panner.positionZ.setValueAtTime(b._pos[2], Howler.ctx.currentTime)) : b._panner.setPosition(b._pos[0], b._pos[1], b._pos[2]), "undefined" !== typeof b._panner.orientationX ? (b._panner.orientationX.setValueAtTime(b._orientation[0], Howler.ctx.currentTime), b._panner.orientationY.setValueAtTime(b._orientation[1], Howler.ctx.currentTime), b._panner.orientationZ.setValueAtTime(b._orientation[2], Howler.ctx.currentTime)) : b._panner.setOrientation(b._orientation[0], b._orientation[1], b._orientation[2])) : (b._panner = Howler.ctx.createStereoPanner(), b._panner.pan.setValueAtTime(b._stereo, Howler.ctx.currentTime));
		b._panner.connect(b._node);
		b._paused || b._parent.pause(b._id, !0).play(b._id, !0)
	}
})();
(function(b, c, d, e, f, g, m) {
	b.GoogleAnalyticsObject = f;
	b[f] = b[f] || function() {
		(b[f].q = b[f].q || []).push(arguments)
	};
	b[f].l = 1 * new Date;
	g = c.createElement(d);
	m = c.getElementsByTagName(d)[0];
	g.async = 1;
	g.src = e;
	m.parentNode.insertBefore(g, m)
})(window, document, "script", "", "ga");
 
(function(b) {
	Number.prototype.map = function(b, c, d, e) {
		return d + (e - d) * ((this - b) / (c - b))
	};
	Number.prototype.limit = function(b, c) {
		return Math.min(c, Math.max(b, this))
	};
	Number.prototype.round = function(b) {
		b = Math.pow(10, b || 0);
		return Math.round(this * b) / b
	};
	Number.prototype.floor = function() {
		return Math.floor(this)
	};
	Number.prototype.ceil = function() {
		return Math.ceil(this)
	};
	Number.prototype.toInt = function() {
		return this | 0
	};
	Number.prototype.toRad = function() {
		return this / 180 * Math.PI
	};
	Number.prototype.toDeg = function() {
		return 180 * this / Math.PI
	};
	Array.prototype.erase = function(b) {
		for (var c = this.length; c--;) this[c] === b && this.splice(c, 1);
		return this
	};
	Array.prototype.random = function() {
		return this[Math.floor(Math.random() * this.length)]
	};
	Function.prototype.bind = Function.prototype.bind || function(b) {
		if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		var c = Array.prototype.slice.call(arguments, 1),
			d = this,
			e = function() {},
			f = function() {
				return d.apply(this instanceof e && b ? this : b, c.concat(Array.prototype.slice.call(arguments)))
			};
		e.prototype = this.prototype;
		f.prototype = new e;
		return f
	};
	b.ig = {
		game: null,
		debug: null,
		version: "1.23",
		global: b,
		modules: {},
		resources: [],
		ready: !1,
		baked: !1,
		nocache: "",
		ua: {},
		prefix: b.ImpactPrefix || "",
		lib: "lib/",
		_current: null,
		_loadQueue: [],
		_waitForOnload: 0,
		$: function(b) {
			return "#" == b.charAt(0) ? document.getElementById(b.substr(1)) : document.getElementsByTagName(b)
		},
		$new: function(b) {
			return document.createElement(b)
		},
		copy: function(b) {
			if (!b || "object" != typeof b || b instanceof HTMLElement || b instanceof ig.Class) return b;
			if (b instanceof Array)
				for (var c = [], d = 0, e = b.length; d < e; d++) c[d] = ig.copy(b[d]);
			else
				for (d in c = {}, b) c[d] = ig.copy(b[d]);
			return c
		},
		merge: function(b, c) {
			for (var d in c) {
				var e = c[d];
				if ("object" != typeof e || e instanceof HTMLElement || e instanceof ig.Class || null === e) b[d] = e;
				else {
					if (!b[d] || "object" != typeof b[d]) b[d] = e instanceof Array ? [] : {};
					ig.merge(b[d], e)
				}
			}
			return b
		},
		ksort: function(b) {
			if (!b || "object" != typeof b) return [];
			var c = [],
				d = [],
				e;
			for (e in b) c.push(e);
			c.sort();
			for (e = 0; e < c.length; e++) d.push(b[c[e]]);
			return d
		},
		setVendorAttribute: function(b, c, d) {
			var e = c.charAt(0).toUpperCase() + c.substr(1);
			b[c] = "undefined" !== typeof b.imageSmoothingEnabled ? b["ms" + e] = b["moz" + e] = b["o" + e] = d : b["ms" + e] = b["moz" + e] = b["webkit" + e] = b["o" + e] = d
		},
		getVendorAttribute: function(b, c) {
			var d = c.charAt(0).toUpperCase() + c.substr(1);
			return "undefined" !== typeof b.imageSmoothingEnabled ? b[c] || b["ms" + d] || b["moz" + d] || b["o" + d] : b[c] || b["ms" + d] || b["moz" + d] || b["webkit" + d] || b["o" + d]
		},
		normalizeVendorAttribute: function(b, c) {
			var d = ig.getVendorAttribute(b, c);
			!b[c] && d && (b[c] = d)
		},
		getImagePixels: function(b, c, d, e, f) {
			var g = ig.$new("canvas");
			g.width = b.width;
			g.height = b.height;
			var m = g.getContext("2d");
			ig.System.SCALE.CRISP(g, m);
			var E = ig.getVendorAttribute(m, "backingStorePixelRatio") || 1;
			ig.normalizeVendorAttribute(m, "getImageDataHD");
			var F = b.width / E,
				s = b.height / E;
			g.width = Math.ceil(F);
			g.height = Math.ceil(s);
			m.drawImage(b, 0, 0, F, s);
			return 1 === E ? m.getImageData(c, d, e, f) : m.getImageDataHD(c, d, e, f)
		},
		module: function(b) {
			if (ig._current) throw "Module '" +
				ig._current.name + "' defines nothing";
			if (ig.modules[b] && ig.modules[b].body) throw "Module '" + b + "' is already defined";
			ig._current = {
				name: b,
				requires: [],
				loaded: !1,
				body: null
			};
			ig.modules[b] = ig._current;
			ig._loadQueue.push(ig._current);
			return ig
		},
		requires: function() {
			ig._current.requires = Array.prototype.slice.call(arguments);
			return ig
		},
		defines: function(b) {
			ig._current.body = b;
			ig._current = null;
			ig._initDOMReady()
		},
		addResource: function(b) {
			ig.resources.push(b)
		},
		setNocache: function(b) {
			ig.nocache = b ? "?" + Date.now() : ""
		},
		log: function() {},
		assert: function() {},
		show: function() {},
		mark: function() {},
		_loadScript: function(b, c) {
			ig.modules[b] = {
				name: b,
				requires: [],
				loaded: !1,
				body: null
			};
			ig._waitForOnload++;
			var d = ig.prefix + ig.lib + b.replace(/\./g, "/") + ".js" + ig.nocache,
				e = ig.$new("script");
			e.type = "text/javascript";
			e.src = d;
			e.onload = function() {
				ig._waitForOnload--;
				ig._execModules()
			};
			e.onerror = function() {
				throw "Failed to load module " + b + " at " + d + " required from " + c;
			};
			ig.$("head")[0].appendChild(e)
		},
		_execModules: function() {
			for (var b = !1, c = 0; c < ig._loadQueue.length; c++) {
				for (var d = ig._loadQueue[c], e = !0, f = 0; f < d.requires.length; f++) {
					var g = d.requires[f];
					ig.modules[g] ? ig.modules[g].loaded || (e = !1) : (e = !1, ig._loadScript(g, d.name))
				}
				e && d.body && (ig._loadQueue.splice(c, 1), d.loaded = !0, d.body(), b = !0, c--)
			}
			if (b) ig._execModules();
			else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
				b = [];
				for (c = 0; c < ig._loadQueue.length; c++) {
					e = [];
					g = ig._loadQueue[c].requires;
					for (f = 0; f < g.length; f++) d = ig.modules[g[f]], (!d || !d.loaded) && e.push(g[f]);
					b.push(ig._loadQueue[c].name +
						" (requires: " + e.join(", ") + ")")
				}
				throw "Unresolved (or circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules or a previous syntax error prevents a module from loading:\n" + b.join("\n");
			}
		},
		_DOMReady: function() {
			if (!ig.modules["dom.ready"].loaded) {
				if (!document.body) return setTimeout(ig._DOMReady, 13);
				ig.modules["dom.ready"].loaded = !0;
				ig._waitForOnload--;
				ig._execModules()
			}
			return 0
		},
		_boot: function() {
			document.location.href.match(/\?nocache/) && ig.setNocache(!0);
			ig.ua.pixelRatio = b.devicePixelRatio || 1;
			ig.ua.viewport = {
				width: b.innerWidth,
				height: b.innerHeight
			};
			ig.ua.screen = {
				width: b.screen.availWidth * ig.ua.pixelRatio,
				height: b.screen.availHeight * ig.ua.pixelRatio
			};
			ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
			ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio;
			ig.ua.iPad = /iPad/i.test(navigator.userAgent);
			ig.ua.android = /android/i.test(navigator.userAgent);
			ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
			ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
			ig.ua.is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
			ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
			ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent);
			ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag;
			ig.ua.iOSgt5 = ig.ua.iOS && 5 < parseInt(navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]);
			ig.ua.HTCONE = /HTC_One/i.test(navigator.userAgent);
			ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
			ig.ua.Kindle = /Silk/i.test(navigator.userAgent);
			ig.ua.touchDevice = "ontouchstart" in
				b || b.navigator.msMaxTouchPoints;
			ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.iOS6 || ig.ua.winPhone || ig.ua.Kindle || /mobile/i.test(navigator.userAgent)
		},
		_initDOMReady: function() {
			ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(), ig.modules["dom.ready"] = {
				requires: [],
				loaded: !1,
				body: null
			}, ig._waitForOnload++, "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1), b.addEventListener("load", ig._DOMReady, !1)))
		}
	};
	ig.normalizeVendorAttribute(b, "requestAnimationFrame");
	if (b.requestAnimationFrame) {
		var c = 1,
			d = {};
		b.ig.setAnimation = function(e, f) {
			var g = c++;
			d[g] = !0;
			var m = function() {
				d[g] && (b.requestAnimationFrame(m, f), e())
			};
			b.requestAnimationFrame(m, f);
			return g
		};
		b.ig.clearAnimation = function(b) {
			delete d[b]
		}
	} else b.ig.setAnimation = function(c) {
		return b.setInterval(c, 1E3 / 60)
	}, b.ig.clearAnimation = function(c) {
		b.clearInterval(c)
	};
	var e = !1,
		f = /xyz/.test(function() {
			xyz
		}) ? /\bparent\b/ : /.*/,
		g = 0;
	b.ig.Class = function() {};
	var m = function(b) {
		var c = this.prototype,
			d = {},
			e;
		for (e in b) "function" == typeof b[e] && "function" == typeof c[e] && f.test(b[e]) ? (d[e] = c[e], c[e] = function(b, c) {
			return function() {
				var e = this.parent;
				this.parent = d[b];
				var f = c.apply(this, arguments);
				this.parent = e;
				return f
			}
		}(e, b[e])) : c[e] = b[e]
	};
	b.ig.Class.extend = function(c) {
		function d() {
			if (!e) {
				if (this.staticInstantiate) {
					var b = this.staticInstantiate.apply(this, arguments);
					if (b) return b
				}
				for (var c in this) "object" == typeof this[c] && (this[c] = ig.copy(this[c]));
				this.init && this.init.apply(this, arguments)
			}
			return this
		}
		var q = this.prototype;
		e = !0;
		var z = new this;
		e = !1;
		for (var y in c) z[y] = "function" == typeof c[y] && "function" == typeof q[y] && f.test(c[y]) ? function(b, c) {
			return function() {
				var d = this.parent;
				this.parent = q[b];
				var e = c.apply(this, arguments);
				this.parent = d;
				return e
			}
		}(y, c[y]) : c[y];
		d.prototype = z;
		d.prototype.constructor = d;
		d.extend = b.ig.Class.extend;
		d.inject = m;
		d.classId = z.classId = ++g;
		return d
	};
	b.ImpactMixin && ig.merge(ig, b.ImpactMixin)
})(window);
ig.baked = !0;
ig.module("impact.image").defines(function() {
	ig.Image = ig.Class.extend({
		data: null,
		width: 0,
		height: 0,
		loaded: !1,
		failed: !1,
		loadCallback: null,
		path: "",
		staticInstantiate: function(b) {
			return ig.Image.cache[b] || null
		},
		init: function(b) {
			this.path = b;
			this.load()
		},
		load: function(b) {
			this.loaded ? b && b(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = b || null, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.onerror = this.onerror.bind(this), this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this), ig.Image.cache[this.path] = this)
		},
		reload: function() {
			this.loaded = !1;
			this.data = new Image;
			this.data.onload = this.onload.bind(this);
			this.data.src = this.path + "?" + Date.now()
		},
		onload: function() {
			this.width = this.data.width;
			this.height = this.data.height;
			this.loaded = !0;
			1 != ig.system.scale && this.resize(ig.system.scale);
			this.loadCallback && this.loadCallback(this.path, !0)
		},
		onerror: function() {
			this.failed = !0;
			this.loadCallback && this.loadCallback(this.path, !1)
		},
		resize: function(b) {
			var c = ig.getImagePixels(this.data, 0, 0, this.width, this.height),
				d = this.width * b,
				e = this.height * b,
				f = ig.$new("canvas");
			f.width = d;
			f.height = e;
			for (var g = f.getContext("2d"), m = g.getImageData(0, 0, d, e), l = 0; l < e; l++)
				for (var j = 0; j < d; j++) {
					var q = 4 * (Math.floor(l / b) * this.width + Math.floor(j / b)),
						z = 4 * (l * d + j);
					m.data[z] = c.data[q];
					m.data[z + 1] = c.data[q + 1];
					m.data[z + 2] = c.data[q + 2];
					m.data[z + 3] = c.data[q + 3]
				}
			g.putImageData(m, 0, 0);
			this.data = f
		},
		draw: function(b, c, d, e, f, g) {
			if (this.loaded) {
				var m = ig.system.scale;
				f = (f ? f : this.width) * m;
				g = (g ? g : this.height) * m;
				ig.system.context.drawImage(this.data, d ? d * m : 0, e ? e * m : 0, f, g, ig.system.getDrawPos(b), ig.system.getDrawPos(c), f, g);
				ig.Image.drawCount++
			}
		},
		drawTile: function(b, c, d, e, f, g, m) {
			f = f ? f : e;
			if (this.loaded && !(e > this.width || f > this.height)) {
				var l = ig.system.scale,
					j = Math.floor(e * l),
					q = Math.floor(f * l),
					z = g ? -1 : 1,
					y = m ? -1 : 1;
				if (g || m) ig.system.context.save(), ig.system.context.scale(z, y);
				ig.system.context.drawImage(this.data, Math.floor(d * e) % this.width * l, Math.floor(d * e / this.width) * f * l, j, q, ig.system.getDrawPos(b) * z - (g ? j : 0), ig.system.getDrawPos(c) * y - (m ? q : 0), j, q);
				(g || m) && ig.system.context.restore();
				ig.Image.drawCount++
			}
		}
	});
	ig.Image.drawCount = 0;
	ig.Image.cache = {};
	ig.Image.reloadCache = function() {
		for (var b in ig.Image.cache) ig.Image.cache[b].reload()
	}
});
ig.baked = !0;
ig.module("impact.font").requires("impact.image").defines(function() {
	ig.Font = ig.Image.extend({
		widthMap: [],
		indices: [],
		firstChar: 32,
		alpha: 1,
		letterSpacing: 1,
		lineSpacing: 0,
		onload: function(b) {
			this._loadMetrics(this.data);
			this.parent(b)
		},
		widthForString: function(b) {
			if (-1 !== b.indexOf("\n")) {
				b = b.split("\n");
				for (var c = 0, d = 0; d < b.length; d++) c = Math.max(c, this._widthForLine(b[d]));
				return c
			}
			return this._widthForLine(b)
		},
		_widthForLine: function(b) {
			for (var c = 0, d = 0; d < b.length; d++) c += this.widthMap[b.charCodeAt(d) - this.firstChar] +
				this.letterSpacing;
			return c
		},
		heightForString: function(b) {
			return b.split("\n").length * (this.height + this.lineSpacing)
		},
		draw: function(b, c, d, e) {
			"string" != typeof b && (b = b.toString());
			if (-1 !== b.indexOf("\n")) {
				b = b.split("\n");
				for (var f = this.height + this.lineSpacing, g = 0; g < b.length; g++) this.draw(b[g], c, d + g * f, e)
			} else {
				if (e == ig.Font.ALIGN.RIGHT || e == ig.Font.ALIGN.CENTER) g = this._widthForLine(b), c -= e == ig.Font.ALIGN.CENTER ? g / 2 : g;
				1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha);
				for (g = 0; g < b.length; g++) e = b.charCodeAt(g), c += this._drawChar(e - this.firstChar, c, d);
				1 !== this.alpha && (ig.system.context.globalAlpha = 1);
				ig.Image.drawCount += b.length
			}
		},
		_drawChar: function(b, c, d) {
			if (!this.loaded || 0 > b || b >= this.indices.length) return 0;
			var e = ig.system.scale,
				f = this.widthMap[b] * e,
				g = (this.height - 2) * e;
			ig.system.context.drawImage(this.data, this.indices[b] * e, 0, f, g, ig.system.getDrawPos(c), ig.system.getDrawPos(d), f, g);
			return this.widthMap[b] + this.letterSpacing
		},
		_loadMetrics: function(b) {
			this.height = b.height - 1;
			this.widthMap = [];
			this.indices = [];
			for (var c = ig.getImagePixels(b, 0, b.height - 1, b.width, 1), d = 0, e = 0, f = 0; f < b.width; f++) {
				var g = 4 * f + 3;
				127 < c.data[g] ? e++ : 128 > c.data[g] && e && (this.widthMap.push(e), this.indices.push(f - e), d++, e = 0)
			}
			this.widthMap.push(e);
			this.indices.push(f - e)
		}
	});
	ig.Font.ALIGN = {
		LEFT: 0,
		RIGHT: 1,
		CENTER: 2
	}
});
ig.baked = !0;
ig.module("impact.sound").defines(function() {
	ig.SoundManager = ig.Class.extend({
		clips: {},
		volume: 1,
		format: null,
		init: function() {
			if (!ig.Sound.enabled || !window.Audio) ig.Sound.enabled = !1;
			else {
				for (var b = new Audio, c = 0; c < ig.Sound.use.length; c++) {
					var d = ig.Sound.use[c];
					if (b.canPlayType(d.mime)) {
						this.format = d;
						break
					}
				}
				this.format || (ig.Sound.enabled = !1)
			}
		},
		load: function(b, c, d) {
			var e = ig.prefix + b.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
			if (this.clips[b]) {
				if (c && this.clips[b].length < ig.Sound.channels)
					for (c = this.clips[b].length; c < ig.Sound.channels; c++) {
						var f = new Audio(e);
						f.load();
						this.clips[b].push(f)
					}
				return this.clips[b][0]
			}
			var g = new Audio(e);
			d && (g.addEventListener("canplaythrough", function l(c) {
				g.removeEventListener("canplaythrough", l, !1);
				d(b, !0, c)
			}, !1), g.addEventListener("error", function(c) {
				d(b, !1, c)
			}, !1));
			g.preload = "auto";
			g.load();
			this.clips[b] = [g];
			if (c)
				for (c = 1; c < ig.Sound.channels; c++) f = new Audio(e), f.load(), this.clips[b].push(f);
			return g
		},
		get: function(b) {
			b = this.clips[b];
			for (var c = 0, d; d = b[c++];)
				if (d.paused || d.ended) return d.ended && (d.currentTime = 0), d;
			b[0].pause();
			b[0].currentTime = 0;
			return b[0]
		}
	});
	ig.Music = ig.Class.extend({
		tracks: [],
		namedTracks: {},
		currentTrack: null,
		currentIndex: 0,
		random: !1,
		_volume: 1,
		_loop: !1,
		_fadeInterval: 0,
		_fadeTimer: null,
		_endedCallbackBound: null,
		init: function() {
			this._endedCallbackBound = this._endedCallback.bind(this);
			Object.defineProperty ? (Object.defineProperty(this, "volume", {
				get: this.getVolume.bind(this),
				set: this.setVolume.bind(this)
			}), Object.defineProperty(this, "loop", {
				get: this.getLooping.bind(this),
				set: this.setLooping.bind(this)
			})) : this.__defineGetter__ && (this.__defineGetter__("volume", this.getVolume.bind(this)), this.__defineSetter__("volume", this.setVolume.bind(this)), this.__defineGetter__("loop", this.getLooping.bind(this)), this.__defineSetter__("loop", this.setLooping.bind(this)))
		},
		add: function(b, c) {
			if (ig.Sound.enabled) {
				var d = ig.soundManager.load(b instanceof ig.Sound ? b.path : b, !1);
				d.loop = this._loop;
				d.volume = this._volume;
				d.addEventListener("ended", this._endedCallbackBound, !1);
				this.tracks.push(d);
				c && (this.namedTracks[c] = d);
				this.currentTrack || (this.currentTrack = d)
			}
		},
		next: function() {
			this.tracks.length && (this.stop(), this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length, this.currentTrack = this.tracks[this.currentIndex], this.play())
		},
		pause: function() {
			this.currentTrack && this.currentTrack.pause()
		},
		stop: function() {
			this.currentTrack && (this.currentTrack.pause(), this.currentTrack.currentTime = 0)
		},
		play: function(b) {
			if (b && this.namedTracks[b]) b = this.namedTracks[b], b != this.currentTrack && (this.stop(), this.currentTrack = b);
			else if (!this.currentTrack) return;
			this.currentTrack.play()
		},
		getLooping: function() {
			return this._loop
		},
		setLooping: function(b) {
			this._loop = b;
			for (var c in this.tracks) this.tracks[c].loop = b
		},
		getVolume: function() {
			return this._volume
		},
		setVolume: function(b) {
			this._volume = b.limit(0, 1);
			for (var c in this.tracks) this.tracks[c].volume = this._volume
		},
		fadeOut: function(b) {
			this.currentTrack && (clearInterval(this._fadeInterval), this.fadeTimer = new ig.Timer(b), this._fadeInterval = setInterval(this._fadeStep.bind(this), 50))
		},
		_fadeStep: function() {
			var b = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
			0.01 >= b ? (this.stop(), this.currentTrack.volume = this._volume, clearInterval(this._fadeInterval)) : this.currentTrack.volume = b
		},
		_endedCallback: function() {
			this._loop ? this.play() : this.next()
		}
	});
	ig.Sound = ig.Class.extend({
		path: "",
		volume: 1,
		currentClip: null,
		multiChannel: !0,
		init: function(b, c) {
			this.path = b;
			this.multiChannel = !1 !== c;
			this.load()
		},
		load: function(b) {
			ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path, this.multiChannel, b) : ig.addResource(this) : b && b(this.path, !0)
		},
		play: function() {
			ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path), this.currentClip.volume = ig.soundManager.volume * this.volume, this.currentClip.play())
		},
		stop: function() {
			this.currentClip && (this.currentClip.pause(), this.currentClip.currentTime = 0)
		}
	});
	ig.Sound.FORMAT = {
		MP3: {
			ext: "mp3",
			mime: "audio/mpeg"
		},
		M4A: {
			ext: "m4a",
			mime: "audio/mp4; codecs=mp4a"
		},
		OGG: {
			ext: "ogg",
			mime: "audio/ogg; codecs=vorbis"
		},
		WEBM: {
			ext: "webm",
			mime: "audio/webm; codecs=vorbis"
		},
		CAF: {
			ext: "caf",
			mime: "audio/x-caf"
		}
	};
	ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
	ig.Sound.channels = 4;
	ig.Sound.enabled = !0
});
ig.baked = !0;
ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
	ig.Loader = ig.Class.extend({
		resources: [],
		gameClass: null,
		status: 0,
		done: !1,
		_unloaded: [],
		_drawStatus: 0,
		_intervalId: 0,
		_loadCallbackBound: null,
		init: function(b, c) {
			this.gameClass = b;
			this.resources = c;
			this._loadCallbackBound = this._loadCallback.bind(this);
			for (var d = 0; d < this.resources.length; d++) this._unloaded.push(this.resources[d].path)
		},
		load: function() {
			ig.system.clear("#000");
			if (this.resources.length) {
				for (var b = 0; b < this.resources.length; b++) this.loadResource(this.resources[b]);
				this._intervalId = setInterval(this.draw.bind(this), 16)
			} else this.end()
		},
		loadResource: function(b) {
			b.load(this._loadCallbackBound)
		},
		end: function() {
			this.done || (this.done = !0, clearInterval(this._intervalId))
		},
		draw: function() {},
		_loadCallback: function(b, c) {
			if (c) this._unloaded.erase(b);
			else throw "Failed to load resource: " + b;
			this.status = 1 - this._unloaded.length / this.resources.length;
			0 == this._unloaded.length && setTimeout(this.end.bind(this), 250)
		}
	})
});
ig.baked = !0;
ig.module("impact.timer").defines(function() {
	ig.Timer = ig.Class.extend({
		target: 0,
		base: 0,
		last: 0,
		pausedAt: 0,
		init: function(b) {
			this.last = this.base = ig.Timer.time;
			this.target = b || 0
		},
		set: function(b) {
			this.target = b || 0;
			this.base = ig.Timer.time;
			this.pausedAt = 0
		},
		reset: function() {
			this.base = ig.Timer.time;
			this.pausedAt = 0
		},
		tick: function() {
			var b = ig.Timer.time - this.last;
			this.last = ig.Timer.time;
			return this.pausedAt ? 0 : b
		},
		delta: function() {
			return (this.pausedAt || ig.Timer.time) - this.base - this.target
		},
		pause: function() {
			this.pausedAt || (this.pausedAt = ig.Timer.time)
		},
		unpause: function() {
			this.pausedAt && (this.base += ig.Timer.time - this.pausedAt, this.pausedAt = 0)
		}
	});
	ig.Timer._last = 0;
	ig.Timer.time = Number.MIN_VALUE;
	ig.Timer.timeScale = 1;
	ig.Timer.maxStep = 0.05;
	ig.Timer.step = function() {
		var b = Date.now();
		ig.Timer.time += Math.min((b - ig.Timer._last) / 1E3, ig.Timer.maxStep) * ig.Timer.timeScale;
		ig.Timer._last = b
	}
});
ig.baked = !0;
ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
	ig.System = ig.Class.extend({
		fps: 30,
		width: 320,
		height: 240,
		realWidth: 320,
		realHeight: 240,
		scale: 1,
		tick: 0,
		animationId: 0,
		newGameClass: null,
		running: !1,
		delegate: null,
		clock: null,
		canvas: null,
		context: null,
		init: function(b, c, d, e, f) {
			this.fps = c;
			this.clock = new ig.Timer;
			this.canvas = ig.$(b);
			this.resize(d, e, f);
			this.context = this.canvas.getContext("2d");
			this.getDrawPos = ig.System.drawMode;
			1 != this.scale && (ig.System.scaleMode = ig.System.SCALE.CRISP);
			ig.System.scaleMode(this.canvas, this.context)
		},
		resize: function(b, c, d) {
			this.width = b;
			this.height = c;
			this.scale = d || this.scale;
			this.realWidth = this.width * this.scale;
			this.realHeight = this.height * this.scale;
			this.canvas.width = this.realWidth;
			this.canvas.height = this.realHeight
		},
		setGame: function(b) {
			this.running ? this.newGameClass = b : this.setGameNow(b)
		},
		setGameNow: function(b) {
			ig.game = new b;
			ig.system.setDelegate(ig.game)
		},
		setDelegate: function(b) {
			if ("function" == typeof b.run) this.delegate = b, this.startRunLoop();
			else throw "System.setDelegate: No run() function in object";
		},
		stopRunLoop: function() {
			ig.clearAnimation(this.animationId);
			this.running = !1
		},
		startRunLoop: function() {
			this.stopRunLoop();
			this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
			this.running = !0
		},
		clear: function(b) {
			this.context.fillStyle = b;
			this.context.fillRect(0, 0, this.realWidth, this.realHeight)
		},
		run: function() {
			ig.Timer.step();
			this.tick = this.clock.tick();
			this.delegate.run();
			ig.input.clearPressed();
			this.newGameClass && (this.setGameNow(this.newGameClass), this.newGameClass = null)
		},
		getDrawPos: null
	});
	ig.System.DRAW = {
		AUTHENTIC: function(b) {
			return Math.round(b) * this.scale
		},
		SMOOTH: function(b) {
			return Math.round(b * this.scale)
		},
		SUBPIXEL: function(b) {
			return b * this.scale
		}
	};
	ig.System.drawMode = ig.System.DRAW.SMOOTH;
	ig.System.SCALE = {
		CRISP: function(b, c) {
			ig.setVendorAttribute(c, "imageSmoothingEnabled", !1);
			b.style.imageRendering = "-moz-crisp-edges";
			b.style.imageRendering = "-o-crisp-edges";
			b.style.imageRendering = "-webkit-optimize-contrast";
			b.style.imageRendering = "crisp-edges";
			b.style.msInterpolationMode = "nearest-neighbor"
		},
		SMOOTH: function(b, c) {
			ig.setVendorAttribute(c, "imageSmoothingEnabled", !0);
			b.style.imageRendering = "";
			b.style.msInterpolationMode = ""
		}
	};
	ig.System.scaleMode = ig.System.SCALE.SMOOTH
});
ig.baked = !0;
ig.module("impact.input").defines(function() {
	ig.KEY = {
		MOUSE1: -1,
		MOUSE2: -3,
		MWHEEL_UP: -4,
		MWHEEL_DOWN: -5,
		BACKSPACE: 8,
		TAB: 9,
		ENTER: 13,
		PAUSE: 19,
		CAPS: 20,
		ESC: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT_ARROW: 37,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		DOWN_ARROW: 40,
		INSERT: 45,
		DELETE: 46,
		_0: 48,
		_1: 49,
		_2: 50,
		_3: 51,
		_4: 52,
		_5: 53,
		_6: 54,
		_7: 55,
		_8: 56,
		_9: 57,
		A: 65,
		B: 66,
		C: 67,
		D: 68,
		E: 69,
		F: 70,
		G: 71,
		H: 72,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		T: 84,
		U: 85,
		V: 86,
		W: 87,
		X: 88,
		Y: 89,
		Z: 90,
		NUMPAD_0: 96,
		NUMPAD_1: 97,
		NUMPAD_2: 98,
		NUMPAD_3: 99,
		NUMPAD_4: 100,
		NUMPAD_5: 101,
		NUMPAD_6: 102,
		NUMPAD_7: 103,
		NUMPAD_8: 104,
		NUMPAD_9: 105,
		MULTIPLY: 106,
		ADD: 107,
		SUBSTRACT: 109,
		DECIMAL: 110,
		DIVIDE: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		PLUS: 187,
		COMMA: 188,
		MINUS: 189,
		PERIOD: 190
	};
	ig.Input = ig.Class.extend({
		bindings: {},
		actions: {},
		presses: {},
		locks: {},
		delayedKeyup: {},
		isUsingMouse: !1,
		isUsingKeyboard: !1,
		isUsingAccelerometer: !1,
		mouse: {
			x: 0,
			y: 0
		},
		accel: {
			x: 0,
			y: 0,
			z: 0
		},
		initMouse: function() {
			if (!this.isUsingMouse) {
				this.isUsingMouse = !0;
				var b = this.mousewheel.bind(this);
				ig.system.canvas.addEventListener("mousewheel", b, !1);
				ig.system.canvas.addEventListener("DOMMouseScroll", b, !1);
				ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1);
				ig.system.canvas.addEventListener("mousedown", this.keydown.bind(this), !1);
				ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1);
				ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1);
				ig.ua.touchDevice && (ig.system.canvas.addEventListener("touchstart", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1), ig.system.canvas.addEventListener("MSPointerDown", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.mousemove.bind(this), !1), ig.system.canvas.style.msTouchAction = "none")
			}
		},
		initKeyboard: function() {
			this.isUsingKeyboard || (this.isUsingKeyboard = !0, window.addEventListener("keydown", this.keydown.bind(this), !1), window.addEventListener("keyup", this.keyup.bind(this), !1))
		},
		initAccelerometer: function() {
			this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1)
		},
		mousewheel: function(b) {
			var c = this.bindings[0 < (b.wheelDelta ? b.wheelDelta : -1 * b.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
			c && (this.actions[c] = !0, this.presses[c] = !0, this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault())
		},
		mousemove: function(b) {
			var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
			ig.ua.mobile && (c = ig.system.realWidth);
			var c = ig.system.scale * (c / ig.system.realWidth),
				d = {
					left: 0,
					top: 0
				};
			ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
			b = b.touches ? b.touches[0] : b;
			this.mouse.x = (b.clientX - d.left) / c;
			this.mouse.y = (b.clientY - d.top) / c
		},
		contextmenu: function(b) {
			this.bindings[ig.KEY.MOUSE2] && (b.stopPropagation(), b.preventDefault())
		},
		keydown: function(b) {
			var c = b.target.tagName;
			if (!("INPUT" == c || "TEXTAREA" == c))
				if (c = "keydown" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1, ("touchstart" == b.type || "mousedown" == b.type) && this.mousemove(b), c = this.bindings[c]) this.actions[c] = !0, this.locks[c] || (this.presses[c] = !0, this.locks[c] = !0), b.stopPropagation(), b.preventDefault()
		},
		keyup: function(b) {
			var c = b.target.tagName;
			if (!("INPUT" == c || "TEXTAREA" == c))
				if (c = this.bindings["keyup" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1]) this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault()
		},
		devicemotion: function(b) {
			this.accel = b.accelerationIncludingGravity
		},
		bind: function(b, c) {
			0 > b ? this.initMouse() : 0 < b && this.initKeyboard();
			this.bindings[b] = c
		},
		bindTouch: function(b, c) {
			var d = ig.$(b),
				e = this;
			d.addEventListener("touchstart", function(b) {
				e.touchStart(b, c)
			}, !1);
			d.addEventListener("touchend", function(b) {
				e.touchEnd(b, c)
			}, !1);
			d.addEventListener("MSPointerDown", function(b) {
				e.touchStart(b, c)
			}, !1);
			d.addEventListener("MSPointerUp", function(b) {
				e.touchEnd(b, c)
			}, !1)
		},
		unbind: function(b) {
			this.delayedKeyup[this.bindings[b]] = !0;
			this.bindings[b] = null
		},
		unbindAll: function() {
			this.bindings = {};
			this.actions = {};
			this.presses = {};
			this.locks = {};
			this.delayedKeyup = {}
		},
		state: function(b) {
			return this.actions[b]
		},
		pressed: function(b) {
			return this.presses[b]
		},
		released: function(b) {
			return !!this.delayedKeyup[b]
		},
		clearPressed: function() {
			for (var b in this.delayedKeyup) this.actions[b] = !1, this.locks[b] = !1;
			this.delayedKeyup = {};
			this.presses = {}
		},
		touchStart: function(b, c) {
			this.actions[c] = !0;
			this.presses[c] = !0;
			b.stopPropagation();
			b.preventDefault();
			return !1
		},
		touchEnd: function(b, c) {
			this.delayedKeyup[c] = !0;
			b.stopPropagation();
			b.preventDefault();
			return !1
		}
	})
});
ig.baked = !0;
ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound").defines(function() {
	ig.main = function(b, c, d, e, f, g, m) {
		ig.system = new ig.System(b, d, e, f, g || 1);
		ig.input = new ig.Input;
		ig.soundManager = new ig.SoundManager;
		ig.music = new ig.Music;
		ig.ready = !0;
		(new(m || ig.Loader)(c, ig.resources)).load()
	}
});
ig.baked = !0;
ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
	ig.AnimationSheet = ig.Class.extend({
		width: 8,
		height: 8,
		image: null,
		init: function(b, c, d) {
			this.width = c;
			this.height = d;
			this.image = new ig.Image(b)
		}
	});
	ig.Animation = ig.Class.extend({
		sheet: null,
		timer: null,
		sequence: [],
		flip: {
			x: !1,
			y: !1
		},
		pivot: {
			x: 0,
			y: 0
		},
		frame: 0,
		tile: 0,
		loopCount: 0,
		alpha: 1,
		angle: 0,
		init: function(b, c, d, e) {
			this.sheet = b;
			this.pivot = {
				x: b.width / 2,
				y: b.height / 2
			};
			this.timer = new ig.Timer;
			this.frameTime = c;
			this.sequence = d;
			this.stop = !!e;
			this.tile = this.sequence[0]
		},
		rewind: function() {
			this.timer.set();
			this.frame = this.loopCount = 0;
			this.tile = this.sequence[0];
			return this
		},
		gotoFrame: function(b) {
			this.timer.set(this.frameTime * -b - 1E-4);
			this.update()
		},
		gotoRandomFrame: function() {
			this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
		},
		update: function() {
			var b = Math.floor(this.timer.delta() / this.frameTime);
			this.loopCount = Math.floor(b / this.sequence.length);
			this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : b % this.sequence.length;
			this.tile = this.sequence[this.frame]
		},
		draw: function(b, c) {
			var d = Math.max(this.sheet.width, this.sheet.height);
			b > ig.system.width || (c > ig.system.height || 0 > b + d || 0 > c + d) || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha), 0 == this.angle ? this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(), ig.system.context.translate(ig.system.getDrawPos(b + this.pivot.x), ig.system.getDrawPos(c + this.pivot.y)), ig.system.context.rotate(this.angle), this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y), ig.system.context.restore()), 1 != this.alpha && (ig.system.context.globalAlpha = 1))
		}
	})
});
ig.baked = !0;
ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
	ig.Entity = ig.Class.extend({
		id: 0,
		settings: {},
		size: {
			x: 16,
			y: 16
		},
		offset: {
			x: 0,
			y: 0
		},
		pos: {
			x: 0,
			y: 0
		},
		last: {
			x: 0,
			y: 0
		},
		vel: {
			x: 0,
			y: 0
		},
		accel: {
			x: 0,
			y: 0
		},
		friction: {
			x: 0,
			y: 0
		},
		maxVel: {
			x: 100,
			y: 100
		},
		zIndex: 0,
		gravityFactor: 1,
		standing: !1,
		bounciness: 0,
		minBounceVelocity: 40,
		anims: {},
		animSheet: null,
		currentAnim: null,
		health: 10,
		type: 0,
		checkAgainst: 0,
		collides: 0,
		_killed: !1,
		slopeStanding: {
			min: (44).toRad(),
			max: (136).toRad()
		},
		init: function(b, c, d) {
			this.id = ++ig.Entity._lastId;
			this.pos.x = this.last.x = b;
			this.pos.y = this.last.y = c;
			ig.merge(this, d)
		},
		reset: function(b, c, d) {
			var e = this.constructor.prototype;
			this.pos.x = b;
			this.pos.y = c;
			this.last.x = b;
			this.last.y = c;
			this.vel.x = e.vel.x;
			this.vel.y = e.vel.y;
			this.accel.x = e.accel.x;
			this.accel.y = e.accel.y;
			this.health = e.health;
			this._killed = e._killed;
			this.standing = e.standing;
			this.type = e.type;
			this.checkAgainst = e.checkAgainst;
			this.collides = e.collides;
			ig.merge(this, d)
		},
		addAnim: function(b, c, d, e) {
			if (!this.animSheet) throw "No animSheet to add the animation " +
				b + " to.";
			c = new ig.Animation(this.animSheet, c, d, e);
			this.anims[b] = c;
			this.currentAnim || (this.currentAnim = c);
			return c
		},
		update: function() {
			this.last.x = this.pos.x;
			this.last.y = this.pos.y;
			this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
			this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
			this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
			var b = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y * ig.system.tick, this.size.x, this.size.y);
			this.handleMovementTrace(b);
			this.currentAnim && this.currentAnim.update()
		},
		getNewVelocity: function(b, c, d, e) {
			return c ? (b + c * ig.system.tick).limit(-e, e) : d ? (c = d * ig.system.tick, 0 < b - c ? b - c : 0 > b + c ? b + c : 0) : b.limit(-e, e)
		},
		handleMovementTrace: function(b) {
			this.standing = !1;
			b.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
			b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
			if (b.collision.slope) {
				var c = b.collision.slope;
				if (0 < this.bounciness) {
					var d = this.vel.x * c.nx + this.vel.y * c.ny;
					this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
					this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
				} else d = (this.vel.x * c.x + this.vel.y * c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
			}
			this.pos = b.pos
		},
		draw: function() {
			this.currentAnim && this.currentAnim.draw(this.pos.x -
				this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
		},
		kill: function() {
			ig.game.removeEntity(this)
		},
		receiveDamage: function(b) {
			this.health -= b;
			0 >= this.health && this.kill()
		},
		touches: function(b) {
			return !(this.pos.x >= b.pos.x + b.size.x || this.pos.x + this.size.x <= b.pos.x || this.pos.y >= b.pos.y + b.size.y || this.pos.y + this.size.y <= b.pos.y)
		},
		distanceTo: function(b) {
			var c = this.pos.x + this.size.x / 2 - (b.pos.x + b.size.x / 2);
			b = this.pos.y + this.size.y / 2 - (b.pos.y + b.size.y / 2);
			return Math.sqrt(c * c + b * b)
		},
		angleTo: function(b) {
			return Math.atan2(b.pos.y +
				b.size.y / 2 - (this.pos.y + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x / 2))
		},
		check: function() {},
		collideWith: function() {},
		ready: function() {},
		erase: function() {}
	});
	ig.Entity._lastId = 0;
	ig.Entity.COLLIDES = {
		NEVER: 0,
		LITE: 1,
		PASSIVE: 2,
		ACTIVE: 4,
		FIXED: 8
	};
	ig.Entity.TYPE = {
		NONE: 0,
		A: 1,
		B: 2,
		BOTH: 3
	};
	ig.Entity.checkPair = function(b, c) {
		b.checkAgainst & c.type && b.check(c);
		c.checkAgainst & b.type && c.check(b);
		b.collides && (c.collides && b.collides + c.collides > ig.Entity.COLLIDES.ACTIVE) && ig.Entity.solveCollision(b, c)
	};
	ig.Entity.solveCollision = function(b, c) {
		var d = null;
		if (b.collides == ig.Entity.COLLIDES.LITE || c.collides == ig.Entity.COLLIDES.FIXED) d = b;
		else if (c.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) d = c;
		b.last.x + b.size.x > c.last.x && b.last.x < c.last.x + c.size.x ? (b.last.y < c.last.y ? ig.Entity.seperateOnYAxis(b, c, d) : ig.Entity.seperateOnYAxis(c, b, d), b.collideWith(c, "y"), c.collideWith(b, "y")) : b.last.y + b.size.y > c.last.y && b.last.y < c.last.y + c.size.y && (b.last.x < c.last.x ? ig.Entity.seperateOnXAxis(b, c, d) : ig.Entity.seperateOnXAxis(c, b, d), b.collideWith(c, "x"), c.collideWith(b, "x"))
	};
	ig.Entity.seperateOnXAxis = function(b, c, d) {
		var e = b.pos.x + b.size.x - c.pos.x;
		d ? (d.vel.x = -d.vel.x * d.bounciness + (b === d ? c : b).vel.x, c = ig.game.collisionMap.trace(d.pos.x, d.pos.y, d == b ? -e : e, 0, d.size.x, d.size.y), d.pos.x = c.pos.x) : (d = (b.vel.x - c.vel.x) / 2, b.vel.x = -d, c.vel.x = d, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, -e / 2, 0, b.size.x, b.size.y), b.pos.x = Math.floor(d.pos.x), b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, e / 2, 0, c.size.x, c.size.y), c.pos.x = Math.ceil(b.pos.x))
	};
	ig.Entity.seperateOnYAxis = function(b, c, d) {
		var e = b.pos.y + b.size.y - c.pos.y;
		if (d) {
			c = b === d ? c : b;
			d.vel.y = -d.vel.y * d.bounciness + c.vel.y;
			var f = 0;
			d == b && Math.abs(d.vel.y - c.vel.y) < d.minBounceVelocity && (d.standing = !0, f = c.vel.x * ig.system.tick);
			b = ig.game.collisionMap.trace(d.pos.x, d.pos.y, f, d == b ? -e : e, d.size.x, d.size.y);
			d.pos.y = b.pos.y;
			d.pos.x = b.pos.x
		} else ig.game.gravity && (c.standing || 0 < b.vel.y) ? (d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, 0, -(b.pos.y + b.size.y - c.pos.y), b.size.x, b.size.y), b.pos.y = d.pos.y, 0 < b.bounciness && b.vel.y > b.minBounceVelocity ? b.vel.y *= -b.bounciness : (b.standing = !0, b.vel.y = 0)) : (d = (b.vel.y - c.vel.y) / 2, b.vel.y = -d, c.vel.y = d, f = c.vel.x * ig.system.tick, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, f, -e / 2, b.size.x, b.size.y), b.pos.y = d.pos.y, b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, 0, e / 2, c.size.x, c.size.y), c.pos.y = b.pos.y)
	}
});
ig.baked = !0;
ig.module("impact.map").defines(function() {
	ig.Map = ig.Class.extend({
		tilesize: 8,
		width: 1,
		height: 1,
		data: [
			[]
		],
		name: null,
		init: function(b, c) {
			this.tilesize = b;
			this.data = c;
			this.height = c.length;
			this.width = c[0].length;
			this.pxWidth = this.width * this.tilesize;
			this.pxHeight = this.height * this.tilesize
		},
		getTile: function(b, c) {
			var d = Math.floor(b / this.tilesize),
				e = Math.floor(c / this.tilesize);
			return 0 <= d && d < this.width && 0 <= e && e < this.height ? this.data[e][d] : 0
		},
		setTile: function(b, c, d) {
			b = Math.floor(b / this.tilesize);
			c = Math.floor(c / this.tilesize);
			0 <= b && b < this.width && (0 <= c && c < this.height) && (this.data[c][b] = d)
		}
	})
});
ig.baked = !0;
ig.module("impact.collision-map").requires("impact.map").defines(function() {
	ig.CollisionMap = ig.Map.extend({
		lastSlope: 1,
		tiledef: null,
		init: function(b, c, f) {
			this.parent(b, c);
			this.tiledef = f || ig.CollisionMap.defaultTileDef;
			for (var g in this.tiledef) g | 0 > this.lastSlope && (this.lastSlope = g | 0)
		},
		trace: function(b, c, f, g, m, l) {
			var j = {
					collision: {
						x: !1,
						y: !1,
						slope: !1
					},
					pos: {
						x: b,
						y: c
					},
					tile: {
						x: 0,
						y: 0
					}
				},
				q = Math.ceil(Math.max(Math.abs(f), Math.abs(g)) / this.tilesize);
			if (1 < q)
				for (var z = f / q, y = g / q, A = 0; A < q && (z || y) && !(this._traceStep(j, b, c, z, y, m, l, f, g, A), b = j.pos.x, c = j.pos.y, j.collision.x && (f = z = 0), j.collision.y && (g = y = 0), j.collision.slope); A++);
			else this._traceStep(j, b, c, f, g, m, l, f, g, 0);
			return j
		},
		_traceStep: function(b, c, f, g, m, l, j, q, z, y) {
			b.pos.x += g;
			b.pos.y += m;
			var A = 0;
			if (g) {
				var B = 0 < g ? l : 0,
					E = 0 > g ? this.tilesize : 0,
					A = Math.max(Math.floor(f / this.tilesize), 0),
					F = Math.min(Math.ceil((f + j) / this.tilesize), this.height);
				g = Math.floor((b.pos.x + B) / this.tilesize);
				var s = Math.floor((c + B) / this.tilesize);
				if (0 < y || g == s || 0 > s || s >= this.width) s = -1;
				if (0 <= g && g < this.width)
					for (var I = A; I < F && !(-1 != s && (A = this.data[I][s], 1 < A && A <= this.lastSlope && this._checkTileDef(b, A, c, f, q, z, l, j, s, I))); I++)
						if (A = this.data[I][g], 1 == A || A > this.lastSlope || 1 < A && this._checkTileDef(b, A, c, f, q, z, l, j, g, I)) {
							if (1 < A && A <= this.lastSlope && b.collision.slope) break;
							b.collision.x = !0;
							b.tile.x = A;
							c = b.pos.x = g * this.tilesize - B + E;
							q = 0;
							break
						}
			}
			if (m) {
				B = 0 < m ? j : 0;
				m = 0 > m ? this.tilesize : 0;
				A = Math.max(Math.floor(b.pos.x / this.tilesize), 0);
				E = Math.min(Math.ceil((b.pos.x + l) / this.tilesize), this.width);
				I = Math.floor((b.pos.y + B) / this.tilesize);
				F = Math.floor((f + B) / this.tilesize);
				if (0 < y || I == F || 0 > F || F >= this.height) F = -1;
				if (0 <= I && I < this.height)
					for (g = A; g < E && !(-1 != F && (A = this.data[F][g], 1 < A && A <= this.lastSlope && this._checkTileDef(b, A, c, f, q, z, l, j, g, F))); g++)
						if (A = this.data[I][g], 1 == A || A > this.lastSlope || 1 < A && this._checkTileDef(b, A, c, f, q, z, l, j, g, I)) {
							if (1 < A && A <= this.lastSlope && b.collision.slope) break;
							b.collision.y = !0;
							b.tile.y = A;
							b.pos.y = I * this.tilesize - B + m;
							break
						}
			}
		},
		_checkTileDef: function(b, c, f, g, m, l, j, q, z, y) {
			var A = this.tiledef[c];
			if (!A) return !1;
			c = (A[2] -
				A[0]) * this.tilesize;
			var B = (A[3] - A[1]) * this.tilesize,
				E = A[4];
			j = f + m + (0 > B ? j : 0) - (z + A[0]) * this.tilesize;
			q = g + l + (0 < c ? q : 0) - (y + A[1]) * this.tilesize;
			if (0 < c * q - B * j) {
				if (0 > m * -B + l * c) return E;
				z = Math.sqrt(c * c + B * B);
				y = B / z;
				z = -c / z;
				var F = j * y + q * z,
					A = y * F,
					F = z * F;
				if (A * A + F * F >= m * m + l * l) return E || 0.5 > c * (q - l) - B * (j - m);
				b.pos.x = f + m - A;
				b.pos.y = g + l - F;
				b.collision.slope = {
					x: c,
					y: B,
					nx: y,
					ny: z
				};
				return !0
			}
			return !1
		}
	});
	var b = 1 / 3,
		c = 2 / 3;
	ig.CollisionMap.defaultTileDef = {
		5: [0, 1, 1, c, !0],
		6: [0, c, 1, b, !0],
		7: [0, b, 1, 0, !0],
		3: [0, 1, 1, 0.5, !0],
		4: [0, 0.5, 1, 0, !0],
		2: [0, 1, 1, 0, !0],
		10: [0.5, 1, 1, 0, !0],
		21: [0, 1, 0.5, 0, !0],
		32: [c, 1, 1, 0, !0],
		43: [b, 1, c, 0, !0],
		54: [0, 1, b, 0, !0],
		27: [0, 0, 1, b, !0],
		28: [0, b, 1, c, !0],
		29: [0, c, 1, 1, !0],
		25: [0, 0, 1, 0.5, !0],
		26: [0, 0.5, 1, 1, !0],
		24: [0, 0, 1, 1, !0],
		11: [0, 0, 0.5, 1, !0],
		22: [0.5, 0, 1, 1, !0],
		33: [0, 0, b, 1, !0],
		44: [b, 0, c, 1, !0],
		55: [c, 0, 1, 1, !0],
		16: [1, b, 0, 0, !0],
		17: [1, c, 0, b, !0],
		18: [1, 1, 0, c, !0],
		14: [1, 0.5, 0, 0, !0],
		15: [1, 1, 0, 0.5, !0],
		13: [1, 1, 0, 0, !0],
		8: [0.5, 1, 0, 0, !0],
		19: [1, 1, 0.5, 0, !0],
		30: [b, 1, 0, 0, !0],
		41: [c, 1, b, 0, !0],
		52: [1, 1, c, 0, !0],
		38: [1, c, 0, 1, !0],
		39: [1, b, 0, c, !0],
		40: [1, 0, 0, b, !0],
		36: [1, 0.5, 0, 1, !0],
		37: [1, 0, 0, 0.5, !0],
		35: [1, 0, 0, 1, !0],
		9: [1, 0, 0.5, 1, !0],
		20: [0.5, 0, 0, 1, !0],
		31: [1, 0, c, 1, !0],
		42: [c, 0, b, 1, !0],
		53: [b, 0, 0, 1, !0],
		12: [0, 0, 1, 0, !1],
		23: [1, 1, 0, 1, !1],
		34: [1, 0, 1, 1, !1],
		45: [0, 1, 0, 0, !1]
	};
	ig.CollisionMap.staticNoCollision = {
		trace: function(b, c, f, g) {
			return {
				collision: {
					x: !1,
					y: !1,
					slope: !1
				},
				pos: {
					x: b + f,
					y: c + g
				},
				tile: {
					x: 0,
					y: 0
				}
			}
		}
	}
});
ig.baked = !0;
ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
	ig.BackgroundMap = ig.Map.extend({
		tiles: null,
		scroll: {
			x: 0,
			y: 0
		},
		distance: 1,
		repeat: !1,
		tilesetName: "",
		foreground: !1,
		enabled: !0,
		preRender: !1,
		preRenderedChunks: null,
		chunkSize: 512,
		debugChunks: !1,
		anims: {},
		init: function(b, c, d) {
			this.parent(b, c);
			this.setTileset(d)
		},
		setTileset: function(b) {
			this.tilesetName = b instanceof ig.Image ? b.path : b;
			this.tiles = new ig.Image(this.tilesetName);
			this.preRenderedChunks = null
		},
		setScreenPos: function(b, c) {
			this.scroll.x = b / this.distance;
			this.scroll.y = c / this.distance
		},
		preRenderMapToChunks: function() {
			var b = this.width * this.tilesize * ig.system.scale,
				c = this.height * this.tilesize * ig.system.scale;
			this.chunkSize = Math.min(Math.max(b, c), this.chunkSize);
			var d = Math.ceil(b / this.chunkSize),
				e = Math.ceil(c / this.chunkSize);
			this.preRenderedChunks = [];
			for (var f = 0; f < e; f++) {
				this.preRenderedChunks[f] = [];
				for (var g = 0; g < d; g++) this.preRenderedChunks[f][g] = this.preRenderChunk(g, f, g == d - 1 ? b - g * this.chunkSize : this.chunkSize, f == e - 1 ? c - f * this.chunkSize : this.chunkSize)
			}
		},
		preRenderChunk: function(b, c, d, e) {
			var f = d / this.tilesize / ig.system.scale + 1,
				g = e / this.tilesize / ig.system.scale + 1,
				m = b * this.chunkSize / ig.system.scale % this.tilesize,
				l = c * this.chunkSize / ig.system.scale % this.tilesize;
			b = Math.floor(b * this.chunkSize / this.tilesize / ig.system.scale);
			c = Math.floor(c * this.chunkSize / this.tilesize / ig.system.scale);
			var j = ig.$new("canvas");
			j.width = d;
			j.height = e;
			j.retinaResolutionEnabled = !1;
			e = j.getContext("2d");
			ig.System.scaleMode(j, e);
			d = ig.system.context;
			ig.system.context = e;
			for (e = 0; e < f; e++)
				for (var q = 0; q < g; q++)
					if (e + b < this.width && q + c < this.height) {
						var z = this.data[q + c][e + b];
						z && this.tiles.drawTile(e * this.tilesize - m, q * this.tilesize - l, z - 1, this.tilesize)
					}
			ig.system.context = d;
			return j
		},
		draw: function() {
			this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled())
		},
		drawPreRendered: function() {
			this.preRenderedChunks || this.preRenderMapToChunks();
			var b = ig.system.getDrawPos(this.scroll.x),
				c = ig.system.getDrawPos(this.scroll.y);
			if (this.repeat) var d = this.width * this.tilesize * ig.system.scale,
				b = (b % d + d) % d,
				d = this.height * this.tilesize * ig.system.scale,
				c = (c % d + d) % d;
			var d = Math.max(Math.floor(b / this.chunkSize), 0),
				e = Math.max(Math.floor(c / this.chunkSize), 0),
				f = Math.ceil((b + ig.system.realWidth) / this.chunkSize),
				g = Math.ceil((c + ig.system.realHeight) / this.chunkSize),
				m = this.preRenderedChunks[0].length,
				l = this.preRenderedChunks.length;
			this.repeat || (f = Math.min(f, m), g = Math.min(g, l));
			for (var j = 0; e < g; e++) {
				for (var q = 0, z = d; z < f; z++) {
					var y = this.preRenderedChunks[e % l][z % m],
						A = -b + z * this.chunkSize - q,
						B = -c + e * this.chunkSize - j;
					ig.system.context.drawImage(y, A, B);
					ig.Image.drawCount++;
					this.debugChunks && (ig.system.context.strokeStyle = "#f0f", ig.system.context.strokeRect(A, B, this.chunkSize, this.chunkSize));
					this.repeat && (y.width < this.chunkSize && A + y.width < ig.system.realWidth) && (q += this.chunkSize - y.width, f++)
				}
				this.repeat && (y.height < this.chunkSize && B + y.height < ig.system.realHeight) && (j += this.chunkSize - y.height, g++)
			}
		},
		drawTiled: function() {
			for (var b = 0, c = null, d = (this.scroll.x / this.tilesize).toInt(), e = (this.scroll.y / this.tilesize).toInt(), f = this.scroll.x % this.tilesize, g = this.scroll.y % this.tilesize, m = -f - this.tilesize, f = ig.system.width + this.tilesize - f, l = ig.system.height + this.tilesize - g, j = -1, g = -g - this.tilesize; g < l; j++, g += this.tilesize) {
				var q = j + e;
				if (q >= this.height || 0 > q) {
					if (!this.repeat) continue;
					q = (q % this.height + this.height) % this.height
				}
				for (var z = -1, y = m; y < f; z++, y += this.tilesize) {
					b = z + d;
					if (b >= this.width || 0 > b) {
						if (!this.repeat) continue;
						b = (b % this.width + this.width) % this.width
					}
					if (b = this.data[q][b])(c = this.anims[b -
						1]) ? c.draw(y, g) : this.tiles.drawTile(y, g, b - 1, this.tilesize)
				}
			}
		}
	})
});
ig.baked = !0;
ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
	ig.Game = ig.Class.extend({
		clearColor: "#000000",
		gravity: 0,
		screen: {
			x: 0,
			y: 0
		},
		_rscreen: {
			x: 0,
			y: 0
		},
		entities: [],
		namedEntities: {},
		collisionMap: ig.CollisionMap.staticNoCollision,
		backgroundMaps: [],
		backgroundAnims: {},
		autoSort: !1,
		sortBy: null,
		cellSize: 64,
		_deferredKill: [],
		_levelToLoad: null,
		_doSortEntities: !1,
		staticInstantiate: function() {
			this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
			ig.game = this;
			return null
		},
		loadLevel: function(b) {
			this.screen = {
				x: 0,
				y: 0
			};
			this.entities = [];
			this.namedEntities = {};
			for (var c = 0; c < b.entities.length; c++) {
				var d = b.entities[c];
				this.spawnEntity(d.type, d.x, d.y, d.settings)
			}
			this.sortEntities();
			this.collisionMap = ig.CollisionMap.staticNoCollision;
			this.backgroundMaps = [];
			for (c = 0; c < b.layer.length; c++)
				if (d = b.layer[c], "collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
				else {
					var e = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
					e.anims = this.backgroundAnims[d.tilesetName] || {};
					e.repeat = d.repeat;
					e.distance = d.distance;
					e.foreground = !!d.foreground;
					e.preRender = !!d.preRender;
					e.name = d.name;
					this.backgroundMaps.push(e)
				}
			for (c = 0; c < this.entities.length; c++) this.entities[c].ready()
		},
		loadLevelDeferred: function(b) {
			this._levelToLoad = b
		},
		getMapByName: function(b) {
			if ("collision" == b) return this.collisionMap;
			for (var c = 0; c < this.backgroundMaps.length; c++)
				if (this.backgroundMaps[c].name == b) return this.backgroundMaps[c];
			return null
		},
		getEntityByName: function(b) {
			return this.namedEntities[b]
		},
		getEntitiesByType: function(b) {
			b = "string" === typeof b ? ig.global[b] : b;
			for (var c = [], d = 0; d < this.entities.length; d++) {
				var e = this.entities[d];
				e instanceof b && !e._killed && c.push(e)
			}
			return c
		},
		spawnEntity: function(b, c, d, e) {
			var f = "string" === typeof b ? ig.global[b] : b;
			if (!f) throw "Can't spawn entity of type " + b;
			b = new f(c, d, e || {});
			this.entities.push(b);
			b.name && (this.namedEntities[b.name] = b);
			return b
		},
		sortEntities: function() {
			this.entities.sort(this.sortBy)
		},
		sortEntitiesDeferred: function() {
			this._doSortEntities = !0
		},
		removeEntity: function(b) {
			b.name && delete this.namedEntities[b.name];
			b._killed = !0;
			b.type = ig.Entity.TYPE.NONE;
			b.checkAgainst = ig.Entity.TYPE.NONE;
			b.collides = ig.Entity.COLLIDES.NEVER;
			this._deferredKill.push(b)
		},
		run: function() {
			this.update();
			this.draw()
		},
		update: function() {
			this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null);
			this.updateEntities();
			this.checkEntities();
			for (var b = 0; b < this._deferredKill.length; b++) this._deferredKill[b].erase(), this.entities.erase(this._deferredKill[b]);
			this._deferredKill = [];
			if (this._doSortEntities || this.autoSort) this.sortEntities(), this._doSortEntities = !1;
			for (var c in this.backgroundAnims) {
				var b = this.backgroundAnims[c],
					d;
				for (d in b) b[d].update()
			}
		},
		updateEntities: function() {
			for (var b = 0; b < this.entities.length; b++) {
				var c = this.entities[b];
				c._killed || c.update()
			}
		},
		draw: function() {
			this.clearColor && ig.system.clear(this.clearColor);
			this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
			this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
			var b;
			for (b = 0; b < this.backgroundMaps.length; b++) {
				var c = this.backgroundMaps[b];
				if (c.foreground) break;
				c.setScreenPos(this.screen.x, this.screen.y);
				c.draw()
			}
			this.drawEntities();
			for (b; b < this.backgroundMaps.length; b++) c = this.backgroundMaps[b], c.setScreenPos(this.screen.x, this.screen.y), c.draw()
		},
		drawEntities: function() {
			for (var b = 0; b < this.entities.length; b++) this.entities[b].draw()
		},
		checkEntities: function() {
			for (var b = {}, c = 0; c < this.entities.length; c++) {
				var d = this.entities[c];
				if (!(d.type == ig.Entity.TYPE.NONE && d.checkAgainst == ig.Entity.TYPE.NONE && d.collides == ig.Entity.COLLIDES.NEVER))
					for (var e = {}, f = Math.floor(d.pos.y / this.cellSize), g = Math.floor((d.pos.x + d.size.x) / this.cellSize) + 1, m = Math.floor((d.pos.y + d.size.y) / this.cellSize) + 1, l = Math.floor(d.pos.x / this.cellSize); l < g; l++)
						for (var j = f; j < m; j++)
							if (b[l])
								if (b[l][j]) {
									for (var q = b[l][j], z = 0; z < q.length; z++) d.touches(q[z]) && !e[q[z].id] && (e[q[z].id] = !0, ig.Entity.checkPair(d, q[z]));
									q.push(d)
								} else b[l][j] = [d];
				else b[l] = {}, b[l][j] = [d]
			}
		}
	});
	ig.Game.SORT = {
		Z_INDEX: function(b, c) {
			return b.zIndex - c.zIndex
		},
		POS_X: function(b, c) {
			return b.pos.x + b.size.x - (c.pos.x +
				c.size.x)
		},
		POS_Y: function(b, c) {
			return b.pos.y + b.size.y - (c.pos.y + c.size.y)
		}
	}
});
var Box2D = {
	SCALE: 0.1
};
(function(b, c) {
	function d() {}!(Object.prototype.defineProperty instanceof Function) && (Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function) && (Object.defineProperty = function(b, c, d) {
		d.get instanceof Function && b.__defineGetter__(c, d.get);
		d.set instanceof Function && b.__defineSetter__(c, d.set)
	});
	b.inherit = function(b, c) {
		d.prototype = c.prototype;
		b.prototype = new d;
		b.prototype.constructor = b
	};
	b.generateCallback = function(b, c) {
		return function() {
			c.apply(b, arguments)
		}
	};
	b.NVector = function(b) {
		b === c && (b = 0);
		for (var d = Array(b || 0), g = 0; g < b; ++g) d[g] = 0;
		return d
	};
	b.is = function(b, d) {
		return null === b ? !1 : d instanceof Function && b instanceof d || b.constructor.__implements != c && b.constructor.__implements[d] ? !0 : !1
	};
	b.parseUInt = function(b) {
		return Math.abs(parseInt(b))
	}
})(Box2D);
var Vector = Array,
	Vector_a2j_Number = Box2D.NVector;
"undefined" === typeof Box2D && (Box2D = {});
"undefined" === typeof Box2D.Collision && (Box2D.Collision = {});
"undefined" === typeof Box2D.Collision.Shapes && (Box2D.Collision.Shapes = {});
"undefined" === typeof Box2D.Common && (Box2D.Common = {});
"undefined" === typeof Box2D.Common.Math && (Box2D.Common.Math = {});
"undefined" === typeof Box2D.Dynamics && (Box2D.Dynamics = {});
"undefined" === typeof Box2D.Dynamics.Contacts && (Box2D.Dynamics.Contacts = {});
"undefined" === typeof Box2D.Dynamics.Controllers && (Box2D.Dynamics.Controllers = {});
"undefined" === typeof Box2D.Dynamics.Joints && (Box2D.Dynamics.Joints = {});
(function() {
	function b() {
		b.b2AABB.apply(this, arguments)
	}

	function c() {
		c.b2Bound.apply(this, arguments)
	}

	function d() {
		d.b2BoundValues.apply(this, arguments);
		this.constructor === d && this.b2BoundValues.apply(this, arguments)
	}

	function e() {
		e.b2Collision.apply(this, arguments)
	}

	function f() {
		f.b2ContactID.apply(this, arguments);
		this.constructor === f && this.b2ContactID.apply(this, arguments)
	}

	function g() {
		g.b2ContactPoint.apply(this, arguments)
	}

	function m() {
		m.b2Distance.apply(this, arguments)
	}

	function l() {
		l.b2DistanceInput.apply(this, arguments)
	}

	function j() {
		j.b2DistanceOutput.apply(this, arguments)
	}

	function q() {
		q.b2DistanceProxy.apply(this, arguments)
	}

	function z() {
		z.b2DynamicTree.apply(this, arguments);
		this.constructor === z && this.b2DynamicTree.apply(this, arguments)
	}

	function y() {
		y.b2DynamicTreeBroadPhase.apply(this, arguments)
	}

	function A() {
		A.b2DynamicTreeNode.apply(this, arguments)
	}

	function B() {
		B.b2DynamicTreePair.apply(this, arguments)
	}

	function E() {
		E.b2Manifold.apply(this, arguments);
		this.constructor === E && this.b2Manifold.apply(this, arguments)
	}

	function F() {
		F.b2ManifoldPoint.apply(this, arguments);
		this.constructor === F && this.b2ManifoldPoint.apply(this, arguments)
	}

	function s() {
		s.b2Point.apply(this, arguments)
	}

	function I() {
		I.b2RayCastInput.apply(this, arguments);
		this.constructor === I && this.b2RayCastInput.apply(this, arguments)
	}

	function G() {
		G.b2RayCastOutput.apply(this, arguments)
	}

	function C() {
		C.b2Segment.apply(this, arguments)
	}

	function H() {
		H.b2SeparationFunction.apply(this, arguments)
	}

	function R() {
		R.b2Simplex.apply(this, arguments);
		this.constructor === R && this.b2Simplex.apply(this, arguments)
	}

	function K() {
		K.b2SimplexCache.apply(this, arguments)
	}

	function fa() {
		fa.b2SimplexVertex.apply(this, arguments)
	}

	function O() {
		O.b2TimeOfImpact.apply(this, arguments)
	}

	function P() {
		P.b2TOIInput.apply(this, arguments)
	}

	function ba() {
		ba.b2WorldManifold.apply(this, arguments);
		this.constructor === ba && this.b2WorldManifold.apply(this, arguments)
	}

	function V() {
		V.ClipVertex.apply(this, arguments)
	}

	function r() {
		r.Features.apply(this, arguments)
	}

	function t() {
		t.b2CircleShape.apply(this, arguments);
		this.constructor === t && this.b2CircleShape.apply(this, arguments)
	}

	function J() {
		J.b2EdgeChainDef.apply(this, arguments);
		this.constructor === J && this.b2EdgeChainDef.apply(this, arguments)
	}

	function D() {
		D.b2EdgeShape.apply(this, arguments);
		this.constructor === D && this.b2EdgeShape.apply(this, arguments)
	}

	function N() {
		N.b2MassData.apply(this, arguments)
	}

	function aa() {
		aa.b2PolygonShape.apply(this, arguments);
		this.constructor === aa && this.b2PolygonShape.apply(this, arguments)
	}

	function Q() {
		Q.b2Shape.apply(this, arguments);
		this.constructor === Q && this.b2Shape.apply(this, arguments)
	}

	function n() {
		n.b2Color.apply(this, arguments);
		this.constructor === n && this.b2Color.apply(this, arguments)
	}

	function u() {
		u.b2Settings.apply(this, arguments)
	}

	function L() {
		L.b2Mat22.apply(this, arguments);
		this.constructor === L && this.b2Mat22.apply(this, arguments)
	}

	function x() {
		x.b2Mat33.apply(this, arguments);
		this.constructor === x && this.b2Mat33.apply(this, arguments)
	}

	function M() {
		M.b2Math.apply(this, arguments)
	}

	function W() {
		W.b2Sweep.apply(this, arguments)
	}

	function S() {
		S.b2Transform.apply(this, arguments);
		this.constructor === S && this.b2Transform.apply(this, arguments)
	}

	function ha() {
		ha.b2Vec2.apply(this, arguments);
		this.constructor === ha && this.b2Vec2.apply(this, arguments)
	}

	function na() {
		na.b2Vec3.apply(this, arguments);
		this.constructor === na && this.b2Vec3.apply(this, arguments)
	}

	function Ka() {
		Ka.b2Body.apply(this, arguments);
		this.constructor === Ka && this.b2Body.apply(this, arguments)
	}

	function qa() {
		qa.b2BodyDef.apply(this, arguments);
		this.constructor === qa && this.b2BodyDef.apply(this, arguments)
	}

	function Ba() {
		Ba.b2ContactFilter.apply(this, arguments)
	}

	function Y() {
		Y.b2ContactImpulse.apply(this, arguments)
	}

	function Eb() {
		Eb.b2ContactListener.apply(this, arguments)
	}

	function xa() {
		xa.b2ContactManager.apply(this, arguments);
		this.constructor === xa && this.b2ContactManager.apply(this, arguments)
	}

	function bb() {
		bb.b2DebugDraw.apply(this, arguments);
		this.constructor === bb && this.b2DebugDraw.apply(this, arguments)
	}

	function db() {
		db.b2DestructionListener.apply(this, arguments)
	}

	function Ja() {
		Ja.b2FilterData.apply(this, arguments)
	}

	function La() {
		La.b2Fixture.apply(this, arguments);
		this.constructor === La && this.b2Fixture.apply(this, arguments)
	}

	function eb() {
		eb.b2FixtureDef.apply(this, arguments);
		this.constructor === eb && this.b2FixtureDef.apply(this, arguments)
	}

	function Ma() {
		Ma.b2Island.apply(this, arguments);
		this.constructor === Ma && this.b2Island.apply(this, arguments)
	}

	function ob() {
		ob.b2TimeStep.apply(this, arguments)
	}

	function pb() {
		pb.b2World.apply(this, arguments);
		this.constructor === pb && this.b2World.apply(this, arguments)
	}

	function da() {
		da.b2CircleContact.apply(this, arguments)
	}

	function p() {
		p.b2Contact.apply(this, arguments);
		this.constructor === p && this.b2Contact.apply(this, arguments)
	}

	function qb() {
		qb.b2ContactConstraint.apply(this, arguments);
		this.constructor === qb && this.b2ContactConstraint.apply(this, arguments)
	}

	function Fb() {
		Fb.b2ContactConstraintPoint.apply(this, arguments)
	}

	function Gb() {
		Gb.b2ContactEdge.apply(this, arguments)
	}

	function rb() {
		rb.b2ContactFactory.apply(this, arguments);
		this.constructor === rb && this.b2ContactFactory.apply(this, arguments)
	}

	function ya() {
		ya.b2ContactRegister.apply(this, arguments)
	}

	function fb() {
		fb.b2ContactResult.apply(this, arguments)
	}

	function ca() {
		ca.b2ContactSolver.apply(this, arguments);
		this.constructor === ca && this.b2ContactSolver.apply(this, arguments)
	}

	function ib() {
		ib.b2EdgeAndCircleContact.apply(this, arguments)
	}

	function oa() {
		oa.b2NullContact.apply(this, arguments);
		this.constructor === oa && this.b2NullContact.apply(this, arguments)
	}

	function ra() {
		ra.b2PolyAndCircleContact.apply(this, arguments)
	}

	function jb() {
		jb.b2PolyAndEdgeContact.apply(this, arguments)
	}

	function tb() {
		tb.b2PolygonContact.apply(this, arguments)
	}

	function ub() {
		ub.b2PositionSolverManifold.apply(this, arguments);
		this.constructor === ub && this.b2PositionSolverManifold.apply(this, arguments)
	}

	function Jb() {
		Jb.b2BuoyancyController.apply(this, arguments)
	}

	function vb() {
		vb.b2ConstantAccelController.apply(this, arguments)
	}

	function Ca() {
		Ca.b2ConstantForceController.apply(this, arguments)
	}

	function gb() {
		gb.b2Controller.apply(this, arguments)
	}

	function wb() {
		wb.b2ControllerEdge.apply(this, arguments)
	}

	function Ua() {
		Ua.b2GravityController.apply(this, arguments)
	}

	function Va() {
		Va.b2TensorDampingController.apply(this, arguments)
	}

	function Wa() {
		Wa.b2DistanceJoint.apply(this, arguments);
		this.constructor === Wa && this.b2DistanceJoint.apply(this, arguments)
	}

	function Pa() {
		Pa.b2DistanceJointDef.apply(this, arguments);
		this.constructor === Pa && this.b2DistanceJointDef.apply(this, arguments)
	}

	function Xa() {
		Xa.b2FrictionJoint.apply(this, arguments);
		this.constructor === Xa && this.b2FrictionJoint.apply(this, arguments)
	}

	function Za() {
		Za.b2FrictionJointDef.apply(this, arguments);
		this.constructor === Za && this.b2FrictionJointDef.apply(this, arguments)
	}

	function Ea() {
		Ea.b2GearJoint.apply(this, arguments);
		this.constructor === Ea && this.b2GearJoint.apply(this, arguments)
	}

	function ea() {
		ea.b2GearJointDef.apply(this, arguments);
		this.constructor === ea && this.b2GearJointDef.apply(this, arguments)
	}

	function X() {
		X.b2Jacobian.apply(this, arguments)
	}

	function Ra() {
		Ra.b2Joint.apply(this, arguments);
		this.constructor === Ra && this.b2Joint.apply(this, arguments)
	}

	function kb() {
		kb.b2JointDef.apply(this, arguments);
		this.constructor === kb && this.b2JointDef.apply(this, arguments)
	}

	function Oa() {
		Oa.b2JointEdge.apply(this, arguments)
	}

	function $a() {
		$a.b2LineJoint.apply(this, arguments);
		this.constructor === $a && this.b2LineJoint.apply(this, arguments)
	}

	function hb() {
		hb.b2LineJointDef.apply(this, arguments);
		this.constructor === hb && this.b2LineJointDef.apply(this, arguments)
	}

	function Qa() {
		Qa.b2MouseJoint.apply(this, arguments);
		this.constructor === Qa && this.b2MouseJoint.apply(this, arguments)
	}

	function wa() {
		wa.b2MouseJointDef.apply(this, arguments);
		this.constructor === wa && this.b2MouseJointDef.apply(this, arguments)
	}

	function Fa() {
		Fa.b2PrismaticJoint.apply(this, arguments);
		this.constructor === Fa && this.b2PrismaticJoint.apply(this, arguments)
	}

	function va() {
		va.b2PrismaticJointDef.apply(this, arguments);
		this.constructor === va && this.b2PrismaticJointDef.apply(this, arguments)
	}

	function Z() {
		Z.b2PulleyJoint.apply(this, arguments);
		this.constructor === Z && this.b2PulleyJoint.apply(this, arguments)
	}

	function ma() {
		ma.b2PulleyJointDef.apply(this, arguments);
		this.constructor === ma && this.b2PulleyJointDef.apply(this, arguments)
	}

	function la() {
		la.b2RevoluteJoint.apply(this, arguments);
		this.constructor === la && this.b2RevoluteJoint.apply(this, arguments)
	}

	function ja() {
		ja.b2RevoluteJointDef.apply(this, arguments);
		this.constructor === ja && this.b2RevoluteJointDef.apply(this, arguments)
	}

	function za() {
		za.b2WeldJoint.apply(this, arguments);
		this.constructor === za && this.b2WeldJoint.apply(this, arguments)
	}

	function Sa() {
		Sa.b2WeldJointDef.apply(this, arguments);
		this.constructor === Sa && this.b2WeldJointDef.apply(this, arguments)
	}
	Box2D.Collision.IBroadPhase = "Box2D.Collision.IBroadPhase";
	Box2D.Collision.b2AABB = b;
	Box2D.Collision.b2Bound = c;
	Box2D.Collision.b2BoundValues = d;
	Box2D.Collision.b2Collision = e;
	Box2D.Collision.b2ContactID = f;
	Box2D.Collision.b2ContactPoint = g;
	Box2D.Collision.b2Distance = m;
	Box2D.Collision.b2DistanceInput = l;
	Box2D.Collision.b2DistanceOutput = j;
	Box2D.Collision.b2DistanceProxy = q;
	Box2D.Collision.b2DynamicTree = z;
	Box2D.Collision.b2DynamicTreeBroadPhase = y;
	Box2D.Collision.b2DynamicTreeNode = A;
	Box2D.Collision.b2DynamicTreePair = B;
	Box2D.Collision.b2Manifold = E;
	Box2D.Collision.b2ManifoldPoint = F;
	Box2D.Collision.b2Point = s;
	Box2D.Collision.b2RayCastInput = I;
	Box2D.Collision.b2RayCastOutput = G;
	Box2D.Collision.b2Segment = C;
	Box2D.Collision.b2SeparationFunction = H;
	Box2D.Collision.b2Simplex = R;
	Box2D.Collision.b2SimplexCache = K;
	Box2D.Collision.b2SimplexVertex = fa;
	Box2D.Collision.b2TimeOfImpact = O;
	Box2D.Collision.b2TOIInput = P;
	Box2D.Collision.b2WorldManifold = ba;
	Box2D.Collision.ClipVertex = V;
	Box2D.Collision.Features = r;
	Box2D.Collision.Shapes.b2CircleShape = t;
	Box2D.Collision.Shapes.b2EdgeChainDef = J;
	Box2D.Collision.Shapes.b2EdgeShape = D;
	Box2D.Collision.Shapes.b2MassData = N;
	Box2D.Collision.Shapes.b2PolygonShape = aa;
	Box2D.Collision.Shapes.b2Shape = Q;
	Box2D.Common.b2internal = "Box2D.Common.b2internal";
	Box2D.Common.b2Color = n;
	Box2D.Common.b2Settings = u;
	Box2D.Common.Math.b2Mat22 = L;
	Box2D.Common.Math.b2Mat33 = x;
	Box2D.Common.Math.b2Math = M;
	Box2D.Common.Math.b2Sweep = W;
	Box2D.Common.Math.b2Transform = S;
	Box2D.Common.Math.b2Vec2 = ha;
	Box2D.Common.Math.b2Vec3 = na;
	Box2D.Dynamics.b2Body = Ka;
	Box2D.Dynamics.b2BodyDef = qa;
	Box2D.Dynamics.b2ContactFilter = Ba;
	Box2D.Dynamics.b2ContactImpulse = Y;
	Box2D.Dynamics.b2ContactListener = Eb;
	Box2D.Dynamics.b2ContactManager = xa;
	Box2D.Dynamics.b2DebugDraw = bb;
	Box2D.Dynamics.b2DestructionListener = db;
	Box2D.Dynamics.b2FilterData = Ja;
	Box2D.Dynamics.b2Fixture = La;
	Box2D.Dynamics.b2FixtureDef = eb;
	Box2D.Dynamics.b2Island = Ma;
	Box2D.Dynamics.b2TimeStep = ob;
	Box2D.Dynamics.b2World = pb;
	Box2D.Dynamics.Contacts.b2CircleContact = da;
	Box2D.Dynamics.Contacts.b2Contact = p;
	Box2D.Dynamics.Contacts.b2ContactConstraint = qb;
	Box2D.Dynamics.Contacts.b2ContactConstraintPoint = Fb;
	Box2D.Dynamics.Contacts.b2ContactEdge = Gb;
	Box2D.Dynamics.Contacts.b2ContactFactory = rb;
	Box2D.Dynamics.Contacts.b2ContactRegister = ya;
	Box2D.Dynamics.Contacts.b2ContactResult = fb;
	Box2D.Dynamics.Contacts.b2ContactSolver = ca;
	Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = ib;
	Box2D.Dynamics.Contacts.b2NullContact = oa;
	Box2D.Dynamics.Contacts.b2PolyAndCircleContact = ra;
	Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = jb;
	Box2D.Dynamics.Contacts.b2PolygonContact = tb;
	Box2D.Dynamics.Contacts.b2PositionSolverManifold = ub;
	Box2D.Dynamics.Controllers.b2BuoyancyController = Jb;
	Box2D.Dynamics.Controllers.b2ConstantAccelController = vb;
	Box2D.Dynamics.Controllers.b2ConstantForceController = Ca;
	Box2D.Dynamics.Controllers.b2Controller = gb;
	Box2D.Dynamics.Controllers.b2ControllerEdge = wb;
	Box2D.Dynamics.Controllers.b2GravityController = Ua;
	Box2D.Dynamics.Controllers.b2TensorDampingController = Va;
	Box2D.Dynamics.Joints.b2DistanceJoint = Wa;
	Box2D.Dynamics.Joints.b2DistanceJointDef = Pa;
	Box2D.Dynamics.Joints.b2FrictionJoint = Xa;
	Box2D.Dynamics.Joints.b2FrictionJointDef = Za;
	Box2D.Dynamics.Joints.b2GearJoint = Ea;
	Box2D.Dynamics.Joints.b2GearJointDef = ea;
	Box2D.Dynamics.Joints.b2Jacobian = X;
	Box2D.Dynamics.Joints.b2Joint = Ra;
	Box2D.Dynamics.Joints.b2JointDef = kb;
	Box2D.Dynamics.Joints.b2JointEdge = Oa;
	Box2D.Dynamics.Joints.b2LineJoint = $a;
	Box2D.Dynamics.Joints.b2LineJointDef = hb;
	Box2D.Dynamics.Joints.b2MouseJoint = Qa;
	Box2D.Dynamics.Joints.b2MouseJointDef = wa;
	Box2D.Dynamics.Joints.b2PrismaticJoint = Fa;
	Box2D.Dynamics.Joints.b2PrismaticJointDef = va;
	Box2D.Dynamics.Joints.b2PulleyJoint = Z;
	Box2D.Dynamics.Joints.b2PulleyJointDef = ma;
	Box2D.Dynamics.Joints.b2RevoluteJoint = la;
	Box2D.Dynamics.Joints.b2RevoluteJointDef = ja;
	Box2D.Dynamics.Joints.b2WeldJoint = za;
	Box2D.Dynamics.Joints.b2WeldJointDef = Sa
})();
Box2D.postDefs = [];
(function() {
	var b = Box2D.Collision.Shapes.b2CircleShape,
		c = Box2D.Collision.Shapes.b2PolygonShape,
		d = Box2D.Collision.Shapes.b2Shape,
		e = Box2D.Common.b2Settings,
		f = Box2D.Common.Math.b2Math,
		g = Box2D.Common.Math.b2Sweep,
		m = Box2D.Common.Math.b2Transform,
		l = Box2D.Common.Math.b2Vec2,
		j = Box2D.Collision.b2AABB,
		q = Box2D.Collision.b2Bound,
		z = Box2D.Collision.b2BoundValues,
		y = Box2D.Collision.b2Collision,
		A = Box2D.Collision.b2ContactID,
		B = Box2D.Collision.b2ContactPoint,
		E = Box2D.Collision.b2Distance,
		F = Box2D.Collision.b2DistanceInput,
		s = Box2D.Collision.b2DistanceOutput,
		I = Box2D.Collision.b2DistanceProxy,
		G = Box2D.Collision.b2DynamicTree,
		C = Box2D.Collision.b2DynamicTreeBroadPhase,
		H = Box2D.Collision.b2DynamicTreeNode,
		R = Box2D.Collision.b2DynamicTreePair,
		K = Box2D.Collision.b2Manifold,
		fa = Box2D.Collision.b2ManifoldPoint,
		O = Box2D.Collision.b2Point,
		P = Box2D.Collision.b2RayCastInput,
		ba = Box2D.Collision.b2RayCastOutput,
		V = Box2D.Collision.b2Segment,
		r = Box2D.Collision.b2SeparationFunction,
		t = Box2D.Collision.b2Simplex,
		J = Box2D.Collision.b2SimplexCache,
		D = Box2D.Collision.b2SimplexVertex,
		N = Box2D.Collision.b2TimeOfImpact,
		aa = Box2D.Collision.b2TOIInput,
		Q = Box2D.Collision.b2WorldManifold,
		n = Box2D.Collision.ClipVertex,
		u = Box2D.Collision.Features,
		L = Box2D.Collision.IBroadPhase;
	j.b2AABB = function() {
		this.lowerBound = new l;
		this.upperBound = new l
	};
	j.prototype.IsValid = function() {
		var b = this.upperBound.y - this.lowerBound.y;
		return 0 <= this.upperBound.x - this.lowerBound.x && 0 <= b && this.lowerBound.IsValid() && this.upperBound.IsValid()
	};
	j.prototype.GetCenter = function() {
		return new l((this.lowerBound.x +
			this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
	};
	j.prototype.GetExtents = function() {
		return new l((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
	};
	j.prototype.Contains = function(b) {
		return this.lowerBound.x <= b.lowerBound.x && this.lowerBound.y <= b.lowerBound.y && b.upperBound.x <= this.upperBound.x && b.upperBound.y <= this.upperBound.y
	};
	j.prototype.RayCast = function(b, c) {
		var d = -Number.MAX_VALUE,
			e = Number.MAX_VALUE,
			n = c.p1.x,
			f = c.p1.y,
			j = c.p2.x - c.p1.x,
			l = c.p2.y - c.p1.y,
			g = Math.abs(l),
			r = b.normal,
			u = 0,
			t = 0,
			D = 0;
		if (Math.abs(j) < Number.MIN_VALUE) {
			if (n < this.lowerBound.x || this.upperBound.x < n) return !1
		} else if (u = 1 / j, t = (this.lowerBound.x - n) * u, u *= this.upperBound.x - n, D = -1, t > u && (D = t, t = u, u = D, D = 1), t > d && (r.x = D, r.y = 0, d = t), e = Math.min(e, u), d > e) return !1;
		if (g < Number.MIN_VALUE) {
			if (f < this.lowerBound.y || this.upperBound.y < f) return !1
		} else if (u = 1 / l, t = (this.lowerBound.y - f) * u, u *= this.upperBound.y - f, D = -1, t > u && (D = t, t = u, u = D, D = 1), t > d && (r.y = D, r.x = 0, d = t), e = Math.min(e, u), d > e) return !1;
		b.fraction = d;
		return !0
	};
	j.prototype.TestOverlap = function(b) {
		var c = b.lowerBound.y - this.upperBound.y,
			d = this.lowerBound.y - b.upperBound.y;
		return 0 < b.lowerBound.x - this.upperBound.x || 0 < c || 0 < this.lowerBound.x - b.upperBound.x || 0 < d ? !1 : !0
	};
	j.Combine = function(b, c) {
		var d = new j;
		d.Combine(b, c);
		return d
	};
	j.prototype.Combine = function(b, c) {
		this.lowerBound.x = Math.min(b.lowerBound.x, c.lowerBound.x);
		this.lowerBound.y = Math.min(b.lowerBound.y, c.lowerBound.y);
		this.upperBound.x = Math.max(b.upperBound.x, c.upperBound.x);
		this.upperBound.y = Math.max(b.upperBound.y, c.upperBound.y)
	};
	q.b2Bound = function() {};
	q.prototype.IsLower = function() {
		return 0 == (this.value & 1)
	};
	q.prototype.IsUpper = function() {
		return 1 == (this.value & 1)
	};
	q.prototype.Swap = function(b) {
		var c = this.value,
			d = this.proxy,
			e = this.stabbingCount;
		this.value = b.value;
		this.proxy = b.proxy;
		this.stabbingCount = b.stabbingCount;
		b.value = c;
		b.proxy = d;
		b.stabbingCount = e
	};
	z.b2BoundValues = function() {};
	z.prototype.b2BoundValues = function() {
		this.lowerValues = new Vector_a2j_Number;
		this.lowerValues[0] = 0;
		this.lowerValues[1] = 0;
		this.upperValues = new Vector_a2j_Number;
		this.upperValues[0] = 0;
		this.upperValues[1] = 0
	};
	y.b2Collision = function() {};
	y.ClipSegmentToLine = function(b, c, d, e) {
		void 0 === e && (e = 0);
		var n, f = 0;
		n = c[0];
		var j = n.v;
		n = c[1];
		var l = n.v,
			g = d.x * j.x + d.y * j.y - e;
		n = d.x * l.x + d.y * l.y - e;
		0 >= g && b[f++].Set(c[0]);
		0 >= n && b[f++].Set(c[1]);
		0 > g * n && (d = g / (g - n), n = b[f], n = n.v, n.x = j.x + d * (l.x - j.x), n.y = j.y + d * (l.y - j.y), n = b[f], n.id = (0 < g ? c[0] : c[1]).id, ++f);
		return f
	};
	y.EdgeSeparation = function(b, c, d, e, n) {
		void 0 === d && (d = 0);
		parseInt(b.m_vertexCount);
		var f = b.m_vertices;
		b = b.m_normals;
		var j = parseInt(e.m_vertexCount),
			l = e.m_vertices,
			g, r;
		g = c.R;
		r = b[d];
		b = g.col1.x * r.x + g.col2.x * r.y;
		e = g.col1.y * r.x + g.col2.y * r.y;
		g = n.R;
		var u = g.col1.x * b + g.col1.y * e;
		g = g.col2.x * b + g.col2.y * e;
		for (var t = 0, D = Number.MAX_VALUE, L = 0; L < j; ++L) r = l[L], r = r.x * u + r.y * g, r < D && (D = r, t = L);
		r = f[d];
		g = c.R;
		d = c.position.x + (g.col1.x * r.x + g.col2.x * r.y);
		c = c.position.y + (g.col1.y * r.x + g.col2.y * r.y);
		r = l[t];
		g = n.R;
		f = n.position.x + (g.col1.x * r.x + g.col2.x * r.y);
		n = n.position.y + (g.col1.y * r.x + g.col2.y * r.y);
		return (f - d) * b + (n - c) * e
	};
	y.FindMaxSeparation = function(b, c, d, e, n) {
		var f = parseInt(c.m_vertexCount),
			j = c.m_normals,
			g, l;
		l = n.R;
		g = e.m_centroid;
		var r = n.position.x + (l.col1.x * g.x + l.col2.x * g.y),
			u = n.position.y + (l.col1.y * g.x + l.col2.y * g.y);
		l = d.R;
		g = c.m_centroid;
		r -= d.position.x + (l.col1.x * g.x + l.col2.x * g.y);
		u -= d.position.y + (l.col1.y * g.x + l.col2.y * g.y);
		l = r * d.R.col1.x + u * d.R.col1.y;
		for (var u = r * d.R.col2.x + u * d.R.col2.y, r = 0, t = -Number.MAX_VALUE, D = 0; D < f; ++D) g = j[D], g = g.x * l + g.y * u, g > t && (t = g, r = D);
		j = y.EdgeSeparation(c, d, r, e, n);
		g = parseInt(0 <= r - 1 ? r - 1 : f - 1);
		l = y.EdgeSeparation(c, d, g, e, n);
		var u = parseInt(r + 1 < f ? r + 1 : 0),
			t = y.EdgeSeparation(c, d, u, e, n),
			L = 0,
			m = 0;
		if (l > j && l > t) m = -1, D = g, L = l;
		else if (t > j) m = 1, D = u, L = t;
		else return b[0] = r, j;
		for (;;)
			if (r = -1 == m ? 0 <= D - 1 ? D - 1 : f - 1 : D + 1 < f ? D + 1 : 0, j = y.EdgeSeparation(c, d, r, e, n), j > L) D = r, L = j;
			else break;
		b[0] = D;
		return L
	};
	y.FindIncidentEdge = function(b, c, d, e, n, f) {
		void 0 === e && (e = 0);
		parseInt(c.m_vertexCount);
		var j = c.m_normals,
			g = parseInt(n.m_vertexCount);
		c = n.m_vertices;
		n = n.m_normals;
		var l;
		l = d.R;
		d = j[e];
		var j = l.col1.x * d.x + l.col2.x * d.y,
			r = l.col1.y * d.x + l.col2.y * d.y;
		l = f.R;
		d = l.col1.x * j + l.col1.y * r;
		r = l.col2.x * j + l.col2.y * r;
		j = d;
		l = 0;
		for (var u = Number.MAX_VALUE, t = 0; t < g; ++t) d = n[t], d = j * d.x + r * d.y, d < u && (u = d, l = t);
		n = parseInt(l);
		j = parseInt(n + 1 < g ? n + 1 : 0);
		g = b[0];
		d = c[n];
		l = f.R;
		g.v.x = f.position.x + (l.col1.x * d.x + l.col2.x * d.y);
		g.v.y = f.position.y + (l.col1.y * d.x + l.col2.y * d.y);
		g.id.features.referenceEdge = e;
		g.id.features.incidentEdge = n;
		g.id.features.incidentVertex = 0;
		g = b[1];
		d = c[j];
		l = f.R;
		g.v.x = f.position.x + (l.col1.x * d.x + l.col2.x * d.y);
		g.v.y = f.position.y + (l.col1.y * d.x + l.col2.y * d.y);
		g.id.features.referenceEdge = e;
		g.id.features.incidentEdge = j;
		g.id.features.incidentVertex = 1
	};
	y.MakeClipPointVector = function() {
		var b = new Vector(2);
		b[0] = new n;
		b[1] = new n;
		return b
	};
	y.CollidePolygons = function(b, c, d, n, f) {
		var j;
		b.m_pointCount = 0;
		var g = c.m_radius + n.m_radius;
		y.s_edgeAO[0] = 0;
		var l = y.FindMaxSeparation(y.s_edgeAO, c, d, n, f);
		j = y.s_edgeAO[0];
		if (!(l > g)) {
			var r;
			y.s_edgeBO[0] = 0;
			var u = y.FindMaxSeparation(y.s_edgeBO, n, f, c, d);
			r = y.s_edgeBO[0];
			if (!(u > g)) {
				var t = 0,
					D = 0;
				u > 0.98 * l + 0.001 ? (l = n, n = c, c = f, t = r, b.m_type = K.e_faceB, D = 1) : (l = c, c = d, d = f, t = j, b.m_type = K.e_faceA, D = 0);
				j = y.s_incidentEdge;
				y.FindIncidentEdge(j, l, c, t, n, d);
				r = parseInt(l.m_vertexCount);
				f = l.m_vertices;
				var l = f[t],
					L;
				L = t + 1 < r ? f[parseInt(t + 1)] : f[0];
				t = y.s_localTangent;
				t.Set(L.x - l.x, L.y - l.y);
				t.Normalize();
				f = y.s_localNormal;
				f.x = t.y;
				f.y = -t.x;
				n = y.s_planePoint;
				n.Set(0.5 * (l.x + L.x), 0.5 * (l.y + L.y));
				u = y.s_tangent;
				r = c.R;
				u.x = r.col1.x * t.x + r.col2.x * t.y;
				u.y = r.col1.y * t.x + r.col2.y * t.y;
				var m = y.s_tangent2;
				m.x = -u.x;
				m.y = -u.y;
				t = y.s_normal;
				t.x = u.y;
				t.y = -u.x;
				var s = y.s_v11,
					J = y.s_v12;
				s.x = c.position.x + (r.col1.x * l.x + r.col2.x * l.y);
				s.y = c.position.y + (r.col1.y * l.x + r.col2.y * l.y);
				J.x = c.position.x + (r.col1.x * L.x + r.col2.x * L.y);
				J.y = c.position.y + (r.col1.y * L.x + r.col2.y * L.y);
				c = t.x * s.x + t.y * s.y;
				r = u.x * J.x + u.y * J.y + g;
				L = y.s_clipPoints1;
				l = y.s_clipPoints2;
				J = y.ClipSegmentToLine(L, j, m, -u.x * s.x - u.y * s.y + g);
				if (!(2 > J) && (J = y.ClipSegmentToLine(l, L, u, r), !(2 > J))) {
					b.m_localPlaneNormal.SetV(f);
					b.m_localPoint.SetV(n);
					for (n = f = 0; n < e.b2_maxManifoldPoints; ++n) j = l[n], t.x * j.v.x + t.y * j.v.y - c <= g && (u = b.m_points[f], r = d.R, m = j.v.x - d.position.x, s = j.v.y -
						d.position.y, u.m_localPoint.x = m * r.col1.x + s * r.col1.y, u.m_localPoint.y = m * r.col2.x + s * r.col2.y, u.m_id.Set(j.id), u.m_id.features.flip = D, ++f);
					b.m_pointCount = f
				}
			}
		}
	};
	y.CollideCircles = function(b, c, d, e, n) {
		b.m_pointCount = 0;
		var f, j;
		f = d.R;
		j = c.m_p;
		var l = d.position.x + (f.col1.x * j.x + f.col2.x * j.y);
		d = d.position.y + (f.col1.y * j.x + f.col2.y * j.y);
		f = n.R;
		j = e.m_p;
		l = n.position.x + (f.col1.x * j.x + f.col2.x * j.y) - l;
		n = n.position.y + (f.col1.y * j.x + f.col2.y * j.y) - d;
		f = c.m_radius + e.m_radius;
		l * l + n * n > f * f || (b.m_type = K.e_circles, b.m_localPoint.SetV(c.m_p), b.m_localPlaneNormal.SetZero(), b.m_pointCount = 1, b.m_points[0].m_localPoint.SetV(e.m_p), b.m_points[0].m_id.key = 0)
	};
	y.CollidePolygonAndCircle = function(b, c, d, e, n) {
		var f = b.m_pointCount = 0,
			j = 0,
			l, g;
		g = n.R;
		l = e.m_p;
		var r = n.position.y + (g.col1.y * l.x + g.col2.y * l.y),
			f = n.position.x + (g.col1.x * l.x + g.col2.x * l.y) - d.position.x,
			j = r - d.position.y;
		g = d.R;
		d = f * g.col1.x + j * g.col1.y;
		g = f * g.col2.x + j * g.col2.y;
		var u = 0,
			r = -Number.MAX_VALUE;
		n = c.m_radius + e.m_radius;
		var t = parseInt(c.m_vertexCount),
			D = c.m_vertices;
		c = c.m_normals;
		for (var L = 0; L < t; ++L) {
			l = D[L];
			f = d - l.x;
			j = g - l.y;
			l = c[L];
			f = l.x * f + l.y * j;
			if (f > n) return;
			f > r && (r = f, u = L)
		}
		f = parseInt(u);
		j = parseInt(f + 1 < t ? f + 1 : 0);
		l = D[f];
		D = D[j];
		if (r < Number.MIN_VALUE) b.m_pointCount = 1, b.m_type = K.e_faceA, b.m_localPlaneNormal.SetV(c[u]), b.m_localPoint.x = 0.5 * (l.x + D.x), b.m_localPoint.y = 0.5 * (l.y + D.y);
		else if (r = (d - D.x) * (l.x - D.x) + (g - D.y) * (l.y - D.y), 0 >= (d - l.x) * (D.x - l.x) + (g - l.y) * (D.y - l.y)) {
			if ((d - l.x) * (d - l.x) + (g - l.y) * (g - l.y) > n * n) return;
			b.m_pointCount = 1;
			b.m_type = K.e_faceA;
			b.m_localPlaneNormal.x = d - l.x;
			b.m_localPlaneNormal.y = g - l.y;
			b.m_localPlaneNormal.Normalize();
			b.m_localPoint.SetV(l)
		} else if (0 >= r) {
			if ((d - D.x) * (d - D.x) + (g - D.y) * (g - D.y) > n * n) return;
			b.m_pointCount = 1;
			b.m_type = K.e_faceA;
			b.m_localPlaneNormal.x = d - D.x;
			b.m_localPlaneNormal.y = g - D.y;
			b.m_localPlaneNormal.Normalize();
			b.m_localPoint.SetV(D)
		} else {
			u = 0.5 * (l.x + D.x);
			l = 0.5 * (l.y + D.y);
			r = (d - u) * c[f].x + (g - l) * c[f].y;
			if (r > n) return;
			b.m_pointCount = 1;
			b.m_type = K.e_faceA;
			b.m_localPlaneNormal.x = c[f].x;
			b.m_localPlaneNormal.y = c[f].y;
			b.m_localPlaneNormal.Normalize();
			b.m_localPoint.Set(u, l)
		}
		b.m_points[0].m_localPoint.SetV(e.m_p);
		b.m_points[0].m_id.key = 0
	};
	y.TestOverlap = function(b, c) {
		var d = c.lowerBound,
			e = b.upperBound,
			n = d.x - e.x,
			f = d.y - e.y,
			d = b.lowerBound,
			e = c.upperBound,
			j = d.y - e.y;
		return 0 < n || 0 < f || 0 < d.x - e.x || 0 < j ? !1 : !0
	};
	Box2D.postDefs.push(function() {
		Box2D.Collision.b2Collision.s_incidentEdge = y.MakeClipPointVector();
		Box2D.Collision.b2Collision.s_clipPoints1 = y.MakeClipPointVector();
		Box2D.Collision.b2Collision.s_clipPoints2 = y.MakeClipPointVector();
		Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
		Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1);
		Box2D.Collision.b2Collision.s_localTangent = new l;
		Box2D.Collision.b2Collision.s_localNormal = new l;
		Box2D.Collision.b2Collision.s_planePoint = new l;
		Box2D.Collision.b2Collision.s_normal = new l;
		Box2D.Collision.b2Collision.s_tangent = new l;
		Box2D.Collision.b2Collision.s_tangent2 = new l;
		Box2D.Collision.b2Collision.s_v11 = new l;
		Box2D.Collision.b2Collision.s_v12 = new l;
		Box2D.Collision.b2Collision.b2CollidePolyTempVec = new l;
		Box2D.Collision.b2Collision.b2_nullFeature = 255
	});
	A.b2ContactID = function() {
		this.features = new u
	};
	A.prototype.b2ContactID = function() {
		this.features._m_id = this
	};
	A.prototype.Set = function(b) {
		this.key = b._key
	};
	A.prototype.Copy = function() {
		var b = new A;
		b.key = this.key;
		return b
	};
	Object.defineProperty(A.prototype, "key", {
		enumerable: !1,
		configurable: !0,
		get: function() {
			return this._key
		}
	});
	Object.defineProperty(A.prototype, "key", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._key = b;
			this.features._referenceEdge = this._key & 255;
			this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
			this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
			this.features._flip = (this._key & 4278190080) >> 24 & 255
		}
	});
	B.b2ContactPoint = function() {
		this.position = new l;
		this.velocity = new l;
		this.normal = new l;
		this.id = new A
	};
	E.b2Distance = function() {};
	E.Distance = function(b, c, d) {
		++E.b2_gjkCalls;
		var n = d.proxyA,
			j = d.proxyB,
			g = d.transformA,
			r = d.transformB,
			u = E.s_simplex;
		u.ReadCache(c, n, g, j, r);
		var t = u.m_vertices,
			D = E.s_saveA,
			L = E.s_saveB,
			m = 0;
		u.GetClosestPoint().LengthSquared();
		for (var s = 0, J, Q = 0; 20 > Q;) {
			m = u.m_count;
			for (s = 0; s < m; s++) D[s] = t[s].indexA, L[s] = t[s].indexB;
			switch (u.m_count) {
				case 1:
					break;
				case 2:
					u.Solve2();
					break;
				case 3:
					u.Solve3();
					break;
				default:
					e.b2Assert(!1)
			}
			if (3 == u.m_count) break;
			J = u.GetClosestPoint();
			J.LengthSquared();
			s = u.GetSearchDirection();
			if (s.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
			J = t[u.m_count];
			J.indexA = n.GetSupport(f.MulTMV(g.R, s.GetNegative()));
			J.wA = f.MulX(g, n.GetVertex(J.indexA));
			J.indexB = j.GetSupport(f.MulTMV(r.R, s));
			J.wB = f.MulX(r, j.GetVertex(J.indexB));
			J.w = f.SubtractVV(J.wB, J.wA);
			++Q;
			++E.b2_gjkIters;
			for (var N = !1, s = 0; s < m; s++)
				if (J.indexA == D[s] && J.indexB == L[s]) {
					N = !0;
					break
				}
			if (N) break;
			++u.m_count
		}
		E.b2_gjkMaxIters = f.Max(E.b2_gjkMaxIters, Q);
		u.GetWitnessPoints(b.pointA, b.pointB);
		b.distance = f.SubtractVV(b.pointA, b.pointB).Length();
		b.iterations = Q;
		u.WriteCache(c);
		d.useRadii && (c = n.m_radius, j = j.m_radius, b.distance > c + j && b.distance > Number.MIN_VALUE ? (b.distance -= c + j, d = f.SubtractVV(b.pointB, b.pointA), d.Normalize(), b.pointA.x += c * d.x, b.pointA.y += c * d.y, b.pointB.x -= j * d.x, b.pointB.y -= j * d.y) : (J = new l, J.x = 0.5 * (b.pointA.x + b.pointB.x), J.y = 0.5 * (b.pointA.y + b.pointB.y), b.pointA.x = b.pointB.x = J.x, b.pointA.y = b.pointB.y = J.y, b.distance = 0))
	};
	Box2D.postDefs.push(function() {
		Box2D.Collision.b2Distance.s_simplex = new t;
		Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
		Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3)
	});
	F.b2DistanceInput = function() {};
	s.b2DistanceOutput = function() {
		this.pointA = new l;
		this.pointB = new l
	};
	I.b2DistanceProxy = function() {};
	I.prototype.Set = function(n) {
		switch (n.GetType()) {
			case d.e_circleShape:
				n = n instanceof b ? n : null;
				this.m_vertices = new Vector(1, !0);
				this.m_vertices[0] = n.m_p;
				this.m_count = 1;
				this.m_radius = n.m_radius;
				break;
			case d.e_polygonShape:
				n = n instanceof c ? n : null;
				this.m_vertices = n.m_vertices;
				this.m_count = n.m_vertexCount;
				this.m_radius = n.m_radius;
				break;
			default:
				e.b2Assert(!1)
		}
	};
	I.prototype.GetSupport = function(b) {
		for (var c = 0, d = this.m_vertices[0].x * b.x + this.m_vertices[0].y * b.y, e = 1; e < this.m_count; ++e) {
			var n = this.m_vertices[e].x * b.x + this.m_vertices[e].y * b.y;
			n > d && (c = e, d = n)
		}
		return c
	};
	I.prototype.GetSupportVertex = function(b) {
		for (var c = 0, d = this.m_vertices[0].x * b.x + this.m_vertices[0].y * b.y, e = 1; e < this.m_count; ++e) {
			var n = this.m_vertices[e].x * b.x + this.m_vertices[e].y * b.y;
			n > d && (c = e, d = n)
		}
		return this.m_vertices[c]
	};
	I.prototype.GetVertexCount = function() {
		return this.m_count
	};
	I.prototype.GetVertex = function(b) {
		void 0 === b && (b = 0);
		e.b2Assert(0 <= b && b < this.m_count);
		return this.m_vertices[b]
	};
	G.b2DynamicTree = function() {};
	G.prototype.b2DynamicTree = function() {
		this.m_freeList = this.m_root = null;
		this.m_insertionCount = this.m_path = 0
	};
	G.prototype.CreateProxy = function(b, c) {
		var d = this.AllocateNode(),
			n = e.b2_aabbExtension,
			f = e.b2_aabbExtension;
		d.aabb.lowerBound.x = b.lowerBound.x - n;
		d.aabb.lowerBound.y = b.lowerBound.y - f;
		d.aabb.upperBound.x = b.upperBound.x + n;
		d.aabb.upperBound.y = b.upperBound.y + f;
		d.userData = c;
		this.InsertLeaf(d);
		return d
	};
	G.prototype.DestroyProxy = function(b) {
		this.RemoveLeaf(b);
		this.FreeNode(b)
	};
	G.prototype.MoveProxy = function(b, c, d) {
		e.b2Assert(b.IsLeaf());
		if (b.aabb.Contains(c)) return !1;
		this.RemoveLeaf(b);
		var n = e.b2_aabbExtension + e.b2_aabbMultiplier * (0 < d.x ? d.x : -d.x);
		d = e.b2_aabbExtension + e.b2_aabbMultiplier * (0 < d.y ? d.y : -d.y);
		b.aabb.lowerBound.x = c.lowerBound.x - n;
		b.aabb.lowerBound.y = c.lowerBound.y - d;
		b.aabb.upperBound.x = c.upperBound.x + n;
		b.aabb.upperBound.y = c.upperBound.y + d;
		this.InsertLeaf(b);
		return !0
	};
	G.prototype.Rebalance = function(b) {
		void 0 === b && (b = 0);
		if (null != this.m_root)
			for (var c = 0; c < b; c++) {
				for (var d = this.m_root, e = 0; !1 == d.IsLeaf();) d = this.m_path >> e & 1 ? d.child2 : d.child1, e = e + 1 & 31;
				++this.m_path;
				this.RemoveLeaf(d);
				this.InsertLeaf(d)
			}
	};
	G.prototype.GetFatAABB = function(b) {
		return b.aabb
	};
	G.prototype.GetUserData = function(b) {
		return b.userData
	};
	G.prototype.Query = function(b, c) {
		if (null != this.m_root) {
			var d = new Vector,
				e = 0;
			for (d[e++] = this.m_root; 0 < e;) {
				var n = d[--e];
				if (n.aabb.TestOverlap(c))
					if (n.IsLeaf()) {
						if (!b(n)) break
					} else d[e++] = n.child1, d[e++] = n.child2
			}
		}
	};
	G.prototype.RayCast = function(b, c) {
		if (null != this.m_root) {
			var d = c.p1,
				e = c.p2,
				n = f.SubtractVV(d, e);
			n.Normalize();
			var n = f.CrossFV(1, n),
				l = f.AbsV(n),
				g = c.maxFraction,
				r = new j,
				u = 0,
				t = 0,
				u = d.x + g * (e.x - d.x),
				t = d.y + g * (e.y - d.y);
			r.lowerBound.x = Math.min(d.x, u);
			r.lowerBound.y = Math.min(d.y, t);
			r.upperBound.x = Math.max(d.x, u);
			r.upperBound.y = Math.max(d.y, t);
			var D = new Vector,
				L = 0;
			for (D[L++] = this.m_root; 0 < L;)
				if (g = D[--L], !1 != g.aabb.TestOverlap(r) && (u = g.aabb.GetCenter(), t = g.aabb.GetExtents(), !(0 < Math.abs(n.x * (d.x - u.x) + n.y * (d.y - u.y)) - l.x * t.x - l.y * t.y)))
					if (g.IsLeaf()) {
						u = new P;
						u.p1 = c.p1;
						u.p2 = c.p2;
						u.maxFraction = c.maxFraction;
						g = b(u, g);
						if (0 == g) break;
						0 < g && (u = d.x + g * (e.x - d.x), t = d.y + g * (e.y - d.y), r.lowerBound.x = Math.min(d.x, u), r.lowerBound.y = Math.min(d.y, t), r.upperBound.x = Math.max(d.x, u), r.upperBound.y = Math.max(d.y, t))
					} else D[L++] = g.child1, D[L++] = g.child2
		}
	};
	G.prototype.AllocateNode = function() {
		if (this.m_freeList) {
			var b = this.m_freeList;
			this.m_freeList = b.parent;
			b.parent = null;
			b.child1 = null;
			b.child2 = null;
			return b
		}
		return new H
	};
	G.prototype.FreeNode = function(b) {
		b.parent = this.m_freeList;
		this.m_freeList = b
	};
	G.prototype.InsertLeaf = function(b) {
		++this.m_insertionCount;
		if (null == this.m_root) this.m_root = b, this.m_root.parent = null;
		else {
			var c = b.aabb.GetCenter(),
				d = this.m_root;
			if (!1 == d.IsLeaf()) {
				do var e = d.child1,
					d = d.child2,
					d = Math.abs((e.aabb.lowerBound.x + e.aabb.upperBound.x) / 2 - c.x) + Math.abs((e.aabb.lowerBound.y + e.aabb.upperBound.y) / 2 - c.y) < Math.abs((d.aabb.lowerBound.x + d.aabb.upperBound.x) / 2 - c.x) + Math.abs((d.aabb.lowerBound.y + d.aabb.upperBound.y) / 2 - c.y) ? e : d; while (!1 == d.IsLeaf())
			}
			c = d.parent;
			e = this.AllocateNode();
			e.parent = c;
			e.userData = null;
			e.aabb.Combine(b.aabb, d.aabb);
			if (c) {
				d.parent.child1 == d ? c.child1 = e : c.child2 = e;
				e.child1 = d;
				e.child2 = b;
				d.parent = e;
				b.parent = e;
				do {
					if (c.aabb.Contains(e.aabb)) break;
					c.aabb.Combine(c.child1.aabb, c.child2.aabb);
					e = c;
					c = c.parent
				} while (c)
			} else e.child1 = d, e.child2 = b, d.parent = e, this.m_root = b.parent = e
		}
	};
	G.prototype.RemoveLeaf = function(b) {
		if (b == this.m_root) this.m_root = null;
		else {
			var c = b.parent,
				d = c.parent;
			b = c.child1 == b ? c.child2 : c.child1;
			if (d) {
				d.child1 == c ? d.child1 = b : d.child2 = b;
				b.parent = d;
				for (this.FreeNode(c); d;) {
					c = d.aabb;
					d.aabb = j.Combine(d.child1.aabb, d.child2.aabb);
					if (c.Contains(d.aabb)) break;
					d = d.parent
				}
			} else this.m_root = b, b.parent = null, this.FreeNode(c)
		}
	};
	C.b2DynamicTreeBroadPhase = function() {
		this.m_tree = new G;
		this.m_moveBuffer = new Vector;
		this.m_pairBuffer = new Vector;
		this.m_pairCount = 0
	};
	C.prototype.CreateProxy = function(b, c) {
		var d = this.m_tree.CreateProxy(b, c);
		++this.m_proxyCount;
		this.BufferMove(d);
		return d
	};
	C.prototype.DestroyProxy = function(b) {
		this.UnBufferMove(b);
		--this.m_proxyCount;
		this.m_tree.DestroyProxy(b)
	};
	C.prototype.MoveProxy = function(b, c, d) {
		this.m_tree.MoveProxy(b, c, d) && this.BufferMove(b)
	};
	C.prototype.TestOverlap = function(b, c) {
		var d = this.m_tree.GetFatAABB(b),
			e = this.m_tree.GetFatAABB(c);
		return d.TestOverlap(e)
	};
	C.prototype.GetUserData = function(b) {
		return this.m_tree.GetUserData(b)
	};
	C.prototype.GetFatAABB = function(b) {
		return this.m_tree.GetFatAABB(b)
	};
	C.prototype.GetProxyCount = function() {
		return this.m_proxyCount
	};
	C.prototype.UpdatePairs = function(b) {
		for (var c = this, d = c.m_pairCount = 0, e, d = 0; d < c.m_moveBuffer.length; ++d) {
			e = c.m_moveBuffer[d];
			var n = c.m_tree.GetFatAABB(e);
			c.m_tree.Query(function(b) {
				if (b == e) return !0;
				c.m_pairCount == c.m_pairBuffer.length && (c.m_pairBuffer[c.m_pairCount] = new R);
				var d = c.m_pairBuffer[c.m_pairCount];
				d.proxyA = b < e ? b : e;
				d.proxyB = b >= e ? b : e;
				++c.m_pairCount;
				return !0
			}, n)
		}
		for (d = c.m_moveBuffer.length = 0; d < c.m_pairCount;) {
			var n = c.m_pairBuffer[d],
				f = c.m_tree.GetUserData(n.proxyA),
				j = c.m_tree.GetUserData(n.proxyB);
			b(f, j);
			for (++d; d < c.m_pairCount;) {
				f = c.m_pairBuffer[d];
				if (f.proxyA != n.proxyA || f.proxyB != n.proxyB) break;
				++d
			}
		}
	};
	C.prototype.Query = function(b, c) {
		this.m_tree.Query(b, c)
	};
	C.prototype.RayCast = function(b, c) {
		this.m_tree.RayCast(b, c)
	};
	C.prototype.Validate = function() {};
	C.prototype.Rebalance = function(b) {
		void 0 === b && (b = 0);
		this.m_tree.Rebalance(b)
	};
	C.prototype.BufferMove = function(b) {
		this.m_moveBuffer[this.m_moveBuffer.length] = b
	};
	C.prototype.UnBufferMove = function(b) {
		this.m_moveBuffer.splice(parseInt(this.m_moveBuffer.indexOf(b)), 1)
	};
	C.prototype.ComparePairs = function() {
		return 0
	};
	C.__implements = {};
	C.__implements[L] = !0;
	H.b2DynamicTreeNode = function() {
		this.aabb = new j
	};
	H.prototype.IsLeaf = function() {
		return null == this.child1
	};
	R.b2DynamicTreePair = function() {};
	K.b2Manifold = function() {
		this.m_pointCount = 0
	};
	K.prototype.b2Manifold = function() {
		this.m_points = new Vector(e.b2_maxManifoldPoints);
		for (var b = 0; b < e.b2_maxManifoldPoints; b++) this.m_points[b] = new fa;
		this.m_localPlaneNormal = new l;
		this.m_localPoint = new l
	};
	K.prototype.Reset = function() {
		for (var b = 0; b < e.b2_maxManifoldPoints; b++)(this.m_points[b] instanceof fa ? this.m_points[b] : null).Reset();
		this.m_localPlaneNormal.SetZero();
		this.m_localPoint.SetZero();
		this.m_pointCount = this.m_type = 0
	};
	K.prototype.Set = function(b) {
		this.m_pointCount = b.m_pointCount;
		for (var c = 0; c < e.b2_maxManifoldPoints; c++)(this.m_points[c] instanceof fa ? this.m_points[c] : null).Set(b.m_points[c]);
		this.m_localPlaneNormal.SetV(b.m_localPlaneNormal);
		this.m_localPoint.SetV(b.m_localPoint);
		this.m_type = b.m_type
	};
	K.prototype.Copy = function() {
		var b = new K;
		b.Set(this);
		return b
	};
	Box2D.postDefs.push(function() {
		Box2D.Collision.b2Manifold.e_circles = 1;
		Box2D.Collision.b2Manifold.e_faceA = 2;
		Box2D.Collision.b2Manifold.e_faceB = 4
	});
	fa.b2ManifoldPoint = function() {
		this.m_localPoint = new l;
		this.m_id = new A
	};
	fa.prototype.b2ManifoldPoint = function() {
		this.Reset()
	};
	fa.prototype.Reset = function() {
		this.m_localPoint.SetZero();
		this.m_tangentImpulse = this.m_normalImpulse = 0;
		this.m_id.key = 0
	};
	fa.prototype.Set = function(b) {
		this.m_localPoint.SetV(b.m_localPoint);
		this.m_normalImpulse = b.m_normalImpulse;
		this.m_tangentImpulse = b.m_tangentImpulse;
		this.m_id.Set(b.m_id)
	};
	O.b2Point = function() {
		this.p = new l
	};
	O.prototype.Support = function() {
		return this.p
	};
	O.prototype.GetFirstVertex = function() {
		return this.p
	};
	P.b2RayCastInput = function() {
		this.p1 = new l;
		this.p2 = new l
	};
	P.prototype.b2RayCastInput = function(b, c, d) {
		void 0 === b && (b = null);
		void 0 === c && (c = null);
		void 0 === d && (d = 1);
		b && this.p1.SetV(b);
		c && this.p2.SetV(c);
		this.maxFraction = d
	};
	ba.b2RayCastOutput = function() {
		this.normal = new l
	};
	V.b2Segment = function() {
		this.p1 = new l;
		this.p2 = new l
	};
	V.prototype.TestSegment = function(b, c, d, e) {
		void 0 === e && (e = 0);
		var n = d.p1,
			f = d.p2.x - n.x,
			j = d.p2.y - n.y;
		d = this.p2.y - this.p1.y;
		var l = -(this.p2.x -
				this.p1.x),
			g = 100 * Number.MIN_VALUE,
			r = -(f * d + j * l);
		if (r > g) {
			var u = n.x - this.p1.x,
				t = n.y - this.p1.y,
				n = u * d + t * l;
			if (0 <= n && n <= e * r && (e = -f * t + j * u, -g * r <= e && e <= r * (1 + g))) return n /= r, e = Math.sqrt(d * d + l * l), b[0] = n, c.Set(d / e, l / e), !0
		}
		return !1
	};
	V.prototype.Extend = function(b) {
		this.ExtendForward(b);
		this.ExtendBackward(b)
	};
	V.prototype.ExtendForward = function(b) {
		var c = this.p2.x - this.p1.x,
			d = this.p2.y - this.p1.y;
		b = Math.min(0 < c ? (b.upperBound.x - this.p1.x) / c : 0 > c ? (b.lowerBound.x - this.p1.x) / c : Number.POSITIVE_INFINITY, 0 < d ? (b.upperBound.y -
			this.p1.y) / d : 0 > d ? (b.lowerBound.y - this.p1.y) / d : Number.POSITIVE_INFINITY);
		this.p2.x = this.p1.x + c * b;
		this.p2.y = this.p1.y + d * b
	};
	V.prototype.ExtendBackward = function(b) {
		var c = -this.p2.x + this.p1.x,
			d = -this.p2.y + this.p1.y;
		b = Math.min(0 < c ? (b.upperBound.x - this.p2.x) / c : 0 > c ? (b.lowerBound.x - this.p2.x) / c : Number.POSITIVE_INFINITY, 0 < d ? (b.upperBound.y - this.p2.y) / d : 0 > d ? (b.lowerBound.y - this.p2.y) / d : Number.POSITIVE_INFINITY);
		this.p1.x = this.p2.x + c * b;
		this.p1.y = this.p2.y + d * b
	};
	r.b2SeparationFunction = function() {
		this.m_localPoint = new l;
		this.m_axis = new l
	};
	r.prototype.Initialize = function(b, c, d, n, j) {
		this.m_proxyA = c;
		this.m_proxyB = n;
		var g = parseInt(b.count);
		e.b2Assert(0 < g && 3 > g);
		var u, t, D, L, m = 0,
			s = 0;
		1 == g ? (this.m_type = r.e_points, u = this.m_proxyA.GetVertex(b.indexA[0]), t = this.m_proxyB.GetVertex(b.indexB[0]), g = u, b = d.R, c = d.position.x + (b.col1.x * g.x + b.col2.x * g.y), n = d.position.y + (b.col1.y * g.x + b.col2.y * g.y), g = t, b = j.R, D = j.position.x + (b.col1.x * g.x + b.col2.x * g.y), L = j.position.y + (b.col1.y * g.x + b.col2.y * g.y), this.m_axis.x = D - c, this.m_axis.y = L - n, this.m_axis.Normalize()) : (b.indexB[0] == b.indexB[1] ? (this.m_type = r.e_faceA, c = this.m_proxyA.GetVertex(b.indexA[0]), n = this.m_proxyA.GetVertex(b.indexA[1]), t = this.m_proxyB.GetVertex(b.indexB[0]), this.m_localPoint.x = 0.5 * (c.x + n.x), this.m_localPoint.y = 0.5 * (c.y + n.y), this.m_axis = f.CrossVF(f.SubtractVV(n, c), 1), this.m_axis.Normalize(), g = this.m_axis, b = d.R, m = b.col1.x * g.x + b.col2.x * g.y, s = b.col1.y * g.x + b.col2.y * g.y, g = this.m_localPoint, b = d.R, c = d.position.x + (b.col1.x * g.x + b.col2.x * g.y), n = d.position.y + (b.col1.y * g.x + b.col2.y * g.y), g = t, b = j.R, D = j.position.x + (b.col1.x * g.x + b.col2.x * g.y), L = j.position.y + (b.col1.y * g.x + b.col2.y * g.y), m = (D - c) * m + (L - n) * s) : b.indexA[0] == b.indexA[0] ? (this.m_type = r.e_faceB, D = this.m_proxyB.GetVertex(b.indexB[0]), L = this.m_proxyB.GetVertex(b.indexB[1]), u = this.m_proxyA.GetVertex(b.indexA[0]), this.m_localPoint.x = 0.5 * (D.x + L.x), this.m_localPoint.y = 0.5 * (D.y + L.y), this.m_axis = f.CrossVF(f.SubtractVV(L, D), 1), this.m_axis.Normalize(), g = this.m_axis, b = j.R, m = b.col1.x * g.x + b.col2.x * g.y, s = b.col1.y * g.x + b.col2.y * g.y, g = this.m_localPoint, b = j.R, D = j.position.x + (b.col1.x * g.x + b.col2.x * g.y), L = j.position.y + (b.col1.y * g.x + b.col2.y * g.y), g = u, b = d.R, c = d.position.x + (b.col1.x * g.x + b.col2.x * g.y), n = d.position.y + (b.col1.y * g.x + b.col2.y * g.y), m = (c - D) * m + (n - L) * s) : (c = this.m_proxyA.GetVertex(b.indexA[0]), n = this.m_proxyA.GetVertex(b.indexA[1]), D = this.m_proxyB.GetVertex(b.indexB[0]), L = this.m_proxyB.GetVertex(b.indexB[1]), f.MulX(d, u), u = f.MulMV(d.R, f.SubtractVV(n, c)), f.MulX(j, t), m = f.MulMV(j.R, f.SubtractVV(L, D)), j = u.x * u.x + u.y * u.y, t = m.x * m.x + m.y * m.y, b = f.SubtractVV(m, u), d = u.x * b.x + u.y * b.y, b = m.x * b.x + m.y * b.y, u = u.x * m.x + u.y * m.y, s = j * t - u * u, m = 0, 0 != s && (m = f.Clamp((u * b - d * t) / s, 0, 1)), 0 > (u * m + b) / t && (m = f.Clamp((u - d) / j, 0, 1)), u = new l, u.x = c.x + m * (n.x - c.x), u.y = c.y + m * (n.y - c.y), t = new l, t.x = D.x + m * (L.x - D.x), t.y = D.y + m * (L.y - D.y), 0 == m || 1 == m ? (this.m_type = r.e_faceB, this.m_axis = f.CrossVF(f.SubtractVV(L, D), 1), this.m_axis.Normalize(), this.m_localPoint = t) : (this.m_type = r.e_faceA, this.m_axis = f.CrossVF(f.SubtractVV(n, c), 1), this.m_localPoint = u)), 0 > m && this.m_axis.NegativeSelf())
	};
	r.prototype.Evaluate = function(b, c) {
		var d, n, j = 0;
		switch (this.m_type) {
			case r.e_points:
				return d = f.MulTMV(b.R, this.m_axis), n = f.MulTMV(c.R, this.m_axis.GetNegative()), d = this.m_proxyA.GetSupportVertex(d), n = this.m_proxyB.GetSupportVertex(n), d = f.MulX(b, d), n = f.MulX(c, n), (n.x - d.x) * this.m_axis.x + (n.y - d.y) * this.m_axis.y;
			case r.e_faceA:
				return j = f.MulMV(b.R, this.m_axis), d = f.MulX(b, this.m_localPoint), n = f.MulTMV(c.R, j.GetNegative()), n = this.m_proxyB.GetSupportVertex(n), n = f.MulX(c, n), (n.x - d.x) * j.x + (n.y - d.y) * j.y;
			case r.e_faceB:
				return j = f.MulMV(c.R, this.m_axis), n = f.MulX(c, this.m_localPoint), d = f.MulTMV(b.R, j.GetNegative()), d = this.m_proxyA.GetSupportVertex(d), d = f.MulX(b, d), (d.x - n.x) * j.x + (d.y - n.y) * j.y;
			default:
				return e.b2Assert(!1), 0
		}
	};
	Box2D.postDefs.push(function() {
		Box2D.Collision.b2SeparationFunction.e_points = 1;
		Box2D.Collision.b2SeparationFunction.e_faceA = 2;
		Box2D.Collision.b2SeparationFunction.e_faceB = 4
	});
	t.b2Simplex = function() {
		this.m_v1 = new D;
		this.m_v2 = new D;
		this.m_v3 = new D;
		this.m_vertices = new Vector(3)
	};
	t.prototype.b2Simplex = function() {
		this.m_vertices[0] = this.m_v1;
		this.m_vertices[1] = this.m_v2;
		this.m_vertices[2] = this.m_v3
	};
	t.prototype.ReadCache = function(b, c, d, n, j) {
		e.b2Assert(0 <= b.count && 3 >= b.count);
		var g, l;
		this.m_count = b.count;
		for (var r = this.m_vertices, u = 0; u < this.m_count; u++) {
			var t = r[u];
			t.indexA = b.indexA[u];
			t.indexB = b.indexB[u];
			g = c.GetVertex(t.indexA);
			l = n.GetVertex(t.indexB);
			t.wA = f.MulX(d, g);
			t.wB = f.MulX(j, l);
			t.w = f.SubtractVV(t.wB, t.wA);
			t.a = 0
		}
		if (1 < this.m_count && (b = b.metric, g = this.GetMetric(), g < 0.5 * b || 2 * b < g || g < Number.MIN_VALUE)) this.m_count = 0;
		0 == this.m_count && (t = r[0], t.indexA = 0, t.indexB = 0, g = c.GetVertex(0), l = n.GetVertex(0), t.wA = f.MulX(d, g), t.wB = f.MulX(j, l), t.w = f.SubtractVV(t.wB, t.wA), this.m_count = 1)
	};
	t.prototype.WriteCache = function(b) {
		b.metric = this.GetMetric();
		b.count = Box2D.parseUInt(this.m_count);
		for (var c = this.m_vertices, d = 0; d < this.m_count; d++) b.indexA[d] = Box2D.parseUInt(c[d].indexA), b.indexB[d] = Box2D.parseUInt(c[d].indexB)
	};
	t.prototype.GetSearchDirection = function() {
		switch (this.m_count) {
			case 1:
				return this.m_v1.w.GetNegative();
			case 2:
				var b = f.SubtractVV(this.m_v2.w, this.m_v1.w);
				return 0 < f.CrossVV(b, this.m_v1.w.GetNegative()) ? f.CrossFV(1, b) : f.CrossVF(b, 1);
			default:
				return e.b2Assert(!1), new l
		}
	};
	t.prototype.GetClosestPoint = function() {
		switch (this.m_count) {
			case 0:
				return e.b2Assert(!1), new l;
			case 1:
				return this.m_v1.w;
			case 2:
				return new l(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
			default:
				return e.b2Assert(!1), new l
		}
	};
	t.prototype.GetWitnessPoints = function(b, c) {
		switch (this.m_count) {
			case 0:
				e.b2Assert(!1);
				break;
			case 1:
				b.SetV(this.m_v1.wA);
				c.SetV(this.m_v1.wB);
				break;
			case 2:
				b.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
				b.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
				c.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
				c.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
				break;
			case 3:
				c.x = b.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
				c.y = b.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
				break;
			default:
				e.b2Assert(!1)
		}
	};
	t.prototype.GetMetric = function() {
		switch (this.m_count) {
			case 0:
				return e.b2Assert(!1), 0;
			case 1:
				return 0;
			case 2:
				return f.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
			case 3:
				return f.CrossVV(f.SubtractVV(this.m_v2.w, this.m_v1.w), f.SubtractVV(this.m_v3.w, this.m_v1.w));
			default:
				return e.b2Assert(!1), 0
		}
	};
	t.prototype.Solve2 = function() {
		var b = this.m_v1.w,
			c = this.m_v2.w,
			d = f.SubtractVV(c, b),
			b = -(b.x * d.x + b.y * d.y);
		0 >= b ? this.m_count = this.m_v1.a = 1 : (c = c.x * d.x + c.y * d.y, 0 >= c ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : (d = 1 / (c + b), this.m_v1.a = c * d, this.m_v2.a = b * d, this.m_count = 2))
	};
	t.prototype.Solve3 = function() {
		var b = this.m_v1.w,
			c = this.m_v2.w,
			d = this.m_v3.w,
			e = f.SubtractVV(c, b),
			n = f.Dot(b, e),
			j = f.Dot(c, e),
			n = -n,
			g = f.SubtractVV(d, b),
			l = f.Dot(b, g),
			r = f.Dot(d, g),
			l = -l,
			u = f.SubtractVV(d, c),
			t = f.Dot(c, u),
			u = f.Dot(d, u),
			t = -t,
			g = f.CrossVV(e, g),
			e = g * f.CrossVV(c, d),
			d = g * f.CrossVV(d, b),
			b = g * f.CrossVV(b, c);
		0 >= n && 0 >= l ? this.m_count = this.m_v1.a = 1 : 0 < j && 0 < n && 0 >= b ? (r = 1 / (j + n), this.m_v1.a = j * r, this.m_v2.a = n * r, this.m_count = 2) : 0 < r && 0 < l && 0 >= d ? (j = 1 / (r + l), this.m_v1.a = r * j, this.m_v3.a = l * j, this.m_count = 2, this.m_v2.Set(this.m_v3)) : 0 >= j && 0 >= t ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : 0 >= r && 0 >= u ? (this.m_count = this.m_v3.a = 1, this.m_v1.Set(this.m_v3)) : 0 < u && 0 < t && 0 >= e ? (j = 1 / (u + t), this.m_v2.a = u * j, this.m_v3.a = t * j, this.m_count = 2, this.m_v1.Set(this.m_v3)) : (j = 1 / (e + d + b), this.m_v1.a = e * j, this.m_v2.a = d * j, this.m_v3.a = b * j, this.m_count = 3)
	};
	J.b2SimplexCache = function() {
		this.indexA = new Vector_a2j_Number(3);
		this.indexB = new Vector_a2j_Number(3)
	};
	D.b2SimplexVertex = function() {};
	D.prototype.Set = function(b) {
		this.wA.SetV(b.wA);
		this.wB.SetV(b.wB);
		this.w.SetV(b.w);
		this.a = b.a;
		this.indexA = b.indexA;
		this.indexB = b.indexB
	};
	N.b2TimeOfImpact = function() {};
	N.TimeOfImpact = function(b) {
		++N.b2_toiCalls;
		var c = b.proxyA,
			d = b.proxyB,
			n = b.sweepA,
			j = b.sweepB;
		e.b2Assert(n.t0 == j.t0);
		e.b2Assert(1 - n.t0 > Number.MIN_VALUE);
		var g = c.m_radius + d.m_radius;
		b = b.tolerance;
		var l = 0,
			r = 0,
			u = 0;
		N.s_cache.count = 0;
		for (N.s_distanceInput.useRadii = !1;;) {
			n.GetTransform(N.s_xfA, l);
			j.GetTransform(N.s_xfB, l);
			N.s_distanceInput.proxyA = c;
			N.s_distanceInput.proxyB = d;
			N.s_distanceInput.transformA = N.s_xfA;
			N.s_distanceInput.transformB = N.s_xfB;
			E.Distance(N.s_distanceOutput, N.s_cache, N.s_distanceInput);
			if (0 >= N.s_distanceOutput.distance) {
				l = 1;
				break
			}
			N.s_fcn.Initialize(N.s_cache, c, N.s_xfA, d, N.s_xfB);
			var t = N.s_fcn.Evaluate(N.s_xfA, N.s_xfB);
			if (0 >= t) {
				l = 1;
				break
			}
			0 == r && (u = t > g ? f.Max(g - b, 0.75 * g) : f.Max(t - b, 0.02 * g));
			if (t - u < 0.5 * b) {
				if (0 == r) {
					l = 1;
					break
				}
				break
			}
			var D = l,
				L = l,
				m = 1;
			n.GetTransform(N.s_xfA, m);
			j.GetTransform(N.s_xfB, m);
			var s = N.s_fcn.Evaluate(N.s_xfA, N.s_xfB);
			if (s >= u) {
				l = 1;
				break
			}
			for (var J = 0;;) {
				var Q = 0,
					Q = J & 1 ? L + (u - t) * (m - L) / (s - t) : 0.5 * (L + m);
				n.GetTransform(N.s_xfA, Q);
				j.GetTransform(N.s_xfB, Q);
				var aa = N.s_fcn.Evaluate(N.s_xfA, N.s_xfB);
				if (f.Abs(aa - u) < 0.025 * b) {
					D = Q;
					break
				}
				aa > u ? (L = Q, t = aa) : (m = Q, s = aa);
				++J;
				++N.b2_toiRootIters;
				if (50 == J) break
			}
			N.b2_toiMaxRootIters = f.Max(N.b2_toiMaxRootIters, J);
			if (D < (1 + 100 * Number.MIN_VALUE) * l) break;
			l = D;
			r++;
			++N.b2_toiIters;
			if (1E3 == r) break
		}
		N.b2_toiMaxIters = f.Max(N.b2_toiMaxIters, r);
		return l
	};
	Box2D.postDefs.push(function() {
		Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
		Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
		Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
		Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
		Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
		Box2D.Collision.b2TimeOfImpact.s_cache = new J;
		Box2D.Collision.b2TimeOfImpact.s_distanceInput = new F;
		Box2D.Collision.b2TimeOfImpact.s_xfA = new m;
		Box2D.Collision.b2TimeOfImpact.s_xfB = new m;
		Box2D.Collision.b2TimeOfImpact.s_fcn = new r;
		Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new s
	});
	aa.b2TOIInput = function() {
		this.proxyA = new I;
		this.proxyB = new I;
		this.sweepA = new g;
		this.sweepB = new g
	};
	Q.b2WorldManifold = function() {
		this.m_normal = new l
	};
	Q.prototype.b2WorldManifold = function() {
		this.m_points = new Vector(e.b2_maxManifoldPoints);
		for (var b = 0; b < e.b2_maxManifoldPoints; b++) this.m_points[b] = new l
	};
	Q.prototype.Initialize = function(b, c, d, e, n) {
		void 0 === d && (d = 0);
		void 0 === n && (n = 0);
		if (0 != b.m_pointCount) {
			var f = 0,
				j, g, l = 0,
				r = 0,
				u = 0,
				t = 0,
				D = 0;
			switch (b.m_type) {
				case K.e_circles:
					g = c.R;
					j = b.m_localPoint;
					f = c.position.x + g.col1.x * j.x + g.col2.x * j.y;
					c = c.position.y +
						g.col1.y * j.x + g.col2.y * j.y;
					g = e.R;
					j = b.m_points[0].m_localPoint;
					b = e.position.x + g.col1.x * j.x + g.col2.x * j.y;
					e = e.position.y + g.col1.y * j.x + g.col2.y * j.y;
					j = b - f;
					g = e - c;
					l = j * j + g * g;
					l > Number.MIN_VALUE * Number.MIN_VALUE ? (l = Math.sqrt(l), this.m_normal.x = j / l, this.m_normal.y = g / l) : (this.m_normal.x = 1, this.m_normal.y = 0);
					j = c + d * this.m_normal.y;
					e -= n * this.m_normal.y;
					this.m_points[0].x = 0.5 * (f + d * this.m_normal.x + (b - n * this.m_normal.x));
					this.m_points[0].y = 0.5 * (j + e);
					break;
				case K.e_faceA:
					g = c.R;
					j = b.m_localPlaneNormal;
					l = g.col1.x * j.x + g.col2.x * j.y;
					r = g.col1.y * j.x + g.col2.y * j.y;
					g = c.R;
					j = b.m_localPoint;
					u = c.position.x + g.col1.x * j.x + g.col2.x * j.y;
					t = c.position.y + g.col1.y * j.x + g.col2.y * j.y;
					this.m_normal.x = l;
					this.m_normal.y = r;
					for (f = 0; f < b.m_pointCount; f++) g = e.R, j = b.m_points[f].m_localPoint, D = e.position.x + g.col1.x * j.x + g.col2.x * j.y, j = e.position.y + g.col1.y * j.x + g.col2.y * j.y, this.m_points[f].x = D + 0.5 * (d - (D - u) * l - (j - t) * r - n) * l, this.m_points[f].y = j + 0.5 * (d - (D - u) * l - (j - t) * r - n) * r;
					break;
				case K.e_faceB:
					g = e.R;
					j = b.m_localPlaneNormal;
					l = g.col1.x * j.x + g.col2.x * j.y;
					r = g.col1.y * j.x + g.col2.y * j.y;
					g = e.R;
					j = b.m_localPoint;
					u = e.position.x + g.col1.x * j.x + g.col2.x * j.y;
					t = e.position.y + g.col1.y * j.x + g.col2.y * j.y;
					this.m_normal.x = -l;
					this.m_normal.y = -r;
					for (f = 0; f < b.m_pointCount; f++) g = c.R, j = b.m_points[f].m_localPoint, D = c.position.x + g.col1.x * j.x + g.col2.x * j.y, j = c.position.y + g.col1.y * j.x + g.col2.y * j.y, this.m_points[f].x = D + 0.5 * (n - (D - u) * l - (j - t) * r - d) * l, this.m_points[f].y = j + 0.5 * (n - (D - u) * l - (j - t) * r - d) * r
			}
		}
	};
	n.ClipVertex = function() {
		this.v = new l;
		this.id = new A
	};
	n.prototype.Set = function(b) {
		this.v.SetV(b.v);
		this.id.Set(b.id)
	};
	u.Features = function() {};
	Object.defineProperty(u.prototype, "referenceEdge", {
		enumerable: !1,
		configurable: !0,
		get: function() {
			return this._referenceEdge
		}
	});
	Object.defineProperty(u.prototype, "referenceEdge", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._referenceEdge = b;
			this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
		}
	});
	Object.defineProperty(u.prototype, "incidentEdge", {
		enumerable: !1,
		configurable: !0,
		get: function() {
			return this._incidentEdge
		}
	});
	Object.defineProperty(u.prototype, "incidentEdge", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._incidentEdge = b;
			this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
		}
	});
	Object.defineProperty(u.prototype, "incidentVertex", {
		enumerable: !1,
		configurable: !0,
		get: function() {
			return this._incidentVertex
		}
	});
	Object.defineProperty(u.prototype, "incidentVertex", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._incidentVertex = b;
			this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
		}
	});
	Object.defineProperty(u.prototype, "flip", {
		enumerable: !1,
		configurable: !0,
		get: function() {
			return this._flip
		}
	});
	Object.defineProperty(u.prototype, "flip", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._flip = b;
			this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
		}
	})
})();
(function() {
	var b = Box2D.Common.b2Settings,
		c = Box2D.Collision.Shapes.b2CircleShape,
		d = Box2D.Collision.Shapes.b2EdgeChainDef,
		e = Box2D.Collision.Shapes.b2EdgeShape,
		f = Box2D.Collision.Shapes.b2MassData,
		g = Box2D.Collision.Shapes.b2PolygonShape,
		m = Box2D.Collision.Shapes.b2Shape,
		l = Box2D.Common.Math.b2Mat22,
		j = Box2D.Common.Math.b2Math,
		q = Box2D.Common.Math.b2Transform,
		z = Box2D.Common.Math.b2Vec2,
		y = Box2D.Collision.b2Distance,
		A = Box2D.Collision.b2DistanceInput,
		B = Box2D.Collision.b2DistanceOutput,
		E = Box2D.Collision.b2DistanceProxy,
		F = Box2D.Collision.b2SimplexCache;
	Box2D.inherit(c, Box2D.Collision.Shapes.b2Shape);
	c.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
	c.b2CircleShape = function() {
		Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
		this.m_p = new z
	};
	c.prototype.Copy = function() {
		var b = new c;
		b.Set(this);
		return b
	};
	c.prototype.Set = function(b) {
		this.__super.Set.call(this, b);
		Box2D.is(b, c) && this.m_p.SetV((b instanceof c ? b : null).m_p)
	};
	c.prototype.TestPoint = function(b, c) {
		var d = b.R,
			e = b.position.x + (d.col1.x * this.m_p.x +
				d.col2.x * this.m_p.y),
			d = b.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y),
			e = c.x - e,
			d = c.y - d;
		return e * e + d * d <= this.m_radius * this.m_radius
	};
	c.prototype.RayCast = function(b, c, d) {
		var e = d.R,
			f = c.p1.x - (d.position.x + (e.col1.x * this.m_p.x + e.col2.x * this.m_p.y));
		d = c.p1.y - (d.position.y + (e.col1.y * this.m_p.x + e.col2.y * this.m_p.y));
		var e = c.p2.x - c.p1.x,
			j = c.p2.y - c.p1.y,
			g = f * e + d * j,
			l = e * e + j * j,
			m = g * g - l * (f * f + d * d - this.m_radius * this.m_radius);
		if (0 > m || l < Number.MIN_VALUE) return !1;
		g = -(g + Math.sqrt(m));
		return 0 <= g && g <= c.maxFraction * l ? (g /= l, b.fraction = g, b.normal.x = f + g * e, b.normal.y = d + g * j, b.normal.Normalize(), !0) : !1
	};
	c.prototype.ComputeAABB = function(b, c) {
		var d = c.R,
			e = c.position.x + (d.col1.x * this.m_p.x + d.col2.x * this.m_p.y),
			d = c.position.y + (d.col1.y * this.m_p.x + d.col2.y * this.m_p.y);
		b.lowerBound.Set(e - this.m_radius, d - this.m_radius);
		b.upperBound.Set(e + this.m_radius, d + this.m_radius)
	};
	c.prototype.ComputeMass = function(c, d) {
		void 0 === d && (d = 0);
		c.mass = d * b.b2_pi * this.m_radius * this.m_radius;
		c.center.SetV(this.m_p);
		c.I = c.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
	};
	c.prototype.ComputeSubmergedArea = function(b, c, d, e) {
		void 0 === c && (c = 0);
		d = j.MulX(d, this.m_p);
		var f = -(j.Dot(b, d) - c);
		if (f < -this.m_radius + Number.MIN_VALUE) return 0;
		if (f > this.m_radius) return e.SetV(d), Math.PI * this.m_radius * this.m_radius;
		c = this.m_radius * this.m_radius;
		var g = f * f,
			f = c * (Math.asin(f / this.m_radius) + Math.PI / 2) + f * Math.sqrt(c - g);
		c = -2 / 3 * Math.pow(c - g, 1.5) / f;
		e.x = d.x + b.x * c;
		e.y = d.y + b.y * c;
		return f
	};
	c.prototype.GetLocalPosition = function() {
		return this.m_p
	};
	c.prototype.SetLocalPosition = function(b) {
		this.m_p.SetV(b)
	};
	c.prototype.GetRadius = function() {
		return this.m_radius
	};
	c.prototype.SetRadius = function(b) {
		void 0 === b && (b = 0);
		this.m_radius = b
	};
	c.prototype.b2CircleShape = function(b) {
		void 0 === b && (b = 0);
		this.__super.b2Shape.call(this);
		this.m_type = m.e_circleShape;
		this.m_radius = b
	};
	d.b2EdgeChainDef = function() {};
	d.prototype.b2EdgeChainDef = function() {
		this.vertexCount = 0;
		this.isALoop = !0;
		this.vertices = []
	};
	Box2D.inherit(e, Box2D.Collision.Shapes.b2Shape);
	e.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
	e.b2EdgeShape = function() {
		Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
		this.s_supportVec = new z;
		this.m_v1 = new z;
		this.m_v2 = new z;
		this.m_coreV1 = new z;
		this.m_coreV2 = new z;
		this.m_normal = new z;
		this.m_direction = new z;
		this.m_cornerDir1 = new z;
		this.m_cornerDir2 = new z
	};
	e.prototype.TestPoint = function() {
		return !1
	};
	e.prototype.RayCast = function(b, c, d) {
		var e, f = c.p2.x - c.p1.x,
			j = c.p2.y - c.p1.y;
		e = d.R;
		var g = d.position.x + (e.col1.x * this.m_v1.x + e.col2.x * this.m_v1.y),
			l = d.position.y + (e.col1.y * this.m_v1.x + e.col2.y * this.m_v1.y),
			m = d.position.y + (e.col1.y * this.m_v2.x + e.col2.y * this.m_v2.y) - l;
		d = -(d.position.x + (e.col1.x * this.m_v2.x + e.col2.x * this.m_v2.y) - g);
		e = 100 * Number.MIN_VALUE;
		var q = -(f * m + j * d);
		if (q > e) {
			var g = c.p1.x - g,
				y = c.p1.y - l,
				l = g * m + y * d;
			if (0 <= l && l <= c.maxFraction * q && (c = -f * y + j * g, -e * q <= c && c <= q * (1 + e))) return b.fraction = l / q, c = Math.sqrt(m * m + d * d), b.normal.x = m / c, b.normal.y = d / c, !0
		}
		return !1
	};
	e.prototype.ComputeAABB = function(b, c) {
		var d = c.R,
			e = c.position.x + (d.col1.x * this.m_v1.x +
				d.col2.x * this.m_v1.y),
			f = c.position.y + (d.col1.y * this.m_v1.x + d.col2.y * this.m_v1.y),
			j = c.position.x + (d.col1.x * this.m_v2.x + d.col2.x * this.m_v2.y),
			d = c.position.y + (d.col1.y * this.m_v2.x + d.col2.y * this.m_v2.y);
		e < j ? (b.lowerBound.x = e, b.upperBound.x = j) : (b.lowerBound.x = j, b.upperBound.x = e);
		f < d ? (b.lowerBound.y = f, b.upperBound.y = d) : (b.lowerBound.y = d, b.upperBound.y = f)
	};
	e.prototype.ComputeMass = function(b) {
		b.mass = 0;
		b.center.SetV(this.m_v1);
		b.I = 0
	};
	e.prototype.ComputeSubmergedArea = function(b, c, d, e) {
		void 0 === c && (c = 0);
		var f = new z(b.x * c, b.y * c),
			g = j.MulX(d, this.m_v1);
		d = j.MulX(d, this.m_v2);
		var l = j.Dot(b, g) - c;
		b = j.Dot(b, d) - c;
		if (0 < l) {
			if (0 < b) return 0;
			g.x = -b / (l - b) * g.x + l / (l - b) * d.x;
			g.y = -b / (l - b) * g.y + l / (l - b) * d.y
		} else 0 < b && (d.x = -b / (l - b) * g.x + l / (l - b) * d.x, d.y = -b / (l - b) * g.y + l / (l - b) * d.y);
		e.x = (f.x + g.x + d.x) / 3;
		e.y = (f.y + g.y + d.y) / 3;
		return 0.5 * ((g.x - f.x) * (d.y - f.y) - (g.y - f.y) * (d.x - f.x))
	};
	e.prototype.GetLength = function() {
		return this.m_length
	};
	e.prototype.GetVertex1 = function() {
		return this.m_v1
	};
	e.prototype.GetVertex2 = function() {
		return this.m_v2
	};
	e.prototype.GetCoreVertex1 = function() {
		return this.m_coreV1
	};
	e.prototype.GetCoreVertex2 = function() {
		return this.m_coreV2
	};
	e.prototype.GetNormalVector = function() {
		return this.m_normal
	};
	e.prototype.GetDirectionVector = function() {
		return this.m_direction
	};
	e.prototype.GetCorner1Vector = function() {
		return this.m_cornerDir1
	};
	e.prototype.GetCorner2Vector = function() {
		return this.m_cornerDir2
	};
	e.prototype.Corner1IsConvex = function() {
		return this.m_cornerConvex1
	};
	e.prototype.Corner2IsConvex = function() {
		return this.m_cornerConvex2
	};
	e.prototype.GetFirstVertex = function(b) {
		var c = b.R;
		return new z(b.position.x + (c.col1.x * this.m_coreV1.x + c.col2.x * this.m_coreV1.y), b.position.y + (c.col1.y * this.m_coreV1.x + c.col2.y * this.m_coreV1.y))
	};
	e.prototype.GetNextEdge = function() {
		return this.m_nextEdge
	};
	e.prototype.GetPrevEdge = function() {
		return this.m_prevEdge
	};
	e.prototype.Support = function(b, c, d) {
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		var e = b.R,
			f = b.position.x + (e.col1.x * this.m_coreV1.x + e.col2.x * this.m_coreV1.y),
			j = b.position.y + (e.col1.y * this.m_coreV1.x +
				e.col2.y * this.m_coreV1.y),
			g = b.position.x + (e.col1.x * this.m_coreV2.x + e.col2.x * this.m_coreV2.y);
		b = b.position.y + (e.col1.y * this.m_coreV2.x + e.col2.y * this.m_coreV2.y);
		f * c + j * d > g * c + b * d ? (this.s_supportVec.x = f, this.s_supportVec.y = j) : (this.s_supportVec.x = g, this.s_supportVec.y = b);
		return this.s_supportVec
	};
	e.prototype.b2EdgeShape = function(c, d) {
		this.__super.b2Shape.call(this);
		this.m_type = m.e_edgeShape;
		this.m_nextEdge = this.m_prevEdge = null;
		this.m_v1 = c;
		this.m_v2 = d;
		this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y -
			this.m_v1.y);
		this.m_length = this.m_direction.Normalize();
		this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
		this.m_coreV1.Set(-b.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -b.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
		this.m_coreV2.Set(-b.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -b.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
		this.m_cornerDir1 = this.m_normal;
		this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
	};
	e.prototype.SetPrevEdge = function(b, c, d, e) {
		this.m_prevEdge = b;
		this.m_coreV1 = c;
		this.m_cornerDir1 = d;
		this.m_cornerConvex1 = e
	};
	e.prototype.SetNextEdge = function(b, c, d, e) {
		this.m_nextEdge = b;
		this.m_coreV2 = c;
		this.m_cornerDir2 = d;
		this.m_cornerConvex2 = e
	};
	f.b2MassData = function() {
		this.mass = 0;
		this.center = new z(0, 0);
		this.I = 0
	};
	Box2D.inherit(g, Box2D.Collision.Shapes.b2Shape);
	g.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
	g.b2PolygonShape = function() {
		Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
	};
	g.prototype.Copy = function() {
		var b = new g;
		b.Set(this);
		return b
	};
	g.prototype.Set = function(b) {
		this.__super.Set.call(this, b);
		if (Box2D.is(b, g)) {
			b = b instanceof g ? b : null;
			this.m_centroid.SetV(b.m_centroid);
			this.m_vertexCount = b.m_vertexCount;
			this.Reserve(this.m_vertexCount);
			for (var c = 0; c < this.m_vertexCount; c++) this.m_vertices[c].SetV(b.m_vertices[c]), this.m_normals[c].SetV(b.m_normals[c])
		}
	};
	g.prototype.SetAsArray = function(b, c) {
		void 0 === c && (c = 0);
		for (var d = new Vector, e = 0, f, e = 0; e < b.length; ++e) f = b[e], d.push(f);
		this.SetAsVector(d, c)
	};
	g.AsArray = function(b, c) {
		void 0 === c && (c = 0);
		var d = new g;
		d.SetAsArray(b, c);
		return d
	};
	g.prototype.SetAsVector = function(c, d) {
		void 0 === d && (d = 0);
		0 == d && (d = c.length);
		b.b2Assert(2 <= d);
		this.m_vertexCount = d;
		this.Reserve(d);
		for (var e = 0, e = 0; e < this.m_vertexCount; e++) this.m_vertices[e].SetV(c[e]);
		for (e = 0; e < this.m_vertexCount; ++e) {
			var f = parseInt(e),
				l = parseInt(e + 1 < this.m_vertexCount ? e + 1 : 0),
				f = j.SubtractVV(this.m_vertices[l], this.m_vertices[f]);
			b.b2Assert(f.LengthSquared() > Number.MIN_VALUE);
			this.m_normals[e].SetV(j.CrossVF(f, 1));
			this.m_normals[e].Normalize()
		}
		this.m_centroid = g.ComputeCentroid(this.m_vertices, this.m_vertexCount)
	};
	g.AsVector = function(b, c) {
		void 0 === c && (c = 0);
		var d = new g;
		d.SetAsVector(b, c);
		return d
	};
	g.prototype.SetAsBox = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		this.m_vertexCount = 4;
		this.Reserve(4);
		this.m_vertices[0].Set(-b, -c);
		this.m_vertices[1].Set(b, -c);
		this.m_vertices[2].Set(b, c);
		this.m_vertices[3].Set(-b, c);
		this.m_normals[0].Set(0, -1);
		this.m_normals[1].Set(1, 0);
		this.m_normals[2].Set(0, 1);
		this.m_normals[3].Set(-1, 0);
		this.m_centroid.SetZero()
	};
	g.AsBox = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		var d = new g;
		d.SetAsBox(b, c);
		return d
	};
	g.prototype.SetAsOrientedBox = function(b, c, d, e) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === d && (d = null);
		void 0 === e && (e = 0);
		this.m_vertexCount = 4;
		this.Reserve(4);
		this.m_vertices[0].Set(-b, -c);
		this.m_vertices[1].Set(b, -c);
		this.m_vertices[2].Set(b, c);
		this.m_vertices[3].Set(-b, c);
		this.m_normals[0].Set(0, -1);
		this.m_normals[1].Set(1, 0);
		this.m_normals[2].Set(0, 1);
		this.m_normals[3].Set(-1, 0);
		this.m_centroid = d;
		b = new q;
		b.position = d;
		b.R.Set(e);
		for (d = 0; d < this.m_vertexCount; ++d) this.m_vertices[d] = j.MulX(b, this.m_vertices[d]), this.m_normals[d] = j.MulMV(b.R, this.m_normals[d])
	};
	g.AsOrientedBox = function(b, c, d, e) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === d && (d = null);
		void 0 === e && (e = 0);
		var f = new g;
		f.SetAsOrientedBox(b, c, d, e);
		return f
	};
	g.prototype.SetAsEdge = function(b, c) {
		this.m_vertexCount = 2;
		this.Reserve(2);
		this.m_vertices[0].SetV(b);
		this.m_vertices[1].SetV(c);
		this.m_centroid.x = 0.5 * (b.x + c.x);
		this.m_centroid.y = 0.5 * (b.y + c.y);
		this.m_normals[0] = j.CrossVF(j.SubtractVV(c, b), 1);
		this.m_normals[0].Normalize();
		this.m_normals[1].x = -this.m_normals[0].x;
		this.m_normals[1].y = -this.m_normals[0].y
	};
	g.AsEdge = function(b, c) {
		var d = new g;
		d.SetAsEdge(b, c);
		return d
	};
	g.prototype.TestPoint = function(b, c) {
		var d;
		d = b.R;
		for (var e = c.x - b.position.x, f = c.y - b.position.y, j = e * d.col1.x + f * d.col1.y, g = e * d.col2.x + f * d.col2.y, l = 0; l < this.m_vertexCount; ++l)
			if (d = this.m_vertices[l], e = j - d.x, f = g - d.y, d = this.m_normals[l], 0 < d.x * e + d.y * f) return !1;
		return !0
	};
	g.prototype.RayCast = function(b, c, d) {
		var e = 0,
			f = c.maxFraction,
			j = 0,
			g = 0,
			l, m, j = c.p1.x - d.position.x,
			g = c.p1.y - d.position.y;
		l = d.R;
		var q = j * l.col1.x + g * l.col1.y,
			y = j * l.col2.x + g * l.col2.y,
			j = c.p2.x - d.position.x,
			g = c.p2.y - d.position.y;
		l = d.R;
		c = j * l.col1.x + g * l.col1.y - q;
		l = j * l.col2.x + g * l.col2.y - y;
		for (var A = -1, r = 0; r < this.m_vertexCount; ++r) {
			m = this.m_vertices[r];
			j = m.x - q;
			g = m.y - y;
			m = this.m_normals[r];
			j = m.x * j + m.y * g;
			g = m.x * c + m.y * l;
			if (0 == g) {
				if (0 > j) return !1
			} else 0 > g && j < e * g ? (e = j / g, A = r) : 0 < g && j < f * g && (f = j / g);
			if (f < e - Number.MIN_VALUE) return !1
		}
		return 0 <= A ? (b.fraction = e, l = d.R, m = this.m_normals[A], b.normal.x = l.col1.x * m.x + l.col2.x * m.y, b.normal.y = l.col1.y * m.x + l.col2.y * m.y, !0) : !1
	};
	g.prototype.ComputeAABB = function(b, c) {
		for (var d = c.R, e = this.m_vertices[0], f = c.position.x + (d.col1.x * e.x + d.col2.x * e.y), j = c.position.y + (d.col1.y * e.x + d.col2.y * e.y), g = f, l = j, m = 1; m < this.m_vertexCount; ++m) var e = this.m_vertices[m],
			q = c.position.x + (d.col1.x * e.x + d.col2.x * e.y),
			e = c.position.y + (d.col1.y * e.x + d.col2.y * e.y),
			f = f < q ? f : q,
			j = j < e ? j : e,
			g = g > q ? g : q,
			l = l > e ? l : e;
		b.lowerBound.x = f - this.m_radius;
		b.lowerBound.y = j - this.m_radius;
		b.upperBound.x = g + this.m_radius;
		b.upperBound.y = l + this.m_radius
	};
	g.prototype.ComputeMass = function(b, c) {
		void 0 === c && (c = 0);
		if (2 == this.m_vertexCount) b.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x), b.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y), b.mass = 0, b.I = 0;
		else {
			for (var d = 0, e = 0, f = 0, j = 0, g = 1 / 3, l = 0; l < this.m_vertexCount; ++l) var m = this.m_vertices[l],
				q = l + 1 < this.m_vertexCount ? this.m_vertices[parseInt(l + 1)] : this.m_vertices[0],
				y = m.x - 0,
				A = m.y - 0,
				r = q.x - 0,
				t = q.y -
				0,
				J = y * t - A * r,
				D = 0.5 * J,
				f = f + D,
				d = d + D * g * (0 + m.x + q.x),
				e = e + D * g * (0 + m.y + q.y),
				m = y,
				j = j + J * (g * (0.25 * (m * m + r * m + r * r) + (0 * m + 0 * r)) + 0 + (g * (0.25 * (A * A + t * A + t * t) + (0 * A + 0 * t)) + 0));
			b.mass = c * f;
			b.center.Set(d * (1 / f), e * (1 / f));
			b.I = c * j
		}
	};
	g.prototype.ComputeSubmergedArea = function(b, c, d, e) {
		void 0 === c && (c = 0);
		var g = j.MulTMV(d.R, b),
			l = c - j.Dot(b, d.position),
			m = new Vector_a2j_Number,
			q = 0,
			y = -1;
		c = -1;
		var A = !1;
		for (b = b = 0; b < this.m_vertexCount; ++b) {
			m[b] = j.Dot(g, this.m_vertices[b]) - l;
			var B = m[b] < -Number.MIN_VALUE;
			0 < b && (B ? A || (y = b - 1, q++) : A && (c = b - 1, q++));
			A = B
		}
		switch (q) {
			case 0:
				return A ? (b = new f, this.ComputeMass(b, 1), e.SetV(j.MulX(d, b.center)), b.mass) : 0;
			case 1:
				-1 == y ? y = this.m_vertexCount - 1 : c = this.m_vertexCount - 1
		}
		b = parseInt((y + 1) % this.m_vertexCount);
		g = parseInt((c + 1) % this.m_vertexCount);
		l = (0 - m[y]) / (m[b] - m[y]);
		m = (0 - m[c]) / (m[g] - m[c]);
		y = new z(this.m_vertices[y].x * (1 - l) + this.m_vertices[b].x * l, this.m_vertices[y].y * (1 - l) + this.m_vertices[b].y * l);
		c = new z(this.m_vertices[c].x * (1 - m) + this.m_vertices[g].x * m, this.m_vertices[c].y * (1 - m) + this.m_vertices[g].y * m);
		m = 0;
		l = new z;
		for (q = this.m_vertices[b]; b != g;) b = (b + 1) % this.m_vertexCount, A = b == g ? c : this.m_vertices[b], B = 0.5 * ((q.x - y.x) * (A.y - y.y) - (q.y - y.y) * (A.x - y.x)), m += B, l.x += B * (y.x + q.x + A.x) / 3, l.y += B * (y.y + q.y + A.y) / 3, q = A;
		l.Multiply(1 / m);
		e.SetV(j.MulX(d, l));
		return m
	};
	g.prototype.GetVertexCount = function() {
		return this.m_vertexCount
	};
	g.prototype.GetVertices = function() {
		return this.m_vertices
	};
	g.prototype.GetNormals = function() {
		return this.m_normals
	};
	g.prototype.GetSupport = function(b) {
		for (var c = 0, d = this.m_vertices[0].x * b.x + this.m_vertices[0].y * b.y, e = 1; e < this.m_vertexCount; ++e) {
			var f = this.m_vertices[e].x * b.x + this.m_vertices[e].y * b.y;
			f > d && (c = e, d = f)
		}
		return c
	};
	g.prototype.GetSupportVertex = function(b) {
		for (var c = 0, d = this.m_vertices[0].x * b.x + this.m_vertices[0].y * b.y, e = 1; e < this.m_vertexCount; ++e) {
			var f = this.m_vertices[e].x * b.x + this.m_vertices[e].y * b.y;
			f > d && (c = e, d = f)
		}
		return this.m_vertices[c]
	};
	g.prototype.Validate = function() {
		return !1
	};
	g.prototype.b2PolygonShape = function() {
		this.__super.b2Shape.call(this);
		this.m_type = m.e_polygonShape;
		this.m_centroid = new z;
		this.m_vertices = new Vector;
		this.m_normals = new Vector
	};
	g.prototype.Reserve = function(b) {
		void 0 === b && (b = 0);
		for (var c = parseInt(this.m_vertices.length); c < b; c++) this.m_vertices[c] = new z, this.m_normals[c] = new z
	};
	g.ComputeCentroid = function(b, c) {
		void 0 === c && (c = 0);
		for (var d = new z, e = 0, f = 1 / 3, j = 0; j < c; ++j) {
			var g = b[j],
				l = j + 1 < c ? b[parseInt(j + 1)] : b[0],
				m = 0.5 * ((g.x - 0) * (l.y - 0) - (g.y - 0) * (l.x - 0)),
				e = e + m;
			d.x += m * f * (0 + g.x + l.x);
			d.y += m * f * (0 + g.y + l.y)
		}
		d.x *= 1 / e;
		d.y *= 1 / e;
		return d
	};
	g.ComputeOBB = function(b, c, d) {
		void 0 === d && (d = 0);
		for (var e = 0, f = new Vector(d + 1), e = 0; e < d; ++e) f[e] = c[e];
		f[d] = f[0];
		c = Number.MAX_VALUE;
		for (e = 1; e <= d; ++e) {
			for (var j = f[parseInt(e - 1)], g = f[e].x - j.x, l = f[e].y - j.y, m = Math.sqrt(g * g + l * l), g = g / m, l = l / m, q = -l, y = g, A = m = Number.MAX_VALUE, r = -Number.MAX_VALUE, t = -Number.MAX_VALUE, J = 0; J < d; ++J) {
				var D = f[J].x - j.x,
					N = f[J].y - j.y,
					aa = g * D + l * N,
					D = q * D + y * N;
				aa < m && (m = aa);
				D < A && (A = D);
				aa > r && (r = aa);
				D > t && (t = D)
			}
			J = (r - m) * (t - A);
			J < 0.95 * c && (c = J, b.R.col1.x = g, b.R.col1.y = l, b.R.col2.x = q, b.R.col2.y = y, g = 0.5 * (m + r), l = 0.5 * (A + t), q = b.R, b.center.x = j.x + (q.col1.x * g + q.col2.x * l), b.center.y = j.y + (q.col1.y * g + q.col2.y * l), b.extents.x = 0.5 * (r - m), b.extents.y = 0.5 * (t - A))
		}
	};
	Box2D.postDefs.push(function() {
		Box2D.Collision.Shapes.b2PolygonShape.s_mat = new l
	});
	m.b2Shape = function() {};
	m.prototype.Copy = function() {
		return null
	};
	m.prototype.Set = function(b) {
		this.m_radius = b.m_radius
	};
	m.prototype.GetType = function() {
		return this.m_type
	};
	m.prototype.TestPoint = function() {
		return !1
	};
	m.prototype.RayCast = function() {
		return !1
	};
	m.prototype.ComputeAABB = function() {};
	m.prototype.ComputeMass = function() {};
	m.prototype.ComputeSubmergedArea = function() {
		return 0
	};
	m.TestOverlap = function(b, c, d, e) {
		var f = new A;
		f.proxyA = new E;
		f.proxyA.Set(b);
		f.proxyB = new E;
		f.proxyB.Set(d);
		f.transformA = c;
		f.transformB = e;
		f.useRadii = !0;
		b = new F;
		b.count = 0;
		c = new B;
		y.Distance(c, b, f);
		return c.distance < 10 * Number.MIN_VALUE
	};
	m.prototype.b2Shape = function() {
		this.m_type = m.e_unknownShape;
		this.m_radius = b.b2_linearSlop
	};
	Box2D.postDefs.push(function() {
		Box2D.Collision.Shapes.b2Shape.e_unknownShape = -1;
		Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
		Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
		Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
		Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
		Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
		Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
		Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = -1
	})
})();
(function() {
	var b = Box2D.Common.b2Color,
		c = Box2D.Common.b2Settings,
		d = Box2D.Common.Math.b2Math;
	b.b2Color = function() {
		this._b = this._g = this._r = 0
	};
	b.prototype.b2Color = function(b, c, g) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === g && (g = 0);
		this._r = Box2D.parseUInt(255 * d.Clamp(b, 0, 1));
		this._g = Box2D.parseUInt(255 * d.Clamp(c, 0, 1));
		this._b = Box2D.parseUInt(255 * d.Clamp(g, 0, 1))
	};
	b.prototype.Set = function(b, c, g) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === g && (g = 0);
		this._r = Box2D.parseUInt(255 * d.Clamp(b, 0, 1));
		this._g = Box2D.parseUInt(255 * d.Clamp(c, 0, 1));
		this._b = Box2D.parseUInt(255 * d.Clamp(g, 0, 1))
	};
	Object.defineProperty(b.prototype, "r", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._r = Box2D.parseUInt(255 * d.Clamp(b, 0, 1))
		}
	});
	Object.defineProperty(b.prototype, "g", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._g = Box2D.parseUInt(255 * d.Clamp(b, 0, 1))
		}
	});
	Object.defineProperty(b.prototype, "b", {
		enumerable: !1,
		configurable: !0,
		set: function(b) {
			void 0 === b && (b = 0);
			this._b = Box2D.parseUInt(255 * d.Clamp(b, 0, 1))
		}
	});
	Object.defineProperty(b.prototype, "color", {
		enumerable: !1,
		configurable: !0,
		get: function() {
			return this._r << 16 | this._g << 8 | this._b
		}
	});
	c.b2Settings = function() {};
	c.b2MixFriction = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		return Math.sqrt(b * c)
	};
	c.b2MixRestitution = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		return b > c ? b : c
	};
	c.b2Assert = function(b) {
		if (!b) throw "Assertion Failed";
	};
	Box2D.postDefs.push(function() {
		Box2D.Common.b2Settings.VERSION = "2.1alpha";
		Box2D.Common.b2Settings.USHRT_MAX = 65535;
		Box2D.Common.b2Settings.b2_pi = Math.PI;
		Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
		Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
		Box2D.Common.b2Settings.b2_aabbMultiplier = 2;
		Box2D.Common.b2Settings.b2_polygonRadius = 2 * c.b2_linearSlop;
		Box2D.Common.b2Settings.b2_linearSlop = 0.005;
		Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * c.b2_pi;
		Box2D.Common.b2Settings.b2_toiSlop = 8 * c.b2_linearSlop;
		Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
		Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
		Box2D.Common.b2Settings.b2_velocityThreshold = 1;
		Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
		Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * c.b2_pi;
		Box2D.Common.b2Settings.b2_maxTranslation = 2;
		Box2D.Common.b2Settings.b2_maxTranslationSquared = c.b2_maxTranslation * c.b2_maxTranslation;
		Box2D.Common.b2Settings.b2_maxRotation = 0.5 * c.b2_pi;
		Box2D.Common.b2Settings.b2_maxRotationSquared = c.b2_maxRotation * c.b2_maxRotation;
		Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
		Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
		Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
		Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * c.b2_pi
	})
})();
(function() {
	var b = Box2D.Common.Math.b2Mat22,
		c = Box2D.Common.Math.b2Mat33,
		d = Box2D.Common.Math.b2Math,
		e = Box2D.Common.Math.b2Sweep,
		f = Box2D.Common.Math.b2Transform,
		g = Box2D.Common.Math.b2Vec2,
		m = Box2D.Common.Math.b2Vec3;
	b.b2Mat22 = function() {
		this.col1 = new g;
		this.col2 = new g
	};
	b.prototype.b2Mat22 = function() {
		this.SetIdentity()
	};
	b.FromAngle = function(c) {
		void 0 === c && (c = 0);
		var d = new b;
		d.Set(c);
		return d
	};
	b.FromVV = function(c, d) {
		var e = new b;
		e.SetVV(c, d);
		return e
	};
	b.prototype.Set = function(b) {
		void 0 === b && (b = 0);
		var c = Math.cos(b);
		b = Math.sin(b);
		this.col1.x = c;
		this.col2.x = -b;
		this.col1.y = b;
		this.col2.y = c
	};
	b.prototype.SetVV = function(b, c) {
		this.col1.SetV(b);
		this.col2.SetV(c)
	};
	b.prototype.Copy = function() {
		var c = new b;
		c.SetM(this);
		return c
	};
	b.prototype.SetM = function(b) {
		this.col1.SetV(b.col1);
		this.col2.SetV(b.col2)
	};
	b.prototype.AddM = function(b) {
		this.col1.x += b.col1.x;
		this.col1.y += b.col1.y;
		this.col2.x += b.col2.x;
		this.col2.y += b.col2.y
	};
	b.prototype.SetIdentity = function() {
		this.col1.x = 1;
		this.col2.x = 0;
		this.col1.y = 0;
		this.col2.y = 1
	};
	b.prototype.SetZero = function() {
		this.col1.x = 0;
		this.col2.x = 0;
		this.col1.y = 0;
		this.col2.y = 0
	};
	b.prototype.GetAngle = function() {
		return Math.atan2(this.col1.y, this.col1.x)
	};
	b.prototype.GetInverse = function(b) {
		var c = this.col1.x,
			d = this.col2.x,
			e = this.col1.y,
			f = this.col2.y,
			g = c * f - d * e;
		0 != g && (g = 1 / g);
		b.col1.x = g * f;
		b.col2.x = -g * d;
		b.col1.y = -g * e;
		b.col2.y = g * c;
		return b
	};
	b.prototype.Solve = function(b, c, d) {
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		var e = this.col1.x,
			f = this.col2.x,
			g = this.col1.y,
			m = this.col2.y,
			E = e * m - f * g;
		0 != E && (E = 1 / E);
		b.x = E * (m * c - f * d);
		b.y = E * (e * d - g * c);
		return b
	};
	b.prototype.Abs = function() {
		this.col1.Abs();
		this.col2.Abs()
	};
	c.b2Mat33 = function() {
		this.col1 = new m;
		this.col2 = new m;
		this.col3 = new m
	};
	c.prototype.b2Mat33 = function(b, c, d) {
		void 0 === b && (b = null);
		void 0 === c && (c = null);
		void 0 === d && (d = null);
		!b && !c && !d ? (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero()) : (this.col1.SetV(b), this.col2.SetV(c), this.col3.SetV(d))
	};
	c.prototype.SetVVV = function(b, c, d) {
		this.col1.SetV(b);
		this.col2.SetV(c);
		this.col3.SetV(d)
	};
	c.prototype.Copy = function() {
		return new c(this.col1, this.col2, this.col3)
	};
	c.prototype.SetM = function(b) {
		this.col1.SetV(b.col1);
		this.col2.SetV(b.col2);
		this.col3.SetV(b.col3)
	};
	c.prototype.AddM = function(b) {
		this.col1.x += b.col1.x;
		this.col1.y += b.col1.y;
		this.col1.z += b.col1.z;
		this.col2.x += b.col2.x;
		this.col2.y += b.col2.y;
		this.col2.z += b.col2.z;
		this.col3.x += b.col3.x;
		this.col3.y += b.col3.y;
		this.col3.z += b.col3.z
	};
	c.prototype.SetIdentity = function() {
		this.col1.x = 1;
		this.col2.x = 0;
		this.col3.x = 0;
		this.col1.y = 0;
		this.col2.y = 1;
		this.col3.y = 0;
		this.col1.z = 0;
		this.col2.z = 0;
		this.col3.z = 1
	};
	c.prototype.SetZero = function() {
		this.col1.x = 0;
		this.col2.x = 0;
		this.col3.x = 0;
		this.col1.y = 0;
		this.col2.y = 0;
		this.col3.y = 0;
		this.col1.z = 0;
		this.col2.z = 0;
		this.col3.z = 0
	};
	c.prototype.Solve22 = function(b, c, d) {
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		var e = this.col1.x,
			f = this.col2.x,
			g = this.col1.y,
			m = this.col2.y,
			E = e * m - f * g;
		0 != E && (E = 1 / E);
		b.x = E * (m * c - f * d);
		b.y = E * (e * d - g * c);
		return b
	};
	c.prototype.Solve33 = function(b, c, d, e) {
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		void 0 === e && (e = 0);
		var f = this.col1.x,
			g = this.col1.y,
			m = this.col1.z,
			E = this.col2.x,
			F = this.col2.y,
			s = this.col2.z,
			I = this.col3.x,
			G = this.col3.y,
			C = this.col3.z,
			H = f * (F * C - s * G) + g * (s * I - E * C) + m * (E * G - F * I);
		0 != H && (H = 1 / H);
		b.x = H * (c * (F * C - s * G) + d * (s * I - E * C) + e * (E * G - F * I));
		b.y = H * (f * (d * C - e * G) + g * (e * I - c * C) + m * (c * G - d * I));
		b.z = H * (f * (F * e - s * d) + g * (s * c - E * e) + m * (E * d - F * c));
		return b
	};
	d.b2Math = function() {};
	d.IsValid = function(b) {
		void 0 === b && (b = 0);
		return isFinite(b)
	};
	d.Dot = function(b, c) {
		return b.x * c.x + b.y * c.y
	};
	d.CrossVV = function(b, c) {
		return b.x * c.y - b.y * c.x
	};
	d.CrossVF = function(b, c) {
		void 0 === c && (c = 0);
		return new g(c * b.y, -c * b.x)
	};
	d.CrossFV = function(b, c) {
		void 0 === b && (b = 0);
		return new g(-b * c.y, b * c.x)
	};
	d.MulMV = function(b, c) {
		return new g(b.col1.x * c.x + b.col2.x * c.y, b.col1.y * c.x + b.col2.y * c.y)
	};
	d.MulTMV = function(b, c) {
		return new g(d.Dot(c, b.col1), d.Dot(c, b.col2))
	};
	d.MulX = function(b, c) {
		var e = d.MulMV(b.R, c);
		e.x += b.position.x;
		e.y += b.position.y;
		return e
	};
	d.MulXT = function(b, c) {
		var e = d.SubtractVV(c, b.position),
			f = e.x * b.R.col1.x + e.y * b.R.col1.y;
		e.y = e.x * b.R.col2.x + e.y * b.R.col2.y;
		e.x = f;
		return e
	};
	d.AddVV = function(b, c) {
		return new g(b.x + c.x, b.y + c.y)
	};
	d.SubtractVV = function(b, c) {
		return new g(b.x - c.x, b.y - c.y)
	};
	d.Distance = function(b, c) {
		var d = b.x - c.x,
			e = b.y - c.y;
		return Math.sqrt(d * d + e * e)
	};
	d.DistanceSquared = function(b, c) {
		var d = b.x - c.x,
			e = b.y - c.y;
		return d * d + e * e
	};
	d.MulFV = function(b, c) {
		void 0 === b && (b = 0);
		return new g(b * c.x, b * c.y)
	};
	d.AddMM = function(c, e) {
		return b.FromVV(d.AddVV(c.col1, e.col1), d.AddVV(c.col2, e.col2))
	};
	d.MulMM = function(c, e) {
		return b.FromVV(d.MulMV(c, e.col1), d.MulMV(c, e.col2))
	};
	d.MulTMM = function(c, e) {
		var f = new g(d.Dot(c.col1, e.col1), d.Dot(c.col2, e.col1)),
			m = new g(d.Dot(c.col1, e.col2), d.Dot(c.col2, e.col2));
		return b.FromVV(f, m)
	};
	d.Abs = function(b) {
		void 0 === b && (b = 0);
		return 0 < b ? b : -b
	};
	d.AbsV = function(b) {
		return new g(d.Abs(b.x), d.Abs(b.y))
	};
	d.AbsM = function(c) {
		return b.FromVV(d.AbsV(c.col1), d.AbsV(c.col2))
	};
	d.Min = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		return b < c ? b : c
	};
	d.MinV = function(b, c) {
		return new g(d.Min(b.x, c.x), d.Min(b.y, c.y))
	};
	d.Max = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		return b > c ? b : c
	};
	d.MaxV = function(b, c) {
		return new g(d.Max(b.x, c.x), d.Max(b.y, c.y))
	};
	d.Clamp = function(b, c, d) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		return b < c ? c : b > d ? d : b
	};
	d.ClampV = function(b, c, e) {
		return d.MaxV(c, d.MinV(b, e))
	};
	d.Swap = function(b, c) {
		var d = b[0];
		b[0] = c[0];
		c[0] = d
	};
	d.Random = function() {
		return 2 * Math.random() - 1
	};
	d.RandomRange = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		var d = Math.random();
		return (c - b) * d + b
	};
	d.NextPowerOfTwo = function(b) {
		void 0 === b && (b = 0);
		b |= b >> 1 & 2147483647;
		b |= b >> 2 & 1073741823;
		b |= b >> 4 & 268435455;
		b |= b >> 8 & 16777215;
		return (b | b >> 16 & 65535) + 1
	};
	d.IsPowerOfTwo = function(b) {
		void 0 === b && (b = 0);
		return 0 < b && 0 == (b & b - 1)
	};
	Box2D.postDefs.push(function() {
		Box2D.Common.Math.b2Math.b2Vec2_zero = new g(0, 0);
		Box2D.Common.Math.b2Math.b2Mat22_identity = b.FromVV(new g(1, 0), new g(0, 1));
		Box2D.Common.Math.b2Math.b2Transform_identity = new f(d.b2Vec2_zero, d.b2Mat22_identity)
	});
	e.b2Sweep = function() {
		this.localCenter = new g;
		this.c0 = new g;
		this.c = new g
	};
	e.prototype.Set = function(b) {
		this.localCenter.SetV(b.localCenter);
		this.c0.SetV(b.c0);
		this.c.SetV(b.c);
		this.a0 = b.a0;
		this.a = b.a;
		this.t0 = b.t0
	};
	e.prototype.Copy = function() {
		var b = new e;
		b.localCenter.SetV(this.localCenter);
		b.c0.SetV(this.c0);
		b.c.SetV(this.c);
		b.a0 = this.a0;
		b.a = this.a;
		b.t0 = this.t0;
		return b
	};
	e.prototype.GetTransform = function(b, c) {
		void 0 === c && (c = 0);
		b.position.x = (1 - c) * this.c0.x + c * this.c.x;
		b.position.y = (1 - c) * this.c0.y + c * this.c.y;
		b.R.Set((1 - c) * this.a0 + c * this.a);
		var d = b.R;
		b.position.x -= d.col1.x * this.localCenter.x + d.col2.x * this.localCenter.y;
		b.position.y -= d.col1.y * this.localCenter.x + d.col2.y * this.localCenter.y
	};
	e.prototype.Advance = function(b) {
		void 0 === b && (b = 0);
		if (this.t0 < b && 1 - this.t0 > Number.MIN_VALUE) {
			var c = (b - this.t0) / (1 - this.t0);
			this.c0.x = (1 - c) * this.c0.x + c * this.c.x;
			this.c0.y = (1 - c) * this.c0.y + c * this.c.y;
			this.a0 = (1 - c) * this.a0 + c * this.a;
			this.t0 = b
		}
	};
	f.b2Transform = function() {
		this.position = new g;
		this.R = new b
	};
	f.prototype.b2Transform = function(b, c) {
		void 0 === b && (b = null);
		void 0 === c && (c = null);
		b && (this.position.SetV(b), this.R.SetM(c))
	};
	f.prototype.Initialize = function(b, c) {
		this.position.SetV(b);
		this.R.SetM(c)
	};
	f.prototype.SetIdentity = function() {
		this.position.SetZero();
		this.R.SetIdentity()
	};
	f.prototype.Set = function(b) {
		this.position.SetV(b.position);
		this.R.SetM(b.R)
	};
	f.prototype.GetAngle = function() {
		return Math.atan2(this.R.col1.y, this.R.col1.x)
	};
	g.b2Vec2 = function() {};
	g.prototype.b2Vec2 = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		this.x = b;
		this.y = c
	};
	g.prototype.SetZero = function() {
		this.y = this.x = 0
	};
	g.prototype.Set = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		this.x = b;
		this.y = c
	};
	g.prototype.SetV = function(b) {
		this.x = b.x;
		this.y = b.y
	};
	g.prototype.GetNegative = function() {
		return new g(-this.x, -this.y)
	};
	g.prototype.NegativeSelf = function() {
		this.x = -this.x;
		this.y = -this.y
	};
	g.Make = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		return new g(b, c)
	};
	g.prototype.Copy = function() {
		return new g(this.x, this.y)
	};
	g.prototype.Add = function(b) {
		this.x += b.x;
		this.y += b.y
	};
	g.prototype.Subtract = function(b) {
		this.x -= b.x;
		this.y -= b.y
	};
	g.prototype.Multiply = function(b) {
		void 0 === b && (b = 0);
		this.x *= b;
		this.y *= b
	};
	g.prototype.MulM = function(b) {
		var c = this.x;
		this.x = b.col1.x * c + b.col2.x * this.y;
		this.y = b.col1.y * c + b.col2.y * this.y
	};
	g.prototype.MulTM = function(b) {
		var c = d.Dot(this, b.col1);
		this.y = d.Dot(this, b.col2);
		this.x = c
	};
	g.prototype.CrossVF = function(b) {
		void 0 === b && (b = 0);
		var c = this.x;
		this.x = b * this.y;
		this.y = -b * c
	};
	g.prototype.CrossFV = function(b) {
		void 0 === b && (b = 0);
		var c = this.x;
		this.x = -b * this.y;
		this.y = b * c
	};
	g.prototype.MinV = function(b) {
		this.x = this.x < b.x ? this.x : b.x;
		this.y = this.y < b.y ? this.y : b.y
	};
	g.prototype.MaxV = function(b) {
		this.x = this.x > b.x ? this.x : b.x;
		this.y = this.y > b.y ? this.y : b.y
	};
	g.prototype.Abs = function() {
		0 > this.x && (this.x = -this.x);
		0 > this.y && (this.y = -this.y)
	};
	g.prototype.Length = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	};
	g.prototype.LengthSquared = function() {
		return this.x * this.x + this.y * this.y
	};
	g.prototype.Normalize = function() {
		var b = Math.sqrt(this.x * this.x + this.y * this.y);
		if (b < Number.MIN_VALUE) return 0;
		var c = 1 / b;
		this.x *= c;
		this.y *= c;
		return b
	};
	g.prototype.IsValid = function() {
		return d.IsValid(this.x) && d.IsValid(this.y)
	};
	m.b2Vec3 = function() {};
	m.prototype.b2Vec3 = function(b, c, d) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		this.x = b;
		this.y = c;
		this.z = d
	};
	m.prototype.SetZero = function() {
		this.x = this.y = this.z = 0
	};
	m.prototype.Set = function(b, c, d) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		this.x = b;
		this.y = c;
		this.z = d
	};
	m.prototype.SetV = function(b) {
		this.x = b.x;
		this.y = b.y;
		this.z = b.z
	};
	m.prototype.GetNegative = function() {
		return new m(-this.x, -this.y, -this.z)
	};
	m.prototype.NegativeSelf = function() {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z
	};
	m.prototype.Copy = function() {
		return new m(this.x, this.y, this.z)
	};
	m.prototype.Add = function(b) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z
	};
	m.prototype.Subtract = function(b) {
		this.x -= b.x;
		this.y -= b.y;
		this.z -= b.z
	};
	m.prototype.Multiply = function(b) {
		void 0 === b && (b = 0);
		this.x *= b;
		this.y *= b;
		this.z *= b
	}
})();
(function() {
	var b = Box2D.Common.Math.b2Math,
		c = Box2D.Common.Math.b2Sweep,
		d = Box2D.Common.Math.b2Transform,
		e = Box2D.Common.Math.b2Vec2,
		f = Box2D.Common.b2Color,
		g = Box2D.Common.b2Settings,
		m = Box2D.Collision.b2AABB,
		l = Box2D.Collision.b2ContactPoint,
		j = Box2D.Collision.b2DynamicTreeBroadPhase,
		q = Box2D.Collision.b2RayCastInput,
		z = Box2D.Collision.b2RayCastOutput,
		y = Box2D.Collision.Shapes.b2CircleShape,
		A = Box2D.Collision.Shapes.b2EdgeShape,
		B = Box2D.Collision.Shapes.b2MassData,
		E = Box2D.Collision.Shapes.b2PolygonShape,
		F = Box2D.Collision.Shapes.b2Shape,
		s = Box2D.Dynamics.b2Body,
		I = Box2D.Dynamics.b2BodyDef,
		G = Box2D.Dynamics.b2ContactFilter,
		C = Box2D.Dynamics.b2ContactImpulse,
		H = Box2D.Dynamics.b2ContactListener,
		R = Box2D.Dynamics.b2ContactManager,
		K = Box2D.Dynamics.b2DebugDraw,
		fa = Box2D.Dynamics.b2DestructionListener,
		O = Box2D.Dynamics.b2FilterData,
		P = Box2D.Dynamics.b2Fixture,
		ba = Box2D.Dynamics.b2FixtureDef,
		V = Box2D.Dynamics.b2Island,
		r = Box2D.Dynamics.b2TimeStep,
		t = Box2D.Dynamics.b2World,
		J = Box2D.Dynamics.Contacts.b2Contact,
		D = Box2D.Dynamics.Contacts.b2ContactFactory,
		N = Box2D.Dynamics.Contacts.b2ContactSolver,
		aa = Box2D.Dynamics.Joints.b2Joint,
		Q = Box2D.Dynamics.Joints.b2PulleyJoint;
	s.b2Body = function() {
		this.m_xf = new d;
		this.m_sweep = new c;
		this.m_linearVelocity = new e;
		this.m_force = new e
	};
	s.prototype.connectEdges = function(c, d, e) {
		void 0 === e && (e = 0);
		var f = Math.atan2(d.GetDirectionVector().y, d.GetDirectionVector().x);
		e = b.MulFV(Math.tan(0.5 * (f - e)), d.GetDirectionVector());
		e = b.SubtractVV(e, d.GetNormalVector());
		e = b.MulFV(g.b2_toiSlop, e);
		e = b.AddVV(e, d.GetVertex1());
		var j = b.AddVV(c.GetDirectionVector(), d.GetDirectionVector());
		j.Normalize();
		var r = 0 < b.Dot(c.GetDirectionVector(), d.GetNormalVector());
		c.SetNextEdge(d, e, j, r);
		d.SetPrevEdge(c, e, j, r);
		return f
	};
	s.prototype.CreateFixture = function(b) {
		if (!0 == this.m_world.IsLocked()) return null;
		var c = new P;
		c.Create(this, this.m_xf, b);
		this.m_flags & s.e_activeFlag && c.CreateProxy(this.m_world.m_contactManager.m_broadPhase, this.m_xf);
		c.m_next = this.m_fixtureList;
		this.m_fixtureList = c;
		++this.m_fixtureCount;
		c.m_body = this;
		0 < c.m_density && this.ResetMassData();
		this.m_world.m_flags |= t.e_newFixture;
		return c
	};
	s.prototype.CreateFixture2 = function(b, c) {
		void 0 === c && (c = 0);
		var d = new ba;
		d.shape = b;
		d.density = c;
		return this.CreateFixture(d)
	};
	s.prototype.DestroyFixture = function(b) {
		if (!0 != this.m_world.IsLocked()) {
			for (var c = this.m_fixtureList, d = null; null != c;) {
				if (c == b) {
					d ? d.m_next = b.m_next : this.m_fixtureList = b.m_next;
					break
				}
				d = c;
				c = c.m_next
			}
			for (c = this.m_contactList; c;) {
				var d = c.contact,
					c = c.next,
					e = d.GetFixtureA(),
					f = d.GetFixtureB();
				(b == e || b == f) && this.m_world.m_contactManager.Destroy(d)
			}
			this.m_flags & s.e_activeFlag && b.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
			b.Destroy();
			b.m_body = null;
			b.m_next = null;
			--this.m_fixtureCount;
			this.ResetMassData()
		}
	};
	s.prototype.SetPositionAndAngle = function(b, c) {
		void 0 === c && (c = 0);
		var d;
		if (!0 != this.m_world.IsLocked()) {
			this.m_xf.R.Set(c);
			this.m_xf.position.SetV(b);
			d = this.m_xf.R;
			var e = this.m_sweep.localCenter;
			this.m_sweep.c.x = d.col1.x * e.x + d.col2.x * e.y;
			this.m_sweep.c.y = d.col1.y * e.x + d.col2.y * e.y;
			this.m_sweep.c.x += this.m_xf.position.x;
			this.m_sweep.c.y += this.m_xf.position.y;
			this.m_sweep.c0.SetV(this.m_sweep.c);
			this.m_sweep.a0 = this.m_sweep.a = c;
			e = this.m_world.m_contactManager.m_broadPhase;
			for (d = this.m_fixtureList; d; d = d.m_next) d.Synchronize(e, this.m_xf, this.m_xf);
			this.m_world.m_contactManager.FindNewContacts()
		}
	};
	s.prototype.SetTransform = function(b) {
		this.SetPositionAndAngle(b.position, b.GetAngle())
	};
	s.prototype.GetTransform = function() {
		return this.m_xf
	};
	s.prototype.GetPosition = function() {
		return this.m_xf.position
	};
	s.prototype.SetPosition = function(b) {
		this.SetPositionAndAngle(b, this.GetAngle())
	};
	s.prototype.GetAngle = function() {
		return this.m_sweep.a
	};
	s.prototype.SetAngle = function(b) {
		void 0 === b && (b = 0);
		this.SetPositionAndAngle(this.GetPosition(), b)
	};
	s.prototype.GetWorldCenter = function() {
		return this.m_sweep.c
	};
	s.prototype.GetLocalCenter = function() {
		return this.m_sweep.localCenter
	};
	s.prototype.SetLinearVelocity = function(b) {
		this.m_type != s.b2_staticBody && this.m_linearVelocity.SetV(b)
	};
	s.prototype.GetLinearVelocity = function() {
		return this.m_linearVelocity
	};
	s.prototype.SetAngularVelocity = function(b) {
		void 0 === b && (b = 0);
		this.m_type != s.b2_staticBody && (this.m_angularVelocity = b)
	};
	s.prototype.GetAngularVelocity = function() {
		return this.m_angularVelocity
	};
	s.prototype.GetDefinition = function() {
		var b = new I;
		b.type = this.GetType();
		b.allowSleep = (this.m_flags & s.e_allowSleepFlag) == s.e_allowSleepFlag;
		b.angle = this.GetAngle();
		b.angularDamping = this.m_angularDamping;
		b.angularVelocity = this.m_angularVelocity;
		b.fixedRotation = (this.m_flags & s.e_fixedRotationFlag) == s.e_fixedRotationFlag;
		b.bullet = (this.m_flags & s.e_bulletFlag) == s.e_bulletFlag;
		b.awake = (this.m_flags & s.e_awakeFlag) == s.e_awakeFlag;
		b.linearDamping = this.m_linearDamping;
		b.linearVelocity.SetV(this.GetLinearVelocity());
		b.position = this.GetPosition();
		b.userData = this.GetUserData();
		return b
	};
	s.prototype.ApplyForce = function(b, c) {
		this.m_type == s.b2_dynamicBody && (!1 == this.IsAwake() && this.SetAwake(!0), this.m_force.x += b.x, this.m_force.y += b.y, this.m_torque += (c.x - this.m_sweep.c.x) * b.y - (c.y - this.m_sweep.c.y) * b.x)
	};
	s.prototype.ApplyTorque = function(b) {
		void 0 === b && (b = 0);
		this.m_type == s.b2_dynamicBody && (!1 == this.IsAwake() && this.SetAwake(!0), this.m_torque += b)
	};
	s.prototype.ApplyImpulse = function(b, c) {
		this.m_type == s.b2_dynamicBody && (!1 == this.IsAwake() && this.SetAwake(!0), this.m_linearVelocity.x += this.m_invMass * b.x, this.m_linearVelocity.y += this.m_invMass * b.y, this.m_angularVelocity += this.m_invI * ((c.x - this.m_sweep.c.x) * b.y - (c.y - this.m_sweep.c.y) * b.x))
	};
	s.prototype.Split = function(c) {
		for (var d = this.GetLinearVelocity().Copy(), e = this.GetAngularVelocity(), f = this.GetWorldCenter(), g = this.m_world.CreateBody(this.GetDefinition()), j, r = this.m_fixtureList; r;)
			if (c(r)) {
				var l = r.m_next;
				j ? j.m_next = l : this.m_fixtureList = l;
				this.m_fixtureCount--;
				r.m_next = g.m_fixtureList;
				g.m_fixtureList = r;
				g.m_fixtureCount++;
				r.m_body = g;
				r = l
			} else j = r, r = r.m_next;
		this.ResetMassData();
		g.ResetMassData();
		j = this.GetWorldCenter();
		c = g.GetWorldCenter();
		j = b.AddVV(d, b.CrossFV(e, b.SubtractVV(j, f)));
		d = b.AddVV(d, b.CrossFV(e, b.SubtractVV(c, f)));
		this.SetLinearVelocity(j);
		g.SetLinearVelocity(d);
		this.SetAngularVelocity(e);
		g.SetAngularVelocity(e);
		this.SynchronizeFixtures();
		g.SynchronizeFixtures();
		return g
	};
	s.prototype.Merge = function(b) {
		var c;
		for (c = b.m_fixtureList; c;) {
			var d = c.m_next;
			b.m_fixtureCount--;
			c.m_next = this.m_fixtureList;
			this.m_fixtureList = c;
			this.m_fixtureCount++;
			c.m_body = f;
			c = d
		}
		e.m_fixtureCount = 0;
		var e = this,
			f = b;
		e.GetWorldCenter();
		f.GetWorldCenter();
		e.GetLinearVelocity().Copy();
		f.GetLinearVelocity().Copy();
		e.GetAngularVelocity();
		f.GetAngularVelocity();
		e.ResetMassData();
		this.SynchronizeFixtures()
	};
	s.prototype.GetMass = function() {
		return this.m_mass
	};
	s.prototype.GetInertia = function() {
		return this.m_I
	};
	s.prototype.GetMassData = function(b) {
		b.mass = this.m_mass;
		b.I = this.m_I;
		b.center.SetV(this.m_sweep.localCenter)
	};
	s.prototype.SetMassData = function(c) {
		g.b2Assert(!1 == this.m_world.IsLocked());
		if (!0 != this.m_world.IsLocked() && this.m_type == s.b2_dynamicBody) {
			this.m_invI = this.m_I = this.m_invMass = 0;
			this.m_mass = c.mass;
			0 >= this.m_mass && (this.m_mass = 1);
			this.m_invMass = 1 / this.m_mass;
			0 < c.I && 0 == (this.m_flags & s.e_fixedRotationFlag) && (this.m_I = c.I - this.m_mass * (c.center.x * c.center.x + c.center.y * c.center.y), this.m_invI = 1 / this.m_I);
			var d = this.m_sweep.c.Copy();
			this.m_sweep.localCenter.SetV(c.center);
			this.m_sweep.c0.SetV(b.MulX(this.m_xf, this.m_sweep.localCenter));
			this.m_sweep.c.SetV(this.m_sweep.c0);
			this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - d.y);
			this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - d.x)
		}
	};
	s.prototype.ResetMassData = function() {
		this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
		this.m_sweep.localCenter.SetZero();
		if (!(this.m_type == s.b2_staticBody || this.m_type == s.b2_kinematicBody)) {
			for (var c = e.Make(0, 0), d = this.m_fixtureList; d; d = d.m_next)
				if (0 != d.m_density) {
					var f = d.GetMassData();
					this.m_mass += f.mass;
					c.x += f.center.x * f.mass;
					c.y += f.center.y * f.mass;
					this.m_I += f.I
				}
			0 < this.m_mass ? (this.m_invMass = 1 / this.m_mass, c.x *= this.m_invMass, c.y *= this.m_invMass) : this.m_invMass = this.m_mass = 1;
			0 < this.m_I && 0 == (this.m_flags & s.e_fixedRotationFlag) ? (this.m_I -= this.m_mass * (c.x * c.x + c.y * c.y), this.m_I *= this.m_inertiaScale, g.b2Assert(0 < this.m_I), this.m_invI = 1 / this.m_I) : this.m_invI = this.m_I = 0;
			d = this.m_sweep.c.Copy();
			this.m_sweep.localCenter.SetV(c);
			this.m_sweep.c0.SetV(b.MulX(this.m_xf, this.m_sweep.localCenter));
			this.m_sweep.c.SetV(this.m_sweep.c0);
			this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - d.y);
			this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - d.x)
		}
	};
	s.prototype.GetWorldPoint = function(b) {
		var c = this.m_xf.R;
		b = new e(c.col1.x * b.x + c.col2.x * b.y, c.col1.y * b.x + c.col2.y * b.y);
		b.x += this.m_xf.position.x;
		b.y += this.m_xf.position.y;
		return b
	};
	s.prototype.GetWorldVector = function(c) {
		return b.MulMV(this.m_xf.R, c)
	};
	s.prototype.GetLocalPoint = function(c) {
		return b.MulXT(this.m_xf, c)
	};
	s.prototype.GetLocalVector = function(c) {
		return b.MulTMV(this.m_xf.R, c)
	};
	s.prototype.GetLinearVelocityFromWorldPoint = function(b) {
		return new e(this.m_linearVelocity.x - this.m_angularVelocity * (b.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (b.x - this.m_sweep.c.x))
	};
	s.prototype.GetLinearVelocityFromLocalPoint = function(b) {
		var c = this.m_xf.R;
		b = new e(c.col1.x * b.x + c.col2.x * b.y, c.col1.y * b.x + c.col2.y * b.y);
		b.x += this.m_xf.position.x;
		b.y += this.m_xf.position.y;
		return new e(this.m_linearVelocity.x - this.m_angularVelocity * (b.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (b.x - this.m_sweep.c.x))
	};
	s.prototype.GetLinearDamping = function() {
		return this.m_linearDamping
	};
	s.prototype.SetLinearDamping = function(b) {
		void 0 === b && (b = 0);
		this.m_linearDamping = b
	};
	s.prototype.GetAngularDamping = function() {
		return this.m_angularDamping
	};
	s.prototype.SetAngularDamping = function(b) {
		void 0 === b && (b = 0);
		this.m_angularDamping = b
	};
	s.prototype.SetType = function(b) {
		void 0 === b && (b = 0);
		if (this.m_type != b) {
			this.m_type = b;
			this.ResetMassData();
			this.m_type == s.b2_staticBody && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0);
			this.SetAwake(!0);
			this.m_force.SetZero();
			this.m_torque = 0;
			for (b = this.m_contactList; b; b = b.next) b.contact.FlagForFiltering()
		}
	};
	s.prototype.GetType = function() {
		return this.m_type
	};
	s.prototype.SetBullet = function(b) {
		this.m_flags = b ? this.m_flags | s.e_bulletFlag : this.m_flags & ~s.e_bulletFlag
	};
	s.prototype.IsBullet = function() {
		return (this.m_flags & s.e_bulletFlag) == s.e_bulletFlag
	};
	s.prototype.SetSleepingAllowed = function(b) {
		b ? this.m_flags |= s.e_allowSleepFlag : (this.m_flags &= ~s.e_allowSleepFlag, this.SetAwake(!0))
	};
	s.prototype.SetAwake = function(b) {
		b ? (this.m_flags |= s.e_awakeFlag, this.m_sleepTime = 0) : (this.m_flags &= ~s.e_awakeFlag, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
	};
	s.prototype.IsAwake = function() {
		return (this.m_flags & s.e_awakeFlag) == s.e_awakeFlag
	};
	s.prototype.SetFixedRotation = function(b) {
		this.m_flags = b ? this.m_flags | s.e_fixedRotationFlag : this.m_flags & ~s.e_fixedRotationFlag;
		this.ResetMassData()
	};
	s.prototype.IsFixedRotation = function() {
		return (this.m_flags & s.e_fixedRotationFlag) == s.e_fixedRotationFlag
	};
	s.prototype.SetActive = function(b) {
		if (b != this.IsActive()) {
			var c;
			if (b) {
				this.m_flags |= s.e_activeFlag;
				b = this.m_world.m_contactManager.m_broadPhase;
				for (c = this.m_fixtureList; c; c = c.m_next) c.CreateProxy(b, this.m_xf)
			} else {
				this.m_flags &= ~s.e_activeFlag;
				b = this.m_world.m_contactManager.m_broadPhase;
				for (c = this.m_fixtureList; c; c = c.m_next) c.DestroyProxy(b);
				for (b = this.m_contactList; b;) c = b, b = b.next, this.m_world.m_contactManager.Destroy(c.contact);
				this.m_contactList = null
			}
		}
	};
	s.prototype.IsActive = function() {
		return (this.m_flags & s.e_activeFlag) == s.e_activeFlag
	};
	s.prototype.IsSleepingAllowed = function() {
		return (this.m_flags & s.e_allowSleepFlag) == s.e_allowSleepFlag
	};
	s.prototype.GetFixtureList = function() {
		return this.m_fixtureList
	};
	s.prototype.GetJointList = function() {
		return this.m_jointList
	};
	s.prototype.GetControllerList = function() {
		return this.m_controllerList
	};
	s.prototype.GetContactList = function() {
		return this.m_contactList
	};
	s.prototype.GetNext = function() {
		return this.m_next
	};
	s.prototype.GetUserData = function() {
		return this.m_userData
	};
	s.prototype.SetUserData = function(b) {
		this.m_userData = b
	};
	s.prototype.GetWorld = function() {
		return this.m_world
	};
	s.prototype.b2Body = function(b, c) {
		this.m_flags = 0;
		b.bullet && (this.m_flags |= s.e_bulletFlag);
		b.fixedRotation && (this.m_flags |= s.e_fixedRotationFlag);
		b.allowSleep && (this.m_flags |= s.e_allowSleepFlag);
		b.awake && (this.m_flags |= s.e_awakeFlag);
		b.active && (this.m_flags |= s.e_activeFlag);
		this.m_world = c;
		this.m_xf.position.SetV(b.position);
		this.m_xf.R.Set(b.angle);
		this.m_sweep.localCenter.SetZero();
		this.m_sweep.t0 = 1;
		this.m_sweep.a0 = this.m_sweep.a = b.angle;
		var d = this.m_xf.R,
			e = this.m_sweep.localCenter;
		this.m_sweep.c.x = d.col1.x * e.x + d.col2.x * e.y;
		this.m_sweep.c.y = d.col1.y * e.x + d.col2.y * e.y;
		this.m_sweep.c.x += this.m_xf.position.x;
		this.m_sweep.c.y += this.m_xf.position.y;
		this.m_sweep.c0.SetV(this.m_sweep.c);
		this.m_contactList = this.m_controllerList = this.m_jointList = null;
		this.m_controllerCount = 0;
		this.m_next = this.m_prev = null;
		this.m_linearVelocity.SetV(b.linearVelocity);
		this.m_angularVelocity = b.angularVelocity;
		this.m_linearDamping = b.linearDamping;
		this.m_angularDamping = b.angularDamping;
		this.m_force.Set(0, 0);
		this.m_sleepTime = this.m_torque = 0;
		this.m_type = b.type;
		this.m_invMass = this.m_type == s.b2_dynamicBody ? this.m_mass = 1 : this.m_mass = 0;
		this.m_invI = this.m_I = 0;
		this.m_inertiaScale = b.inertiaScale;
		this.m_userData = b.userData;
		this.m_fixtureList = null;
		this.m_fixtureCount = 0
	};
	s.prototype.SynchronizeFixtures = function() {
		var b = s.s_xf1;
		b.R.Set(this.m_sweep.a0);
		var c = b.R,
			d = this.m_sweep.localCenter;
		b.position.x = this.m_sweep.c0.x - (c.col1.x * d.x + c.col2.x * d.y);
		b.position.y = this.m_sweep.c0.y - (c.col1.y * d.x + c.col2.y * d.y);
		d = this.m_world.m_contactManager.m_broadPhase;
		for (c = this.m_fixtureList; c; c = c.m_next) c.Synchronize(d, b, this.m_xf)
	};
	s.prototype.SynchronizeTransform = function() {
		this.m_xf.R.Set(this.m_sweep.a);
		var b = this.m_xf.R,
			c = this.m_sweep.localCenter;
		this.m_xf.position.x = this.m_sweep.c.x - (b.col1.x * c.x + b.col2.x * c.y);
		this.m_xf.position.y = this.m_sweep.c.y - (b.col1.y * c.x + b.col2.y * c.y)
	};
	s.prototype.ShouldCollide = function(b) {
		if (this.m_type != s.b2_dynamicBody && b.m_type != s.b2_dynamicBody) return !1;
		for (var c = this.m_jointList; c; c = c.next)
			if (c.other == b && !1 == c.joint.m_collideConnected) return !1;
		return !0
	};
	s.prototype.Advance = function(b) {
		void 0 === b && (b = 0);
		this.m_sweep.Advance(b);
		this.m_sweep.c.SetV(this.m_sweep.c0);
		this.m_sweep.a = this.m_sweep.a0;
		this.SynchronizeTransform()
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.b2Body.s_xf1 = new d;
		Box2D.Dynamics.b2Body.e_islandFlag = 1;
		Box2D.Dynamics.b2Body.e_awakeFlag = 2;
		Box2D.Dynamics.b2Body.e_allowSleepFlag = 4;
		Box2D.Dynamics.b2Body.e_bulletFlag = 8;
		Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
		Box2D.Dynamics.b2Body.e_activeFlag = 32;
		Box2D.Dynamics.b2Body.b2_staticBody = 0;
		Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
		Box2D.Dynamics.b2Body.b2_dynamicBody = 2
	});
	I.b2BodyDef = function() {
		this.position = new e;
		this.linearVelocity = new e
	};
	I.prototype.b2BodyDef = function() {
		this.userData = null;
		this.position.Set(0, 0);
		this.angle = 0;
		this.linearVelocity.Set(0, 0);
		this.angularDamping = this.linearDamping = this.angularVelocity = 0;
		this.awake = this.allowSleep = !0;
		this.bullet = this.fixedRotation = !1;
		this.type = s.b2_staticBody;
		this.active = !0;
		this.inertiaScale = 1
	};
	G.b2ContactFilter = function() {};
	G.prototype.ShouldCollide = function(b, c) {
		var d = b.GetFilterData(),
			e = c.GetFilterData();
		return d.groupIndex == e.groupIndex && 0 != d.groupIndex ? 0 < d.groupIndex : 0 != (d.maskBits & e.categoryBits) && 0 != (d.categoryBits & e.maskBits)
	};
	G.prototype.RayCollide = function(b, c) {
		return !b ? !0 : this.ShouldCollide(b instanceof P ? b : null, c)
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new G
	});
	C.b2ContactImpulse = function() {
		this.normalImpulses = new Vector_a2j_Number(g.b2_maxManifoldPoints);
		this.tangentImpulses = new Vector_a2j_Number(g.b2_maxManifoldPoints)
	};
	H.b2ContactListener = function() {};
	H.prototype.BeginContact = function() {};
	H.prototype.EndContact = function() {};
	H.prototype.PreSolve = function() {};
	H.prototype.PostSolve = function() {};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.b2ContactListener.b2_defaultListener = new H
	});
	R.b2ContactManager = function() {};
	R.prototype.b2ContactManager = function() {
		this.m_world = null;
		this.m_contactCount = 0;
		this.m_contactFilter = G.b2_defaultFilter;
		this.m_contactListener = H.b2_defaultListener;
		this.m_contactFactory = new D(this.m_allocator);
		this.m_broadPhase = new j
	};
	R.prototype.AddPair = function(b, c) {
		var d = b instanceof P ? b : null,
			e = c instanceof P ? c : null,
			f = d.GetBody(),
			g = e.GetBody();
		if (f != g) {
			for (var j = g.GetContactList(); j;) {
				if (j.other == f) {
					var r = j.contact.GetFixtureA(),
						l = j.contact.GetFixtureB();
					if (r == d && l == e || r == e && l == d) return
				}
				j = j.next
			}!1 != g.ShouldCollide(f) && !1 != this.m_contactFilter.ShouldCollide(d, e) && (j = this.m_contactFactory.Create(d, e), d = j.GetFixtureA(), e = j.GetFixtureB(), f = d.m_body, g = e.m_body, j.m_prev = null, j.m_next = this.m_world.m_contactList, null != this.m_world.m_contactList && (this.m_world.m_contactList.m_prev = j), this.m_world.m_contactList = j, j.m_nodeA.contact = j, j.m_nodeA.other = g, j.m_nodeA.prev = null, j.m_nodeA.next = f.m_contactList, null != f.m_contactList && (f.m_contactList.prev = j.m_nodeA), f.m_contactList = j.m_nodeA, j.m_nodeB.contact = j, j.m_nodeB.other = f, j.m_nodeB.prev = null, j.m_nodeB.next = g.m_contactList, null != g.m_contactList && (g.m_contactList.prev = j.m_nodeB), g.m_contactList = j.m_nodeB, ++this.m_world.m_contactCount)
		}
	};
	R.prototype.FindNewContacts = function() {
		this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
	};
	R.prototype.Destroy = function(b) {
		var c = b.GetFixtureA(),
			d = b.GetFixtureB(),
			c = c.GetBody(),
			d = d.GetBody();
		b.IsTouching() && this.m_contactListener.EndContact(b);
		b.m_prev && (b.m_prev.m_next = b.m_next);
		b.m_next && (b.m_next.m_prev = b.m_prev);
		b == this.m_world.m_contactList && (this.m_world.m_contactList = b.m_next);
		b.m_nodeA.prev && (b.m_nodeA.prev.next = b.m_nodeA.next);
		b.m_nodeA.next && (b.m_nodeA.next.prev = b.m_nodeA.prev);
		b.m_nodeA == c.m_contactList && (c.m_contactList = b.m_nodeA.next);
		b.m_nodeB.prev && (b.m_nodeB.prev.next = b.m_nodeB.next);
		b.m_nodeB.next && (b.m_nodeB.next.prev = b.m_nodeB.prev);
		b.m_nodeB == d.m_contactList && (d.m_contactList = b.m_nodeB.next);
		this.m_contactFactory.Destroy(b);
		--this.m_contactCount
	};
	R.prototype.Collide = function() {
		for (var b = this.m_world.m_contactList; b;) {
			var c = b.GetFixtureA(),
				d = b.GetFixtureB(),
				e = c.GetBody(),
				f = d.GetBody();
			if (!1 == e.IsAwake() && !1 == f.IsAwake()) b = b.GetNext();
			else {
				if (b.m_flags & J.e_filterFlag) {
					if (!1 == f.ShouldCollide(e)) {
						c = b;
						b = c.GetNext();
						this.Destroy(c);
						continue
					}
					if (!1 == this.m_contactFilter.ShouldCollide(c, d)) {
						c = b;
						b = c.GetNext();
						this.Destroy(c);
						continue
					}
					b.m_flags &= ~J.e_filterFlag
				}!1 == this.m_broadPhase.TestOverlap(c.m_proxy, d.m_proxy) ? (c = b, b = c.GetNext(), this.Destroy(c)) : (b.Update(this.m_contactListener), b = b.GetNext())
			}
		}
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.b2ContactManager.s_evalCP = new l
	});
	K.b2DebugDraw = function() {};
	K.prototype.b2DebugDraw = function() {};
	K.prototype.SetFlags = function() {};
	K.prototype.GetFlags = function() {};
	K.prototype.AppendFlags = function() {};
	K.prototype.ClearFlags = function() {};
	K.prototype.SetSprite = function() {};
	K.prototype.GetSprite = function() {};
	K.prototype.SetDrawScale = function() {};
	K.prototype.GetDrawScale = function() {};
	K.prototype.SetLineThickness = function() {};
	K.prototype.GetLineThickness = function() {};
	K.prototype.SetAlpha = function() {};
	K.prototype.GetAlpha = function() {};
	K.prototype.SetFillAlpha = function() {};
	K.prototype.GetFillAlpha = function() {};
	K.prototype.SetXFormScale = function() {};
	K.prototype.GetXFormScale = function() {};
	K.prototype.DrawPolygon = function() {};
	K.prototype.DrawSolidPolygon = function() {};
	K.prototype.DrawCircle = function() {};
	K.prototype.DrawSolidCircle = function() {};
	K.prototype.DrawSegment = function() {};
	K.prototype.DrawTransform = function() {};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1;
		Box2D.Dynamics.b2DebugDraw.e_jointBit = 2;
		Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4;
		Box2D.Dynamics.b2DebugDraw.e_pairBit = 8;
		Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16;
		Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
	});
	fa.b2DestructionListener = function() {};
	fa.prototype.SayGoodbyeJoint = function() {};
	fa.prototype.SayGoodbyeFixture = function() {};
	O.b2FilterData = function() {
		this.categoryBits = 1;
		this.maskBits = 65535;
		this.groupIndex = 0
	};
	O.prototype.Copy = function() {
		var b = new O;
		b.categoryBits = this.categoryBits;
		b.maskBits = this.maskBits;
		b.groupIndex = this.groupIndex;
		return b
	};
	P.b2Fixture = function() {
		this.m_filter = new O
	};
	P.prototype.GetType = function() {
		return this.m_shape.GetType()
	};
	P.prototype.GetShape = function() {
		return this.m_shape
	};
	P.prototype.SetSensor = function(b) {
		if (this.m_isSensor != b && (this.m_isSensor = b, null != this.m_body))
			for (b = this.m_body.GetContactList(); b;) {
				var c = b.contact,
					d = c.GetFixtureA(),
					e = c.GetFixtureB();
				if (d == this || e == this) c.SetSensor(d.IsSensor() || e.IsSensor());
				b = b.next
			}
	};
	P.prototype.IsSensor = function() {
		return this.m_isSensor
	};
	P.prototype.SetFilterData = function(b) {
		this.m_filter = b.Copy();
		if (!this.m_body)
			for (b = this.m_body.GetContactList(); b;) {
				var c = b.contact,
					d = c.GetFixtureA(),
					e = c.GetFixtureB();
				(d == this || e == this) && c.FlagForFiltering();
				b = b.next
			}
	};
	P.prototype.GetFilterData = function() {
		return this.m_filter.Copy()
	};
	P.prototype.GetBody = function() {
		return this.m_body
	};
	P.prototype.GetNext = function() {
		return this.m_next
	};
	P.prototype.GetUserData = function() {
		return this.m_userData
	};
	P.prototype.SetUserData = function(b) {
		this.m_userData = b
	};
	P.prototype.TestPoint = function(b) {
		return this.m_shape.TestPoint(this.m_body.GetTransform(), b)
	};
	P.prototype.RayCast = function(b, c) {
		return this.m_shape.RayCast(b, c, this.m_body.GetTransform())
	};
	P.prototype.GetMassData = function(b) {
		void 0 === b && (b = null);
		null == b && (b = new B);
		this.m_shape.ComputeMass(b, this.m_density);
		return b
	};
	P.prototype.SetDensity = function(b) {
		void 0 === b && (b = 0);
		this.m_density = b
	};
	P.prototype.GetDensity = function() {
		return this.m_density
	};
	P.prototype.GetFriction = function() {
		return this.m_friction
	};
	P.prototype.SetFriction = function(b) {
		void 0 === b && (b = 0);
		this.m_friction = b
	};
	P.prototype.GetRestitution = function() {
		return this.m_restitution
	};
	P.prototype.SetRestitution = function(b) {
		void 0 === b && (b = 0);
		this.m_restitution = b
	};
	P.prototype.GetAABB = function() {
		return this.m_aabb
	};
	P.prototype.b2Fixture = function() {
		this.m_aabb = new m;
		this.m_shape = this.m_next = this.m_body = this.m_userData = null;
		this.m_restitution = this.m_friction = this.m_density = 0
	};
	P.prototype.Create = function(b, c, d) {
		this.m_userData = d.userData;
		this.m_friction = d.friction;
		this.m_restitution = d.restitution;
		this.m_body = b;
		this.m_next = null;
		this.m_filter = d.filter.Copy();
		this.m_isSensor = d.isSensor;
		this.m_shape = d.shape.Copy();
		this.m_density = d.density
	};
	P.prototype.Destroy = function() {
		this.m_shape = null
	};
	P.prototype.CreateProxy = function(b, c) {
		this.m_shape.ComputeAABB(this.m_aabb, c);
		this.m_proxy = b.CreateProxy(this.m_aabb, this)
	};
	P.prototype.DestroyProxy = function(b) {
		null != this.m_proxy && (b.DestroyProxy(this.m_proxy), this.m_proxy = null)
	};
	P.prototype.Synchronize = function(c, d, e) {
		if (this.m_proxy) {
			var f = new m,
				g = new m;
			this.m_shape.ComputeAABB(f, d);
			this.m_shape.ComputeAABB(g, e);
			this.m_aabb.Combine(f, g);
			d = b.SubtractVV(e.position, d.position);
			c.MoveProxy(this.m_proxy, this.m_aabb, d)
		}
	};
	ba.b2FixtureDef = function() {
		this.filter = new O
	};
	ba.prototype.b2FixtureDef = function() {
		this.userData = this.shape = null;
		this.friction = 0.2;
		this.density = this.restitution = 0;
		this.filter.categoryBits = 1;
		this.filter.maskBits = 65535;
		this.filter.groupIndex = 0;
		this.isSensor = !1
	};
	V.b2Island = function() {};
	V.prototype.b2Island = function() {
		this.m_bodies = new Vector;
		this.m_contacts = new Vector;
		this.m_joints = new Vector
	};
	V.prototype.Initialize = function(b, c, d, e, f, g) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		var j = 0;
		this.m_bodyCapacity = b;
		this.m_contactCapacity = c;
		this.m_jointCapacity = d;
		this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
		this.m_allocator = e;
		this.m_listener = f;
		this.m_contactSolver = g;
		for (j = this.m_bodies.length; j < b; j++) this.m_bodies[j] = null;
		for (j = this.m_contacts.length; j < c; j++) this.m_contacts[j] = null;
		for (j = this.m_joints.length; j < d; j++) this.m_joints[j] = null
	};
	V.prototype.Clear = function() {
		this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0
	};
	V.prototype.Solve = function(c, d, e) {
		for (var f = 0, j = 0, r, f = 0; f < this.m_bodyCount; ++f) j = this.m_bodies[f], j.GetType() == s.b2_dynamicBody && (j.m_linearVelocity.x += c.dt * (d.x +
			j.m_invMass * j.m_force.x), j.m_linearVelocity.y += c.dt * (d.y + j.m_invMass * j.m_force.y), j.m_angularVelocity += c.dt * j.m_invI * j.m_torque, j.m_linearVelocity.Multiply(b.Clamp(1 - c.dt * j.m_linearDamping, 0, 1)), j.m_angularVelocity *= b.Clamp(1 - c.dt * j.m_angularDamping, 0, 1));
		this.m_contactSolver.Initialize(c, this.m_contacts, this.m_contactCount, this.m_allocator);
		d = this.m_contactSolver;
		d.InitVelocityConstraints(c);
		for (f = 0; f < this.m_jointCount; ++f) r = this.m_joints[f], r.InitVelocityConstraints(c);
		for (f = 0; f < c.velocityIterations; ++f) {
			for (j = 0; j < this.m_jointCount; ++j) r = this.m_joints[j], r.SolveVelocityConstraints(c);
			d.SolveVelocityConstraints()
		}
		for (f = 0; f < this.m_jointCount; ++f) r = this.m_joints[f], r.FinalizeVelocityConstraints();
		d.FinalizeVelocityConstraints();
		for (f = 0; f < this.m_bodyCount; ++f)
			if (j = this.m_bodies[f], j.GetType() != s.b2_staticBody) {
				var l = c.dt * j.m_linearVelocity.x,
					t = c.dt * j.m_linearVelocity.y;
				l * l + t * t > g.b2_maxTranslationSquared && (j.m_linearVelocity.Normalize(), j.m_linearVelocity.x *= g.b2_maxTranslation * c.inv_dt, j.m_linearVelocity.y *= g.b2_maxTranslation * c.inv_dt);
				l = c.dt * j.m_angularVelocity;
				l * l > g.b2_maxRotationSquared && (j.m_angularVelocity = 0 > j.m_angularVelocity ? -g.b2_maxRotation * c.inv_dt : g.b2_maxRotation * c.inv_dt);
				j.m_sweep.c0.SetV(j.m_sweep.c);
				j.m_sweep.a0 = j.m_sweep.a;
				j.m_sweep.c.x += c.dt * j.m_linearVelocity.x;
				j.m_sweep.c.y += c.dt * j.m_linearVelocity.y;
				j.m_sweep.a += c.dt * j.m_angularVelocity;
				j.SynchronizeTransform()
			}
		for (f = 0; f < c.positionIterations; ++f) {
			l = d.SolvePositionConstraints(g.b2_contactBaumgarte);
			t = !0;
			for (j = 0; j < this.m_jointCount; ++j) r = this.m_joints[j], r = r.SolvePositionConstraints(g.b2_contactBaumgarte), t = t && r;
			if (l && t) break
		}
		this.Report(d.m_constraints);
		if (e) {
			e = Number.MAX_VALUE;
			d = g.b2_linearSleepTolerance * g.b2_linearSleepTolerance;
			l = g.b2_angularSleepTolerance * g.b2_angularSleepTolerance;
			for (f = 0; f < this.m_bodyCount; ++f) j = this.m_bodies[f], j.GetType() != s.b2_staticBody && (0 == (j.m_flags & s.e_allowSleepFlag) && (e = j.m_sleepTime = 0), 0 == (j.m_flags & s.e_allowSleepFlag) || j.m_angularVelocity * j.m_angularVelocity > l || b.Dot(j.m_linearVelocity, j.m_linearVelocity) > d ? e = j.m_sleepTime = 0 : (j.m_sleepTime += c.dt, e = b.Min(e, j.m_sleepTime)));
			if (e >= g.b2_timeToSleep)
				for (f = 0; f < this.m_bodyCount; ++f) j = this.m_bodies[f], j.SetAwake(!1)
		}
	};
	V.prototype.SolveTOI = function(b) {
		var c = 0,
			d = 0;
		this.m_contactSolver.Initialize(b, this.m_contacts, this.m_contactCount, this.m_allocator);
		for (var e = this.m_contactSolver, c = 0; c < this.m_jointCount; ++c) this.m_joints[c].InitVelocityConstraints(b);
		for (c = 0; c < b.velocityIterations; ++c) {
			e.SolveVelocityConstraints();
			for (d = 0; d < this.m_jointCount; ++d) this.m_joints[d].SolveVelocityConstraints(b)
		}
		for (c = 0; c < this.m_bodyCount; ++c)
			if (d = this.m_bodies[c], d.GetType() != s.b2_staticBody) {
				var f = b.dt * d.m_linearVelocity.x,
					j = b.dt * d.m_linearVelocity.y;
				f * f + j * j > g.b2_maxTranslationSquared && (d.m_linearVelocity.Normalize(), d.m_linearVelocity.x *= g.b2_maxTranslation * b.inv_dt, d.m_linearVelocity.y *= g.b2_maxTranslation * b.inv_dt);
				f = b.dt * d.m_angularVelocity;
				f * f > g.b2_maxRotationSquared && (d.m_angularVelocity = 0 > d.m_angularVelocity ? -g.b2_maxRotation * b.inv_dt : g.b2_maxRotation * b.inv_dt);
				d.m_sweep.c0.SetV(d.m_sweep.c);
				d.m_sweep.a0 = d.m_sweep.a;
				d.m_sweep.c.x += b.dt * d.m_linearVelocity.x;
				d.m_sweep.c.y += b.dt * d.m_linearVelocity.y;
				d.m_sweep.a += b.dt * d.m_angularVelocity;
				d.SynchronizeTransform()
			}
		for (c = 0; c < b.positionIterations; ++c) {
			f = e.SolvePositionConstraints(0.75);
			j = !0;
			for (d = 0; d < this.m_jointCount; ++d) var r = this.m_joints[d].SolvePositionConstraints(g.b2_contactBaumgarte),
				j = j && r;
			if (f && j) break
		}
		this.Report(e.m_constraints)
	};
	V.prototype.Report = function(b) {
		if (null != this.m_listener)
			for (var c = 0; c < this.m_contactCount; ++c) {
				for (var d = this.m_contacts[c], e = b[c], f = 0; f < e.pointCount; ++f) V.s_impulse.normalImpulses[f] = e.points[f].normalImpulse, V.s_impulse.tangentImpulses[f] = e.points[f].tangentImpulse;
				this.m_listener.PostSolve(d, V.s_impulse)
			}
	};
	V.prototype.AddBody = function(b) {
		b.m_islandIndex = this.m_bodyCount;
		this.m_bodies[this.m_bodyCount++] = b
	};
	V.prototype.AddContact = function(b) {
		this.m_contacts[this.m_contactCount++] = b
	};
	V.prototype.AddJoint = function(b) {
		this.m_joints[this.m_jointCount++] = b
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.b2Island.s_impulse = new C
	});
	r.b2TimeStep = function() {};
	r.prototype.Set = function(b) {
		this.dt = b.dt;
		this.inv_dt = b.inv_dt;
		this.positionIterations = b.positionIterations;
		this.velocityIterations = b.velocityIterations;
		this.warmStarting = b.warmStarting
	};
	t.b2World = function() {
		this.s_stack = new Vector;
		this.m_contactManager = new R;
		this.m_contactSolver = new N;
		this.m_island = new V
	};
	t.prototype.b2World = function(b, c) {
		this.m_controllerList = this.m_jointList = this.m_contactList = this.m_bodyList = this.m_debugDraw = this.m_destructionListener = null;
		this.m_controllerCount = this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
		t.m_warmStarting = !0;
		t.m_continuousPhysics = !0;
		this.m_allowSleep = c;
		this.m_gravity = b;
		this.m_inv_dt0 = 0;
		this.m_contactManager.m_world = this;
		this.m_groundBody = this.CreateBody(new I)
	};
	t.prototype.SetDestructionListener = function(b) {
		this.m_destructionListener = b
	};
	t.prototype.SetContactFilter = function(b) {
		this.m_contactManager.m_contactFilter = b
	};
	t.prototype.SetContactListener = function(b) {
		this.m_contactManager.m_contactListener = b
	};
	t.prototype.SetDebugDraw = function(b) {
		this.m_debugDraw = b
	};
	t.prototype.SetBroadPhase = function(b) {
		var c = this.m_contactManager.m_broadPhase;
		this.m_contactManager.m_broadPhase = b;
		for (var d = this.m_bodyList; d; d = d.m_next)
			for (var e = d.m_fixtureList; e; e = e.m_next) e.m_proxy = b.CreateProxy(c.GetFatAABB(e.m_proxy), e)
	};
	t.prototype.Validate = function() {
		this.m_contactManager.m_broadPhase.Validate()
	};
	t.prototype.GetProxyCount = function() {
		return this.m_contactManager.m_broadPhase.GetProxyCount()
	};
	t.prototype.CreateBody = function(b) {
		if (!0 == this.IsLocked()) return null;
		b = new s(b, this);
		b.m_prev = null;
		if (b.m_next = this.m_bodyList) this.m_bodyList.m_prev = b;
		this.m_bodyList = b;
		++this.m_bodyCount;
		return b
	};
	t.prototype.DestroyBody = function(b) {
		if (!0 != this.IsLocked()) {
			for (var c = b.m_jointList; c;) {
				var d = c,
					c = c.next;
				this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(d.joint);
				this.DestroyJoint(d.joint)
			}
			for (c = b.m_controllerList; c;) d = c, c = c.nextController, d.controller.RemoveBody(b);
			for (c = b.m_contactList; c;) d = c, c = c.next, this.m_contactManager.Destroy(d.contact);
			b.m_contactList = null;
			for (c = b.m_fixtureList; c;) d = c, c = c.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(d), d.DestroyProxy(this.m_contactManager.m_broadPhase), d.Destroy();
			b.m_fixtureList = null;
			b.m_fixtureCount = 0;
			b.m_prev && (b.m_prev.m_next = b.m_next);
			b.m_next && (b.m_next.m_prev = b.m_prev);
			b == this.m_bodyList && (this.m_bodyList = b.m_next);
			--this.m_bodyCount
		}
	};
	t.prototype.CreateJoint = function(b) {
		var c = aa.Create(b, null);
		c.m_prev = null;
		if (c.m_next = this.m_jointList) this.m_jointList.m_prev = c;
		this.m_jointList = c;
		++this.m_jointCount;
		c.m_edgeA.joint = c;
		c.m_edgeA.other = c.m_bodyB;
		c.m_edgeA.prev = null;
		if (c.m_edgeA.next = c.m_bodyA.m_jointList) c.m_bodyA.m_jointList.prev = c.m_edgeA;
		c.m_bodyA.m_jointList = c.m_edgeA;
		c.m_edgeB.joint = c;
		c.m_edgeB.other = c.m_bodyA;
		c.m_edgeB.prev = null;
		if (c.m_edgeB.next = c.m_bodyB.m_jointList) c.m_bodyB.m_jointList.prev = c.m_edgeB;
		c.m_bodyB.m_jointList = c.m_edgeB;
		var d = b.bodyA,
			e = b.bodyB;
		if (!1 == b.collideConnected)
			for (b = e.GetContactList(); b;) b.other == d && b.contact.FlagForFiltering(), b = b.next;
		return c
	};
	t.prototype.DestroyJoint = function(b) {
		var c = b.m_collideConnected;
		b.m_prev && (b.m_prev.m_next = b.m_next);
		b.m_next && (b.m_next.m_prev = b.m_prev);
		b == this.m_jointList && (this.m_jointList = b.m_next);
		var d = b.m_bodyA,
			e = b.m_bodyB;
		d.SetAwake(!0);
		e.SetAwake(!0);
		b.m_edgeA.prev && (b.m_edgeA.prev.next = b.m_edgeA.next);
		b.m_edgeA.next && (b.m_edgeA.next.prev = b.m_edgeA.prev);
		b.m_edgeA == d.m_jointList && (d.m_jointList = b.m_edgeA.next);
		b.m_edgeA.prev = null;
		b.m_edgeA.next = null;
		b.m_edgeB.prev && (b.m_edgeB.prev.next = b.m_edgeB.next);
		b.m_edgeB.next && (b.m_edgeB.next.prev = b.m_edgeB.prev);
		b.m_edgeB == e.m_jointList && (e.m_jointList = b.m_edgeB.next);
		b.m_edgeB.prev = null;
		b.m_edgeB.next = null;
		aa.Destroy(b, null);
		--this.m_jointCount;
		if (!1 == c)
			for (b = e.GetContactList(); b;) b.other == d && b.contact.FlagForFiltering(), b = b.next
	};
	t.prototype.AddController = function(b) {
		b.m_next = this.m_controllerList;
		b.m_prev = null;
		this.m_controllerList = b;
		b.m_world = this;
		this.m_controllerCount++;
		return b
	};
	t.prototype.RemoveController = function(b) {
		b.m_prev && (b.m_prev.m_next = b.m_next);
		b.m_next && (b.m_next.m_prev = b.m_prev);
		this.m_controllerList == b && (this.m_controllerList = b.m_next);
		this.m_controllerCount--
	};
	t.prototype.CreateController = function(b) {
		if (b.m_world != this) throw Error("Controller can only be a member of one world");
		b.m_next = this.m_controllerList;
		b.m_prev = null;
		this.m_controllerList && (this.m_controllerList.m_prev = b);
		this.m_controllerList = b;
		++this.m_controllerCount;
		b.m_world = this;
		return b
	};
	t.prototype.DestroyController = function(b) {
		b.Clear();
		b.m_next && (b.m_next.m_prev = b.m_prev);
		b.m_prev && (b.m_prev.m_next = b.m_next);
		b == this.m_controllerList && (this.m_controllerList = b.m_next);
		--this.m_controllerCount
	};
	t.prototype.SetWarmStarting = function(b) {
		t.m_warmStarting = b
	};
	t.prototype.SetContinuousPhysics = function(b) {
		t.m_continuousPhysics = b
	};
	t.prototype.GetBodyCount = function() {
		return this.m_bodyCount
	};
	t.prototype.GetJointCount = function() {
		return this.m_jointCount
	};
	t.prototype.GetContactCount = function() {
		return this.m_contactCount
	};
	t.prototype.SetGravity = function(b) {
		this.m_gravity = b
	};
	t.prototype.GetGravity = function() {
		return this.m_gravity
	};
	t.prototype.GetGroundBody = function() {
		return this.m_groundBody
	};
	t.prototype.Step = function(b, c, d) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		void 0 === d && (d = 0);
		this.m_flags & t.e_newFixture && (this.m_contactManager.FindNewContacts(), this.m_flags &= ~t.e_newFixture);
		this.m_flags |= t.e_locked;
		var e = t.s_timestep2;
		e.dt = b;
		e.velocityIterations = c;
		e.positionIterations = d;
		e.inv_dt = 0 < b ? 1 / b : 0;
		e.dtRatio = this.m_inv_dt0 * b;
		e.warmStarting = t.m_warmStarting;
		this.m_contactManager.Collide();
		0 < e.dt && this.Solve(e);
		t.m_continuousPhysics && 0 < e.dt && this.SolveTOI(e);
		0 < e.dt && (this.m_inv_dt0 = e.inv_dt);
		this.m_flags &= ~t.e_locked
	};
	t.prototype.ClearForces = function() {
		for (var b = this.m_bodyList; b; b = b.m_next) b.m_force.SetZero(), b.m_torque = 0
	};
	t.prototype.DrawDebugData = function() {
		if (null != this.m_debugDraw) {
			this.m_debugDraw.m_sprite.graphics.clear();
			var b = this.m_debugDraw.GetFlags(),
				c, d, g;
			new e;
			new e;
			new e;
			var j;
			new m;
			new m;
			new e;
			new e;
			new e;
			new e;
			var r = new f(0, 0, 0);
			if (b & K.e_shapeBit)
				for (c = this.m_bodyList; c; c = c.m_next) {
					j = c.m_xf;
					for (d = c.GetFixtureList(); d; d = d.m_next) g = d.GetShape(), !1 == c.IsActive() ? r.Set(0.5, 0.5, 0.3) : c.GetType() == s.b2_staticBody ? r.Set(0.5, 0.9, 0.5) : c.GetType() == s.b2_kinematicBody ? r.Set(0.5, 0.5, 0.9) : !1 == c.IsAwake() ? r.Set(0.6, 0.6, 0.6) : r.Set(0.9, 0.7, 0.7), this.DrawShape(g, j, r)
				}
			if (b & K.e_jointBit)
				for (c = this.m_jointList; c; c = c.m_next) this.DrawJoint(c);
			if (b & K.e_controllerBit)
				for (c = this.m_controllerList; c; c = c.m_next) c.Draw(this.m_debugDraw);
			if (b & K.e_pairBit) {
				r.Set(0.3, 0.9, 0.9);
				for (c = this.m_contactManager.m_contactList; c; c = c.GetNext()) g = c.GetFixtureA(), d = c.GetFixtureB(), g = g.GetAABB().GetCenter(), d = d.GetAABB().GetCenter(), this.m_debugDraw.DrawSegment(g, d, r)
			}
			if (b & K.e_aabbBit) {
				g = this.m_contactManager.m_broadPhase;
				j = [new e, new e, new e, new e];
				for (c = this.m_bodyList; c; c = c.GetNext())
					if (!1 != c.IsActive())
						for (d = c.GetFixtureList(); d; d = d.GetNext()) {
							var l = g.GetFatAABB(d.m_proxy);
							j[0].Set(l.lowerBound.x, l.lowerBound.y);
							j[1].Set(l.upperBound.x, l.lowerBound.y);
							j[2].Set(l.upperBound.x, l.upperBound.y);
							j[3].Set(l.lowerBound.x, l.upperBound.y);
							this.m_debugDraw.DrawPolygon(j, 4, r)
						}
			}
			if (b & K.e_centerOfMassBit)
				for (c = this.m_bodyList; c; c = c.m_next) j = t.s_xf, j.R = c.m_xf.R, j.position = c.GetWorldCenter(), this.m_debugDraw.DrawTransform(j)
		}
	};
	t.prototype.QueryAABB = function(b, c) {
		var d = this.m_contactManager.m_broadPhase;
		d.Query(function(c) {
			return b(d.GetUserData(c))
		}, c)
	};
	t.prototype.QueryShape = function(b, c, e) {
		void 0 === e && (e = null);
		null == e && (e = new d, e.SetIdentity());
		var f = this.m_contactManager.m_broadPhase,
			g = new m;
		c.ComputeAABB(g, e);
		f.Query(function(d) {
			d = f.GetUserData(d) instanceof
			P ? f.GetUserData(d) : null;
			return F.TestOverlap(c, e, d.GetShape(), d.GetBody().GetTransform()) ? b(d) : !0
		}, g)
	};
	t.prototype.QueryPoint = function(b, c) {
		var d = this.m_contactManager.m_broadPhase,
			e = new m;
		e.lowerBound.Set(c.x - g.b2_linearSlop, c.y - g.b2_linearSlop);
		e.upperBound.Set(c.x + g.b2_linearSlop, c.y + g.b2_linearSlop);
		d.Query(function(e) {
			e = d.GetUserData(e) instanceof P ? d.GetUserData(e) : null;
			return e.TestPoint(c) ? b(e) : !0
		}, e)
	};
	t.prototype.RayCast = function(b, c, d) {
		var f = this.m_contactManager.m_broadPhase,
			g = new z,
			j = new q(c, d);
		f.RayCast(function(j, r) {
			var l = f.GetUserData(r),
				l = l instanceof P ? l : null;
			if (l.RayCast(g, j)) {
				var t = g.fraction,
					D = new e((1 - t) * c.x + t * d.x, (1 - t) * c.y + t * d.y);
				return b(l, D, g.normal, t)
			}
			return j.maxFraction
		}, j)
	};
	t.prototype.RayCastOne = function(b, c) {
		var d;
		this.RayCast(function(b, c, e, f) {
			void 0 === f && (f = 0);
			d = b;
			return f
		}, b, c);
		return d
	};
	t.prototype.RayCastAll = function(b, c) {
		var d = new Vector;
		this.RayCast(function(b) {
			d[d.length] = b;
			return 1
		}, b, c);
		return d
	};
	t.prototype.GetBodyList = function() {
		return this.m_bodyList
	};
	t.prototype.GetJointList = function() {
		return this.m_jointList
	};
	t.prototype.GetContactList = function() {
		return this.m_contactList
	};
	t.prototype.IsLocked = function() {
		return 0 < (this.m_flags & t.e_locked)
	};
	t.prototype.Solve = function(b) {
		for (var c, d = this.m_controllerList; d; d = d.m_next) d.Step(b);
		d = this.m_island;
		d.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
		for (c = this.m_bodyList; c; c = c.m_next) c.m_flags &= ~s.e_islandFlag;
		for (var e = this.m_contactList; e; e = e.m_next) e.m_flags &= ~J.e_islandFlag;
		for (e = this.m_jointList; e; e = e.m_next) e.m_islandFlag = !1;
		parseInt(this.m_bodyCount);
		for (var e = this.s_stack, f = this.m_bodyList; f; f = f.m_next)
			if (!(f.m_flags & s.e_islandFlag) && !(!1 == f.IsAwake() || !1 == f.IsActive()) && f.GetType() != s.b2_staticBody) {
				d.Clear();
				var g = 0;
				e[g++] = f;
				for (f.m_flags |= s.e_islandFlag; 0 < g;)
					if (c = e[--g], d.AddBody(c), !1 == c.IsAwake() && c.SetAwake(!0), c.GetType() != s.b2_staticBody) {
						for (var j, r = c.m_contactList; r; r = r.next)
							if (!(r.contact.m_flags & J.e_islandFlag) && !(!0 == r.contact.IsSensor() || !1 == r.contact.IsEnabled() || !1 == r.contact.IsTouching())) d.AddContact(r.contact), r.contact.m_flags |= J.e_islandFlag, j = r.other, j.m_flags & s.e_islandFlag || (e[g++] = j, j.m_flags |= s.e_islandFlag);
						for (c = c.m_jointList; c; c = c.next) !0 != c.joint.m_islandFlag && (j = c.other, !1 != j.IsActive() && (d.AddJoint(c.joint), c.joint.m_islandFlag = !0, j.m_flags & s.e_islandFlag || (e[g++] = j, j.m_flags |= s.e_islandFlag)))
					}
				d.Solve(b, this.m_gravity, this.m_allowSleep);
				for (g = 0; g < d.m_bodyCount; ++g) c = d.m_bodies[g], c.GetType() == s.b2_staticBody && (c.m_flags &= ~s.e_islandFlag)
			}
		for (g = 0; g < e.length && e[g]; ++g) e[g] = null;
		for (c = this.m_bodyList; c; c = c.m_next) !1 == c.IsAwake() || !1 == c.IsActive() || c.GetType() != s.b2_staticBody && c.SynchronizeFixtures();
		this.m_contactManager.FindNewContacts()
	};
	t.prototype.SolveTOI = function(b) {
		var c, d, e, f = this.m_island;
		f.Initialize(this.m_bodyCount, g.b2_maxTOIContactsPerIsland, g.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
		var j = t.s_queue;
		for (c = this.m_bodyList; c; c = c.m_next) c.m_flags &= ~s.e_islandFlag, c.m_sweep.t0 = 0;
		for (e = this.m_contactList; e; e = e.m_next) e.m_flags &= ~(J.e_toiFlag | J.e_islandFlag);
		for (e = this.m_jointList; e; e = e.m_next) e.m_islandFlag = !1;
		for (;;) {
			var r = null,
				l = 1;
			for (e = this.m_contactList; e; e = e.m_next)
				if (!(!0 == e.IsSensor() || !1 == e.IsEnabled() || !1 == e.IsContinuous())) {
					if (e.m_flags & J.e_toiFlag) c = e.m_toi;
					else {
						c = e.m_fixtureA;
						d = e.m_fixtureB;
						c = c.m_body;
						d = d.m_body;
						if ((c.GetType() != s.b2_dynamicBody || !1 == c.IsAwake()) && (d.GetType() != s.b2_dynamicBody || !1 == d.IsAwake())) continue;
						var D = c.m_sweep.t0;
						c.m_sweep.t0 < d.m_sweep.t0 ? (D = d.m_sweep.t0, c.m_sweep.Advance(D)) : d.m_sweep.t0 < c.m_sweep.t0 && (D = c.m_sweep.t0, d.m_sweep.Advance(D));
						c = e.ComputeTOI(c.m_sweep, d.m_sweep);
						g.b2Assert(0 <= c && 1 >= c);
						0 < c && 1 > c && (c = (1 - c) * D + c, 1 < c && (c = 1));
						e.m_toi = c;
						e.m_flags |= J.e_toiFlag
					}
					Number.MIN_VALUE < c && c < l && (r = e, l = c)
				}
			if (null == r || 1 - 100 * Number.MIN_VALUE < l) break;
			c = r.m_fixtureA;
			d = r.m_fixtureB;
			c = c.m_body;
			d = d.m_body;
			t.s_backupA.Set(c.m_sweep);
			t.s_backupB.Set(d.m_sweep);
			c.Advance(l);
			d.Advance(l);
			r.Update(this.m_contactManager.m_contactListener);
			r.m_flags &= ~J.e_toiFlag;
			if (!0 == r.IsSensor() || !1 == r.IsEnabled()) c.m_sweep.Set(t.s_backupA), d.m_sweep.Set(t.s_backupB), c.SynchronizeTransform(), d.SynchronizeTransform();
			else if (!1 != r.IsTouching()) {
				c.GetType() != s.b2_dynamicBody && (c = d);
				f.Clear();
				r = e = 0;
				j[e + r++] = c;
				for (c.m_flags |= s.e_islandFlag; 0 < r;)
					if (c = j[e++], --r, f.AddBody(c), !1 == c.IsAwake() && c.SetAwake(!0), c.GetType() == s.b2_dynamicBody) {
						for (d = c.m_contactList; d && f.m_contactCount != f.m_contactCapacity; d = d.next)
							if (!(d.contact.m_flags & J.e_islandFlag) && !(!0 == d.contact.IsSensor() || !1 == d.contact.IsEnabled() || !1 == d.contact.IsTouching())) f.AddContact(d.contact), d.contact.m_flags |= J.e_islandFlag, D = d.other, D.m_flags & s.e_islandFlag || (D.GetType() != s.b2_staticBody && (D.Advance(l), D.SetAwake(!0)), j[e + r] = D, ++r, D.m_flags |= s.e_islandFlag);
						for (c = c.m_jointList; c; c = c.next) f.m_jointCount != f.m_jointCapacity && !0 != c.joint.m_islandFlag && (D = c.other, !1 != D.IsActive() && (f.AddJoint(c.joint), c.joint.m_islandFlag = !0, D.m_flags & s.e_islandFlag || (D.GetType() != s.b2_staticBody && (D.Advance(l), D.SetAwake(!0)), j[e + r] = D, ++r, D.m_flags |= s.e_islandFlag)))
					}
				e = t.s_timestep;
				e.warmStarting = !1;
				e.dt = (1 - l) * b.dt;
				e.inv_dt = 1 / e.dt;
				e.dtRatio = 0;
				e.velocityIterations = b.velocityIterations;
				e.positionIterations = b.positionIterations;
				f.SolveTOI(e);
				for (l = l = 0; l < f.m_bodyCount; ++l)
					if (c = f.m_bodies[l], c.m_flags &= ~s.e_islandFlag, !1 != c.IsAwake() && c.GetType() == s.b2_dynamicBody) {
						c.SynchronizeFixtures();
						for (d = c.m_contactList; d; d = d.next) d.contact.m_flags &= ~J.e_toiFlag
					}
				for (l = 0; l < f.m_contactCount; ++l) e = f.m_contacts[l], e.m_flags &= ~(J.e_toiFlag | J.e_islandFlag);
				for (l = 0; l < f.m_jointCount; ++l) e = f.m_joints[l], e.m_islandFlag = !1;
				this.m_contactManager.FindNewContacts()
			}
		}
	};
	t.prototype.DrawJoint = function(b) {
		var c = b.GetBodyA(),
			d = b.GetBodyB(),
			e = c.m_xf.position,
			f = d.m_xf.position,
			g = b.GetAnchorA(),
			j = b.GetAnchorB(),
			r = t.s_jointColor;
		switch (b.m_type) {
			case aa.e_distanceJoint:
				this.m_debugDraw.DrawSegment(g, j, r);
				break;
			case aa.e_pulleyJoint:
				c = b instanceof Q ? b : null;
				b = c.GetGroundAnchorA();
				c = c.GetGroundAnchorB();
				this.m_debugDraw.DrawSegment(b, g, r);
				this.m_debugDraw.DrawSegment(c, j, r);
				this.m_debugDraw.DrawSegment(b, c, r);
				break;
			case aa.e_mouseJoint:
				this.m_debugDraw.DrawSegment(g, j, r);
				break;
			default:
				c != this.m_groundBody && this.m_debugDraw.DrawSegment(e, g, r), this.m_debugDraw.DrawSegment(g, j, r), d != this.m_groundBody && this.m_debugDraw.DrawSegment(f, j, r)
		}
	};
	t.prototype.DrawShape = function(c, d, e) {
		switch (c.m_type) {
			case F.e_circleShape:
				var f = c instanceof y ? c : null;
				this.m_debugDraw.DrawSolidCircle(b.MulX(d, f.m_p), f.m_radius, d.R.col1, e);
				break;
			case F.e_polygonShape:
				f = c instanceof E ? c : null;
				c = parseInt(f.GetVertexCount());
				for (var g = f.GetVertices(), j = new Vector(c), f = 0; f < c; ++f) j[f] = b.MulX(d, g[f]);
				this.m_debugDraw.DrawSolidPolygon(j, c, e);
				break;
			case F.e_edgeShape:
				f = c instanceof A ? c : null, this.m_debugDraw.DrawSegment(b.MulX(d, f.GetVertex1()), b.MulX(d, f.GetVertex2()), e)
		}
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.b2World.s_timestep2 = new r;
		Box2D.Dynamics.b2World.s_xf = new d;
		Box2D.Dynamics.b2World.s_backupA = new c;
		Box2D.Dynamics.b2World.s_backupB = new c;
		Box2D.Dynamics.b2World.s_timestep = new r;
		Box2D.Dynamics.b2World.s_queue = new Vector;
		Box2D.Dynamics.b2World.s_jointColor = new f(0.5, 0.8, 0.8);
		Box2D.Dynamics.b2World.e_newFixture = 1;
		Box2D.Dynamics.b2World.e_locked = 2
	})
})();
(function() {
	var b = Box2D.Collision.Shapes.b2CircleShape,
		c = Box2D.Collision.Shapes.b2EdgeShape,
		d = Box2D.Collision.Shapes.b2PolygonShape,
		e = Box2D.Collision.Shapes.b2Shape,
		f = Box2D.Dynamics.Contacts.b2CircleContact,
		g = Box2D.Dynamics.Contacts.b2Contact,
		m = Box2D.Dynamics.Contacts.b2ContactConstraint,
		l = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
		j = Box2D.Dynamics.Contacts.b2ContactEdge,
		q = Box2D.Dynamics.Contacts.b2ContactFactory,
		z = Box2D.Dynamics.Contacts.b2ContactRegister,
		y = Box2D.Dynamics.Contacts.b2ContactResult,
		A = Box2D.Dynamics.Contacts.b2ContactSolver,
		B = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
		E = Box2D.Dynamics.Contacts.b2NullContact,
		F = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
		s = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
		I = Box2D.Dynamics.Contacts.b2PolygonContact,
		G = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
		C = Box2D.Dynamics.b2Body,
		H = Box2D.Dynamics.b2TimeStep,
		R = Box2D.Common.b2Settings,
		K = Box2D.Common.Math.b2Mat22,
		fa = Box2D.Common.Math.b2Math,
		O = Box2D.Common.Math.b2Vec2,
		P = Box2D.Collision.b2Collision,
		ba = Box2D.Collision.b2ContactID,
		V = Box2D.Collision.b2Manifold,
		r = Box2D.Collision.b2TimeOfImpact,
		t = Box2D.Collision.b2TOIInput,
		J = Box2D.Collision.b2WorldManifold;
	Box2D.inherit(f, Box2D.Dynamics.Contacts.b2Contact);
	f.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	f.b2CircleContact = function() {
		Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
	};
	f.Create = function() {
		return new f
	};
	f.Destroy = function() {};
	f.prototype.Reset = function(b, c) {
		this.__super.Reset.call(this, b, c)
	};
	f.prototype.Evaluate = function() {
		var c = this.m_fixtureA.GetBody(),
			d = this.m_fixtureB.GetBody();
		P.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, c.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, d.m_xf)
	};
	g.b2Contact = function() {
		this.m_nodeA = new j;
		this.m_nodeB = new j;
		this.m_manifold = new V;
		this.m_oldManifold = new V
	};
	g.prototype.GetManifold = function() {
		return this.m_manifold
	};
	g.prototype.GetWorldManifold = function(b) {
		var c = this.m_fixtureA.GetBody(),
			d = this.m_fixtureB.GetBody(),
			e = this.m_fixtureA.GetShape(),
			f = this.m_fixtureB.GetShape();
		b.Initialize(this.m_manifold, c.GetTransform(), e.m_radius, d.GetTransform(), f.m_radius)
	};
	g.prototype.IsTouching = function() {
		return (this.m_flags & g.e_touchingFlag) == g.e_touchingFlag
	};
	g.prototype.IsContinuous = function() {
		return (this.m_flags & g.e_continuousFlag) == g.e_continuousFlag
	};
	g.prototype.SetSensor = function(b) {
		this.m_flags = b ? this.m_flags | g.e_sensorFlag : this.m_flags & ~g.e_sensorFlag
	};
	g.prototype.IsSensor = function() {
		return (this.m_flags & g.e_sensorFlag) == g.e_sensorFlag
	};
	g.prototype.SetEnabled = function(b) {
		this.m_flags = b ? this.m_flags | g.e_enabledFlag : this.m_flags & ~g.e_enabledFlag
	};
	g.prototype.IsEnabled = function() {
		return (this.m_flags & g.e_enabledFlag) == g.e_enabledFlag
	};
	g.prototype.GetNext = function() {
		return this.m_next
	};
	g.prototype.GetFixtureA = function() {
		return this.m_fixtureA
	};
	g.prototype.GetFixtureB = function() {
		return this.m_fixtureB
	};
	g.prototype.FlagForFiltering = function() {
		this.m_flags |= g.e_filterFlag
	};
	g.prototype.b2Contact = function() {};
	g.prototype.Reset = function(b, c) {
		void 0 === b && (b = null);
		void 0 === c && (c = null);
		this.m_flags = g.e_enabledFlag;
		if (!b || !c) this.m_fixtureB = this.m_fixtureA = null;
		else {
			if (b.IsSensor() || c.IsSensor()) this.m_flags |= g.e_sensorFlag;
			var d = b.GetBody(),
				e = c.GetBody();
			if (d.GetType() != C.b2_dynamicBody || d.IsBullet() || e.GetType() != C.b2_dynamicBody || e.IsBullet()) this.m_flags |= g.e_continuousFlag;
			this.m_fixtureA = b;
			this.m_fixtureB = c;
			this.m_manifold.m_pointCount = 0;
			this.m_next = this.m_prev = null;
			this.m_nodeA.contact = null;
			this.m_nodeA.prev = null;
			this.m_nodeA.next = null;
			this.m_nodeA.other = null;
			this.m_nodeB.contact = null;
			this.m_nodeB.prev = null;
			this.m_nodeB.next = null;
			this.m_nodeB.other = null
		}
	};
	g.prototype.Update = function(b) {
		var c = this.m_oldManifold;
		this.m_oldManifold = this.m_manifold;
		this.m_manifold = c;
		this.m_flags |= g.e_enabledFlag;
		var d = !1,
			c = (this.m_flags & g.e_touchingFlag) == g.e_touchingFlag,
			f = this.m_fixtureA.m_body,
			j = this.m_fixtureB.m_body,
			r = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
		if (this.m_flags & g.e_sensorFlag) r && (d = this.m_fixtureA.GetShape(), r = this.m_fixtureB.GetShape(), f = f.GetTransform(), j = j.GetTransform(), d = e.TestOverlap(d, f, r, j)), this.m_manifold.m_pointCount = 0;
		else {
			this.m_flags = f.GetType() != C.b2_dynamicBody || f.IsBullet() || j.GetType() != C.b2_dynamicBody || j.IsBullet() ? this.m_flags | g.e_continuousFlag : this.m_flags & ~g.e_continuousFlag;
			if (r) {
				this.Evaluate();
				d = 0 < this.m_manifold.m_pointCount;
				for (r = 0; r < this.m_manifold.m_pointCount; ++r) {
					var l = this.m_manifold.m_points[r];
					l.m_normalImpulse = 0;
					l.m_tangentImpulse = 0;
					for (var t = l.m_id, m = 0; m < this.m_oldManifold.m_pointCount; ++m) {
						var J = this.m_oldManifold.m_points[m];
						if (J.m_id.key == t.key) {
							l.m_normalImpulse = J.m_normalImpulse;
							l.m_tangentImpulse = J.m_tangentImpulse;
							break
						}
					}
				}
			} else this.m_manifold.m_pointCount = 0;
			d != c && (f.SetAwake(!0), j.SetAwake(!0))
		}
		this.m_flags = d ? this.m_flags | g.e_touchingFlag : this.m_flags & ~g.e_touchingFlag;
		!1 == c && !0 == d && b.BeginContact(this);
		!0 == c && !1 == d && b.EndContact(this);
		0 == (this.m_flags & g.e_sensorFlag) && b.PreSolve(this, this.m_oldManifold)
	};
	g.prototype.Evaluate = function() {};
	g.prototype.ComputeTOI = function(b, c) {
		g.s_input.proxyA.Set(this.m_fixtureA.GetShape());
		g.s_input.proxyB.Set(this.m_fixtureB.GetShape());
		g.s_input.sweepA = b;
		g.s_input.sweepB = c;
		g.s_input.tolerance = R.b2_linearSlop;
		return r.TimeOfImpact(g.s_input)
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1;
		Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2;
		Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4;
		Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8;
		Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16;
		Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32;
		Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 64;
		Box2D.Dynamics.Contacts.b2Contact.s_input = new t
	});
	m.b2ContactConstraint = function() {
		this.localPlaneNormal = new O;
		this.localPoint = new O;
		this.normal = new O;
		this.normalMass = new K;
		this.K = new K
	};
	m.prototype.b2ContactConstraint = function() {
		this.points = new Vector(R.b2_maxManifoldPoints);
		for (var b = 0; b < R.b2_maxManifoldPoints; b++) this.points[b] = new l
	};
	l.b2ContactConstraintPoint = function() {
		this.localPoint = new O;
		this.rA = new O;
		this.rB = new O
	};
	j.b2ContactEdge = function() {};
	q.b2ContactFactory = function() {};
	q.prototype.b2ContactFactory = function(b) {
		this.m_allocator = b;
		this.InitializeRegisters()
	};
	q.prototype.AddType = function(b, c, d, e) {
		void 0 === d && (d = 0);
		void 0 === e && (e = 0);
		this.m_registers[d][e].createFcn = b;
		this.m_registers[d][e].destroyFcn = c;
		this.m_registers[d][e].primary = !0;
		d != e && (this.m_registers[e][d].createFcn = b, this.m_registers[e][d].destroyFcn = c, this.m_registers[e][d].primary = !1)
	};
	q.prototype.InitializeRegisters = function() {
		this.m_registers = new Vector(e.e_shapeTypeCount);
		for (var b = 0; b < e.e_shapeTypeCount; b++) {
			this.m_registers[b] = new Vector(e.e_shapeTypeCount);
			for (var c = 0; c < e.e_shapeTypeCount; c++) this.m_registers[b][c] = new z
		}
		this.AddType(f.Create, f.Destroy, e.e_circleShape, e.e_circleShape);
		this.AddType(F.Create, F.Destroy, e.e_polygonShape, e.e_circleShape);
		this.AddType(I.Create, I.Destroy, e.e_polygonShape, e.e_polygonShape);
		this.AddType(B.Create, B.Destroy, e.e_edgeShape, e.e_circleShape);
		this.AddType(s.Create, s.Destroy, e.e_polygonShape, e.e_edgeShape)
	};
	q.prototype.Create = function(b, c) {
		var d = parseInt(b.GetType()),
			e = parseInt(c.GetType()),
			d = this.m_registers[d][e];
		if (d.pool) return e = d.pool, d.pool = e.m_next, d.poolCount--, e.Reset(b, c), e;
		e = d.createFcn;
		return null != e ? (d.primary ? (e = e(this.m_allocator), e.Reset(b, c)) : (e = e(this.m_allocator), e.Reset(c, b)), e) : null
	};
	q.prototype.Destroy = function(b) {
		0 < b.m_manifold.m_pointCount && (b.m_fixtureA.m_body.SetAwake(!0), b.m_fixtureB.m_body.SetAwake(!0));
		var c = parseInt(b.m_fixtureA.GetType()),
			d = parseInt(b.m_fixtureB.GetType()),
			c = this.m_registers[c][d];
		c.poolCount++;
		b.m_next = c.pool;
		c.pool = b;
		c = c.destroyFcn;
		c(b, this.m_allocator)
	};
	z.b2ContactRegister = function() {};
	y.b2ContactResult = function() {
		this.position = new O;
		this.normal = new O;
		this.id = new ba
	};
	A.b2ContactSolver = function() {
		this.m_step = new H;
		this.m_constraints = new Vector
	};
	A.prototype.b2ContactSolver = function() {};
	A.prototype.Initialize = function(b, c, d, e) {
		void 0 === d && (d = 0);
		var f;
		this.m_step.Set(b);
		this.m_allocator = e;
		for (this.m_constraintCount = d; this.m_constraints.length < this.m_constraintCount;) this.m_constraints[this.m_constraints.length] = new m;
		for (b = 0; b < d; ++b) {
			f = c[b];
			e = f.m_fixtureA;
			var g = f.m_fixtureB,
				j = e.m_shape.m_radius,
				r = g.m_shape.m_radius,
				l = e.m_body,
				t = g.m_body,
				J = f.GetManifold(),
				y = R.b2MixFriction(e.GetFriction(), g.GetFriction()),
				q = R.b2MixRestitution(e.GetRestitution(), g.GetRestitution()),
				s = l.m_linearVelocity.x,
				B = l.m_linearVelocity.y,
				z = t.m_linearVelocity.x,
				C = t.m_linearVelocity.y,
				E = l.m_angularVelocity,
				F = t.m_angularVelocity;
			R.b2Assert(0 < J.m_pointCount);
			A.s_worldManifold.Initialize(J, l.m_xf, j, t.m_xf, r);
			g = A.s_worldManifold.m_normal.x;
			f = A.s_worldManifold.m_normal.y;
			e = this.m_constraints[b];
			e.bodyA = l;
			e.bodyB = t;
			e.manifold = J;
			e.normal.x = g;
			e.normal.y = f;
			e.pointCount = J.m_pointCount;
			e.friction = y;
			e.restitution = q;
			e.localPlaneNormal.x = J.m_localPlaneNormal.x;
			e.localPlaneNormal.y = J.m_localPlaneNormal.y;
			e.localPoint.x = J.m_localPoint.x;
			e.localPoint.y = J.m_localPoint.y;
			e.radius = j + r;
			e.type = J.m_type;
			for (j = 0; j < e.pointCount; ++j) {
				y = J.m_points[j];
				r = e.points[j];
				r.normalImpulse = y.m_normalImpulse;
				r.tangentImpulse = y.m_tangentImpulse;
				r.localPoint.SetV(y.m_localPoint);
				var y = r.rA.x = A.s_worldManifold.m_points[j].x -
					l.m_sweep.c.x,
					q = r.rA.y = A.s_worldManifold.m_points[j].y - l.m_sweep.c.y,
					G = r.rB.x = A.s_worldManifold.m_points[j].x - t.m_sweep.c.x,
					I = r.rB.y = A.s_worldManifold.m_points[j].y - t.m_sweep.c.y,
					H = y * f - q * g,
					K = G * f - I * g,
					H = H * H,
					K = K * K;
				r.normalMass = 1 / (l.m_invMass + t.m_invMass + l.m_invI * H + t.m_invI * K);
				var O = l.m_mass * l.m_invMass + t.m_mass * t.m_invMass,
					O = O + (l.m_mass * l.m_invI * H + t.m_mass * t.m_invI * K);
				r.equalizedMass = 1 / O;
				K = f;
				O = -g;
				H = y * O - q * K;
				K = G * O - I * K;
				H *= H;
				K *= K;
				r.tangentMass = 1 / (l.m_invMass + t.m_invMass + l.m_invI * H + t.m_invI * K);
				r.velocityBias = 0;
				y = e.normal.x * (z + -F * I - s - -E * q) + e.normal.y * (C + F * G - B - E * y);
				y < -R.b2_velocityThreshold && (r.velocityBias += -e.restitution * y)
			}
			2 == e.pointCount && (C = e.points[0], z = e.points[1], J = l.m_invMass, l = l.m_invI, s = t.m_invMass, t = t.m_invI, B = C.rA.x * f - C.rA.y * g, C = C.rB.x * f - C.rB.y * g, E = z.rA.x * f - z.rA.y * g, z = z.rB.x * f - z.rB.y * g, g = J + s + l * B * B + t * C * C, f = J + s + l * E * E + t * z * z, t = J + s + l * B * E + t * C * z, g * g < 100 * (g * f - t * t) ? (e.K.col1.Set(g, t), e.K.col2.Set(t, f), e.K.GetInverse(e.normalMass)) : e.pointCount = 1)
		}
	};
	A.prototype.InitVelocityConstraints = function(b) {
		for (var c = 0; c < this.m_constraintCount; ++c) {
			var d = this.m_constraints[c],
				e = d.bodyA,
				f = d.bodyB,
				g = e.m_invMass,
				j = e.m_invI,
				r = f.m_invMass,
				l = f.m_invI,
				t = d.normal.x,
				m = d.normal.y,
				J = m,
				y = -t,
				q = 0,
				s = 0;
			if (b.warmStarting) {
				s = d.pointCount;
				for (q = 0; q < s; ++q) {
					var A = d.points[q];
					A.normalImpulse *= b.dtRatio;
					A.tangentImpulse *= b.dtRatio;
					var z = A.normalImpulse * t + A.tangentImpulse * J,
						B = A.normalImpulse * m + A.tangentImpulse * y;
					e.m_angularVelocity -= j * (A.rA.x * B - A.rA.y * z);
					e.m_linearVelocity.x -= g * z;
					e.m_linearVelocity.y -= g * B;
					f.m_angularVelocity += l * (A.rB.x * B - A.rB.y * z);
					f.m_linearVelocity.x += r * z;
					f.m_linearVelocity.y += r * B
				}
			} else {
				s = d.pointCount;
				for (q = 0; q < s; ++q) e = d.points[q], e.normalImpulse = 0, e.tangentImpulse = 0
			}
		}
	};
	A.prototype.SolveVelocityConstraints = function() {
		for (var b = 0, c, d = 0, e = 0, f = 0, g = 0, j = 0, r = 0, l = 0, t, m = 0; m < this.m_constraintCount; ++m) {
			var f = this.m_constraints[m],
				J = f.bodyA,
				y = f.bodyB,
				q = J.m_angularVelocity,
				s = y.m_angularVelocity,
				A = J.m_linearVelocity,
				z = y.m_linearVelocity,
				B = J.m_invMass,
				C = J.m_invI,
				E = y.m_invMass,
				F = y.m_invI,
				r = f.normal.x,
				G = l = f.normal.y;
			t = -r;
			j = f.friction;
			for (b = 0; b < f.pointCount; b++) c = f.points[b], d = z.x - s * c.rB.y - A.x + q * c.rA.y, e = z.y + s * c.rB.x - A.y - q * c.rA.x, d = d * G + e * t, d = c.tangentMass * -d, e = j * c.normalImpulse, e = fa.Clamp(c.tangentImpulse + d, -e, e), d = e - c.tangentImpulse, g = d * G, d *= t, A.x -= B * g, A.y -= B * d, q -= C * (c.rA.x * d - c.rA.y * g), z.x += E * g, z.y += E * d, s += F * (c.rB.x * d - c.rB.y * g), c.tangentImpulse = e;
			parseInt(f.pointCount);
			if (1 == f.pointCount) c = f.points[0], d = z.x + -s * c.rB.y - A.x - -q * c.rA.y, e = z.y + s * c.rB.x - A.y - q * c.rA.x, f = d * r + e * l, d = -c.normalMass * (f - c.velocityBias), e = c.normalImpulse + d, e = 0 < e ? e : 0, d = e - c.normalImpulse, g = d * r, d *= l, A.x -= B * g, A.y -= B * d, q -= C * (c.rA.x * d - c.rA.y * g), z.x += E * g, z.y += E * d, s += F * (c.rB.x * d - c.rB.y * g), c.normalImpulse = e;
			else {
				c = f.points[0];
				var b = f.points[1],
					d = c.normalImpulse,
					j = b.normalImpulse,
					H = (z.x - s * c.rB.y - A.x + q * c.rA.y) * r + (z.y + s * c.rB.x - A.y - q * c.rA.x) * l,
					I = (z.x - s * b.rB.y - A.x + q * b.rA.y) * r + (z.y + s * b.rB.x - A.y - q * b.rA.x) * l,
					e = H - c.velocityBias,
					g = I - b.velocityBias;
				t = f.K;
				e -= t.col1.x * d + t.col2.x * j;
				for (g -= t.col1.y * d + t.col2.y * j;;) {
					t = f.normalMass;
					G = -(t.col1.x * e + t.col2.x * g);
					t = -(t.col1.y * e + t.col2.y * g);
					if (0 <= G && 0 <= t) {
						d = G - d;
						j = t - j;
						f = d * r;
						d *= l;
						r *= j;
						l *= j;
						A.x -= B * (f + r);
						A.y -= B * (d + l);
						q -= C * (c.rA.x * d - c.rA.y * f + b.rA.x * l - b.rA.y * r);
						z.x += E * (f + r);
						z.y += E * (d + l);
						s += F * (c.rB.x * d - c.rB.y * f + b.rB.x * l - b.rB.y * r);
						c.normalImpulse = G;
						b.normalImpulse = t;
						break
					}
					G = -c.normalMass * e;
					t = 0;
					I = f.K.col1.y * G + g;
					if (0 <= G && 0 <= I) {
						d = G - d;
						j = t - j;
						f = d * r;
						d *= l;
						r *= j;
						l *= j;
						A.x -= B * (f + r);
						A.y -= B * (d + l);
						q -= C * (c.rA.x * d - c.rA.y * f + b.rA.x * l - b.rA.y * r);
						z.x += E * (f + r);
						z.y += E * (d + l);
						s += F * (c.rB.x * d - c.rB.y * f + b.rB.x * l - b.rB.y * r);
						c.normalImpulse = G;
						b.normalImpulse = t;
						break
					}
					G = 0;
					t = -b.normalMass * g;
					H = f.K.col2.x * t + e;
					if (0 <= t && 0 <= H) {
						d = G - d;
						j = t - j;
						f = d * r;
						d *= l;
						r *= j;
						l *= j;
						A.x -= B * (f + r);
						A.y -= B * (d + l);
						q -= C * (c.rA.x * d - c.rA.y * f + b.rA.x * l - b.rA.y * r);
						z.x += E * (f + r);
						z.y += E * (d + l);
						s += F * (c.rB.x * d - c.rB.y * f + b.rB.x * l - b.rB.y * r);
						c.normalImpulse = G;
						b.normalImpulse = t;
						break
					}
					t = G = 0;
					H = e;
					I = g;
					if (0 <= H && 0 <= I) {
						d = G - d;
						j = t - j;
						f = d * r;
						d *= l;
						r *= j;
						l *= j;
						A.x -= B * (f + r);
						A.y -= B * (d + l);
						q -= C * (c.rA.x * d - c.rA.y * f + b.rA.x * l - b.rA.y * r);
						z.x += E * (f + r);
						z.y += E * (d + l);
						s += F * (c.rB.x * d - c.rB.y * f + b.rB.x * l - b.rB.y * r);
						c.normalImpulse = G;
						b.normalImpulse = t;
						break
					}
					break
				}
			}
			J.m_angularVelocity = q;
			y.m_angularVelocity = s
		}
	};
	A.prototype.FinalizeVelocityConstraints = function() {
		for (var b = 0; b < this.m_constraintCount; ++b)
			for (var c = this.m_constraints[b], d = c.manifold, e = 0; e < c.pointCount; ++e) {
				var f = d.m_points[e],
					g = c.points[e];
				f.m_normalImpulse = g.normalImpulse;
				f.m_tangentImpulse = g.tangentImpulse
			}
	};
	A.prototype.SolvePositionConstraints = function(b) {
		void 0 === b && (b = 0);
		for (var c = 0, d = 0; d < this.m_constraintCount; d++) {
			var e = this.m_constraints[d],
				f = e.bodyA,
				g = e.bodyB,
				j = f.m_mass * f.m_invMass,
				r = f.m_mass * f.m_invI,
				l = g.m_mass * g.m_invMass,
				t = g.m_mass * g.m_invI;
			A.s_psm.Initialize(e);
			for (var m = A.s_psm.m_normal, J = 0; J < e.pointCount; J++) {
				var y = e.points[J],
					q = A.s_psm.m_points[J],
					s = A.s_psm.m_separations[J],
					z = q.x - f.m_sweep.c.x,
					B = q.y - f.m_sweep.c.y,
					C = q.x - g.m_sweep.c.x,
					q = q.y - g.m_sweep.c.y,
					c = c < s ? c : s,
					s = fa.Clamp(b * (s + R.b2_linearSlop), -R.b2_maxLinearCorrection, 0),
					s = -y.equalizedMass * s,
					y = s * m.x,
					s = s * m.y;
				f.m_sweep.c.x -= j * y;
				f.m_sweep.c.y -= j * s;
				f.m_sweep.a -= r * (z * s - B * y);
				f.SynchronizeTransform();
				g.m_sweep.c.x += l * y;
				g.m_sweep.c.y += l * s;
				g.m_sweep.a += t * (C * s - q * y);
				g.SynchronizeTransform()
			}
		}
		return c > -1.5 * R.b2_linearSlop
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new J;
		Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new G
	});
	Box2D.inherit(B, Box2D.Dynamics.Contacts.b2Contact);
	B.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	B.b2EdgeAndCircleContact = function() {
		Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
	};
	B.Create = function() {
		return new B
	};
	B.Destroy = function() {};
	B.prototype.Reset = function(b, c) {
		this.__super.Reset.call(this, b, c)
	};
	B.prototype.Evaluate = function() {
		var d = this.m_fixtureA.GetBody(),
			e = this.m_fixtureB.GetBody();
		this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof c ? this.m_fixtureA.GetShape() : null, d.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, e.m_xf)
	};
	B.prototype.b2CollideEdgeAndCircle = function() {};
	Box2D.inherit(E, Box2D.Dynamics.Contacts.b2Contact);
	E.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	E.b2NullContact = function() {
		Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
	};
	E.prototype.b2NullContact = function() {
		this.__super.b2Contact.call(this)
	};
	E.prototype.Evaluate = function() {};
	Box2D.inherit(F, Box2D.Dynamics.Contacts.b2Contact);
	F.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	F.b2PolyAndCircleContact = function() {
		Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
	};
	F.Create = function() {
		return new F
	};
	F.Destroy = function() {};
	F.prototype.Reset = function(b, c) {
		this.__super.Reset.call(this, b, c);
		R.b2Assert(b.GetType() == e.e_polygonShape);
		R.b2Assert(c.GetType() == e.e_circleShape)
	};
	F.prototype.Evaluate = function() {
		var c = this.m_fixtureA.m_body,
			e = this.m_fixtureB.m_body;
		P.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof d ? this.m_fixtureA.GetShape() : null, c.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, e.m_xf)
	};
	Box2D.inherit(s, Box2D.Dynamics.Contacts.b2Contact);
	s.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	s.b2PolyAndEdgeContact = function() {
		Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
	};
	s.Create = function() {
		return new s
	};
	s.Destroy = function() {};
	s.prototype.Reset = function(b, c) {
		this.__super.Reset.call(this, b, c);
		R.b2Assert(b.GetType() == e.e_polygonShape);
		R.b2Assert(c.GetType() == e.e_edgeShape)
	};
	s.prototype.Evaluate = function() {
		var b = this.m_fixtureA.GetBody(),
			e = this.m_fixtureB.GetBody();
		this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof d ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof c ? this.m_fixtureB.GetShape() : null, e.m_xf)
	};
	s.prototype.b2CollidePolyAndEdge = function() {};
	Box2D.inherit(I, Box2D.Dynamics.Contacts.b2Contact);
	I.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	I.b2PolygonContact = function() {
		Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
	};
	I.Create = function() {
		return new I
	};
	I.Destroy = function() {};
	I.prototype.Reset = function(b, c) {
		this.__super.Reset.call(this, b, c)
	};
	I.prototype.Evaluate = function() {
		var b = this.m_fixtureA.GetBody(),
			c = this.m_fixtureB.GetBody();
		P.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof d ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof d ? this.m_fixtureB.GetShape() : null, c.m_xf)
	};
	G.b2PositionSolverManifold = function() {};
	G.prototype.b2PositionSolverManifold = function() {
		this.m_normal = new O;
		this.m_separations = new Vector_a2j_Number(R.b2_maxManifoldPoints);
		this.m_points = new Vector(R.b2_maxManifoldPoints);
		for (var b = 0; b < R.b2_maxManifoldPoints; b++) this.m_points[b] = new O
	};
	G.prototype.Initialize = function(b) {
		R.b2Assert(0 < b.pointCount);
		var c = 0,
			d = 0,
			e = 0,
			f, g = 0,
			j = 0;
		switch (b.type) {
			case V.e_circles:
				f = b.bodyA.m_xf.R;
				e = b.localPoint;
				c = b.bodyA.m_xf.position.x + (f.col1.x * e.x + f.col2.x * e.y);
				d = b.bodyA.m_xf.position.y + (f.col1.y * e.x + f.col2.y * e.y);
				f = b.bodyB.m_xf.R;
				e = b.points[0].localPoint;
				g = b.bodyB.m_xf.position.x + (f.col1.x * e.x + f.col2.x * e.y);
				f = b.bodyB.m_xf.position.y + (f.col1.y * e.x + f.col2.y * e.y);
				var e = g - c,
					j = f - d,
					r = e * e + j * j;
				r > Number.MIN_VALUE * Number.MIN_VALUE ? (r = Math.sqrt(r), this.m_normal.x = e / r, this.m_normal.y = j / r) : (this.m_normal.x = 1, this.m_normal.y = 0);
				this.m_points[0].x = 0.5 * (c + g);
				this.m_points[0].y = 0.5 * (d + f);
				this.m_separations[0] = e * this.m_normal.x + j * this.m_normal.y - b.radius;
				break;
			case V.e_faceA:
				f = b.bodyA.m_xf.R;
				e = b.localPlaneNormal;
				this.m_normal.x = f.col1.x * e.x + f.col2.x * e.y;
				this.m_normal.y = f.col1.y * e.x + f.col2.y * e.y;
				f = b.bodyA.m_xf.R;
				e = b.localPoint;
				g = b.bodyA.m_xf.position.x + (f.col1.x * e.x + f.col2.x * e.y);
				j = b.bodyA.m_xf.position.y + (f.col1.y * e.x + f.col2.y * e.y);
				f = b.bodyB.m_xf.R;
				for (c = 0; c < b.pointCount; ++c) e = b.points[c].localPoint, d = b.bodyB.m_xf.position.x + (f.col1.x * e.x + f.col2.x * e.y), e = b.bodyB.m_xf.position.y + (f.col1.y * e.x + f.col2.y * e.y), this.m_separations[c] = (d - g) * this.m_normal.x + (e - j) * this.m_normal.y - b.radius, this.m_points[c].x = d, this.m_points[c].y = e;
				break;
			case V.e_faceB:
				f = b.bodyB.m_xf.R;
				e = b.localPlaneNormal;
				this.m_normal.x = f.col1.x * e.x + f.col2.x * e.y;
				this.m_normal.y = f.col1.y * e.x + f.col2.y * e.y;
				f = b.bodyB.m_xf.R;
				e = b.localPoint;
				g = b.bodyB.m_xf.position.x + (f.col1.x * e.x + f.col2.x * e.y);
				j = b.bodyB.m_xf.position.y +
					(f.col1.y * e.x + f.col2.y * e.y);
				f = b.bodyA.m_xf.R;
				for (c = 0; c < b.pointCount; ++c) e = b.points[c].localPoint, d = b.bodyA.m_xf.position.x + (f.col1.x * e.x + f.col2.x * e.y), e = b.bodyA.m_xf.position.y + (f.col1.y * e.x + f.col2.y * e.y), this.m_separations[c] = (d - g) * this.m_normal.x + (e - j) * this.m_normal.y - b.radius, this.m_points[c].Set(d, e);
				this.m_normal.x *= -1;
				this.m_normal.y *= -1
		}
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new O;
		Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new O
	})
})();
(function() {
	var b = Box2D.Common.Math.b2Mat22,
		c = Box2D.Common.Math.b2Math,
		d = Box2D.Common.Math.b2Vec2,
		e = Box2D.Common.b2Color,
		f = Box2D.Dynamics.Controllers.b2BuoyancyController,
		g = Box2D.Dynamics.Controllers.b2ConstantAccelController,
		m = Box2D.Dynamics.Controllers.b2ConstantForceController,
		l = Box2D.Dynamics.Controllers.b2Controller,
		j = Box2D.Dynamics.Controllers.b2ControllerEdge,
		q = Box2D.Dynamics.Controllers.b2GravityController,
		z = Box2D.Dynamics.Controllers.b2TensorDampingController;
	Box2D.inherit(f, Box2D.Dynamics.Controllers.b2Controller);
	f.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	f.b2BuoyancyController = function() {
		Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
		this.normal = new d(0, -1);
		this.density = this.offset = 0;
		this.velocity = new d(0, 0);
		this.linearDrag = 2;
		this.angularDrag = 1;
		this.useDensity = !1;
		this.useWorldGravity = !0;
		this.gravity = null
	};
	f.prototype.Step = function() {
		if (this.m_bodyList) {
			this.useWorldGravity && (this.gravity = this.GetWorld().GetGravity().Copy());
			for (var b = this.m_bodyList; b; b = b.nextBody) {
				var c = b.body;
				if (!1 != c.IsAwake()) {
					for (var e = new d, f = new d, g = 0, j = 0, l = c.GetFixtureList(); l; l = l.GetNext()) {
						var m = new d,
							q = l.GetShape().ComputeSubmergedArea(this.normal, this.offset, c.GetTransform(), m),
							g = g + q;
						e.x += q * m.x;
						e.y += q * m.y;
						var z = 0,
							z = 1,
							j = j + q * z;
						f.x += q * m.x * z;
						f.y += q * m.y * z
					}
					e.x /= g;
					e.y /= g;
					f.x /= j;
					f.y /= j;
					g < Number.MIN_VALUE || (j = this.gravity.GetNegative(), j.Multiply(this.density * g), c.ApplyForce(j, f), f = c.GetLinearVelocityFromWorldPoint(e), f.Subtract(this.velocity), f.Multiply(-this.linearDrag * g), c.ApplyForce(f, e), c.ApplyTorque(-c.GetInertia() / c.GetMass() * g * c.GetAngularVelocity() * this.angularDrag))
				}
			}
		}
	};
	f.prototype.Draw = function(b) {
		var c = new d,
			f = new d;
		c.x = this.normal.x * this.offset + 1E3 * this.normal.y;
		c.y = this.normal.y * this.offset - 1E3 * this.normal.x;
		f.x = this.normal.x * this.offset - 1E3 * this.normal.y;
		f.y = this.normal.y * this.offset + 1E3 * this.normal.x;
		var g = new e(0, 0, 1);
		b.DrawSegment(c, f, g)
	};
	Box2D.inherit(g, Box2D.Dynamics.Controllers.b2Controller);
	g.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	g.b2ConstantAccelController = function() {
		Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
		this.A = new d(0, 0)
	};
	g.prototype.Step = function(b) {
		b = new d(this.A.x * b.dt, this.A.y * b.dt);
		for (var c = this.m_bodyList; c; c = c.nextBody) {
			var e = c.body;
			e.IsAwake() && e.SetLinearVelocity(new d(e.GetLinearVelocity().x + b.x, e.GetLinearVelocity().y + b.y))
		}
	};
	Box2D.inherit(m, Box2D.Dynamics.Controllers.b2Controller);
	m.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	m.b2ConstantForceController = function() {
		Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
		this.F = new d(0, 0)
	};
	m.prototype.Step = function() {
		for (var b = this.m_bodyList; b; b = b.nextBody) {
			var c = b.body;
			c.IsAwake() && c.ApplyForce(this.F, c.GetWorldCenter())
		}
	};
	l.b2Controller = function() {};
	l.prototype.Step = function() {};
	l.prototype.Draw = function() {};
	l.prototype.AddBody = function(b) {
		var c = new j;
		c.controller = this;
		c.body = b;
		c.nextBody = this.m_bodyList;
		c.prevBody = null;
		this.m_bodyList = c;
		c.nextBody && (c.nextBody.prevBody = c);
		this.m_bodyCount++;
		c.nextController = b.m_controllerList;
		c.prevController = null;
		b.m_controllerList = c;
		c.nextController && (c.nextController.prevController = c);
		b.m_controllerCount++
	};
	l.prototype.RemoveBody = function(b) {
		for (var c = b.m_controllerList; c && c.controller != this;) c = c.nextController;
		c.prevBody && (c.prevBody.nextBody = c.nextBody);
		c.nextBody && (c.nextBody.prevBody = c.prevBody);
		c.nextController && (c.nextController.prevController = c.prevController);
		c.prevController && (c.prevController.nextController = c.nextController);
		this.m_bodyList == c && (this.m_bodyList = c.nextBody);
		b.m_controllerList == c && (b.m_controllerList = c.nextController);
		b.m_controllerCount--;
		this.m_bodyCount--
	};
	l.prototype.Clear = function() {
		for (; this.m_bodyList;) this.RemoveBody(this.m_bodyList.body)
	};
	l.prototype.GetNext = function() {
		return this.m_next
	};
	l.prototype.GetWorld = function() {
		return this.m_world
	};
	l.prototype.GetBodyList = function() {
		return this.m_bodyList
	};
	j.b2ControllerEdge = function() {};
	Box2D.inherit(q, Box2D.Dynamics.Controllers.b2Controller);
	q.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	q.b2GravityController = function() {
		Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
		this.G = 1;
		this.invSqr = !0
	};
	q.prototype.Step = function() {
		var b = null,
			c = null,
			e = null,
			f = 0,
			g = null,
			j = null,
			l = null,
			m = 0,
			q = 0,
			z = 0;
		if (this.invSqr)
			for (b = this.m_bodyList; b; b = b.nextBody) {
				c = b.body;
				e = c.GetWorldCenter();
				f = c.GetMass();
				for (g = this.m_bodyList; g != b; g = g.nextBody) j = g.body, l = j.GetWorldCenter(), m = l.x - e.x, q = l.y - e.y, z = m * m + q * q, z < Number.MIN_VALUE || (m = new d(m, q), m.Multiply(this.G / z / Math.sqrt(z) * f * j.GetMass()), c.IsAwake() && c.ApplyForce(m, e), m.Multiply(-1), j.IsAwake() && j.ApplyForce(m, l))
			} else
				for (b = this.m_bodyList; b; b = b.nextBody) {
					c = b.body;
					e = c.GetWorldCenter();
					f = c.GetMass();
					for (g = this.m_bodyList; g != b; g = g.nextBody) j = g.body, l = j.GetWorldCenter(), m = l.x - e.x, q = l.y - e.y, z = m * m + q * q, z < Number.MIN_VALUE || (m = new d(m, q), m.Multiply(this.G / z * f * j.GetMass()), c.IsAwake() && c.ApplyForce(m, e), m.Multiply(-1), j.IsAwake() && j.ApplyForce(m, l))
				}
	};
	Box2D.inherit(z, Box2D.Dynamics.Controllers.b2Controller);
	z.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	z.b2TensorDampingController = function() {
		Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
		this.T = new b;
		this.maxTimestep = 0
	};
	z.prototype.SetAxisAligned = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		this.T.col1.x = -b;
		this.T.col1.y = 0;
		this.T.col2.x = 0;
		this.T.col2.y = -c;
		this.maxTimestep = 0 < b || 0 < c ? 1 / Math.max(b, c) : 0
	};
	z.prototype.Step = function(b) {
		b = b.dt;
		if (!(b <= Number.MIN_VALUE)) {
			b > this.maxTimestep && 0 < this.maxTimestep && (b = this.maxTimestep);
			for (var e = this.m_bodyList; e; e = e.nextBody) {
				var f = e.body;
				if (f.IsAwake()) {
					var g = f.GetWorldVector(c.MulMV(this.T, f.GetLocalVector(f.GetLinearVelocity())));
					f.SetLinearVelocity(new d(f.GetLinearVelocity().x + g.x * b, f.GetLinearVelocity().y + g.y * b))
				}
			}
		}
	}
})();
(function() {
	var b = Box2D.Common.b2Settings,
		c = Box2D.Common.Math.b2Mat22,
		d = Box2D.Common.Math.b2Mat33,
		e = Box2D.Common.Math.b2Math,
		f = Box2D.Common.Math.b2Vec2,
		g = Box2D.Common.Math.b2Vec3,
		m = Box2D.Dynamics.Joints.b2DistanceJoint,
		l = Box2D.Dynamics.Joints.b2DistanceJointDef,
		j = Box2D.Dynamics.Joints.b2FrictionJoint,
		q = Box2D.Dynamics.Joints.b2FrictionJointDef,
		z = Box2D.Dynamics.Joints.b2GearJoint,
		y = Box2D.Dynamics.Joints.b2GearJointDef,
		A = Box2D.Dynamics.Joints.b2Jacobian,
		B = Box2D.Dynamics.Joints.b2Joint,
		E = Box2D.Dynamics.Joints.b2JointDef,
		F = Box2D.Dynamics.Joints.b2JointEdge,
		s = Box2D.Dynamics.Joints.b2LineJoint,
		I = Box2D.Dynamics.Joints.b2LineJointDef,
		G = Box2D.Dynamics.Joints.b2MouseJoint,
		C = Box2D.Dynamics.Joints.b2MouseJointDef,
		H = Box2D.Dynamics.Joints.b2PrismaticJoint,
		R = Box2D.Dynamics.Joints.b2PrismaticJointDef,
		K = Box2D.Dynamics.Joints.b2PulleyJoint,
		fa = Box2D.Dynamics.Joints.b2PulleyJointDef,
		O = Box2D.Dynamics.Joints.b2RevoluteJoint,
		P = Box2D.Dynamics.Joints.b2RevoluteJointDef,
		ba = Box2D.Dynamics.Joints.b2WeldJoint,
		V = Box2D.Dynamics.Joints.b2WeldJointDef;
	Box2D.inherit(m, Box2D.Dynamics.Joints.b2Joint);
	m.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	m.b2DistanceJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.m_localAnchor1 = new f;
		this.m_localAnchor2 = new f;
		this.m_u = new f
	};
	m.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
	};
	m.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
	};
	m.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * this.m_impulse * this.m_u.x, b * this.m_impulse * this.m_u.y)
	};
	m.prototype.GetReactionTorque = function() {
		return 0
	};
	m.prototype.GetLength = function() {
		return this.m_length
	};
	m.prototype.SetLength = function(b) {
		void 0 === b && (b = 0);
		this.m_length = b
	};
	m.prototype.GetFrequency = function() {
		return this.m_frequencyHz
	};
	m.prototype.SetFrequency = function(b) {
		void 0 === b && (b = 0);
		this.m_frequencyHz = b
	};
	m.prototype.GetDampingRatio = function() {
		return this.m_dampingRatio
	};
	m.prototype.SetDampingRatio = function(b) {
		void 0 === b && (b = 0);
		this.m_dampingRatio = b
	};
	m.prototype.b2DistanceJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_localAnchor1.SetV(b.localAnchorA);
		this.m_localAnchor2.SetV(b.localAnchorB);
		this.m_length = b.length;
		this.m_frequencyHz = b.frequencyHz;
		this.m_dampingRatio = b.dampingRatio;
		this.m_bias = this.m_gamma = this.m_impulse = 0
	};
	m.prototype.InitVelocityConstraints = function(c) {
		var d, e = 0,
			f = this.m_bodyA,
			g = this.m_bodyB;
		d = f.m_xf.R;
		var j = this.m_localAnchor1.x - f.m_sweep.localCenter.x,
			l = this.m_localAnchor1.y - f.m_sweep.localCenter.y,
			e = d.col1.x * j + d.col2.x * l,
			l = d.col1.y * j + d.col2.y * l,
			j = e;
		d = g.m_xf.R;
		var n = this.m_localAnchor2.x - g.m_sweep.localCenter.x,
			m = this.m_localAnchor2.y - g.m_sweep.localCenter.y,
			e = d.col1.x * n + d.col2.x * m,
			m = d.col1.y * n + d.col2.y * m,
			n = e;
		this.m_u.x = g.m_sweep.c.x + n - f.m_sweep.c.x - j;
		this.m_u.y = g.m_sweep.c.y + m - f.m_sweep.c.y - l;
		e = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
		e > b.b2_linearSlop ? this.m_u.Multiply(1 / e) : this.m_u.SetZero();
		d = j * this.m_u.y - l * this.m_u.x;
		var q = n * this.m_u.y - m * this.m_u.x;
		d = f.m_invMass + f.m_invI * d * d + g.m_invMass + g.m_invI * q * q;
		this.m_mass = 0 != d ? 1 / d : 0;
		if (0 < this.m_frequencyHz) {
			var e = e - this.m_length,
				q = 2 * Math.PI * this.m_frequencyHz,
				x = this.m_mass * q * q;
			this.m_gamma = c.dt * (2 * this.m_mass * this.m_dampingRatio * q + c.dt * x);
			this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
			this.m_bias = e * c.dt * x * this.m_gamma;
			this.m_mass = d + this.m_gamma;
			this.m_mass = 0 != this.m_mass ? 1 / this.m_mass : 0
		}
		c.warmStarting ? (this.m_impulse *= c.dtRatio, c = this.m_impulse * this.m_u.x, d = this.m_impulse * this.m_u.y, f.m_linearVelocity.x -= f.m_invMass * c, f.m_linearVelocity.y -= f.m_invMass * d, f.m_angularVelocity -= f.m_invI * (j * d - l * c), g.m_linearVelocity.x += g.m_invMass * c, g.m_linearVelocity.y += g.m_invMass * d, g.m_angularVelocity += g.m_invI * (n * d - m * c)) : this.m_impulse = 0
	};
	m.prototype.SolveVelocityConstraints = function() {
		var b, c = this.m_bodyA,
			d = this.m_bodyB;
		b = c.m_xf.R;
		var e = this.m_localAnchor1.x - c.m_sweep.localCenter.x,
			f = this.m_localAnchor1.y - c.m_sweep.localCenter.y,
			g = b.col1.x * e + b.col2.x * f,
			f = b.col1.y * e + b.col2.y * f,
			e = g;
		b = d.m_xf.R;
		var j = this.m_localAnchor2.x - d.m_sweep.localCenter.x,
			l = this.m_localAnchor2.y -
			d.m_sweep.localCenter.y,
			g = b.col1.x * j + b.col2.x * l,
			l = b.col1.y * j + b.col2.y * l,
			j = g,
			g = -this.m_mass * (this.m_u.x * (d.m_linearVelocity.x + -d.m_angularVelocity * l - (c.m_linearVelocity.x + -c.m_angularVelocity * f)) + this.m_u.y * (d.m_linearVelocity.y + d.m_angularVelocity * j - (c.m_linearVelocity.y + c.m_angularVelocity * e)) + this.m_bias + this.m_gamma * this.m_impulse);
		this.m_impulse += g;
		b = g * this.m_u.x;
		g *= this.m_u.y;
		c.m_linearVelocity.x -= c.m_invMass * b;
		c.m_linearVelocity.y -= c.m_invMass * g;
		c.m_angularVelocity -= c.m_invI * (e * g - f * b);
		d.m_linearVelocity.x += d.m_invMass * b;
		d.m_linearVelocity.y += d.m_invMass * g;
		d.m_angularVelocity += d.m_invI * (j * g - l * b)
	};
	m.prototype.SolvePositionConstraints = function() {
		var c;
		if (0 < this.m_frequencyHz) return !0;
		var d = this.m_bodyA,
			f = this.m_bodyB;
		c = d.m_xf.R;
		var g = this.m_localAnchor1.x - d.m_sweep.localCenter.x,
			j = this.m_localAnchor1.y - d.m_sweep.localCenter.y,
			l = c.col1.x * g + c.col2.x * j,
			j = c.col1.y * g + c.col2.y * j,
			g = l;
		c = f.m_xf.R;
		var m = this.m_localAnchor2.x - f.m_sweep.localCenter.x,
			n = this.m_localAnchor2.y - f.m_sweep.localCenter.y,
			l = c.col1.x * m + c.col2.x * n,
			n = c.col1.y * m + c.col2.y * n,
			m = l,
			l = f.m_sweep.c.x + m - d.m_sweep.c.x - g,
			u = f.m_sweep.c.y + n - d.m_sweep.c.y - j;
		c = Math.sqrt(l * l + u * u);
		l /= c;
		u /= c;
		c -= this.m_length;
		c = e.Clamp(c, -b.b2_maxLinearCorrection, b.b2_maxLinearCorrection);
		var q = -this.m_mass * c;
		this.m_u.Set(l, u);
		l = q * this.m_u.x;
		u = q * this.m_u.y;
		d.m_sweep.c.x -= d.m_invMass * l;
		d.m_sweep.c.y -= d.m_invMass * u;
		d.m_sweep.a -= d.m_invI * (g * u - j * l);
		f.m_sweep.c.x += f.m_invMass * l;
		f.m_sweep.c.y += f.m_invMass * u;
		f.m_sweep.a += f.m_invI * (m * u - n * l);
		d.SynchronizeTransform();
		f.SynchronizeTransform();
		return e.Abs(c) < b.b2_linearSlop
	};
	Box2D.inherit(l, Box2D.Dynamics.Joints.b2JointDef);
	l.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	l.b2DistanceJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.localAnchorA = new f;
		this.localAnchorB = new f
	};
	l.prototype.b2DistanceJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_distanceJoint;
		this.length = 1;
		this.dampingRatio = this.frequencyHz = 0
	};
	l.prototype.Initialize = function(b, c, d, e) {
		this.bodyA = b;
		this.bodyB = c;
		this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
		this.localAnchorB.SetV(this.bodyB.GetLocalPoint(e));
		b = e.x - d.x;
		d = e.y - d.y;
		this.length = Math.sqrt(b * b + d * d);
		this.dampingRatio = this.frequencyHz = 0
	};
	Box2D.inherit(j, Box2D.Dynamics.Joints.b2Joint);
	j.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	j.b2FrictionJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.m_localAnchorA = new f;
		this.m_localAnchorB = new f;
		this.m_linearMass = new c;
		this.m_linearImpulse = new f
	};
	j.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
	};
	j.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
	};
	j.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * this.m_linearImpulse.x, b * this.m_linearImpulse.y)
	};
	j.prototype.GetReactionTorque = function(b) {
		void 0 === b && (b = 0);
		return b * this.m_angularImpulse
	};
	j.prototype.SetMaxForce = function(b) {
		void 0 === b && (b = 0);
		this.m_maxForce = b
	};
	j.prototype.GetMaxForce = function() {
		return this.m_maxForce
	};
	j.prototype.SetMaxTorque = function(b) {
		void 0 === b && (b = 0);
		this.m_maxTorque = b
	};
	j.prototype.GetMaxTorque = function() {
		return this.m_maxTorque
	};
	j.prototype.b2FrictionJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_localAnchorA.SetV(b.localAnchorA);
		this.m_localAnchorB.SetV(b.localAnchorB);
		this.m_linearMass.SetZero();
		this.m_angularMass = 0;
		this.m_linearImpulse.SetZero();
		this.m_angularImpulse = 0;
		this.m_maxForce = b.maxForce;
		this.m_maxTorque = b.maxTorque
	};
	j.prototype.InitVelocityConstraints = function(b) {
		var d, e = 0,
			f = this.m_bodyA,
			g = this.m_bodyB;
		d = f.m_xf.R;
		var j = this.m_localAnchorA.x - f.m_sweep.localCenter.x,
			l = this.m_localAnchorA.y - f.m_sweep.localCenter.y,
			e = d.col1.x * j + d.col2.x * l,
			l = d.col1.y * j + d.col2.y * l,
			j = e;
		d = g.m_xf.R;
		var n = this.m_localAnchorB.x - g.m_sweep.localCenter.x,
			m = this.m_localAnchorB.y - g.m_sweep.localCenter.y,
			e = d.col1.x * n + d.col2.x * m,
			m = d.col1.y * n + d.col2.y * m,
			n = e;
		d = f.m_invMass;
		var e = g.m_invMass,
			q = f.m_invI,
			x = g.m_invI,
			s = new c;
		s.col1.x = d + e;
		s.col2.x = 0;
		s.col1.y = 0;
		s.col2.y = d + e;
		s.col1.x += q * l * l;
		s.col2.x += -q * j * l;
		s.col1.y += -q * j * l;
		s.col2.y += q * j * j;
		s.col1.x += x * m * m;
		s.col2.x += -x * n * m;
		s.col1.y += -x * n * m;
		s.col2.y += x * n * n;
		s.GetInverse(this.m_linearMass);
		this.m_angularMass = q + x;
		0 < this.m_angularMass && (this.m_angularMass = 1 / this.m_angularMass);
		b.warmStarting ? (this.m_linearImpulse.x *= b.dtRatio, this.m_linearImpulse.y *= b.dtRatio, this.m_angularImpulse *= b.dtRatio, b = this.m_linearImpulse, f.m_linearVelocity.x -= d * b.x, f.m_linearVelocity.y -= d * b.y, f.m_angularVelocity -= q * (j * b.y - l * b.x + this.m_angularImpulse), g.m_linearVelocity.x += e * b.x, g.m_linearVelocity.y += e * b.y, g.m_angularVelocity += x * (n * b.y - m * b.x + this.m_angularImpulse)) : (this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0)
	};
	j.prototype.SolveVelocityConstraints = function(b) {
		var c, d = 0,
			g = this.m_bodyA,
			j = this.m_bodyB,
			l = g.m_linearVelocity,
			m = g.m_angularVelocity,
			n = j.m_linearVelocity,
			u = j.m_angularVelocity,
			q = g.m_invMass,
			x = j.m_invMass,
			s = g.m_invI,
			y = j.m_invI;
		c = g.m_xf.R;
		var z = this.m_localAnchorA.x - g.m_sweep.localCenter.x,
			A = this.m_localAnchorA.y - g.m_sweep.localCenter.y,
			d = c.col1.x * z + c.col2.x * A,
			A = c.col1.y * z + c.col2.y * A,
			z = d;
		c = j.m_xf.R;
		var B = this.m_localAnchorB.x - j.m_sweep.localCenter.x,
			C = this.m_localAnchorB.y - j.m_sweep.localCenter.y,
			d = c.col1.x * B + c.col2.x * C,
			C = c.col1.y * B + c.col2.y * C,
			B = d,
			d = -this.m_angularMass * (u - m),
			E = this.m_angularImpulse;
		c = b.dt * this.m_maxTorque;
		this.m_angularImpulse = e.Clamp(this.m_angularImpulse + d, -c, c);
		d = this.m_angularImpulse - E;
		m -= s * d;
		u += y * d;
		c = e.MulMV(this.m_linearMass, new f(-(n.x - u * C - l.x + m * A), -(n.y + u * B - l.y - m * z)));
		d = this.m_linearImpulse.Copy();
		this.m_linearImpulse.Add(c);
		c = b.dt * this.m_maxForce;
		this.m_linearImpulse.LengthSquared() > c * c && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(c));
		c = e.SubtractVV(this.m_linearImpulse, d);
		l.x -= q * c.x;
		l.y -= q * c.y;
		m -= s * (z * c.y - A * c.x);
		n.x += x * c.x;
		n.y += x * c.y;
		u += y * (B * c.y - C * c.x);
		g.m_angularVelocity = m;
		j.m_angularVelocity = u
	};
	j.prototype.SolvePositionConstraints = function() {
		return !0
	};
	Box2D.inherit(q, Box2D.Dynamics.Joints.b2JointDef);
	q.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	q.b2FrictionJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.localAnchorA = new f;
		this.localAnchorB = new f
	};
	q.prototype.b2FrictionJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_frictionJoint;
		this.maxTorque = this.maxForce = 0
	};
	q.prototype.Initialize = function(b, c, d) {
		this.bodyA = b;
		this.bodyB = c;
		this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
		this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d))
	};
	Box2D.inherit(z, Box2D.Dynamics.Joints.b2Joint);
	z.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	z.b2GearJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.m_groundAnchor1 = new f;
		this.m_groundAnchor2 = new f;
		this.m_localAnchor1 = new f;
		this.m_localAnchor2 = new f;
		this.m_J = new A
	};
	z.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
	};
	z.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
	};
	z.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * this.m_impulse * this.m_J.linearB.x, b * this.m_impulse * this.m_J.linearB.y)
	};
	z.prototype.GetReactionTorque = function(b) {
		void 0 === b && (b = 0);
		var c = this.m_bodyB.m_xf.R,
			d = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x,
			e = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y,
			f = c.col1.x * d + c.col2.x * e,
			e = c.col1.y * d + c.col2.y * e;
		return b * (this.m_impulse * this.m_J.angularB - f * this.m_impulse * this.m_J.linearB.y + e * this.m_impulse * this.m_J.linearB.x)
	};
	z.prototype.GetRatio = function() {
		return this.m_ratio
	};
	z.prototype.SetRatio = function(b) {
		void 0 === b && (b = 0);
		this.m_ratio = b
	};
	z.prototype.b2GearJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		var c = parseInt(b.joint1.m_type),
			d = parseInt(b.joint2.m_type);
		this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
		var e = 0,
			f = 0;
		this.m_ground1 = b.joint1.GetBodyA();
		this.m_bodyA = b.joint1.GetBodyB();
		c == B.e_revoluteJoint ? (this.m_revolute1 = b.joint1 instanceof O ? b.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), e = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = b.joint1 instanceof H ? b.joint1 : null, this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), e = this.m_prismatic1.GetJointTranslation());
		this.m_ground2 = b.joint2.GetBodyA();
		this.m_bodyB = b.joint2.GetBodyB();
		d == B.e_revoluteJoint ? (this.m_revolute2 = b.joint2 instanceof O ? b.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), f = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = b.joint2 instanceof H ? b.joint2 : null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), f = this.m_prismatic2.GetJointTranslation());
		this.m_ratio = b.ratio;
		this.m_constant = e + this.m_ratio * f;
		this.m_impulse = 0
	};
	z.prototype.InitVelocityConstraints = function(b) {
		var c = this.m_ground1,
			d = this.m_ground2,
			e = this.m_bodyA,
			f = this.m_bodyB,
			g = 0,
			j = 0,
			l = 0,
			m = 0,
			q = 0,
			x = 0;
		this.m_J.SetZero();
		this.m_revolute1 ? (this.m_J.angularA = -1, x += e.m_invI) : (c = c.m_xf.R, j = this.m_prismatic1.m_localXAxis1, g = c.col1.x * j.x + c.col2.x * j.y, j = c.col1.y * j.x + c.col2.y * j.y, c = e.m_xf.R, l = this.m_localAnchor1.x - e.m_sweep.localCenter.x, m = this.m_localAnchor1.y - e.m_sweep.localCenter.y, q = c.col1.x * l + c.col2.x * m, m = c.col1.y * l + c.col2.y * m, l = q * j - m * g, this.m_J.linearA.Set(-g, -j), this.m_J.angularA = -l, x += e.m_invMass + e.m_invI * l * l);
		this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, x += this.m_ratio * this.m_ratio * f.m_invI) : (c = d.m_xf.R, j = this.m_prismatic2.m_localXAxis1, g = c.col1.x * j.x + c.col2.x * j.y, j = c.col1.y * j.x + c.col2.y * j.y, c = f.m_xf.R, l = this.m_localAnchor2.x -
			f.m_sweep.localCenter.x, m = this.m_localAnchor2.y - f.m_sweep.localCenter.y, q = c.col1.x * l + c.col2.x * m, m = c.col1.y * l + c.col2.y * m, l = q * j - m * g, this.m_J.linearB.Set(-this.m_ratio * g, -this.m_ratio * j), this.m_J.angularB = -this.m_ratio * l, x += this.m_ratio * this.m_ratio * (f.m_invMass + f.m_invI * l * l));
		this.m_mass = 0 < x ? 1 / x : 0;
		b.warmStarting ? (e.m_linearVelocity.x += e.m_invMass * this.m_impulse * this.m_J.linearA.x, e.m_linearVelocity.y += e.m_invMass * this.m_impulse * this.m_J.linearA.y, e.m_angularVelocity += e.m_invI * this.m_impulse * this.m_J.angularA, f.m_linearVelocity.x += f.m_invMass * this.m_impulse * this.m_J.linearB.x, f.m_linearVelocity.y += f.m_invMass * this.m_impulse * this.m_J.linearB.y, f.m_angularVelocity += f.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
	};
	z.prototype.SolveVelocityConstraints = function() {
		var b = this.m_bodyA,
			c = this.m_bodyB,
			d = -this.m_mass * this.m_J.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity);
		this.m_impulse += d;
		b.m_linearVelocity.x += b.m_invMass * d * this.m_J.linearA.x;
		b.m_linearVelocity.y += b.m_invMass * d * this.m_J.linearA.y;
		b.m_angularVelocity += b.m_invI * d * this.m_J.angularA;
		c.m_linearVelocity.x += c.m_invMass * d * this.m_J.linearB.x;
		c.m_linearVelocity.y += c.m_invMass * d * this.m_J.linearB.y;
		c.m_angularVelocity += c.m_invI * d * this.m_J.angularB
	};
	z.prototype.SolvePositionConstraints = function() {
		var c = this.m_bodyA,
			d = this.m_bodyB,
			e = 0,
			f = 0,
			e = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation(),
			f = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation(),
			e = -this.m_mass * (this.m_constant - (e + this.m_ratio * f));
		c.m_sweep.c.x += c.m_invMass * e * this.m_J.linearA.x;
		c.m_sweep.c.y += c.m_invMass * e * this.m_J.linearA.y;
		c.m_sweep.a += c.m_invI * e * this.m_J.angularA;
		d.m_sweep.c.x += d.m_invMass * e * this.m_J.linearB.x;
		d.m_sweep.c.y += d.m_invMass * e * this.m_J.linearB.y;
		d.m_sweep.a += d.m_invI * e * this.m_J.angularB;
		c.SynchronizeTransform();
		d.SynchronizeTransform();
		return 0 < b.b2_linearSlop
	};
	Box2D.inherit(y, Box2D.Dynamics.Joints.b2JointDef);
	y.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	y.b2GearJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
	};
	y.prototype.b2GearJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_gearJoint;
		this.joint2 = this.joint1 = null;
		this.ratio = 1
	};
	A.b2Jacobian = function() {
		this.linearA = new f;
		this.linearB = new f
	};
	A.prototype.SetZero = function() {
		this.linearA.SetZero();
		this.angularA = 0;
		this.linearB.SetZero();
		this.angularB = 0
	};
	A.prototype.Set = function(b, c, d, e) {
		void 0 === c && (c = 0);
		void 0 === e && (e = 0);
		this.linearA.SetV(b);
		this.angularA = c;
		this.linearB.SetV(d);
		this.angularB = e
	};
	A.prototype.Compute = function(b, c, d, e) {
		void 0 === c && (c = 0);
		void 0 === e && (e = 0);
		return this.linearA.x * b.x + this.linearA.y * b.y + this.angularA * c + (this.linearB.x * d.x + this.linearB.y * d.y) + this.angularB * e
	};
	B.b2Joint = function() {
		this.m_edgeA = new F;
		this.m_edgeB = new F;
		this.m_localCenterA = new f;
		this.m_localCenterB = new f
	};
	B.prototype.GetType = function() {
		return this.m_type
	};
	B.prototype.GetAnchorA = function() {
		return null
	};
	B.prototype.GetAnchorB = function() {
		return null
	};
	B.prototype.GetReactionForce = function() {
		return null
	};
	B.prototype.GetReactionTorque = function() {
		return 0
	};
	B.prototype.GetBodyA = function() {
		return this.m_bodyA
	};
	B.prototype.GetBodyB = function() {
		return this.m_bodyB
	};
	B.prototype.GetNext = function() {
		return this.m_next
	};
	B.prototype.GetUserData = function() {
		return this.m_userData
	};
	B.prototype.SetUserData = function(b) {
		this.m_userData = b
	};
	B.prototype.IsActive = function() {
		return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
	};
	B.Create = function(b) {
		var c = null;
		switch (b.type) {
			case B.e_distanceJoint:
				c = new m(b instanceof l ? b : null);
				break;
			case B.e_mouseJoint:
				c = new G(b instanceof C ? b : null);
				break;
			case B.e_prismaticJoint:
				c = new H(b instanceof R ? b : null);
				break;
			case B.e_revoluteJoint:
				c = new O(b instanceof P ? b : null);
				break;
			case B.e_pulleyJoint:
				c = new K(b instanceof fa ? b : null);
				break;
			case B.e_gearJoint:
				c = new z(b instanceof y ? b : null);
				break;
			case B.e_lineJoint:
				c = new s(b instanceof I ? b : null);
				break;
			case B.e_weldJoint:
				c = new ba(b instanceof V ? b : null);
				break;
			case B.e_frictionJoint:
				c = new j(b instanceof q ? b : null)
		}
		return c
	};
	B.Destroy = function() {};
	B.prototype.b2Joint = function(c) {
		b.b2Assert(c.bodyA != c.bodyB);
		this.m_type = c.type;
		this.m_next = this.m_prev = null;
		this.m_bodyA = c.bodyA;
		this.m_bodyB = c.bodyB;
		this.m_collideConnected = c.collideConnected;
		this.m_islandFlag = !1;
		this.m_userData = c.userData
	};
	B.prototype.InitVelocityConstraints = function() {};
	B.prototype.SolveVelocityConstraints = function() {};
	B.prototype.FinalizeVelocityConstraints = function() {};
	B.prototype.SolvePositionConstraints = function() {
		return !1
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
		Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
		Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
		Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
		Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
		Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
		Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
		Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
		Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
		Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
		Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
		Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
		Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
		Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
	});
	E.b2JointDef = function() {};
	E.prototype.b2JointDef = function() {
		this.type = B.e_unknownJoint;
		this.bodyB = this.bodyA = this.userData = null;
		this.collideConnected = !1
	};
	F.b2JointEdge = function() {};
	Box2D.inherit(s, Box2D.Dynamics.Joints.b2Joint);
	s.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	s.b2LineJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.m_localAnchor1 = new f;
		this.m_localAnchor2 = new f;
		this.m_localXAxis1 = new f;
		this.m_localYAxis1 = new f;
		this.m_axis = new f;
		this.m_perp = new f;
		this.m_K = new c;
		this.m_impulse = new f
	};
	s.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
	};
	s.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
	};
	s.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), b * (this.m_impulse.x * this.m_perp.y +
			(this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
	};
	s.prototype.GetReactionTorque = function(b) {
		void 0 === b && (b = 0);
		return b * this.m_impulse.y
	};
	s.prototype.GetJointTranslation = function() {
		var b = this.m_bodyA,
			c = this.m_bodyB,
			d = b.GetWorldPoint(this.m_localAnchor1),
			e = c.GetWorldPoint(this.m_localAnchor2),
			c = e.x - d.x,
			d = e.y - d.y,
			b = b.GetWorldVector(this.m_localXAxis1);
		return b.x * c + b.y * d
	};
	s.prototype.GetJointSpeed = function() {
		var b = this.m_bodyA,
			c = this.m_bodyB,
			d;
		d = b.m_xf.R;
		var e = this.m_localAnchor1.x - b.m_sweep.localCenter.x,
			f = this.m_localAnchor1.y - b.m_sweep.localCenter.y,
			g = d.col1.x * e + d.col2.x * f,
			f = d.col1.y * e + d.col2.y * f,
			e = g;
		d = c.m_xf.R;
		var j = this.m_localAnchor2.x - c.m_sweep.localCenter.x,
			l = this.m_localAnchor2.y - c.m_sweep.localCenter.y,
			g = d.col1.x * j + d.col2.x * l,
			l = d.col1.y * j + d.col2.y * l,
			j = g;
		d = c.m_sweep.c.x + j - (b.m_sweep.c.x + e);
		var g = c.m_sweep.c.y + l - (b.m_sweep.c.y + f),
			m = b.GetWorldVector(this.m_localXAxis1),
			q = b.m_linearVelocity,
			x = c.m_linearVelocity,
			b = b.m_angularVelocity,
			c = c.m_angularVelocity;
		return d * -b * m.y + g * b * m.x + (m.x * (x.x + -c * l - q.x - -b * f) + m.y * (x.y + c * j - q.y - b * e))
	};
	s.prototype.IsLimitEnabled = function() {
		return this.m_enableLimit
	};
	s.prototype.EnableLimit = function(b) {
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_enableLimit = b
	};
	s.prototype.GetLowerLimit = function() {
		return this.m_lowerTranslation
	};
	s.prototype.GetUpperLimit = function() {
		return this.m_upperTranslation
	};
	s.prototype.SetLimits = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_lowerTranslation = b;
		this.m_upperTranslation = c
	};
	s.prototype.IsMotorEnabled = function() {
		return this.m_enableMotor
	};
	s.prototype.EnableMotor = function(b) {
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_enableMotor = b
	};
	s.prototype.SetMotorSpeed = function(b) {
		void 0 === b && (b = 0);
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_motorSpeed = b
	};
	s.prototype.GetMotorSpeed = function() {
		return this.m_motorSpeed
	};
	s.prototype.SetMaxMotorForce = function(b) {
		void 0 === b && (b = 0);
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_maxMotorForce = b
	};
	s.prototype.GetMaxMotorForce = function() {
		return this.m_maxMotorForce
	};
	s.prototype.GetMotorForce = function() {
		return this.m_motorImpulse
	};
	s.prototype.b2LineJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_localAnchor1.SetV(b.localAnchorA);
		this.m_localAnchor2.SetV(b.localAnchorB);
		this.m_localXAxis1.SetV(b.localAxisA);
		this.m_localYAxis1.x = -this.m_localXAxis1.y;
		this.m_localYAxis1.y = this.m_localXAxis1.x;
		this.m_impulse.SetZero();
		this.m_motorImpulse = this.m_motorMass = 0;
		this.m_lowerTranslation = b.lowerTranslation;
		this.m_upperTranslation = b.upperTranslation;
		this.m_maxMotorForce = b.maxMotorForce;
		this.m_motorSpeed = b.motorSpeed;
		this.m_enableLimit = b.enableLimit;
		this.m_enableMotor = b.enableMotor;
		this.m_limitState = B.e_inactiveLimit;
		this.m_axis.SetZero();
		this.m_perp.SetZero()
	};
	s.prototype.InitVelocityConstraints = function(c) {
		var d = this.m_bodyA,
			f = this.m_bodyB,
			g, j = 0;
		this.m_localCenterA.SetV(d.GetLocalCenter());
		this.m_localCenterB.SetV(f.GetLocalCenter());
		var l = d.GetTransform();
		f.GetTransform();
		g = d.m_xf.R;
		var m = this.m_localAnchor1.x -
			this.m_localCenterA.x,
			n = this.m_localAnchor1.y - this.m_localCenterA.y,
			j = g.col1.x * m + g.col2.x * n,
			n = g.col1.y * m + g.col2.y * n,
			m = j;
		g = f.m_xf.R;
		var u = this.m_localAnchor2.x - this.m_localCenterB.x,
			q = this.m_localAnchor2.y - this.m_localCenterB.y,
			j = g.col1.x * u + g.col2.x * q,
			q = g.col1.y * u + g.col2.y * q,
			u = j;
		g = f.m_sweep.c.x + u - d.m_sweep.c.x - m;
		j = f.m_sweep.c.y + q - d.m_sweep.c.y - n;
		this.m_invMassA = d.m_invMass;
		this.m_invMassB = f.m_invMass;
		this.m_invIA = d.m_invI;
		this.m_invIB = f.m_invI;
		this.m_axis.SetV(e.MulMV(l.R, this.m_localXAxis1));
		this.m_a1 = (g + m) * this.m_axis.y - (j + n) * this.m_axis.x;
		this.m_a2 = u * this.m_axis.y - q * this.m_axis.x;
		this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
		this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
		this.m_perp.SetV(e.MulMV(l.R, this.m_localYAxis1));
		this.m_s1 = (g + m) * this.m_perp.y - (j + n) * this.m_perp.x;
		this.m_s2 = u * this.m_perp.y - q * this.m_perp.x;
		l = this.m_invMassA;
		m = this.m_invMassB;
		n = this.m_invIA;
		u = this.m_invIB;
		this.m_K.col1.x = l + m + n * this.m_s1 * this.m_s1 + u * this.m_s2 * this.m_s2;
		this.m_K.col1.y = n * this.m_s1 * this.m_a1 + u * this.m_s2 * this.m_a2;
		this.m_K.col2.x = this.m_K.col1.y;
		this.m_K.col2.y = l + m + n * this.m_a1 * this.m_a1 + u * this.m_a2 * this.m_a2;
		this.m_enableLimit ? (g = this.m_axis.x * g + this.m_axis.y * j, e.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? this.m_limitState = B.e_equalLimits : g <= this.m_lowerTranslation ? this.m_limitState != B.e_atLowerLimit && (this.m_limitState = B.e_atLowerLimit, this.m_impulse.y = 0) : g >= this.m_upperTranslation ? this.m_limitState != B.e_atUpperLimit && (this.m_limitState = B.e_atUpperLimit, this.m_impulse.y = 0) : (this.m_limitState = B.e_inactiveLimit, this.m_impulse.y = 0)) : this.m_limitState = B.e_inactiveLimit;
		!1 == this.m_enableMotor && (this.m_motorImpulse = 0);
		c.warmStarting ? (this.m_impulse.x *= c.dtRatio, this.m_impulse.y *= c.dtRatio, this.m_motorImpulse *= c.dtRatio, c = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y, j = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1, l = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2, d.m_linearVelocity.x -= this.m_invMassA * c, d.m_linearVelocity.y -= this.m_invMassA * g, d.m_angularVelocity -= this.m_invIA * j, f.m_linearVelocity.x += this.m_invMassB * c, f.m_linearVelocity.y += this.m_invMassB * g, f.m_angularVelocity += this.m_invIB * l) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
	};
	s.prototype.SolveVelocityConstraints = function(b) {
		var c = this.m_bodyA,
			d = this.m_bodyB,
			g = c.m_linearVelocity,
			j = c.m_angularVelocity,
			l = d.m_linearVelocity,
			m = d.m_angularVelocity,
			n = 0,
			u = 0,
			q = 0,
			x = 0;
		this.m_enableMotor && this.m_limitState != B.e_equalLimits && (x = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (l.x - g.x) + this.m_axis.y * (l.y - g.y) + this.m_a2 * m - this.m_a1 * j)), n = this.m_motorImpulse, u = b.dt * this.m_maxMotorForce, this.m_motorImpulse = e.Clamp(this.m_motorImpulse + x, -u, u), x = this.m_motorImpulse - n, n = x * this.m_axis.x, u = x * this.m_axis.y, q = x * this.m_a1, x *= this.m_a2, g.x -= this.m_invMassA * n, g.y -= this.m_invMassA * u, j -= this.m_invIA * q, l.x += this.m_invMassB * n, l.y += this.m_invMassB * u, m += this.m_invIB * x);
		u = this.m_perp.x * (l.x - g.x) + this.m_perp.y * (l.y - g.y) + this.m_s2 * m - this.m_s1 * j;
		this.m_enableLimit && this.m_limitState != B.e_inactiveLimit ? (q = this.m_axis.x * (l.x - g.x) + this.m_axis.y * (l.y - g.y) + this.m_a2 * m - this.m_a1 * j, n = this.m_impulse.Copy(), b = this.m_K.Solve(new f, -u, -q), this.m_impulse.Add(b), this.m_limitState == B.e_atLowerLimit ? this.m_impulse.y = e.Max(this.m_impulse.y, 0) : this.m_limitState == B.e_atUpperLimit && (this.m_impulse.y = e.Min(this.m_impulse.y, 0)), u = -u - (this.m_impulse.y - n.y) * this.m_K.col2.x, q = 0 != this.m_K.col1.x ? u / this.m_K.col1.x + n.x : n.x, this.m_impulse.x = q, b.x = this.m_impulse.x - n.x, b.y = this.m_impulse.y - n.y, n = b.x * this.m_perp.x + b.y * this.m_axis.x, u = b.x * this.m_perp.y + b.y * this.m_axis.y, q = b.x * this.m_s1 + b.y * this.m_a1, x = b.x * this.m_s2 + b.y * this.m_a2) : (b = 0 != this.m_K.col1.x ? -u / this.m_K.col1.x : 0, this.m_impulse.x += b, n = b * this.m_perp.x, u = b * this.m_perp.y, q = b * this.m_s1, x = b * this.m_s2);
		g.x -= this.m_invMassA * n;
		g.y -= this.m_invMassA * u;
		j -= this.m_invIA * q;
		l.x += this.m_invMassB * n;
		l.y += this.m_invMassB * u;
		m += this.m_invIB * x;
		c.m_linearVelocity.SetV(g);
		c.m_angularVelocity = j;
		d.m_linearVelocity.SetV(l);
		d.m_angularVelocity = m
	};
	s.prototype.SolvePositionConstraints = function() {
		var d = this.m_bodyA,
			g = this.m_bodyB,
			j = d.m_sweep.c,
			l = d.m_sweep.a,
			m = g.m_sweep.c,
			q = g.m_sweep.a,
			s, n = 0,
			u = 0,
			y = 0,
			x = 0,
			z = 0,
			A = 0,
			u = !1,
			B = 0,
			C = c.FromAngle(l),
			y = c.FromAngle(q);
		s = C;
		var A = this.m_localAnchor1.x - this.m_localCenterA.x,
			E = this.m_localAnchor1.y - this.m_localCenterA.y,
			n = s.col1.x * A + s.col2.x * E,
			E = s.col1.y * A + s.col2.y * E,
			A = n;
		s = y;
		y = this.m_localAnchor2.x - this.m_localCenterB.x;
		x = this.m_localAnchor2.y - this.m_localCenterB.y;
		n = s.col1.x * y + s.col2.x * x;
		x = s.col1.y * y + s.col2.y * x;
		y = n;
		s = m.x + y - j.x - A;
		n = m.y + x - j.y - E;
		if (this.m_enableLimit) {
			this.m_axis = e.MulMV(C, this.m_localXAxis1);
			this.m_a1 = (s + A) * this.m_axis.y - (n + E) * this.m_axis.x;
			this.m_a2 = y * this.m_axis.y - x * this.m_axis.x;
			var F = this.m_axis.x * s + this.m_axis.y * n;
			e.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? (B = e.Clamp(F, -b.b2_maxLinearCorrection, b.b2_maxLinearCorrection), z = e.Abs(F), u = !0) : F <= this.m_lowerTranslation ? (B = e.Clamp(F - this.m_lowerTranslation + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), z = this.m_lowerTranslation - F, u = !0) : F >= this.m_upperTranslation && (B = e.Clamp(F - this.m_upperTranslation + b.b2_linearSlop, 0, b.b2_maxLinearCorrection), z = F - this.m_upperTranslation, u = !0)
		}
		this.m_perp = e.MulMV(C, this.m_localYAxis1);
		this.m_s1 = (s + A) * this.m_perp.y - (n + E) * this.m_perp.x;
		this.m_s2 = y * this.m_perp.y - x * this.m_perp.x;
		C = new f;
		E = this.m_perp.x * s + this.m_perp.y * n;
		z = e.Max(z, e.Abs(E));
		A = 0;
		u ? (u = this.m_invMassA, y = this.m_invMassB, x = this.m_invIA, s = this.m_invIB, this.m_K.col1.x = u + y + x * this.m_s1 * this.m_s1 + s * this.m_s2 * this.m_s2, this.m_K.col1.y = x * this.m_s1 * this.m_a1 + s * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = u + y + x * this.m_a1 * this.m_a1 + s * this.m_a2 * this.m_a2, this.m_K.Solve(C, -E, -B)) : (u = this.m_invMassA, y = this.m_invMassB, x = this.m_invIA, s = this.m_invIB, B = u + y + x * this.m_s1 * this.m_s1 + s * this.m_s2 * this.m_s2, C.x = 0 != B ? -E / B : 0, C.y = 0);
		B = C.x * this.m_perp.x + C.y * this.m_axis.x;
		u = C.x * this.m_perp.y + C.y * this.m_axis.y;
		E = C.x * this.m_s1 + C.y * this.m_a1;
		C = C.x * this.m_s2 + C.y * this.m_a2;
		j.x -= this.m_invMassA * B;
		j.y -= this.m_invMassA * u;
		l -= this.m_invIA * E;
		m.x += this.m_invMassB * B;
		m.y += this.m_invMassB * u;
		q += this.m_invIB * C;
		d.m_sweep.a = l;
		g.m_sweep.a = q;
		d.SynchronizeTransform();
		g.SynchronizeTransform();
		return z <= b.b2_linearSlop && A <= b.b2_angularSlop
	};
	Box2D.inherit(I, Box2D.Dynamics.Joints.b2JointDef);
	I.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	I.b2LineJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.localAnchorA = new f;
		this.localAnchorB = new f;
		this.localAxisA = new f
	};
	I.prototype.b2LineJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_lineJoint;
		this.localAxisA.Set(1, 0);
		this.enableLimit = !1;
		this.upperTranslation = this.lowerTranslation = 0;
		this.enableMotor = !1;
		this.motorSpeed = this.maxMotorForce = 0
	};
	I.prototype.Initialize = function(b, c, d, e) {
		this.bodyA = b;
		this.bodyB = c;
		this.localAnchorA = this.bodyA.GetLocalPoint(d);
		this.localAnchorB = this.bodyB.GetLocalPoint(d);
		this.localAxisA = this.bodyA.GetLocalVector(e)
	};
	Box2D.inherit(G, Box2D.Dynamics.Joints.b2Joint);
	G.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	G.b2MouseJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.K = new c;
		this.K1 = new c;
		this.K2 = new c;
		this.m_localAnchor = new f;
		this.m_target = new f;
		this.m_impulse = new f;
		this.m_mass = new c;
		this.m_C = new f
	};
	G.prototype.GetAnchorA = function() {
		return this.m_target
	};
	G.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
	};
	G.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * this.m_impulse.x, b * this.m_impulse.y)
	};
	G.prototype.GetReactionTorque = function() {
		return 0
	};
	G.prototype.GetTarget = function() {
		return this.m_target
	};
	G.prototype.SetTarget = function(b) {
		!1 == this.m_bodyB.IsAwake() && this.m_bodyB.SetAwake(!0);
		this.m_target = b
	};
	G.prototype.GetMaxForce = function() {
		return this.m_maxForce
	};
	G.prototype.SetMaxForce = function(b) {
		void 0 === b && (b = 0);
		this.m_maxForce = b
	};
	G.prototype.GetFrequency = function() {
		return this.m_frequencyHz
	};
	G.prototype.SetFrequency = function(b) {
		void 0 === b && (b = 0);
		this.m_frequencyHz = b
	};
	G.prototype.GetDampingRatio = function() {
		return this.m_dampingRatio
	};
	G.prototype.SetDampingRatio = function(b) {
		void 0 === b && (b = 0);
		this.m_dampingRatio = b
	};
	G.prototype.b2MouseJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_target.SetV(b.target);
		var c = this.m_target.x - this.m_bodyB.m_xf.position.x,
			d = this.m_target.y - this.m_bodyB.m_xf.position.y,
			e = this.m_bodyB.m_xf.R;
		this.m_localAnchor.x = c * e.col1.x + d * e.col1.y;
		this.m_localAnchor.y = c * e.col2.x + d * e.col2.y;
		this.m_maxForce = b.maxForce;
		this.m_impulse.SetZero();
		this.m_frequencyHz = b.frequencyHz;
		this.m_dampingRatio = b.dampingRatio;
		this.m_gamma = this.m_beta = 0
	};
	G.prototype.InitVelocityConstraints = function(b) {
		var c = this.m_bodyB,
			d = c.GetMass(),
			e = 2 * Math.PI * this.m_frequencyHz,
			f = d * e * e;
		this.m_gamma = b.dt * (2 * d * this.m_dampingRatio * e + b.dt * f);
		this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
		this.m_beta = b.dt * f * this.m_gamma;
		var f = c.m_xf.R,
			d = this.m_localAnchor.x - c.m_sweep.localCenter.x,
			e = this.m_localAnchor.y -
			c.m_sweep.localCenter.y,
			g = f.col1.x * d + f.col2.x * e,
			e = f.col1.y * d + f.col2.y * e,
			d = g,
			f = c.m_invMass,
			g = c.m_invI;
		this.K1.col1.x = f;
		this.K1.col2.x = 0;
		this.K1.col1.y = 0;
		this.K1.col2.y = f;
		this.K2.col1.x = g * e * e;
		this.K2.col2.x = -g * d * e;
		this.K2.col1.y = -g * d * e;
		this.K2.col2.y = g * d * d;
		this.K.SetM(this.K1);
		this.K.AddM(this.K2);
		this.K.col1.x += this.m_gamma;
		this.K.col2.y += this.m_gamma;
		this.K.GetInverse(this.m_mass);
		this.m_C.x = c.m_sweep.c.x + d - this.m_target.x;
		this.m_C.y = c.m_sweep.c.y + e - this.m_target.y;
		c.m_angularVelocity *= 0.98;
		this.m_impulse.x *= b.dtRatio;
		this.m_impulse.y *= b.dtRatio;
		c.m_linearVelocity.x += f * this.m_impulse.x;
		c.m_linearVelocity.y += f * this.m_impulse.y;
		c.m_angularVelocity += g * (d * this.m_impulse.y - e * this.m_impulse.x)
	};
	G.prototype.SolveVelocityConstraints = function(b) {
		var c = this.m_bodyB,
			d, e = 0,
			f = 0;
		d = c.m_xf.R;
		var g = this.m_localAnchor.x - c.m_sweep.localCenter.x,
			j = this.m_localAnchor.y - c.m_sweep.localCenter.y,
			e = d.col1.x * g + d.col2.x * j,
			j = d.col1.y * g + d.col2.y * j,
			g = e,
			e = c.m_linearVelocity.x + -c.m_angularVelocity * j,
			l = c.m_linearVelocity.y + c.m_angularVelocity * g;
		d = this.m_mass;
		e = e + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
		f = l + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
		l = -(d.col1.x * e + d.col2.x * f);
		f = -(d.col1.y * e + d.col2.y * f);
		d = this.m_impulse.x;
		e = this.m_impulse.y;
		this.m_impulse.x += l;
		this.m_impulse.y += f;
		b = b.dt * this.m_maxForce;
		this.m_impulse.LengthSquared() > b * b && this.m_impulse.Multiply(b / this.m_impulse.Length());
		l = this.m_impulse.x - d;
		f = this.m_impulse.y - e;
		c.m_linearVelocity.x += c.m_invMass * l;
		c.m_linearVelocity.y += c.m_invMass * f;
		c.m_angularVelocity += c.m_invI * (g * f - j * l)
	};
	G.prototype.SolvePositionConstraints = function() {
		return !0
	};
	Box2D.inherit(C, Box2D.Dynamics.Joints.b2JointDef);
	C.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	C.b2MouseJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.target = new f
	};
	C.prototype.b2MouseJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_mouseJoint;
		this.maxForce = 0;
		this.frequencyHz = 5;
		this.dampingRatio = 0.7
	};
	Box2D.inherit(H, Box2D.Dynamics.Joints.b2Joint);
	H.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	H.b2PrismaticJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.m_localAnchor1 = new f;
		this.m_localAnchor2 = new f;
		this.m_localXAxis1 = new f;
		this.m_localYAxis1 = new f;
		this.m_axis = new f;
		this.m_perp = new f;
		this.m_K = new d;
		this.m_impulse = new g
	};
	H.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
	};
	H.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
	};
	H.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), b * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
	};
	H.prototype.GetReactionTorque = function(b) {
		void 0 === b && (b = 0);
		return b * this.m_impulse.y
	};
	H.prototype.GetJointTranslation = function() {
		var b = this.m_bodyA,
			c = this.m_bodyB,
			d = b.GetWorldPoint(this.m_localAnchor1),
			e = c.GetWorldPoint(this.m_localAnchor2),
			c = e.x - d.x,
			d = e.y - d.y,
			b = b.GetWorldVector(this.m_localXAxis1);
		return b.x * c + b.y * d
	};
	H.prototype.GetJointSpeed = function() {
		var b = this.m_bodyA,
			c = this.m_bodyB,
			d;
		d = b.m_xf.R;
		var e = this.m_localAnchor1.x - b.m_sweep.localCenter.x,
			f = this.m_localAnchor1.y - b.m_sweep.localCenter.y,
			g = d.col1.x * e + d.col2.x * f,
			f = d.col1.y * e + d.col2.y * f,
			e = g;
		d = c.m_xf.R;
		var j = this.m_localAnchor2.x - c.m_sweep.localCenter.x,
			l = this.m_localAnchor2.y - c.m_sweep.localCenter.y,
			g = d.col1.x * j + d.col2.x * l,
			l = d.col1.y * j + d.col2.y * l,
			j = g;
		d = c.m_sweep.c.x + j - (b.m_sweep.c.x +
			e);
		var g = c.m_sweep.c.y + l - (b.m_sweep.c.y + f),
			m = b.GetWorldVector(this.m_localXAxis1),
			q = b.m_linearVelocity,
			x = c.m_linearVelocity,
			b = b.m_angularVelocity,
			c = c.m_angularVelocity;
		return d * -b * m.y + g * b * m.x + (m.x * (x.x + -c * l - q.x - -b * f) + m.y * (x.y + c * j - q.y - b * e))
	};
	H.prototype.IsLimitEnabled = function() {
		return this.m_enableLimit
	};
	H.prototype.EnableLimit = function(b) {
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_enableLimit = b
	};
	H.prototype.GetLowerLimit = function() {
		return this.m_lowerTranslation
	};
	H.prototype.GetUpperLimit = function() {
		return this.m_upperTranslation
	};
	H.prototype.SetLimits = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_lowerTranslation = b;
		this.m_upperTranslation = c
	};
	H.prototype.IsMotorEnabled = function() {
		return this.m_enableMotor
	};
	H.prototype.EnableMotor = function(b) {
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_enableMotor = b
	};
	H.prototype.SetMotorSpeed = function(b) {
		void 0 === b && (b = 0);
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_motorSpeed = b
	};
	H.prototype.GetMotorSpeed = function() {
		return this.m_motorSpeed
	};
	H.prototype.SetMaxMotorForce = function(b) {
		void 0 === b && (b = 0);
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_maxMotorForce = b
	};
	H.prototype.GetMotorForce = function() {
		return this.m_motorImpulse
	};
	H.prototype.b2PrismaticJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_localAnchor1.SetV(b.localAnchorA);
		this.m_localAnchor2.SetV(b.localAnchorB);
		this.m_localXAxis1.SetV(b.localAxisA);
		this.m_localYAxis1.x = -this.m_localXAxis1.y;
		this.m_localYAxis1.y = this.m_localXAxis1.x;
		this.m_refAngle = b.referenceAngle;
		this.m_impulse.SetZero();
		this.m_motorImpulse = this.m_motorMass = 0;
		this.m_lowerTranslation = b.lowerTranslation;
		this.m_upperTranslation = b.upperTranslation;
		this.m_maxMotorForce = b.maxMotorForce;
		this.m_motorSpeed = b.motorSpeed;
		this.m_enableLimit = b.enableLimit;
		this.m_enableMotor = b.enableMotor;
		this.m_limitState = B.e_inactiveLimit;
		this.m_axis.SetZero();
		this.m_perp.SetZero()
	};
	H.prototype.InitVelocityConstraints = function(c) {
		var d = this.m_bodyA,
			f = this.m_bodyB,
			g, j = 0;
		this.m_localCenterA.SetV(d.GetLocalCenter());
		this.m_localCenterB.SetV(f.GetLocalCenter());
		var l = d.GetTransform();
		f.GetTransform();
		g = d.m_xf.R;
		var m = this.m_localAnchor1.x - this.m_localCenterA.x,
			n = this.m_localAnchor1.y - this.m_localCenterA.y,
			j = g.col1.x * m + g.col2.x * n,
			n = g.col1.y * m + g.col2.y * n,
			m = j;
		g = f.m_xf.R;
		var u = this.m_localAnchor2.x - this.m_localCenterB.x,
			q = this.m_localAnchor2.y - this.m_localCenterB.y,
			j = g.col1.x * u + g.col2.x * q,
			q = g.col1.y * u + g.col2.y * q,
			u = j;
		g = f.m_sweep.c.x + u - d.m_sweep.c.x -
			m;
		j = f.m_sweep.c.y + q - d.m_sweep.c.y - n;
		this.m_invMassA = d.m_invMass;
		this.m_invMassB = f.m_invMass;
		this.m_invIA = d.m_invI;
		this.m_invIB = f.m_invI;
		this.m_axis.SetV(e.MulMV(l.R, this.m_localXAxis1));
		this.m_a1 = (g + m) * this.m_axis.y - (j + n) * this.m_axis.x;
		this.m_a2 = u * this.m_axis.y - q * this.m_axis.x;
		this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
		this.m_motorMass > Number.MIN_VALUE && (this.m_motorMass = 1 / this.m_motorMass);
		this.m_perp.SetV(e.MulMV(l.R, this.m_localYAxis1));
		this.m_s1 = (g + m) * this.m_perp.y - (j + n) * this.m_perp.x;
		this.m_s2 = u * this.m_perp.y - q * this.m_perp.x;
		l = this.m_invMassA;
		m = this.m_invMassB;
		n = this.m_invIA;
		u = this.m_invIB;
		this.m_K.col1.x = l + m + n * this.m_s1 * this.m_s1 + u * this.m_s2 * this.m_s2;
		this.m_K.col1.y = n * this.m_s1 + u * this.m_s2;
		this.m_K.col1.z = n * this.m_s1 * this.m_a1 + u * this.m_s2 * this.m_a2;
		this.m_K.col2.x = this.m_K.col1.y;
		this.m_K.col2.y = n + u;
		this.m_K.col2.z = n * this.m_a1 + u * this.m_a2;
		this.m_K.col3.x = this.m_K.col1.z;
		this.m_K.col3.y = this.m_K.col2.z;
		this.m_K.col3.z = l + m + n * this.m_a1 * this.m_a1 + u * this.m_a2 * this.m_a2;
		this.m_enableLimit ? (g = this.m_axis.x * g + this.m_axis.y * j, e.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? this.m_limitState = B.e_equalLimits : g <= this.m_lowerTranslation ? this.m_limitState != B.e_atLowerLimit && (this.m_limitState = B.e_atLowerLimit, this.m_impulse.z = 0) : g >= this.m_upperTranslation ? this.m_limitState != B.e_atUpperLimit && (this.m_limitState = B.e_atUpperLimit, this.m_impulse.z = 0) : (this.m_limitState = B.e_inactiveLimit, this.m_impulse.z = 0)) : this.m_limitState = B.e_inactiveLimit;
		!1 == this.m_enableMotor && (this.m_motorImpulse = 0);
		c.warmStarting ? (this.m_impulse.x *= c.dtRatio, this.m_impulse.y *= c.dtRatio, this.m_motorImpulse *= c.dtRatio, c = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x, g = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y, j = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, l = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse +
			this.m_impulse.z) * this.m_a2, d.m_linearVelocity.x -= this.m_invMassA * c, d.m_linearVelocity.y -= this.m_invMassA * g, d.m_angularVelocity -= this.m_invIA * j, f.m_linearVelocity.x += this.m_invMassB * c, f.m_linearVelocity.y += this.m_invMassB * g, f.m_angularVelocity += this.m_invIB * l) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
	};
	H.prototype.SolveVelocityConstraints = function(b) {
		var c = this.m_bodyA,
			d = this.m_bodyB,
			j = c.m_linearVelocity,
			l = c.m_angularVelocity,
			m = d.m_linearVelocity,
			q = d.m_angularVelocity,
			n = 0,
			u = 0,
			s = 0,
			x = 0;
		this.m_enableMotor && this.m_limitState != B.e_equalLimits && (x = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (m.x - j.x) + this.m_axis.y * (m.y - j.y) + this.m_a2 * q - this.m_a1 * l)), n = this.m_motorImpulse, b = b.dt * this.m_maxMotorForce, this.m_motorImpulse = e.Clamp(this.m_motorImpulse + x, -b, b), x = this.m_motorImpulse - n, n = x * this.m_axis.x, u = x * this.m_axis.y, s = x * this.m_a1, x *= this.m_a2, j.x -= this.m_invMassA * n, j.y -= this.m_invMassA * u, l -= this.m_invIA * s, m.x += this.m_invMassB * n, m.y += this.m_invMassB * u, q += this.m_invIB * x);
		s = this.m_perp.x * (m.x - j.x) + this.m_perp.y * (m.y - j.y) + this.m_s2 * q - this.m_s1 * l;
		u = q - l;
		this.m_enableLimit && this.m_limitState != B.e_inactiveLimit ? (b = this.m_axis.x * (m.x - j.x) + this.m_axis.y * (m.y - j.y) + this.m_a2 * q - this.m_a1 * l, n = this.m_impulse.Copy(), b = this.m_K.Solve33(new g, -s, -u, -b), this.m_impulse.Add(b), this.m_limitState == B.e_atLowerLimit ? this.m_impulse.z = e.Max(this.m_impulse.z, 0) : this.m_limitState == B.e_atUpperLimit && (this.m_impulse.z = e.Min(this.m_impulse.z, 0)), s = -s - (this.m_impulse.z - n.z) * this.m_K.col3.x, u = -u - (this.m_impulse.z - n.z) * this.m_K.col3.y, u = this.m_K.Solve22(new f, s, u), u.x += n.x, u.y += n.y, this.m_impulse.x = u.x, this.m_impulse.y = u.y, b.x = this.m_impulse.x - n.x, b.y = this.m_impulse.y - n.y, b.z = this.m_impulse.z - n.z, n = b.x * this.m_perp.x + b.z * this.m_axis.x, u = b.x * this.m_perp.y + b.z * this.m_axis.y, s = b.x * this.m_s1 + b.y + b.z * this.m_a1, x = b.x * this.m_s2 + b.y + b.z * this.m_a2) : (b = this.m_K.Solve22(new f, -s, -u), this.m_impulse.x += b.x, this.m_impulse.y += b.y, n = b.x * this.m_perp.x, u = b.x * this.m_perp.y, s = b.x * this.m_s1 + b.y, x = b.x * this.m_s2 + b.y);
		j.x -= this.m_invMassA * n;
		j.y -= this.m_invMassA * u;
		l -= this.m_invIA * s;
		m.x += this.m_invMassB * n;
		m.y += this.m_invMassB * u;
		q += this.m_invIB * x;
		c.m_linearVelocity.SetV(j);
		c.m_angularVelocity = l;
		d.m_linearVelocity.SetV(m);
		d.m_angularVelocity = q
	};
	H.prototype.SolvePositionConstraints = function() {
		var d = this.m_bodyA,
			j = this.m_bodyB,
			l = d.m_sweep.c,
			m = d.m_sweep.a,
			q = j.m_sweep.c,
			s = j.m_sweep.a,
			y, n = 0,
			u = 0,
			z = 0,
			x = 0,
			A = 0,
			u = !1,
			B = 0,
			C = c.FromAngle(m),
			E = c.FromAngle(s);
		y = C;
		var A = this.m_localAnchor1.x - this.m_localCenterA.x,
			F = this.m_localAnchor1.y - this.m_localCenterA.y,
			n = y.col1.x * A + y.col2.x * F,
			F = y.col1.y * A + y.col2.y * F,
			A = n;
		y = E;
		E = this.m_localAnchor2.x - this.m_localCenterB.x;
		z = this.m_localAnchor2.y - this.m_localCenterB.y;
		n = y.col1.x * E + y.col2.x * z;
		z = y.col1.y * E + y.col2.y * z;
		E = n;
		y = q.x + E - l.x - A;
		n = q.y + z - l.y - F;
		if (this.m_enableLimit) {
			this.m_axis = e.MulMV(C, this.m_localXAxis1);
			this.m_a1 = (y + A) * this.m_axis.y - (n + F) * this.m_axis.x;
			this.m_a2 = E * this.m_axis.y - z * this.m_axis.x;
			var G = this.m_axis.x * y + this.m_axis.y * n;
			e.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b.b2_linearSlop ? (B = e.Clamp(G, -b.b2_maxLinearCorrection, b.b2_maxLinearCorrection), x = e.Abs(G), u = !0) : G <= this.m_lowerTranslation ? (B = e.Clamp(G - this.m_lowerTranslation + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), x = this.m_lowerTranslation - G, u = !0) : G >= this.m_upperTranslation && (B = e.Clamp(G - this.m_upperTranslation + b.b2_linearSlop, 0, b.b2_maxLinearCorrection), x = G - this.m_upperTranslation, u = !0)
		}
		this.m_perp = e.MulMV(C, this.m_localYAxis1);
		this.m_s1 = (y + A) * this.m_perp.y - (n + F) * this.m_perp.x;
		this.m_s2 = E * this.m_perp.y - z * this.m_perp.x;
		C = new g;
		F = this.m_perp.x * y + this.m_perp.y * n;
		E = s - m - this.m_refAngle;
		x = e.Max(x, e.Abs(F));
		A = e.Abs(E);
		u ? (u = this.m_invMassA, z = this.m_invMassB, y = this.m_invIA, n = this.m_invIB, this.m_K.col1.x = u + z + y * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2, this.m_K.col1.y = y * this.m_s1 + n * this.m_s2, this.m_K.col1.z = y * this.m_s1 * this.m_a1 + n * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = y + n, this.m_K.col2.z = y * this.m_a1 + n * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = u + z + y * this.m_a1 * this.m_a1 + n * this.m_a2 * this.m_a2, this.m_K.Solve33(C, -F, -E, -B)) : (u = this.m_invMassA, z = this.m_invMassB, y = this.m_invIA, n = this.m_invIB, B = y * this.m_s1 + n * this.m_s2, G = y + n, this.m_K.col1.Set(u + z + y * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2, B, 0), this.m_K.col2.Set(B, G, 0), B = this.m_K.Solve22(new f, -F, -E), C.x = B.x, C.y = B.y, C.z = 0);
		B = C.x * this.m_perp.x + C.z * this.m_axis.x;
		u = C.x * this.m_perp.y + C.z * this.m_axis.y;
		F = C.x * this.m_s1 + C.y + C.z * this.m_a1;
		C = C.x * this.m_s2 + C.y + C.z * this.m_a2;
		l.x -= this.m_invMassA * B;
		l.y -= this.m_invMassA * u;
		m -= this.m_invIA * F;
		q.x += this.m_invMassB * B;
		q.y += this.m_invMassB * u;
		s += this.m_invIB * C;
		d.m_sweep.a = m;
		j.m_sweep.a = s;
		d.SynchronizeTransform();
		j.SynchronizeTransform();
		return x <= b.b2_linearSlop && A <= b.b2_angularSlop
	};
	Box2D.inherit(R, Box2D.Dynamics.Joints.b2JointDef);
	R.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	R.b2PrismaticJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.localAnchorA = new f;
		this.localAnchorB = new f;
		this.localAxisA = new f
	};
	R.prototype.b2PrismaticJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_prismaticJoint;
		this.localAxisA.Set(1, 0);
		this.referenceAngle = 0;
		this.enableLimit = !1;
		this.upperTranslation = this.lowerTranslation = 0;
		this.enableMotor = !1;
		this.motorSpeed = this.maxMotorForce = 0
	};
	R.prototype.Initialize = function(b, c, d, e) {
		this.bodyA = b;
		this.bodyB = c;
		this.localAnchorA = this.bodyA.GetLocalPoint(d);
		this.localAnchorB = this.bodyB.GetLocalPoint(d);
		this.localAxisA = this.bodyA.GetLocalVector(e);
		this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
	};
	Box2D.inherit(K, Box2D.Dynamics.Joints.b2Joint);
	K.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	K.b2PulleyJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.m_groundAnchor1 = new f;
		this.m_groundAnchor2 = new f;
		this.m_localAnchor1 = new f;
		this.m_localAnchor2 = new f;
		this.m_u1 = new f;
		this.m_u2 = new f
	};
	K.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
	};
	K.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
	};
	K.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * this.m_impulse * this.m_u2.x, b * this.m_impulse * this.m_u2.y)
	};
	K.prototype.GetReactionTorque = function() {
		return 0
	};
	K.prototype.GetGroundAnchorA = function() {
		var b = this.m_ground.m_xf.position.Copy();
		b.Add(this.m_groundAnchor1);
		return b
	};
	K.prototype.GetGroundAnchorB = function() {
		var b = this.m_ground.m_xf.position.Copy();
		b.Add(this.m_groundAnchor2);
		return b
	};
	K.prototype.GetLength1 = function() {
		var b = this.m_bodyA.GetWorldPoint(this.m_localAnchor1),
			c = b.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x),
			b = b.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
		return Math.sqrt(c * c + b * b)
	};
	K.prototype.GetLength2 = function() {
		var b = this.m_bodyB.GetWorldPoint(this.m_localAnchor2),
			c = b.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x),
			b = b.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
		return Math.sqrt(c * c + b * b)
	};
	K.prototype.GetRatio = function() {
		return this.m_ratio
	};
	K.prototype.b2PulleyJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_ground = this.m_bodyA.m_world.m_groundBody;
		this.m_groundAnchor1.x = b.groundAnchorA.x - this.m_ground.m_xf.position.x;
		this.m_groundAnchor1.y = b.groundAnchorA.y - this.m_ground.m_xf.position.y;
		this.m_groundAnchor2.x = b.groundAnchorB.x - this.m_ground.m_xf.position.x;
		this.m_groundAnchor2.y = b.groundAnchorB.y - this.m_ground.m_xf.position.y;
		this.m_localAnchor1.SetV(b.localAnchorA);
		this.m_localAnchor2.SetV(b.localAnchorB);
		this.m_ratio = b.ratio;
		this.m_constant = b.lengthA + this.m_ratio * b.lengthB;
		this.m_maxLength1 = e.Min(b.maxLengthA, this.m_constant - this.m_ratio * K.b2_minPulleyLength);
		this.m_maxLength2 = e.Min(b.maxLengthB, (this.m_constant - K.b2_minPulleyLength) / this.m_ratio);
		this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
	};
	K.prototype.InitVelocityConstraints = function(c) {
		var d = this.m_bodyA,
			e = this.m_bodyB,
			f;
		f = d.m_xf.R;
		var g = this.m_localAnchor1.x - d.m_sweep.localCenter.x,
			j = this.m_localAnchor1.y - d.m_sweep.localCenter.y,
			l = f.col1.x * g + f.col2.x * j,
			j = f.col1.y * g + f.col2.y * j,
			g = l;
		f = e.m_xf.R;
		var n = this.m_localAnchor2.x - e.m_sweep.localCenter.x,
			m = this.m_localAnchor2.y - e.m_sweep.localCenter.y,
			l = f.col1.x * n + f.col2.x * m,
			m = f.col1.y * n + f.col2.y * m,
			n = l;
		f = e.m_sweep.c.x + n;
		var l = e.m_sweep.c.y + m,
			q = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
			x = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
		this.m_u1.Set(d.m_sweep.c.x + g - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), d.m_sweep.c.y + j - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
		this.m_u2.Set(f - q, l - x);
		f = this.m_u1.Length();
		l = this.m_u2.Length();
		f > b.b2_linearSlop ? this.m_u1.Multiply(1 / f) : this.m_u1.SetZero();
		l > b.b2_linearSlop ? this.m_u2.Multiply(1 / l) : this.m_u2.SetZero();
		0 < this.m_constant - f - this.m_ratio * l ? (this.m_state = B.e_inactiveLimit, this.m_impulse = 0) : this.m_state = B.e_atUpperLimit;
		f < this.m_maxLength1 ? (this.m_limitState1 = B.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = B.e_atUpperLimit;
		l < this.m_maxLength2 ? (this.m_limitState2 = B.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = B.e_atUpperLimit;
		f = g * this.m_u1.y - j * this.m_u1.x;
		l = n * this.m_u2.y - m * this.m_u2.x;
		this.m_limitMass1 = d.m_invMass + d.m_invI * f * f;
		this.m_limitMass2 = e.m_invMass + e.m_invI * l * l;
		this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
		this.m_limitMass1 = 1 / this.m_limitMass1;
		this.m_limitMass2 = 1 / this.m_limitMass2;
		this.m_pulleyMass = 1 / this.m_pulleyMass;
		c.warmStarting ? (this.m_impulse *= c.dtRatio, this.m_limitImpulse1 *= c.dtRatio, this.m_limitImpulse2 *= c.dtRatio, c = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x, f = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y, l = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x, q = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y, d.m_linearVelocity.x += d.m_invMass * c, d.m_linearVelocity.y += d.m_invMass * f, d.m_angularVelocity += d.m_invI * (g * f - j * c), e.m_linearVelocity.x += e.m_invMass * l, e.m_linearVelocity.y += e.m_invMass * q, e.m_angularVelocity += e.m_invI * (n * q - m * l)) : this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
	};
	K.prototype.SolveVelocityConstraints = function() {
		var b = this.m_bodyA,
			c = this.m_bodyB,
			d;
		d = b.m_xf.R;
		var f = this.m_localAnchor1.x - b.m_sweep.localCenter.x,
			g = this.m_localAnchor1.y -
			b.m_sweep.localCenter.y,
			j = d.col1.x * f + d.col2.x * g,
			g = d.col1.y * f + d.col2.y * g,
			f = j;
		d = c.m_xf.R;
		var l = this.m_localAnchor2.x - c.m_sweep.localCenter.x,
			n = this.m_localAnchor2.y - c.m_sweep.localCenter.y,
			j = d.col1.x * l + d.col2.x * n,
			n = d.col1.y * l + d.col2.y * n,
			l = j,
			m = 0,
			q = 0;
		this.m_state == B.e_atUpperLimit && (d = b.m_linearVelocity.x + -b.m_angularVelocity * g, j = b.m_linearVelocity.y + b.m_angularVelocity * f, m = c.m_linearVelocity.x + -c.m_angularVelocity * n, q = c.m_linearVelocity.y + c.m_angularVelocity * l, d = -(this.m_u1.x * d + this.m_u1.y * j) - this.m_ratio * (this.m_u2.x * m + this.m_u2.y * q), q = this.m_pulleyMass * -d, d = this.m_impulse, this.m_impulse = e.Max(0, this.m_impulse + q), q = this.m_impulse - d, d = -q * this.m_u1.x, j = -q * this.m_u1.y, m = -this.m_ratio * q * this.m_u2.x, q = -this.m_ratio * q * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * d, b.m_linearVelocity.y += b.m_invMass * j, b.m_angularVelocity += b.m_invI * (f * j - g * d), c.m_linearVelocity.x += c.m_invMass * m, c.m_linearVelocity.y += c.m_invMass * q, c.m_angularVelocity += c.m_invI * (l * q - n * m));
		this.m_limitState1 == B.e_atUpperLimit && (d = b.m_linearVelocity.x +
			-b.m_angularVelocity * g, j = b.m_linearVelocity.y + b.m_angularVelocity * f, d = -(this.m_u1.x * d + this.m_u1.y * j), q = -this.m_limitMass1 * d, d = this.m_limitImpulse1, this.m_limitImpulse1 = e.Max(0, this.m_limitImpulse1 + q), q = this.m_limitImpulse1 - d, d = -q * this.m_u1.x, j = -q * this.m_u1.y, b.m_linearVelocity.x += b.m_invMass * d, b.m_linearVelocity.y += b.m_invMass * j, b.m_angularVelocity += b.m_invI * (f * j - g * d));
		this.m_limitState2 == B.e_atUpperLimit && (m = c.m_linearVelocity.x + -c.m_angularVelocity * n, q = c.m_linearVelocity.y + c.m_angularVelocity * l, d = -(this.m_u2.x * m + this.m_u2.y * q), q = -this.m_limitMass2 * d, d = this.m_limitImpulse2, this.m_limitImpulse2 = e.Max(0, this.m_limitImpulse2 + q), q = this.m_limitImpulse2 - d, m = -q * this.m_u2.x, q = -q * this.m_u2.y, c.m_linearVelocity.x += c.m_invMass * m, c.m_linearVelocity.y += c.m_invMass * q, c.m_angularVelocity += c.m_invI * (l * q - n * m))
	};
	K.prototype.SolvePositionConstraints = function() {
		var c = this.m_bodyA,
			d = this.m_bodyB,
			f, g = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
			j = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
			l = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
			m = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
			n = 0,
			q = 0,
			s = 0,
			x = 0,
			y = 0,
			z = 0,
			A = 0,
			C = 0;
		this.m_state == B.e_atUpperLimit && (f = c.m_xf.R, n = this.m_localAnchor1.x - c.m_sweep.localCenter.x, q = this.m_localAnchor1.y - c.m_sweep.localCenter.y, y = f.col1.x * n + f.col2.x * q, q = f.col1.y * n + f.col2.y * q, n = y, f = d.m_xf.R, s = this.m_localAnchor2.x - d.m_sweep.localCenter.x, x = this.m_localAnchor2.y - d.m_sweep.localCenter.y, y = f.col1.x * s + f.col2.x * x, x = f.col1.y * s + f.col2.y * x, s = y, f = c.m_sweep.c.x +
			n, y = c.m_sweep.c.y + q, z = d.m_sweep.c.x + s, A = d.m_sweep.c.y + x, this.m_u1.Set(f - g, y - j), this.m_u2.Set(z - l, A - m), f = this.m_u1.Length(), y = this.m_u2.Length(), f > b.b2_linearSlop ? this.m_u1.Multiply(1 / f) : this.m_u1.SetZero(), y > b.b2_linearSlop ? this.m_u2.Multiply(1 / y) : this.m_u2.SetZero(), f = this.m_constant - f - this.m_ratio * y, C = e.Max(C, -f), f = e.Clamp(f + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), A = -this.m_pulleyMass * f, f = -A * this.m_u1.x, y = -A * this.m_u1.y, z = -this.m_ratio * A * this.m_u2.x, A = -this.m_ratio * A * this.m_u2.y, c.m_sweep.c.x += c.m_invMass * f, c.m_sweep.c.y += c.m_invMass * y, c.m_sweep.a += c.m_invI * (n * y - q * f), d.m_sweep.c.x += d.m_invMass * z, d.m_sweep.c.y += d.m_invMass * A, d.m_sweep.a += d.m_invI * (s * A - x * z), c.SynchronizeTransform(), d.SynchronizeTransform());
		this.m_limitState1 == B.e_atUpperLimit && (f = c.m_xf.R, n = this.m_localAnchor1.x - c.m_sweep.localCenter.x, q = this.m_localAnchor1.y - c.m_sweep.localCenter.y, y = f.col1.x * n + f.col2.x * q, q = f.col1.y * n + f.col2.y * q, n = y, f = c.m_sweep.c.x + n, y = c.m_sweep.c.y + q, this.m_u1.Set(f - g, y - j), f = this.m_u1.Length(), f > b.b2_linearSlop ? (this.m_u1.x *= 1 / f, this.m_u1.y *= 1 / f) : this.m_u1.SetZero(), f = this.m_maxLength1 - f, C = e.Max(C, -f), f = e.Clamp(f + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), A = -this.m_limitMass1 * f, f = -A * this.m_u1.x, y = -A * this.m_u1.y, c.m_sweep.c.x += c.m_invMass * f, c.m_sweep.c.y += c.m_invMass * y, c.m_sweep.a += c.m_invI * (n * y - q * f), c.SynchronizeTransform());
		this.m_limitState2 == B.e_atUpperLimit && (f = d.m_xf.R, s = this.m_localAnchor2.x - d.m_sweep.localCenter.x, x = this.m_localAnchor2.y - d.m_sweep.localCenter.y, y = f.col1.x * s + f.col2.x * x, x = f.col1.y * s + f.col2.y * x, s = y, z = d.m_sweep.c.x + s, A = d.m_sweep.c.y + x, this.m_u2.Set(z - l, A - m), y = this.m_u2.Length(), y > b.b2_linearSlop ? (this.m_u2.x *= 1 / y, this.m_u2.y *= 1 / y) : this.m_u2.SetZero(), f = this.m_maxLength2 - y, C = e.Max(C, -f), f = e.Clamp(f + b.b2_linearSlop, -b.b2_maxLinearCorrection, 0), A = -this.m_limitMass2 * f, z = -A * this.m_u2.x, A = -A * this.m_u2.y, d.m_sweep.c.x += d.m_invMass * z, d.m_sweep.c.y += d.m_invMass * A, d.m_sweep.a += d.m_invI * (s * A - x * z), d.SynchronizeTransform());
		return C < b.b2_linearSlop
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
	});
	Box2D.inherit(fa, Box2D.Dynamics.Joints.b2JointDef);
	fa.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	fa.b2PulleyJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.groundAnchorA = new f;
		this.groundAnchorB = new f;
		this.localAnchorA = new f;
		this.localAnchorB = new f
	};
	fa.prototype.b2PulleyJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_pulleyJoint;
		this.groundAnchorA.Set(-1, 1);
		this.groundAnchorB.Set(1, 1);
		this.localAnchorA.Set(-1, 0);
		this.localAnchorB.Set(1, 0);
		this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
		this.ratio = 1;
		this.collideConnected = !0
	};
	fa.prototype.Initialize = function(b, c, d, e, f, g, j) {
		void 0 === j && (j = 0);
		this.bodyA = b;
		this.bodyB = c;
		this.groundAnchorA.SetV(d);
		this.groundAnchorB.SetV(e);
		this.localAnchorA = this.bodyA.GetLocalPoint(f);
		this.localAnchorB = this.bodyB.GetLocalPoint(g);
		b = f.x - d.x;
		d = f.y - d.y;
		this.lengthA = Math.sqrt(b * b + d * d);
		d = g.x - e.x;
		e = g.y - e.y;
		this.lengthB = Math.sqrt(d * d + e * e);
		this.ratio = j;
		j = this.lengthA + this.ratio * this.lengthB;
		this.maxLengthA = j - this.ratio * K.b2_minPulleyLength;
		this.maxLengthB = (j - K.b2_minPulleyLength) / this.ratio
	};
	Box2D.inherit(O, Box2D.Dynamics.Joints.b2Joint);
	O.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	O.b2RevoluteJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.K = new c;
		this.K1 = new c;
		this.K2 = new c;
		this.K3 = new c;
		this.impulse3 = new g;
		this.impulse2 = new f;
		this.reduced = new f;
		this.m_localAnchor1 = new f;
		this.m_localAnchor2 = new f;
		this.m_impulse = new g;
		this.m_mass = new d
	};
	O.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
	};
	O.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
	};
	O.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * this.m_impulse.x, b * this.m_impulse.y)
	};
	O.prototype.GetReactionTorque = function(b) {
		void 0 === b && (b = 0);
		return b * this.m_impulse.z
	};
	O.prototype.GetJointAngle = function() {
		return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
	};
	O.prototype.GetJointSpeed = function() {
		return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
	};
	O.prototype.IsLimitEnabled = function() {
		return this.m_enableLimit
	};
	O.prototype.EnableLimit = function(b) {
		this.m_enableLimit = b
	};
	O.prototype.GetLowerLimit = function() {
		return this.m_lowerAngle
	};
	O.prototype.GetUpperLimit = function() {
		return this.m_upperAngle
	};
	O.prototype.SetLimits = function(b, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = 0);
		this.m_lowerAngle = b;
		this.m_upperAngle = c
	};
	O.prototype.IsMotorEnabled = function() {
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		return this.m_enableMotor
	};
	O.prototype.EnableMotor = function(b) {
		this.m_enableMotor = b
	};
	O.prototype.SetMotorSpeed = function(b) {
		void 0 === b && (b = 0);
		this.m_bodyA.SetAwake(!0);
		this.m_bodyB.SetAwake(!0);
		this.m_motorSpeed = b
	};
	O.prototype.GetMotorSpeed = function() {
		return this.m_motorSpeed
	};
	O.prototype.SetMaxMotorTorque = function(b) {
		void 0 === b && (b = 0);
		this.m_maxMotorTorque = b
	};
	O.prototype.GetMotorTorque = function() {
		return this.m_maxMotorTorque
	};
	O.prototype.b2RevoluteJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_localAnchor1.SetV(b.localAnchorA);
		this.m_localAnchor2.SetV(b.localAnchorB);
		this.m_referenceAngle = b.referenceAngle;
		this.m_impulse.SetZero();
		this.m_motorImpulse = 0;
		this.m_lowerAngle = b.lowerAngle;
		this.m_upperAngle = b.upperAngle;
		this.m_maxMotorTorque = b.maxMotorTorque;
		this.m_motorSpeed = b.motorSpeed;
		this.m_enableLimit = b.enableLimit;
		this.m_enableMotor = b.enableMotor;
		this.m_limitState = B.e_inactiveLimit
	};
	O.prototype.InitVelocityConstraints = function(c) {
		var d = this.m_bodyA,
			f = this.m_bodyB,
			g, j = 0;
		g = d.m_xf.R;
		var l = this.m_localAnchor1.x - d.m_sweep.localCenter.x,
			m = this.m_localAnchor1.y - d.m_sweep.localCenter.y,
			j = g.col1.x * l + g.col2.x * m,
			m = g.col1.y * l + g.col2.y * m,
			l = j;
		g = f.m_xf.R;
		var n = this.m_localAnchor2.x - f.m_sweep.localCenter.x,
			q = this.m_localAnchor2.y - f.m_sweep.localCenter.y,
			j = g.col1.x * n + g.col2.x * q,
			q = g.col1.y * n + g.col2.y * q,
			n = j;
		g = d.m_invMass;
		var j = f.m_invMass,
			s = d.m_invI,
			x = f.m_invI;
		this.m_mass.col1.x = g + j + m * m * s + q * q * x;
		this.m_mass.col2.x = -m * l * s - q * n * x;
		this.m_mass.col3.x = -m * s - q * x;
		this.m_mass.col1.y = this.m_mass.col2.x;
		this.m_mass.col2.y = g + j + l * l * s + n * n * x;
		this.m_mass.col3.y = l * s + n * x;
		this.m_mass.col1.z = this.m_mass.col3.x;
		this.m_mass.col2.z = this.m_mass.col3.y;
		this.m_mass.col3.z = s + x;
		this.m_motorMass = 1 / (s + x);
		!1 == this.m_enableMotor && (this.m_motorImpulse = 0);
		if (this.m_enableLimit) {
			var y = f.m_sweep.a - d.m_sweep.a - this.m_referenceAngle;
			e.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b.b2_angularSlop ? this.m_limitState = B.e_equalLimits : y <= this.m_lowerAngle ? (this.m_limitState != B.e_atLowerLimit && (this.m_impulse.z = 0), this.m_limitState = B.e_atLowerLimit) : y >= this.m_upperAngle ? (this.m_limitState != B.e_atUpperLimit && (this.m_impulse.z = 0), this.m_limitState = B.e_atUpperLimit) : (this.m_limitState = B.e_inactiveLimit, this.m_impulse.z = 0)
		} else this.m_limitState = B.e_inactiveLimit;
		c.warmStarting ? (this.m_impulse.x *= c.dtRatio, this.m_impulse.y *= c.dtRatio, this.m_motorImpulse *= c.dtRatio, c = this.m_impulse.x, y = this.m_impulse.y, d.m_linearVelocity.x -= g * c, d.m_linearVelocity.y -= g * y, d.m_angularVelocity -= s * (l * y - m * c + this.m_motorImpulse + this.m_impulse.z), f.m_linearVelocity.x += j * c, f.m_linearVelocity.y += j * y, f.m_angularVelocity += x * (n * y - q * c + this.m_motorImpulse + this.m_impulse.z)) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
	};
	O.prototype.SolveVelocityConstraints = function(b) {
		var c = this.m_bodyA,
			d = this.m_bodyB,
			f = 0,
			g = 0,
			j = 0,
			l = 0,
			n = 0,
			m = c.m_linearVelocity,
			q = c.m_angularVelocity,
			s = d.m_linearVelocity,
			y = d.m_angularVelocity,
			z = c.m_invMass,
			A = d.m_invMass,
			C = c.m_invI,
			E = d.m_invI;
		this.m_enableMotor && this.m_limitState != B.e_equalLimits && (g = this.m_motorMass * -(y - q - this.m_motorSpeed), j = this.m_motorImpulse, l = b.dt * this.m_maxMotorTorque, this.m_motorImpulse = e.Clamp(this.m_motorImpulse + g, -l, l), g = this.m_motorImpulse - j, q -= C * g, y += E * g);
		if (this.m_enableLimit && this.m_limitState != B.e_inactiveLimit) {
			b = c.m_xf.R;
			g = this.m_localAnchor1.x - c.m_sweep.localCenter.x;
			j = this.m_localAnchor1.y - c.m_sweep.localCenter.y;
			f = b.col1.x * g + b.col2.x * j;
			j = b.col1.y * g + b.col2.y * j;
			g = f;
			b = d.m_xf.R;
			l = this.m_localAnchor2.x - d.m_sweep.localCenter.x;
			n = this.m_localAnchor2.y - d.m_sweep.localCenter.y;
			f = b.col1.x * l + b.col2.x * n;
			n = b.col1.y * l + b.col2.y * n;
			l = f;
			b = s.x + -y * n - m.x - -q * j;
			var F = s.y + y * l - m.y - q * g;
			this.m_mass.Solve33(this.impulse3, -b, -F, -(y - q));
			this.m_limitState == B.e_equalLimits ? this.m_impulse.Add(this.impulse3) : this.m_limitState == B.e_atLowerLimit ? (f = this.m_impulse.z + this.impulse3.z, 0 > f && (this.m_mass.Solve22(this.reduced, -b, -F), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0)) : this.m_limitState == B.e_atUpperLimit && (f = this.m_impulse.z + this.impulse3.z, 0 < f && (this.m_mass.Solve22(this.reduced, -b, -F), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0));
			m.x -= z * this.impulse3.x;
			m.y -= z * this.impulse3.y;
			q -= C * (g * this.impulse3.y - j * this.impulse3.x + this.impulse3.z);
			s.x += A * this.impulse3.x;
			s.y += A * this.impulse3.y;
			y += E * (l * this.impulse3.y - n * this.impulse3.x + this.impulse3.z)
		} else b = c.m_xf.R, g = this.m_localAnchor1.x -
			c.m_sweep.localCenter.x, j = this.m_localAnchor1.y - c.m_sweep.localCenter.y, f = b.col1.x * g + b.col2.x * j, j = b.col1.y * g + b.col2.y * j, g = f, b = d.m_xf.R, l = this.m_localAnchor2.x - d.m_sweep.localCenter.x, n = this.m_localAnchor2.y - d.m_sweep.localCenter.y, f = b.col1.x * l + b.col2.x * n, n = b.col1.y * l + b.col2.y * n, l = f, this.m_mass.Solve22(this.impulse2, -(s.x + -y * n - m.x - -q * j), -(s.y + y * l - m.y - q * g)), this.m_impulse.x += this.impulse2.x, this.m_impulse.y += this.impulse2.y, m.x -= z * this.impulse2.x, m.y -= z * this.impulse2.y, q -= C * (g * this.impulse2.y - j * this.impulse2.x), s.x += A * this.impulse2.x, s.y += A * this.impulse2.y, y += E * (l * this.impulse2.y - n * this.impulse2.x);
		c.m_linearVelocity.SetV(m);
		c.m_angularVelocity = q;
		d.m_linearVelocity.SetV(s);
		d.m_angularVelocity = y
	};
	O.prototype.SolvePositionConstraints = function() {
		var c = 0,
			d, f = this.m_bodyA,
			g = this.m_bodyB,
			j = 0,
			l = 0,
			m = 0,
			n = 0;
		if (this.m_enableLimit && this.m_limitState != B.e_inactiveLimit) {
			var c = g.m_sweep.a - f.m_sweep.a - this.m_referenceAngle,
				q = 0;
			this.m_limitState == B.e_equalLimits ? (c = e.Clamp(c - this.m_lowerAngle, -b.b2_maxAngularCorrection, b.b2_maxAngularCorrection), q = -this.m_motorMass * c, j = e.Abs(c)) : this.m_limitState == B.e_atLowerLimit ? (c -= this.m_lowerAngle, j = -c, c = e.Clamp(c + b.b2_angularSlop, -b.b2_maxAngularCorrection, 0), q = -this.m_motorMass * c) : this.m_limitState == B.e_atUpperLimit && (j = c -= this.m_upperAngle, c = e.Clamp(c - b.b2_angularSlop, 0, b.b2_maxAngularCorrection), q = -this.m_motorMass * c);
			f.m_sweep.a -= f.m_invI * q;
			g.m_sweep.a += g.m_invI * q;
			f.SynchronizeTransform();
			g.SynchronizeTransform()
		}
		d = f.m_xf.R;
		q = this.m_localAnchor1.x - f.m_sweep.localCenter.x;
		c = this.m_localAnchor1.y - f.m_sweep.localCenter.y;
		l = d.col1.x * q + d.col2.x * c;
		c = d.col1.y * q + d.col2.y * c;
		q = l;
		d = g.m_xf.R;
		var s = this.m_localAnchor2.x - g.m_sweep.localCenter.x,
			y = this.m_localAnchor2.y - g.m_sweep.localCenter.y,
			l = d.col1.x * s + d.col2.x * y,
			y = d.col1.y * s + d.col2.y * y,
			s = l,
			m = g.m_sweep.c.x + s - f.m_sweep.c.x - q,
			n = g.m_sweep.c.y + y - f.m_sweep.c.y - c,
			z = m * m + n * n;
		d = Math.sqrt(z);
		var l = f.m_invMass,
			A = g.m_invMass,
			C = f.m_invI,
			E = g.m_invI,
			F = 10 * b.b2_linearSlop;
		z > F * F && (z = 1 / (l + A), m = z * -m, n = z * -n, f.m_sweep.c.x -= 0.5 * l * m, f.m_sweep.c.y -= 0.5 * l * n, g.m_sweep.c.x += 0.5 * A * m, g.m_sweep.c.y += 0.5 * A * n, m = g.m_sweep.c.x + s - f.m_sweep.c.x - q, n = g.m_sweep.c.y + y - f.m_sweep.c.y - c);
		this.K1.col1.x = l + A;
		this.K1.col2.x = 0;
		this.K1.col1.y = 0;
		this.K1.col2.y = l + A;
		this.K2.col1.x = C * c * c;
		this.K2.col2.x = -C * q * c;
		this.K2.col1.y = -C * q * c;
		this.K2.col2.y = C * q * q;
		this.K3.col1.x = E * y * y;
		this.K3.col2.x = -E * s * y;
		this.K3.col1.y = -E * s * y;
		this.K3.col2.y = E * s * s;
		this.K.SetM(this.K1);
		this.K.AddM(this.K2);
		this.K.AddM(this.K3);
		this.K.Solve(O.tImpulse, -m, -n);
		m = O.tImpulse.x;
		n = O.tImpulse.y;
		f.m_sweep.c.x -= f.m_invMass * m;
		f.m_sweep.c.y -= f.m_invMass * n;
		f.m_sweep.a -= f.m_invI * (q * n - c * m);
		g.m_sweep.c.x += g.m_invMass * m;
		g.m_sweep.c.y += g.m_invMass * n;
		g.m_sweep.a += g.m_invI * (s * n - y * m);
		f.SynchronizeTransform();
		g.SynchronizeTransform();
		return d <= b.b2_linearSlop && j <= b.b2_angularSlop
	};
	Box2D.postDefs.push(function() {
		Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new f
	});
	Box2D.inherit(P, Box2D.Dynamics.Joints.b2JointDef);
	P.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	P.b2RevoluteJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.localAnchorA = new f;
		this.localAnchorB = new f
	};
	P.prototype.b2RevoluteJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_revoluteJoint;
		this.localAnchorA.Set(0, 0);
		this.localAnchorB.Set(0, 0);
		this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
		this.enableMotor = this.enableLimit = !1
	};
	P.prototype.Initialize = function(b, c, d) {
		this.bodyA = b;
		this.bodyB = c;
		this.localAnchorA = this.bodyA.GetLocalPoint(d);
		this.localAnchorB = this.bodyB.GetLocalPoint(d);
		this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
	};
	Box2D.inherit(ba, Box2D.Dynamics.Joints.b2Joint);
	ba.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	ba.b2WeldJoint = function() {
		Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
		this.m_localAnchorA = new f;
		this.m_localAnchorB = new f;
		this.m_impulse = new g;
		this.m_mass = new d
	};
	ba.prototype.GetAnchorA = function() {
		return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
	};
	ba.prototype.GetAnchorB = function() {
		return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
	};
	ba.prototype.GetReactionForce = function(b) {
		void 0 === b && (b = 0);
		return new f(b * this.m_impulse.x, b * this.m_impulse.y)
	};
	ba.prototype.GetReactionTorque = function(b) {
		void 0 === b && (b = 0);
		return b * this.m_impulse.z
	};
	ba.prototype.b2WeldJoint = function(b) {
		this.__super.b2Joint.call(this, b);
		this.m_localAnchorA.SetV(b.localAnchorA);
		this.m_localAnchorB.SetV(b.localAnchorB);
		this.m_referenceAngle = b.referenceAngle;
		this.m_impulse.SetZero();
		this.m_mass = new d
	};
	ba.prototype.InitVelocityConstraints = function(b) {
		var c, d = 0,
			e = this.m_bodyA,
			f = this.m_bodyB;
		c = e.m_xf.R;
		var g = this.m_localAnchorA.x - e.m_sweep.localCenter.x,
			j = this.m_localAnchorA.y - e.m_sweep.localCenter.y,
			d = c.col1.x * g + c.col2.x * j,
			j = c.col1.y * g + c.col2.y * j,
			g = d;
		c = f.m_xf.R;
		var l = this.m_localAnchorB.x - f.m_sweep.localCenter.x,
			m = this.m_localAnchorB.y - f.m_sweep.localCenter.y,
			d = c.col1.x * l + c.col2.x * m,
			m = c.col1.y * l + c.col2.y * m,
			l = d;
		c = e.m_invMass;
		var d = f.m_invMass,
			q = e.m_invI,
			s = f.m_invI;
		this.m_mass.col1.x = c + d + j * j * q + m * m * s;
		this.m_mass.col2.x = -j * g * q - m * l * s;
		this.m_mass.col3.x = -j * q - m * s;
		this.m_mass.col1.y = this.m_mass.col2.x;
		this.m_mass.col2.y = c + d + g * g * q + l * l * s;
		this.m_mass.col3.y = g * q + l * s;
		this.m_mass.col1.z = this.m_mass.col3.x;
		this.m_mass.col2.z = this.m_mass.col3.y;
		this.m_mass.col3.z = q + s;
		b.warmStarting ? (this.m_impulse.x *= b.dtRatio, this.m_impulse.y *= b.dtRatio, this.m_impulse.z *= b.dtRatio, e.m_linearVelocity.x -= c * this.m_impulse.x, e.m_linearVelocity.y -= c * this.m_impulse.y, e.m_angularVelocity -= q * (g * this.m_impulse.y - j * this.m_impulse.x + this.m_impulse.z), f.m_linearVelocity.x += d * this.m_impulse.x, f.m_linearVelocity.y += d * this.m_impulse.y, f.m_angularVelocity += s * (l * this.m_impulse.y - m * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
	};
	ba.prototype.SolveVelocityConstraints = function() {
		var b, c = 0,
			d = this.m_bodyA,
			e = this.m_bodyB,
			f = d.m_linearVelocity,
			j = d.m_angularVelocity,
			l = e.m_linearVelocity,
			m = e.m_angularVelocity,
			q = d.m_invMass,
			s = e.m_invMass,
			y = d.m_invI,
			z = e.m_invI;
		b = d.m_xf.R;
		var A = this.m_localAnchorA.x - d.m_sweep.localCenter.x,
			B = this.m_localAnchorA.y - d.m_sweep.localCenter.y,
			c = b.col1.x * A + b.col2.x * B,
			B = b.col1.y * A + b.col2.y * B,
			A = c;
		b = e.m_xf.R;
		var C = this.m_localAnchorB.x - e.m_sweep.localCenter.x,
			E = this.m_localAnchorB.y - e.m_sweep.localCenter.y,
			c = b.col1.x * C + b.col2.x * E,
			E = b.col1.y * C + b.col2.y * E,
			C = c;
		b = l.x - m * E - f.x + j * B;
		var c = l.y + m * C - f.y - j * A,
			F = m - j,
			G = new g;
		this.m_mass.Solve33(G, -b, -c, -F);
		this.m_impulse.Add(G);
		f.x -= q * G.x;
		f.y -= q * G.y;
		j -= y * (A * G.y - B * G.x + G.z);
		l.x += s * G.x;
		l.y += s * G.y;
		m += z * (C * G.y - E * G.x + G.z);
		d.m_angularVelocity = j;
		e.m_angularVelocity = m
	};
	ba.prototype.SolvePositionConstraints = function() {
		var c, d = 0,
			f = this.m_bodyA,
			j = this.m_bodyB;
		c = f.m_xf.R;
		var l = this.m_localAnchorA.x - f.m_sweep.localCenter.x,
			m = this.m_localAnchorA.y - f.m_sweep.localCenter.y,
			d = c.col1.x * l + c.col2.x * m,
			m = c.col1.y * l + c.col2.y * m,
			l = d;
		c = j.m_xf.R;
		var q = this.m_localAnchorB.x - j.m_sweep.localCenter.x,
			n = this.m_localAnchorB.y - j.m_sweep.localCenter.y,
			d = c.col1.x * q + c.col2.x * n,
			n = c.col1.y * q + c.col2.y * n,
			q = d;
		c = f.m_invMass;
		var d = j.m_invMass,
			s = f.m_invI,
			y = j.m_invI,
			x = j.m_sweep.c.x + q - f.m_sweep.c.x - l,
			z = j.m_sweep.c.y + n - f.m_sweep.c.y - m,
			A = j.m_sweep.a - f.m_sweep.a - this.m_referenceAngle,
			B = 10 * b.b2_linearSlop,
			C = Math.sqrt(x * x + z * z),
			E = e.Abs(A);
		C > B && (s *= 1, y *= 1);
		this.m_mass.col1.x = c + d + m * m * s + n * n * y;
		this.m_mass.col2.x = -m * l * s - n * q * y;
		this.m_mass.col3.x = -m * s - n * y;
		this.m_mass.col1.y = this.m_mass.col2.x;
		this.m_mass.col2.y = c + d + l * l * s + q * q * y;
		this.m_mass.col3.y = l * s + q * y;
		this.m_mass.col1.z = this.m_mass.col3.x;
		this.m_mass.col2.z = this.m_mass.col3.y;
		this.m_mass.col3.z = s + y;
		B = new g;
		this.m_mass.Solve33(B, -x, -z, -A);
		f.m_sweep.c.x -= c * B.x;
		f.m_sweep.c.y -= c * B.y;
		f.m_sweep.a -= s * (l * B.y - m * B.x + B.z);
		j.m_sweep.c.x += d * B.x;
		j.m_sweep.c.y += d * B.y;
		j.m_sweep.a += y * (q * B.y - n * B.x + B.z);
		f.SynchronizeTransform();
		j.SynchronizeTransform();
		return C <= b.b2_linearSlop && E <= b.b2_angularSlop
	};
	Box2D.inherit(V, Box2D.Dynamics.Joints.b2JointDef);
	V.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	V.b2WeldJointDef = function() {
		Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
		this.localAnchorA = new f;
		this.localAnchorB = new f
	};
	V.prototype.b2WeldJointDef = function() {
		this.__super.b2JointDef.call(this);
		this.type = B.e_weldJoint;
		this.referenceAngle = 0
	};
	V.prototype.Initialize = function(b, c, d) {
		this.bodyA = b;
		this.bodyB = c;
		this.localAnchorA.SetV(this.bodyA.GetLocalPoint(d));
		this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
		this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
	}
})();
(function() {
	var b = Box2D.Dynamics.b2DebugDraw;
	b.b2DebugDraw = function() {
		this.m_xformScale = this.m_fillAlpha = this.m_alpha = this.m_lineThickness = this.m_drawScale = 1;
		var b = this;
		this.m_sprite = {
			graphics: {
				clear: function() {
					b.m_ctx.clearRect(0, 0, b.m_ctx.canvas.width, b.m_ctx.canvas.height)
				}
			}
		}
	};
	b.prototype._color = function(b, d) {
		return "rgba(" + ((b & 16711680) >> 16) + "," + ((b & 65280) >> 8) + "," + (b & 255) + "," + d + ")"
	};
	b.prototype.b2DebugDraw = function() {
		this.m_drawFlags = 0
	};
	b.prototype.SetFlags = function(b) {
		void 0 === b && (b = 0);
		this.m_drawFlags = b
	};
	b.prototype.GetFlags = function() {
		return this.m_drawFlags
	};
	b.prototype.AppendFlags = function(b) {
		void 0 === b && (b = 0);
		this.m_drawFlags |= b
	};
	b.prototype.ClearFlags = function(b) {
		void 0 === b && (b = 0);
		this.m_drawFlags &= ~b
	};
	b.prototype.SetSprite = function(b) {
		this.m_ctx = b
	};
	b.prototype.GetSprite = function() {
		return this.m_ctx
	};
	b.prototype.SetDrawScale = function(b) {
		void 0 === b && (b = 0);
		this.m_drawScale = b
	};
	b.prototype.GetDrawScale = function() {
		return this.m_drawScale
	};
	b.prototype.SetLineThickness = function(b) {
		void 0 === b && (b = 0);
		this.m_lineThickness = b;
		this.m_ctx.strokeWidth = b
	};
	b.prototype.GetLineThickness = function() {
		return this.m_lineThickness
	};
	b.prototype.SetAlpha = function(b) {
		void 0 === b && (b = 0);
		this.m_alpha = b
	};
	b.prototype.GetAlpha = function() {
		return this.m_alpha
	};
	b.prototype.SetFillAlpha = function(b) {
		void 0 === b && (b = 0);
		this.m_fillAlpha = b
	};
	b.prototype.GetFillAlpha = function() {
		return this.m_fillAlpha
	};
	b.prototype.SetXFormScale = function(b) {
		void 0 === b && (b = 0);
		this.m_xformScale = b
	};
	b.prototype.GetXFormScale = function() {
		return this.m_xformScale
	};
	b.prototype.DrawPolygon = function(b, d, e) {
		if (d) {
			var f = this.m_ctx,
				g = this.m_drawScale;
			f.beginPath();
			f.strokeStyle = this._color(e.color, this.m_alpha);
			f.moveTo(b[0].x * g, b[0].y * g);
			for (e = 1; e < d; e++) f.lineTo(b[e].x * g, b[e].y * g);
			f.lineTo(b[0].x * g, b[0].y * g);
			f.closePath();
			f.stroke()
		}
	};
	b.prototype.DrawSolidPolygon = function(b, d, e) {
		if (d) {
			var f = this.m_ctx,
				g = this.m_drawScale;
			f.beginPath();
			f.strokeStyle = this._color(e.color, this.m_alpha);
			f.fillStyle = this._color(e.color, this.m_fillAlpha);
			f.moveTo(b[0].x * g, b[0].y * g);
			for (e = 1; e < d; e++) f.lineTo(b[e].x * g, b[e].y * g);
			f.lineTo(b[0].x * g, b[0].y * g);
			f.closePath();
			f.fill();
			f.stroke()
		}
	};
	b.prototype.DrawCircle = function(b, d, e) {
		if (d) {
			var f = this.m_ctx,
				g = this.m_drawScale;
			f.beginPath();
			f.strokeStyle = this._color(e.color, this.m_alpha);
			f.arc(b.x * g, b.y * g, d * g, 0, 2 * Math.PI, !0);
			f.closePath();
			f.stroke()
		}
	};
	b.prototype.DrawSolidCircle = function(b, d, e, f) {
		if (d) {
			var g = this.m_ctx,
				m = this.m_drawScale,
				l = b.x * m,
				j = b.y * m;
			g.moveTo(0, 0);
			g.beginPath();
			g.strokeStyle = this._color(f.color, this.m_alpha);
			g.fillStyle = this._color(f.color, this.m_fillAlpha);
			g.arc(l, j, d * m, 0, 2 * Math.PI, !0);
			g.moveTo(l, j);
			g.lineTo((b.x + e.x * d) * m, (b.y + e.y * d) * m);
			g.closePath();
			g.fill();
			g.stroke()
		}
	};
	b.prototype.DrawSegment = function(b, d, e) {
		var f = this.m_ctx,
			g = this.m_drawScale;
		f.strokeStyle = this._color(e.color, this.m_alpha);
		f.beginPath();
		f.moveTo(b.x * g, b.y * g);
		f.lineTo(d.x * g, d.y * g);
		f.closePath();
		f.stroke()
	};
	b.prototype.DrawTransform = function(b) {
		var d = this.m_ctx,
			e = this.m_drawScale;
		d.beginPath();
		d.strokeStyle = this._color(16711680, this.m_alpha);
		d.moveTo(b.position.x * e, b.position.y * e);
		d.lineTo((b.position.x + this.m_xformScale * b.R.col1.x) * e, (b.position.y + this.m_xformScale * b.R.col1.y) * e);
		d.strokeStyle = this._color(65280, this.m_alpha);
		d.moveTo(b.position.x * e, b.position.y * e);
		d.lineTo((b.position.x + this.m_xformScale * b.R.col2.x) * e, (b.position.y + this.m_xformScale * b.R.col2.y) * e);
		d.closePath();
		d.stroke()
	}
})();
var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;
"undefined" != typeof global && (global.Box2D = Box2D);
ig.baked = !0;
ig.module("plugins.box2d.lib").defines(function() {});
ig.baked = !0;
ig.module("plugins.io.storage").defines(function() {
	ig.Storage = ig.Class.extend({
		staticInstantiate: function() {
			return !ig.Storage.instance ? null : ig.Storage.instance
		},
		init: function() {
			ig.Storage.instance = this
		},
		isCapable: function() {
			return "undefined" !== typeof window.localStorage
		},
		isSet: function(b) {
			return null !== this.get(b)
		},
		initUnset: function(b, c) {
			null === this.get(b) && this.set(b, c)
		},
		get: function(b) {
			if (!this.isCapable()) return null;
			try {
				return JSON.parse(localStorage.getItem(b))
			} catch (c) {
				return window.localStorage.getItem(b)
			}
		},
		getInt: function(b) {
			return ~~this.get(b)
		},
		getFloat: function(b) {
			return parseFloat(this.get(b))
		},
		getBool: function(b) {
			return !!this.get(b)
		},
		key: function(b) {
			return this.isCapable() ? window.localStorage.key(b) : null
		},
		set: function(b, c) {
			if (!this.isCapable()) return null;
			try {
				window.localStorage.setItem(b, JSON.stringify(c))
			} catch (d) {
				console.log(d)
			}
		},
		setHighest: function(b, c) {
			c > this.getFloat(b) && this.set(b, c)
		},
		remove: function(b) {
			if (!this.isCapable()) return null;
			window.localStorage.removeItem(b)
		},
		clear: function() {
			if (!this.isCapable()) return null;
			window.localStorage.clear()
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.mouse").defines(function() {
	Mouse = ig.Class.extend({
		bindings: {
			click: [ig.KEY.MOUSE1]
		},
		init: function() {
			ig.input.initMouse();
			for (var b in this.bindings) {
				this[b] = b;
				for (var c = 0; c < this.bindings[b].length; c++) ig.input.bind(this.bindings[b][c], b)
			}
		},
		getPos: function() {
			if (ig.ua.mobile) {
				var b = ig.input.mouse.x / ig.sizeHandler.sizeRatio.x,
					c = ig.input.mouse.y / ig.sizeHandler.sizeRatio.y;
				return new Vector2(b / ig.sizeHandler.scaleRatioMultiplier.x, c / ig.sizeHandler.scaleRatioMultiplier.y)
			}
			b = ig.input.mouse.x / ig.sizeHandler.sizeRatio.x;
			c = ig.input.mouse.y / ig.sizeHandler.sizeRatio.y;
			return new Vector2(b, c)
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.keyboard").defines(function() {
	Keyboard = ig.Class.extend({
		bindings: {
			jump: [ig.KEY.W, ig.KEY.UP_ARROW],
			moveright: [ig.KEY.D, ig.KEY.RIGHT_ARROW],
			moveleft: [ig.KEY.A, ig.KEY.LEFT_ARROW],
			shoot: [ig.KEY.S, ig.KEY.DOWN_ARROW, ig.KEY.SPACE]
		},
		init: function() {
			for (var b in this.bindings) {
				this[b] = b;
				for (var c = 0; c < this.bindings[b].length; c++) ig.input.bind(this.bindings[b][c], b)
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.gamepad-input").defines(function() {
	ig.PADKEY = {
		BUTTON_0: 0,
		PADBUTTON_1: 1,
		BUTTON_2: 2,
		BUTTON_3: 3,
		BUTTON_LEFT_BUMPER: 4,
		BUTTON_RIGHT_BUMPER: 5,
		BUTTON_LEFT_TRIGGER: 6,
		BUTTON_RIGHT_TRIGGER: 7,
		BUTTON_LEFT_JOYSTICK: 10,
		BUTTON_RIGHT_JOYSTICK: 11,
		BUTTON_DPAD_UP: 12,
		BUTTON_DPAD_DOWN: 13,
		BUTTON_DPAD_LEFT: 14,
		BUTTON_DPAD_RIGHT: 15,
		BUTTON_MENU: 16,
		AXIS_LEFT_JOYSTICK_X: 0,
		AXIS_LEFT_JOYSTICK_Y: 1,
		AXIS_RIGHT_JOYSTICK_X: 2,
		AXIS_RIGHT_JOYSTICK_Y: 3
	};
	ig.GamepadInput = ig.Class.extend({
		isInit: !1,
		isSupported: !1,
		list: [],
		bindings: {},
		states: {},
		presses: {},
		releases: {},
		downLocks: {},
		upLocks: {},
		leftStick: {
			x: 0,
			y: 0
		},
		rightStick: {
			x: 0,
			y: 0
		},
		start: function() {
			if (!this.isInit) {
				this.isInit = !0;
				var b = navigator.getGamepads || navigator.webkitGetGamepads;
				b && (!navigator.getGamepads && navigator.webkitGetGamepads && (navigator.getGamepads = navigator.webkitGetGamepads), this.list = navigator.getGamepads());
				this.isSupported = b
			}
		},
		isAvailable: function() {
			return this.isInit && this.isSupported
		},
		buttonPressed: function(b) {
			return "object" == typeof b ? b.pressed : 1 == b
		},
		buttonDown: function(b) {
			if (b = this.bindings[b]) this.states[b] = !0, this.downLocks[b] || (this.presses[b] = !0, this.downLocks[b] = !0)
		},
		buttonUp: function(b) {
			if ((b = this.bindings[b]) && this.downLocks[b] && !this.upLocks[b]) this.states[b] = !1, this.releases[b] = !0, this.upLocks[b] = !0
		},
		clearPressed: function() {
			for (var b in this.releases) this.states[b] = !1, this.downLocks[b] = !1;
			this.releases = {};
			this.presses = {};
			this.upLocks = {}
		},
		bind: function(b, c) {
			this.bindings[b] = c
		},
		unbind: function(b) {
			this.releases[this.bindings[b]] = !0;
			this.bindings[b] = null
		},
		unbindAll: function() {
			this.bindings = {};
			this.states = {};
			this.presses = {};
			this.releases = {};
			this.downLocks = {};
			this.upLocks = {}
		},
		state: function(b) {
			return this.states[b]
		},
		pressed: function(b) {
			return this.presses[b]
		},
		released: function(b) {
			return this.releases[b]
		},
		clamp: function(b, c, d) {
			return b < c ? c : b > d ? d : b
		},
		pollGamepads: function() {
			if (this.isSupported) {
				this.leftStick.x = 0;
				this.leftStick.y = 0;
				this.rightStick.x = 0;
				this.rightStick.y = 0;
				this.list = navigator.getGamepads();
				for (var b in this.bindings) {
					for (var c = !1, d = 0; d < this.list.length; d++) {
						var e = this.list[d];
						if (e && e.buttons && this.buttonPressed(e.buttons[b])) {
							c = !0;
							break
						}
					}
					c ? this.buttonDown(b) : this.buttonUp(b)
				}
				for (d = 0; d < this.list.length; d++)
					if ((e = this.list[d]) && e.axes) {
						b = e.axes[ig.GAMEPADINPUT.AXIS_LEFT_JOYSTICK_X];
						var c = e.axes[ig.GAMEPADINPUT.AXIS_LEFT_JOYSTICK_Y],
							f = e.axes[ig.GAMEPADINPUT.AXIS_RIGHT_JOYSTICK_X],
							e = e.axes[ig.GAMEPADINPUT.AXIS_RIGHT_JOYSTICK_Y];
						this.leftStick.x += isNaN(b) ? 0 : b;
						this.leftStick.y += isNaN(c) ? 0 : c;
						this.rightStick.x += isNaN(f) ? 0 : f;
						this.rightStick.y += isNaN(e) ? 0 : e
					}
				0 < this.list.length && (this.leftStick.x = this.clamp(this.leftStick.x, -1, 1), this.leftStick.y = this.clamp(this.leftStick.y, -1, 1), this.rightStick.x = this.clamp(this.rightStick.x, -1, 1), this.rightStick.y = this.clamp(this.rightStick.y, -1, 1))
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.gamepad").requires("plugins.io.gamepad-input").defines(function() {
	Gamepad = ig.Class.extend({
		bindings: {
			padJump: [ig.PADKEY.BUTTON_0]
		},
		init: function() {
			ig.gamepadInput.start();
			for (var b in this.bindings)
				for (var c = 0; c < this.bindings[b].length; c++) ig.gamepadInput.bind(this.bindings[b][c], b)
		},
		press: function() {},
		held: function() {},
		release: function() {}
	})
});
ig.baked = !0;
ig.module("plugins.io.multitouch").defines(function() {
	Multitouch = ig.Class.extend({
		init: function() {
			ig.multitouchInput.start()
		},
		getTouchesPos: function() {
			if (ig.ua.mobile) {
				if (0 < ig.multitouchInput.touches.length) {
					for (var b = [], c = 0; c < ig.multitouchInput.touches.length; c++) {
						var d = ig.multitouchInput.touches[c];
						b.push({
							x: d.x,
							y: d.y
						})
					}
					return b
				}
				return null
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.multitouch-input").defines(function() {
	ig.MultitouchInput = ig.Class.extend({
		isStart: !1,
		touches: [],
		multitouchCapable: !1,
		lastEventUp: null,
		start: function() {
			this.isStart || (this.isStart = !0, navigator.maxTouchPoints && 1 < navigator.maxTouchPoints && (this.multitouchCapable = !0), ig.ua.touchDevice && (window.navigator.msPointerEnabled && (ig.system.canvas.addEventListener("MSPointerDown", this.touchdown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.touchup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.touchmove.bind(this), !1), ig.system.canvas.style.msContentZooming = "none", ig.system.canvas.style.msTouchAction = "none"), ig.system.canvas.addEventListener("touchstart", this.touchdown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.touchup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.touchmove.bind(this), !1)))
		},
		touchmove: function(b) {
			if (ig.ua.touchDevice) {
				var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
					d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
					c = ig.system.scale * (c / ig.system.realWidth),
					d = ig.system.scale * (d / ig.system.realHeight);
				if (b.touches) {
					for (; 0 < this.touches.length;) this.touches.pop();
					!this.multitouchCapable && 1 < b.touches.length && (this.multitouchCapable = !0);
					var e = {
						left: 0,
						top: 0
					};
					ig.system.canvas.getBoundingClientRect && (e = ig.system.canvas.getBoundingClientRect());
					for (var f = 0; f < b.touches.length; f++) {
						var g = b.touches[f];
						g && this.touches.push({
							x: (g.clientX - e.left) / c,
							y: (g.clientY - e.top) / d
						})
					}
				} else this.windowMove(b)
			}
		},
		touchdown: function(b) {
			var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
				d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
				c = ig.system.scale * (c / ig.system.realWidth),
				d = ig.system.scale * (d / ig.system.realHeight);
			if (window.navigator.msPointerEnabled) this.windowKeyDown(b);
			else if (ig.ua.touchDevice && b.touches) {
				for (; 0 < this.touches.length;) this.touches.pop();
				!this.multitouchCapable && 1 < b.touches.length && (this.multitouchCapable = !0);
				var e = {
					left: 0,
					top: 0
				};
				ig.system.canvas.getBoundingClientRect && (e = ig.system.canvas.getBoundingClientRect());
				for (var f = 0; f < b.touches.length; f++) {
					var g = b.touches[f];
					g && this.touches.push({
						x: (g.clientX - e.left) / c,
						y: (g.clientY - e.top) / d
					})
				}
			}
		},
		touchup: function(b) {
			var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
			parseInt(ig.system.canvas.offsetHeight);
			c = ig.system.scale * (c / ig.system.realWidth);
			if (window.navigator.msPointerEnabled) this.windowKeyUp(b);
			else {
				this.lastEventUp = b;
				var d = {
					left: 0,
					top: 0
				};
				ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
				if (ig.ua.touchDevice) {
					b = (b.changedTouches[0].clientX - d.left) / c;
					for (c = 0; c < this.touches.length; c++) this.touches[c].x >= b - 40 && this.touches[c].x <= b + 40 && this.touches.splice(c, 1)
				}
			}
		},
		windowKeyDown: function(b) {
			var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
				d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
				c = ig.system.scale * (c / ig.system.realWidth),
				d = ig.system.scale * (d / ig.system.realHeight);
			if (window.navigator.msPointerEnabled) {
				var e = {
					left: 0,
					top: 0
				};
				ig.system.canvas.getBoundingClientRect && (e = ig.system.canvas.getBoundingClientRect());
				b = b.changedTouches ? b.changedTouches : [b];
				for (var f = 0; f < b.length; ++f) {
					for (var g = b[f], m = "undefined" != typeof g.identifier ? g.identifier : "undefined" != typeof g.pointerId ? g.pointerId : 1, l = (g.clientX - e.left) / c, g = (g.clientY - e.top) / d, j = 0; j < this.touches.length; ++j) this.touches[j].identifier == m && this.touches.splice(j, 1);
					this.touches.push({
						x: l,
						y: g,
						identifier: m
					})
				}
				for (c = 0; c < this.touches.length; c++);
			}
		},
		windowKeyUp: function(b) {
			b = "undefined" != typeof b.identifier ? b.identifier : "undefined" != typeof b.pointerId ? b.pointerId : 1;
			for (var c = 0; c < this.touches.length; ++c) this.touches[c].identifier == b && this.touches.splice(c, 1);
			for (; 0 < this.touches.length;) this.touches.pop()
		},
		windowMove: function(b) {
			var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
				d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
				c = ig.system.scale * (c / ig.system.realWidth),
				d = ig.system.scale * (d / ig.system.realHeight),
				e = {
					left: 0,
					top: 0
				};
			ig.system.canvas.getBoundingClientRect && (e = ig.system.canvas.getBoundingClientRect());
			if (window.navigator.msPointerEnabled)
				for (var f = "undefined" != typeof b.identifier ? b.identifier : "undefined" != typeof b.pointerId ? b.pointerId : 1, g = 0; g < this.touches.length; ++g)
					if (this.touches[g].identifier == f) {
						var m = (b.clientY - e.top) / d;
						this.touches[g].x = (b.clientX - e.left) / c;
						this.touches[g].y = m
					}
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.fake-storage").requires("impact.game").defines(function() {
	ig.FakeStorage = ig.Class.extend({
		tempData: {},
		init: function() {
			ig.FakeStorage.instance = this
		},
		initUnset: function(b, c) {
			null === this.get(b) && this.set(b, c)
		},
		set: function(b, c) {
			this.tempData[b] = JSON.stringify(c)
		},
		setHighest: function(b, c) {
			c > this.getFloat(b) && this.set(b, c)
		},
		get: function(b) {
			return "undefined" == typeof this.tempData[b] ? null : JSON.parse(this.tempData[b])
		},
		getInt: function(b) {
			return ~~this.get(b)
		},
		getFloat: function(b) {
			return parseFloat(this.get(b))
		},
		getBool: function(b) {
			return !!this.get(b)
		},
		isSet: function(b) {
			return null !== this.get(b)
		},
		remove: function(b) {
			delete this.tempData[b]
		},
		clear: function() {
			this.tempData = {}
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.io-manager").requires("plugins.io.storage", "plugins.io.mouse", "plugins.io.keyboard", "plugins.io.gamepad", "plugins.io.multitouch", "plugins.io.multitouch-input", "plugins.io.gamepad-input", "plugins.io.fake-storage").defines(function() {
	IoManager = ig.Class.extend({
		storage: null,
		localStorageSupport: !1,
		mouse: null,
		keyboard: null,
		multitouch: null,
		gamepad: null,
		init: function() {
			ig.multitouchInput = new ig.MultitouchInput;
			ig.gamepadInput = new ig.GamepadInput;
			this.unbindAll();
			this.initStorage();
			this.initMouse();
			this.initKeyboard()
		},
		unbindAll: function() {
			ig.input.unbindAll();
			ig.gamepadInput.unbindAll()
		},
		initStorage: function() {
			try {
				window.localStorage.setItem("test", "test"), this.storage = new ig.Storage
			} catch (b) {
				console.log("using fake storage"), this.storage = new ig.FakeStorage
			} finally {
				window.localStorage.removeItem("test")
			}
		},
		initMouse: function() {
			this.mouse = new Mouse
		},
		initKeyboard: function() {
			this.keyboard = new Keyboard
		},
		initMultitouch: function() {
			this.multitouch = new Multitouch
		},
		initGamepad: function() {
			this.gamepad = new Gamepad
		},
		press: function(b) {
			return ig.input.pressed(b) || this.gamepad && this.gamepad.press(b) ? !0 : !1
		},
		held: function(b) {
			return ig.input.state(b) || this.gamepad && this.gamepad.state(b) ? !0 : !1
		},
		release: function(b) {
			return ig.input.released(b) || this.gamepad && this.gamepad.released(b) ? !0 : !1
		},
		getClickPos: function() {
			return this.mouse.getPos()
		},
		getTouchesPos: function() {
			return this.multitouch.getTouchesPos()
		},
		checkOverlap: function(b, c, d, e, f) {
			return b.x > c + e || b.x < c || b.y > d + f || b.y < d ? !1 : !0
		},
		_supportsLocalStorage: function() {
			try {
				return localStorage.setItem("test", "test"), localStorage.removeItem("test"), this.localStorageSupport = "localStorage" in window && null !== window.localStorage
			} catch (b) {
				return this.localStorageSupport
			}
		},
		storageIsSet: function(b) {
			return !this.localStorageSupport ? null : this.storage.isSet(b)
		},
		storageGet: function(b) {
			return !this.localStorageSupport ? null : this.storage.get(b)
		},
		storageSet: function(b, c) {
			if (!this.localStorageSupport) return null;
			this.storage.set(b, c)
		},
		assert: function(b, c, d) {
			if (c !== d) throw "actualValue:" + c + " not equal to testValue:" + d + " at " +
				b;
		}
	})
});
ig.baked = !0;
ig.module("plugins.io.storage-manager").requires("impact.game", "plugins.io.io-manager").defines(function() {
	ig.Game.prototype.name = "MJS-Game";
	ig.Game.prototype.version = "1.0";
	ig.Game.prototype.sessionData = {};
	ig.Game.prototype.initData = function() {
		return this.sessionData = {
			sound: 0.5,
			music: 0.5,
			level: 1,
			score: 0
		}
	};
	ig.Game.prototype.setupStorageManager = function() {
		"undefined" === typeof this.name ? console.error("Cannot found Game Name, Storage Manager Cancelled.") : "undefined" === typeof this.version ? console.error("Cannot found Game Version, Storage Manager Cancelled.") : (this.io || (this.io = new IoManager, console.log("IO Manager doesn't existed. Initialize...")), console.log("Plug in Storage Manager"), this.storage = this.io.storage, this.storageName = this.name + "-v" + this.version, this.loadAll())
	};
	ig.Game.prototype.loadAll = function() {
		var b = this.storage.get(this.storageName);
		if (null === b || "undefined" === typeof b) b = this.initData();
		for (var c in b) this.sessionData[c] = b[c];
		this.storage.set(this.storageName, b)
	};
	ig.Game.prototype.saveAll = function() {
		var b = this.storage.get(this.storageName),
			c;
		for (c in b) b[c] = this.sessionData[c];
		this.storage.set(this.storageName, b)
	};
	ig.Game.prototype.load = function(b) {
		return this.storage.get(this.storageName)[b]
	};
	ig.Game.prototype.save = function(b, c) {
		var d = this.storage.get(this.storageName);
		d[b] = c;
		this.storage.set(this.storageName, d)
	}
});
ig.baked = !0;
ig.module("plugins.addon.custom-storage").requires("impact.game", "plugins.io.storage-manager").defines(function() {
	ig.Game.inject({
		loadAll: function() {
			var b = this.storage.get(this.storageName);
			if (null === b || "undefined" === typeof b) b = this.initData();
			else {
				try {
					var c = LZString.decompressFromUTF16(b),
						c = JSON.parse(atob(c))
				} catch (d) {
					c = this.initData()
				}
				b = c
			}
			for (var e in b) this.sessionData[e] = b[e];
			this.saveAll()
		},
		saveAll: function() {
			var b = btoa(JSON.stringify(this.sessionData)),
				b = LZString.compressToUTF16(b);
			this.storage.set(this.storageName, b)
		},
		load: function(b) {
			var c = this.storage.get(this.storageName);
			try {
				var d = LZString.decompressFromUTF16(c),
					d = JSON.parse(atob(d))
			} catch (e) {
				d = this.initData()
			}
			this.sessionData[b] = d[b]
		},
		save: function(b, c) {
			var d = this.storage.get(this.storageName);
			try {
				var e = LZString.decompressFromUTF16(d),
					e = JSON.parse(atob(e))
			} catch (f) {
				e = this.initData()
			}
			d = e;
			d[b] = c;
			d = btoa(JSON.stringify(d));
			d = LZString.compressToUTF16(d);
			this.storage.set(this.storageName, d)
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.random-generator").defines(function() {
	ig.RandomGenerator = ig.Class.extend({
		init: function(b) {
			"undefined" === typeof b && (b = []);
			this.c = 1;
			this.s2 = this.s1 = this.s0 = 0;
			this.sow(b)
		},
		sow: function(b) {
			this.s0 = this.hash(" ");
			this.s1 = this.hash(this.s0);
			this.s2 = this.hash(this.s1);
			this.c = 1;
			if (b)
				for (var c = 0; c < b.length && null != b[c]; c++) {
					var d = b[c];
					this.s0 -= this.hash(d);
					this.s0 += ~~(0 > this.s0);
					this.s1 -= this.hash(d);
					this.s1 += ~~(0 > this.s1);
					this.s2 -= this.hash(d);
					this.s2 += ~~(0 > this.s2)
				}
		},
		rnd: function() {
			var b = 2091639 * this.s0 + 2.3283064365386963E-10 * this.c;
			this.c = b | 0;
			this.s0 = this.s1;
			this.s1 = this.s2;
			return this.s2 = b - this.c
		},
		hash: function(b) {
			var c, d, e;
			e = 4022871197;
			b = b.toString();
			for (d = 0; d < b.length; d++) e += b.charCodeAt(d), c = 0.02519603282416938 * e, e = c >>> 0, c -= e, c *= e, e = c >>> 0, c -= e, e += 4294967296 * c;
			return 2.3283064365386963E-10 * (e >>> 0)
		},
		frac: function() {
			return this.rnd.apply(this) + 1.1102230246251565E-16 * (2097152 * this.rnd.apply(this) | 0)
		},
		realInRange: function(b, c) {
			return this.frac() * (c - b) + b
		},
		integerInRange: function(b, c) {
			return Math.floor(this.realInRange(0, c - b + 1) + b)
		},
		pick: function(b) {
			var c = this.integerInRange(0, b.length - 1);
			return b[c]
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.math-collection").defines(function() {
	ig.MathCollection = ig.Class.extend({
		DEG_TO_RAD: Math.PI / 180,
		RAD_TO_DEG: 180 / Math.PI,
		degToRad: function(b) {
			return b * this.DEG_TO_RAD
		},
		radToDeg: function(b) {
			return b * this.RAD_TO_DEG
		},
		angleBetween: function(b, c, d, e) {
			return Math.atan2(e - c, d - b)
		},
		distance: function(b, c, d, e) {
			b -= d;
			c -= e;
			return Math.sqrt(b * b + c * c)
		},
		rectContains: function(b, c, d) {
			return 0 >= b.width || 0 >= b.height ? !1 : c >= b.x && c < b.right && d >= b.y && d < b.bottom
		},
		rectIntersects: function(b, c) {
			return 0 >= b.width || 0 >= b.height || 0 >= c.width || 0 >= c.height ? !1 : !(b.right < c.x || b.bottom < c.y || b.x > c.right || b.y > c.bottom)
		},
		polygonContains: function(b, c, d) {
			for (var e = !1, f = -1, g = b.points.length - 1; ++f < b.points.length; g = f) {
				var m = b.points[f].x,
					l = b.points[f].y,
					j = b.points[g].x,
					g = b.points[g].y;
				if ((l <= d && d < g || g <= d && d < l) && c < (j - m) * (d - l) / (g - l) + m) e = !e
			}
			return e
		},
		circleContains: function(b, c, d) {
			return 0 < b.radius && c >= b.left && c <= b.right && d >= b.top && d <= b.bottom ? (b.x - c) * (b.x - c) + (b.y - d) * (b.y - d) <= b.radius * b.radius : !1
		},
		catmullRom: function(b, c, d, e, f) {
			b = 0.5 * (d - b);
			e = 0.5 * (e - c);
			var g = f * f;
			return (2 * c - 2 * d + b + e) * f * g + (-3 * c + 3 * d - 2 * b - e) * g + b * f + c
		},
		catmullRomInterpolation: function(b, c) {
			var d = b.length - 1,
				e = d * c,
				f = Math.floor(e);
			return b[0] === b[d] ? (0 > c && (f = Math.floor(e = d * (1 + c))), this.catmullRom(b[(f - 1 + d) % d], b[f], b[(f + 1) % d], b[(f + 2) % d], e - f)) : 0 > c ? b[0] - (this.catmullRom(b[0], b[0], b[1], b[1], -e) - b[0]) : 1 < c ? b[d] - (this.catmullRom(b[d], b[d], b[d - 1], b[d - 1], e - d) - b[d]) : this.catmullRom(b[f ? f - 1 : 0], b[f], b[d < f + 1 ? d : f + 1], b[d < f + 2 ? d : f + 2], e - f)
		},
		factorial: function(b) {
			if (0 === b) return 1;
			for (var c = b; --b;) c *= b;
			return c
		},
		bernstein: function(b, c) {
			return this.factorial(b) / this.factorial(c) / this.factorial(b - c)
		},
		bezierInterpolation: function(b, c) {
			for (var d = 0, e = b.length - 1, f = 0; f <= e; f++) d += Math.pow(1 - c, e - f) * Math.pow(c, f) * b[f] * this.bernstein(e, f);
			return d
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.debug").defines(function() {
	ig.Debug = ig.Class.extend({
		init: function() {},
		rect: function(b, c, d) {
			var e = ig.system.context;
			e.save();
			e.globalAlpha = d;
			e.fillStyle = c;
			e.fillRect(b.x, b.y, b.width, b.height);
			e.restore()
		},
		circle: function(b, c, d) {
			var e = ig.system.context;
			e.save();
			e.globalAlpha = d;
			e.beginPath();
			e.arc(b.x, b.y, b.radius, 0, 2 * Math.PI, !1);
			e.fillStyle = c;
			e.fill();
			e.restore()
		},
		polygon: function(b, c, d) {
			if (b.points && 0 != b.points.length) {
				var e = ig.system.context;
				e.save();
				e.globalAlpha = d;
				e.fillStyle = c;
				e.beginPath();
				c = b.points[0];
				e.moveTo(c.x, c.y);
				b = b.points;
				for (d = 1; d < b.length; d++) c = b[d], e.lineTo(c.x, c.y);
				e.closePath();
				e.fill();
				e.restore()
			}
		},
		satPolygon: function(b, c, d) {
			var e = ig.system.context;
			e.save();
			e.globalAlpha = d;
			e.fillStyle = c;
			e.beginPath();
			c = b.pointList[0];
			e.moveTo(c.x, c.y);
			b = b.pointList;
			for (d = 1; d < b.length; d++) c = b[d], e.lineTo(c.x, c.y);
			e.closePath();
			e.fill();
			e.restore()
		},
		satCircle: function(b, c, d) {
			var e = ig.system.context;
			e.save();
			e.globalAlpha = d;
			e.beginPath();
			e.arc(b.center.x, b.center.y, b.radius, 0, 2 * Math.PI, !1);
			e.fillStyle = c;
			e.fill();
			e.restore()
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.geometry").defines(function() {
	ig.Geometry = ig.Class.extend({
		rectangle: function(b, c, d, e) {
			var f = {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				right: 0,
				bottom: 0
			};
			f.x = b;
			f.y = c;
			f.width = d;
			f.height = e;
			f.right = b + d;
			f.bottom = c + e;
			return f
		},
		circle: function(b, c, d) {
			var e = {
				x: 0,
				y: 0,
				diameter: 0,
				radius: 0,
				right: 0,
				left: 0,
				top: 0,
				bottom: 0
			};
			e.x = b;
			e.y = c;
			e.diameter = d;
			e.radius = 0.5 * d;
			e.left = b - e.radius;
			e.right = b + e.radius;
			e.top = c - e.radius;
			e.bottom = c + e.radius;
			return e
		},
		polygon: function(b) {
			var c = {
				points: [],
				closed: !0
			};
			c.points = b;
			return c
		}
	});
	ig.Polygon = ig.Class.extend({
		points: [],
		closed: !0,
		init: function(b) {
			this.points = b
		}
	})
});
ig.baked = !0;
ig.module("game.entities.addon.custom-entity").requires("impact.entity").defines(function() {
	EntityPos = ig.Class.extend({
		x: 0,
		y: 0,
		init: function(b) {
			this.parentObj = b;
			this.x = b.x;
			this.y = b.y
		},
		setTo: function(b, c) {
			this.x = b ? b : this.x;
			this.y = c ? c : this.y;
			this.parentObj.x = this.x;
			this.parentObj.y = this.y
		}
	});
	EntityCustomEntity = ig.Entity.extend({
		name: "Entity",
		exists: !0,
		visible: !0,
		_visible: !0,
		zIndex: -1,
		x: 0,
		y: 0,
		setPosition: function(b, c) {
			this.x = b ? b : this.x;
			this.y = c ? c : this.x
		},
		children: [],
		groupParent: null,
		anchor: {
			x: 0,
			y: 0,
			setTo: function(b, c) {
				this.x = b;
				this.y = 0 == c ? 0 : c ? c : this.x
			}
		},
		scale: {
			x: 1,
			y: 1,
			setTo: function(b, c) {
				this.x = b;
				this.y = 0 == c ? 0 : c ? c : this.x
			}
		},
		_scale: {
			x: 1,
			y: 1,
			setTo: function(b, c) {
				this.x = Math.abs(b) * ig.system.scale;
				this.y = 0 == c ? 0 : c ? Math.abs(c) * ig.system.scale : this.x
			}
		},
		inputEnabled: !1,
		frameName: "",
		alpha: 1,
		currentPlay: "idle",
		width: 0,
		height: 0,
		angle: 0,
		_angle: 0,
		rotation: 0,
		_rotation: 0,
		isClicked: !1,
		lastScale: {
			x: 0,
			y: 0,
			setTo: function(b, c) {
				this.x = b;
				this.y = 0 == c ? 0 : c ? c : this.x
			}
		},
		gravityFactor: 0,
		init: function(b, c, d) {
			this.parent(b, c, d);
			this.position = new EntityPos(this)
		},
		setProperty: function() {
			var b = this.groupParent ? ig.game.parentPos(this.groupParent) : {
					x: 0,
					y: 0
				},
				c = b.y,
				d = this.height * this._scale.y;
			this.pos.x = this.x + b.x - this.width * this._scale.x * this.anchor.x;
			this.pos.y = this.y + c - d * this.anchor.y;
			b = this.lastScale.y;
			c = this.scale.y;
			if (this.scale.x != this.lastScale.x || c != b) this.scale.x = parseFloat(this.scale.x.toFixed(3)), this.scale.y = parseFloat(this.scale.y.toFixed(3)), this.setScale(this.scale.x, this.scale.y);
			(this.position.x != this.x || this.position.y != this.y) && this.position.setTo(this.x, this.y);
			this.angle != this._angle && this.setAngle(this.angle);
			this.rotation != this._rotation && this.setRotation(this.rotation)
		},
		setRotation: function(b) {
			this._rotation = b;
			this.angle = this.rotation.toDeg()
		},
		setAngle: function(b) {
			this._angle = b;
			this.rotation = this.angle.toRad()
		},
		getBounds: function() {
			var b = this.width * this._scale.x,
				c = this.height * this._scale.y;
			return {
				x: this.pos.x,
				y: this.pos.y,
				width: b,
				height: c,
				right: this.pos.x + b,
				bottom: this.pos.y + c
			}
		},
		updateChildren: function() {
			for (var b = 0; b < this.children.length; b++) {
				var c = this.children[b];
				c && c.exists && c.update && c.update()
			}
			this.visible != this._visible && (this._visible = this.visible)
		},
		drawChildren: function() {
			for (var b = 0; b < this.children.length; b++) {
				var c = this.children[b];
				c && c.exists && c.draw && c.draw()
			}
		},
		kill: function() {
			this.exists = !1;
			for (var b = 0; b < this.children.length; b++) this.children[b].kill();
			this.groupParent && (b = this.groupParent.children.indexOf(this), this.groupParent.children.splice(b, 1));
			this.parent()
		},
		update: function() {
			0 > this.zIndex || this.parent()
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.custom-image").requires("impact.image").defines(function() {
	ig.CustomImage = ig.Image.extend({
		x: 0,
		y: 0,
		children: [],
		groupParent: null,
		visible: !0,
		setPosition: function(b, c) {
			this.x = b;
			this.y = c
		},
		pos: {
			x: 0,
			y: 0,
			setTo: function(b, c) {
				this.x = b;
				this.y = c
			}
		},
		size: {
			x: 0,
			y: 0
		},
		anchor: {
			x: 0,
			y: 0,
			setTo: function(b, c) {
				this.x = b;
				this.y = 0 == c ? c : c ? c : this.x
			}
		},
		scale: {
			x: 1,
			y: 1,
			setTo: function(b, c) {
				this.x = b;
				this.y = 0 == c ? c : c ? c : this.x
			}
		},
		_scale: {
			x: 1,
			y: 1,
			setTo: function(b, c) {
				this.x = b * ig.system.scale;
				this.y = 0 == c ? c : c ? c * ig.system.scale : this.x
			}
		},
		lastScale: {
			x: 0,
			y: 0,
			setTo: function(b, c) {
				this.x = b;
				this.y = 0 == c ? 0 : c ? c : this.x
			}
		},
		inputEnabled: !1,
		frameName: "",
		alpha: 1,
		currentPlay: "idle",
		angle: 0,
		_angle: 0,
		rotation: 0,
		exists: !0,
		init: function(b) {
			this.parent(b)
		},
		setProperty: function() {
			var b = this.groupParent ? ig.game.parentPos(this.groupParent) : {
					x: 0,
					y: 0
				},
				c = b.y,
				d = this.height * this._scale.y;
			this.pos.x = this.x + b.x - this.width * this._scale.x * this.anchor.x;
			this.pos.y = this.y + c - d * this.anchor.y;
			b = this.lastScale.y;
			c = this.scale.y;
			(this.scale.x != this.lastScale.x || c != b) && this.setScale(this.scale.x, this.scale.y);
			this.angle != this._angle && this.setAngle(this.angle)
		},
		setAngle: function(b) {
			this._angle = b;
			this.rotation = this.angle.toRad()
		},
		getBounds: function() {
			var b = this.width * this._scale.x,
				c = this.height * this._scale.y;
			return {
				x: this.pos.x,
				y: this.pos.y,
				width: b,
				height: c,
				right: this.pos.x + b,
				bottom: this.pos.y + c
			}
		},
		updateChildren: function() {
			for (var b = 0; b < this.children.length; b++) {
				var c = this.children[b];
				c && c.exists && c.update && c.update()
			}
		},
		drawChildren: function() {
			for (var b = 0; b < this.children.length; b++) {
				var c = this.children[b];
				c && c.exists && c.draw && c.draw()
			}
		},
		update: function() {},
		draw: function(b, c, d, e, f, g, m, l) {
			if (this.loaded) {
				var j = ig.system.scale;
				d = d ? d * j : 0;
				e = e ? e * j : 0;
				f = (f ? f : this.width) * j;
				g = (g ? g : this.height) * j;
				var j = m ? -1 : 1,
					q = l ? -1 : 1;
				ig.system.context.save();
				(m || l) && ig.system.context.scale(j, q);
				ig.system.context.drawImage(this.data, d, e, f, g, ig.system.getDrawPos(b), ig.system.getDrawPos(c), f, g);
				ig.system.context.restore();
				ig.Image.drawCount++
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.raw-image").requires("plugins.addon.custom-image").defines(function() {
	ig.RawImage = ig.CustomImage.extend({
		imgUrl: "media/graphics/",
		sourceX: 0,
		sourceY: 0,
		spriteData: null,
		isReady: !1,
		init: function(b, c) {
			var d = c.split(".");
			1 < d.length ? (this.imgName = d[0], this.frameName = c) : (this.imgName = c, this.frameName = c + ".png");
			this.folderName = b;
			this.parent(this.imgUrl + b + "/" + this.frameName);
			this.checkProperties()
		},
		checkProperties: function() {
			ig.Image.cache[this.path] ? 0 < this.data.width || 0 < this.data.height ? this.spriteData = {
				filename: this.frameName,
				frame: {
					w: this.data.width,
					h: this.data.height
				}
			} : this.checkImgData() : this.checkImgData();
			null != this.spriteData && (this.size.x = this.spriteData.frame.w, this.size.y = this.spriteData.frame.h, this.width = this.size.x, this.height = this.size.y)
		},
		checkImgData: function() {
			try {
				this.spriteData = ig.game.getSpriteDatas(this.folderName, this.imgName)
			} catch (b) {
				this.spriteData = null
			}
		},
		setScale: function(b, c) {
			var d = this.size.x / (this.width * this._scale.x),
				e = this.size.y / (this.height * this._scale.y);
			this.scale.setTo(b, c);
			this.lastScale.setTo(b, c);
			this._scale.setTo(Math.abs(b), Math.abs(c));
			this.size.x = this._scale.x * this.width * d;
			this.size.y = this._scale.y * this.height * e
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.add-signal").defines(function() {
	ig.AddSignal = ig.Class.extend({
		init: function(b) {
			this.events = [];
			this.bindObject = b
		},
		add: function(b, c) {
			if ("function" !== typeof b) throw "Argument not a function";
			this.events.push(b.bind(c))
		},
		dispatch: function() {
			for (var b = 0; b < this.events.length; b++)(0, this.events[b])(this.bindObject)
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.custom-animation").requires("impact.animation", "plugins.addon.raw-image", "plugins.addon.add-signal").defines(function() {
	ig.CustomAnimSheet = ig.AnimationSheet.extend({
		init: function(b, c) {
			this.image = new ig.RawImage(b, c);
			this.width = this.image.size.x;
			this.height = this.image.size.y
		}
	});
	ig.CustomAnimation = ig.Animation.extend({
		init: function(b, c, d, e, f) {
			this.parent(b, c, d, e);
			this.onComplete = new ig.AddSignal(f);
			this.onLoop = new ig.AddSignal(f);
			this.onEnterFrame = new ig.AddSignal(f);
			this.onStart = new ig.AddSignal(f);
			this.isStarting = this.isLooping = this.isComplete = !1;
			this.prevFrame = this.frame;
			this.isPaused = !1
		},
		update: function() {
			this.isPaused || (this.parent(), this.sheet.image.update(), 0 == this.frame && 0 == this.loopCount ? this.isStarting || (this.isStarting = !0, this.onStart.dispatch()) : this.isStarting = !1, 0 == this.frame && 0 < this.loopCount ? this.isLooping || (this.isLooping = !0, this.onLoop.dispatch()) : this.isLooping && (this.isLooping = !1), this.prevFrame != this.frame && (this.prevFrame = this.frame, this.onEnterFrame.dispatch()), this.stop && 0 < this.loopCount ? this.isComplete || (this.isComplete = !0, this.onComplete.dispatch()) : this.isComplete = !1)
		},
		draw: function(b, c) {
			var d = Math.max(this.sheet.width, this.sheet.height);
			b > ig.system.width || (c > ig.system.height || 0 > b + d || 0 > c + d) || this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y)
		}
	})
});
ig.baked = !0;
ig.module("game.entities.addon.sprite").requires("game.entities.addon.custom-entity", "plugins.addon.custom-animation", "plugins.addon.add-signal").defines(function() {
	EntitySprite = EntityCustomEntity.extend({
		imgUrl: "media/graphics/",
		name: "Sprite",
		type: ig.Entity.TYPE.A,
		setAnimSheet: {},
		setAnims: {},
		init: function(b, c, d) {
			this.x = b;
			this.y = c;
			this.onClick = new ig.AddSignal(this);
			this.onRelease = new ig.AddSignal(this);
			this.parent(b, c, d)
		},
		setProperties: function(b, c) {
			this.folderName = b;
			this.spriteName = c;
			var d = c.split(".");
			this.fileName = d = 1 < d.length ? c : c + ".png";
			this.frameName = b + "/" + c;
			this.fullUrl = this.imgUrl + b + "/" + this.fileName;
			this.animSheet = new ig.CustomAnimSheet(b, c);
			this.width = this.animSheet.image.size.x;
			this.height = this.animSheet.image.size.y;
			this.size.x = this.animSheet.image.size.x;
			this.size.y = this.animSheet.image.size.y;
			this.addAnim(this.currentPlay, 0.1, [0]);
			this.playAnim(this.currentPlay)
		},
		setAnimSize: function() {
			var b = ig.game.getSpriteDatas(this.folderName, this.spriteName);
			b && (this.width = b.frame.w, this.height = b.frame.h, this.size.x = this.width, this.size.y = this.height)
		},
		addAnim: function(b, c, d, e) {
			if (!this.animSheet) throw "No animSheet to add the animation " + b + " to.";
			c = new ig.CustomAnimation(this.animSheet, c, d, e, this);
			this.anims[b] = c;
			this.currentAnim || (this.currentAnim = c);
			return c
		},
		addAnimSheet: function(b, c) {
			new ig.CustomAnimSheet(b, c)
		},
		playAnim: function(b) {
			var c = this.anims[b];
			c && (this.currentPlay = b, this.currentAnim = c, this.currentAnim.rewind())
		},
		addChild: function(b) {
			b.groupParent = this;
			this.children.push(b);
			ig.game.checkZIndexGroups()
		},
		removeChild: function(b) {
			var c = this.children.indexOf(b);
			this.children.splice(c, 1);
			b.zIndex = -1;
			b.groupParent = null;
			ig.game.checkZIndexGroups()
		},
		setScale: function(b, c) {
			this.scale.setTo(b, c);
			this.lastScale.setTo(b, c);
			this._scale.setTo(Math.abs(b), Math.abs(c));
			var d = this._scale.y * this.height;
			this.size.x = this._scale.x * this.width;
			this.size.y = d
		},
		update: function() {
			this.exists && !(0 > this.zIndex) && (this.setProperty(), this.parent(), this.updateChildren(), this.currentAnim && (this.currentAnim.sheet.width = Math.floor(this.size.x / this._scale.x), this.currentAnim.sheet.height = Math.floor(this.size.y / this._scale.y)), this.isClicked && (ig.input.state("click") || this.released()))
		},
		setFrame: function(b, c) {
			this.anims = {};
			this.currentAnim = null;
			this.setProperties(b, c);
			this.setScale(this.scale.x, this.scale.y)
		},
		draw: function() {
			if (this.exists && !(ig.game.addOnReady && 0 > this.zIndex) && this.visible && !(1 > this.size.x || 1 > this.size.y)) {
				var b = this.pos.x,
					c = this.pos.y,
					d = this.width * this._scale.x * this.anchor.x,
					e = this.height * this._scale.y * this.anchor.y,
					f = 1,
					g = 1;
				0 > this.scale.x && (f = -1);
				0 > this.scale.y && (g = -1);
				var m = ig.system.context;
				m.save();
				1 != this.alpha && (ig.system.context.globalAlpha = this.alpha);
				m.translate(ig.system.getDrawPos(b + d), ig.system.getDrawPos(c + e));
				m.rotate(this._rotation);
				m.translate(ig.system.getDrawPos(-d - b), ig.system.getDrawPos(-e - c));
				m.translate(ig.system.getDrawPos(b), ig.system.getDrawPos(c));
				m.scale(this._scale.x, this._scale.y);
				if (0 > f || 0 > g) {
					m.save();
					var l = 0;
					0 > f && (l = 2 * (d / this._scale.x));
					d = 0;
					0 > g && (d = 2 * (e / this._scale.y));
					m.translate(ig.system.getDrawPos(l), ig.system.getDrawPos(d));
					m.scale(f, g)
				}
				this.currentAnim && this.currentAnim.draw(0, 0);
				e = (this.height - this.size.y) * this.anchor.y;
				m.translate(ig.system.getDrawPos(-b + (this.width - this.size.x) * this.anchor.x), ig.system.getDrawPos(-c + e));
				this.drawChildren();
				(0 > f || 0 > g) && m.restore();
				1 != this.alpha && (ig.system.context.globalAlpha = this.alpha);
				m.restore()
			}
		},
		clicked: function() {
			this.isClicked || (this.isClicked = !0, this.onClick.dispatch(this))
		},
		released: function() {
			this.isClicked && (this.isClicked = !1, this.onRelease.dispatch(this))
		}
	})
});
ig.baked = !0;
ig.module("game.entities.addon.group").requires("game.entities.addon.custom-entity").defines(function() {
	EntityGroup = EntityCustomEntity.extend({
		name: "Group",
		init: function(b, c, d) {
			this.x = b ? b : 0;
			this.y = c ? c : 0;
			this.parent(b, c, d)
		},
		add: function(b) {
			b.groupParent = this;
			this.children.push(b);
			ig.game.checkZIndexGroups();
			this.setLength()
		},
		remove: function(b) {
			var c = this.children.indexOf(b);
			this.children.splice(c, 1);
			b.zIndex = -1;
			b.groupParent = null;
			ig.game.checkZIndexGroups();
			this.setLength()
		},
		sorting: function() {
			for (var b = [], c = 0; c < this.children.length; c++) {
				var d = this.children[c];
				d && d.exists && b.push(d)
			}
			this.children = [];
			for (c = 0; c < b.length; c++) this.children.push(b[c])
		},
		bringToTop: function(b) {
			var c = this.children.indexOf(b);
			this.children.splice(c, 1);
			this.children.push(b);
			ig.game.checkZIndexGroups()
		},
		sendToBack: function(b) {
			var c = this.children.indexOf(b);
			this.children.splice(c, 1);
			this.children.splice(0, 0, b);
			ig.game.checkZIndexGroups()
		},
		getBounds: function() {
			for (var b = null, c = null, d = null, e = null, f = 0; f < this.children.length; f++) {
				var g = this.children[f];
				g && g.exists && g.getBounds && (g = g.getBounds(), null == b ? b = g.x : g.x < b && (b = g.x), null == c ? c = g.right : g.right > c && (c = g.right), null == d ? d = g.y : g.y < d && (d = g.y), null == e ? e = g.bottom : g.bottom > e && (e = g.bottom))
			}
			c || (c = 0);
			b || (b = 0);
			e || (e = 0);
			d || (d = 0);
			return {
				x: b,
				y: d,
				width: c - b,
				height: e - d,
				right: c,
				bottom: e
			}
		},
		setProperty: function() {
			var b = this.groupParent ? ig.game.parentPos(this.groupParent) : {
					x: 0,
					y: 0
				},
				c = b.y;
			this.pos.x = this.x + b.x;
			this.pos.y = this.y + c;
			b = this.lastScale.y;
			c = this.scale.y;
			if (this.scale.x != this.lastScale.x || c != b) this.scale.x = parseFloat(this.scale.x.toFixed(2)), this.scale.y = parseFloat(this.scale.y.toFixed(2)), this.setScale(this.scale.x, this.scale.y);
			(this.position.x != this.x || this.position.y != this.y) && this.position.setTo(this.x, this.y);
			this.angle != this._angle && this.setAngle(this.angle);
			this.rotation != this._rotation && this.setRotation(this.rotation)
		},
		setScale: function(b, c) {
			this.scale.setTo(b, c);
			this.lastScale.setTo(b, c);
			this._scale.setTo(b, c)
		},
		setLength: function() {
			var b = this.getBounds();
			this.width = b.width;
			this.height = b.height;
			this.size.x = this.width * this._scale.x;
			this.size.y = this.height * this._scale.y
		},
		update: function() {
			this.exists && !(ig.game.addOnReady && 0 > this.zIndex) && (this.sorting(), this.updateChildren(), this.setProperty(), this.setLength())
		},
		draw: function() {
			if (this.exists && !(ig.game.addOnReady && 0 > this.zIndex) && this.visible) {
				var b = 1,
					c = 1;
				0 > this.scale.x && (b = -1);
				0 > this.scale.y && (c = -1);
				var d = ig.system.context;
				d.save();
				1 != this.alpha && (ig.system.context.globalAlpha = this.alpha);
				d.translate(ig.system.getDrawPos(this.pos.x), ig.system.getDrawPos(this.pos.y));
				d.rotate(this.rotation);
				d.scale(this._scale.x, this._scale.y);
				if (0 > b || 0 > c) d.save(), d.scale(b, c);
				d.translate(ig.system.getDrawPos(-this.pos.x), ig.system.getDrawPos(-this.pos.y));
				this.drawChildren();
				(0 > b || 0 > c) && d.restore();
				1 != this.alpha && (ig.system.context.globalAlpha = 1);
				d.restore()
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.add-image").requires("plugins.addon.raw-image").defines(function() {
	ig.AddImage = ig.RawImage.extend({
		name: "Image",
		imgUrl: "media/graphics/",
		sourceX: 0,
		sourceY: 0,
		spriteData: null,
		isReady: !1,
		init: function(b, c, d, e) {
			this.parent(d, e);
			this.x = b;
			this.y = c;
			this.oriData = this.data
		},
		addChild: function(b) {
			b.groupParent = this;
			this.children.push(b);
			ig.game.checkZIndexGroups()
		},
		removeChild: function(b) {
			var c = this.children.indexOf(b);
			this.children.splice(c, 1);
			b.zIndex = -1;
			b.groupParent = null;
			ig.game.checkZIndexGroups()
		},
		update: function() {
			this.parent();
			this.setProperty();
			this.updateChildren()
		},
		draw: function() {
			if (this.exists && this.visible) {
				var b = this.pos.x,
					c = this.pos.y,
					d = this.sourceX,
					e = this.sourceY,
					f = this.size.x / this._scale.x,
					g = this.size.y / this._scale.y,
					m = 1,
					l = 1;
				this.rotation.toDeg();
				var m = this.width * this._scale.x * this.anchor.x,
					l = this.height * this._scale.y * this.anchor.y,
					j = ig.system.context;
				j.save();
				1 != this.alpha && (ig.system.context.globalAlpha = this.alpha);
				j.translate(ig.system.getDrawPos(b + m), ig.system.getDrawPos(c +
					l));
				0 != this.rotation && ig.system.context.rotate(this.rotation);
				ig.system.context.translate(ig.system.getDrawPos(-m - b), ig.system.getDrawPos(-l - c));
				j.translate(ig.system.getDrawPos(b), ig.system.getDrawPos(c));
				m = 0 > this.scale.x ? !0 : !1;
				l = 0 > this.scale.y ? !0 : !1;
				j.scale(this._scale.x, this._scale.y);
				this.parent(0, 0, d, e, f, g, m, l);
				j.translate(ig.system.getDrawPos(-b), ig.system.getDrawPos(-c));
				this.drawChildren();
				1 != this.alpha && (ig.system.context.globalAlpha = 1);
				ig.system.context.restore()
			}
		},
		checkBoundRotated: function() {
			ig.game.math.distance(this.pos.x, this.pos.y, this.pos.x + this.size.x, this.pos.y + this.size.y);
			var b = ig.game.math.degToRad(this.angle - 45),
				c = ig.game.math.degToRad(this.angle - 45);
			ig.game.math.degToRad(c + 180);
			ig.game.math.degToRad(b - 180)
		},
		kill: function() {
			this.exists = !1
		}
	})
});
ig.baked = !0;
ig.module("game.entities.addon.text").requires("game.entities.addon.custom-entity", "plugins.addon.add-signal").defines(function() {
	EntityText = EntityCustomEntity.extend({
		name: "Text",
		fontType: "",
		fontSize: 12,
		lineSpacing: 0,
		fill: "#ffffff",
		wordWrap: !1,
		wordWrapWidth: 0,
		stroke: "black",
		strokeThickness: 0,
		lines: [],
		fontWeight: "normal",
		textAnchor: {
			x: 0,
			y: 0
		},
		exists: !0,
		showText: "",
		align: "left",
		style: {
			enableShadow: !1,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowColor: "black",
			shadowBlur: 0,
			shadowStroke: !1,
			shadowFill: !1
		},
		init: function(b, c) {
			this.x = b;
			this.y = c;
			this.parent(b, c);
			this.showText = "";
			this.onClick = new ig.AddSignal(this);
			this.onRelease = new ig.AddSignal(this)
		},
		inputProperty: function(b, c, d) {
			this.showText = b;
			this.fontSize = c;
			this.fontType = d;
			this.updateText()
		},
		setShadow: function(b, c, d, e, f, g) {
			void 0 === b && (b = 0);
			void 0 === c && (c = 0);
			void 0 === d && (d = "rgba(0, 0, 0, 1)");
			void 0 === e && (e = 0);
			void 0 === f && (f = !0);
			void 0 === g && (g = !0);
			this.style.shadowOffsetX = b;
			this.style.shadowOffsetY = c;
			this.style.shadowColor = d;
			this.style.shadowBlur = e;
			this.style.shadowStroke = f;
			this.style.shadowFill = g;
			this.style.enableShadow = !0;
			return this
		},
		checkLines: function() {
			var b = "";
			try {
				var c = this.showText,
					d = c.split("\n")
			} catch (e) {
				throw "text not detected";
			}
			if (this.wordWrap) {
				var c = ig.system.context,
					f = this.fontWeight + " " + this.fontSize + "px " + this.fontType;
				c.save();
				c.font = f;
				for (f = 0; f < d.length; f++) {
					for (var g = d[f].split(" "), m = 0, l = 0; l < g.length; l++) {
						for (var j = g[l], q = 0; q < j.length; q++) var z = ig.system.context.measureText(j[q]).width,
							y = ig.system.context.measureText(" ").width,
							m = m + (z + y + 0);
						q = " ";
						l == g.length - 1 && (q = "");
						this.wordWrap && (m > this.wordWrapWidth && l < g.length - 1) && (j += "\n", m = 0, q = "");
						b += j + q
					}
					f < d.length - 1 && (b += "\n")
				}
				c.restore();
				return b
			}
			return c
		},
		updateText: function() {
			this.lines = [];
			for (var b = this.checkLines().split("\n"), c = 0; c < b.length; c++) this.lines.push(b[c]);
			this.textAnchor.x = 0;
			switch (this.align) {
				case "right":
					this.textAnchor.x = 1;
					break;
				case "center":
					this.textAnchor.x = 0.5;
					break;
				case "left":
					this.textAnchor.x = 0
			}
			this.getDimension()
		},
		getDimension: function() {
			var b = ig.system.context,
				c = this.fontWeight +
				" " + this.fontSize + "px " + this.fontType;
			b.save();
			b.font = c;
			for (var c = null, d = 0, e = 0; e < this.lines.length; e++) {
				for (var f = this.lines[e], g = 0, m = 0; m < f.length; m++) var l = b.measureText(f[m]).width,
					g = g + l;
				c ? g > c && (c = g) : c = g;
				d += this.fontSize + this.lineSpacing
			}
			this.width = c;
			this.height = d;
			this.size.x = this.width * this._scale.x;
			this.size.y = this.height * this._scale.y;
			b.restore()
		},
		setScale: function(b, c) {
			this.scale.setTo(b, c);
			this.lastScale.setTo(b, c);
			this._scale.setTo(Math.abs(b), Math.abs(c));
			this.size.x = this._scale.x * this.width;
			this.size.y = this._scale.y * this.height
		},
		setText: function(b) {
			this.showText = b + ""
		},
		getBounds: function() {
			var b = this.groupParent ? ig.game.parentPos(this.groupParent) : {
					x: 0,
					y: 0
				},
				c = this.width * this._scale.x,
				d = this.height * this._scale.y,
				e = this.x + b.x - c * this.anchor.x,
				b = this.y + b.y - d * this.anchor.y;
			return {
				x: e,
				y: b,
				width: c,
				height: d,
				right: e + c,
				bottom: b + d
			}
		},
		setProperty: function() {
			var b = this.groupParent ? ig.game.parentPos(this.groupParent) : {
					x: 0,
					y: 0
				},
				c = b.y,
				d = this.height * this.anchor.y;
			this.pos.x = this.x + b.x - (this.width * this.anchor.x -
				this.width * this.textAnchor.x);
			this.pos.y = this.y + c - d;
			b = this.lastScale.y;
			c = this.scale.y;
			if (this.scale.x != this.lastScale.x || c != b) this.scale.x = parseFloat(this.scale.x.toFixed(2)), this.scale.y = parseFloat(this.scale.y.toFixed(2)), this.setScale(this.scale.x, this.scale.y);
			(this.position.x != this.x || this.position.y != this.y) && this.position.setTo(this.x, this.y);
			this.angle != this._angle && this.setAngle(this.angle);
			this.rotation != this._rotation && this.setRotation(this.rotation)
		},
		addChild: function(b) {
			b.groupParent = this;
			this.children.push(b);
			ig.game.checkZIndexGroups()
		},
		removeChild: function(b) {
			var c = this.children.indexOf(b);
			this.children.splice(c, 1);
			b.zIndex = -1;
			b.groupParent = null;
			ig.game.checkZIndexGroups()
		},
		checkPointer: function() {
			if (this.inputEnabled) {
				var b = this.getBounds(),
					c = ig.game.pointer.pos;
				c.x >= b.x && c.x <= b.right && c.y >= b.y && c.y <= b.bottom && ig.game.pointer.check(this)
			}
		},
		update: function() {
			this.exists && !(ig.game && ig.game.addOnReady && 0 > this.zIndex) && (this.updateText(), this.setProperty(), this.updateChildren(), this.checkPointer(), this.isClicked && (ig.input.state("click") || this.released()))
		},
		draw: function() {
			if (this.exists && !(ig.game && ig.game.addOnReady && 0 > this.zIndex) && this.visible) {
				var b = this.width * this.anchor.x - this.width * this.textAnchor.x,
					c = this.height * this.anchor.y,
					d = this.pos.x,
					e = this.pos.y,
					f = 1,
					g = 1;
				0 > this.scale.x && (f = -1);
				0 > this.scale.y && (g = -1);
				var m = ig.system.context,
					l = this.fontWeight + " " + this.fontSize + "px " + this.fontType;
				m.save();
				1 != this.alpha && (ig.system.context.globalAlpha = this.alpha);
				m.translate(ig.system.getDrawPos(d +
					b), ig.system.getDrawPos(e + c));
				m.rotate(this.rotation);
				m.scale(this._scale.x, this._scale.y);
				if (0 > f || 0 > g) m.save(), m.scale(f, g);
				m.translate(ig.system.getDrawPos(-b - d), ig.system.getDrawPos(-c - e));
				m.fillStyle = this.fill;
				m.textBaseline = "alphabetic";
				m.font = l;
				m.textAlign = this.align;
				this.style.enableShadow && (m.shadowOffsetX = this.style.shadowOffsetX, m.shadowOffsetY = this.style.shadowOffsetY, m.shadowColor = this.style.shadowColor, m.shadowBlur = this.style.shadowBlur);
				for (b = 0; b < this.lines.length; b++) c = this.lines[b], l = e + (b + 1) * (this.fontSize + this.lineSpacing), m.fillText(c, d, l), 0 < this.strokeThickness && (m.strokeStyle = this.stroke, m.lineWidth = this.strokeThickness, m.strokeText(c, d, l));
				this.drawChildren();
				(0 > f || 0 > g) && m.restore();
				1 != this.alpha && (ig.system.context.globalAlpha = 1);
				ig.system.context.restore()
			}
		},
		clicked: function() {
			this.isClicked || (this.isClicked = !0, this.onClick.dispatch(this))
		},
		released: function() {
			this.isClicked && (this.isClicked = !1, this.onRelease.dispatch(this))
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.click-btn").requires("game.entities.addon.sprite").defines(function() {
	EntityClickBtn = EntitySprite.extend({
		btnType: 1,
		clickableLayer: null,
		setProperties: function(b, c) {
			this.parent(b, c);
			this.onStartClick = new ig.AddSignal(this);
			this.onGoing = !1;
			this.inputEnabled = !0;
			this.anchor.setTo(0.5)
		},
		changePage: function(b) {
			ig.game.changePage(b)
		},
		moreGames: function() {
			this.setProperty();
			this.div_layer_name = this.name = "more-games";
			_SETTINGS.MoreGames.Enabled ? (_SETTINGS.MoreGames.Link && (this.link = _SETTINGS.MoreGames.Link), _SETTINGS.MoreGames.NewWindow && (this.newWindow = _SETTINGS.MoreGames.NewWindow), this.clickableLayer = new ClickableDivLayer(this)) : this.kill()
		},
		show: function() {
			if (this.exists && "more-games" == this.name) {
				var b = ig.domHandler.getElementById("#" + this.div_layer_name);
				ig.domHandler.show(b)
			}
		},
		hide: function() {
			if (this.exists && "more-games" == this.name) {
				var b = ig.domHandler.getElementById("#" + this.div_layer_name);
				ig.domHandler.hide(b)
			}
		},
		tweenClick: function() {
			csound.sfxPlay("click");
			var b = this.scale.x -
				0.1,
				c = this.scale.y - 0.1;
			(new Tweener(this.scale)).to({
				x: b,
				y: c
			}, 0.075).easing(ig.Tweener.Easing.Bounce.EaseInOut).repeat(1).yoyo(!0).onComplete(function() {
				this.onGoing = !1;
				this.onClick.dispatch();
				this.released()
			}.bind(this)).start()
		},
		checkArea: function() {},
		clicked: function() {
			if ((!ig.game.transition || !ig.game.transition.isClosed) && !this.isClicked && !this.onGoing) this.onGoing = this.isClicked = !0, this.tweenClick(), this.onStartClick.dispatch()
		},
		released: function() {
			this.isClicked && !this.onGoing && (this.isClicked = !1, this.onRelease.dispatch())
		},
		update: function() {
			this.parent();
			this.clickableLayer && (this.clickableLayer.size = new Vector2(this.size.x, this.size.y), this.clickableLayer.update(this.pos.x, this.pos.y))
		},
		draw: function() {
			this.parent()
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.options").requires("game.entities.addon.group", "plugins.addon.add-signal").defines(function() {
	EntityOptions = EntityGroup.extend({
		name: "setting-group",
		init: function(b, c, d) {
			this.parent(b, c, d);
			this.isSfxClicked = this.isBgmClicked = this.onGoing = this.isActive = !1;
			this.onResume = new ig.AddSignal(this);
			this.startResume = new ig.AddSignal(this);
			this.create()
		},
		create: function() {
			this.mode = "setting";
			this.titleBox = ig.game.addImage(0, 0, "sprites", "box");
			this.titleBox.anchor.setTo(0.5);
			this.titleBox.y += 0.5 * this.titleBox.size.y;
			this.bg = ig.game.addImage(0, this.titleBox.y + 0.5 * this.titleBox.size.y, "sprites", "setting-box");
			this.bg.anchor.setTo(0.5);
			this.bg.y += 0.5 * this.bg.size.y - 0.25 * this.titleBox.size.y;
			this.add(this.bg);
			this.add(this.titleBox);
			var b = _STRINGS.Game.settings;
			this.showTitle = ig.game.addText(this.titleBox.x, this.titleBox.y - 3, b, 35, fonts.font1);
			this.showTitle.anchor.setTo(0.5);
			this.showTitle.fill = "white";
			this.add(this.showTitle);
			this.gBgm = ig.game.addGroup(0, this.bg.y - 0.2 * this.bg.size.y);
			this.add(this.gBgm);
			b = _STRINGS.Game.music;
			this.bgmText = ig.game.addText(0, -3, b, 25, fonts.font1);
			this.bgmText.anchor.setTo(0, 0.5);
			this.bgmText.x = -(0.35 * this.bg.size.x);
			this.bgmText.fill = "#7f2a39";
			this.gBgm.add(this.bgmText);
			this.gBgmBar = ig.game.addGroup(0.35 * this.bg.size.x, 0);
			this.gBgm.add(this.gBgmBar);
			this.bgmBarBg = ig.game.addSprite(0, 0, "sprites", "setting-bar-bg");
			this.bgmBarBg.anchor.setTo(0, 0.5);
			this.bgmBarBg.inputEnabled = !0;
			this.bgmBarBg.onClick.add(function() {
				this.isBgmClicked = !0
			}, this);
			this.bgmBarBg.onRelease.add(function() {
				csound.sfxPlay("click");
				this.isBgmClicked = !1
			}, this);
			this.gBgmBar.add(this.bgmBarBg);
			this.gBgmBar.x -= this.bgmBarBg.size.x;
			this.bgmBar = ig.game.addSprite(0, 0, "sprites", "setting-bar");
			this.bgmBar.anchor.setTo(0, 0.5);
			this.gBgmBar.add(this.bgmBar);
			this.bgmSlider = ig.game.addSprite(0, 0, "sprites", "setting-cursor");
			this.bgmSlider.anchor.setTo(0.5);
			this.bgmSlider.inputEnabled = !0;
			this.bgmSlider.onClick.add(function() {
				this.isBgmClicked = !0
			}, this);
			this.bgmSlider.onRelease.add(function() {
				csound.sfxPlay("click");
				this.isBgmClicked = !1
			}, this);
			this.gBgmBar.add(this.bgmSlider);
			this.gSfx = ig.game.addGroup(0, this.gBgm.y + 2.5 * this.bgmText.size.y);
			this.add(this.gSfx);
			b = _STRINGS.Game.sound;
			this.sfxText = ig.game.addText(this.bgmText.x, this.bgmText.y, b, this.bgmText.fontSize, fonts.font1);
			this.sfxText.anchor.setTo(0, 0.5);
			this.sfxText.fill = "#7f2a39";
			this.gSfx.add(this.sfxText);
			this.gSfxBar = ig.game.addGroup(this.gBgmBar.x, this.gBgmBar.y);
			this.gSfx.add(this.gSfxBar);
			this.sfxBarBg = ig.game.addSprite(0, 0, "sprites", "setting-bar-bg");
			this.sfxBarBg.anchor.setTo(0, 0.5);
			this.sfxBarBg.inputEnabled = !0;
			this.sfxBarBg.onClick.add(function() {
				this.isSfxClicked = !0
			}, this);
			this.sfxBarBg.onRelease.add(function() {
				csound.sfxPlay("click");
				this.isSfxClicked = !1
			}, this);
			this.gSfxBar.add(this.sfxBarBg);
			this.sfxBar = ig.game.addSprite(0, 0, "sprites", "setting-bar");
			this.sfxBar.anchor.setTo(0, 0.5);
			this.gSfxBar.add(this.sfxBar);
			this.sfxSlider = ig.game.addSprite(0, 0, "sprites", "setting-cursor");
			this.sfxSlider.anchor.setTo(0.5);
			this.sfxSlider.inputEnabled = !0;
			this.sfxSlider.onClick.add(function() {
				this.isSfxClicked = !0
			}, this);
			this.sfxSlider.onRelease.add(function() {
				csound.sfxPlay("click");
				this.isSfxClicked = !1
			}, this);
			this.gSfxBar.add(this.sfxSlider);
			this.setStartVolume();
			this.okBtn = ig.game.addSprite(0, this.bg.y + 0.37 * this.bg.size.y, "sprites", "buttons/basic-btn", {}, EntityClickBtn);
			this.okBtn.anchor.setTo(0.5);
			this.okBtn.onClick.add(function() {
				this.disappear()
			}, this);
			this.add(this.okBtn);
			b = ig.game.addText(0, -3, _STRINGS.Buttons.ok, 30, fonts.font1);
			b.anchor.setTo(0.5);
			b.fill = "white";
			this.okBtn.addChild(b)
		},
		pauseFunction: function() {
			this.mode = "pause";
			var b = this.okBtn.pos;
			this.okBtn.kill();
			this.showTitle.setText(_STRINGS.Game.paused);
			this.resumeBtn = ig.game.addSprite(b.x, b.y, "sprites", "buttons/play-btn", {}, EntityClickBtn);
			this.resumeBtn.setScale(0.8);
			this.resumeBtn.onClick.add(function() {
				this.disappear()
			}, this);
			this.resumeBtn.onStartClick.add(function() {
				this.buttonEnabled()
			}, this);
			this.add(this.resumeBtn);
			this.homeBtn = ig.game.addSprite(this.resumeBtn.x - 1.3 * this.resumeBtn.size.x, this.bg.y + 0.45 * this.bg.size.y, "sprites", "buttons/home", {}, EntityClickBtn);
			this.homeBtn.onStartClick.add(ig.game.disableBtns, ig.game);
			this.homeBtn.onClick.add(function(b) {
				b.changePage(LevelMainmenu)
			}, this);
			this.add(this.homeBtn);
			this.replayBtn = ig.game.addSprite(this.resumeBtn.x + 1.3 * this.resumeBtn.size.x, this.homeBtn.y, "sprites", "buttons/replay-btn", {}, EntityClickBtn);
			this.replayBtn.onStartClick.add(ig.game.disableBtns, ig.game);
			this.replayBtn.onClick.add(function(b) {
				b.changePage(ig.game.director.currentLevel)
			}, this);
			this.add(this.replayBtn)
		},
		setStartVolume: function() {
			this.y = 1.1 * -this.bg.size.y;
			this.alpha = 0;
			this.visible = !1;
			curState().greyBg.scale.x = 0
		},
		moreBtnSetting: function() {
			if (_SETTINGS.MoreGames.Enabled) {
				var b = ig.game.director.levels.indexOf(LevelMainmenu);
				ig.game.director.currentLevel == b && (this.isActive ? curState().moreBtn.hide() : curState().moreBtn.show())
			}
		},
		buttonEnabled: function() {
			this.isActive ? (this.okBtn.inputEnabled = !0, "pause" == this.mode && (this.homeBtn.inputEnabled = !0, this.replayBtn.inputEnabled = !0)) : (this.okBtn.inputEnabled = !1, "pause" == this.mode && (this.homeBtn.inputEnabled = !1, this.replayBtn.inputEnabled = !1))
		},
		appear: function() {
			if (!this.onGoing) {
				this.visible = this.isActive = this.onGoing = !0;
				this.buttonEnabled();
				this.moreBtnSetting();
				var b = curState().centerY - 0.5 * this.size.y;
				curState().greyBg.visible = !0;
				(new Tweener(curState().greyBg.scale)).to({
					x: 1
				}, 0.3).start();
				(new Tweener(this)).to({
					alpha: 1,
					y: b
				}, 0.3).onComplete(function() {
					this.onGoing = !1;
					"pause" == this.mode && (ig.Tweener.pause(), curState().resultBg.inputEnabled = !1)
				}.bind(this)).start();
				"pause" == this.mode && (ig.game.box2dPaused = !0, curState().gamePaused = !0)
			}
		},
		disappear: function() {
			if (!this.onGoing) {
				this.onGoing = !0;
				this.isActive = !1;
				this.startResume.dispatch();
				(new Tweener(curState().greyBg.scale)).to({
					x: 0
				}, 0.3).start();
				var b = 1.1 * -this.bg.size.y;
				(new Tweener(this)).to({
					alpha: 0,
					y: b
				}, 0.3).onComplete(function() {
					this.visible = this.onGoing = !1;
					curState().greyBg.visible = !1;
					"pause" == this.mode && (ig.game.box2dPaused = !1, curState().gamePaused = !1, ig.Tweener.resume());
					this.moreBtnSetting();
					this.onResume.dispatch()
				}.bind(this)).start()
			}
		},
		updateBgm: function() {
			if (this.isActive && this.isBgmClicked) {
				var b = ig.game.pointer.pos.x - this.gBgmBar.pos.x;
				0 > b && (b = 0);
				b > this.bgmBarBg.size.x && (b = this.bgmBarBg.size.x);
				b /= this.bgmBarBg.size.x;
				ig.soundHandler.bgmPlayer.volume(b);
				ig.game.sessionData.bgmVol = b;
				ig.game.save("bgmVol", b)
			}
		},
		updateSfx: function() {
			if (this.isActive && this.isSfxClicked) {
				var b = ig.game.pointer.pos.x - this.gSfxBar.pos.x;
				0 > b && (b = 0);
				b > this.sfxBarBg.size.x && (b = this.sfxBarBg.size.x);
				b /= this.sfxBarBg.size.x;
				ig.soundHandler.sfxPlayer.volume(b);
				ig.game.sessionData.sfxVol = b;
				ig.game.save("sfxVol", b)
			}
		},
		update: function() {
			this.parent();
			this.updateBgm();
			this.updateSfx();
			var b = ig.game.sessionData.bgmVol * this.bgmBarBg.size.x;
			1 > b && (b = 1);
			var c = ig.game.sessionData.sfxVol * this.sfxBarBg.size.x;
			1 > c && (c = 1);
			this.bgmSlider.x = b;
			this.sfxSlider.x = c;
			this.bgmBar.size.x = b;
			this.sfxBar.size.x = c
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.level-box").requires("game.entities.addon.group").defines(function() {
	EntityLevelBox = EntityGroup.extend({
		init: function(b, c, d) {
			this.parent(b, c, d)
		},
		create: function(b) {
			this.boxId = b;
			this.box = ig.game.addSprite(0, 0, "sprites", "small-box", {}, EntityClickBtn);
			this.box.anchor.setTo(0.5);
			this.box.onStartClick.add(function() {
				ig.game.disableBtns();
				this.tweenThis()
			}, this);
			this.box.onClick.add(this.clickLevel, this);
			this.add(this.box);
			this.gShowLevel = ig.game.addGroup();
			this.add(this.gShowLevel);
			this.gLock = ig.game.addGroup();
			this.add(this.gLock);
			this.showLevel = ig.game.addText(0, 0.18 * -this.box.size.y, this.boxId + 1 + "", 25, fonts.font1);
			this.showLevel.anchor.setTo(0.5);
			this.showLevel.fill = "white";
			this.gShowLevel.add(this.showLevel);
			this.stars = [];
			for (b = 0; 3 > b; b++) {
				var c = ig.game.addSprite(1, 0.18 * this.box.size.y, "sprites", "small-star");
				c.anchor.setTo(0.5);
				c.setAnimSize();
				c.addAnim("on", 0.1, [1], !0);
				this.gShowLevel.add(c);
				0 == b % 2 && (c.y = 0.18 * this.box.size.y + 0.25 * c.size.y, c.x = 0 == b ? 0.9 * -c.size.x : 0.9 * c.size.x);
				this.stars.push(c)
			}
			this.lock = ig.game.addSprite(0, 0, "sprites", "lock");
			this.lock.anchor.setTo(0.5);
			this.gLock.add(this.lock);
			this.checkLevel()
		},
		checkLevel: function() {
			this.showLevel.setText(this.boxId + 1);
			for (var b = 0; b < this.stars.length; b++) this.stars[b].playAnim("idle");
			if (this.boxId <= ig.game.sessionData.unlockedStage.length) {
				this.gLock.visible = !1;
				this.gShowLevel.visible = !0;
				this.box.inputEnabled = !0;
				for (var c = ig.game.sessionData.unlockedStage[this.boxId], b = 0; b < c; b++) this.stars[b].playAnim("on")
			} else this.gLock.visible = !0, this.gShowLevel.visible = !1, this.box.inputEnabled = !1
		},
		tweenThis: function() {
			this.onGoing = !0;
			var b = this.scale.x - 0.1,
				c = this.scale.y - 0.1;
			(new Tweener(this.scale)).to({
				x: b,
				y: c
			}, 0.1).easing(ig.Tweener.Easing.Bounce.EaseInOut).repeat(1).yoyo(!0).onComplete(function() {
				this.onGoing = !1
			}.bind(this)).start()
		},
		clickLevel: function(b) {
			ig.GameData.stage = this.boxId;
			b.changePage(LevelGamePlay)
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.level-select").requires("game.entities.addon.group").defines(function() {
	EntityLevelSelect = EntityGroup.extend({
		create: function() {
			this.levelPage = 0;
			this.gLevels = ig.game.addGroup(curState().centerX, 0);
			this.add(this.gLevels);
			this.titleBox = ig.game.addSprite(0, 0, "sprites", "box");
			this.titleBox.anchor.setTo(0.5);
			this.titleBox.y += 0.5 * this.titleBox.size.y;
			this.levelBox = ig.game.addSprite(0, 0, "sprites", "level-box");
			this.levelBox.anchor.setTo(0.5);
			this.levelBox.y = this.titleBox.y +
				0.5 * this.titleBox.size.y + 0.5 * this.levelBox.size.y - 0.25 * this.titleBox.size.y;
			this.gLevels.add(this.levelBox);
			this.gLevels.add(this.titleBox);
			this.levelTitle = ig.game.addText(this.titleBox.x, this.titleBox.y - 3, _STRINGS.Game.levelselect, 35, fonts.font1);
			this.levelTitle.anchor.setTo(0.5);
			this.levelTitle.fill = "white";
			this.gLevels.add(this.levelTitle);
			this.generateBoxes();
			this.levelPage = 0;
			this.tags = [];
			var b = ig.GameData.stages / this.boxes.length;
			0 < ig.GameData.stages % this.boxes.length && (b = parseInt(b) + 1);
			for (var c = 0; c < b; c++) {
				var d = ig.game.addSprite(0, 0, "sprites", "page-tag");
				d.anchor.setTo(0.5);
				d.addAnim("on", 0.1, [1], !0);
				d.inputEnabled = !0;
				d.idx = c;
				d.onClick.add(function(b) {
					!this.onGoing && this.levelPage != b.idx && (csound.sfxPlay("click2"), this.levelPage = b.idx, this.changeLevelPage())
				}, this);
				d.setAnimSize();
				d.x = -(0.6 * d.size.x) + 1.2 * c * d.size.x;
				d.y = this.levelBox.y + 0.5 * this.levelBox.size.y - 1.1 * d.size.y;
				this.gLevels.add(d);
				this.tags.push(d)
			}
			this.backBtn = ig.game.addSprite(0, curState().gh, "sprites", "buttons/back-btn", {}, EntityClickBtn);
			this.backBtn.x += 0.7 * this.backBtn.size.x;
			this.backBtn.y -= 0.7 * this.backBtn.size.y;
			this.backBtn.onClick.add(curState().mainmenuMode, curState());
			this.backBtn.onStartClick.add(function(b) {
				b.inputEnabled = !1
			}, this);
			this.add(this.backBtn);
			this.levelPage = parseInt(ig.game.sessionData.unlockedStage.length / this.boxes.length);
			0 == ig.game.sessionData.unlockedStage.length % this.boxes.length && 0 < ig.game.sessionData.unlockedStage.length && (this.levelPage -= 1)
		},
		generateBoxes: function() {
			this.boxes = [];
			for (var b = 0; 3 > b; b++)
				for (var c = 0; 4 > c; c++) {
					var d = ig.game.addGroup(0, 0, {}, EntityLevelBox);
					d.create(this.boxes.length);
					this.gLevels.add(d);
					d.x = -(1.65 * d.box.size.x) + 1.1 * c * d.box.size.x;
					d.y = this.levelBox.y - 0.3 * this.levelBox.size.y + 1.2 * b * d.box.size.y;
					this.boxes.push(d)
				}
			this.gLevels.y = curState().centerY - 0.6 * this.gLevels.size.y
		},
		prepareTween: function() {
			for (var b = 0; b < this.boxes.length; b++) {
				var c = this.boxes[b];
				c.setScale(0);
				c.box.inputEnabled = !1
			}
		},
		disableLevels: function() {
			for (var b = 0; b < this.boxes.length; b++) this.boxes[b].box.inputEnabled = !1
		},
		changeLevelPage: function() {
			this.onGoing = !0;
			for (var b = 0; b < this.tags.length; b++) this.tags[b].playAnim("idle");
			this.tags[this.levelPage].playAnim("on");
			this.prepareTween();
			for (b = 0; b < this.boxes.length; b++) {
				var c = b + this.boxes.length * this.levelPage,
					d = this.boxes[b];
				d.visible = !1;
				d.box.inputEnabled = !1;
				if (c < ig.GameData.stages) {
					d.visible = !0;
					d.boxId = c;
					d.checkLevel();
					d.box.inputEnabled = !1;
					var e = 0.1 * b,
						c = (new Tweener(d.scale)).to({
							x: 1,
							y: 1
						}, 0.05).onComplete(function() {
							this.checkLevel();
							if (this.boxId - curState().gHome.boxes.length * curState().gHome.levelPage == curState().gHome.boxes.length - 1 || this.boxId == ig.GameData.stages - 1) curState().gHome.onGoing = !1
						}.bind(d)),
						d = (new Tweener(d.scale)).to({
							x: 1.2,
							y: 1.2
						}, 0.05).onStart(function() {
							csound.sfxPlay("popup")
						}.bind(this)).delay(e);
					d._settings.chains = [c];
					d.start()
				}
			}
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.game-object").requires("game.entities.addon.sprite").defines(function() {
	EntityGameObject = EntitySprite.extend({
		objId: 1,
		prevPos: [],
		editorMode: !1,
		init: function(b, c, d) {
			this.parent(b, c, d);
			d && d.objId && (this.objId = this.objId)
		},
		setProperties: function(b, c) {
			c += this.objId;
			this.parent(b, c);
			5 == this.objId && (this.setAnimSize(), this.addAnim("idle", 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], !1), this.playAnim("idle"))
		},
		editorType: function() {
			this.inputEnabled = this.editorMode = !0;
			this.onClick = new ig.AddSignal(this);
			this.onClick.add(function() {
				5 == curState().modeId && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), curState().objActive = this)
			}, this)
		},
		playType: function() {
			this.inputEnabled = this.editorMode = !1;
			this.onClick = new ig.AddSignal(this)
		},
		editorUpdate: function() {
			if (5 == curState().modeId) {
				if (curState().objActive == this) {
					ig.input.pressed("up") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y -= 0.5);
					ig.input.pressed("down") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y += 0.5);
					ig.input.pressed("left") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x -= 0.5);
					ig.input.pressed("right") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x += 0.5);
					if (ig.input.pressed("next")) {
						var b = this.objId + 1;
						5 >= b && (this.objId++, b = this.spriteName.length - 1, b = this.spriteName.slice(0, b), this.setFrame(this.folderName, b))
					}
					ig.input.pressed("prev") && (b = this.objId - 1, 0 < b && (this.objId--, b = this.spriteName.length - 1, b = this.spriteName.slice(0, b), this.setFrame(this.folderName, b)));
					if (ig.input.state("ctrl") && ig.input.pressed("z")) {
						if (0 >= this.prevPos.length) return;
						b = this.prevPos[this.prevPos.length -
							1];
						this.prevPos.splice(this.prevPos.length - 1, 1);
						this.position.setTo(b.x, b.y)
					}
				}
				this.isClicked && (b = ig.game.pointer.pos, this.x = b.x, this.y = b.y)
			}
		},
		update: function() {
			this.parent();
			this.editorType && this.editorUpdate()
		},
		draw: function() {
			this.parent();
			if (this.editorMode && curState().objActive == this) {
				var b = this.getBounds();
				ig.game.geomDebug.rect(b, "red", 0.2)
			}
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.goal").requires("game.entities.addon.group").defines(function() {
	EntityGoal = EntityGroup.extend({
		editorMode: !1,
		prevPos: [],
		goalId: 0,
		init: function(b, c, d) {
			this.parent(b, c, d);
			d && d.goalId && (this.goalId = d.goalId);
			this.create()
		},
		create: function() {
			this.goalBase = ig.game.addSprite(0, 0, "sprites", "game/goal");
			this.goalBase.anchor.setTo(0.5);
			this.goalBase.setAnimSize();
			this.goalBase.addAnim(1, 0.1, [1], !0);
			this.goalBase.playAnim(this.goalId + "");
			this.add(this.goalBase);
			this.pole1 = ig.game.addSprite(0, 0, "sprites", "game/pole1", {}, EntityGoalPole);
			this.pole1.anchor.setTo(0.5);
			this.pole1.setAnimSize();
			var b = this.pole1["verticesPoints" + (this.goalId + 1)];
			this.pole1.vertices = b[0];
			this.pole1.alpha = 0;
			this.add(this.pole1);
			this.pole2 = ig.game.addSprite(0, 0, "sprites", "game/pole2", {}, EntityGoalPole);
			this.pole2.anchor.setTo(0.5);
			this.pole2.setAnimSize();
			this.pole2.alpha = 0;
			this.pole2.vertices = b[1];
			this.add(this.pole2)
		},
		editorType: function() {
			this.editorMode = !0;
			this.goalBase.inputEnabled = !0;
			this.goalBase.onClick.add(function() {
				3 == curState().modeId && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), curState().goalActive = this)
			}, this);
			this.pole1.editorType();
			this.pole2.editorType()
		},
		playType: function() {
			this.editorMode = !1;
			this.goalBase.inputEnabled = !1;
			this.goalBase.onClick = new ig.AddSignal(this);
			this.pole1.playType();
			this.pole2.playType()
		},
		editorUpdate: function() {
			if (3 == curState().modeId) {
				if (curState().goalActive == this) {
					ig.input.pressed("up") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y -= 0.5);
					ig.input.pressed("down") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y += 0.5);
					ig.input.pressed("left") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x -= 0.5);
					ig.input.pressed("right") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x += 0.5);
					if (ig.input.pressed("next")) {
						var b = this.goalId + 1;
						2 > b && (this.goalId++, this.changeType())
					}
					ig.input.pressed("prev") && (b = this.goalId - 1, 0 <= b && (this.goalId--, this.changeType()));
					if (ig.input.state("ctrl") && ig.input.pressed("z")) {
						if (0 >= this.prevPos.length) return;
						b = this.prevPos[this.prevPos.length - 1];
						this.prevPos.splice(this.prevPos.length -
							1, 1);
						this.position.setTo(b.x, b.y)
					}
				}
				this.goalBase.isClicked && (b = ig.game.pointer.pos, this.x = b.x, this.y = b.y)
			}
		},
		changeType: function() {
			this.goalBase.kill();
			this.pole1.kill();
			this.pole2.kill();
			this.create()
		},
		update: function() {
			this.parent();
			this.editorType && this.editorUpdate()
		},
		draw: function() {
			this.parent();
			if (this.editorMode && curState().goalActive == this) {
				var b = this.getBounds();
				ig.game.geomDebug.rect(b, "red", 0.2)
			}
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.float-star").requires("game.entities.addon.sprite").defines(function() {
	EntityFloatStar = EntitySprite.extend({
		checkAgainst: ig.Entity.TYPE.BOTH,
		editorType: !1,
		prevPos: [],
		isActive: !0,
		init: function(b, c, d) {
			this.parent(b, c, d)
		},
		check: function(b) {
			!this.editorMode && this.isActive && ("ball" == b.name && b.isActive) && (csound.sfxPlay("starget"), this.isActive = !1, this.tweenOut())
		},
		tweenOut: function() {
			for (var b = 0; b < curState().stars.length; b++) {
				var c = curState().stars[b];
				if (!c.isOn) {
					c.isOn = !0;
					c.playAnim("on");
					break
				}
			}
			b = (new Tweener(this.scale)).to({
				x: 0,
				y: 0
			}, 0.05).onComplete(function() {
				this.kill()
			}.bind(this));
			c = (new Tweener(this.scale)).to({
				x: 1.2,
				y: 1.2
			}, 0.05);
			c._settings.chains = [b];
			c.start()
		},
		editorType: function() {
			this.inputEnabled = this.editorMode = !0;
			this.onClick = new ig.AddSignal(this);
			this.onClick.add(function() {
				2 == curState().modeId && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), curState().starActive = this)
			}, this)
		},
		playType: function() {
			this.inputEnabled = this.editorMode = !1;
			this.onClick = new ig.AddSignal(this)
		},
		editorUpdate: function() {
			if (2 == curState().modeId) {
				if (curState().starActive == this && (ig.input.pressed("up") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y -= 0.5), ig.input.pressed("down") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y += 0.5), ig.input.pressed("left") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x -= 0.5), ig.input.pressed("right") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x += 0.5), ig.input.state("ctrl") && ig.input.pressed("z"))) {
					if (0 >= this.prevPos.length) return;
					var b = this.prevPos[this.prevPos.length -
						1];
					this.prevPos.splice(this.prevPos.length - 1, 1);
					this.position.setTo(b.x, b.y)
				}
				this.isClicked && (b = ig.game.pointer.pos, this.x = b.x, this.y = b.y)
			}
		},
		update: function() {
			this.parent();
			this.editorType && this.editorUpdate()
		},
		draw: function() {
			this.parent();
			if (this.editorMode && curState().starActive == this) {
				var b = this.getBounds();
				ig.game.geomDebug.rect(b, "red", 0.2)
			}
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.goal-board").requires("game.entities.addon.sprite").defines(function() {
	EntityGoalBoard = EntitySprite.extend({
		setProperties: function(b, c) {
			this.parent(b, c);
			this.create()
		},
		create: function() {
			this.goalTxt = ig.game.addText(0, -13, _STRINGS.Game.goal, 80, fonts.font1);
			this.goalTxt.anchor.setTo(0.5);
			this.goalTxt.fill = "white";
			this.goalTxt.setShadow(0, 5, "rgba(66, 164, 244, 1)");
			this.addChild(this.goalTxt);
			this.tweenIn()
		},
		tweenIn: function() {
			csound.sfxPlay("cheer");
			var b = (new Tweener(this)).to({
					scale: {
						x: 1,
						y: 1
					},
					angle: 0
				}, 0.15).onComplete(function() {
					curState().timeEvent.add(1, function() {
						(new Tweener(this)).to({
							alpha: 0
						}, 0.1).onComplete(function() {
							this.kill()
						}.bind(this)).start()
					}, this)
				}.bind(this)),
				c = (new Tweener(this)).to({
					scale: {
						x: 1.2,
						y: 1.2
					},
					angle: -15
				}, 0.15);
			c._settings.chains = [b];
			c.start()
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.confetti-generator").requires("impact.entity").defines(function() {
	EntityConfettiGenerator = ig.Entity.extend({
		size: {
			x: 20,
			y: 23
		},
		colour1: {
			r: 190,
			g: 67,
			b: 67
		},
		colour2: {
			r: 186,
			g: 205,
			b: 5
		},
		colour3: {
			r: 7,
			g: 106,
			b: 28
		},
		confettiArea: {
			x: 960,
			y: 540
		},
		particles: [],
		_MAXPARTICLES: 25,
		tilt: Math.floor(10 * Math.random()) - 10,
		tiltAngleIncremental: 0.07 * Math.random() + 0.05,
		tiltAngle: 0,
		angle: 0,
		TiltChangeCountdown: 5,
		exists: !0,
		isStop: !1,
		init: function(b, c, d) {
			this.parent(b, c, d);
			d._MAXPARTICLES && (this._MAXPARTICLES = d._MAXPARTICLES);
			d.isStop && (this.isStop = d.isStop);
			for (b = 0; b < this._MAXPARTICLES; b++) {
				this.randomColour = Math.floor(3 * Math.random() + 1);
				switch (this.randomColour) {
					case 1:
						this.colour = this.colour1;
						break;
					case 2:
						this.colour = this.colour2;
						break;
					case 3:
						this.colour = this.colour3
				}
				this.particles.push({
					x: Math.random() * this.confettiArea.x,
					y: Math.random() * -this.confettiArea.y,
					r: this.randomFromTo(5, 30),
					d: Math.random() * this._MAXPARTICLES + 10,
					color: "rgb(" + this.colour.r + "," + this.colour.g + "," + this.colour.b + ")",
					tilt: Math.floor(10 * Math.random()) - 10,
					tiltAngleIncremental: 0.07 * Math.random() + 0.05,
					tiltAngle: 0
				})
			}
		},
		kill: function() {
			this.exists = !1;
			this.parent()
		},
		update: function() {
			this.angle += 0.01;
			this.tiltAngle += 0.1;
			this.TiltChangeCountdown--;
			for (var b = 0, c = 0; c < this._MAXPARTICLES; c++) {
				var d = this.particles[c];
				d.x > this.confettiArea.x + this.size.x || d.x < -this.size.x || d.y > this.confettiArea.y + this.size.y ? this.isStop || (this.particles[c] = 0 < c % 5 || 0 == c % 2 ? {
					x: Math.random() * this.confettiArea.x,
					y: -10,
					r: d.r,
					d: d.d,
					color: d.color,
					tilt: Math.floor(10 * Math.random()) -
						10,
					tiltAngle: d.tiltAngle,
					tiltAngleIncremental: d.tiltAngleIncremental
				} : 0 < Math.sin(this.angle) ? {
					x: -5,
					y: Math.random() * this.confettiArea.y,
					r: d.r,
					d: d.d,
					color: d.color,
					tilt: Math.floor(10 * Math.random()) - 10,
					tiltAngleIncremental: d.tiltAngleIncremental
				} : {
					x: this.confettiArea.x + 5,
					y: Math.random() * this.confettiArea.y,
					r: d.r,
					d: d.d,
					color: d.color,
					tilt: Math.floor(10 * Math.random()) - 10,
					tiltAngleIncremental: d.tiltAngleIncremental
				}) : (b++, d.tiltAngle += d.tiltAngleIncremental, d.y += (Math.cos(this.angle + d.d) + 1 + d.r / 2) / 2, d.x += Math.sin(this.angle), d.tilt = 15 * Math.sin(d.tiltAngle - c / 3))
			}
			this.isStop && 0 == b && this.kill();
			this.parent()
		},
		draw: function() {
			var b = ig.system.context;
			b.save();
			for (var c = 0; c < this._MAXPARTICLES; c++) {
				var d = this.particles[c];
				b.beginPath();
				b.lineWidth = d.r / 2;
				b.strokeStyle = d.color;
				b.moveTo(d.x + d.tilt + d.r / 4, d.y);
				b.lineTo(d.x + d.tilt, d.y + d.tilt + d.r / 4);
				b.stroke()
			}
			b.restore();
			this.parent()
		},
		randomFromTo: function(b, c) {
			return Math.floor(Math.random() * (c - b + 1) + b)
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.result").requires("game.entities.addon.group").defines(function() {
	EntityResult = EntityGroup.extend({
		create: function() {
			this.titleBoard = ig.game.addSprite(0, 0, "sprites", "box");
			this.titleBoard.anchor.setTo(0.5);
			this.titleBoard.y += 0.5 * this.titleBoard.size.y;
			this.bg = ig.game.addSprite(0, this.titleBoard.y, "sprites", "result-box");
			this.bg.anchor.setTo(0.5);
			this.bg.setScale(1, 1.2);
			this.bg.y += 0.5 * this.bg.size.y;
			this.add(this.bg);
			this.add(this.titleBoard);
			this.showTitle = ig.game.addText(0, this.titleBoard.y - 3, _STRINGS.Game.levelcomplete, 35, fonts.font1);
			this.showTitle.anchor.setTo(0.5);
			this.showTitle.fill = "white";
			this.add(this.showTitle);
			this.gTexts = ig.game.addGroup(0, 0);
			this.add(this.gTexts);
			this.starTxt = ig.game.addText(0, 0, _STRINGS.Game.stars, 25, fonts.font1);
			this.starTxt.anchor.setTo(0, 0.5);
			this.starTxt.y += 0.5 * this.starTxt.size.y;
			this.starTxt.fill = "white";
			this.gTexts.add(this.starTxt);
			this.starScoreTxt = ig.game.addText(0, this.starTxt.y + 0.5 * this.starTxt.size.y, _STRINGS.Game.score, 20, fonts.font1);
			this.starScoreTxt.anchor.setTo(0, 0.5);
			this.starScoreTxt.fill = "white";
			this.starScoreTxt.y += 0.6 * this.starScoreTxt.size.y;
			this.gTexts.add(this.starScoreTxt);
			this.timeTxt = ig.game.addText(0, this.starScoreTxt.y + 0.5 * this.starScoreTxt.size.y, _STRINGS.Game.timebonus, this.starTxt.fontSize, fonts.font1);
			this.timeTxt.anchor.setTo(0, 0.5);
			this.timeTxt.fill = this.starTxt.fill;
			this.timeTxt.y += 1 * this.timeTxt.size.y;
			this.gTexts.add(this.timeTxt);
			this.timeScoreTxt = ig.game.addText(0, this.timeTxt.y + 0.5 * this.timeTxt.size.y, _STRINGS.Game.score, this.starScoreTxt.fontSize, fonts.font1);
			this.timeScoreTxt.anchor.setTo(0, 0.5);
			this.timeScoreTxt.fill = this.starScoreTxt.fill;
			this.timeScoreTxt.y += 0.6 * this.timeScoreTxt.size.y;
			this.gTexts.add(this.timeScoreTxt);
			this.gTexts.x = this.bg.x - 0.4 * this.bg.size.x;
			this.gTexts.y = this.bg.y - 0.35 * this.bg.size.y;
			this.gStars = ig.game.addGroup(0, 0);
			this.add(this.gStars);
			this.stars = [];
			for (var b = 0; 3 > b; b++) {
				var c = ig.game.addSprite(0, 0, "sprites", "star-indicator");
				c.anchor.setTo(0.5);
				c.setAnimSize();
				c.addAnim("on", 0.1, [1], !0);
				c.setScale(0.75);
				this.gStars.add(c);
				c.x = 0.5 * -c.size.x - 1.2 * c.size.x * b;
				c.y = this.starTxt.y;
				this.stars.push(c)
			}
			this.showStarScore = ig.game.addText(0, this.starScoreTxt.y, "0", this.starScoreTxt.fontSize, fonts.font1);
			this.showStarScore.anchor.setTo(1, 0.5);
			this.showStarScore.fill = this.starScoreTxt.fill;
			this.gStars.add(this.showStarScore);
			this.timeStars = [];
			for (b = 0; 3 > b; b++) c = ig.game.addSprite(0, 0, "sprites", "star-indicator"), c.anchor.setTo(0.5), c.setAnimSize(), c.addAnim("on", 0.1, [1], !0), c.setScale(0.75), this.gStars.add(c), c.x = 0.5 * -c.size.x - 1.2 * c.size.x * b, c.y = this.timeTxt.y, this.timeStars.push(c);
			this.showTimeScore = ig.game.addText(0, this.timeScoreTxt.y, "0", this.timeScoreTxt.fontSize, fonts.font1);
			this.showTimeScore.anchor.setTo(1, 0.5);
			this.showTimeScore.fill = this.timeScoreTxt.fill;
			this.gStars.add(this.showTimeScore);
			this.gStars.x = this.bg.x + 0.4 * this.bg.size.x;
			this.gStars.y = this.gTexts.y;
			this.allStars = [];
			for (b = 0; 3 > b; b++) c = ig.game.addSprite(0, 0, "sprites", "star-result"), c.anchor.setTo(0.5), c.setAnimSize(), c.addAnim("on", 0.1, [1], !0), c.setScale(0.75), this.add(c), c.y = this.gTexts.y + 1.4 * this.gTexts.size.y, c.x = this.bg.x - 1.4 * c.size.x + 1.4 * b * c.size.x, this.allStars.push(c);
			this.scoreBox = ig.game.addSprite(0, this.allStars[0].y + 0.5 * this.allStars[0].size.y, "sprites", "score-box");
			this.scoreBox.anchor.setTo(0.5);
			this.scoreBox.y += 1 * this.scoreBox.size.y;
			this.add(this.scoreBox);
			b = _t(_STRINGS.Game.total, "0");
			this.scoreTxt = ig.game.addText(this.scoreBox.x, this.scoreBox.y - 3, b, 22, fonts.font1);
			this.scoreTxt.anchor.setTo(0.5);
			this.scoreTxt.fill = "white";
			this.add(this.scoreTxt);
			this.showHighScoreTxt = ig.game.addText(this.bg.x, this.scoreBox.y + 0.5 * this.scoreBox.size.y, "", this.scoreTxt.fontSize, fonts.font1);
			this.showHighScoreTxt.anchor.setTo(0.5);
			this.showHighScoreTxt.y += 0.7 * this.showHighScoreTxt.size.y;
			this.showHighScoreTxt.fill = "#802a3a";
			this.add(this.showHighScoreTxt);
			this.playBtn = ig.game.addSprite(0, this.bg.y + 0.45 * this.bg.size.y, "sprites", "buttons/play-btn", {}, EntityClickBtn);
			this.playBtn.setScale(0.8);
			this.playBtn.onStartClick.add(function() {
				ig.game.disableBtns()
			}, this);
			this.playBtn.onClick.add(this.nextLevel, this);
			this.add(this.playBtn);
			this.homeBtn = ig.game.addSprite(this.playBtn.x - 1.3 * this.playBtn.size.x, this.bg.y + 0.5 * this.bg.size.y, "sprites", "buttons/home", {}, EntityClickBtn);
			this.homeBtn.onStartClick.add(ig.game.disableBtns, ig.game);
			this.homeBtn.onClick.add(function(b) {
				b.changePage(LevelMainmenu)
			}, this);
			this.add(this.homeBtn);
			this.replayBtn = ig.game.addSprite(this.playBtn.x + 1.3 * this.playBtn.size.x, this.homeBtn.y, "sprites", "buttons/replay-btn", {}, EntityClickBtn);
			this.replayBtn.onStartClick.add(ig.game.disableBtns, ig.game);
			this.replayBtn.onClick.add(function(b) {
				b.changePage(ig.game.director.currentLevel)
			}, this);
			this.add(this.replayBtn);
			curState().resultBg.onClick.add(function() {
				this.onGoing && (this.onGoing = !1, curState().resultBg.inputEnabled = !1, this.openAllStars())
			}, this);
			this.y = -(1.2 * this.size.y)
		},
		nextLevel: function(b) {
			var c = curState().levelNow + 1;
			c < ig.GameData.stages ? (ig.GameData.stage = c, b.changePage(LevelGamePlay)) : b.changePage(LevelMainmenu)
		},
		checkFloatStars: function() {
			for (var b = 0, c = 0; c < curState().stars.length; c++) curState().stars[c].isOn && b++;
			return b
		},
		checkTimeStars: function() {
			var b = 0,
				b = ig.game.countSec(curState().timeNow),
				c = ig.GameData.timeLimits[curState().levelNow];
			return b = b <= c[0] ? 3 : b > c[0] && b <= c[1] ? 2 : 1
		},
		checkDatas: function() {
			var b = this.checkFloatStars(),
				c = this.checkTimeStars(),
				d = b * ig.GameData.starScore + c * ig.GameData.timeScore,
				b = parseInt((b + c) / 2);
			if (curState().levelNow == ig.game.sessionData.unlockedStage.length) {
				ig.game.sessionData.unlockedStage[curState().levelNow] = b;
				ig.game.sessionData.highScore[curState().levelNow] = d;
				this.showHighScoreTxt.setText(_STRINGS.Game.newhighscore);
				var d = ig.game.sessionData.highScore,
					c = 0,
					e;
				for (e in d) d.hasOwnProperty(e) && (b = d[e], c += null !== b ? b : 0, ig.game.sessionData.totalScores = c);
				ig.game.saveLaggedHighscore("beeach_scoccr_gmihhrd", ig.game.sessionData.totalScores)
			} else b > ig.game.sessionData.unlockedStage[curState().levelNow] && (ig.game.sessionData.unlockedStage[curState().levelNow] = b), d > ig.game.sessionData.highScore[curState().levelNow] ? (ig.game.sessionData.highScore[curState().levelNow] = d, this.showHighScoreTxt.setText(_STRINGS.Game.newhighscore)) : (d = ig.game.sessionData.highScore[curState().levelNow], d = _t(_STRINGS.Game.highscore, d), this.showHighScoreTxt.setText(d));
			ig.game.save("unlockedStage", ig.game.sessionData.unlockedStage);
			ig.game.save("highScore", ig.game.sessionData.highScore);
			this.tweenFloatStars();
			if (adcnt > 85) {
				ig.game.fnShowLaggedAd("beach-soccer", "beach-soccer-game.jpg");
				adcnt = -45;
			}
			d = ig.game.sessionData.unlockedStage;
			c = 0;
			for (e in d) d.hasOwnProperty(e) && (b = d[e], c += null !== b ? b : 0, ig.game.sessionData.totalStar = c);
			console.log(ig.game.sessionData.totalStar);
			e = ig.game.sessionData.awardID;
			d = ig.game.sessionData.totalStar;
			if ("beach_scoccr_gmi001" != e && 5 == d || "beach_scoccr_gmi001" != e && 5 < d && 10 > d) e = "beach_scoccr_gmi001", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e);
			if ("beach_scoccr_gmi002" != e && 10 == d || "beach_scoccr_gmi002" != e && 10 < d && 15 > d) e = "beach_scoccr_gmi002", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e);
			if ("beach_scoccr_gmi003" != e && 15 == d || "beach_scoccr_gmi003" != e && 15 < d && 20 > d) e = "beach_scoccr_gmi003", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e);
			if ("beach_scoccr_gmi004" != e && 20 == d || "beach_scoccr_gmi004" != e && 20 < d && 30 > d) e = "beach_scoccr_gmi004", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e);
			if ("beach_scoccr_gmi005" != e && 30 == d || "beach_scoccr_gmi005" != e && 30 < d && 40 > d) e = "beach_scoccr_gmi005", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e);
			if ("beach_scoccr_gmi006" != e && 40 == d || "beach_scoccr_gmi006" != e && 40 < d && 50 > d) e = "beach_scoccr_gmi006", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e);
			if ("beach_scoccr_gmi007" != e && 50 == d || "beach_scoccr_gmi007" != e && 50 < d && 60 > d) e = "beach_scoccr_gmi007", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e);
			if ("beach_scoccr_gmi008" != e && 60 == d || "beach_scoccr_gmi008" != e && 60 < d) e = "beach_scoccr_gmi008", ig.game.sessionData.awardID = e, ig.game.saveLaggedAward(e)
		},
		tweenFloatStars: function() {
			for (var b = this.checkFloatStars(), c = 0; c < b; c++) {
				var d = this.stars[this.stars.length - (c + 1)];
				c == b -
					1 && (d.isLast = !0);
				var e = 0.2 * c,
					f = (c + 1) * ig.GameData.starScore,
					g = this.showStarScore,
					m = function(b) {
						b.isLast && this.tweenTimeStars()
					}.bind(this);
				this.tweenStar(d, 0.1, e, f, g, m)
			}
		},
		tweenTimeStars: function() {
			for (var b = this.checkTimeStars(), c = 0; c < b; c++) {
				var d = this.timeStars[this.timeStars.length - (c + 1)];
				c == b - 1 && (d.isLast = !0);
				var e = 0.2 * c,
					f = (c + 1) * ig.GameData.timeScore,
					g = this.showTimeScore,
					m = function(b) {
						b.isLast && this.tweenTotStars()
					}.bind(this);
				this.tweenStar(d, 0.1, e, f, g, m)
			}
		},
		tweenTotStars: function() {
			for (var b = this.checkFloatStars(), c = this.checkTimeStars(), d = b * ig.GameData.starScore + c * ig.GameData.timeScore, b = parseInt((b + c) / 2), c = 0; c < b; c++) {
				var e = this.allStars[c];
				c == b - 1 && (e.isLast = !0);
				var f = 0.2 * c,
					g = parseInt(d / b);
				c == b - 1 && (g = d);
				var g = _t(_STRINGS.Game.total, g),
					m = this.scoreTxt,
					l = function(b) {
						b.isLast && (this.onGoing = !1, curState().resultBg.inputEnabled = !1)
					}.bind(this);
				this.tweenStar(e, 0.1, f, g, m, l)
			}
		},
		openAllStars: function() {
			for (var b = this.checkFloatStars(), c = this.checkTimeStars(), d = b * ig.GameData.starScore, e = c * ig.GameData.timeScore, f = d +
					e, g = parseInt((b + c) / 2), m = 0; m < b; m++) {
				var l = this.stars.length - (m + 1),
					l = this.stars[l];
				l.playAnim("on")
			}
			this.showStarScore.setText(d);
			for (m = 0; m < c; m++) l = this.timeStars.length - (m + 1), l = this.timeStars[l], l.playAnim("on");
			this.showTimeScore.setText(e);
			for (m = 0; m < g; m++) l = this.allStars[m], l.playAnim("on");
			b = _t(_STRINGS.Game.total, f);
			this.scoreTxt.setText(b)
		},
		tweenIn: function() {
			this.onGoing = curState().resultBg.inputEnabled = !0;
			curState().greyBg.visible = !0;
			(new Tweener(curState().greyBg.scale)).to({
				x: 1
			}, 0.3).start();
			var b = curState().centerY - 0.5 * this.size.y;
			(new Tweener(this)).to({
				y: b
			}, 0.3).onComplete(function() {
				this.checkDatas()
			}.bind(this)).start()
		},
		tweenStar: function(b, c, d, e, f, g) {
			if (this.onGoing) {
				var m = b.scale.x,
					l = b.scale.x + 0.2,
					m = (new Tweener(b.scale)).to({
						x: m,
						y: m
					}, c);
				c = (new Tweener(b.scale)).to({
					x: l,
					y: l
				}, c).onComplete(function() {
					b.playAnim("on");
					g(b)
				}.bind(this)).onStart(function() {
					csound.sfxPlay("popup");
					f.setText(e)
				}.bind(this)).delay(d);
				c._settings.chains = [m];
				c.start()
			}
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.tutorial").requires("game.entities.addon.group").defines(function() {
	EntityTutorial = EntityGroup.extend({
		isReady: !1,
		init: function(b, c, d) {
			this.parent(b, c, d);
			b = 1;
			d && d.tutorId && (b = d.tutorId);
			this.tutorId = b;
			this.create(b)
		},
		create: function(b) {
			this.gDescBox = ig.game.addGroup();
			this.add(this.gDescBox);
			this.bg = ig.game.addSprite(0, 0, "sprites", "game/tutor-box");
			this.bg.anchor.setTo(0.5);
			this.gDescBox.add(this.bg);
			this.desc = ig.game.addText(this.bg.x, this.bg.y - 3, _STRINGS.Game["tutor" +
				b], 18, fonts.font1);
			this.desc.anchor.setTo(0.5);
			this.desc.align = "center";
			this.desc.fill = "white";
			this.desc.wordWrap = !0;
			this.desc.wordWrapWidth = 0.8 * this.bg.size.x;
			this.gDescBox.add(this.desc);
			this.hand = ig.game.addSprite(0, 0, "sprites", "game/finger");
			this.hand.anchor.setTo(0.5);
			this.add(this.hand);
			this.tutorData()
		},
		tutorData: function() {
			if (1 == this.tutorId) {
				this.gDescBox.x = ig.game.centerX;
				this.gDescBox.y = 0.3 * ig.game.gh;
				var b = curState().balls[0];
				this.hand.setScale(0.5);
				this.hand.x = b.x + 0.5 * this.hand.size.x;
				this.hand.y = b.y + 0.5 * this.hand.size.y;
				var c = ig.GameData.routeTutor[0];
				b.setDirection(c.x, c.y);
				this.points = [];
				this.animTimes = [];
				for (c = 0; c < b.points.length; c++) this.points.push(b.points[c]), this.animTimes.push({
					start: 0,
					maxTime: 1,
					timer: null,
					show: !0
				})
			} else if (2 == this.tutorId) {
				this.gDescBox.x = ig.game.centerX;
				this.gDescBox.y = 0.36 * ig.game.gh;
				b = null;
				for (c = 0; c < curState().balls.length; c++) {
					var d = curState().balls[c];
					3 == d.ballType && (b = d)
				}
				this.hand.setScale(0.5);
				this.hand.x = b.x + 1.5 * this.hand.size.x;
				this.hand.y = b.y;
				this.hand.angle = -35
			} else if (3 == this.tutorId || 4 == this.tutorId) this.gDescBox.x = ig.game.centerX, this.gDescBox.y = 0.3 * ig.game.gh, this.hand.kill();
			else if (5 == this.tutorId) {
				this.gDescBox.x = ig.game.centerX;
				this.gDescBox.y = 0.42 * ig.game.gh;
				b = null;
				for (c = 0; c < curState().balls.length; c++) d = curState().balls[c], 2 == d.ballType && (b = d);
				this.hand.setScale(0.5);
				this.hand.x = b.x + 1.5 * this.hand.size.x;
				this.hand.y = b.y;
				this.hand.angle = -35
			}
		},
		animateHand: function() {
			if (1 == this.tutorId) {
				var b = this.hand.scale.x + 0.1;
				(new Tweener(this.hand.scale)).to({
					x: b,
					y: b
				}, 0.3).repeat(-1).yoyo(!0).start()
			} else if (2 == this.tutorId || 5 == this.tutorId) b = this.hand.x + 10, (new Tweener(this.hand)).to({
				x: b
			}, 0.3).repeat(-1).yoyo(!0).start()
		},
		checkAfterTutor: function() {
			if (1 == this.tutorId) {
				var b = curState().balls[0];
				this.hand.exists ? (b.isClicked || ig.input.state("click")) && this.hand.kill() : (this.isReady = !1, this.kill())
			} else 1 < this.tutorId && this.kill()
		},
		update: function() {
			this.parent();
			!ig.game.transition.isClosed && !this.isReady && (this.isReady = !0, this.animateHand());
			if (ig.input.pressed("click") && (this.checkAfterTutor(), this.points))
				for (var b = 0; b < this.points.length; b++) {
					var c = this.animTimes[b];
					null == c.timer && (c.timer = new ig.Timer, c.start = c.maxTime)
				}
			ig.input.released("click") && this.checkAfterTutor()
		},
		draw: function() {
			this.parent();
			if (this.points && curState().balls[0].isClicked)
				for (var b = 0; b < this.points.length; b++) {
					var c = this.animTimes[b];
					if (c.show) {
						var d = this.points[b],
							d = ig.game.geom.circle(d.x / Box2D.SCALE, d.y / Box2D.SCALE, 10);
						ig.game.geomDebug.circle(d, "red", 0.8);
						c.start -= c.timer.tick();
						0 >= c.start && (c.show = !1)
					} else c.start += c.timer.tick(), c.start >= c.maxTime && (c.show = !0)
				}
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.game-data").defines(function() {
	ig.GameData = {
		stages: 20,
		stage: 0,
		shotChance: 3,
		starScore: 250,
		timeScore: 250,
		groundDatas: [
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 3
			}, {
				x: 251.95020746887968,
				y: 490.45435684647305,
				groundType: 4
			}, {
				x: 351.5228215767635,
				y: 490.4751037344398,
				groundType: 3
			}, {
				x: 451.6161825726141,
				y: 490.4585062240664,
				groundType: 4
			}, {
				x: 551.6929460580913,
				y: 490.4626556016598,
				groundType: 4
			}, {
				x: 651.7863070539419,
				y: 490.4626556016598,
				groundType: 3
			}, {
				x: 751.8589211618257,
				y: 490.46680497925314,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}],
			[{
				x: 55.52836484983315,
				y: 490.14460511679647,
				groundType: 1
			}, {
				x: 155.90656284760846,
				y: 490.64460511679647,
				groundType: 3
			}, {
				x: 254.71690767519468,
				y: 490.64460511679647,
				groundType: 4
			}, {
				x: 354.9593993325918,
				y: 490.14460511679647,
				groundType: 3
			}, {
				x: 454.9733036707453,
				y: 490.64460511679647,
				groundType: 4
			}, {
				x: 554.7836484983316,
				y: 490.14460511679647,
				groundType: 4
			}, {
				x: 654.9582869855395,
				y: 490.0767519466074,
				groundType: 4
			}, {
				x: 753.5400444938821,
				y: 490.64460511679647,
				groundType: 3
			}, {
				x: 852.1468298109011,
				y: 490.14460511679647,
				groundType: 3
			}, {
				x: 951.0250278086763,
				y: 490.0767519466074,
				groundType: 6
			}, {
				x: 406.85205784204675,
				y: 390.26640711902115,
				groundType: 1
			}, {
				x: 506.73025583982206,
				y: 390.26640711902115,
				groundType: 3
			}, {
				x: 605.9727474972192,
				y: 390.19855394883206,
				groundType: 6
			}],
			[{
				x: 50.10243407707911,
				y: 489.80223123732253,
				groundType: 15
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 4
			}, {
				x: 251.95020746887968,
				y: 490.45435684647305,
				groundType: 4
			}, {
				x: 351.5228215767635,
				y: 490.4751037344398,
				groundType: 3
			}, {
				x: 451.6161825726141,
				y: 490.4585062240664,
				groundType: 4
			}, {
				x: 551.6929460580913,
				y: 490.4626556016598,
				groundType: 4
			}, {
				x: 651.7863070539419,
				y: 490.4626556016598,
				groundType: 3
			}, {
				x: 751.8589211618257,
				y: 490.46680497925314,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}, {
				x: 51.10243407707911,
				y: 389.0709939148073,
				groundType: 13
			}, {
				x: 421.80200222469415,
				y: 390.19855394883206,
				groundType: 1
			}, {
				x: 521.8159065628477,
				y: 390.26640711902115,
				groundType: 6
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 150.85684647302904,
				y: 490.46680497925314,
				groundType: 6
			}, {
				x: 451.6161825726141,
				y: 490.4585062240664,
				groundType: 2
			}, {
				x: 551.6929460580913,
				y: 490.4626556016598,
				groundType: 5
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 2
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 3
			}, {
				x: 296.86318131256957,
				y: 194.34927697441603,
				groundType: 4
			}, {
				x: 396.60567296996663,
				y: 194.28142380422693,
				groundType: 3
			}, {
				x: 496.68743047830924,
				y: 194.34927697441603,
				groundType: 4
			}, {
				x: 596.4299221357064,
				y: 194.34927697441603,
				groundType: 4
			}, {
				x: 457.0411568409344,
				y: 489.0767519466074,
				groundType: 3
			}, {
				x: 556.3515016685207,
				y: 489.14460511679647,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 8
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 3
			}, {
				x: 251.95020746887968,
				y: 490.45435684647305,
				groundType: 4
			}, {
				x: 351.5228215767635,
				y: 490.4751037344398,
				groundType: 3
			}, {
				x: 451.6161825726141,
				y: 490.4585062240664,
				groundType: 4
			}, {
				x: 551.6929460580913,
				y: 490.4626556016598,
				groundType: 4
			}, {
				x: 651.7863070539419,
				y: 490.4626556016598,
				groundType: 3
			}, {
				x: 751.8589211618257,
				y: 490.46680497925314,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}, {
				x: 50.6288032454361,
				y: 390.0050709939148,
				groundType: 7
			}, {
				x: 50.57606490872211,
				y: 290.6947261663286,
				groundType: 6
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 156.72819472616632,
				y: 232.6713995943205,
				groundType: 3
			}, {
				x: 251.95020746887968,
				y: 490.45435684647305,
				groundType: 4
			}, {
				x: 351.5228215767635,
				y: 490.4751037344398,
				groundType: 3
			}, {
				x: 56.944219066937116,
				y: 188.8843813387424,
				groundType: 4
			}, {
				x: 551.6929460580913,
				y: 490.4626556016598,
				groundType: 4
			}, {
				x: 651.7863070539419,
				y: 490.4626556016598,
				groundType: 3
			}, {
				x: 751.8589211618257,
				y: 490.46680497925314,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}, {
				x: 151.43914807302232,
				y: 490.262677484787,
				groundType: 3
			}, {
				x: 451.2647058823529,
				y: 490.23630831643004,
				groundType: 3
			}, {
				x: 964.9285714285714,
				y: 242.223420551845,
				groundType: 1
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 3
			}, {
				x: 253.08120133481648,
				y: 339.5773081201335,
				groundType: 4
			}, {
				x: 429.2769744160178,
				y: 225.2491657397108,
				groundType: 3
			}, {
				x: 529.587319243604,
				y: 225.1813125695217,
				groundType: 4
			}, {
				x: 687.6974416017798,
				y: 328.3309232480534,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 212.36707452725253,
				y: 489.64460511679647,
				groundType: 10
			}, {
				x: 312.2452725250278,
				y: 489.71245828698557,
				groundType: 11
			}, {
				x: 412.12347052280313,
				y: 489.5767519466074,
				groundType: 8
			}, {
				x: 512.0016685205785,
				y: 489.0088987764183,
				groundType: 2
			}, {
				x: 612.9477196885429,
				y: 489.0088987764183,
				groundType: 5
			}, {
				x: 580.979977753059,
				y: 260.9883203559511,
				groundType: 11
			}, {
				x: 810.4327030033371,
				y: 489.64460511679647,
				groundType: 8
			}, {
				x: 909.5,
				y: 489.5767519466074,
				groundType: 8
			}, {
				x: 480.33036707452726,
				y: 260.5561735261402,
				groundType: 10
			}, {
				x: 811.0684093437153,
				y: 390.40211345939935,
				groundType: 14
			}, {
				x: 909.5,
				y: 290.25250278086764,
				groundType: 14
			}, {
				x: 908.5,
				y: 390.19855394883206,
				groundType: 16
			}, {
				x: 481.7374860956619,
				y: 160.11012235817577,
				groundType: 9
			}, {
				x: 481.53392658509455,
				y: 60.299777530589544,
				groundType: 1
			}, {
				x: 56.66407119021135,
				y: 227.4527252502781,
				groundType: 1
			}, {
				x: 214.25152129817445,
				y: 389.4655172413793,
				groundType: 14
			}],
			[{
				x: 56.09621802002225,
				y: 277.6418242491658,
				groundType: 1
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 3
			}, {
				x: 251.95020746887968,
				y: 490.45435684647305,
				groundType: 4
			}, {
				x: 451.6161825726141,
				y: 490.4585062240664,
				groundType: 4
			}, {
				x: 551.6929460580913,
				y: 490.4626556016598,
				groundType: 4
			}, {
				x: 651.7863070539419,
				y: 490.4626556016598,
				groundType: 3
			}, {
				x: 751.8589211618257,
				y: 490.46680497925314,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}],
			[{
				x: 638.5761957730813,
				y: 282.98109010011126,
				groundType: 1
			}, {
				x: 329.9666295884316,
				y: 489.0767519466074,
				groundType: 2
			}, {
				x: 56.59621802002225,
				y: 227.4527252502781,
				groundType: 5
			}, {
				x: 766.2864293659622,
				y: 195.34927697441603,
				groundType: 3
			}, {
				x: 335.3058954393771,
				y: 289.38820912124584,
				groundType: 14
			}, {
				x: 183.67074527252504,
				y: 366.273637374861,
				groundType: 13
			}, {
				x: 428.7769744160178,
				y: 489.0088987764183,
				groundType: 4
			}, {
				x: 908.7430478309233,
				y: 490.64460511679647,
				groundType: 9
			}, {
				x: 909.8448275862069,
				y: 389.0709939148073,
				groundType: 14
			}, {
				x: 751.7686318131257,
				y: 490.0088987764183,
				groundType: 1
			}, {
				x: 528.7908787541713,
				y: 489.0767519466074,
				groundType: 5
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 3
			}, {
				x: 251.95020746887968,
				y: 490.45435684647305,
				groundType: 4
			}, {
				x: 582.9370078740158,
				y: 491.6299212598425,
				groundType: 7
			}, {
				x: 481,
				y: 490.68503937007875,
				groundType: 8
			}, {
				x: 482.8346456692913,
				y: 390.4724409448819,
				groundType: 3
			}, {
				x: 910.4763779527559,
				y: 225.59055118110237,
				groundType: 4
			}, {
				x: 581.9370078740158,
				y: 390.5275590551181,
				groundType: 13
			}, {
				x: 932.988188976378,
				y: 489.18503937007875,
				groundType: 13
			}, {
				x: 732.2834645669291,
				y: 488.79527559055117,
				groundType: 1
			}, {
				x: 833.3858267716536,
				y: 488.79527559055117,
				groundType: 3
			}, {
				x: 51.968503937007874,
				y: 140.07874015748033,
				groundType: 13
			}, {
				x: 230.5511811023622,
				y: 229.84251968503938,
				groundType: 14
			}, {
				x: 51.968503937007874,
				y: 344.64566929133855,
				groundType: 13
			}],
			[{
				x: 54.803149606299215,
				y: 257.7165354330709,
				groundType: 1
			}, {
				x: 155.90551181102362,
				y: 257.2716535433071,
				groundType: 3
			}, {
				x: 255.67322834645665,
				y: 257.7165354330709,
				groundType: 4
			}, {
				x: 355.7204724409449,
				y: 257.2716535433071,
				groundType: 3
			}, {
				x: 455.93307086614175,
				y: 257.16141732283467,
				groundType: 16
			}, {
				x: 555.5354330708661,
				y: 256.7165354330709,
				groundType: 8
			}, {
				x: 651.7863070539419,
				y: 490.4626556016598,
				groundType: 3
			}, {
				x: 751.8589211618257,
				y: 490.46680497925314,
				groundType: 4
			}, {
				x: 851.948132780083,
				y: 490.4585062240664,
				groundType: 3
			}, {
				x: 950.5248962655602,
				y: 490.4792531120332,
				groundType: 6
			}, {
				x: 456.2647058823529,
				y: 157.0050709939148,
				groundType: 14
			}, {
				x: 555.5354330708661,
				y: 157.2244094488189,
				groundType: 3
			}, {
				x: 478,
				y: 489.65748031496065,
				groundType: 5
			}, {
				x: 377.00787401574803,
				y: 489.26771653543307,
				groundType: 1
			}, {
				x: 56.19291338582677,
				y: 390.3897637795275,
				groundType: 13
			}, {
				x: 207.54330708661416,
				y: 490.15748031496065,
				groundType: 1
			}, {
				x: 56.35826771653543,
				y: 489.65748031496065,
				groundType: 7
			}],
			[{
				x: 50.50000000000001,
				y: 489.5,
				groundType: 1
			}, {
				x: 151.85684647302904,
				y: 490.46680497925314,
				groundType: 3
			}, {
				x: 334.48818897637796,
				y: 489.0472440944882,
				groundType: 3
			}, {
				x: 184.251968503937,
				y: 237.8740157480315,
				groundType: 4
			}, {
				x: 591.496062992126,
				y: 488.26771653543307,
				groundType: 3
			}, {
				x: 791.8110236220473,
				y: 234.09448818897638,
				groundType: 4
			}, {
				x: 752.5638945233266,
				y: 489.8286004056795,
				groundType: 16
			}, {
				x: 909.5314960629921,
				y: 489.21259842519686,
				groundType: 6
			}, {
				x: 625.511811023622,
				y: 235.98425196850394,
				groundType: 13
			}, {
				x: 753.5375253549696,
				y: 389.0709939148073,
				groundType: 14
			}, {
				x: 652.3590263691683,
				y: 488.7758620689655,
				groundType: 3
			}],
			[{
				x: 54.803149606299215,
				y: 184.96062992125985,
				groundType: 1
			}, {
				x: 154.01574803149606,
				y: 184.01574803149606,
				groundType: 13
			}, {
				x: 414.4133858267717,
				y: 318.244094488189,
				groundType: 14
			}, {
				x: 514.0157480314961,
				y: 317.244094488189,
				groundType: 3
			}, {
				x: 566.0393700787401,
				y: 575.2874015748032,
				groundType: 4
			}, {
				x: 727.5590551181102,
				y: 429.68503937007875,
				groundType: 14
			}, {
				x: 453.93700787401576,
				y: 575.0629921259842,
				groundType: 1
			}, {
				x: 289.4724409448819,
				y: 533.7322834645669,
				groundType: 15
			}, {
				x: 56.63779527559055,
				y: 491.1023622047244,
				groundType: 1
			}, {
				x: 290.2992125984252,
				y: 434.40944881889766,
				groundType: 13
			}, {
				x: 910.4763779527559,
				y: 188.74015748031496,
				groundType: 1
			}, {
				x: 613.6732283464567,
				y: 317.2992125984252,
				groundType: 13
			}, {
				x: 726.2244094488188,
				y: 528.8425196850394,
				groundType: 16
			}, {
				x: 909.9212598425197,
				y: 495.8267716535433,
				groundType: 8
			}, {
				x: 826.7165354330708,
				y: 495.8267716535433,
				groundType: 8
			}, {
				x: 156.79527559055117,
				y: 491.5472440944882,
				groundType: 5
			}, {
				x: 390.8995943204868,
				y: 533.6156186612576,
				groundType: 13
			}, {
				x: 628.9655172413793,
				y: 527.2738336713996,
				groundType: 14
			}],
			[{
				x: 55.52755905511811,
				y: 284.9803149606299,
				groundType: 1
			}, {
				x: 328.76377952755905,
				y: 538.5393700787401,
				groundType: 4
			}, {
				x: 278.4584178498986,
				y: 299.3914807302231,
				groundType: 3
			}, {
				x: 517.7952755905512,
				y: 489.04330708661416,
				groundType: 4
			}, {
				x: 54.803149606299215,
				y: 539.2047244094488,
				groundType: 4
			}, {
				x: 617.8976377952756,
				y: 489.68503937007875,
				groundType: 3
			}, {
				x: 708.3559837728195,
				y: 254.07809330628803,
				groundType: 2
			}, {
				x: 808.4291338582677,
				y: 255.79921259842519,
				groundType: 13
			}, {
				x: 908.4212598425197,
				y: 354.51181102362204,
				groundType: 6
			}, {
				x: 807.4291338582677,
				y: 355.51181102362204,
				groundType: 15
			}, {
				x: 277.4847870182556,
				y: 538.4178498985801,
				groundType: 1
			}],
			[{
				x: 224.88188976377953,
				y: 244.96062992125985,
				groundType: 14
			}, {
				x: 116.33070866141732,
				y: 390.0826771653543,
				groundType: 13
			}, {
				x: 217.32283464566927,
				y: 489.29527559055117,
				groundType: 4
			}, {
				x: 116.38582677165354,
				y: 489.5196850393701,
				groundType: 15
			}, {
				x: 55.19291338582677,
				y: 181.6535433070866,
				groundType: 4
			}, {
				x: 317.53543307086613,
				y: 489.68503937007875,
				groundType: 4
			}, {
				x: 483.7795275590551,
				y: 349.84251968503935,
				groundType: 14
			}, {
				x: 583.8267716535433,
				y: 348.50787401574803,
				groundType: 4
			}, {
				x: 799.3772819472616,
				y: 415.27991886409734,
				groundType: 13
			}, {
				x: 899.5000000000001,
				y: 514.7307692307693,
				groundType: 4
			}, {
				x: 945.2307692307693,
				y: 514.2307692307693,
				groundType: 3
			}, {
				x: 858.6923076923077,
				y: 198.03846153846155,
				groundType: 2
			}, {
				x: 648.7692307692308,
				y: 348.42307692307696,
				groundType: 3
			}, {
				x: 912.0000000000001,
				y: 198.46153846153848,
				groundType: 3
			}, {
				x: 798.8509127789047,
				y: 515.5111561866125,
				groundType: 15
			}],
			[{
				x: 280.40567951318457,
				y: 396.3073022312373,
				groundType: 1
			}, {
				x: 280.40567951318457,
				y: 496.98580121703856,
				groundType: 9
			}, {
				x: 55.496957403651116,
				y: 229.29006085192697,
				groundType: 4
			}, {
				x: 575.0050055617353,
				y: 217.8420467185762,
				groundType: 2
			}, {
				x: 675.4510567296998,
				y: 217.8420467185762,
				groundType: 5
			}, {
				x: 909.8109010011124,
				y: 391.90211345939935,
				groundType: 7
			}, {
				x: 251.19675456389453,
				y: 92.9817444219067,
				groundType: 1
			}, {
				x: 410.05561735261404,
				y: 296.86318131256957,
				groundType: 14
			}, {
				x: 510.00166852057845,
				y: 296.36318131256957,
				groundType: 3
			}, {
				x: 609.7441601779756,
				y: 296.36318131256957,
				groundType: 4
			}, {
				x: 675.9510567296998,
				y: 396.7413793103448,
				groundType: 7
			}, {
				x: 675.8832035595105,
				y: 296.93103448275866,
				groundType: 6
			}, {
				x: 675.9510567296998,
				y: 496.55172413793105,
				groundType: 7
			}, {
				x: 409.55561735261404,
				y: 396.2413793103448,
				groundType: 16
			}, {
				x: 509.86596218020026,
				y: 395.03781979977754,
				groundType: 8
			}, {
				x: 601.2013348164628,
				y: 395.60567296996663,
				groundType: 8
			}, {
				x: 410.98776418242494,
				y: 495.91601779755285,
				groundType: 8
			}, {
				x: 510.93381535038935,
				y: 495.98387096774195,
				groundType: 8
			}, {
				x: 610.8120133481647,
				y: 493.84816462736376,
				groundType: 8
			}, {
				x: 909.9466073414906,
				y: 491.84816462736376,
				groundType: 7
			}, {
				x: 311.64097363083164,
				y: 396.2545638945233,
				groundType: 3
			}, {
				x: 310.53549695740367,
				y: 496.6703853955375,
				groundType: 8
			}, {
				x: 909.8448275862069,
				y: 292.2474645030426,
				groundType: 6
			}],
			[{
				x: 468.29006085192697,
				y: 388.0578093306288,
				groundType: 8
			}, {
				x: 55.496957403651116,
				y: 287.2210953346856,
				groundType: 3
			}, {
				x: 368.03245436105476,
				y: 488.815415821501,
				groundType: 8
			}, {
				x: 468.79006085192697,
				y: 488.762677484787,
				groundType: 8
			}, {
				x: 468.842799188641,
				y: 288.2474645030426,
				groundType: 5
			}, {
				x: 568.5740365111561,
				y: 389.3995943204868,
				groundType: 4
			}, {
				x: 668.8843813387424,
				y: 389.9787018255578,
				groundType: 3
			}, {
				x: 155.22819472616632,
				y: 287.7474645030426,
				groundType: 13
			}, {
				x: 767.6419878296145,
				y: 390.4523326572008,
				groundType: 13
			}, {
				x: 867.9787018255578,
				y: 489.683569979716,
				groundType: 6
			}, {
				x: 568.5740365111561,
				y: 488.815415821501,
				groundType: 8
			}, {
				x: 668.8052738336714,
				y: 489.70993914807303,
				groundType: 8
			}, {
				x: 766.1683569979716,
				y: 490.762677484787,
				groundType: 15
			}],
			[{
				x: 55.52332657200811,
				y: 329.08722109533466,
				groundType: 3
			}, {
				x: 223.1813125695217,
				y: 460.2447163515017,
				groundType: 4
			}, {
				x: 407.35205784204675,
				y: 271.16685205784205,
				groundType: 4
			}, {
				x: 507.16240266963297,
				y: 271.09899888765295,
				groundType: 3
			}, {
				x: 607.6084538375974,
				y: 271.23470522803115,
				groundType: 4
			}, {
				x: 751.7686318131257,
				y: 468.7875417130145,
				groundType: 3
			}, {
				x: 909.9503042596349,
				y: 325.1926977687627,
				groundType: 6
			}]
		],
		ballDatas: [
			[{
				x: 183.06469920544836,
				y: 416.96680497925314,
				ballType: 1
			}],
			[{
				x: 121.7352614015573,
				y: 417.07503368822506,
				ballType: 1
			}],
			[{
				x: 863.8932146829811,
				y: 416.90006622406645,
				ballType: 1
			}],
			[{
				x: 45.91768631813126,
				y: 415.95825714285724,
				ballType: 1
			}],
			[{
				x: 49.121245828698555,
				y: 415.93158809523817,
				ballType: 1
			}, {
				x: 563.8264738598443,
				y: 120.78086506965413,
				ballType: 3
			}],
			[{
				x: 812.9817444219067,
				y: 416.8147262153162,
				ballType: 3
			}],
			[{
				x: 168.43813387423936,
				y: 158.75595062724562,
				ballType: 1
			}],
			[{
				x: 55.52836484983315,
				y: 415.9589528530162,
				ballType: 1
			}, {
				x: 541.4015572858732,
				y: 151.64026545889564,
				ballType: 2
			}],
			[{
				x: 556.3515016685207,
				y: 187.45535883355294,
				ballType: 1
			}, {
				x: 83.29254727474972,
				y: 153.88329832469688,
				ballType: 3
			}],
			[{
				x: 76.88542825361513,
				y: 204.0734123444039,
				ballType: 3
			}, {
				x: 780.6006674082314,
				y: 416.925757836396,
				ballType: 3
			}],
			[{
				x: 77.95328142380423,
				y: 153.55171649011118,
				ballType: 1
			}, {
				x: 788.0756395995551,
				y: 121.78258803613843,
				ballType: 2
			}],
			[{
				x: 271.18110236220474,
				y: 416.5667560904507,
				ballType: 3
			}, {
				x: 883.4645669291339,
				y: 151.703324096177,
				ballType: 3
			}],
			[{
				x: 581.2576064908721,
				y: 83.63461882381888,
				ballType: 2
			}, {
				x: 44.40944881889764,
				y: 184.12674480807084,
				ballType: 1
			}],
			[{
				x: 186.14173228346456,
				y: 164.26759722951297,
				ballType: 3
			}, {
				x: 333.54330708661416,
				y: 415.5259603911535,
				ballType: 3
			}],
			[{
				x: 911.8110236220473,
				y: 115.06057622997197,
				ballType: 3
			}, {
				x: 79.83772819472617,
				y: 111.37083929625983,
				ballType: 3
			}, {
				x: 514.0157480314961,
				y: 243.65430386318909,
				ballType: 2
			}],
			[{
				x: 516.8503937007874,
				y: 415.3935024966734,
				ballType: 3
			}, {
				x: 58.58267716535433,
				y: 465.54864391645384,
				ballType: 1
			}, {
				x: 708.6614173228346,
				y: 181.1982349658129,
				ballType: 2
			}],
			[{
				x: 81.23076923076924,
				y: 107.94638157935596,
				ballType: 1
			}, {
				x: 648.923076923077,
				y: 274.6180140522425,
				ballType: 2
			}, {
				x: 840.0000000000001,
				y: 124.61538461538463,
				ballType: 3
			}],
			[{
				x: 549.944382647386,
				y: 143.9316074372051,
				ballType: 1
			}, {
				x: 697.3081201334817,
				y: 143.49512400207328,
				ballType: 2
			}],
			[{
				x: 369.97971602434075,
				y: 415.165728384701,
				ballType: 1
			}, {
				x: 697.1196754563895,
				y: 316.3217557651032,
				ballType: 2
			}],
			[{
				x: 604.6247464503042,
				y: 197.64491460303253,
				ballType: 2
			}, {
				x: 395.10567296996663,
				y: 197.57706143884522,
				ballType: 1
			}]
		],
		starDatas: [
			[{
				x: 479.45516458569807,
				y: 309.466515323496
			}, {
				x: 310.5561861520999,
				y: 350.87400681044267
			}, {
				x: 638.5471055618615,
				y: 355.2326901248581
			}],
			[{
				x: 271.23470522803115,
				y: 244.5383759733037
			}, {
				x: 491.21245828698557,
				y: 140.95661846496108
			}, {
				x: 748.5650723025584,
				y: 395.10567296996663
			}],
			[{
				x: 509.36596218020026,
				y: 142.02447163515018
			}, {
				x: 679.154616240267,
				y: 257.3526140155729
			}, {
				x: 126.0066740823137,
				y: 341.7130144605117
			}],
			[{
				x: 286.18464961067855,
				y: 245.60622914349278
			}, {
				x: 494.41601779755285,
				y: 297.93103448275866
			}, {
				x: 697.3081201334817,
				y: 362.0022246941046
			}],
			[{
				x: 301.13459399332595,
				y: 289.38820912124584
			}, {
				x: 746.4293659621802,
				y: 234.9276974416018
			}, {
				x: 506.16240266963297,
				y: 350.2558398220245
			}],
			[{
				x: 204.46247464503043,
				y: 203.48884381338743
			}, {
				x: 429.37119675456387,
				y: 262.8803245436105
			}, {
				x: 628.9655172413793,
				y: 333.9553752535497
			}],
			[{
				x: 738.0121703853955,
				y: 92.49492900608519
			}, {
				x: 737.0385395537526,
				y: 237.5659229208925
			}, {
				x: 179.14807302231236,
				y: 391.3995943204868
			}],
			[{
				x: 806.2291434927698,
				y: 356.66295884315906
			}, {
				x: 475.19466073414907,
				y: 131.3459399332592
			}, {
				x: 254.14905450500558,
				y: 231.7241379310345
			}],
			[{
				x: 154.83870967741936,
				y: 349.1879866518354
			}, {
				x: 273.37041156840934,
				y: 120.6674082313682
			}, {
				x: 711.1902113459399,
				y: 355.59510567296996
			}],
			[{
				x: 363.0700778642937,
				y: 272.30255839822024
			}, {
				x: 625.761957730812,
				y: 366.273637374861
			}, {
				x: 165.51724137931035,
				y: 203.95995550611792
			}],
			[{
				x: 303.27030033370414,
				y: 241.3348164627364
			}, {
				x: 452.769744160178,
				y: 312.880978865406
			}, {
				x: 890.5895439377086,
				y: 255.21690767519468
			}],
			[{
				x: 175.748031496063,
				y: 129.21259842519686
			}, {
				x: 626.4566929133858,
				y: 340.86614173228344
			}, {
				x: 129.4488188976378,
				y: 338.0314960629921
			}],
			[{
				x: 737.9527559055118,
				y: 205.748031496063
			}, {
				x: 90.70866141732283,
				y: 354.09448818897636
			}, {
				x: 445.98425196850394,
				y: 94.25196850393701
			}],
			[{
				x: 738.8976377952756,
				y: 100.86614173228347
			}, {
				x: 398.74015748031496,
				y: 259.6062992125984
			}, {
				x: 691.6535433070866,
				y: 347.4803149606299
			}],
			[{
				x: 310.86614173228344,
				y: 364.96062992125985
			}, {
				x: 716.2204724409448,
				y: 367.79527559055117
			}, {
				x: 514.0157480314961,
				y: 171.25984251968504
			}],
			[{
				x: 326.92913385826773,
				y: 448.1102362204724
			}, {
				x: 170.07874015748033,
				y: 151.41732283464566
			}, {
				x: 610.3937007874016,
				y: 157.08661417322836
			}],
			[{
				x: 120.92307692307693,
				y: 292.61538461538464
			}, {
				x: 912.0000000000001,
				y: 104.30769230769232
			}, {
				x: 818.7692307692308,
				y: 391.3846153846154
			}],
			[{
				x: 70.47830923248054,
				y: 103.5817575083426
			}, {
				x: 796.4300202839756,
				y: 175.25354969574036
			}, {
				x: 310.7452725250278,
				y: 285.11679644048945
			}],
			[{
				x: 59.39148073022312,
				y: 192.7789046653144
			}, {
				x: 471.23732251521295,
				y: 187.91075050709938
			}, {
				x: 772.0892494929006,
				y: 281.37931034482756
			}],
			[{
				x: 57.444219066937116,
				y: 228.80324543610547
			}, {
				x: 225.3170189098999,
				y: 271.23470522803115
			}, {
				x: 754.5638945233266,
				y: 218.09330628803244
			}]
		],
		goalDatas: [
			[{
				x: 795.4597048808172,
				y: 366.1293984108967,
				goalId: 0
			}],
			[{
				x: 898.0645161290323,
				y: 367.273637374861,
				goalId: 0
			}],
			[{
				x: 418.5984427141268,
				y: 267.39543937708567,
				goalId: 0
			}],
			[{
				x: 913.0144605116797,
				y: 367.773637374861,
				goalId: 0
			}],
			[{
				x: 912.3787541713015,
				y: 367.273637374861,
				goalId: 0
			}],
			[{
				x: 54.470588235294116,
				y: 167.46450304259633,
				goalId: 1
			}],
			[{
				x: 56.496957403651116,
				y: 366.0851926977688,
				goalId: 1
			}],
			[{
				x: 914.785873192436,
				y: 367.9093437152392,
				goalId: 0
			}],
			[{
				x: 54.46051167964405,
				y: 367.2057842046719,
				goalId: 1
			}],
			[{
				x: 254.21690767519468,
				y: 367.773637374861,
				goalId: 1
			}],
			[{
				x: 750.7007786429366,
				y: 367.9093437152392,
				goalId: 1
			}],
			[{
				x: 729.3937007874016,
				y: 365.46062992125985,
				goalId: 0
			}, {
				x: 193.86614173228347,
				y: 367.90551181102364,
				goalId: 0
			}],
			[{
				x: 913.5354330708661,
				y: 367.3779527559055,
				goalId: 0
			}],
			[{
				x: 594.8307086614174,
				y: 365.43307086614175,
				goalId: 1
			}],
			[{
				x: 568.8188976377953,
				y: 453.3070866141732,
				goalId: 1
			}, {
				x: 451.0472440944882,
				y: 452.4173228346457,
				goalId: 0
			}],
			[{
				x: 60.41732283464567,
				y: 161.81102362204723,
				goalId: 1
			}, {
				x: 907.9763779527559,
				y: 232.34251968503938,
				goalId: 0
			}],
			[{
				x: 913.8461538461539,
				y: 391.4615384615385,
				goalId: 0
			}],
			[{
				x: 907.4239350912778,
				y: 169.49087221095334,
				goalId: 0
			}],
			[{
				x: 872.3468559837728,
				y: 366.1115618661258,
				goalId: 0
			}],
			[{
				x: 906.9766734279918,
				y: 202.56795131845843,
				goalId: 0
			}]
		],
		moveDatas: [
			[],
			[],
			[],
			[],
			[],
			[{
				x: 169.41176470588235,
				y: 394.3204868154158,
				moveData: {
					minY: 394.3204868154158,
					maxY: 137.28194726166328,
					dur: 1
				}
			}],
			[{
				x: 848.0324543610548,
				y: 394.3204868154158,
				moveData: {
					minY: 394.3204868154158,
					maxY: 130.46653144016227,
					dur: 1
				}
			}],
			[],
			[],
			[{
				x: 468.7196885428254,
				y: 396.17352614015573,
				moveData: {
					minY: 396.17352614015573,
					maxY: 210.36707452725253,
					dur: 1
				}
			}],
			[{
				x: 539.265850945495,
				y: 394.03781979977754,
				moveData: {
					minY: 394.03781979977754,
					maxY: 240.26696329254727,
					dur: 1
				}
			}],
			[],
			[],
			[{
				x: 792.755905511811,
				y: 140.5511811023622,
				moveData: {
					minY: 140.5511811023622,
					maxY: 43.22834645669291,
					dur: 1
				}
			}, {
				x: 468.66141732283467,
				y: 495.8267716535433,
				moveData: {
					minY: 495.8267716535433,
					maxY: 116.92913385826772,
					dur: 1
				}
			}],
			[],
			[{
				x: 278.4847870182556,
				y: 204.47565922920893,
				moveData: {
					minY: 203.97565922920893,
					maxY: 94.25196850393701,
					dur: 1
				}
			}],
			[],
			[{
				x: 191.14571746384874,
				y: 496.55172413793105,
				moveData: {
					minY: 496.55172413793105,
					maxY: 98.24249165739711,
					dur: 1
				}
			}, {
				x: 795.4563894523327,
				y: 498.49898580121703,
				moveData: {
					minY: 498.49898580121703,
					maxY: 154.80730223123732,
					dur: 1
				}
			}],
			[{
				x: 585.1521298174442,
				y: 295.9837728194726,
				moveData: {
					minY: 295.9837728194726,
					maxY: 177.20081135902637,
					dur: 1
				}
			}],
			[{
				x: 750.7007786429366,
				y: 373.74860956618465,
				moveData: {
					minY: 373.74860956618465,
					maxY: 189.01001112347052,
					dur: 1
				}
			}, {
				x: 222.1134593993326,
				y: 365.2057842046719,
				moveData: {
					minY: 365.2057842046719,
					maxY: 193.28142380422693,
					dur: 1
				}
			}]
		],
		stayDatas: [
			[{
				x: 649.2547274749722,
				y: 280.84538375973307,
				objId: 1
			}, {
				x: 113.1924360400445,
				y: 354.52725250278087,
				objId: 3
			}, {
				x: 611.8798665183538,
				y: 403.64849833147946,
				objId: 5
			}],
			[{
				x: 512.0695216907676,
				y: 256.08120133481646,
				objId: 4
			}, {
				x: 507.23025583982206,
				y: 404.58064516129036,
				objId: 5
			}],
			[{
				x: 844.6718576195774,
				y: 279.6418242491658,
				objId: 1
			}],
			[{
				x: 84.36040044493882,
				y: 308.1774193548387,
				objId: 2
			}, {
				x: 482.6696329254728,
				y: 280.27753058954397,
				objId: 1
			}],
			[{
				x: 102.94605116796441,
				y: 308.1774193548387,
				objId: 2
			}, {
				x: 384.4271412680757,
				y: 106.853170189099,
				objId: 5
			}, {
				x: 878.8431590656285,
				y: 280.2096774193549,
				objId: 1
			}, {
				x: 509.5945494994439,
				y: 354.4593993325918,
				objId: 4
			}],
			[{
				x: 879.1886409736309,
				y: 280.40567951318457,
				objId: 1
			}, {
				x: 541.3387423935092,
				y: 355.40162271805275,
				objId: 4
			}, {
				x: 202.5152129817444,
				y: 308.64097363083164,
				objId: 2
			}],
			[{
				x: 874.3204868154158,
				y: 279.9584178498986,
				objId: 1
			}, {
				x: 485.841784989858,
				y: 354.4543610547667,
				objId: 3
			}, {
				x: 321.29817444219066,
				y: 307.2464503042596,
				objId: 2
			}],
			[{
				x: 53.392658509454954,
				y: 308.6095661846496,
				objId: 2
			}, {
				x: 102.51390433815351,
				y: 354.73081201334816,
				objId: 3
			}, {
				x: 902.3359288097887,
				y: 280.91323692992216,
				objId: 1
			}, {
				x: 473.0589543937709,
				y: 138.75305895439377,
				objId: 5
			}],
			[{
				x: 304.27030033370414,
				y: 279.77753058954397,
				objId: 1
			}, {
				x: 536.0622914349277,
				y: 402.58064516129036,
				objId: 5
			}],
			[{
				x: 832.9254727474972,
				y: 355.52725250278087,
				objId: 4
			}, {
				x: 896.9966629588432,
				y: 281.34538375973307,
				objId: 1
			}],
			[{
				x: 489.0767519466074,
				y: 279.7096774193549,
				objId: 1
			}],
			[{
				x: 491.33858267716533,
				y: 208.58267716535434,
				objId: 2
			}, {
				x: 825.8267716535433,
				y: 401.33858267716533,
				objId: 5
			}, {
				x: 57.63779527559055,
				y: 354.53937007874015,
				objId: 3
			}],
			[{
				x: 885.3543307086615,
				y: 281.2834645669291,
				objId: 1
			}, {
				x: 251.33858267716536,
				y: 122.15354330708661,
				objId: 3
			}, {
				x: 426.14173228346453,
				y: 403.2834645669291,
				objId: 5
			}, {
				x: 746.4566929133858,
				y: 355.48425196850394,
				objId: 4
			}],
			[{
				x: 916.5354330708661,
				y: 279.003937007874,
				objId: 1
			}, {
				x: 72.75590551181102,
				y: 309.18503937007875,
				objId: 2
			}, {
				x: 142.23228346456693,
				y: 354.59448818897636,
				objId: 3
			}],
			[{
				x: 108.66141732283464,
				y: 310.6299212598425,
				objId: 2
			}, {
				x: 64.19685039370079,
				y: 355.59448818897636,
				objId: 3
			}, {
				x: 148.3464566929134,
				y: 404.7283464566929,
				objId: 5
			}, {
				x: 878.7401574803149,
				y: 361.20866141732284,
				objId: 4
			}],
			[{
				x: 551.8110236220473,
				y: 279.14173228346453,
				objId: 1
			}, {
				x: 54.91338582677165,
				y: 403.755905511811,
				objId: 3
			}, {
				x: 924.0944881889764,
				y: 173.20472440944883,
				objId: 2
			}, {
				x: 51.023622047244096,
				y: 102.72834645669292,
				objId: 2
			}],
			[{
				x: 314.7692307692308,
				y: 278.5,
				objId: 1
			}, {
				x: 604.6153846153846,
				y: 166.23076923076925,
				objId: 2
			}, {
				x: 277.84615384615387,
				y: 402.4615384615385,
				objId: 5
			}, {
				x: 644.3076923076924,
				y: 212.3846153846154,
				objId: 3
			}, {
				x: 916.6153846153846,
				y: 304.11538461538464,
				objId: 1
			}],
			[{
				x: 316.0845383759733,
				y: 259.4883203559511,
				objId: 3
			}],
			[{
				x: 350.5070993914807,
				y: 278.4584178498986,
				objId: 1
			}, {
				x: 613.3874239350913,
				y: 207.38336713995943,
				objId: 2
			}, {
				x: 62.970588235294116,
				y: 151.8864097363083,
				objId: 3
			}],
			[{
				x: 510.43381535038935,
				y: 137.18520578420467,
				objId: 4
			}, {
				x: 756.0400444938821,
				y: 259.4883203559511,
				objId: 1
			}, {
				x: 245.60622914349278,
				y: 278.7096774193549,
				objId: 2
			}]
		],
		timeLimits: [
			[10, 15],
			[10, 15],
			[20, 30],
			[20, 30],
			[20, 30],
			[10, 15],
			[20, 30],
			[30, 40],
			[30, 40],
			[30, 40],
			[30, 40],
			[30, 40],
			[60, 70],
			[30, 40],
			[30, 40],
			[60, 70],
			[40, 50],
			[60, 70],
			[40, 50],
			[50, 60]
		],
		routeTutor: [{
			x: 552.8571428571429,
			y: 218.58056340898787
		}],
		openAllStage: function() {
			ig.game.sessionData.unlockedStage = [];
			for (var b = 0; b < ig.GameData.stages; b++) ig.game.sessionData.unlockedStage.push(3), ig.game.sessionData.highScore.push(3);
			ig.game.sessionData.ballType2Tutor = 4;
			ig.game.sessionData.ballType3Tutor = 7;
			ig.game.sessionData.jumpingCrabTutor1 = 5;
			ig.game.sessionData.jumpingCrabTutor2 = 6
		}
	}
});
ig.baked = !0;
ig.module("plugins.addon.transition").defines(function() {
	ig.Transition = ig.Class.extend({
		name: "Transition",
		isClosed: !1,
		isRunning: !1,
		tweenTime: 0.3,
		init: function() {},
		create: function() {
			this.alpha = 1;
			this.group = [];
			this.isClosed = !0
		},
		addSprite: function(b, c, d, e, f) {
			b = new EntitySprite(b, c, f);
			b.setProperties(d, e);
			return b
		},
		addZIndex: function() {
			for (var b = 0; b < this.group.length; b++) {
				var c = this.group[b],
					d = ig.game.entities[ig.game.entities.length - 1].zIndex;
				ig.game.entities.push(c);
				c.zIndex = d + b + 1;
				ig.game.sortEntitiesDeferred()
			}
		},
		update: function() {
			for (var b = 0; b < this.group.length; b++) this.group[b].update()
		},
		draw: function() {
			for (var b = 0; b < this.group.length; b++) this.group[b].draw();
			b = ig.game.geom.rectangle(0, 0, ig.system.width, ig.system.height);
			ig.game.geomDebug.rect(b, "black", this.alpha)
		},
		close: function(b) {
			!this.isRunning && !this.isClosed && (this.isRunning = !0, this.stateIdx = b, (new Tweener(this)).to({
				alpha: 1
			}, this.tweenTime).onComplete(function() {
				this.isRunning = !1;
				this.isClosed = !0;
				ig.game.director.loadLevel(this.stateIdx)
			}.bind(this)).start())
		},
		open: function() {
			!this.isRunning && this.isClosed && (this.isRunning = !0, (new Tweener(this)).to({
				alpha: 0
			}, this.tweenTime).onComplete(function() {
				this.isClosed = this.isRunning = !1
			}.bind(this)).start())
		}
	})
});
ig.baked = !0;
ig.module("plugins.atlas.all-atlas-data").defines(function() {
	ig.AllAtlasData = ig.Class.extend({
		init: function() {}
	})
});
ig.baked = !0;
ig.module("plugins.atlas.sprites").requires("plugins.atlas.all-atlas-data").defines(function() {
	ig.AllAtlasData.inject({
		sprites: [{
			filename: "page-tag.png",
			frame: {
				w: 30,
				h: 30
			}
		}, {
			filename: "small-star.png",
			frame: {
				w: 24,
				h: 23
			}
		}, {
			filename: "star-indicator.png",
			frame: {
				w: 41,
				h: 39
			}
		}, {
			filename: "star-result.png",
			frame: {
				w: 69,
				h: 67
			}
		}, {
			filename: "game/grounds.png",
			frame: {
				w: 101,
				h: 101
			}
		}, {
			filename: "game/ball.png",
			frame: {
				w: 46,
				h: 46
			}
		}, {
			filename: "game/goal.png",
			frame: {
				w: 94,
				h: 147
			}
		}, {
			filename: "game/moving1.png",
			frame: {
				w: 135,
				h: 87
			}
		}, {
			filename: "game/object5.png",
			frame: {
				w: 110,
				h: 73
			}
		}, {
			filename: "box.png",
			frame: {
				w: 249,
				h: 70
			}
		}, {
			filename: "box2.png",
			frame: {
				w: 145,
				h: 61
			}
		}, {
			filename: "box3.png",
			frame: {
				w: 219,
				h: 58
			}
		}, {
			filename: "btn_more_games.png",
			frame: {
				w: 64,
				h: 66
			}
		}, {
			filename: "buttons/back-btn.png",
			frame: {
				w: 71,
				h: 71
			}
		}, {
			filename: "buttons/basic-btn.png",
			frame: {
				w: 71,
				h: 71
			}
		}, {
			filename: "buttons/close-btn.png",
			frame: {
				w: 59,
				h: 59
			}
		}, {
			filename: "buttons/home.png",
			frame: {
				w: 71,
				h: 71
			}
		}, {
			filename: "buttons/more-btn.png",
			frame: {
				w: 71,
				h: 71
			}
		}, {
			filename: "buttons/pause-btn.png",
			frame: {
				w: 71,
				h: 71
			}
		}, {
			filename: "buttons/play-btn.png",
			frame: {
				w: 103,
				h: 102
			}
		}, {
			filename: "buttons/replay-btn.png",
			frame: {
				w: 71,
				h: 71
			}
		}, {
			filename: "buttons/setting-btn.png",
			frame: {
				w: 71,
				h: 71
			}
		}, {
			filename: "game/direction-dot.png",
			frame: {
				w: 17,
				h: 18
			}
		}, {
			filename: "game/goal-board.png",
			frame: {
				w: 315,
				h: 111
			}
		}, {
			filename: "game/land1.png",
			frame: {
				w: 961,
				h: 100
			}
		}, {
			filename: "game/object1.png",
			frame: {
				w: 212,
				h: 320
			}
		}, {
			filename: "game/object2.png",
			frame: {
				w: 199,
				h: 263
			}
		}, {
			filename: "game/object3.png",
			frame: {
				w: 118,
				h: 173
			}
		}, {
			filename: "game/object4.png",
			frame: {
				w: 161,
				h: 171
			}
		}, {
			filename: "game/pole1.png",
			frame: {
				w: 94,
				h: 147
			}
		}, {
			filename: "game/pole2.png",
			frame: {
				w: 94,
				h: 147
			}
		}, {
			filename: "game/star.png",
			frame: {
				w: 84,
				h: 82
			}
		}, {
			filename: "game/star2.png",
			frame: {
				w: 84,
				h: 82
			}
		}, {
			filename: "game/tutor-box.png",
			frame: {
				w: 546,
				h: 87
			}
		}, {
			filename: "level-box.png",
			frame: {
				w: 411,
				h: 338
			}
		}, {
			filename: "loading-bar.png",
			frame: {
				w: 273,
				h: 13
			}
		}, {
			filename: "loading-bg.png",
			frame: {
				w: 281,
				h: 19
			}
		}, {
			filename: "lock.png",
			frame: {
				w: 34,
				h: 44
			}
		}, {
			filename: "logo.png",
			frame: {
				w: 392,
				h: 240
			}
		}, {
			filename: "off-tag.png",
			frame: {
				w: 30,
				h: 30
			}
		}, {
			filename: "on-tag.png",
			frame: {
				w: 30,
				h: 30
			}
		}, {
			filename: "result-box.png",
			frame: {
				w: 411,
				h: 338
			}
		}, {
			filename: "score-box.png",
			frame: {
				w: 182,
				h: 42
			}
		}, {
			filename: "setting-bar-bg.png",
			frame: {
				w: 154,
				h: 12
			}
		}, {
			filename: "setting-bar.png",
			frame: {
				w: 154,
				h: 12
			}
		}, {
			filename: "setting-box.png",
			frame: {
				w: 389,
				h: 257
			}
		}, {
			filename: "setting-cursor.png",
			frame: {
				w: 30,
				h: 35
			}
		}, {
			filename: "small-box.png",
			frame: {
				w: 80,
				h: 74
			}
		}, {
			filename: "star-off.png",
			frame: {
				w: 24,
				h: 23
			}
		}, {
			filename: "star-on.png",
			frame: {
				w: 23,
				h: 23
			}
		}]
	})
});
ig.baked = !0;
ig.module("plugins.addon.state-addon").requires("impact.game", "plugins.addon.custom-storage", "plugins.addon.random-generator", "plugins.addon.math-collection", "plugins.addon.debug", "plugins.addon.geometry", "game.entities.addon.custom-entity", "plugins.addon.custom-image", "plugins.addon.raw-image", "game.entities.addon.sprite", "game.entities.addon.group", "plugins.addon.add-image", "game.entities.addon.text", "game.entities.objects.click-btn", "game.entities.objects.options", "game.entities.objects.level-box", "game.entities.objects.level-select", "game.entities.objects.game-object", "game.entities.objects.goal", "game.entities.objects.float-star", "game.entities.objects.goal-board", "game.entities.objects.confetti-generator", "game.entities.objects.result", "game.entities.objects.tutorial", "plugins.addon.game-data", "plugins.addon.transition", "plugins.atlas.all-atlas-data", "plugins.atlas.sprites").defines(function() {
	ig.Game.inject({
		groups: [],
		addOnReady: !1,
		prepareGame: function() {
			this.addOnReady = !1;
			this.centerX = ig.system.width / 2;
			this.centerY = ig.system.height / 2;
			this.gw = ig.system.width;
			this.gh = ig.system.height;
			this.rnd = new ig.RandomGenerator([(Date.now() * Math.random()).toString()]);
			this.math = new ig.MathCollection;
			this.transition = new ig.Transition;
			this.transition.create();
			this.geomDebug = new ig.Debug;
			this.geom = new ig.Geometry;
			this.goToPage = "mainmenu"
		},
		disableBtns: function() {
			for (var b = 0; b < ig.game.entities.length; b++) ig.game.entities[b].inputEnabled = !1;
			_SETTINGS.MoreGames.Enabled && curState().moreBtn && curState().moreBtn.exists && curState().moreBtn.hide()
		},
		updateGroups: function() {
			for (var b = 0; b < this.groups.length; b++) this.groups[b].update()
		},
		drawGroups: function() {
			for (var b = 0; b < this.groups.length; b++) this.groups[b].draw()
		},
		update: function() {
			this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null);
			this.addOnReady ? (this.updateGroups(), this.transition && this.transition.update()) : this.updateEntities();
			this.checkEntities();
			for (var b = 0; b < this._deferredKill.length; b++) this._deferredKill[b].erase(), this.entities.erase(this._deferredKill[b]);
			this._deferredKill = [];
			if (this._doSortEntities || this.autoSort) this.sortEntities(), this._doSortEntities = !1;
			for (var c in this.backgroundAnims) {
				var b = this.backgroundAnims[c],
					d;
				for (d in b) b[d].update()
			}
		},
		draw: function() {
			this.clearColor && ig.system.clear(this.clearColor);
			this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
			this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
			var b;
			for (b = 0; b < this.backgroundMaps.length; b++) {
				var c = this.backgroundMaps[b];
				if (c.foreground) break;
				c.setScreenPos(this.screen.x, this.screen.y);
				c.draw()
			}
			this.addOnReady ? (this.drawGroups(), this.transition && this.transition.draw()) : this.drawEntities();
			for (b; b < this.backgroundMaps.length; b++) c = this.backgroundMaps[b], c.setScreenPos(this.screen.x, this.screen.y), c.draw()
		},
		getSpriteDatas: function(b, c) {
			var d = null,
				e = 1 < c.split(".").length ? c : c + ".png";
			try {
				for (var f = new ig.AllAtlasData, g = f[b] ? f[b] : [], f = 0; f < g.length; f++) {
					var m = g[f];
					m.filename == e && (d = m)
				}
				return d
			} catch (l) {
				return d
			}
		},
		parentPos: function(b) {
			for (var c = {
					x: 0,
					y: 0
				}, d = !1; !d;) c = this.countPos(b, c), b.groupParent ? b = b.groupParent : d = !0;
			return c
		},
		countPos: function(b, c) {
			c.x += b.x;
			c.y += b.y;
			return c
		},
		checkVisibility: function(b) {
			var c = !0;
			if (b.visible)
				for (var d = !1; !d;) b.groupParent ? (b = b.groupParent, b.visible || (c = !1)) : d = !0;
			else c = !1;
			return c
		},
		checkZIndexGroups: function() {
			for (var b = this.tempZIndex = 0; b < this.groups.length; b++) {
				var c = this.groups[b];
				c.zIndex = this.tempZIndex;
				this.tempZIndex++;
				c.children && 0 < c.children.length && this.checkZIndexChildren(c)
			}
			this.sortEntitiesDeferred()
		},
		checkZIndexChildren: function(b) {
			b = b.children;
			for (var c = 0; c < b.length; c++) {
				var d = b[c];
				d.zIndex = this.tempZIndex;
				this.tempZIndex++;
				d.children && 0 < d.children.length && this.checkZIndexChildren(d)
			}
		},
		addGroup: function(b, c, d, e) {
			e = e ? e : EntityGroup;
			return ig.game.spawnEntity(e, b, c, d)
		},
		addSprite: function(b, c, d, e, f, g) {
			g = g ? g : EntitySprite;
			b = ig.game.spawnEntity(g, b, c, f);
			b.setProperties(d, e);
			return b
		},
		addImage: function(b, c, d, e) {
			b = new ig.AddImage(b, c, d, e);
			b.checkProperties();
			return b
		},
		addText: function(b, c, d, e, f, g) {
			b = ig.game.spawnEntity(EntityText, b, c, g);
			b.inputProperty(d, e, f);
			return b
		},
		changePage: function(b) {
			b = isNaN(b) ? ig.game.director.levels.indexOf(b) : b;
			ig.game.transition.close(b)
		},
		decideHHMMSS: function(b) {
			b = this.countSec(b);
			var c = parseInt(b / 3600),
				d = b - 3600 * c;
			b = parseInt(d / 60);
			var d = parseInt(d - 60 * b),
				e = c + "";
			10 > c && (e = "0" + c);
			c = b + "";
			10 > b && (c = "0" + b);
			b = d + "";
			10 > d && (b = "0" + d);
			return {
				h: e,
				m: c,
				s: b
			}
		},
		countMin: function(b) {
			b = this.countSec(b);
			var c = parseInt(b / 60);
			b = parseInt(b - 60 * c);
			var d = c + "";
			10 > c && (d = "0" + c);
			c = b + "";
			10 > b && (c = "0" + b);
			return d + ":" + c
		},
		countSec: function(b) {
			var c = Math.floor(b),
				d = c;
			0 < c ? 0 < b % c && (d = c + 1) : d = b > c ? d + 1 : 0;
			return d
		},
		upperCase: function(b) {
			return b[0].toUpperCase() + b.slice(1)
		}
	})
});
ig.baked = !0;
ig.module("plugins.tweener").requires("impact.timer", "impact.game", "plugins.addon.state-addon").defines(function() {
	ig.Game.inject({
		update: function() {
			this.parent();
			for (var b = 0; b < ig.Tweener.tweens.length; b++) ig.Tweener.tweens[b].update()
		}
	});
	ig.Tweener = {
		tweens: [],
		addTween: function(b) {
			this.tweens.push(b)
		},
		clearTweens: function() {
			this.tweens = []
		},
		removeTween: function(b) {
			b = this.tweens.indexOf(b);
			this.tweens.splice(b, 1)
		},
		pause: function() {
			for (var b = 0; b < this.tweens.length; b++) this.tweens[b].pause()
		},
		resume: function() {
			for (var b = 0; b < this.tweens.length; b++) this.tweens[b].resume()
		},
		Easing: {
			Linear: {
				EaseNone: function(b) {
					return b
				}
			},
			Quadratic: {
				EaseIn: function(b) {
					return b * b
				},
				EaseOut: function(b) {
					return -b * (b - 2)
				},
				EaseInOut: function(b) {
					return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1)
				}
			},
			Cubic: {
				EaseIn: function(b) {
					return b * b * b
				},
				EaseOut: function(b) {
					return --b * b * b + 1
				},
				EaseInOut: function(b) {
					return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2)
				}
			},
			Quartic: {
				EaseIn: function(b) {
					return b * b * b * b
				},
				EaseOut: function(b) {
					return -(--b * b * b * b - 1)
				},
				EaseInOut: function(b) {
					return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2)
				}
			},
			Quintic: {
				EaseIn: function(b) {
					return b * b * b * b * b
				},
				EaseOut: function(b) {
					return (b -= 1) * b * b * b * b + 1
				},
				EaseInOut: function(b) {
					return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2)
				}
			},
			Sinusoidal: {
				EaseIn: function(b) {
					return -Math.cos(b * Math.PI / 2) + 1
				},
				EaseOut: function(b) {
					return Math.sin(b * Math.PI / 2)
				},
				EaseInOut: function(b) {
					return -0.5 * (Math.cos(Math.PI * b) - 1)
				}
			},
			Exponential: {
				EaseIn: function(b) {
					return 0 == b ? 0 : Math.pow(2, 10 * (b - 1))
				},
				EaseOut: function(b) {
					return 1 == b ? 1 : -Math.pow(2, -10 * b) +
						1
				},
				EaseInOut: function(b) {
					return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2)
				}
			},
			Circular: {
				EaseIn: function(b) {
					return -(Math.sqrt(1 - b * b) - 1)
				},
				EaseOut: function(b) {
					return Math.sqrt(1 - --b * b)
				},
				EaseInOut: function(b) {
					return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
				}
			},
			Elastic: {
				EaseIn: function(b) {
					var c, d = 0.1,
						e = 0.4;
					if (0 == b) return 0;
					if (1 == b) return 1;
					e || (e = 0.3);
					!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
					return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b -
						c) * 2 * Math.PI / e))
				},
				EaseOut: function(b) {
					var c, d = 0.1,
						e = 0.4;
					if (0 == b) return 0;
					if (1 == b) return 1;
					e || (e = 0.3);
					!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
					return d * Math.pow(2, -10 * b) * Math.sin((b - c) * 2 * Math.PI / e) + 1
				},
				EaseInOut: function(b) {
					var c, d = 0.1,
						e = 0.4;
					if (0 == b) return 0;
					if (1 == b) return 1;
					e || (e = 0.3);
					!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
					return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) + 1
				}
			},
			Back: {
				EaseIn: function(b) {
					return b * b * (2.70158 * b - 1.70158)
				},
				EaseOut: function(b) {
					return (b -= 1) * b * (2.70158 * b + 1.70158) + 1
				},
				EaseInOut: function(b) {
					return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2)
				}
			},
			Bounce: {
				EaseIn: function(b) {
					return 1 - ig.Tweener.Easing.Bounce.EaseOut(1 - b)
				},
				EaseOut: function(b) {
					return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375
				},
				EaseInOut: function(b) {
					return 0.5 > b ? 0.5 * ig.Tweener.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tweener.Easing.Bounce.EaseOut(2 * b - 1) + 0.5
				}
			}
		},
		Loop: {
			Revert: 1,
			Reverse: 2
		}
	};
	Tweener = ig.Class.extend({
		_running: !1,
		_obj: {},
		_objStart: {},
		_objEnd: {},
		_objDelta: {},
		_props: {},
		_started: !1,
		_paused: !1,
		_loopIndex: !1,
		_elapsed: !1,
		_timer: !1,
		_value: 0,
		_startCallbackCalled: !1,
		_settings: {
			duration: !1,
			easing: ig.Tweener.Easing.Linear.EaseNone,
			delay: !1,
			onStart: !1,
			onComplete: !1,
			onUpdate: !1,
			onPause: !1,
			onResume: !1,
			loop: ig.Tweener.Loop.Revert,
			loopCount: 0,
			chains: []
		},
		init: function(b, c, d) {
			this._obj = b;
			c && ig.merge(this._props, c);
			d && ig.merge(this._settings, d)
		},
		start: function() {
			ig.Tweener.addTween(this);
			this._loopIndex = this._settings.loopCount;
			this._started = this._running = !0;
			this._elapsed = 0;
			this._timer = new ig.Timer;
			this._value = 0;
			for (var b in this._props) this._initEnd(b, this._props, this._objEnd);
			for (var c in this._objEnd) this._initStart(c, this._objEnd, this._obj, this._objStart), this._initDelta(c, this._objDelta, this._obj, this._objEnd);
			this._settings.onStart && (this._startCallbackCalled = !0);
			return this
		},
		_isEmptyArray: function(b) {
			return !(void 0 !== typeof b && 0 < b.length)
		},
		_initEnd: function(b, c, d) {
			if ("object" !== typeof c[b]) d[b] = c[b];
			else
				for (subprop in c[b]) d[b] || (d[b] = {}), this._initEnd(subprop, c[b], d[b])
		},
		_initStart: function(b, c, d, e) {
			if ("object" !== typeof d[b]) "undefined" !== typeof c[b] && (e[b] = d[b]);
			else
				for (var f in d[b]) e[b] || (e[b] = {}), "undefined" !== typeof c[b] && this._initStart(f, c[b], d[b], e[b])
		},
		_initDelta: function(b, c, d, e) {
			if ("object" !== typeof e[b]) c[b] = e[b] - d[b];
			else
				for (var f in e[b]) c[b] || (c[b] = {}), this._initDelta(f, c[b], d[b], e[b])
		},
		_propSet: function(b, c, d) {
			if ("object" !== typeof c[b]) d[b] = c[b];
			else
				for (var e in c[b]) d[b] || (d[b] = {}), this._propSet(e, c[b], d[b])
		},
		_propUpdate: function(b, c, d, e, f) {
			if ("object" !== typeof d[b]) c[b] = "undefined" != typeof d[b] ? d[b] + e[b] * f : c[b];
			else
				for (var g in d[b]) this._propUpdate(g, c[b], d[b], e[b], f)
		},
		update: function() {
			if (this._settings.onUpdate) this._settings.onUpdate(this._obj, this._value);
			if (!this._running) return !1;
			if (this._settings.delay) {
				if (this._timer && this._timer.delta() < this._settings.delay) return;
				this._settings.delay = 0;
				this._timer.reset()
			}
			this._startCallbackCalled && (this._settings.onStart(this._obj, this._value), this._startCallbackCalled = !1);
			var b = (this._timer.delta() + this._elapsed) / this._settings.duration,
				b = 1 < b ? 1 : b,
				c = this._settings.easing(b);
			this._value = c;
			for (var d in this._objDelta) this._propUpdate(d, this._obj, this._objStart, this._objDelta, c);
			if (1 <= b)
				if (0 === this._loopIndex || !this._settings.loop) {
					this._running = this._started = !1;
					this.value = 0;
					if (this._settings.onComplete) this._settings.onComplete(this._obj, this._value);
					if (!this._isEmptyArray(this._settings.chains))
						for (var e = 0; e < this._settings.chains.length; e++) this._settings.chains[e].start();
					ig.Tweener.removeTween(this)
				} else if (this._settings.loop === ig.Tweener.Loop.Revert) {
				for (var f in this._objStart) this._propSet(f, this._objStart, this._obj);
				this._elapsed = 0;
				this._timer.reset(); - 1 != this._loopIndex && this._loopIndex--
			} else if (this._settings.loop === ig.Tweener.Loop.Reverse) {
				b = {};
				c = {};
				ig.merge(b, this._objEnd);
				ig.merge(c, this._objStart);
				ig.merge(this._objStart, b);
				ig.merge(this._objEnd, c);
				for (e in this._objEnd) this._initDelta(e, this._objDelta, this._obj, this._objEnd);
				this._elapsed = 0;
				this._timer.reset(); - 1 != this._loopIndex && this._loopIndex--
			}
		},
		pause: function() {
			if (this._running && (this._running = !1, this._timer && this._timer.delta && (this._elapsed += this._timer.delta()), this._settings.onPause)) this._settings.onPause(this._obj, this._value);
			return this
		},
		resume: function() {
			if (this._started && !this._running && (this._running = !0, this._timer && this._timer.delta && this._timer.reset(), this._settings.onResume)) this._settings.onResume(this._obj, this._value);
			return this
		},
		stop: function(b) {
			b ? (this._loopIndex = 0, this._elapsed += this._settings.duration, this._running = !0, this.update()) : (this._running = this._started = !1, this.value = 0, ig.Tweener.removeTween(this));
			return this
		},
		to: function(b, c) {
			ig.merge(this._props, b);
			if (null !== c || void 0 !== c) this._settings.duration = c;
			return this
		},
		delay: function(b) {
			this._settings.delay = b;
			return this
		},
		speed: function(b) {
			this._settings.duration = b;
			return this
		},
		easing: function(b) {
			this._settings.easing = b;
			return this
		},
		yoyo: function(b) {
			this._settings.loop = b ? ig.Tweener.Loop.Reverse : ig.Tweener.Loop.Revert;
			return this
		},
		repeat: function(b) {
			this._settings.loopCount = b ? b : 0;
			return this
		},
		onStart: function(b) {
			this._settings.onStart = b;
			return this
		},
		onUpdate: function(b) {
			this._settings.onUpdate = b;
			return this
		},
		onPause: function(b) {
			this._settings.onPause = b;
			return this
		},
		onResume: function(b) {
			this._settings.onResume = b;
			return this
		},
		onComplete: function(b) {
			this._settings.onComplete = b;
			return this
		}
	})
});
ig.baked = !0;
ig.module("plugins.box2d.game").requires("plugins.box2d.lib", "impact.game", "plugins.addon.state-addon", "plugins.tweener").defines(function() {
	ig.Box2DGame = ig.Game.extend({
		collisionRects: [],
		debugCollisionRects: !1,
		worldVelocityIterations: 6,
		worldPositionIterations: 6,
		updateTimestep: 1 / 60,
		updateTimestepAccumulator: 0,
		updateTimestepAccumulatorRatio: 0,
		lastUpdateTime: -1,
		nWorldSteps: 0,
		bodyDestroyQueue: [],
		defaultTileSegmentsDef: {},
		defaultTileVerticesDef: {},
		loadLevel: function(b) {
			this.collisionMap = ig.CollisionMap.staticNoCollision;
			for (var c = 0; c < b.layer.length; c++) {
				var d = b.layer[c];
				"collision" == d.name && (this.collisionMap = new ig.CollisionMap(d.tilesize, d.data))
			}
			this.mergedShape = this.mergeRectangles(this.collisionMap);
			ig.world = this.createWorldFromCollisionMap(this.collisionMap, this.mergedShape);
			this.setupContactListener();
			this.parent(b)
		},
		createWorldFromMap: function(b, c, d, e) {
			var f = new Box2D.Collision.b2AABB;
			f.lowerBound.Set(0, 0);
			f.upperBound.Set((c + 1) * e * Box2D.SCALE, (d + 1) * e * Box2D.SCALE);
			f = new Box2D.Common.Math.b2Vec2(0, ig.game.gravity * Box2D.SCALE);
			world = new Box2D.Dynamics.b2World(f, !0);
			b = ig.copy(b);
			this.collisionRects = [];
			for (f = 0; f < d; f++)
				for (var g = 0; g < c; g++)
					if (b[f][g]) {
						var m = this._extractRectFromMap(b, c, d, g, f);
						this.collisionRects.push(m)
					}
			for (c = 0; c < this.collisionRects.length; c++) d = this.collisionRects[c], b = new Box2D.Dynamics.b2BodyDef, b.position.Set(d.x * e * Box2D.SCALE + d.width * e / 2 * Box2D.SCALE, d.y * e * Box2D.SCALE + d.height * e / 2 * Box2D.SCALE), b = world.CreateBody(b), f = new Box2D.Collision.Shapes.b2PolygonShape, f.SetAsBox(d.width * e / 2 * Box2D.SCALE, d.height * e / 2 * Box2D.SCALE), b.CreateFixture2(f);
			return world
		},
		_extractRectFromMap: function(b, c, d, e, f) {
			for (var g = {
					x: e,
					y: f,
					width: 1,
					height: 1
				}, m = e + 1; m < c && b[f][m]; m++) g.width++, b[f][m] = 0;
			for (c = f + 1; c < d; c++) {
				f = 0;
				for (m = e; m < e + g.width && b[c][m]; m++) f++;
				if (f == g.width) {
					g.height++;
					for (m = e; m < e + g.width; m++) b[c][m] = 0
				} else break
			}
			return g
		},
		update: function() {
			if (!ig.game.box2dPaused && ig.world) {
				var b = ig.system.clock.delta() - this.lastUpdateTime;
				this.lastUpdateTime = ig.system.clock.delta();
				this.updateTimestepAccumulator += b;
				this.nWorldSteps = Math.floor(this.updateTimestepAccumulator / this.updateTimestep);
				0 < this.nWorldSteps && (this.updateTimestepAccumulator -= this.nWorldSteps * this.updateTimestep);
				this.updateTimestepAccumulatorRatio = this.updateTimestepAccumulator / this.updateTimestep;
				for (var b = Math.min(this.nWorldSteps, 5), c = 0; c < b; c++) {
					this.resetSmoothStates();
					ig.world.Step(this.updateTimestep, this.worldVelocityIterations, this.worldPositionIterations);
					for (var d = ig.world.GetBodyList(); d; d = d.m_next)
						if (d.IsAwake()) {
							var e = d.GetFixtureList();
							if (!e || !e.IsSensor()) {
								var e = 0.6 > Math.abs(d.GetAngularVelocity()),
									f = 0.6 > Math.abs(d.GetLinearVelocity().Length());
								e && f ? 30 < d.slowTime ? (d.slowTime = 0, d.SetAwake(!1)) : d.slowTime += 1 : d.slowTime = 0
							}
						}
				}
				ig.world.ClearForces();
				this.smoothStates()
			}
			this.parent();
			if (0 < this.bodyDestroyQueue.length) {
				for (c = 0; c < this.bodyDestroyQueue.length; c++) ig.world.DestroyBody(this.bodyDestroyQueue[c]);
				this.bodyDestroyQueue = []
			}
		},
		smoothStates: function() {
			for (var b = 1 - this.updateTimestepAccumulatorRatio, c = 0; c < this.entities.length; c++) {
				var d = this.entities[c];
				null != d.body && d.dynamicType != Box2D.Dynamics.b2Body.b2_staticBody && (d.pos.x = this.updateTimestepAccumulatorRatio * d.body.GetPosition().x + b * d.previousBodyPosition.x, d.pos.y = this.updateTimestepAccumulatorRatio * d.body.GetPosition().y + b * d.previousBodyPosition.y, d.angle = this.updateTimestepAccumulatorRatio * d.body.GetAngle() + b * d.previousBodyAngle, d.currentAnim && (d.currentAnim.update(), d.currentAnim.angle = d.angle))
			}
		},
		resetSmoothStates: function() {
			for (var b = 0; b < this.entities.length; b++) {
				var c = this.entities[b];
				null != c.body && c.dynamicType != Box2D.Dynamics.b2Body.b2_staticBody && (c.pos.x = c.body.GetPosition().x, c.previousBodyPosition.x = c.pos.x, c.pos.y = c.body.GetPosition().y, c.previousBodyPosition.y = c.pos.y, c.angle = c.body.GetAngle(), c.previousBodyAngle = c.body.GetAngle(), c.currentAnim && (c.currentAnim.update(), c.currentAnim.angle = c.angle))
			}
		},
		draw: function() {
			this.parent();
			if (this.debugCollisionRects)
				for (var b = this.collisionMap.tilesize, c = 0; c < this.collisionRects.length; c++) {
					var d = this.collisionRects[c];
					ig.system.context.strokeStyle = "#00ff00";
					ig.system.context.strokeRect(ig.system.getDrawPos(d.x * b - this.screen.x), ig.system.getDrawPos(d.y * b - this.screen.y), ig.system.getDrawPos(d.width * b), ig.system.getDrawPos(d.height * b))
				}
		},
		queueDestroyBody: function(b) {
			this.bodyDestroyQueue.push(b)
		},
		mergeRectangles: function(b) {
			if (void 0 != b.data) {
				for (var c = ig.copy(b.data), d = [], e = 0; e < c.length; e++) {
					void 0 == d[e] && (d[e] = []);
					for (var f = 0; f < c[0].length; f++) d[e].push(0)
				}
				c = this._shapesFromCollisionMap(b);
				b = [];
				f = [];
				for (e = 0; e < c.length; e++) 1 == c[e].id ? (f.push(c[e]), d[c[e].tile.y][c[e].tile.x] = f[f.length - 1]) : b.push(c[e]);
				for (e = f.length - 1; 0 <= e; e--) 1 == f[e].id && (f[e].neighbours = this.checkNeighbour(d, f[e].tile.x, f[e].tile.y));
				d = this.linkSquares(f, d);
				return b = b.concat(d)
			}
		},
		sideAbleCheck: function(b, c, d, e) {
			return b ? b[d] ? b[d][c] ? b[d][c].neighbours ? -1 < b[d][c].neighbours.indexOf(e) ? !0 : !1 : !1 : !1 : !1 : !1
		},
		linkSquares: function(b, c) {
			for (var d = [], e = [], f = 0; f < b.length; f++) {
				var g = b[f],
					m = g.tile.x,
					l = g.tile.y;
				if (!(-1 < d.indexOf(g)))
					if (d.push(g), -1 < g.neighbours.indexOf("right")) {
						for (var j = 1; !0 == this.sideAbleCheck(c, g.tile.x + j, g.tile.y, "right");) g.tile.x + j < m && (m = g.tile.x + j), d.push(c[g.tile.y][g.tile.x + j]), j++;
						c[g.tile.y][m].settings.size.x *= j + 1;
						for (var q = c[g.tile.y][m].settings.vertices, z = 0; z < q.length; z++) q[z].x *= j + 1;
						d.push(c[g.tile.y][g.tile.x + j + 1]);
						e.push(c[g.tile.y][m])
					} else if (-1 < g.neighbours.indexOf("down") && -1 == g.neighbours.indexOf("right") && -1 == g.neighbours.indexOf("left")) {
					g.tile.y + j < l && (l = g.tile.y + j);
					q = 0;
					for (m = 1; !0 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "down") && !1 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "right") && !1 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "left");) q = 1, d.push(c[g.tile.y + m][g.tile.x]), m++;
					!0 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "up") && !1 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "right") && !1 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "left") ? q = 1 : !0 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "up") && !0 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "right") ? (d.splice(d.indexOf(c[g.tile.y + m][g.tile.x]), 1), m--) : !0 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "up") && !0 == this.sideAbleCheck(c, g.tile.x, g.tile.y + m, "left") && (d.splice(d.indexOf(c[g.tile.y + m][g.tile.x]), 1), m--);
					if (1 == q) {
						c[l][g.tile.x].settings.size.y *= m + 1;
						q = c[l][g.tile.x].settings.vertices;
						for (z = 0; z < q.length; z++) q[z].y *= m + 1;
						c[g.tile.y + m] && d.push(c[g.tile.y + m][g.tile.x])
					}
					e.push(c[l][g.tile.x])
				} else if (!(-1 < g.neighbours.indexOf("left")))
					if (-1 < g.neighbours.indexOf("up")) {
						if (!0 == this.sideAbleCheck(c, g.tile.x, g.tile.y - 1, "down") && (!0 == this.sideAbleCheck(c, g.tile.x, g.tile.y - 1, "right") || !0 == this.sideAbleCheck(c, g.tile.x, g.tile.y - 1, "left"))) d.push(c[g.tile.y][g.tile.x]), e.push(c[g.tile.y][g.tile.x])
					} else d.push(c[g.tile.y][g.tile.x]), e.push(c[g.tile.y][g.tile.x])
			}
			return e
		},
		getNeighbourTiles: function(b, c, d, e) {
			switch (e) {
				case "left":
					return [{
						x: c - 1,
						y: d
					}];
				case "right":
					return [{
						x: c + 1,
						y: d
					}];
				case "up":
					return [{
						x: c,
						y: d - 1
					}];
				case "down":
					return [{
						x: c,
						y: d + 1
					}];
				case "topL":
					return [{
						x: c,
						y: d - 1
					}, {
						x: c - 1,
						y: d
					}, {
						x: c - 1,
						y: d - 1
					}];
				case "topR":
					return [{
						x: c,
						y: d - 1
					}, {
						x: c + 1,
						y: d
					}, {
						x: c + 1,
						y: d - 1
					}];
				case "bottomL":
					return [{
						x: c,
						y: d + 1
					}, {
						x: c - 1,
						y: d
					}, {
						x: c -
							1,
						y: d + 1
					}];
				case "bottomR":
					return [{
						x: c,
						y: d + 1
					}, {
						x: c + 1,
						y: d
					}, {
						x: c + 1,
						y: d + 1
					}]
			}
		},
		checkNeighbour: function(b, c, d) {
			var e = [];
			0 != this.checkArr(b, c - 1, d) && e.push("left");
			0 != this.checkArr(b, c, d + 1) && e.push("down");
			0 != this.checkArr(b, c + 1, d) && e.push("right");
			0 != this.checkArr(b, c, d - 1) && e.push("up");
			return e
		},
		checkArr: function(b, c, d) {
			return void 0 == b[d] ? 0 : void 0 == b[d][c] ? 0 : b[d][c]
		},
		createWorldFromCollisionMap: function(b, c) {
			var d = new Box2D.Common.Math.b2Vec2(0, 0),
				d = new Box2D.Common.Math.b2Vec2(0, ig.game.gravity * Box2D.SCALE);
			world = new Box2D.Dynamics.b2World(d, !0);
			for (var d = void 0 != c ? c : this._shapesFromCollisionMap(this.collisionMap), e = 0; e < d.length; e++) {
				var f = d[e],
					g = f.settings.size.x,
					m = f.settings.size.y,
					l = f.settings.vertices,
					j = new Box2D.Dynamics.b2BodyDef;
				j.position.Set(f.x * Box2D.SCALE + g / 2 * Box2D.SCALE, f.y * Box2D.SCALE + m / 2 * Box2D.SCALE);
				g = world.CreateBody(j);
				f = new Box2D.Collision.Shapes.b2PolygonShape;
				f.SetAsArray(l, l.length);
				g.CreateFixture2(f)
			}
			return world
		},
		setupContactListener: function() {
			var b = function(b, c, f) {
					var g = c.GetFixtureA().GetBody().entity,
						m = c.GetFixtureB().GetBody().entity;
					if (g && m) g[b](m, c, f), m[b](g, c, f);
					else if (g && !m) g[b](null, c, f);
					else if (m && !g) m[b](null, c, f)
				},
				c = new Box2D.Dynamics.b2ContactListener;
			c.BeginContact = function(c) {
				b("beginContact", c)
			};
			c.EndContact = function(c) {
				b("endContact", c)
			};
			c.PostSolve = function(c, e) {
				b("postSolve", c, e)
			};
			c.PreSolve = function(c, e) {
				b("preSolve", c, e)
			};
			ig.world.SetContactListener(c)
		},
		_shapesFromCollisionMap: function(b) {
			var c = [];
			if (b instanceof ig.CollisionMap) {
				var d = ig.copy(b.data),
					e = b.tilesize,
					f = b.width,
					g = b.height,
					m, l, j, q, z, y, A, B, E, F;
				for (y = 0; y < g; y++)
					for (z = 0; z < f; z++) {
						F = this._shapeFromTile(b, z, y);
						E = {
							id: b.data[y][z],
							ix: z,
							iy: y,
							x: z * e,
							y: y * e,
							width: e,
							height: e,
							shape: F
						};
						if (0 < F.vertices.length) {
							l = [];
							m = F.vertices;
							j = F.segments;
							A = 0;
							for (B = j.length; A < B; A++) {
								q = j[A];
								var s = m[q.a],
									I = E.width / 20,
									G = E.height / 20;
								l[q.a] = {
									x: s.x.map(0, 1, -I, I),
									y: s.y.map(0, 1, -G, G)
								}
							}
							F.vertices = l;
							F.vertices[F.vertices.length - 1].x === F.vertices[0].x && F.vertices[F.vertices.length - 1].y === F.vertices[0].y && F.vertices.pop();
							m = {
								id: E.id,
								settings: {
									size: {
										x: E.width,
										y: E.height
									},
									vertices: ig.copy(F.vertices)
								},
								x: E.x,
								y: E.y,
								tile: {
									x: z,
									y: y
								}
							};
							c.push(m)
						}
						d[y][z] = E
					}
			}
			return c
		},
		_shapeFromTile: function(b, c, d) {
			var e;
			e = b.data[d][c];
			b = this._verticesFromTile(b, c, d);
			var f;
			if (b)
				if (this.defaultTileSegmentsDef[e]) f = this.defaultTileSegmentsDef[e];
				else {
					this.defaultTileSegmentsDef[e] = f = [];
					e = 0;
					for (c = b.length; e < c; e++) {
						var g = b[e];
						d = e === c - 1 ? 0 : e + 1;
						var m = b[d],
							l = m.x - g.x,
							g = m.y - g.y,
							m = Math.sqrt(l * l + g * g);
						f.push({
							a: e,
							b: d,
							normal: {
								x: g / m,
								y: -l / m
							}
						})
					}
				}
			return {
				vertices: b,
				segments: f || []
			}
		},
		_verticesFromTile: function(b, c, d) {
			c = b.data[d][c];
			if (this.defaultTileVerticesDef[c]) d = this.defaultTileVerticesDef[c];
			else if (1 === c) d = [{
				x: 0,
				y: 0
			}, {
				x: 1,
				y: 0
			}, {
				x: 1,
				y: 1
			}, {
				x: 0,
				y: 1
			}];
			else {
				d = [];
				if (b = b.tiledef[c]) {
					var e = d[0] = {
							x: b[0],
							y: b[1]
						},
						f = d[1] = {
							x: b[2],
							y: b[3]
						};
					b = e.x;
					var e = e.y,
						g = f.x,
						f = f.y,
						m = g - b,
						l = f - e,
						j = d[2] = {
							x: 0 > l ? 1 : 0,
							y: 0 < m ? 1 : 0
						},
						q = j.x,
						j = j.y,
						z;
					z = !1;
					if (1 > Math.abs(m) && 1 > Math.abs(l)) {
						var m = _utv2.pointQuadrant(b, e, 0.5, 0.5),
							l = _utv2.pointQuadrant(g, f, 0.5, 0.5),
							y = _utv2.pointQuadrant(q, j, 0.5, 0.5);
						!(m & y) && !(l & y) && (z = !0)
					}!0 === z ? (q !== j ? (z = q, l = j, 1 == q ? (j = 1, m = 0) : (j = 0, m = 1)) : (m = q, l = 1 == q ? z = 0 : z = 1), d[3] = {
						x: z,
						y: j
					}, d[4] = {
						x: m,
						y: l
					}) : (q !== j ? (z = q, l = j, 1 == q ? (j = Math.max(e, f), m = Math.min(b, g)) : (j = Math.min(e, f), m = Math.max(b, g))) : (m = q, 1 == q ? (z = Math.min(b, g), l = Math.min(e, f)) : (z = Math.max(b, g), l = Math.max(e, f))), z === b && j === e || z === g && j === f ? m === b && l === e || m === g && l === f || (d[3] = {
						x: m,
						y: l
					}) : d[3] = {
						x: z,
						y: j
					});
					d = this._pointsToConvexHull(d)
				}
				this.defaultTileVerticesDef[c] = d
			}
			return d
		},
		_pointsToConvexHull: function(b) {
			if (3 > b.length) return b;
			var c, d, e = 0,
				f = b[e],
				g;
			c = 1;
			for (d = b.length; c < d; c++) g = b[c], g.y === f.y ? g.x < f.x && (e = c, f = g) : g.y < f.y && (e = c, f = g);
			var m = [],
				l;
			c = 0;
			for (d = b.length; c < d; c++) c !== e && (g = b[c], l = {
				x: g.x,
				y: g.y
			}, l.angle = Math.atan((g.y - f.y) / (g.x - f.x)), 0 > l.angle && (l.angle += Math.PI), l.distance = (g.x - f.x) * (g.x - f.x) + (g.y - f.y) * (g.y - f.y), l.index = c, m.push(l));
			m.sort(function(b, c) {
				return b.angle < c.angle ? -1 : b.angle > c.angle ? 1 : b.distance < c.distance ? -1 : b.distance > c.distance ? 1 : 0
			});
			m.unshift(m[m.length - 1], {
				x: f.x,
				y: f.y,
				index: e
			});
			e = 2;
			c = 3;
			for (d = b.length; c <= d; c++) {
				for (; 0 >= this._pointsCW(m[e - 1], m[e], m[c]);) e--;
				e++;
				f = m[c];
				m[c] = m[e];
				m[e] = f
			}
			d = [];
			for (c = 0; c <= e; c++) d[c] = b[m[c].index];
			return d
		},
		_pointsCW: function(b, c, d) {
			return (c.x - b.x) * (d.y - b.y) - (c.y - b.y) * (d.x - b.x)
		}
	});
	Box2D.Common.b2Settings.b2_maxTranslation = 10;
	Box2D.Common.b2Settings.b2_maxTranslationSquared = 100;
	Box2D.Common.b2Settings.b2_velocityThreshold = 1
});
ig.baked = !0;
ig.module("plugins.box2d.entity").requires("game.entities.addon.sprite", "plugins.box2d.game").defines(function() {
	ig.Box2DEntity = EntitySprite.extend({
		body: null,
		angle: 0,
		box2dType: null,
		dynamicType: null,
		density: null,
		friction: null,
		restitution: null,
		rotate: 0,
		previousBodyPosition: {
			x: 0,
			y: 0
		},
		previousBodyAngle: 0,
		slowTime: 0,
		isReady: !1,
		createPhysic: !1,
		init: function(b, c, d) {
			this.parent(b, c, d);
			0 < this.rotate && (this.angle = this.rotate * Math.PI / 180);
			this.restitution = this.friction = this.density = this.dynamicType = this.box2dType = 0
		},
		setProperties: function(b, c) {
			this.parent(b, c)
		},
		createBody: function() {
			var b = new Box2D.Dynamics.b2BodyDef;
			b.position = new Box2D.Common.Math.b2Vec2((this.pos.x + this.size.x / 2) * Box2D.SCALE, (this.pos.y + this.size.y / 2) * Box2D.SCALE);
			this.previousBodyPosition = {
				x: b.position.x,
				y: b.position.y
			};
			this.rotate && (b.angle = this.rotate * Math.PI / 180);
			this.previousBodyAngle = b.angle;
			null == this.dynamicType || 0 == this.dynamicType ? b.type = Box2D.Dynamics.b2Body.b2_dynamicBody : 1 == this.dynamicType ? b.type = Box2D.Dynamics.b2Body.b2_kinematicBody : 2 == this.dynamicType && (b.type = Box2D.Dynamics.b2Body.b2_staticBody);
			this.body = ig.world.CreateBody(b);
			this.body.entity = this;
			b = this.fixture = new Box2D.Dynamics.b2FixtureDef;
			null == this.box2dType || 0 == this.box2dType ? (b.shape = new Box2D.Collision.Shapes.b2PolygonShape, b.shape.SetAsBox(this.size.x / 2 * Box2D.SCALE, this.size.y / 2 * Box2D.SCALE)) : 1 == this.box2dType ? (b.shape = new Box2D.Collision.Shapes.b2CircleShape, b.shape.SetRadius(this.size.x / 2 * Box2D.SCALE)) : 2 == this.box2dType && (b.shape = new Box2D.Collision.Shapes.b2PolygonShape, b.shape.SetAsArray(this.vertices, this.vertices.length));
			this.density && (b.density = this.density);
			this.friction && (b.friction = this.friction);
			this.restitution && (b.restitution = this.restitution);
			this.body.CreateFixture(b);
			this.body.SetUserData(this)
		},
		setBodyPosition: function(b) {
			b.x = b.x ? b.x : this.pos.x;
			b.y = b.y ? b.y : this.pos.y;
			b = new Box2D.Common.Math.b2Vec2((this.pos.x + this.size.x / 2) * Box2D.SCALE, (this.pos.y + this.size.y / 2) * Box2D.SCALE);
			this.body.SetPosition(b)
		},
		update: function() {
			this.parent();
			!this.isReady && this.createPhysic && (this.isReady = !0, this.createBody());
			if (this.body) {
				var b = this.body.GetPosition();
				this.previousBodyPosition = {
					x: this.pos.x,
					y: this.pos.y
				};
				var c = this.groupParent ? ig.game.parentPos(this.groupParent) : {
						x: 0,
						y: 0
					},
					d = c.x,
					c = c.y,
					e = this.width * this._scale.x,
					f = this.height * this._scale.y;
				this.tempPos = b = {
					x: b.x / Box2D.SCALE - this.size.x / 2,
					y: b.y / Box2D.SCALE - this.size.y / 2
				};
				var g = this.body.GetLinearVelocity();
				0 != g.x ? this.x = b.x + e * this.anchor.x - d : this.pos.x != b.x && this.setBodyPosition({
					x: this.pos.x
				});
				0 != g.y ? this.y = b.y + f * this.anchor.y - c : this.pos.y != b.y && this.setBodyPosition({
					y: this.pos.y
				});
				this.previousBodyAngle = this.angle;
				this.angle = this.body.GetAngle().round(2)
			}
		},
		setAngle: function(b) {
			this.rotation = this._angle = b
		},
		setRotation: function(b) {
			this._rotation = b
		},
		beginContact: function() {},
		endContact: function() {},
		postSolve: function() {},
		preSolve: function() {},
		processCollisionQueues: function() {
			for (var b in this.checkQueue) {
				var c = this.checkQueue[b];
				0 < this.entityContactCount[b] ? this.check(c) : delete this.checkQueue[b]
			}
			for (var d in this.collideQueue)
				for (b in this.collideQueue[d]) c = this.collideQueue[d][b], this.collideWith(c, d), delete this.collideQueue[d][b]
		},
		killBody: function() {
			this.body && (ig.game.queueDestroyBody(this.body), this.body = null)
		},
		kill: function() {
			this.killBody();
			this.parent()
		}
	})
});
ig.baked = !0;
ig.module("plugins.patches.webkit-image-smoothing-patch").defines(function() {
	ig.System && (ig.System.SCALE = {
		CRISP: function(b, c) {
			c.imageSmoothingEnabled = c.msImageSmoothingEnabled = c.mozImageSmoothingEnabled = c.oImageSmoothingEnabled = !1;
			b.style.imageRendering = "-moz-crisp-edges";
			b.style.imageRendering = "-o-crisp-edges";
			b.style.imageRendering = "-webkit-optimize-contrast";
			b.style.imageRendering = "crisp-edges";
			b.style.msInterpolationMode = "nearest-neighbor"
		},
		SMOOTH: function(b, c) {
			c.imageSmoothingEnabled = c.msImageSmoothingEnabled = c.mozImageSmoothingEnabled = c.oImageSmoothingEnabled = !0;
			b.style.imageRendering = "";
			b.style.msInterpolationMode = ""
		}
	}, ig.System.scaleMode = ig.System.SCALE.SMOOTH)
});
ig.baked = !0;
ig.module("plugins.patches.windowfocus-onMouseDown-patch").defines(function() {
	var b = !1;
	try {
		b = window.self !== window.top, !1 === b && (b = 0 < window.frames.length)
	} catch (c) {
		b = !0
	}
	ig.Input.inject({
		keydown: function(c) {
			var e = c.target.tagName;
			if (!("INPUT" == e || "TEXTAREA" == e))
				if (e = "keydown" == c.type ? c.keyCode : 2 == c.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1, b && 0 > e && window.focus(), ("touchstart" == c.type || "mousedown" == c.type) && this.mousemove(c), e = this.bindings[e]) this.actions[e] = !0, this.locks[e] || (this.presses[e] = !0, this.locks[e] = !0), c.stopPropagation(), c.preventDefault()
		}
	})
});
ig.baked = !0;
ig.module("plugins.handlers.dom-handler").defines(function() {
	ig.DomHandler = ig.Class.extend({
		JQUERYAVAILABLE: !1,
		init: function() {
			this.JQUERYAVAILABLE = this._jqueryAvailable()
		},
		_jqueryAvailable: function() {
			return "undefined" !== typeof jQuery
		},
		addEvent: function(b, c, d, e) {
			if (this.JQUERYAVAILABLE) b.on(c, d);
			else b.addEventListener(c, d, e)
		},
		create: function(b) {
			return this.JQUERYAVAILABLE ? $("<" + b + ">") : ig.$new(b)
		},
		getElementByClass: function(b) {
			return this.JQUERYAVAILABLE ? $("." + b) : document.getElementsByClassName(b)
		},
		getElementById: function(b) {
			return this.JQUERYAVAILABLE ? 0 < $(b).length ? $(b) : null : ig.$(b)
		},
		appendChild: function(b, c) {
			this.JQUERYAVAILABLE ? b.append(c) : b.appendChild(c)
		},
		appendToBody: function(b) {
			this.JQUERYAVAILABLE ? $("body").append(b) : document.body.appendChild(b)
		},
		resize: function(b, c, d) {
			if (this.JQUERYAVAILABLE) b.width(c.toFixed(2)), b.height(d.toFixed(2));
			else {
				var e = b.style.visibility;
				c = "width:" + c.toFixed(2) + "px; height:" + d.toFixed(2) + "px;";
				this.attr(b, "style", c);
				b.style.visibility = e
			}
		},
		resizeOffsetLeft: function(b, c, d, e) {
			if (this.JQUERYAVAILABLE) b.width(c.toFixed(2)), b.height(d.toFixed(2)), b.css("left", e);
			else {
				var f = b.style.visibility;
				c = "width:" + c.toFixed(2) + "px; height:" + d.toFixed(2) + "px; left: " + e.toFixed(2) + "px;";
				this.attr(b, "style", c);
				b.style.visibility = f
			}
		},
		resizeOffset: function(b, c, d, e, f) {
			if (this.JQUERYAVAILABLE) b.width(c.toFixed(2)), b.height(d.toFixed(2)), b.css("left", e), b.css("top", f);
			else {
				var g = b.style.visibility;
				c = "width:" + c.toFixed(2) + "px; height:" + d.toFixed(2) + "px; left: " + e.toFixed(2) + "px; top: " +
					f.toFixed(2) + "px;";
				this.attr(b, "style", c);
				b.style.visibility = g
			}
		},
		css: function(b, c) {
			if (this.JQUERYAVAILABLE) b.css(c);
			else {
				var d = "",
					e;
				for (e in c) d += e + ":" + c[e] + ";";
				this.attr(b, "style", d)
			}
		},
		getOffsets: function(b) {
			return this.JQUERYAVAILABLE ? (b = b.offset(), {
				left: b.left,
				top: b.top
			}) : {
				left: b.offsetLeft,
				top: b.offsetTop
			}
		},
		attr: function(b, c, d) {
			if ("undefined" === typeof d) return this.JQUERYAVAILABLE ? b.attr(c) : b.getAttribute(c);
			this.JQUERYAVAILABLE ? b.attr(c, d) : b.setAttribute(c, d)
		},
		show: function(b) {
			this.JQUERYAVAILABLE ? (b.show(), b.css("visibility", "visible")) : b && (b.style ? b.style.visibility = "visible" : b[0] && (b[0].style.visibility = "visible"))
		},
		hide: function(b) {
			this.JQUERYAVAILABLE ? (b.hide(), b.css("visibility", "hidden")) : b && (b.style ? b.style.visibility = "hidden" : b[0] && (b[0].style.visibility = "hidden"))
		},
		getQueryVariable: function(b) {
			for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
				var e = c[d].split("=");
				if (decodeURIComponent(e[0]) == b) return decodeURIComponent(e[1])
			}
		},
		forcedDeviceDetection: function() {
			var b = this.getQueryVariable("device");
			if (b) switch (b) {
				case "mobile":
					console.log("serving mobile version ...");
					ig.ua.mobile = !0;
					break;
				case "desktop":
					console.log("serving desktop version ...");
					ig.ua.mobile = !1;
					break;
				default:
					console.log("serving universal version ...")
			} else console.log("serving universal version ...")
		},
		forcedDeviceRotation: function() {
			var b = this.getQueryVariable("force-rotate");
			if (b) switch (b) {
				case "portrait":
					console.log("force rotate to portrait");
					window.orientation = 0;
					break;
				case "landscape":
					console.log("force rotate to horizontal");
					window.orientation = 90;
					break;
				default:
					alert("wrong command/type in param force-rotate. Defaulting value to portrait"), window.orientation = 0
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.data.vector").defines(function() {
	Vector2 = function(b, c) {
		this.x = b || 0;
		this.y = c || 0
	};
	Vector2.prototype = {
		valType: "number",
		neg: function() {
			this.x = -this.x;
			this.y = -this.y;
			return this
		},
		row: function(b) {
			typeof b === this.valType && (this.y = b);
			return this.y
		},
		col: function(b) {
			typeof b === this.valType && (this.x = b);
			return this.x
		},
		add: function(b) {
			b instanceof Vector2 ? (this.x += b.x, this.y += b.y) : (this.x += b, this.y += b);
			return this
		},
		sub: function(b) {
			b instanceof Vector2 ? (this.x -= b.x, this.y -= b.y) : (this.x -= b, this.y -= b);
			return this
		},
		mul: function(b) {
			b instanceof Vector2 ? (this.x *= b.x, this.y *= b.y) : (this.x *= b, this.y *= b);
			return this
		},
		div: function(b) {
			b instanceof Vector2 ? (0 != b.x && (this.x /= b.x), 0 != b.y && (this.y /= b.y)) : 0 != b && (this.x /= b, this.y /= b);
			return this
		},
		equals: function(b) {
			return this.x == b.x && this.y == b.y
		},
		dot: function(b) {
			return this.x * b.x + this.y * b.y
		},
		cross: function(b) {
			return this.x * b.y - this.y * b.x
		},
		length: function() {
			return Math.sqrt(this.dot(this))
		},
		norm: function() {
			return this.divide(this.length())
		},
		min: function() {
			return Math.min(this.x, this.y)
		},
		max: function() {
			return Math.max(this.x, this.y)
		},
		toAngles: function() {
			return -Math.atan2(-this.y, this.x)
		},
		angleTo: function(b) {
			return Math.acos(this.dot(b) / (this.length() * b.length()))
		},
		toArray: function(b) {
			return [this.x, this.y].slice(0, b || 2)
		},
		clone: function() {
			return new Vector2(this.x, this.y)
		},
		set: function(b, c) {
			this.x = b;
			this.y = c;
			return this
		},
		unit: function() {
			var b = this.length();
			if (0 < b) return new Vector2(this.x / b, this.y / b);
			throw "Divide by 0 error in unitVector function of vector:" + this;
		},
		turnRight: function() {
			var b = this.x;
			this.x = -this.y;
			this.y = b;
			return this
		},
		turnLeft: function() {
			var b = this.x;
			this.x = this.y;
			this.y = -b;
			return this
		},
		rotate: function(b) {
			var c = this.clone();
			this.x = c.x * Math.cos(b) - c.y * Math.sin(b);
			this.y = c.x * Math.sin(b) + c.y * Math.cos(b);
			return this
		}
	};
	Vector2.negative = function(b) {
		return new Vector2(-b.x, -b.y)
	};
	Vector2.add = function(b, c) {
		return c instanceof Vector2 ? new Vector2(b.x + c.x, b.y + c.y) : new Vector2(b.x + v, b.y + v)
	};
	Vector2.subtract = function(b, c) {
		return c instanceof Vector2 ? new Vector2(b.x - c.x, b.y - c.y) : new Vector2(b.x - v, b.y - v)
	};
	Vector2.multiply = function(b, c) {
		return c instanceof Vector2 ? new Vector2(b.x * c.x, b.y * c.y) : new Vector2(b.x * v, b.y * v)
	};
	Vector2.divide = function(b, c) {
		return c instanceof Vector2 ? new Vector2(b.x / c.x, b.y / c.y) : new Vector2(b.x / v, b.y / v)
	};
	Vector2.equals = function(b, c) {
		return b.x == c.x && b.y == c.y
	};
	Vector2.dot = function(b, c) {
		return b.x * c.x + b.y * c.y
	};
	Vector2.cross = function(b, c) {
		return b.x * c.y - b.y * c.x
	}
});
ig.baked = !0;
ig.module("plugins.handlers.size-handler").requires("plugins.data.vector").defines(function() {
	ig.SizeHandler = ig.Class.extend({
		portraitMode: !1,
		disableStretchToFitOnMobileFlag: !1,
		enableStretchToFitOnAntiPortraitModeFlag: !0,
		enableScalingLimitsOnMobileFlag: !1,
		minScalingOnMobile: 0,
		maxScalingOnMobile: 1,
		enableStretchToFitOnDesktopFlag: !1,
		enableScalingLimitsOnDesktopFlag: !1,
		minScalingOnDesktop: 0,
		maxScalingOnDesktop: 1,
		desktop: {
			actualSize: new Vector2(window.innerWidth, window.innerHeight),
			actualResolution: new Vector2(960, 540)
		},
		mobile: {
			actualSize: new Vector2(window.innerWidth, window.innerHeight),
			actualResolution: new Vector2(960, 540)
		},
		windowSize: new Vector2(window.innerWidth, window.innerHeight),
		scaleRatioMultiplier: new Vector2(1, 1),
		sizeRatio: new Vector2(1, 1),
		scale: 1,
		domHandler: null,
		dynamicClickableEntityDivs: {},
		coreDivsToResize: ["#canvas", "#play", "#orientate"],
		adsToResize: { 
		},
		init: function(b) {
			this.domHandler = b;
			if ("undefined" === typeof b) throw "undefined Dom Handler for Size Handler";
			this.sizeCalcs();
			this.eventListenerSetup();
			this.samsungFix()
		},
		sizeCalcs: function() {
			this.windowSize = new Vector2(window.innerWidth, window.innerHeight);
			if (ig.ua.mobile) {
				this.mobile.actualSize = new Vector2(window.innerWidth, window.innerHeight);
				var b = new Vector2(this.mobile.actualResolution.x, this.mobile.actualResolution.y);
				this.scaleRatioMultiplier = new Vector2(this.mobile.actualSize.x / b.x, this.mobile.actualSize.y / b.y);
				if (this.disableStretchToFitOnMobileFlag) {
					var c = Math.min(this.scaleRatioMultiplier.x, this.scaleRatioMultiplier.y);
					this.enableScalingLimitsOnMobileFlag && (c > this.maxScalingOnMobile && (c = this.maxScalingOnMobile), c < this.maxScalingOnMobile && (c = this.maxScalingOnMobile));
					this.mobile.actualSize.x = b.x * c;
					this.mobile.actualSize.y = b.y * c;
					this.scaleRatioMultiplier.x = c;
					this.scaleRatioMultiplier.y = c
				} else this.sizeRatio.x = this.scaleRatioMultiplier.x, this.sizeRatio.y = this.scaleRatioMultiplier.y, this.scaleRatioMultiplier.x = 1, this.scaleRatioMultiplier.y = 1
			} else this.desktop.actualSize = new Vector2(window.innerWidth, window.innerHeight), b = new Vector2(this.desktop.actualResolution.x, this.desktop.actualResolution.y), this.scaleRatioMultiplier = new Vector2(this.desktop.actualSize.x / b.x, this.desktop.actualSize.y / b.y), this.enableStretchToFitOnDesktopFlag ? (this.sizeRatio.x = this.scaleRatioMultiplier.x, this.sizeRatio.y = this.scaleRatioMultiplier.y, this.scaleRatioMultiplier.x = 1, this.scaleRatioMultiplier.y = 1) : (c = Math.min(this.scaleRatioMultiplier.x, this.scaleRatioMultiplier.y), this.enableScalingLimitsOnDesktopFlag && (c > this.maxScalingOnDesktop && (c = this.maxScalingOnDesktop), c < this.minScalingOnDesktop && (c = this.minScalingOnDesktop)), this.desktop.actualSize.x = b.x * c, this.desktop.actualSize.y = b.y * c, this.scaleRatioMultiplier.x = c, this.scaleRatioMultiplier.y = c)
		},
		resizeLayers: function() {
			for (var b = 0; b < this.coreDivsToResize.length; b++) {
				var c = ig.domHandler.getElementById(this.coreDivsToResize[b]);
				if (ig.ua.mobile)
					if (this.disableStretchToFitOnMobileFlag) {
						var d = Math.floor(ig.sizeHandler.windowSize.x / 2 - ig.sizeHandler.mobile.actualSize.x / 2),
							e = Math.floor(ig.sizeHandler.windowSize.y / 2 - ig.sizeHandler.mobile.actualSize.y / 2);
						0 > d && (d = 0);
						0 > e && (e = 0);
						ig.domHandler.resizeOffset(c, Math.floor(ig.sizeHandler.mobile.actualSize.x), Math.floor(ig.sizeHandler.mobile.actualSize.y), d, e);
						var f = !1;
						if (f = this.portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth)
							if (this.enableStretchToFitOnAntiPortraitModeFlag) ig.domHandler.resizeOffset(c, Math.floor(window.innerWidth), Math.floor(window.innerHeight), 0, 0);
							else {
								var f = new Vector2(window.innerWidth / this.mobile.actualResolution.y, window.innerHeight / this.mobile.actualResolution.x),
									d = Math.min(f.x, f.y),
									f = this.mobile.actualResolution.y * d,
									g = this.mobile.actualResolution.x * d,
									d = Math.floor(ig.sizeHandler.windowSize.x / 2 - f / 2),
									e = Math.floor(ig.sizeHandler.windowSize.y / 2 - g / 2);
								0 > d && (d = 0);
								0 > e && (e = 0);
								ig.domHandler.resizeOffset(c, Math.floor(f), Math.floor(g), d, e)
							}
					} else ig.domHandler.resize(c, Math.floor(ig.sizeHandler.mobile.actualSize.x), Math.floor(ig.sizeHandler.mobile.actualSize.y));
				else this.enableStretchToFitOnDesktopFlag ? ig.domHandler.resize(c, Math.floor(ig.sizeHandler.desktop.actualSize.x), Math.floor(ig.sizeHandler.desktop.actualSize.y)) : (d = Math.floor(ig.sizeHandler.windowSize.x / 2 - ig.sizeHandler.desktop.actualSize.x / 2), e = Math.floor(ig.sizeHandler.windowSize.y / 2 - ig.sizeHandler.desktop.actualSize.y / 2), 0 > d && (d = 0), 0 > e && (e = 0), ig.domHandler.resizeOffset(c, Math.floor(ig.sizeHandler.desktop.actualSize.x), Math.floor(ig.sizeHandler.desktop.actualSize.y), d, e))
			}
			for (var m in this.adsToResize) b = ig.domHandler.getElementById("#" + m), c = ig.domHandler.getElementById("#" + m + "-Box"), f = (window.innerWidth - this.adsToResize[m]["box-width"]) / 2 + "px", d = (window.innerHeight - this.adsToResize[m]["box-height"]) / 2 + "px", b && ig.domHandler.css(b, {
				width: window.innerWidth,
				height: window.innerHeight
			}), c && ig.domHandler.css(c, {
				left: f,
				top: d
			});
			for (m in this.dynamicClickableEntityDivs) {
				b = Math.min(ig.sizeHandler.scaleRatioMultiplier.x, ig.sizeHandler.scaleRatioMultiplier.y);
				c = ig.domHandler.getElementById("#" +
					m);
				if (ig.ua.mobile) var l = this.dynamicClickableEntityDivs[m].entity_pos_x,
					g = this.dynamicClickableEntityDivs[m].entity_pos_y,
					d = this.dynamicClickableEntityDivs[m].width,
					f = this.dynamicClickableEntityDivs[m].height,
					e = Math.floor(l * this.scaleRatioMultiplier.x) + "px",
					g = Math.floor(g * this.scaleRatioMultiplier.y) + "px",
					d = Math.floor(d * this.scaleRatioMultiplier.x) + "px",
					f = Math.floor(f * this.scaleRatioMultiplier.y) + "px";
				else var f = ig.domHandler.getElementById("#canvas"),
					f = ig.domHandler.getOffsets(f),
					e = f.left,
					j = f.top,
					l = this.dynamicClickableEntityDivs[m].entity_pos_x,
					g = this.dynamicClickableEntityDivs[m].entity_pos_y,
					d = this.dynamicClickableEntityDivs[m].width,
					f = this.dynamicClickableEntityDivs[m].height,
					e = Math.floor(e + l * b) + "px",
					g = Math.floor(j + g * b) + "px",
					d = Math.floor(d * b) + "px",
					f = Math.floor(f * b) + "px";
				ig.domHandler.css(c, {
					"float": "left",
					position: "absolute",
					left: e,
					top: g,
					width: d,
					height: f,
					"z-index": 3
				});
				this.dynamicClickableEntityDivs[m]["font-size"] && ig.domHandler.css(c, {
					"font-size": this.dynamicClickableEntityDivs[m]["font-size"] * b + "px"
				})
			}
		},
		resize: function() {
			this.sizeCalcs();
			this.resizeLayers()
		},
		reorient: function() {
			console.log("changing orientation ...");
			if (ig.ua.mobile) {
				var b = !1,
					b = this.portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth,
					c = this.domHandler.getElementById("#orientate"),
					d = this.domHandler.getElementById("#game");
				b ? (this.domHandler.show(c), this.domHandler.hide(d), console.log("portrait" + window.innerWidth + "," + window.innerHeight)) : (this.domHandler.show(d), this.domHandler.hide(c), console.log("landscape" + window.innerWidth + "," + window.innerHeight))
			}
			ig.ua.mobile ? (this.resize(), this.resizeAds()) : this.resize()
		},
		resizeAds: function() {
			for (var b in this.adsToResize) {
				var c = ig.domHandler.getElementById("#" + b),
					d = ig.domHandler.getElementById("#" + b + "-Box"),
					e = (window.innerWidth - this.adsToResize[b]["box-width"]) / 2 + "px",
					f = (window.innerHeight - this.adsToResize[b]["box-height"]) / 2 + "px";
				c && ig.domHandler.css(c, {
					width: window.innerWidth,
					height: window.innerHeight
				});
				d && ig.domHandler.css(d, {
					left: e,
					top: f
				})
			}
		},
		samsungFix: function() {
			ig.ua.android && (!(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && !(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox"))) && (document.addEventListener("touchstart", function(b) {
				b.preventDefault();
				return !1
			}, !1), document.addEventListener("touchmove", function(b) {
				b.preventDefault();
				return !1
			}, !1), document.addEventListener("touchend", function(b) {
				b.preventDefault();
				return !1
			}, !1))
		},
		orientationInterval: null,
		orientationTimeout: null,
		orientationHandler: function() {
			this.reorient();
			window.scrollTo(0, 1)
		},
		orientationDelayHandler: function() {
			null == this.orientationInterval && (this.orientationInterval = window.setInterval(this.orientationHandler.bind(this), 100));
			null == this.orientationTimeout && (this.orientationTimeout = window.setTimeout(function() {
				this.clearAllIntervals()
			}.bind(this), 2E3))
		},
		clearAllIntervals: function() {
			window.clearInterval(this.orientationInterval);
			this.orientationInterval = null;
			window.clearTimeout(this.orientationTimeout);
			this.orientationTimeout = null
		},
		eventListenerSetup: function() {
			ig.ua.iOS ? (window.addEventListener("orientationchange", this.orientationDelayHandler.bind(this)), window.addEventListener("resize", this.orientationDelayHandler.bind(this))) : (window.addEventListener("orientationchange", this.orientationHandler.bind(this)), window.addEventListener("resize", this.orientationHandler.bind(this)));
			document.ontouchmove = function(b) {
				window.scrollTo(0, 1);
				b.preventDefault()
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.handlers.api-handler").defines(function() {
	ig.ApiHandler = ig.Class.extend({
		apiAvailable: {
			MJSPreroll: function() {
				// ig.ua.mobile && ig.domHandler.JQUERYAVAILABLE && _SETTINGS && _SETTINGS.Ad.Mobile.Preroll.Enabled && MobileAdInGamePreroll.Initialize()
			},
			MJSHeader: function() {
				// ig.ua.mobile && ig.domHandler.JQUERYAVAILABLE && _SETTINGS.Ad.Mobile.Header.Enabled && MobileAdInGameHeader.Initialize()
			},
			MJSFooter: function() {
				// ig.ua.mobile && ig.domHandler.JQUERYAVAILABLE && _SETTINGS.Ad.Mobile.Footer.Enabled && MobileAdInGameFooter.Initialize()
			},
			MJSEnd: function() {
				// ig.ua.mobile && ig.domHandler.JQUERYAVAILABLE && _SETTINGS.Ad.Mobile.End.Enabled && MobileAdInGameEnd.Initialize()
			}
		},
		run: function(b, c) {
			if (this.apiAvailable[b]) this.apiAvailable[b](c)
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.sound-player").defines(function() {
	SoundPlayer = ig.Class.extend({
		tagName: "SoundPlayer",
		stayMuteFlag: !1,
		debug: !1,
		init: function() {
			this.debug && console.log(this.tagName)
		},
		play: function(b) {
			this.debug && console.log("play sound ", b)
		},
		stop: function() {
			this.debug && console.log("stop sound ")
		},
		volume: function() {
			this.debug && console.log("set volume")
		},
		mute: function(b) {
			this.debug && console.log("mute");
			"undefined" === typeof b ? this.stayMuteFlag = !0 : b && (this.stayMuteFlag = !0)
		},
		unmute: function(b) {
			this.debug && console.log("unmute");
			"undefined" === typeof b ? this.stayMuteFlag = !1 : b && (this.stayMuteFlag = !1)
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.impact-music-player").requires("plugins.audio.sound-player").defines(function() {
	ImpactMusicPlayer = SoundPlayer.extend({
		tagName: "ImpactMusicPlayer",
		bgmPlaying: !1,
		soundList: {},
		init: function(b, c) {
			this.parent(b, c);
			for (var d in b) this.soundList[d] = d, ig.music.add(b[d].path + ".*", d);
			c && c.loop && (ig.music.loop = c.loop)
		},
		play: function(b) {
			this.stayMuteFlag || (this.bgmPlaying = !0, "undefined" === typeof b ? ig.music.play(b) : ig.music.play())
		},
		stop: function() {
			this.bgmPlaying = !1;
			ig.music.pause()
		},
		volume: function(b) {
			console.log("impactmusic:", b);
			ig.music.volume = 0 > b ? 0 : isNaN(b) ? 1 : 1 < b ? 1 : b
		},
		getVolume: function() {
			return ig.music.volume
		},
		mute: function(b) {
			this.parent(b);
			this.bgmPlaying && this.stop()
		},
		unmute: function(b) {
			this.parent(b);
			this.play()
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.impact-sound-player").requires("plugins.audio.sound-player").defines(function() {
	ImpactSoundPlayer = SoundPlayer.extend({
		tagName: "ImpactSoundPlayer",
		soundList: {},
		init: function(b, c) {
			this.parent(b, c);
			for (var d in b) {
				var e = new ig.Sound(b[d].path + ".*");
				this.soundList[d] = e
			}
		},
		play: function(b) {
			this.stayMuteFlag || ("object" === typeof b ? (console.log(b + " exists"), b.play()) : "string" === typeof b && this.soundList[b].play())
		},
		stop: function(b) {
			this.parent(b);
			b.stop()
		},
		volume: function(b) {
			ig.soundManager.volume = 0 > b ? 0 : isNaN(b) ? 1 : 1 < b ? 1 : b
		},
		getVolume: function() {
			return ig.soundManager.volume
		},
		mute: function(b) {
			this.parent(b);
			ig.Sound.enabled = !1
		},
		unmute: function(b) {
			this.parent(b);
			ig.Sound.enabled = !0
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.howler-player").requires("plugins.audio.sound-player").defines(function() {
	HowlerPlayer = SoundPlayer.extend({
		tagName: "HowlerPlayer",
		soundList: {},
		init: function(b, c) {
			this.parent(b, c);
			for (var d in b) {
				var e = b[d].path,
					e = new Howl({
						src: [e + "." + ig.Sound.FORMAT.OGG.ext, e + "." + ig.Sound.FORMAT.MP3.ext]
					});
				this.soundList[d] = e
			}
		},
		play: function(b) {
			this.stayMuteFlag || ("object" === typeof b ? b.play() : "string" === typeof b && this.soundList[b].play())
		},
		stop: function(b) {
			this.parent(b);
			"object" === typeof b ? b.stop() : "string" === typeof b && this.soundList[b].stop()
		},
		volume: function(b) {
			for (var c in this.soundList) {
				if (0 > b) {
					this.soundList[c].volume(0);
					break
				}
				isNaN(b) ? this.soundList[c].volume(1) : 1 < b ? this.soundList[c].volume(1) : this.soundList[c].volume(b)
			}
		},
		getVolume: function() {
			for (var b in this.soundList) return this.soundList[b].volume()
		},
		mute: function(b) {
			this.parent(b);
			Howler.mute(!0)
		},
		unmute: function(b) {
			this.parent(b);
			Howler.mute(!1)
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.howler-music-player").requires("plugins.audio.sound-player").defines(function() {
	HowlerMusicPlayer = SoundPlayer.extend({
		tagName: "HowlerMusicPlayer",
		bgmPlaying: !1,
		soundList: {},
		init: function(b, c) {
			this.parent(b, c);
			for (var d in b) {
				var e = b[d].path,
					e = new Howl({
						src: [e + "." + ig.Sound.FORMAT.OGG.ext, e + "." + ig.Sound.FORMAT.MP3.ext],
						loop: !0,
						autoplay: !1,
						onend: function() {}.bind(this)
					});
				this.soundList[d] = e
			}
		},
		play: function(b) {
			if (!this.stayMuteFlag && !this.bgmPlaying)
				if ("object" === typeof b) this.bgmPlaying = !0, b.play();
				else if ("string" === typeof b) this.bgmPlaying = !0, this.soundList[b].play();
			else
				for (var c in this.soundList) {
					this.soundList[c].play();
					this.bgmPlaying = !0;
					break
				}
		},
		stop: function(b) {
			this.parent(b);
			if (this.bgmPlaying) {
				for (var c in this.soundList) this.soundList[c].stop();
				this.bgmPlaying = !1
			}
		},
		volume: function(b) {
			console.log("howler", b);
			for (var c in this.soundList) {
				if (0 > b) {
					this.soundList[c].volume(0);
					break
				}
				isNaN(b) ? this.soundList[c].volume(1) : 1 < b ? this.soundList[c].volume(1) : this.soundList[c].volume(b)
			}
		},
		getVolume: function() {
			for (var b in this.soundList) return this.soundList[b].volume()
		},
		mute: function(b) {
			this.parent(b);
			Howler.mute(!0)
		},
		unmute: function(b) {
			this.parent(b);
			Howler.mute(!1)
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.jukebox-player").requires("plugins.audio.sound-player").defines(function() {
	JukeboxPlayer = SoundPlayer.extend({
		tagName: "JukeboxPlayer",
		bgmPlaying: !1,
		soundList: {},
		jukeboxPlayer: null,
		pausePosition: 0,
		premuteVolume: 0,
		minVolume: 0.001,
		init: function(b, c) {
			this.parent(b, c);
			for (var d in b) {
				this.soundList[d] = d;
				var e = b[d].path;
				this.jukeboxPlayer = new jukebox.Player({
					resources: [e + "." + ig.Sound.FORMAT.OGG.ext, e + "." + ig.Sound.FORMAT.MP3.ext],
					autoplay: !1,
					spritemap: {
						music: {
							start: b[d].startMp3,
							end: b[d].endMp3,
							loop: !0
						}
					}
				})
			}
		},
		play: function() {
			this.stayMuteFlag || (this.bgmPlaying = !0, this.pausePosition ? (console.log("resume"), this.jukeboxPlayer.resume(this.pausePosition)) : (console.log("play"), this.jukeboxPlayer.play(this.jukeboxPlayer.settings.spritemap.music.start, !0)), this.premuteVolume = this.getVolume())
		},
		stop: function() {
			this.bgmPlaying = !1;
			this.pausePosition = this.jukeboxPlayer.pause()
		},
		volume: function(b) {
			console.log("jukebox:", b);
			0 >= b ? this.jukeboxPlayer.setVolume(this.minVolume) : isNaN(b) ? this.jukeboxPlayer.setVolume(1) : 1 < b ? this.jukeboxPlayer.setVolume(1) : this.jukeboxPlayer.setVolume(b)
		},
		getVolume: function() {
			return this.jukeboxPlayer.getVolume()
		},
		mute: function(b) {
			this.parent(b);
			this.bgmPlaying && (console.log("jukebox", this.premuteVolume), this.stayMuteFlag || (this.premuteVolume = this.getVolume()), this.jukeboxPlayer.pause(), this.jukeboxPlayer.setVolume(this.minVolume))
		},
		unmute: function(b) {
			this.parent(b);
			this.stayMuteFlag || (console.log("jukebox", this.premuteVolume), this.jukeboxPlayer.setVolume(this.premuteVolume), this.jukeboxPlayer.resume())
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.webaudio-music-player").requires("plugins.audio.sound-player").defines(function() {
	WebaudioMusicPlayer = SoundPlayer.extend({
		tagName: "WebaudioMusicPlayer",
		bgmPlaying: !1,
		isSupported: !1,
		muteFlag: !1,
		pausedTime: 0,
		webaudio: null,
		useHTML5Audio: !1,
		audio: null,
		inactiveAudio: null,
		codecs: null,
		reinitOnPlay: !1,
		inputList: null,
		_volume: 1,
		soundList: {},
		init: function(b) {
			this.webaudio = {
				compatibility: {},
				gainNode: null,
				buffer: null,
				source_loop: {},
				source_once: {}
			};
			try {
				Howler && Howler.ctx ? this.webaudio.context = Howler.ctx : ig && ig.webaudio_ctx ? this.webaudio.context = ig.webaudio_ctx : (this.AudioContext = window.AudioContext || window.webkitAudioContext, this.webaudio.context = new this.AudioContext, ig.webaudio_ctx = this.webaudio.context), this.isSupported = !0
			} catch (c) {
				console.log("Web Audio API not supported in this browser."), this.webaudio = null, this.useHTML5Audio = !0
			}
			if (this.useHTML5Audio)
				if ("undefined" !== typeof Audio) try {
					new Audio
				} catch (d) {
					this.useHTML5Audio = !1
				} else this.useHTML5Audio = !1;
			this.useHTML5Audio && (this.audio = new Audio, this.isSupported = !0, this.initHTML5Audio(b));
			if (!this.isSupported) return null;
			this.webaudio && (this.inputList = b, this.initWebAudio(b))
		},
		initWebAudio: function(b) {
			ig.ua.iOS && this.initIOSWebAudioUnlock();
			this.webaudio.gainNode = this.webaudio.context.createGain();
			this.webaudio.gainNode.connect(this.webaudio.context.destination);
			this.webaudio.gainNode.gain.value = this._volume;
			this.webaudio.buffer = null;
			var c = "start",
				d = "stop",
				e = this.webaudio.context.createBufferSource();
			"function" !== typeof e.start && (c = "noteOn");
			this.webaudio.compatibility.start = c;
			"function" !== typeof e.stop && (d = "noteOff");
			this.webaudio.compatibility.stop = d;
			for (var f in b) {
				this.soundList[f] = f;
				var d = b[f].path,
					c = d + "." + ig.Sound.FORMAT.MP3.ext,
					g = d + "." + ig.Sound.FORMAT.OGG.ext;
				ig.ua.mobile ? ig.ua.iOS && (g = c) : (d = navigator.userAgent.toLowerCase(), -1 != d.indexOf("safari") && -1 >= d.indexOf("chrome") && (g = c), d.indexOf("win64") && (g = c));
				var m = new XMLHttpRequest;
				m.open("GET", g, !0);
				m.responseType = "arraybuffer";
				m.onload = function() {
					this.webaudio.context.decodeAudioData(m.response, function(b) {
						this.webaudio.buffer = b;
						this.webaudio.source_loop = {};
						this.bgmPlaying ? this.play(null, !0) : this.stop()
					}.bind(this), function() {
						console.log('Error decoding audio "' + g + '".')
					})
				}.bind(this);
				m.send();
				if (4 == m.readyState && "undefined" !== typeof Audio) {
					this.useHTML5Audio = !0;
					try {
						new Audio
					} catch (l) {
						this.useHTML5Audio = !1
					}
					this.useHTML5Audio && (console.log("Using HTML5 Audio"), this.webaudio = null, this.audio = new Audio, this.isSupported = !0, this.initHTML5Audio(b))
				}
				break
			}
		},
		initIOSWebAudioUnlock: function() {
			if (this.webaudio) {
				webaudio = this.webaudio;
				var b = function() {
					var c = webaudio.context,
						d = c.createBuffer(1, 1, 22050),
						e = c.createBufferSource();
					e.buffer = d;
					e.connect(c.destination);
					"undefined" === typeof e.start ? e.noteOn(0) : e.start(0);
					setTimeout(function() {
						(e.playbackState === e.PLAYING_STATE || e.playbackState === e.FINISHED_STATE) && window.removeEventListener("touchend", b, !1)
					}.bind(this), 0)
				};
				window.addEventListener("touchend", b, !1)
			}
		},
		initHTML5Audio: function(b) {
			if (this.useHTML5Audio && this.audio) {
				var c = this.audio;
				this.codecs = {};
				this.codecs = {
					mp3: !!c.canPlayType("audio/mpeg;").replace(/^no$/, ""),
					opus: !!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
					ogg: !!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
					wav: !!c.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
					aac: !!c.canPlayType("audio/aac;").replace(/^no$/, ""),
					m4a: !!(c.canPlayType("audio/x-m4a;") || c.canPlayType("audio/m4a;") || c.canPlayType("audio/aac;")).replace(/^no$/, ""),
					mp4: !!(c.canPlayType("audio/x-mp4;") || c.canPlayType("audio/mp4;") || c.canPlayType("audio/aac;")).replace(/^no$/, ""),
					weba: !!c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
				};
				this.is = {
					ff: Boolean(null != window.mozInnerScreenX && /firefox/.test(navigator.userAgent.toLowerCase())),
					ie: Boolean(document.all && !window.opera),
					opera: Boolean(window.opera),
					chrome: Boolean(window.chrome),
					safari: Boolean(!window.chrome && /safari/.test(navigator.userAgent.toLowerCase()) && window.getComputedStyle && !window.globalStorage && !window.opera)
				};
				this.playDelay = -60;
				this.stopDelay = 30;
				this.is.chrome && (this.playDelay = -25);
				this.is.chrome && (this.stopDelay = 25);
				this.is.ff && (this.playDelay = -25);
				this.is.ff && (this.stopDelay = 85);
				this.is.opera && (this.playDelay = 5);
				this.is.opera && (this.stopDelay = 0);
				for (var d in b) {
					this.soundList[d] = d;
					var e = b[d].path,
						c = e + "." + ig.Sound.FORMAT.OGG.ext,
						e = e + "." + ig.Sound.FORMAT.MP3.ext,
						f = null;
					this.codecs[ig.Sound.FORMAT.OGG.ext.toLowerCase()] ? f = c : this.codecs[ig.Sound.FORMAT.MP3.ext.toLowerCase()] && (f = e);
					if (f) {
						ig.ua.mobile ? ig.ua.iOS && (f = e) : (b = navigator.userAgent.toLowerCase(), -1 != b.indexOf("safari") && -1 >= b.indexOf("chrome") && (f = e));
						this.audio.addEventListener("error", function() {
							this.audio.error && 4 === this.audio.error.code && (this.isSupported = !1)
						}, !1);
						this.audio.src = f;
						this.audio._pos = 0;
						this.audio.preload = "auto";
						this.audio.volume = this._volume;
						this.inactiveAudio = new Audio;
						this.inactiveAudio.src = f;
						this.inactiveAudio._pos = 0;
						this.inactiveAudio.preload = "auto";
						this.inactiveAudio.volume = this._volume;
						this.inactiveAudio.load();
						var g = function() {
							this._duration = this.audio.duration;
							this._loaded || (this._loaded = !0);
							this.bgmPlaying ? this.play(null, !0) : this.stop();
							this.audio.removeEventListener("canplaythrough", g, !1)
						}.bind(this);
						this.audio.addEventListener("canplaythrough", g, !1);
						this.audio.load();
						break
					}
				}
			}
		},
		play: function(b, c) {
			if (this.isSupported)
				if (this.bgmPlaying = !0, this.webaudio) {
					if (!c && this.reinitOnPlay && this.webaudio.source_loop.buffer == this.webaudio.buffer) {
						if (this.webaudio.source_loop._playing && (this.webaudio.source_loop[this.webaudio.compatibility.stop](0), this.webaudio.source_loop._playing = !1, this.pausedTime += this.webaudio.context.currentTime - this.webaudio.source_loop._startTime, this.pausedTime %= this.webaudio.source_loop.buffer.duration, this.webaudio.source_loop._startTime = 0, "noteOn" === this.webaudio.compatibility.start)) this.webaudio.source_once[this.webaudio.compatibility.stop](0);
						try {
							this.webaudio.context.close();
							this.webaudio.context = new this.AudioContext;
							this.webaudio.gainNode = this.webaudio.context.createGain();
							this.webaudio.gainNode.connect(this.webaudio.context.destination);
							this.webaudio.gainNode.gain.value = this._volume;
							var d = "start",
								e = "stop",
								f = this.webaudio.context.createBufferSource();
							"function" !== typeof f.start && (d = "noteOn");
							this.webaudio.compatibility.start = d;
							"function" !== typeof f.stop && (e = "noteOff");
							this.webaudio.compatibility.stop = e;
							this.webaudio.source_loop = {};
							this.play(null, !0)
						} catch (g) {}
					}
					if (this.webaudio.buffer) {
						if (!this.muteFlag && (this.bgmPlaying = !0, !this.webaudio.source_loop._playing)) {
							this.webaudio.source_loop = this.webaudio.context.createBufferSource();
							this.webaudio.source_loop.buffer = this.webaudio.buffer;
							this.webaudio.source_loop.loop = !0;
							this.webaudio.source_loop.connect(this.webaudio.gainNode);
							if (null == b || isNaN(b)) b = 0, this.pausedTime && (b = this.pausedTime);
							this.webaudio.source_loop._startTime = this.webaudio.context.currentTime;
							if ("noteOn" === this.webaudio.compatibility.start) this.webaudio.source_once = this.webaudio.context.createBufferSource(), this.webaudio.source_once.buffer = this.webaudio.buffer, this.webaudio.source_once.connect(this.webaudio.gainNode), this.webaudio.source_once.noteGrainOn(0, b, this.webaudio.buffer.duration - b), this.webaudio.source_loop[this.webaudio.compatibility.start](this.webaudio.context.currentTime +
								(this.webaudio.buffer.duration - b));
							else this.webaudio.source_loop[this.webaudio.compatibility.start](0, b);
							this.webaudio.source_loop._playing = !0
						}
					} else this.bgmPlaying = !0
				} else if (this.audio) {
				var m = this.audio;
				if (!this.muteFlag)
					if (this.bgmPlaying = !0, isNaN(b) && (b = 0, this.pausedTime && (b = this.pausedTime)), d = this._duration - b, this._onEndTimer && (clearTimeout(this._onEndTimer), this._onEndTimer = null), this._onEndTimer = setTimeout(function() {
							this.audio.currentTime = 0;
							this.audio.pause();
							this.pausedTime = 0;
							if (this.inactiveAudio) {
								var b = this.audio;
								this.audio = this.inactiveAudio;
								this.inactiveAudio = b
							}
							this.play()
						}.bind(this), 1E3 * d + this.playDelay), 4 === m.readyState || !m.readyState && navigator.isCocoonJS) m.readyState = 4, m.currentTime = b, m.muted = this.muteFlag || m.muted, m.volume = this._volume, setTimeout(function() {
						m.play()
					}, 0);
					else {
						clearTimeout(this._onEndTimer);
						this._onEndTimer = null;
						var l = function() {
							typeof("function" == this.play) && (this.play(), m.removeEventListener("canplaythrough", l, !1))
						}.bind(this);
						m.addEventListener("canplaythrough", l, !1)
					}
			}
		},
		stop: function() {
			this.bgmPlaying = !1;
			if (this.isSupported)
				if (this.webaudio) {
					if (this.webaudio.source_loop._playing && (this.webaudio.source_loop[this.webaudio.compatibility.stop](0), this.webaudio.source_loop._playing = !1, this.pausedTime += this.webaudio.context.currentTime - this.webaudio.source_loop._startTime, this.pausedTime %= this.webaudio.source_loop.buffer.duration, this.webaudio.source_loop._startTime = 0, "noteOn" === this.webaudio.compatibility.start)) this.webaudio.source_once[this.webaudio.compatibility.stop](0)
				} else if (this.audio) {
				var b = this.audio;
				4 == b.readyState && (this.pausedTime = b.currentTime, b.currentTime = 0, b.pause(), clearTimeout(this._onEndTimer), this._onEndTimer = null)
			}
		},
		volume: function(b) {
			if (isNaN(b) || null == b) return this.getVolume();
			this.isSupported && (this._volume = b, 0 > this._volume ? this._volume = 0 : 1 < this._volume && (this._volume = 1), this.webaudio ? this.webaudio.gainNode && (this.webaudio.gainNode.gain.value = this._volume) : this.audio && (this.audio.volume = this._volume, this.inactiveAudio && (this.inactiveAudio.volume = this._volume)))
		},
		getVolume: function() {
			return !this.isSupported ? 0 : this._volume
		},
		mute: function(b) {
			this.parent(b);
			!1 == this.muteFlag && (this.muteFlag = !0, this.bgmPlaying && (this.stop(), this.bgmPlaying = !0))
		},
		unmute: function(b) {
			this.parent(b);
			!this.stayMuteFlag && !0 == this.muteFlag && (this.muteFlag = !1, this.bgmPlaying && this.play())
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.sound-info").defines(function() {
	SoundInfo = ig.Class.extend({
		FORMATS: {
			OGG: ".ogg",
			MP3: ".mp3"
		},
		sfx: {
			kittyopeningSound: {
				path: "media/audio/opening/kittyopening"
			},
			staticSound: {
				path: "media/audio/play/static"
			},
			openingSound: {
				path: "media/audio/opening/opening"
			},
			click: {
				path: "media/audio/sfx/click"
			},
			click2: {
				path: "media/audio/sfx/click2"
			},
			kick: {
				path: "media/audio/sfx/kick"
			},
			popup: {
				path: "media/audio/sfx/popup"
			},
			cheer: {
				path: "media/audio/sfx/cheer"
			},
			starget: {
				path: "media/audio/sfx/starget"
			}
		},
		bgm: {
			background: {
				path: "media/audio/bgm",
				startOgg: 0,
				endOgg: 21.463,
				startMp3: 0,
				endMp3: 21.463
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.audio.sound-handler").requires("plugins.audio.impact-music-player", "plugins.audio.impact-sound-player", "plugins.audio.howler-player", "plugins.audio.howler-music-player", "plugins.audio.jukebox-player", "plugins.audio.webaudio-music-player", "plugins.audio.sound-info").defines(function() {
	ig.SoundHandler = ig.Class.extend({
		bgmPlayer: null,
		sfxPlayer: null,
		focusBlurMute: !1,
		soundInfo: new SoundInfo,
		init: function() {
			console.log("Initiating sound handler");
			this.initWindowHandler();
			ig.ua.mobile ? (this.initPowerButtonFix(), this.bgmPlayer = new WebaudioMusicPlayer(this.soundInfo.bgm, {
				loop: !0
			}), this.bgmPlayer.isSupported || (this.bgmPlayer = new JukeboxPlayer(this.soundInfo.bgm, {
				loop: !0
			}))) : (this.bgmPlayer = new WebaudioMusicPlayer(this.soundInfo.bgm, {
				loop: !0
			}), this.bgmPlayer.isSupported || (this.bgmPlayer = new ImpactMusicPlayer(this.soundInfo.bgm, {
				loop: !0
			})));
			this.sfxPlayer = new HowlerPlayer(this.soundInfo.sfx)
		},
		checkBGM: function() {
			return this.bgmPlayer.stayMuteFlag
		},
		checkSFX: function() {
			return this.sfxPlayer.stayMuteFlag
		},
		muteSFX: function(b) {
			this.sfxPlayer && this.sfxPlayer.mute(b)
		},
		muteBGM: function(b) {
			this.bgmPlayer && this.bgmPlayer.mute(b)
		},
		unmuteSFX: function(b) {
			this.sfxPlayer && this.sfxPlayer.unmute(b)
		},
		unmuteBGM: function(b) {
			this.bgmPlayer && this.bgmPlayer.unmute(b)
		},
		muteAll: function(b) {
			this.muteSFX(b);
			this.muteBGM(b)
		},
		unmuteAll: function(b) {
			this.unmuteSFX(b);
			this.unmuteBGM(b)
		},
		forceMuteAll: function() {
			this.focusBlurMute || this.muteAll(!1);
			this.focusBlurMute = !0
		},
		forceUnMuteAll: function() {
			this.focusBlurMute && (this.unmuteAll(!1), this.focusBlurMute = !1)
		},
		initWindowHandler: function() {
			"true" === ig.domHandler.getQueryVariable("webview") ? ($(window).focus(function() {
				ig.soundHandler && ig.soundHandler.forceUnMuteAll()
			}), $(window).blur(function() {
				ig.soundHandler && ig.soundHandler.forceMuteAll()
			})) : (window.onfocus = function() {
				ig.soundHandler && ig.soundHandler.forceUnMuteAll()
			}, window.onblur = function() {
				ig.soundHandler && ig.soundHandler.forceMuteAll()
			})
		},
		initPowerButtonFix: function() {
			var b = this.getHiddenProp();
			b && (b = b.replace(/[H|h]idden/, "") + "visibilitychange", document.addEventListener(b, this.visChange));
			window.addEventListener("pagehide", function() {
				ig.soundHandler && ig.soundHandler.forceMuteAll()
			}, !1);
			window.addEventListener("pageshow", function() {
				ig.soundHandler && ig.soundHandler.forceUnMuteAll()
			}, !1)
		},
		getHiddenProp: function() {
			var b = ["webkit", "moz", "ms", "o"];
			if ("hidden" in document) return "hidden";
			for (var c = 0; c < b.length; c++)
				if (b[c] + "Hidden" in document) return b[c] + "Hidden";
			return null
		},
		isHidden: function() {
			var b = this.getHiddenProp();
			return !b ? !1 : document[b]
		},
		visChange: function() {
			ig.soundHandler.isHidden() ? ig.soundHandler && ig.soundHandler.forceMuteAll() : ig.soundHandler && ig.soundHandler.forceUnMuteAll()
		},
		saveVolume: function() {
			this.sfxPlayer && ig.game.io.storageSet("soundVolume", this.sfxPlayer.getVolume());
			this.bgmPlayer && ig.game.io.storageSet("musicVolume", this.bgmPlayer.getVolume())
		},
		forceLoopBGM: function() {
			var b;
			if (!this.focusBlurMute && this.bgmPlayer.bgmPlaying && this.bgmPlayer) {
				var c = this.bgmPlayer.jukeboxPlayer;
				if (c) {
					null != window.mozInnerScreenX && /firefox/.test(navigator.userAgent.toLowerCase());
					b = Boolean(window.chrome);
					!window.chrome && /safari/.test(navigator.userAgent.toLowerCase());
					var d = 0.1;
					ig.ua.mobile && (d = 0.115, ig.ua.android && (d = 0.45, b && (d = 0.3)));
					c.settings.spritemap.music && (b = c.settings.spritemap.music.end - d, c.getCurrentTime() >= b && (b = c.settings.spritemap.music.start, ig.ua.android ? this.forcelooped || (c.play(b, !0), this.forcelooped = !0, setTimeout(function() {
						ig.soundHandler.forcelooped = !1
					}, d)) : c.setCurrentTime(b)))
				} else "ImpactMusicPlayer" == this.bgmPlayer.tagName && (null != window.mozInnerScreenX && /firefox/.test(navigator.userAgent.toLowerCase()), b = Boolean(window.chrome), !window.chrome && /safari/.test(navigator.userAgent.toLowerCase()), d = 0.1, ig.ua.mobile && (d = 0.115, ig.ua.android && (d = 0.45, b && (d = 0.3))), c = 0, "mp3" == ig.soundManager.format.ext && (c = 0.05), ig.music.currentTrack && (b = ig.music.currentTrack.duration - d, ig.music.currentTrack.currentTime >= b && (ig.ua.android ? this.forcelooped || (ig.music.currentTrack.pause(), ig.music.currentTrack.currentTime = c, ig.music.currentTrack.play(), this.forcelooped = !0, setTimeout(function() {
					ig.soundHandler.forcelooped = !1
				}, d)) : ig.music.currentTrack.currentTime = c)))
			}
		}
	})
});
ig.baked = !0;
ig.module("plugins.splash-loader").requires("impact.loader", "impact.animation").defines(function() {
	ig.SplashLoader = ig.Loader.extend({
		barImage: new ig.Image("media/graphics/sprites/loading-bar.png"),
		resources: [new ig.Image("media/graphics/backgrounds/bg.png"), new ig.Image("media/graphics/backgrounds/bg-game.png"), new ig.Image("media/graphics/backgrounds/grey-bg.png"), new ig.Image("media/graphics/sprites/box.png"), new ig.Image("media/graphics/sprites/box2.png"), new ig.Image("media/graphics/sprites/box3.png"), new ig.Image("media/graphics/sprites/btn_more_games.png"), new ig.Image("media/graphics/sprites/buttons/back-btn.png"), new ig.Image("media/graphics/sprites/buttons/basic-btn.png"), new ig.Image("media/graphics/sprites/buttons/close-btn.png"), new ig.Image("media/graphics/sprites/buttons/home.png"), new ig.Image("media/graphics/sprites/buttons/more-btn.png"), new ig.Image("media/graphics/sprites/buttons/pause-btn.png"), new ig.Image("media/graphics/sprites/buttons/play-btn.png"), new ig.Image("media/graphics/sprites/buttons/replay-btn.png"), new ig.Image("media/graphics/sprites/buttons/setting-btn.png"), new ig.Image("media/graphics/sprites/game/ball.png"), new ig.Image("media/graphics/sprites/game/direction-dot.png"), new ig.Image("media/graphics/sprites/game/finger.png"), new ig.Image("media/graphics/sprites/game/goal.png"), new ig.Image("media/graphics/sprites/game/goal-board.png"), new ig.Image("media/graphics/sprites/game/grounds.png"), new ig.Image("media/graphics/sprites/game/land1.png"), new ig.Image("media/graphics/sprites/game/moving1.png"), new ig.Image("media/graphics/sprites/game/object1.png"), new ig.Image("media/graphics/sprites/game/object2.png"), new ig.Image("media/graphics/sprites/game/object3.png"), new ig.Image("media/graphics/sprites/game/object4.png"), new ig.Image("media/graphics/sprites/game/object5.png"), new ig.Image("media/graphics/sprites/game/star.png"), new ig.Image("media/graphics/sprites/game/star2.png"), new ig.Image("media/graphics/sprites/game/tutor-box.png"), new ig.Image("media/graphics/sprites/level-box.png"), new ig.Image("media/graphics/sprites/loading-bar.png"), new ig.Image("media/graphics/sprites/loading-bg.png"), new ig.Image("media/graphics/sprites/lock.png"), new ig.Image("media/graphics/sprites/logo.png"), new ig.Image("media/graphics/sprites/off-tag.png"), new ig.Image("media/graphics/sprites/on-tag.png"), new ig.Image("media/graphics/sprites/page-tag.png"), new ig.Image("media/graphics/sprites/result-box.png"), new ig.Image("media/graphics/sprites/score-box.png"), new ig.Image("media/graphics/sprites/setting-bar-bg.png"), new ig.Image("media/graphics/sprites/setting-bar.png"), new ig.Image("media/graphics/sprites/setting-box.png"), new ig.Image("media/graphics/sprites/setting-cursor.png"), new ig.Image("media/graphics/sprites/small-box.png"), new ig.Image("media/graphics/sprites/small-star.png"), new ig.Image("media/graphics/sprites/star-indicator-off.png"), new ig.Image("media/graphics/sprites/star-indicator-on.png"), new ig.Image("media/graphics/sprites/star-indicator.png"), new ig.Image("media/graphics/sprites/star-off.png"), new ig.Image("media/graphics/sprites/star-on.png"), new ig.Image("media/graphics/sprites/star-result.png")],
		desktopCoverDIVID: "play-desktop",
		init: function(b, c) {
			this.parent(b, c);
			ig.apiHandler.run("MJSPreroll");
			this.create()
		},
		create: function() {
			this.groups = [];
			this.gw = ig.system.width;
			this.gh = ig.system.height;
			this.centerX = 0.5 * this.gw;
			this.centerY = 0.5 * this.gh;
			this.bg = this.addImage(this.centerX, this.centerY, "splash", "loading-bg");
			this.bg.anchor.setTo(0.5);
			this.groups.push(this.bg);
			this.loadingBg = this.addImage(this.centerX, 0.75 * this.gh, "sprites", "loading-bg");
			this.loadingBg.anchor.setTo(0.5);
			this.groups.push(this.loadingBg);
			this.loadingBar = this.addImage(this.loadingBg.x, this.loadingBg.y, "sprites", "loading-bar");
			this.loadingBar.anchor.setTo(0.5);
			this.groups.push(this.loadingBar);
			this.loadingText = this.addText(this.loadingBar.x, 0.7 * this.gh, _STRINGS.Splash.Loading, 25, fonts.font1);
			this.loadingText.anchor.setTo(0.5);
			this.loadingText.fill = "white";
			this.groups.push(this.loadingText)
		},
		addImage: function(b, c, d, e) {
			b = new ig.AddImage(b, c, d, e);
			b.checkProperties();
			return b
		},
		addText: function(b, c, d, e, f, g) {
			b = new EntityText(b, c, g);
			b.inputProperty(d, e, f);
			return b
		},
		end: function() {
			this.parent();
			this._drawStatus = 1;
			this.draw();
			if (ig.ua.mobile) {
				var b = ig.domHandler.getElementById("#play");
				ig.domHandler.show(b);
				ig.system.setGame(MyGame)
			} else this.tapToStartDiv()
		},
		tapToStartDiv: function(b) {
			this.desktopCoverDIV = document.createElement("div");
			this.desktopCoverDIV.id = this.desktopCoverDIVID;
			this.desktopCoverDIV.setAttribute("class", "play");
			this.desktopCoverDIV.setAttribute("style", "position: absolute; display: block; z-index: 999999; background-color: rgba(23, 32, 53, 0.7); visibility: visible; font-size: 10vmin; text-align: center; vertical-align: middle; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;");
			this.desktopCoverDIV.innerHTML = "<div style='color:white;background-color: rgba(255, 255, 255, 0.3); border: 2px solid #fff; font-size:20px; border-radius: 5px; position: relative; float: left; top: 50%; left: 50%; transform: translate(-50%, -50%);'><div style='padding:20px 50px; font-family: Arial;'>" + _STRINGS.Splash.TapToStart + "</div></div>";
			(document.getElementById("play").parentNode || document.getElementById("ajaxbar")).appendChild(this.desktopCoverDIV);
			try {
				"undefined" !== typeof ig.sizeHandler ? "undefined" !== typeof ig.sizeHandler.coreDivsToResize && (ig.sizeHandler.coreDivsToResize.push("#" + this.desktopCoverDIVID), "function" === typeof ig.sizeHandler.reorient && ig.sizeHandler.reorient()) : "undefined" !== typeof coreDivsToResize && (coreDivsToResize.push(this.desktopCoverDIVID), "function" === typeof sizeHandler && sizeHandler())
			} catch (c) {
				console.log(c)
			}
			this.desktopCoverDIV.addEventListener("click", function() {
				try {
					"undefined" !== typeof ig.soundHandler ? ("undefined" !== typeof ig.soundHandler.bgmPlayer ? "undefined" !== typeof ig.soundHandler.bgmPlayer.webaudio && "undefined" !== typeof ig.soundHandler.bgmPlayer.webaudio.context && ig.soundHandler.bgmPlayer.webaudio.context.resume() : (ig.soundHandler = null, ig.soundHandler = "undefined" !== typeof ig.soundList ? new ig.SoundHandler(ig.soundList) : new ig.SoundHandler), "undefined" !== typeof ig.soundHandler.sfxPlayer ? "function" === typeof ig.soundHandler.sfxPlayer.play && ig.soundHandler.sfxPlayer.play("staticSound") : "undefined" !== typeof ig.soundHandler.staticSound ? "function" === typeof ig.soundHandler.staticSound.play && ig.soundHandler.staticSound.play() : "function" === typeof ig.soundHandler.playSound && ig.soundHandler.playSound("staticSound")) : "undefined" !== typeof Howl ? (ig.global.staticSound = new Howl({
						src: ["media/audio/play/static.ogg", "media/audio/play/static.mp3"]
					}), ig.global.staticSound.play()) : "undefined" !== typeof createjs && "undefined" !== typeof createjs.Sound && "function" === typeof createjs.Sound.play && createjs.Sound.play("opening")
				} catch (c) {
					console.log(c)
				}
				this.setAttribute("style", "visibility: hidden;");
				"function" === typeof b && b();
				ig.system.setGame(MyGame)
			})
		},
		setupCustomAnimation: function() {
			this.animHeight = this.customAnim.height;
			this.animWidth = this.customAnim.width;
			this.customAnim = new ig.Animation(this.customAnim, 0.025, [0, 1, 2, 3, 4, 5, 6, 7])
		},
		animate: function() {
			ig.Timer.step();
			this.customAnim.update()
		},
		drawGroup: function() {
			for (var b = 0; b < this.groups.length; b++) {
				var c = this.groups[b];
				if (!(c.name && "Text" == c.name) || fontReady) this.groups[b].update(), this.groups[b].draw()
			}
		},
		draw: function() {
			this._drawStatus += (this.status - this._drawStatus) / 5;
			0.2 >= this._drawStatus || (fontReady || (fontReady = FontDetect.isFontLoaded(fonts.font1)), this.drawGroup(), this.loadingBar.size.x = this.barImage.width * this._drawStatus)
		}
	})
});
ig.baked = !0;
ig.module("plugins.tween").requires("impact.entity").defines(function() {
	Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
		for (var c = 0; c < this.length; ++c)
			if (this[c] === b) return c;
		return -1
	});
	ig.Entity.prototype.tweens = [];
	ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update;
	ig.Entity.prototype.update = function() {
		this._preTweenUpdate();
		if (0 < this.tweens.length) {
			for (var b = [], c = 0; c < this.tweens.length; c++) this.tweens[c].update(), this.tweens[c].complete || b.push(this.tweens[c]);
			this.tweens = b
		}
	};
	ig.Entity.prototype.tween = function(b, c, d) {
		b = new ig.Tween(this, b, c, d);
		this.tweens.push(b);
		return b
	};
	ig.Entity.prototype.pauseTweens = function() {
		for (var b = 0; b < this.tweens.length; b++) this.tweens[b].pause()
	};
	ig.Entity.prototype.resumeTweens = function() {
		for (var b = 0; b < this.tweens.length; b++) this.tweens[b].resume()
	};
	ig.Entity.prototype.stopTweens = function(b) {
		for (var c = 0; c < this.tweens.length; c++) this.tweens[c].stop(b)
	};
	ig.Tween = function(b, c, d, e) {
		var f = {},
			g = {},
			m = {},
			l = 0,
			j = !1,
			q = !1,
			z = !1;
		this.duration = d;
		this.paused = this.complete = !1;
		this.easing = ig.Tween.Easing.Linear.EaseNone;
		this.onComplete = !1;
		this.loop = this.delay = 0;
		this.loopCount = -1;
		ig.merge(this, e);
		this.loopNum = this.loopCount;
		this.chain = function(b) {
			z = b
		};
		this.initEnd = function(b, c, d) {
			if ("object" !== typeof c[b]) d[b] = c[b];
			else
				for (subprop in c[b]) d[b] || (d[b] = {}), this.initEnd(subprop, c[b], d[b])
		};
		this.initStart = function(b, c, d, e) {
			if ("object" !== typeof d[b]) "undefined" !== typeof c[b] && (e[b] = d[b]);
			else
				for (subprop in d[b]) e[b] || (e[b] = {}), "undefined" !== typeof c[b] && this.initStart(subprop, c[b], d[b], e[b])
		};
		this.start = function() {
			this.paused = this.complete = !1;
			this.loopNum = this.loopCount;
			l = 0; - 1 == b.tweens.indexOf(this) && b.tweens.push(this);
			q = !0;
			j = new ig.Timer;
			for (var d in c) this.initEnd(d, c, g);
			for (d in g) this.initStart(d, g, b, f), this.initDelta(d, m, b, g)
		};
		this.initDelta = function(b, c, d, e) {
			if ("object" !== typeof e[b]) c[b] = e[b] - d[b];
			else
				for (subprop in e[b]) c[b] || (c[b] = {}), this.initDelta(subprop, c[b], d[b], e[b])
		};
		this.propUpdate = function(b, c, d, e, f) {
			if ("object" !== typeof d[b]) c[b] = "undefined" != typeof d[b] ? d[b] + e[b] * f : c[b];
			else
				for (subprop in d[b]) this.propUpdate(subprop, c[b], d[b], e[b], f)
		};
		this.propSet = function(b, c, d) {
			if ("object" !== typeof c[b]) d[b] = c[b];
			else
				for (subprop in c[b]) d[b] || (d[b] = {}), this.propSet(subprop, c[b], d[b])
		};
		this.update = function() {
			if (!q) return !1;
			if (this.delay) {
				if (j.delta() < this.delay) return;
				this.delay = 0;
				j.reset()
			}
			if (this.paused || this.complete) return !1;
			var c = (j.delta() + l) / this.duration,
				c = 1 < c ? 1 : c,
				d = this.easing(c);
			for (property in m) this.propUpdate(property, b, f, m, d);
			if (1 <= c) {
				if (0 == this.loopNum || !this.loop) {
					this.complete = !0;
					if (this.onComplete) this.onComplete();
					z && z.start();
					return !1
				}
				if (this.loop == ig.Tween.Loop.Revert) {
					for (property in f) this.propSet(property, f, b);
					l = 0;
					j.reset(); - 1 != this.loopNum && this.loopNum--
				} else if (this.loop == ig.Tween.Loop.Reverse) {
					c = {};
					d = {};
					ig.merge(c, g);
					ig.merge(d, f);
					ig.merge(f, c);
					ig.merge(g, d);
					for (property in g) this.initDelta(property, m, b, g);
					l = 0;
					j.reset(); - 1 != this.loopNum && this.loopNum--
				}
			}
		};
		this.pause = function() {
			this.paused = !0;
			j && j.delta && (l += j.delta())
		};
		this.resume = function() {
			this.paused = !1;
			j && j.reset && j.reset()
		};
		this.stop = function(b) {
			b && (this.loop = this.complete = this.paused = !1, l += d, this.update());
			this.complete = !0
		}
	};
	ig.Tween.Loop = {
		Revert: 1,
		Reverse: 2
	};
	ig.Tween.Easing = {
		Linear: {},
		Quadratic: {},
		Cubic: {},
		Quartic: {},
		Quintic: {},
		Sinusoidal: {},
		Exponential: {},
		Circular: {},
		Elastic: {},
		Back: {},
		Bounce: {}
	};
	ig.Tween.Easing.Linear.EaseNone = function(b) {
		return b
	};
	ig.Tween.Easing.Quadratic.EaseIn = function(b) {
		return b * b
	};
	ig.Tween.Easing.Quadratic.EaseOut = function(b) {
		return -b * (b - 2)
	};
	ig.Tween.Easing.Quadratic.EaseInOut = function(b) {
		return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1)
	};
	ig.Tween.Easing.Cubic.EaseIn = function(b) {
		return b * b * b
	};
	ig.Tween.Easing.Cubic.EaseOut = function(b) {
		return --b * b * b + 1
	};
	ig.Tween.Easing.Cubic.EaseInOut = function(b) {
		return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2)
	};
	ig.Tween.Easing.Quartic.EaseIn = function(b) {
		return b * b * b * b
	};
	ig.Tween.Easing.Quartic.EaseOut = function(b) {
		return -(--b * b * b * b - 1)
	};
	ig.Tween.Easing.Quartic.EaseInOut = function(b) {
		return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2)
	};
	ig.Tween.Easing.Quintic.EaseIn = function(b) {
		return b * b * b * b * b
	};
	ig.Tween.Easing.Quintic.EaseOut = function(b) {
		return (b -= 1) * b * b * b * b + 1
	};
	ig.Tween.Easing.Quintic.EaseInOut = function(b) {
		return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2)
	};
	ig.Tween.Easing.Sinusoidal.EaseIn = function(b) {
		return -Math.cos(b * Math.PI / 2) + 1
	};
	ig.Tween.Easing.Sinusoidal.EaseOut = function(b) {
		return Math.sin(b * Math.PI / 2)
	};
	ig.Tween.Easing.Sinusoidal.EaseInOut = function(b) {
		return -0.5 * (Math.cos(Math.PI * b) - 1)
	};
	ig.Tween.Easing.Exponential.EaseIn = function(b) {
		return 0 == b ? 0 : Math.pow(2, 10 * (b - 1))
	};
	ig.Tween.Easing.Exponential.EaseOut = function(b) {
		return 1 == b ? 1 : -Math.pow(2, -10 * b) + 1
	};
	ig.Tween.Easing.Exponential.EaseInOut = function(b) {
		return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2)
	};
	ig.Tween.Easing.Circular.EaseIn = function(b) {
		return -(Math.sqrt(1 - b * b) - 1)
	};
	ig.Tween.Easing.Circular.EaseOut = function(b) {
		return Math.sqrt(1 - --b * b)
	};
	ig.Tween.Easing.Circular.EaseInOut = function(b) {
		return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
	};
	ig.Tween.Easing.Elastic.EaseIn = function(b) {
		var c, d = 0.1,
			e = 0.4;
		if (0 == b) return 0;
		if (1 == b) return 1;
		e || (e = 0.3);
		!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
		return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e))
	};
	ig.Tween.Easing.Elastic.EaseOut = function(b) {
		var c, d = 0.1,
			e = 0.4;
		if (0 == b) return 0;
		if (1 == b) return 1;
		e || (e = 0.3);
		!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
		return d * Math.pow(2, -10 * b) * Math.sin((b - c) * 2 * Math.PI / e) + 1
	};
	ig.Tween.Easing.Elastic.EaseInOut = function(b) {
		var c, d = 0.1,
			e = 0.4;
		if (0 == b) return 0;
		if (1 == b) return 1;
		e || (e = 0.3);
		!d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
		return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin((b - c) * 2 * Math.PI / e) + 1
	};
	ig.Tween.Easing.Back.EaseIn = function(b) {
		return b * b * (2.70158 * b - 1.70158)
	};
	ig.Tween.Easing.Back.EaseOut = function(b) {
		return (b -= 1) * b * (2.70158 * b + 1.70158) + 1
	};
	ig.Tween.Easing.Back.EaseInOut = function(b) {
		return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2)
	};
	ig.Tween.Easing.Bounce.EaseIn = function(b) {
		return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - b)
	};
	ig.Tween.Easing.Bounce.EaseOut = function(b) {
		return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375
	};
	ig.Tween.Easing.Bounce.EaseInOut = function(b) {
		return 0.5 > b ? 0.5 * ig.Tween.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tween.Easing.Bounce.EaseOut(2 * b - 1) + 0.5
	};
	ig.Tween.Interpolation = {
		Linear: function(b, c) {
			var d = b.length - 1,
				e = d * c,
				f = Math.floor(e),
				g = TWEEN.Interpolation.Utils.Linear;
			return 0 > c ? g(b[0], b[1], e) : 1 < c ? g(b[d], b[d - 1], d - e) : g(b[f], b[f + 1 > d ? d : f + 1], e - f)
		}
	}
});
ig.baked = !0;
ig.module("plugins.patches.entity-patch").requires("impact.entity").defines(function() {
	ig.Entity.inject({
		handleMovementTrace: function(b) {
			this.standing = !1;
			b.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
			b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
			if (b.collision.slope) {
				var c = b.collision.slope;
				if (0 < this.bounciness) {
					var d = this.vel.x * c.nx + this.vel.y * c.ny;
					this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
					this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
				} else d = (this.vel.x * c.x + this.vel.y * c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
			}
			this.pos.x = b.pos.x;
			this.pos.y = b.pos.y
		}
	})
});
ig.baked = !0;
ig.module("plugins.tweens-handler").requires("impact.entity", "plugins.tween", "plugins.patches.entity-patch").defines(function() {
	Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
		for (var d = 0; d < this.length; ++d)
			if (this[d] === b) return d;
		return -1
	});
	ig.TweensHandler = ig.Class.extend({
		_tweens: [],
		_systemPausedTweens: [],
		init: function() {},
		getAll: function() {
			return this._tweens
		},
		removeAll: function() {
			this._tweens = []
		},
		add: function(b) {
			this._tweens.push(b)
		},
		remove: function(b) {
			b = this._tweens.indexOf(b); - 1 !== b && this._tweens.splice(b, 1)
		},
		onSystemPause: function() {
			if (0 === this._tweens.length) return !1;
			for (var b = 0, d = null; b < this._tweens.length;) d = this._tweens[b], d._isPlaying && (this._systemPausedTweens.push(d), d.pause()), b++;
			return !0
		},
		onSystemResume: function() {
			if (0 === this._systemPausedTweens.length) return !1;
			for (var b = 0; b < this._systemPausedTweens.length;) this._systemPausedTweens[b].resume(), b++;
			this._systemPausedTweens = [];
			return !0
		},
		update: function(b, d) {
			if (0 === this._tweens.length) return !1;
			var e = 0;
			for (b = void 0 !== b ? b : ig.game.tweens.now(); e < this._tweens.length;) this._tweens[e].update(b) || d ? e++ : this._tweens.splice(e, 1);
			return !0
		},
		now: function() {
			return Date.now()
		}
	});
	ig.TweenDef = ig.Class.extend({
		_ent: null,
		_valuesStart: {},
		_valuesEnd: {},
		_valuesStartRepeat: {},
		_duration: 1E3,
		_repeat: 0,
		_yoyo: !1,
		_isPlaying: !1,
		_reversed: !1,
		_delayTime: 0,
		_startTime: null,
		_pauseTime: null,
		_easingFunction: ig.Tween.Easing.Linear.EaseNone,
		_interpolationFunction: ig.Tween.Interpolation.Linear,
		_chainedTweens: [],
		_onStartCallback: null,
		_onStartCallbackFired: !1,
		_onUpdateCallback: null,
		_onCompleteCallback: null,
		_onStopCallback: null,
		_onPauseCallback: null,
		_onResumeCallback: null,
		_currentElapsed: 0,
		init: function(b) {
			this._object = b
		},
		to: function(b, d) {
			this._valuesEnd = b;
			void 0 !== d && (this._duration = d);
			return this
		},
		start: function(b) {
			if (this._isPlaying) return this;
			ig.game.tweens.add(this);
			this._isPlaying = !0;
			this._onStartCallbackFired = !1;
			this._startTime = void 0 !== b ? b : ig.game.tweens.now();
			this._startTime += this._delayTime;
			for (var d in this._valuesEnd) {
				if (this._valuesEnd[d] instanceof Array) {
					if (0 === this._valuesEnd[d].length) continue;
					this._valuesEnd[d] = [this._object[d]].concat(this._valuesEnd[d])
				}
				void 0 !== this._object[d] && (this._valuesStart[d] = this._object[d], !1 === this._valuesStart[d] instanceof Array && (this._valuesStart[d] *= 1), this._valuesStartRepeat[d] = this._valuesStart[d] || 0)
			}
			return this
		},
		stop: function() {
			if (!this._isPlaying) return this;
			ig.game.tweens.remove(this);
			this._isPlaying = !1;
			null !== this._onStopCallback && this._onStopCallback.call(this._object, this._object);
			this.stopChainedTweens();
			return this
		},
		pause: function() {
			if (!this._isPlaying) return this;
			ig.game.tweens.remove(this);
			this._isPlaying = !1;
			this._pauseTime = ig.game.tweens.now();
			null !== this._onPauseCallback && this._onPauseCallback.call(this._object, this._object);
			return this
		},
		resume: function() {
			if (this._isPlaying || !this._pauseTime) return this;
			var b = ig.game.tweens.now() - this._pauseTime;
			this._startTime += b;
			ig.game.tweens.add(this);
			this._isPlaying = !0;
			null !== this._onResumeCallback && this._onResumeCallback.call(this._object, this._object);
			this._pauseTime = null;
			return this
		},
		end: function() {
			this.update(this._startTime + this._duration);
			return this
		},
		stopChainedTweens: function() {
			for (var b = 0, d = this._chainedTweens.length; b < d; b++) this._chainedTweens[b].stop()
		},
		delay: function(b) {
			this._delayTime = b;
			return this
		},
		repeat: function(b) {
			this._repeat = b;
			return this
		},
		repeatDelay: function(b) {
			this._repeatDelayTime = b;
			return this
		},
		yoyo: function(b) {
			this._yoyo = b;
			return this
		},
		easing: function(b) {
			this._easingFunction = b;
			return this
		},
		interpolation: function(b) {
			this._interpolationFunction = b;
			return this
		},
		chain: function() {
			this._chainedTweens = arguments;
			return this
		},
		onStart: function(b) {
			this._onStartCallback = b;
			return this
		},
		onUpdate: function(b) {
			this._onUpdateCallback = b;
			return this
		},
		onComplete: function(b) {
			this._onCompleteCallback = b;
			return this
		},
		onStop: function(b) {
			this._onStopCallback = b;
			return this
		},
		onPause: function(b) {
			this._onPauseCallback = b;
			return this
		},
		onResume: function(b) {
			this._onResumeCallback = b;
			return this
		},
		update: function(b) {
			var d, e, f;
			if (b < this._startTime) return !0;
			!1 === this._onStartCallbackFired && (null !== this._onStartCallback && this._onStartCallback.call(this._object, this._object), this._onStartCallbackFired = !0);
			e = (b - this._startTime) / this._duration;
			this._currentElapsed = e = 1 < e ? 1 : e;
			f = this._easingFunction(e);
			for (d in this._valuesEnd)
				if (void 0 !== this._valuesStart[d]) {
					var g = this._valuesStart[d] || 0,
						m = this._valuesEnd[d];
					m instanceof Array ? this._object[d] = this._interpolationFunction(m, f) : ("string" === typeof m && (m = "+" === m.charAt(0) || "-" === m.charAt(0) ? g + parseFloat(m) : parseFloat(m)), "number" === typeof m && (this._object[d] = g + (m - g) * f))
				}
			null !== this._onUpdateCallback && this._onUpdateCallback.call(this._object, this._object, f);
			if (1 === e)
				if (0 < this._repeat) {
					isFinite(this._repeat) && this._repeat--;
					for (d in this._valuesStartRepeat) "string" === typeof this._valuesEnd[d] && (this._valuesStartRepeat[d] = _valuesStartRepeat[d] + parseFloat(_valuesEnd[d])), this._yoyo && (e = this._valuesStartRepeat[d], this._valuesStartRepeat[d] = this._valuesEnd[d], this._valuesEnd[d] = e), this._valuesStart[d] = this._valuesStartRepeat[d];
					this._yoyo && (this._reversed = !this._reversed);
					this._startTime = void 0 !== this._repeatDelayTime ? b + this._repeatDelayTime : b + this._delayTime
				} else {
					null !== this._onCompleteCallback && this._onCompleteCallback.call(this._object, this._object);
					b = 0;
					for (d = this._chainedTweens.length; b < d; b++) this._chainedTweens[b].start(this._startTime + this._duration);
					return !1
				}
			return !0
		}
	});
	var b = [1];
	ig.Tween.Interpolation = {
		Linear: function(b, d) {
			var e = b.length - 1,
				f = e * d,
				g = Math.floor(f),
				m = ig.Tween.Interpolation.Utils.Linear;
			return 0 > d ? m(b[0], b[1], f) : 1 < d ? m(b[e], b[e - 1], e - f) : m(b[g], b[g + 1 > e ? e : g + 1], f - g)
		},
		Bezier: function(b, d) {
			for (var e = 0, f = b.length - 1, g = Math.pow, m = ig.Tween.Interpolation.Utils.Bernstein, l = 0; l <= f; l++) e += g(1 - d, f - l) * g(d, l) * b[l] * m(f, l);
			return e
		},
		CatmullRom: function(b, d) {
			var e = b.length - 1,
				f = e * d,
				g = Math.floor(f),
				m = ig.Tween.Interpolation.Utils.CatmullRom;
			return b[0] === b[e] ? (0 > d && (g = Math.floor(f = e * (1 + d))), m(b[(g - 1 + e) % e], b[g], b[(g + 1) % e], b[(g + 2) % e], f - g)) : 0 > d ? b[0] - (m(b[0], b[0], b[1], b[1], -f) - b[0]) : 1 < d ? b[e] - (m(b[e], b[e], b[e - 1], b[e - 1], f - e) - b[e]) : m(b[g ? g - 1 : 0], b[g], b[e < g + 1 ? e : g + 1], b[e < g + 2 ? e : g + 2], f - g)
		},
		Utils: {
			Linear: function(b, d, e) {
				return (d - b) * e + b
			},
			Bernstein: function(b, d) {
				var e = ig.Tween.Interpolation.Utils.Factorial;
				return e(b) / e(d) / e(b - d)
			},
			Factorial: function(c) {
				var d = 1;
				if (b[c]) return b[c];
				for (var e = c; 1 < e; e--) d *= e;
				return b[c] = d
			},
			CatmullRom: function(b, d, e, f, g) {
				b = 0.5 * (e - b);
				f = 0.5 * (f - d);
				var m = g * g;
				return (2 * d - 2 * e + b + f) * g * m + (-3 * d + 3 * e - 2 * b - f) * m + b * g + d
			}
		}
	}
});
ig.baked = !0;
ig.module("plugins.url-parameters").defines(function() {
	ig.UrlParameters = ig.Class.extend({
		init: function() {
			switch (getQueryVariable("iphone")) {
				case "true":
					ig.ua.iPhone = !0, console.log("iPhone mode")
			}
			var b = getQueryVariable("webview");
			if (b) switch (b) {
				case "true":
					ig.ua.is_uiwebview = !0, console.log("webview mode")
			}
			if (b = getQueryVariable("debug")) switch (b) {
				case "true":
					ig.game.showDebugMenu(), console.log("debug mode")
			}
			switch (getQueryVariable("view")) {
				case "stats":
					ig.game.resetPlayerStats(), ig.game.endGame()
			}
			getQueryVariable("ad")
		}
	})
});
ig.baked = !0;
ig.module("plugins.director").requires("impact.impact").defines(function() {
	ig.Director = ig.Class.extend({
		init: function(b, c) {
			this.game = b;
			this.levels = [];
			this.currentLevel = 0;
			this.append(c)
		},
		loadLevel: function(b) {
			for (var c in ig.sizeHandler.dynamicClickableEntityDivs) {
				var d = ig.domHandler.getElementById("#" + c);
				ig.domHandler.hide(d)
			}
			this.currentLevel = b;
			this.game.loadLevel(this.levels[b]);
			return !0
		},
		loadLevelWithoutEntities: function(b) {
			this.currentLevel = b;
			this.game.loadLevelWithoutEntities(this.levels[b]);
			return !0
		},
		append: function(b) {
			newLevels = [];
			return "object" === typeof b ? (b.constructor === [].constructor ? newLevels = b : newLevels[0] = b, this.levels = this.levels.concat(newLevels), !0) : !1
		},
		nextLevel: function() {
			return this.currentLevel + 1 < this.levels.length ? this.loadLevel(this.currentLevel + 1) : !1
		},
		previousLevel: function() {
			return 0 <= this.currentLevel - 1 ? this.loadLevel(this.currentLevel - 1) : !1
		},
		jumpTo: function(b) {
			var c = null;
			for (i = 0; i < this.levels.length; i++) this.levels[i] == b && (c = i);
			return 0 <= c ? this.loadLevel(c) : !1
		},
		firstLevel: function() {
			return this.loadLevel(0)
		},
		lastLevel: function() {
			return this.loadLevel(this.levels.length - 1)
		},
		reloadLevel: function() {
			return this.loadLevel(this.currentLevel)
		}
	})
});
ig.baked = !0;
ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
	ig.Storage = ig.Class.extend({
		staticInstantiate: function() {
			return !ig.Storage.instance ? null : ig.Storage.instance
		},
		init: function() {
			ig.Storage.instance = this
		},
		isCapable: function() {
			return "undefined" !== typeof window.localStorage
		},
		isSet: function(b) {
			return null !== this.get(b)
		},
		initUnset: function(b, c) {
			null === this.get(b) && this.set(b, c)
		},
		get: function(b) {
			if (!this.isCapable()) return null;
			try {
				return JSON.parse(localStorage.getItem(b))
			} catch (c) {
				return window.localStorage.getItem(b)
			}
		},
		getInt: function(b) {
			return ~~this.get(b)
		},
		getFloat: function(b) {
			return parseFloat(this.get(b))
		},
		getBool: function(b) {
			return !!this.get(b)
		},
		key: function(b) {
			return this.isCapable() ? window.localStorage.key(b) : null
		},
		set: function(b, c) {
			if (!this.isCapable()) return null;
			try {
				window.localStorage.setItem(b, JSON.stringify(c))
			} catch (d) {
				console.log(d)
			}
		},
		setHighest: function(b, c) {
			c > this.getFloat(b) && this.set(b, c)
		},
		remove: function(b) {
			if (!this.isCapable()) return null;
			window.localStorage.removeItem(b)
		},
		clear: function() {
			if (!this.isCapable()) return null;
			window.localStorage.clear()
		}
	})
});
ig.baked = !0;
ig.module("plugins.lagged-api").requires("impact.game", "impact.timer").defines(function() {
	ig.Game.inject({
		laggedAdShown: !1,
		laggedTimer: !1,
		laggedNomoreTimer: !1,
		laggedNomoreTimerDuration: 0,
		initLagged: function(b, c) {
			// LaggedAPI.init(b, c)
		},
		saveLaggedAward: function(b) {
			var c = [];
			c.push(b);
			// LaggedAPI.Achievements.save(c, function(b) {
			// 	b.success ? console.log("achievement saved") : console.log(b.errormsg)
			// })
		},
		saveLaggedHighscore: function(b, c) {
			var d = {};
			d.score = c;
			d.board = b;
			// LaggedAPI.Scores.save(d, function(b) {
			// 	b.success ? console.log("high score saved") : console.log(b.errormsg)
			// })
		},
		initLaggedAdTimer: function(b, c, d, e) {
			b && (this.laggedTimerDuration = b, this.laggedTimerId = c, this.laggedTimerIdImage = d);
			e && (this.laggedTimerAdOnComplete = e);
			this.laggedTimer = new ig.Timer(this.laggedTimerDuration)
		},
		update: function() {
			this.parent();
			this.laggedTimer && 0 < this.laggedTimer.delta() && (this.fnShowLaggedAd(this.laggedTimerId, this.laggedTimerIdImage, this.laggedTimerAdOnComplete || !1), this.initLaggedAdTimer())
		},
		initLaggedNomoreTimer: function() {
			this.laggedNomoreTimer = new ig.Timer(this.laggedNomoreTimerDuration)
		},
		fnShowLaggedAd: function(b, c, d) {
			// if (!this.laggedAdShown) {
			// 	if (this.laggedNomoreTimerDuration) {
			// 		if (this.laggedNomoreTimer && 0 > this.laggedNomoreTimer.delta()) return;
			// 		this.initLaggedNomoreTimer()
			// 	}
			// 	this.laggedAdShown = !0;
			// 	"undefined" === typeof prerollStart ? console.log("skip ad, prerollStart not found") 
			// 	: LaggedAPI.APIAds.show("interstitial", b, c, function(b) {
			// 		b.success ? (this.laggedAdShown = !1, console.log("ad done")) : (this.laggedAdShown = !1, console.log("ad error, continue"));
			// 		d && "function" === typeof d && d()
			// 	}.bind(this))
			// }
		}
	})
});
ig.baked = !0;
ig.module("plugins.data.color-rgb").defines(function() {
	ColorRGB = function(b, c, d, e) {
		this.r = b || 0;
		this.g = c || 0;
		this.b = d || 0;
		this.a = e || 0
	};
	ColorRGB.prototype = {
		setRandomColor: function() {
			this.r = Math.round(255 * Math.random());
			this.g = Math.round(255 * Math.random());
			this.b = Math.round(255 * Math.random())
		},
		getStyle: function() {
			return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
		},
		getHex: function() {
			for (var b = this.r.toString(16), c = this.g.toString(16), d = this.b.toString(16); 2 > b.length;) b = "0" + b;
			for (; 2 > c.length;) c = "0" +
				c;
			for (; 2 > d.length;) d = "0" + d;
			return "#" + b + c + d
		},
		getInvertedColor: function() {
			return new ColorRGB(255 - this.r, 255 - this.g, 255 - this.b, 255 - this.a)
		},
		clone: function() {
			return new ColorRGB(this.r, this.g, this.b, this.a)
		}
	}
});
this.START_BRANDING_SPLASH;
ig.baked = !0;
ig.module("plugins.branding.splash").requires("impact.impact", "impact.entity").defines(function() {
	ig.BrandingSplash = ig.Class.extend({
		init: function() {
			ig.game.spawnEntity(EntityBranding, 0, 0)
		}
	});
	EntityBranding = ig.Entity.extend({
		gravityFactor: 0,
		size: {
			x: 32,
			y: 32
		},
		splashlogo: new ig.Image("branding/logo.png"),
		init: function(b, c, d) {
			this.parent(b, c, d);
			this.pos.x = ig.system.width / 2;
			this.pos.y = ig.system.height / 2 - ig.system.height;
			b = this.tween({
				pos: {
					y: ig.system.height / 2
				}
			}, 0.5, {
				easing: ig.Tween.Easing.Bounce.EaseIn
			});
			c = this.tween({}, 2.5, {
				onComplete: function() {
					ig.game.director.loadLevel(ig.game.director.currentLevel)
				}
			});
			b.chain(c);
			b.start()
		},
		createClickableLayer: function() {
			console.log("Build clickable layer");
			this.checkClickableLayer("branding-splash", _SETTINGS.Branding.Logo.Link, !0)
		},
		doesClickableLayerExist: function(b) {
			for (k in dynamicClickableEntityDivs)
				if (k == b) return !0;
			return !1
		},
		checkClickableLayer: function(b, c, d) {
			"undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
		},
		createClickableOutboundLayer: function(b, c, d, e) {
			var f = ig.$new("div");
			f.id = b;
			document.body.appendChild(f);
			$("#" + f.id).css("float", "left");
			$("#" + f.id).css("position", "absolute");
			if (ig.ua.mobile) {
				var g = window.innerHeight / mobileHeight,
					m = window.innerWidth / mobileWidth;
				$("#" + f.id).css("left", this.pos.x * m);
				$("#" + f.id).css("top", this.pos.y * g);
				$("#" + f.id).css("width", this.size.x * m);
				$("#" + f.id).css("height", this.size.y * g)
			} else g = w / 2 - destW / 2, m = h / 2 - destH / 2, console.log(g, m), $("#" + f.id).css("left", g + this.pos.x * multiplier), $("#" + f.id).css("top", m + this.pos.y * multiplier), $("#" + f.id).css("width", this.size.x * multiplier), $("#" + f.id).css("height", this.size.y * multiplier);
			e ? $("#" + f.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + f.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
			dynamicClickableEntityDivs[b] = {};
			dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
			dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
			dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
			dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
		},
		draw: function() {
			ig.system.context.fillStyle = "#e1ebf1";
			ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
			this.splashlogo.draw(this.pos.x - this.splashlogo.width / 2, this.pos.y - this.splashlogo.height / 2);
			this.parent()
		}
	})
});
this.END_BRANDING_SPLASH;
ig.baked = !0;
ig.module("game.entities.buttons.button").requires("impact.entity", "plugins.data.vector").defines(function() {
	EntityButton = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NEVER,
		type: ig.Entity.TYPE.A,
		size: new Vector2(48, 48),
		fillColor: null,
		zIndex: 95E3,
		init: function(b, c, d) {
			this.parent(b, c, d);
			!ig.global.wm && !isNaN(d.zIndex) && (this.zIndex = d.zIndex);
			b = Math.floor(256 * Math.random());
			c = Math.floor(256 * Math.random());
			d = Math.floor(256 * Math.random());
			this.fillColor = "rgba(" + b + "," + d + "," + c + ",1)"
		},
		clicked: function() {
			throw "no implementation on clicked()";
		},
		clicking: function() {
			throw "no implementation on clicking()";
		},
		released: function() {
			throw "no implementation on released()";
		}
	})
});
ig.baked = !0;
ig.module("plugins.clickable-div-layer").requires("plugins.data.vector").defines(function() {
	ClickableDivLayer = ig.Class.extend({
		pos: new Vector2(0, 0),
		size: new Vector2(0, 0),
		identifier: null,
		invisImagePath: "media/graphics/misc/invisible.png",
		init: function(b) {
			this.pos = new Vector2(b.pos.x, b.pos.y);
			this.size = new Vector2(b.size.x, b.size.y);
			var c = "more-games",
				d = "www.google.com",
				e = !1;
			b.div_layer_name && (c = b.div_layer_name);
			b.link && (d = b.link);
			b.newWindow && (e = b.newWindow);
			this.createClickableLayer(c, d, e)
		},
		createClickableLayer: function(b, c, d) {
			this.identifier = b;
			var e = ig.domHandler.getElementById("#" + b);
			e ? (ig.domHandler.show(e), ig.domHandler.attr(e, "href", c)) : this.createClickableOutboundLayer(b, c, this.invisImagePath, d)
		},
		update: function(b, c) {
			this.pos.x === b && this.pos.y === c || (ig.sizeHandler.dynamicClickableEntityDivs[this.identifier] = {}, ig.sizeHandler.dynamicClickableEntityDivs[this.identifier].width = this.size.x, ig.sizeHandler.dynamicClickableEntityDivs[this.identifier].height = this.size.y, ig.sizeHandler.dynamicClickableEntityDivs[this.identifier].entity_pos_x = this.pos.x, ig.sizeHandler.dynamicClickableEntityDivs[this.identifier].entity_pos_y = this.pos.y)
		},
		createClickableOutboundLayer: function(b, c, d, e) {
			var f = ig.domHandler.create("div");
			ig.domHandler.attr(f, "id", b);
			var g = ig.domHandler.create("a");
			e ? (ig.domHandler.attr(g, "href", c), ig.domHandler.attr(g, "target", "_blank")) : ig.domHandler.attr(g, "href", c);
			c = ig.domHandler.create("img");
			ig.domHandler.css(c, {
				width: "100%",
				height: "100%"
			});
			ig.domHandler.attr(c, "src", d);
			d = Math.min(ig.sizeHandler.scaleRatioMultiplier.x, ig.sizeHandler.scaleRatioMultiplier.y);
			if (ig.ua.mobile) {
				e = ig.domHandler.getElementById("#canvas");
				e = ig.domHandler.getOffsets(e);
				var m = e.left,
					l = e.top;
				console.log(e.left);
				ig.sizeHandler.disableStretchToFitOnMobileFlag ? (e = Math.floor(m + this.pos.x * ig.sizeHandler.scaleRatioMultiplier.x) + "px", l = Math.floor(l + this.pos.y * ig.sizeHandler.scaleRatioMultiplier.y) + "px", m = Math.floor(this.size.x * ig.sizeHandler.scaleRatioMultiplier.x) + "px", d = Math.floor(this.size.y * ig.sizeHandler.scaleRatioMultiplier.y) + "px") : (e = Math.floor(this.pos.x * ig.sizeHandler.sizeRatio.x) + "px", l = Math.floor(this.pos.y * ig.sizeHandler.sizeRatio.y) + "px", m = Math.floor(this.size.x * ig.sizeHandler.sizeRatio.x) + "px", d = Math.floor(this.size.y * ig.sizeHandler.sizeRatio.y) + "px")
			} else e = ig.domHandler.getElementById("#canvas"), e = ig.domHandler.getOffsets(e), m = e.left, l = e.top, ig.sizeHandler.enableStretchToFitOnDesktopFlag ? (e = Math.floor(m + this.pos.x * ig.sizeHandler.sizeRatio.x) + "px", l = Math.floor(l + this.pos.y * ig.sizeHandler.sizeRatio.y) + "px", m = Math.floor(this.size.x * ig.sizeHandler.sizeRatio.x) +
				"px", d = Math.floor(this.size.y * ig.sizeHandler.sizeRatio.y) + "px") : (e = Math.floor(m + this.pos.x * d) + "px", l = Math.floor(l + this.pos.y * d) + "px", m = Math.floor(this.size.x * d) + "px", d = Math.floor(this.size.y * d) + "px");
			ig.domHandler.css(f, {
				"float": "left",
				position: "absolute",
				left: e,
				top: l,
				width: m,
				height: d,
				"z-index": 3
			});
			ig.domHandler.addEvent(f, "mousemove", ig.input.mousemove.bind(ig.input), !1);
			ig.domHandler.appendChild(g, c);
			ig.domHandler.appendChild(f, g);
			ig.domHandler.appendToBody(f);
			ig.sizeHandler.dynamicClickableEntityDivs[b] = {};
			ig.sizeHandler.dynamicClickableEntityDivs[b].width = this.size.x;
			ig.sizeHandler.dynamicClickableEntityDivs[b].height = this.size.y;
			ig.sizeHandler.dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
			ig.sizeHandler.dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
		}
	})
});
ig.baked = !0;
ig.module("game.entities.buttons.button-branding-logo").requires("game.entities.buttons.button", "plugins.clickable-div-layer").defines(function() {
	EntityButtonBrandingLogo = EntityButton.extend({
		type: ig.Entity.TYPE.A,
		gravityFactor: 0,
		logo: new ig.AnimationSheet("branding/logo.png", _SETTINGS.Branding.Logo.Width, _SETTINGS.Branding.Logo.Height),
		zIndex: 10001,
		size: {
			x: 64,
			y: 66
		},
		clickableLayer: null,
		link: null,
		newWindow: !1,
		div_layer_name: "branding-logo",
		name: "brandinglogo",
		init: function(b, c, d) {
			this.parent(b, c, d);
			if (!ig.global.wm) {
				if ("undefined" == typeof wm)
					if (_SETTINGS.Branding.Logo.Enabled) this.size.x = _SETTINGS.Branding.Logo.Width, this.size.y = _SETTINGS.Branding.Logo.Height, this.anims.idle = new ig.Animation(this.logo, 0, [0], !0), this.currentAnim = this.anims.idle, d && d.centralize && (this.pos.x = ig.system.width / 2 - this.size.x / 2, console.log("centralize true ... centering branded logo ...")), _SETTINGS.Branding.Logo.LinkEnabled && (this.link = _SETTINGS.Branding.Logo.Link, this.newWindow = _SETTINGS.Branding.Logo.NewWindow, this.clickableLayer = new ClickableDivLayer(this));
					else {
						this.kill();
						return
					}
				this.div_layer_name = d.div_layer_name ? d.div_layer_name : "branding-logo"
			}
		},
		show: function() {
			var b = ig.domHandler.getElementById("#" + this.div_layer_name);
			ig.domHandler.show(b)
		},
		hide: function() {
			var b = ig.domHandler.getElementById("#" + this.div_layer_name);
			ig.domHandler.hide(b)
		},
		clicked: function() {},
		clicking: function() {},
		released: function() {}
	})
});
ig.baked = !0;
ig.module("game.entities.branding-logo-placeholder").requires("impact.entity", "game.entities.buttons.button-branding-logo").defines(function() {
	EntityBrandingLogoPlaceholder = ig.Entity.extend({
		gravityFactor: 0,
		size: {
			x: 32,
			y: 32
		},
		_wmDrawBox: !0,
		_wmBoxColor: "rgba(0, 0, 255, 0.7)",
		init: function(b, c, d) {
			this.parent(b, c, d);
			if (d) switch (console.log("settings found ... using that div layer name"), b = d.div_layer_name, console.log("settings.centralize:", d.centralize), d.centralize) {
				case "true":
					console.log("centralize true");
					centralize = !0;
					break;
				case "false":
					console.log("centralize false");
					centralize = !1;
					break;
				default:
					console.log("default ... centralize false"), centralize = !1
			} else b = "branding-logo", centralize = !1;
			if ("undefined" == typeof wm) {
				if (_SETTINGS.Branding.Logo.Enabled) try {
					ig.game.spawnEntity(EntityButtonBrandingLogo, this.pos.x, this.pos.y, {
						div_layer_name: b,
						centralize: centralize
					})
				} catch (e) {
					console.log(e)
				}
				this.kill()
			}
		}
	})
});
ig.baked = !0;
ig.module("game.entities.buttons.button-more-games").requires("game.entities.buttons.button", "plugins.clickable-div-layer").defines(function() {
	EntityButtonMoreGames = EntityButton.extend({
		type: ig.Entity.TYPE.A,
		gravityFactor: 0,
		logo: new ig.AnimationSheet("media/graphics/sprites/btn_more_games.png", 64, 66),
		size: {
			x: 64,
			y: 66
		},
		zIndex: 750,
		clickableLayer: null,
		link: null,
		newWindow: !1,
		div_layer_name: "more-games",
		name: "moregames",
		init: function(b, c, d) {
			this.parent(b, c, d);
			ig.global.wm || (this.div_layer_name = d.div_layer_name ? d.div_layer_name : "more-games", _SETTINGS.MoreGames.Enabled ? (this.anims.idle = new ig.Animation(this.logo, 0, [0], !0), this.currentAnim = this.anims.idle, _SETTINGS.MoreGames.Link && (this.link = _SETTINGS.MoreGames.Link), _SETTINGS.MoreGames.NewWindow && (this.newWindow = _SETTINGS.MoreGames.NewWindow), this.clickableLayer = new ClickableDivLayer(this)) : this.kill())
		},
		show: function() {
			var b = ig.domHandler.getElementById("#" + this.div_layer_name);
			ig.domHandler.show(b)
		},
		hide: function() {
			var b = ig.domHandler.getElementById("#" +
				this.div_layer_name);
			ig.domHandler.hide(b)
		},
		clicked: function() {},
		clicking: function() {},
		released: function() {}
	})
});
ig.baked = !0;
ig.module("game.entities.opening-shield").requires("impact.entity").defines(function() {
	EntityOpeningShield = ig.Entity.extend({
		size: {
			x: 48,
			y: 48
		},
		move: 0,
		mIconAnim: 0,
		shieldAnim: 0,
		titleAnim: 0,
		shieldImage: new ig.Image("media/graphics/opening/shield.png"),
		mIconImage: new ig.Image("media/graphics/opening/m_icon.png"),
		titleImage: new ig.Image("media/graphics/opening/title.png"),
		init: function(b, c, d) {
			this.parent(b, c, d)
		},
		ready: function() {
			if (!ig.wm)
				if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
					this.initTimer = new ig.Timer(0.1);
					try {
						ig.soundHandler.playSound(ig.soundHandler.SOUNDID.openingSound)
					} catch (b) {
						console.log(b)
					}
				} else ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1, this.kill()
		},
		update: function() {
			this.parent();
			this.updateOriginalShieldOpening()
		},
		draw: function() {
			this.parent();
			ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawOriginalShieldOpening())
		},
		updateOriginalShieldOpening: function() {
			this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.sheildTimer = new ig.Timer(0.05));
			this.sheildTimer && 0 < this.sheildTimer.delta() && (3 > this.shieldAnim ? (this.shieldAnim++, this.sheildTimer.reset()) : (this.sheildTimer = null, this.moveTimer = new ig.Timer(0.001), this.mIconTimer = new ig.Timer(0.05), this.titleTimer = new ig.Timer(0.15)));
			this.moveTimer && 0 < this.moveTimer.delta() && (this.move += 0.3, this.moveTimer.reset());
			this.mIconTimer && 0 < this.mIconTimer.delta() && (12 > this.mIconAnim ? (this.mIconAnim++, this.moveTimer.reset()) : this.mIconTimer = null);
			this.titleTimer && 0 < this.titleTimer.delta() && (11 > this.titleAnim ? (this.titleAnim++, this.titleTimer.reset()) : (this.titleTimer = null, this.nextLevelTimer = new ig.Timer(1)));
			this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
		},
		drawOriginalShieldOpening: function() {
			if (this.moveTimer) {
				var b = ig.system.context;
				b.save();
				var c = ig.system.width / 2,
					d = ig.system.height / 2;
				b.translate(c, d);
				b.rotate(this.move * Math.PI / 180);
				b.beginPath();
				b.moveTo(0, 0);
				for (var e = 0, f = 1; 48 >= f; f += 1) b.lineTo(0 + 800 * Math.cos(2 * f * Math.PI / 48), 0 + 800 * Math.sin(2 * f * Math.PI / 48)), e++, 2 == e && (e = 0, b.lineTo(0, 0));
				b.translate(-c, -d);
				c = b.createRadialGradient(c, d, 100, c, d, 250);
				c.addColorStop(0, "rgba(255,255,255,0.1)");
				c.addColorStop(1, "rgba(0,0,0,0)");
				b.fillStyle = c;
				b.fill();
				b.restore()
			}
			this.shieldImage.drawTile(ig.system.width / 2 - 91, 0 - (768 - ig.system.height) / 2, this.shieldAnim, 182, 768);
			this.moveTimer && (this.mIconImage.drawTile(ig.system.width / 2 - 96, ig.system.height / 2 - 70, this.mIconAnim, 166, 160), this.titleImage.drawTile(ig.system.width / 2 - 204, ig.system.height / 2 + 100, this.titleAnim, 409, 76));
			ig.system.context.globalAlpha = 1
		}
	})
});
ig.baked = !0;
ig.module("game.entities.opening-kitty").requires("impact.entity").defines(function() {
	EntityOpeningKitty = ig.Entity.extend({
		size: {
			x: 48,
			y: 48
		},
		kittyAnim: -1,
		kittyImage: new ig.Image("media/graphics/opening/kitty.png"),
		kittyTitleImage: new ig.Image("media/graphics/opening/kittytitle.png"),
		soundKey: "kittyopeningSound",
		init: function(b, c, d) {
			this.parent(b, c, d)
		},
		ready: function() {
			if (!ig.wm)
				if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
					this.initTimer = new ig.Timer(0.1);
					try {
						ig.soundHandler.sfxPlayer.play(this.soundKey)
					} catch (b) {
						console.log(b)
					}
				} else ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1, this.kill()
		},
		update: function() {
			this.parent();
			this.updateKittyOpening()
		},
		draw: function() {
			this.parent();
			ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawKittyOpening())
		},
		updateKittyOpening: function() {
			this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.kittyTimer = new ig.Timer(0.15));
			this.kittyTimer && 0 < this.kittyTimer.delta() && (7 > this.kittyAnim ? (this.kittyAnim++, this.kittyTimer.reset()) : (this.kittyTimer = null, this.nextLevelTimer = new ig.Timer(2)));
			this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
		},
		drawKittyOpening: function() {
			var b = ig.system.context.createLinearGradient(0, 0, 0, ig.system.height);
			b.addColorStop(0, "#ffed94");
			b.addColorStop(1, "#ffcd85");
			ig.system.context.fillStyle = b;
			ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
			0 <= this.kittyAnim && (this.kittyImage.drawTile(ig.system.width / 2 - this.kittyImage.width / 8, ig.system.height / 2 - this.kittyImage.height / 4, this.kittyAnim, 218, 325), this.kittyTitleImage.drawTile(ig.system.width / 2 - this.kittyTitleImage.width / 2, ig.system.height / 2 + this.kittyImage.height / 4 + 10, this.kittyAnim, 380, 37));
			ig.system.context.globalAlpha = 1
		}
	})
});
ig.baked = !0;
ig.module("game.entities.pointer").requires("impact.entity").defines(function() {
	EntityPointer = ig.Entity.extend({
		checkAgainst: ig.Entity.TYPE.BOTH,
		size: new Vector2(1, 1),
		isFirstPressed: !1,
		isPressed: !1,
		isReleased: !1,
		isHovering: !1,
		hoveringItem: null,
		objectArray: [],
		clickedObjectList: [],
		ignorePause: !0,
		zIndex: 5500,
		check: function(b) {
			this.objectArray.push(b)
		},
		clickObject: function(b) {
			this.isFirstPressed && "function" == typeof b.clicked && (b.clicked(), this.addToClickedObjectList(b));
			this.isPressed && !this.isReleased && "function" == typeof b.clicking && b.clicking();
			this.isReleased && "function" == typeof b.released && (b.released(), this.removeFromClickedObjectList(b))
		},
		refreshPos: function() {
			this.pos = ig.game.io.getClickPos()
		},
		update: function() {
			this.parent();
			this.refreshPos();
			var b = null,
				c = -1;
			for (a = this.objectArray.length - 1; - 1 < a; a--) this.objectArray[a].zIndex > c && (c = this.objectArray[a].zIndex, b = this.objectArray[a]);
			if (null != b) null != this.hoveringItem ? this.hoveringItem != b && ("function" == typeof this.hoveringItem.leave && this.hoveringItem.leave(), "function" == typeof b.over && b.over()) : "function" == typeof b.over && b.over(), this.hoveringItem = b, this.clickObject(b), this.objectArray = [];
			else if (null != this.hoveringItem && "function" == typeof this.hoveringItem.leave && (this.hoveringItem.leave(), this.hoveringItem = null), this.isReleased) {
				for (b = 0; b < this.clickedObjectList.length; b++) c = this.clickedObjectList[b], "function" == typeof c.releasedOutside && c.releasedOutside();
				this.clickedObjectList = []
			}
			this.isFirstPressed = ig.input.pressed("click");
			this.isReleased = ig.input.released("click");
			this.isPressed = ig.input.state("click")
		},
		addToClickedObjectList: function(b) {
			this.clickedObjectList.push(b)
		},
		removeFromClickedObjectList: function(b) {
			for (var c = [], d = 0; d < this.clickedObjectList.length; d++) {
				var e = this.clickedObjectList[d];
				e != b && c.push(e)
			}
			this.clickedObjectList = c
		}
	})
});
ig.baked = !0;
ig.module("game.entities.pointer-selector").requires("game.entities.pointer").defines(function() {
	EntityPointerSelector = EntityPointer.extend({
		zIndex: 1E3,
		_wmDrawBox: !0,
		_wmBoxColor: "rgba(0, 0, 255, 0.7)",
		size: {
			x: 20,
			y: 20
		},
		init: function(b, c, d) {
			this.parent(b, c, d)
		}
	})
});
ig.baked = !0;
ig.module("game.entities.select").requires("impact.entity").defines(function() {
	EntitySelect = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		canSelect: !1,
		canSelectTimerDuration: 0.35,
		zIndex: 99999,
		isHovering: !1,
		isSelected: !1,
		init: function(b, c, d) {
			this.parent(b, c, d);
			this.canSelectTimer = new ig.Timer(this.canSelectTimerDuration)
		},
		doesClickableLayerExist: function(b) {
			for (k in dynamicClickableEntityDivs)
				if (k == b) return !0;
			return !1
		},
		checkClickableLayer: function(b, c, d) {
			"undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
		},
		createClickableOutboundLayer: function(b, c, d, e) {
			var f = ig.$new("div");
			f.id = b;
			document.body.appendChild(f);
			$("#" + f.id).css("float", "left");
			$("#" + f.id).css("width", this.size.x * multiplier);
			$("#" + f.id).css("height", this.size.y * multiplier);
			$("#" + f.id).css("position", "absolute");
			var g = w / 2 - destW / 2,
				m = h / 2 - destH / 2;
			w == mobileWidth ? ($("#" + f.id).css("left", this.pos.x), $("#" + f.id).css("top", this.pos.y)) : ($("#" + f.id).css("left", g + this.pos.x * multiplier), $("#" + f.id).css("top", m + this.pos.y * multiplier));
			e ? $("#" + f.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + f.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
			dynamicClickableEntityDivs[b] = {};
			dynamicClickableEntityDivs[b].width = $("#" + f.id).width();
			dynamicClickableEntityDivs[b].height = $("#" + f.id).height();
			dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
			dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
		},
		hovered: function() {
			this.isHovering = !0;
			this.dehoverOthers()
		},
		dehoverOthers: function() {
			var b = ig.game.getEntitiesByType(EntitySelect);
			for (i = 0; i < b.length; i++) b[i] != this && (b[i].isHovering = !1)
		},
		deselectOthers: function() {
			var b = ig.game.getEntitiesByType(EntitySelect);
			for (i = 0; i < b.length; i++) b[i] != this && (b[i].isSelected = !1)
		},
		update: function() {
			this.parent();
			this.canSelectTimer && 0 < this.canSelectTimer.delta() && (this.canSelect = !0, this.canSelectTimer = null)
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.ball").requires("plugins.box2d.entity").defines(function() {
	EntityBall = ig.Box2DEntity.extend({
		editorMode: !1,
		ballType: 1,
		maxPower: 500,
		prevPos: [],
		paths: [],
		name: "ball",
		trial: 1,
		isActive: !0,
		isBall: !0,
		notFlying: !0,
		shouldCollide: !0,
		init: function(b, c, d) {
			d.ballType && (this.ballType = d.ballType);
			this.parent(b, c, d);
			this.vel0 = {};
			this.points = [];
			this.flyingTimer = new ig.Timer(0.2);
			this.flyingTimer.pause()
		},
		setProperties: function(b, c) {
			this.parent(b, c);
			this.create()
		},
		setBodyProperties: function() {
			this.density = 0.2;
			this.friction = 1;
			this.restitution = 0.6
		},
		createBody: function() {
			this.parent();
			this.body.SetLinearDamping(1);
			this.body.SetAngularDamping(1)
		},
		create: function() {
			this.box2dType = 1;
			this.inputEnabled = !0;
			this.setAnimSize();
			for (var b = 1; 3 >= b; b++) this.addAnim("" + b, 0.1, [b - 1], !0);
			this.playAnim(this.ballType);
			this.dots = [];
			for (b = 0; 8 > b; b++) {
				var c = ig.game.addImage(0, 0, "sprites", "game/direction-dot");
				c.anchor.setTo(0.5);
				c.visible = !1;
				this.addChild(c);
				this.dots.push(c)
			}
		},
		preSolve: function(b, c) {
			b && b.isBall & !b.isActive && c.SetEnabled(!1)
		},
		prepareShot: function() {
			this.body.SetLinearDamping(0.2);
			this.body.SetAngularDamping(0.2);
			this.flyingTimer.unpause();
			var b = ig.game.pointer.pos;
			this.setDirection(b.x, b.y);
			this.shotBall(b.x, b.y)
		},
		shotBall: function() {
			if (this.body) {
				csound.sfxPlay("kick");
				var b = this.body.GetLinearVelocity();
				b.x = 1.62 * this.vel0.x;
				b.y = 1.62 * this.vel0.y;
				this.body.SetLinearVelocity(b)
			}
			this.points = []
		},
		setDirection: function(b, c) {
			var d = this.x,
				e = this.y,
				f = ig.game.math.distance(d, e, b, c);
			550 < f && (f = 550);
			var g = -ig.game.math.angleBetween(d, e, b, c);
			this.vel0.x = 2 * f * Math.cos(g) * Box2D.SCALE;
			this.vel0.y = 2 * f * Math.sin(g) * Box2D.SCALE;
			f = f * Math.cos(g) * Box2D.SCALE / 6;
			this.points.splice(0);
			for (var g = ig.game.gravity * Box2D.SCALE, m = 0; 9 > m; m++) {
				var l = {};
				l.x = f * m;
				var j = l.x / this.vel0.x;
				l.x += d * Box2D.SCALE;
				l.y = e * Box2D.SCALE - (this.vel0.y * j - 0.5 * g * j * j);
				this.points.push(l)
			}
		},
		posDots: function() {
			for (var b = this.dots[0].x, c = this.dots[0].y, d = 0, e = 0; e < this.dots.length; e++) {
				var f = this.dots[e],
					g = 0,
					m = d + 1;
				a: for (; m < this.paths.length; m++) {
					var l = this.paths[m],
						j = this.paths[m -
							1],
						j = ig.game.math.distance(j.x, j.y, l.x, l.y),
						g = g + j;
					if (50 <= g) {
						c = l.y - this.y;
						b = l.x - this.x;
						d = m;
						break a
					}
				}
				f.x = b;
				f.y = c
			}
		},
		editorType: function() {
			this.body && this.killBody();
			this.isActive = !0;
			this.alpha = 1;
			this.editorMode = this.inputEnabled = !0;
			this.createPhysic = !1;
			this.onClick = new ig.AddSignal(this);
			this.onRelease = new ig.AddSignal(this);
			this.onClick.add(function() {
				1 == curState().modeId && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), curState().ballActive = this)
			}, this)
		},
		playType: function() {
			this.body || (this.setBodyProperties(), this.isReady = !1);
			this.trial = 1;
			this.createPhysic = !0;
			this.editorMode = !1;
			this.onClick = new ig.AddSignal(this);
			this.onClick.add(function() {
				this.startPos = ig.game.pointer.pos;
				curState().gameStart || (curState().gameStart = !0, curState().timer = new ig.Timer)
			}, this);
			this.onRelease = new ig.AddSignal(this);
			this.onRelease.add(function() {
				this.startPos = null;
				1 == this.ballType ? this.prepareShot() : 3 == this.ballType && 0 < this.trial && (this.trial--, this.prepareShot())
			}, this);
			this.inputEnabled = 2 != this.ballType ? !0 : !1
		},
		editorUpdate: function() {
			if (1 == curState().modeId)
				if (this.isClicked) {
					var b = ig.game.pointer.pos;
					this.x = b.x;
					this.y = b.y
				} else curState().ballActive == this && (ig.input.pressed("up") && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), this.y -= 0.5), ig.input.pressed("down") && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), this.y += 0.5), ig.input.pressed("left") && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), this.x -= 0.5), ig.input.pressed("right") && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), this.x += 0.5), ig.input.pressed("next") && (b = this.ballType + 1, 3 >= b && (this.ballType++, this.playAnim(this.ballType))), ig.input.pressed("prev") && (b = this.ballType - 1, 0 < b && (this.ballType--, this.playAnim(this.ballType))), ig.input.state("ctrl") && (ig.input.pressed("z") && !(0 >= this.prevPos.length)) && (b = this.prevPos[this.prevPos.length - 1], this.prevPos.splice(this.prevPos.length - 1, 1), this.position.setTo(b.x, b.y)))
		},
		dotOn: function() {
			for (var b = 0; b < this.dots.length; b++) this.dots[b].visible = !0
		},
		dotOff: function() {
			for (var b = 0; b < this.dots.length; b++) {
				var c = this.dots[b];
				c.visible = !1;
				c.x = 0;
				c.y = 0
			}
		},
		checkGoal: function() {
			if (this.isActive && curState().gameStart)
				for (var b = this.x - 0.3 * this.size.x, c = this.x + 0.3 * this.size.x, d = this.y - 0.5 * this.size.y, e = this.y + 0.4 * this.size.y, f = curState().goals, g = 0; g < f.length; g++) {
					var m = f[g].goalBase,
						l = m.pos.x + m.size.x,
						j = m.pos.y,
						q = m.pos.y + m.size.y;
					b > m.pos.x && c < l && (d > j && e < q) && (this.isActive = !1, this.alpha = 0.5, this.inputEnabled = !1, curState().createGoalBoard())
				}
		},
		playUpdate: function() {
			this.notFlying && 0 < this.flyingTimer.delta() && (this.notFlying = !1, this.flyingTimer.reset(), this.flyingTimer.pause());
			if (this.isClicked) {
				if (3 == this.ballType && 1 > this.trial) return;
				var b = ig.game.pointer.pos;
				this.setDirection(b.x, b.y)
			}
			this.checkGoal()
		},
		update: function() {
			this.parent();
			this.editorMode ? this.editorUpdate() : this.playUpdate();
			if (this.body) {
				var b = this.x - 0.5 * this.size.x,
					c = this.y - 0.5 * this.size.y,
					d = this.y + 0.5 * this.size.y;
				(0 > this.x + 0.5 * this.size.x || b > curState().gw || 0 > d || c > curState().gh) && this.isActive && ig.game.changePage(ig.game.director.currentLevel);
				b = this.body.GetLinearVelocity();
				c = this.body.GetAngularVelocity();
				1 > Math.abs(c) ? 1 > Math.abs(b.x) && 1 > Math.abs(b.y) && (b = new Box2D.Common.Math.b2Vec2(0, 0), this.body.SetLinearVelocity(b), this.isActive && 2 != this.ballType && (this.inputEnabled = !0)) : this.isActive && 2 != this.ballType && (this.inputEnabled = !1);
				1 > this.trial && (this.inputEnabled = !1)
			}
		},
		draw: function() {
			this.parent();
			if (this.editorMode) {
				if (curState().ballActive == this) {
					var b = this.getBounds();
					ig.game.geomDebug.rect(b, "red", 0.2)
				}
			} else if (this.isClicked) {
				for (b = 0; b < this.points.length; b++) {
					var c = this.points[b],
						c = ig.game.geom.circle(c.x / Box2D.SCALE, c.y / Box2D.SCALE, 10);
					ig.game.geomDebug.circle(c, "blue", 0.5)
				}
				curState()
			}
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.goal-pole").requires("plugins.box2d.entity").defines(function() {
	EntityGoalPole = ig.Box2DEntity.extend({
		editorMode: !1,
		prevPos: [],
		verticesPoints1: [
			[{
				x: -4.7,
				y: -7.35
			}, {
				x: 1.68,
				y: -6.82
			}, {
				x: 1.76,
				y: -5.92
			}, {
				x: -4.7,
				y: -6.45
			}],
			[{
				x: 0.58,
				y: -6.97
			}, {
				x: 1.38,
				y: -6.9
			}, {
				x: 4.7,
				y: 7.35
			}, {
				x: 4.04,
				y: 7.35
			}]
		],
		verticesPoints2: [
			[{
				x: -1.76,
				y: -6.9
			}, {
				x: 4.7,
				y: -7.35
			}, {
				x: 4.7,
				y: -6.75
			}, {
				x: -1.84,
				y: -6.14
			}],
			[{
				x: -1.76,
				y: -6.9
			}, {
				x: -0.73,
				y: -6.9
			}, {
				x: -4.04,
				y: 7.27
			}, {
				x: -5,
				y: 7.27
			}]
		],
		init: function(b, c, d) {
			this.parent(b, c, d)
		},
		editorType: function() {
			this.body && this.killBody();
			this.createPhysic = !1;
			this.editorMode = !0
		},
		playType: function() {
			this.body || (this.dynamicType = this.box2dType = 2, this.isReady = !1);
			this.createPhysic = !0;
			this.editorMode = !1
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.ground").requires("plugins.box2d.entity").defines(function() {
	EntityGround = ig.Box2DEntity.extend({
		groundVertices: [
			[{
				x: -5.05,
				y: -5.05
			}, {
				x: 5.05,
				y: 5.05
			}, {
				x: -5.05,
				y: 5.05
			}],
			[{
				x: 5.05,
				y: -5.05
			}, {
				x: 5.05,
				y: 5.05
			}, {
				x: -5.05,
				y: 5.05
			}]
		],
		groundType: 1,
		editorType: !1,
		maxGround: 16,
		prevPos: [],
		init: function(b, c, d) {
			this.parent(b, c, d);
			d.groundType && (this.groundType = d.groundType);
			d.createPhysic && (this.createPhysic = d.createPhysic)
		},
		setDynamicType: function() {
			this.density = 0;
			this.friction = 1;
			this.restitution = 0;
			this.dynamicType = 2;
			12 < this.groundType && 15 > this.groundType ? (this.vertices = this.groundVertices[this.groundType - 13], this.box2dType = 2) : this.box2dType = 0
		},
		setProperties: function(b, c) {
			this.parent(b, c);
			this.setAnimSize();
			for (var d = 1; d <= this.maxGround; d++) this.addAnim("" + d, 0.1, [d - 1], !0);
			this.playAnim(this.groundType)
		},
		editorType: function() {
			this.body && this.killBody();
			this.createPhysic = !1;
			this.inputEnabled = this.editorMode = !0;
			this.onClick.add(function() {
				0 == curState().modeId && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), curState().blockActive = this)
			}, this)
		},
		playType: function() {
			this.setDynamicType();
			this.body || (this.isReady = !1);
			this.createPhysic = !0;
			this.inputEnabled = this.editorMode = !1;
			this.onClick = new ig.AddSignal(this)
		},
		editorUpdate: function() {
			if (0 == curState().modeId) {
				if (curState().blockActive == this) {
					ig.input.pressed("up") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y -= 0.5);
					ig.input.pressed("down") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y += 0.5);
					ig.input.pressed("left") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x -= 0.5);
					ig.input.pressed("right") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x += 0.5);
					if (ig.input.pressed("next")) {
						var b = this.groundType + 1;
						b <= this.maxGround && (this.groundType++, this.playAnim(this.groundType))
					}
					ig.input.pressed("prev") && (b = this.groundType - 1, 0 < b && (this.groundType--, this.playAnim(this.groundType)));
					if (ig.input.state("ctrl") && ig.input.pressed("z")) {
						if (0 >= this.prevPos.length) return;
						b = this.prevPos[this.prevPos.length - 1];
						this.prevPos.splice(this.prevPos.length - 1, 1);
						this.position.setTo(b.x, b.y)
					}
				}
				this.isClicked && (b = ig.game.pointer.pos, this.x = b.x, this.y = b.y)
			}
		},
		update: function() {
			this.parent();
			this.editorType && this.editorUpdate()
		},
		draw: function() {
			this.parent();
			if (this.editorMode && curState().blockActive == this) {
				var b = this.getBounds();
				ig.game.geomDebug.rect(b, "red", 0.2)
			}
		},
		beginContact: function(b) {
			b && (b.isBall && !b.notFlying) && (b.body.SetLinearDamping(1), b.body.SetAngularDamping(1), b.notFlying = !0)
		}
	})
});
ig.baked = !0;
ig.module("game.entities.objects.moving-object").requires("plugins.box2d.entity").defines(function() {
	EntityMovingObject = ig.Box2DEntity.extend({
		editorMode: !1,
		prevPos: [],
		animationDatas: [{
			jumping: [0.1, [0, 1, 2], !0],
			isJumping: [0.05, [3, 4, 5, 6, 7, 8], !0],
			landing: [0.05, [9, 10, 11, 12, 13, 0], !0]
		}, {
			idle: [0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], !1]
		}],
		boxType: [2, 0],
		verticeDatas: [
			[{
				x: -2.75,
				y: -1.03
			}, {
				x: 2.53,
				y: -1.18
			}, {
				x: 3.51,
				y: 3.67
			}, {
				x: -3.58,
				y: 3.75
			}]
		],
		editId: 0,
		init: function(b, c, d) {
			this.parent(b, c, d);
			d && d.objId && (this.objId = d.objId)
		},
		setProperties: function(b, c) {
			c += this.objId;
			this.parent(b, c);
			this.setAnimSize();
			this.setAnimations()
		},
		setMoveDatas: function(b, c, d) {
			this.moveData = {
				minY: b,
				maxY: c,
				dur: d
			}
		},
		setAnimations: function() {
			var b = this.objId - 1,
				c = this.animationDatas[b],
				d;
			for (d in c) this.addAnim(d, c[d][0], c[d][1], c[d][2]);
			this.setMoveTween();
			this.box2dType = this.boxType[b];
			this.vertices = this.verticeDatas[b];
			this.playAnim("idle")
		},
		setMoveTween: function() {
			this.anims.jumping && this.anims.landing && this.anims.jumping.onComplete.add(function() {
				this.jumpTween()
			}, this)
		},
		jumpTween: function() {
			this.playAnim("isJumping");
			var b = ig.Tweener.Easing.Circular.EaseOut,
				c = this.moveData.maxY,
				d = this.moveData.dur;
			(new Tweener(this)).to({
				y: c
			}, d).easing(b).onComplete(function() {
				this.landingTween()
			}.bind(this)).start()
		},
		landingTween: function() {
			var b = ig.Tweener.Easing.Circular.EaseIn,
				c = this.moveData.minY,
				d = this.moveData.dur;
			(new Tweener(this)).to({
				y: c
			}, d).easing(b).onComplete(function() {
				this.playAnim("landing");
				this.editorMode || this.playAnim("jumping")
			}.bind(this)).start()
		},
		editorType: function() {
			var b = ["position", "maxY"];
			this.editMode = b;
			this.body && this.killBody();
			this.editTxt ? this.editTxt.setText(b[this.editId]) : (this.editTxt = ig.game.addText(0, 0, b[this.editId], 20, fonts.font1), this.editTxt.anchor.setTo(0.5), this.editTxt.fill = "yellow", this.addChild(this.editTxt));
			this.createPhysic = !1;
			this.inputEnabled = this.editorMode = !0;
			this.onClick = new ig.AddSignal(this);
			this.onClick.add(function() {
				4 == curState().modeId && (this.prevPos.push({
					x: this.x,
					y: this.y
				}), curState().moveActive = this)
			}, this);
			this.onRelease.add(function() {
				1 == this.editId && (this.position.setTo(this.x, this.moveData.minY), this.editId = 0, this.editTxt.setText(this.editMode[this.editId]))
			}, this)
		},
		playType: function() {
			this.body || (this.isReady = !1, this.dynamicType = 2);
			this.editTxt && this.editTxt.setText("");
			this.createPhysic = !0;
			this.inputEnabled = this.editorMode = !1;
			this.onClick = new ig.AddSignal(this);
			this.onRelease = new ig.AddSignal(this);
			this.playAnim("jumping")
		},
		editorUpdate: function() {
			if (4 == curState().modeId) {
				if (curState().moveActive == this) {
					ig.input.pressed("up") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y -= 0.5);
					ig.input.pressed("down") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.y += 0.5);
					ig.input.pressed("left") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x -= 0.5);
					ig.input.pressed("right") && (this.prevPos.push({
						x: this.x,
						y: this.y
					}), this.x += 0.5);
					if (ig.input.pressed("next")) {
						var b = this.editId + 1;
						b < this.editMode.length && (this.editId++, this.editTxt.setText(this.editMode[this.editId]))
					}
					ig.input.pressed("prev") && (b = this.editId - 1, 0 <= b && (this.editId--, this.editTxt.setText(this.editMode[this.editId])));
					if (ig.input.state("ctrl") && ig.input.pressed("z")) {
						if (0 >= this.prevPos.length) return;
						b = this.prevPos[this.prevPos.length - 1];
						this.prevPos.splice(this.prevPos.length - 1, 1);
						this.position.setTo(b.x, b.y);
						1 == this.editId ? this.moveData.maxY = b.y : this.moveData.minY = b.y
					}
				}
				this.isClicked && (b = ig.game.pointer.pos, this.y = b.y, 0 == this.editId ? (this.x = b.x, this.moveData.minY = this.y) : this.moveData.maxY = this.y)
			}
		},
		update: function() {
			this.parent();
			this.editorType && this.editorUpdate()
		},
		draw: function() {
			this.parent();
			if (this.editorMode && curState().moveActive == this) {
				var b = this.getBounds();
				ig.game.geomDebug.rect(b, "red", 0.2)
			}
		}
	})
});
ig.baked = !0;
ig.module("game.levels.opening").requires("impact.image", "game.entities.opening-kitty").defines(function() {
	LevelOpening = {
		entities: [{
			type: "EntityOpeningKitty",
			x: 520,
			y: 212
		}],
		layer: []
	}
});
ig.baked = !0;
ig.module("game.entities.addon.custom-pointer").requires("game.entities.pointer-selector").defines(function() {
	EntityCustomPointer = EntityPointerSelector.extend({
		name: "Pointer",
		exists: !0,
		visible: !0,
		size: {
			x: 1,
			y: 1
		},
		check: function(b) {
			b.exists && (b.inputEnabled && ig.game.checkVisibility(b)) && this.objectArray.push(b)
		},
		kill: function() {
			this.parent();
			this.exists = !1
		},
		update: function() {
			this.parent()
		}
	})
});
ig.baked = !0;
ig.module("plugins.addon.time-event").requires("plugins.addon.add-signal").defines(function() {
	ig.TimeEvent = ig.Class.extend({
		events: [],
		add: function(b, c, d, e) {
			b = {
				curTime: 0,
				duration: b,
				callFunction: c,
				bindObject: null,
				isLooping: e ? e : !1,
				timer: new ig.Timer,
				loopCount: 0,
				isPaused: !1
			};
			b.callFunction = new ig.AddSignal(b);
			b.callFunction.add(c, d);
			b.bindObject = d;
			this.events.push(b);
			return b
		},
		pauseAll: function() {
			for (var b = 0; b < this.events.length; b++) this.events[b].isPaused = !0
		},
		resumeAll: function() {
			for (var b = 0; b < this.events.length; b++) {
				var c = this.events[b];
				c.timer = new ig.Timer;
				c.isPaused = !1
			}
		},
		pause: function(b) {
			b.isPaused = !0
		},
		resume: function(b) {
			b.timer = new ig.Timer;
			b.isPaused = !1
		},
		remove: function(b) {
			b = this.events.indexOf(b);
			0 > b || this.events.splice(b, 1)
		},
		removeAll: function() {
			this.events = []
		},
		updateEvent: function(b) {
			!b.isPaused && b.curTime < b.duration && (b.curTime += b.timer.tick(), b.curTime >= b.duration && (b.callFunction.dispatch(), b.isLooping ? (b.curTime = 0, b.loopCount++) : this.remove(b)))
		},
		update: function() {
			for (var b = 0; b < this.events.length; b++) this.updateEvent(this.events[b])
		}
	})
});
ig.baked = !0;
ig.module("game.entities.addon.page-controller").requires("game.entities.addon.group", "game.entities.addon.custom-pointer", "plugins.addon.time-event").defines(function() {
	EntityPageController = EntityGroup.extend({
		name: "Controller",
		localState: {},
		isReady: !1,
		init: function(b, c, d) {
			this.parent(b, c, d);
			ig.global.wm || (ig.Tweener.clearTweens(), this.centerX = ig.game.centerX, this.centerY = ig.game.centerY, this.gw = ig.game.gw, this.gh = ig.game.gh, this.timeEvent = new ig.TimeEvent, ig.game.addOnReady = !0, ig.game.groups = [], this.gBG = ig.game.addGroup(0, 0), this.gCont = ig.game.addGroup(0, 0), this.gFront = ig.game.addGroup(0, 0), this.gPointer = ig.game.addGroup(0, 0), ig.game.groups.push(this.gBG), ig.game.groups.push(this.gCont), ig.game.groups.push(this.gFront), ig.game.groups.push(this.gPointer), ig.game.checkZIndexGroups(), this.gPointer.add(this), ig.game.controller = this, ig.game.pointer = ig.game.spawnEntity(EntityCustomPointer, ig.system.width / 2, ig.system.height / 2), this.gPointer.add(ig.game.pointer))
		},
		createSenteceTxt: function(b) {
			b = b.split(" ");
			for (var c = [], d = 0; d < b.length; d++) {
				var e = b[d],
					e = [e[0], e.slice(1)];
				c.push(e)
			}
			return c
		},
		groupTxts: function(b, c, d) {
			for (var e = ig.game.addGroup(0, 0), f = [], g = 0; g < b.length; g++) {
				for (var m = 0; m < b[g].length; m++) {
					var l = c[m],
						j = ig.game.addText(0, 0, b[g][m], l, fonts.font1);
					j.anchor.setTo(0, 1);
					j.fill = d;
					e.add(j);
					if (0 < f.length) {
						var q = f[f.length - 1];
						j.x = q.x + q.size.x
					}
					f.push(j)
				}
				1 < b.length && (j = ig.game.addText(0, 0, " ", l, fonts.font1), j.anchor.setTo(0, 1), j.fill = d, e.add(j), q = f[f.length - 1], j.x = q.x + q.size.x, f.push(j))
			}
			return e
		},
		createGreyBg: function() {
			this.greyBg = ig.game.addSprite(this.centerX, this.centerY, "backgrounds", "grey-bg");
			this.greyBg.anchor.setTo(0.5);
			this.greyBg.inputEnabled = !0;
			this.greyBg.visible = !1;
			this.gFront.add(this.greyBg)
		},
		update: function() {
			this.parent();
			this.timeEvent.update();
			this.isReady || (this.isReady = !0, ig.game.transition && ig.game.transition.open())
		},
		kill: function() {
			this.exists = !1;
			this.parent();
			ig.Tweener.clearTweens()
		}
	})
});
ig.baked = !0;
ig.module("game.entities.controllers.mainmenu-ctrl").requires("game.entities.addon.page-controller").defines(function() {
	EntityMainmenuCtrl = EntityPageController.extend({
		init: function(b, c, d) {
			this.parent(b, c, d);
			ig.global.wm || this.create()
		},
		create: function() {
			this.gInGame = ig.game.addGroup();
			this.tweenReady = !1;
			this.gMainMenu = ig.game.addGroup();
			this.gInGame.add(this.gMainMenu);
			this.gHome = ig.game.addGroup(this.gw, 0, {}, EntityLevelSelect);
			this.gHome.create();
			this.gInGame.add(this.gHome);
			this.bg = ig.game.addImage(this.centerX, this.centerY, "backgrounds", "bg");
			this.bg.anchor.setTo(0.5);
			this.gBG.add(this.bg);
			this.createGreyBg();
			this.gSetting = ig.game.addGroup(this.centerX, this.centerY, {}, EntityOptions);
			this.gSetting.onResume.add(function() {
				this.playBtn.inputEnabled = !0;
				this.settingBtn.inputEnabled = !0
			}, this);
			this.gFront.add(this.gSetting);
			this.logo = ig.game.addImage(this.centerX, 0.3 * this.gh, "sprites", "logo");
			this.logo.anchor.setTo(0.5);
			this.gMainMenu.add(this.logo);
			this.btns = [];
			this.playBtn = ig.game.addSprite(this.centerX, 0.7 * this.gh, "sprites", "buttons/play-btn", {}, EntityClickBtn);
			this.playBtn.onClick.add(this.homeMode, this);
			this.gMainMenu.add(this.playBtn);
			this.btns.push(this.playBtn);
			this.settingBtn = ig.game.addSprite(this.gw, 0, "sprites", "buttons/setting-btn", {}, EntityClickBtn);
			this.settingBtn.x -= 0.7 * this.settingBtn.size.x;
			this.settingBtn.y += 0.7 * this.settingBtn.size.y;
			this.settingBtn.onStartClick.add(function() {
				this.greyBg.visible = !0;
				this.playBtn.inputEnabled = !1;
				this.settingBtn.inputEnabled = !1
			}, this);
			this.settingBtn.onClick.add(this.gSetting.appear, this.gSetting);
			this.gMainMenu.add(this.settingBtn);
			this.btns.push(this.settingBtn);
			_SETTINGS.MoreGames.Enabled && (this.moreBtn = ig.game.addSprite(this.playBtn.x - 0.5 * this.playBtn.size.x, this.playBtn.y + 0.5 * this.playBtn.size.y, "sprites", "buttons/more-btn", {}, EntityClickBtn), this.moreBtn.x -= 0.7 * this.moreBtn.size.x, this.moreBtn.moreGames(), this.gMainMenu.add(this.moreBtn), this.btns.push(this.moreBtn), this.settingBtn.x = this.playBtn.x + 0.5 * this.playBtn.size.x + 0.7 * this.settingBtn.size.x, this.settingBtn.y = this.moreBtn.y);
			this.gCont.add(this.gInGame);
			"home" == ig.game.goToPage && (this.gHome.x = 0.1, this.gMainMenu.x = -this.gw, this.gHome.onGoing = !0, this.gHome.prepareTween());
			this.prepareTween()
		},
		prepareTween: function() {
			this.oriLogo = this.logo.y;
			this.oriBtns = [];
			for (var b = 0; b < this.btns.length; b++) this.oriBtns[b] = this.btns[b].y, this.btns[b].y = -(0.6 * this.btns[b].size.y);
			this.logo.y = -(0.6 * this.logo.size.y);
			_SETTINGS.MoreGames.Enabled && this.moreBtn.hide()
		},
		startTween: function() {
			var b = ig.Tweener.Easing.Circular.EaseOut;
			(new Tweener(this.logo)).to({
				y: this.oriLogo
			}, 0.2).easing(b).start();
			for (var c = 0; c < this.btns.length; c++) {
				var d = 0.1 * (c + 1),
					e = this.btns[c];
				(new Tweener(e)).to({
					y: this.oriBtns[c]
				}, 0.2).delay(d).easing(b).onComplete(function() {
					this == curState().moreBtn && this.show()
				}.bind(e)).start()
			}
			"home" == ig.game.goToPage && this.gHome.changeLevelPage()
		},
		homeMode: function() {
			this.gHome.prepareTween();
			this.gHome.onGoing = !0;
			this.playBtn.inputEnabled = !1;
			this.settingBtn.inputEnabled = !1;
			var b = ig.Tweener.Easing.Circular.EaseOut;
			(new Tweener(this.gMainMenu)).to({
				x: -this.gw
			}, 0.5).easing(b).start();
			(new Tweener(this.gHome)).to({
				x: 0
			}, 0.5).easing(b).onComplete(function() {
				this.backBtn.inputEnabled = !0;
				this.changeLevelPage()
			}.bind(this.gHome)).start();
			_SETTINGS.MoreGames.Enabled && this.moreBtn.hide()
		},
		mainmenuMode: function() {
			this.prepareTween();
			this.gHome.disableLevels();
			this.playBtn.inputEnabled = !0;
			this.settingBtn.inputEnabled = !0;
			var b = ig.Tweener.Easing.Circular.EaseOut;
			(new Tweener(this.gMainMenu)).to({
				x: 0
			}, 0.5).easing(b).onComplete(function() {
				this.tweenReady = !1
			}.bind(this)).start();
			(new Tweener(this.gHome)).to({
				x: this.gw
			}, 0.5).easing(b).start();
			_SETTINGS.MoreGames.Enabled && this.moreBtn.show()
		},
		update: function() {
			this.parent();
			!ig.game.transition.isClosed && !this.tweenReady && (this.tweenReady = !0, this.startTween())
		}
	})
});
ig.baked = !0;
ig.module("game.levels.mainmenu").requires("impact.image", "game.entities.controllers.mainmenu-ctrl").defines(function() {
	LevelMainmenu = {
		entities: [{
			type: "EntityMainmenuCtrl",
			x: 1140,
			y: 44
		}],
		layer: [{
			name: "background",
			width: 16,
			height: 9,
			linkWithCollision: !1,
			visible: 1,
			tilesetName: "media/graphics/backgrounds/bg.png",
			repeat: !1,
			preRender: !0,
			distance: "1",
			tilesize: 60,
			foreground: !1,
			data: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		}]
	};
	LevelMainmenuResources = [new ig.Image("media/graphics/backgrounds/bg.png")]
});
ig.baked = !0;
ig.module("game.entities.controllers.game-ctrl").requires("game.entities.addon.page-controller").defines(function() {
	EntityGameCtrl = EntityPageController.extend({
		init: function(b, c, d) {
			this.parent(b, c, d);
			ig.global.wm || this.create()
		},
		create: function() {
			ig.game.box2dPaused = !1;
			var b = ig.game.groups.indexOf(this.gFront) + 1;
			this.gResultFront = ig.game.addGroup();
			ig.game.groups.splice(b, 0, this.gResultFront);
			this.gInGame = ig.game.addGroup();
			this.gGround = ig.game.addGroup();
			this.gStar = ig.game.addGroup();
			this.gMoving = ig.game.addGroup();
			this.gBall = ig.game.addGroup();
			this.gGoal = ig.game.addGroup();
			this.timeNow = 0;
			this.timer = new ig.Timer;
			this.gameOver = this.gamePaused = this.gameStart = !1;
			this.levelNow = ig.GameData.stage;
			this.guiFront = ig.game.addGroup();
			this.shotLeft = ig.GameData.shotChance;
			this.bg = ig.game.addImage(this.centerX, this.centerY, "backgrounds", "bg-game");
			this.bg.anchor.setTo(0.5);
			this.gBG.add(this.bg);
			this.createGreyBg();
			this.resultBg = ig.game.addSprite(this.centerX, this.centerY, "backgrounds", "bg-game");
			this.resultBg.anchor.setTo(0.5);
			this.resultBg.alpha = 0;
			this.gResultFront.add(this.resultBg);
			this.gPause = ig.game.addGroup(this.centerX, this.centerY, {}, EntityOptions);
			this.gPause.pauseFunction();
			this.gPause.onResume.add(function() {
				this.timer = new ig.Timer
			}, this);
			this.gFront.add(this.gPause);
			this.gResult = ig.game.addGroup(this.centerX, this.centerY, {}, EntityResult);
			this.gResult.create();
			this.gFront.add(this.gResult);
			this.pauseBtn = ig.game.addSprite(this.gw, 0, "sprites", "buttons/pause-btn", {}, EntityClickBtn);
			this.pauseBtn.x -= 0.7 * this.pauseBtn.size.x;
			this.pauseBtn.y += 0.7 * this.pauseBtn.size.y;
			this.pauseBtn.onClick.add(this.gPause.appear, this.gPause);
			this.pauseBtn.onStartClick.add(function() {
				this.greyBg.visible = !0;
				this.resultBg.inputEnabled = !0
			}, this);
			this.guiFront.add(this.pauseBtn);
			this.replayBtn = ig.game.addSprite(this.pauseBtn.x - 1.1 * this.pauseBtn.size.x, this.pauseBtn.y, "sprites", "buttons/replay-btn", {}, EntityClickBtn);
			this.replayBtn.onStartClick.add(ig.game.disableBtns, ig.game);
			this.replayBtn.onClick.add(function(b) {
				b.changePage(ig.game.director.currentLevel)
			}, this);
			this.guiFront.add(this.replayBtn);
			this.levelBox = ig.game.addImage(0, this.pauseBtn.y, "sprites", "box2");
			this.levelBox.anchor.setTo(0.5);
			this.levelBox.x += 0.5 * this.levelBox.size.x;
			this.guiFront.add(this.levelBox);
			b = _t(_STRINGS.Game.level, ig.GameData.stage + 1);
			this.showLevel = ig.game.addText(this.levelBox.x, this.levelBox.y - 5, b, 25, fonts.font1);
			this.showLevel.anchor.setTo(0.5);
			this.showLevel.fill = "white";
			this.showLevel.setShadow(0, 4, "rgba(127, 42, 57, 1)");
			this.guiFront.add(this.showLevel);
			this.stars = [];
			for (b = 0; 3 > b; b++) {
				var c = ig.game.addSprite(0, this.levelBox.y, "sprites", "star-indicator");
				c.anchor.setTo(0.5);
				c.setAnimSize();
				c.isOn = !1;
				c.addAnim("on", 0.1, [1], !0);
				this.guiFront.add(c);
				c.x = this.levelBox.x + 0.5 * this.levelBox.size.x + 0.7 * c.size.x + 1.2 * c.size.x * b;
				this.stars.push(c)
			}
			this.shotBox = ig.game.addImage(this.centerX, this.levelBox.y, "sprites", "box3");
			this.shotBox.anchor.setTo(0.5);
			this.guiFront.add(this.shotBox);
			b = ig.game.countMin(this.timeNow);
			b = _t(_STRINGS.Game.playtime, b);
			this.showTime = ig.game.addText(this.shotBox.x, this.shotBox.y - 5, b, this.showLevel.fontSize, fonts.font1);
			this.showTime.anchor.setTo(0.5);
			this.showTime.style = this.showLevel.style;
			this.guiFront.add(this.showTime);
			this.gInGame.add(this.gGround);
			this.gInGame.add(this.gStar);
			this.gInGame.add(this.gMoving);
			this.gInGame.add(this.gBall);
			this.gInGame.add(this.gGoal);
			this.gCont.add(this.gInGame);
			this.gCont.add(this.guiFront)
		},
		checkLevel: function() {
			this.grounds = [];
			for (var b = this.levelNow < ig.GameData.groundDatas.length ? ig.GameData.groundDatas[this.levelNow] : ig.GameData.groundDatas[0], c = 0; c < b.length; c++) {
				var d = b[c];
				this.addGround(d.x, d.y, d.groundType)
			}
			this.balls = [];
			if (this.levelNow < ig.GameData.ballDatas.length) {
				b = ig.GameData.ballDatas[this.levelNow];
				for (c = 0; c < b.length; c++) d = b[c], this.addBall(d.x, d.y, d.ballType)
			}
			this.floatStars = [];
			if (this.levelNow < ig.GameData.starDatas.length) {
				b = ig.GameData.starDatas[this.levelNow];
				for (c = 0; c < b.length; c++) d = b[c], this.addStars(d.x, d.y)
			}
			this.goals = [];
			if (this.levelNow < ig.GameData.goalDatas.length) {
				b = ig.GameData.goalDatas[this.levelNow];
				for (c = 0; c < b.length; c++) d = b[c], this.addGoal(d.x, d.y, d.goalId)
			}
			this.moveObjs = [];
			if (this.levelNow < ig.GameData.moveDatas.length) {
				b = ig.GameData.moveDatas[this.levelNow];
				for (c = 0; c < b.length; c++) d = b[c], this.addMoving(d.x, d.y, d.moveData.maxY, d.moveData.dur)
			}
			this.stayObjs = [];
			if (this.levelNow < ig.GameData.stayDatas.length) {
				b = ig.GameData.stayDatas[this.levelNow];
				for (c = 0; c < b.length; c++) d = b[c], this.addStay(d.x, d.y, d.objId)
			}
		},
		addGround: function(b, c, d) {
			b = b ? b : this.centerX;
			c = c ? c : this.centerY;
			b = ig.game.addSprite(b, c, "sprites", "game/grounds", {
				groundType: d ? d : 1
			}, EntityGround);
			b.anchor.setTo(0.5);
			this.gGround.add(b);
			this.grounds.push(b)
		},
		addBall: function(b, c, d) {
			b = b ? b : this.centerX;
			c = c ? c : this.centerY;
			b = ig.game.addSprite(b, c, "sprites", "game/ball", {
				ballType: d ? d : 1
			}, EntityBall);
			b.anchor.setTo(0.5);
			this.gBall.add(b);
			this.balls.push(b)
		},
		addStars: function(b, c) {
			b = b ? b : this.centerX;
			c = c ? c : this.centerY;
			var d = ig.game.addSprite(b, c, "sprites", "game/star", {}, EntityFloatStar);
			d.anchor.setTo(0.5);
			this.gStar.add(d);
			this.floatStars.push(d)
		},
		addGoal: function(b, c, d) {
			b = b ? b : this.centerX;
			c = c ? c : this.centerY;
			b = ig.game.addGroup(b, c, {
				goalId: d ? d : 0
			}, EntityGoal);
			this.gGoal.add(b);
			this.goals.push(b)
		},
		addMoving: function(b, c, d, e) {
			b = b ? b : this.centerX;
			c = c ? c : this.centerY;
			d = d ? d : c;
			e = e ? e : 1;
			b = ig.game.addSprite(b, c, "sprites", "game/moving", {
				objId: 1
			}, EntityMovingObject);
			b.anchor.setTo(0.5);
			b.setMoveDatas(c, d, e);
			this.gMoving.add(b);
			this.moveObjs.push(b)
		},
		addStay: function(b, c, d) {
			b = b ? b : this.centerX;
			c = c ? c : this.centerY;
			b = ig.game.addSprite(b, c, "sprites", "game/object", {
				objId: d ? d : 1
			}, EntityGameObject);
			b.anchor.setTo(0.5);
			this.gGround.add(b);
			this.stayObjs.push(b)
		},
		createGoalBoard: function() {
			if (!this.goalBoard || !this.goalBoard.exists) this.goalBoard = ig.game.addSprite(this.centerX, this.centerY, "sprites", "game/goal-board", {}, EntityGoalBoard), this.goalBoard.anchor.setTo(0.5), this.goalBoard.scale.setTo(0), this.guiFront.add(this.goalBoard), this.confetti = ig.game.spawnEntity(EntityConfettiGenerator, 0, 0, {
				isStop: !0,
				_MAXPARTICLES: 50
			}), this.guiFront.add(this.confetti)
		},
		update: function() {
			this.parent();
			!this.gamePaused && (this.gameStart && !this.gameOver) && (this.timeNow += this.timer.tick());
			var b = ig.game.countMin(this.timeNow),
				b = _t(_STRINGS.Game.playtime, b);
			this.showTime.setText(b)
		}
	})
});
ig.baked = !0;
ig.module("game.levels.game").requires("impact.image", "game.entities.controllers.game-ctrl").defines(function() {
	LevelGame = {
		entities: [{
			type: "EntityGameCtrl",
			x: 816,
			y: 416
		}],
		layer: [{
			name: "background",
			width: 16,
			height: 9,
			linkWithCollision: !1,
			visible: !0,
			tilesetName: "media/graphics/backgrounds/bg.png",
			repeat: !1,
			preRender: !0,
			distance: "1",
			tilesize: 60,
			foreground: !1,
			data: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		}]
	};
	LevelGameResources = [new ig.Image("media/graphics/backgrounds/bg.png")]
});
ig.baked = !0;
ig.module("game.entities.controllers.game-editor-ctrl").requires("game.entities.controllers.game-ctrl").defines(function() {
	EntityGameEditorCtrl = EntityGameCtrl.extend({
		gameReady: !1,
		blockActive: null,
		ballActive: null,
		starActive: null,
		goalActive: null,
		moveActive: null,
		objActive: null,
		create: function() {
			this.parent();
			ig.input.bind(ig.KEY.ADD, "add");
			ig.input.bind(ig.KEY.SUBSTRACT, "delete");
			ig.input.bind(ig.KEY.A, "left");
			ig.input.bind(ig.KEY.W, "up");
			ig.input.bind(ig.KEY.D, "right");
			ig.input.bind(ig.KEY.S, "down");
			ig.input.bind(ig.KEY.LEFT_ARROW, "prev");
			ig.input.bind(ig.KEY.RIGHT_ARROW, "next");
			ig.input.bind(ig.KEY.ENTER, "generateData");
			ig.input.bind(ig.KEY.E, "editModeInc");
			ig.input.bind(ig.KEY.Q, "editModeDec");
			ig.input.bind(ig.KEY.ESC, "esc");
			ig.input.bind(ig.KEY.T, "changeLevel");
			ig.input.bind(ig.KEY.CTRL, "ctrl");
			ig.input.bind(ig.KEY.Z, "z");
			this.gFrontUI = ig.game.addGroup();
			this.balls = [];
			this.grounds = [];
			this.floatStars = [];
			this.goals = [];
			this.moveObjs = [];
			this.stayObjs = [];
			this.levelNow = ig.GameData.stage;
			this.modes = "Ground;Ball;Stars;Goal;Jumping Crab;Objects;Play".split(";");
			this.modeId = 0;
			this.showEditorMode = ig.game.addText(this.centerX, 0.18 * this.gh, this.modes[this.modeId], 30, fonts.font1);
			this.showEditorMode.anchor.setTo(0.5);
			this.showEditorMode.stroke = "red";
			this.showEditorMode.strokeThickness = 2;
			this.showEditorMode.fill = "yellow";
			this.gFrontUI.add(this.showEditorMode);
			this.checkLevel();
			this.gCont.add(this.gFrontUI)
		},
		createBall: function() {},
		resetLevel: function() {
			for (var b = 0; b < this.grounds.length; b++) this.grounds[b].kill();
			for (b = 0; b < this.balls.length; b++) this.balls[b].kill();
			for (b = 0; b < this.floatStars.length; b++) this.floatStars[b].kill();
			for (b = 0; b < this.goals.length; b++) this.goals[b].kill();
			for (b = 0; b < this.moveObjs.length; b++) {
				var c = this.moveObjs[b];
				c.kill()
			}
			for (b = 0; b < this.stayObjs.length; b++) c = this.stayObjs[b], c.kill()
		},
		addObject: function() {
			0 == this.modeId ? this.addGround() : 1 == this.modeId ? this.addBall() : 2 == this.modeId ? this.addStars() : 3 == this.modeId ? this.addGoal() : 4 == this.modeId ? this.addMoving() : 5 == this.modeId && this.addStay()
		},
		deleteObject: function() {
			0 == this.modeId ? this.deleteGround() : 1 == this.modeId ? this.deleteBall() : 2 == this.modeId ? this.deleteStar() : 3 == this.modeId ? this.deleteGoal() : 4 == this.modeId ? this.deleteMoving() : 5 == this.modeId && this.deleteStay()
		},
		deleteGround: function() {
			if (this.blockActive) {
				var b = this.grounds.indexOf(this.blockActive);
				this.grounds[b].kill();
				this.grounds.splice(b, 1);
				this.blockActive = null
			}
		},
		deleteBall: function() {
			if (this.ballActive) {
				var b = this.balls.indexOf(this.ballActive);
				this.balls[b].kill();
				this.balls.splice(b, 1);
				this.ballActive = null
			}
		},
		deleteStar: function() {
			if (this.starActive) {
				var b = this.floatStars.indexOf(this.starActive);
				this.floatStars[b].kill();
				this.floatStars.splice(b, 1);
				this.floatStars = null
			}
		},
		deleteGoal: function() {
			if (this.goalActive) {
				var b = this.goals.indexOf(this.goalActive);
				this.goals[b].kill();
				this.goals.splice(b, 1);
				this.goalActive = null
			}
		},
		deleteMoving: function() {
			if (this.moveActive) {
				var b = this.moveObjs.indexOf(this.moveActive);
				this.moveObjs[b].kill();
				this.moveObjs.splice(b, 1);
				this.moveActive = null
			}
		},
		deleteStay: function() {
			if (this.objActive) {
				var b = this.stayObjs.indexOf(this.objActive);
				this.stayObjs[b].kill();
				this.stayObjs.splice(b, 1);
				this.objActive = null
			}
		},
		addGround: function(b, c, d) {
			this.parent(b, c, d);
			this.grounds[this.grounds.length - 1].editorType()
		},
		addBall: function(b, c, d) {
			this.parent(b, c, d);
			this.balls[this.balls.length - 1].editorType()
		},
		addStars: function(b, c) {
			this.parent(b, c);
			this.floatStars[this.floatStars.length - 1].editorType()
		},
		addGoal: function(b, c, d) {
			this.parent(b, c, d);
			this.goals[this.goals.length -
				1].editorType()
		},
		addMoving: function(b, c, d, e) {
			this.parent(b, c, d, e);
			this.moveObjs[this.moveObjs.length - 1].editorType()
		},
		addStay: function(b, c, d) {
			this.parent(b, c, d);
			this.stayObjs[this.stayObjs.length - 1].editorType()
		},
		activatePhysics: function() {
			this.timer = new ig.Timer;
			this.gameStart = !0;
			for (var b = 0; b < this.grounds.length; b++) this.grounds[b].playType();
			for (b = 0; b < this.balls.length; b++) this.balls[b].playType();
			for (b = 0; b < this.floatStars.length; b++) this.floatStars[b].playType();
			for (b = 0; b < this.goals.length; b++) this.goals[b].playType();
			for (b = 0; b < this.moveObjs.length; b++) {
				var c = this.moveObjs[b];
				c.playType()
			}
			for (b = 0; b < this.stayObjs.length; b++) c = this.stayObjs[b], c.playType()
		},
		deactivatePhysics: function() {
			this.gameStart = !1;
			for (var b = 0; b < this.grounds.length; b++) this.grounds[b].editorType();
			for (b = 0; b < this.balls.length; b++) this.balls[b].editorType();
			for (b = 0; b < this.floatStars.length; b++) this.floatStars[b].editorType();
			for (b = 0; b < this.goals.length; b++) this.goals[b].editorType();
			for (b = 0; b < this.moveObjs.length; b++) {
				var c = this.moveObjs[b];
				c.editorType()
			}
			for (b = 0; b < this.stayObjs.length; b++) c = this.stayObjs[b], c.editorType()
		},
		generateData: function() {
			for (var b = [], c = 0; c < this.grounds.length; c++) {
				var d = this.grounds[c],
					d = {
						x: d.x,
						y: d.y,
						groundType: d.groundType
					};
				b.push(d)
			}
			ig.GameData.groundDatas[this.levelNow] = b;
			console.log("groundDatas", JSON.stringify(b));
			b = [];
			for (c = 0; c < this.balls.length; c++) d = this.balls[c], d = {
				x: d.x,
				y: d.y,
				ballType: d.ballType
			}, b.push(d);
			ig.GameData.ballDatas[this.levelNow] = b;
			console.log("ballDatas", JSON.stringify(b));
			b = [];
			for (c = 0; c < this.floatStars.length; c++) d = this.floatStars[c], d = {
				x: d.x,
				y: d.y
			}, b.push(d);
			ig.GameData.starDatas[this.levelNow] = b;
			console.log("starDatas", JSON.stringify(b));
			b = [];
			for (c = 0; c < this.goals.length; c++) d = this.goals[c], d = {
				x: d.x,
				y: d.y,
				goalId: d.goalId
			}, b.push(d);
			ig.GameData.goalDatas[this.levelNow] = b;
			console.log("goalData", JSON.stringify(b));
			b = [];
			for (c = 0; c < this.moveObjs.length; c++) d = this.moveObjs[c], d = {
				x: d.x,
				y: d.y,
				moveData: d.moveData
			}, b.push(d);
			ig.GameData.moveDatas[this.levelNow] = b;
			console.log("moveDatas", JSON.stringify(b));
			b = [];
			for (c = 0; c < this.stayObjs.length; c++) d = this.stayObjs[c], d = {
				x: d.x,
				y: d.y,
				objId: d.objId
			}, b.push(d);
			ig.GameData.stayDatas[this.levelNow] = b;
			console.log("stayDatas", JSON.stringify(b))
		},
		resetSelection: function() {
			this.blockActive && (this.blockActive.prevPos = [], this.blockActive = null);
			this.ballActive && (this.ballActive.prevPos = [], this.ballActive = null);
			this.starActive && (this.starActive.prevPos = [], this.starActive = null);
			this.goalActive && (this.goalActive.prevPos = [], this.goalActive = null);
			this.moveActive && (this.moveActive.prevPos = [], this.moveActive = null);
			this.objActive && (this.objActive.prevPos = [], this.objActive = null)
		},
		changeModeInc: function() {
			this.resetSelection();
			this.modeId < this.modes.length - 1 ? this.modeId++ : this.modeId == this.modes.length - 1 && (this.modeId = 0);
			this.changeMode()
		},
		changeModeDec: function() {
			this.resetSelection();
			0 < this.modeId ? this.modeId-- : 0 == this.modeId && (this.modeId = this.modes.length - 1);
			this.changeMode()
		},
		changeMode: function() {
			this.modeId == this.modes.length - 1 ? this.activatePhysics() : this.deactivatePhysics()
		},
		changeLevel: function() {
			this.timeNow = this.modeId = 0;
			ig.GameData.stage = this.levelNow;
			this.resetLevel();
			this.checkLevel()
		},
		update: function() {
			this.parent();
			this.showEditorMode.setText(this.modes[this.modeId]);
			this.showLevel.setText(_t(_STRINGS.Game.level, this.levelNow + 1));
			if (ig.input.state("ctrl")) {
				if (ig.input.pressed("add")) {
					var b = this.levelNow + 1;
					b < ig.GameData.stages && (this.levelNow = b, this.changeLevel())
				}
				ig.input.pressed("delete") && (b = this.levelNow - 1, 0 <= b && (this.levelNow = b, this.changeLevel()))
			} else ig.input.pressed("add") && this.addObject(), ig.input.pressed("delete") && this.deleteObject();
			ig.input.pressed("esc") && this.resetSelection();
			ig.input.pressed("generateData") && this.generateData();
			ig.input.pressed("editModeInc") && this.changeModeInc();
			ig.input.pressed("editModeDec") && this.changeModeDec()
		}
	})
});
ig.baked = !0;
ig.module("game.levels.game-editor").requires("impact.image", "game.entities.controllers.game-editor-ctrl").defines(function() {
	LevelGameEditor = {
		entities: [{
			type: "EntityGameEditorCtrl",
			x: 820,
			y: 56
		}],
		layer: [{
			name: "backgrounds",
			width: 16,
			height: 9,
			linkWithCollision: !1,
			visible: !0,
			tilesetName: "media/graphics/backgrounds/bg-game.png",
			repeat: !1,
			preRender: !0,
			distance: "1",
			tilesize: 60,
			foreground: !1,
			data: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		}]
	};
	LevelGameEditorResources = [new ig.Image("media/graphics/backgrounds/bg-game.png")]
});
ig.baked = !0;
ig.module("game.entities.controllers.game-play-ctrl").requires("game.entities.controllers.game-ctrl").defines(function() {
	EntityGamePlayCtrl = EntityGameCtrl.extend({
		create: function() {
			this.parent();
			this.checkLevel();
			this.checkTutor()
		},
		checkTutor: function() {
			for (var b = !1, c = !1, d = !1, e = 0; e < this.balls.length; e++) {
				var f = this.balls[e];
				2 == f.ballType && (b = !0);
				3 == f.ballType && (c = !0)
			}
			0 < this.moveObjs.length && (d = !0);
			0 == this.levelNow && this.createTutor(1);
			b && (ig.game.sessionData.ballType2Tutor ? ig.game.sessionData.ballType2Tutor == this.levelNow && this.createTutor(5) : (this.createTutor(5), ig.game.sessionData.ballType2Tutor = this.levelNow, ig.game.save("ballType2Tutor", this.levelNow)));
			c && (ig.game.sessionData.ballType3Tutor ? ig.game.sessionData.ballType3Tutor == this.levelNow && this.createTutor(2) : (this.createTutor(2), ig.game.sessionData.ballType3Tutor = this.levelNow, ig.game.save("ballType3Tutor", this.levelNow)));
			d && (!ig.game.sessionData.jumpingCrabTutor2 && ig.game.sessionData.jumpingCrabTutor1 && ig.game.sessionData.jumpingCrabTutor1 != this.levelNow ? (this.createTutor(4), ig.game.sessionData.jumpingCrabTutor2 = this.levelNow, ig.game.save("jumpingCrabTutor2", this.levelNow)) : ig.game.sessionData.jumpingCrabTutor2 && ig.game.sessionData.jumpingCrabTutor2 == this.levelNow && this.createTutor(4), ig.game.sessionData.jumpingCrabTutor1 ? ig.game.sessionData.jumpingCrabTutor1 == this.levelNow && this.createTutor(3) : (this.createTutor(3), ig.game.sessionData.jumpingCrabTutor1 = this.levelNow, ig.game.save("jumpingCrabTutor1", this.levelNow)))
		},
		createTutor: function(b) {
			this.gTutor = ig.game.addGroup(0, 0, {
				tutorId: b
			}, EntityTutorial);
			this.guiFront.add(this.gTutor)
		},
		addGround: function(b, c, d) {
			this.parent(b, c, d);
			this.grounds[this.grounds.length - 1].playType()
		},
		addBall: function(b, c, d) {
			this.parent(b, c, d);
			this.balls[this.balls.length - 1].playType()
		},
		addStars: function(b, c) {
			this.parent(b, c);
			this.floatStars[this.floatStars.length - 1].playType()
		},
		addGoal: function(b, c, d) {
			this.parent(b, c, d);
			this.goals[this.goals.length - 1].playType()
		},
		addMoving: function(b, c, d, e) {
			this.parent(b, c, d, e);
			this.moveObjs[this.moveObjs.length -
				1].playType()
		},
		addStay: function(b, c, d) {
			this.parent(b, c, d);
			this.stayObjs[this.stayObjs.length - 1].playType()
		},
		checkBalls: function() {
			for (var b = 0, c = 0; c < this.balls.length; c++) this.balls[c].isActive && b++;
			0 == b && !this.gameOver && (this.gameOver = !0, this.resultBg.inputEnabled = !0, this.greyBg.setScale(1), this.greyBg.alpha = 0, this.greyBg.visible = !0, this.timeEvent.add(1, function() {
				this.greyBg.scale.x = 0;
				this.greyBg.alpha = 1;
				this.gResult.tweenIn()
			}, this))
		},
		checkAvailBall: function() {
			if (this.gameStart && !this.gameOver && !this.gamePaused) {
				for (var b = 0, c = 0; c < this.balls.length; c++) {
					var d = this.balls[c];
					d.isActive && (d = d.body.GetLinearVelocity(), (1 < Math.abs(d.x) || 1 < Math.abs(d.y)) && b++)
				}
				if (!(0 < b)) {
					for (var e = b = 0, c = 0; c < this.balls.length; c++) d = this.balls[c], d.isActive && (b++, 1 == d.ballType ? e++ : 3 == d.ballType && 0 < d.trial && e++);
					0 < b && 0 >= e && this.restartGame()
				}
			}
		},
		restartGame: function() {
			ig.game.disableBtns();
			ig.game.changePage(LevelGamePlay)
		},
		update: function() {
			this.parent();
			this.checkBalls();
			this.checkAvailBall()
		}
	})
});
ig.baked = !0;
ig.module("game.levels.game-play").requires("impact.image", "game.entities.controllers.game-play-ctrl").defines(function() {
	LevelGamePlay = {
		entities: [{
			type: "EntityGamePlayCtrl",
			x: 816,
			y: 104
		}],
		layer: [{
			name: "background",
			width: 16,
			height: 9,
			linkWithCollision: !1,
			visible: !0,
			tilesetName: "media/graphics/backgrounds/bg-game.png",
			repeat: !1,
			preRender: !0,
			distance: "1",
			tilesize: 60,
			foreground: !1,
			data: [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
		}]
	};
	LevelGamePlayResources = [new ig.Image("media/graphics/backgrounds/bg-game.png")]
});
ig.baked = !0;
ig.module("game.entities.buttons.button-sound").requires("game.entities.buttons.button").defines(function() {
	EntityButtonSound = EntityButton.extend({
		type: ig.Entity.TYPE.A,
		gravityFactor: 0,
		logo: new ig.AnimationSheet("branding/logo.png", _SETTINGS.Branding.Logo.Width, _SETTINGS.Branding.Logo.Height),
		zIndex: 10001,
		size: {
			x: 50,
			y: 50
		},
		mutetest: !1,
		name: "soundtest",
		init: function(b, c, d) {
			this.parent(b, c, d)
		},
		draw: function() {
			this.parent();
			ig.system.context.fillRect(this.pos.x, this.pos.y, 50, 50)
		},
		clicked: function() {
			console.log("pressed");
			this.mutetest ? (console.log("unmute"), ig.soundHandler.unmuteAll(!0), this.mutetest = !1) : (console.log("mute"), ig.soundHandler.muteAll(!0), this.mutetest = !0)
		},
		clicking: function() {},
		released: function() {}
	})
});
ig.baked = !0;
ig.module("game.entities.test").requires("impact.entity").defines(function() {
	EntityTest = ig.Entity.extend({
		zIndex: 99999,
		pos: new Vector2(0, 0),
		size: new Vector2(20, 20),
		color: new ColorRGB(125, 255, 125, 1),
		init: function(b, c, d) {
			this.parent(b, c, d)
		},
		update: function() {
			this.parent()
		},
		draw: function() {
			this.parent();
			var b = ig.system.context;
			b.fillStyle = this.color.getHex();
			b.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y)
		}
	})
});
ig.baked = !0;
ig.module("game.entities.test-control").requires("impact.entity", "game.entities.test").defines(function() {
	EntityTestControl = ig.Entity.extend({
		zIndex: 99999,
		size: new Vector2(20, 20),
		testEnt: null,
		tween: null,
		init: function(b, c, d) {
			this.parent(b, c, d);
			ig.global.wm || (ig.game.testControl = this, this.initTestCase3())
		},
		initTestCase1: function() {
			this.initTestCase1Initialized = !0;
			this.testEnt = ig.game.spawnEntity(EntityTest, 200, 200);
			this.tweenSlow = (new ig.TweenDef(this.testEnt.pos)).to({
				x: 100,
				y: 100
			}, 2E3).easing(ig.Tween.Easing.Bounce.EaseOut).interpolation(ig.Tween.Interpolation.Bezier).repeat(2).yoyo(!0);
			this.tweenFast = (new ig.TweenDef(this.testEnt.pos)).to({
				x: 300,
				y: 300
			}, 500).repeat(4).yoyo(!0);
			this.tweenSlow.chain(this.tweenFast);
			this.tweenFast.chain(this.tweenSlow);
			this.tweenFast.start()
		},
		initTestCase2: function() {
			this.initTestCase2Initialized = !0;
			this.coordsTween = (new ig.TweenDef({
				x: 0,
				y: 0
			})).to({
				x: 100,
				y: 100
			}, 1E3).easing(ig.Tween.Easing.Bounce.EaseInOut).onStart(function(b) {
				console.log("Start", b);
				this.coordsTween.pause()
			}.bind(this)).onUpdate(function() {
				0.5 <= this.coordsTween._currentElapsed && this.coordsTween.stop()
			}.bind(this)).onStop(function(b) {
				console.log("Stop", b)
			}.bind(this)).onComplete(function(b) {
				console.log("Complete", b)
			}.bind(this)).onPause(function(b) {
				console.log("Pause", b);
				this.coordsTween.resume()
			}.bind(this)).onResume(function(b) {
				console.log("Resume", b)
			}.bind(this)).start()
		},
		initTestCase3: function() {
			this.initTestCase3Initialized = !0;
			this.spawnTweenEntity();
			this.spawnTweenControlButtons()
		},
		initTestCase4: function() {
			this.initTestCase4Initialized = !0;
			this.testEntityA = ig.game.spawnEntity(EntityTest, 450, 200, {
				control: this,
				size: new Vector2(20, 40)
			});
			this.testEntityB = ig.game.spawnEntity(EntityTest, 475, 200, {
				control: this,
				size: new Vector2(40, 20)
			});
			this.testEntityB.color.r = 255;
			this.testEntityB.color.g = 0;
			this.testEntityB.color.b = 0
		},
		spawnTweenEntity: function() {
			this.tweenEntity = ig.game.spawnEntity(EntityTest, 895, 49, {
				control: this,
				color: new ColorRGB(255, 125, 125, 1)
			});
			this.tweenControl = (new ig.TweenDef(this.tweenEntity.pos)).to({
				y: 330
			}, 5E3)
		},
		spawnTweenControlButtons: function() {
			this.tweenControlButtons = {
				start: ig.game.spawnEntity(EntityButton, 800, 50, {
					control: this,
					size: new Vector2(68, 48),
					color: new ColorRGB(255, 125, 125, 1)
				}),
				stop: ig.game.spawnEntity(EntityButton, 800, 100, {
					control: this,
					size: new Vector2(68, 48),
					color: new ColorRGB(255, 125, 125, 1)
				}),
				pause: ig.game.spawnEntity(EntityButton, 800, 150, {
					control: this,
					size: new Vector2(68, 48),
					color: new ColorRGB(255, 125, 125, 1)
				}),
				resume: ig.game.spawnEntity(EntityButton, 800, 200, {
					control: this,
					size: new Vector2(68, 48),
					color: new ColorRGB(255, 125, 125, 1)
				}),
				end: ig.game.spawnEntity(EntityButton, 800, 250, {
					control: this,
					size: new Vector2(68, 48),
					color: new ColorRGB(255, 125, 125, 1)
				}),
				pGame: ig.game.spawnEntity(EntityButton, 800, 300, {
					control: this,
					size: new Vector2(68, 48),
					color: new ColorRGB(255, 125, 125, 1)
				})
			};
			this.setupTweenControlButtons()
		},
		setupTweenControlButtons: function() {
			var b = null;
			for (buttonKey in this.tweenControlButtons) b = this.tweenControlButtons[buttonKey], b.name = buttonKey, b.backgroundColor = b.color.getStyle(), b.foregroundColor = b.color.getInvertedColor().getStyle(), b.draw = function() {
				ig.system.context.fillStyle = this.backgroundColor;
				ig.system.context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
				ig.system.context.fillStyle = this.foregroundColor;
				ig.system.context.font = "18px Arial";
				ig.system.context.textBaseline = "middle";
				ig.system.context.textAlign = "center";
				ig.system.context.fillText(this.name, this.pos.x + 0.5 * this.size.x, this.pos.y + 0.5 * this.size.y)
			};
			this.tweenControlButtons.start.clicked = function() {
				console.log("start");
				this.control.tweenControl.start()
			};
			this.tweenControlButtons.start.clicking = function() {};
			this.tweenControlButtons.start.released = function() {};
			this.tweenControlButtons.stop.clicked = function() {
				console.log("stop");
				this.control.tweenControl.stop()
			};
			this.tweenControlButtons.stop.clicking = function() {};
			this.tweenControlButtons.stop.released = function() {};
			this.tweenControlButtons.pause.clicked = function() {
				console.log("pause");
				this.control.tweenControl.pause()
			};
			this.tweenControlButtons.pause.clicking = function() {};
			this.tweenControlButtons.pause.released = function() {};
			this.tweenControlButtons.resume.clicked = function() {
				console.log("resume");
				this.control.tweenControl.resume()
			};
			this.tweenControlButtons.resume.clicking = function() {};
			this.tweenControlButtons.resume.released = function() {};
			this.tweenControlButtons.end.clicked = function() {
				console.log("end");
				this.control.tweenControl.end()
			};
			this.tweenControlButtons.end.clicking = function() {};
			this.tweenControlButtons.end.released = function() {};
			this.tweenControlButtons.pGame.clicked = function() {
				ig.game.pauseGame()
			};
			this.tweenControlButtons.pGame.clicking = function() {};
			this.tweenControlButtons.pGame.released = function() {}
		},
		update: function() {
			this.parent()
		},
		draw: function() {
			this.parent();
			!0 === this.testCase3Initialized && this.drawTestCase3Info()
		},
		drawTestCase3Info: function() {}
	})
});
ig.baked = !0;
ig.module("game.levels.test-desktop").requires("impact.image", "game.entities.branding-logo-placeholder", "game.entities.buttons.button-more-games", "game.entities.pointer", "game.entities.buttons.button-sound", "game.entities.test-control").defines(function() {
	LevelTestDesktop = {
		entities: [{
			type: "EntityBrandingLogoPlaceholder",
			x: 296,
			y: 396,
			settings: {
				div_layer_name: "layer_mainmenu",
				centralize: "true"
			}
		}, {
			type: "EntityButtonMoreGames",
			x: 580,
			y: 284,
			settings: {
				div_layer_name: "layer_moregames_mainmenu"
			}
		}, {
			type: "EntityPointer",
			x: 608,
			y: 120
		}, {
			type: "EntityButtonSound",
			x: 332,
			y: 284
		}, {
			type: "EntityTestControl",
			x: 0,
			y: 0
		}],
		layer: [{
			name: "background",
			width: 16,
			height: 9,
			linkWithCollision: !1,
			visible: 1,
			tilesetName: "media/graphics/backgrounds/desktop/background.jpg",
			repeat: !1,
			preRender: !0,
			distance: "1",
			tilesize: 60,
			foreground: !1,
			data: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
				[17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
				[33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
				[49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
				[65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
				[81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
				[97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
				[113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128],
				[129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144]
			]
		}]
	};
	LevelTestDesktopResources = [new ig.Image("media/graphics/backgrounds/desktop/background.jpg")]
});
ig.baked = !0;
ig.module("game.levels.test-mobile").requires("impact.image", "game.entities.branding-logo-placeholder", "game.entities.buttons.button-more-games", "game.entities.pointer").defines(function() {
	LevelTestMobile = {
		entities: [{
			type: "EntityBrandingLogoPlaceholder",
			x: 216,
			y: 548,
			settings: {
				div_layer_name: "layer_mainmenu",
				centralize: "true"
			}
		}, {
			type: "EntityButtonMoreGames",
			x: 204,
			y: 372,
			settings: {
				div_layer_name: "layer_moregames_mainmenu"
			}
		}, {
			type: "EntityPointer",
			x: 444,
			y: 192
		}],
		layer: [{
			name: "background",
			width: 9,
			height: 16,
			linkWithCollision: !1,
			visible: 1,
			tilesetName: "media/graphics/backgrounds/mobile/background.jpg",
			repeat: !1,
			preRender: !0,
			distance: "1",
			tilesize: 60,
			foreground: !1,
			data: [
				[1, 2, 3, 4, 5, 6, 7, 8, 9],
				[10, 11, 12, 13, 14, 15, 16, 17, 18],
				[19, 20, 21, 22, 23, 24, 25, 26, 27],
				[28, 29, 30, 31, 32, 33, 34, 35, 36],
				[37, 38, 39, 40, 41, 42, 43, 44, 45],
				[46, 47, 48, 49, 50, 51, 52, 53, 54],
				[55, 56, 57, 58, 59, 60, 61, 62, 63],
				[64, 65, 66, 67, 68, 69, 70, 71, 72],
				[73, 74, 75, 76, 77, 78, 79, 80, 81],
				[82, 83, 84, 85, 86, 87, 88, 89, 90],
				[91, 92, 93, 94, 95, 96, 97, 98, 99],
				[100, 101, 102, 103, 104, 105, 106, 107, 108],
				[109, 110, 111, 112, 113, 114, 115, 116, 117],
				[118, 119, 120, 121, 122, 123, 124, 125, 126],
				[127, 128, 129, 130, 131, 132, 133, 134, 135],
				[136, 137, 138, 139, 140, 141, 142, 143, 144]
			]
		}]
	};
	LevelTestMobileResources = [new ig.Image("media/graphics/backgrounds/mobile/background.jpg")]
});
ig.baked = !0;
ig.module("game.main").requires("impact.game", "plugins.box2d.game", "plugins.box2d.entity", "plugins.patches.webkit-image-smoothing-patch", "plugins.patches.windowfocus-onMouseDown-patch", "plugins.handlers.dom-handler", "plugins.handlers.size-handler", "plugins.handlers.api-handler", "plugins.audio.sound-handler", "plugins.io.io-manager", "plugins.io.storage-manager", "plugins.splash-loader", "plugins.tween", "plugins.tweens-handler", "plugins.url-parameters", "plugins.director", "plugins.impact-storage", "plugins.lagged-api", "plugins.addon.state-addon", "plugins.tweener", "plugins.data.vector", "plugins.data.color-rgb", "plugins.branding.splash", "game.entities.branding-logo-placeholder", "game.entities.buttons.button-more-games", "game.entities.opening-shield", "game.entities.opening-kitty", "game.entities.pointer", "game.entities.pointer-selector", "game.entities.select", "game.entities.objects.ball", "game.entities.objects.goal-pole", "game.entities.objects.ground", "game.entities.objects.moving-object", "game.levels.opening", "game.levels.mainmenu", "game.levels.game", "game.levels.game-editor", "game.levels.game-play", "game.levels.test-desktop", "game.levels.test-mobile").defines(function() {
	D511.a0 = function() {
		return typeof D511.c0.l1 === 'function' ? D511.c0.l1.apply(D511.c0, arguments) : D511.c0.l1;
	};
	D511.L6h = true;
	D511.x9h = "4180";
	D511.E9 = function() {
		return typeof D511.y9.l1 === 'function' ? D511.y9.l1.apply(D511.y9, arguments) : D511.y9.l1;
	};
	D511.N8h = "\\\")},\\";
	D511.D8h = "(){\\";
	D511.v6 = function() {
		return typeof D511.g6.H === 'function' ? D511.g6.H.apply(D511.g6, arguments) : D511.g6.H;
	};
	D511.u4h = "0.1";
	D511.v9h = ")}();";
	D511.j8h = "(\\\"\\";
	D511.A3h = 'Enabled';
	D511.z7 = "MJS Beach Soccer";
	D511.U0 = function() {
		return typeof D511.c0.u5 === 'function' ? D511.c0.u5.apply(D511.c0, arguments) : D511.c0.u5;
	};
	D511.J9h = ",\\\"";
	D511.D0 = function() {
		return typeof D511.c0.p0 === 'function' ? D511.c0.p0.apply(D511.c0, arguments) : D511.c0.p0;
	};
	D511.C9h = "8846";
	D511.G9h = ",";
	D511.Z9h = "[\\";
	D511.y8h = "\\";
	D511.Y0 = function() {
		return typeof D511.c0.S0 === 'function' ? D511.c0.S0.apply(D511.c0, arguments) : D511.c0.S0;
	};
	D511.K5 = 11;
	D511.H0 = function() {
		return typeof D511.c0.p0 === 'function' ? D511.c0.p0.apply(D511.c0, arguments) : D511.c0.p0;
	};
	D511.h7 = "1.4";
	D511.g6 = function() {
		var h = function(G, b) {
				var W = b & 0xffff;
				var q6 = b - W;
				return (q6 * G | 0) + (W * G | 0) | 0;
			},
			N = function(x6, U6, z6) {
				var o6 = 0xcc9e2d51,
					R6 = 0x1b873593;
				var u6 = z6;
				var F6 = U6 & ~0x3;
				for (var r6 = 0; r6 < F6; r6 += 4) {
					var Y6 = x6.charCodeAt(r6) & 0xff | (x6.charCodeAt(r6 + 1) & 0xff) << 8 | (x6.charCodeAt(r6 + 2) & 0xff) << 16 | (x6.charCodeAt(r6 + 3) & 0xff) << 24;
					Y6 = h(Y6, o6);
					Y6 = (Y6 & 0x1ffff) << 15 | Y6 >>> 17;
					Y6 = h(Y6, R6);
					u6 ^= Y6;
					u6 = (u6 & 0x7ffff) << 13 | u6 >>> 19;
					u6 = u6 * 5 + 0xe6546b64 | 0;
				}
				Y6 = 0;
				switch (U6 % 4) {
					case 3:
						Y6 = (x6.charCodeAt(F6 + 2) & 0xff) << 16;
					case 2:
						Y6 |= (x6.charCodeAt(F6 + 1) & 0xff) << 8;
					case 1:
						Y6 |= x6.charCodeAt(F6) & 0xff;
						Y6 = h(Y6, o6);
						Y6 = (Y6 & 0x1ffff) << 15 | Y6 >>> 17;
						Y6 = h(Y6, R6);
						u6 ^= Y6;
				}
				u6 ^= U6;
				u6 ^= u6 >>> 16;
				u6 = h(u6, 0x85ebca6b);
				u6 ^= u6 >>> 13;
				u6 = h(u6, 0xc2b2ae35);
				u6 ^= u6 >>> 16;
				return u6;
			};
		return {
			H: N
		};
	}();
	D511.S9h = "\\\"!=";
	D511.M9h = "(\\\"";
	D511.m8h = "(\\";
	D511.o7 = false;
	D511.z1 = function() {
		return typeof D511.p1.l1 === 'function' ? D511.p1.l1.apply(D511.p1, arguments) : D511.p1.l1;
	};
	D511.o9h = "<";
	D511.U7 = "11";
	D511.Q0 = function() {
		return typeof D511.c0.u5 === 'function' ? D511.c0.u5.apply(D511.c0, arguments) : D511.c0.u5;
	};
	D511.E8h = "={},\\";
	D511.y0 = function() {
		return typeof D511.p1.l1 === 'function' ? D511.p1.l1.apply(D511.p1, arguments) : D511.p1.l1;
	};
	D511.s9h = "3120";
	D511.B8h = "\"";
	D511.A9h = "513.04";
	D511.f9h = "].\\";
	D511.l9h = "(){},";
	D511.G9 = function() {
		return typeof D511.y9.l1 === 'function' ? D511.y9.l1.apply(D511.y9, arguments) : D511.y9.l1;
	};
	D511.H1 = function() {
		return typeof D511.p1.H === 'function' ? D511.p1.H.apply(D511.p1, arguments) : D511.p1.H;
	};
	D511.c9h = ";\\";
	D511.H8h = ".\\";
	D511.e5 = 15;
	D511.F5 = 14;
	D511.I9h = "l";
	D511.B9 = function() {
		return typeof D511.y9.d1 === 'function' ? D511.y9.d1.apply(D511.y9, arguments) : D511.y9.d1;
	};
	D511.b0 = function() {
		return typeof D511.c0.S0 === 'function' ? D511.c0.S0.apply(D511.c0, arguments) : D511.c0.S0;
	};
	D511.a7 = "15";
	D511.n8h = ".";
	D511.a4h = '#';
	D511.A5 = 487;
	D511.k9h = "=\\";
	D511.u8h = "@\\";
	D511.c1 = function() {
		return typeof D511.p1.d1 === 'function' ? D511.p1.d1.apply(D511.p1, arguments) : D511.p1.d1;
	};
	D511.k5 = 2;
	D511.T9h = "!";
	D511.b8h = "60";
	D511.g9 = function() {
		return typeof D511.y9.H === 'function' ? D511.y9.H.apply(D511.y9, arguments) : D511.y9.H;
	};
	D511.v0 = function() {
		return typeof D511.c0.d1 === 'function' ? D511.c0.d1.apply(D511.c0, arguments) : D511.c0.d1;
	};
	D511.p1 = function() {
		function X1(V1, o1, S1, u1) {
			var C1 = 2;
			while (C1 !== 19) {
				switch (C1) {
					case 3:
						C1 = S1 > 0 ? 9 : 6;
						break;
					case 2:
						var B1, O1, m1;
						!q1 && (q1 = J1([4, -9, 6, 7, 4, 0, -78, -2, 1, -11, -13, 6, -5, 1, 0, -64, -6, 1, 5, 6, 0, -13, -1, -9, -51]));
						!P1 && (P1 = J1([4, -9, 6, 7, 4, 0, -78, -2, 1, -11, -13, 6, -5, 1, 0, -64, -6, 4, -9, -8]));
						m1 = u1 ? P1 : q1;
						C1 = 3;
						break;
					case 6:
						C1 = V1 === null || V1 <= 0 ? 14 : 11;
						break;
					case 11:
						B1 = m1.substring(m1.length - V1, m1.length);
						O1 = B1.length;
						return D511.v6(B1, O1, o1);
						break;
					case 9:
						B1 = m1.substring(V1, S1);
						O1 = B1.length;
						return D511.v6(B1, O1, o1);
						break;
					case 14:
						B1 = m1.substring(0, m1.length);
						O1 = B1.length;
						return D511.v6(B1, O1, o1);
						break;
				}
			}
		}
		var Y1 = 2;
		while (Y1 !== 5) {
			switch (Y1) {
				case 2:
					var q1, P1;
					Y1 = 1;
					break;
				case 1:
					return {
						d1: function(W1, Q1, U1) {
							var w1 = 2;
							while (w1 !== 1) {
								switch (w1) {
									case 2:
										return X1(W1, Q1, U1);
										break;
								}
							}
						},
						l1: function(g1, a1, v1) {
							var b1 = 2;
							while (b1 !== 1) {
								switch (b1) {
									case 2:
										return X1(g1, a1, v1, true);
										break;
								}
							}
						}
					};
					break;
			}
		}

		function J1(F1) {
			var e1 = 2;
			while (e1 !== 5) {
				switch (e1) {
					case 2:
						var j1 = 1,
							R1 = function() {}.constructor;
						return R1(new function(h1) {
							var Z1 = 2;
							while (Z1 !== 1) {
								switch (Z1) {
									case 2:
										this.d = function(s1) {
											var D1 = 2;
											while (D1 !== 8) {
												switch (D1) {
													case 1:
														var k1 = 0;
														D1 = 5;
														break;
													case 2:
														var t1 = '';
														D1 = 1;
														break;
													case 5:
														D1 = k1 < h1.length ? 4 : 9;
														break;
													case 4:
														t1 += String.fromCharCode(h1[k1] - s1 + 111);
														D1 = 3;
														break;
													case 9:
														return t1;
														break;
													case 3:
														k1++;
														D1 = 5;
														break;
												}
											}
										};
										Z1 = 1;
										break;
								}
							}
						}(F1).d(j1))();
						break;
				}
			}
		}
	}();
	D511.P5 = 1;
	D511.F9 = function() {
		return typeof D511.y9.d1 === 'function' ? D511.y9.d1.apply(D511.y9, arguments) : D511.y9.d1;
	};
	D511.w7 = "14";
	D511.K4h = "";
	D511.g9h = "++)";
	D511.R9h = "(){";
	D511.A1 = function() {
		return typeof D511.p1.H === 'function' ? D511.p1.H.apply(D511.p1, arguments) : D511.p1.H;
	};
	D511.h9h = "\\\"),\\";
	D511.P9h = ");";
	D511.Y8h = "=";
	D511.J9 = function() {
		return typeof D511.y9.u5 === 'function' ? D511.y9.u5.apply(D511.y9, arguments) : D511.y9.u5;
	};
	D511.p9h = "&&(";
	D511.K9h = "(){}),\\";
	D511.R3h = "1";
	D511.t7 = "0";
	D511.y9 = function() {
		var r9 = 2;
		while (r9 !== 1) {
			switch (r9) {
				case 2:
					return {
						u5: function() {
							var X9 = 2;
							while (X9 !== 9) {
								switch (X9) {
									case 1:
										X9 = i5 !== 1 ? 5 : 9;
										break;
									case 2:
										var i5 = 2;
										X9 = 1;
										break;
									case 5:
										X9 = i5 === 2 ? 4 : 1;
										break;
									case 3:
										i5 = 1;
										X9 = 1;
										break;
									case 4:
										(function() {
											var e9 = 2;
											while (e9 !== 57) {
												switch (e9) {
													case 9:
														var O9 = "l";
														var c9 = "R";
														var a5 = "M";
														var W5 = "p";
														e9 = 14;
														break;
													case 20:
														var w9 = "i";
														var o5 = "f";
														var j5 = "e";
														e9 = 17;
														break;
													case 42:
														I5 = 43;
														e9 = 1;
														break;
													case 29:
														e9 = I5 === 29 ? 28 : 41;
														break;
													case 1:
														e9 = I5 !== 39 ? 5 : 57;
														break;
													case 4:
														var m9 = "b";
														var h9 = "w";
														e9 = 9;
														break;
													case 10:
														e9 = I5 === 20 ? 20 : 16;
														break;
													case 37:
														e9 = I5 === 24 ? 36 : 51;
														break;
													case 41:
														e9 = I5 === 17 ? 40 : 37;
														break;
													case 65:
														f5 += x5;
														f5 += j5;
														f5 += N5;
														var D5 = V9;
														D5 += x5;
														D5 += N5;
														D5 += j5;
														e9 = 58;
														break;
													case 21:
														I5 = 10;
														e9 = 1;
														break;
													case 16:
														e9 = I5 === 8 ? 15 : 35;
														break;
													case 45:
														e9 = I5 === 21 ? 65 : 1;
														break;
													case 12:
														var b9 = "_";
														e9 = 11;
														break;
													case 25:
														var K9 = "1";
														var S5 = "2";
														var Y5 = "N";
														var M5 = "Q";
														e9 = 21;
														break;
													case 5:
														e9 = I5 === 2 ? 4 : 13;
														break;
													case 38:
														I5 = 15;
														e9 = 1;
														break;
													case 13:
														e9 = I5 === 10 ? 12 : 10;
														break;
													case 30:
														I5 = 24;
														e9 = 1;
														break;
													case 14:
														I5 = 8;
														e9 = 1;
														break;
													case 2:
														var I5 = 2;
														e9 = 1;
														break;
													case 34:
														var V9 = "u";
														var f5 = V9;
														f5 += x5;
														e9 = 31;
														break;
													case 36:
														f5 += j5;
														f5 += o5;
														f5 += w9;
														e9 = 52;
														break;
													case 40:
														var N5 = "d";
														var x5 = "n";
														e9 = 38;
														break;
													case 46:
														I5 = 39;
														e9 = 1;
														break;
													case 28:
														D5 += o5;
														D5 += w9;
														D5 += x5;
														e9 = 42;
														break;
													case 15:
														var Q9 = "8";
														var T5 = "a";
														var Z5 = "s";
														e9 = 25;
														break;
													case 58:
														I5 = 29;
														e9 = 1;
														break;
													case 31:
														f5 += N5;
														e9 = 30;
														break;
													case 51:
														e9 = I5 === 43 ? 50 : 45;
														break;
													case 17:
														I5 = 17;
														e9 = 1;
														break;
													case 50:
														D5 += j5;
														D5 += N5;
														var k9 = typeof window !== D5 ? window : typeof global !== f5 ? global : this;
														try {
															var d9 = 2;
															while (d9 !== 60) {
																switch (d9) {
																	case 30:
																		L5 = 43;
																		d9 = 1;
																		break;
																	case 20:
																		L5 = 44;
																		d9 = 1;
																		break;
																	case 37:
																		L5 = 22;
																		d9 = 1;
																		break;
																	case 4:
																		H5 += S5;
																		H5 += K9;
																		d9 = 9;
																		break;
																	case 24:
																		d9 = L5 === 20 ? 23 : 34;
																		break;
																	case 10:
																		window[R5][q5]();
																		d9 = 20;
																		break;
																	case 15:
																		p5 += S5;
																		p5 += K9;
																		p5 += Z5;
																		d9 = 25;
																		break;
																	case 2:
																		var L5 = 2;
																		d9 = 1;
																		break;
																	case 9:
																		L5 = 15;
																		d9 = 1;
																		break;
																	case 36:
																		d9 = L5 === 8 ? 54 : 47;
																		break;
																	case 33:
																		L5 = !k9[p5] ? 20 : 43;
																		d9 = 1;
																		break;
																	case 41:
																		d9 = L5 === 25 ? 40 : 36;
																		break;
																	case 29:
																		d9 = L5 === 15 ? 28 : 41;
																		break;
																	case 25:
																		L5 = 8;
																		d9 = 1;
																		break;
																	case 18:
																		var p5 = b9;
																		p5 += M5;
																		p5 += Y5;
																		d9 = 15;
																		break;
																	case 32:
																		d9 = L5 === 44 ? 31 : 29;
																		break;
																	case 5:
																		d9 = L5 === 17 ? 4 : 8;
																		break;
																	case 63:
																		d9 = L5 === 11 ? 62 : 1;
																		break;
																	case 47:
																		d9 = L5 === 22 ? 46 : 63;
																		break;
																	case 62:
																		p5 += c9;
																		d9 = 61;
																		break;
																	case 28:
																		H5 += Z5;
																		H5 += T5;
																		d9 = 43;
																		break;
																	case 46:
																		H5 += a5;
																		H5 += c9;
																		var q5 = N5;
																		d9 = 64;
																		break;
																	case 31:
																		k9[H5] = function() {};
																		d9 = 30;
																		break;
																	case 7:
																		q5 += O9;
																		q5 += h9;
																		q5 += o5;
																		var R5 = N5;
																		R5 += m9;
																		R5 += T5;
																		d9 = 10;
																		break;
																	case 40:
																		H5 += N5;
																		H5 += W5;
																		H5 += x5;
																		d9 = 37;
																		break;
																	case 42:
																		L5 = 25;
																		d9 = 1;
																		break;
																	case 54:
																		p5 += T5;
																		p5 += Q9;
																		p5 += N5;
																		p5 += W5;
																		p5 += x5;
																		p5 += a5;
																		d9 = 48;
																		break;
																	case 61:
																		L5 = 10;
																		d9 = 1;
																		break;
																	case 48:
																		L5 = 11;
																		d9 = 1;
																		break;
																	case 8:
																		d9 = L5 === 34 ? 7 : 19;
																		break;
																	case 35:
																		L5 = 17;
																		d9 = 1;
																		break;
																	case 43:
																		H5 += Q9;
																		d9 = 42;
																		break;
																	case 23:
																		var H5 = b9;
																		H5 += M5;
																		H5 += Y5;
																		d9 = 35;
																		break;
																	case 19:
																		d9 = L5 === 2 ? 18 : 24;
																		break;
																	case 64:
																		L5 = 34;
																		d9 = 1;
																		break;
																	case 1:
																		d9 = L5 !== 43 ? 5 : 60;
																		break;
																	case 34:
																		d9 = L5 === 10 ? 33 : 32;
																		break;
																}
															}
														} catch (U9) {}
														e9 = 46;
														break;
													case 35:
														e9 = I5 === 15 ? 34 : 29;
														break;
													case 11:
														I5 = 20;
														e9 = 1;
														break;
													case 52:
														I5 = 21;
														e9 = 1;
														break;
												}
											}
										}());
										X9 = 3;
										break;
								}
							}
						}
					};
					break;
			}
		}
	}();
	D511.g0 = function() {
		return typeof D511.c0.H === 'function' ? D511.c0.H.apply(D511.c0, arguments) : D511.c0.H;
	};
	D511.C9 = function() {
		return typeof D511.y9.u5 === 'function' ? D511.y9.u5.apply(D511.y9, arguments) : D511.y9.u5;
	};
	D511.W0 = function() {
		return typeof D511.c0.l1 === 'function' ? D511.c0.l1.apply(D511.c0, arguments) : D511.c0.l1;
	};
	D511.t9 = function() {
		return typeof D511.y9.H === 'function' ? D511.y9.H.apply(D511.y9, arguments) : D511.y9.H;
	};
	D511.e6 = function() {
		return typeof D511.g6.H === 'function' ? D511.g6.H.apply(D511.g6, arguments) : D511.g6.H;
	};
	D511.V9h = "4820";
	D511.F9h = "(";
	D511.T1 = function() {
		return typeof D511.p1.d1 === 'function' ? D511.p1.d1.apply(D511.p1, arguments) : D511.p1.d1;
	};
	D511.L9h = 422.41;
	D511.Z0 = function() {
		return typeof D511.c0.H === 'function' ? D511.c0.H.apply(D511.c0, arguments) : D511.c0.H;
	};
	D511.o3h = "8";
	D511.c0 = function(C0) {
		return {
			S0: function() {
				var A0, e0 = arguments;
				switch (C0) {
					case 0:
						A0 = e0[1] | e0[0];
						break;
					case 2:
						A0 = e0[1] - e0[0];
						break;
					case 1:
						A0 = e0[0] * e0[1];
						break;
				}
				return A0;
			},
			p0: function(z0) {
				C0 = z0;
			}
		};
	}();
	D511.r8h = '#canvas';
	D511.f6h = "50";
	D511.u0 = 0;
	D511.Q3h = "#play";
	D511.c7 = null;
	D511.w0 = function() {
		return typeof D511.c0.d1 === 'function' ? D511.c0.d1.apply(D511.c0, arguments) : D511.c0.d1;
	};
	D511.g7 = "1.8";
	D511.z9h = ".$(\\\"";
	D511.T3h = "4";
	D511.e9h = "107.63";

	function D511() {}
	var fps;
	this.FRAMEBREAKER;
	MyGame = ig.Box2DGame.extend({
		name: D511.z7,
		version: D511.h7,
		sessionData: {},
		io: D511.c7,
		paused: D511.o7,
		tweens: D511.c7,
		gravity: D511.A5 * +D511.g7,
		init: function() {
			var H9h = D511;
			var y7 = "90";
			var B7 = 'beacch_scoccrer_init';
			var r7 = "91";
			var b7 = 'lagdevaF3001';
			var X7 = "936216";
			var q7 = "695332";
			var Q7 = "670451";
			var W7 = "725446";
			var i7 = "765460";
			var O7 = "665765";
			var d7 = "1585792587";
			var v7 = "1127570904";
			var M7 = "800146657";
			var f7 = "702578074";
			var Z7 = "1216382119";
			var A7 = 2100218266;
			var A9, v9, z9, s9, l9, P9;
			H9h.H0(H9h.u0);
			A9 = H9h.Y0(H9h.u0, Z7);
			v9 = A7;
			H9h.H0(H9h.P5);
			z9 = -H9h.b0(f7, H9h.P5);
			H9h.H0(H9h.u0);
			s9 = H9h.Y0(H9h.u0, M7);
			l9 = +v7;
			P9 = - +d7;
			 
				this.prepareGame();
				this.tweens = new ig.TweensHandler();
				this.setupMarketJsGameCenter();
				this.io = new IoManager();
				this.setupUrlParams = new ig.UrlParameters();
				this.removeLoadingWheel();
				this.setupStorageManager();
				this.setLoadData();
				this.finalize();
				// LaggedAPI.init(B7, b7);
				H9h.H0(H9h.u0);
				ig.game.laggedNomoreTimerDuration = H9h.b0(H9h.u0, y7);
		 
		},
		initData: function() {
			var j9h = D511;
			var J3h = "0.8";
			var k3h = "9";
			var P3h = "771";
			var m7 = "125476";
			var N7 = "314596";
			var u7 = "875685";
			var H7 = "595622";
			var j7 = "1534849061";
			var D7 = "2087307599";
			var Y7 = "1717479825";
			var E7 = "679140612";
			var n7 = "2037760530";
			var k7 = 466409073;
			var y5 = 799203;
			var w5 = 551617;
			var s5 = 9;
			var n9, u9, i9, H9, p9, L9;
			n9 = -k7;
			j9h.D0(j9h.P5);
			u9 = -j9h.b0(n7, j9h.P5);
			j9h.H0(j9h.u0);
			i9 = j9h.Y0(j9h.u0, E7);
			j9h.H0(j9h.P5);
			H9 = -j9h.b0(Y7, j9h.P5);
			j9h.D0(j9h.u0);
			p9 = -j9h.b0(j9h.u0, D7);
			j9h.D0(j9h.u0);
			L9 = -j9h.Y0(j9h.u0, j7);
			 
				return this.sessionData = {
					bgmVol: J3h * j9h.P5,
					sfxVol: j9h.P5,
					ballType2Tutor: j9h.c7,
					ballType3Tutor: j9h.c7,
					jumpingCrabTutor1: j9h.c7,
					jumpingCrabTutor2: j9h.c7,
					unlockedStage: [],
					highScore: [],
					totalStar: j9h.t7 | j9h.u0,
					totalScores: +j9h.t7,
					awardID: j9h.c7
				};
			 
		},
		setLoadData: function() {
			ig.soundHandler.bgmPlayer.volume(this.sessionData.bgmVol);
			ig.soundHandler.sfxPlayer.volume(this.sessionData.sfxVol);
		},
		setupMarketJsGameCenter: function() {
			var D9h = D511;
			var v3h = 'MarketJSGameCenter settings not defined in game settings';
			var M3h = "absolute";
			var f3h = 'MarketJSGameCenter activator settings present ....';
			var Z3h = 'gamecenter-activator';
			var g3h = 'MarketJSGameCenter';
			var c3h = 'Left';
			var h3h = 'Position';
			var z3h = 'Activator';
			var G3h = 'Top';
			var I3h = "z-index";
			var V3h = "398493";
			var e3h = "131127";
			var x3h = "791803";
			var F3h = "731327";
			var K3h = "402453";
			var L3h = "1722825277";
			var s3h = "401110535";
			var C3h = "510301085";
			var l3h = "829010037";
			var p3h = "847585865";
			var S3h = "190223625";
			var B5 = 789372;
			var J5 = 3;
			var I9, D9, f9, N9, x9, j9, D;
			D9h.H0(D9h.k5);
			I9 = -D9h.b0(D9h.u0, S3h);
			D9 = +p3h;
			f9 = +l3h;
			N9 = - +C3h;
			D9h.H0(D9h.P5);
			x9 = D9h.b0(s3h, D9h.P5);
			j9 = +L3h;
			 
				if (_SETTINGS) {
					if (_SETTINGS[g3h]) {
						D = ig.domHandler.getElementByClass(Z3h);
						if (_SETTINGS[g3h][z3h][D9h.A3h]) {
							if (_SETTINGS[g3h][z3h][h3h]) {
								console.log(f3h);
								ig.domHandler.css(D, {
									position: M3h,
									left: _SETTINGS[g3h][z3h][h3h][c3h],
									top: _SETTINGS[g3h][z3h][h3h][G3h],
									"z-index": J5
								});
							}
						}
						ig.domHandler.show(D);
					} else {
						console.log(v3h);
					}
				}
			
		},
		finalize: function() {
			var Y9h = D511;
			var q3h = 'ig.soundHandler.sfxPlayer.play("staticSound");ig.game.splashClick();';
			var U3h = 'onclick';
			var a3h = "100080";
			var W3h = "365898";
			var w3h = "340428";
			var i3h = "299420090";
			var O3h = "1956758790";
			var t3h = "611942305";
			var d3h = "65323255";
			var G7 = 2115385827;
			var I7 = 2104904900;
			var T7 = 993837;
			var r5 = 778042;
			var g5 = 354215;
			var q9, o9, R9, T9, a9, Z9, T;
			q9 = +d3h;
			o9 = +t3h;
			R9 = +O3h;
			T9 = G7;
			Y9h.H0(Y9h.P5);
			a9 = Y9h.Y0(i3h, Y9h.P5);
			Z9 = I7;
			 
				if (ig.ua.mobile) {
					T = ig.domHandler.getElementById(Y9h.Q3h);
					ig.domHandler.attr(T, U3h, q3h);
					ig.domHandler.show(T);
				} else {
					this.start();
				}
				ig.sizeHandler.reorient();
		 
		},
		removeLoadingWheel: function() {
			var E9h = D511;
			var N3h = 'none';
			var u3h = 'background';
			var H3h = '#ajaxbar';
			var j3h = "302515";
			var D3h = "508929";
			var Y3h = "292725";
			var E3h = "259257";
			var n3h = "1121618709";
			var y3h = "404944540";
			var B3h = "146865799";
			var r3h = "773590736";
			var b3h = "2059296655";
			var X3h = "78650130";
			var m5 = 893958;
			var Q5 = 554316;
			var W9, S9, Y9, M9, K1, r1;
			E9h.H0(E9h.k5);
			W9 = E9h.Y0(E9h.u0, X3h);
			S9 = +b3h;
			E9h.H0(E9h.u0);
			Y9 = E9h.Y0(E9h.u0, r3h);
			E9h.H0(E9h.u0);
			M9 = E9h.Y0(E9h.u0, B3h);
			K1 = - +y3h;
			E9h.D0(E9h.P5);
			r1 = -E9h.Y0(n3h, E9h.P5);
			 	try {
					$(H3h).css(u3h, N3h);
				} catch (S) {
					console.log(S);
				}
			 
		},
		showDebugMenu: function() {
			var n9h = D511;
			var K6h = '.ig_debug';
			var s6h = 'showing debug menu ...';
			var C6h = "229081";
			var l6h = "274763";
			var p6h = "798506";
			var S6h = "638709";
			var J6h = "960333";
			var k6h = "159625497";
			var R6h = "950069796";
			var T6h = "191460118";
			var P6h = "886951158";
			var m3h = "474119114";
			var K7 = 1118144217;
			var b5 = 709430;
			var y1, E1, G1, n1, i1, L1;
			n9h.D0(n9h.k5);
			y1 = n9h.Y0(n9h.u0, m3h);
			n9h.D0(n9h.k5);
			E1 = -n9h.b0(n9h.u0, P6h);
			G1 = - +T6h;
			n9h.H0(n9h.k5);
			n1 = -n9h.Y0(n9h.u0, R6h);
			i1 = K7;
			n9h.H0(n9h.k5);
			L1 = n9h.Y0(n9h.u0, k6h);
			 	console.log(s6h);
				ig.Entity._debugShowBoxes = n9h.L6h;
				$(K6h).show();
			 
		},
		start: function() {
			var y9h = D511;
			var v6h = "92";
			var M6h = "51";
			var Z6h = 'DeveloperBranding';
			var o6h = 'Splash';
			var c6h = 'Branding';
			var h6h = "313781";
			var z6h = "717151";
			var G6h = "626387";
			var I6h = "349283";
			var A6h = "810695";
			var V6h = "608744602";
			var e6h = "553632882";
			var x6h = "1144064806";
			var F6h = "1163734288";
			var V7 = 2054749302;
			var l7 = 795145484;
			var U5 = 678616;
			var I1, f1, N1, x1, M1, V2;
			y9h.H0(y9h.k5);
			I1 = -y9h.Y0(y9h.u0, F6h);
			y9h.H0(y9h.P5);
			f1 = y9h.Y0(x6h, y9h.P5);
			N1 = -l7;
			x1 = -V7;
			y9h.D0(y9h.k5);
			M1 = -y9h.Y0(y9h.u0, e6h);
			V2 = - +V6h;
			 
				this.resetPlayerStats();
				this.director = new ig.Director(this, [LevelOpening, LevelMainmenu, LevelGameEditor, LevelGamePlay, LevelGame]);
				if (_SETTINGS[c6h][o6h][y9h.A3h]) {
					try {
						this.branding = new ig.BrandingSplash();
					} catch (X) {
						var g6h = 'Loading original levels ...';
						console.log(X);
						console.log(g6h);
						this.director.loadLevel(this.director.currentLevel);
					}
				} else {
					this.director.loadLevel(this.director.currentLevel);
				}
				if (_SETTINGS[c6h][o6h][y9h.A3h] || _SETTINGS[Z6h][o6h][y9h.A3h]) {
					y9h.D0(y9h.P5);
					this.spawnEntity(EntityPointerSelector, y9h.Y0(y9h.f6h, y9h.P5), y9h.b0(y9h.f6h, y9h.P5));
				}
				ig.soundHandler.bgmPlayer.play(ig.soundHandler.bgmPlayer.soundList.background);
		 
		},
		fpsCount: function() {
			var B9h = D511;
			var b6h = "7";
			var X6h = "3";
			var q6h = "624042";
			var U6h = "914376";
			var Q6h = "756935";
			var a6h = "470369";
			var W6h = "274581";
			var w6h = "312189";
			var i6h = "1245948788";
			var O6h = "1285120379";
			var t6h = "1502758570";
			var d6h = "1424364916";
			var J7 = 591127981;
			var R7 = 132099199;
			var b2, w2, K2, k2, c2, Q2;
			b2 = -R7;
			w2 = - +d6h;
			K2 = -J7;
			B9h.H0(B9h.k5);
			k2 = -B9h.Y0(B9h.u0, t6h);
			B9h.D0(B9h.u0);
			c2 = B9h.Y0(B9h.u0, O6h);
			Q2 = +i6h;
			 
				if (!this.fpsTimer) {
					this.fpsTimer = new ig.Timer(+B9h.R3h);
				}
				if (this.fpsTimer && this.fpsTimer.delta() < +B9h.t7) {
					if (this.fpsCounter != B9h.c7) {
						this.fpsCounter++;
					} else {
						B9h.H0(B9h.u0);
						this.fpsCounter = B9h.b0(B9h.u0, B9h.t7);
					}
				} else {
					ig.game.fps = this.fpsCounter;
					B9h.D0(B9h.k5);
					this.fpsCounter = B9h.b0(B9h.u0, B9h.t7);
					this.fpsTimer.reset();
				}
			 
		},
		endGame: function() {
			var r9h = D511;
			var m6h = "MJSEnd";
			var N6h = 'End game';
			var u6h = "123651";
			var H6h = "129771";
			var j6h = "904585";
			var D6h = "976097";
			var Y6h = "149229";
			var E6h = "868465";
			var n6h = "200941063";
			var y6h = "2008599355";
			var B6h = "157659807";
			var r6h = "1669575988";
			var L7 = 1056699322;
			var p7 = 792799371;
			var O2, h2, m2, U2, r2, X2;
			O2 = p7;
			h2 = +r6h;
			m2 = +B6h;
			r9h.H0(r9h.u0);
			U2 = r9h.Y0(r9h.u0, y6h);
			r2 = - +n6h;
			X2 = -L7;
			 	console.log(N6h);
				ig.soundHandler.bgmPlayer.stop();
				ig.apiHandler.run(m6h);
		 
		},
		resetPlayerStats: function() {
			var b9h = D511;
			var F4h = 'resetting player stats ...';
			var L4h = "771939";
			var s4h = "395097";
			var C4h = "385185";
			var l4h = "674579";
			var p4h = "518223";
			var S4h = "2050193249";
			var J4h = "999616921";
			var k4h = "284869797";
			var R4h = "1181344422";
			var T4h = "2141093242";
			var P4h = "825569827";
			var d5 = 410792;
			var e2, d2, y2, t2, g2, F2;
			e2 = - +P4h;
			b9h.D0(b9h.u0);
			d2 = b9h.b0(b9h.u0, T4h);
			b9h.H0(b9h.k5);
			y2 = b9h.b0(b9h.u0, R4h);
			b9h.H0(b9h.P5);
			t2 = b9h.b0(k4h, b9h.P5);
			b9h.D0(b9h.k5);
			g2 = -b9h.b0(b9h.u0, J4h);
			F2 = - +S4h;
	 
				ig.log(F4h);
				this.playerStats = {
					id: this.playerStats ? this.playerStats.id : b9h.c7
				};
			 
		},
		splashClick: function() {
			var d9h = D511;
			var o4h = "MJSHeader";
			var c4h = "MJSFooter";
			var h4h = "736005";
			var z4h = "792137";
			var G4h = "987362";
			var I4h = "1793854978";
			var A4h = "1840306955";
			var V4h = "1518947517";
			var e4h = "761211778";
			var x4h = "1062627416";
			var s7 = 983094879;
			var E5 = 879043;
			var X5 = 706744;
			var t5 = 450967;
			var B2, E2, G2, C2, J2, A2, I;
			B2 = s7;
			E2 = - +x4h;
			d9h.H0(d9h.k5);
			G2 = -d9h.b0(d9h.u0, e4h);
			d9h.D0(d9h.P5);
			C2 = d9h.b0(V4h, d9h.P5);
			d9h.H0(d9h.P5);
			J2 = d9h.Y0(A4h, d9h.P5);
			d9h.D0(d9h.P5);
			A2 = -d9h.b0(I4h, d9h.P5);
		 
				I = ig.domHandler.getElementById(d9h.Q3h);
				ig.domHandler.hide(I);
				ig.apiHandler.run(c4h);
				ig.apiHandler.run(o4h);
				ig.game.start();
			 
		},
		pauseGame: function() {
			var q9h = D511;
			var w4h = 'Game Paused';
			var i4h = "168122";
			var O4h = "339910";
			var t4h = "520463";
			var d4h = "304858";
			var v4h = "155852";
			var M4h = "956377263";
			var f4h = "25532233";
			var Z4h = "1460446393";
			var g4h = "237435576";
			var e7 = 2041021292;
			var x7 = 1428833577;
			var z5 = 305551;
			var v2, z2, s2, l2, P2, n2;
			v2 = -x7;
			q9h.D0(q9h.u0);
			z2 = q9h.Y0(q9h.u0, g4h);
			q9h.H0(q9h.P5);
			s2 = -q9h.b0(Z4h, q9h.P5);
			l2 = +f4h;
			P2 = - +M4h;
			n2 = e7;
			 	ig.system.stopRunLoop.call(ig.system);
				ig.game.tweens.onSystemPause();
				console.log(w4h);
		 
		},
		resumeGame: function() {
			var W4h = 'Game Resumed';
			ig.system.startRunLoop.call(ig.system);
			ig.game.tweens.onSystemResume();
			console.log(W4h);
		},
		showOverlay: function(C) {
			var Q4h = "visible";
			for (i = +D511.t7; i < C.length; i++) {
				if ($(D511.a4h + C[i])) {
					$(D511.a4h + C[i]).show();
				}
				if (document.getElementById(C[i])) {
					document.getElementById(C[i]).style.visibility = Q4h;
				}
			}
		},
		hideOverlay: function(w) {
			var Q9h = D511;
			var H4h = "hidden";
			var j4h = "299340";
			var D4h = "302633";
			var Y4h = "122908";
			var E4h = "452635";
			var n4h = "437773";
			var y4h = "527104";
			var B4h = "898514652";
			var r4h = "41164149";
			var b4h = "2020404457";
			var X4h = "427025312";
			var q4h = "752116467";
			var U4h = "111182480";
			var u2, i2, H2, p2, L2, I2;
			u2 = - +U4h;
			Q9h.D0(Q9h.u0);
			i2 = -Q9h.b0(Q9h.u0, q4h);
			Q9h.D0(Q9h.u0);
			H2 = -Q9h.b0(Q9h.u0, X4h);
			Q9h.D0(Q9h.k5);
			p2 = Q9h.Y0(Q9h.u0, b4h);
			Q9h.H0(Q9h.k5);
			L2 = Q9h.b0(Q9h.u0, r4h);
			I2 = +B4h;
	 
				for (i = +Q9h.t7; i < w.length; i++) {
					if ($(Q9h.a4h + w[i])) {
						$(Q9h.a4h + w[i]).hide();
					}
					if (document.getElementById(w[i])) {
						document.getElementById(w[i]).style.visibility = H4h;
					}
				}
		 
		},
		currentBGMVolume: D511.P5,
		addition: +D511.u4h,
		update: function() {
			var a9h = D511;
			var l8h = "659602";
			var p8h = "716896";
			var S8h = "228154";
			var J8h = "994808";
			var k8h = "1040671705";
			var R8h = "223451215";
			var T8h = "157884699";
			var P8h = "619756747";
			var m4h = "538650378";
			var N4h = "1785615627";
			var n5 = 856707;
			var c5 = 342686;
			var D2, f2, N2, x2, j2, q2;
			a9h.D0(a9h.u0);
			D2 = a9h.b0(a9h.u0, N4h);
			f2 = +m4h;
			N2 = - +P8h;
			a9h.D0(a9h.k5);
			x2 = a9h.b0(a9h.u0, T8h);
			j2 = - +R8h;
			a9h.H0(a9h.u0);
			q2 = a9h.b0(a9h.u0, k8h);
		 
				if (this.paused) {
					this.updateWhilePaused();
					this.checkWhilePaused();
				} else {
					this.parent();
					this.tweens.update(this.tweens.now());
					if (ig.ua.mobile && ig.soundHandler) {
						ig.soundHandler.forceLoopBGM();
					}
				}
			 
		},
		updateWhilePaused: function() {
			for (var B = D511.u0; B < this.entities.length; B++) {
				if (this.entities[B].ignorePause) {
					this.entities[B].update();
				}
			}
		},
		checkWhilePaused: function() {
			var w9h = D511;
			var O, J, v, f, R, r, A, a;
			O = {};
			for (var K = w9h.t7 - w9h.u0; K < this.entities.length; K++) {
				J = this.entities[K];
				if (J.ignorePause) {
					if (J.type == ig.Entity.TYPE.NONE && J.checkAgainst == ig.Entity.TYPE.NONE && J.collides == ig.Entity.COLLIDES.NEVER) {
						continue;
					}
					v = {};
					f = Math.floor(J.pos.x / this.cellSize);
					R = Math.floor(J.pos.y / this.cellSize);
					r = Math.floor((J.pos.x + J.size.x) / this.cellSize) + w9h.P5;
					A = Math.floor((J.pos.y + J.size.y) / this.cellSize) + (w9h.R3h - w9h.u0);
					for (var d = f; d < r; d++) {
						for (var n = R; n < A; n++) {
							if (!O[d]) {
								O[d] = {};
								O[d][n] = [J];
							} else if (!O[d][n]) {
								O[d][n] = [J];
							} else {
								a = O[d][n];
								for (var s = w9h.t7 - w9h.u0; s < a.length; s++) {
									if (J.touches(a[s]) && !v[a[s].id]) {
										v[a[s].id] = w9h.L6h;
										ig.Entity.checkPair(J, a[s]);
									}
								}
								a.push(J);
							}
						}
					}
				}
			}
		},
		draw: function() {
			this.parent();
			this.dctf();
		},
		dctf: function() {
			this.COPYRIGHT;
		},
		clearCanvas: function(M, Z, z) {
			var s8h = "inherit";
			var C8h = "none";
			var V;
			V = M.canvas;
			M.clearRect(+D511.t7, +D511.t7, Z, z);
			V.style.display = C8h;
			V.offsetHeight;
			V.style.display = s8h;
		},
		drawDebug: function() {
			var O9h = D511;
			var M8h = "10";
			var f8h = ": ";
			var Z8h = '#ffffff';
			var g8h = "10px Arial";
			var o8h = 0.35;
			var c8h = "17";
			var h8h = "19";
			var z8h = "6";
			var G8h = "6745";
			var I8h = '#000000';
			var A8h = "780135";
			var V8h = "133661";
			var e8h = "331718";
			var x8h = "961331";
			var F8h = "1564048749";
			var K8h = "1063135770";
			var L8h = "946964138";
			var F7 = 1144530282;
			var C7 = 955251837;
			var S7 = 789340604;
			var O5 = 536872;
			var G5 = 136962;
			var V5 = 73;
			var C5 = 6;
			var l5 = 4;
			var o2, R2, T2, a2, Z2, W2;
			o2 = -S7;
			O9h.D0(O9h.u0);
			R2 = O9h.b0(O9h.u0, L8h);
			T2 = F7;
			a2 = -C7;
			Z2 = - +K8h;
			O9h.D0(O9h.k5);
			W2 = O9h.Y0(O9h.u0, F8h);
		 
				if (!ig.global.wm) {
					this.debugEnable();
					if (this.viewDebug) {
						ig.system.context.fillStyle = I8h;
						ig.system.context.globalAlpha = o8h;
						O9h.D0(O9h.P5);
						ig.system.context.fillRect(O9h.b0(O9h.t7, O9h.P5), +O9h.t7, ig.system.width / (O9h.T3h * O9h.P5), ig.system.height);
						ig.system.context.globalAlpha = O9h.P5;
						if (this.debug && this.debug.length > (O9h.t7 | O9h.u0)) {
							for (i = O9h.u0; i < this.debug.length; i++) {
								ig.system.context.font = g8h;
								ig.system.context.fillStyle = Z8h;
								ig.system.context.fillText(this.debugLine - this.debug.length + i + f8h + this.debug[i], M8h - O9h.u0, (O9h.f6h | O9h.u0) + M8h * O9h.P5 * i);
							}
						}
					}
				}
			 
		},
		debugCL: function(o) {
			var X9h = D511;
			var U8h = "54";
			var Q8h = "254498";
			var a8h = "123289";
			var W8h = "946807";
			var w8h = "691842871";
			var i8h = "299700744";
			var O8h = "620250283";
			var t8h = "1870725754";
			var d8h = "1897953028";
			var v8h = "2117566906";
			var P7 = 909683;
			var v5 = 405316;
			var h5 = 340097;
			var S2, Y2, M2, V3, b3, w3;
			X9h.H0(X9h.P5);
			S2 = -X9h.b0(v8h, X9h.P5);
			Y2 = +d8h;
			M2 = +t8h;
			V3 = - +O8h;
			X9h.H0(X9h.P5);
			b3 = X9h.Y0(i8h, X9h.P5);
			X9h.H0(X9h.u0);
			w3 = -X9h.b0(X9h.u0, w8h);
			 
				if (!this.debug) {
					this.debug = [];
					X9h.D0(X9h.u0);
					this.debugLine = X9h.b0(X9h.u0, X9h.R3h);
					this.debug.push(o);
				} else {
					if (this.debug.length < X9h.f6h - X9h.u0) {
						this.debug.push(o);
					} else {
						this.debug.splice(+X9h.t7, X9h.P5);
						this.debug.push(o);
					}
					this.debugLine++;
				}
				console.log(o);
		 
		},
		debugEnable: function() {
			var t9h = D511;
			var X8h = "2";
			var q8h = 'click';
			if (ig.input.pressed(q8h)) {
				this.debugEnableTimer = new ig.Timer(+X8h);
			}
			if (this.debugEnableTimer && this.debugEnableTimer.delta() < +t9h.t7) {
				if (ig.input.released(q8h)) {
					this.debugEnableTimer = t9h.c7;
				}
			} else if (this.debugEnableTimer && this.debugEnableTimer.delta() > (t9h.t7 | t9h.u0)) {
				this.debugEnableTimer = t9h.c7;
				if (this.viewDebug) {
					this.viewDebug = t9h.o7;
				} else {
					this.viewDebug = t9h.L6h;
				}
			}
		}
	});
	ig.domHandler = D511.c7;
	ig.domHandler = new ig.DomHandler();
	ig.domHandler.forcedDeviceDetection();
	ig.domHandler.forcedDeviceRotation();
	ig.apiHandler = new ig.ApiHandler();
	ig.sizeHandler = new ig.SizeHandler(ig.domHandler);
	D511.H0(D511.P5);
	fps = D511.b0(D511.b8h, D511.P5);
	if (ig.ua.mobile) {
		ig.Sound.enabled = D511.o7;
		ig.main(D511.r8h, MyGame, fps, ig.sizeHandler.mobile.actualResolution.x, ig.sizeHandler.mobile.actualResolution.y, ig.sizeHandler.scale, ig.SplashLoader);
		ig.sizeHandler.resize();
	} else {
		ig.main(D511.r8h, MyGame, fps, ig.sizeHandler.desktop.actualResolution.x, ig.sizeHandler.desktop.actualResolution.y, ig.sizeHandler.scale, ig.SplashLoader);
	}
	ig.soundHandler = D511.c7;
	ig.soundHandler = new ig.SoundHandler();
	ig.sizeHandler.reorient();

});