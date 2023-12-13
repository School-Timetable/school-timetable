

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/drag-and-drop/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.6cb00161.js","_app/immutable/chunks/index.6f3fdfc3.js","_app/immutable/chunks/Offcanvas.svelte_svelte_type_style_lang.5b4fd23b.js","_app/immutable/chunks/index.1a787e9c.js"];
export const stylesheets = ["_app/immutable/assets/5.d699897e.css","_app/immutable/assets/Offcanvas.60614438.css"];
export const fonts = [];
