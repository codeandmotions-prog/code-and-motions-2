/** Simple labelled triangle diagram (server- and client-safe). */
export default function TriangleFigure({
  a,
  b,
  c,
  A,
  B,
  C,
  right,
}: {
  a: number;
  b: number;
  c: number;
  A: number;
  B: number;
  C: number;
  right?: boolean;
}) {
  // Vertices: A at origin, B on the x-axis, C above.
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
  const pts = { A: [0, 0], B: [c, 0], C: [b * cosA, b * sinA] } as const;
  const xs = [pts.A[0], pts.B[0], pts.C[0]];
  const ys = [pts.A[1], pts.B[1], pts.C[1]];
  const minX = Math.min(...xs), maxX = Math.max(...xs), maxY = Math.max(...ys);
  const w = 280, h = 190, pad = 34;
  const scale = Math.min((w - 2 * pad) / (maxX - minX || 1), (h - 2 * pad) / (maxY || 1));
  const px = (x: number) => pad + (x - minX) * scale;
  const py = (y: number) => h - pad - y * scale;
  const P = (k: "A" | "B" | "C") => [px(pts[k][0]), py(pts[k][1])];
  const [ax, ay] = P("A"), [bx, by] = P("B"), [cx, cy] = P("C");
  const mid = (p: number[], q: number[]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const ma = mid([bx, by], [cx, cy]), mb = mid([ax, ay], [cx, cy]), mc = mid([ax, ay], [bx, by]);
  const centroid = [(ax + bx + cx) / 3, (ay + by + cy) / 3];
  const push = (m: number[], d: number) => {
    const dx = m[0] - centroid[0], dy = m[1] - centroid[1];
    const len = Math.hypot(dx, dy) || 1;
    return [m[0] + (dx / len) * d, m[1] + (dy / len) * d];
  };
  const lab = (n: number) => String(Number(n.toPrecision(4)));
  const fmtAng = (n: number) => `${Number(n.toPrecision(4))}°`;
  const labelA = push([ax, ay], 16), labelB = push([bx, by], 16), labelC = push([cx, cy], 16);
  const sa = push(ma, 13), sb = push(mb, 13), sc = push(mc, 13);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Triangle with sides a ${lab(a)}, b ${lab(b)}, c ${lab(c)}`} className="mx-auto h-auto w-full max-w-sm">
      <polygon points={`${ax},${ay} ${bx},${by} ${cx},${cy}`} fill="rgba(21,71,224,0.08)" stroke="#1547E0" strokeWidth="2" strokeLinejoin="round" />
      {right && (() => {
        // right angle marker at C (the vertex opposite c) for the right-triangle view
        const s = 10;
        const v1 = [(ax - cx), (ay - cy)], v2 = [(bx - cx), (by - cy)];
        const l1 = Math.hypot(v1[0], v1[1]) || 1, l2 = Math.hypot(v2[0], v2[1]) || 1;
        const p1 = [cx + (v1[0] / l1) * s, cy + (v1[1] / l1) * s];
        const p2 = [cx + (v2[0] / l2) * s, cy + (v2[1] / l2) * s];
        const p3 = [p1[0] + (p2[0] - cx), p1[1] + (p2[1] - cy)];
        return <polyline points={`${p1[0]},${p1[1]} ${p3[0]},${p3[1]} ${p2[0]},${p2[1]}`} fill="none" stroke="#1547E0" strokeWidth="1.5" />;
      })()}
      <g fontSize="12" fill="#0b1c4d" fontWeight="700" textAnchor="middle" dominantBaseline="middle">
        <text x={labelA[0]} y={labelA[1]}>A</text>
        <text x={labelB[0]} y={labelB[1]}>B</text>
        <text x={labelC[0]} y={labelC[1]}>C</text>
      </g>
      <g fontSize="11" fill="#4a5578" textAnchor="middle" dominantBaseline="middle">
        <text x={sa[0]} y={sa[1]}>a = {lab(a)}</text>
        <text x={sb[0]} y={sb[1]}>b = {lab(b)}</text>
        <text x={sc[0]} y={sc[1]}>c = {lab(c)}</text>
      </g>
      <g fontSize="10" fill="#4a5578" textAnchor="middle" dominantBaseline="middle">
        <text x={ax + (cx - ax + bx - ax) * 0.14} y={ay + (cy - ay + by - ay) * 0.14}>{fmtAng(A)}</text>
        <text x={bx + (cx - bx + ax - bx) * 0.14} y={by + (cy - by + ay - by) * 0.14}>{fmtAng(B)}</text>
        <text x={cx + (ax - cx + bx - cx) * 0.14} y={cy + (ay - cy + by - cy) * 0.14}>{fmtAng(C)}</text>
      </g>
    </svg>
  );
}
