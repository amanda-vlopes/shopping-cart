import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    const urlProduct = 'https://api.mercadolibre.com/items/MLB1405519561' 
    expect(fetch).toHaveBeenCalledWith(urlProduct);
  });

  it('retorno da função fetchProduct é uma estrutura de dados', async () => {
    const result = await fetchProduct('MLB1405519561');
    expect(result).toEqual(product);
  });

  it('ao chamar a função sem argumento retorna um erro com a mensagem: ID não informado', async () => {
    const erro = new Error('ID não informado');
    await expect(fetchProduct()).rejects.toThrow(erro);
  });
});
