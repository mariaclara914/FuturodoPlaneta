
export function aleatorio(lista) {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}

const nomes = [
    "Ana",
    "Sofia",
    "Luna",
    "Clara",
    "Alice",
    "Rafa",
    "Alex",
    "Noah",
    "Davi",
    "Bia"
];

export const nome = aleatorio(nomes);