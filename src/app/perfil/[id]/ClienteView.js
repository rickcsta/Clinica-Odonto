'use client'
import { useState } from "react";
import style from "./page.module.css";
import Calendario from "../../../components/reactDatePicker";

export default function ClienteView({ paciente }) {
  const [agendarConsulta, setAgendarConsulta] = useState(false);
  const [verProntuario, setVerProntuario] = useState(false);
  const [editarConsultas, setEditarConsultas] = useState(false);

  function fecharModal() {
    setAgendarConsulta(false);
    setVerProntuario(false);
    setEditarConsultas(false);
  }

  return (
    <div className={style.geral}>
      <div className={style.container}>
        <div className={style.cima}>
            <div className={style.esquerda}>
            <div className={style.ftdeperfil}></div>
              <h2>{paciente.nome}</h2>
              <p>{new Date(paciente.nascimento).toLocaleDateString()}</p> {/*fazer calculo e colocar idade*/}
            </div>
            <div className={style.direita}>
              <h1>Consulta Agendada - xx/xx/xx</h1> {/* colocar consultas aqui */}
              <button className={style.botao} onClick={() => setEditarConsultas(true)}>Editar Consultas</button>
            </div>  
        </div>

          <div className={style.baixo}>
            <div className={style.esquerda}> 
              <p>xx - Consultas Realizadas</p> {/* colocar consultas realizadas aqui */}
              <button className={style.botao} onClick={() => setVerProntuario(true)}>Ver Prontuários</button>
              <button className={style.botao} onClick={() => setAgendarConsulta(true)}>Nova Consulta</button>
            </div>
            <div className={`${style.direita} ${style.direitaBaixo}`}>
              <h3>Observações</h3>
              <p>alergico adfhefueufh</p>
              <p>alergico adfhfgfdwsfh</p>
            </div>
        </div>
      </div>

      {/* modal, janelas de sobreposição */}

       {agendarConsulta && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h2>Agendar Consulta</h2>
            <Calendario className={style.datahora} placeholder="Escolher data e hora" mode="schedule" />
            <button onClick={fecharModal} className={style.fechar}>Fechar</button>
          </div>
        </div>
      )}

      {verProntuario && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h2>Prontuários</h2>
            <button onClick={fecharModal} className={style.fechar}>Fechar</button>
          </div>
        </div>
      )}

      {editarConsultas && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h2>Editar Consultas</h2>
            <button onClick={fecharModal} className={style.fechar}>Fechar</button>
          </div>
        </div>
      )}

    </div>
  );
}