// Variables globales
let propertyData = [];


/*
document.addEventListener("DOMContentLoaded", () => {
  console.log("Iniciando carga del archivo Excel...");
  
  fetch("./propiedades.xlsx") // Archivo en la carpeta raíz
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Archivo encontrado, procesando...");
      return response.arrayBuffer();
    })
    .then((data) => {
      console.log("Leyendo el archivo Excel...");
      const workbook = XLSX.read(new Uint8Array(data), { type: "array" });

      const sheetName = workbook.SheetNames[0]; // Nombre de la primera hoja
      console.log(`Hoja seleccionada: ${sheetName}`);
      
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log("Datos procesados:", sheetData);

      propertyData = sheetData;
      alert("La data fue cargada exitosamente.");
      loadPropertyCards(propertyData);
    })
    .catch((error) => {
      console.error("Error al cargar el archivo:", error);
      alert("No se pudo cargar el archivo Excel.");
    });
});
*/

// Leer archivo Excel y cargar los datos
document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Convertir los datos del archivo Excel a JSON
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Guardar los datos en la variable global y renderizar tarjetas
      propertyData = sheetData;
      loadPropertyCards(propertyData);
    };

    reader.readAsArrayBuffer(file);
  }
});



 // Cargar el archivo Excel al cargar la página
 document.addEventListener("DOMContentLoaded", () => {
  fetch("./propiedades.xlsx") // Archivo en la carpeta raíz
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      propertyData = sheetData;
      
      loadPropertyCards(propertyData);
      alert("la data fue esogida directamente");
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
    //alert("la data fue NO esogida directamente");
});



// Renderizar las tarjetas de propiedades
function loadPropertyCards(data) {
  const container = document.getElementById("propertyCards");
  container.innerHTML = ""; // Limpiar contenido previo

  data.forEach((property, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${property.Nombre}</h3>
      <p><strong>Ubicación:</strong> ${property.Ubicación}</p>
      <p><strong>Precio:</strong> $${property.Precio}</p>
      <p><strong>Habitaciones:</strong> ${property.Habitaciones}</p>
    `;

    // Agregar evento de clic para mostrar los detalles
    card.addEventListener("click", () => showPropertyDetail(property));
    container.appendChild(card);
  });
}

// Mostrar los detalles de una propiedad
function showPropertyDetail(property) {
  const detailSection = document.getElementById("property-detail");
  const listSection = document.getElementById("property-list");
  const detailContainer = document.getElementById("propertyDetailContainer");

  // Llenar el detalle con la información de la propiedad
  detailContainer.innerHTML = `
    <h2>${property.Nombre}</h2>
    <p><strong>Ubicación:</strong> ${property.Ubicación}</p>
    <p><strong>Precio:</strong> $${property.Precio}</p>
    <p><strong>Habitaciones:</strong> ${property.Habitaciones}</p>
    <p><strong>Descripción:</strong> ${property.Descripción}</p>
    <p><strong>Contacto:</strong> ${property.Contacto}</p>
  `;

  // Mostrar la sección de detalles y ocultar la lista
  detailSection.style.display = "block";
  listSection.style.display = "none";
}

// Volver a la lista de propiedades
document.getElementById("backButton").addEventListener("click", () => {
  const detailSection = document.getElementById("property-detail");
  const listSection = document.getElementById("property-list");

  detailSection.style.display = "none";
  listSection.style.display = "block";
});
