import { ref as Y, onMounted as ge, defineComponent as ee, computed as te, openBlock as k, createElementBlock as x, renderSlot as N, createElementVNode as C, watch as fe, normalizeClass as pe, unref as M, normalizeStyle as G, withModifiers as me, withDirectives as ve, Fragment as we, renderList as be, normalizeProps as ye, guardReactiveProps as Me, vShow as De, createCommentVNode as J, createBlock as Xe, withCtx as Ye } from "vue";
const V = {
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
  }
}, B = (n = 0) => parseInt(n + "") + "px", Q = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, $ = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], ze = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Ae = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, _e = (n, a) => {
  const e = Ae[Math.floor(n / 30)], s = (ze[a] + e) % 8;
  return $[s];
}, H = (n = 0) => {
  let a = [];
  for (let e = 0; e < $.length; e++) {
    const t = $[e], [s, p] = Q[t].split("-"), c = _e(n, t), i = { [s]: "0%", cursor: c + "-resize", side: Q[t] };
    if (p)
      i[p] = "0%";
    else {
      const l = ["top", "bottom"].includes(s) ? "left" : "top";
      i[l] = "50%";
    }
    a[e] = i;
  }
  return a;
}, P = (n) => n * Math.PI / 180, ke = (n, a) => Math.sqrt(n * n + a * a), m = (n) => Math.cos(P(n)), v = (n) => Math.sin(P(n)), Re = (n, a, e, t, s, p, c) => {
  let { width: i, height: l, centerX: f, centerY: g, rotateAngle: r } = a;
  const h = i < 0 ? -1 : 1, u = l < 0 ? -1 : 1;
  switch (i = Math.abs(i), l = Math.abs(l), n) {
    case "right": {
      const o = _(i, e, p);
      i = o.width, e = o.deltaW, s ? (t = e / s, l = i / s, f += e / 2 * m(r) - t / 2 * v(r), g += e / 2 * v(r) + t / 2 * m(r)) : (f += e / 2 * m(r), g += e / 2 * v(r));
      break;
    }
    case "top-right": {
      t = -t;
      const o = _(i, e, p);
      i = o.width, e = o.deltaW;
      const d = A(l, t, c);
      l = d.height, t = d.deltaH, s && (e = t * s, i = l * s), f += e / 2 * m(r) + t / 2 * v(r), g += e / 2 * v(r) - t / 2 * m(r);
      break;
    }
    case "bottom-right": {
      const o = _(i, e, p);
      i = o.width, e = o.deltaW;
      const d = A(l, t, c);
      l = d.height, t = d.deltaH, s && (e = t * s, i = l * s), f += e / 2 * m(r) - t / 2 * v(r), g += e / 2 * v(r) + t / 2 * m(r);
      break;
    }
    case "bottom": {
      const o = A(l, t, c);
      l = o.height, t = o.deltaH, s ? (e = t * s, i = l * s, f += e / 2 * m(r) - t / 2 * v(r), g += e / 2 * v(r) + t / 2 * m(r)) : (f -= t / 2 * v(r), g += t / 2 * m(r));
      break;
    }
    case "bottom-left": {
      e = -e;
      const o = _(i, e, p);
      i = o.width, e = o.deltaW;
      const d = A(l, t, c);
      l = d.height, t = d.deltaH, s && (l = i / s, t = e / s), f -= e / 2 * m(r) + t / 2 * v(r), g -= e / 2 * v(r) - t / 2 * m(r);
      break;
    }
    case "left": {
      e = -e;
      const o = _(i, e, p);
      i = o.width, e = o.deltaW, s ? (l = i / s, t = e / s, f -= e / 2 * m(r) + t / 2 * v(r), g -= e / 2 * v(r) - t / 2 * m(r)) : (f -= e / 2 * m(r), g -= e / 2 * v(r));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const o = _(i, e, p);
      i = o.width, e = o.deltaW;
      const d = A(l, t, c);
      l = d.height, t = d.deltaH, s && (i = l * s, e = t * s), f -= e / 2 * m(r) - t / 2 * v(r), g -= e / 2 * v(r) + t / 2 * m(r);
      break;
    }
    case "top": {
      t = -t;
      const o = A(l, t, c);
      l = o.height, t = o.deltaH, s ? (i = l * s, e = t * s, f += e / 2 * m(r) + t / 2 * v(r), g += e / 2 * v(r) - t / 2 * m(r)) : (f += t / 2 * v(r), g -= t / 2 * m(r));
      break;
    }
  }
  return {
    position: {
      centerX: f,
      centerY: g
    },
    size: {
      width: i * h,
      height: l * u
    }
  };
}, A = (n, a, e) => {
  const t = n + a;
  return t > e ? n = t : (a = e - n, n = e), { height: n, deltaH: a };
}, _ = (n, a, e) => {
  const t = n + a;
  return t > e ? n = t : (a = e - n, n = e), { width: n, deltaW: a };
}, Ee = ({ centerX: n, centerY: a, width: e, height: t, angle: s }) => ({
  top: a - t / 2,
  left: n - e / 2,
  width: e,
  height: t,
  angle: s
}), xe = (n, a, e) => {
  const { width: t, height: s } = n;
  return {
    width: Math.abs(t),
    height: Math.abs(s),
    left: a - Math.abs(t) / 2,
    top: e - Math.abs(s) / 2
  };
};
let Le = 1e3;
function Be(n, a, e) {
  const t = Y(), s = Y(!1), p = Y(!1), c = Y({
    width: a.width,
    height: a.height,
    left: a.left,
    top: a.top,
    angle: a.angle
  });
  function i(f) {
    if (a.disabled)
      return;
    s.value = !0, p.value = !0;
    const g = n.value;
    let { clientX: r, clientY: h } = f;
    const { width: u, height: o, left: d, top: b } = c.value;
    g.style.zIndex = ne();
    let D = 0, R = 0, L = 0, E = 0;
    if (a.boundary) {
      const w = (g.parentElement || document.body).getBoundingClientRect();
      R = w.width - u, E = w.height - o;
    }
    const S = r - d, X = h - b;
    e && e("drag-start", c.value), I((z) => {
      let w = z.clientX - S, y = z.clientY - X;
      a.boundary && (w = w < D ? D : w, w = w > R ? R : w, y = y < L ? L : y, y = y > E ? E : y), c.value.left = w, c.value.top = y, e && e("drag", c.value);
    }, (z) => {
      s.value = !1, document.addEventListener("click", l, { once: !0 }), e && e("drag-end", c.value);
    });
  }
  const l = () => {
    p.value = !1;
  };
  return ge(() => {
    n.value && n.value.addEventListener("mousedown", i);
  }), {
    isMousedown: s,
    selected: p,
    dragRef: t,
    dragData: c
  };
}
function ne() {
  return ++Le + "";
}
function I(n, a) {
  const e = (t) => {
    a && a(t), document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", n), document.addEventListener("mouseup", e);
}
const Ne = Object.keys(V).reduce((n, a) => (n[a] = V[a].default, n), {}), Oe = {
  mounted(n, a) {
    const e = { ...Ne, ...a.value || {} };
    n.classList.add("es-drager"), n.onmousedown = (t) => {
      const s = t.clientX, p = t.clientY, c = n.getBoundingClientRect();
      n.style.zIndex = ne();
      let i = 0, l = 0, f = 0, g = 0;
      if (e.boundary) {
        const o = (n.parentElement || document.body).getBoundingClientRect();
        i = o.left, l = o.left + o.width - c.width, f = o.top, g = o.top + o.height - c.height;
      }
      const r = s - c.left, h = p - c.top;
      I((u) => {
        let o = u.clientX - r, d = u.clientY - h;
        e.boundary && (o = o < i ? i : o, o = o > l ? l : o, d = d < f ? f : d, d = d > g ? g : d), n.style.left = o + "px", n.style.top = d + "px";
      });
    };
  },
  unmounted(n) {
    n.onmousedown = null;
  }
}, Ce = /* @__PURE__ */ C("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ C("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ C("path", {
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
  setup(n, { emit: a }) {
    const e = n, t = Y(null), s = te({
      get: () => e.modelValue,
      set: (c) => {
        a("update:modelValue", c);
      }
    });
    function p(c) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      c.stopPropagation(), c.preventDefault();
      const { width: i, height: l, left: f, top: g } = e.element.getBoundingClientRect(), r = f + i / 2, h = g + l / 2;
      a("rotate-start", s.value), I((u) => {
        const o = r - u.clientX, d = h - u.clientY, D = Math.atan2(d, o) * 180 / Math.PI - 90;
        s.value = (D + 360) % 360, a("rotate", s.value);
      }, () => {
        a("rotate-end", s.value);
      });
    }
    return (c, i) => (k(), x("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: p
    }, [
      N(c.$slots, "default", {}, () => [
        Ce
      ])
    ], 544));
  }
});
const Se = { key: 0 }, Ve = ["data-side", "onMousedown"], $e = /* @__PURE__ */ C("div", { class: "es-drager-dot-handle" }, null, -1), W = /* @__PURE__ */ ee({
  __name: "drager",
  props: V,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(n, { emit: a }) {
    const e = n, t = (h, ...u) => {
      a(h, ...u), a("change", ...u);
    }, s = Y(null), { selected: p, dragData: c, isMousedown: i } = Be(s, e, t), l = Y(H()), f = te(() => {
      const { width: h, height: u, left: o, top: d, angle: b } = c.value;
      return {
        width: B(h),
        height: B(u),
        left: B(o),
        top: B(d),
        transform: `rotate(${b}deg)`,
        "--es-drager-color": e.color
      };
    });
    function g(h) {
      l.value = H(h), t("rotate-end", c.value);
    }
    function r(h, u) {
      u.stopPropagation(), u.preventDefault();
      const o = u.clientX, d = u.clientY, { width: b, height: D, left: R, top: L } = c.value, E = R + b / 2, S = L + D / 2, X = { width: b, height: D, centerX: E, centerY: S, rotateAngle: c.value.angle }, F = h.side, { minWidth: z, minHeight: w, aspectRatio: y } = e;
      t("resize-start", c.value), I((O) => {
        const { clientX: oe, clientY: se } = O, T = oe - o, q = se - d, re = Math.atan2(q, T), K = ke(T, q), ae = O.shiftKey, U = re - P(X.rotateAngle), ce = K * Math.cos(U), ie = K * Math.sin(U), le = ae && !y ? X.width / X.height : y, {
          position: { centerX: j, centerY: Z },
          size: { width: ue, height: de }
        } = Re(F, { ...X, rotateAngle: X.rotateAngle }, ce, ie, le, z, w), he = Ee({ centerX: j, centerY: Z, width: ue, height: de, angle: c.value.angle });
        c.value = { ...c.value, ...xe(he, j, Z) }, t("resize", c.value);
      }, () => {
        t("resize-end", c.value);
      });
    }
    return fe(() => [e.width, e.height, e.left, e.top, e.angle], ([h, u, o, d, b]) => {
      c.value = { ...c.value, width: h, height: u, left: o, top: d, angle: b };
    }), (h, u) => (k(), x("div", {
      ref_key: "dragRef",
      ref: s,
      class: pe(["es-drager", { disabled: h.disabled, dragging: M(i) }]),
      style: G(M(f)),
      onClick: u[3] || (u[3] = me(() => {
      }, ["stop"]))
    }, [
      N(h.$slots, "default"),
      !h.disabled && h.resizable ? ve((k(), x("div", Se, [
        (k(!0), x(we, null, be(l.value, (o, d) => (k(), x("div", {
          key: d,
          class: "es-drager-dot",
          "data-side": o.side,
          style: G({ ...o }),
          onMousedown: (b) => r(o, b)
        }, [
          N(h.$slots, "resize", ye(Me({ side: o.side })), () => [
            $e
          ])
        ], 44, Ve))), 128))
      ], 512)), [
        [De, M(p)]
      ]) : J("", !0),
      !h.disabled && M(p) ? (k(), Xe(Ie, {
        key: 1,
        modelValue: M(c).angle,
        "onUpdate:modelValue": u[0] || (u[0] = (o) => M(c).angle = o),
        "drag-data": M(c),
        element: s.value,
        onRotate: u[1] || (u[1] = (o) => t("rotate", M(c))),
        onRotateStart: u[2] || (u[2] = (o) => t("rotate-start", M(c))),
        onRotateEnd: g
      }, {
        default: Ye(() => [
          N(h.$slots, "rotate")
        ]),
        _: 3
      }, 8, ["modelValue", "drag-data", "element"])) : J("", !0)
    ], 6));
  }
});
W.install = (n) => {
  n.component("es-drager", W);
};
export {
  Oe as Drager,
  V as DragerProps,
  Ee as centerToTL,
  $ as cursorDirectionArray,
  W as default,
  P as degToRadian,
  xe as formatData,
  _e as getCursor,
  H as getDotList,
  ke as getLength,
  Re as getNewStyle,
  Q as resizableMap,
  B as withUnit
};
