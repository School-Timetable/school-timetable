

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/downloadUploadData/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.94482d7b.js","_app/immutable/chunks/index.bdfd860f.js"];
export const stylesheets = [];
export const fonts = [];
