import { supabase } from './conexion.js';

// Elementos del DOM
const nombreInput = document.getElementById('nombreInput');
const emailInput = document.getElementById('emailInput');
const btnGuardar = document.getElementById('btnGuardar');
const btnCargar = document.getElementById('btnCargar');
const listaDatos = document.getElementById('listaDatos');
const statusMsg = document.getElementById('statusMsg');

// Evento 1: Guardar un nuevo registro ingresado por teclado
btnGuardar.addEventListener('click', async () => {
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();

    if (!nombre || !email) {
        statusMsg.innerText = '⚠️ Por favor, completa ambos campos.';
        statusMsg.style.color = '#ef4444';
        return;
    }

    statusMsg.innerText = 'Guardando en Supabase...';
    statusMsg.style.color = '#f59e0b';

    // Insertar en la tabla 'contactos'
    const { data, error } = await supabase
        .from('contactos')
        .insert([{ nombre: nombre, email: email }]);

    if (error) {
        console.error(error);
        statusMsg.innerText = '❌ Error al guardar: ' + error.message;
        statusMsg.style.color = '#ef4444';
    } else {
        statusMsg.innerText = '✅ ¡Registro guardado exitosamente!';
        statusMsg.style.color = '#10b981';
        nombreInput.value = '';
        emailInput.value = '';
        cargarDatos();
    }
});

// Evento 2: Leer/Cargar los datos existentes
btnCargar.addEventListener('click', cargarDatos);

async function cargarDatos() {
    statusMsg.innerText = 'Consultando datos...';
    statusMsg.style.color = '#f59e0b';

    // Consultar todos los registros
    const { data, error } = await supabase
        .from('contactos')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error(error);
        statusMsg.innerText = '❌ Error al consultar: ' + error.message;
        statusMsg.style.color = '#ef4444';
        return;
    }

    listaDatos.innerHTML = '';
    
    if (data.length === 0) {
        listaDatos.innerHTML = '<li>No hay registros en la base de datos.</li>';
    } else {
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.nombre}</strong> (${item.email})`;
            listaDatos.appendChild(li);
        });
    }

    statusMsg.innerText = `✅ Cargados ${data.length} registros.`;
    statusMsg.style.color = '#10b981';
}