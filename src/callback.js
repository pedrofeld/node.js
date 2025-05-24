function buscarDados(callback) {
  setTimeout(() => {
    callback(null, "Dados carregados com callback");
  }, 2000);
}

buscarDados((erro, dados) => {""
  if (erro) {
    console.error("Erro:", erro);
  } else {
    console.log(dados);
  }
});

console.log("Log imediato (callback)");