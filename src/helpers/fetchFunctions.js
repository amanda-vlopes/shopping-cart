export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (produto) => {
  if (!produto) {
    throw new Error('Termo de busca não informado');
  }
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  try {
    const response = await fetch(`${url}${produto}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return error.message;
  }
};
