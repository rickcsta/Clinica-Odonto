import style from "./page.module.css";
import db from "../../../lib/db"

export default async ({params}) => {
    const cliente = await db.query("select * from cliente where id_cliente = "+params.id);
 return (<>
    <div className={style.geral}>
        <div className={style.container}>
            <div className={style.ftdeperfil}></div>
            <div className={style.dados}>
              <h1>Nome: {cliente.rows[0].nome}</h1>
              <h1>CPF: {cliente.rows[0].cpf}</h1>
              <h1>Data de Nascimento: {new Date(cliente.rows[0].nascimento).toLocaleDateString()}</h1>
              <h1>Endereço: {cliente.rows[0].endereco}</h1>
              <h1>Contato: {cliente.rows[0].contato}</h1>
              <h1>Senha: {cliente.rows[0].senha}</h1>
            </div>
        </div>
    </div>
    </>
  )
}