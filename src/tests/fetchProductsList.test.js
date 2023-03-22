import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    const produto = 'computador';
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
    expect(fetch).toHaveBeenCalledWith(`${url}${produto}`);
  });

  it('retorno da função fetchProductsList é uma estrutura de dados', async () => {
    const result = await fetchProductsList('computador');
    expect(typeof result).toBe('object');
  });
});
