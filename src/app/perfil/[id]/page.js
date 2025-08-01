import db from "../../../lib/db";
import ClienteView from "./ClienteView"; 

export default async function PerfilPage({ params }) {
  const paciente = await db.query("SELECT * FROM paciente WHERE id_paciente = " + params.id);
  const dados = paciente.rows[0];

  return <ClienteView paciente={dados} />;
}