"use client";
import { useEffect, useRef } from "react";
import SwaggerUI from "swagger-ui-react"
import spec from "./openapi.json"
spec.servers = [{url: process.env.NEXT_PUBLIC_BASE_PATH }]

// Swagger UI generates its own DOM, which ships with Section 508 / WCAG gaps:
// icon-only buttons without discernible text and scrollable code/example blocks
// that cannot receive keyboard focus. patchAccessibility() repairs these after
// Swagger renders (and on later re-renders, e.g. expanding an operation or
// toggling "Try it out"). It only adds attributes to elements that lack them,
// so it is safe to run repeatedly.
function patchAccessibility(root) {
  if (!root) return;

  // Copy-to-clipboard icon buttons.
  root.querySelectorAll(".copy-to-clipboard button").forEach((btn) => {
    if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Copy to clipboard");
    if (!btn.getAttribute("title")) btn.setAttribute("title", "Copy to clipboard");
  });

  // Ensure any remaining icon-only buttons expose discernible text.
  root.querySelectorAll("button:not([aria-label])").forEach((btn) => {
    if (btn.textContent.trim() || btn.getAttribute("title")) return;
    const cls = btn.className || "";
    let label = "Button";
    if (cls.includes("expand-operation")) label = "Expand operation";
    else if (cls.includes("authorize")) label = "Authorize";
    else if (cls.includes("copy")) label = "Copy to clipboard";
    else if (cls.includes("model-toggle")) label = "Toggle model example";
    btn.setAttribute("aria-label", label);
  });

  // Make scrollable code / example blocks keyboard accessible.
  root.querySelectorAll(".highlight-code, .microlight, pre").forEach((el) => {
    if (el.hasAttribute("tabindex")) return;
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "region");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "Code sample");
  });
}

export default function ApiAccess() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    patchAccessibility(root);
    let frame;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => patchAccessibility(root));
    });
    observer.observe(root, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex-grow-1 bg-white py-4">
      <div className="container">
        <div className="row">
          <div className="col">
            <article ref={ref}>
              <h1 className="fs-1 fw-light">API Access</h1>
              <hr/>
              <SwaggerUI spec={spec} onComplete={() => patchAccessibility(ref.current)} />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
