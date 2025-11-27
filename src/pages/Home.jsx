import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'
import PitchCard from '../components/PitchCard'


export default function Home(){
const [pitches, setPitches] = useState([])


const fetch = async () => {
try {
const res = await api.get('/pitches')
setPitches(res.data)
} catch (e) { console.error(e) }
}


useEffect(()=>{ fetch() }, [])


const handleLike = async (id) => {
try { await api.post(`/pitches/${id}/like`); fetch() } catch(e){console.error(e)}
}
const handleSave = async (id) => {
try { await api.post(`/pitches/${id}/save`); alert('Saved') } catch(e){console.error(e)}
}
const handleView = (id) => { /* optional: open modal or navigate */ }


return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{pitches.map(p => (
<PitchCard key={p._id} pitch={p} onLike={handleLike} onSave={handleSave} onView={handleView} />
))}
</div>
)
}