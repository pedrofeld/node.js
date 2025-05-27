function buscarDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Dados carregados com async...await");
    }, 1000);
  });
}

async function executar() {
  try {
    const dados = await buscarDados();
    console.log(dados);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

executar();

console.log("Log imediato (async/await)");
