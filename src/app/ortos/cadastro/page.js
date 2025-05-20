import style from "./page.module.css";

export default () => {
  return (
    <>
     <div className={style.cadastro}>
        <div className={style.quadrado}>
          <h1 className="titulo">Cadastre-se</h1>
            <div className={style.entradas}>
              <input className="input" type="text" placeholder="Nome" />
              <input className="input" type="text" placeholder="CPF" />  
              <input className="input" type="text" placeholder="Data de Nascimento" /> 
              <input className="input" type="text" placeholder="Endereço" /> 
              <input className="input" type="text" placeholder="Contato" />
              <input className="input" type="text" placeholder="Senha" />
              <p>Ja tem uma conta? Entre</p>       
              <button className="botao" type="button" placeholder="Agendar">Criar</button>
            </div>
        </div>
      </div>
    </>
  );
};

