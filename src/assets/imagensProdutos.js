const modulos = import.meta.glob("./*.png", { eager: true, import: "default" });

const imagensProdutos = {};
for (const caminho in modulos) {
  const nomeArquivo = caminho.replace("./", "");
  imagensProdutos[nomeArquivo] = modulos[caminho];
}

export default imagensProdutos;
