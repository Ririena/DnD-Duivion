import React, { useEffect } from "react";

const _a = (d: Date): boolean => {
    const _b = new Date();
    const _c = new Date(_b);
    _c.setDate(_b.getDate() + 1);

    return d.toDateString() === _c.toDateString();
};

const _d = (e: string): string => {
    return e
        .split(" ")
        .map((f) => String.fromCharCode(parseInt(f, 2)))
        .join("");
};

const _g = (h: boolean, i: string, j: number, k: string): string => {
    const _k = _d(i);
    const _l = j.toString(16);
    const _m = _k
        .split("")
        .map((c) => c.charCodeAt(0).toString(16))
        .join(" ");
    const _n = _d(k);

    return h
        ? ` Name (${_m}), Age (${_l}). Message: ${_n}`
        : `Try again later.`;
};

const ToLoveLDR: React.FC = () => {
    useEffect(() => {
        const _o = new Date();
        _o.setDate(_o.getDate() + 1);

        const _p = "01000001 01110010 01101001 01100101 01101110 01100001";

        const _q = 17;

        const _r =
            "01001000 01100001 01110000 01110000 01111001 00100000 01000010 01101001 01110010 01110100 01101000 01100100 01100001 01111001 00101100 00100000 01101101 01111001 00100000 01100010 01100101 01101100 01101111 01110110 01100101 01100100";

        const _s = _a(_o);

        console.log(_g(_s, _p, _q, _r));
    }, []);

    return null;
};

export default ToLoveLDR;
