const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");
const data = document.getElementById("data");
const inserirBtn = document.getElementById("inserir");
const listaEntradas = document.getElementById("lista-entradas");
const listaSaidas = document.getElementById("lista-saidas");
const saldoEl = document.getElementById("saldo");

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function atualizarTela() {
  listaEntradas.innerHTML = "";
  listaSaidas.innerHTML = "";
  let saldo = 0;

  transacoes.forEach((t, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${t.descricao}</strong>
      ${t.tipo === "entrada" 
        ? `<span style="color:green;">+ R$ ${t.valor.toFixed(2)}</span>` 
        : `<span style="color:red;">- R$ ${t.valor.toFixed(2)}</span>`}
      <br><small>${t.data}</small>
      <button onclick="remover(${index})">❌</button>
    `;

    if (t.tipo === "entrada") {
      listaEntradas.appendChild(li);
      saldo += t.valor;
    } else {
      listaSaidas.appendChild(li);
      saldo -= t.valor;
    }
  });

  saldoEl.textContent = `R$ ${saldo.toFixed(2)}`;
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function inserirTransacao() {
  if (descricao.value === "" || valor.value === "" || data.value === "")//alertar para preencher todos os campos 
    return alert("Preencha todos os campos!");

  transacoes.push({
    descricao: descricao.value,
    valor: parseFloat(valor.value),
    tipo: tipo.value,
    data: data.value.split("-").reverse().join("/"), // formatar data
  });

  descricao.value = "";
  valor.value = "";
  data.value = "";
  atualizarTela();
}

function remover(index) {
  transacoes.splice(index, 1);
  atualizarTela();
}

inserirBtn.addEventListener("click", inserirTransacao);
atualizarTela();
