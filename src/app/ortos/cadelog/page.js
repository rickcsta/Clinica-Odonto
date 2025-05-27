import style from "./page.module.css";
import Link from 'next/link'

export default () => {
  return (
    <>
     <div className={style.cadastro}>
        <div className={style.containercad}>
          <h1 className="titulo">Cadastre-se</h1>
            <div className={style.entradas}>
              <input className="input" type="text" placeholder="Nome" />
              <input className="input" type="text" id="cpf" placeholder="CPF" />  
              <input className="input" type="date" placeholder="Data de Nascimento" /> 
              <input className="input" type="text" placeholder="Endereço" /> 
              <input className="input" type="tel" placeholder="Contato" />
              <input className="input" type="password" placeholder="Senha" />
              <button className="botao" type="button" placeholder="Agendar">Criar</button>
            </div>
        </div>
      </div>

      <div className={style.login}>
        <div className={style.containerlog}>
          <h1 className="titulo">Login</h1>
            <div className={style.entradas}>
              <input className="input" type="text" placeholder="CPF" />   
              <input className="input" type="text" placeholder="Senha" />
              <Link href="#"><p>Esqueceu sua senha?</p></Link>      
              <button className="botao" type="button" placeholder="Agendar">Criar</button>
            </div>
        </div>
      </div>
    </>
  );
};

