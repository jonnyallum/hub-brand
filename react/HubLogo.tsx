"use client";

import * as React from "react";

export type HubProduct = "compliance" | "care" | "fm" | "suite";
export type HubLogoVariant = "mark" | "wordmark" | "lockup";

interface HubLogoProps extends React.SVGProps<SVGSVGElement> {
  product: HubProduct;
  variant?: HubLogoVariant;
  size?: number; // height in px; width scales by aspect of the variant
  title?: string;
}

/* ---------------- Gradient defs (used by Suite mark + accent fills) ---------- */

const SuiteGradient = ({ id }: { id: string }) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="rgb(39 217 217)" />
    <stop offset="45%" stopColor="rgb(91 141 239)" />
    <stop offset="100%" stopColor="rgb(138 92 246)" />
  </linearGradient>
);

const productAccent: Record<HubProduct, string> = {
  compliance: "rgb(var(--accent, 91 141 239))",
  care:       "rgb(var(--accent, 49 198 169))",
  fm:         "rgb(var(--accent, 94 200 110))",
  suite:      "url(#hubGradient)",
};

/* ---------------- Hex frame shared by all hub marks --------------------------- */

const Hex = ({ stroke }: { stroke: string }) => (
  <path
    d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z"
    fill="none"
    stroke={stroke}
    strokeWidth={2.5}
    strokeLinejoin="round"
  />
);

/* ---------------- Product marks (64x64) -------------------------------------- */

function ComplianceMark({ accent }: { accent: string }) {
  return (
    <g>
      <Hex stroke={accent} />
      {/* shield */}
      <path
        d="M32 16 L42 20 L42 32 C42 39 37 44 32 47 C27 44 22 39 22 32 L22 20 Z"
        fill="none"
        stroke={accent}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      {/* checklist ticks */}
      <path d="M27 28 L30 31 L36 25" fill="none" stroke={accent} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 36 L30 39 L36 33" fill="none" stroke={accent} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function CareMark({ accent }: { accent: string }) {
  return (
    <g>
      <Hex stroke={accent} />
      {/* heart */}
      <path
        d="M32 44 C 22 36 18 30 22 24 C 25 20 30 22 32 26 C 34 22 39 20 42 24 C 46 30 42 36 32 44 Z"
        fill="none"
        stroke={accent}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      {/* network nodes */}
      <circle cx="32" cy="28" r="1.8" fill={accent} />
      <circle cx="27" cy="33" r="1.8" fill={accent} />
      <circle cx="37" cy="33" r="1.8" fill={accent} />
      <path d="M32 28 L27 33 M32 28 L37 33 M27 33 L37 33" stroke={accent} strokeWidth={1.4} />
    </g>
  );
}

function FMMark({ accent, accent2 }: { accent: string; accent2: string }) {
  return (
    <g>
      <Hex stroke={accent} />
      {/* building */}
      <rect x="18" y="24" width="14" height="22" fill="none" stroke={accent} strokeWidth={2.2} strokeLinejoin="round" />
      <path d="M21 28 H23 M27 28 H29 M21 33 H23 M27 33 H29 M21 38 H23 M27 38 H29" stroke={accent} strokeWidth={1.6} />
      {/* gear */}
      <circle cx="42" cy="38" r="6" fill="none" stroke={accent2} strokeWidth={2.2} />
      <circle cx="42" cy="38" r="2" fill={accent2} />
      <path
        d="M42 30 V32 M42 44 V46 M34 38 H36 M48 38 H50 M36.3 32.3 L37.7 33.7 M46.3 42.3 L47.7 43.7 M36.3 43.7 L37.7 42.3 M46.3 33.7 L47.7 32.3"
        stroke={accent2}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </g>
  );
}

function SuiteMark() {
  // The unified HubSuite mark — an OUTLINED heart with a gradient H sitting
  // inside it. Both heart stroke and H letterform render in the brand
  // cyan→blue→violet gradient (matches the reference photo).
  return (
    <g>
      <defs>
        <SuiteGradient id="hubGradient" />
        <SuiteGradient id="hubGradientHalo" />
      </defs>
      {/* soft halo */}
      <circle cx="32" cy="32" r="28" fill="url(#hubGradientHalo)" opacity="0.14" />

      {/* Heart silhouette — stroke only, no fill */}
      <path
        d="M32 56
           C 13 44, 5 32, 11 20
           C 15 13, 26 12, 32 20
           C 38 12, 49 13, 53 20
           C 59 32, 51 44, 32 56 Z"
        fill="none"
        stroke="url(#hubGradient)"
        strokeWidth={3.5}
        strokeLinejoin="round"
      />

      {/* H letterform inside the heart, in the same gradient */}
      <g stroke="url(#hubGradient)" strokeWidth={5} strokeLinecap="round" fill="none">
        <line x1="23" y1="24" x2="23" y2="44" />
        <line x1="41" y1="24" x2="41" y2="44" />
        <line x1="23" y1="34" x2="41" y2="34" />
      </g>
    </g>
  );
}

/* ---------------- Mark dispatcher ------------------------------------------- */

function Mark({ product, size }: { product: HubProduct; size: number }) {
  const accent = productAccent[product];
  const accent2 = "rgb(var(--accent-2, 138 92 246))";
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
    >
      {product === "compliance" && <ComplianceMark accent={accent} />}
      {product === "care"       && <CareMark       accent={accent} />}
      {product === "fm"         && <FMMark         accent={accent} accent2={accent2} />}
      {product === "suite"      && <SuiteMark />}
    </svg>
  );
}

/* ---------------- Wordmark + lockup ----------------------------------------- */

const productLabel: Record<HubProduct, { primary: string; secondary?: string }> = {
  compliance: { primary: "Compliance",   secondary: "HUB" },
  care:       { primary: "Care",          secondary: "HUB" },
  fm:         { primary: "FM Control",    secondary: "HUB" },
  suite:      { primary: "Hub",           secondary: "SUITE" },
};

function Wordmark({ product, size }: { product: HubProduct; size: number }) {
  const { primary, secondary } = productLabel[product];
  // Render as text so it adapts to currentColor + scales cleanly
  return (
    <svg
      viewBox="0 0 240 64"
      height={size}
      width={(240 / 64) * size}
      role="img"
      aria-label={`${primary} ${secondary ?? ""}`.trim()}
    >
      <defs><SuiteGradient id="wordGradient" /></defs>
      <text
        x="0" y="40"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight={800}
        fontSize="32"
        fill={product === "suite" ? "url(#wordGradient)" : "currentColor"}
      >
        {primary}
      </text>
      {secondary && (
        <text
          x="0" y="58"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight={600}
          fontSize="12"
          letterSpacing="6"
          fill="rgb(var(--muted, 150 162 188))"
        >
          {secondary}
        </text>
      )}
    </svg>
  );
}

/* ---------------- Public component ----------------------------------------- */

export function HubLogo({
  product,
  variant = "mark",
  size = 32,
  title,
  ...rest
}: HubLogoProps) {
  if (variant === "wordmark") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center" }} {...(rest as any)}>
        <Wordmark product={product} size={size} />
        {title ? <span className="sr-only">{title}</span> : null}
      </span>
    );
  }
  if (variant === "lockup") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: size / 4 }} {...(rest as any)}>
        <Mark product={product} size={size} />
        <Wordmark product={product} size={size * 0.9} />
        {title ? <span className="sr-only">{title}</span> : null}
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex" }} {...(rest as any)}>
      <Mark product={product} size={size} />
      {title ? <span className="sr-only">{title}</span> : null}
    </span>
  );
}
