$(document).ready(function() {
    // Manejar el envío del formulario de inicio de sesión del administrador
    $('#admin-login-form').submit(function(event) {
        event.preventDefault();
        const username = $('#admin-username').val();
        const password = $('#admin-password').val();

        // Validar las credenciales del administrador
        if (username === 'claro2024' && password === 'bot2024') {
            // Redireccionar a la página de administración de clientes en una nueva pestaña
            openAdminPageInNewTab();
        } else {
            alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
        }
    });

    // Función para abrir la página de administración de clientes en una nueva pestaña
    function openAdminPageInNewTab() {
        var adminPageUrl = 'clientesadmin.html';
        var newTab = window.open(adminPageUrl, '_blank');
        newTab.focus();
    }

    // Enlace para abrir la página de administración de clientes en una nueva pestaña
    $('#open-admin-page').click(function(event) {
        event.preventDefault();
        openAdminPageInNewTab();
    });

    // Función para cargar la lista de clientes
    function loadClientList() {
        // Aquí puedes hacer una petición al servidor para obtener la lista de clientes
        // Por ahora, simularemos algunos clientes de prueba
        const clients = ['cliente1', 'cliente2', 'cliente3']; // Ejemplo de lista de clientes
        const clientListContainer = $('#client-list');
        clientListContainer.empty(); // Limpiar la lista antes de cargar nuevos clientes

        clients.forEach(function(client, index) {
            const listItem = $('<div class="client-item"></div>');
            listItem.text(client);
            listItem.click(function() {
                // Aquí puedes manejar el evento de clic en un cliente para ver más detalles
                // Por ahora, mostraremos una alerta con el nombre del cliente seleccionado
                alert('Cliente seleccionado: ' + client);
            });
            clientListContainer.append(listItem);
        });
    }
});
