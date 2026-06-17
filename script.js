console.log("JS Connected");
        const video = document.getElementById('webcam');
        const btnCapture = document.getElementById('btn-capture');
        const countdownEl = document.getElementById('countdown');
        const menuOpsi = document.getElementById('menu-opsi');
        const btnDownload = document.getElementById('btn-download');
        const canvas = document.getElementById('canvasHasil');
        console.log(canvas);
        const ctx = canvas.getContext('2d');
        const soundShutter = document.getElementById('audio-shutter');

        let listFoto = [];
        const progress = document.getElementById("progress");
        let temaSekarang = '1';
        let filterSekarang = '1';

            // Core 2x2 Slots
        let slot_w = 400;
        let slot_h = 270;

        let slots = [
            { x:160, y:190 },
            { x:640, y:190 },
            { x:160, y:520 },
            { x:640, y:520 }
        ];
        const loadAsetGambar = (src) => new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
        });

        async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio:false
        })

        video.srcObject = stream;
        video.play();
        document.getElementById("loader").style.display = "none";

    } catch (err) {
        console.error("Camera Error:", err);

        alert(
            "Gagal mengakses kamera.\n\n" +
            "Error: " + err.name
        );
    }
}

        async function jepretSesiFoto() {
            listFoto = [];
            btnCapture.disabled = true;
            menuOpsi.classList.add('hidden');
            btnDownload.classList.add('hidden');

            progress.style.width = "0%";

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 640;
            tempCanvas.height = 480;
            const tempCtx = tempCanvas.getContext('2d');

            for (let i = 0; i < 4; i++) {
                countdownEl.classList.remove('hidden');
                countdownEl.classList.add('flex');

                for (let c = 3; c > 0; c--) {
                    countdownEl.textContent = c;
                    await new Promise(r => setTimeout(r, 1000));
                }

                countdownEl.textContent = "📸";
                soundShutter.currentTime = 0;
                soundShutter.play().catch(e => console.log("Audio block bypass active"));

                // Mirror Matrix Capture Engine
                tempCtx.save();
                tempCtx.translate(tempCanvas.width, 0);
                tempCtx.scale(-1, 1);
                tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.restore();

                listFoto.push(tempCanvas.toDataURL('image/jpeg', 1.0));
                progress.style.width = `${(i + 1) * 25}%`;
                await new Promise(r => setTimeout(r, 500));
            }

            countdownEl.classList.add('hidden');
            btnCapture.disabled = false;
            menuOpsi.classList.remove('hidden');
            setTimeout(() => {
            progress.style.width = "0%";
            }, 1000);
            renderMasterpieceCanvas();
        }

        // --- CORE ART & DECORATION COMPONENT ENGINES ---
        function buildFakeQR(x, y, size = 75) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = "#000000";
            
            // Replicate numpy random matrix layout pattern
            for (let px = 4; px < size - 8; px += 4) {
                for (let py = 4; py < size - 8; py += 4) {
                    if (Math.random() > 0.4) ctx.fillRect(x + px, y + py, 4, 4);
                }
            }
            // Traditional QR Corners Locator Pattern Anchor
            const corners = [[4, 4], [size - 20, 4], [4, size - 20]];
            corners.forEach(([cx, cy]) => {
                ctx.fillStyle = "#ffffff"; ctx.fillRect(x + cx, y + cy, 16, 16);
                ctx.strokeStyle = "#000000"; ctx.lineWidth = 2; ctx.strokeRect(x + cx, y + cy, 16, 16);
                ctx.fillStyle = "#000000"; ctx.fillRect(x + cx + 4, y + cy + 4, 8, 8);
            });
        }

        function drawMetallicPin(x, y) {
            ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.arc(x+13, y+13, 10, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = "#9696a0"; ctx.beginPath(); ctx.arc(x+10, y+10, 10, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = "#d2d2dc"; ctx.beginPath(); ctx.arc(x+10, y+10, 7, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(x+7, y+7, 3, 0, Math.PI*2); ctx.fill();
        }

        function drawWashiTape(x, y, color, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle * Math.PI / 180);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 110, 32);
            ctx.restore();
        }

        function drawSunburst() {
            ctx.fillStyle = "#ffe63c";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2, cy = canvas.height / 2;
            ctx.fillStyle = "#ffa000";
            const numRays = 32;
            for (let i = 0; i < numRays; i += 2) {
                const a1 = (i * (360 / numRays)) * Math.PI / 180;
                const a2 = ((i + 1) * (360 / numRays)) * Math.PI / 180;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + 1500 * Math.cos(a1), cy + 1500 * Math.sin(a1));
                ctx.lineTo(cx + 1500 * Math.cos(a2), cy + 1500 * Math.sin(a2));
                ctx.closePath();
                ctx.fill();
            }
        }

        function drawToyClouds() {
            // Replicate Toy Story Sky Clouds Layout
            ctx.fillStyle = "#ffffff";
            for (let x = 0; x < canvas.width; x += 250) {
                for (let y = 0; y < canvas.height; y += 180) {
                    ctx.beginPath();
                    ctx.arc(x + 40, y + 25, 25, 0, Math.PI*2);
                    ctx.arc(x + 70, y + 15, 35, 0, Math.PI*2);
                    ctx.arc(x + 100, y + 25, 25, 0, Math.PI*2);
                    ctx.fill();
                }
            }
        }

        function drawHeartsPattern() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            for (let x = 10; x < canvas.width; x += 50) {
                for (let y = 10; y < canvas.height; y += 50) {
                    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI*2); ctx.fill();
                }
            }
            // Hearts distribution coordinates
            ctx.font = "32px Arial";
            for(let i=0; i<30; i++) {
                let hx = (i * 43) % (canvas.width - 40) + 20;
                let hy = (i * 71) % (canvas.height - 40) + 20;
                ctx.fillStyle = "rgba(255, 150, 180, 0.4)"; ctx.fillText("♥", hx+2, hy+2);
                ctx.fillStyle = "rgba(255, 200, 220, 0.8)"; ctx.fillText("♥", hx, hy);
            }
        }

        function addFilmGrainEffect(intensity = 10) {
            // Apply authentic analog paper grain overlay to render cool texture
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                const noise = (Math.random() - 0.5) * intensity;
                data[i] = Math.min(255, Math.max(0, data[i] + noise));
                data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
                data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
            }
            ctx.putImageData(imgData, 0, 0);
        }

        // --- GRAPHICS MERGE & RENDER ENGINE MASTERPIECE ---
        async function renderMasterpieceCanvas() {

            ctx.filter = 'none';
            ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;

            let conf = { title: "", titleColor: "#ffffff", strokeColor: null, bannerColor: "rgba(255,255,255,0.9)", textColor: "#000000", borderInner: "#dddddd", prefix: "" };

            // 1. Theme Canvas Base Background Painting
            if (temaSekarang === '1') { // MU
                conf = { title: "G G M U", titleColor: "#ffd700", strokeColor: "#320000", bannerColor: "rgba(20,20,20,0.95)", textColor: "#dcdcdc", borderInner: "#daa520", prefix: "mu" };
                let grad = ctx.createLinearGradient(0, 0, 0, canvas.height); grad.addColorStop(0, "#c81e14"); grad.addColorStop(1, "#500505");
                ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 2;
                for (let i = 0; i < canvas.width; i += 80) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
                for (let i = 0; i < canvas.height; i += 80) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }
            } 
            else if (temaSekarang === '2') { // Nailong
                conf = { title: "N A I L O N G", titleColor: "#ffffff", strokeColor: "#c84600", bannerColor: "rgba(255,255,255,0.9)", textColor: "#c84600", borderInner: "#ff8c00", prefix: "nailong" };
                drawSunburst();
            } 
            else if (temaSekarang === '3') { // Kucing Polka Cute
                conf = { title: "M E O W   M E O W", titleColor: "#fff0f5", strokeColor: "#c86478", bannerColor: "rgba(255,255,255,0.9)", textColor: "#966478", borderInner: "#ffb4c8", prefix: "kucing" };
                let grad = ctx.createLinearGradient(0, 0, 0, canvas.height); grad.addColorStop(0, "#ffdced"); grad.addColorStop(1, "#e6f5ff");
                ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
                drawHeartsPattern();
            } 
            else if (temaSekarang === '4') { // Kodak Film Classic Reel
                conf = { title: "C L A S S I C", titleColor: "#ffffff", strokeColor: "#000000", bannerColor: "rgba(240,240,240,0.9)", textColor: "#141414", borderInner: "#969696", prefix: "bw" };
                ctx.fillStyle = "#141414"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, 70, canvas.height); ctx.fillRect(canvas.width - 70, 0, 70, canvas.height);
                ctx.fillStyle = "#f0f0f0";
                for (let y = 30; y < canvas.height; y += 80) {
                    ctx.beginPath(); ctx.roundRect(20, y, 30, 40, 8); ctx.roundRect(canvas.width - 50, y, 30, 40, 8); ctx.fill();
                }
                ctx.fillStyle = "#ff3c3c"; ctx.font = "bold 16px Courier New"; ctx.fillText("● REC  00:04:20", 90, 55);
            } 
            else if (temaSekarang === '5') { // Y2K Neon Synthwave
                conf = { title: "Y 2 K   V I B E S", titleColor: "chromatic", strokeColor: null, bannerColor: "rgba(30,0,60,0.95)", textColor: "#00ffff", borderInner: "#00ffff", prefix: "neon" };
                ctx.fillStyle = "#0f0523"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.lineWidth = 2;
                for (let i = 0; i < canvas.width; i += 40) { ctx.strokeStyle = "rgba(255, 0, 128, 0.3)"; ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
                for (let i = 0; i < canvas.height; i += 40) { ctx.strokeStyle = "rgba(0, 255, 255, 0.3)"; ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }
            } 
            else if (temaSekarang === '6') { // Toy Story
                conf = { title: "T O Y  S T O R Y", titleColor: "#ffe600", strokeColor: "#ff0000", bannerColor: "rgba(255,255,255,0.9)", textColor: "#000000", borderInner: "#ffe600", prefix: "toy" };
                let grad = ctx.createLinearGradient(0, 0, 0, canvas.height); grad.addColorStop(0, "#6ebeff"); grad.addColorStop(1, "#3282ff");
                ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
                drawToyClouds();
            }

            // 2. Render Photo Blocks with Polaroid Structure Soft Shadows
            for (let i = 0; i < 4; i++) {
                const imgObj = await loadAsetGambar(listFoto[i]);
                const slot = slots[i];

                ctx.save();
                // Render shadow manually before filling polaroid boxes
                ctx.shadowColor = (conf.prefix === "neon") ? "rgba(255, 0, 128, 0.7)" : "rgba(0,0,0,0.5)";
                ctx.shadowBlur = (conf.prefix === "neon") ? 30 : 25;
                ctx.shadowOffsetX = 5; ctx.shadowOffsetY = 10;
                
                ctx.fillStyle = (conf.prefix === "neon") ? "#141414" : "#ffffff";
                ctx.beginPath(); ctx.roundRect(slot.x - 15, slot.y - 15, slot_w + 30, slot_h + 40, 10); ctx.fill();
                ctx.restore();

                // Outer border outline bounding box
                ctx.strokeStyle = conf.borderInner; ctx.lineWidth = 3;
                ctx.strokeRect(slot.x - 2, slot.y - 2, slot_w + 4, slot_h + 4);

                // Setup specific camera filters style grading
                ctx.save();
                if (filterSekarang === '2') ctx.filter = 'contrast(1.2) brightness(1.05) saturate(1.1) contrast(1.1)';
                else if (filterSekarang === '3') ctx.filter = 'grayscale(1) contrast(1.25)';
                else if (filterSekarang === '4') ctx.filter = 'sepia(1) contrast(0.95) brightness(0.95)';
                else if (filterSekarang === '5') ctx.filter = 'saturate(1.35) sepia(0.15) brightness(1.02)';
                else if (filterSekarang === '6') ctx.filter = 'hue-rotate(20deg) saturate(0.8) contrast(1.2)';
                else ctx.filter = 'none';

                // Paint captured image stream directly onto target matrix layer
                const imgRatio = imgObj.width / imgObj.height;
                const slotRatio = slot_w / slot_h;

                let drawWidth;
                let drawHeight;
                let offsetX = 0;
                let offsetY = 0;

                if(imgRatio > slotRatio)
                {
                    drawHeight = slot_h;
                    drawWidth = drawHeight * imgRatio;
                    offsetX = -(drawWidth - slot_w) / 2;
                }
                else
                {
                    drawWidth = slot_w;
                    drawHeight = drawWidth / imgRatio;
                    offsetY = -(drawHeight - slot_h) / 2;
                }

                ctx.save();

                ctx.beginPath();
                ctx.rect(slot.x, slot.y, slot_w, slot_h);
                ctx.clip();

                ctx.drawImage(
                    imgObj,
                    slot.x + offsetX,
                    slot.y + offsetY,
                    drawWidth,
                    drawHeight
                );

                ctx.restore();

                // Glossy Glass Overlay Simulation Engine
                ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
                ctx.beginPath(); ctx.moveTo(slot.x, slot.y); ctx.lineTo(slot.x + slot_w * 0.8, slot.y); ctx.lineTo(slot.x, slot.y + slot_h * 0.8); ctx.closePath(); ctx.fill();

                // Dynamic Contextual Decor Rendering Port
                if (conf.prefix === "mu" || conf.prefix === "bw" || conf.prefix === "toy") {
                    drawMetallicPin(slot.x - 8, slot.y - 8); drawMetallicPin(slot.x + slot_w - 12, slot.y - 8);
                } else if (conf.prefix === "nailong") {
                    drawWashiTape(slot.x + slot_w - 65, slot.y - 30, "rgba(255, 140, 50, 0.75)", -20);
                } else if (conf.prefix === "kucing") {
                    drawWashiTape(slot.x - 45, slot.y - 30, "rgba(255, 180, 200, 0.75)", 15);
                }
            }

            // 3. Main Brand Header Text Banner Drawing
            const bw = 700, bh = 100;
            const bx = canvas.width / 2 - bw / 2, by = 35;
            
            ctx.save();
            if (conf.prefix !== "bw") {
                ctx.shadowColor = "rgba(0,0,0,0.3)"; ctx.shadowBlur = 20; ctx.shadowOffsetY = 5;
            }
            ctx.fillStyle = conf.bannerColor;
            ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, conf.prefix !== "bw" ? 50 : 0); ctx.fill();
            ctx.restore();

            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            if (conf.titleColor === "chromatic") {
                ctx.font = "bold 56px Arial";
                ctx.fillStyle = "rgba(255, 0, 50, 0.8)"; ctx.fillText(conf.title, canvas.width/2 - 4, by + bh/2);
                ctx.fillStyle = "rgba(0, 255, 255, 0.8)"; ctx.fillText(conf.title, canvas.width/2 + 4, by + bh/2);
                ctx.fillStyle = "#ffffff"; ctx.fillText(conf.title, canvas.width/2, by + bh/2);
            } else {
                ctx.font = "bold 56px Impact, Arial";
                if (conf.strokeColor) {
                    ctx.strokeStyle = conf.strokeColor; ctx.lineWidth = 6; ctx.strokeText(conf.title, canvas.width/2, by + bh/2);
                }
                ctx.fillStyle = conf.titleColor; ctx.fillText(conf.title, canvas.width/2, by + bh/2);
            }

            // 4. Footer Date and Greeting String Core
            const currentObj = new Date();
            const months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
            const dateStr = `❤ ${currentObj.getDate()} ${months[currentObj.getMonth()]} ${currentObj.getFullYear()}   |   THANK YOU ❤`;
            
            const bby1 = canvas.height - 70;
            ctx.font = "bold 20px monospace";
            if (conf.prefix !== "mu" && conf.prefix !== "bw") {
                ctx.fillStyle = conf.bannerColor;
                ctx.beginPath(); ctx.roundRect(canvas.width/2 - 270, bby1, 540, 40, 20); ctx.fill();
            }
            ctx.fillStyle = conf.textColor; ctx.fillText(dateStr, canvas.width/2, bby1 + 20);

            // 5. Professional Digital Brand Verification Box & Fake QR Generator Engine
            const qrx = canvas.width - 110, qry = canvas.height - 120;
            buildFakeQR(qrx, qry, 75);
            
            ctx.textAlign = "left"; ctx.fillStyle = "#000000"; ctx.font = "bold 11px Arial"; ctx.fillText("SCAN ME", qrx + 11, qry + 90);
            ctx.fillStyle = (conf.prefix === "bw" || conf.prefix === "neon") ? "rgba(255,255,255,0.4)" : "rgba(80,80,80,0.8)";
            ctx.font = "bold 15px Arial"; ctx.fillText("PREMIUM STUDIO EDITION", qrx - 220, qry + 25);
            ctx.font = "11px Arial"; ctx.fillText("Designed & Captured automatically via Web Frame Matrix.", qrx - 220, qry + 45);

            // 6. External Assets Load Handling (Dynamic Sticker Folders Integration)
            if (conf.prefix !== "") {
                const stickerList = {
                    "mu": ["mu1.png","mu2.png","mu3.png","mu4.png"],
                    "nailong": ["nailong1.png","nailong2.png","nailong3.png","nailong4.png"],
                    "kucing": ["kucing1.png","kucing2.png","kucing3.png","kucing4.png"],
                    "toy": ["toy1.png","toy2.png","toy3.png","toy4.png"]
                    };
                const stickers = stickerList[conf.prefix];

                for (let i = 0; i < stickers.length; i++) {
                    const stImg = await loadAsetGambar(`stiker/${stickers[i]}`);

                    if (!stImg) continue;

                    if (conf.prefix === "mu") {
                        const posisiMU = [
                            {x:60, y:105},
                            {x:1045, y:105},
                            {x:60, y:735},
                            {x:1035, y:735}
                        ];

            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 6;

            ctx.drawImage(
                stImg,
                    posisiMU[i].x,
                        posisiMU[i].y,
                        100,
                        95
                    );
                }
        else if (conf.prefix === "nailong" || conf.prefix === "toy" || conf.prefix === "kucing") {

        const posisi = [
            {x:60, y:105},
            {x:1045, y:105},
            {x:60, y:735},
            {x:1040, y:735}
        ];
        
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 6;

        ctx.drawImage(
            stImg,
            posisi[i].x,
            posisi[i].y,
                    130,
                    120
                    );
                }
            }
        }
            // 7. Texturing Layer: Final Touch Film Noise Grain Overlay Execution
            addFilmGrainEffect(12);

            btnDownload.classList.remove('hidden');

    } 
        function pilihTema(tema) { temaSekarang = tema; renderMasterpieceCanvas(); }
        function pilihFilter(fl) { filterSekarang = fl; renderMasterpieceCanvas(); }

        function downloadFoto() {
        const link = document.createElement('a');
        link.download = `VVIP-Studio-Artwork-${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
    }
        function startPhotobooth() {
        document.getElementById("welcome-screen").classList.add("hidden");
        document.getElementById("main-app").classList.remove("hidden");
        initCamera();
    }

btnCapture.addEventListener('click', jepretSesiFoto);
btnCapture.addEventListener('click', jepretSesiFoto);
function setActiveButton(selector, clickedButton)
{
    document.querySelectorAll(selector).forEach(btn=>{
        btn.classList.remove("active");
    });

    clickedButton.classList.add("active");
}

const particles = document.getElementById("particles");

for(let i = 0; i < 80; i++){

    const p = document.createElement("div");

    const size = Math.random() * 6 + 2;

    p.style.position = "absolute";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.borderRadius = "50%";

    const colors = [
        "#22d3ee",
        "#a855f7",
        "#ec4899",
        "#ffffff"
    ];

    const color =
    colors[Math.floor(Math.random() * colors.length)];

    p.style.background = color;

    p.style.boxShadow =
    `0 0 20px ${color}`;

    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";

    p.style.animation =
    `floatParticle ${5 + Math.random()*10}s linear infinite`;

    particles.appendChild(p);
}

const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

const card = document.querySelector(".glass-card");

card.addEventListener("mousemove",(e)=>{

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 20;
    const rotateX = -(y / rect.height - 0.5) * 20;

    card.style.transform =
    `perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)`;

});

function cekDevice() {
    const warning = document.getElementById("mobile-warning");

    if (window.innerWidth < 768) {
        warning.classList.remove("hidden");
    } else {
        warning.classList.add("hidden");
    }
}

cekDevice();
window.addEventListener("resize", cekDevice);

