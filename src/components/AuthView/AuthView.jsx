import { Navigate } from 'react-router-dom'

export default function AuthView({children}) {
 if(localStorage.getItem('userToken')) {
return <Navigate to={'/home'}/>
 } else {
return children
 }
}
