import style from "./page.module.css";
import Link from 'next/link'

export default () => {
  return (
    <>
     <div className={style.cadastro}>
        <div className={style.quadrado}>
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

