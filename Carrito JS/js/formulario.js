// Variables
const formulario = document.querySelector('#formulario');
const btnEnviar = document.querySelector('#btn-formulario');

// Variables de los campos
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');

// Expresion regular
const expRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

cargarListeners();

function cargarListeners(){
    
    //Iniciar app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del Formulario
    nombre.addEventListener('blur', validarFormulario);
    apellido.addEventListener('blur', validarFormulario);
    email.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    //Enviar Mail
    formulario.addEventListener('submit', enviarMail);

}

// Funciones
function iniciarApp(){
    //Deshabilitamos el botón enviar
    btnEnviar.disabled = true;

    // Ocultamos el spinner 
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'none';
}

function validarFormulario(e){
    if( e.target.value.length > 0 ){
        
        //Eliminar los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500'); // elimino la clase red
        e.target.classList.add('border', 'bg-green-200'); // Agrego una clase de Tailwind

    }else{
        e.target.classList.add('border', 'border-red-500'); // elimino la clase red
        e.target.classList.remove('border', 'bg-green-200'); // Agrego una clase de Tailwind
        mostrarErrores('Todos los campos son Obligatorios')
    }

    // Validar el email
    if(e.target.type === 'email'){
        if(expRegular.test( e.target.value )){
            
            //Eliminar los errores
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500'); // elimino la clase red
            e.target.classList.add('border', 'bg-green-200'); // Agrego una clase de Tailwind
           
        }else{
            e.target.classList.add('border', 'bg-red-200'); // elimino la clase red
            e.target.classList.remove('border', 'border-green-500'); // Agrego una clase de Tailwind
            mostrarErrores('Campo formato solicitad erroneo');
        }
    }

    //Validar los campos y se habilita el botón enviar
    if(expRegular.test( email.value ) && nombre.value != '' && apellido.value != '' && mensaje.value != '' ){
        btnEnviar.disabled = false;
    }
}

function mostrarErrores(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'w-40', 'ml-20px', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function enviarMail(e){
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Luego de 3 segundos ocultar el spinner y mostrar el msj
    setTimeout(() => {
        spinner.style.display = 'none';
        
        // Creo Un parrafo para mostrar el mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Mensaje enviado con éxito';
        parrafo.classList.add('text-center', 'p-2', 'w-40','my-10','bg-green-500', 'text-white', 'font-bold', 'uppercase', 'parrafo' );
        
        //Colocar el parrafo antes del Spinner
        formulario.insertBefore(parrafo, null);

        setTimeout(() => {
            parrafo.remove(); // Eliminamos el párrafo que contiene el mensajede éxito
            formulario.classList.remove('border', 'border-red-500');
            resetarFormulario();
        }, 3000);


    }, 3000);
}

function resetarFormulario(){
    formulario.reset(); // resetear el fromulario
    iniciarApp();
}