<script lang="ts">
  import { readStoragetoDownload } from '$lib/utils/get_storage_to_download'; 

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

<style>
</style>

<button on:click={handleDownloadTXT}>Premi per il download</button>
