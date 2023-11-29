

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/drag-and-drop/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.a301524c.js","_app/immutable/chunks/index.bdfd860f.js","_app/immutable/chunks/Offcanvas.svelte_svelte_type_style_lang.615f0571.js","_app/immutable/chunks/index.941c3ad3.js"];
export const stylesheets = ["_app/immutable/assets/5.892c81e9.css","_app/immutable/assets/Offcanvas.60614438.css"];
export const fonts = [];
