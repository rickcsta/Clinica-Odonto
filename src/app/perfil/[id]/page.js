import db from "../../lib/db";
import ClienteView from "./ClienteView"; 

export default async function PerfilPage({ params }) {
  const cliente = await db.query("SELECT * FROM cliente WHERE id_cliente = " + params.id);
  const dados = cliente.rows[0];

  return <ClienteView cliente={dados} />;
}