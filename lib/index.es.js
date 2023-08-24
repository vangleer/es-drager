import { ref as B, onMounted as Ee, watch as j, onBeforeUnmount as Ae, defineComponent as le, computed as $, openBlock as N, createElementBlock as q, renderSlot as I, createElementVNode as V, createBlock as se, resolveDynamicComponent as De, normalizeClass as Xe, unref as z, normalizeStyle as ae, withModifiers as Ye, withCtx as re, Fragment as ke, renderList as ze, normalizeProps as Le, guardReactiveProps as Re, createCommentVNode as ce } from "vue";
const Be = {
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
  }
};
function Q(o, n) {
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
const C = (o = 0) => parseInt(o + "") + "px", U = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, J = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ne = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, xe = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Se = (o, n) => {
  const e = xe[Math.floor(o / 30)], s = (Ne[n] + e) % 8;
  return J[s];
}, ie = (o = 0, n) => {
  let e = [];
  for (let t = 0; t < J.length; t++) {
    const s = J[t], [d, l] = U[s].split("-"), h = Se(o, s), i = { [d]: "0%", cursor: h + "-resize", side: U[s] };
    if (l)
      i[l] = "0%";
    else {
      const w = ["top", "bottom"].includes(d) ? "left" : "top";
      i[w] = "50%";
    }
    n ? n.includes(U[s]) && e.push(i) : e.push(i);
  }
  return e;
}, Z = (o) => o * Math.PI / 180, Te = (o, n) => Math.sqrt(o * o + n * n), p = (o) => Math.cos(Z(o)), m = (o) => Math.sin(Z(o)), Pe = (o, n, e, t, s, d, l) => {
  let { width: h, height: i, centerX: w, centerY: y, rotateAngle: r } = n;
  const f = h < 0 ? -1 : 1, g = i < 0 ? -1 : 1;
  switch (h = Math.abs(h), i = Math.abs(i), o) {
    case "right": {
      const c = R(h, e, d);
      h = c.width, e = c.deltaW, s ? (t = e / s, i = h / s, w += e / 2 * p(r) - t / 2 * m(r), y += e / 2 * m(r) + t / 2 * p(r)) : (w += e / 2 * p(r), y += e / 2 * m(r));
      break;
    }
    case "top-right": {
      t = -t;
      const c = R(h, e, d);
      h = c.width, e = c.deltaW;
      const a = L(i, t, l);
      i = a.height, t = a.deltaH, s && (e = t * s, h = i * s), w += e / 2 * p(r) + t / 2 * m(r), y += e / 2 * m(r) - t / 2 * p(r);
      break;
    }
    case "bottom-right": {
      const c = R(h, e, d);
      h = c.width, e = c.deltaW;
      const a = L(i, t, l);
      i = a.height, t = a.deltaH, s && (e = t * s, h = i * s), w += e / 2 * p(r) - t / 2 * m(r), y += e / 2 * m(r) + t / 2 * p(r);
      break;
    }
    case "bottom": {
      const c = L(i, t, l);
      i = c.height, t = c.deltaH, s ? (e = t * s, h = i * s, w += e / 2 * p(r) - t / 2 * m(r), y += e / 2 * m(r) + t / 2 * p(r)) : (w -= t / 2 * m(r), y += t / 2 * p(r));
      break;
    }
    case "bottom-left": {
      e = -e;
      const c = R(h, e, d);
      h = c.width, e = c.deltaW;
      const a = L(i, t, l);
      i = a.height, t = a.deltaH, s && (i = h / s, t = e / s), w -= e / 2 * p(r) + t / 2 * m(r), y -= e / 2 * m(r) - t / 2 * p(r);
      break;
    }
    case "left": {
      e = -e;
      const c = R(h, e, d);
      h = c.width, e = c.deltaW, s ? (i = h / s, t = e / s, w -= e / 2 * p(r) + t / 2 * m(r), y -= e / 2 * m(r) - t / 2 * p(r)) : (w -= e / 2 * p(r), y -= e / 2 * m(r));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const c = R(h, e, d);
      h = c.width, e = c.deltaW;
      const a = L(i, t, l);
      i = a.height, t = a.deltaH, s && (h = i * s, e = t * s), w -= e / 2 * p(r) - t / 2 * m(r), y -= e / 2 * m(r) + t / 2 * p(r);
      break;
    }
    case "top": {
      t = -t;
      const c = L(i, t, l);
      i = c.height, t = c.deltaH, s ? (h = i * s, e = t * s, w += e / 2 * p(r) + t / 2 * m(r), y += e / 2 * m(r) - t / 2 * p(r)) : (w += t / 2 * m(r), y -= t / 2 * p(r));
      break;
    }
  }
  return {
    position: {
      centerX: w,
      centerY: y
    },
    size: {
      width: h * f,
      height: i * g
    }
  };
}, L = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { height: o, deltaH: n };
}, R = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { width: o, deltaW: n };
}, Ce = ({ centerX: o, centerY: n, width: e, height: t, angle: s }) => ({
  top: n - t / 2,
  left: o - e / 2,
  width: e,
  height: t,
  angle: s
}), $e = (o, n, e) => {
  const { width: t, height: s } = o;
  return {
    width: Math.abs(t),
    height: Math.abs(s),
    left: n - Math.abs(t) / 2,
    top: e - Math.abs(s) / 2
  };
};
function G(o, n) {
  const e = Math.abs(o) % n, t = o > 0 ? n : -n;
  let s = 0;
  return e > n / 2 ? s = t * Math.ceil(Math.abs(o) / n) : s = t * Math.floor(Math.abs(o) / n), s;
}
function Ie(o, n, e) {
  const t = B(!1), s = B(!1), d = B({
    width: n.width,
    height: n.height,
    left: n.left,
    top: n.top,
    angle: n.angle
  }), l = /* @__PURE__ */ new Set();
  function h(f) {
    if (l.add(f.button), n.disabled)
      return;
    t.value = !0, s.value = !0;
    let { clientX: g, clientY: c } = x(f);
    const { left: a, top: u } = d.value;
    let v = 0, b = 0, M = 0, E = 0;
    n.boundary && ([v, b, M, E] = i()), e && e("drag-start", d.value), Q((D) => {
      if (l.size > 1)
        return;
      const { clientX: k, clientY: K } = x(D);
      let X = (k - g) / n.scaleRatio + a, Y = (K - c) / n.scaleRatio + u;
      if (n.snapToGrid) {
        let { left: A, top: S } = d.value;
        const F = X - A, O = Y - S;
        X = A + G(F, n.gridX), Y = S + G(O, n.gridY);
      }
      n.boundary && ([X, Y] = w(X, Y, v, b, M, E)), d.value.left = X, d.value.top = Y, e && e("drag", d.value);
    }, (D) => {
      l.clear(), t.value = !1, document.addEventListener("click", y, { once: !0 }), e && e("drag-end", d.value);
    });
  }
  const i = () => {
    let f = 0, g = 0;
    const { left: c, top: a, height: u, width: v, angle: b } = d.value, E = (o.value.parentElement || document.body).getBoundingClientRect();
    if (b) {
      const k = o.value.getBoundingClientRect();
      f = Math.abs(k.left - (c + E.left)), g = Math.abs(k.top - (a + E.top));
    }
    const _ = E.width / n.scaleRatio - v, D = E.height / n.scaleRatio - u;
    return [f, _ - f, g, D - g];
  }, w = (f, g, c, a, u, v) => (f = f < c ? c : f, f = f > a ? a : f, g = g < u ? u : g, g = g > v ? v : g, [f, g]), y = () => {
    s.value = !1;
  }, r = (f) => {
    if (t.value)
      return;
    let { left: g, top: c } = d.value;
    if (["ArrowRight", "ArrowLeft"].includes(f.key)) {
      const a = f.key === "ArrowRight";
      let u = a ? 1 : -1;
      n.snapToGrid && (u = a ? n.gridX : -n.gridX), g = g + u;
    } else if (["ArrowUp", "ArrowDown"].includes(f.key)) {
      const a = f.key === "ArrowDown";
      let u = a ? 1 : -1;
      n.snapToGrid && (u = a ? n.gridY : -n.gridY), c = c + u;
    }
    if (n.boundary) {
      const [a, u, v, b] = i();
      [g, c] = w(g, c, a, u, v, b);
    }
    d.value.left = g, d.value.top = c;
  };
  return Ee(() => {
    if (o.value) {
      if (!d.value.width && !d.value.height) {
        const { width: f, height: g } = o.value.getBoundingClientRect();
        d.value = { ...d.value, width: f || 100, height: g || 100 }, e("change", { ...d.value });
      }
      o.value.addEventListener("mousedown", h), o.value.addEventListener("touchstart", h, { passive: !0 });
    }
  }), j(s, (f) => {
    n.disabledKeyEvent || (f ? document.addEventListener("keydown", r) : document.removeEventListener("keydown", r));
  }), Ae(() => {
    document.removeEventListener("keydown", r);
  }), {
    isMousedown: t,
    selected: s,
    dragData: d
  };
}
const Ve = /* @__PURE__ */ V("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ V("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ V("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Ge = /* @__PURE__ */ le({
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
    const e = o, t = B(null), s = $({
      get: () => e.modelValue,
      set: (l) => {
        n("update:modelValue", l);
      }
    });
    function d(l) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      l.stopPropagation();
      const { width: h, height: i, left: w, top: y } = e.element.getBoundingClientRect(), r = w + h / 2, f = y + i / 2;
      n("rotate-start", s.value), Q((g) => {
        const { clientX: c, clientY: a } = x(g), u = r - c, v = f - a, M = Math.atan2(v, u) * 180 / Math.PI - 90;
        s.value = (M + 360) % 360, n("rotate", s.value);
      }, () => {
        n("rotate-end", s.value);
      });
    }
    return (l, h) => (N(), q("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: d,
      onTouchstartPassive: d
    }, [
      I(l.$slots, "default", {}, () => [
        Ve
      ])
    ], 544));
  }
});
const Ke = ["data-side", "onMousedown", "onTouchstartPassive"], Fe = /* @__PURE__ */ V("div", { class: "es-drager-dot-handle" }, null, -1), ue = /* @__PURE__ */ le({
  __name: "drager",
  props: Be,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(o, { emit: n }) {
    const e = o, t = (a, ...u) => {
      n(a, ...u), n("change", ...u);
    }, s = B(null), { selected: d, dragData: l, isMousedown: h } = Ie(s, e, t), i = B(ie(0, e.resizeList)), w = $(() => e.resizable && !e.disabled), y = $(() => e.rotatable && !e.disabled && d.value), r = $(() => {
      const { width: a, height: u, left: v, top: b, angle: M } = l.value, E = {};
      return a && (E.width = C(a)), u && (E.height = C(u)), {
        ...E,
        left: C(v),
        top: C(b),
        zIndex: e.zIndex,
        transform: `rotate(${M}deg)`,
        "--es-drager-color": e.color
      };
    });
    function f(a) {
      s.value || (s.value = a.$el || a);
    }
    function g(a) {
      i.value = ie(a, e.resizeList), t("rotate-end", l.value);
    }
    function c(a, u) {
      u.stopPropagation();
      const { clientX: v, clientY: b } = x(u), M = v, E = b, { width: _, height: D, left: k, top: K } = l.value, X = k + _ / 2, Y = K + D / 2, A = { width: _, height: D, centerX: X, centerY: Y, rotateAngle: l.value.angle }, S = a.side, { minWidth: F, minHeight: O, aspectRatio: H, equalProportion: de } = e;
      t("resize-start", l.value), Q((W) => {
        const { clientX: he, clientY: fe } = x(W);
        let T = (he - M) / e.scaleRatio, P = (fe - E) / e.scaleRatio;
        e.snapToGrid && (T = G(T, e.gridX), P = G(P, e.gridY));
        const ge = Math.atan2(P, T), ee = Te(T, P), ve = W.shiftKey, te = ge - Z(A.rotateAngle), we = ee * Math.cos(te), pe = ee * Math.sin(te), me = (de || ve) && !H ? A.width / A.height : H, {
          position: { centerX: ne, centerY: oe },
          size: { width: ye, height: be }
        } = Pe(S, { ...A, rotateAngle: A.rotateAngle }, we, pe, me, F, O), Me = Ce({
          centerX: ne,
          centerY: oe,
          width: ye,
          height: be,
          angle: l.value.angle
        });
        l.value = {
          ...l.value,
          ...$e(Me, ne, oe)
        }, t("resize", l.value);
      }, () => {
        t("resize-end", l.value);
      });
    }
    return j(() => [
      e.width,
      e.height,
      e.left,
      e.top,
      e.angle
    ], ([a, u, v, b, M]) => {
      l.value = {
        ...l.value,
        width: a,
        height: u,
        left: v,
        top: b,
        angle: M
      };
    }), j(() => e.selected, (a) => {
      d.value = a;
    }, { immediate: !0 }), (a, u) => (N(), se(De(a.tag), {
      ref: f,
      class: Xe(["es-drager", { disabled: a.disabled, dragging: z(h), selected: z(d), border: a.border }]),
      style: ae(r.value),
      onClick: u[3] || (u[3] = Ye(() => {
      }, ["stop"]))
    }, {
      default: re(() => [
        I(a.$slots, "default"),
        w.value ? (N(!0), q(ke, { key: 0 }, ze(i.value, (v, b) => (N(), q("div", {
          key: b,
          class: "es-drager-dot",
          "data-side": v.side,
          style: ae({ ...v }),
          onMousedown: (M) => c(v, M),
          onTouchstartPassive: (M) => c(v, M)
        }, [
          I(a.$slots, "resize", Le(Re({ side: v.side })), () => [
            Fe
          ])
        ], 44, Ke))), 128)) : ce("", !0),
        y.value ? (N(), se(Ge, {
          key: 1,
          modelValue: z(l).angle,
          "onUpdate:modelValue": u[0] || (u[0] = (v) => z(l).angle = v),
          element: s.value,
          onRotate: u[1] || (u[1] = (v) => t("rotate", z(l))),
          onRotateStart: u[2] || (u[2] = (v) => t("rotate-start", z(l))),
          onRotateEnd: g
        }, {
          default: re(() => [
            I(a.$slots, "rotate")
          ]),
          _: 3
        }, 8, ["modelValue", "element"])) : ce("", !0)
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
const Oe = (o) => {
  o.component("es-drager", ue);
};
ue.install = Oe;
export {
  ue as ESDrager,
  ue as default,
  Oe as install
};
