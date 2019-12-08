// DOM elements
const noteList = document.querySelector('.notes');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    //account info 
    db.collection('users').doc(user.uid).get().then(doc => {
    const html = `
      <div>Logged in as ${user.email}</div>
      <div>${doc.data().bio}</div>
    `;
    accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //hide account info
    accountDetails.innerHTML = 'the world is gonna roll me';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup notes
const setupNotes = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const note = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${note.title} 
            <div class="delete-button"><a class="waves-effect waves-light btn">
            <i class="material-icons right">delete</i>DELETE</a></div>
          </div>
          <div class="collapsible-body white"> ${note.content} </div>
        </li>
      `;
      html += li;
    });
    noteList.innerHTML = html
  } else {
    noteList.innerHTML = '<h5 class="center-align">Login to view notes</h5>';
  }

  // db.collection('cafes').orderBy('title').get().then(snapshot => {
  //   snapshot.docs.forEach(doc => {
  //     let li = document.querySelector("#notes-list ul li");
  //     li.setAttribute('note-id', doc.id);
  //   });
  // });

  data.forEach(doc => {
    let li = document.querySelector("#notes-list ul li");
    li.setAttribute('note-id', doc.id);
  });

  //delete notes
  const deleteNote = document.querySelector("#notes-list ul li div div");
  deleteNote.addEventListener('click', (e) => {
    e.stopPropagation();

    if(deleteNote.className == 'delete-button'){
      let li = e.target.parentElement.parentElement;
      li.parentNode.removeChild(li);
    } else {
      console.log("you passed null to the if statement. you didn't delete the note from client");
    }

    console.log("now you're trying to delete it from database");
    console.log(e.target.parentElement.getAttribute);
    let id = e.target.parentElement.getAttribute('note-id');
    console.log(id);
    if(id !== null) {
      db.collection('notes').doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
    } else {
      console.log("your id is for some reason a null");
    }
  });
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});