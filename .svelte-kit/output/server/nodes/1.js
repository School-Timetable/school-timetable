

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a442b80f.js","_app/immutable/chunks/index.6f3fdfc3.js","_app/immutable/chunks/singletons.368ac8f1.js","_app/immutable/chunks/index.1a787e9c.js"];
export const stylesheets = [];
export const fonts = [];