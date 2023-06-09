import { ref as k, onMounted as fe, watch as T, onBeforeUnmount as ge, defineComponent as ee, computed as te, openBlock as E, createElementBlock as I, renderSlot as S, createElementVNode as V, normalizeClass as we, unref as M, normalizeStyle as J, withModifiers as ve, Fragment as pe, renderList as me, normalizeProps as ye, guardReactiveProps as be, createCommentVNode as Q, createBlock as Me, withCtx as De } from "vue";
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
}, x = (r = 0) => parseInt(r + "") + "px", H = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, G = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ae = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Re = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, ze = (r, n) => {
  const e = Re[Math.floor(r / 30)], o = (Ae[n] + e) % 8;
  return G[o];
}, W = (r = 0) => {
  let n = [];
  for (let e = 0; e < G.length; e++) {
    const t = G[e], [o, g] = H[t].split("-"), c = ze(r, t), d = { [o]: "0%", cursor: c + "-resize", side: H[t] };
    if (g)
      d[g] = "0%";
    else {
      const h = ["top", "bottom"].includes(o) ? "left" : "top";
      d[h] = "50%";
    }
    n[e] = d;
  }
  return n;
}, P = (r) => r * Math.PI / 180, Ee = (r, n) => Math.sqrt(r * r + n * n), v = (r) => Math.cos(P(r)), p = (r) => Math.sin(P(r)), Xe = (r, n, e, t, o, g, c) => {
  let { width: d, height: h, centerX: w, centerY: m, rotateAngle: a } = n;
  const l = d < 0 ? -1 : 1, i = h < 0 ? -1 : 1;
  switch (d = Math.abs(d), h = Math.abs(h), r) {
    case "right": {
      const s = R(d, e, g);
      d = s.width, e = s.deltaW, o ? (t = e / o, h = d / o, w += e / 2 * v(a) - t / 2 * p(a), m += e / 2 * p(a) + t / 2 * v(a)) : (w += e / 2 * v(a), m += e / 2 * p(a));
      break;
    }
    case "top-right": {
      t = -t;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (e = t * o, d = h * o), w += e / 2 * v(a) + t / 2 * p(a), m += e / 2 * p(a) - t / 2 * v(a);
      break;
    }
    case "bottom-right": {
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (e = t * o, d = h * o), w += e / 2 * v(a) - t / 2 * p(a), m += e / 2 * p(a) + t / 2 * v(a);
      break;
    }
    case "bottom": {
      const s = A(h, t, c);
      h = s.height, t = s.deltaH, o ? (e = t * o, d = h * o, w += e / 2 * v(a) - t / 2 * p(a), m += e / 2 * p(a) + t / 2 * v(a)) : (w -= t / 2 * p(a), m += t / 2 * v(a));
      break;
    }
    case "bottom-left": {
      e = -e;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (h = d / o, t = e / o), w -= e / 2 * v(a) + t / 2 * p(a), m -= e / 2 * p(a) - t / 2 * v(a);
      break;
    }
    case "left": {
      e = -e;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW, o ? (h = d / o, t = e / o, w -= e / 2 * v(a) + t / 2 * p(a), m -= e / 2 * p(a) - t / 2 * v(a)) : (w -= e / 2 * v(a), m -= e / 2 * p(a));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const s = R(d, e, g);
      d = s.width, e = s.deltaW;
      const u = A(h, t, c);
      h = u.height, t = u.deltaH, o && (d = h * o, e = t * o), w -= e / 2 * v(a) - t / 2 * p(a), m -= e / 2 * p(a) + t / 2 * v(a);
      break;
    }
    case "top": {
      t = -t;
      const s = A(h, t, c);
      h = s.height, t = s.deltaH, o ? (d = h * o, e = t * o, w += e / 2 * v(a) + t / 2 * p(a), m += e / 2 * p(a) - t / 2 * v(a)) : (w += t / 2 * p(a), m -= t / 2 * v(a));
      break;
    }
  }
  return {
    position: {
      centerX: w,
      centerY: m
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
let Be = 1e3;
function Le(r, n, e) {
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
    n.boundary && ([b, X] = h()), e && e("drag-start", c.value), K((z) => {
      let D = (z.clientX - i) / n.scaleRatio + u, y = (z.clientY - s) / n.scaleRatio + f;
      if (n.snapToGrid) {
        let { left: Y, top: _ } = c.value;
        const C = D - Y, B = y - _;
        D = Y + $(C, n.gridX), y = _ + $(B, n.gridY);
      }
      n.boundary && ([D, y] = w(D, y, b, X)), c.value.left = D, c.value.top = y, e && e("drag", c.value);
    }, (z) => {
      o.value = !1, document.addEventListener("click", m, { once: !0 }), e && e("drag-end", c.value);
    });
  }
  const h = () => {
    const { width: l, height: i } = c.value, u = (r.value.parentElement || document.body).getBoundingClientRect(), f = u.width / n.scaleRatio - l, b = u.height / n.scaleRatio - i;
    return [f, b];
  }, w = (l, i, s, u) => (l = l < 0 ? 0 : l, l = l > s ? s : l, i = i < 0 ? 0 : i, i = i > u ? u : i, [l, i]), m = () => {
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
      [i, s] = w(i, s, u, f);
    }
    c.value.left = i, c.value.top = s;
  };
  return fe(() => {
    r.value && r.value.addEventListener("mousedown", d);
  }), T(g, (l) => {
    n.disabledKeyEvent || (l ? document.addEventListener("keydown", a) : document.removeEventListener("keydown", a));
  }), ge(() => {
    document.removeEventListener("keydown", a);
  }), {
    isMousedown: o,
    selected: g,
    dragRef: t,
    dragData: c
  };
}
function Ne() {
  return ++Be + "";
}
function K(r, n) {
  const e = (t) => {
    n && n(t), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", r), document.addEventListener("mouseup", e);
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
], -1), Ie = /* @__PURE__ */ ee({
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
    const e = r, t = k(null), o = te({
      get: () => e.modelValue,
      set: (c) => {
        n("update:modelValue", c);
      }
    });
    function g(c) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      c.stopPropagation(), c.preventDefault();
      const { width: d, height: h, left: w, top: m } = e.element.getBoundingClientRect(), a = w + d / 2, l = m + h / 2;
      n("rotate-start", o.value), K((i) => {
        const s = a - i.clientX, u = l - i.clientY, b = Math.atan2(u, s) * 180 / Math.PI - 90;
        o.value = (b + 360) % 360, n("rotate", o.value);
      }, () => {
        n("rotate-end", o.value);
      });
    }
    return (c, d) => (E(), I("div", {
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
const Se = ["data-side", "onMousedown"], Ve = /* @__PURE__ */ V("div", { class: "es-drager-dot-handle" }, null, -1), ne = /* @__PURE__ */ ee({
  __name: "drager",
  props: ke,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(r, { emit: n }) {
    const e = r, t = (l, ...i) => {
      n(l, ...i), n("change", ...i);
    }, o = k(null), { selected: g, dragData: c, isMousedown: d } = Le(o, e, t), h = k(W()), w = te(() => {
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
    function m(l) {
      h.value = W(l), t("rotate-end", c.value);
    }
    function a(l, i) {
      i.stopPropagation(), i.preventDefault();
      const s = i.clientX, u = i.clientY, { width: f, height: b, left: X, top: F } = c.value, z = X + f / 2, D = F + b / 2, y = { width: f, height: b, centerX: z, centerY: D, rotateAngle: c.value.angle }, Y = l.side, { minWidth: _, minHeight: C, aspectRatio: B } = e;
      t("resize-start", c.value), K((U) => {
        const { clientX: oe, clientY: se } = U;
        let L = (oe - s) / e.scaleRatio, N = (se - u) / e.scaleRatio;
        e.snapToGrid && (L = $(L, e.gridX), N = $(N, e.gridY));
        const re = Math.atan2(N, L), q = Ee(L, N), ae = U.shiftKey, O = re - P(y.rotateAngle), ce = q * Math.cos(O), ie = q * Math.sin(O), le = ae && !B ? y.width / y.height : B, {
          position: { centerX: j, centerY: Z },
          size: { width: ue, height: de }
        } = Xe(Y, { ...y, rotateAngle: y.rotateAngle }, ce, ie, le, _, C), he = Ye({
          centerX: j,
          centerY: Z,
          width: ue,
          height: de,
          angle: c.value.angle
        });
        c.value = {
          ...c.value,
          ..._e(he, j, Z)
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
    }, { immediate: !0 }), (l, i) => (E(), I("div", {
      ref_key: "dragRef",
      ref: o,
      class: we(["es-drager", { disabled: l.disabled, dragging: M(d), selected: M(g) }]),
      style: J(M(w)),
      onClick: i[3] || (i[3] = ve(() => {
      }, ["stop"]))
    }, [
      S(l.$slots, "default"),
      !l.disabled && l.resizable ? (E(!0), I(pe, { key: 0 }, me(h.value, (s, u) => (E(), I("div", {
        key: u,
        class: "es-drager-dot",
        "data-side": s.side,
        style: J({ ...s }),
        onMousedown: (f) => a(s, f)
      }, [
        S(l.$slots, "resize", ye(be({ side: s.side })), () => [
          Ve
        ])
      ], 44, Se))), 128)) : Q("", !0),
      !l.disabled && M(g) ? (E(), Me(Ie, {
        key: 1,
        modelValue: M(c).angle,
        "onUpdate:modelValue": i[0] || (i[0] = (s) => M(c).angle = s),
        "drag-data": M(c),
        element: o.value,
        onRotate: i[1] || (i[1] = (s) => t("rotate", M(c))),
        onRotateStart: i[2] || (i[2] = (s) => t("rotate-start", M(c))),
        onRotateEnd: m
      }, {
        default: De(() => [
          S(l.$slots, "rotate")
        ]),
        _: 3
      }, 8, ["modelValue", "drag-data", "element"])) : Q("", !0)
    ], 6));
  }
});
const $e = (r) => {
  r.component("es-drager", ne);
};
ne.install = $e;
export {
  ne as ESDrager,
  ne as default,
  $e as install
};
