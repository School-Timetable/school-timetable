<script lang="ts">
    import { Table, Button} from 'sveltestrap';
  import { number } from 'zod';
	export const weak_constrains: { [key: string]: any }  = {1: 'contiguous_subject_hours', 2: 'least_subjects_batches', 3:'least_subjects_swaps', 4:'minimize_days_weight_difference'}; 
    let selected_weak = 1


    function select_weak(key: number){
        selected_weak = key;
    }

    function swap_up(){
        const upper_label = weak_constrains[selected_weak-1];
        weak_constrains[selected_weak-1] = weak_constrains[selected_weak];
        weak_constrains[selected_weak] = upper_label;
    }

    function swap_down(){
        const bottom_label = weak_constrains[selected_weak+1];
        weak_constrains[selected_weak+1] = weak_constrains[selected_weak];
        weak_constrains[selected_weak] = bottom_label;
    }

    function bring_weak_up(){
        if(selected_weak - 1 > 0){
            swap_up()
            select_weak(selected_weak-1)
        }
    }

    function bring_weak_down(){
        if(selected_weak + 1 <= Object.keys(weak_constrains).length){
            swap_down()
            select_weak(selected_weak+1)
        }
    }

    export function to_string(): string[]{
        const weak_constrains_strings: string[] = []
        Object.entries(weak_constrains).forEach(([key, value]) => {
            const weak = 'weak_constraint("'+value+'", '+key+').';
            weak_constrains_strings.push(weak);
        });
        console.log(weak_constrains_strings);
        return weak_constrains_strings;
    }
    
</script>

<Table style="margin: 0 0 300px -20px">
    <thead>
        <div class="container">
            <tr>
                <th>
                    <button class="btn btn-primary" on:click={bring_weak_up}><i class="bi bi-arrow-up"></i></button>
                </th>
            </tr>
            <tr>
                <th>
                    <button class="btn btn-primary" on:click={bring_weak_down}><i class="bi bi-arrow-down"></i></button>
                </th>
            </tr>
        </div>
    </thead>
    <div>
    <tbody>
      <!-- Add your table rows and data here -->
        {#each Object.entries(weak_constrains) as [key, value]}
        
        
                {#if parseInt(key) === selected_weak}
                <tr class="selected_label">
                    <div style="overflow: scroll;max-width: 200px;margin: 0;padding: 0;">
                        <td style="margin: 0; padding: 0;">
                            <button class="btn" on:click={() => select_weak(parseInt(key))} id="label_{key}" >Level {key} : {value}</button>
                        </td>
                    </div>
                </tr>
                {:else}
                <tr class="label">
                    <div style="overflow: scroll;max-width: 200px;margin: 0;padding: 0;">
                        <td style="margin: 0; padding: 0;">
                            <button class="btn" on:click={() => select_weak(parseInt(key))} id="label_{key}" >Level {key} : {value}</button>
                        </td>
                    </div>
                </tr>
                {/if}
       
        {/each}
    </tbody>
    </div>
</Table>


<style>
    th, td {
      text-align: left;
      padding: 8px;
    }

    .label {
        width: 100%;
        text-align: center;
    }

    .selected_label {
        width: 100%;
        text-align: center;
        background-color: #2980b9;
    }
    .container{
        display: flex;
    }
</style>