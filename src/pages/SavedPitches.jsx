import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'
import PitchCard from '../components/PitchCard'


export default function SavedPitches(){
const [pitches, setPitches] = useState([])
const fetch = async () => { try { const res = await api.get('/pitches/saved'); setPitches(res.data) } catch(e){console.error(e)} }
useEffect(()=>{ fetch() }, [])


return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{pitches.map(p => <PitchCard key={p._id} pitch={p} onLike={()=>{}} onSave={()=>{}} />)}
</div>
)
}