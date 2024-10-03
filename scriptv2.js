// script.js

// Variables globales
let isDragging = false;//
let selectedText = null;
let offsetX, offsetY;

let backgroundImage = null;
let borderImage = null;

const canvas = document.getElementById("canvas");
canvas.width = 3000; // Anchura en alta resolución
canvas.height = 4500; // Altura en alta resolución

const context = canvas.getContext("2d");

// Propiedades del título
let titleText = {
  content: "",
  color: "#000000",
  size: 20,
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
  x: canvas.width / 2, // Centrado horizontalmente
  y: 500,
};

// Propiedades de la descripción 1
let description1Text = {
  content: "",
  color: "#000000",
  size: 16,
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
  x: canvas.width / 2,
  y: 1000,
};

// Propiedades de la descripción 2
let description2Text = {
  content: "",
  color: "#000000",
  size: 16,
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
  x: canvas.width / 2,
  y: 1500,
};

// Variables para los inputs
const titleInput = document.getElementById("titleInput");
const titleColorInput = document.getElementById("titleColorInput");
const titleSizeInput = document.getElementById("titleSizeInput");
const titleFont = document.getElementById("titleFont");
const mainTextAlign = document.getElementById("mainTextAlign");

const descriptionInput1 = document.getElementById("descriptionInput1");
const description1ColorInput = document.getElementById("description1ColorInput");
const description1SizeInput = document.getElementById("description1SizeInput");
const description1Font = document.getElementById("description1Font");
const description1TextAlign = document.getElementById("description1TextAlign");

const descriptionInput2 = document.getElementById("descriptionInput2");
const description2ColorInput = document.getElementById("description2ColorInput");
const description2SizeInput = document.getElementById("description2SizeInput");
const description2Font = document.getElementById("description2Font");
const description2TextAlign = document.getElementById("description2TextAlign");

// Variables para las opciones de imagen de fondo y borde (Página 4 y Página 5)
const frameOptions = document.querySelectorAll(".frame-option");
const borderOptions = document.querySelectorAll(".border-option");

// Función para mostrar una página y ocultar las demás
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => (page.style.display = "none"));
  document.getElementById(pageId).style.display = "block";
}

// Inicializamos en la página 1
showPage("page1");

// Navegación entre páginas
document.getElementById("next1").addEventListener("click", () => showPage("page2"));
document.getElementById("next2").addEventListener("click", () => showPage("page3"));
document.getElementById("next3").addEventListener("click", () => showPage("page4"));
document.getElementById("next4").addEventListener("click", () => showPage("page5"));
document.getElementById("next5").addEventListener("click", () => showPage("page6"));

document.getElementById("prev2").addEventListener("click", () => showPage("page1"));
document.getElementById("prev3").addEventListener("click", () => showPage("page2"));
document.getElementById("prev4").addEventListener("click", () => showPage("page3"));
document.getElementById("prev5").addEventListener("click", () => showPage("page4"));
document.getElementById("prev6").addEventListener("click", () => showPage("page5"));

// Selección de imagen de fondo (Página 4)
frameOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Indicar cuál fue seleccionado visualmente (opcional)
    frameOptions.forEach((opt) => opt.classList.remove("selected"));
    this.classList.add("selected");

    const frameUrl = this.getAttribute("data-frame");
    backgroundImage = new Image();
    backgroundImage.src = frameUrl;

    backgroundImage.onload = function () {
      redrawCanvas();
    };
  });
});

// Agregar interacción para bordes (Página 5)
borderOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Indicar cuál fue seleccionado visualmente (opcional)
    borderOptions.forEach((opt) => opt.classList.remove("selected"));
    this.classList.add("selected");

    const borderUrl = this.getAttribute("data-border");
    borderImage = new Image();
    borderImage.src = borderUrl;

    borderImage.onload = function () {
      redrawCanvas();
    };
  });
});

// Actualización en tiempo real de la vista previa

// Título
titleInput.addEventListener("input", function () {
  titleText.content = titleInput.value;
  redrawCanvas();
});

titleColorInput.addEventListener("input", function () {
  titleText.color = titleColorInput.value;
  redrawCanvas();
});

titleSizeInput.addEventListener("input", function () {
  titleText.size = parseInt(titleSizeInput.value);
  redrawCanvas();
});

titleFont.addEventListener("change", function () {
  titleText.fontFamily = titleFont.value;
  redrawCanvas();
});

mainTextAlign.addEventListener("change", function () {
  titleText.textAlign = mainTextAlign.value;
  redrawCanvas();
});

// Descripción 1
descriptionInput1.addEventListener("input", function () {
  description1Text.content = descriptionInput1.value;
  redrawCanvas();
});

description1ColorInput.addEventListener("input", function () {
  description1Text.color = description1ColorInput.value;
  redrawCanvas();
});

description1SizeInput.addEventListener("input", function () {
  description1Text.size = parseInt(description1SizeInput.value);
  redrawCanvas();
});

description1Font.addEventListener("change", function () {
  description1Text.fontFamily = description1Font.value;
  redrawCanvas();
});

description1TextAlign.addEventListener("change", function () {
  description1Text.textAlign = description1TextAlign.value;
  redrawCanvas();
});

// Descripción 2
descriptionInput2.addEventListener("input", function () {
  description2Text.content = descriptionInput2.value;
  redrawCanvas();
});

description2ColorInput.addEventListener("input", function () {
  description2Text.color = description2ColorInput.value;
  redrawCanvas();
});

description2SizeInput.addEventListener("input", function () {
  description2Text.size = parseInt(description2SizeInput.value);
  redrawCanvas();
});

description2Font.addEventListener("change", function () {
  description2Text.fontFamily = description2Font.value;
  redrawCanvas();
});

description2TextAlign.addEventListener("change", function () {
  description2Text.textAlign = description2TextAlign.value;
  redrawCanvas();
});

// Función para redibujar el canvas
function redrawCanvas() {
  // Limpiar el canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la imagen de fondo si está cargada
  if (backgroundImage && backgroundImage.complete) {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }

  // Dibujar los textos
  drawTexts();

  // Dibujar la imagen del marco si está cargada
  if (borderImage && borderImage.complete) {
    context.drawImage(borderImage, 0, 0, canvas.width, canvas.height);
  }
}

// Función para dibujar los textos
function drawTexts() {
  const fontSizeMultiplier = canvas.width / 300; // Ajuste dinámico
  context.textBaseline = "top";

  // Dibujar título
  if (titleText.content.trim() !== "") {
    context.font = `${titleText.size * fontSizeMultiplier}px ${titleText.fontFamily}`;
    context.fillStyle = titleText.color;
    context.textAlign = titleText.textAlign;

    // Ajustar posición según alineación
    let x = titleText.x;
    if (titleText.textAlign === "center") {
      x = titleText.x;
    } else if (titleText.textAlign === "left") {
      x = 0;
    } else if (titleText.textAlign === "right") {
      x = canvas.width;
    }

    context.fillText(titleText.content, x, titleText.y);
  }

  // Dibujar descripción 1
  if (description1Text.content.trim() !== "") {
    context.font = `${description1Text.size * fontSizeMultiplier}px ${description1Text.fontFamily}`;
    context.fillStyle = description1Text.color;
    context.textAlign = description1Text.textAlign;
    drawMultilineText(description1Text);
  }

  // Dibujar descripción 2
  if (description2Text.content.trim() !== "") {
    context.font = `${description2Text.size * fontSizeMultiplier}px ${description2Text.fontFamily}`;
    context.fillStyle = description2Text.color;
    context.textAlign = description2Text.textAlign;
    drawMultilineText(description2Text);
  }
}

// Función para dibujar texto multilínea
function drawMultilineText(textObj) {
  const lines = textObj.content.split('\n');
  const lineHeight = textObj.size * (canvas.width / 300) * 1.2;
  let x = textObj.x;

  if (textObj.textAlign === "center") {
    x = textObj.x;
  } else if (textObj.textAlign === "left") {
    x = 0;
  } else if (textObj.textAlign === "right") {
    x = canvas.width;
  }

  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, textObj.y + i * lineHeight);
  }
}

// Funcionalidad de arrastrar y soltar
canvas.addEventListener("mousedown", function (e) {
  const mousePos = getMousePos(canvas, e);
  if (isMouseOverText(mousePos, titleText)) {
    selectedText = titleText;
  } else if (isMouseOverText(mousePos, description1Text)) {
    selectedText = description1Text;
  } else if (isMouseOverText(mousePos, description2Text)) {
    selectedText = description2Text;
  }

  if (selectedText) {
    isDragging = true;
    offsetX = mousePos.x - selectedText.x;
    offsetY = mousePos.y - selectedText.y;
  }
});

canvas.addEventListener("mousemove", function (e) {
  if (isDragging && selectedText) {
    const mousePos = getMousePos(canvas, e);
    selectedText.x = mousePos.x - offsetX;
    selectedText.y = mousePos.y - offsetY;
    redrawCanvas();
  }
});

canvas.addEventListener("mouseup", function () {
  isDragging = false;
  selectedText = null;
});

canvas.addEventListener("mouseout", function () {
  isDragging = false;
  selectedText = null;
});

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / rect.width) * canvas.width,
    y: ((evt.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function isMouseOverText(mousePos, textObj) {
  context.font = `${textObj.size * (canvas.width / 300)}px ${textObj.fontFamily}`;
  const lines = textObj.content.split('\n');
  const lineHeight = textObj.size * (canvas.width / 300) * 1.2; // Factor de línea
  const textWidth = Math.max(...lines.map((line) => context.measureText(line).width));
  const textHeight = lines.length * lineHeight;

  let textX = textObj.x;
  let textY = textObj.y;

  // Ajuste de posición según la alineación
  if (textObj.textAlign === "center") {
    textX -= textWidth / 2;
  } else if (textObj.textAlign === "right") {
    textX -= textWidth;
  }

  return (
    mousePos.x >= textX &&
    mousePos.x <= textX + textWidth &&
    mousePos.y >= textY &&
    mousePos.y <= textY + textHeight
  );
}

// Función para exportar la imagen
document.getElementById("exportBtn").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png", 1.0);
  link.download = "vista-previa.png";
  link.click();
});

// Llamada inicial para dibujar el canvas
redrawCanvas();