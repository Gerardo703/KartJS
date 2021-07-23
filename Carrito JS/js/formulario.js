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
        const error = document.querySelector('p.alert');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-danger'); // elimino la clase red
        e.target.classList.add('border', 'border-success'); // Agrego una clase de Bootstrap

    }else{
        e.target.classList.add('border', 'border-danger'); // elimino la clase red
        e.target.classList.remove('border', 'border-success'); // Agrego una clase de Bootstrap
        mostrarErrores('Todos los campos son Obligatorios')
    }

    // Validar el email
    if(e.target.type === 'email'){
        if(expRegular.test( e.target.value )){
            
            //Eliminar los errores
            const error = document.querySelector('p.alert');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border', 'border-danger'); // elimino la clase red
            e.target.classList.add('border', 'border-success'); // Agrego una clase de Bootstrap
           
        }else{
            e.target.classList.add('border', 'border-danger'); // elimino la clase red
            e.target.classList.remove('alert', 'alert-success'); // Agrego una clase de Bootstrap
            mostrarErrores('Campo formato solicitado erroneo');
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
    mensajeError.classList.add('alert', 'alert-danger');

    const errores = document.querySelectorAll('.alert');

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
        parrafo.classList.add('alert', 'alert-success');
        
        //Colocar el parrafo antes del Spinner
        formulario.insertBefore(parrafo, null);

        setTimeout(() => {
            parrafo.remove(); // Eliminamos el párrafo que contiene el mensajede éxito
            formulario.classList.remove('border', 'border-success');
            resetarFormulario();
        }, 1500);

    }, 1500);
}

function resetarFormulario(){
    formulario.reset(); // resetear el fromulario
    iniciarApp();
}