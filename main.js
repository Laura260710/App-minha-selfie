// este é um API Web Speech usado para reconhecer o que estamos falando
// e converter para o texto que foi dito
// vamos guardar o API dentro de uma variável
var SpeechRecognition = window.webkitSpeechRecognition;

// Agora vamos criar um novo API Web Speech para usar em nosso
// webapp e armazená-lo em uma variável
var recognition = new SpeechRecognition();

// a variável Textbox está vinculada ao textbox (que é a textarea)
var Textbox = document.getElementById("textbox");

//vamos definir a função start
function start() {
    //estamos atualizando a textarea com um valor vazio  
    Textbox.innerHTML = "";
    // vamos chamar a função start do API Web Speech
    recognition.start();
}

//A função onresult contém todos os valores da fala convertidos em texto.
recognition.onresult = function (event) {

    console.log(event);

    //event.results[0][0].transcript tem nossa saída de voz para
    //texto, portanto, vamos armazená-la dentro de uma variável (Content)
    var Content = event.results[0][0].transcript;

    //Agora precisamos atualizar o valor de textarea com este valor.
    Textbox.innerHTML = Content;
    console.log(Content);

    //Utilize uma condição if para verificar se o usuário diz "selfie"
    if (Content == "selfie") {
        //Se dissermos ”selfie”, então a aplicação não deve repetir a frase, 
        //mas dizer “Tirando sua selfie em 5 segundos”.
        console.log("tirando selfie --- ");
        //chamamos a função speak
        speak();
    }
}

//vamos definir a função speak
function speak() {
    // dentro da variável synth vamos colocar a API que converte texto em fala
    var synth = window.speechSynthesis;

    // pegamos o valor do texto dessa área de texto e o armazenaremos dentro de uma variável.
    speak_data = "Tirando sua selfie em 5 segundos";

    //utterThis- é uma variável em que armazenaremos o texto convertido em fala.
    //SpeechSynthesisUtterance- é a função de uma API que converterá o texto em fala
    //Utilizamos uma palavra-chave new, pois queremos converter esse texto em fala, para todo texto subsequente. 
    //speakData- contém o texto obtido da área de texto
    var utterThis = new SpeechSynthesisUtterance(speak_data);

    //convertemos o texto em fala e o armazenamos dentro de uma variável, portanto, 
    //passaremos essa variável para a função speak() da API.
    synth.speak(utterThis);
    //synth- pois, aqui, armazenamos a API no ponto 2 
    // speak()- speak() é uma função predefinida da API. 
    //utterThis- possui o valor convertido do texto em fala que queremos que sistema diga

    //webcam.attach() será acionada e aparecerá um popup que pedirá a permissão para inicar a webcam.
    Webcam.attach(camera);

    //definimos uma função vazia, dentro de set Timeout.
    setTimeout(function () {
        // Agora, forneça o tempo de delay desejado. Ajustei para 5 segundos, você pode ajustar para qualquer valor.
        //O código possui 5000, pois, como sabemos, 5 segundos são 5000 milissegundos, e essa função aceita
        //tempo em milissegundos

        take_selfie();
        save();
    }, 5000);
}
//Obteremos o elemento HTML, em que desejamos mostrar a visualização da webcam e o armazenaremos em uma variável.
camera = document.getElementById("camera");

//Webcam.set- é uma função de webcam.js para ver as propriedades da visualização da webcam. 
Webcam.set({
    //width- ajusta a largura desejada para a visualização da webcam, você pode fornecer qualquer valor desejado. Forneci o valor 360 (360px).
    width: 360,
    //height- ajusta a altura desejada para a visualização da webcam, você pode fornecer qualquer valor desejado. Forneci o valor 250 (250px). 
    height: 250,
    //image_format - Forneci o formato png, você também pode fornecer outro formato, como “jpeg”. 
    //png_quality- significa a qualidade da visualização da webcam. 
    image_format: 'jpeg',
    //Se você fornecer outro formato, com “jpeg”, então, forneça jpeg_quality: 90 ao invés de png_quality
    jpeg_quality: 90
});

//Defina a função.
function take_selfie() {
    //Webcam.snap() é uma função predefinida de webcam.js utilizada para tirar uma selfie. 
    //Essa função contém data_uri que pode ser utilizada para mostrar a pré-visualização da imagem gerada após a captura. 
    //Portanto, primeiro, defina Webcam.snap():
    Webcam.snap(function (data_uri) {
        //Agora, vamos atualizar a div que criamos para conter a selfie, em index.html, 
        //com essa data_uri que possui a selfie tirada:
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>';
    });
}


function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}