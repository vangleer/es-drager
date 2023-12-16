import { computed as S, ref as D, onMounted as ve, watch as q, onBeforeUnmount as Ce, nextTick as Re, defineComponent as pe, openBlock as P, createElementBlock as Q, renderSlot as F, createElementVNode as U, createBlock as re, resolveDynamicComponent as ze, normalizeClass as De, unref as T, normalizeStyle as ce, withModifiers as Te, withCtx as ue, Fragment as _e, renderList as Ne, normalizeProps as Se, guardReactiveProps as Pe, createCommentVNode as de } from "vue";
const Ie = {
  tag: {
    type: [String, Object],
    default: "div"
  },
  resizable: {
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
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  },
  zIndex: {
    type: Number,
    default: 0
  },
  angle: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: "#3a7afe"
  },
  minWidth: {
    type: Number,
    default: -1 / 0
  },
  minHeight: {
    type: Number,
    default: -1 / 0
  },
  maxWidth: {
    type: Number,
    default: 0
  },
  maxHeight: {
    type: Number,
    default: 0
  },
  aspectRatio: {
    // 缩放比例
    type: Number
  },
  selected: Boolean,
  snapToGrid: Boolean,
  gridX: {
    type: Number,
    default: 50
  },
  gridY: {
    type: Number,
    default: 50
  },
  scaleRatio: {
    type: Number,
    default: 1
  },
  disabledKeyEvent: Boolean,
  border: {
    type: Boolean,
    default: !0
    // 兼容默认
  },
  resizeList: {
    type: Array
    // 要显示的缩放handle列表，默认显示全部
  },
  equalProportion: {
    // 是否等比例缩放
    type: Boolean
  },
  checkCollision: {
    // 是否开启碰撞检查
    type: Boolean
  },
  snap: Boolean,
  // 是否开启吸附
  snapThreshold: {
    // 吸附阈值，默认10px
    type: Number,
    default: 10
  },
  markline: [Boolean, Function]
  // 辅助线
};
function H(o, n) {
  const e = (t) => {
    n && n(t), document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", e), document.removeEventListener("mouseleave", e), document.removeEventListener("touchmove", o), document.removeEventListener("touchend", e);
  };
  document.addEventListener("mousemove", o), document.addEventListener("mouseup", e), document.addEventListener("mouseleave", e), document.addEventListener("touchmove", o), document.addEventListener("touchend", e);
}
function I(o) {
  let n = 0, e = 0;
  if ($e(o)) {
    const t = o.targetTouches[0];
    n = t.pageX, e = t.pageY;
  } else
    n = o.clientX, e = o.clientY;
  return { clientX: n, clientY: e };
}
function $e(o) {
  const n = Object.prototype.toString.call(o);
  return n.substring(8, n.length - 1) === "TouchEvent";
}
const K = (o = 0) => parseInt(o + "") + "px", J = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, Z = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ve = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Ge = {
  0: 0,
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 4,
  6: 4,
  7: 5,
  8: 6,
  9: 6,
  10: 7,
  11: 8
}, Ke = (o, n) => {
  const e = Ge[Math.floor(o / 30)], i = (Ve[n] + e) % 8;
  return Z[i];
}, he = (o = 0, n) => {
  let e = [];
  for (let t = 0; t < Z.length; t++) {
    const i = Z[t], [f, s] = J[i].split("-"), c = Ke(o, i), u = {
      [f]: "0%",
      cursor: c + "-resize",
      side: J[i]
    };
    if (s)
      u[s] = "0%";
    else {
      const g = ["top", "bottom"].includes(f) ? "left" : "top";
      u[g] = "50%";
    }
    n ? n.includes(J[i]) && e.push(u) : e.push(u);
  }
  return e;
}, W = (o) => o * Math.PI / 180, qe = (o, n) => Math.sqrt(o * o + n * n), k = (o) => Math.cos(W(o)), x = (o) => Math.sin(W(o)), Fe = (o, n, e, t, i, f, s) => {
  let { width: c, height: u, centerX: g, centerY: p, rotateAngle: a } = n;
  const L = c < 0 ? -1 : 1, d = u < 0 ? -1 : 1;
  switch (c = Math.abs(c), u = Math.abs(u), o) {
    case "right": {
      const l = N(c, e, f);
      c = l.width, e = l.deltaW, i ? (t = e / i, u = c / i, g += e / 2 * k(a) - t / 2 * x(a), p += e / 2 * x(a) + t / 2 * k(a)) : (g += e / 2 * k(a), p += e / 2 * x(a));
      break;
    }
    case "top-right": {
      t = -t;
      const l = N(c, e, f);
      c = l.width, e = l.deltaW;
      const h = _(u, t, s);
      u = h.height, t = h.deltaH, i && (e = t * i, c = u * i), g += e / 2 * k(a) + t / 2 * x(a), p += e / 2 * x(a) - t / 2 * k(a);
      break;
    }
    case "bottom-right": {
      const l = N(c, e, f);
      c = l.width, e = l.deltaW;
      const h = _(u, t, s);
      u = h.height, t = h.deltaH, i && (e = t * i, c = u * i), g += e / 2 * k(a) - t / 2 * x(a), p += e / 2 * x(a) + t / 2 * k(a);
      break;
    }
    case "bottom": {
      const l = _(u, t, s);
      u = l.height, t = l.deltaH, i ? (e = t * i, c = u * i, g += e / 2 * k(a) - t / 2 * x(a), p += e / 2 * x(a) + t / 2 * k(a)) : (g -= t / 2 * x(a), p += t / 2 * k(a));
      break;
    }
    case "bottom-left": {
      e = -e;
      const l = N(c, e, f);
      c = l.width, e = l.deltaW;
      const h = _(u, t, s);
      u = h.height, t = h.deltaH, i && (u = c / i, t = e / i), g -= e / 2 * k(a) + t / 2 * x(a), p -= e / 2 * x(a) - t / 2 * k(a);
      break;
    }
    case "left": {
      e = -e;
      const l = N(c, e, f);
      c = l.width, e = l.deltaW, i ? (u = c / i, t = e / i, g -= e / 2 * k(a) + t / 2 * x(a), p -= e / 2 * x(a) - t / 2 * k(a)) : (g -= e / 2 * k(a), p -= e / 2 * x(a));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const l = N(c, e, f);
      c = l.width, e = l.deltaW;
      const h = _(u, t, s);
      u = h.height, t = h.deltaH, i && (c = u * i, e = t * i), g -= e / 2 * k(a) - t / 2 * x(a), p -= e / 2 * x(a) + t / 2 * k(a);
      break;
    }
    case "top": {
      t = -t;
      const l = _(u, t, s);
      u = l.height, t = l.deltaH, i ? (c = u * i, e = t * i, g += e / 2 * k(a) + t / 2 * x(a), p += e / 2 * x(a) - t / 2 * k(a)) : (g += t / 2 * x(a), p -= t / 2 * k(a));
      break;
    }
  }
  return {
    position: {
      centerX: g,
      centerY: p
    },
    size: {
      width: c * L,
      height: u * d
    }
  };
}, _ = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { height: o, deltaH: n };
}, N = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { width: o, deltaW: n };
}, Ue = ({
  centerX: o,
  centerY: n,
  width: e,
  height: t,
  angle: i
}) => ({
  top: n - t / 2,
  left: o - e / 2,
  width: e,
  height: t,
  angle: i
}), Oe = (o, n, e) => {
  const { width: t, height: i } = o;
  return {
    width: Math.abs(t),
    height: Math.abs(i),
    left: n - Math.abs(t) / 2,
    top: e - Math.abs(i) / 2
  };
};
function O(o, n) {
  const e = Math.abs(o) % n, t = o > 0 ? n : -n;
  let i = 0;
  return e > n / 2 ? i = t * Math.ceil(Math.abs(o) / n) : i = t * Math.floor(Math.abs(o) / n), i;
}
function je(o, n) {
  if (!o || !n)
    return !1;
  const e = o.getBoundingClientRect(), t = n.getBoundingClientRect();
  return e.left < t.left + t.width && e.left + e.width > t.left && e.top < t.top + t.height && e.top + e.height > t.top;
}
const fe = (o) => typeof o == "function";
function Je(o, n) {
  let e = null, t = null;
  const i = S(() => o.value.offsetParent || document.body), f = S(() => i.value.getBoundingClientRect()), s = D({ x: [], y: [] }), c = () => {
    n.markline && !fe(n.markline) && (e || (e = document.querySelector(".es-drager-markline-x") || ge("x", i.value, n.color)), t || (t = document.querySelector(".es-drager-markline-y") || ge("y", i.value, n.color)));
  }, u = (d = {}) => {
    if (n.markline) {
      if (fe(n.markline))
        return n.markline(d);
      d.left === null ? e.style.display = "none" : (e.style.left = d.left + "px", e.style.backgroundColor = n.color, e.style.display = "block"), d.top === null ? t.style.display = "none" : (t.style.top = d.top + "px", t.style.backgroundColor = n.color, t.style.display = "block");
    }
  }, g = () => {
    const d = o.value.getBoundingClientRect(), l = document.querySelectorAll(".es-drager"), h = [];
    for (let y = 0; y < l.length; y++) {
      const m = l[y];
      m !== o.value && h.push(m.getBoundingClientRect());
    }
    s.value = Qe(h, d);
  }, p = () => {
    const d = {
      top: null,
      left: null,
      diffX: 0,
      diffY: 0
    }, l = o.value.getBoundingClientRect();
    for (let h = 0; h < s.value.y.length; h++) {
      const { top: y, showTop: m } = s.value.y[h];
      if (Math.abs(y - l.top) < n.snapThreshold) {
        d.diffY = y - l.top, d.top = m - f.value.top;
        break;
      }
    }
    for (let h = 0; h < s.value.x.length; h++) {
      const { left: y, showLeft: m } = s.value.x[h];
      if (Math.abs(y - l.left) < n.snapThreshold) {
        d.diffX = y - l.left, d.left = m - f.value.left;
        break;
      }
    }
    return u(d), d;
  }, a = () => {
    u({ left: null, top: null });
  }, L = (d) => {
    if (!(!n.snap && !n.markline))
      switch (d) {
        case "drag-start":
          g();
          break;
        case "drag":
          return p();
        case "drag-end":
          a();
          break;
      }
  };
  return ve(() => {
    c();
  }), {
    marklineEmit: L
  };
}
function ge(o = "x", n, e = "") {
  const t = document.createElement("div");
  return t.classList.add(`es-drager-markline-${o}`), t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.style.zIndex = "9999", t.style.backgroundColor = e, t.style.display = "none", o === "x" ? (t.style.height = "100%", t.style.width = "1px") : (t.style.height = "1px", t.style.width = "100%"), n.appendChild(t), t;
}
function Qe(o, n) {
  const e = { x: [], y: [] }, { width: t = 0, height: i = 0 } = n;
  return o.forEach((f) => {
    const {
      top: s,
      left: c,
      width: u,
      height: g
    } = f;
    e.y.push({ showTop: s, top: s }), e.y.push({ showTop: s, top: s - i }), e.y.push({
      showTop: s + g / 2,
      top: s + g / 2 - i / 2
    }), e.y.push({ showTop: s + g, top: s + g }), e.y.push({ showTop: s + g, top: s + g - i }), e.x.push({ showLeft: c, left: c }), e.x.push({ showLeft: c + u, left: c + u }), e.x.push({
      showLeft: c + u / 2,
      left: c + u / 2 - t / 2
    }), e.x.push({ showLeft: c + u, left: c + u - t }), e.x.push({ showLeft: c, left: c - t });
  }), e;
}
function Ze(o, n, e, {
  getBoundary: t,
  fixBoundary: i,
  checkDragerCollision: f,
  emit: s
}) {
  let c = 0, u = 0;
  const g = (a) => {
    let { left: L, top: d } = n.value;
    if (c || (c = L), u || (u = d), ["ArrowRight", "ArrowLeft"].includes(a.key)) {
      const l = a.key === "ArrowRight";
      let h = l ? 1 : -1;
      o.snapToGrid && (h = l ? o.gridX : -o.gridX), L = L + h;
    } else if (["ArrowUp", "ArrowDown"].includes(a.key)) {
      const l = a.key === "ArrowDown";
      let h = l ? 1 : -1;
      o.snapToGrid && (h = l ? o.gridY : -o.gridY), d = d + h;
    }
    if (o.boundary) {
      const [l, h, y, m] = t();
      [L, d] = i(L, d, l, h, y, m);
    }
    n.value.left = L, n.value.top = d;
  }, p = (a) => {
    ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(a.key) && o.checkCollision && f() && (n.value.left = c, n.value.top = u), c = 0, u = 0;
  };
  q(e, (a) => {
    o.disabledKeyEvent || (a ? (document.addEventListener("keydown", g), document.addEventListener("keyup", p)) : (document.removeEventListener("keydown", g), document.removeEventListener("keyup", p)));
  }), Ce(() => {
    document.removeEventListener("keydown", g), document.removeEventListener("keyup", p);
  });
}
function He(o, n, e) {
  const t = D(!1), i = D(!1), f = D({
    width: n.width,
    height: n.height,
    left: n.left,
    top: n.top,
    angle: n.angle
  }), { marklineEmit: s } = Je(o, n), c = /* @__PURE__ */ new Set();
  function u(d) {
    if (c.add(d.button), n.disabled)
      return;
    t.value = !0, i.value = !0;
    let { clientX: l, clientY: h } = I(d);
    const { left: y, top: m } = f.value;
    let r = 0, v = 0, w = 0, b = 0;
    n.boundary && ([r, v, w, b] = g()), s("drag-start"), e && e("drag-start", f.value), H((M) => {
      if (c.size > 1)
        return;
      const { clientX: X, clientY: Y } = I(M);
      let E = (X - l) / n.scaleRatio + y, B = (Y - h) / n.scaleRatio + m;
      if (n.snapToGrid) {
        let { left: C, top: $ } = f.value;
        const R = E - C, j = B - $;
        E = C + O(R, n.gridX), B = $ + O(j, n.gridY);
      }
      n.boundary && ([E, B] = p(E, B, r, v, w, b)), f.value.left = E, f.value.top = B, e && e("drag", f.value), Re(() => {
        const C = s("drag");
        n.snap && (C.diffX && (f.value.left += C.diffX), C.diffY && (f.value.top += C.diffY));
      });
    }, (M) => {
      n.checkCollision && a() && (f.value.top = m, f.value.left = y), c.clear(), t.value = !1, document.addEventListener("click", L, { once: !0 }), s("drag-end"), e && e("drag-end", f.value);
    });
  }
  const g = () => {
    let d = 0, l = 0;
    const { left: h, top: y, height: m, width: r, angle: v } = f.value, b = (o.value.offsetParent || document.body).getBoundingClientRect();
    if (v && n.scaleRatio === 1) {
      const X = o.value.getBoundingClientRect();
      d = Math.abs(X.left - (h + b.left)), l = Math.abs(X.top - (y + b.top));
    }
    const A = b.width / n.scaleRatio - r, M = b.height / n.scaleRatio - m;
    return [d, A - d, l, M - l, b.width / n.scaleRatio, b.height / n.scaleRatio];
  }, p = (d, l, h, y, m, r) => (d = d < h ? h : d, d = d > y ? y : d, l = l < m ? m : l, l = l > r ? r : l, [d, l]), a = () => {
    const d = o.value.offsetParent || document.body, l = Array.from(d.children).filter((h) => h !== o.value && h.classList.contains("es-drager"));
    for (let h = 0; h < l.length; h++) {
      const y = l[h];
      if (je(o.value, y))
        return !0;
    }
  }, L = () => {
    i.value = !1;
  };
  return Ze(
    n,
    f,
    i,
    {
      getBoundary: g,
      fixBoundary: p,
      checkDragerCollision: a,
      emit: e
    }
  ), ve(() => {
    if (o.value) {
      if (!f.value.width && !f.value.height) {
        const { width: d, height: l } = o.value.getBoundingClientRect();
        f.value = {
          ...f.value,
          width: d || 100,
          height: l || 100
        };
      }
      o.value.addEventListener("mousedown", u), o.value.addEventListener("touchstart", u, {
        passive: !0
      });
    }
  }), {
    isMousedown: t,
    selected: i,
    dragData: f,
    getBoundary: g,
    checkDragerCollision: a
  };
}
const We = /* @__PURE__ */ U("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ U("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ U("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), et = /* @__PURE__ */ pe({
  __name: "rotate",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    element: {
      type: Object
    }
  },
  emits: [
    "update:modelValue",
    "rotate",
    "rotate-start",
    "rotate-end"
  ],
  setup(o, { emit: n }) {
    const e = o, t = D(null), i = S({
      get: () => e.modelValue,
      set: (s) => {
        n("update:modelValue", s);
      }
    });
    function f(s) {
      if (!e.element)
        return console.warn(
          "[es-drager] rotate component need drag element property"
        );
      s.stopPropagation();
      const { width: c, height: u, left: g, top: p } = e.element.getBoundingClientRect(), a = g + c / 2, L = p + u / 2;
      n("rotate-start", i.value), H(
        (d) => {
          const { clientX: l, clientY: h } = I(d), y = a - l, m = L - h, v = Math.atan2(m, y) * 180 / Math.PI - 90;
          i.value = (v + 360) % 360, n("rotate", i.value);
        },
        () => {
          n("rotate-end", i.value);
        }
      );
    }
    return (s, c) => (P(), Q("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: f,
      onTouchstartPassive: f
    }, [
      F(s.$slots, "default", {}, () => [
        We
      ])
    ], 544));
  }
});
const tt = ["data-side", "onMousedown", "onTouchstartPassive"], nt = /* @__PURE__ */ U("div", { class: "es-drager-dot-handle" }, null, -1), ye = /* @__PURE__ */ pe({
  __name: "drager",
  props: Ie,
  emits: [
    "change",
    "drag",
    "drag-start",
    "drag-end",
    "resize",
    "resize-start",
    "resize-end",
    "rotate",
    "rotate-start",
    "rotate-end"
  ],
  setup(o, { emit: n }) {
    const e = o, t = (r, ...v) => {
      n(r, ...v);
    }, i = D(null), { selected: f, dragData: s, isMousedown: c, getBoundary: u, checkDragerCollision: g } = He(
      i,
      e,
      t
    ), p = D(he(0, e.resizeList)), a = S(() => e.resizable && !e.disabled), L = S(
      () => e.rotatable && !e.disabled && f.value
    ), d = S(() => {
      const { width: r, height: v, left: w, top: b, angle: A } = s.value, M = {};
      return r && (M.width = K(r)), v && (M.height = K(v)), {
        ...M,
        left: K(w),
        top: K(b),
        zIndex: e.zIndex,
        transform: `rotate(${A}deg)`,
        "--es-drager-color": e.color
      };
    });
    function l(r) {
      i.value || (i.value = r.$el || r);
    }
    function h(r) {
      p.value = he(r, e.resizeList), t("rotate-end", s.value);
    }
    function y(r, v) {
      if (e.disabled)
        return;
      v.stopPropagation();
      const { clientX: w, clientY: b } = I(v), A = w, M = b, { width: X, height: Y, left: E, top: B } = s.value, C = E + X / 2, $ = B + Y / 2, R = {
        width: X,
        height: Y,
        centerX: C,
        centerY: $,
        rotateAngle: s.value.angle
      }, j = r.side, { minWidth: we, minHeight: me, aspectRatio: ee, equalProportion: be } = e;
      t("resize-start", s.value);
      let te = [];
      e.boundary && (te = u()), H((ne) => {
        const { clientX: ke, clientY: xe } = I(ne);
        let V = (ke - A) / e.scaleRatio, G = (xe - M) / e.scaleRatio;
        e.snapToGrid && (V = O(V, e.gridX), G = O(G, e.gridY));
        const Le = Math.atan2(G, V), oe = qe(V, G), Me = ne.shiftKey, se = Le - W(R.rotateAngle), Ae = oe * Math.cos(se), Ee = oe * Math.sin(se), ie = (be || Me) && !ee ? R.width / R.height : ee, {
          position: { centerX: le, centerY: ae },
          size: { width: Xe, height: Ye }
        } = Fe(
          j,
          { ...R, rotateAngle: R.rotateAngle },
          Ae,
          Ee,
          ie,
          we,
          me
        ), Be = Ue({
          centerX: le,
          centerY: ae,
          width: Xe,
          height: Ye,
          angle: s.value.angle
        });
        let z = {
          ...s.value,
          ...Oe(Be, le, ae)
        };
        e.maxWidth > 0 && (z.width = Math.min(z.width, e.maxWidth)), e.maxHeight > 0 && (z.height = Math.min(z.height, e.maxHeight)), e.boundary && (z = m(z, te, ie)), s.value = z, t("resize", s.value);
      }, () => {
        e.checkCollision && g() && (s.value = { ...s.value, width: X, height: Y, left: E, top: B }), t("resize-end", s.value);
      });
    }
    function m(r, v, w) {
      const [b, A, M, X, Y, E] = v;
      return r.left < b && (r.left = b, r.width = s.value.width, w && (r.height = s.value.height)), r.left + r.width > Y && (r.left = s.value.left, r.width = Y - r.left, w && (r.height = s.value.height)), r.top < M && (r.top = M, r.height = s.value.height, w && (r.width = s.value.width)), r.top + r.height > E && (r.top = s.value.top, r.height = E - r.top, w && (r.width = s.value.width)), r;
    }
    return q(
      () => [e.width, e.height, e.left, e.top, e.angle],
      ([r, v, w, b, A], [M, X, Y, E, B]) => {
        r !== M && (s.value.width = r), v !== X && (s.value.height = v), w !== Y && (s.value.left = w), b !== E && (s.value.top = b), A !== B && (s.value.angle = A);
      }
    ), q(
      () => s.value,
      (r) => {
        n("change", { ...r });
      },
      { deep: !0 }
    ), q(
      () => e.selected,
      (r) => {
        f.value = r;
      },
      { immediate: !0 }
    ), (r, v) => (P(), re(ze(r.tag), {
      ref: l,
      class: De([
        "es-drager",
        { disabled: r.disabled, dragging: T(c), selected: T(f), border: r.border }
      ]),
      style: ce(d.value),
      onClick: v[3] || (v[3] = Te(() => {
      }, ["stop"]))
    }, {
      default: ue(() => [
        F(r.$slots, "default"),
        a.value ? (P(!0), Q(_e, { key: 0 }, Ne(p.value, (w, b) => (P(), Q("div", {
          key: b,
          class: "es-drager-dot",
          "data-side": w.side,
          style: ce({ ...w }),
          onMousedown: (A) => y(w, A),
          onTouchstartPassive: (A) => y(w, A)
        }, [
          F(r.$slots, "resize", Se(Pe({ side: w.side })), () => [
            nt
          ])
        ], 44, tt))), 128)) : de("", !0),
        L.value ? (P(), re(et, {
          key: 1,
          modelValue: T(s).angle,
          "onUpdate:modelValue": v[0] || (v[0] = (w) => T(s).angle = w),
          element: i.value,
          onRotate: v[1] || (v[1] = (w) => t("rotate", T(s))),
          onRotateStart: v[2] || (v[2] = (w) => t("rotate-start", T(s))),
          onRotateEnd: h
        }, {
          default: ue(() => [
            F(r.$slots, "rotate")
          ]),
          _: 3
        }, 8, ["modelValue", "element"])) : de("", !0)
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
const ot = (o) => {
  o.component("es-drager", ye);
};
ye.install = ot;
export {
  Ie as DragerProps,
  ye as ESDrager,
  ye as default,
  ot as install
};
