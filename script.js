// QuickNotes - script.js
// DOM Elements selected using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const errorMessage = document.querySelector('#error-message');
const noteCount = document.querySelector('#note-count');

// In-memory array of note objects
let notes = [];

/**
 * Format timestamp into readable date and time
 * @returns {string} Readable date & time
 */
function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' at ' + now.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Update the note count message based on current notes
 */
function updateCount() {
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (count === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

/**
 * Delete a note by its unique ID
 * @param {string} id - The ID of the note to remove
 */
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

/**
 * Rebuild the list from the notes array using createElement and textContent
 */
function render() {
  // Clear existing items in list
  notesList.innerHTML = '';

  notes.forEach((note) => {
    // Note Card container
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;
    li.dataset.id = note.id;

    // Note Text (using textContent to prevent XSS)
    const pText = document.createElement('p');
    pText.className = 'note-content';
    pText.textContent = note.text;

    // Note Footer
    const footer = document.createElement('div');
    footer.className = 'note-footer';

    // Details wrapper (category badge + date)
    const details = document.createElement('div');
    details.className = 'note-details';

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = note.category;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'note-date';
    dateSpan.textContent = note.createdAt;

    details.appendChild(categoryBadge);
    details.appendChild(dateSpan);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete note: ${note.text.slice(0, 20)}`);
    deleteBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });

    // Assemble footer and card
    footer.appendChild(details);
    footer.appendChild(deleteBtn);

    li.appendChild(pText);
    li.appendChild(footer);

    notesList.appendChild(li);
  });

  // Update note count
  updateCount();
}

/**
 * Handle form submission to add a note with validation
 */
function handleAddNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  // Validation
  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  // Clear validation error on valid submission
  errorMessage.textContent = '';

  const category = noteCategory.value;

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: getFormattedDateTime()
  };

  notes.unshift(newNote);
  render();

  // Reset input field
  noteInput.value = '';
}

// Clear error message when user starts typing
noteInput.addEventListener('input', () => {
  if (errorMessage.textContent) {
    errorMessage.textContent = '';
  }
});

// Event Listeners
noteForm.addEventListener('submit', handleAddNote);

// Initial render
render();
