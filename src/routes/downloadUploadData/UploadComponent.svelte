<script lang="ts">
    interface Oggetto {
      numeroOggetto: number;
      valore: string;
      // Aggiungi altre proprietà se necessario
    }
  
    let selectedFile: File | null = null;
    let jsonContent: Oggetto[] = [];
  
    // Funzione chiamata quando il file viene selezionato
    function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files && input.files[0];
  
      // Verifica se un file è stato selezionato e se è di tipo JSON
      if (file && file.type === "application/json") {
        selectedFile = file;
  
        // Leggi il contenuto del file JSON
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target!.result as string);
  
            if (Array.isArray(jsonData)) {
              // Assumiamo che il file JSON contenga un array di oggetti
              jsonContent = jsonData.map((item: any, index: number) => ({
                numeroOggetto: index + 1,
                valore: item.valore || "", // Modifica questa parte in base alla struttura del tuo JSON
              }));
  
              console.log("Lista di oggetti dal file JSON:", jsonContent);
            } else {
              console.error("Il file JSON deve contenere un array di oggetti.");
            }
          } catch (error) {
            console.error("Errore durante il parsing del file JSON:", error);
          }
        };
  
        reader.readAsText(file);
      } else {
        selectedFile = null;
        console.log("Seleziona un file JSON valido.");
      }
    }
  </script>
  
  <style>
    /* Aggiungi eventuali stili CSS qui */
  </style>
  
  <div>
    <label for="jsonFile">Seleziona un file JSON:</label>
    <input
      type="file"
      id="jsonFile"
      accept=".json"
      on:change={handleFileChange}
    />
  
    {#if selectedFile}
      <p>File selezionato: {selectedFile.name}</p>
    {/if}
  
   {#if jsonContent.length > 0}
    <h2>Contenuto del file JSON:</h2>
    <ul>
      //users is array and user is an alias
      {#each jsonContent as content}
         <li>OGGETTO NUMERO: {content.numeroOggetto} VALORE: {content.valore} </li>
  
      {/each}
  
  </ul>
  {/if}
  
  </div>
  