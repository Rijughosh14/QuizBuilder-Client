import { Routes, Route } from "react-router-dom";
import axios from 'axios'
import FormBuilder from "./JS/Pages/FormBuilder";
import FinalForm from "./JS/Pages/FinalForm";
import Form from "./JS/Pages/Form";
import FormAnswer from "./JS/Pages/FormAnswer";





axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<FinalForm/>}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/create" element={<FormBuilder/>}/>
      <Route path="/answer" element={<FormAnswer/>}/>
    </Routes>
    </>
  );
}

export default App; 
