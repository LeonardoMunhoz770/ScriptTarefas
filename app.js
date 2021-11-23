'use strict';

/*
<label class="todo__item">
  <input type="checkbox">
  <div>teste de item 1</div>
  <input type="button" value="X">
  </label> 
*/


let banco_dados = [
  /*{"tarefa" : "Estudar JS", "status": ""},
  {"tarefa" : "Ver série", "status": "checked"},
  {"tarefa" : "Comer Pipoca", "status": ""}*/
]

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement('label'); //Criando um elemento label e armazenando na variavel "item"
  item.classList.add('todo__item'); //Dentro do elemento item adicionando uma classe.
  item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
  `
  document.querySelector("#todo_list").appendChild(item) //Adicionando o item dentro da div usando o id todo_list
}


const limparTarefas = () =>{
  const todo_list = document.querySelector("#todo_list");
  while(todo_list.firstChild){
    todo_list.removeChild(todo_list.lastChild);
  } 
}

const atualizarTela = () =>{
  limparTarefas();
  banco_dados.forEach((item,indice) => criarItem(item.tarefa, item.status, indice)); //Percorre todos os objetos do banco chamando a função criarItem
}

const inserirItem = (evento) =>{
  const tecla = evento.key //Localiza a tecla digitada e armazena.
  const texto = evento.target.value; //Localiza o texto digitado e armazena.
  if(tecla === "Enter"){
    banco_dados.push({"tarefa" : texto, "status": ""})  /*Verifica se foi digitado a tecla ENTER, adiciona ao 
                                                        banco de dados a tarefa digitada com o método PUSH*/
    atualizarTela();
    evento.target.value = ''; //limpa os valores do input.
  }
}

const removerItem = (indice) =>{
  banco_dados.splice (indice, 1) //splice = modificar uma array
  atualizarTela();
}

const atualizarItem = (indice) =>{
  banco_dados[indice].status = banco_dados[indice].status == "" ? 'checked' : '';
  atualizarTela();    
}

const clickItem = (evento) =>{
  const elemento = evento.target; //Localiza o elemento que foi clicado
  if(elemento.type === "button"){
    const indice = elemento.dataset.indice; 
    removerItem(indice);
  }else if(elemento.type === "checkbox"){
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
}

document.querySelector("#newItem").addEventListener("keypress", inserirItem);
document.querySelector("#todo_list").addEventListener("click", clickItem);


atualizarTela();

