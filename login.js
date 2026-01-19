import { supabase } from "./supabase.js";
window.login = async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const { data } = await supabase.from("admins").select("*").eq("email",email).eq("senha",senha);
  if(data.length>0){
    localStorage.setItem("admin","logado");
    window.location.href="admin.html";
  } else {
    alert("Email ou senha incorretos!");
  }
}