import style from "./page.module.css";

export default () => {
  return (
    <>
     <div className={style.consulta}>
        <div className={style.quadrado}>
          <h1 className="titulo">Consulte-se</h1>
            <div className={style.entradas}>
              <input className="input" type="text" placeholder="Nome" />
              <input className="input" type="text" placeholder="CPF" />  
              <input className="input" type="text" placeholder="Data de Nascimento" /> 
              <input className="input" type="text" placeholder="Endereço" /> 
              <input className="input" type="text" placeholder="Contato" /> 
              <input className="input" type="text" placeholder="Procedimento(s) Desejado(s)" /> 
              <input className="input" type="text" placeholder="Escreva sua queixa" /> 
              <input className="input" type="datetime-local" placeholder="Data da Consulta" />
   
              <button className="botao" type="button" placeholder="Agendar">Agendar</button>
            </div>

        </div>
      </div>
    </>
  );
};

