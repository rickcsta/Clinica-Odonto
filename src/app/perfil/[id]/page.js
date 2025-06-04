import style from "./page.module.css";
import db from "../../lib/db"

export default async ({params}) => {
    const cliente = await db.query("select * from cliente where id_cliente = "+params.id);
 return (<>
    <div className={style.geral}>
     <div className={style.container}>
        <div className={style.cima}><h1>{cliente.rows[0].nome}</h1></div>

        <div className={style.baixo}>
        <div className={style.left}>
            <div className={style.ftdeperfil}></div>
            <a href={`/dados/${cliente.rows[0].id_cliente}`}><p>Seus Dados</p></a>
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


