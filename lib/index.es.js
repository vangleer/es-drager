import { ref as N, onMounted as Ye, watch as J, onBeforeUnmount as Re, defineComponent as fe, computed as K, openBlock as S, createElementBlock as Q, renderSlot as F, createElementVNode as O, createBlock as le, resolveDynamicComponent as Le, normalizeClass as ze, unref as x, normalizeStyle as ce, withModifiers as Be, withCtx as ue, Fragment as xe, renderList as Ce, normalizeProps as _e, guardReactiveProps as Ne, createCommentVNode as he } from "vue";
const Se = {
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
  }
};
function H(o, n) {
  const e = (t) => {
    n && n(t), document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", e), document.removeEventListener("mouseleave", e), document.removeEventListener("touchmove", o), document.removeEventListener("touchend", e);
  };
  document.addEventListener("mousemove", o), document.addEventListener("mouseup", e), document.addEventListener("mouseleave", e), document.addEventListener("touchmove", o), document.addEventListener("touchend", e);
}
function T(o) {
  let n = 0, e = 0;
  if (Te(o)) {
    const t = o.targetTouches[0];
    n = t.pageX, e = t.pageY;
  } else
    n = o.clientX, e = o.clientY;
  return { clientX: n, clientY: e };
}
function Te(o) {
  const n = Object.prototype.toString.call(o);
  return n.substring(8, n.length - 1) === "TouchEvent";
}
const G = (o = 0) => parseInt(o + "") + "px", q = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, Z = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Pe = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Ie = {
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
}, $e = (o, n) => {
  const e = Ie[Math.floor(o / 30)], s = (Pe[n] + e) % 8;
  return Z[s];
}, de = (o = 0, n) => {
  let e = [];
  for (let t = 0; t < Z.length; t++) {
    const s = Z[t], [c, r] = q[s].split("-"), d = $e(o, s), u = {
      [c]: "0%",
      cursor: d + "-resize",
      side: q[s]
    };
    if (r)
      u[r] = "0%";
    else {
      const w = ["top", "bottom"].includes(c) ? "left" : "top";
      u[w] = "50%";
    }
    n ? n.includes(q[s]) && e.push(u) : e.push(u);
  }
  return e;
}, W = (o) => o * Math.PI / 180, Ve = (o, n) => Math.sqrt(o * o + n * n), M = (o) => Math.cos(W(o)), k = (o) => Math.sin(W(o)), Ge = (o, n, e, t, s, c, r) => {
  let { width: d, height: u, centerX: w, centerY: p, rotateAngle: l } = n;
  const Y = d < 0 ? -1 : 1, f = u < 0 ? -1 : 1;
  switch (d = Math.abs(d), u = Math.abs(u), o) {
    case "right": {
      const i = _(d, e, c);
      d = i.width, e = i.deltaW, s ? (t = e / s, u = d / s, w += e / 2 * M(l) - t / 2 * k(l), p += e / 2 * k(l) + t / 2 * M(l)) : (w += e / 2 * M(l), p += e / 2 * k(l));
      break;
    }
    case "top-right": {
      t = -t;
      const i = _(d, e, c);
      d = i.width, e = i.deltaW;
      const h = C(u, t, r);
      u = h.height, t = h.deltaH, s && (e = t * s, d = u * s), w += e / 2 * M(l) + t / 2 * k(l), p += e / 2 * k(l) - t / 2 * M(l);
      break;
    }
    case "bottom-right": {
      const i = _(d, e, c);
      d = i.width, e = i.deltaW;
      const h = C(u, t, r);
      u = h.height, t = h.deltaH, s && (e = t * s, d = u * s), w += e / 2 * M(l) - t / 2 * k(l), p += e / 2 * k(l) + t / 2 * M(l);
      break;
    }
    case "bottom": {
      const i = C(u, t, r);
      u = i.height, t = i.deltaH, s ? (e = t * s, d = u * s, w += e / 2 * M(l) - t / 2 * k(l), p += e / 2 * k(l) + t / 2 * M(l)) : (w -= t / 2 * k(l), p += t / 2 * M(l));
      break;
    }
    case "bottom-left": {
      e = -e;
      const i = _(d, e, c);
      d = i.width, e = i.deltaW;
      const h = C(u, t, r);
      u = h.height, t = h.deltaH, s && (u = d / s, t = e / s), w -= e / 2 * M(l) + t / 2 * k(l), p -= e / 2 * k(l) - t / 2 * M(l);
      break;
    }
    case "left": {
      e = -e;
      const i = _(d, e, c);
      d = i.width, e = i.deltaW, s ? (u = d / s, t = e / s, w -= e / 2 * M(l) + t / 2 * k(l), p -= e / 2 * k(l) - t / 2 * M(l)) : (w -= e / 2 * M(l), p -= e / 2 * k(l));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const i = _(d, e, c);
      d = i.width, e = i.deltaW;
      const h = C(u, t, r);
      u = h.height, t = h.deltaH, s && (d = u * s, e = t * s), w -= e / 2 * M(l) - t / 2 * k(l), p -= e / 2 * k(l) + t / 2 * M(l);
      break;
    }
    case "top": {
      t = -t;
      const i = C(u, t, r);
      u = i.height, t = i.deltaH, s ? (d = u * s, e = t * s, w += e / 2 * M(l) + t / 2 * k(l), p += e / 2 * k(l) - t / 2 * M(l)) : (w += t / 2 * k(l), p -= t / 2 * M(l));
      break;
    }
  }
  return {
    position: {
      centerX: w,
      centerY: p
    },
    size: {
      width: d * Y,
      height: u * f
    }
  };
}, C = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { height: o, deltaH: n };
}, _ = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { width: o, deltaW: n };
}, Ke = ({
  centerX: o,
  centerY: n,
  width: e,
  height: t,
  angle: s
}) => ({
  top: n - t / 2,
  left: o - e / 2,
  width: e,
  height: t,
  angle: s
}), Fe = (o, n, e) => {
  const { width: t, height: s } = o;
  return {
    width: Math.abs(t),
    height: Math.abs(s),
    left: n - Math.abs(t) / 2,
    top: e - Math.abs(s) / 2
  };
};
function U(o, n) {
  const e = Math.abs(o) % n, t = o > 0 ? n : -n;
  let s = 0;
  return e > n / 2 ? s = t * Math.ceil(Math.abs(o) / n) : s = t * Math.floor(Math.abs(o) / n), s;
}
function Oe(o, n) {
  if (!o || !n)
    return !1;
  const e = o.getBoundingClientRect(), t = n.getBoundingClientRect();
  return e.left < t.left + t.width && e.left + e.width > t.left && e.top < t.top + t.height && e.top + e.height > t.top;
}
function Ue(o, n, e) {
  const t = N(!1), s = N(!1), c = N({
    width: n.width,
    height: n.height,
    left: n.left,
    top: n.top,
    angle: n.angle
  }), r = /* @__PURE__ */ new Set();
  function d(f) {
    if (r.add(f.button), n.disabled)
      return;
    t.value = !0, s.value = !0;
    let { clientX: i, clientY: h } = T(f);
    const { left: m, top: y } = c.value;
    let a = 0, g = 0, v = 0, b = 0;
    n.boundary && ([a, g, v, b] = u()), e && e("drag-start", c.value), H((D) => {
      if (r.size > 1)
        return;
      const { clientX: X, clientY: R } = T(D);
      let A = (X - i) / n.scaleRatio + m, L = (R - h) / n.scaleRatio + y;
      if (n.snapToGrid) {
        let { left: P, top: I } = c.value;
        const z = A - P, j = L - I;
        A = P + U(z, n.gridX), L = I + U(j, n.gridY);
      }
      n.boundary && ([A, L] = w(A, L, a, g, v, b)), c.value.left = A, c.value.top = L, e && e("drag", c.value);
    }, (D) => {
      n.checkCollision && p() && (c.value.top = y, c.value.left = m), r.clear(), t.value = !1, document.addEventListener("click", l, { once: !0 }), e && e("drag-end", c.value);
    });
  }
  const u = () => {
    let f = 0, i = 0;
    const { left: h, top: m, height: y, width: a, angle: g } = c.value, b = (o.value.parentElement || document.body).getBoundingClientRect();
    if (g && n.scaleRatio === 1) {
      const X = o.value.getBoundingClientRect();
      f = Math.abs(X.left - (h + b.left)), i = Math.abs(X.top - (m + b.top));
    }
    const E = b.width / n.scaleRatio - a, D = b.height / n.scaleRatio - y;
    return [f, E - f, i, D - i, b.width / n.scaleRatio, b.height / n.scaleRatio];
  }, w = (f, i, h, m, y, a) => (f = f < h ? h : f, f = f > m ? m : f, i = i < y ? y : i, i = i > a ? a : i, [f, i]), p = () => {
    const f = o.value.parentElement || document.body, i = Array.from(f.children).filter((h) => h !== o.value && h.classList.contains("es-drager"));
    for (let h = 0; h < i.length; h++) {
      const m = i[h];
      if (Oe(o.value, m))
        return !0;
    }
  }, l = () => {
    s.value = !1;
  }, Y = (f) => {
    if (t.value)
      return;
    let { left: i, top: h } = c.value;
    if (["ArrowRight", "ArrowLeft"].includes(f.key)) {
      const m = f.key === "ArrowRight";
      let y = m ? 1 : -1;
      n.snapToGrid && (y = m ? n.gridX : -n.gridX), i = i + y;
    } else if (["ArrowUp", "ArrowDown"].includes(f.key)) {
      const m = f.key === "ArrowDown";
      let y = m ? 1 : -1;
      n.snapToGrid && (y = m ? n.gridY : -n.gridY), h = h + y;
    }
    if (n.boundary) {
      const [m, y, a, g] = u();
      [i, h] = w(i, h, m, y, a, g);
    }
    c.value.left = i, c.value.top = h, e("change", { ...c.value });
  };
  return Ye(() => {
    if (o.value) {
      if (!c.value.width && !c.value.height) {
        const { width: f, height: i } = o.value.getBoundingClientRect();
        c.value = {
          ...c.value,
          width: f || 100,
          height: i || 100
        }, e("change", { ...c.value });
      }
      o.value.addEventListener("mousedown", d), o.value.addEventListener("touchstart", d, {
        passive: !0
      });
    }
  }), J(s, (f) => {
    n.disabledKeyEvent || (f ? document.addEventListener("keydown", Y) : document.removeEventListener("keydown", Y));
  }), Re(() => {
    document.removeEventListener("keydown", Y);
  }), {
    isMousedown: t,
    selected: s,
    dragData: c,
    getBoundary: u,
    checkDragerCollision: p
  };
}
const je = /* @__PURE__ */ O("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ O("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ O("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), qe = /* @__PURE__ */ fe({
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
    const e = o, t = N(null), s = K({
      get: () => e.modelValue,
      set: (r) => {
        n("update:modelValue", r);
      }
    });
    function c(r) {
      if (!e.element)
        return console.warn(
          "[es-drager] rotate component need drag element property"
        );
      r.stopPropagation();
      const { width: d, height: u, left: w, top: p } = e.element.getBoundingClientRect(), l = w + d / 2, Y = p + u / 2;
      n("rotate-start", s.value), H(
        (f) => {
          const { clientX: i, clientY: h } = T(f), m = l - i, y = Y - h, g = Math.atan2(y, m) * 180 / Math.PI - 90;
          s.value = (g + 360) % 360, n("rotate", s.value);
        },
        () => {
          n("rotate-end", s.value);
        }
      );
    }
    return (r, d) => (S(), Q("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: c,
      onTouchstartPassive: c
    }, [
      F(r.$slots, "default", {}, () => [
        je
      ])
    ], 544));
  }
});
const Je = ["data-side", "onMousedown", "onTouchstartPassive"], Qe = /* @__PURE__ */ O("div", { class: "es-drager-dot-handle" }, null, -1), ge = /* @__PURE__ */ fe({
  __name: "drager",
  props: Se,
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
    const e = o, t = (a, ...g) => {
      n(a, ...g), n("change", ...g);
    }, s = N(null), { selected: c, dragData: r, isMousedown: d, getBoundary: u, checkDragerCollision: w } = Ue(
      s,
      e,
      t
    ), p = N(de(0, e.resizeList)), l = K(() => e.resizable && !e.disabled), Y = K(
      () => e.rotatable && !e.disabled && c.value
    ), f = K(() => {
      const { width: a, height: g, left: v, top: b, angle: E } = r.value, D = {};
      return a && (D.width = G(a)), g && (D.height = G(g)), {
        ...D,
        left: G(v),
        top: G(b),
        zIndex: e.zIndex,
        transform: `rotate(${E}deg)`,
        "--es-drager-color": e.color
      };
    });
    function i(a) {
      s.value || (s.value = a.$el || a);
    }
    function h(a) {
      p.value = de(a, e.resizeList), t("rotate-end", r.value);
    }
    function m(a, g) {
      if (e.disabled)
        return;
      g.stopPropagation();
      const { clientX: v, clientY: b } = T(g), E = v, D = b, { width: X, height: R, left: A, top: L } = r.value, P = A + X / 2, I = L + R / 2, z = {
        width: X,
        height: R,
        centerX: P,
        centerY: I,
        rotateAngle: r.value.angle
      }, j = a.side, { minWidth: ve, minHeight: we, aspectRatio: ee, equalProportion: me } = e;
      t("resize-start", r.value);
      let te = [];
      e.boundary && (te = u()), H((ne) => {
        const { clientX: pe, clientY: ye } = T(ne);
        let $ = (pe - E) / e.scaleRatio, V = (ye - D) / e.scaleRatio;
        e.snapToGrid && ($ = U($, e.gridX), V = U(V, e.gridY));
        const be = Math.atan2(V, $), oe = Ve($, V), Me = ne.shiftKey, se = be - W(z.rotateAngle), ke = oe * Math.cos(se), Ee = oe * Math.sin(se), ae = (me || Me) && !ee ? z.width / z.height : ee, {
          position: { centerX: ie, centerY: re },
          size: { width: De, height: Ae }
        } = Ge(
          j,
          { ...z, rotateAngle: z.rotateAngle },
          ke,
          Ee,
          ae,
          ve,
          we
        ), Xe = Ke({
          centerX: ie,
          centerY: re,
          width: De,
          height: Ae,
          angle: r.value.angle
        });
        let B = {
          ...r.value,
          ...Fe(Xe, ie, re)
        };
        e.maxWidth > 0 && (B.width = Math.min(B.width, e.maxWidth)), e.maxHeight > 0 && (B.height = Math.min(B.height, e.maxHeight)), e.boundary && (B = y(B, te, ae)), r.value = B, t("resize", r.value);
      }, () => {
        e.checkCollision && w() && (r.value = { ...r.value, width: X, height: R, left: A, top: L }), t("resize-end", r.value);
      });
    }
    function y(a, g, v) {
      const [b, E, D, X, R, A] = g;
      return a.left < b && (a.left = b, a.width = r.value.width, v && (a.height = r.value.height)), a.left + a.width > R && (a.left = r.value.left, a.width = R - a.left, v && (a.height = r.value.height)), a.top < D && (a.top = D, a.height = r.value.height, v && (a.width = r.value.width)), a.top + a.height > A && (a.top = r.value.top, a.height = A - a.top, v && (a.width = r.value.width)), a;
    }
    return J(
      () => [e.width, e.height, e.left, e.top, e.angle],
      ([a, g, v, b, E]) => {
        r.value = {
          ...r.value,
          width: a,
          height: g,
          left: v,
          top: b,
          angle: E
        };
      }
    ), J(
      () => e.selected,
      (a) => {
        c.value = a;
      },
      { immediate: !0 }
    ), (a, g) => (S(), le(Le(a.tag), {
      ref: i,
      class: ze([
        "es-drager",
        { disabled: a.disabled, dragging: x(d), selected: x(c), border: a.border }
      ]),
      style: ce(f.value),
      onClick: g[3] || (g[3] = Be(() => {
      }, ["stop"]))
    }, {
      default: ue(() => [
        F(a.$slots, "default"),
        l.value ? (S(!0), Q(xe, { key: 0 }, Ce(p.value, (v, b) => (S(), Q("div", {
          key: b,
          class: "es-drager-dot",
          "data-side": v.side,
          style: ce({ ...v }),
          onMousedown: (E) => m(v, E),
          onTouchstartPassive: (E) => m(v, E)
        }, [
          F(a.$slots, "resize", _e(Ne({ side: v.side })), () => [
            Qe
          ])
        ], 44, Je))), 128)) : he("", !0),
        Y.value ? (S(), le(qe, {
          key: 1,
          modelValue: x(r).angle,
          "onUpdate:modelValue": g[0] || (g[0] = (v) => x(r).angle = v),
          element: s.value,
          onRotate: g[1] || (g[1] = (v) => t("rotate", x(r))),
          onRotateStart: g[2] || (g[2] = (v) => t("rotate-start", x(r))),
          onRotateEnd: h
        }, {
          default: ue(() => [
            F(a.$slots, "rotate")
          ]),
          _: 3
        }, 8, ["modelValue", "element"])) : he("", !0)
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
const Ze = (o) => {
  o.component("es-drager", ge);
};
ge.install = Ze;
export {
  ge as ESDrager,
  ge as default,
  Ze as install
};
