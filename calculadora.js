// Mi Primera cálculadora
const pantone = document.getElementById('pantuno');
const pantdos = document.getElementById('pantdos');
const pantres = document.getElementById('pantres');
const btnNum = document.querySelectorAll('.btn-numero');

btnNum.forEach(boton => boton.addEventListener('click', () => addDato(boton.innerText)));


function addDato(valor){
    if ('0123456789'.includes(valor)){
        if(!(pantdos.innerText === '0' && valor === '0')) pantdos.innerText = (pantdos.innerText === '0') ? valor: pantdos.innerText + valor;
        return;
    }
    else if ('%÷x-+'.includes(valor)){
        if (pantdos.innerText.length === 0 && pantuno.innerText.length > 0) pantdos.innerHTML = pantuno.innerText;
        if (!'%÷x-+.('.includes(pantdos.innerText.slice(-1))){
            if (valor === 'x') valor = '*';
            if (valor === '÷') valor = '/';
            if (valor === '%') valor = '*(1/100)'
            pantdos.innerText += valor; 
        }
        return
    }
    else if (valor === 'C'){
        pantuno.innerText = '';
        pantdos.innerText = '';
        pantres.innerText = '';
        return
    }
    else if (valor === '←'){
        const x = pantdos.innerText.length;
        pantdos.innerText = pantdos.innerText.slice(0, x - 1);
        return;
    }
    else if (valor === '.'){
        if (pantdos.innerText.includes(valor)){
            const x = pantdos.innerText.length - 1;
            for (let i = x;i >= 0;i--){
                if (pantdos.innerText[i]==='.') return;
                if ('/*+-()'.includes(pantdos.innerText[i])) break;
            }
        }
        if(pantdos.innerText.length === 0) valor = '0.';
        pantdos.innerText += valor;
        return;
    }
    else if (valor === 'Ans'){
        if(pantuno.innerText.length > 0) pantdos.innerText += pantuno.innerText;
        return;
    }
    else if (valor === '(' || valor === ')'){ 
        if ('0123456789'.includes(pantdos.innerText.slice(pantdos.innerText.length-1)) && valor === '(' && pantdos.innerText.length > 0) valor = '*' + valor;
        pantdos.innerText += valor;
        return;
    }
    else if (valor === '='){
        if (pantdos.innerText.length > 0){
            try{
                pantone.innerText = parseFloat(eval(pantdos.innerText));
                pantdos.innerText = '';
        }   catch (error){
                pantres.innerText = 'Error en la fórmula, favor revisar'
                return;
        }
        }
    }
}

function getFromKeyboard(tecla){
    switch (tecla){
        case 'Enter':
            tecla = '=';
            break;
        case 'Backspace':
            tecla = '←';
            break;
        case '*':
            tecla = 'x';
            break;
        case '/':
            tecla = '÷';
            break;
        case 'c':
            tecla = 'C';
            break;
    }
    addDato(tecla);
}
