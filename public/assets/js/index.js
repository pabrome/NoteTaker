var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");


// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
    return $.get("/api/notes")
};

// A function for saving a note to the db
var saveNote = function(note) {
    $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

// A function for deleting a note from the db
var deleteNote = function(number) {
    $.ajax({
        url: "/api/notes",
        data: {noteNumber:number},
        method: "DELETE"
    });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
    $("#input").empty()
    if (activeNote.length !== 'undefined'){
        $("<input>").attr({
            class: "note-title",
            type: "text",
            id: "titleInput",
            placeholder: "Title"
        }).appendTo("#input");
        $("<input>").attr({
            class: "note-textarea",
            type: "test",
            id: "textInput",
            placeholder: "Note text"
        }).appendTo("#input");
        $("<button>").attr({
            type: "test",   
            id: "saveButton"
        }).text("Save").appendTo("#input");
    }
    else{
        $("<div>").addClass("note-title").text(activeNote.title).appendTo("#input")
        $("<input>").addClass("note-textarea").text(activeNote.text).appendTo("#input")
    }
    $("#saveButton").on("click", handleNoteSave);
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
    note = {title:$("#titleInput").val(), text:$("#textInput").val()};
    console.log(note)
    saveNote(note);
    getAndRenderNotes();
};

// Delete the clicked note
var handleNoteDelete = function() {
    number = this.id.slice(this.id.length-1);
    console.log(number);
    deleteNote(number);
    getAndRenderNotes();
};

// Sets the activeNote and displays it
var handleNoteView = function() {
    noteNumber = this.id.slice(this.id.length-1);
    activeNote = {title:$(`#title${noteNumber}`).val(), text: $(`#text${noteNumber}`).val()};
    title = $("#title0").val();
    console.log(noteNumber);
};

// Sets the activeNote to an empty object and allows the user to enter a new note
var handleNewNoteView = function() {
    activeNote = {};
    renderActiveNote()
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  
};

// Render's the list of note titles
var renderNoteList = function(noteData) {
    $("#sidebar").empty()
    for (var x = 0; x < noteData.length; x++){
        $("<div>").attr({
            class: "list-group-item",
            id: "note"+x
        }).appendTo("#sidebar");
        $("<div>").attr({
            class: "note-title",
            id: "title"+x
        }).text(noteData[x].title).appendTo("#note"+x);
        $("<div>").attr({
            class: "note-textarea",
            id: "text"+x
        }).text(noteData[x].text).appendTo("#note"+x);
        $("<button>").attr({
            class: "deleteButton",
            id: "delete"+x
        }).text("Delete").appendTo("#note"+x);
    }
    $(".deleteButton").on("click", handleNoteDelete)
    $(".list-group-item").on("click",handleNoteView)

};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
    $.get("/api/notes").then(function(data){
        renderNoteList(data)
    })
    renderActiveNote()
};

// $saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
// $newNoteBtn.on("click", handleNewNoteView);
// $noteList.on("click", ".delete-note", handleNoteDelete);
// $noteTitle.on("keyup", handleRenderSaveBtn);
// $noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
