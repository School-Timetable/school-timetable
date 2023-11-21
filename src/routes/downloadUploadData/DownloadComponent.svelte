<script lang="ts">


    let inputValue: number = 0;
    let oggetti: { numeroOggetto: number; valore: string }[] = [];
  
    function handleInput() {
      // Funzione per generare una stringa casuale alfanumerica
      function generateRandomString(): string {
        const length: number = 10;
        const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result: string = "";
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }
  
      // Resetta la lista di oggetti
      oggetti = [];
  
      // Verifica se il valore è valido e maggiore di zero
      const numOggetti: number = inputValue;
      if (!isNaN(numOggetti) && numOggetti > 0) {
        // Crea la lista di oggetti
        for (let i = 1; i <= numOggetti; i++) {
          const nuovoOggetto = {
            numeroOggetto: i,
            valore: generateRandomString(),
          };
          oggetti = [...oggetti, nuovoOggetto];
        }
        // Log per visualizzare la lista di oggetti
        console.log("Lista di oggetti:", oggetti);
      } else {
        console.log("Inserisci un numero valido e maggiore di zero.");
      }
    }
  
    // Funzione per gestire il download del file JSON
    function handleDownloadJSON() {
      // Aggiungi qui la logica per generare e scaricare il file JSON
      const jsonContent = JSON.stringify(oggetti, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lista_oggetti.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  </script>
  
  <style>
    /* Aggiungi eventuali stili CSS qui */
  </style>
  
  <form on:submit|preventDefault={handleInput}>
    <label for="numericInput">Inserisci un numero:</label>
    <input type="number" id="numericInput" bind:value={inputValue} />
  
    <button type="submit">Invia</button>
  
    <button on:click={handleDownloadJSON}>Download JSON</button>
  </form>
  