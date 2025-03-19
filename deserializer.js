function Tg(e) {
    let t;
    e = (e = e.replace(/-/g, "+")).replace(/_/g, "/");
    try {
        t = atob(e)
    } catch (e) {
        return null
    }
    const n = new Uint8Array(t.length);
    for (let e = 0; e < t.length; ++e) {
        const i = t.charCodeAt(e);
        if (i > 255)
            return null;
        n[e] = i
    }
    return n
}

const qf = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
let Xf = {
    assign: function(e) {
        const t = Array.prototype.slice.call(arguments, 1);
        for (; t.length; ) {
            const n = t.shift();
            if (n) {
                if ("object" != typeof n)
                    throw new TypeError(n + "must be non-object");
                for (const t in n)
                    qf(n, t) && (e[t] = n[t])
            }
        }
        return e
    },
    flattenChunks: e => {
        let t = 0;
        for (let n = 0, i = e.length; n < i; n++)
            t += e[n].length;
        const n = new Uint8Array(t);
        for (let t = 0, i = 0, r = e.length; t < r; t++) {
            let r = e[t];
            n.set(r, i),
                i += r.length
        }
        return n
    }
};

var Jf = function() {
    this.input = null,
        this.next_in = 0,
        this.avail_in = 0,
        this.total_in = 0,
        this.output = null,
        this.next_out = 0,
        this.avail_out = 0,
        this.total_out = 0,
        this.msg = "",
        this.state = null,
        this.data_type = 2,
        this.adler = 0
};
Xp = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
};
const {Z_FINISH: xm, Z_BLOCK: _m, Z_TREES: km, Z_OK: Em, Z_STREAM_END: Sm, Z_NEED_DICT: Mm, Z_STREAM_ERROR: Tm, Z_DATA_ERROR: Am, Z_MEM_ERROR: Cm, Z_BUF_ERROR: Pm, Z_DEFLATED: Rm} = Xp,
    Lm = 16180
function Hm() {
    this.strm = null,
        this.mode = 0,
        this.last = !1,
        this.wrap = 0,
        this.havedict = !1,
        this.flags = 0,
        this.dmax = 0,
        this.check = 0,
        this.total = 0,
        this.head = null,
        this.wbits = 0,
        this.wsize = 0,
        this.whave = 0,
        this.wnext = 0,
        this.window = null,
        this.hold = 0,
        this.bits = 0,
        this.length = 0,
        this.offset = 0,
        this.extra = 0,
        this.lencode = null,
        this.distcode = null,
        this.lenbits = 0,
        this.distbits = 0,
        this.ncode = 0,
        this.nlen = 0,
        this.ndist = 0,
        this.have = 0,
        this.next = null,
        this.lens = new Uint16Array(320),
        this.work = new Uint16Array(288),
        this.lendyn = null,
        this.distdyn = null,
        this.sane = 0,
        this.back = 0,
        this.was = 0
}
const Vm = e => {
    if (!e)
        return 1;
    const t = e.state;
    return !t || t.strm !== e || t.mode < Lm || t.mode > 16211 ? 1 : 0
}

Gm = e => {
    if (Vm(e))
        return Tm;
    const t = e.state;
    return e.total_in = e.total_out = t.total = 0,
        e.msg = "",
    t.wrap && (e.adler = 1 & t.wrap),
        t.mode = Lm,
        t.last = 0,
        t.havedict = 0,
        t.flags = -1,
        t.dmax = 32768,
        t.head = null,
        t.hold = 0,
        t.bits = 0,
        t.lencode = t.lendyn = new Int32Array(852),
        t.distcode = t.distdyn = new Int32Array(592),
        t.sane = 1,
        t.back = -1,
        Em
}
jm = e => {
    if (Vm(e))
        return Tm;
    const t = e.state;
    return t.wsize = 0,
        t.whave = 0,
        t.wnext = 0,
        Gm(e)
}

qm = (e, t) => {
    let n;
    if (Vm(e))
        return Tm;
    const i = e.state;
    return t < 0 ? (n = 0,
        t = -t) : (n = 5 + (t >> 4),
    t < 48 && (t &= 15)),
        t && (t < 8 || t > 15) ? Tm : (null !== i.window && i.wbits !== t && (i.window = null),
            i.wrap = n,
            i.wbits = t,
            jm(e))
}

Xm = (e, t) => {
    if (!e)
        return Tm;
    const n = new Hm;
    e.state = n,
        n.strm = e,
        n.window = null,
        n.mode = Lm;
    const i = qm(e, t);
    return i !== Em && (e.state = null),
        i
}

tg = (e, t) => {
    if (Vm(e))
        return Tm;
    const n = e.state;
    return 2 & n.wrap ? (n.head = t,
        t.done = !1,
        Em) : Tm
}

ng = (e, t) => {
    const n = t.length;
    let i, r, a;
    return Vm(e) ? Tm : (i = e.state,
        0 !== i.wrap && i.mode !== Im ? Tm : i.mode === Im && (r = 1,
            r = Vp(r, t, n, 0),
        r !== i.check) ? Am : (a = Qm(e, t, n, n),
            a ? (i.mode = 16210,
                Cm) : (i.havedict = 1,
                Em)))
}

const Im = 16190
    , Nm = 16191
    , Dm = 16192
    , Um = 16194
    , Bm = 16199
    , Om = 16200
    , zm = 16206
    , Fm = 16209
    , Wm = e => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);

const mm = 15
    , gm = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0])
    , vm = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78])
    , wm = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0])
    , ym = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);


var bm = (e, t, n, i, r, a, o, s) => {
    const l = s.bits;
    let c, h, d, u, p, f, m = 0, g = 0, v = 0, w = 0, y = 0, b = 0, x = 0, _ = 0, k = 0, E = 0, S = null;
    const M = new Uint16Array(16)
        , T = new Uint16Array(16);
    let A, C, P, R = null;
    for (m = 0; m <= mm; m++)
        M[m] = 0;
    for (g = 0; g < i; g++)
        M[t[n + g]]++;
    for (y = l,
             w = mm; w >= 1 && 0 === M[w]; w--)
        ;
    if (y > w && (y = w),
    0 === w)
        return r[a++] = 20971520,
            r[a++] = 20971520,
            s.bits = 1,
            0;
    for (v = 1; v < w && 0 === M[v]; v++)
        ;
    for (y < v && (y = v),
             _ = 1,
             m = 1; m <= mm; m++)
        if (_ <<= 1,
            _ -= M[m],
        _ < 0)
            return -1;
    if (_ > 0 && (0 === e || 1 !== w))
        return -1;
    for (T[1] = 0,
             m = 1; m < mm; m++)
        T[m + 1] = T[m] + M[m];
    for (g = 0; g < i; g++)
        0 !== t[n + g] && (o[T[t[n + g]]++] = g);
    if (0 === e ? (S = R = o,
        f = 20) : 1 === e ? (S = gm,
        R = vm,
        f = 257) : (S = wm,
        R = ym,
        f = 0),
        E = 0,
        g = 0,
        m = v,
        p = a,
        b = y,
        x = 0,
        d = -1,
        k = 1 << y,
        u = k - 1,
    1 === e && k > 852 || 2 === e && k > 592)
        return 1;
    for (; ; ) {
        A = m - x,
            o[g] + 1 < f ? (C = 0,
                P = o[g]) : o[g] >= f ? (C = R[o[g] - f],
                P = S[o[g] - f]) : (C = 96,
                P = 0),
            c = 1 << m - x,
            h = 1 << b,
            v = h;
        do {
            h -= c,
                r[p + (E >> x) + h] = A << 24 | C << 16 | P
        } while (0 !== h);
        for (c = 1 << m - 1; E & c; )
            c >>= 1;
        if (0 !== c ? (E &= c - 1,
            E += c) : E = 0,
            g++,
        0 == --M[m]) {
            if (m === w)
                break;
            m = t[n + o[g]]
        }
        if (m > y && (E & u) !== d) {
            for (0 === x && (x = y),
                     p += v,
                     b = m - x,
                     _ = 1 << b; b + x < w && (_ -= M[b + x],
                !(_ <= 0)); )
                b++,
                    _ <<= 1;
            if (k += 1 << b,
            1 === e && k > 852 || 2 === e && k > 592)
                return 1;
            d = E & u,
                r[d] = y << 24 | b << 16 | p - a
        }
    }
    return 0 !== E && (r[p + E] = m - x << 24 | 64 << 16),
        s.bits = y,
        0
}

var fm = function(e, t) {
    let n, i, r, a, o, s, l, c, h, d, u, p, f, m, g, v, w, y, b, x, _, k, E, S;
    const M = e.state;
    n = e.next_in,
        E = e.input,
        i = n + (e.avail_in - 5),
        r = e.next_out,
        S = e.output,
        a = r - (t - e.avail_out),
        o = r + (e.avail_out - 257),
        s = M.dmax,
        l = M.wsize,
        c = M.whave,
        h = M.wnext,
        d = M.window,
        u = M.hold,
        p = M.bits,
        f = M.lencode,
        m = M.distcode,
        g = (1 << M.lenbits) - 1,
        v = (1 << M.distbits) - 1;
    e: do {
        p < 15 && (u += E[n++] << p,
            p += 8,
            u += E[n++] << p,
            p += 8),
            w = f[u & g];
        t: for (; ; ) {
            if (y = w >>> 24,
                u >>>= y,
                p -= y,
                y = w >>> 16 & 255,
            0 === y)
                S[r++] = 65535 & w;
            else {
                if (!(16 & y)) {
                    if (64 & y) {
                        if (32 & y) {
                            M.mode = 16191;
                            break e
                        }
                        e.msg = "invalid literal/length code",
                            M.mode = pm;
                        break e
                    }
                    w = f[(65535 & w) + (u & (1 << y) - 1)];
                    continue t
                }
                for (b = 65535 & w,
                         y &= 15,
                     y && (p < y && (u += E[n++] << p,
                         p += 8),
                         b += u & (1 << y) - 1,
                         u >>>= y,
                         p -= y),
                     p < 15 && (u += E[n++] << p,
                         p += 8,
                         u += E[n++] << p,
                         p += 8),
                         w = m[u & v]; ; ) {
                    if (y = w >>> 24,
                        u >>>= y,
                        p -= y,
                        y = w >>> 16 & 255,
                    16 & y) {
                        if (x = 65535 & w,
                            y &= 15,
                        p < y && (u += E[n++] << p,
                            p += 8,
                        p < y && (u += E[n++] << p,
                            p += 8)),
                            x += u & (1 << y) - 1,
                        x > s) {
                            e.msg = "invalid distance too far back",
                                M.mode = pm;
                            break e
                        }
                        if (u >>>= y,
                            p -= y,
                            y = r - a,
                        x > y) {
                            if (y = x - y,
                            y > c && M.sane) {
                                e.msg = "invalid distance too far back",
                                    M.mode = pm;
                                break e
                            }
                            if (_ = 0,
                                k = d,
                            0 === h) {
                                if (_ += l - y,
                                y < b) {
                                    b -= y;
                                    do {
                                        S[r++] = d[_++]
                                    } while (--y);
                                    _ = r - x,
                                        k = S
                                }
                            } else if (h < y) {
                                if (_ += l + h - y,
                                    y -= h,
                                y < b) {
                                    b -= y;
                                    do {
                                        S[r++] = d[_++]
                                    } while (--y);
                                    if (_ = 0,
                                    h < b) {
                                        y = h,
                                            b -= y;
                                        do {
                                            S[r++] = d[_++]
                                        } while (--y);
                                        _ = r - x,
                                            k = S
                                    }
                                }
                            } else if (_ += h - y,
                            y < b) {
                                b -= y;
                                do {
                                    S[r++] = d[_++]
                                } while (--y);
                                _ = r - x,
                                    k = S
                            }
                            for (; b > 2; )
                                S[r++] = k[_++],
                                    S[r++] = k[_++],
                                    S[r++] = k[_++],
                                    b -= 3;
                            b && (S[r++] = k[_++],
                            b > 1 && (S[r++] = k[_++]))
                        } else {
                            _ = r - x;
                            do {
                                S[r++] = S[_++],
                                    S[r++] = S[_++],
                                    S[r++] = S[_++],
                                    b -= 3
                            } while (b > 2);
                            b && (S[r++] = S[_++],
                            b > 1 && (S[r++] = S[_++]))
                        }
                        break
                    }
                    if (64 & y) {
                        e.msg = "invalid distance code",
                            M.mode = pm;
                        break e
                    }
                    w = m[(65535 & w) + (u & (1 << y) - 1)]
                }
            }
            break
        }
    } while (n < i && r < o);
    b = p >> 3,
        n -= b,
        p -= b << 3,
        u &= (1 << p) - 1,
        e.next_in = n,
        e.next_out = r,
        e.avail_in = n < i ? i - n + 5 : 5 - (n - i),
        e.avail_out = r < o ? o - r + 257 : 257 - (r - o),
        M.hold = u,
        M.bits = p
};
var jp = (e, t, n, i) => {
    const r = Gp
        , a = i + n;
    e ^= -1;
    for (let n = i; n < a; n++)
        e = e >>> 8 ^ r[255 & (e ^ t[n])];
    return ~e
}
var Vp = (e, t, n, i) => {
    let r = 65535 & e
        , a = e >>> 16 & 65535
        , o = 0;
    for (; 0 !== n; ) {
        o = n > 2e3 ? 2e3 : n,
            n -= o;
        do {
            r = r + t[i++] | 0,
                a = a + r | 0
        } while (--o);
        r %= 65521,
            a %= 65521
    }
    return r | a << 16
}
var $m = (e, t) => {
    let n, i, r, a, o, s, l, c, h, d, u, p, f, m, g, v, w, y, b, x, _, k, E = 0;
    const S = new Uint8Array(4);
    let M, T;
    const A = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    if (Vm(e) || !e.output || !e.input && 0 !== e.avail_in)
        return Tm;
    n = e.state,
    n.mode === Nm && (n.mode = Dm),
        o = e.next_out,
        r = e.output,
        l = e.avail_out,
        a = e.next_in,
        i = e.input,
        s = e.avail_in,
        c = n.hold,
        h = n.bits,
        d = s,
        u = l,
        k = Em;
    e: for (; ; )
        switch (n.mode) {
            case Lm:
                if (0 === n.wrap) {
                    n.mode = Dm;
                    break
                }
                for (; h < 16; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                if (2 & n.wrap && 35615 === c) {
                    0 === n.wbits && (n.wbits = 15),
                        n.check = 0,
                        S[0] = 255 & c,
                        S[1] = c >>> 8 & 255,
                        n.check = jp(n.check, S, 2, 0),
                        c = 0,
                        h = 0,
                        n.mode = 16181;
                    break
                }
                if (n.head && (n.head.done = !1),
                !(1 & n.wrap) || (((255 & c) << 8) + (c >> 8)) % 31) {
                    e.msg = "incorrect header check",
                        n.mode = Fm;
                    break
                }
                if ((15 & c) !== Rm) {
                    e.msg = "unknown compression method",
                        n.mode = Fm;
                    break
                }
                if (c >>>= 4,
                    h -= 4,
                    _ = 8 + (15 & c),
                0 === n.wbits && (n.wbits = _),
                _ > 15 || _ > n.wbits) {
                    e.msg = "invalid window size",
                        n.mode = Fm;
                    break
                }
                n.dmax = 1 << n.wbits,
                    n.flags = 0,
                    e.adler = n.check = 1,
                    n.mode = 512 & c ? 16189 : Nm,
                    c = 0,
                    h = 0;
                break;
            case 16181:
                for (; h < 16; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                if (n.flags = c,
                (255 & n.flags) !== Rm) {
                    e.msg = "unknown compression method",
                        n.mode = Fm;
                    break
                }
                if (57344 & n.flags) {
                    e.msg = "unknown header flags set",
                        n.mode = Fm;
                    break
                }
                n.head && (n.head.text = c >> 8 & 1),
                512 & n.flags && 4 & n.wrap && (S[0] = 255 & c,
                    S[1] = c >>> 8 & 255,
                    n.check = jp(n.check, S, 2, 0)),
                    c = 0,
                    h = 0,
                    n.mode = 16182;
            case 16182:
                for (; h < 32; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                n.head && (n.head.time = c),
                512 & n.flags && 4 & n.wrap && (S[0] = 255 & c,
                    S[1] = c >>> 8 & 255,
                    S[2] = c >>> 16 & 255,
                    S[3] = c >>> 24 & 255,
                    n.check = jp(n.check, S, 4, 0)),
                    c = 0,
                    h = 0,
                    n.mode = 16183;
            case 16183:
                for (; h < 16; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                n.head && (n.head.xflags = 255 & c,
                    n.head.os = c >> 8),
                512 & n.flags && 4 & n.wrap && (S[0] = 255 & c,
                    S[1] = c >>> 8 & 255,
                    n.check = jp(n.check, S, 2, 0)),
                    c = 0,
                    h = 0,
                    n.mode = 16184;
            case 16184:
                if (1024 & n.flags) {
                    for (; h < 16; ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    n.length = c,
                    n.head && (n.head.extra_len = c),
                    512 & n.flags && 4 & n.wrap && (S[0] = 255 & c,
                        S[1] = c >>> 8 & 255,
                        n.check = jp(n.check, S, 2, 0)),
                        c = 0,
                        h = 0
                } else
                    n.head && (n.head.extra = null);
                n.mode = 16185;
            case 16185:
                if (1024 & n.flags && (p = n.length,
                p > s && (p = s),
                p && (n.head && (_ = n.head.extra_len - n.length,
                n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)),
                    n.head.extra.set(i.subarray(a, a + p), _)),
                512 & n.flags && 4 & n.wrap && (n.check = jp(n.check, i, p, a)),
                    s -= p,
                    a += p,
                    n.length -= p),
                    n.length))
                    break e;
                n.length = 0,
                    n.mode = 16186;
            case 16186:
                if (2048 & n.flags) {
                    if (0 === s)
                        break e;
                    p = 0;
                    do {
                        _ = i[a + p++],
                        n.head && _ && n.length < 65536 && (n.head.name += String.fromCharCode(_))
                    } while (_ && p < s);
                    if (512 & n.flags && 4 & n.wrap && (n.check = jp(n.check, i, p, a)),
                        s -= p,
                        a += p,
                        _)
                        break e
                } else
                    n.head && (n.head.name = null);
                n.length = 0,
                    n.mode = 16187;
            case 16187:
                if (4096 & n.flags) {
                    if (0 === s)
                        break e;
                    p = 0;
                    do {
                        _ = i[a + p++],
                        n.head && _ && n.length < 65536 && (n.head.comment += String.fromCharCode(_))
                    } while (_ && p < s);
                    if (512 & n.flags && 4 & n.wrap && (n.check = jp(n.check, i, p, a)),
                        s -= p,
                        a += p,
                        _)
                        break e
                } else
                    n.head && (n.head.comment = null);
                n.mode = 16188;
            case 16188:
                if (512 & n.flags) {
                    for (; h < 16; ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    if (4 & n.wrap && c !== (65535 & n.check)) {
                        e.msg = "header crc mismatch",
                            n.mode = Fm;
                        break
                    }
                    c = 0,
                        h = 0
                }
                n.head && (n.head.hcrc = n.flags >> 9 & 1,
                    n.head.done = !0),
                    e.adler = n.check = 0,
                    n.mode = Nm;
                break;
            case 16189:
                for (; h < 32; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                e.adler = n.check = Wm(c),
                    c = 0,
                    h = 0,
                    n.mode = Im;
            case Im:
                if (0 === n.havedict)
                    return e.next_out = o,
                        e.avail_out = l,
                        e.next_in = a,
                        e.avail_in = s,
                        n.hold = c,
                        n.bits = h,
                        Mm;
                e.adler = n.check = 1,
                    n.mode = Nm;
            case Nm:
                if (t === _m || t === km)
                    break e;
            case Dm:
                if (n.last) {
                    c >>>= 7 & h,
                        h -= 7 & h,
                        n.mode = zm;
                    break
                }
                for (; h < 3; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                switch (n.last = 1 & c,
                    c >>>= 1,
                    h -= 1,
                3 & c) {
                    case 0:
                        n.mode = 16193;
                        break;
                    case 1:
                        if (Jm(n),
                            n.mode = Bm,
                        t === km) {
                            c >>>= 2,
                                h -= 2;
                            break e
                        }
                        break;
                    case 2:
                        n.mode = 16196;
                        break;
                    case 3:
                        e.msg = "invalid block type",
                            n.mode = Fm
                }
                c >>>= 2,
                    h -= 2;
                break;
            case 16193:
                for (c >>>= 7 & h,
                         h -= 7 & h; h < 32; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                if ((65535 & c) != (c >>> 16 ^ 65535)) {
                    e.msg = "invalid stored block lengths",
                        n.mode = Fm;
                    break
                }
                if (n.length = 65535 & c,
                    c = 0,
                    h = 0,
                    n.mode = Um,
                t === km)
                    break e;
            case Um:
                n.mode = 16195;
            case 16195:
                if (p = n.length,
                    p) {
                    if (p > s && (p = s),
                    p > l && (p = l),
                    0 === p)
                        break e;
                    r.set(i.subarray(a, a + p), o),
                        s -= p,
                        a += p,
                        l -= p,
                        o += p,
                        n.length -= p;
                    break
                }
                n.mode = Nm;
                break;
            case 16196:
                for (; h < 14; ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                if (n.nlen = 257 + (31 & c),
                    c >>>= 5,
                    h -= 5,
                    n.ndist = 1 + (31 & c),
                    c >>>= 5,
                    h -= 5,
                    n.ncode = 4 + (15 & c),
                    c >>>= 4,
                    h -= 4,
                n.nlen > 286 || n.ndist > 30) {
                    e.msg = "too many length or distance symbols",
                        n.mode = Fm;
                    break
                }
                n.have = 0,
                    n.mode = 16197;
            case 16197:
                for (; n.have < n.ncode; ) {
                    for (; h < 3; ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    n.lens[A[n.have++]] = 7 & c,
                        c >>>= 3,
                        h -= 3
                }
                for (; n.have < 19; )
                    n.lens[A[n.have++]] = 0;
                if (n.lencode = n.lendyn,
                    n.lenbits = 7,
                    M = {
                        bits: n.lenbits
                    },
                    k = bm(0, n.lens, 0, 19, n.lencode, 0, n.work, M),
                    n.lenbits = M.bits,
                    k) {
                    e.msg = "invalid code lengths set",
                        n.mode = Fm;
                    break
                }
                n.have = 0,
                    n.mode = 16198;
            case 16198:
                for (; n.have < n.nlen + n.ndist; ) {
                    for (; E = n.lencode[c & (1 << n.lenbits) - 1],
                               g = E >>> 24,
                               v = E >>> 16 & 255,
                               w = 65535 & E,
                               !(g <= h); ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    if (w < 16)
                        c >>>= g,
                            h -= g,
                            n.lens[n.have++] = w;
                    else {
                        if (16 === w) {
                            for (T = g + 2; h < T; ) {
                                if (0 === s)
                                    break e;
                                s--,
                                    c += i[a++] << h,
                                    h += 8
                            }
                            if (c >>>= g,
                                h -= g,
                            0 === n.have) {
                                e.msg = "invalid bit length repeat",
                                    n.mode = Fm;
                                break
                            }
                            _ = n.lens[n.have - 1],
                                p = 3 + (3 & c),
                                c >>>= 2,
                                h -= 2
                        } else if (17 === w) {
                            for (T = g + 3; h < T; ) {
                                if (0 === s)
                                    break e;
                                s--,
                                    c += i[a++] << h,
                                    h += 8
                            }
                            c >>>= g,
                                h -= g,
                                _ = 0,
                                p = 3 + (7 & c),
                                c >>>= 3,
                                h -= 3
                        } else {
                            for (T = g + 7; h < T; ) {
                                if (0 === s)
                                    break e;
                                s--,
                                    c += i[a++] << h,
                                    h += 8
                            }
                            c >>>= g,
                                h -= g,
                                _ = 0,
                                p = 11 + (127 & c),
                                c >>>= 7,
                                h -= 7
                        }
                        if (n.have + p > n.nlen + n.ndist) {
                            e.msg = "invalid bit length repeat",
                                n.mode = Fm;
                            break
                        }
                        for (; p--; )
                            n.lens[n.have++] = _
                    }
                }
                if (n.mode === Fm)
                    break;
                if (0 === n.lens[256]) {
                    e.msg = "invalid code -- missing end-of-block",
                        n.mode = Fm;
                    break
                }
                if (n.lenbits = 9,
                    M = {
                        bits: n.lenbits
                    },
                    k = bm(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, M),
                    n.lenbits = M.bits,
                    k) {
                    e.msg = "invalid literal/lengths set",
                        n.mode = Fm;
                    break
                }
                if (n.distbits = 6,
                    n.distcode = n.distdyn,
                    M = {
                        bits: n.distbits
                    },
                    k = bm(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, M),
                    n.distbits = M.bits,
                    k) {
                    e.msg = "invalid distances set",
                        n.mode = Fm;
                    break
                }
                if (n.mode = Bm,
                t === km)
                    break e;
            case Bm:
                n.mode = Om;
            case Om:
                if (s >= 6 && l >= 258) {
                    e.next_out = o,
                        e.avail_out = l,
                        e.next_in = a,
                        e.avail_in = s,
                        n.hold = c,
                        n.bits = h,
                        fm(e, u),
                        o = e.next_out,
                        r = e.output,
                        l = e.avail_out,
                        a = e.next_in,
                        i = e.input,
                        s = e.avail_in,
                        c = n.hold,
                        h = n.bits,
                    n.mode === Nm && (n.back = -1);
                    break
                }
                for (n.back = 0; E = n.lencode[c & (1 << n.lenbits) - 1],
                    g = E >>> 24,
                    v = E >>> 16 & 255,
                    w = 65535 & E,
                    !(g <= h); ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                if (v && !(240 & v)) {
                    for (y = g,
                             b = v,
                             x = w; E = n.lencode[x + ((c & (1 << y + b) - 1) >> y)],
                             g = E >>> 24,
                             v = E >>> 16 & 255,
                             w = 65535 & E,
                             !(y + g <= h); ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    c >>>= y,
                        h -= y,
                        n.back += y
                }
                if (c >>>= g,
                    h -= g,
                    n.back += g,
                    n.length = w,
                0 === v) {
                    n.mode = 16205;
                    break
                }
                if (32 & v) {
                    n.back = -1,
                        n.mode = Nm;
                    break
                }
                if (64 & v) {
                    e.msg = "invalid literal/length code",
                        n.mode = Fm;
                    break
                }
                n.extra = 15 & v,
                    n.mode = 16201;
            case 16201:
                if (n.extra) {
                    for (T = n.extra; h < T; ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    n.length += c & (1 << n.extra) - 1,
                        c >>>= n.extra,
                        h -= n.extra,
                        n.back += n.extra
                }
                n.was = n.length,
                    n.mode = 16202;
            case 16202:
                for (; E = n.distcode[c & (1 << n.distbits) - 1],
                           g = E >>> 24,
                           v = E >>> 16 & 255,
                           w = 65535 & E,
                           !(g <= h); ) {
                    if (0 === s)
                        break e;
                    s--,
                        c += i[a++] << h,
                        h += 8
                }
                if (!(240 & v)) {
                    for (y = g,
                             b = v,
                             x = w; E = n.distcode[x + ((c & (1 << y + b) - 1) >> y)],
                             g = E >>> 24,
                             v = E >>> 16 & 255,
                             w = 65535 & E,
                             !(y + g <= h); ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    c >>>= y,
                        h -= y,
                        n.back += y
                }
                if (c >>>= g,
                    h -= g,
                    n.back += g,
                64 & v) {
                    e.msg = "invalid distance code",
                        n.mode = Fm;
                    break
                }
                n.offset = w,
                    n.extra = 15 & v,
                    n.mode = 16203;
            case 16203:
                if (n.extra) {
                    for (T = n.extra; h < T; ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    n.offset += c & (1 << n.extra) - 1,
                        c >>>= n.extra,
                        h -= n.extra,
                        n.back += n.extra
                }
                if (n.offset > n.dmax) {
                    e.msg = "invalid distance too far back",
                        n.mode = Fm;
                    break
                }
                n.mode = 16204;
            case 16204:
                if (0 === l)
                    break e;
                if (p = u - l,
                n.offset > p) {
                    if (p = n.offset - p,
                    p > n.whave && n.sane) {
                        e.msg = "invalid distance too far back",
                            n.mode = Fm;
                        break
                    }
                    p > n.wnext ? (p -= n.wnext,
                        f = n.wsize - p) : f = n.wnext - p,
                    p > n.length && (p = n.length),
                        m = n.window
                } else
                    m = r,
                        f = o - n.offset,
                        p = n.length;
                p > l && (p = l),
                    l -= p,
                    n.length -= p;
                do {
                    r[o++] = m[f++]
                } while (--p);
                0 === n.length && (n.mode = Om);
                break;
            case 16205:
                if (0 === l)
                    break e;
                r[o++] = n.length,
                    l--,
                    n.mode = Om;
                break;
            case zm:
                if (n.wrap) {
                    for (; h < 32; ) {
                        if (0 === s)
                            break e;
                        s--,
                            c |= i[a++] << h,
                            h += 8
                    }
                    if (u -= l,
                        e.total_out += u,
                        n.total += u,
                    4 & n.wrap && u && (e.adler = n.check = n.flags ? jp(n.check, r, u, o - u) : Vp(n.check, r, u, o - u)),
                        u = l,
                    4 & n.wrap && (n.flags ? c : Wm(c)) !== n.check) {
                        e.msg = "incorrect data check",
                            n.mode = Fm;
                        break
                    }
                    c = 0,
                        h = 0
                }
                n.mode = 16207;
            case 16207:
                if (n.wrap && n.flags) {
                    for (; h < 32; ) {
                        if (0 === s)
                            break e;
                        s--,
                            c += i[a++] << h,
                            h += 8
                    }
                    if (4 & n.wrap && c !== (4294967295 & n.total)) {
                        e.msg = "incorrect length check",
                            n.mode = Fm;
                        break
                    }
                    c = 0,
                        h = 0
                }
                n.mode = 16208;
            case 16208:
                k = Sm;
                break e;
            case Fm:
                k = Am;
                break e;
            case 16210:
                return Cm;
            default:
                return Tm
        }
    return e.next_out = o,
        e.avail_out = l,
        e.next_in = a,
        e.avail_in = s,
        n.hold = c,
        n.bits = h,
    (n.wsize || u !== e.avail_out && n.mode < Fm && (n.mode < zm || t !== xm)) && Qm(e, e.output, e.next_out, u - e.avail_out),
        d -= e.avail_in,
        u -= e.avail_out,
        e.total_in += d,
        e.total_out += u,
        n.total += u,
    4 & n.wrap && u && (e.adler = n.check = n.flags ? jp(n.check, r, u, e.next_out - u) : Vp(n.check, r, u, e.next_out - u)),
        e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Nm ? 128 : 0) + (n.mode === Bm || n.mode === Um ? 256 : 0),
    (0 === d && 0 === u || t === xm) && k === Em && (k = Pm),
        k
}
eg = e => {
    if (Vm(e))
        return Tm;
    let t = e.state;
    return t.window && (t.window = null),
        e.state = null,
        Em
}
ig = {
    inflateInit2: Xm,
    inflateGetHeader: tg,
    inflate: $m,
    inflateEnd: eg,
    inflateSetDictionary: ng
};

var rg = function() {
    this.text = 0,
        this.time = 0,
        this.xflags = 0,
        this.os = 0,
        this.extra = null,
        this.extra_len = 0,
        this.name = "",
        this.comment = "",
        this.hcrc = 0,
        this.done = !1
};

const {Z_NO_FLUSH: og, Z_FINISH: sg, Z_OK: lg, Z_STREAM_END: cg, Z_NEED_DICT: hg, Z_STREAM_ERROR: dg, Z_DATA_ERROR: ug, Z_MEM_ERROR: pg} = Xp;
qp = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
}

const Kf = new Uint8Array(256);
var Zf = {
    string2buf: e => {
        if ("function" == typeof TextEncoder && TextEncoder.prototype.encode)
            return (new TextEncoder).encode(e);
        let t, n, i, r, a, o = e.length, s = 0;
        for (r = 0; r < o; r++)
            n = e.charCodeAt(r),
            55296 == (64512 & n) && r + 1 < o && (i = e.charCodeAt(r + 1),
            56320 == (64512 & i) && (n = 65536 + (n - 55296 << 10) + (i - 56320),
                r++)),
                s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
        for (t = new Uint8Array(s),
                 a = 0,
                 r = 0; a < s; r++)
            n = e.charCodeAt(r),
            55296 == (64512 & n) && r + 1 < o && (i = e.charCodeAt(r + 1),
            56320 == (64512 & i) && (n = 65536 + (n - 55296 << 10) + (i - 56320),
                r++)),
                n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6,
                    t[a++] = 128 | 63 & n) : n < 65536 ? (t[a++] = 224 | n >>> 12,
                    t[a++] = 128 | n >>> 6 & 63,
                    t[a++] = 128 | 63 & n) : (t[a++] = 240 | n >>> 18,
                    t[a++] = 128 | n >>> 12 & 63,
                    t[a++] = 128 | n >>> 6 & 63,
                    t[a++] = 128 | 63 & n);
        return t
    }
    ,
    buf2string: (e, t) => {
        const n = t || e.length;
        if ("function" == typeof TextDecoder && TextDecoder.prototype.decode)
            return (new TextDecoder).decode(e.subarray(0, t));
        let i, r;
        const a = new Array(2 * n);
        for (r = 0,
                 i = 0; i < n; ) {
            let t = e[i++];
            if (t < 128) {
                a[r++] = t;
                continue
            }
            let o = Kf[t];
            if (o > 4)
                a[r++] = 65533,
                    i += o - 1;
            else {
                for (t &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && i < n; )
                    t = t << 6 | 63 & e[i++],
                        o--;
                o > 1 ? a[r++] = 65533 : t < 65536 ? a[r++] = t : (t -= 65536,
                    a[r++] = 55296 | t >> 10 & 1023,
                    a[r++] = 56320 | 1023 & t)
            }
        }
        return ( (e, t) => {
                if (t < 65534 && e.subarray && Yf)
                    return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
                let n = "";
                for (let i = 0; i < t; i++)
                    n += String.fromCharCode(e[i]);
                return n
            }
        )(a, r)
    }
    ,
    utf8border: (e, t) => {
        (t = t || e.length) > e.length && (t = e.length);
        let n = t - 1;
        for (; n >= 0 && 128 == (192 & e[n]); )
            n--;
        return n < 0 || 0 === n ? t : n + Kf[e[n]] > t ? n : t
    }
};
ag = Object.prototype.toString
function fg(e) {
    this.options = Xf.assign({
        chunkSize: 65536,
        windowBits: 15,
        to: ""
    }, e || {});
    const t = this.options;
    t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits,
    0 === t.windowBits && (t.windowBits = -15)),
    !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
    t.windowBits > 15 && t.windowBits < 48 && (15 & t.windowBits || (t.windowBits |= 15)),
        this.err = 0,
        this.msg = "",
        this.ended = !1,
        this.chunks = [],
        this.strm = new Jf,
        this.strm.avail_out = 0;
    let n = ig.inflateInit2(this.strm, t.windowBits);
    if (n !== lg)
        throw new Error(qp[n]);
    if (this.header = new rg,
        ig.inflateGetHeader(this.strm, this.header),
    t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = Zf.string2buf(t.dictionary) : "[object ArrayBuffer]" === ag.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
    t.raw && (n = ig.inflateSetDictionary(this.strm, t.dictionary),
    n !== lg)))
        throw new Error(qp[n])
}
fg.prototype.onData = function(e) {
    this.chunks.push(e)
}
fg.prototype.onEnd = function(e) {
    e === lg && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = Xf.flattenChunks(this.chunks)),
        this.chunks = [],
        this.err = e,
        this.msg = this.strm.msg
}
fg.prototype.push = function(e, t) {
    const n = this.strm
        , i = this.options.chunkSize
        , r = this.options.dictionary;
    let a, o, s;
    if (this.ended)
        return !1;
    for (o = t === ~~t ? t : !0 === t ? sg : og,
             "[object ArrayBuffer]" === ag.call(e) ? n.input = new Uint8Array(e) : n.input = e,
             n.next_in = 0,
             n.avail_in = n.input.length; ; ) {
        for (0 === n.avail_out && (n.output = new Uint8Array(i),
            n.next_out = 0,
            n.avail_out = i),
                 a = ig.inflate(n, o),
             a === hg && r && (a = ig.inflateSetDictionary(n, r),
                 a === lg ? a = ig.inflate(n, o) : a === ug && (a = hg)); n.avail_in > 0 && a === cg && n.state.wrap > 0 && 0 !== e[n.next_in]; )
            ig.inflateReset(n),
                a = ig.inflate(n, o);
        switch (a) {
            case dg:
            case ug:
            case hg:
            case pg:
                return this.onEnd(a),
                    this.ended = !0,
                    !1
        }
        if (s = n.avail_out,
        n.next_out && (0 === n.avail_out || a === cg))
            if ("string" === this.options.to) {
                let e = Zf.utf8border(n.output, n.next_out)
                    , t = n.next_out - e
                    , r = Zf.buf2string(n.output, e);
                n.next_out = t,
                    n.avail_out = i - t,
                t && n.output.set(n.output.subarray(e, e + t), 0),
                    this.onData(r)
            } else
                this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
        if (a !== lg || 0 !== s) {
            if (a === cg)
                return a = ig.inflateEnd(this.strm),
                    this.onEnd(a),
                    this.ended = !0,
                    !0;
            if (0 === n.avail_in)
                break
        }
    }
    return !0
}


vg = {
    Inflate: fg,
    constants: Xp
};
const {Inflate: _g} = vg;
var Mg = {
    Inflate: _g
};
var deserialize = (e) => {
    const t = Tg(e);
    if (null == t)
        return null;
    const n = new Mg.Inflate;
    console.log(n);
    if (n.push(t, !0),
        n.err)
        return null;
    const i = n.result;
    if (!(i instanceof Uint8Array))
        return null;
    const r = []
        , a = Math.round(i.length / 3.5);
    for (let e = 0; e < a; ++e) {
        const t = i[3 * e] | i[3 * e + 1] << 8 | i[3 * e + 2] << 16;
        let n;
        const o = i[3 * a + Math.floor(e / 2)];
        n = e % 2 == 0 ? {
            up: !(1 & ~o),
            right: 1 == (o >>> 1 & 1),
            down: 1 == (o >>> 2 & 1),
            left: 1 == (o >>> 3 & 1)
        } : {
            up: 1 == (o >>> 4 & 1),
            right: 1 == (o >>> 5 & 1),
            down: 1 == (o >>> 6 & 1),
            left: 1 == (o >>> 7 & 1)
        },
            r.push({
                frame: t,
                controls: n
            })
    }
    return r;
}

console.log(deserialize("eNotxD0LAQEAgOE3Bp3lBqWrSz5zGbjuSsLVdZPVyVeuDFLMbrhfoAwGp4xKWSzqNosfYDBjtPkLNlKe4QH0EGIYU-Ak0ItyiXIQeYvsY7ziuBJPCU_mJbNMECRoJLklmacQ0ozT7DKcc1QV1gpegUWBY5GghKESqEx0smUeVe412nWmBleDjYlu4VosmnRt-i1WbbYdZn2MAUuHj0NkiOb7vm3_9rVRRdMq-djfFz4mKqc"));