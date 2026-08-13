function jumpscare() {
    const img = document.getElementById("jumpscare-img");
    const audio = document.getElementById("jumpscare-audio");

    img.style.display = "block";

    audio.currentTime = 0;
    audio.play().catch(() => {
        console.log("erro no audio");
    });
}
//tabs
function xp(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(div => {
        div.classList.remove('active');
    });

    document.querySelectorAll('.jogui .apps').forEach(button => {
        button.classList.remove('active');
    });

    const tab = document.getElementById(tabId);
    if (tab) {
        tab.classList.add('active');
    }

    if (btn) {
        btn.classList.add('active');
    }
}

//mexe a janela
function mexerBar(element) {
    let mexer = false;
    let offsetX = 0, offsetY = 0;

    //faz so mexer na mexerBar
    const topo = element.querySelector(".mexerBar");

    //ve onde ta o mouse e clica na janela
    topo.addEventListener("mousedown", (e) => {
        mexer = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        document.body.style.userSelect = "none";
    });
    //mexe oa janela
    document.addEventListener("mousemove", (e) => {
        if (!mexer) return;

        element.style.left = (e.clientX - offsetX) + "px";
        element.style.top = (e.clientY - offsetY) + "px";
    });
    //para de mexer a janela
    document.addEventListener("mouseup", () => {
        mexer = false;
        document.body.style.userSelect = "auto";
    });
}

function fechaXp(tabId) {
    const tab = document.getElementById(tabId);
    if (tab) {
        tab.classList.remove('active');
    }
}


//fala qual tab pode mexer
mexerBar(document.getElementById("tab1"));
mexerBar(document.getElementById("tab3"));
mexerBar(document.getElementById("tab4"));

//tab1

const canvas = document.getElementById('canvas')
const brush = canvas.getContext('2d')

const cor = document.getElementById('corzinha')
let corAt = cor.value

const bin = document.getElementById('espes')
let widAt = bin.value

let eras = false

let desenhando = false

canvas.addEventListener('mousedown', () => {
    desenhando = true
    brush.beginPath()
})

canvas.addEventListener('mouseup', () => {
    desenhando = false
})

canvas.addEventListener('mousemove', (evento) => {
    if (!desenhando) return
    const x = evento.offsetX
    const y = evento.offsetY
    brush.lineWidth = widAt
    brush.lineCap = 'round'
    brush.strokeStyle = corAt

    if (eras) {
        brush.globalCompositeOperation = 'destination-out'
    } else {
        brush.globalCompositeOperation = 'source-over'
        brush.strokeStyle = corAt
    }

    brush.lineTo(x, y)
    brush.stroke()

})

const btPincel = document.getElementById('pincel')
btPincel.addEventListener('click', () => {
    eras = false
})

const btEras = document.getElementById('eras')
btEras.addEventListener('click', () => {
    eras = true
})


corzinha.addEventListener('input', (evento) => {
    corAt = evento.target.value
})

espes.addEventListener('input', (evento) => {
    widAt = evento.target.value
})

function salvar() {
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData
    link.download = "imagem.png"
    link.click()
}

const btReset = document.getElementById('reset')

btReset.addEventListener('click', () => {
    brush.clearRect(0, 0, canvas.width, canvas.height)
    //por causa da borracha
    brush.globalCompositeOperation = 'source-over'
    eras = false
})