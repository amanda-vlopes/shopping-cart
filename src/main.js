import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Salvando retorno da função fetchProductList com o parâmetro computador:

// Função para criar uma listagem de produtos

// Recuperando elemento pai
const listaProdutos = async () => {
  const computador = await fetchProductsList('computador');
  const sectionPai = document.querySelector('.products');
  computador.forEach((produto) => {
    sectionPai.appendChild(createProductElement(produto));
  });
};

window.onload = () => {
  listaProdutos();
};
