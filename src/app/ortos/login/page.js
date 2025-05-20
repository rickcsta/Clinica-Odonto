import style from "./page.module.css";

export default () => {
  return (
    <>
     <div className={style.cadastro}>
        <div className={style.quadrado}>
          <h1 className="titulo">Login</h1>
            <div className={style.entradas}>
              <input className="input" type="text" placeholder="CPF" />   
              <input className="input" type="text" placeholder="Senha" />
              <p>Esqueceu sua senha?</p>       
              <button className="botao" type="button" placeholder="Agendar">Criar</button>
            </div>

        </div>
      </div>
    </>
  );
};

