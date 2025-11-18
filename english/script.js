// --- AVASCRIPT CỦA BẠN ---
    
let roadmapData = [];
let completedLessons = JSON.parse(localStorage.getItem('myEnglishProgress')) || [];

const roadmapContainer = document.getElementById('roadmap-app');
const modal = document.getElementById('lessonModal');
const progressBar = document.getElementById('myBar');
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
// --- 2. Hàm vẽ giao diện ---
function renderRoadmap() {
    roadmapContainer.innerHTML = ''; 
    
    const filterLvl = document.getElementById('filterLevel').value;
    const filterStt = document.getElementById('filterStatus').value;
    
    const filteredData = roadmapData.filter(item => {
        const isDone = completedLessons.includes(item.id);
        
        const matchLevel = (filterLvl === 'all') || (item.level === filterLvl);
        
        let matchStatus = true;
        if (filterStt === 'completed') matchStatus = isDone;
        if (filterStt === 'incomplete') matchStatus = !isDone;
        
        return matchLevel && matchStatus;
    });
    
    if (filteredData.length === 0) {
        roadmapContainer.innerHTML = '<div class="no-data">Không tìm thấy bài học nào phù hợp bộ lọc.</div>';
        return;
    }
    
    filteredData.forEach((item, index) => {
        const isDone = completedLessons.includes(item.id);
        const statusClass = isDone ? 'completed' : '';
        const containerDiv = document.createElement('div');
        
        containerDiv.className = `container ${index % 2 === 0 ? 'left' : 'right'}`;
        
        const cardHtml = `
            <div class="content-card ${statusClass}" onclick="openLesson(${item.id})">
                <span class="level-tag">${item.level}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
            </div>
        `;
        
        containerDiv.innerHTML = cardHtml;
        roadmapContainer.appendChild(containerDiv);
    });
    
    updateProgressBar();
}
// --- 3. Hàm tính thanh tiến độ ---
function updateProgressBar() {
    if (roadmapData.length === 0) return;
    const percent = (completedLessons.length / roadmapData.length) * 100;
    progressBar.style.width = percent + "%";
}
// --- 4. Xử lý Modal ---
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
            btnContainer.innerHTML = `<button class="btn-action btn-incomplete" onclick="toggleStatus(${id})">Hủy hoàn thành</button>`;
        } else {
            btnContainer.innerHTML = `<button class="btn-action btn-complete" onclick="toggleStatus(${id})">Đánh dấu đã học xong</button>`;
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
// --- 5. Chạy chương trình ---
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
    .catch(err => console.error(err));