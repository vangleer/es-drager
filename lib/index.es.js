import { ref as R, onMounted as pe, defineComponent as ne, computed as oe, openBlock as _, createElementBlock as V, renderSlot as $, createElementVNode as C, watch as J, normalizeClass as ve, unref as M, normalizeStyle as Q, withModifiers as me, Fragment as we, renderList as be, normalizeProps as ye, guardReactiveProps as Me, createCommentVNode as H, createBlock as De, withCtx as Re } from "vue";
const Xe = {
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
  }
}, S = (s = 0) => parseInt(s + "") + "px", W = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, P = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ye = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, ze = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Ae = (s, o) => {
  const e = ze[Math.floor(s / 30)], a = (Ye[o] + e) % 8;
  return P[a];
}, ee = (s = 0) => {
  let o = [];
  for (let e = 0; e < P.length; e++) {
    const t = P[e], [a, p] = W[t].split("-"), c = Ae(s, t), l = { [a]: "0%", cursor: c + "-resize", side: W[t] };
    if (p)
      l[p] = "0%";
    else {
      const i = ["top", "bottom"].includes(a) ? "left" : "top";
      l[i] = "50%";
    }
    o[e] = l;
  }
  return o;
}, G = (s) => s * Math.PI / 180, ke = (s, o) => Math.sqrt(s * s + o * o), f = (s) => Math.cos(G(s)), g = (s) => Math.sin(G(s)), _e = (s, o, e, t, a, p, c) => {
  let { width: l, height: i, centerX: v, centerY: h, rotateAngle: r } = o;
  const D = l < 0 ? -1 : 1, d = i < 0 ? -1 : 1;
  switch (l = Math.abs(l), i = Math.abs(i), s) {
    case "right": {
      const n = A(l, e, p);
      l = n.width, e = n.deltaW, a ? (t = e / a, i = l / a, v += e / 2 * f(r) - t / 2 * g(r), h += e / 2 * g(r) + t / 2 * f(r)) : (v += e / 2 * f(r), h += e / 2 * g(r));
      break;
    }
    case "top-right": {
      t = -t;
      const n = A(l, e, p);
      l = n.width, e = n.deltaW;
      const u = z(i, t, c);
      i = u.height, t = u.deltaH, a && (e = t * a, l = i * a), v += e / 2 * f(r) + t / 2 * g(r), h += e / 2 * g(r) - t / 2 * f(r);
      break;
    }
    case "bottom-right": {
      const n = A(l, e, p);
      l = n.width, e = n.deltaW;
      const u = z(i, t, c);
      i = u.height, t = u.deltaH, a && (e = t * a, l = i * a), v += e / 2 * f(r) - t / 2 * g(r), h += e / 2 * g(r) + t / 2 * f(r);
      break;
    }
    case "bottom": {
      const n = z(i, t, c);
      i = n.height, t = n.deltaH, a ? (e = t * a, l = i * a, v += e / 2 * f(r) - t / 2 * g(r), h += e / 2 * g(r) + t / 2 * f(r)) : (v -= t / 2 * g(r), h += t / 2 * f(r));
      break;
    }
    case "bottom-left": {
      e = -e;
      const n = A(l, e, p);
      l = n.width, e = n.deltaW;
      const u = z(i, t, c);
      i = u.height, t = u.deltaH, a && (i = l / a, t = e / a), v -= e / 2 * f(r) + t / 2 * g(r), h -= e / 2 * g(r) - t / 2 * f(r);
      break;
    }
    case "left": {
      e = -e;
      const n = A(l, e, p);
      l = n.width, e = n.deltaW, a ? (i = l / a, t = e / a, v -= e / 2 * f(r) + t / 2 * g(r), h -= e / 2 * g(r) - t / 2 * f(r)) : (v -= e / 2 * f(r), h -= e / 2 * g(r));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const n = A(l, e, p);
      l = n.width, e = n.deltaW;
      const u = z(i, t, c);
      i = u.height, t = u.deltaH, a && (l = i * a, e = t * a), v -= e / 2 * f(r) - t / 2 * g(r), h -= e / 2 * g(r) + t / 2 * f(r);
      break;
    }
    case "top": {
      t = -t;
      const n = z(i, t, c);
      i = n.height, t = n.deltaH, a ? (l = i * a, e = t * a, v += e / 2 * f(r) + t / 2 * g(r), h += e / 2 * g(r) - t / 2 * f(r)) : (v += t / 2 * g(r), h -= t / 2 * f(r));
      break;
    }
  }
  return {
    position: {
      centerX: v,
      centerY: h
    },
    size: {
      width: l * D,
      height: i * d
    }
  };
}, z = (s, o, e) => {
  const t = s + o;
  return t > e ? s = t : (o = e - s, s = e), { height: s, deltaH: o };
}, A = (s, o, e) => {
  const t = s + o;
  return t > e ? s = t : (o = e - s, s = e), { width: s, deltaW: o };
}, Ee = ({ centerX: s, centerY: o, width: e, height: t, angle: a }) => ({
  top: o - t / 2,
  left: s - e / 2,
  width: e,
  height: t,
  angle: a
}), Ne = (s, o, e) => {
  const { width: t, height: a } = s;
  return {
    width: Math.abs(t),
    height: Math.abs(a),
    left: o - Math.abs(t) / 2,
    top: e - Math.abs(a) / 2
  };
};
let Be = 1e3;
function Le(s, o, e) {
  const t = R(), a = R(!1), p = R(!1), c = R({
    width: o.width,
    height: o.height,
    left: o.left,
    top: o.top,
    angle: o.angle
  });
  function l(v) {
    if (o.disabled)
      return;
    a.value = !0, p.value = !0;
    const h = s.value;
    let { clientX: r, clientY: D } = v;
    const { width: d, height: n, left: u, top: b } = c.value;
    h.style.zIndex = xe();
    let w = 0, X = 0, E = 0, k = 0;
    if (o.boundary) {
      const m = (h.parentElement || document.body).getBoundingClientRect();
      X = m.width / o.scaleRatio - d, k = m.height / o.scaleRatio - n;
    }
    e && e("drag-start", c.value), T((Y) => {
      let m = (Y.clientX - r) / o.scaleRatio + u, y = (Y.clientY - D) / o.scaleRatio + b;
      if (o.snapToGrid) {
        let { left: N, top: B } = c.value;
        const L = m - N, q = y - B;
        m = te(L, o.gridX, N), y = te(q, o.gridY, B);
      }
      o.boundary && (m = m < w ? w : m, m = m > X ? X : m, y = y < E ? E : y, y = y > k ? k : y), c.value.left = m, c.value.top = y, e && e("drag", c.value);
    }, (Y) => {
      a.value = !1, document.addEventListener("click", i, { once: !0 }), e && e("drag-end", c.value);
    });
  }
  const i = () => {
    p.value = !1;
  };
  return pe(() => {
    s.value && s.value.addEventListener("mousedown", l);
  }), {
    isMousedown: a,
    selected: p,
    dragRef: t,
    dragData: c
  };
}
function xe() {
  return ++Be + "";
}
function T(s, o) {
  const e = (t) => {
    o && o(t), document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", s), document.addEventListener("mouseup", e);
}
function te(s, o, e) {
  let t = e;
  return Math.abs(s) > o / 2 && (t = e + (s > 0 ? o : -o)), t;
}
const Ie = /* @__PURE__ */ C("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ C("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ C("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Se = /* @__PURE__ */ ne({
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
    const e = s, t = R(null), a = oe({
      get: () => e.modelValue,
      set: (c) => {
        o("update:modelValue", c);
      }
    });
    function p(c) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      c.stopPropagation(), c.preventDefault();
      const { width: l, height: i, left: v, top: h } = e.element.getBoundingClientRect(), r = v + l / 2, D = h + i / 2;
      o("rotate-start", a.value), T((d) => {
        const n = r - d.clientX, u = D - d.clientY, w = Math.atan2(u, n) * 180 / Math.PI - 90;
        a.value = (w + 360) % 360, o("rotate", a.value);
      }, () => {
        o("rotate-end", a.value);
      });
    }
    return (c, l) => (_(), V("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: p
    }, [
      $(c.$slots, "default", {}, () => [
        Ie
      ])
    ], 544));
  }
});
const Ve = ["data-side", "onMousedown"], $e = /* @__PURE__ */ C("div", { class: "es-drager-dot-handle" }, null, -1), se = /* @__PURE__ */ ne({
  __name: "drager",
  props: Xe,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(s, { emit: o }) {
    const e = s, t = (d, ...n) => {
      o(d, ...n), o("change", ...n);
    }, a = R(null), { selected: p, dragData: c, isMousedown: l } = Le(a, e, t), i = R(ee()), v = oe(() => {
      const { width: d, height: n, left: u, top: b, angle: w } = c.value;
      return {
        width: S(d),
        height: S(n),
        left: S(u),
        top: S(b),
        transform: `rotate(${w}deg)`,
        "--es-drager-color": e.color
      };
    });
    function h(d) {
      i.value = ee(d), t("rotate-end", c.value);
    }
    function r(d, n) {
      const u = Math.abs(d) % n, b = d > 0 ? n : -n;
      let w = 0;
      return u > n / 2 ? w = b * Math.ceil(Math.abs(d) / n) : w = b * Math.floor(Math.abs(d) / n), w;
    }
    function D(d, n) {
      n.stopPropagation(), n.preventDefault();
      const u = n.clientX, b = n.clientY, { width: w, height: X, left: E, top: k } = c.value, F = E + w / 2, Y = k + X / 2, m = { width: w, height: X, centerX: F, centerY: Y, rotateAngle: c.value.angle }, y = d.side, { minWidth: N, minHeight: B, aspectRatio: L } = e;
      t("resize-start", c.value), T((K) => {
        const { clientX: ae, clientY: re } = K;
        let x = (ae - u) / e.scaleRatio, I = (re - b) / e.scaleRatio;
        e.snapToGrid && (x = r(x, e.gridX), I = r(I, e.gridY));
        const ce = Math.atan2(I, x), O = ke(x, I), le = K.shiftKey, U = ce - G(m.rotateAngle), ie = O * Math.cos(U), ue = O * Math.sin(U), de = le && !L ? m.width / m.height : L, {
          position: { centerX: j, centerY: Z },
          size: { width: he, height: fe }
        } = _e(y, { ...m, rotateAngle: m.rotateAngle }, ie, ue, de, N, B), ge = Ee({ centerX: j, centerY: Z, width: he, height: fe, angle: c.value.angle });
        c.value = { ...c.value, ...Ne(ge, j, Z) }, t("resize", c.value);
      }, () => {
        t("resize-end", c.value);
      });
    }
    return J(() => [e.width, e.height, e.left, e.top, e.angle], ([d, n, u, b, w]) => {
      c.value = { ...c.value, width: d, height: n, left: u, top: b, angle: w };
    }), J(() => e.selected, (d) => {
      p.value = d;
    }, { immediate: !0 }), (d, n) => (_(), V("div", {
      ref_key: "dragRef",
      ref: a,
      class: ve(["es-drager", { disabled: d.disabled, dragging: M(l), selected: M(p) }]),
      style: Q(M(v)),
      onClick: n[3] || (n[3] = me(() => {
      }, ["self", "stop"]))
    }, [
      $(d.$slots, "default"),
      !d.disabled && d.resizable ? (_(!0), V(we, { key: 0 }, be(i.value, (u, b) => (_(), V("div", {
        key: b,
        class: "es-drager-dot",
        "data-side": u.side,
        style: Q({ ...u }),
        onMousedown: (w) => D(u, w)
      }, [
        $(d.$slots, "resize", ye(Me({ side: u.side })), () => [
          $e
        ])
      ], 44, Ve))), 128)) : H("", !0),
      !d.disabled && M(p) ? (_(), De(Se, {
        key: 1,
        modelValue: M(c).angle,
        "onUpdate:modelValue": n[0] || (n[0] = (u) => M(c).angle = u),
        "drag-data": M(c),
        element: a.value,
        onRotate: n[1] || (n[1] = (u) => t("rotate", M(c))),
        onRotateStart: n[2] || (n[2] = (u) => t("rotate-start", M(c))),
        onRotateEnd: h
      }, {
        default: Re(() => [
          $(d.$slots, "rotate")
        ]),
        _: 3
      }, 8, ["modelValue", "drag-data", "element"])) : H("", !0)
    ], 6));
  }
});
const Ce = (s) => {
  s.component("es-drager", se);
};
se.install = Ce;
export {
  Xe as DragerProps,
  se as ESDrager,
  Ee as centerToTL,
  P as cursorDirectionArray,
  se as default,
  G as degToRadian,
  Ne as formatData,
  Ae as getCursor,
  ee as getDotList,
  ke as getLength,
  _e as getNewStyle,
  Ce as install,
  W as resizableMap,
  S as withUnit
};
