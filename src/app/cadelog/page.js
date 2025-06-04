'use client'
import style from './page.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ClienteForm() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [endereco, setEndereco] = useState('')
  const [contato, setContato] = useState('')
  const [senha, setSenha] = useState('')

   const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cliente = { nome, cpf, nascimento, endereco, contato, senha }

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      })

      if (response.ok) {
        const data = await response.json()
        const id_cliente = data.id_cliente
        router.push(`/perfil/${id_cliente}`)
      } else {
        const errorData = await response.json()
        alert(`Erro ao cadastrar cliente: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <>
    <div className={style.container}>
     <div className={style.cadastro}>
        <div className={style.containercad}>
          <h1 className="titulo">Cadastre-se</h1>
            <form className={style.entradas} onSubmit={handleSubmit}>
              <input className={style.input}  type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
              <input className={style.input}  type="number" id="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required/>  
              <input className={style.input}  type="date" placeholder="Data de Nascimento" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required/> 
              <input className={style.input}  type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required/> 
              <input className={style.input}  type="number" placeholder="Contato" value={contato} onChange={(e) => setContato(e.target.value)} required/>
              <input className={style.input}  type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
              <button className={style.botao}  type="submit" placeholder="Agendar">Criar</button>
            </form>
        </div>
      </div>

      <div className={style.login}>
        <div className={style.containerlog}>
          <h1 className="titulo">Login</h1>
            <form className={style.entradas}>
              <input className={style.input}  type="text" placeholder="CPF" required/>   
              <input className={style.input}  type="text" placeholder="Senha" required/>
              <Link href="#"><p>Esqueceu sua senha?</p></Link>      
              <button className={style.botao} type="submit" placeholder="Agendar">Entrar</button>
            </form>
        </div>
      </div>
    </div>
    </>
  );
};

