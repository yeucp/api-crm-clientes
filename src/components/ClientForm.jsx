import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import Spinner from '../components/Spinner';
import Alert from "./Alert";

const ClientForm = ({client, loading}) => {

    const navigate = useNavigate()

    const newClientSchema = Yup.object().shape({
        name: Yup.string().min(3, 'El nombre es demaciado corto').max(20,'El nombre es demaciado largo')
            .required('EL nombre del cliente es requerido'),
        company: Yup.string().required('El nombre de la compañía es requerido'),
        email: Yup.string().email('El email no es válido').required('El nombre de la compañía es requerido'),
        phone: Yup.number().integer('El número no es válido').positive('El número no es válido').typeError('El número no es válido')
    })

    const createClient = async values => {
        try {
            const url = `http://localhost:4000/clients`
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    const editClient = async values => {
        try {
            const url = `http://localhost:4000/clients/${client.id}`
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async values =>{
        if(client.id){
            await editClient(values)
        }else{
            await createClient(values)
        }
        navigate('/clients')
    }
    return (
        loading ? <Spinner/> :
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bolt text-xl text-center uppercase">{client?.name ? 'Editar cliente' : 'Agregar cliente'}</h1>
            <Formik
                initialValues={{
                    name: client?.name ?? '',
                    company: client?.company ?? '',
                    email: client?.email ?? '',
                    phone: client?.phone ?? '',
                    notes: client?.notes ?? ''
                }}
                enableReinitialize={true}
                onSubmit={
                    async (values, {resetForm})=> {
                        await handleSubmit(values)
                        resetForm()
                    }
                }
                validationSchema={newClientSchema}
            >
                {({errors, touched})=>(
                    <Form>
                        <div>
                            <label
                                htmlFor="name"
                                className="text-gray-800"
                            >Nombre</label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className="my-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre del cliente"
                            />
                            {errors.name && touched.name ? (
                                <Alert>{errors.name}</Alert>
                            ) : null}
                        </div>
                        <div>
                            <label
                                htmlFor="company"
                                className="text-gray-800"
                            >Compañía</label>
                            <Field
                                id="company"
                                name="company"
                                type="text"
                                className="my-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre de la compañía"
                            />
                            {errors.company && touched.company ? (
                                <Alert>{errors.company}</Alert>
                            ) : null}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-gray-800"
                            >Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                className="my-2 block w-full p-3 bg-gray-50"
                                placeholder="Email del cliente"
                            />
                            {errors.email && touched.email ? (
                                <Alert>{errors.email}</Alert>
                            ) : null}
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="text-gray-800"
                            >Teléfono</label>
                            <Field
                                id="phone"
                                name="phone"
                                type="tel"
                                className="my-2 block w-full p-3 bg-gray-50"
                                placeholder="Teléfono del cliente"
                            />
                            {errors.phone && touched.phone ? (
                                <Alert>{errors.phone}</Alert>
                            ) : null}
                        </div>
                        <div>
                            <label
                                htmlFor="notes"
                                className="text-gray-800"
                            >Notas</label>
                            <Field
                                as="textarea"
                                id="notes"
                                name="notes"
                                type="text"
                                className="my-2 block w-full p-3 bg-gray-50"
                                placeholder="Notas"
                            />
                        </div>
                        <input
                            type="submit"
                            value={client?.name ? 'Editar cliente' : 'Agregar cliente'}
                            className="w-full p-3 mt-5 bg-blue-800 text-white font-bold uppercase text-lg"
                        />
                    </Form>
                )}
                
            </Formik>
        </div>
    );
};

ClientForm.defaultProps = {
    client: {}
}

export default ClientForm;