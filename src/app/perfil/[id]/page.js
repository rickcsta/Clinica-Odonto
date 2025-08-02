import db from "../../../lib/db";
import ClienteView from "./ClienteView"; 

export default async function PerfilPage({ params }) {
  const paciente = await db.query("SELECT * FROM paciente WHERE id_paciente = " + params.id);
  const dadosPaciente = paciente.rows[0];

  const consulta = await db.query("SELECT * FROM consulta WHERE id_paciente = $1 AND status != 'cancelada' ORDER BY data ASC LIMIT 1", [params.id] );
  const infoConsulta = consulta.rows[0];

  const historico = await db.query("SELECT COUNT(*) AS total FROM consulta WHERE id_paciente = $1 AND status IN ('realizada', 'cancelada')", [params.id] );
  const infoHistorico = historico.rows[0];

  return <ClienteView paciente={dadosPaciente} consulta={infoConsulta} historico={infoHistorico} />;
}