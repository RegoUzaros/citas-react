import {useState,useEffect} from 'react'
import { Pacientes } from './Pacientes'
import {Error} from './Error'
const Formulario = ({pacientes,setPacientes,paciente,setpaciente}) => {
  
     const [nombre,setNombre] = useState('')
     const [propietario,setpropietario] = useState('')
     const [email,setEmail] = useState('')
     const [altafecha,setFecha] = useState('')
     const [sintomas,setSintomas] = useState('')
     const [error,setError]=useState(false)

     useEffect(()=>{
      if(Object.keys(paciente).length>0){
       // console.log("si hay algo")
        setNombre(paciente.nombre);
        setpropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.altafecha);
        setSintomas(paciente.sintomas)
      }else{
       // console.log("no hay nada ")
      }
     },[paciente])

     
     const generarId =()=>{
     const random = Math.random().toString(36).substring(2);
     const fecha =  Date.now().toString(36);
     return random+fecha;

     }

   
     const handleSubmit =(e)=>{//validad formulario
      e.preventDefault();
      if([nombre,propietario,email,altafecha,sintomas].includes('')){
       // console.log('hay al menos un campo vacio')
        setError(true)
      }else{
       // console.log('todos llenos')
        setError(false)

        const objetoPaciente ={
          nombre,
          propietario,
          email,
          altafecha,
          sintomas,
          id: generarId()

        }
        if(paciente.id){
          //editar registro 
          objetoPaciente.id=paciente.id

          const pacientesActualizados = pacientes.map (pacienteState => pacienteState.id ===
            paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setpaciente({})

        }else{
          //nuevo registro 
          objetoPaciente.id=generarId();
          setPacientes([...pacientes,objetoPaciente]);
        }

        
        // reinicio de valores 
       setNombre('')
       setpropietario('')
       setEmail('')
       setFecha('')
       setSintomas('')
       
      }
      //console.log('Enviando Formulario')
     }
     
  return (
    
    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>
        Seguimiento de pacientes 
      </h2>
      <p className='text-lg mt-5 text-center mb-10'>
        añadir pacientes y {''}
        <span className='text-blue-500 font-bold '>Administralos</span>
      </p>
      <form 
      onSubmit={handleSubmit}
      className='bg-white shadow-md rounded-lg py-10 px-5 mb-5'>
        { error && <Error>Todos los campos son obligatorios</Error>
      
        }
        <div className='mb-5'>
          <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>
            Nombre Mascota
            </label>
          <input
          id="mascota" 
          type="text"
          placeholder="Nombre de la Mascota"
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={nombre}
           onChange={(e)=> setNombre(e.target.value)}
           />
           
        </div>
        <div className='mb-5'>
          <label htmlFor="Propietario" className='block text-gray-700 uppercase font-bold'>
            Nombre del Propietario
            </label>
          <input
          id="Propietario" 
          type="text"
          placeholder="Nombre del Propietario"
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={propietario}
           onChange={(e)=> setpropietario(e.target.value)}
           />
           
        </div>
        <div className='mb-5'>
          <label htmlFor="Email" className='block text-gray-700 uppercase font-bold'>
            Email
            </label>
          <input
          id="Email" 
          type="email"
          placeholder="Ejemplo@Ejemplo.com"
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={email}
           onChange={(e)=> setEmail(e.target.value)}
           />
        </div>
        <div className='mb-5'>
          <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>
            Alta
            </label>
          <input
          id="alta" 
          type="date"
          
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={altafecha}
           onChange={(e)=> setFecha(e.target.value)}
           />
        </div>
        <div className='mb-5'>
          <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>
            Sintomas
            </label>
          <textarea
          id="sintomas" 
          
          placeholder="Describe los Sintomas"
           className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
           value={sintomas}
           onChange={(e)=> setSintomas(e.target.value)}
           />
        </div>
        <input
        type="submit"
        className="bg-indigo-600 w-full p-3 text-stone-50 font-bold uppercase hover:bg-indigo-700 "
        value={paciente.id ? 'Editar Paciente':'Agregar paciente'}
        />
      </form>
      </div>
  )
}

export default Formulario

