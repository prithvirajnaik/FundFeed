// File: src/pages/Chat.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../utils/api'


export default function Chat(){
const { userId } = useParams()
const [messages, setMessages] = useState([])
const [text, setText] = useState('')


const fetch = async () => { try { const res = await api.get(`/messages/${userId}`); setMessages(res.data) } catch(e){console.error(e)} }
useEffect(()=>{ fetch() }, [userId])


const send = async () => {
if(!text) return
try { await api.post('/messages', { to: userId, text }); setText(''); fetch() } catch(e){console.error(e)}
}


return (
<div className="max-w-2xl mx-auto card flex flex-col h-[70vh]">
<div className="flex-1 overflow-auto mb-3">
{messages.map(m => (
<div key={m._id} className={`mb-2 p-2 rounded ${m.fromMe ? 'bg-gray-100 self-end' : 'bg-gray-50'}`} style={{maxWidth: '80%'}}>
<div className="text-sm">{m.text}</div>
<div className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</div>
</div>
))}
</div>


<div className="flex gap-2">
<input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type a message" />
<button onClick={send} className="px-4 py-2 rounded" style={{background:'#16A29A', color:'white'}}>Send</button>
</div>
</div>
)
}