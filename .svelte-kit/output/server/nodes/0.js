

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.a8e6539e.js","_app/immutable/chunks/index.6f3fdfc3.js","_app/immutable/chunks/Offcanvas.svelte_svelte_type_style_lang.5b4fd23b.js","_app/immutable/chunks/index.1a787e9c.js","_app/immutable/chunks/singletons.b8a8993a.js","_app/immutable/chunks/popper.f3391c26.js"];
export const stylesheets = ["_app/immutable/assets/0.f064af30.css","_app/immutable/assets/Offcanvas.60614438.css"];
export const fonts = [];
