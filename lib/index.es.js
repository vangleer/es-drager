import { ref as _, onMounted as de, defineComponent as H, computed as W, openBlock as Y, createElementBlock as L, renderSlot as B, createElementVNode as S, watch as he, normalizeClass as ge, unref as M, normalizeStyle as Z, withModifiers as fe, withDirectives as pe, Fragment as ve, renderList as we, normalizeProps as me, guardReactiveProps as be, vShow as ye, createCommentVNode as G, createBlock as Me, withCtx as De } from "vue";
const Ae = {
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
}, x = (s = 0) => parseInt(s + "") + "px", J = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, V = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], _e = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, ke = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, ze = (s, a) => {
  const e = ke[Math.floor(s / 30)], n = (_e[a] + e) % 8;
  return V[n];
}, Q = (s = 0) => {
  let a = [];
  for (let e = 0; e < V.length; e++) {
    const t = V[e], [n, w] = J[t].split("-"), c = ze(s, t), i = { [n]: "0%", cursor: c + "-resize", side: J[t] };
    if (w)
      i[w] = "0%";
    else {
      const u = ["top", "bottom"].includes(n) ? "left" : "top";
      i[u] = "50%";
    }
    a[e] = i;
  }
  return a;
}, $ = (s) => s * Math.PI / 180, Xe = (s, a) => Math.sqrt(s * s + a * a), f = (s) => Math.cos($(s)), p = (s) => Math.sin($(s)), Ye = (s, a, e, t, n, w, c) => {
  let { width: i, height: u, centerX: v, centerY: g, rotateAngle: o } = a;
  const d = i < 0 ? -1 : 1, l = u < 0 ? -1 : 1;
  switch (i = Math.abs(i), u = Math.abs(u), s) {
    case "right": {
      const r = X(i, e, w);
      i = r.width, e = r.deltaW, n ? (t = e / n, u = i / n, v += e / 2 * f(o) - t / 2 * p(o), g += e / 2 * p(o) + t / 2 * f(o)) : (v += e / 2 * f(o), g += e / 2 * p(o));
      break;
    }
    case "top-right": {
      t = -t;
      const r = X(i, e, w);
      i = r.width, e = r.deltaW;
      const h = z(u, t, c);
      u = h.height, t = h.deltaH, n && (e = t * n, i = u * n), v += e / 2 * f(o) + t / 2 * p(o), g += e / 2 * p(o) - t / 2 * f(o);
      break;
    }
    case "bottom-right": {
      const r = X(i, e, w);
      i = r.width, e = r.deltaW;
      const h = z(u, t, c);
      u = h.height, t = h.deltaH, n && (e = t * n, i = u * n), v += e / 2 * f(o) - t / 2 * p(o), g += e / 2 * p(o) + t / 2 * f(o);
      break;
    }
    case "bottom": {
      const r = z(u, t, c);
      u = r.height, t = r.deltaH, n ? (e = t * n, i = u * n, v += e / 2 * f(o) - t / 2 * p(o), g += e / 2 * p(o) + t / 2 * f(o)) : (v -= t / 2 * p(o), g += t / 2 * f(o));
      break;
    }
    case "bottom-left": {
      e = -e;
      const r = X(i, e, w);
      i = r.width, e = r.deltaW;
      const h = z(u, t, c);
      u = h.height, t = h.deltaH, n && (u = i / n, t = e / n), v -= e / 2 * f(o) + t / 2 * p(o), g -= e / 2 * p(o) - t / 2 * f(o);
      break;
    }
    case "left": {
      e = -e;
      const r = X(i, e, w);
      i = r.width, e = r.deltaW, n ? (u = i / n, t = e / n, v -= e / 2 * f(o) + t / 2 * p(o), g -= e / 2 * p(o) - t / 2 * f(o)) : (v -= e / 2 * f(o), g -= e / 2 * p(o));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const r = X(i, e, w);
      i = r.width, e = r.deltaW;
      const h = z(u, t, c);
      u = h.height, t = h.deltaH, n && (i = u * n, e = t * n), v -= e / 2 * f(o) - t / 2 * p(o), g -= e / 2 * p(o) + t / 2 * f(o);
      break;
    }
    case "top": {
      t = -t;
      const r = z(u, t, c);
      u = r.height, t = r.deltaH, n ? (i = u * n, e = t * n, v += e / 2 * f(o) + t / 2 * p(o), g += e / 2 * p(o) - t / 2 * f(o)) : (v += t / 2 * p(o), g -= t / 2 * f(o));
      break;
    }
  }
  return {
    position: {
      centerX: v,
      centerY: g
    },
    size: {
      width: i * d,
      height: u * l
    }
  };
}, z = (s, a, e) => {
  const t = s + a;
  return t > e ? s = t : (a = e - s, s = e), { height: s, deltaH: a };
}, X = (s, a, e) => {
  const t = s + a;
  return t > e ? s = t : (a = e - s, s = e), { width: s, deltaW: a };
}, Ee = ({ centerX: s, centerY: a, width: e, height: t, angle: n }) => ({
  top: a - t / 2,
  left: s - e / 2,
  width: e,
  height: t,
  angle: n
}), Re = (s, a, e) => {
  const { width: t, height: n } = s;
  return {
    width: Math.abs(t),
    height: Math.abs(n),
    left: a - Math.abs(t) / 2,
    top: e - Math.abs(n) / 2
  };
};
let Le = 1e3;
function Ne(s, a, e) {
  const t = _(), n = _(!1), w = _(!1), c = _({
    width: a.width,
    height: a.height,
    left: a.left,
    top: a.top,
    angle: a.angle
  });
  function i(v) {
    if (a.disabled)
      return;
    n.value = !0, w.value = !0;
    const g = s.value;
    let { clientX: o, clientY: d } = v;
    const { width: l, height: r, left: h, top: b } = c.value;
    g.style.zIndex = xe();
    let D = 0, E = 0, N = 0, R = 0;
    if (a.boundary) {
      const m = (g.parentElement || document.body).getBoundingClientRect();
      E = m.width - l, R = m.height - r;
    }
    const I = o - h, A = d - b;
    e && e("drag-start", c.value), C((k) => {
      let m = k.clientX - I, y = k.clientY - A;
      a.boundary && (m = m < D ? D : m, m = m > E ? E : m, y = y < N ? N : y, y = y > R ? R : y), c.value.left = m, c.value.top = y, e && e("drag", c.value);
    }, (k) => {
      n.value = !1, document.addEventListener("click", u, { once: !0 }), e && e("drag-end", c.value);
    });
  }
  const u = () => {
    w.value = !1;
  };
  return de(() => {
    s.value && s.value.addEventListener("mousedown", i);
  }), {
    isMousedown: n,
    selected: w,
    dragRef: t,
    dragData: c
  };
}
function xe() {
  return ++Le + "";
}
function C(s, a) {
  const e = (t) => {
    a && a(t), document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", s), document.addEventListener("mouseup", e);
}
const Be = /* @__PURE__ */ S("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ S("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ S("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Se = /* @__PURE__ */ H({
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
  setup(s, { emit: a }) {
    const e = s, t = _(null), n = W({
      get: () => e.modelValue,
      set: (c) => {
        a("update:modelValue", c);
      }
    });
    function w(c) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      c.stopPropagation(), c.preventDefault();
      const { width: i, height: u, left: v, top: g } = e.element.getBoundingClientRect(), o = v + i / 2, d = g + u / 2;
      a("rotate-start", n.value), C((l) => {
        const r = o - l.clientX, h = d - l.clientY, D = Math.atan2(h, r) * 180 / Math.PI - 90;
        n.value = (D + 360) % 360, a("rotate", n.value);
      }, () => {
        a("rotate-end", n.value);
      });
    }
    return (c, i) => (Y(), L("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: w
    }, [
      B(c.$slots, "default", {}, () => [
        Be
      ])
    ], 544));
  }
});
const Ie = { key: 0 }, Ve = ["data-side", "onMousedown"], $e = /* @__PURE__ */ S("div", { class: "es-drager-dot-handle" }, null, -1), ee = /* @__PURE__ */ H({
  __name: "drager",
  props: Ae,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(s, { emit: a }) {
    const e = s, t = (d, ...l) => {
      a(d, ...l), a("change", ...l);
    }, n = _(null), { selected: w, dragData: c, isMousedown: i } = Ne(n, e, t), u = _(Q()), v = W(() => {
      const { width: d, height: l, left: r, top: h, angle: b } = c.value;
      return {
        width: x(d),
        height: x(l),
        left: x(r),
        top: x(h),
        transform: `rotate(${b}deg)`,
        "--es-drager-color": e.color
      };
    });
    function g(d) {
      u.value = Q(d), t("rotate-end", c.value);
    }
    function o(d, l) {
      l.stopPropagation(), l.preventDefault();
      const r = l.clientX, h = l.clientY, { width: b, height: D, left: E, top: N } = c.value, R = E + b / 2, I = N + D / 2, A = { width: b, height: D, centerX: R, centerY: I, rotateAngle: c.value.angle }, P = d.side, { minWidth: k, minHeight: m, aspectRatio: y } = e;
      t("resize-start", c.value), C((F) => {
        const { clientX: te, clientY: ne } = F, T = te - r, q = ne - h, oe = Math.atan2(q, T), K = Xe(T, q), se = F.shiftKey, O = oe - $(A.rotateAngle), re = K * Math.cos(O), ae = K * Math.sin(O), ce = se && !y ? A.width / A.height : y, {
          position: { centerX: U, centerY: j },
          size: { width: ie, height: ue }
        } = Ye(P, { ...A, rotateAngle: A.rotateAngle }, re, ae, ce, k, m), le = Ee({ centerX: U, centerY: j, width: ie, height: ue, angle: c.value.angle });
        c.value = { ...c.value, ...Re(le, U, j) }, t("resize", c.value);
      }, () => {
        t("resize-end", c.value);
      });
    }
    return he(() => [e.width, e.height, e.left, e.top, e.angle], ([d, l, r, h, b]) => {
      c.value = { ...c.value, width: d, height: l, left: r, top: h, angle: b };
    }), (d, l) => (Y(), L("div", {
      ref_key: "dragRef",
      ref: n,
      class: ge(["es-drager", { disabled: d.disabled, dragging: M(i) }]),
      style: Z(M(v)),
      onClick: l[3] || (l[3] = fe(() => {
      }, ["stop"]))
    }, [
      B(d.$slots, "default"),
      !d.disabled && d.resizable ? pe((Y(), L("div", Ie, [
        (Y(!0), L(ve, null, we(u.value, (r, h) => (Y(), L("div", {
          key: h,
          class: "es-drager-dot",
          "data-side": r.side,
          style: Z({ ...r }),
          onMousedown: (b) => o(r, b)
        }, [
          B(d.$slots, "resize", me(be({ side: r.side })), () => [
            $e
          ])
        ], 44, Ve))), 128))
      ], 512)), [
        [ye, M(w)]
      ]) : G("", !0),
      !d.disabled && M(w) ? (Y(), Me(Se, {
        key: 1,
        modelValue: M(c).angle,
        "onUpdate:modelValue": l[0] || (l[0] = (r) => M(c).angle = r),
        "drag-data": M(c),
        element: n.value,
        onRotate: l[1] || (l[1] = (r) => t("rotate", M(c))),
        onRotateStart: l[2] || (l[2] = (r) => t("rotate-start", M(c))),
        onRotateEnd: g
      }, {
        default: De(() => [
          B(d.$slots, "rotate")
        ]),
        _: 3
      }, 8, ["modelValue", "drag-data", "element"])) : G("", !0)
    ], 6));
  }
});
const Ce = (s) => {
  s.component("es-drager", ee);
};
ee.install = Ce;
export {
  Ae as DragerProps,
  ee as ESDrager,
  Ee as centerToTL,
  V as cursorDirectionArray,
  ee as default,
  $ as degToRadian,
  Re as formatData,
  ze as getCursor,
  Q as getDotList,
  Xe as getLength,
  Ye as getNewStyle,
  Ce as install,
  J as resizableMap,
  x as withUnit
};
