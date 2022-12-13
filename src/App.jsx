import Heder from "./components/Header"//rfce // rafc // npm run dev
import Formulario from "./components/Formulario"
import { ListadoPacientes } from "./components/ListadoPacientes"
import {useState,useEffect}from 'react'

function App() {
  const [pacientes, setPacientes ] = useState([]);
  const [paciente , setpaciente] = useState({});

  useEffect(()=>{
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
      //pacientesLocal?.length > 0 && setPacientes(pacientesLocal);
       setpaciente(pacientesLS)
    }
     obtenerLS()
  },[])

  useEffect(()=>{
 localStorage.setItem('pacientes',JSON.stringify(pacientes))
  },[pacientes])

  const eliminarPaciente =(id=>{
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
    
  })

  return(
    <div className="container mx-auto mt-20">
    <Heder/>
    
    <div className='mt-12 md:flex'>
    
    <Formulario
    pacientes={pacientes}
    setPacientes={setPacientes}
    paciente={paciente}
    setpaciente={setpaciente}

    />
    <ListadoPacientes
    pacientes={pacientes}
    setpaciente={setpaciente}
    eliminarPaciente={eliminarPaciente}
    />
    
    </div>
    
    </div>
  )
  
}

export default App
