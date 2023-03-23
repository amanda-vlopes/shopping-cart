import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Salvando retorno da função fetchProductList com o parâmetro computador:

const sectionPai = document.querySelector('.products');

// Função para adicionar classe e mensagem

const addMensagem = (classe, mensagem) => {
  const msg = document.getElementById('mensagem');
  if (!classe && !mensagem) {
    sectionPai.innerHTML = '';
  }
  msg.classList.add(classe);
  msg.innerText = mensagem;
};

// Função para criar a lista de produtos
const listaProdutos = async () => {
  addMensagem('loading', 'carregando...');
  try {
    const computador = await fetchProductsList('computador');
    addMensagem();
    computador.forEach((produto) => {
      sectionPai.appendChild(createProductElement(produto));
    });
  } catch (erro) {
    const msgErro = 'Algum erro ocorreu, recarregue a página e tente novamente';
    addMensagem('error', msgErro);
  }
};

window.onload = () => {
  listaProdutos();
};
