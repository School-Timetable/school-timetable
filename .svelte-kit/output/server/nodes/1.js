

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.efa74ab8.js","_app/immutable/chunks/index.47b2852a.js","_app/immutable/chunks/singletons.2a581779.js"];
export const stylesheets = [];
export const fonts = [];
