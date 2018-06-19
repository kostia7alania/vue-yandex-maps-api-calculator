(function ymapsInit(e) {
  var n = this,
    t = {
      ns: {},
      env: e,
      project: {
        preload: ["package.system"],
        namespace: "ymaps",
        combineBatchSize: 500
      }
    },
    r = "undefined" == typeof e.namespace ? t.project.namespace : e.namespace,
    i = .01;
  t.performance = function (e) {
    function n() {
      g = g || setTimeout(t, y)
    }

    function t() {
      clearTimeout(g), g = null;
      var e = r();
      if (e) {
        var t = o + "/vars=" + e + "/*";
        if (!s || !navigator.sendBeacon(i, t)) {
          var a = new Image,
            u = (new Date).getTime() + Math.round(100 * Math.random());
          a.src = i + "/rnd=" + u + t
        }
        n()
      }
    }

    function r() {
      var e = [],
        n = 0;
      for (var t in f)
        if (f.hasOwnProperty(t) && f[t].length && (e.push(t + "=" + f[t].shift()), ++n >= v)) break;
      for (var t in l)
        if (l.hasOwnProperty(t) && l[t].length && (e.push(t + "=" + l[t].shift()), ++n >= v)) break;
      return e.join(",")
    }
    var i, o, s, a, u = {
        exports: {}
      },
      c = (u.exports, window.performance || {
        now: function () {
          return Date.now()
        }
      }),
      l = {},
      f = {},
      d = c.getEntriesByType ? function (e) {
        return c.getEntriesByType("resource").filter(function (n) {
          return n.name === e
        })[0]
      } : function () {},
      p = {
        initjs: "i",
        mapjs: "m",
        combine_s: "cs",
        combine_m: "cm",
        combine_l: "cl"
      },
      h = {
        eval: "e",
        duration: "d",
        cached: "c",
        encodedSize: "esz",
        decodedSize: "dsz",
        responseDuration: "res",
        requestDuration: "req"
      },
      m = {
        statistics: {
          combine: {
            total: 0,
            size: 0,
            modules: 0
          }
        },
        initTimings: {},
        now: function () {
          return c.now()
        },
        getResourceTimings: function (e) {
          return d(e) || {}
        },
        init: function (e) {
          i = e.url, o = "/pid=443/cid=73188/dtype=stred" + e.data, s = Boolean(e.useSendBeacon && navigator.sendBeacon), a = e.enable, m.initTimings = m.getResourceTimings(e.initUrl), m.saveResourceTimings("initjs", m.initTimings, {
            size: !1,
            cached: !1
          })
        },
        saveMeasure: function (e, t) {
          if (a) {
            var r = /^@/.test(e);
            if (r) {
              var i = e.replace(/^@/, "").split(".");
              e = (p[i[0]] || i[0]) + "." + (h[i[1]] || i[1])
            }
            if (t = Math.round(t), !isNaN(t)) {
              var o = r ? l : f;
              o[e] = o[e] || [], o[e].push(t), n()
            }
          }
        },
        startMeasure: function (e, n) {
          n = "undefined" == typeof n ? c.now() : n;
          var t = !1;
          return {
            finish: function (r) {
              t || (r = "undefined" == typeof r ? c.now() : r, m.saveMeasure(e, r - n), t = !0)
            }
          }
        },
        saveResourceTimings: function (e, n, t) {
          var r = "object" == typeof n ? n : d(n);
          if (r && (t = t || {}, e = e.replace(/^@?/, "@"), this.saveMeasure(e + ".duration", r.duration), r.responseStart)) {
            var i = 0 === r.transferSize ? 1 : 0;
            this.saveMeasure(e + ".responseDuration", r.responseEnd - r.responseStart), this.saveMeasure(e + ".requestDuration", r.responseStart - r.requestStart), t.cached !== !1 && this.saveMeasure(e + ".cached", i), t.size === !1 || i || (this.saveMeasure(e + ".encodedSize", r.encodedBodySize / 1024), this.saveMeasure(e + ".decodedSize", r.decodedBodySize / 1024))
          }
        }
      },
      v = 40,
      y = 5e3,
      g = null;
    return window.addEventListener("beforeunload", function () {
      m.saveMeasure("combine.total", m.statistics.combine.total), m.saveMeasure("combine.modules", m.statistics.combine.modules), m.saveMeasure("combine.size", m.statistics.combine.size / 1024), t()
    }), u.exports = m, u.exports
  }();
  var o = t.performance.startMeasure("@initjs.eval");
  t.count = function (e) {
    function n() {
      r.push(arguments)
    }
    var t = {
        exports: {}
      },
      r = (t.exports, []),
      i = null,
      o = function () {
        (i || n).apply(null, arguments)
      };
    return o.provideImplementation = function (e) {
      if (i) throw new Error("ym.count: implementation was already provided.");
      i = e(r)
    }, t.exports = o, t.exports
  }(), t.vow = t.ns.vow = function (e) {
    var t, r = {
      exports: {}
    };
    r.exports;
    return function (e) {
      var n, i = function () {
          var n = [],
            t = function (e) {
              return n.push(e), 1 === n.length
            },
            r = function () {
              var e = n,
                t = 0,
                r = n.length;
              for (n = []; t < r;) e[t++]()
            };
          if ("function" == typeof setImmediate) return function (e) {
            t(e) && setImmediate(r)
          };
          if ("object" == typeof process && process.nextTick) return function (e) {
            t(e) && process.nextTick(r)
          };
          var i = e.MutationObserver || e.WebKitMutationObserver;
          if (i) {
            var o = 1,
              s = document.createTextNode("");
            return new i(r).observe(s, {
                characterData: !0
              }),
              function (e) {
                t(e) && (s.data = o *= -1)
              }
          }
          if (e.postMessage) {
            var a = !0;
            if (e.attachEvent) {
              var u = function () {
                a = !1
              };
              e.attachEvent("onmessage", u), e.postMessage("__checkAsync", "*"), e.detachEvent("onmessage", u)
            }
            if (a) {
              var c = "__promise" + Math.random() + "_" + new Date,
                l = function (e) {
                  e.data === c && (e.stopPropagation && e.stopPropagation(), r())
                };
              return e.addEventListener ? e.addEventListener("message", l, !0) : e.attachEvent("onmessage", l),
                function (n) {
                  t(n) && e.postMessage(c, "*")
                }
            }
          }
          var f = e.document;
          if ("onreadystatechange" in f.createElement("script")) {
            var d = function () {
              var e = f.createElement("script");
              e.onreadystatechange = function () {
                e.parentNode.removeChild(e), e = e.onreadystatechange = null, r()
              }, (f.documentElement || f.body).appendChild(e)
            };
            return function (e) {
              t(e) && d()
            }
          }
          return function (e) {
            t(e) && setTimeout(r, 0)
          }
        }(),
        o = function (e) {
          i(function () {
            throw e
          })
        },
        s = function (e) {
          return "function" == typeof e
        },
        a = function (e) {
          return null !== e && "object" == typeof e
        },
        u = Object.prototype.toString,
        c = Array.isArray || function (e) {
          return "[object Array]" === u.call(e)
        },
        l = function (e) {
          for (var n = [], t = 0, r = e.length; t < r;) n.push(t++);
          return n
        },
        f = Object.keys || function (e) {
          var n = [];
          for (var t in e) e.hasOwnProperty(t) && n.push(t);
          return n
        },
        d = function (e) {
          var n = function (n) {
            this.name = e, this.message = n
          };
          return n.prototype = new Error, n
        },
        p = function (e, n) {
          return function (t) {
            e.call(this, t, n)
          }
        },
        h = function () {
          this._promise = new v
        };
      h.prototype = {
        promise: function () {
          return this._promise
        },
        resolve: function (e) {
          this._promise.isResolved() || this._promise._resolve(e)
        },
        reject: function (e) {
          this._promise.isResolved() || (_.isPromise(e) ? (e = e.then(function (e) {
            var n = _.defer();
            return n.reject(e), n.promise()
          }), this._promise._resolve(e)) : this._promise._reject(e))
        },
        notify: function (e) {
          this._promise.isResolved() || this._promise._notify(e)
        }
      };
      var m = {
          PENDING: 0,
          RESOLVED: 1,
          FULFILLED: 2,
          REJECTED: 3
        },
        v = function (e) {
          if (this._value = n, this._status = m.PENDING, this._fulfilledCallbacks = [], this._rejectedCallbacks = [], this._progressCallbacks = [], e) {
            var t = this,
              r = e.length;
            e(function (e) {
              t.isResolved() || t._resolve(e)
            }, r > 1 ? function (e) {
              t.isResolved() || t._reject(e)
            } : n, r > 2 ? function (e) {
              t.isResolved() || t._notify(e)
            } : n)
          }
        };
      v.prototype = {
        valueOf: function () {
          return this._value
        },
        isResolved: function () {
          return this._status !== m.PENDING
        },
        isFulfilled: function () {
          return this._status === m.FULFILLED
        },
        isRejected: function () {
          return this._status === m.REJECTED
        },
        then: function (e, n, t, r) {
          var i = new h;
          return this._addCallbacks(i, e, n, t, r), i.promise()
        },
        "catch": function (e, t) {
          return this.then(n, e, t)
        },
        fail: function (e, t) {
          return this.then(n, e, t)
        },
        always: function (e, n) {
          var t = this,
            r = function () {
              return e.call(this, t)
            };
          return this.then(r, r, n)
        },
        progress: function (e, t) {
          return this.then(n, n, e, t)
        },
        spread: function (e, n, t) {
          return this.then(function (n) {
            return e.apply(this, n)
          }, n, t)
        },
        done: function (e, n, t, r) {
          this.then(e, n, t, r).fail(o)
        },
        delay: function (e) {
          var n, t = this.then(function (t) {
            var r = new h;
            return n = setTimeout(function () {
              r.resolve(t)
            }, e), r.promise()
          });
          return t.always(function () {
            clearTimeout(n)
          }), t
        },
        timeout: function (e) {
          var n = new h,
            t = setTimeout(function () {
              n.reject(new _.TimedOutError("timed out"))
            }, e);
          return this.then(function (e) {
            n.resolve(e)
          }, function (e) {
            n.reject(e)
          }), n.promise().always(function () {
            clearTimeout(t)
          }), n.promise()
        },
        _vow: !0,
        _resolve: function (e) {
          if (!(this._status > m.RESOLVED)) {
            if (e === this) return void this._reject(TypeError("Can't resolve promise with itself"));
            if (this._status = m.RESOLVED, e && e._vow) return void(e.isFulfilled() ? this._fulfill(e.valueOf()) : e.isRejected() ? this._reject(e.valueOf()) : e.then(this._fulfill, this._reject, this._notify, this));
            if (a(e) || s(e)) {
              var n;
              try {
                n = e.then
              } catch (t) {
                return void this._reject(t)
              }
              if (s(n)) {
                var r = this,
                  i = !1;
                try {
                  n.call(e, function (e) {
                    i || (i = !0, r._resolve(e))
                  }, function (e) {
                    i || (i = !0, r._reject(e))
                  }, function (e) {
                    r._notify(e)
                  })
                } catch (t) {
                  i || this._reject(t)
                }
                return
              }
            }
            this._fulfill(e)
          }
        },
        _fulfill: function (e) {
          this._status > m.RESOLVED || (this._status = m.FULFILLED, this._value = e, this._callCallbacks(this._fulfilledCallbacks, e), this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = n)
        },
        _reject: function (e) {
          this._status > m.RESOLVED || (this._status = m.REJECTED, this._value = e, this._callCallbacks(this._rejectedCallbacks, e), this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = n)
        },
        _notify: function (e) {
          this._callCallbacks(this._progressCallbacks, e)
        },
        _addCallbacks: function (e, t, r, i, o) {
          r && !s(r) ? (o = r, r = n) : i && !s(i) && (o = i, i = n);
          var a;
          this.isRejected() || (a = {
            defer: e,
            fn: s(t) ? t : n,
            ctx: o
          }, this.isFulfilled() ? this._callCallbacks([a], this._value) : this._fulfilledCallbacks.push(a)), this.isFulfilled() || (a = {
            defer: e,
            fn: r,
            ctx: o
          }, this.isRejected() ? this._callCallbacks([a], this._value) : this._rejectedCallbacks.push(a)), this._status <= m.RESOLVED && this._progressCallbacks.push({
            defer: e,
            fn: i,
            ctx: o
          })
        },
        _callCallbacks: function (e, n) {
          var t = e.length;
          if (t) {
            var r = this.isResolved(),
              o = this.isFulfilled(),
              s = this.isRejected();
            i(function () {
              for (var i, a, u, c = 0; c < t;)
                if (i = e[c++], a = i.defer, u = i.fn) {
                  var l, f = i.ctx;
                  try {
                    l = f ? u.call(f, n) : u(n)
                  } catch (d) {
                    a.reject(d);
                    continue
                  }
                  r ? a.resolve(l) : a.notify(l)
                } else o ? a.resolve(n) : s ? a.reject(n) : a.notify(n)
            })
          }
        }
      };
      var y = {
        cast: function (e) {
          return _.cast(e)
        },
        all: function (e) {
          return _.all(e)
        },
        race: function (e) {
          return _.anyResolved(e)
        },
        resolve: function (e) {
          return _.resolve(e)
        },
        reject: function (e) {
          return _.reject(e)
        }
      };
      for (var g in y) y.hasOwnProperty(g) && (v[g] = y[g]);
      var _ = {
        Deferred: h,
        Promise: v,
        defer: function () {
          return new h
        },
        when: function (e, n, t, r, i) {
          return _.cast(e).then(n, t, r, i)
        },
        fail: function (e, t, r) {
          return _.when(e, n, t, r)
        },
        always: function (e, n, t) {
          return _.when(e).always(n, t)
        },
        progress: function (e, n, t) {
          return _.when(e).progress(n, t)
        },
        spread: function (e, n, t, r) {
          return _.when(e).spread(n, t, r)
        },
        done: function (e, n, t, r, i) {
          _.when(e).done(n, t, r, i)
        },
        isPromise: function (e) {
          return a(e) && s(e.then)
        },
        cast: function (e) {
          return e && e._vow ? e : _.resolve(e)
        },
        valueOf: function (e) {
          return e && s(e.valueOf) ? e.valueOf() : e
        },
        isFulfilled: function (e) {
          return !e || !s(e.isFulfilled) || e.isFulfilled()
        },
        isRejected: function (e) {
          return !(!e || !s(e.isRejected)) && e.isRejected()
        },
        isResolved: function (e) {
          return !e || !s(e.isResolved) || e.isResolved()
        },
        resolve: function (e) {
          var n = _.defer();
          return n.resolve(e), n.promise()
        },
        fulfill: function (e) {
          var n = _.defer(),
            t = n.promise();
          return n.resolve(e), t.isFulfilled() ? t : t.then(null, function (e) {
            return e
          })
        },
        reject: function (e) {
          var n = _.defer();
          return n.reject(e), n.promise()
        },
        invoke: function (n, t) {
          var r, i = Math.max(arguments.length - 1, 0);
          if (i) {
            r = Array(i);
            for (var o = 0; o < i;) r[o++] = arguments[o]
          }
          try {
            return _.resolve(r ? n.apply(e, r) : n.call(e))
          } catch (s) {
            return _.reject(s)
          }
        },
        all: function (e) {
          var n = new h,
            t = c(e),
            r = t ? l(e) : f(e),
            i = r.length,
            o = t ? [] : {};
          if (!i) return n.resolve(o), n.promise();
          var s = i;
          return _._forEach(e, function (e, t) {
            o[r[t]] = e, --s || n.resolve(o)
          }, n.reject, n.notify, n, r), n.promise()
        },
        allResolved: function (e) {
          var n = new h,
            t = c(e),
            r = t ? l(e) : f(e),
            i = r.length,
            o = t ? [] : {};
          if (!i) return n.resolve(o), n.promise();
          var s = function () {
            --i || n.resolve(e)
          };
          return _._forEach(e, s, s, n.notify, n, r), n.promise()
        },
        allPatiently: function (e) {
          return _.allResolved(e).then(function () {
            var n, t, r, i, o = c(e),
              s = o ? l(e) : f(e),
              a = s.length,
              u = 0;
            if (!a) return o ? [] : {};
            for (; u < a;) r = s[u++], i = e[r], _.isRejected(i) ? (n || (n = o ? [] : {}), o ? n.push(i.valueOf()) : n[r] = i.valueOf()) : n || ((t || (t = o ? [] : {}))[r] = _.valueOf(i));
            if (n) throw n;
            return t
          })
        },
        any: function (e) {
          var n = new h,
            t = e.length;
          if (!t) return n.reject(Error()), n.promise();
          var r, i = 0;
          return _._forEach(e, n.resolve, function (e) {
            i || (r = e), ++i === t && n.reject(r)
          }, n.notify, n), n.promise()
        },
        anyResolved: function (e) {
          var n = new h,
            t = e.length;
          return t ? (_._forEach(e, n.resolve, n.reject, n.notify, n), n.promise()) : (n.reject(Error()), n.promise())
        },
        delay: function (e, n) {
          return _.resolve(e).delay(n)
        },
        timeout: function (e, n) {
          return _.resolve(e).timeout(n)
        },
        _forEach: function (e, n, t, r, i, o) {
          for (var s = o ? o.length : e.length, a = 0; a < s;) _.when(e[o ? o[a] : a], p(n, a), t, r, i), ++a
        },
        TimedOutError: d("TimedOut")
      };
      _.__nextTick__ = i;
      var w = !0;
      "object" == typeof r && "object" == typeof r.exports && (r.exports = _, w = !1), "object" == typeof modules && s(modules.define) && (modules.define("vow", function (e) {
        e(_)
      }), w = !1), "function" == typeof t && (t(function (e, n, t) {
        t.exports = _
      }), w = !1), w && (e.vow = _)
    }("undefined" != typeof window ? window : n), r.exports
  }(), t.utils = function (e) {
    function n(n) {
      return e[n]
    }
    var t = {
        exports: {}
      },
      r = t.exports,
      i = n("vow"),
      o = Object.prototype.hasOwnProperty;
    return r.nextTick = i.__nextTick__, i.__nextTick__ = void 0, r.isArray = Array.isArray ? Array.isArray : function (e) {
      return "[object Array]" === Object.prototype.call(e)
    }, r.extend = Object.assign ? Object.assign : function (e) {
      for (var n = 1, t = arguments.length; n < t; n++) {
        var r = arguments[n];
        if (null != r)
          for (var i in r) o.call(r, i) && (e[i] = r[i])
      }
      return e
    }, r.mergeSets = function (e, n) {
      n.forEach(function (n) {
        e.add(n)
      })
    }, r.convertSetToArray = function (e) {
      var n = [];
      return e.forEach(function (e) {
        n.push(e)
      }), n
    }, t.exports
  }({
    vow: t.vow
  });
  var s = function (e) {
      function n(n) {
        return e[n]
      }
      var t = {
          exports: {}
        },
        r = (t.exports, n("vow"));
      return t.exports = function (e, n) {
        var t = document.createElement("script"),
          i = r.defer();
        return window[n] = function (e) {
          delete window[n], t.parentElement.removeChild(t), i.resolve(e)
        }, t.src = e, document.head.appendChild(t), i.promise()
      }, t.exports
    }({
      vow: t.vow
    }),
    a = "__jsonp_" + (r || "ymaps" + Date.now()),
    u = function (e) {
      function n(n) {
        return e[n]
      }

      function t(e) {
        this._config = e, this._sandbox = null, this._definitionsByName = {}, this._definitionsByStorage = {}, this._definitionsByAlias = {}, this._queuedForFetching = {}, this._remoteLoadingAllowed = f.defer(), this._modulesMapLoaded = this._remoteLoadingAllowed.promise().then(this._config.fetchMap).spread(function (e, n) {
          this._processLoadedMap(e), n()
        }, this);
        var n = this;
        this.providePackage = function (e) {
          var t = n._findDefinition(this.name),
            r = Array.prototype.slice.call(arguments, 1),
            i = n._require(["system.mergeImports"]).spread(function (e) {
              return e.joinImports(t.name, {}, t.depends, r)
            });
          e.async(i)
        }
      }

      function r(e, n, t, r, i, o, s, a, u) {
        this.state = e, this.alias = null, this.name = n, this.storage = t, this.key = r, this.depends = i, this.dynamicDepends = a, this.declaration = o, this.context = s, this.exports = e === v.DEFINED ? u : void 0, this.resolvingPromise = void 0, this.fetchingDeferred = void 0
      }

      function i(e, n) {
        if (!e.dynamicDepends) return m;
        var t = [];
        for (var r in e.dynamicDepends)
          if (e.dynamicDepends.hasOwnProperty(r))
            for (var i = 0, o = n.length; i < o; i++) {
              var a = n[i];
              if (void 0 !== a) {
                var u = e.dynamicDepends[r](a);
                s(u) && t.push(u)
              }
            }
        return t
      }

      function o(e, n, t) {
        return p.call(e.dynamicDepends, n) ? e.dynamicDepends[n].call(null, t) : h
      }

      function s(e) {
        return "string" == typeof e || u(e)
      }

      function a(e) {
        return "string" == typeof e ? e : e.key + "@" + e.storage
      }

      function u(e) {
        return null != e && "object" == typeof e && "string" == typeof e.key && "string" == typeof e.storage
      }

      function c(e) {
        var n = d.isArray(e);
        return "object" == typeof e && !n && p.call(e, "modules") ? {
          modules: d.isArray(e.modules) ? e.modules : [e.modules],
          data: e.data
        } : n ? {
          modules: e
        } : {
          modules: [e]
        }
      }
      var l = {
          exports: {}
        },
        f = (l.exports, n("vow")),
        d = n("./utils"),
        p = Object.prototype.hasOwnProperty,
        h = {},
        m = Object.freeze([]),
        v = {
          MENTIONED: 1,
          QUEUED: 2,
          FETCHING: 3,
          DECLARED: 4,
          RESOLVING: 5,
          ERROR: 6,
          DEFINED: 7
        };
      return l.exports = t, t.prototype.allowRemoteLoading = function () {
        this._remoteLoadingAllowed.resolve()
      }, t.prototype.isDefined = function (e) {
        return Boolean(this._findDefinition(e))
      }, t.prototype.define = function (e, n, t, i) {
        var o, s, a, u;
        if ("object" == typeof e) {
          var c = e;
          e = c.name, s = c.storage, o = c.key, n = c.depends, t = c.declaration, i = c.context, a = c.dynamicDepends, u = c.exports
        } else 2 === arguments.length && (t = n, n = null);
        var l = new r(v.DECLARED, e, s, o, n, t, i, a, u);
        this._define(l)
      }, t.prototype.defineSync = function (e) {
        var n = new r(v.DEFINED, e.name, e.storage, e.key, null, null, null, null, e.module);
        this._define(n)
      }, t.prototype._define = function (e) {
        var n = this._definitionsByName[e.name];
        if (n) {
          if (n.state !== v.FETCHING || e.state !== v.DECLARED) {
            var t = new Error("ymaps.modules: redefinition of " + e.name);
            throw console.error(t), t
          }
          return n.state = v.DECLARED, n.declaration = e.declaration, void(n.context = e.context)
        }
        "function" == typeof e.depends && (e.depends = e.depends.call({
          name: e.name
        }, this._config.dependenciesContext)), e.depends = e.depends || m, this._definitionsByName[e.name] = e, this._saveDefinitionToStorage(e)
      }, t.prototype._resolve = function (e, n) {
        if (!e.dynamicDepends) {
          if (e.state === v.DEFINED) return f.resolve(e.exports);
          if (e.state === v.ERROR) return f.reject(e.exports)
        }
        e.state < v.RESOLVING && !e.resolvingPromise && (e.resolvingPromise = this._resolveCore(e, n).always(function (n) {
          return e.resolvingPromise = void 0, n
        }));
        var t = i(e, [n]);
        return f.all([e.resolvingPromise, this._require(t, n)]).then(function () {
          return e.state === v.DEFINED ? f.resolve(e.exports) : f.reject(e.exports)
        })
      }, t.prototype._resolveCore = function (e, n) {
        return this._fetchModule(e, n).then(function () {
          return e.state = v.RESOLVING, this._require(e.depends, n)
        }, this).then(function (n) {
          function t(n, t) {
            e.state === v.RESOLVING && (e.state = t ? v.ERROR : v.DEFINED, e.exports = t || n), i && i.resolve()
          }
          var r, i;
          t.async = function (n) {
            e.state === v.RESOLVING && (r = n.then(function (e) {
              t(e)
            }, function (e) {
              t(void 0, e)
            }))
          }, t.provide = t, t.provideAsync = t.async, t.dynamicDepends = e.dynamicDepends ? {
            getValue: function (n, t) {
              var r = o(e, n, t);
              return r === h ? f.reject(new Error("ymaps.modules: dynamic dependency `" + n + "` is not declared.")) : s(r) ? this._require([r], t) : f.resolve([r])
            }.bind(this),
            getValueSync: function (n, t) {
              var r = o(e, n, t);
              if (!s(r)) return r;
              var i = this._findDefinition(r);
              return i ? this._requireSingleSync(i, t) : void 0
            }.bind(this)
          } : null;
          var a = e.context || {
            name: e.name
          };
          try {
            e.declaration.apply(a, [t].concat(n))
          } catch (u) {
            return e.state = v.ERROR, void(e.exports = u)
          }
          return r ? r : e.state !== v.DEFINED && e.state !== v.ERROR ? (console.warn("ymaps.modules: asynchronious provide is deprecated and will be removed. Module `" + e.name + "`."), i = f.defer(), i.promise()) : void 0
        }, this)
      }, t.prototype.require = function (e, n, t, r) {
        var i = "object" == typeof e && !d.isArray(e),
          o = 1 === arguments.length;
        i && (n = e.successCallback, t = e.errorCallback, r = e.context, o = !n && !t), e = c(e);
        var s = this._require(e.modules, e.data);
        return o ? s : void s.spread(n, t, r)
      }, t.prototype.requireSync = function (e) {
        if (e = c(e), 1 !== e.modules.length) throw new Error("ymaps.modules: only one module can be required synchroniously.");
        var n = this._findDefinition(e.modules[0]);
        return n && this._requireSingleSync(n, e.data)
      }, t.prototype._requireSingleSync = function (e, n) {
        for (var t = i(e, [n]), r = 0, o = t.length; r < o; r++) {
          var s = this._findDefinition(t[r]);
          if (!s || !this._requireSingleSync(s, n)) return
        }
        return e.state === v.DEFINED ? e.exports : void 0
      }, t.prototype._require = function (e, n) {
        var t = e.map(function (e) {
          return this._requireSingle(e, n)
        }, this);
        return f.all(t)
      }, t.prototype._requireSingle = function (e, n) {
        var t = this._findDefinition(e);
        return t ? this._resolve(t, n) : this._modulesMapLoaded.then(function () {
          var t = this._findDefinition(e);
          return t ? this._resolve(t, n) : f.reject(new Error("ymaps.modules: module `" + a(e) + "` is not defined."))
        }, this)
      }, t.prototype._findDefinition = function (e) {
        return "string" == typeof e ? this._definitionsByName[e] : this._definitionsByStorage[e.storage] && this._definitionsByStorage[e.storage][e.key]
      }, t.prototype._saveDefinitionToStorage = function (e, n) {
        if (e.key && e.storage) {
          n = n || {
            key: e.key,
            storage: e.storage
          };
          for (var t = d.isArray(n.key) ? n.key : [n.key], r = 0, i = t.length; r < i; r++) this._definitionsByStorage[n.storage] = this._definitionsByStorage[n.storage] || {}, this._definitionsByStorage[n.storage][t[r]] = e
        }
      }, t.prototype._fetchModule = function (e, n) {
        return e.state >= v.DECLARED ? f.resolve() : (e.fetchingDeferred = e.fetchingDeferred || f.defer(), e.state === v.MENTIONED && (e.state = v.QUEUED, this._queuedForFetching[e.name] = {
          definition: e,
          dataList: []
        }, this._enqueueCombine()), e.state !== v.FETCHING && this._queuedForFetching[e.name].dataList.push(n), e.fetchingDeferred.promise())
      }, t.prototype._enqueueCombine = function () {
        this._combineEnqueued || (this._combineEnqueued = !0, this._modulesMapLoaded.then(function () {
          this._combineEnqueued = !1;
          var e = this._queuedForFetching;
          this._queuedForFetching = {};
          var n = new Set;
          for (var t in e)
            if (e.hasOwnProperty(t)) {
              var r = e[t],
                i = this._getAliasesToFetchFor(t, r.dataList);
              d.mergeSets(n, i)
            }
          for (var o = d.convertSetToArray(n), s = 0, a = o.length; s < a; s += this._config.combineBatchSize) this._fetchCombine(o.slice(s, s + this._config.combineBatchSize))
        }, this))
      }, t.prototype._fetchCombine = function (e) {
        this._config.fetchCombine(e).spread(function (e, n) {
          this._sandbox = this._sandbox || this._config.createSandbox();
          for (var t = 0, r = e.length; t < r; t++) {
            var i = e[t][0],
              o = this._definitionsByAlias[i];
            if (e[t][1].call(null, this._sandbox), o.state === v.DECLARED) o.fetchingDeferred && o.fetchingDeferred.resolve();
            else {
              o.state = v.ERROR;
              var s = new Error("[internal] ymaps.modules: module `" + o.name + "` was not defined after dynamic module loading");
              o.exports = s, o.fetchingDeferred && o.fetchingDeferred.reject(s)
            }
            o.fetchingDeferred = void 0
          }
          n()
        }, this)["catch"](function (n) {
          for (var t = 0, r = e.length; t < r; t++) {
            var i = this._definitionsByAlias[e[t]],
              n = new Error("[internal] ymaps.modules: dynamic module loading failed");
            i.state = v.ERROR, i.exports = n, i.fetchingDeferred && i.fetchingDeferred.reject(n), i.fetchingDeferred = void 0
          }
        }, this)
      }, t.prototype._getAliasesToFetchFor = function (e, n) {
        for (var t = [e], r = new Set; t.length;) {
          var o = t.shift(),
            s = this._findDefinition(o);
          if (!s) return void console.error("ymaps.modules: trying to fetch unknown module `" + a(e) + "`.");
          s.state <= v.QUEUED && (s.state = v.FETCHING, r.add(s.alias), Array.prototype.push.apply(t, s.depends)), Array.prototype.push.apply(t, i(s, n))
        }
        return r
      }, t.prototype._processLoadedMap = function (e) {
        function n(e) {
          if ("function" == typeof e) return e;
          for (var n = [], r = 0, i = e.length; r < i; r += 2) {
            var o = e.substr(r, 2);
            n.push(t[o])
          }
          return n
        }
        for (var t = {}, i = 0, o = e.length; i < o; i++) {
          var s = e[i][0],
            a = e[i][1];
          t[a] = s
        }
        for (var i = 0, o = e.length; i < o; i++) {
          var s = e[i][0],
            a = e[i][1],
            u = this._definitionsByName[s];
          if (!u) {
            var c = n(e[i][2]),
              l = e[i][3],
              f = e[i][4],
              d = e[i][5];
            u = new r(v.MENTIONED, s, f, l, c, null, null, d), this._define(u)
          }
          u.alias = a, this._definitionsByAlias[a] = u
        }
      }, l.exports
    }({
      vow: t.vow,
      "./utils": t.utils
    }),
    c = t.env.server.url + "/map.js?callback={CALLBACK}&mode=" + t.env.server.params.mode,
    l = e.server.url + "/combine.js?callback_prefix={CALLBACK_PREFIX}&mode=" + e.server.params.mode,
    f = e.server.url + "/" + e.server.path.replace(/\/$/, "") + "/images/";
  if (t.modules = new u({
      dependenciesContext: t,
      combineBatchSize: t.project.combineBatchSize,
      fetchMap: function () {
        var e = a + "_map",
          n = c.replace("{CALLBACK}", e);
        return s(n, e).then(function (e) {
          var r = t.performance.getResourceTimings(n);
          t.performance.saveResourceTimings("mapjs", r);
          var i = t.performance.startMeasure("@mapjs.eval");
          return [e, i.finish.bind(i)]
        })
      },
      fetchCombine: function (e) {
        t.performance.statistics.combine.total++, t.performance.statistics.combine.modules += e.length;
        var n = e.length < 100 ? "s" : e.length < 300 ? "m" : "l",
          r = e.join(""),
          i = a + "_combine",
          o = l.replace("{CALLBACK_PREFIX}", i) + "&load=" + r,
          u = i + "_" + r;
        return s(o, u).then(function (e) {
          var r = t.performance.getResourceTimings(o);
          t.performance.saveResourceTimings("combine_" + n, r), t.performance.statistics.combine.size += r.encodedBodySize;
          var i = t.performance.startMeasure("@combine_" + n + ".eval");
          return [e, i.finish.bind(i)]
        })
      },
      createSandbox: function () {
        var e = Object.create(t.modules);
        return e.importImages = function (e) {
          return {
            get: function (n) {
              return f + e[n].src
            }
          }
        }, t.utils.extend({}, t, {
          modules: e
        })
      }
    }), t.modules.define("system.supports.csp", [], function (e) {
      var n = t.env ? t.env.browser : null;
      e({
        isSupported: "undefined" != typeof Blob && "undefined" != typeof URL,
        isNonceSupported: n && n.name && n.version ? !(n.name.search("Safari") != -1 && parseInt(n.version) < 10) : null
      })
    }), t.modules.define("system.supports.css", [], function (e) {
      function n(e) {
        return "undefined" == typeof d[e] ? d[e] = r(e) : d[e]
      }

      function r(e) {
        return i(e) || i(h + s(e)) || i(p.cssPrefix + s(e))
      }

      function i(e) {
        return "undefined" != typeof o().style[e] ? e : null
      }

      function o() {
        return c || (c = document.createElement("div"))
      }

      function s(e) {
        return e ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
      }

      function a(e) {
        var t = n(e);
        return t && t != e && (t = "-" + h + "-" + e), t
      }

      function u(e) {
        return l[e] && n("transitionProperty") ? a(l[e]) : null
      }
      var c, l = {
          transform: "transform",
          opacity: "opacity",
          transitionTimingFunction: "transition-timing-function",
          userSelect: "user-select",
          height: "height"
        },
        f = {},
        d = {},
        p = t.env.browser,
        h = p.cssPrefix.toLowerCase();
      e({
        checkProperty: n,
        checkTransitionProperty: function (e) {
          return "undefined" == typeof f[e] ? f[e] = u(e) : f[e]
        },
        checkTransitionAvailability: u
      })
    }), t.modules.define("system.supports.graphics", [], function (e) {
      function n() {
        if (!window.WebGLRenderingContext) return !1;
        var e = t.env.browser,
          n = {
            "Samsung Internet": !0,
            AndroidBrowser: !0
          },
          r = "Webkit" == e.engine && +e.engineVersion < 537;
        return !r && !n[e.name]
      }

      function r() {
        if (!n()) return null;
        var e;
        try {
          var t = document.createElement("canvas"),
            r = t.getContext(e = "webgl", o);
          r || (r = t.getContext(e = "experimental-webgl", o), r || (e = null))
        } catch (i) {
          e = null
        }
        return e ? {
          contextName: e
        } : null
      }

      function i(e, n) {
        e.width = 226, e.height = 256, n.fillStyle = "#fff", n.fillRect(0, 0, 150, 150), n.globalCompositeOperation = "xor", n.fillStyle = "#f00", n.fillRect(10, 10, 100, 100), n.fillStyle = "#0f0", n.fillRect(50, 50, 100, 100);
        for (var t = n.getImageData(49, 49, 2, 2), r = [], i = 0; i < 16; i++) r.push(t.data[i]);
        return "0x0x0x0x0x0x0x0x0x0x0x0x0x255x0x255" == r.join("x")
      }
      var o = {
          failIfMajorPerformanceCaveat: !0,
          antialias: !1
        },
        s = {};
      e({
        hasSvg: function () {
          return "svg" in s || (s.svg = document.implementation && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")), s.svg
        },
        hasCanvas: function () {
          if (!("canvas" in s)) {
            var e = document.createElement("canvas"),
              n = "getContext" in e ? e.getContext("2d") : null;
            s.canvas = !!n && i(e, n)
          }
          return s.canvas
        },
        hasWebGl: function () {
          return "webgl" in s || (s.webgl = r()), s.webgl
        },
        redetect: function () {
          s = {}
        },
        getWebGlContextName: function () {
          return s.webgl && s.webgl.contextName
        }
      })
    }), t.modules.define("system.browser", ["system.supports.graphics"], function (e, n) {
      var r = t.env.browser;
      r.documentMode = document.documentMode, r.isIE = "MSIE" == r.name || "IEMobile" == r.name, r.isEdge = "Edge" == r.engine, r.isChromium = r.base && "chromium" == r.base.toLocaleLowerCase(), r.isSafari = "Safari" == r.name;
      var i = "Edge" == r.engine || "MSIE" == r.name && r.documentMode >= 10 && r.osVersion > 6.1 || "IEMobile" == r.name && r.engineVersion >= 6;
      i ? r.eventMapper = "pointer" : r.eventMapper = "touchMouse", r.androidBrokenBuild = "AndroidBrowser" == r.name && "534.30" == r.engineVersion;
      var o = window.devicePixelRatio || screen.deviceXDPI && screen.deviceXDPI / 96 || 1;
      !n.hasCanvas() || "MSIE" == r.name || "IEMobile" == r.name || "Android" == r.osFamily && r.engine && "gecko" == r.engine.toLocaleLowerCase() || o > 1 && o < 2 ? r.graphicsRenderEngine = "svg" : r.graphicsRenderEngine = "canvas", r.transformTransition = "Android" == r.osFamily || "iOS" == r.osFamily || "MSIE" == r.name && r.documentMode >= 10 || r.base && "chromium" == r.base.toLocaleLowerCase(), r.css3DTransform = "WebKit" == r.engine && !("Android" == r.osFamily && parseFloat(r.osVersion) < 3) || "Gecko" == r.engine && parseInt(r.engineVersion.split(".")[0]) >= 10, r.unsupported = "OperaMini" == r.name, e(r)
    }), t.modules.define("system.logger", [], function (e, n) {
      function r(e, n) {
        var r = "";
        return t.env.debug && (r += "(" + e + "): "), r += n
      }
      var i = "Yandex Maps JS API";
      e({
        assert: function (e, n) {
          e || t.env.debug && window.console && console.log(r(i, n))
        },
        log: function (e) {
          t.env.debug && window.console && console.log(r(i, e))
        },
        notice: function (e) {
          t.env.debug && window.console && console.info(r(i, e))
        },
        warning: function (e) {
          t.env.debug && window.console && console.warn(r(i, e))
        },
        error: function (e) {
          window.console && console.error(r(i, e))
        },
        exception: function (e, n) {
          throw new Error(r(e, n))
        }
      })
    }), t.modules.define("system.nextTick", [], function (e) {
      e(t.utils.nextTick)
    }), t.modules.define("system.mergeImports", [], function (e) {
      function n(e, n, t) {
        if (n) {
          var r = e;
          n = n.split(".");
          for (var i, o = 0, s = n.length - 1; o < s; o++) n[o] && (r = r[i = n[o]] || (r[i] = {}));
          return r[n[s]] = t, r[n[s]]
        }
        return t
      }

      function t(e, n) {
        return e[2] - n[2]
      }

      function r(e) {
        return 0 === e.indexOf("package.")
      }

      function i(e, t, r) {
        for (var i = [], o = {}, s = 0, a = t.length; s < a; ++s) {
          var u = r[s].__package;
          if (u)
            for (var c = 0; c < u.length; ++c) o[u[c][0]] || (n(e, u[c][0], u[c][1]), i.push([u[c][0], u[c][1]]), o[u[c][0]] = 1);
          else n(e, t[s], r[s]), o[t[s]] || (i.push([t[s], r[s]]), o[t[s]] = 1)
        }
        return e.__package = i, e
      }

      function o(e, o, s, a) {
        var u = [],
          c = r(e);
        if (c) return i(o, s, a);
        for (var l = 0, f = s.length; l < f; ++l) u.push([s[l], l, s[l].length]);
        u.sort(t);
        for (var l = 0, f = u.length; l < f; ++l) {
          var d = u[l][1],
            p = s[d];
          if (r(p))
            for (var h = a[d].__package, m = 0; m < h.length; ++m) n(o, h[m][0], h[m][1]);
          else n(o, p, a[d])
        }
        return o
      }
      e({
        isPackage: r,
        joinImports: o,
        createNS: n
      })
    }), t.modules.define("vow", [], function (e) {
      e(t.vow)
    }), t.ns.load = function (e, n, r, i) {
      return "function" == typeof e ? n ? t.ns.ready(["package.full"], e, n) : t.ns.ready(["package.full"], e) : ("string" == typeof e && (e = [e]), t.ns.ready.apply(this, arguments))
    }, function () {
      function e(e) {
        return function () {
          console.warn("{NS}.modules.{FN} is not a public API and will be removed from {NS}.modules.".replace(/\{NS\}/g, t.project.namespace).replace(/\{FN\}/g, e));
          var n = t.modules[e].apply(t.modules, arguments);
          return n === t.modules ? t.ns.modules : n
        }
      }
      t.ns.modules = {
        require: function () {
          return t.modules.require.apply(t.modules, arguments)
        },
        isDefined: function () {
          return t.modules.isDefined.apply(t.modules, arguments)
        },
        requireSync: function () {
          return t.modules.requireSync.apply(t.modules, arguments)
        },
        define: function (e, n, r, i) {
          return t.modules.define.apply(t.modules, arguments), t.ns.modules
        },
        defineSync: e("defineSync"),
        providePackage: e("providePackage"),
        getDefinition: e("getDefinition"),
        getState: e("getState"),
        setOptions: e("setOptions"),
        flush: e("flush"),
        nextTick: e("nextTick"),
        watchResolving: e("watchResolving"),
        __modules: t.modules
      }
    }(), t.modules.require(["system.supports.css", "system.supports.graphics", "system.supports.csp", "system.browser", "system.logger"]).spread(function (e, n, r, i, o) {
      t.env.server.params.csp && !r.isSupported && console.warn("CSP is not suported in this browser"), t.supports = {
        css: e,
        graphics: n,
        printPatchNeeded: !e.checkProperty("printColorAdjust"),
        csp: r
      }, t.logger = o, t.modules.allowRemoteLoading()
    })["catch"](function (e) {
      console.error(e)
    }), r) {
    for (var d = r.split("."), p = n; d.length > 1;) {
      var h = d.shift();
      p[h] = p[h] || {}, p = p[h]
    }
    p[d.shift()] = t.ns
  }! function (e) {
    function n() {
      y && (t.performance.saveMeasure("ymaps.readyDelay", t.performance.now() - t.performance.initTimings.responseEnd), y = !1);
      var e = t.performance.startMeasure("ymaps.ready"),
        n = {};
      arguments.length && (1 != arguments.length || "object" != typeof arguments[0] || arguments[0].length ? "function" != typeof arguments[0] ? (n.require = "string" == typeof arguments[0] ? [arguments[0]] : arguments[0], n.successCallback = arguments[1], n.errorCallback = arguments[2] && "function" == typeof arguments[2] ? arguments[2] : null, n.context = arguments[2] && "object" == typeof arguments[2] ? arguments[2] : arguments[3]) : (n.successCallback = arguments[0], n.errorCallback = arguments[1] && "function" == typeof arguments[1] ? arguments[1] : null, n.context = arguments[1] && "object" == typeof arguments[1] ? arguments[1] : arguments[2]) : n = arguments[0]);
      var i = n.require ? t.modules.require(n.require) : c.resolve();
      return c.all([r(), i, f, l, h]).spread(function (r, i) {
        return u(i) && r.joinImports("package.ymaps", t.ns, n.require, i), n.successCallback && t.utils.nextTick(function () {
          n.successCallback.call(n.context, t.ns)
        }), e.finish(), t.ns
      }).fail(function (e) {
        return n.errorCallback && t.utils.nextTick(function () {
          n.errorCallback.call(n.context, e)
        }), c.reject(e)
      })
    }

    function r() {
      return m || (m = t.modules.require(["system.mergeImports"]).spread(function (e) {
        return e
      })), m
    }

    function i() {
      var e = t.project.preload;
      if (!u(e)) return c.resolve();
      var n = t.modules.require(e);
      return c.all([r(), n]).spread(function (n, r) {
        u(r) && n.joinImports("package.ymaps", t.ns, e, r)
      })
    }

    function o() {
      var e = t.env.preload,
        n = e.load && e.load.length > 0 && e.load.split(","),
        i = n ? t.modules.require(n) : c.resolve();
      e.onError && i.fail(function (n) {
        t.utils.nextTick(function () {
          s(0, e.onError, n)
        })
      });
      var o = t.performance.startMeasure("ymaps.preload");
      return c.all([r(), i, l]).spread(function (r, i) {
        u(i) && r.joinImports("package.ymaps", t.ns, n, i), o.finish(), e.onLoad && t.utils.nextTick(function () {
          s(0, e.onLoad, t.ns)
        })
      })
    }

    function s(n, t, r) {
      var i = a(e, t);
      i ? i.method.call(i.context, r) : window.setTimeout(function () {
        s(++n, t, r)
      }, Math.pow(2, n))
    }

    function a(e, n) {
      var t = e;
      n = n.split(".");
      for (var r = 0, i = n.length - 1; r < i; r++)
        if (t = t[n[r]], !t) return;
      return {
        method: t[n[i]],
        context: t
      }
    }

    function u(e) {
      return e && e.length
    }
    var c = t.vow,
      l = i(),
      f = o(),
      d = "complete" == document.readyState,
      p = c.defer(),
      h = d ? c.resolve() : p.promise(),
      m = null,
      v = function () {
        d || (d = !0, p.resolve())
      };
    d || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", v, !1), window.addEventListener("load", v, !1)) : document.attachEvent && window.attachEvent("onload", v)), t.ns.ready = n;
    var y = !0
  }(this), t.performance.init({
    url: t.env.hosts.api.statCounter + "/counter",
    data: "/path=" + t.env.version.replace(/\W/g, "_") + "." + t.env.browser.platform,
    enable: "all" == t.env.counters || Math.random() < i && !t.env.server.params.debug,
    initUrl: document.currentScript && document.currentScript.src,
    useSendBeacon: !t.env.server.params.csp
  }), t.env.switchLinkOnEnterprise && (console.warn("You're using a wrong API host. For commercial API use enterprise.api-maps.yandex.ru"), t.env.hasValidApiKey || (t.env.apikey = void 0, console.warn("Invalid API key"))), o.finish()
})({
  "server": {
    "url": "https://api-maps.yandex.ru/2.1.65",
    "path": "build/release",
    "params": {
      "csp": null
    }
  },
  "preload": {
    "load": "package.full"
  },
  "enterprise": false,
  "key": undefined,
  "apikey": undefined,
  "browser": {
    "name": "Chrome",
    "version": "65.0.3325.181",
    "base": "Chromium",
    "engine": "WebKit",
    "engineVersion": "537.36",
    "osName": "Windows 10",
    "osFamily": "Windows",
    "osVersion": "10.0",
    "isMobile": false,
    "isTablet": false,
    "multiTouch": false,
    "platform": "Desktop",
    "cssPrefix": "Webkit"
  },
  "lang": "ru_RU",
  "languageCode": "ru",
  "countryCode": "RU",
  "hosts": {
    "api": {
      "main": "https://api-maps.yandex.ru/",
      "ua": "https://yandex.ru/legal/maps_termsofuse/?lang={{lang}}",
      "maps": "https://yandex.ru/maps/",
      "statCounter": "https://yandex.ru/clck/",
      "services": {
        "coverage": "https://api-maps.yandex.ru/services/coverage/",
        "geocode": "https://geocode-maps.yandex.ru/",
        "geoxml": "https://api-maps.yandex.ru/services/geoxml/",
        "inception": "https://api-maps.yandex.ru/services/inception/",
        "panoramaLocate": "https://api-maps.yandex.ru/services/panoramas/",
        "search": "https://api-maps.yandex.ru/services/search/",
        "suggest": "https://suggest-maps.yandex.ru/",
        "regions": "https://api-maps.yandex.ru/services/regions/",
        "route": "https://api-maps.yandex.ru/services/route/"
      }
    },
    "layers": {
      "map": "https://vec0%d.maps.yandex.net/tiles?l=map&%c&%l",
      "mapj": "https://vec0%d.maps.yandex.net/tiles?l=mapj&%c&%l",
      "sat": "https://sat0%d.maps.yandex.net/tiles?l=sat&%c&%l",
      "skl": "https://vec0%d.maps.yandex.net/tiles?l=skl&%c&%l",
      "stv": "https://0%d.srdr.maps.yandex.net/?l=stv&%c&v=%v&%l&action=render",
      "sta": "https://lrs.maps.yandex.net/tiles?l=sta&%c&tm=%v&%l",
      "staHotspot": "https://lrs.maps.yandex.net/tiles?l=stj&%c&tm=%v&%l",
      "staHotspotKey": "%c&l=stj&tm=%v"
    },
    "metro_RU": "https://metro.yandex.ru/",
    "metro_UA": "https://metro.yandex.ua/",
    "metro_BY": "https://metro.yandex.by/",
    "metro_US": "https://metro.yandex.com/",
    "traffic": "https://jgo.maps.yandex.net/",
    "trafficArchive": "https://jft.maps.yandex.net/",
    "panoramasTiles": "https://pano.maps.yandex.net/%s/%z.%x.%y"
  },
  "layers": {
    "map": {
      "version": "18.06.17-0",
      "scaled": true,
      "hotspotZoomRange": [13, 23]
    },
    "sat": {
      "version": "3.412.0"
    },
    "skl": {
      "version": "18.06.17-0",
      "scaled": true,
      "hotspotZoomRange": [13, 23]
    },
    "trf": {
      "version": "1529425461",
      "scaled": true
    },
    "sta": {
      "version": "0.28.1-0.1.3.2-0.2018.06.18.09.00.2.29.26-0.stable"
    },
    "stv": {
      "version": "4.20.0"
    }
  },
  "geolocation": {
    "longitude": 37.620393,
    "latitude": 55.75396,
    "isHighAccuracy": false,
    "span": {
      "longitude": 0.641442,
      "latitude": 0.466439
    }
  },
  "token": "da454a13d7d9e8d701abc8b6722c9538",
  "sign": (function (r) {
    function t(e) {
      if (n[e]) return n[e].exports;
      var o = n[e] = {
        exports: {},
        id: e,
        loaded: !1
      };
      return r[e].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }
    var n = {};
    return t.m = r, t.c = n, t.p = "", t(0)
  })([function (r, t, n) {
    "use strict";

    function e() {
      for (var r = ["1", "c", "a", "1", "8", "4", "f", "2", "d", "b", "7", "d", "8", "6", "4", "6", "9", "3", "5", "1", "c", "1", "2", "d", "1", "4", "0", "b", "4", "e", "c", "4", "2", "3", "9", "a", "7", "a", "5", "2"], t = [
          [SVGLength.SVG_LENGTHTYPE_MM + 8, XMLHttpRequest.DONE + 8],
          [SVGAngle.SVG_ANGLETYPE_DEG + 29, (function () {
            try {
              document.createElement("<")
            } catch (e) {
              return e.code
            }
          })() + 24],
          [DOMException.INVALID_ACCESS_ERR - 1, DOMException.SECURITY_ERR - 9]
        ], n = 0; n < t.length; n++) {
        var e = t[n][0],
          o = t[n][1],
          i = r[e];
        r[e] = r[o], r[o] = i
      }
      return r.join("")
    }
    var o, i = n(1),
      u = n(2);
    r.exports = function (r) {
      return o || (o = i(e())), i(u(r), o)
    }
  }, function (r, t) {
    "use strict";
    r.exports = function (r, t) {
      t = t || 0;
      for (var n = 0; n < r.length; n++) t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24), t ^= r.charCodeAt(n);
      return t >>> 0
    }
  }, function (r, t) {
    "use strict";
    r.exports = function (r) {
      r = r.replace(/^.*\/\//, "");
      var t = r.indexOf("?");
      if (-1 === t) return r;
      var n = t + 1,
        e = r.indexOf("#", n); - 1 === e && (e = r.length);
      var o = r.substring(n, e).split("&", 1e3);
      return r.substring(0, n) + o.sort().join("&") + r.substring(e)
    }
  }]),
  "distribution": {},
  "version": "2.1.65",
  "majorVersion": "2.1",
  "cssPrefix": "ymaps-2-1-65-",
  "coordinatesOrder": "latlong"
})
