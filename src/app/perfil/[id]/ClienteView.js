'use client'
import { useState } from "react";
import style from "./page.module.css";

export default function ClienteView({ cliente }) {
  const [mostrarConsulta, setMostrarConsulta] = useState(false);
  const [mostrarPrescricao, setMostrarPrescricao] = useState(false);
  const [mostrarProntuario, setMostrarProntuario] = useState(false);

  function fecharModal() {
    setMostrarConsulta(false);
    setMostrarPrescricao(false);
    setMostrarProntuario(false);
  }

  return (
    <div className={style.geral}>
      <div className={style.container}>
        <div className={style.cima}>
          <h1>Olá, {cliente.nome}</h1>
        </div>

        <div className={style.baixo}>
          <div className={style.left}>
            <div className={style.ftdeperfil}></div>
            <a href={`/dados/${cliente.id_cliente}`}>
              <p>Seus Dados</p>
            </a>
          </div>

          <div className={style.rigth}>
            <button className={style.button} onClick={() => setMostrarConsulta(true)}>
              Marcar Consulta
            </button>
            <button className={style.button} onClick={() => setMostrarPrescricao(true)}>Ver Prescrições</button>
            <button className={style.button} onClick={() => setMostrarProntuario(true)}>Ver Prontuários</button>
          </div>
        </div>
      </div>

      {/*modal consulta*/}
      {mostrarConsulta && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h2>Agende sua consulta</h2>
            
            <button onClick={fecharModal} className={style.fechar}>Fechar</button>
          </div>
        </div>
      )}

      {/*modal prescição*/}
      {mostrarPrescricao && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h2>Prescição medica</h2>
            <button onClick={fecharModal} className={style.fechar}>Fechar</button>
          </div>
        </div>
      )}

      {/*modal prontuario*/}
      {mostrarProntuario && (
        <div className={style.modalOverlay} onClick={fecharModal}>
          <div className={style.modal} onClick={e => e.stopPropagation()}>
            <h2>Aqui esta seu prontuario</h2>
            <button onClick={fecharModal} className={style.fechar}>Fechar</button>
          </div>
        </div>
      )}

    </div>
  );
}