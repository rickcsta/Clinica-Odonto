import style from "./page.module.css";
import Link from 'next/link'

export default () => {
  return (
    <>
    <div className={style.geral}>
     <div className={style.container}>
        <div className={style.cima}><h1>Perfil</h1></div>

        <div className={style.baixo}>
        <div className={style.left}>
            <div className={style.ftdeperfil}></div>
            <p>Lorem Ipsun Silva</p>
        </div>
         <div className={style.rigth}>
            <button className={style.button}>Marcar Consulta</button>
            <button className={style.button}>Ver Prescrições</button>
            <button className={style.button}>Ver Prontuários</button>
         </div>
        </div>
      </div>
    </div>
    </>
  );
};

