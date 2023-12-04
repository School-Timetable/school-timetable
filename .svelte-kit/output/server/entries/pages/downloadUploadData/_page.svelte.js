import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
const DownloadComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<button>Premi per il download</button>`;
});
const UploadComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div><label for="txtFile">Upload del tuo ambiente di lavoro:</label>
  <input type="file" id="txtFile" accept=".txt">

  ${``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main><h1>DOWNLOAD COMPONENT</h1>
    ${validate_component(DownloadComponent, "DownloadComponent").$$render($$result, {}, {}, {})}
    <hr>
    <h1>UPLOAD COMPONENT</h1>
    ${validate_component(UploadComponent, "UploadComponent").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
