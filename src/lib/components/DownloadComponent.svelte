<script lang="ts">
  import { readStoragetoDownload } from '$lib/utils/get_storage_to_download'; 
  import { Button, Col } from 'sveltestrap';

  function handleDownloadTXT() {
    const arrayData = readStoragetoDownload();
    const textContent = arrayData.join('\n');
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<div class="row mt-3">
  <Col sm="7">
    <label class="form-label mt-1" for="txtFile">Download the current workspace data: </label>
  </Col>
  <Col>
    <Button color="primary" class="ml-3" on:click={handleDownloadTXT}>Download</Button>
  </Col>
</div>
