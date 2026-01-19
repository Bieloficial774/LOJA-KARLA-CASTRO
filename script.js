import { supabase } from "./supabase.js";
const whatsappNumber = "5511999999999";
async function atualizarLista() {
  const { data: produtos } = await supabase.from("produtos").select("*").order("id",{ascending:true});
  const lista = document.getElementById("produtos-lista");
  lista.innerHTML = "";
  produtos.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto-card";
    div.innerHTML = `
      <img src="${produto.imagem || 'assets/default.png'}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <p>Estoque: ${produto.estoque>0?produto.estoque:'<span style="color:red">Esgotado</span>'}</p>
      <button ${produto.estoque===0?'disabled':''} onclick="comprarProduto(${produto.id})">Comprar</button>
    `;
    lista.appendChild(div);
  });
}
window.comprarProduto = async (id) => {
  const { data: produto } = await supabase.from("produtos").select("*").eq("id",id).single();
  if(produto.estoque<=0) return alert("Produto esgotado!");
  await supabase.from("produtos").update({estoque:produto.estoque-1}).eq("id",id);
  const mensagem = encodeURIComponent(`Olá, quero comprar o produto: ${produto.nome}`);
  window.open(`https://wa.me/${whatsappNumber}?text=${mensagem}`,"_blank");
  atualizarLista();
}
atualizarLista();