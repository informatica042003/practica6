let menuData = [];

// Cargar el menú desde el archivo JSON
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        menuData = data.menu;
        renderMenu();
        populateSelects(); // Llenar los selects después de cargar el menú
    })
    .catch(error => console.error('Error al cargar el menú:', error));

// Renderizar el menú en la interfaz
function renderMenu() {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = ''; // Limpiar el contenedor

    menuData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');

        const button = document.createElement('button');
        button.textContent = item.nombre;
        button.onclick = () => {
            window.location.href = item.enlace; // Redirigir al enlace
        };

        itemDiv.appendChild(button);
        menuContainer.appendChild(itemDiv);
    });
}

// Llenar los selects para editar y eliminar
function populateSelects() {
    const editSelect = document.getElementById('editSelect');
    const deleteSelect = document.getElementById('deleteSelect');

    // Limpiar los selects
    editSelect.innerHTML = '';
    deleteSelect.innerHTML = '';

    menuData.forEach(item => {
        const editOption = document.createElement('option');
        editOption.value = item.id;
        editOption.textContent = item.nombre;
        editSelect.appendChild(editOption);

        const deleteOption = document.createElement('option');
        deleteOption.value = item.id;
        deleteOption.textContent = item.nombre;
        deleteSelect.appendChild(deleteOption);
    });
}

// Agregar una nueva opción al menú
document.getElementById('addMenuItemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const nombre = document.getElementById('nombre').value;
    const enlace = document.getElementById('enlace').value;

    // Validar que el ID sea único
    const newId = menuData.length ? Math.max(menuData.map(item => item.id)) + 1 : 1;

    // Agregar la nueva opción
    menuData.push({ id: newId, nombre, enlace });
    renderMenu(); // Volver a renderizar el menú
    populateSelects(); // Actualizar los selects
    this.reset(); // Limpiar el formulario
});

// Modificar una opción del menú
document.getElementById('editMenuItemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const id = parseInt(document.getElementById('editSelect').value);
    const newNombre = document.getElementById('editNombre').value;
    const newEnlace = document.getElementById('editEnlace').value;

    const item = menuData.find(item => item.id === id);
    if (item) {
        item.nombre = newNombre;
        item.enlace = newEnlace;
        renderMenu(); // Volver a renderizar el menú
        populateSelects(); // Actualizar los selects
        this.reset(); // Limpiar el formulario
    }
});

// Eliminar una opción del menú
document.getElementById('deleteMenuItemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const id = parseInt(document.getElementById('deleteSelect').value);
    menuData = menuData.filter(item => item.id !== id);
    renderMenu(); // Volver a renderizar el menú
    populateSelects(); // Actualizar los selects
    this.reset(); // Limpiar el formulario
});