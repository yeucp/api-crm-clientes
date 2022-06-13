import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClientForm from '../components/ClientForm';

const EditClient = () => {
    const {id} = useParams()
    const [client, setClient] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        //setLoading(!loading)
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
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
            <p className="mt-3">Utiliza este formulario para editar un cliente</p>
            {client?.name ? (
                <ClientForm
                    client={client}
                    loading={loading}
                />
            ): <p>Cliente no válido</p>}
        </>
    );
};

export default EditClient;