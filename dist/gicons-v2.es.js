var $ = function() {
  var e = this, t = e.$createElement, n = e._self._c || t;
  return n("svg", {
    staticClass: "g-icon",
    attrs: {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [n("line", {
    attrs: {
      x1: "20.25",
      y1: "17.75",
      x2: "3.75",
      y2: "17.75",
      stroke: "#181818",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }
  }), n("line", {
    attrs: {
      x1: "20.25",
      y1: "11.75",
      x2: "3.75",
      y2: "11.75",
      stroke: "#181818",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }
  }), n("line", {
    attrs: {
      x1: "20.25",
      y1: "5.75",
      x2: "3.75",
      y2: "5.75",
      stroke: "#181818",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }
  })]);
}, w = [];
function a(e, t, n, p, i, l, c, h) {
  var r = typeof e == "function" ? e.options : e;
  t && (r.render = t, r.staticRenderFns = n, r._compiled = !0), p && (r.functional = !0), l && (r._scopeId = "data-v-" + l);
  var s;
  if (c ? (s = function(o) {
    o = o || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), i && i.call(this, o), o && o._registeredComponents && o._registeredComponents.add(c);
  }, r._ssrRegister = s) : i && (s = h ? function() {
    i.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), s)
    if (r.functional) {
      r._injectStyles = s;
      var m = r.render;
      r.render = function(g, u) {
        return s.call(u), m(g, u);
      };
    } else {
      var _ = r.beforeCreate;
      r.beforeCreate = _ ? [].concat(_, s) : [s];
    }
  return {
    exports: e,
    options: r
  };
}
const y = {
  name: "Burger"
}, f = {};
var k = /* @__PURE__ */ a(
  y,
  $,
  w,
  !1,
  C,
  null,
  null,
  null
);
function C(e) {
  for (let t in f)
    this[t] = f[t];
}
const x = /* @__PURE__ */ function() {
  return k.exports;
}();
var S = function() {
  var e = this, t = e.$createElement, n = e._self._c || t;
  return n("svg", {
    staticClass: "g-icon",
    attrs: {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [n("g", {
    attrs: {
      "clip-path": "url(#clip0_15957_40211)"
    }
  }, [n("path", {
    attrs: {
      d: "M5.01975 14.3682L9.87143 18.9875C9.87696 18.9929 9.88368 18.997 9.89107 18.9994C9.89845 19.0018 9.90629 19.0024 9.91397 19.0012C9.92164 19.0001 9.92896 18.9972 9.93531 18.9927C9.94165 18.9883 9.94688 18.9824 9.95056 18.9756L20.1898 6.38099",
      stroke: "black",
      "stroke-width": "1.5",
      "stroke-miterlimit": "10",
      "stroke-linecap": "round"
    }
  })]), n("defs", [n("clipPath", {
    attrs: {
      id: "clip0_15957_40211"
    }
  }, [n("rect", {
    attrs: {
      width: "24",
      height: "24",
      fill: "white"
    }
  })])])]);
}, R = [];
const b = {}, d = {};
var B = /* @__PURE__ */ a(
  b,
  S,
  R,
  !1,
  M,
  null,
  null,
  null
);
function M(e) {
  for (let t in d)
    this[t] = d[t];
}
const T = /* @__PURE__ */ function() {
  return B.exports;
}(), z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Burger: x,
  Check: T
}, Symbol.toStringTag, { value: "Module" }));
var E = function() {
  var e = this, t = e.$createElement, n = e._self._c || t;
  return n(e.icons[e.name], e._b({
    tag: "component",
    class: [e.size, {
      hover: e.hover,
      active: e.active,
      selected: e.selected
    }]
  }, "component", e.$attrs, !1));
}, F = [];
const G = {
  name: "GIcon",
  props: {
    name: { type: String, required: !0 },
    size: { type: String, default: "md" },
    hover: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    selected: { type: Boolean, default: !1 }
  },
  computed: {
    icons() {
      return z;
    }
  }
}, v = {};
var I = /* @__PURE__ */ a(
  G,
  E,
  F,
  !1,
  O,
  null,
  null,
  null
);
function O(e) {
  for (let t in v)
    this[t] = v[t];
}
const j = /* @__PURE__ */ function() {
  return I.exports;
}(), L = {
  install(e) {
    e.component("GIcon", j);
  }
};
export {
  j as GIcon,
  L as default
};
