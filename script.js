
import { aleatorio, nome } from "./js/aleatorio.js";
import { perguntas } from "./js/perguntas.js";

// Elementos da página
const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");

const telaJogo = document.querySelector(".tela-jogo");
const enunciadoPergunta = document.querySelector(".pergunta-enunciado");
const opcoesContainer = document.querySelector(".opcoes");

const progressoNumero = document.querySelector(".progresso-numero");
const barraProgresso = document.querySelector(".barra-progresso");
const progressoPreenchimento = document.querySelector(
    ".barra-progresso-preenchimento"
);

const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const mensagemResultado = document.querySelector(".mensagem-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

// Estado da missão
let atual = 0;
let historiaFinal = [];

// Inicia ou reinicia a missão
function iniciaJogo() {
    atual = 0;
    historiaFinal = [];

    telaInicial.hidden = true;
    caixaResultado.hidden = true;
    telaJogo.hidden = false;

    mostraPergunta();
}

// Exibe a pergunta atual
function mostraPergunta() {
    const perguntaAtual = perguntas[atual];

    if (!perguntaAtual) {
        mostraResultado();
        return;
    }

    enunciadoPergunta.textContent = perguntaAtual.enunciado;

    progressoNumero.textContent =
        `Pergunta ${atual + 1} de ${perguntas.length}`;

    barraProgresso.setAttribute("aria-valuenow", atual + 1);

    progressoPreenchimento.style.width =
        `${((atual + 1) / perguntas.length) * 100}%`;

    opcoesContainer.replaceChildren();

    perguntaAtual.alternativas.forEach((opcao, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.classList.add("opcao-btn");

        const letra = document.createElement("span");
        letra.classList.add("opcao-letra");
        letra.textContent = String.fromCharCode(65 + indice);

        const texto = document.createElement("span");
        texto.textContent = opcao.texto;

        botao.append(letra, texto);

        botao.addEventListener("click", () => {
            respostaSelecionada(opcao);
        });

        opcoesContainer.appendChild(botao);
    });
}

// Registra a escolha e avança para a próxima pergunta
function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;

    if (afirmacoes && afirmacoes.length > 0) {
        historiaFinal.push(aleatorio(afirmacoes));
    }

    // Todas as perguntas são apresentadas em sequência.
    atual++;

    if (atual < perguntas.length) {
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

// Mostra o encerramento da missão
function mostraResultado() {
    telaJogo.hidden = true;
    caixaResultado.hidden = false;

    mensagemResultado.textContent =
        `${nome}, você concluiu sua missão! Suas escolhas mostram ` +
        "que a inteligência artificial pode ajudar a cuidar do planeta " +
        "quando é usada com consciência e responsabilidade.";

    // Cada afirmação escolhida aparece na história final.
    textoResultado.textContent = historiaFinal
        .map((afirmacao, indice) => `${indice + 1}. ${afirmacao}`)
        .join("\n\n");
}

// Volta à apresentação para jogar novamente
function jogaNovamente() {
    atual = 0;
    historiaFinal = [];

    caixaResultado.hidden = true;
    telaJogo.hidden = true;
    telaInicial.hidden = false;

    progressoPreenchimento.style.width = "0%";
    barraProgresso.setAttribute("aria-valuenow", "0");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Eventos dos botões
botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);