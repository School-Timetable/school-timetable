<script lang="ts">
    import { Button, Col, FormGroup, Input, Row } from "sveltestrap";
    import MyModal from "./MyModal.svelte";
    import { createPDFClassView, createPDFProfView } from "$lib/stores/utils/export_to_pdf";
    import { createExcel } from "$lib/stores/utils/create_excel_file";

    let formats = ["PDF", "Excel"]
    let views = ["Class", "Professor"]

    let showModal = false;
    let selectedFormat = formats[0];
    let selectedView = views[0];

    function confirmExport() {
        showModal = false;

        if (selectedFormat === "PDF") {
            if (selectedView === "Class") {
                createPDFClassView();
            } else {
                createPDFProfView();
            }
        } else {
            createExcel(selectedView)
        }
    }

    function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			confirmExport();
		}
	}

</script>

<Button color="primary" on:click={() => {showModal = true}}>Export</Button>

<MyModal bind:showModal on:confirm={confirmExport}>
	<h2 slot="header">Export timetable</h2>
	<div slot="body">
        <Row>
            <Col sm={{ size: 8 }}>
                <p>Please select the format of the file to export:</p>
            </Col>
            <Col sm={{ size: 4 }}>
                <FormGroup floating inline label="Format" class="text-muted">
                    <Input
                        type="select"
                        name="format"
                        id="format"
                        on:keydown={(e) => {
                            handleKeydown(e);
                        }}
                        bind:value={selectedFormat}>
                        {#each formats as f}
                            <option>{f}</option>
                        {/each}
                    </Input>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col sm={{ size: 8 }}>
                <p>Please select the view of the timetable to export:</p>
            </Col>
            <Col sm={{ size: 4 }}>
                <FormGroup floating inline label="View" class="text-muted">
                    <Input
                        type="select"
                        name="view"
                        id="view"
                        on:keydown={(e) => {
                            handleKeydown(e);
                        }}
                        bind:value={selectedView}>
                        {#each views as v}
                            <option>{v}</option>
                        {/each}
                    </Input>
                </FormGroup>
            </Col>
        </Row>
    </div>
</MyModal>