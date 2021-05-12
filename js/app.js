// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Eventos
eventListeners();
function eventListeners(){

	//cuando el usuario agrega un tweet

	formulario.addEventListener('submit', agregarTweet);

	//cuando el documento esta listo
	
	document.addEventListener('DOMContentLoaded', () => {
		tweets = JSON.parse( localStorage.getItem('tweets')) || [];

		crearHTML();
	});
}



// Funciones

function agregarTweet(e){
	e.preventDefault();
	//text area donde el usuario escribe
	const tweet = document.querySelector('#tweet').value;

	//validacion
	if (tweet === '') {
		mostrarError('No puede ir vacio');
		return; //esto evita que se sigan ejecutando lineas de codigo
	}

	const tweetObj = {
		id: Date.now(),
		tweet //tambien se puede poner variable:tweet y cumple la misma funcion
	}
	
	//Añadir mensaje
	
	tweets = [...tweets, tweetObj];
	//Una vez agregado vamos a crear el html
	crearHTML();

	//Reiniciar el formulario
	formulario.reset();
} 
 
//Mostrar mensaje de error

function mostrarError(error){
	const mensajeDeError = document.createElement('p');
	mensajeDeError.textContent = error;
	mensajeDeError.classList.add('error');

	//insertarlo en el contenido
	const contenido = document.querySelector('#contenido');
	contenido.appendChild(mensajeDeError);

	//temporizador para borrar el mensaje cada tres segundos
	setTimeout(() => {
		mensajeDeError.remove();
	}, 3000);
}

//Muestra un listado de los tweets

function crearHTML(){
	limpiarHTML();

	if(tweets.length > 0){
		tweets.forEach(tweet => {

			//agregar un boton de eliminar
			
			const btnEliminar = document.createElement('a');
			btnEliminar.classList.add('borrar-tweet');
			btnEliminar.innerText = "X";

			//Añadir la funcion de eliminar
			btnEliminar.onclick = () =>{
				borrarTweet(tweet.id);
			}


			//Crear el HTML
			const li = document.createElement('li');

			//Añadir el Texto
			li.innerText = tweet.tweet;

			//Asignar el boton
			li.appendChild(btnEliminar);

			//incentario en el html
			
			listaTweets.appendChild(li);

		});
	}

	sincronizarStorage();
}

//Agregar los tweets al storage
function sincronizarStorage(){
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id){
	tweets = tweets.filter(tweet => tweet.id !== id);
	crearHTML();
}



//Limpiar el HMTL
function limpiarHTML(){
	while(listaTweets.firstChild){
		listaTweets.removeChild(listaTweets.firstChild);
	}
}


