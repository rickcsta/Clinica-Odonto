'use client'
import { useState } from "react";
import style from "./page.module.css";
import Calendario from "../../../components/reactDatePicker";

export default function ClienteView({ paciente, consulta }) {

  {/* agendar */}

  const [motivo, setMotivo] = useState('')
  const [dataHora, setDataHora] = useState('')

  const handleAgendar = async (e) => {
    e.preventDefault()

    const data = dataHora.toISOString().split('T')[0]
    const hora = dataHora.toTimeString().slice(0, 5)
    const consulta = { motivo, dataHora }

    try {
      const response = await fetch('/api/consultas/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_paciente: paciente.id_paciente,
          data,
          hora,
          motivo
        }),
      })

      const json = await response.json()
      if (response.ok) {
        alert('Consulta agendada com sucesso!')
        setMotivo('')
        setDataHora('')
        fecharModal()
        window.location.reload();
      } else {
        alert(json.error || 'Erro ao agendar')
      }
    } catch (error) {
      console.error('Erro ao agendar:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  {/* modal */}

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
              <h3>{consulta?.data ? `Proxima consulta: ${new Date(consulta.data).toLocaleDateString()} as ${consulta.hora?.substring(0, 5)}`: "Você não tem consultas marcadas no momento"} </h3>
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
               
              <form onSubmit={handleAgendar}>
                <input className={style.input} type="text" title="Qual seu sintoma?" placeholder="Qual seu sintoma?" value={motivo} onChange={(e) => setMotivo(e.target.value)} required />
                <Calendario className={style.input} selectedDate={dataHora} onDateChange={setDataHora} placeholder="Data e hora da consulta" mode="schedule" />
                <button className={style.fechar} type="submit">Confirmar</button>
              </form>

          </div>
        </div>
      )}

      {verProntuario && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <div className={style.containermodal}>
              <h2>Prontuários</h2>
              <button onClick={fecharModal} className={style.fechar}>Fechar</button>
            </div>
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