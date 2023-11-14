<script lang="ts">

    import {createEventDispatcher} from "svelte";
    import {SchoolClass} from "$model/school-class/school-class";
    import {ZodError} from "zod";
    import {yearSchema} from "$model/school-class/year.js";
    import {sectionSchema} from "$model/school-class/section";
    import {Track, trackSchema} from "$model/school-class/track";
    import {Button, Col, FormGroup, Icon, Input} from "sveltestrap";

    const eventDispatcher = createEventDispatcher()

    const sections = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
    const years = [1,2,3,4,5]

    export let schoolClass: SchoolClass | null = null

    let yearErrorMessage: string = ""
    let yearValid: boolean = false
    let yearInvalid: boolean
    $: yearInvalid = !yearValid
    const correctFeedback = ""

    let sectionErrorMessage: string = ""
    let sectionValid: boolean = false
    let sectionInvalid: boolean
    $: sectionInvalid = !sectionValid

    let trackErrorMessage: string = ""
    let trackValid: boolean = false
    let trackInvalid: boolean
    $: trackInvalid = !trackValid

    let tmpSchoolClass: SchoolClassFormData;

    type SchoolClassFormData = {
        _year: { value: number };
        _section: { value: string };
        _track: { value: string };
    };

    {
        if(schoolClass) {
            tmpSchoolClass = {
                _year: { value: schoolClass.year.value },
                _section: { value: schoolClass.section.value },
                _track: { value: schoolClass.track?.value || "" }
            }
        }
        else {
            tmpSchoolClass = {
                _year: { value: 1 },
                _section: { value: "A" },
                _track: { value: "" }
            }
        }
        validateTrack()
        validateYear()
        validateSection()
    }

    function save() {
        validateYear()
        validateSection()
        validateTrack()
        try {
            let track = tmpSchoolClass!._track.value == "" ? undefined : new Track(tmpSchoolClass!._track.value)
            let savedSchoolClass: SchoolClass = SchoolClass.of(
                tmpSchoolClass._year.value,
                tmpSchoolClass._section.value,
                track?.value
            )
            eventDispatcher('save', { schoolClass: savedSchoolClass})
        }
        catch (e) {
            if (e instanceof ZodError){
                // TODO: ???
            }
        }
    }

    function validateYear() {
        try {
            yearSchema.parse(tmpSchoolClass._year)
            yearValid = true
            yearErrorMessage = correctFeedback
        }
        catch (e){
            if (e instanceof ZodError){
                yearErrorMessage = e.issues[0].message
                yearValid = false
            }
        }
    }

    function validateSection() {
        try {
            sectionSchema.parse(tmpSchoolClass._section)
            sectionValid = true
            sectionErrorMessage = correctFeedback
        }
        catch (e) {
            if (e instanceof ZodError){
                sectionErrorMessage = e.issues[0].message
                sectionValid = false
            }
        }
    }

    function validateTrack() {
        if(tmpSchoolClass._track.value === ""){
            trackValid = true

        }
        else{
            try {
                trackSchema.parse(tmpSchoolClass._track)
                trackValid = true
            }
            catch (e) {
                if (e instanceof ZodError){
                    trackErrorMessage = e.issues[0].message
                    trackValid = false
                }
            }
        }

        if (trackValid){
            trackErrorMessage = correctFeedback
        }

    }

</script>

<Col sm={{size: 2}}>
    <FormGroup floating label="Year" style="color: grey;">
        <Input type="select" name="year" id="year"
               on:change={validateYear}
               bind:value={tmpSchoolClass._year.value}
               bind:feedback={yearErrorMessage}
               bind:valid={yearValid}
               bind:invalid={yearInvalid}
        >
            {#each years as year}
                <option>{year}</option>
            {/each}
        </Input>
    </FormGroup>
</Col>
<Col sm={{size: 2}}>
    <FormGroup floating label="Section" style="color: grey;">
        <Input type="select" name="section" id="section"
               on:change={validateSection}
               bind:value={tmpSchoolClass._section.value}
               bind:feedback={sectionErrorMessage}
               bind:valid={sectionValid}
               bind:invalid={sectionInvalid}
        >
            {#each sections as section}
                <option>{section}</option>
            {/each}
        </Input>
    </FormGroup>
</Col>
<Col sm={{size: 4}}>
    <FormGroup floating label="Track" style="color: grey;">
        <Input type="text" label="email" placeholder="Enter a value" name="email" id="email"
               bind:value={tmpSchoolClass._track.value} on:keyup={validateTrack} bind:feedback={trackErrorMessage}
               bind:valid={trackValid} bind:invalid={trackInvalid}/>
    </FormGroup>
</Col>
<Col sm={{size: 4}} style="display: flex; align-items: center; margin-bottom: 13pt;">
    <Button color="primary" on:click={save}>
        <Icon name="check"/> Save</Button>
    <Button color="danger" on:click={() => eventDispatcher('cancel')}>
        <Icon name="x"/> Cancel</Button>
</Col>