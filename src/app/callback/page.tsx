import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';


const AuthCallbackPage = async() => {
    console.log("authcallabck apge ");
    
    const auth=await onAuthenticateUser()
    // console.log("auth",auth)
    if(auth.status===200 || auth.status===201){
        redirect('/dashboard')
    }
    else if (auth.status===400 ||auth.status===403 || auth.status===500){
        redirect('/sign-in')
    }
}

export default AuthCallbackPage;
