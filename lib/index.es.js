import { ref as _, onMounted as Ee, watch as q, onBeforeUnmount as De, defineComponent as ue, computed as V, openBlock as N, createElementBlock as J, renderSlot as G, createElementVNode as K, createBlock as re, resolveDynamicComponent as Ae, normalizeClass as Le, unref as R, normalizeStyle as ae, withModifiers as Xe, withCtx as ie, Fragment as Ye, renderList as ze, normalizeProps as Re, guardReactiveProps as Be, createCommentVNode as ce } from "vue";
const Ce = {
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
function Z(o, n) {
  const e = (t) => {
    n && n(t), document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", e), document.removeEventListener("mouseleave", e), document.removeEventListener("touchmove", o), document.removeEventListener("touchend", e);
  };
  document.addEventListener("mousemove", o), document.addEventListener("mouseup", e), document.addEventListener("mouseleave", e), document.addEventListener("touchmove", o), document.addEventListener("touchend", e);
}
function x(o) {
  let n = 0, e = 0;
  if (_e(o)) {
    const t = o.targetTouches[0];
    n = t.pageX, e = t.pageY;
  } else
    n = o.clientX, e = o.clientY;
  return { clientX: n, clientY: e };
}
function _e(o) {
  const n = Object.prototype.toString.call(o);
  return n.substring(8, n.length - 1) === "TouchEvent";
}
const I = (o = 0) => parseInt(o + "") + "px", j = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, Q = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ne = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, xe = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Se = (o, n) => {
  const e = xe[Math.floor(o / 30)], s = (Ne[n] + e) % 8;
  return Q[s];
}, le = (o = 0, n) => {
  let e = [];
  for (let t = 0; t < Q.length; t++) {
    const s = Q[t], [d, c] = j[s].split("-"), f = Se(o, s), u = { [d]: "0%", cursor: f + "-resize", side: j[s] };
    if (c)
      u[c] = "0%";
    else {
      const p = ["top", "bottom"].includes(d) ? "left" : "top";
      u[p] = "50%";
    }
    n ? n.includes(j[s]) && e.push(u) : e.push(u);
  }
  return e;
}, H = (o) => o * Math.PI / 180, Te = (o, n) => Math.sqrt(o * o + n * n), m = (o) => Math.cos(H(o)), y = (o) => Math.sin(H(o)), Pe = (o, n, e, t, s, d, c) => {
  let { width: f, height: u, centerX: p, centerY: w, rotateAngle: a } = n;
  const E = f < 0 ? -1 : 1, g = u < 0 ? -1 : 1;
  switch (f = Math.abs(f), u = Math.abs(u), o) {
    case "right": {
      const r = C(f, e, d);
      f = r.width, e = r.deltaW, s ? (t = e / s, u = f / s, p += e / 2 * m(a) - t / 2 * y(a), w += e / 2 * y(a) + t / 2 * m(a)) : (p += e / 2 * m(a), w += e / 2 * y(a));
      break;
    }
    case "top-right": {
      t = -t;
      const r = C(f, e, d);
      f = r.width, e = r.deltaW;
      const h = B(u, t, c);
      u = h.height, t = h.deltaH, s && (e = t * s, f = u * s), p += e / 2 * m(a) + t / 2 * y(a), w += e / 2 * y(a) - t / 2 * m(a);
      break;
    }
    case "bottom-right": {
      const r = C(f, e, d);
      f = r.width, e = r.deltaW;
      const h = B(u, t, c);
      u = h.height, t = h.deltaH, s && (e = t * s, f = u * s), p += e / 2 * m(a) - t / 2 * y(a), w += e / 2 * y(a) + t / 2 * m(a);
      break;
    }
    case "bottom": {
      const r = B(u, t, c);
      u = r.height, t = r.deltaH, s ? (e = t * s, f = u * s, p += e / 2 * m(a) - t / 2 * y(a), w += e / 2 * y(a) + t / 2 * m(a)) : (p -= t / 2 * y(a), w += t / 2 * m(a));
      break;
    }
    case "bottom-left": {
      e = -e;
      const r = C(f, e, d);
      f = r.width, e = r.deltaW;
      const h = B(u, t, c);
      u = h.height, t = h.deltaH, s && (u = f / s, t = e / s), p -= e / 2 * m(a) + t / 2 * y(a), w -= e / 2 * y(a) - t / 2 * m(a);
      break;
    }
    case "left": {
      e = -e;
      const r = C(f, e, d);
      f = r.width, e = r.deltaW, s ? (u = f / s, t = e / s, p -= e / 2 * m(a) + t / 2 * y(a), w -= e / 2 * y(a) - t / 2 * m(a)) : (p -= e / 2 * m(a), w -= e / 2 * y(a));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const r = C(f, e, d);
      f = r.width, e = r.deltaW;
      const h = B(u, t, c);
      u = h.height, t = h.deltaH, s && (f = u * s, e = t * s), p -= e / 2 * m(a) - t / 2 * y(a), w -= e / 2 * y(a) + t / 2 * m(a);
      break;
    }
    case "top": {
      t = -t;
      const r = B(u, t, c);
      u = r.height, t = r.deltaH, s ? (f = u * s, e = t * s, p += e / 2 * m(a) + t / 2 * y(a), w += e / 2 * y(a) - t / 2 * m(a)) : (p += t / 2 * y(a), w -= t / 2 * m(a));
      break;
    }
  }
  return {
    position: {
      centerX: p,
      centerY: w
    },
    size: {
      width: f * E,
      height: u * g
    }
  };
}, B = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { height: o, deltaH: n };
}, C = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { width: o, deltaW: n };
}, $e = ({ centerX: o, centerY: n, width: e, height: t, angle: s }) => ({
  top: n - t / 2,
  left: o - e / 2,
  width: e,
  height: t,
  angle: s
}), Ie = (o, n, e) => {
  const { width: t, height: s } = o;
  return {
    width: Math.abs(t),
    height: Math.abs(s),
    left: n - Math.abs(t) / 2,
    top: e - Math.abs(s) / 2
  };
};
function F(o, n) {
  const e = Math.abs(o) % n, t = o > 0 ? n : -n;
  let s = 0;
  return e > n / 2 ? s = t * Math.ceil(Math.abs(o) / n) : s = t * Math.floor(Math.abs(o) / n), s;
}
function Ve(o, n) {
  if (!o || !n)
    return !1;
  const e = o.getBoundingClientRect(), t = n.getBoundingClientRect();
  return e.left < t.left + t.width && e.left + e.width > t.left && e.top < t.top + t.height && e.top + e.height > t.top;
}
function Ge(o, n, e) {
  const t = _(!1), s = _(!1), d = _({
    width: n.width,
    height: n.height,
    left: n.left,
    top: n.top,
    angle: n.angle
  }), c = /* @__PURE__ */ new Set();
  function f(g) {
    if (c.add(g.button), n.disabled)
      return;
    t.value = !0, s.value = !0;
    let { clientX: r, clientY: h } = x(g);
    const { left: i, top: l } = d.value;
    let v = 0, b = 0, M = 0, k = 0;
    n.boundary && ([v, b, M, k] = u()), e && e("drag-start", d.value), Z((D) => {
      if (c.size > 1)
        return;
      const { clientX: A, clientY: S } = x(D);
      let X = (A - r) / n.scaleRatio + i, Y = (S - h) / n.scaleRatio + l;
      if (n.snapToGrid) {
        let { left: L, top: T } = d.value;
        const O = X - L, U = Y - T;
        X = L + F(O, n.gridX), Y = T + F(U, n.gridY);
      }
      n.boundary && ([X, Y] = p(X, Y, v, b, M, k)), d.value.left = X, d.value.top = Y, e && e("drag", d.value);
    }, (D) => {
      n.checkCollision && w() && (d.value.top = l, d.value.left = i), c.clear(), t.value = !1, document.addEventListener("click", a, { once: !0 }), e && e("drag-end", d.value);
    });
  }
  const u = () => {
    let g = 0, r = 0;
    const { left: h, top: i, height: l, width: v, angle: b } = d.value, k = (o.value.parentElement || document.body).getBoundingClientRect();
    if (b && n.scaleRatio === 1) {
      const A = o.value.getBoundingClientRect();
      g = Math.abs(A.left - (h + k.left)), r = Math.abs(A.top - (i + k.top));
    }
    const z = k.width / n.scaleRatio - v, D = k.height / n.scaleRatio - l;
    return [g, z - g, r, D - r];
  }, p = (g, r, h, i, l, v) => (g = g < h ? h : g, g = g > i ? i : g, r = r < l ? l : r, r = r > v ? v : r, [g, r]), w = () => {
    const g = o.value.parentElement || document.body, r = Array.from(g.children).filter((h) => h !== o.value && h.classList.contains("es-drager"));
    for (let h = 0; h < r.length; h++) {
      const i = r[h];
      if (Ve(o.value, i))
        return !0;
    }
  }, a = () => {
    s.value = !1;
  }, E = (g) => {
    if (t.value)
      return;
    let { left: r, top: h } = d.value;
    if (["ArrowRight", "ArrowLeft"].includes(g.key)) {
      const i = g.key === "ArrowRight";
      let l = i ? 1 : -1;
      n.snapToGrid && (l = i ? n.gridX : -n.gridX), r = r + l;
    } else if (["ArrowUp", "ArrowDown"].includes(g.key)) {
      const i = g.key === "ArrowDown";
      let l = i ? 1 : -1;
      n.snapToGrid && (l = i ? n.gridY : -n.gridY), h = h + l;
    }
    if (n.boundary) {
      const [i, l, v, b] = u();
      [r, h] = p(r, h, i, l, v, b);
    }
    d.value.left = r, d.value.top = h;
  };
  return Ee(() => {
    if (o.value) {
      if (!d.value.width && !d.value.height) {
        const { width: g, height: r } = o.value.getBoundingClientRect();
        d.value = { ...d.value, width: g || 100, height: r || 100 }, e("change", { ...d.value });
      }
      o.value.addEventListener("mousedown", f), o.value.addEventListener("touchstart", f, { passive: !0 });
    }
  }), q(s, (g) => {
    n.disabledKeyEvent || (g ? document.addEventListener("keydown", E) : document.removeEventListener("keydown", E));
  }), De(() => {
    document.removeEventListener("keydown", E);
  }), {
    isMousedown: t,
    selected: s,
    dragData: d,
    getBoundary: u,
    checkDragerCollision: w
  };
}
const Ke = /* @__PURE__ */ K("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ K("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ K("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Fe = /* @__PURE__ */ ue({
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
  emits: ["update:modelValue", "rotate", "rotate-start", "rotate-end"],
  setup(o, { emit: n }) {
    const e = o, t = _(null), s = V({
      get: () => e.modelValue,
      set: (c) => {
        n("update:modelValue", c);
      }
    });
    function d(c) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      c.stopPropagation();
      const { width: f, height: u, left: p, top: w } = e.element.getBoundingClientRect(), a = p + f / 2, E = w + u / 2;
      n("rotate-start", s.value), Z((g) => {
        const { clientX: r, clientY: h } = x(g), i = a - r, l = E - h, b = Math.atan2(l, i) * 180 / Math.PI - 90;
        s.value = (b + 360) % 360, n("rotate", s.value);
      }, () => {
        n("rotate-end", s.value);
      });
    }
    return (c, f) => (N(), J("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: d,
      onTouchstartPassive: d
    }, [
      G(c.$slots, "default", {}, () => [
        Ke
      ])
    ], 544));
  }
});
const Oe = ["data-side", "onMousedown", "onTouchstartPassive"], Ue = /* @__PURE__ */ K("div", { class: "es-drager-dot-handle" }, null, -1), de = /* @__PURE__ */ ue({
  __name: "drager",
  props: Ce,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(o, { emit: n }) {
    const e = o, t = (i, ...l) => {
      n(i, ...l), n("change", ...l);
    }, s = _(null), {
      selected: d,
      dragData: c,
      isMousedown: f,
      checkDragerCollision: u
    } = Ge(s, e, t), p = _(le(0, e.resizeList)), w = V(() => e.resizable && !e.disabled), a = V(() => e.rotatable && !e.disabled && d.value), E = V(() => {
      const { width: i, height: l, left: v, top: b, angle: M } = c.value, k = {};
      return i && (k.width = I(i)), l && (k.height = I(l)), {
        ...k,
        left: I(v),
        top: I(b),
        zIndex: e.zIndex,
        transform: `rotate(${M}deg)`,
        "--es-drager-color": e.color
      };
    });
    function g(i) {
      s.value || (s.value = i.$el || i);
    }
    function r(i) {
      p.value = le(i, e.resizeList), t("rotate-end", c.value);
    }
    function h(i, l) {
      l.stopPropagation();
      const { clientX: v, clientY: b } = x(l), M = v, k = b, { width: z, height: D, left: A, top: S } = c.value, X = A + z / 2, Y = S + D / 2, L = { width: z, height: D, centerX: X, centerY: Y, rotateAngle: c.value.angle }, T = i.side, { minWidth: O, minHeight: U, aspectRatio: W, equalProportion: he } = e;
      t("resize-start", c.value), Z((ee) => {
        const { clientX: fe, clientY: ge } = x(ee);
        let P = (fe - M) / e.scaleRatio, $ = (ge - k) / e.scaleRatio;
        e.snapToGrid && (P = F(P, e.gridX), $ = F($, e.gridY));
        const ve = Math.atan2($, P), te = Te(P, $), pe = ee.shiftKey, ne = ve - H(L.rotateAngle), we = te * Math.cos(ne), me = te * Math.sin(ne), ye = (he || pe) && !W ? L.width / L.height : W, {
          position: { centerX: oe, centerY: se },
          size: { width: be, height: Me }
        } = Pe(T, { ...L, rotateAngle: L.rotateAngle }, we, me, ye, O, U), ke = $e({
          centerX: oe,
          centerY: se,
          width: be,
          height: Me,
          angle: c.value.angle
        });
        c.value = {
          ...c.value,
          ...Ie(ke, oe, se)
        }, t("resize", c.value);
      }, () => {
        e.checkCollision && u() && (c.value = { ...c.value, width: z, height: D, left: A, top: S }), t("resize-end", c.value);
      });
    }
    return q(() => [
      e.width,
      e.height,
      e.left,
      e.top,
      e.angle
    ], ([i, l, v, b, M]) => {
      c.value = {
        ...c.value,
        width: i,
        height: l,
        left: v,
        top: b,
        angle: M
      };
    }), q(() => e.selected, (i) => {
      d.value = i;
    }, { immediate: !0 }), (i, l) => (N(), re(Ae(i.tag), {
      ref: g,
      class: Le(["es-drager", { disabled: i.disabled, dragging: R(f), selected: R(d), border: i.border }]),
      style: ae(E.value),
      onClick: l[3] || (l[3] = Xe(() => {
      }, ["stop"]))
    }, {
      default: ie(() => [
        G(i.$slots, "default"),
        w.value ? (N(!0), J(Ye, { key: 0 }, ze(p.value, (v, b) => (N(), J("div", {
          key: b,
          class: "es-drager-dot",
          "data-side": v.side,
          style: ae({ ...v }),
          onMousedown: (M) => h(v, M),
          onTouchstartPassive: (M) => h(v, M)
        }, [
          G(i.$slots, "resize", Re(Be({ side: v.side })), () => [
            Ue
          ])
        ], 44, Oe))), 128)) : ce("", !0),
        a.value ? (N(), re(Fe, {
          key: 1,
          modelValue: R(c).angle,
          "onUpdate:modelValue": l[0] || (l[0] = (v) => R(c).angle = v),
          element: s.value,
          onRotate: l[1] || (l[1] = (v) => t("rotate", R(c))),
          onRotateStart: l[2] || (l[2] = (v) => t("rotate-start", R(c))),
          onRotateEnd: r
        }, {
          default: ie(() => [
            G(i.$slots, "rotate")
          ]),
          _: 3
        }, 8, ["modelValue", "element"])) : ce("", !0)
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
const je = (o) => {
  o.component("es-drager", de);
};
de.install = je;
export {
  de as ESDrager,
  de as default,
  je as install
};
