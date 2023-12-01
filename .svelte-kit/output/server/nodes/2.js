

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.2c7090bc.js","_app/immutable/chunks/index.bdfd860f.js"];
export const stylesheets = [];
export const fonts = [];
