import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Salvando retorno da função fetchProductList com o parâmetro computador:

// Função para criar uma listagem de produtos

// Recuperando elemento pai
const listaProdutos = async () => {
  const sectionPai = document.querySelector('.products');
  const loading = document.querySelector('.loading');
  loading.innerText = 'carregando...';
  try {
    const computador = await fetchProductsList('computador');
    sectionPai.innerHTML = '';
    computador.forEach((produto) => {
      sectionPai.appendChild(createProductElement(produto));
    });
  } catch (erro) {
    loading.classList.add('error');
    loading.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  }
};

window.onload = () => {
  listaProdutos();
};
