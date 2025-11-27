import React, { useState, useContext } from 'react'
import { api } from '../utils/api'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const { login } = useContext(AuthContext)
const nav = useNavigate()


const submit = async (e) => {
e.preventDefault()
try {
const res = await api.post('/auth/login', { email, password })
login(res.data)
nav('/')
} catch (err) { alert('Login failed') }
}


return (
<div className="max-w-md mx-auto card">
<h2 className="text-xl font-semibold mb-4">Login</h2>
<form onSubmit={submit} className="flex flex-col gap-3">
<input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="p-2 border rounded" />
<input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="p-2 border rounded" />
<button type="submit" className="px-4 py-2 rounded" style={{background:'#FF6B2C', color:'white'}}>Login</button>
</form>
</div>
)
}