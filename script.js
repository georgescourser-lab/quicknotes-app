// QuickNotes - script.js
// Storage key for localStorage persistence
const STORAGE_KEY = 'quicknotes_app_notes';

// DOM Elements selected using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const errorMessage = document.querySelector('#error-message');
const noteCount = document.querySelector('#note-count');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');

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
 * Save current notes array to localStorage using JSON.stringify
 */
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes to localStorage:', error);
  }
}

/**
 * Load notes from localStorage using JSON.parse
 */
function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      notes = JSON.parse(savedNotes);
    } else {
      notes = [];
    }
  } catch (error) {
    console.error('Failed to parse notes from localStorage:', error);
    notes = [];
  }
}

/**
 * Update the note count message based on total notes count
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
  saveNotes();
  render();
}

/**
 * Clear all notes with user confirmation
 */
function clearAllNotes() {
  if (notes.length === 0) {
    return;
  }

  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
}

/**
 * Create a single note card list item element using createElement and textContent
 * @param {Object} note - The note object to create an element for
 * @returns {HTMLLIElement} The created list item element
 */
function createNoteElement(note) {
  const li = document.createElement('li');
  li.className = `note-card category-${note.category.toLowerCase()}`;
  li.dataset.id = note.id;

  // Note text (using textContent to prevent XSS)
  const pText = document.createElement('p');
  pText.className = 'note-content';
  pText.textContent = note.text;

  // Note footer
  const footer = document.createElement('div');
  footer.className = 'note-footer';

  // Details wrapper (category badge + creation date)
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

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('aria-label', `Delete note: ${note.text.slice(0, 20)}`);
  deleteBtn.addEventListener('click', () => {
    deleteNote(note.id);
  });

  // Assemble note card
  footer.appendChild(details);
  footer.appendChild(deleteBtn);

  li.appendChild(pText);
  li.appendChild(footer);

  return li;
}

/**
 * Rebuild the list from the notes array using createElement and textContent
 */
function render() {
  // Clear existing items in list
  notesList.replaceChildren();

  const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

  // Filter notes based on search query (case-insensitive)
  const filteredNotes = searchQuery === ''
    ? notes
    : notes.filter((note) => note.text.toLowerCase().includes(searchQuery));

  if (searchQuery !== '' && filteredNotes.length === 0) {
    // Show empty search result message
    const emptyLi = document.createElement('li');
    emptyLi.className = 'empty-state';
    emptyLi.textContent = 'No notes match your search.';
    notesList.appendChild(emptyLi);
  } else {
    // Append each filtered note card
    filteredNotes.forEach((note) => {
      const noteElement = createNoteElement(note);
      notesList.appendChild(noteElement);
    });
  }

  // Update note count
  updateCount();
}

/**
 * Handle form submission to add a note with validation
 * @param {Event} event - Submit event
 */
function handleAddNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  // Validation: empty or only spaces
  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }

  // Validation: over 200 characters
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  // Clear validation error when valid note is submitted
  errorMessage.textContent = '';

  const category = noteCategory.value;

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: getFormattedDateTime()
  };

  // Add to beginning of array
  notes.unshift(newNote);

  // Save to localStorage
  saveNotes();

  // Reset input and clear search if any so user sees the newly added note
  noteInput.value = '';
  if (searchInput.value) {
    searchInput.value = '';
  }

  // Re-render
  render();
}

// Clear error message when user starts typing in the input
noteInput.addEventListener('input', () => {
  if (errorMessage.textContent) {
    errorMessage.textContent = '';
  }
});

// Search input listener for live filtering
searchInput.addEventListener('input', () => {
  render();
});

// Clear all button listener
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', clearAllNotes);
}

// Form submit listener
noteForm.addEventListener('submit', handleAddNote);

// Load notes from localStorage on page startup
loadNotes();

// Initial render
render();
