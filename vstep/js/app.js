document.addEventListener('DOMContentLoaded', () => {
    // --- Global State ---
    let currentExamData = null;
    let selectedAnswers = { reading: {}, listening: {} };

    // --- DOM Elements ---
    const htmlEl = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    // Sidebar & Mobile
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileClose = document.getElementById('mobile-menu-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const examSelector = document.getElementById('exam-selector');
    const loadingState = document.getElementById('loading-state');
    const appContent = document.getElementById('app-content');

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Reading
    const readingPassageContainer = document.getElementById('reading-passage-container');
    const readingContent = document.getElementById('reading-content');
    const readingQuestions = document.getElementById('reading-questions');

    // Listening
    const audioPlayer = document.getElementById('audio-player');
    const transcriptContent = document.getElementById('transcript-content');
    const listeningQuestions = document.getElementById('listening-questions');
    const toggleTranscriptBtn = document.getElementById('toggle-transcript');

    // Highlighting
    const highlightBtn = document.getElementById('highlight-btn');

    // Submit
    const submitBtn = document.getElementById('submit-test-btn');
    const resultSummary = document.getElementById('result-summary');

    // --- Initialization ---
    initTheme();
    fetchExamsList();

    // --- Event Listeners ---
    themeBtn.addEventListener('click', toggleTheme);
    examSelector.addEventListener('change', (e) => loadExam(e.target.value));

    // Mobile menu handlers
    if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMenu);

    tabBtns.forEach(btn => btn.addEventListener('click', (e) => {
        // Trigger tab change
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Find closest button in case user clicked icon inside it
        const targetBtn = e.target.closest('.tab-btn');
        targetBtn.classList.add('active');
        document.getElementById(targetBtn.dataset.target).classList.add('active');

        // On mobile, close sidebar automatically upon section switch
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    }));

    toggleTranscriptBtn.addEventListener('click', () => {
        if (transcriptContent.style.display === 'none' || transcriptContent.style.display === '') {
            transcriptContent.style.display = 'block';
            toggleTranscriptBtn.textContent = 'Hide Transcript';
        } else {
            transcriptContent.style.display = 'none';
            toggleTranscriptBtn.textContent = 'Show Transcript';
        }
    });

    submitBtn.addEventListener('click', gradeTest);

    // --- Core Functions ---

    function openMenu() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlEl.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    }

    function toggleTheme() {
        const currentTh = htmlEl.getAttribute('data-theme');
        const newTh = currentTh === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTh);
        localStorage.setItem('theme', newTh);
        updateThemeIcons(newTh);
    }

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }

    async function fetchExamsList() {
        try {
            const res = await fetch('data/exams.json');
            if (!res.ok) throw new Error('Cannot load exams index');
            const data = await res.json();

            examSelector.innerHTML = '<option value="">Select an Exam</option>';
            data.forEach(ex => {
                const opt = document.createElement('option');
                opt.value = ex.file;
                opt.textContent = ex.title;
                examSelector.appendChild(opt);
            });

            loadingState.style.display = 'none';
        } catch (e) {
            examSelector.innerHTML = '<option value="">Error loading exams</option>';
            console.error(e);
            loadingState.innerHTML = '<p style="color:red">Failed to load exam data. Are you accessing via file:// protocol? Use a local web server.</p>';
        }
    }

    async function loadExam(fileUrl) {
        if (!fileUrl) {
            appContent.style.display = 'none';
            return;
        }
        loadingState.style.display = 'flex';
        appContent.style.display = 'none';
        resultSummary.classList.add('hidden');
        submitBtn.style.display = 'inline-flex';

        try {
            const res = await fetch(fileUrl);
            currentExamData = await res.json();
            renderExam(currentExamData);
            loadingState.style.display = 'none';
            appContent.style.display = 'block';

            // Auto close menu on mobile after load
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        } catch (e) {
            console.error(e);
            alert("Error parsing exam data!");
            loadingState.style.display = 'none';
        }
    }

    function renderExam(data) {
        selectedAnswers = { reading: {}, listening: {} };

        // Render Reading
        readingContent.innerHTML = data.reading.passage;
        renderQuestions(data.reading.questions, readingQuestions, 'reading');

        // Render Listening
        audioPlayer.src = data.listening.audio;
        transcriptContent.innerHTML = data.listening.transcript;
        transcriptContent.style.display = 'none';
        toggleTranscriptBtn.textContent = 'Show Transcript';
        renderQuestions(data.listening.questions, listeningQuestions, 'listening');

        // Reset Audio
        audioPlayer.load();
    }

    function renderQuestions(questions, container, sectionType) {
        container.innerHTML = '';
        questions.forEach((q, qIndex) => {
            const qBlock = document.createElement('div');
            qBlock.className = 'question-item';
            qBlock.dataset.id = q.id;

            const qHeader = document.createElement('div');
            qHeader.className = 'q-text';
            qHeader.textContent = `${qIndex + 1}. ${q.question}`;
            qBlock.appendChild(qHeader);

            const optList = document.createElement('div');
            optList.className = 'options-list';

            q.options.forEach((optStr, optIndex) => {
                const label = document.createElement('label');
                label.className = 'option-label';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `${sectionType}_${q.id}`;
                radio.value = optIndex;

                radio.addEventListener('change', () => {
                    selectedAnswers[sectionType][q.id] = optIndex;
                });

                const textSpan = document.createElement('span');
                textSpan.className = 'option-text';
                textSpan.textContent = optStr;

                label.appendChild(radio);
                label.appendChild(textSpan);
                optList.appendChild(label);
            });
            qBlock.appendChild(optList);

            const expl = document.createElement('div');
            expl.className = 'explanation-box';
            expl.innerHTML = `<strong>Explanation:</strong> ${q.explanation || 'No explanation provided.'}`;
            qBlock.appendChild(expl);

            container.appendChild(qBlock);
        });
    }

    // --- Highlighting Logic ---
    let currentSelectionRange = null;

    document.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && !selection.isCollapsed) {
            // Check if selection is inside readable panels
            const range = selection.getRangeAt(0);
            const commonAncestor = range.commonAncestorContainer;
            const isReadable = readingContent.contains(commonAncestor) || transcriptContent.contains(commonAncestor);

            if (isReadable) {
                const rect = range.getBoundingClientRect();

                // Set animation dynamically using raw style toggle
                highlightBtn.style.left = `${rect.left + rect.width / 2}px`;
                highlightBtn.style.top = `${rect.top + window.scrollY - 10}px`;
                highlightBtn.style.display = 'flex';
                // Trigger reflow for animation
                void highlightBtn.offsetWidth;
                highlightBtn.style.animation = 'popUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

                currentSelectionRange = range;
                return;
            }
        }

        // Hide if condition fails
        setTimeout(() => {
            if (document.activeElement !== highlightBtn) {
                highlightBtn.style.display = 'none';
                highlightBtn.style.animation = 'none';
                currentSelectionRange = null;
            }
        }, 100);
    });

    highlightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentSelectionRange) {
            try {
                surroundRangeWithMark(currentSelectionRange);
            } catch (err) {
                console.log("Could not highlight selection safely.", err);
            }
        }
        highlightBtn.style.display = 'none';
        window.getSelection().removeAllRanges();
    });

    function surroundRangeWithMark(range) {
        const mark = document.createElement('mark');
        mark.className = 'hl';
        try {
            range.surroundContents(mark);
        } catch (e) {
            // Fallback for selections crossing boundaries
            const contents = range.extractContents();
            mark.appendChild(contents);
            range.insertNode(mark);
        }
    }

    // --- Evaluation Logic ---
    function gradeTest() {
        if (!currentExamData) return;

        let totalQuestions = 0;
        let correctAnswers = 0;

        function evaluateSection(questions, sectionType, container) {
            questions.forEach(q => {
                totalQuestions++;
                const isCorrect = selectedAnswers[sectionType][q.id] === q.answer;
                if (isCorrect) correctAnswers++;

                const qBlock = container.querySelector(`.question-item[data-id="${q.id}"]`);
                if (qBlock) {
                    const optionLabels = qBlock.querySelectorAll('.option-label');
                    const radios = qBlock.querySelectorAll('input[type="radio"]');

                    radios.forEach(r => r.disabled = true);

                    optionLabels.forEach((label, i) => {
                        if (i === q.answer) {
                            label.classList.add('correct');
                        } else if (radios[i].checked && i !== q.answer) {
                            label.classList.add('wrong');
                        }
                    });

                    const expl = qBlock.querySelector('.explanation-box');
                    if (expl) expl.style.display = 'block';
                }
            });
        }

        evaluateSection(currentExamData.reading.questions, 'reading', readingQuestions);
        evaluateSection(currentExamData.listening.questions, 'listening', listeningQuestions);

        const scorePct = Math.round((correctAnswers / totalQuestions) * 100);
        resultSummary.innerHTML = `
            <h2>Review Complete!</h2>
            <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1rem;">You scored <strong>${correctAnswers}</strong> out of <strong>${totalQuestions}</strong>.</p>
            <div style="display:inline-block; padding: 1rem 2rem; border-radius: 50px; background-color: ${scorePct >= 70 ? 'var(--success-light)' : 'var(--primary-light)'};">
                <p style="font-size: 2rem; font-weight: 700; color: ${scorePct >= 70 ? 'var(--success-color)' : 'var(--primary-color)'}; margin: 0;">${scorePct}% Accuracy</p>
            </div>
        `;
        resultSummary.classList.remove('hidden');
        submitBtn.style.display = 'none';

        // Smooth scroll summary box into view
        resultSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
