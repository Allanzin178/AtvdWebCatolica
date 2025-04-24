const opcoes = document.getElementsByName('opcoes')
const formulario = document.getElementById('form')
const enviarBtn = document.getElementById('enviarBtn')
const pergunta = document.getElementById('pergunta')

console.log(opcoes)

let opSelecionado = 0
let numQuestao = 0
let perguntas = [
    {
        pergunta: "Qual seu nível de inteligencia?",
        respostas: [
            { texto: "Burro (menos de 100 QI)"},
            { texto: "Inteligente (mais de 120 QI)"},
            { texto: "Na media (100 QI)"},
        ]
    },
    {
        pergunta: "Você protege aqueles ao seu redor?",
        respostas: [
            { texto: "Só importa a mim mesmo"},
            { texto: "Apenas aqueles mais próximos"},
            { texto: "Tenho prazer em ver o bem dos outros"},
        ]
    },
    {
        pergunta: "Você corre atrás dos seus sonhos?",
        respostas: [
            { texto: "Conquisto eles através do esforço"},
            { texto: "Se vier ao aca"},
            { texto: "Tenho prazer em ver o bem dos outros"},
        ]
    }
]

function trocarSelecionado(botao){
    botao.addEventListener("click", ()=>{
        if(opSelecionado == 0){
            botao.classList.add('selecionado')
            opSelecionado = 1
        }else{
            opcoes.forEach((botao) =>{
                botao.classList.remove('selecionado')
            })
            botao.classList.add('selecionado')
        }
        console.log(botao.value)
    })
}

function resetaForm(){
    opcoes.forEach((botao) =>{
        botao.classList.remove('selecionado')
    })
}

function estruturarQuestoes(){
    if(numQuestao >= perguntas.length){
        alert("Acabaram as questões")
        return
    }
    
    
    pergunta.classList.add('cooldown1')
    opcoes.forEach((opcao) =>{
        opcao.classList.add('cooldown')
    })
    
    setTimeout(()=>{
        pergunta.innerHTML = perguntas[numQuestao].pergunta
        opcoes.forEach((opcao, index) =>{
            opcao.value = perguntas[numQuestao].respostas[index].texto
        })

        pergunta.classList.remove('cooldown1')
        opcoes.forEach((opcao) =>{
            opcao.classList.remove('cooldown')
        })

        numQuestao++
    }, 1000)
    
    console.log("Quantidade de perguntas: " + perguntas.length)
    console.log("Número da questão: " + numQuestao)
}

enviarBtn.addEventListener("click", ()=>{
    // numQuestao++
    resetaForm()
    estruturarQuestoes()
})

opcoes.forEach((botao) => {
    trocarSelecionado(botao)
})


estruturarQuestoes()