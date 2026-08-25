import { useEffect, useState } from "react"
import Form1 from "./pages/form1";
import Form2 from "./pages/Form2";
import Form3 from "./pages/Form3";
import "./App.css"

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");

    return savedData ? JSON.parse(savedData) : {
      name: "",
      fname: "",
      dob: "",
      gender: "",

      email: "",
      phone: "",
      address: "",
      city: "",

      username: "",
      password: "",
      confirmPass: ""
    }

  });

  useEffect(()=>{
    localStorage.setItem("formData",JSON.stringify(formData))
  },[formData])
   
  return (
    <>
      {currentPage === 1 && <Form1 setCurrentPage={setCurrentPage} currentPage={currentPage} formData={formData} setFormData={setFormData} />}

      {currentPage === 2 && <Form2 setCurrentPage={setCurrentPage} currentPage={currentPage} formData={formData} setFormData={setFormData} />}

      {currentPage === 3 && <Form3 setCurrentPage={setCurrentPage} currentPage={currentPage} formData={formData} setFormData={setFormData} />}
    </>
  )
}

export default App;