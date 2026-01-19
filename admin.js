import { supabase } from "./supabase.js";
if(localStorage.getItem("admin")!=="logado") window.location.href="login.html";
async function carregarProdutos(){
  const { data: produtos } = await supabase.from("produtos").select("*").order("id",{ascending:true});
  const lista = document.getElementById("produtos-admin");
  lista.innerHTML="";
  produtos.forEach(prod => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${prod.nome}</strong> - R$ ${prod.preco} - Estoque: ${prod.estoque}
      <button onclick="editarProduto(${prod.id})">Editar</button>
      <button onclick="deletarProduto(${prod.id})">Deletar</button>
    `;
    lista.appendChild(div);
  });
}
window.adicionarProduto = async () => {
  const nome=document.getElementById("nomeProduto").value;
  const descricao=document.getElementById("descricaoProduto").value;
  const preco=parseFloat(document.getElementById("precoProduto").value);
  const estoque=parseInt(document.getElementById("estoqueProduto").value);
  const imagem=document.getElementById("imagemProduto").value;
  if(!nome||!descricao||isNaN(preco)||isNaN(estoque)) return alert("Preencha tudo!");
  await supabase.from("produtos").insert([{nome,descricao,preco,estoque,imagem}]);
  carregarProdutos();
}
window.deletarProduto = async (id) => { await supabase.from("produtos").delete().eq("id",id); carregarProdutos(); }
window.editarProduto = async (id) => {
  const novoNome=prompt("Novo nome:");
  const novaDescricao=prompt("Nova descrição:");
  const novoPreco=parseFloat(prompt("Novo preço:"));
  const novoEstoque=parseInt(prompt("Novo estoque:"));
  if(!novoNome||!novaDescricao||isNaN(novoPreco)||isNaN(novoEstoque)) return;
  await supabase.from("produtos").update({nome:novoNome,descricao:novaDescricao,preco:novoPreco,estoque:novoEstoque}).eq("id",id);
  carregarProdutos();
}
carregarProdutos();