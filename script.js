const traits = [
    // CDF
    "Arrogante", "Perfeccionista", "Curioso", "Antissocial",
    "Distraído", "Sabe-Tudo",

    // Atleta
    "Competitivo", "Impulsivo", "Orgulhoso", "Indisciplinado",
    "Vaidoso", "Temperamental",

    // Valentão
    "Agressivo", "Intimidador", "Provocador", "Ciumento",
    "Inseguro",

    // Alívio Cômico
    "Sarcástico", "Brincalhão", "Inconveniente", "Desastrado",
    "Imaturo", "Tagarela",

    // Nerdola
    "Obsessivo", "Desconfiado", "Excêntrico", "Tímido",
    "Isolado",

    // Patricinha
    "Superficial", "Manipuladora", "Fútil", "Exigente",

    // Garoto Popular
    "Mesquinho", "Ignorante", "Egocêntrico", "Falso",

    // Escoteiro
    "Preparado Demais", "Aventureiro", "Teimoso",
    "Independente", "Medroso",

    // Aspirante
    "Ambicioso", "Bajulador", "Determinado", "Invejoso",

    // Jovem Responsável
    "Protetor", "Preocupado", "Controlador",
    "Sacrificado", "Maduro Demais", "Ressentido",

    // Traços gerais
    "Leal", "Generoso", "Corajoso", "Honesto", "Paciente",
    "Empático", "Responsável", "Altruísta", "Observador",
    "Mentiroso", "Dramático", "Organizado", "Confrontador",
    "Reservado", "Apegado", "Extrovertido", "Carismático",
    "Introvertido", "Discreto"
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin");
const result = document.getElementById("result");
const counter = document.getElementById("counter");

const colors = ["#171719", "#29292e", "#7d101f", "#3b171d"];

let rotation = 0;
let spinning = false;

const slice = (Math.PI * 2) / traits.length;

counter.textContent = `${traits.length} traços disponíveis`;

function drawWheel() {
    const center = canvas.width / 2;
    const radius = center - 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    traits.forEach((trait, index) => {
        const start = rotation + index * slice;
        const end = start + slice;

        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        ctx.strokeStyle = "#a80f26";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(start + slice / 2);

        ctx.textAlign = "right";
        ctx.fillStyle = "#e8e0d0";
        ctx.font = "bold 10px Arial";
        ctx.fillText(trait, radius - 13, 4);

        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(center, center, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#d71935";
    ctx.fill();
    ctx.strokeStyle = "#e8e0d0";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function spinWheel() {
    if (spinning) return;

    spinning = true;
    spinButton.disabled = true;
    result.textContent = "...";

    const extraRotation = Math.PI * 2 * (5 + Math.random() * 5);
    const target = rotation + extraRotation;
    const duration = 5000;
    const startTime = performance.now();
    const initialRotation = rotation;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease = 1 - Math.pow(1 - progress, 4);

        rotation = initialRotation + extraRotation * ease;
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            rotation = rotation % (Math.PI * 2);

            const normalized = (Math.PI * 1.5 - rotation + Math.PI * 2) % (Math.PI * 2);
            const selectedIndex = Math.floor(normalized / slice);

            result.textContent = traits[selectedIndex];

            spinning = false;
            spinButton.disabled = false;
        }
    }

    requestAnimationFrame(animate);
}

spinButton.addEventListener("click", spinWheel);

drawWheel();