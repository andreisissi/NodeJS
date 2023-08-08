const readline = require('readline');
const fs = require('fs');
const { EventEmitter } = require('events');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ee = new EventEmitter(); 
    
rl.question('Informe o caminho do arquivo: ', function(file) {
   runFile(file)
});
    function runFile(file) {
    const startTime = process.hrtime();

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro na execução.\n\n', err);
            rl.close();
        } else {
        let soma = 0, textLine = 0, numberLine = 0;

        const linhas = data.trim().split('\n');
        const array = ((novoArray) => {
            if (!isNaN(novoArray)) {
                soma += Number(novoArray)
                numberLine++
            } else {
                textLine += 1
            }
        });
        linhas.map((linhas) => array(linhas));

        const endTime = process.hrtime(startTime);
        
        ee.emit('resumo', {
            soma,
            numberLine,
            textLine,
            endTime,
            });
    }});
};
    ee.on('resumo', (resumo) => {
        console.log('\nQuantidade de linhas com números: ', resumo.numberLine);
        console.log('Soma dos números do arquivo: ', resumo.soma);
        console.log('Quantidade de linhas com texto: ', resumo.textLine);
        console.log('Tempo de execução: ', resumo.endTime[0] + resumo.endTime[1] / 1e9, ' segundos');
        novaExecucao();
    });
function novaExecucao() {
    rl.question('\nDeseja executar novamente? [S/N]: ', (resposta) => {
       if (resposta === 'S' || resposta === 's') {
           rl.question('\nInforme o caminho do arquivo: ', (file) => {
               runFile(file);
           })
       } else if (resposta === 'N' || resposta === 'n') {
           rl.close();
       };
    });
};