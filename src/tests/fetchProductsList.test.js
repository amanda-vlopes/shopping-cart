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
    expect(result).toEqual(computadorSearch);
  });

  it('ao chamar a função sem argumento retorna um erro com a mensagem: Temo de busca não informado', async () => {
    const erro = new Error('Termo de busca não informado');
    await expect(fetchProductsList()).rejects.toThrow(erro);
  });
});
