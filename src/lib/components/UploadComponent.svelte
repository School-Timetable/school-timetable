<script lang="ts">
  import { writeToStorage,checkBase64} from '$lib/utils/get_storage_to_download'; 
    import { Col, Input } from 'sveltestrap';

  let selectedFile: File | null = null;
  let txtContent: string[] = [];
  

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];

    if (file && file.type === "text/plain") {
      selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = (e.target!.result as string).trim();
          txtContent = fileContent.split('\n');

          if (txtContent.length !== 2) {
            console.error("Il file TXT deve contenere esattamente due righe.");
            txtContent = [];
          } else {
            console.log("Contenuto del file:", txtContent);

            const isValidBase64 = checkBase64(txtContent[0], txtContent[1]);
            if (isValidBase64) {
              writeToStorage(txtContent[0],txtContent[1]);

            } else {
              alert("le due stringhe non sono valide")

            }
          }
        } catch (error) {
          console.error("Errore durante la lettura del file TXT:", error);
        }
      };

      reader.readAsText(file);
    } else {
      selectedFile = null;
      console.log("Seleziona un file TXT valido.");
    }
  }
</script>

<div class="row mt-3">
  <Col sm="5">
    <label class="form-label mt-1" for="txtFile">Upload your workspace data file: </label>
  </Col>
  <Col>
    <Input
      class="mb-3"
      type="file"
      id="txtFile"
      accept=".txt"
      on:change={handleFileChange}
    />
    {#if selectedFile}
    <div class="mt-3">
      <p>Loaded file: <strong>{selectedFile.name}</strong></p>
    </div>
{/if}
  </Col>
</div>
