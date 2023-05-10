import { ref as Y, onMounted as he, defineComponent as W, computed as ee, openBlock as z, createElementBlock as R, createElementVNode as j, watch as ge, normalizeClass as fe, unref as M, normalizeStyle as Z, withModifiers as pe, renderSlot as me, withDirectives as ve, Fragment as we, renderList as be, vShow as ye, createCommentVNode as G, createBlock as Me } from "vue";
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
}, S = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], De = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Xe = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Ye = (n, c) => {
  const e = Xe[Math.floor(n / 30)], s = (De[c] + e) % 8;
  return S[s];
}, Q = (n = 0) => {
  let c = [];
  for (let e = 0; e < S.length; e++) {
    const t = S[e], [s, p] = J[t].split("-"), a = Ye(n, t), u = { [s]: "0%", cursor: a + "-resize", side: J[t] };
    if (p)
      u[p] = "0%";
    else {
      const i = ["top", "bottom"].includes(s) ? "left" : "top";
      u[i] = "50%";
    }
    c[e] = u;
  }
  return c;
}, V = (n) => n * Math.PI / 180, _e = (n, c) => Math.sqrt(n * n + c * c), m = (n) => Math.cos(V(n)), v = (n) => Math.sin(V(n)), Ae = (n, c, e, t, s, p, a) => {
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
}, ke = ({ centerX: n, centerY: c, width: e, height: t, angle: s }) => ({
  top: c - t / 2,
  left: n - e / 2,
  width: e,
  height: t,
  angle: s
}), ze = (n, c, e) => {
  const { width: t, height: s } = n;
  return {
    width: Math.abs(t),
    height: Math.abs(s),
    left: c - Math.abs(t) / 2,
    top: e - Math.abs(s) / 2
  };
};
let xe = 1e3;
function Ee(n, c, e) {
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
    h.style.zIndex = te();
    let D = 0, x = 0, L = 0, E = 0;
    if (c.boundary) {
      const w = (h.parentElement || document.body).getBoundingClientRect();
      x = w.width - l, E = w.height - o;
    }
    const I = r - d, X = f - b;
    e && e("drag-start", a.value), N((_) => {
      let w = _.clientX - I, y = _.clientY - X;
      c.boundary && (w = w < D ? D : w, w = w > x ? x : w, y = y < L ? L : y, y = y > E ? E : y), a.value.left = w, a.value.top = y, e && e("drag", a.value);
    }, (_) => {
      s.value = !1, document.addEventListener("click", i, { once: !0 }), e && e("drag-end", a.value);
    });
  }
  const i = () => {
    p.value = !1;
  };
  return he(() => {
    n.value && n.value.addEventListener("mousedown", u);
  }), {
    isMousedown: s,
    selected: p,
    dragRef: t,
    dragData: a
  };
}
function te() {
  return ++xe + "";
}
function N(n, c) {
  const e = (t) => {
    c && c(t), document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", n), document.addEventListener("mouseup", e);
}
const Re = Object.keys(C).reduce((n, c) => (n[c] = C[c].default, n), {}), $e = {
  mounted(n, c) {
    const e = { ...Re, ...c.value || {} };
    n.classList.add("es-drager"), n.onmousedown = (t) => {
      const s = t.clientX, p = t.clientY, a = n.getBoundingClientRect();
      n.style.zIndex = te();
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
}, Le = /* @__PURE__ */ j("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ j("path", {
    fill: "currentColor",
    d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
  })
], -1), Be = [
  Le
], Ne = /* @__PURE__ */ W({
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
    const e = n, t = Y(null), s = ee({
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
    return (a, u) => (z(), R("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: p
    }, Be, 544));
  }
});
const Ie = { key: 0 }, Ce = ["data-side", "onMousedown"], H = /* @__PURE__ */ W({
  __name: "drager",
  props: C,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(n, { emit: c }) {
    const e = n, t = (f, ...l) => {
      c(f, ...l), c("change", ...l);
    }, s = Y(null), { selected: p, dragData: a, isMousedown: u } = Ee(s, e, t), i = Y(Q()), g = ee(() => {
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
      const o = l.clientX, d = l.clientY, { width: b, height: D, left: x, top: L } = a.value, E = x + b / 2, I = L + D / 2, X = { width: b, height: D, centerX: E, centerY: I, rotateAngle: a.value.angle }, $ = f.side, { minWidth: _, minHeight: w, aspectRatio: y } = e;
      t("resize-start", a.value), N((P) => {
        const { clientX: ne, clientY: oe } = P, F = ne - o, O = oe - d, se = Math.atan2(O, F), T = _e(F, O), re = P.shiftKey, q = se - V(X.rotateAngle), ce = T * Math.cos(q), ae = T * Math.sin(q), ue = re && !y ? X.width / X.height : y, {
          position: { centerX: K, centerY: U },
          size: { width: ie, height: le }
        } = Ae($, { ...X, rotateAngle: X.rotateAngle }, ce, ae, ue, _, w), de = ke({ centerX: K, centerY: U, width: ie, height: le, angle: a.value.angle });
        a.value = { ...a.value, ...ze(de, K, U) }, t("resize", a.value);
      }, () => {
        t("resize-end", a.value);
      });
    }
    return ge(() => [e.width, e.height, e.left, e.top, e.angle], ([f, l, o, d, b]) => {
      a.value = { ...a.value, width: f, height: l, left: o, top: d, angle: b };
    }), (f, l) => (z(), R("div", {
      ref_key: "dragRef",
      ref: s,
      class: fe(["es-drager", { disabled: f.disabled, dragging: M(u) }]),
      style: Z(M(g)),
      onClick: l[3] || (l[3] = pe(() => {
      }, ["stop"]))
    }, [
      me(f.$slots, "default"),
      !f.disabled && f.resizable ? ve((z(), R("div", Ie, [
        (z(!0), R(we, null, be(i.value, (o, d) => (z(), R("div", {
          key: d,
          class: "es-drager-dot",
          "data-side": o.side,
          style: Z({ ...o }),
          onMousedown: (b) => r(o, b)
        }, null, 44, Ce))), 128))
      ], 512)), [
        [ye, M(p)]
      ]) : G("", !0),
      !f.disabled && M(p) ? (z(), Me(Ne, {
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
H.install = (n) => {
  n.component("es-drager", H);
};
export {
  $e as Drager,
  C as DragerProps,
  ke as centerToTL,
  S as cursorDirectionArray,
  H as default,
  V as degToRadian,
  ze as formatData,
  Ye as getCursor,
  Q as getDotList,
  _e as getLength,
  Ae as getNewStyle,
  J as resizableMap,
  B as withUnit
};
