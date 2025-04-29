import db from "../../lib/db"

export default async ({params}) => {
    const usuario = await db.query("select * from usuario where id = "+params.id);
 return (<>
    <h1>Pagina Paciente: {usuario.rows[0].nome}</h1>
    <p>O paciente tem {usuario.rows[0].idade}</p>

 </>);
}