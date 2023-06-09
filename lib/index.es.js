import { ref as k, onMounted as ge, watch as T, onBeforeUnmount as ve, defineComponent as te, computed as ne, openBlock as z, createElementBlock as I, renderSlot as S, createElementVNode as V, normalizeClass as we, unref as M, normalizeStyle as J, withModifiers as Q, Fragment as me, renderList as pe, normalizeProps as ye, guardReactiveProps as be, createCommentVNode as H, createBlock as Me, withCtx as De } from "vue";
const ke = {
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
    default: 100
  },
  height: {
    type: Number,
    default: 100
  },
  left: {
    type: Number,
    default: 0
  },
  top: {
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
  disabledKeyEvent: Boolean
}, x = (r = 0) => parseInt(r + "") + "px", W = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, G = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ae = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Re = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Ee = (r, n) => {
  const e = Re[Math.floor(r / 30)], o = (Ae[n] + e) % 8;
  return G[o];
}, ee = (r = 0) => {
  let n = [];
  for (let e = 0; e < G.length; e++) {
    const t = G[e], [o, g] = W[t].split("-"), c = Ee(r, t), d = { [o]: "0%", cursor: c + "-resize", side: W[t] };
    if (g)
      d[g] = "0%";
    else {
      const h = ["top", "bottom"].includes(o) ? "left" : "top";
      d[h] = "50%";
    }
    n[e] = d;
  }
  return n;
}, P = (r) => r * Math.PI / 180, ze = (r, n) => Math.sqrt(r * r + n * n), w = (r) => Math.cos(P(r)), m = (r) => Math.sin(P(r)), Xe = (r, n, e, t, o, g, c) => {
  let { width: d, height: h, centerX: v, centerY: p, rotateAngle: a } = n;
  const l = d < 0 ? -1 : 1, i = h < 0 ? -1 : 1;
  switch (d = Math.abs(d), h = Math.abs(h), r) {
    case "right": {
      const s = R(d, e, g);
      d = s.width, e = s.deltaW, o ? (t = e / o, h = d / o, v += e / 2 * w(a) - t / 2 * m(a), p += e / 2 * m(a) + t / 2 * w(a)) : (v += e / 2 * w(a), p += e / 2 * m(a));
      break;
    }
    case "top-right": {
      t = -t;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (e = t * o, d = h * o), v += e / 2 * w(a) + t / 2 * m(a), p += e / 2 * m(a) - t / 2 * w(a);
      break;
    }
    case "bottom-right": {
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (e = t * o, d = h * o), v += e / 2 * w(a) - t / 2 * m(a), p += e / 2 * m(a) + t / 2 * w(a);
      break;
    }
    case "bottom": {
      const s = A(h, t, c);
      h = s.height, t = s.deltaH, o ? (e = t * o, d = h * o, v += e / 2 * w(a) - t / 2 * m(a), p += e / 2 * m(a) + t / 2 * w(a)) : (v -= t / 2 * m(a), p += t / 2 * w(a));
      break;
    }
    case "bottom-left": {
      e = -e;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (h = d / o, t = e / o), v -= e / 2 * w(a) + t / 2 * m(a), p -= e / 2 * m(a) - t / 2 * w(a);
      break;
    }
    case "left": {
      e = -e;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW, o ? (h = d / o, t = e / o, v -= e / 2 * w(a) + t / 2 * m(a), p -= e / 2 * m(a) - t / 2 * w(a)) : (v -= e / 2 * w(a), p -= e / 2 * m(a));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (d = h * o, e = t * o), v -= e / 2 * w(a) - t / 2 * m(a), p -= e / 2 * m(a) + t / 2 * w(a);
      break;
    }
    case "top": {
      t = -t;
      const s = A(h, t, c);
      h = s.height, t = s.deltaH, o ? (d = h * o, e = t * o, v += e / 2 * w(a) + t / 2 * m(a), p += e / 2 * m(a) - t / 2 * w(a)) : (v += t / 2 * m(a), p -= t / 2 * w(a));
      break;
    }
  }
  return {
    position: {
      centerX: v,
      centerY: p
    },
    size: {
      width: d * l,
      height: h * i
    }
  };
}, A = (r, n, e) => {
  const t = r + n;
  return t > e ? r = t : (n = e - r, r = e), { height: r, deltaH: n };
}, R = (r, n, e) => {
  const t = r + n;
  return t > e ? r = t : (n = e - r, r = e), { width: r, deltaW: n };
}, Ye = ({ centerX: r, centerY: n, width: e, height: t, angle: o }) => ({
  top: n - t / 2,
  left: r - e / 2,
  width: e,
  height: t,
  angle: o
}), _e = (r, n, e) => {
  const { width: t, height: o } = r;
  return {
    width: Math.abs(t),
    height: Math.abs(o),
    left: n - Math.abs(t) / 2,
    top: e - Math.abs(o) / 2
  };
};
function $(r, n) {
  const e = Math.abs(r) % n, t = r > 0 ? n : -n;
  let o = 0;
  return e > n / 2 ? o = t * Math.ceil(Math.abs(r) / n) : o = t * Math.floor(Math.abs(r) / n), o;
}
let Le = 1e3;
function Be(r, n, e) {
  const t = k(), o = k(!1), g = k(!1), c = k({
    width: n.width,
    height: n.height,
    left: n.left,
    top: n.top,
    angle: n.angle
  });
  function d(l) {
    if (n.disabled)
      return;
    o.value = !0, g.value = !0;
    let { clientX: i, clientY: s } = l;
    const { left: u, top: f } = c.value;
    r.value.style.zIndex = Ne();
    let b = 0, X = 0;
    n.boundary && ([b, X] = h()), e && e("drag-start", c.value), K((E) => {
      let D = (E.clientX - i) / n.scaleRatio + u, y = (E.clientY - s) / n.scaleRatio + f;
      if (n.snapToGrid) {
        let { left: Y, top: _ } = c.value;
        const C = D - Y, L = y - _;
        D = Y + $(C, n.gridX), y = _ + $(L, n.gridY);
      }
      n.boundary && ([D, y] = v(D, y, b, X)), c.value.left = D, c.value.top = y, e && e("drag", c.value);
    }, (E) => {
      o.value = !1, document.addEventListener("click", p, { once: !0 }), e && e("drag-end", c.value);
    });
  }
  const h = () => {
    const { width: l, height: i } = c.value, u = (r.value.parentElement || document.body).getBoundingClientRect(), f = u.width / n.scaleRatio - l, b = u.height / n.scaleRatio - i;
    return [f, b];
  }, v = (l, i, s, u) => (l = l < 0 ? 0 : l, l = l > s ? s : l, i = i < 0 ? 0 : i, i = i > u ? u : i, [l, i]), p = () => {
    g.value = !1;
  }, a = (l) => {
    if (o.value)
      return;
    let { left: i, top: s } = c.value;
    if (["ArrowRight", "ArrowLeft"].includes(l.key)) {
      const u = l.key === "ArrowRight";
      let f = u ? 1 : -1;
      n.snapToGrid && (f = u ? n.gridX : -n.gridX), i = i + f;
    } else if (["ArrowUp", "ArrowDown"].includes(l.key)) {
      const u = l.key === "ArrowDown";
      let f = u ? 1 : -1;
      n.snapToGrid && (f = u ? n.gridY : -n.gridY), s = s + f;
    }
    if (n.boundary) {
      const [u, f] = h();
      [i, s] = v(i, s, u, f);
    }
    c.value.left = i, c.value.top = s;
  };
  return ge(() => {
    r.value && r.value.addEventListener("mousedown", d);
  }), T(g, (l) => {
    n.disabledKeyEvent || (l ? document.addEventListener("keydown", a) : document.removeEventListener("keydown", a));
  }), ve(() => {
    document.removeEventListener("keydown", a);
  }), {
    isMousedown: o,
    selected: g,
    dragRef: t,
    dragData: c
  };
}
function Ne() {
  return ++Le + "";
}
function K(r, n) {
  const e = (t) => {
    n && n(t), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", e), document.removeEventListener("mouseleave", e);
  };
  document.addEventListener("mousemove", r), document.addEventListener("mouseup", e), document.addEventListener("mouseleave", e);
}
const xe = /* @__PURE__ */ V("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ V("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ V("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Ie = /* @__PURE__ */ te({
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
    const e = r, t = k(null), o = ne({
      get: () => e.modelValue,
      set: (c) => {
        n("update:modelValue", c);
      }
    });
    function g(c) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      c.stopPropagation(), c.preventDefault();
      const { width: d, height: h, left: v, top: p } = e.element.getBoundingClientRect(), a = v + d / 2, l = p + h / 2;
      n("rotate-start", o.value), K((i) => {
        const s = a - i.clientX, u = l - i.clientY, b = Math.atan2(u, s) * 180 / Math.PI - 90;
        o.value = (b + 360) % 360, n("rotate", o.value);
      }, () => {
        n("rotate-end", o.value);
      });
    }
    return (c, d) => (z(), I("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: g
    }, [
      S(c.$slots, "default", {}, () => [
        xe
      ])
    ], 544));
  }
});
const Se = ["data-side", "onMousedown"], Ve = /* @__PURE__ */ V("div", { class: "es-drager-dot-handle" }, null, -1), oe = /* @__PURE__ */ te({
  __name: "drager",
  props: ke,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(r, { emit: n }) {
    const e = r, t = (l, ...i) => {
      n(l, ...i), n("change", ...i);
    }, o = k(null), { selected: g, dragData: c, isMousedown: d } = Be(o, e, t), h = k(ee()), v = ne(() => {
      const { width: l, height: i, left: s, top: u, angle: f } = c.value;
      return {
        width: x(l),
        height: x(i),
        left: x(s),
        top: x(u),
        transform: `rotate(${f}deg)`,
        "--es-drager-color": e.color
      };
    });
    function p(l) {
      h.value = ee(l), t("rotate-end", c.value);
    }
    function a(l, i) {
      i.stopPropagation(), i.preventDefault();
      const s = i.clientX, u = i.clientY, { width: f, height: b, left: X, top: F } = c.value, E = X + f / 2, D = F + b / 2, y = { width: f, height: b, centerX: E, centerY: D, rotateAngle: c.value.angle }, Y = l.side, { minWidth: _, minHeight: C, aspectRatio: L } = e;
      t("resize-start", c.value), K((U) => {
        const { clientX: se, clientY: re } = U;
        let B = (se - s) / e.scaleRatio, N = (re - u) / e.scaleRatio;
        e.snapToGrid && (B = $(B, e.gridX), N = $(N, e.gridY));
        const ae = Math.atan2(N, B), q = ze(B, N), ce = U.shiftKey, O = ae - P(y.rotateAngle), ie = q * Math.cos(O), le = q * Math.sin(O), ue = ce && !L ? y.width / y.height : L, {
          position: { centerX: j, centerY: Z },
          size: { width: de, height: he }
        } = Xe(Y, { ...y, rotateAngle: y.rotateAngle }, ie, le, ue, _, C), fe = Ye({
          centerX: j,
          centerY: Z,
          width: de,
          height: he,
          angle: c.value.angle
        });
        c.value = {
          ...c.value,
          ..._e(fe, j, Z)
        }, t("resize", c.value);
      }, () => {
        t("resize-end", c.value);
      });
    }
    return T(() => [
      e.width,
      e.height,
      e.left,
      e.top,
      e.angle
    ], ([l, i, s, u, f]) => {
      c.value = {
        ...c.value,
        width: l,
        height: i,
        left: s,
        top: u,
        angle: f
      };
    }), T(() => e.selected, (l) => {
      g.value = l;
    }, { immediate: !0 }), (l, i) => (z(), I("div", {
      ref_key: "dragRef",
      ref: o,
      class: we(["es-drager", { disabled: l.disabled, dragging: M(d), selected: M(g) }]),
      style: J(M(v)),
      onClick: i[3] || (i[3] = Q(() => {
      }, ["stop"]))
    }, [
      S(l.$slots, "default"),
      !l.disabled && l.resizable ? (z(!0), I(me, { key: 0 }, pe(h.value, (s, u) => (z(), I("div", {
        key: u,
        class: "es-drager-dot",
        "data-side": s.side,
        style: J({ ...s }),
        onMousedown: Q((f) => a(s, f), ["stop", "prevent"])
      }, [
        S(l.$slots, "resize", ye(be({ side: s.side })), () => [
          Ve
        ])
      ], 44, Se))), 128)) : H("", !0),
      !l.disabled && M(g) ? (z(), Me(Ie, {
        key: 1,
        modelValue: M(c).angle,
        "onUpdate:modelValue": i[0] || (i[0] = (s) => M(c).angle = s),
        "drag-data": M(c),
        element: o.value,
        onRotate: i[1] || (i[1] = (s) => t("rotate", M(c))),
        onRotateStart: i[2] || (i[2] = (s) => t("rotate-start", M(c))),
        onRotateEnd: p
      }, {
        default: De(() => [
          S(l.$slots, "rotate")
        ]),
        _: 3
      }, 8, ["modelValue", "drag-data", "element"])) : H("", !0)
    ], 6));
  }
});
const $e = (r) => {
  r.component("es-drager", oe);
};
oe.install = $e;
export {
  oe as ESDrager,
  oe as default,
  $e as install
};
