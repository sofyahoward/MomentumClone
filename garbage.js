// var database = firebase.database();

//             function addNoteToDB(text, userId) {
//                 var user = firebase.auth().currentUser;
//                 var notesRef = database.ref('notes/' + user.uid);
//                 notesRef.on("child_added", function(childSnapshot, prevChildKey) {
//                     var text = childSnapshot.val().text;
//                     $("#todo-list").append("<li id='toDoListItem'><label><input type='checkbox' name='todo-item-done' class='filled-in todo-item-done' value='" + text + "' /> "+ text +" <button class='todo-item-delete waves-effect waves-light btn deleteItemBtn'>Remove</button></label></li>")
//                 });
//                 database.ref('notes/' + userId).push({
//                     text: text,
//                     status: 'active'
//                 });
//             };
//             addNoteToDB();






// // firebase to pull out user specific notes
// var database = firebase.database();
    
// //FIX THIS BUG
// //this is what is appending the to-do list over and over
// //need to fix this and only append it one time
// // $("#myDayTrigger").click



// // this adds notes to the database
// function addNoteToDataBase(text, userId) {
    
    
//     database.ref('notes/' + userId).push({
//         text: text,
//         status: 'active'
//     });
// }



// function displayNotes(notes) {
//     console.log(notes);
// }


// function addNoteToDataBase(text, userId) {
//     database.ref('notes/' + userId).push({
//         text: text,
//         status: 'active'
//     });
// }


  
//   $(function() {
//     $("#add-todo-item").on('click', function(e){
//       e.preventDefault();
//     //   addTodoItem()
//     var userId = firebase.auth().currentUser.uid;
//     var text = $("#new-todo-item").val();
//     addNoteToDataBase(text, userId);
//     });
    
//   //EVENT DELEGATION
//   //#todo-list is the event handler because .todo-item-delete doesn't exist when the document loads, it is generated later by a todo entry
//   //https://learn.jquery.com/events/event-delegation/
  
//     $("#todo-list").on('click', '.todo-item-delete', function(e){
//       var item = this; 
//       deleteTodoItem(e, item)
//     })
    
//     $(document).on('click', ".todo-item-done", completeTodoItem)
  
//   });

// function initNotes() {
//     var user = firebase.auth().currentUser;
//     var notesRef = database.ref('notes/' + user.uid);
//     notesRef.once('value').then(function(snapshot) {
//         var notes = snapshot.val();
//         console.log(notes);
//         displayNotes(notes);
    
//      });
//     notesRef.on("child_added", function(childSnapshot, prevChildKey) {
//         var text = childSnapshot.val().text;
//         console.log(text);
//         $("#todo-list").append("<li id='toDoListItem'><label><input type='checkbox' name='todo-item-done' class='filled-in todo-item-done' value='" + text + "' /> "+ text +" <button class='todo-item-delete waves-effect waves-light btn deleteItemBtn'>Remove</button></label></li>")
//     });

// };
// initNotes();