import { ref as k, onMounted as ge, watch as G, onBeforeUnmount as we, defineComponent as te, computed as ne, openBlock as X, createElementBlock as S, renderSlot as V, createElementVNode as $, normalizeClass as ve, unref as M, normalizeStyle as J, withModifiers as pe, Fragment as me, renderList as ye, normalizeProps as be, guardReactiveProps as Me, createCommentVNode as Q, createBlock as De, withCtx as ke } from "vue";
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
}, I = (s = 0) => parseInt(s + "") + "px", H = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, T = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Re = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, ze = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Ee = (s, o) => {
  const e = ze[Math.floor(s / 30)], a = (Re[o] + e) % 8;
  return T[a];
}, W = (s = 0) => {
  let o = [];
  for (let e = 0; e < T.length; e++) {
    const t = T[e], [a, g] = H[t].split("-"), i = Ee(s, t), u = { [a]: "0%", cursor: i + "-resize", side: H[t] };
    if (g)
      u[g] = "0%";
    else {
      const d = ["top", "bottom"].includes(a) ? "left" : "top";
      u[d] = "50%";
    }
    o[e] = u;
  }
  return o;
}, P = (s) => s * Math.PI / 180, Xe = (s, o) => Math.sqrt(s * s + o * o), v = (s) => Math.cos(P(s)), p = (s) => Math.sin(P(s)), Ye = (s, o, e, t, a, g, i) => {
  let { width: u, height: d, centerX: w, centerY: m, rotateAngle: r } = o;
  const h = u < 0 ? -1 : 1, c = d < 0 ? -1 : 1;
  switch (u = Math.abs(u), d = Math.abs(d), s) {
    case "right": {
      const n = R(u, e, g);
      u = n.width, e = n.deltaW, a ? (t = e / a, d = u / a, w += e / 2 * v(r) - t / 2 * p(r), m += e / 2 * p(r) + t / 2 * v(r)) : (w += e / 2 * v(r), m += e / 2 * p(r));
      break;
    }
    case "top-right": {
      t = -t;
      const n = R(u, e, g);
      u = n.width, e = n.deltaW;
      const l = A(d, t, i);
      d = l.height, t = l.deltaH, a && (e = t * a, u = d * a), w += e / 2 * v(r) + t / 2 * p(r), m += e / 2 * p(r) - t / 2 * v(r);
      break;
    }
    case "bottom-right": {
      const n = R(u, e, g);
      u = n.width, e = n.deltaW;
      const l = A(d, t, i);
      d = l.height, t = l.deltaH, a && (e = t * a, u = d * a), w += e / 2 * v(r) - t / 2 * p(r), m += e / 2 * p(r) + t / 2 * v(r);
      break;
    }
    case "bottom": {
      const n = A(d, t, i);
      d = n.height, t = n.deltaH, a ? (e = t * a, u = d * a, w += e / 2 * v(r) - t / 2 * p(r), m += e / 2 * p(r) + t / 2 * v(r)) : (w -= t / 2 * p(r), m += t / 2 * v(r));
      break;
    }
    case "bottom-left": {
      e = -e;
      const n = R(u, e, g);
      u = n.width, e = n.deltaW;
      const l = A(d, t, i);
      d = l.height, t = l.deltaH, a && (d = u / a, t = e / a), w -= e / 2 * v(r) + t / 2 * p(r), m -= e / 2 * p(r) - t / 2 * v(r);
      break;
    }
    case "left": {
      e = -e;
      const n = R(u, e, g);
      u = n.width, e = n.deltaW, a ? (d = u / a, t = e / a, w -= e / 2 * v(r) + t / 2 * p(r), m -= e / 2 * p(r) - t / 2 * v(r)) : (w -= e / 2 * v(r), m -= e / 2 * p(r));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const n = R(u, e, g);
      u = n.width, e = n.deltaW;
      const l = A(d, t, i);
      d = l.height, t = l.deltaH, a && (u = d * a, e = t * a), w -= e / 2 * v(r) - t / 2 * p(r), m -= e / 2 * p(r) + t / 2 * v(r);
      break;
    }
    case "top": {
      t = -t;
      const n = A(d, t, i);
      d = n.height, t = n.deltaH, a ? (u = d * a, e = t * a, w += e / 2 * v(r) + t / 2 * p(r), m += e / 2 * p(r) - t / 2 * v(r)) : (w += t / 2 * p(r), m -= t / 2 * v(r));
      break;
    }
  }
  return {
    position: {
      centerX: w,
      centerY: m
    },
    size: {
      width: u * h,
      height: d * c
    }
  };
}, A = (s, o, e) => {
  const t = s + o;
  return t > e ? s = t : (o = e - s, s = e), { height: s, deltaH: o };
}, R = (s, o, e) => {
  const t = s + o;
  return t > e ? s = t : (o = e - s, s = e), { width: s, deltaW: o };
}, _e = ({ centerX: s, centerY: o, width: e, height: t, angle: a }) => ({
  top: o - t / 2,
  left: s - e / 2,
  width: e,
  height: t,
  angle: a
}), Be = (s, o, e) => {
  const { width: t, height: a } = s;
  return {
    width: Math.abs(t),
    height: Math.abs(a),
    left: o - Math.abs(t) / 2,
    top: e - Math.abs(a) / 2
  };
};
let Le = 1e3;
function Ne(s, o, e) {
  const t = k(), a = k(!1), g = k(!1), i = k({
    width: o.width,
    height: o.height,
    left: o.left,
    top: o.top,
    angle: o.angle
  });
  function u(h) {
    if (o.disabled)
      return;
    a.value = !0, g.value = !0;
    const c = s.value;
    let { clientX: n, clientY: l } = h;
    const { left: f, top: y } = i.value;
    c.style.zIndex = xe();
    let z = 0, Y = 0;
    o.boundary && ([z, Y] = d()), e && e("drag-start", i.value), K((E) => {
      let D = (E.clientX - n) / o.scaleRatio + f, b = (E.clientY - l) / o.scaleRatio + y;
      if (o.snapToGrid) {
        let { left: _, top: B } = i.value;
        const C = D - _, L = b - B;
        D = ee(C, o.gridX, _), b = ee(L, o.gridY, B);
      }
      o.boundary && ([D, b] = w(D, b, z, Y)), i.value.left = D, i.value.top = b, e && e("drag", i.value);
    }, (E) => {
      a.value = !1, document.addEventListener("click", m, { once: !0 }), e && e("drag-end", i.value);
    });
  }
  const d = () => {
    const { width: h, height: c } = i.value, l = (s.value.parentElement || document.body).getBoundingClientRect(), f = l.width / o.scaleRatio - h, y = l.height / o.scaleRatio - c;
    return [f, y];
  }, w = (h, c, n, l) => (h = h < 0 ? 0 : h, h = h > n ? n : h, c = c < 0 ? 0 : c, c = c > l ? l : c, [h, c]), m = () => {
    g.value = !1;
  }, r = (h) => {
    if (a.value)
      return;
    let { left: c, top: n } = i.value;
    if (["ArrowRight", "ArrowLeft"].includes(h.key)) {
      const l = h.key === "ArrowRight";
      let f = l ? 1 : -1;
      o.snapToGrid && (f = l ? o.gridX : -o.gridX), c = c + f;
    } else if (["ArrowUp", "ArrowDown"].includes(h.key)) {
      const l = h.key === "ArrowDown";
      let f = l ? 1 : -1;
      o.snapToGrid && (f = l ? o.gridY : -o.gridY), n = n + f;
    }
    if (o.boundary) {
      const [l, f] = d();
      [c, n] = w(c, n, l, f);
    }
    i.value.left = c, i.value.top = n;
  };
  return ge(() => {
    s.value && s.value.addEventListener("mousedown", u);
  }), G(g, (h) => {
    o.disabledKeyEvent || (h ? document.addEventListener("keydown", r) : document.removeEventListener("keydown", r));
  }), we(() => {
    document.removeEventListener("keydown", r);
  }), {
    isMousedown: a,
    selected: g,
    dragRef: t,
    dragData: i
  };
}
function xe() {
  return ++Le + "";
}
function K(s, o) {
  const e = (t) => {
    o && o(t), document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", s), document.addEventListener("mouseup", e);
}
function ee(s, o, e) {
  let t = e;
  return Math.abs(s) > o / 2 && (t = e + (s > 0 ? o : -o)), t;
}
const Ie = /* @__PURE__ */ $("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ $("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ $("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Se = /* @__PURE__ */ te({
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
  setup(s, { emit: o }) {
    const e = s, t = k(null), a = ne({
      get: () => e.modelValue,
      set: (i) => {
        o("update:modelValue", i);
      }
    });
    function g(i) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      i.stopPropagation(), i.preventDefault();
      const { width: u, height: d, left: w, top: m } = e.element.getBoundingClientRect(), r = w + u / 2, h = m + d / 2;
      o("rotate-start", a.value), K((c) => {
        const n = r - c.clientX, l = h - c.clientY, y = Math.atan2(l, n) * 180 / Math.PI - 90;
        a.value = (y + 360) % 360, o("rotate", a.value);
      }, () => {
        o("rotate-end", a.value);
      });
    }
    return (i, u) => (X(), S("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: g
    }, [
      V(i.$slots, "default", {}, () => [
        Ie
      ])
    ], 544));
  }
});
const Ve = ["data-side", "onMousedown"], $e = /* @__PURE__ */ $("div", { class: "es-drager-dot-handle" }, null, -1), oe = /* @__PURE__ */ te({
  __name: "drager",
  props: Ae,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(s, { emit: o }) {
    const e = s, t = (c, ...n) => {
      o(c, ...n), o("change", ...n);
    }, a = k(null), { selected: g, dragData: i, isMousedown: u } = Ne(a, e, t), d = k(W()), w = ne(() => {
      const { width: c, height: n, left: l, top: f, angle: y } = i.value;
      return {
        width: I(c),
        height: I(n),
        left: I(l),
        top: I(f),
        transform: `rotate(${y}deg)`,
        "--es-drager-color": e.color
      };
    });
    function m(c) {
      d.value = W(c), t("rotate-end", i.value);
    }
    function r(c, n) {
      const l = Math.abs(c) % n, f = c > 0 ? n : -n;
      let y = 0;
      return l > n / 2 ? y = f * Math.ceil(Math.abs(c) / n) : y = f * Math.floor(Math.abs(c) / n), y;
    }
    function h(c, n) {
      n.stopPropagation(), n.preventDefault();
      const l = n.clientX, f = n.clientY, { width: y, height: z, left: Y, top: F } = i.value, E = Y + y / 2, D = F + z / 2, b = { width: y, height: z, centerX: E, centerY: D, rotateAngle: i.value.angle }, _ = c.side, { minWidth: B, minHeight: C, aspectRatio: L } = e;
      t("resize-start", i.value), K((U) => {
        const { clientX: se, clientY: re } = U;
        let N = (se - l) / e.scaleRatio, x = (re - f) / e.scaleRatio;
        e.snapToGrid && (N = r(N, e.gridX), x = r(x, e.gridY));
        const ae = Math.atan2(x, N), q = Xe(N, x), ce = U.shiftKey, O = ae - P(b.rotateAngle), ie = q * Math.cos(O), le = q * Math.sin(O), ue = ce && !L ? b.width / b.height : L, {
          position: { centerX: j, centerY: Z },
          size: { width: de, height: he }
        } = Ye(_, { ...b, rotateAngle: b.rotateAngle }, ie, le, ue, B, C), fe = _e({ centerX: j, centerY: Z, width: de, height: he, angle: i.value.angle });
        i.value = { ...i.value, ...Be(fe, j, Z) }, t("resize", i.value);
      }, () => {
        t("resize-end", i.value);
      });
    }
    return G(() => [e.width, e.height, e.left, e.top, e.angle], ([c, n, l, f, y]) => {
      i.value = { ...i.value, width: c, height: n, left: l, top: f, angle: y };
    }), G(() => e.selected, (c) => {
      g.value = c;
    }, { immediate: !0 }), (c, n) => (X(), S("div", {
      ref_key: "dragRef",
      ref: a,
      class: ve(["es-drager", { disabled: c.disabled, dragging: M(u), selected: M(g) }]),
      style: J(M(w)),
      onClick: n[3] || (n[3] = pe(() => {
      }, ["stop"]))
    }, [
      V(c.$slots, "default"),
      !c.disabled && c.resizable ? (X(!0), S(me, { key: 0 }, ye(d.value, (l, f) => (X(), S("div", {
        key: f,
        class: "es-drager-dot",
        "data-side": l.side,
        style: J({ ...l }),
        onMousedown: (y) => h(l, y)
      }, [
        V(c.$slots, "resize", be(Me({ side: l.side })), () => [
          $e
        ])
      ], 44, Ve))), 128)) : Q("", !0),
      !c.disabled && M(g) ? (X(), De(Se, {
        key: 1,
        modelValue: M(i).angle,
        "onUpdate:modelValue": n[0] || (n[0] = (l) => M(i).angle = l),
        "drag-data": M(i),
        element: a.value,
        onRotate: n[1] || (n[1] = (l) => t("rotate", M(i))),
        onRotateStart: n[2] || (n[2] = (l) => t("rotate-start", M(i))),
        onRotateEnd: m
      }, {
        default: ke(() => [
          V(c.$slots, "rotate")
        ]),
        _: 3
      }, 8, ["modelValue", "drag-data", "element"])) : Q("", !0)
    ], 6));
  }
});
const Ce = (s) => {
  s.component("es-drager", oe);
};
oe.install = Ce;
export {
  Ae as DragerProps,
  oe as ESDrager,
  _e as centerToTL,
  T as cursorDirectionArray,
  oe as default,
  P as degToRadian,
  Be as formatData,
  Ee as getCursor,
  W as getDotList,
  Xe as getLength,
  Ye as getNewStyle,
  Ce as install,
  H as resizableMap,
  I as withUnit
};
