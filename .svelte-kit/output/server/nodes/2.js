

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.b4ab4f80.js","_app/immutable/chunks/index.6f3fdfc3.js"];
export const stylesheets = [];
export const fonts = [];
