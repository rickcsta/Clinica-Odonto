'use client'
import { useState } from "react";
import style from "./page.module.css";
import Calendario from "../../../components/reactDatePicker";

export default function ClienteView({ cliente }) {
  const [agendarConsulta, setAgendarConsulta] = useState(false);


  function fecharModal() {
    setAgendarConsulta(false);
  }

  return (
    <div className={style.geral}>
      <div className={style.container}>
        <div className={style.cima}>
            <div className={style.esquerda}>
            <div className={style.ftdeperfil}></div>
              <h2>{cliente.nome}</h2>
              <p>{cliente.contato}</p>
              <p>{new Date(cliente.nascimento).toLocaleDateString()}</p> {/*fazer calculo e colocar idade*/}
            </div>
            <div className={style.direita}>
              <h1>Consulta Agendada - xx/xx/xx</h1> {/* colocar consultas aqui */}
              <button className={style.botao}>Alterar data ou hora</button>
              <button className={style.botao}>Cancelar</button>
            </div>  
        </div>

          <div className={style.baixo}>
            <div className={style.esquerda}>
              <p>xx</p> {/* colocar consultas aqui */}
              <p>Consultas Realizadas</p>
              <button className={style.botao}>Ver Prontuários</button>
              <button className={style.botao} onClick={() => setAgendarConsulta(true)}>Nova Consulta</button>
            </div>
            <div className={`${style.direita} ${style.direitaBaixo}`}>
              <h3>Observações</h3>
              <p>alergico adfhefueufh</p>
              <p>alergico adfhfgfdwsfh</p>
            </div>
        </div>
      </div>

       {agendarConsulta && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h2>Agendar Consulta</h2>
            <Calendario className={style.datahora} placeholder="Escolher data e hora" mode="schedule" />
            <button onClick={fecharModal} className={style.fechar}>Fechar</button>
          </div>
        </div>
      )}

    </div>
  );
}