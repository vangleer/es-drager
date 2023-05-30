import { ref as X, onMounted as pe, defineComponent as oe, computed as se, openBlock as N, createElementBlock as V, renderSlot as $, createElementVNode as C, watch as Q, normalizeClass as ve, unref as M, normalizeStyle as H, withModifiers as me, Fragment as we, renderList as be, normalizeProps as ye, guardReactiveProps as Me, createCommentVNode as W, createBlock as De, withCtx as Xe } from "vue";
const Ye = {
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
  }
}, S = (o = 0) => parseInt(o + "") + "px", ee = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, q = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], ze = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, Ae = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, ke = (o, s) => {
  const e = Ae[Math.floor(o / 30)], r = (ze[s] + e) % 8;
  return q[r];
}, te = (o = 0) => {
  let s = [];
  for (let e = 0; e < q.length; e++) {
    const t = q[e], [r, p] = ee[t].split("-"), c = ke(o, t), l = { [r]: "0%", cursor: c + "-resize", side: ee[t] };
    if (p)
      l[p] = "0%";
    else {
      const u = ["top", "bottom"].includes(r) ? "left" : "top";
      l[u] = "50%";
    }
    s[e] = l;
  }
  return s;
}, K = (o) => o * Math.PI / 180, _e = (o, s) => Math.sqrt(o * o + s * s), g = (o) => Math.cos(K(o)), f = (o) => Math.sin(K(o)), Re = (o, s, e, t, r, p, c) => {
  let { width: l, height: u, centerX: v, centerY: h, rotateAngle: a } = s;
  const D = l < 0 ? -1 : 1, d = u < 0 ? -1 : 1;
  switch (l = Math.abs(l), u = Math.abs(u), o) {
    case "right": {
      const n = _(l, e, p);
      l = n.width, e = n.deltaW, r ? (t = e / r, u = l / r, v += e / 2 * g(a) - t / 2 * f(a), h += e / 2 * f(a) + t / 2 * g(a)) : (v += e / 2 * g(a), h += e / 2 * f(a));
      break;
    }
    case "top-right": {
      t = -t;
      const n = _(l, e, p);
      l = n.width, e = n.deltaW;
      const i = k(u, t, c);
      u = i.height, t = i.deltaH, r && (e = t * r, l = u * r), v += e / 2 * g(a) + t / 2 * f(a), h += e / 2 * f(a) - t / 2 * g(a);
      break;
    }
    case "bottom-right": {
      const n = _(l, e, p);
      l = n.width, e = n.deltaW;
      const i = k(u, t, c);
      u = i.height, t = i.deltaH, r && (e = t * r, l = u * r), v += e / 2 * g(a) - t / 2 * f(a), h += e / 2 * f(a) + t / 2 * g(a);
      break;
    }
    case "bottom": {
      const n = k(u, t, c);
      u = n.height, t = n.deltaH, r ? (e = t * r, l = u * r, v += e / 2 * g(a) - t / 2 * f(a), h += e / 2 * f(a) + t / 2 * g(a)) : (v -= t / 2 * f(a), h += t / 2 * g(a));
      break;
    }
    case "bottom-left": {
      e = -e;
      const n = _(l, e, p);
      l = n.width, e = n.deltaW;
      const i = k(u, t, c);
      u = i.height, t = i.deltaH, r && (u = l / r, t = e / r), v -= e / 2 * g(a) + t / 2 * f(a), h -= e / 2 * f(a) - t / 2 * g(a);
      break;
    }
    case "left": {
      e = -e;
      const n = _(l, e, p);
      l = n.width, e = n.deltaW, r ? (u = l / r, t = e / r, v -= e / 2 * g(a) + t / 2 * f(a), h -= e / 2 * f(a) - t / 2 * g(a)) : (v -= e / 2 * g(a), h -= e / 2 * f(a));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const n = _(l, e, p);
      l = n.width, e = n.deltaW;
      const i = k(u, t, c);
      u = i.height, t = i.deltaH, r && (l = u * r, e = t * r), v -= e / 2 * g(a) - t / 2 * f(a), h -= e / 2 * f(a) + t / 2 * g(a);
      break;
    }
    case "top": {
      t = -t;
      const n = k(u, t, c);
      u = n.height, t = n.deltaH, r ? (l = u * r, e = t * r, v += e / 2 * g(a) + t / 2 * f(a), h += e / 2 * f(a) - t / 2 * g(a)) : (v += t / 2 * f(a), h -= t / 2 * g(a));
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
      height: u * d
    }
  };
}, k = (o, s, e) => {
  const t = o + s;
  return t > e ? o = t : (s = e - o, o = e), { height: o, deltaH: s };
}, _ = (o, s, e) => {
  const t = o + s;
  return t > e ? o = t : (s = e - o, o = e), { width: o, deltaW: s };
}, Ee = ({ centerX: o, centerY: s, width: e, height: t, angle: r }) => ({
  top: s - t / 2,
  left: o - e / 2,
  width: e,
  height: t,
  angle: r
}), Ne = (o, s, e) => {
  const { width: t, height: r } = o;
  return {
    width: Math.abs(t),
    height: Math.abs(r),
    left: s - Math.abs(t) / 2,
    top: e - Math.abs(r) / 2
  };
};
let Be = 1e3;
function Le(o, s, e) {
  const t = X(), r = X(!1), p = X(!1), c = X({
    width: s.width,
    height: s.height,
    left: s.left,
    top: s.top,
    angle: s.angle
  });
  function l(v) {
    if (s.disabled)
      return;
    r.value = !0, p.value = !0;
    const h = o.value;
    let { clientX: a, clientY: D } = v;
    const { width: d, height: n, left: i, top: b } = c.value;
    h.style.zIndex = xe();
    let m = 0, Y = 0, B = 0, R = 0;
    if (s.boundary) {
      const w = (h.parentElement || document.body).getBoundingClientRect();
      Y = w.width - d, R = w.height - n;
    }
    const P = a - i, G = D - b;
    e && e("drag-start", c.value), O((A) => {
      let w = A.clientX - P, y = A.clientY - G;
      if (s.snapToGrid) {
        let { left: E, top: T } = c.value;
        const L = w - E, F = y - T;
        w = ne(L, s.gridX, E), y = ne(F, s.gridY, T);
      }
      s.boundary && (w = w < m ? m : w, w = w > Y ? Y : w, y = y < B ? B : y, y = y > R ? R : y), c.value.left = w, c.value.top = y, e && e("drag", c.value);
    }, (A) => {
      r.value = !1, document.addEventListener("click", u, { once: !0 }), e && e("drag-end", c.value);
    });
  }
  const u = () => {
    p.value = !1;
  };
  return pe(() => {
    o.value && o.value.addEventListener("mousedown", l);
  }), {
    isMousedown: r,
    selected: p,
    dragRef: t,
    dragData: c
  };
}
function xe() {
  return ++Be + "";
}
function O(o, s) {
  const e = (t) => {
    s && s(t), document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", e);
  };
  document.addEventListener("mousemove", o), document.addEventListener("mouseup", e);
}
function ne(o, s, e) {
  let t = e;
  return Math.abs(o) > s / 2 && (t = e + (o > 0 ? s : -s)), t;
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
], -1), Se = /* @__PURE__ */ oe({
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
  setup(o, { emit: s }) {
    const e = o, t = X(null), r = se({
      get: () => e.modelValue,
      set: (c) => {
        s("update:modelValue", c);
      }
    });
    function p(c) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      c.stopPropagation(), c.preventDefault();
      const { width: l, height: u, left: v, top: h } = e.element.getBoundingClientRect(), a = v + l / 2, D = h + u / 2;
      s("rotate-start", r.value), O((d) => {
        const n = a - d.clientX, i = D - d.clientY, m = Math.atan2(i, n) * 180 / Math.PI - 90;
        r.value = (m + 360) % 360, s("rotate", r.value);
      }, () => {
        s("rotate-end", r.value);
      });
    }
    return (c, l) => (N(), V("div", {
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
const Ve = ["data-side", "onMousedown"], $e = /* @__PURE__ */ C("div", { class: "es-drager-dot-handle" }, null, -1), re = /* @__PURE__ */ oe({
  __name: "drager",
  props: Ye,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(o, { emit: s }) {
    const e = o, t = (d, ...n) => {
      s(d, ...n), s("change", ...n);
    }, r = X(null), { selected: p, dragData: c, isMousedown: l } = Le(r, e, t), u = X(te()), v = se(() => {
      const { width: d, height: n, left: i, top: b, angle: m } = c.value;
      return {
        width: S(d),
        height: S(n),
        left: S(i),
        top: S(b),
        transform: `rotate(${m}deg)`,
        "--es-drager-color": e.color
      };
    });
    function h(d) {
      u.value = te(d), t("rotate-end", c.value);
    }
    function a(d, n) {
      const i = Math.abs(d) % n, b = d > 0 ? n : -n;
      let m = 0;
      return i > n / 2 ? m = b * Math.ceil(Math.abs(d) / n) : m = b * Math.floor(Math.abs(d) / n), m;
    }
    function D(d, n) {
      n.stopPropagation(), n.preventDefault();
      const i = n.clientX, b = n.clientY, { width: m, height: Y, left: B, top: R } = c.value, P = B + m / 2, G = R + Y / 2, z = { width: m, height: Y, centerX: P, centerY: G, rotateAngle: c.value.angle }, A = d.side, { minWidth: w, minHeight: y, aspectRatio: E } = e;
      t("resize-start", c.value), O((L) => {
        const { clientX: F, clientY: ae } = L;
        let x = F - i, I = ae - b;
        e.snapToGrid && (x = a(x, e.gridX), I = a(I, e.gridY));
        const ce = Math.atan2(I, x), U = _e(x, I), le = L.shiftKey, j = ce - K(z.rotateAngle), ue = U * Math.cos(j), ie = U * Math.sin(j), de = le && !E ? z.width / z.height : E, {
          position: { centerX: Z, centerY: J },
          size: { width: he, height: ge }
        } = Re(A, { ...z, rotateAngle: z.rotateAngle }, ue, ie, de, w, y), fe = Ee({ centerX: Z, centerY: J, width: he, height: ge, angle: c.value.angle });
        c.value = { ...c.value, ...Ne(fe, Z, J) }, t("resize", c.value);
      }, () => {
        t("resize-end", c.value);
      });
    }
    return Q(() => [e.width, e.height, e.left, e.top, e.angle], ([d, n, i, b, m]) => {
      c.value = { ...c.value, width: d, height: n, left: i, top: b, angle: m };
    }), Q(() => e.selected, (d) => {
      p.value = d;
    }, { immediate: !0 }), (d, n) => (N(), V("div", {
      ref_key: "dragRef",
      ref: r,
      class: ve(["es-drager", { disabled: d.disabled, dragging: M(l), selected: M(p) }]),
      style: H(M(v)),
      onClick: n[3] || (n[3] = me(() => {
      }, ["self", "stop"]))
    }, [
      $(d.$slots, "default"),
      !d.disabled && d.resizable ? (N(!0), V(we, { key: 0 }, be(u.value, (i, b) => (N(), V("div", {
        key: b,
        class: "es-drager-dot",
        "data-side": i.side,
        style: H({ ...i }),
        onMousedown: (m) => D(i, m)
      }, [
        $(d.$slots, "resize", ye(Me({ side: i.side })), () => [
          $e
        ])
      ], 44, Ve))), 128)) : W("", !0),
      !d.disabled && M(p) ? (N(), De(Se, {
        key: 1,
        modelValue: M(c).angle,
        "onUpdate:modelValue": n[0] || (n[0] = (i) => M(c).angle = i),
        "drag-data": M(c),
        element: r.value,
        onRotate: n[1] || (n[1] = (i) => t("rotate", M(c))),
        onRotateStart: n[2] || (n[2] = (i) => t("rotate-start", M(c))),
        onRotateEnd: h
      }, {
        default: Xe(() => [
          $(d.$slots, "rotate")
        ]),
        _: 3
      }, 8, ["modelValue", "drag-data", "element"])) : W("", !0)
    ], 6));
  }
});
const Ce = (o) => {
  o.component("es-drager", re);
};
re.install = Ce;
export {
  Ye as DragerProps,
  re as ESDrager,
  Ee as centerToTL,
  q as cursorDirectionArray,
  re as default,
  K as degToRadian,
  Ne as formatData,
  ke as getCursor,
  te as getDotList,
  _e as getLength,
  Re as getNewStyle,
  Ce as install,
  ee as resizableMap,
  S as withUnit
};
