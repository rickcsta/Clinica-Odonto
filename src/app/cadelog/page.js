import style from "./page.module.css";
import Link from 'next/link'

export default () => {
  return (
    <>
    <div className={style.container}>
     <div className={style.cadastro}>
        <div className={style.containercad}>
          <h1 className="titulo">Cadastre-se</h1>
            <div className={style.entradas}>
              <input className={style.input} type="text" placeholder="Nome" required/>
              <input className={style.input}  type="number" id="cpf" placeholder="CPF" required/>  
              <input className={style.input}  type="date" placeholder="Data de Nascimento" required/> 
              <input className={style.input}  type="text" placeholder="Endereço" required/> 
              <input className={style.input}  type="number" placeholder="Contato" required/>
              <input className={style.input}  type="password" placeholder="Senha" required/>
              <button className={style.botao} type="button" placeholder="Agendar">Criar</button>
            </div>
        </div>
      </div>

      <div className={style.login}>
        <div className={style.containerlog}>
          <h1 className="titulo">Login</h1>
            <div className={style.entradas}>
              <input className={style.input}  type="text" placeholder="CPF" required/>   
              <input className={style.input}  type="text" placeholder="Senha" required/>
              <Link href="#"><p>Esqueceu sua senha?</p></Link>      
              <button className={style.botao} type="button" placeholder="Agendar">Entrar</button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

