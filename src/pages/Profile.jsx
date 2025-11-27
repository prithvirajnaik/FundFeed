import React from 'react'
import { AuthContext } from '../contexts/AuthContext'


export default function Profile(){
const { user } = React.useContext(AuthContext)
if(!user) return <div>Please login</div>
return (
<div className="max-w-md mx-auto card">
<h2 className="text-xl font-semibold">Profile</h2>
<p className="mt-2"><strong>Email:</strong> {user.email}</p>
<p className="mt-1"><strong>Role:</strong> {user.role}</p>
</div>
)
}