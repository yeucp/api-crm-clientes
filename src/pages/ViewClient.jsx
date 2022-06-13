import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';

const ViewClient = () => {
    const {id} = useParams()
    const [client, setClient] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
        setLoading(!loading)
        const getClientById = async () => {
            try {
                const url = `http://localhost:4000/clients/${id}`
                const response = await fetch(url)
                const result = await response.json()
                setClient(result)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        getClientById()
    }, [])

    return (
        loading ? <Spinner/> : (
            <div>
                {Object.keys(client).length === 0 ? <p>No hay resultados</p>  : (
                    <>
                        <h1 className="font-black text-4xl text-blue-900">Ver cliente {client.name}</h1>
                        <p className="mt-3">Información del cliente</p>
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span
                                className='text-gray-800 uppercase font-bold '
                            >Cliente </span>
                            {client.name}
                        </p>
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span
                                className='text-gray-800 uppercase font-bold '
                            >Email </span>
                            {client.email}
                        </p>
                        {client.phone && (
                            <p className='text-2xl text-gray-600 mt-4'>
                                <span
                                    className='text-gray-800 uppercase font-bold '
                                >Phone </span>
                                {client.phone}
                            </p>
                        )}
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span
                                className='text-gray-800 uppercase font-bold '
                            >Compañía </span>
                            {client.company}
                        </p>
                        {client.notes && (
                            <p className='text-2xl text-gray-600 mt-4'>
                                <span
                                    className='text-gray-800 uppercase font-bold '
                                >Notas </span>
                                {client.notes}
                            </p>
                        )}
                    </>
                )}
            </div>
        )
    );
};

export default ViewClient;