import { useContext, useEffect, useState } from "react";
import { buscar, deletar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import type Postagem from "../../../models/Postagem";

function DeletarPostagem() {
  
    const navigate = useNavigate();
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        
        try{
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token}
            })

        }catch(error: any){
            if(error.toString().includes('401')){
                handleLogout()
            }
        }
    }    
    useEffect(()=> {
        if(token===''){
            alert('Você precisa estar logado!')
            navigate('/')
            }
    }, [token])  

    useEffect(() => {
        if(id !== undefined){
            buscarPorId(id)
        }
    },[id])
    
    function retornar(){
        navigate('/postagens')
    }

    async function deletarPostagem(){
        
        setIsLoading(true)

        try{
            
            await deletar(`/postagens/${id}`, {
                headers: {Authorization: token}
            })

            alert('Postagem apagada com sucesso.')

        }catch(error: any){
            if(error.toString().includes('401')){
                handleLogout()
            }else {
                alert('Erro ao deletar a Postagem.')
            }
        }
        setIsLoading(false)
        retornar()
    }

    return (
    <div className="container w-1/3 mx-auto">
        <h1 className="text-4xl text-center my-4">Deletar Postagem</h1>
        <p className="text-center font-semibold mb-4">
            Você tem certeza de que deseja apagar a postagem a seguir?
        </p>
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
            <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
                Postagem
            </header>
            <p className='p-8 text-3xl bg-slate-200 h-full'>{postagem.titulo}</p>
            <p>{postagem.texto}</p>
            
            <div className="flex">
                <button className="text-slate-100 bg-red-400 hover:bg-red-600 
                        w-full py-2" onClick={retornar}>
                    Não
                </button>
                <button className="text-slate-100 bg-indigo-400 hover:bg-indigo-600 
                        w-full justify-center" onClick={deletarPostagem}>
                    {
                        isLoading ?
                            <ClipLoader 
                                color="#ffffff"
                                size={24}
                            />
                            :
                            <span>Sim</span>                        
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeletarPostagem;

 