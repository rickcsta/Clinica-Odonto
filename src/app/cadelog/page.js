'use client'
import style from './page.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ClienteForm() {
  const [nome, setNome] = useState('')
  const [cpfcad, setCpfcad] = useState('')
  const [cpflog, setCpflog] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [endereco, setEndereco] = useState('')
  const [contato, setContato] = useState('')
  const [senhacad, setSenhacad] = useState('')
  const [senhalog, setSenhalog] = useState('')

  const router = useRouter()

  // Cadastro
  const handleCadastro = async (e) => {
    e.preventDefault()

    const cliente = { nome, cpfcad, nascimento, endereco, contato, senhacad }

    try {
      const response = await fetch('/apiCad', {
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
      console.error('Erro ao enviar formulário de cadastro:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  // Login
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/apiLog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpflog, senhalog })
      })

      if (response.ok) {
        const data = await response.json()
        const id_cliente = data.id_cliente
        router.push(`/perfil/${id_cliente}`)
      } else {
        const errorData = await response.json()
        alert(`Erro ao fazer login: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <div className={style.container}>
      <div className={style.cadastro}>
        <div className={style.containercad}>
          <h1 className="titulo">Cadastre-se</h1>
          <form className={style.entradas} onSubmit={handleCadastro}>
            <input className={style.input} type="text" title="Digite seu nome completo" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input className={style.input} type="number" title="Digite seu CPF sem pontuação" placeholder="CPF" value={cpfcad} onChange={(e) => setCpfcad(e.target.value)} required />
            <input className={style.input} type="date" title="Data de Nascimento" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required />
            <input className={style.input} type="text" title="Sua rua, seu bairro, e sua cidade" placeholder="Seu endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
            <input className={style.input} type="number" title="Numero para contato"  placeholder="(00) 90000-0000" value={contato} onChange={(e) => setContato(e.target.value)} required />
            <input className={style.input} type="password" title="Crie uma senha forte" placeholder="Senha" value={senhacad} onChange={(e) => setSenhacad(e.target.value)} required />
            <button className={style.botao} type="submit">Criar e entrar</button>
          </form>
        </div>
      </div>

      <div className={style.meio}><h1>OU</h1></div>

      <div className={style.login}>
        <div className={style.containerlog}>
          <h1 className="titulo">Login</h1>
          <form className={style.entradas} onSubmit={handleLogin}>
            <input className={style.input} type="text" placeholder="CPF" value={cpflog} onChange={(e) => setCpflog(e.target.value)} required />
            <input className={style.input} type="password" placeholder="Senha" value={senhalog} onChange={(e) => setSenhalog(e.target.value)} required />
            <Link href="#"><p>Esqueceu sua senha?</p></Link>
            <button className={style.botao} type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
