

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/downloadUploadData/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.5b6346a1.js","_app/immutable/chunks/index.6f3fdfc3.js"];
export const stylesheets = [];
export const fonts = [];
