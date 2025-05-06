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
    </>
  );
};
