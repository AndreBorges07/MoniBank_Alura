export default function ehMaiorDeIdade(campo){ // Isso de export default é que ela será puxada em outros arquivos
    const dataDeNascimento = new Date(campo.value);
    
    if(!validaIdade(dataDeNascimento)){
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

function validaIdade(data) {
    const dataAtual = new Date(); //Serve para termos a data de hoje para fazer a conta da idade. 
    
    //Confere se a Data de nascimento tem 18 anos, comparando com a data atual. 
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
}


