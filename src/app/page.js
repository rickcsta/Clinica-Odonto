"use client"; // Indica que este é um componente do lado do cliente

import { useState } from "react";
import { Button, Box } from "@mui/material"; // Importando os componentes do MUI
import style from "./page.module.css"; 
import Carousel from '../components/carousel';

export default function Home() {
  // Estado para controlar a visibilidade das opções
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Estado para a seleção do cliente/cadastro

  // Função para alternar a visibilidade das opções
  const handleConsultClick = () => {
    setShowOptions(!showOptions); // Alterna entre mostrar e esconder as opções
  };

  // Função para lidar com a seleção
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);  // Fecha o dropdown após a seleção
  };

  return (
    <>
      <div className={style.paginaprincipal}>
        <div className={style.conteudo}>
          <h1>Seu sorriso, nossa maior satisfação.</h1>
          <h3>
            Todo mundo merece dentes saudáveis e um sorriso radiante sem gastar muito!
          </h3>
          <Button variant="contained" onClick={handleConsultClick} sx={{
                  padding: '10px 20px',
                  width: '420px'
          }}>
            Consulte-se
          </Button>

          {/* Condicional para mostrar as opções ao clicar no botão */}
          {showOptions && (
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                onClick={() => handleOptionSelect("Já sou cliente")}
                variant="outlined"
                sx={{
                  padding: '10px',
                  fontSize: '14px',
                  backgroundColor: "#f0f0f0",
                  borderRadius: '5px',
                  boxShadow: 1,
                  '&:hover': { backgroundColor: '#ddd' },
                    width: '420px'
                }}
              >
                Já sou cliente
              </Button>
              <Button
                onClick={() => handleOptionSelect("Desejo me cadastrar")}
                variant="outlined"
                sx={{
                  padding: '10px',
                  fontSize: '14px',
                  backgroundColor: "#f0f0f0",
                  borderRadius: '5px',
                  boxShadow: 1,
                  '&:hover': { backgroundColor: '#ddd' },
                  
                }}
              >
                Desejo me cadastrar
              </Button>
            </Box>
          )}

          {/* Exibe a opção selecionada, se houver */}
          {selectedOption && <h4>Você selecionou: {selectedOption}</h4>}
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
