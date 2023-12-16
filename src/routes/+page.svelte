<div class="container">
    <div class="title">
        <h2>Welcome to SCHOOL TIMETABLE!</h2>
    </div>
    <div class="intro">
        <p>
            "School Timetable" is an editor that supports the user in the creation and management of timetables for schools.<br>
            It is based on three sections:
        </p>
        <ul>
            <li>
                <b>Input Form</b><br>
            </li>
            <li>
                <b>School Timetable</b>
            </li>
            <li>
                <b>Download-Upload Data</b>
            </li>
        </ul>
    </div>
    <div class="description">
        <p>
            In the '<a href="/data-input-form"><b>Input Form</b></a>' section you can insert the datas to be used in your timetable.<br>
            There you can either import datas from your local filesystem with the "import" button or
            insert them manually with the forms.
        </p>
        <p>
            In the '<a href="/drag-and-drop"><b>School Timetable</b></a>' section you can use the datas from the previous section
            to create the timetable, from both the view of the professor or the class.<br>
            You have two ways of creating the timetable:
        </p>
        <ol>
            <li>by <em>manually</em> drag-and-dropping items from the sidebar to the table<br></li>
            <li>by making the AI <em>automatically</em> generate the timetable from a set of given constraint<br></li>
        </ol>
        <p>
            In the '<a href="/downloadUploadData"><b>Download-Upload Data</b></a>' section you can choose to store the current
            session in your filesystem or to upload an existing one to start your work from where you left!
        </p>
        <p>
            After you've completed the generation of the timetable, you can choose to export the result in PDF or Excel.
        </p>
    </div>
    <p>We as the development team hope that you will find this editor useful. Enjoy!</p>
</div>

<style>
    p {
        font-size: 1.1em;
    }

    .container {
        display: grid;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .title {
        display: flex;
        justify-content: center;
        margin: 40px;
    }
</style>