import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'
import PitchCard from '../components/PitchCard'


export default function MyPitches(){
const [pitches, setPitches] = useState([])
const fetch = async () => {
try { const res = await api.get('/pitches/mine'); setPitches(res.data) } catch(e){console.error(e)}
}
useEffect(()=>{fetch()}, [])


const handleDelete = async (id) => {
if(!confirm('Delete this pitch?')) return
await api.delete(`/pitches/${id}`)
fetch()
}


return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{pitches.map(p => (
<div key={p._id} className="relative">
<PitchCard pitch={p} onLike={()=>{}} onSave={()=>{}} onView={()=>{}} />
<div className="flex gap-2 mt-2">
<button onClick={()=>handleDelete(p._id)} className="px-3 py-1 border rounded">Delete</button>
</div>
</div>
))}
</div>
)
}