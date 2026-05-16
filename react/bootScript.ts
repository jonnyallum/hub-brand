/**
 * Inline theme boot script.
 *
 * Drop this into each host app's <head> as a dangerouslySetInnerHTML <script>
 * BEFORE React hydrates, so the `data-theme` attribute is set on <html>
 * synchronously — prevents flash-of-wrong-theme on first paint.
 *
 * Usage in app/layout.tsx:
 *   import { themeBootScript } from "@/brand/react";
 *   ...
 *   <head>
 *     <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
 *   </head>
 */
export const themeBootScript = `
(function(){try{
  var t = localStorage.getItem('theme');
  if (t !== 'light' && t !== 'dark') {
    t = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', t);
}catch(e){
  document.documentElement.setAttribute('data-theme','dark');
}})();
`.trim();
