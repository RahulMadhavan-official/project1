import './input.css';



const Input= ({type='text',onChange,placeholder,classname = ''})=>{
    return(
      <input type={type}
      className={`custom-input ${classname}`}
      onChange={onChange}
      placeholder={placeholder}/>
    )
  }
  export default Input;