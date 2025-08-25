import db from "../../../lib/db";
import ClienteView from "./ClienteView"; 

export default async function ProntuarioPage({ params }) {
  const paciente = await db.query("SELECT * FROM paciente WHERE id_paciente = " + params.id);
  const dadosPaciente = paciente.rows[0];

   const consulta = await db.query("SELECT * FROM consulta WHERE id_paciente = $1 ORDER BY data DESC, hora DESC", [params.id]);
   const dadosConsulta = consulta.rows;

  return <ClienteView paciente={dadosPaciente} consulta={dadosConsulta}/>;
}