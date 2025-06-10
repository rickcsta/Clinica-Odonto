import style from "./page.module.css"; 
import Carousel from './carousel';

export default function Home() {
  return (
    <>
      <div className={style.paginaprincipal}>
        <div className={style.conteudo}>
          <h1>Seu sorriso, nossa maior satisfação.</h1>
          <h3>
            Todo mundo merece dentes saudáveis e um sorriso radiante sem gastar muito!
          </h3>
          <a href="/cadelog">
            <button>Consulte-se</button>
          </a>
        </div>
        <div className={style.gradienteCentro}></div>
        <img
          className={style.dentistaprin}
          src="/dentistaprincipal.jpg"
          alt="Dentista"
        />
      </div>

      <div className={style.procedimentos} id="procedimentos">
        <h2 className={style.dourado}>Conheça nossos</h2>
        <h2>Procedimentos odontológicos</h2>
        <h2>↓</h2>
        <div className={style.carouselWrapper}>
          <Carousel />
        </div>
      </div>

      <div className={style.localizacao} id="localizacao">
        <div className={style.geral}>
          <div className={style.endereco}>
            <h1>Localização</h1>
            <p>Dentista em Esperança - PB</p>
            <p>R. Manoel Rodrigues de Oliveira, 411 - Centro</p>
            <p>Esperança - PB</p>
            <p>CEP: 58135-000</p>
          </div>
          <div className={style.map}>
            <div className="mapa">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.928014452081!2d-35.86272752488544!3d-7.017747768745403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac29e1a51cecf1%3A0xc18d9299377547b9!2sOrtos%20Odontologia%20-%20DENTISTA%20EM%20ESPERAN%C3%87A%20PB!5e0!3m2!1spt-PT!2sbr!4v1747738019589!5m2!1spt-PT!2sbr"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
