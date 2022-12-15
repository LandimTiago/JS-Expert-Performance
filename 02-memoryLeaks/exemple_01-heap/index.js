const itens = [];

while (true) itens.push(itens);
// vai executar infinitamente inserindo arrays vazios dentro do itens

// rodando esse comanda limitamos o tamanho da memoria (64mb) e vemos quebrar mais rapido que aguardar no tempo normal
// node --max-old-space-size=64 index.js

// <--- JS stacktrace --->
// FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
