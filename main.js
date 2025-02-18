let idJogando = '1'

const jogos = [
    {
        id: '1',
        inicio: [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"]
        ],
    },
]

const jogoValido = (board) => {
    const boardReducer = board.reduce((acc, cur, index) => {
        acc.linhas.push(cur.filter(i=>i!=='.'))

        for(let i = 0; i < 9; i++) {
            if(cur[i] !== '.') acc.colunas[i].push(cur[i])    
        }

        function addItensNoBlocoPorLinha(indexBloco, inicioSlice, fimSlice) {
            acc.blocos[indexBloco].push(
                ...cur.slice(inicioSlice, fimSlice).filter(i=>i!=='.')
            )
        }
                        
        function addItensNoBloco(indexBlocoLinha1, indexBlocoLinha2, indexBlocoLinha3) {
            addItensNoBlocoPorLinha(indexBlocoLinha1, 0, 3)
            addItensNoBlocoPorLinha(indexBlocoLinha2, 3, 6)
            addItensNoBlocoPorLinha(indexBlocoLinha3, 6, 9)
        }

        if(index < 3) addItensNoBloco(0, 1, 2)
        if(index > 2 && index < 6) addItensNoBloco(3, 4, 5)
        if(index > 5) addItensNoBloco(6, 7, 8)

        return acc
    }, {
        linhas: [],
        colunas: [[],[],[],[],[],[],[],[],[]],
        blocos: [[],[],[],[],[],[],[],[],[]]
    })

    const boardConcatenado = [
        ...boardReducer.linhas,
        ...boardReducer.colunas,
        ...boardReducer.blocos
    ]

    return boardConcatenado.every(i=>new Set(i).size === i.length)
}

const renderBoard = (jogando) => {
    const board = document.querySelector('.board')
    
    jogando.inicio.forEach((linha, indexLinha) => {
        const linhaDoBoard = board.children[indexLinha]
        
        linha.forEach((celula, indexCelula) => {
            if(celula === '.') return
            linhaDoBoard.children[indexCelula].textContent = celula
        })
    })
    
}

const carregaDicas = () => {
    const jogando = jogos.find(({ id }) => id === idJogando)

    if(!jogando) return alert('Jogo não encontrado')
    if(!jogoValido(jogando.inicio)) return alert('Jogada invalida')

    renderBoard(jogando)
}

window.addEventListener('load', carregaDicas)
