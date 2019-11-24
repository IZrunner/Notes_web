// DOM elements
const noteList = document.querySelector('.notes');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
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
          <div class="collapsible-header grey lighten-4"> ${note.title} </div>
          <div class="collapsible-body white"> ${note.content} </div>
        </li>
      `;
      html += li;
    });
    noteList.innerHTML = html
  } else {
    noteList.innerHTML = '<h5 class="center-align">Login to view notes</h5>';
  }
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});