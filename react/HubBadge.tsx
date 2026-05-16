"use client";

import * as React from "react";
import Link from "next/link";
import { HubLogo, HubProduct } from "./HubLogo";

interface HubBadgeProps {
  product: Exclude<HubProduct, "suite">;
  title?: string;
  description?: string;
  href?: string;
  cta?: string;
}

const labels: Record<HubBadgeProps["product"], { title: string; description: string }> = {
  compliance: {
    title: "Compliance Hub",
    description: "Operational oversight of statutory compliance and risk across all your sites.",
  },
  care: {
    title: "Care Hub",
    description: "Caring for your assets and people, with proactive maintenance and incident management.",
  },
  fm: {
    title: "FM Control Hub",
    description: "Master facility management. Energy, space, and scheduling, all in one control plane.",
  },
};

/**
 * Hex-card showcasing a single hub on the HubSuite landing.
 * Click-through to the hub's login.
 */
export function HubBadge({
  product,
  title,
  description,
  href,
  cta = "Learn more",
}: HubBadgeProps) {
  const meta = labels[product];
  const heading = title ?? meta.title;
  const blurb = description ?? meta.description;

  const body = (
    <div className="group flex h-full flex-col rounded-xl border border-card bg-card/40 p-6 shadow-elev transition-all hover:border-accent hover:shadow-glow">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-pill bg-bg/70">
        <HubLogo product={product} size={48} />
      </div>
      <h3 className="mb-2 text-xl font-bold text-fg">{heading}</h3>
      <p className="mb-6 flex-1 text-sm text-muted">{blurb}</p>
      <span className="inline-flex items-center text-sm font-semibold text-accent group-hover:underline">
        {cta} →
      </span>
    </div>
  );

  if (!href) return body;
  return (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  );
}
