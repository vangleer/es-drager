import { ref as X, onMounted as Ee, watch as O, onBeforeUnmount as Ae, defineComponent as ce, computed as $, openBlock as Y, createElementBlock as U, renderSlot as I, createElementVNode as V, createBlock as ne, resolveDynamicComponent as De, normalizeClass as ke, unref as z, normalizeStyle as oe, withModifiers as ze, withCtx as se, Fragment as Le, renderList as Re, normalizeProps as Xe, guardReactiveProps as Ye, createCommentVNode as re } from "vue";
const _e = {
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
  },
  equalProportion: {
    // 是否等比例缩放
    type: Boolean
  }
};
function q(o, n) {
  const e = (t) => {
    n && n(t), document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", e), document.removeEventListener("mouseleave", e), document.removeEventListener("touchmove", o), document.removeEventListener("touchend", e);
  };
  document.addEventListener("mousemove", o), document.addEventListener("mouseup", e), document.addEventListener("mouseleave", e), document.addEventListener("touchmove", o), document.addEventListener("touchend", e);
}
function _(o) {
  let n = 0, e = 0;
  if (Be(o)) {
    const t = o.targetTouches[0];
    n = t.pageX, e = t.pageY;
  } else
    n = o.clientX, e = o.clientY;
  return { clientX: n, clientY: e };
}
function Be(o) {
  const n = Object.prototype.toString.call(o);
  return n.substring(8, n.length - 1) === "TouchEvent";
}
const C = (o = 0) => parseInt(o + "") + "px", F = {
  n: "top",
  s: "bottom",
  e: "right",
  w: "left",
  ne: "top-right",
  nw: "top-left",
  se: "bottom-right",
  sw: "bottom-left"
}, j = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ne = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }, xe = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }, Se = (o, n) => {
  const e = xe[Math.floor(o / 30)], s = (Ne[n] + e) % 8;
  return j[s];
}, ae = (o = 0, n) => {
  let e = [];
  for (let t = 0; t < j.length; t++) {
    const s = j[t], [u, l] = F[s].split("-"), d = Se(o, s), i = { [u]: "0%", cursor: d + "-resize", side: F[s] };
    if (l)
      i[l] = "0%";
    else {
      const v = ["top", "bottom"].includes(u) ? "left" : "top";
      i[v] = "50%";
    }
    n ? n.includes(F[s]) && e.push(i) : e.push(i);
  }
  return e;
}, J = (o) => o * Math.PI / 180, Te = (o, n) => Math.sqrt(o * o + n * n), p = (o) => Math.cos(J(o)), m = (o) => Math.sin(J(o)), Pe = (o, n, e, t, s, u, l) => {
  let { width: d, height: i, centerX: v, centerY: y, rotateAngle: a } = n;
  const f = d < 0 ? -1 : 1, g = i < 0 ? -1 : 1;
  switch (d = Math.abs(d), i = Math.abs(i), o) {
    case "right": {
      const c = R(d, e, u);
      d = c.width, e = c.deltaW, s ? (t = e / s, i = d / s, v += e / 2 * p(a) - t / 2 * m(a), y += e / 2 * m(a) + t / 2 * p(a)) : (v += e / 2 * p(a), y += e / 2 * m(a));
      break;
    }
    case "top-right": {
      t = -t;
      const c = R(d, e, u);
      d = c.width, e = c.deltaW;
      const r = L(i, t, l);
      i = r.height, t = r.deltaH, s && (e = t * s, d = i * s), v += e / 2 * p(a) + t / 2 * m(a), y += e / 2 * m(a) - t / 2 * p(a);
      break;
    }
    case "bottom-right": {
      const c = R(d, e, u);
      d = c.width, e = c.deltaW;
      const r = L(i, t, l);
      i = r.height, t = r.deltaH, s && (e = t * s, d = i * s), v += e / 2 * p(a) - t / 2 * m(a), y += e / 2 * m(a) + t / 2 * p(a);
      break;
    }
    case "bottom": {
      const c = L(i, t, l);
      i = c.height, t = c.deltaH, s ? (e = t * s, d = i * s, v += e / 2 * p(a) - t / 2 * m(a), y += e / 2 * m(a) + t / 2 * p(a)) : (v -= t / 2 * m(a), y += t / 2 * p(a));
      break;
    }
    case "bottom-left": {
      e = -e;
      const c = R(d, e, u);
      d = c.width, e = c.deltaW;
      const r = L(i, t, l);
      i = r.height, t = r.deltaH, s && (i = d / s, t = e / s), v -= e / 2 * p(a) + t / 2 * m(a), y -= e / 2 * m(a) - t / 2 * p(a);
      break;
    }
    case "left": {
      e = -e;
      const c = R(d, e, u);
      d = c.width, e = c.deltaW, s ? (i = d / s, t = e / s, v -= e / 2 * p(a) + t / 2 * m(a), y -= e / 2 * m(a) - t / 2 * p(a)) : (v -= e / 2 * p(a), y -= e / 2 * m(a));
      break;
    }
    case "top-left": {
      e = -e, t = -t;
      const c = R(d, e, u);
      d = c.width, e = c.deltaW;
      const r = L(i, t, l);
      i = r.height, t = r.deltaH, s && (d = i * s, e = t * s), v -= e / 2 * p(a) - t / 2 * m(a), y -= e / 2 * m(a) + t / 2 * p(a);
      break;
    }
    case "top": {
      t = -t;
      const c = L(i, t, l);
      i = c.height, t = c.deltaH, s ? (d = i * s, e = t * s, v += e / 2 * p(a) + t / 2 * m(a), y += e / 2 * m(a) - t / 2 * p(a)) : (v += t / 2 * m(a), y -= t / 2 * p(a));
      break;
    }
  }
  return {
    position: {
      centerX: v,
      centerY: y
    },
    size: {
      width: d * f,
      height: i * g
    }
  };
}, L = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { height: o, deltaH: n };
}, R = (o, n, e) => {
  const t = o + n;
  return t > e ? o = t : (n = e - o, o = e), { width: o, deltaW: n };
}, Ce = ({ centerX: o, centerY: n, width: e, height: t, angle: s }) => ({
  top: n - t / 2,
  left: o - e / 2,
  width: e,
  height: t,
  angle: s
}), $e = (o, n, e) => {
  const { width: t, height: s } = o;
  return {
    width: Math.abs(t),
    height: Math.abs(s),
    left: n - Math.abs(t) / 2,
    top: e - Math.abs(s) / 2
  };
};
function G(o, n) {
  const e = Math.abs(o) % n, t = o > 0 ? n : -n;
  let s = 0;
  return e > n / 2 ? s = t * Math.ceil(Math.abs(o) / n) : s = t * Math.floor(Math.abs(o) / n), s;
}
function Ie(o, n, e) {
  const t = X(!1), s = X(!1), u = X({
    width: n.width,
    height: n.height,
    left: n.left,
    top: n.top,
    angle: n.angle
  }), l = /* @__PURE__ */ new Set();
  function d(f) {
    if (l.add(f.button), n.disabled)
      return;
    t.value = !0, s.value = !0;
    let { clientX: g, clientY: c } = _(f);
    const { left: r, top: h } = u.value;
    let w = 0, M = 0;
    n.boundary && ([w, M] = i()), e && e("drag-start", u.value), q((E) => {
      if (l.size > 1)
        return;
      const { clientX: B, clientY: N } = _(E);
      let A = (B - g) / n.scaleRatio + r, D = (N - c) / n.scaleRatio + h;
      if (n.snapToGrid) {
        let { left: x, top: S } = u.value;
        const k = A - x, K = D - S;
        A = x + G(k, n.gridX), D = S + G(K, n.gridY);
      }
      n.boundary && ([A, D] = v(A, D, w, M)), u.value.left = A, u.value.top = D, e && e("drag", u.value);
    }, (E) => {
      l.clear(), t.value = !1, document.addEventListener("click", y, { once: !0 }), e && e("drag-end", u.value);
    });
  }
  const i = () => {
    const { width: f, height: g } = u.value, r = (o.value.parentElement || document.body).getBoundingClientRect(), h = r.width / n.scaleRatio - f, w = r.height / n.scaleRatio - g;
    return [h, w];
  }, v = (f, g, c, r) => (f = f < 0 ? 0 : f, f = f > c ? c : f, g = g < 0 ? 0 : g, g = g > r ? r : g, [f, g]), y = () => {
    s.value = !1;
  }, a = (f) => {
    if (t.value)
      return;
    let { left: g, top: c } = u.value;
    if (["ArrowRight", "ArrowLeft"].includes(f.key)) {
      const r = f.key === "ArrowRight";
      let h = r ? 1 : -1;
      n.snapToGrid && (h = r ? n.gridX : -n.gridX), g = g + h;
    } else if (["ArrowUp", "ArrowDown"].includes(f.key)) {
      const r = f.key === "ArrowDown";
      let h = r ? 1 : -1;
      n.snapToGrid && (h = r ? n.gridY : -n.gridY), c = c + h;
    }
    if (n.boundary) {
      const [r, h] = i();
      [g, c] = v(g, c, r, h);
    }
    u.value.left = g, u.value.top = c;
  };
  return Ee(() => {
    if (o.value) {
      if (!u.value.width && !u.value.height) {
        const { width: f, height: g } = o.value.getBoundingClientRect();
        u.value = { ...u.value, width: f || 100, height: g || 100 }, e("change", { ...u.value });
      }
      o.value.addEventListener("mousedown", d), o.value.addEventListener("touchstart", d, { passive: !0 });
    }
  }), O(s, (f) => {
    n.disabledKeyEvent || (f ? document.addEventListener("keydown", a) : document.removeEventListener("keydown", a));
  }), Ae(() => {
    document.removeEventListener("keydown", a);
  }), {
    isMousedown: t,
    selected: s,
    dragData: u
  };
}
const Ve = /* @__PURE__ */ V("div", { class: "es-drager-rotate-handle" }, [
  /* @__PURE__ */ V("svg", {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ V("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    })
  ])
], -1), Ge = /* @__PURE__ */ ce({
  __name: "rotate",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    element: {
      type: Object
    }
  },
  emits: ["update:modelValue", "rotate", "rotate-start", "rotate-end"],
  setup(o, { emit: n }) {
    const e = o, t = X(null), s = $({
      get: () => e.modelValue,
      set: (l) => {
        n("update:modelValue", l);
      }
    });
    function u(l) {
      if (!e.element)
        return console.warn("[es-drager] rotate component need drag element property");
      l.stopPropagation();
      const { width: d, height: i, left: v, top: y } = e.element.getBoundingClientRect(), a = v + d / 2, f = y + i / 2;
      n("rotate-start", s.value), q((g) => {
        const { clientX: c, clientY: r } = _(g), h = a - c, w = f - r, b = Math.atan2(w, h) * 180 / Math.PI - 90;
        s.value = (b + 360) % 360, n("rotate", s.value);
      }, () => {
        n("rotate-end", s.value);
      });
    }
    return (l, d) => (Y(), U("div", {
      ref_key: "rotateRef",
      ref: t,
      class: "es-drager-rotate",
      onMousedown: u,
      onTouchstartPassive: u
    }, [
      I(l.$slots, "default", {}, () => [
        Ve
      ])
    ], 544));
  }
});
const Ke = ["data-side", "onMousedown", "onTouchstartPassive"], Fe = /* @__PURE__ */ V("div", { class: "es-drager-dot-handle" }, null, -1), ie = /* @__PURE__ */ ce({
  __name: "drager",
  props: _e,
  emits: ["change", "drag", "drag-start", "drag-end", "resize", "resize-start", "resize-end", "rotate", "rotate-start", "rotate-end"],
  setup(o, { emit: n }) {
    const e = o, t = (r, ...h) => {
      n(r, ...h), n("change", ...h);
    }, s = X(null), { selected: u, dragData: l, isMousedown: d } = Ie(s, e, t), i = X(ae(0, e.resizeList)), v = $(() => e.resizable && !e.disabled), y = $(() => e.rotatable && !e.disabled && u.value), a = $(() => {
      const { width: r, height: h, left: w, top: M, angle: b } = l.value, E = {};
      return r && (E.width = C(r)), h && (E.height = C(h)), {
        ...E,
        left: C(w),
        top: C(M),
        zIndex: e.zIndex,
        transform: `rotate(${b}deg)`,
        "--es-drager-color": e.color
      };
    });
    function f(r) {
      s.value || (s.value = r.$el || r);
    }
    function g(r) {
      i.value = ae(r, e.resizeList), t("rotate-end", l.value);
    }
    function c(r, h) {
      h.stopPropagation();
      const { clientX: w, clientY: M } = _(h), b = w, E = M, { width: B, height: N, left: A, top: D } = l.value, x = A + B / 2, S = D + N / 2, k = { width: B, height: N, centerX: x, centerY: S, rotateAngle: l.value.angle }, K = r.side, { minWidth: le, minHeight: ue, aspectRatio: Q, equalProportion: de } = e;
      t("resize-start", l.value), q((Z) => {
        const { clientX: he, clientY: fe } = _(Z);
        let T = (he - b) / e.scaleRatio, P = (fe - E) / e.scaleRatio;
        e.snapToGrid && (T = G(T, e.gridX), P = G(P, e.gridY));
        const ge = Math.atan2(P, T), H = Te(T, P), ve = Z.shiftKey, W = ge - J(k.rotateAngle), we = H * Math.cos(W), pe = H * Math.sin(W), me = (de || ve) && !Q ? k.width / k.height : Q, {
          position: { centerX: ee, centerY: te },
          size: { width: ye, height: be }
        } = Pe(K, { ...k, rotateAngle: k.rotateAngle }, we, pe, me, le, ue), Me = Ce({
          centerX: ee,
          centerY: te,
          width: ye,
          height: be,
          angle: l.value.angle
        });
        l.value = {
          ...l.value,
          ...$e(Me, ee, te)
        }, t("resize", l.value);
      }, () => {
        t("resize-end", l.value);
      });
    }
    return O(() => [
      e.width,
      e.height,
      e.left,
      e.top,
      e.angle
    ], ([r, h, w, M, b]) => {
      l.value = {
        ...l.value,
        width: r,
        height: h,
        left: w,
        top: M,
        angle: b
      };
    }), O(() => e.selected, (r) => {
      u.value = r;
    }, { immediate: !0 }), (r, h) => (Y(), ne(De(r.tag), {
      ref: f,
      class: ke(["es-drager", { disabled: r.disabled, dragging: z(d), selected: z(u), border: r.border }]),
      style: oe(a.value),
      onClick: h[3] || (h[3] = ze(() => {
      }, ["stop"]))
    }, {
      default: se(() => [
        I(r.$slots, "default"),
        v.value ? (Y(!0), U(Le, { key: 0 }, Re(i.value, (w, M) => (Y(), U("div", {
          key: M,
          class: "es-drager-dot",
          "data-side": w.side,
          style: oe({ ...w }),
          onMousedown: (b) => c(w, b),
          onTouchstartPassive: (b) => c(w, b)
        }, [
          I(r.$slots, "resize", Xe(Ye({ side: w.side })), () => [
            Fe
          ])
        ], 44, Ke))), 128)) : re("", !0),
        y.value ? (Y(), ne(Ge, {
          key: 1,
          modelValue: z(l).angle,
          "onUpdate:modelValue": h[0] || (h[0] = (w) => z(l).angle = w),
          element: s.value,
          onRotate: h[1] || (h[1] = (w) => t("rotate", z(l))),
          onRotateStart: h[2] || (h[2] = (w) => t("rotate-start", z(l))),
          onRotateEnd: g
        }, {
          default: se(() => [
            I(r.$slots, "rotate")
          ]),
          _: 3
        }, 8, ["modelValue", "element"])) : re("", !0)
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
const Oe = (o) => {
  o.component("es-drager", ie);
};
ie.install = Oe;
export {
  ie as ESDrager,
  ie as default,
  Oe as install
};
