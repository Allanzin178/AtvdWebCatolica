class Quiz {
    constructor(perguntas, personagens) {
        this.personagens = personagens; // Array de personagens
        this.perguntas = perguntas; // Array de perguntas
        this.numQuestao = 0; // Índice da questão atual
        this.opSelecionado = 0; // Controle de seleção
        this.botaoSelecionado
        this.perguntaEl = document.getElementById('pergunta'); // Elemento da pergunta
        this.opcoes = document.getElementsByName('opcoes'); // Botões de opções
        this.enviarBtn = document.getElementById('enviarBtn'); // Botão de enviar
        this.usuario = new Usuario()

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
            this.proximaPergunta()
        });

        // Exibe a primeira questão
        this.estruturarQuestoes();
    }

    trocarSelecionado(botao) {
        if (this.opSelecionado === 0) {
            botao.classList.add('selecionado');

            this.botaoSelecionado = botao
            this.opSelecionado = 1;
        } else {

            this.opcoes.forEach((botao) => {
                botao.classList.remove('selecionado')
            })

            this.botaoSelecionado = botao

            botao.classList.add('selecionado');
        }
        console.log(document.getElementsByClassName('selecionado'));
    }

    resetaForm() {
        this.opcoes.forEach((botao) => {
            botao.classList.remove('selecionado')}
        );
    }

    estruturarQuestoes() {
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

        this.usuario.calcularNotas(this.botaoSelecionado, this.perguntas)

        if (this.numQuestao >= this.perguntas.length) {
            this.exibirResultadoFinal();
            return;
        }

        this.opSelecionado = 0;
        this.estruturarQuestoes();
    }

    //Resultado
    exibirResultadoFinal() {
        let personagem;

        if (this.usuario.notaGoku >= this.usuario.notaVegeta && this.usuario.notaGoku >= this.usuario.notaKidBuu) {
            personagem = this.personagens[0];
        } else if (this.usuario.notaVegeta >= this.usuario.notaGoku && this.usuario.notaVegeta >= this.usuario.notaKidBuu) {
            personagem = this.personagens[1];
        } else {
            personagem = this.personagens[2];
        }
    
        const cardResultado = document.querySelector('.card');
        cardResultado.innerHTML = 
        `
            <h1>Resultado Final</h1>
            <h2>Você se parece mais com: <strong>${personagem.nome}</strong></h2>
            <img src="${personagem.imagem}" alt="${personagem.nome}" class = "img2">
            
            <p style = "margin-top: 10px">${personagem.descricao}</p>
            <button name = "enviar" id = "reniciar" style = "margin-top: 20px">Reiniciar</button>
        `;
    
    }
}

class Usuario {
    constructor(){
        this.notaGoku = 0
        this.notaVegeta = 0
        this.notaKidBuu = 0
    }

    calcularNotas(botaoSelecionado, perguntas){
        let selecionado = botaoSelecionado.value
        
        perguntas.forEach((pergunta)=>{
            pergunta.respostas.forEach((resposta)=>{
                if(resposta.texto == selecionado){
                    this.notaGoku += resposta.notaGoku
                    this.notaVegeta += resposta.notaVegeta
                    this.notaKidBuu += resposta.notaKidBuu
                }
            })
        })

        console.log(`Goku: ${this.notaGoku} Vegeta: ${this.notaVegeta} KidBuu: ${this.notaKidBuu} ${selecionado}`);
    }
}

// Dados das perguntas
const perguntas = [
    {
        pergunta: 'Qual seu nível de inteligencia?',
        respostas: [
            { texto: 'Burro (menos de 100 QI)', notaGoku: 2 , notaVegeta: 1, notaKidBuu: 3},
            { texto: 'Inteligente (mais de 120 QI)', notaGoku: 2 , notaVegeta: 3, notaKidBuu: 1 },
            { texto: 'Na media (100 QI)', notaGoku: 3 , notaVegeta: 2, notaKidBuu: 2 },
        ],
    },
    {
        pergunta: 'Você protege aqueles ao seu redor?',
        respostas: [
            { texto: 'Só importa a mim mesmo', notaGoku: 1 , notaVegeta: 2, notaKidBuu: 3  },
            { texto: 'Apenas aqueles mais próximos', notaGoku: 1 , notaVegeta: 3, notaKidBuu: 2  },
            { texto: 'Tenho prazer em ver o bem dos outros', notaGoku: 3 , notaVegeta: 1, notaKidBuu: 1  },
        ],
    },
    {
        pergunta: 'Você corre atrás dos seus sonhos?',
        respostas: [
            { texto: 'Conquisto eles através do esforço', notaGoku: 3 , notaVegeta: 2, notaKidBuu: 1  },
            { texto: 'Se vier ao acaso', notaGoku: 1 , notaVegeta: 2, notaKidBuu: 3  },
            { texto: 'Não me esforço mas conquisto meus sonhos', notaGoku: 2 , notaVegeta: 3, notaKidBuu: 2  },
        ],
    },
];

const personagens = [
    {
        nome: 'Goku',
        descricao: 'Você é determinado, bondoso e sempre busca proteger aqueles ao seu redor e proporcionar os seus sonhos em realidade, pois quer ver eles bem',
        imagem: 'goku.png',
    },
    {
        nome: 'Vegeta',
        descricao: 'Você tem espirito de um grande guerreiro sempre protegendo quem realmente importa, com uma mente brilhante um futuro promissor o aguarda',
        imagem: 'vegeta.png',
    },
    {
        nome: 'Kid Buu',
        descricao: 'Você age por impulso, com um grande ego mantem o holofotes apenas em você mesmo. Apesar disso você mantem um grande poder e pode se tornar um grande guerreiro',
        imagem: 'kidbuu.jpg',
    },
];

// Inicializa o quiz
const quiz = new Quiz(perguntas, personagens);