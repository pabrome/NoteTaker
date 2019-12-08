var activeNote = {};

var getNotes = function() {
    return $.get("/api/notes");
};

var saveNote = async function(note) {
    $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

var deleteNote = function(number) {
    $.ajax({
        url: "/api/notes",
        data: {noteNumber: number},
        method: "DELETE"
    });
};

var renderActiveNote = function() {
    $("#input").empty();
    if (jQuery.isEmptyObject(activeNote)) {
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
            size: "5",
            placeholder: "Note text"
        }).appendTo("#input");
        $("<button>").attr({
            type: "test",   
            id: "saveButton"
        }).text("Save").appendTo("#input");
    }
    else {
        $("<div>").addClass("note-title text-dark").text(activeNote.title).appendTo("#input");
        $("<div>").addClass("note-textarea text-dark align-middle").text(activeNote.text).appendTo("#input");
        $("<button>").attr({
            type: "test",   
            id: "newNoteButton"
        }).text("Create new note").appendTo("#input");
        $("#newNoteButton").on("click", handleNewNoteView);
    };
    $("#saveButton").on("click", handleNoteSave);
};

var handleNoteSave = async function() {
    note = {title:$("#titleInput").val(), text:$("#textInput").val()};
    saveNote(note);
    getAndRenderNotes();
};

var handleNoteDelete = async function() {
    number = this.id.slice(this.id.length-1);
    deleteNote(number);
    getAndRenderNotes();
};

var handleNoteView = function() {
    noteNumber = this.id.slice(this.id.length-1);
    activeNote = {title:$(`#title${noteNumber}`).text(), text: $(`#text${noteNumber}`).text()};
    renderActiveNote();
};

var handleNewNoteView = function() {
    activeNote = {};
    renderActiveNote();
};

var renderNoteList = function(noteData) {
    $("#sidebar").empty();
    for (var x = 0; x < noteData.length; x++){
        $("<div>").attr({
            class: "list-group-item",
            id: "note"+x
        }).appendTo("#sidebar");
        $("<div>").attr({
            class: "note-title text-dark",
            id: "title"+x
        }).text(noteData[x].title).appendTo("#note"+x);
        $("<div>").attr({
            class: "note-textarea text-dark",
            id: "text"+x
        }).text(noteData[x].text).appendTo("#note"+x);
        $("<button>").attr({
            class: "deleteButton",
            id: "delete"+x
        }).text("Delete").appendTo("#note"+x);
    };
    $(".deleteButton").on("click", handleNoteDelete);
    $(".note-title").on("click", handleNoteView);
    $(".note-textarea").on("click", handleNoteView);
};

 async function getAndRenderNotes() {
    let data = await $.get("/api/notes");
    renderNoteList(data);
    renderActiveNote();
};

getAndRenderNotes();
