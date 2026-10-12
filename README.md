# QuickNotes

QuickNotes is a lightweight, responsive, and intuitive note-taking web application designed to help users capture, organize, and manage their daily thoughts, tasks, and ideas in real time. Built from scratch with vanilla HTML5, CSS3, and JavaScript, the app allows users to categorize notes into Personal, Work, or Study buckets, each styled with distinctive visual accents. With client-side persistence powered by the Web Storage API, interactive real-time search filtering, form validation, and accessible feedback, QuickNotes delivers a seamless experience across desktop and mobile devices without requiring any external libraries or dependencies.

## ✨ Features

- **Semantic HTML5 & Accessibility:** Structured with semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`), properly associated form labels, and live region feedback for screen readers.
- **Categorized Notes:** Organize notes by **Personal** (teal), **Work** (dark red), and **Study** (blue), each distinguished by colorful badges and border indicators.
- **Real-Time Validation:** Validates note content immediately upon submission, preventing empty submissions ("Please type a note first.") and enforcing a 200-character ceiling ("Notes must be 200 characters or fewer."). Error messages automatically clear as the user types.
- **Safe DOM Rendering:** Renders note cards dynamically using `document.createElement()` and `textContent`, strictly avoiding `innerHTML` for user content to guard against Cross-Site Scripting (XSS).
- **Interactive Search:** Live, non-case-sensitive search bar that filters notes dynamically as you type, displaying a helpful message ("No notes match your search.") when no matches are found.
- **Accurate Count Messaging:** Displays precise grammatically correct status messages: *"You have no notes yet."*, *"You have 1 note."*, or *"You have N notes."*
- **Persistent Storage:** Synchronizes all note additions, deletions, and clear operations to the browser's `localStorage` with `JSON.stringify` and `JSON.parse`, ensuring notes survive browser refreshes.
- **Delete & Clear All (Bonus):** Remove individual notes with one click, or use the "Clear All" button with a confirmation safeguard (`confirm("Delete all notes?")`) to reset the board.
- **Mobile-Responsive Design:** Polished with custom CSS variables, subtle micro-interactions, hover states, and a dedicated `@media (max-width: 600px)` breakpoint that fluidly stacks form controls.

## 🚀 How to Run the Project Locally

Because QuickNotes is built with pure web technologies, no build tools, compilers, or package installations are required.

### Option 1: Direct Browser Launch
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/georgescourser-lab/quicknotes-app.git
   ```
2. Navigate into the project folder:
   ```bash
   cd quicknotes-app
   ```
3. Open `index.html` directly in your favorite web browser (Google Chrome, Firefox, Microsoft Edge, Safari).

### Option 2: Using a Local Development Server (Recommended)
You can serve the files with any lightweight HTTP server:
- **Using Python 3:**
  ```bash
  python -m http.server 3000
  ```
  Then open `http://localhost:3000` in your browser.
- **Using Node.js (`npx`):**
  ```bash
  npx serve .
  ```
- **Using VS Code Live Server:** Right-click `index.html` and click **"Open with Live Server"**.

## 🧠 What I Learned

1. **Semantic Structure & Web Accessibility:** Learned the importance of using landmark elements (`<header>`, `<main>`, `<section>`, `<footer>`) and explicitly linking form inputs with `<label for="...">`. Integrating `role="alert"` and `aria-live="polite"` makes dynamic state updates accessible to assistive technologies.
2. **Safe Dynamic DOM Manipulation:** Learned how relying on `element.textContent` and `document.createElement()` instead of assigning untrusted strings to `innerHTML` provides robust protection against Cross-Site Scripting (XSS) attacks while building complex UI components.
3. **Responsive Layouts with Flexbox & Media Queries:** Gained hands-on experience structuring responsive forms and cards using CSS Flexbox. Applying `@media (max-width: 600px)` ensures that form controls transition smoothly between horizontal inline desktop layouts and stacked mobile views.
4. **Data Persistence with the Web Storage API:** Mastered synchronizing application state with browser `localStorage`, serializing data with `JSON.stringify`, safely parsing data with `JSON.parse` and error handling, and maintaining state consistency across note creation, deletion, and reset flows.
