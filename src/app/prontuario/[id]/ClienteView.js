import style from "./page.module.css";

export default function ClienteView({ paciente, consulta }) {
  return (
    <>
    <div className={style.geral}>
           <div>
                <h2>Historico de Consultas</h2>
                        <table className={style.tabela}>
                            <thead>
                            <tr>
                                <th>Data</th>
                                <th>Procedimento</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                                {consulta.map((item, index) => (
                                <tr key={index}>
                                    <td>{new Date(item.data).toLocaleDateString()} às {item.hora ?? '---'}</td>
                                    <td>{item.procedimento}</td>
                                    <td>{item.status}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
            </div>
    </div>
    </>
  )
}

