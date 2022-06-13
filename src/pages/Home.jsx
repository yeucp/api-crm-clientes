import { useEffect, useState } from "react";
import Client from "../components/Client";

const Home = () => {
    useEffect(()=>{
        const getClients = async ()=> {
            const url = `${import.meta.env.VITE_API_URL}`
            const response = await fetch(url)
            const result = await response.json()
            setClients(result)
        }
        getClients()
    }, [])


    const [clients, setClients] = useState([])

  /**
   * If the user confirms the deletion, then delete the client from the database, and then update the
   * clients array in the state.
   */
    const handleDeleteClient = async id => {
        const deleteClient = confirm('Desea eliminar este cliente')
        if(deleteClient){
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await response.json()
                const clientsUpdated  = clients.filter(client => client.id !== id)
                setClients(clientsUpdated)
            } catch (err) {
                console.error(err)
            }
            
        }
    }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus clientes</p>
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Compañía</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <Client
                            key={client.id}
                            client={client}
                            handleDeleteClient={handleDeleteClient}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;