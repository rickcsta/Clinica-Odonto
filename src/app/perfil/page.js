import style from "./page.module.css";
import db from "../lib/db"

export default async () => {
    const usuario = await db.query("select * from cliente where id_cliente = '2' ")
 return (<>
 {usuario.rows.map( a => (
    <div className={style.geral}>
     <div className={style.container}>
        <div className={style.cima}><h1>{a.nome}</h1></div>

        <div className={style.baixo}>
        <div className={style.left}>
            <div className={style.ftdeperfil}></div>
            <a href={`./perfil/${a.id_cliente}`}><p>Seus Dados</p></a>
        </div>
         <div className={style.rigth}>
            <button className={style.button}>Marcar Consulta</button>
            <button className={style.button}>Ver Prescrições</button>
            <button className={style.button}>Ver Prontuários</button>
         </div>
        </div>
      </div>
    </div>
    ) 
  )
}
    </>
  );
};

