'use client'
import style from './page.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function ClienteForm() {
  const [cpflog, setCpflog] = useState('')
  const [senhalog, setSenhalog] = useState('')

  const router = useRouter()


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/login', {
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
      <div className={style.login}>
        <div className={style.containerlog}>
          <h1 className={style.titulo}>Login</h1>
          <form className={style.entradas} onSubmit={handleLogin}>
            <input className={style.input} type="text" placeholder="CPF" value={cpflog} onChange={(e) => setCpflog(e.target.value)} required />
            <input className={style.input} type="password" placeholder="Senha" value={senhalog} onChange={(e) => setSenhalog(e.target.value)} required />
            <Link href="#"><p className={style.link}>Esqueceu sua senha?</p></Link>
            <button className={style.botao} type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
