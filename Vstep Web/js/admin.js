document.addEventListener('DOMContentLoaded', () => {
    let readingQCount = 0;
    let listeningQCount = 0;

    const template = document.getElementById('question-template').content;
    const adminForm = document.getElementById('admin-form');

    // Make adding available to global scope for inline onclick handler
    window.addQuestion = function (type) {
        const container = document.getElementById(`${type}-qs-container`);
        const clone = document.importNode(template, true);

        // Add remove handler
        clone.querySelector('.remove-q-btn').addEventListener('click', (e) => {
            e.target.closest('.q-block').remove();
        });

        container.appendChild(clone);
    };

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const examId = document.getElementById('exam-id').value.trim();
        const examTitle = document.getElementById('exam-title').value.trim();

        // Reading Data
        const rPassage = document.getElementById('reading-passage').value.trim();
        const rQuestionsNodes = document.getElementById('reading-qs-container').querySelectorAll('.q-block');
        const rQuestions = processQuestions(rQuestionsNodes, 'r');

        // Listening Data
        const lAudio = document.getElementById('listening-audio').value.trim();
        const lTranscript = document.getElementById('listening-transcript').value.trim();
        const lQuestionsNodes = document.getElementById('listening-qs-container').querySelectorAll('.q-block');
        const lQuestions = processQuestions(lQuestionsNodes, 'l');

        // Construct JSON Payload
        const payload = {
            title: examTitle,
            reading: {
                passage: rPassage,
                questions: rQuestions
            },
            listening: {
                audio: lAudio,
                transcript: lTranscript,
                questions: lQuestions
            }
        };

        // Trigger Download
        downloadFile(`${examId}.json`, JSON.stringify(payload, null, 2));
    });

    function processQuestions(nodesList, prefix) {
        const questions = [];
        nodesList.forEach((node, index) => {
            const tempId = `${prefix}_q${index + 1}`;
            const qtext = node.querySelector('.q-text').value.trim();
            const opts = Array.from(node.querySelectorAll('.q-opt')).map(inp => inp.value.trim());
            const correctIndex = parseInt(node.querySelector('.q-answer').value, 10);
            const explanation = node.querySelector('.q-expl').value.trim();

            questions.push({
                id: tempId,
                question: qtext,
                options: opts,
                answer: isNaN(correctIndex) ? 0 : correctIndex,
                explanation: explanation
            });
        });
        return questions;
    }

    function downloadFile(filename, text) {
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
