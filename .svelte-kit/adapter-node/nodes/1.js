

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.719059fd.js","_app/immutable/chunks/index.bdfd860f.js","_app/immutable/chunks/singletons.46e147f4.js","_app/immutable/chunks/index.941c3ad3.js"];
export const stylesheets = [];
export const fonts = [];
