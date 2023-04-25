import { ref as _, onMounted as A, defineComponent as I, inject as K, openBlock as M, createElementBlock as R, createCommentVNode as P, createElementVNode as $, provide as T, computed as F, normalizeClass as H, unref as Y, normalizeStyle as N, withModifiers as U, renderSlot as Z, withDirectives as q, Fragment as G, renderList as J, vShow as Q, createVNode as W } from "vue";
const L = {
  zoomable: {
    type: Boolean,
    default: !0
  },
  rotatable: {
    type: Boolean,
    default: !1
  },
  boundary: {
    // 边界
    type: Boolean
  },
  disabled: Boolean,
  width: {
    type: [Number, String],
    default: 100
  },
  height: {
    type: [Number, String],
    default: 100
  },
  left: {
    type: [Number, String],
    default: 0
  },
  top: {
    type: [Number, String],
    default: 0
  },
  color: {
    type: String,
    default: "#3a7afe"
  }
}, O = Symbol("DragContextKey"), x = [
  { side: "top", cursor: "n-resize" },
  { side: "bottom", cursor: "n-resize" },
  { side: "left", cursor: "e-resize" },
  { side: "right", cursor: "e-resize" },
  { side: "top-left", cursor: "se-resize" },
  { side: "top-right", cursor: "sw-resize" },
  { side: "bottom-left", cursor: "sw-resize" },
  { side: "bottom-right", cursor: "se-resize" }
];
function V(e) {
  const [t, n] = e.side.split("-"), i = { [t]: "0%", cursor: e.cursor };
  if (n)
    i[n] = "0%";
  else {
    const r = ["top", "bottom"].includes(t) ? "left" : "top";
    i[r] = "50%";
  }
  return i;
}
const D = (e = 0) => parseInt(e + "") + "px";
let ee = 1e3;
function te(e, t, n) {
  const i = _(), r = _(!1), c = _(!1), f = _({
    width: t.width,
    height: t.height,
    left: t.left,
    top: t.top
  });
  function m(l) {
    if (t.disabled)
      return;
    r.value = !0, c.value = !0;
    const s = e.value, a = l.clientX, g = l.clientY, h = s.getBoundingClientRect();
    s.style.zIndex = j();
    let o = 0, d = 0, y = 0, w = 0;
    if (t.boundary) {
      const u = (s.parentElement || document.body).getBoundingClientRect();
      o = u.left, d = u.left + u.width - h.width, y = u.top, w = u.top + u.height - h.height;
    }
    const z = a - h.left, E = g - h.top;
    B((b) => {
      let u = b.clientX - z, v = b.clientY - E;
      t.boundary && (u = u < o ? o : u, u = u > d ? d : u, v = v < y ? y : v, v = v > w ? w : v), f.value.left = u, f.value.top = v, n && n("move", f.value);
    }, (b) => {
      r.value = !1, document.addEventListener("click", p, { once: !0 });
    });
  }
  const p = () => {
    c.value = !1;
  };
  return A(() => {
    e.value && e.value.addEventListener("mousedown", m);
  }), {
    isMousedown: r,
    selected: c,
    dragRef: i,
    dragData: f
  };
}
function j() {
  return ++ee + "";
}
function B(e, t) {
  const n = (i) => {
    t && t(i), document.removeEventListener("mousemove", e), document.removeEventListener("mouseup", n);
  };
  document.addEventListener("mousemove", e), document.addEventListener("mouseup", n);
}
const oe = Object.keys(L).reduce((e, t) => (e[t] = L[t].default, e), {});
function ne(e) {
  for (let t = 0; t < x.length; t++) {
    const n = document.createElement("div");
    n.className = "es-drager-dot";
    const i = V(x[t]);
    Object.keys(i).forEach((r) => {
      n.style[r] = i[r];
    }), n.setAttribute("data-side", x[t].side), e.appendChild(n), n.addEventListener("mousedown", (r) => {
      se(x[t], r, e);
    });
  }
}
function se(e, t, n) {
  t.stopPropagation(), t.preventDefault();
  const i = t.clientX, r = t.clientY, c = n.getBoundingClientRect();
  B((m) => {
    const p = m.clientX - i, l = m.clientY - r, [s, a] = e.side.split("-"), g = s === "top", h = [s, a].includes("left");
    let o = c.width + (h ? -p : p), d = c.height + (g ? -l : l), y = c.left + (h ? p : 0), w = c.top + (g ? l : 0);
    a || (["top", "bottom"].includes(s) ? o = c.width : d = c.height), o < 0 && (o = -o, y -= o), d < 0 && (d = -d, w -= d), n.style.width = `${o}px`, n.style.height = `${d}px`, n.style.left = `${y}px`, n.style.top = `${w}px`;
  });
}
const fe = {
  mounted(e, t) {
    const n = { ...oe, ...t.value || {} };
    e.classList.add("es-drager"), e.onmousedown = (i) => {
      const r = i.clientX, c = i.clientY, f = e.getBoundingClientRect();
      e.style.zIndex = j();
      let m = 0, p = 0, l = 0, s = 0;
      if (n.boundary) {
        const o = (e.parentElement || document.body).getBoundingClientRect();
        m = o.left, p = o.left + o.width - f.width, l = o.top, s = o.top + o.height - f.height;
      }
      const a = r - f.left, g = c - f.top;
      B((h) => {
        let o = h.clientX - a, d = h.clientY - g;
        n.boundary && (o = o < m ? m : o, o = o > p ? p : o, d = d < l ? l : d, d = d > s ? s : d), e.style.left = o + "px", e.style.top = d + "px";
      });
    }, n.zoomable && ne(e);
  },
  unmounted(e) {
    e.onmousedown = null;
  }
}, ie = /* @__PURE__ */ $("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ $("path", {
    fill: "currentColor",
    d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
  })
], -1), le = [
  ie
], re = /* @__PURE__ */ I({
  __name: "rotate",
  props: {
    visible: Boolean
  },
  emits: ["rotate"],
  setup(e, { emit: t }) {
    const { dragRef: n } = K(O) || {}, i = _(null), r = _(0);
    function c(f) {
      if (f.stopPropagation(), f.preventDefault(), !n || !n.value)
        return console.error("[es-drager] rotate need dragRef");
      const m = n.value, p = m.getBoundingClientRect(), l = p.left + p.width / 2, s = p.top + p.height / 2;
      B((a) => {
        const g = l - a.clientX, h = s - a.clientY, o = Math.atan2(h, g);
        r.value = o * 180 / Math.PI - 90, t("rotate", r.value), m.style.transform = `rotate(${r.value}deg)`;
      });
    }
    return (f, m) => e.visible ? (M(), R("div", {
      key: 0,
      ref_key: "rotateRef",
      ref: i,
      class: "es-drager-rotate",
      onMousedown: c
    }, le, 544)) : P("", !0);
  }
});
const de = { key: 0 }, ce = ["data-side", "onMousedown"], ae = /* @__PURE__ */ I({
  __name: "drager",
  props: L,
  emits: ["move", "resize"],
  setup(e, { emit: t }) {
    const n = e, i = _(null), { selected: r, dragData: c, isMousedown: f } = te(i, n, t);
    T(O, {
      dragRef: i
    });
    const m = F(() => {
      const { width: l, height: s, left: a, top: g } = c.value;
      return {
        width: D(l),
        height: D(s),
        left: D(a),
        top: D(g),
        "--es-drager-color": n.color
      };
    });
    function p(l, s) {
      s.stopPropagation(), s.preventDefault();
      const a = s.clientX, g = s.clientY, o = i.value.getBoundingClientRect();
      B((y) => {
        const w = y.clientX - a, z = y.clientY - g, [E, C] = l.side.split("-"), b = E === "top", u = [E, C].includes("left");
        let v = o.width + (u ? -w : w), X = o.height + (b ? -z : z), S = o.left + (u ? w : 0), k = o.top + (b ? z : 0);
        C || (["top", "bottom"].includes(E) ? v = o.width : X = o.height), v < 0 && (v = -v, S -= v), X < 0 && (X = -X, k -= X), c.value = { left: S, top: k, width: v, height: X }, t("resize", c.value);
      });
    }
    return (l, s) => (M(), R("div", {
      ref_key: "dragRef",
      ref: i,
      class: H(["es-drager", { disabled: l.disabled, dragging: Y(f) }]),
      style: N(Y(m)),
      onClick: s[0] || (s[0] = U(() => {
      }, ["stop"]))
    }, [
      Z(l.$slots, "default"),
      !l.disabled && l.zoomable ? q((M(), R("div", de, [
        (M(!0), R(G, null, J(Y(x), (a) => (M(), R("div", {
          key: a.side,
          class: "es-drager-dot",
          "data-side": a.side,
          style: N(Y(V)(a)),
          onMousedown: (g) => p(a, g)
        }, null, 44, ce))), 128))
      ], 512)), [
        [Q, Y(r)]
      ]) : P("", !0),
      W(re, {
        visible: !l.disabled && Y(r)
      }, null, 8, ["visible"])
    ], 6));
  }
});
const pe = (e) => {
  e.component("es-drager", ae);
};
export {
  O as DragContextKey,
  fe as Drager,
  L as DragerProps,
  ae as default,
  x as dotList,
  V as getDotStyle,
  pe as install,
  D as withUnit
};
