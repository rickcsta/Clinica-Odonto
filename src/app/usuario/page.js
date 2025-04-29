import db from "../lib/db"
export default async () => {
    const usuario = await db.query("select * from usuario")
 return (<>
    <h1>Lista de Pacientes</h1>
    <div>
      {
         usuario.rows.map( 
            a => (
               <div>
                  {a.nome} é paciente da ortos e tem {a.idade} anos
               </div>
            ) 
         )
      }
   </div>
 </>);
}