import { ref as Y, onMounted as de, defineComponent as H, computed as W, openBlock as z, createElementBlock as L, createElementVNode as j, watch as he, normalizeClass as ge, unref as M, normalizeStyle as Z, withModifiers as fe, renderSlot as pe, withDirectives as me, Fragment as ve, renderList as we, vShow as be, createCommentVNode as G, createBlock as ye } from "vue";
const C = {
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
}, B = (n = 0) => parseInt(n + "") + "px", J = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, S = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Me = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, De = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Xe = (n, c) => {
  const e = De[Math.floor(n / 30)], s = (Me[c] + e) % 8;
  return S[s];
}, Q = (n = 0) => {
  let c = [];
  for (let e = 0; e < S.length; e++) {
    const t = S[e], [s, p] = J[t].split("-"), a = Xe(n, t), u = { [s]: "0%", cursor: a + "-resize", side: J[t] };
    if (p)
      u[p] = "0%";
    else {
      const i = ["top", "bottom"].includes(s) ? "left" : "top";
      u[i] = "50%";
    }
    c[e] = u;
  }
  return c;
}, V = (n) => n * Math.PI / 180, Ye = (n, c) => Math.sqrt(n * n + c * c), m = (n) => Math.cos(V(n)), v = (n) => Math.sin(V(n)), _e = (n, c, e, t, s, p, a) => {
  let { width: u, height: i, centerX: g, centerY: h, rotateAngle: r } = c;
  const f = u < 0 ? -1 : 1, l = i < 0 ? -1 : 1;
  switch (u = Math.abs(u), i = Math.abs(i), n) {
    case "right": {
      const o = k(u, e, p);
      u = o.width, e = o.deltaW, s ? (t = e / s, i = u / s, g += e / 2 * m(r) - t / 2 * v(r), h += e / 2 * v(r) + t / 2 * m(r)) : (g += e / 2 * m(r), h += e / 2 * v(r));
      break;
    }
    case "top-right": {
      t = -t;
      const o = k(u, e, p);
      u = o.width, e = o.deltaW;
      const d = A(i, t, a);
      i = d.height, t = d.deltaH, s && (e = t * s, u = i * s), g += e / 2 * m(r) + t / 2 * v(r), h += e / 2 * v(r) - t / 2 * m(r);
      break;
    }
    case "bottom-right": {
      const o = k(u, e, p);
      u = o.width, e = o.deltaW;
      const d = A(i, t, a);
      i = d.height, t = d.deltaH, s && (e = t * s, u = i * s), g += e / 2 * m(r) - t / 2 * v(r), h += e / 2 * v(r) + t / 2 * m(r);
      break;
    }
    case "bottom": {
      const o = A(i, t, a);
      i = o.height, t = o.deltaH, s ? (e = t * s, u = i * s, g += e / 2 * m(r) - t / 2 * v(r), h += e / 2 * v(r) + t / 2 * m(r)) : (g -= t / 2 * v(r), h += t / 2 * m(r));
      break;
    }
    case "bottom-left": {
      e = -e;
      const o = k(u, e, p);
      u = o.width, e = o.deltaW;
      const d = A(i, t, a);
      i = d.height, t = d.deltaH, s && (i = u / s, t = e / s), g -= e / 2 * m(r) + t / 2 * v(r), h -= e / 2 * v(r) - t / 2 * m(r);
      break;
    }
    case "left": {
      e = -e;
      const o = k(u, e, p);
      u = o.width, e = o.deltaW, s ? (i = u / s, t = e / s, g -= e / 2 * m(r) + t / 2 * v(r), h -= e / 2 * v(r) - t / 2 * m(r)) : (g -= e / 2 * m(r), h -= e / 2 * v(r));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const o = k(u, e, p);
      u = o.width, e = o.deltaW;
      const d = A(i, t, a);
      i = d.height, t = d.deltaH, s && (u = i * s, e = t * s), g -= e / 2 * m(r) - t / 2 * v(r), h -= e / 2 * v(r) + t / 2 * m(r);
      break;
    }
    case "top": {
      t = -t;
      const o = A(i, t, a);
      i = o.height, t = o.deltaH, s ? (u = i * s, e = t * s, g += e / 2 * m(r) + t / 2 * v(r), h += e / 2 * v(r) - t / 2 * m(r)) : (g += t / 2 * v(r), h -= t / 2 * m(r));
      break;
    }
  }
  return {
    position: {
      centerX: g,
      centerY: h
    },
    size: {
      width: u * f,
      height: i * l
    }
  };
}, A = (n, c, e) => {
  const t = n + c;
  return t > e ? n = t : (c = e - n, n = e), { height: n, deltaH: c };
}, k = (n, c, e) => {
  const t = n + c;
  return t > e ? n = t : (c = e - n, n = e), { width: n, deltaW: c };
}, Ae = ({ centerX: n, centerY: c, width: e, height: t, angle: s }) => ({
  top: c - t / 2,
  left: n - e / 2,
  width: e,
  height: t,
  angle: s
}), ke = (n, c, e) => {
  const { width: t, height: s } = n;
  return {
    width: Math.abs(t),
    height: Math.abs(s),
    left: c - Math.abs(t) / 2,
    top: e - Math.abs(s) / 2
  };
};
let ze = 1e3;
function xe(n, c, e) {
  const t = Y(), s = Y(!1), p = Y(!1), a = Y({
    width: c.width,
    height: c.height,
    left: c.left,
    top: c.top,
    angle: c.angle
  });
  function u(g) {
    if (c.disabled)
      return;
    s.value = !0, p.value = !0;
    const h = n.value;
    let { clientX: r, clientY: f } = g;
    const { width: l, height: o, left: d, top: b } = a.value;
    h.style.zIndex = ee();
    let D = 0, x = 0, E = 0, R = 0;
    if (c.boundary) {
      const w = (h.parentElement || document.body).getBoundingClientRect();
      D = w.left, x = w.left + w.width - l, E = w.top, R = w.top + w.height - o;
    }
    const I = r - d, X = f - b;
    e && e("drag-start", a.value), N((_) => {
      let w = _.clientX - I, y = _.clientY - X;
      c.boundary && (w = w < D ? D : w, w = w > x ? x : w, y = y < E ? E : y, y = y > R ? R : y), a.value.left = w, a.value.top = y, e && e("drag", a.value);
    }, (_) => {
      s.value = !1, document.addEventListener("click", i, { once: !0 }), e && e("drag-end", a.value);
    });
  }
  const i = () => {
    p.value = !1;
  };
  return de(() => {
    n.value && n.value.addEventListener("mousedown", u);
  }), {
    isMousedown: s,
    selected: p,
    dragRef: t,
    dragData: a
  };
}
function ee() {
  return ++ze + "";
}
function N(n, c) {
  const e = (t) => {
    c && c(t), document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", n), document.addEventListener("mouseup", e);
}
const Ee = Object.keys(C).reduce((n, c) => (n[c] = C[c].default, n), {}), $e = {
  mounted(n, c) {
    const e = { ...Ee, ...c.value || {} };
    n.classList.add("es-drager"), n.onmousedown = (t) => {
      const s = t.clientX, p = t.clientY, a = n.getBoundingClientRect();
      n.style.zIndex = ee();
      let u = 0, i = 0, g = 0, h = 0;
      if (e.boundary) {
        const o = (n.parentElement || document.body).getBoundingClientRect();
        u = o.left, i = o.left + o.width - a.width, g = o.top, h = o.top + o.height - a.height;
      }
      const r = s - a.left, f = p - a.top;
      N((l) => {
        let o = l.clientX - r, d = l.clientY - f;
        e.boundary && (o = o < u ? u : o, o = o > i ? i : o, d = d < g ? g : d, d = d > h ? h : d), n.style.left = o + "px", n.style.top = d + "px";
      });
    };
  },
  unmounted(n) {
    n.onmousedown = null;
  }
}, Re = /* @__PURE__ */ j("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ j("path", {
    fill: "currentColor",
    d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
  })
], -1), Le = [
  Re
], Be = /* @__PURE__ */ H({
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
  setup(n, { emit: c }) {
    const e = n, t = Y(null), s = W({
      get: () => e.modelValue,
      set: (a) => {
        c("update:modelValue", a);
      }
    });
    function p(a) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      a.stopPropagation(), a.preventDefault();
      const { width: u, height: i, left: g, top: h } = e.element.getBoundingClientRect(), r = g + u / 2, f = h + i / 2;
      c("rotate-start", s.value), N((l) => {
        const o = r - l.clientX, d = f - l.clientY, D = Math.atan2(d, o) * 180 / Math.PI - 90;
        s.value = (D + 360) % 360, c("rotate", s.value);
      }, () => {
        c("rotate-end", s.value);
      });
    }
    return (a, u) => (z(), L("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: p
    }, Le, 544));
  }
});
const Ne = { key: 0 }, Ie = ["data-side", "onMousedown"], Ce = /* @__PURE__ */ H({
  __name: "drager",
  props: C,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(n, { emit: c }) {
    const e = n, t = (f, ...l) => {
      c(f, ...l), c("change", ...l);
    }, s = Y(null), { selected: p, dragData: a, isMousedown: u } = xe(s, e, t), i = Y(Q()), g = W(() => {
      const { width: f, height: l, left: o, top: d, angle: b } = a.value;
      return {
        width: B(f),
        height: B(l),
        left: B(o),
        top: B(d),
        transform: `rotate(${b}deg)`,
        "--es-drager-color": e.color
      };
    });
    function h(f) {
      i.value = Q(f), t("rotate-end", a.value);
    }
    function r(f, l) {
      l.stopPropagation(), l.preventDefault();
      const o = l.clientX, d = l.clientY, { width: b, height: D, left: x, top: E } = a.value, R = x + b / 2, I = E + D / 2, X = { width: b, height: D, centerX: R, centerY: I, rotateAngle: a.value.angle }, $ = f.side, { minWidth: _, minHeight: w, aspectRatio: y } = e;
      t("resize-start", a.value), N((P) => {
        const { clientX: te, clientY: ne } = P, F = te - o, O = ne - d, oe = Math.atan2(O, F), T = Ye(F, O), se = P.shiftKey, q = oe - V(X.rotateAngle), re = T * Math.cos(q), ce = T * Math.sin(q), ae = se && !y ? X.width / X.height : y, {
          position: { centerX: K, centerY: U },
          size: { width: ue, height: ie }
        } = _e($, { ...X, rotateAngle: X.rotateAngle }, re, ce, ae, _, w), le = Ae({ centerX: K, centerY: U, width: ue, height: ie, angle: a.value.angle });
        a.value = { ...a.value, ...ke(le, K, U) }, t("resize", a.value);
      }, () => {
        t("resize-end", a.value);
      });
    }
    return he(() => [e.width, e.height, e.left, e.top, e.angle], ([f, l, o, d, b]) => {
      a.value = { ...a.value, width: f, height: l, left: o, top: d, angle: b };
    }), (f, l) => (z(), L("div", {
      ref_key: "dragRef",
      ref: s,
      class: ge(["es-drager", { disabled: f.disabled, dragging: M(u) }]),
      style: Z(M(g)),
      onClick: l[3] || (l[3] = fe(() => {
      }, ["stop"]))
    }, [
      pe(f.$slots, "default"),
      !f.disabled && f.resizable ? me((z(), L("div", Ne, [
        (z(!0), L(ve, null, we(i.value, (o, d) => (z(), L("div", {
          key: d,
          class: "es-drager-dot",
          "data-side": o.side,
          style: Z({ ...o }),
          onMousedown: (b) => r(o, b)
        }, null, 44, Ie))), 128))
      ], 512)), [
        [be, M(p)]
      ]) : G("", !0),
      !f.disabled && M(p) ? (z(), ye(Be, {
        key: 1,
        modelValue: M(a).angle,
        "onUpdate:modelValue": l[0] || (l[0] = (o) => M(a).angle = o),
        "drag-data": M(a),
        element: s.value,
        onRotate: l[1] || (l[1] = (o) => t("rotate", M(a))),
        onRotateStart: l[2] || (l[2] = (o) => t("rotate-start", M(a))),
        onRotateEnd: h
      }, null, 8, ["modelValue", "drag-data", "element"])) : G("", !0)
    ], 6));
  }
});
const Pe = (n) => {
  n.component("es-drager", Ce);
};
export {
  $e as Drager,
  C as DragerProps,
  Ae as centerToTL,
  S as cursorDirectionArray,
  Ce as default,
  V as degToRadian,
  ke as formatData,
  Xe as getCursor,
  Q as getDotList,
  Ye as getLength,
  _e as getNewStyle,
  Pe as install,
  J as resizableMap,
  B as withUnit
};
