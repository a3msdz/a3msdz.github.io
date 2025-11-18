let roadmapData = [];
let completedLessons = JSON.parse(localStorage.getItem('myEnglishProgress')) || [];
const roadmapContainer = document.getElementById('roadmap-app');
const modal = document.getElementById('lessonModal');
const progressBar = document.getElementById('myBar');
const totalLessonsEl = document.getElementById('totalLessons');
const completedLessonsEl = document.getElementById('completedLessons');
const progressPercentEl = document.getElementById('progressPercent');
// --- 1. Hàm khởi tạo bộ lọc Level ---
function initFilters() {
    const levelSelect = document.getElementById('filterLevel');
    
    const uniqueLevels = [...new Set(roadmapData.map(item => item.level))];
    uniqueLevels.forEach(lvl => {
        const option = document.createElement('option');
        option.value = lvl;
        option.innerText = lvl;
        levelSelect.appendChild(option);
    });
}
// --- 2. Hàm cập nhật thống kê ---
function updateStats() {
    totalLessonsEl.textContent = roadmapData.length;
    completedLessonsEl.textContent = completedLessons.length;
    
    if (roadmapData.length > 0) {
        const percent = Math.round((completedLessons.length / roadmapData.length) * 100);
        progressPercentEl.textContent = `${percent}%`;
    } else {
        progressPercentEl.textContent = '0%';
    }
}
// --- 3. Hàm vẽ giao diện ---
function renderRoadmap() {
    roadmapContainer.innerHTML = ''; 
    
    // 1. Lấy các giá trị bộ lọc
    const filterLvl = document.getElementById('filterLevel').value;
    const filterStt = document.getElementById('filterStatus').value;
    // 2. Lọc dữ liệu trước
    const filteredData = roadmapData.filter(item => {
        const isDone = completedLessons.includes(item.id);
        const matchLevel = (filterLvl === 'all') || (item.level === filterLvl);
        let matchStatus = true;
        if (filterStt === 'completed') matchStatus = isDone;
        if (filterStt === 'incomplete') matchStatus = !isDone;
        return matchLevel && matchStatus;
    });
    if (filteredData.length === 0) {
        roadmapContainer.innerHTML = `
            <div class="no-data">
                <i class="fas fa-search"></i>
                <h3>Không tìm thấy bài học phù hợp</h3>
                <p>Hãy thử thay đổi bộ lọc để xem nhiều bài học hơn</p>
            </div>
        `;
        updateProgressBar();
        updateStats();
        return;
    }
    // 3. GOM NHÓM: Nhóm các bài học theo "Level"
    const grouped = {};
    filteredData.forEach(item => {
        if (!grouped[item.level]) {
            grouped[item.level] = [];
        }
        grouped[item.level].push(item);
    });
    // 4. VẼ GIAO DIỆN: Lặp qua từng nhóm (Level) để vẽ
    Object.keys(grouped).forEach(levelName => {
        const lessons = grouped[levelName];
        // Tạo khung chứa Level (Phase Block)
        const phaseBlock = document.createElement('div');
        phaseBlock.className = 'phase-block';
        // Tạo tiêu đề Level
        const phaseTitle = document.createElement('div');
        phaseTitle.className = 'phase-title';
        phaseTitle.innerText = levelName;
        // Tạo lưới chứa các bài học con
        const gridDiv = document.createElement('div');
        gridDiv.className = 'lesson-grid';
        // Vẽ từng bài học nhỏ vào trong lưới
        lessons.forEach(item => {
            const isDone = completedLessons.includes(item.id);
            const statusClass = isDone ? 'completed' : '';
            const lessonNode = document.createElement('div');
            lessonNode.className = `lesson-node ${statusClass}`;
            lessonNode.onclick = () => openLesson(item.id);
            
            lessonNode.innerHTML = `
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                </div>
                <div class="lesson-meta">
                    <span class="level-tag">${item.level}</span>
                    ${isDone ? '<span style="color: var(--success-color);"><i class="fas fa-check-circle"></i> Đã hoàn thành</span>' : '<span style="color: var(--secondary-color);"><i class="far fa-clock"></i> Chưa học</span>'}
                </div>
            `;
            gridDiv.appendChild(lessonNode);
        });
        // Ghép tất cả lại
        phaseBlock.appendChild(phaseTitle);
        phaseBlock.appendChild(gridDiv);
        roadmapContainer.appendChild(phaseBlock);
    });
    
    updateProgressBar();
    updateStats();
}
// --- 4. Hàm tính thanh tiến độ ---
function updateProgressBar() {
    if (roadmapData.length === 0) return;
    const percent = (completedLessons.length / roadmapData.length) * 100;
    progressBar.style.width = percent + "%";
}
// --- 5. Xử lý Modal ---
let currentLessonId = null;
function openLesson(id) {
    currentLessonId = id;
    const lesson = roadmapData.find(item => item.id === id);
    
    if (lesson) {
        document.getElementById('modal-title').innerText = lesson.title;
        document.getElementById('modal-level').innerText = lesson.level;
        document.getElementById('modal-desc').innerHTML = lesson.details;
        
        const btnContainer = document.getElementById('modal-actions');
        const isDone = completedLessons.includes(id);
        
        if (isDone) {
            btnContainer.innerHTML = `<button class="btn-action btn-incomplete" onclick="toggleStatus(${id})"><i class="fas fa-undo"></i> Hủy hoàn thành</button>`;
        } else {
            btnContainer.innerHTML = `<button class="btn-action btn-complete" onclick="toggleStatus(${id})"><i class="fas fa-check"></i> Đánh dấu đã học xong</button>`;
        }
        
        modal.style.display = "block";
    }
}
function toggleStatus(id) {
    const index = completedLessons.indexOf(id);
    if (index > -1) {
        completedLessons.splice(index, 1);
    } else {
        completedLessons.push(id);
    }
    
    localStorage.setItem('myEnglishProgress', JSON.stringify(completedLessons));
    renderRoadmap();
    modal.style.display = "none";
}
document.getElementsByClassName("close")[0].onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// --- 6. Chạy chương trình ---
// Giả lập dữ liệu cho demo
const sampleData = [
    {
        "id": 1,
        "level": "A1",
        "title": "Bảng chữ cái & Phát âm IPA",
        "summary": "Làm chủ hệ thống âm thanh tiếng Anh từ gốc rễ",
        "details": "<h3>1. Bảng chữ cái (The Alphabet)</h3><p>Tiếng Anh có 26 chữ cái nhưng cách đọc tên chữ cái khác với cách phát âm trong từ.</p>"
    },
    {
        "id": 2,
        "level": "A1",
        "title": "Chào hỏi & Từ vựng sinh tồn",
        "summary": "Các mẫu câu giao tiếp bắt buộc phải biết",
        "details": "<h3>1. Các cấp độ chào hỏi (Greetings)</h3><p>Học cách chào hỏi trong các tình huống khác nhau.</p>"
    },
    {
        "id": 3,
        "level": "A2",
        "title": "Ngữ pháp: Hiện tại, Quá khứ",
        "summary": "Nắm vững xương sống của ngữ pháp tiếng Anh",
        "details": "<h3>1. Thì hiện tại đơn (Present Simple)</h3><p>Dùng cho: Sự thật, Thói quen, Lịch trình tàu xe.</p>"
    }
];
fetch('data.json')
    .then(response => {
        if (!response.ok) throw new Error("Lỗi load file data.json");
        return response.json();
    })
    .then(data => {
        roadmapData = data;
        initFilters();
        renderRoadmap();
    })
    .catch(err => {
        console.error(err);
        roadmapContainer.innerHTML = `
            <div class="no-data">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Không thể tải dữ liệu</h3>
                <p>Đã xảy ra lỗi khi tải file data.json. Vui lòng kiểm tra lại.</p>
            </div>
        `;
});