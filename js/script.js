import ehUmCPF from "./validaCPF.js";
import ehMaiorDeIdade from "./valida_Idade.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]")

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const lista = {
        "Nome": e.target.elements["nome"].value,
        "Email": e.target.elements["email"].value,
        "RG": e.target.elements["rg"].value,
        "CPF": e.target.elements["cpf"].value,
        "Aniversário": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("Cadastro", JSON.stringify(lista));

    window.location.href = "./abrir-conta-form-2.html";
})


camposDoFormulario.forEach((campo)=>{
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
    "valueMissing", //-> Quando não tem nada dentro do campo
    "typeMismatch", // -> Quando você coloca algo que não tem haver com que o input pede, como colocar uma URL num campo de E-mail
    "patternMismatch", // -> Quando o valor digitado no input não corresponde a um padrão já criado, como colocar um CPF inexistente ou RG
    "tooShort", //-> Quando definimos que um campo deve ter por exemplo 9 caracteres no minimo...
    "customError" //-> Quando customizamos algum erro, tipo criar um que se uma pessoa não tiver 18 anos não pode fazer login...
]

const mensagens = {
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

function verificaCampo(campo){

    let mensagem = "";
    campo.setCustomValidity("");

    if(campo.name == "cpf" && campo.value.length >= 11){
        ehUmCPF(campo);
    }
    
    if(campo.name == "aniversario" && campo.value != ""){
        ehMaiorDeIdade(campo)
    }

    tiposDeErro.forEach(erro =>{
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro]
        }

        const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
        const validadorDeInput = campo.checkValidity();

        if(!validadorDeInput){
            mensagemErro.textContent = mensagem;
        }else{
            mensagemErro.textContent = "";
        }
    })
}

