const curriculumData = [
    {
        semester: "Học kỳ 1",
        subjects: [
            { code: "IT001", name: "Nhập môn lập trình", lt: 3, th: 1, pre: [], type: "ĐC" },
            { code: "MA006", name: "Giải tích", lt: 4, th: 0, pre: [], type: "ĐC" },
            { code: "MA003", name: "Đại số tuyến tính", lt: 3, th: 0, pre: [], type: "ĐC" },
            { code: "CS005", name: "Giới thiệu ngành Khoa học Máy tính", lt: 1, th: 0, pre: [], type: "ĐC" },
            { code: "SS006", name: "Pháp luật đại cương", lt: 2, th: 0, pre: [], type: "ĐC" },
            { code: "ENGA2", name: "Anh văn sơ cấp 2", lt: 0, th: 0, pre: [], type: "BT" },
        ]
    },
    {
        semester: "Học kỳ 2",
        subjects: [
            { code: "IT002", name: "Lập trình hướng đối tượng", lt: 3, th: 1, pre: ["IT001"], type: "CSNN" },
            { code: "IT003", name: "Cấu trúc dữ liệu và giải thuật", lt: 3, th: 1, pre: ["IT001"], type: "CSNN" },
            { code: "IT012", name: "Tổ chức và Cấu trúc Máy tính II", lt: 3, th: 1, pre: [], type: "CSNN" },
            { code: "MA004", name: "Cấu trúc rời rạc", lt: 4, th: 0, pre: [], type: "ĐC" },
            { code: "MA005", name: "Xác suất thống kê", lt: 3, th: 0, pre: ["MA006"], type: "ĐC" },
            { code: "ENG01", name: "Anh văn 1", lt: 4, th: 0, pre: [], type: "ĐC" },
            { code: "ENG02", name: "Anh văn 2", lt: 4, th: 0, pre: [], type: "ĐC" },
            { code: "ENG03", name: "Anh văn 3", lt: 4, th: 0, pre: [], type: "ĐC" },
            { code: "ME001", name: "Giáo dục quốc phòng", lt: 0, th: 0, pre: [], type: "ĐC" },
            { code: "PE231", name: "Giáo dục thể chất 1", lt: 0, th: 0, pre: [], type: "TC" },
        ]
    },
    {
        semester: "Học kỳ 3",
        subjects: [
            { code: "IT004", name: "Cơ sở dữ liệu", lt: 3, th: 1, pre: [], type: "CSNN" },
            { code: "IT005", name: "Nhập môn mạng máy tính", lt: 3, th: 1, pre: [], type: "CSNN" },
            { code: "IT007", name: "Hệ điều hành", lt: 3, th: 1, pre: ["IT006"], type: "CSNN" },
            { code: "CS115", name: "Toán cho Khoa học máy tính", lt: 4, th: 0, pre: ["IT001"], type: "CN" },
            { code: "SS007", name: "Triết học Mác – Lênin", lt: 3, th: 0, pre: [], type: "ĐC" },
            { code: "PE232", name: "Giáo dục thể chất 2", lt: 0, th: 0, pre: ["PE231"], type: "TC" },
        ]
    },
    {
        semester: "Học kỳ 4",
        subjects: [
            { code: "CS112", name: "Phân tích và thiết kế thuật toán", lt: 3, th: 1, pre: ["IT001", "IT003"], type: "CSN" },    
            { code: "CS111", name: "Nguyên lý và phương pháp lập trình", lt: 3, th: 1, pre: ["IT003"], type: "CSN" },
            { code: "CS523", name: "Cấu trúc dữ liệu và giải thuật nâng cao", lt: 3, th: 1, pre: ["IT003", "IT001"], type: "CNTC" },
            { code: "CS106", name: "Trí tuệ nhân tạo", lt: 3, th: 1, pre: ["IT003"], type: "CSN" },
            { code: "SS004", name: "Kỹ năng nghề nghiệp", lt: 2, th: 0, pre: [], type: "ĐC" },
            { code: "SS008", name: "Kinh tế chính trị Mác – Lênin", lt: 2, th: 0, pre: [], type: "ĐC" },
        ]
    },
    {
        semester: "Học kỳ 5",
        subjects: [
            { code: "CS311", name: "Kỹ thuật lập trình trí tuệ nhân tạo", lt: 3, th: 1, pre: ["IT003"], type: "CN" },
            { code: "CS114", name: "Máy học", lt: 3, th: 1, pre: ["IT001", "MA003", "MA004"], type: "CN" },
            { code: "CS519", name: "Phương pháp luận nghiên cứu khoa học", lt: 3, th: 0, pre: [], type: "CNTC" },
            { code: "CS529", name: "Các vấn đề nghiên cứu và ứng dụng trong khoa học máy tính", lt: 4, th: 0, pre: [], type: "CNTC" },
            { code: "SS009", name: "Chủ nghĩa xã hội khoa học", lt: 2, th: 0, pre: [], type: "ĐC" },
            { code: "SS010", name: "Lịch sử Đảng Cộng sản Việt Nam", lt: 2, th: 0, pre: [], type: "ĐC" },
        ]
    },
    {
        semester: "Học kỳ 6",
        subjects: [
            { code: "CS211", name: "Trí tuệ nhân tạo nâng cao", lt: 3, th: 1, pre: ["CS106"], type: "CN" },
            { code: "CS315", name: "Máy học nâng cao", lt: 3, th: 1, pre: ["CS110"], type: "CN" },
            { code: "CS551", name: "Thực tập", lt: 2, th: 0, pre: [], type: "TTTN" },
            { code: "CS332", name: "Máy học trong Thị giác Máy tính", lt: 3, th: 1, pre: [], type: "CN" },
            { code: "SS003", name: "Tư tưởng Hồ Chí Minh", lt: 2, th: 0, pre: [], type: "ĐC" },
        ]
    },
    {
        semester: "Học kỳ 7",
        subjects: [
            { code: "CS505", name: "Khoá luận tốt nghiệp", lt: 10, th: 0, pre: [], type: "KLTN" },
        ]
    }
];


// Định nghĩa bảng màu cho JS trùng khớp với CSS
const typeColors = {
    'DC': '#64748b',   // Xám
    'CSN': '#3b82f6',  // Xanh dương
    'CN': '#8b5cf6',   // Tím
    'CNTC': '#14b8a6', // Teal
    'DA': '#ef4444'    // Đỏ
};

const world = document.getElementById('world');
const svgLayer = document.getElementById('connections-layer');

function renderCurriculum() {
    let totalCredits = 0;
    
    curriculumData.forEach((semester, semIndex) => {
        const col = document.createElement('div');
        col.className = "semester-column pb-4";
        
        col.innerHTML = `
            <div class="bg-slate-50 p-4 rounded-t-lg border-b border-slate-100 font-bold text-slate-700 text-center mb-3 sticky top-0 z-10 shadow-sm">
                ${semester.semester}
            </div>
            <div class="px-3 space-y-3 flex-1"></div>
        `;
        
        const listContainer = col.querySelector('.px-3');

        semester.subjects.forEach(sub => {
            totalCredits += sub.lt + sub.th;
            const card = document.createElement('div');
            card.className = `subject-card p-3 rounded-lg shadow-sm relative cursor-pointer type-${sub.type}`;
            card.setAttribute('data-code', sub.code);
            card.setAttribute('id', `card-${sub.code}`);
            
            card.onmouseenter = () => highlightConnection(sub.code);
            card.onmouseleave = resetHighlights;

            card.innerHTML = `
                <div class="flex justify-between items-start mb-1">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${sub.code}</span>
                    <span class="text-[10px] font-bold badge-${sub.type} px-1.5 py-0.5 rounded ml-1 whitespace-nowrap">
                        ${sub.type}
                    </span>
                </div>
                <h3 class="text-sm font-bold text-slate-800 leading-tight mb-2">${sub.name}</h3>
                <div class="flex items-center text-xs text-slate-500">
                    <i class="far fa-clock mr-1.5"></i> ${sub.lt} + ${sub.th} TC
                </div>
            `;
            listContainer.appendChild(card);
        });

        world.appendChild(col);
    });
    document.getElementById('total-credits').innerText = totalCredits;
}

function drawAllConnections() {
    // Giữ lại defs (markers) trước khi xóa
    const defs = svgLayer.querySelector('defs');
    svgLayer.innerHTML = '';
    svgLayer.appendChild(defs);

    curriculumData.forEach(semester => {
        semester.subjects.forEach(sub => {
            if (sub.pre && sub.pre.length > 0) {
                sub.pre.forEach(preCode => {
                    const fromEl = document.getElementById(`card-${preCode}`);
                    const toEl = document.getElementById(`card-${sub.code}`);
                    if (fromEl && toEl) {
                        // Lấy màu dựa trên môn NGUỒN (Môn tiên quyết)
                        const fromSub = findSubject(preCode);
                        const colorType = fromSub ? fromSub.type : 'DC';
                        drawLine(fromEl, toEl, preCode, sub.code, colorType);
                    }
                });
            }
        });
    });
}

function findSubject(code) {
    for (const sem of curriculumData) {
        const sub = sem.subjects.find(s => s.code === code);
        if (sub) return sub;
    }
    return null;
}

function drawLine(startEl, endEl, fromCode, toCode, colorType) {
    const startRect = getRelativePos(startEl);
    const endRect = getRelativePos(endEl);

    // Điểm bắt đầu (bên phải thẻ nguồn)
    const startX = startRect.x + startRect.width;
    const startY = startRect.y + startRect.height / 2;
    
    // Điểm kết thúc (bên trái thẻ đích)
    const endX = endRect.x;
    const endY = endRect.y + endRect.height / 2;

    // Tính toán control points cho đường cong Bezier
    const dist = Math.abs(endX - startX);
    // Kéo dài control point ra để đường cong mượt hơn khi đi xa
    const c1x = startX + dist * 0.5; 
    const c1y = startY;
    const c2x = endX - dist * 0.5;
    const c2y = endY;

    const d = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "connection-line");
    path.setAttribute("data-from", fromCode);
    path.setAttribute("data-to", toCode);
    
    // Gán màu trực tiếp
    const color = typeColors[colorType] || '#94a3b8';
    path.style.stroke = color;
    path.setAttribute("marker-end", `url(#arrow-${colorType})`);
    
    svgLayer.appendChild(path);
}

function highlightConnection(code) {
    // Highlight môn đang hover
    const card = document.getElementById(`card-${code}`);
    if(card) card.classList.add('highlight-target');

    // Highlight dây đi VÀO môn này (Prerequisites)
    const incomingLines = document.querySelectorAll(`.connection-line[data-to="${code}"]`);
    incomingLines.forEach(line => {
        line.classList.add('active');
        // Highlight môn nguồn
        const fromCode = line.getAttribute('data-from');
        const fromCard = document.getElementById(`card-${fromCode}`);
        if(fromCard) fromCard.classList.add('highlight-source');
    });
}

function resetHighlights() {
    document.querySelectorAll('.subject-card').forEach(el => {
        el.classList.remove('highlight-source', 'highlight-target');
    });
    document.querySelectorAll('.connection-line').forEach(el => {
        el.classList.remove('active');
    });
}

function getRelativePos(el) {
    const elRect = el.getBoundingClientRect();
    const worldRect = world.getBoundingClientRect();
    return {
        x: (elRect.left - worldRect.left) / state.scale,
        y: (elRect.top - worldRect.top) / state.scale,
        width: elRect.width / state.scale,
        height: elRect.height / state.scale
    };
}

// --- Pan & Zoom Logic ---
let state = {
    scale: 1,
    panning: false,
    pointX: 50,
    pointY: 50,
    startX: 0,
    startY: 0
};

const viewport = document.getElementById('viewport');

function updateTransform() {
    world.style.transform = `translate(${state.pointX}px, ${state.pointY}px) scale(${state.scale})`;
}

viewport.addEventListener('mousedown', (e) => {
    state.panning = true;
    state.startX = e.clientX - state.pointX;
    state.startY = e.clientY - state.pointY;
    viewport.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    state.panning = false;
    viewport.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
    if (!state.panning) return;
    e.preventDefault();
    state.pointX = e.clientX - state.startX;
    state.pointY = e.clientY - state.startY;
    updateTransform();
});

viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const xs = (e.clientX - state.pointX) / state.scale;
    const ys = (e.clientY - state.pointY) / state.scale;
    const delta = -e.deltaY;
    (delta > 0) ? (state.scale *= 1.1) : (state.scale /= 1.1);
    if(state.scale < 0.2) state.scale = 0.2;
    if(state.scale > 3) state.scale = 3;
    state.pointX = e.clientX - xs * state.scale;
    state.pointY = e.clientY - ys * state.scale;
    updateTransform();
});

function resetView() {
    state.scale = 1;
    state.pointX = 50;
    state.pointY = 50;
    updateTransform();
}

function zoomIn() {
    state.scale *= 1.2;
    if(state.scale > 3) state.scale = 3;
    updateTransform();
}
function zoomOut() {
    state.scale /= 1.2;
    if(state.scale < 0.2) state.scale = 0.2;
    updateTransform();
}

renderCurriculum();
setTimeout(() => {
    drawAllConnections();
    updateTransform();
}, 100);
