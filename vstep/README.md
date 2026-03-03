# VSTEP Web Practice Application

A modern, fast, and SEO-friendly static web application for VSTEP testing preparation. 

Built completely with HTML, CSS, and Vanilla JavaScript. It requires zero compilation or backend servers, allowing dead-simple hosting on GitHub Pages and unparalleled performance.

## Core Features
1. **Interactive Reading & Listening**: Features split pane panels mimicking premium test platforms.
2. **Smooth Highlighting Engine**: Utilizes pure DOM ranges to highlight the text exactly without lag, avoiding expensive re-renders that occur in VDOM libraries. 
3. **Automated Grading Engine**: Instantly grades questions and toggles detailed explanations per option upon test submission.
4. **Admin Panel Generator**: `/admin.html` acts as a static CMS. Authors can fill in exam questions, upload a transcript, and instantly download a formatted `.json` that perfectly structures exams for the frontend framework.
5. **Modern styling & Dark Mode**: Professional typography and fully automated, CSS-variable-powered dark mode integrated flawlessly with user's browsers.

## Project Structure
- `index.html`: The main testing frontend.
- `admin.html`: The interactive admin form to build exams.
- `css/style.css`: All application styling.
- `js/app.js`: Core exam functionality.
- `js/admin.js`: JSON serializer.
- `data/`: Location of test data payloads (`exam1.json`) and the central directory (`exams.json`). All dummy data is located here.
- `audio/`: Your directory to place `.mp3` or other sound files.

## Running Locally for Development
Since the project relies heavily on the `fetch()` API to read `.json` payloads from the local `data/` directory, opening `index.html` natively as `file:///...` causes CORS and file isolation errors in Chromium and Firefox.

To test properly, use a local web server:

**Using Node.js:**
```bash
npx serve ./
```

**Using Python (3.x):**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

## Adding a New Exam
1. Deploy/Run the server and visit `/admin.html` in your browser.
2. Enter the exam contents.
3. Click **Generate & Download JSON**.
4. A file (e.g. `exam2.json`) will be downloaded. Move this file directly into the `data/` folder.
5. Edit `data/exams.json` and append the new exact title and filepath inside the array:

```json
[
  {
    "id": "exam1",
    "title": "VSTEP Practice Test 1",
    "file": "data/exam1.json"
  },
  {
    "id": "exam2",
    "title": "VSTEP Practice Test 2",
    "file": "data/exam2.json"
  }
]
```

## Deploying to GitHub Pages
1. Ensure your master/main branch has all these files.
2. Go to your repository `Settings` -> `Pages`.
3. Select `Deploy from a branch`.
4. Pick the branch, choose the `/ (root)` folder and hit **Save**.
5. Your platform is now publicly active and fetches JSON directly from GitHub servers!
