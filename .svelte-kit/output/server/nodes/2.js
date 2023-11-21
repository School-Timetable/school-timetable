

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.5d7d18c0.js","_app/immutable/chunks/index.47b2852a.js"];
export const stylesheets = [];
export const fonts = [];
