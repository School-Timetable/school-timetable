

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.e578ce97.js","_app/immutable/chunks/index.bdfd860f.js","_app/immutable/chunks/Offcanvas.svelte_svelte_type_style_lang.615f0571.js","_app/immutable/chunks/index.941c3ad3.js","_app/immutable/chunks/singletons.46e147f4.js","_app/immutable/chunks/Icon.d8c16050.js"];
export const stylesheets = ["_app/immutable/assets/0.f064af30.css","_app/immutable/assets/Offcanvas.60614438.css"];
export const fonts = [];
