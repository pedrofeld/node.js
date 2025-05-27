function buscarDados() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Dados carregados com then...catch");
    }, 1000);
  });
}

buscarDados()
  .then((dados) => {
    console.log(dados);
  })
  .catch((erro) => {
    console.error("Erro:", erro);
  });

console.log("Log imediato (then...catch)");