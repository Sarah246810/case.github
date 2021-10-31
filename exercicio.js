const dados = require('./data.json');

// separa os valores que estão no arquivo .json em contantes;
const estabecimentos = dados.establishments;
const produtos = dados.products;
const categorias = dados.categories;

const estabelecimentosAgrupados = {};

let total;
let numeroDeProdutos;

// percorre a lista de estabelecimentos
for (let estabelecimento of estabecimentos) {

    total = 0;
    numeroDeProdutos = 0;

    // para cada estabelecimeto busca a lista de produtos mesmo
    const produtoDoEstabelecimento = produtos.filter(function (produto) {
        return estabelecimento.productsId.includes(produto.id)
    });

    // inicializa objeto que receberar as categorias do estabelecimento
    const categoriaDoEstabelecimento = {};

    // percorre todas as categorias
    for (categoria of categorias) {

        // busca todos os produtos por categoria
        const produtoDoEstabelecimentoPorCategoria = produtoDoEstabelecimento.filter(function (produto) {
            return produto.categoriesId.includes(categoria.id);
        });

        const produtosDaCategroia = {};

        // percorre a lista de produtos do estabelecimento por categoria encontrada
        for (let produto of produtoDoEstabelecimentoPorCategoria) {
            numeroDeProdutos = numeroDeProdutos + 1;
            // monta o objeto de produto por categortia com preço divido por 100 fixando em 2 casas decimais 
            const preco = (produto.price / 100).toFixed(2)
            total = total + parseFloat(preco);

            produtosDaCategroia[`${produto.name}`] = {
                "price": preco
            }
        }
        // verifica se objeto possui algum atributo antes de adicionar dentro do objeto categoriaDoEstabelecimento
        if (Object.keys(produtosDaCategroia).length) {
            categoriaDoEstabelecimento[`${categoria.name}`] = produtosDaCategroia
        }

    }
    // monta o objeto com o resultado
    estabelecimentosAgrupados[`${estabelecimento.name}`] = categoriaDoEstabelecimento;

    //cacula a media e adiciona valor ao objeto 
    const media = (total / numeroDeProdutos).toFixed(2);
    estabelecimentosAgrupados[`${estabelecimento.name}`]['avgPrice'] = media;

}

// converte o objeto para json antes de imprir 
console.log(JSON.stringify(estabelecimentosAgrupados, null, '\t'));



