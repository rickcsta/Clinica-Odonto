import db from "../../../lib/db";
import ClienteView from "./ClienteView"; 

export default async function PerfilPage({ params }) {
  const paciente = await db.query("SELECT * FROM paciente WHERE id_paciente = " + params.id);
  const dadosPaciente = paciente.rows[0];

  const consulta = await db.query("SELECT * FROM consulta WHERE id_paciente = " + params.id);
  const infoConsulta = consulta.rows[0];

  return <ClienteView paciente={dadosPaciente} consulta={infoConsulta} />;
}