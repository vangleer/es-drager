import { ref as Y, onMounted as be, watch as K, onBeforeUnmount as Me, defineComponent as ae, computed as ce, openBlock as z, createElementBlock as F, renderSlot as S, createElementVNode as C, createBlock as ee, resolveDynamicComponent as De, normalizeClass as Ee, unref as M, normalizeStyle as te, withModifiers as ne, withCtx as oe, Fragment as Ae, renderList as ke, normalizeProps as Le, guardReactiveProps as Xe, createCommentVNode as se } from "vue";
const Ye = {
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
  }
};
function U(r, n) {
  const e = (t) => {
    n && n(t), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", e), document.removeEventListener("mouseleave", e), document.removeEventListener("touchmove", r), document.removeEventListener("touchend", e);
  };
  document.addEventListener("mousemove", r), document.addEventListener("mouseup", e), document.addEventListener("mouseleave", e), document.addEventListener("touchmove", r), document.addEventListener("touchend", e);
}
function R(r) {
  let n = 0, e = 0;
  if (ze(r)) {
    const t = r.targetTouches[0];
    n = t.pageX, e = t.pageY;
  } else
    n = r.clientX, e = r.clientY;
  return { clientX: n, clientY: e };
}
function ze(r) {
  const n = Object.prototype.toString.call(r);
  return n.substring(8, n.length - 1) === "TouchEvent";
}
const x = (r = 0) => parseInt(r + "") + "px", P = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, O = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Re = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Be = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, _e = (r, n) => {
  const e = Be[Math.floor(r / 30)], a = (Re[n] + e) % 8;
  return O[a];
}, re = (r = 0, n) => {
  let e = [];
  for (let t = 0; t < O.length; t++) {
    const a = O[t], [h, l] = P[a].split("-"), d = _e(r, a), u = { [h]: "0%", cursor: d + "-resize", side: P[a] };
    if (l)
      u[l] = "0%";
    else {
      const g = ["top", "bottom"].includes(h) ? "left" : "top";
      u[g] = "50%";
    }
    n ? n.includes(P[a]) && e.push(u) : e.push(u);
  }
  return e;
}, j = (r) => r * Math.PI / 180, Ne = (r, n) => Math.sqrt(r * r + n * n), w = (r) => Math.cos(j(r)), p = (r) => Math.sin(j(r)), Te = (r, n, e, t, a, h, l) => {
  let { width: d, height: u, centerX: g, centerY: v, rotateAngle: o } = n;
  const f = d < 0 ? -1 : 1, c = u < 0 ? -1 : 1;
  switch (d = Math.abs(d), u = Math.abs(u), r) {
    case "right": {
      const s = X(d, e, h);
      d = s.width, e = s.deltaW, a ? (t = e / a, u = d / a, g += e / 2 * w(o) - t / 2 * p(o), v += e / 2 * p(o) + t / 2 * w(o)) : (g += e / 2 * w(o), v += e / 2 * p(o));
      break;
    }
    case "top-right": {
      t = -t;
      const s = X(d, e, h);
      d = s.width, e = s.deltaW;
      const i = L(u, t, l);
      u = i.height, t = i.deltaH, a && (e = t * a, d = u * a), g += e / 2 * w(o) + t / 2 * p(o), v += e / 2 * p(o) - t / 2 * w(o);
      break;
    }
    case "bottom-right": {
      const s = X(d, e, h);
      d = s.width, e = s.deltaW;
      const i = L(u, t, l);
      u = i.height, t = i.deltaH, a && (e = t * a, d = u * a), g += e / 2 * w(o) - t / 2 * p(o), v += e / 2 * p(o) + t / 2 * w(o);
      break;
    }
    case "bottom": {
      const s = L(u, t, l);
      u = s.height, t = s.deltaH, a ? (e = t * a, d = u * a, g += e / 2 * w(o) - t / 2 * p(o), v += e / 2 * p(o) + t / 2 * w(o)) : (g -= t / 2 * p(o), v += t / 2 * w(o));
      break;
    }
    case "bottom-left": {
      e = -e;
      const s = X(d, e, h);
      d = s.width, e = s.deltaW;
      const i = L(u, t, l);
      u = i.height, t = i.deltaH, a && (u = d / a, t = e / a), g -= e / 2 * w(o) + t / 2 * p(o), v -= e / 2 * p(o) - t / 2 * w(o);
      break;
    }
    case "left": {
      e = -e;
      const s = X(d, e, h);
      d = s.width, e = s.deltaW, a ? (u = d / a, t = e / a, g -= e / 2 * w(o) + t / 2 * p(o), v -= e / 2 * p(o) - t / 2 * w(o)) : (g -= e / 2 * w(o), v -= e / 2 * p(o));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const s = X(d, e, h);
      d = s.width, e = s.deltaW;
      const i = L(u, t, l);
      u = i.height, t = i.deltaH, a && (d = u * a, e = t * a), g -= e / 2 * w(o) - t / 2 * p(o), v -= e / 2 * p(o) + t / 2 * w(o);
      break;
    }
    case "top": {
      t = -t;
      const s = L(u, t, l);
      u = s.height, t = s.deltaH, a ? (d = u * a, e = t * a, g += e / 2 * w(o) + t / 2 * p(o), v += e / 2 * p(o) - t / 2 * w(o)) : (g += t / 2 * p(o), v -= t / 2 * w(o));
      break;
    }
  }
  return {
    position: {
      centerX: g,
      centerY: v
    },
    size: {
      width: d * f,
      height: u * c
    }
  };
}, L = (r, n, e) => {
  const t = r + n;
  return t > e ? r = t : (n = e - r, r = e), { height: r, deltaH: n };
}, X = (r, n, e) => {
  const t = r + n;
  return t > e ? r = t : (n = e - r, r = e), { width: r, deltaW: n };
}, xe = ({ centerX: r, centerY: n, width: e, height: t, angle: a }) => ({
  top: n - t / 2,
  left: r - e / 2,
  width: e,
  height: t,
  angle: a
}), Se = (r, n, e) => {
  const { width: t, height: a } = r;
  return {
    width: Math.abs(t),
    height: Math.abs(a),
    left: n - Math.abs(t) / 2,
    top: e - Math.abs(a) / 2
  };
};
function $(r, n) {
  const e = Math.abs(r) % n, t = r > 0 ? n : -n;
  let a = 0;
  return e > n / 2 ? a = t * Math.ceil(Math.abs(r) / n) : a = t * Math.floor(Math.abs(r) / n), a;
}
function Ce(r, n, e) {
  const t = Y(!1), a = Y(!1), h = Y({
    width: n.width,
    height: n.height,
    left: n.left,
    top: n.top,
    angle: n.angle
  });
  function l(o) {
    if (n.disabled)
      return;
    t.value = !0, a.value = !0;
    let { clientX: f, clientY: c } = R(o);
    const { left: s, top: i } = h.value;
    let m = 0, y = 0;
    n.boundary && ([m, y] = d()), e && e("drag-start", h.value), U((E) => {
      const { clientX: B, clientY: I } = R(E);
      let A = (B - f) / n.scaleRatio + s, k = (I - c) / n.scaleRatio + i;
      if (n.snapToGrid) {
        let { left: _, top: b } = h.value;
        const V = A - _, G = k - b;
        A = _ + $(V, n.gridX), k = b + $(G, n.gridY);
      }
      n.boundary && ([A, k] = u(A, k, m, y)), h.value.left = A, h.value.top = k, e && e("drag", h.value);
    }, (E) => {
      t.value = !1, document.addEventListener("click", g, { once: !0 }), e && e("drag-end", h.value);
    });
  }
  const d = () => {
    const { width: o, height: f } = h.value, s = (r.value.parentElement || document.body).getBoundingClientRect(), i = s.width / n.scaleRatio - o, m = s.height / n.scaleRatio - f;
    return [i, m];
  }, u = (o, f, c, s) => (o = o < 0 ? 0 : o, o = o > c ? c : o, f = f < 0 ? 0 : f, f = f > s ? s : f, [o, f]), g = () => {
    a.value = !1;
  }, v = (o) => {
    if (t.value)
      return;
    let { left: f, top: c } = h.value;
    if (["ArrowRight", "ArrowLeft"].includes(o.key)) {
      const s = o.key === "ArrowRight";
      let i = s ? 1 : -1;
      n.snapToGrid && (i = s ? n.gridX : -n.gridX), f = f + i;
    } else if (["ArrowUp", "ArrowDown"].includes(o.key)) {
      const s = o.key === "ArrowDown";
      let i = s ? 1 : -1;
      n.snapToGrid && (i = s ? n.gridY : -n.gridY), c = c + i;
    }
    if (n.boundary) {
      const [s, i] = d();
      [f, c] = u(f, c, s, i);
    }
    h.value.left = f, h.value.top = c;
  };
  return be(() => {
    if (!r.value)
      return;
    const { width: o, height: f } = r.value.getBoundingClientRect();
    h.value = { ...h.value, width: o || 100, height: f || 100 }, r.value.addEventListener("mousedown", l), r.value.addEventListener("touchstart", l);
  }), K(a, (o) => {
    n.disabledKeyEvent || (o ? document.addEventListener("keydown", v) : document.removeEventListener("keydown", v));
  }), Me(() => {
    document.removeEventListener("keydown", v);
  }), {
    isMousedown: t,
    selected: a,
    dragData: h
  };
}
const $e = /* @__PURE__ */ C("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ C("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ C("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Ie = /* @__PURE__ */ ae({
  __name: "rotate",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    element: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue", "rotate", "rotate-start", "rotate-end"],
  setup(r, { emit: n }) {
    const e = r, t = Y(null), a = ce({
      get: () => e.modelValue,
      set: (l) => {
        n("update:modelValue", l);
      }
    });
    function h(l) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      l.stopPropagation(), l.preventDefault();
      const { width: d, height: u, left: g, top: v } = e.element.getBoundingClientRect(), o = g + d / 2, f = v + u / 2;
      n("rotate-start", a.value), U((c) => {
        const { clientX: s, clientY: i } = R(c), m = o - s, y = f - i, E = Math.atan2(y, m) * 180 / Math.PI - 90;
        a.value = (E + 360) % 360, n("rotate", a.value);
      }, () => {
        n("rotate-end", a.value);
      });
    }
    return (l, d) => (z(), F("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: h,
      onTouchstart: h
    }, [
      S(l.$slots, "default", {}, () => [
        $e
      ])
    ], 544));
  }
});
const Ve = ["data-side", "onMousedown", "onTouchstart"], Ge = /* @__PURE__ */ C("div", { class: "es-drager-dot-handle" }, null, -1), ie = /* @__PURE__ */ ae({
  __name: "drager",
  props: Ye,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(r, { emit: n }) {
    const e = r, t = (c, ...s) => {
      n(c, ...s), n("change", ...s);
    }, a = Y(null), { selected: h, dragData: l, isMousedown: d } = Ce(a, e, t), u = Y(re(0, e.resizeList)), g = ce(() => {
      const { width: c, height: s, left: i, top: m, angle: y } = l.value, D = {};
      return c && (D.width = x(c)), s && (D.height = x(s)), {
        ...D,
        left: x(i),
        top: x(m),
        zIndex: e.zIndex,
        transform: `rotate(${y}deg)`,
        "--es-drager-color": e.color
      };
    });
    function v(c) {
      a.value || (a.value = c.$el || c);
    }
    function o(c) {
      u.value = re(c, e.resizeList), t("rotate-end", l.value);
    }
    function f(c, s) {
      s.stopPropagation(), s.preventDefault();
      const { clientX: i, clientY: m } = R(s), y = i, D = m, { width: E, height: B, left: I, top: A } = l.value, k = I + E / 2, _ = A + B / 2, b = { width: E, height: B, centerX: k, centerY: _, rotateAngle: l.value.angle }, V = c.side, { minWidth: G, minHeight: le, aspectRatio: q } = e;
      t("resize-start", l.value), U((J) => {
        const { clientX: ue, clientY: de } = R(J);
        let N = (ue - y) / e.scaleRatio, T = (de - D) / e.scaleRatio;
        e.snapToGrid && (N = $(N, e.gridX), T = $(T, e.gridY));
        const he = Math.atan2(T, N), Q = Ne(N, T), fe = J.shiftKey, Z = he - j(b.rotateAngle), ge = Q * Math.cos(Z), ve = Q * Math.sin(Z), we = fe && !q ? b.width / b.height : q, {
          position: { centerX: H, centerY: W },
          size: { width: pe, height: me }
        } = Te(V, { ...b, rotateAngle: b.rotateAngle }, ge, ve, we, G, le), ye = xe({
          centerX: H,
          centerY: W,
          width: pe,
          height: me,
          angle: l.value.angle
        });
        l.value = {
          ...l.value,
          ...Se(ye, H, W)
        }, t("resize", l.value);
      }, () => {
        t("resize-end", l.value);
      });
    }
    return K(() => [
      e.width,
      e.height,
      e.left,
      e.top,
      e.angle
    ], ([c, s, i, m, y]) => {
      l.value = {
        ...l.value,
        width: c,
        height: s,
        left: i,
        top: m,
        angle: y
      };
    }), K(() => e.selected, (c) => {
      h.value = c;
    }, { immediate: !0 }), (c, s) => (z(), ee(De(c.tag), {
      ref: v,
      class: Ee(["es-drager", { disabled: c.disabled, dragging: M(d), selected: M(h), border: c.border }]),
      style: te(g.value),
      onClick: s[3] || (s[3] = ne(() => {
      }, ["stop"]))
    }, {
      default: oe(() => [
        S(c.$slots, "default"),
        !c.disabled && c.resizable ? (z(!0), F(Ae, { key: 0 }, ke(u.value, (i, m) => (z(), F("div", {
          key: m,
          class: "es-drager-dot",
          "data-side": i.side,
          style: te({ ...i }),
          onMousedown: ne((y) => f(i, y), ["stop", "prevent"]),
          onTouchstart: (y) => f(i, y)
        }, [
          S(c.$slots, "resize", Le(Xe({ side: i.side })), () => [
            Ge
          ])
        ], 44, Ve))), 128)) : se("", !0),
        !c.disabled && M(h) ? (z(), ee(Ie, {
          key: 1,
          modelValue: M(l).angle,
          "onUpdate:modelValue": s[0] || (s[0] = (i) => M(l).angle = i),
          "drag-data": M(l),
          element: a.value,
          onRotate: s[1] || (s[1] = (i) => t("rotate", M(l))),
          onRotateStart: s[2] || (s[2] = (i) => t("rotate-start", M(l))),
          onRotateEnd: o
        }, {
          default: oe(() => [
            S(c.$slots, "rotate")
          ]),
          _: 3
        }, 8, ["modelValue", "drag-data", "element"])) : se("", !0)
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
const Pe = (r) => {
  r.component("es-drager", ie);
};
ie.install = Pe;
export {
  ie as ESDrager,
  ie as default,
  Pe as install
};
