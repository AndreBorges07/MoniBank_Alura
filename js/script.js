import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulário = document.querySelectorAll ("[required]"); //Todos os elementos que forem obrigatórios
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => { //Entender que aconteceu o submit
    e.preventDefault(); //De forma normal,depois do submit a tela recarrega, sendo que não queremos isso, por isso o evento ficou como "preventDefault". 

    const listaResposta = { // Serve para guardar os valores digitados nos campos. 
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaResposta)); //É uma "conversão" para que o JS leia melhor

    window.location.href = "./abrir-conta-form-2.html";

})


camposDoFormulário.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo)); // o "Blur" é quando o campo "sai do foco". Clicou no campo e foi para outro, por exemplo.  
    campo.addEventListener("invalid", evento => evento.preventDefault()); //Remove aquela "Mensagem de erro padrão" que aparece quando você deixa o campo vazio. 
} )

const tipoDeErro = [
    'valueMissing', //Erro quando o campo está vazio.
    'typeMismatch', //O dato não combina com o tipo solicitado (Exemplo do modelo de E-mail).
    'patternMismatch', //É quando não segue um padrão com os campos, tal qual o CPF, com seus "pontos" e "traços".
    'tooShort', //Como foi feito campos com contador de Caracteres, este acusa se o campo está muito curto. 
    'customError' // São as lógicas que são feitas no programa. 
]

const mensagens = { //Lista das mensagem de erro para cada campo. 
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo (campo){
    let mensagem = "";
    campo.setCustomValidity(''); //Serve para apagar a mensagem de erro, uma vez que foi colocado a informação correta. 

    if (campo.name == "cpf" && campo.value.length >= 11){
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    //Varre cada erro e encontra a mensagem certa para cada tipo. (Ex.: Com o campo de Nome vazio, vai acusar o erro "valueMissing" como true. Assim que encontrar que o erro é "ValueMissing" este responde de acordo com a lista anterior com o nome "mensagens" - no plural mesmo)
    tipoDeErro.forEach(erro =>{ 
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeImput = campo.checkValidity();

    if(!validadorDeImput){
        mensagemErro.textContent = mensagem;
    }else {
        mensagemErro.textContent = "";
    }

    console.log(campo.validity); //Esse "Validity" ele confere vários quesitos de um determinado campo, devolvendo "true" quando tiver um erro e "false" quando estiver Ok. (A idéia é: Possui erro? S/N)


}

