import style from "./page.module.css";

export default () => {
  return (
    <>
      <div className={style.paginaprincipal}>
        <img src="/dentistaprincipal.png" width="100%" height="100%" />
        <h1>Seu sorriso, nossa maior satisfação.</h1>
        <h3>
          Todo mundo merece dentes saudáveis e um sorriso radiante sem gastar
          muito!
        </h3>
        <a href="/ortos/consulta"><button>Consulte-se</button></a>
      </div>

      <div className={style.procedimentos}>
        <h2 className={style.dourado}>Conheça nossos</h2>
        <h2>Procedimentos</h2>
        <div className={style.imgdescrip}>
          <div className={style.ladoesq}>
            <h3>
              Limpeza
            </h3>
            <p>A limpeza dentária é essencial para remover placa, tártaro e manchas, prevenindo cáries e doenças gengivais, garantindo uma boca saudável.
</p>
            <h3>Extrações</h3>
            <p>A extração dentária é a remoção de um dente danificado ou problemático, quando não há outras opções de tratamento.</p>
            <h3>Restaurações</h3>
            <p>As restaurações dentárias são procedimentos para reparar dentes danificados por cáries, fraturas ou desgaste, devolvendo a função e estética ao dente afetado.
</p>
            <h3>Clareamento Dentario</h3>
            <p>O clareamento dental é um procedimento estético que visa melhorar a cor dos dentes, removendo manchas e deixando-os mais brancos e brilhantes.
</p>
          </div>
          <div className="proc-img" id="procedimentos"><img className={style.imagem} src="/procedimento.JPG" width="431" height="646" /></div>
          <div className={style.ladodir}>
            <h3>Implantes Dentários</h3>
            <p>Um implante dentário é uma solução utilizada para substituir dentes perdidos ou danificados.</p>
            <h3>Instalação e manutenção deaparelho ortodôntico</h3>
            <p>O aparelho ortodôntico é um dispositivo utilizado para corrigir problemas de alinhamento dos dentes e da mandíbula, como dentes tortos, espaçados, ou mal posicionados.</p>
            <h3>Instalação de prótese dentária total e parcial</h3>
            <p>A instalação de uma prótese dentária pode ser uma solução eficaz para quem perdeu dentes, seja parcialmente ou totalmente. Elas são usadas para restaurar a estética, a função da mordida e a saúde bucal geral.</p>
            <h3>Lentes de contato dentárias</h3>
            <p>As lentes de contato dentárias são uma solução estética moderna utilizada para melhorar a aparência dos dentes.</p>
          </div>
        
        </div>


      </div>
    </>
  );
};
