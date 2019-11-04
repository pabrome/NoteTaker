var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");


// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {

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
var deleteNote = function(title) {
    $.ajax({
        url: "/api/notes",
        data: title,
        method: "DELETE"
    })
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
    note = {title:"Second Title",text:"Second Text"};
    saveNote(note);
    getAndRenderNotes();
};

// Delete the clicked note
var handleNoteDelete = function(event) {
    console.log("Delete")
    // deleteNote(this.title)
    // getAndRenderNotes()
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  
};

// Render's the list of note titles
var renderNoteList = function(noteData) {
    for (var x = 0; x < noteData.length; x++){
        $("<div>").attr({
            class: "card",
            id: "note"+x
        }).appendTo("#sidebar");
        $("<div>").attr({
            class: "note-title",
            id: "title"+x
        }).text(noteData[x].title).appendTo("#note"+x);
        $("<div>").attr({
            class: "note-textarea",
            id: "text"+x
        }).text(noteData[x].text).appendTo("#title"+x);
        $("<button>").attr({
            class: "saveNoteBtn",
        }).text("Save").appendTo("#text"+x);
        $("<button>").attr({
            class: "deleteButton",
            id: "but"
        }).text("Delete").appendTo("#text"+x);
    }
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
    $.get("/api/notes").then(function(noteData){
        renderNoteList(noteData);
    })
};

// $saveNoteBtn.on("click", handleNoteSave);
// $noteList.on("click", ".list-group-item", handleNoteView);
// $newNoteBtn.on("click", handleNewNoteView);
// $noteList.on("click", ".delete-note", handleNoteDelete);
// $noteTitle.on("keyup", handleRenderSaveBtn);
// $noteText.on("keyup", handleRenderSaveBtn);

console.log("Delete button clicked")

$("#but").click(function(){
    console.log("Delete button clicked")
    // handleNoteDelete()
});

// Gets and renders the initial list of notes
getAndRenderNotes();
