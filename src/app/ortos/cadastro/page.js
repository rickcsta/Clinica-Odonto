import style from "./page.module.css";

export default () => {
  return (
    <>
     <div className={style.cadastro}>
        <div className={style.quadrado}>
          <h1 className="titulo">Cadastre-se</h1>
            <div className={style.entradas}>
              <input className="input" type="text" placeholder="Nome" />
              <input className="input" type="text" id="cpf" placeholder="CPF" />  
              <input className="input" type="date" placeholder="Data de Nascimento" /> 
              <input className="input" type="text" placeholder="Endereço" /> 
              <input className="input" type="tel" placeholder="Contato" />
              <input className="input" type="password" placeholder="Senha" />
             <a href="/ortos/login"><p>Ja tem uma conta? Entre</p>       </a> 
              <button className="botao" type="button" placeholder="Agendar">Criar</button>
            </div>
        </div>
      </div>
    </>
  );
};

