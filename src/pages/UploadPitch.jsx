import React from 'react'
import VideoUploader from '../components/VideoUploader'
import { useNavigate } from 'react-router-dom'


export default function UploadPitch(){
const nav = useNavigate()
return (
<div className="max-w-2xl mx-auto">
<h2 className="text-2xl font-semibold mb-4">Upload Pitch</h2>
<VideoUploader onUploaded={()=>nav('/mypitches')} />
</div>
)
}