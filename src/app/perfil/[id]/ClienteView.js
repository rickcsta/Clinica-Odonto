'use client'
import { useState } from "react";
import style from "./page.module.css";
import Calendario from "../../../components/reactDatePicker";

export default function ClienteView({ cliente }) {

  return (
    <div className={style.geral}>
      <div className={style.container}>
        <div className={style.cima}></div>

        <div className={style.baixo}>
          <div className={style.left}>
            <div className={style.ftdeperfil}></div>
              <p>{cliente.nome}</p>
              <p>{cliente.contato}</p>
              <p>{new Date(cliente.nascimento).toLocaleDateString()}</p> {/*fazer calculo e colocar idade*/}
          </div>

          <div className={style.rigth}>
            <button className={style.button}>Marcar Consulta</button>
            <button className={style.button}>Ver Prescrições</button>
            <button className={style.button}>Ver Prontuários</button>
          </div>
        </div>
      </div>
    </div>
  );
}