import { getSavedCartIDs, removeCartID, saveCartID } from './cartFunctions';
import { fetchProduct } from './fetchFunctions';

// Elementos HTML utilizados nas funções:

const priceTotal = document.querySelector('.total-price');

// Esses comentários que estão antes de cada uma das funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
export const getIdFromProduct = (product) => (
  product.querySelector('span.product__id').innerText
);

// Função que remove preço do valor total quando o item é removido:

const subtraiPrice = (valor) => {
  let priceNumber = parseFloat(priceTotal.textContent);
  priceNumber -= valor;
  priceTotal.innerHTML = priceNumber;
  localStorage.setItem('totalPrice', JSON.stringify(priceNumber));
};

/**
 * Função que remove o produto do carrinho.
 * @param {Element} li - Elemento do produto a ser removido do carrinho.
 * @param {string} id - ID do produto a ser removido do carrinho.
 */
const removeCartProduct = (li, id, valor) => {
  li.remove();
  removeCartID(id);
  subtraiPrice(valor);
};

/**
 * Função responsável por criar e retornar um product do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @param {string} product.pictures - Imagens do produto.
 * @returns {Element} Elemento de um product do carrinho.
 */
export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imgContainer = createCustomElement('div', 'cart__product__image-container');

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => removeCartProduct(li, id, price));
  return li;
};

// Função para somar preço produto ao preço total

const somaPrice = (valor) => {
  let priceNumber = parseFloat(priceTotal.textContent);
  priceNumber += valor;
  priceTotal.textContent = priceNumber;
  console.log(priceNumber);
  localStorage.setItem('totalPrice', JSON.stringify(priceNumber));
};

// Função para criar um escutador de eventos ao botão - Requisito 8

const adicionaProduto = (botao, idProduto, priceProduto) => {
  botao.addEventListener('click', async () => {
    saveCartID(idProduto); // o id do produto pode vir da função createProductElement
    // Função adiciona um produto ao carrinho e salva a id ao local storage
    const informacoes = await fetchProduct(idProduto); // o id do produto pode vir da função createProductElement
    // Função que faz uma requisição na API usando o id do Produto e retorna um objeto com todas as suas informações - função assíncrona;
    // O objeto retornado da função fetchProduct com todas as informações do produto é usado como parametro da função createCartProductElement para criar e retornar um produto do carrinho. Esse produto retornado será adicionado como filho do elemento de lista com a classe cart__products:
    const carrinho = document.querySelector('.cart__products');
    carrinho.appendChild(createCartProductElement(informacoes));
    somaPrice(priceProduto);
  });
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @param {number} product.price - Preço do produto.
 * @returns {Element} Elemento de produto.
 */
export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'product';

  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(cartButton);

  adicionaProduto(cartButton, id, price);

  return section;
};

// Função para carregar o carrinho de compras ao iniciar a página

// Utilizar a função getSavedCartsIDs - Função que retorna todos os itens do carrinho salvos no localStorage
// a função retorna um array de ids - Iterar nesse array e pegar cada id para utilizar a função fetchProduct e recuperar as informações de cada produto

// Recuperando o valor total:

export const recuperaCarrinho = async () => {
  const ids = getSavedCartIDs(); // array de produtos salvos no localStorage
  const promises = ids.map((produto) => fetchProduct(produto));
  const infoProdutos = await Promise.all(promises);
  infoProdutos.forEach((product) => {
    const carrinho = document.querySelector('.cart__products');
    carrinho.appendChild(createCartProductElement(product));
  });
  const priceStoraged = JSON.parse(localStorage.getItem('totalPrice'));
  if (priceStoraged) {
    priceTotal.innerHTML = priceStoraged;
  }
};
