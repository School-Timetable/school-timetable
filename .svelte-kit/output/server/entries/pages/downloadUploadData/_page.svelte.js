import { c as create_ssr_component, f as add_attribute, j as each, i as escape, v as validate_component } from "../../../chunks/index2.js";
const DownloadComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inputValue = 0;
  return `<form><label for="numericInput">Inserisci un numero:</label>
    <input type="number" id="numericInput"${add_attribute("value", inputValue, 0)}>
  
    <button type="submit">Invia</button>
  
    <button>Download JSON</button></form>`;
});
const UploadComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let jsonContent = [];
  return `<div><label for="jsonFile">Seleziona un file JSON:</label>
    <input type="file" id="jsonFile" accept=".json">
  
    ${``}
  
   ${jsonContent.length > 0 ? `<h2>Contenuto del file JSON:</h2>
    <ul>//users is array and user is an alias
      ${each(jsonContent, (content) => {
    return `<li>OGGETTO NUMERO: ${escape(content.numeroOggetto)} VALORE: ${escape(content.valore)} </li>`;
  })}</ul>` : ``}</div>`;
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
