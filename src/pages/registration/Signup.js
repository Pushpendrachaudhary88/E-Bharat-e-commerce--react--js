import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,fireDb } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const[name,setName] =useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("");
    const[confPassword,setConfPassword] = useState("")


    const context = useContext(myContext)
    const{loading,setLoading} = context

    const signup =async  () =>{
        // setLoading(true)
        console.log(name,email,password,confPassword)
        if(name==="" || email==="" || password==="" || confPassword ===""){
            return toast.error("All Field are Mendatory");
        }
        try{
            const users = await createUserWithEmailAndPassword(auth,email,password)
            console.log(users)
            const  user = {
                name: name,
                uid: users.user.uid,
                email:users.user.email,
                time : Timestamp.now()
            }
            const userRef = collection(fireDb,"users")
            await addDoc(userRef,user)
           
            setName("")
            setEmail("")
            setPassword("")
            setConfPassword("")
            toast.success("Signup Successfully")
             setLoading(false)
           

        }
        catch(err){
            console.log(err)
             setLoading(false)

        }
    }
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div>
                    <input
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Confirm-Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                       onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup