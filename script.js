class Quiz {
    constructor(perguntas) {
        this.perguntas = perguntas; // Array de perguntas
        this.numQuestao = 0; // Índice da questão atual
        this.opSelecionado = 0; // Controle de seleção
        this.perguntaEl = document.getElementById('pergunta'); // Elemento da pergunta
        this.opcoes = document.getElementsByName('opcoes'); // Botões de opções
        this.enviarBtn = document.getElementById('enviarBtn'); // Botão de enviar

        this.inicializar(); // Configura os eventos e exibe a primeira questão
    }

    inicializar() {
        // Adiciona eventos aos botões de opções
        this.opcoes.forEach((botao) => {
            botao.addEventListener('click', () => {
                this.trocarSelecionado(botao)}
            );
        });

        // Adiciona evento ao botão de enviar
        this.enviarBtn.addEventListener('click', () => {
            this.proximaPergunta()}
        );

        // Exibe a primeira questão
        this.estruturarQuestoes();
    }

    trocarSelecionado(botao) {
        if (this.opSelecionado === 0) {
            botao.classList.add('selecionado');
            this.opSelecionado = 1;
        } else {
            this.opcoes.forEach((botao) => botao.classList.remove('selecionado'));
            botao.classList.add('selecionado');
        }
        console.log(document.getElementsByClassName('selecionado'));
    }

    resetaForm() {
        this.opcoes.forEach((botao) => botao.classList.remove('selecionado'));
    }

    estruturarQuestoes() {
        if (this.numQuestao >= this.perguntas.length) {
            alert('Acabaram as questões');
            return;
        }

        this.resetaForm();
        this.perguntaEl.classList.add('cooldown1');
        this.opcoes.forEach((opcao) => opcao.classList.add('cooldown'));

        setTimeout(() => {
            // Atualiza a pergunta e as opções
            const questaoAtual = this.perguntas[this.numQuestao];
            this.perguntaEl.innerHTML = questaoAtual.pergunta;
            this.opcoes.forEach((opcao, index) => {
                opcao.value = questaoAtual.respostas[index].texto;
            });

            // Remove as classes de cooldown
            this.perguntaEl.classList.remove('cooldown1');
            this.opcoes.forEach((opcao) => opcao.classList.remove('cooldown'));

            this.numQuestao++;
        }, 1000);
    }

    proximaPergunta() {
        if (this.opSelecionado === 0) {
            this.perguntaEl.innerHTML = 'ERRO! Selecione uma alternativa!';
            setTimeout(() => {
                this.perguntaEl.innerHTML = this.perguntas[this.numQuestao - 1].pergunta;
            }, 1000);
            return;
        }

        this.opSelecionado = 0;
        this.estruturarQuestoes();
    }
}

// Dados das perguntas
const perguntas = [
    {
        pergunta: 'Qual seu nível de inteligencia?',
        respostas: [
            { texto: 'Burro (menos de 100 QI)' },
            { texto: 'Inteligente (mais de 120 QI)' },
            { texto: 'Na media (100 QI)' },
        ],
    },
    {
        pergunta: 'Você protege aqueles ao seu redor?',
        respostas: [
            { texto: 'Só importa a mim mesmo' },
            { texto: 'Apenas aqueles mais próximos' },
            { texto: 'Tenho prazer em ver o bem dos outros' },
        ],
    },
    {
        pergunta: 'Você corre atrás dos seus sonhos?',
        respostas: [
            { texto: 'Conquisto eles através do esforço' },
            { texto: 'Se vier ao acaso' },
            { texto: 'Não me esforço mas conquisto meus sonhos' },
        ],
    },
];

// Inicializa o quiz
const quiz = new Quiz(perguntas);