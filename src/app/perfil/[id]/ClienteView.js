'use client'
import { useState } from "react";
import style from "./page.module.css";
import Calendario from "../../../components/reactDatePicker";

export default function ClienteView({ paciente, consulta, historico }) {

  // Estados do agendamento, e editar
  const [motivo, setMotivo] = useState('');
  const [dataHora, setDataHora] = useState('');

  // Estados dos modais
  const [agendarConsulta, setAgendarConsulta] = useState(false);
  const [verProntuario, setVerProntuario] = useState(false);
  const [editarConsultas, setEditarConsultas] = useState(false);
  const [showConfirmacaoValores, setShowConfirmacaoValores] = useState(false);

  // Fechar todos os modais
  function fecharModal() {
    setAgendarConsulta(false);
    setVerProntuario(false);
    setEditarConsultas(false);
    setShowConfirmacaoValores(false);
  }

  // agendar
  const handleAgendar = async () => {
    const data = dataHora.toISOString().split('T')[0];
    const hora = dataHora.toTimeString().slice(0, 5);

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
      });

      const json = await response.json();
      if (response.ok) {
        alert('Consulta agendada com sucesso!');
        setMotivo('');
        setDataHora('');
        fecharModal();
        window.location.reload();
      } else {
        alert(json.error || 'Erro ao agendar');
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  // editar
  const handleEditarConsulta = async () => {
  if (!consulta?.id_consulta || !dataHora) return alert("Dados incompletos.");

  const data = dataHora.toISOString().split("T")[0];
  const hora = dataHora.toTimeString().slice(0, 5);

  try {
    const response = await fetch("/api/consultas/editar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_consulta: consulta.id_consulta, data, hora }),
    });

    const json = await response.json();

    if (response.ok) {
      alert("Consulta atualizada com sucesso!");
      fecharModal();
      window.location.reload();
    } else {
      alert(json.error || "Erro ao editar consulta.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
};

// cancelar
const handleCancelarConsulta = async () => {
  try {
    const response = await fetch('/api/consultas/cancelar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_consulta: consulta.id_consulta }),
    });

    const json = await response.json();
    if (response.ok) {
      alert("Consulta cancelada com sucesso!");
      fecharModal();
      window.location.reload();
    } else {
      alert(json.error || "Erro ao cancelar consulta.");
    }
  } catch (error) {
    console.error("Erro ao cancelar:", error);
    alert("Erro de conexão com o servidor.");
  }
};

  return (
    <div className={style.geral}>
      <div className={style.container}>
        <div className={style.cima}>
          <div className={style.esquerda}>
            <div className={style.ftdeperfil}></div>
            <h2>{paciente.nome}</h2>
            <p>{new Date(paciente.nascimento).toLocaleDateString()}</p> {/* cálculo de idade pode ser feito depois */}
          </div>
          <div className={style.direita}>
            <h3>
              {consulta?.data
                ? `Próxima consulta: ${new Date(consulta.data).toLocaleDateString()} às ${consulta.hora?.substring(0, 5)}`
                : "Você não tem consultas marcadas no momento"}
            </h3>
            <button className={style.botao} onClick={() => setEditarConsultas(true)}>Editar Consultas</button>
          </div>
        </div>

        <div className={style.baixo}>
          <div className={style.esquerda}>
           <p>Historico de consultas - {Number(historico.total) || 0} </p>
            <button className={style.botao} onClick={() => setVerProntuario(true)}>Ver Prontuários</button>
            <button className={style.botao} onClick={() => setAgendarConsulta(true)}>Nova Consulta</button>
          </div>
          <div className={`${style.direita} ${style.direitaBaixo}`}>
            <h3>Observações</h3>
            <p>alérgico a adfhefueufh</p>
            <p>alérgico a adfhfgfdwsfh</p>
          </div>
        </div>
      </div>

      {/* Modal: Agendar Consulta */}
      {agendarConsulta && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h3>Agendar Consulta</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowConfirmacaoValores(true); 
            }}>
              <input className={style.input} type="text" title="Qual seu sintoma?" placeholder="Qual seu sintoma?" value={motivo} onChange={(e) => setMotivo(e.target.value)} required/>
              <Calendario className={style.input} selectedDate={dataHora} onDateChange={setDataHora} placeholder="Data e hora da consulta" mode="schedule"/>
              <button className={style.botaoModal} type="submit">Confirmar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmação de valores */}
      {showConfirmacaoValores && (
        <div className={style.modalOverlay} onClick={() => setShowConfirmacaoValores(false)}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h3>IMPORTANTE!</h3>
            <p>O pagamento no valor de R$ 00,00 será feito presencialmente no dia da consulta. Ao finalizar, você concorda com essa condição.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button onClick={() => setShowConfirmacaoValores(false)} className={style.botaoModal}>Voltar</button>
              <button onClick={handleAgendar} className={style.botaoModal}>Finalizar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Prontuário */}
      {verProntuario && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <div className={style.containermodal}>
              <h2>Prontuários</h2>
              <button onClick={fecharModal} className={style.botaoModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Editar Consultas */}
      {editarConsultas && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h3>Editar Consulta</h3>
            <form onSubmit={(e) => {e.preventDefault(); handleEditarConsulta();}}>
              <Calendario className={style.input} selectedDate={dataHora} onDateChange={setDataHora} placeholder="Nova data e hora" mode="schedule" />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className={style.botaoModal} type="submit">Salvar Alterações</button>
                <button onClick={handleCancelarConsulta} className={style.botaoModal}>Cancelar Consulta</button>
                <button onClick={fecharModal} className={style.botaoModal}>Fechar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
