export const getAddress = async (cep) => {
  const url1 = 'https://cep.awesomeapi.com.br/json/';
  const url2 = 'https://brasilapi.com.br/api/cep/v2/';
  const promisseCEP = await Promise.any([fetch(`${url1}${cep}`), fetch(`${url2}${cep}`)]);
  const data = promisseCEP.json();
  return data;
};

const criaEndereco = (dados) => {
  if (!dados.message) {
    const rua = dados.address || dados.street;
    const bairro = dados.district || dados.neighborhood;
    const cidade = dados.city;
    const estado = dados.state;
    return `${rua} - ${bairro} - ${cidade} - ${estado}`;
  }
  throw new Error('CEP não encontrado');
};

export const searchCep = async () => {
  const inputCEP = document.querySelector('.cep-input');
  const textoEndereco = document.querySelector('.cart__address');
  const cepInput = inputCEP.value;
  const tamanhoCEP = 8;
  try {
    if (`${cepInput}`.length === tamanhoCEP) {
      const dadosEndereco = await getAddress(cepInput);
      textoEndereco.innerText = criaEndereco(dadosEndereco);
    }
  } catch (erro) {
    textoEndereco.innerText = 'CEP não encontrado';
  }
};
