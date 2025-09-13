import './Encuesta.css'
import React, { useState } from "react";


interface EncuestaProps {
  onClose?: () => void; 
}

export default function Encuesta({ onClose }: EncuestaProps) {


    const [name, setName] = useState("");
    const [touchedName, setTouchedName] = useState(false);
    const [nameError, setNameError] = useState("");

    const [lastName, setLastName] = useState("");
    const [touchedLastName, setTouchedLastName] = useState(false);
    const [lastNameError, setLastNameError] = useState("");

    const [birthDay, setBirthDay] = useState("");
    const [touchedBirthDay, setTouchedBirthDay] = useState(false);
    const [birthDayError, setBirthDayError] = useState("");

    const [sex, setSex] = useState("");
    const [touchedSex, setTouchedSex] = useState(false);
    const [sexError, setSexError] = useState("");

    const [email, setEmail] = useState("");
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [valoracion, setValoracion] = useState<string>(""); 
    const [touchedValoracion, setTouchedValoracion] = useState(false);
    const [valoracionError, setValoracionError] = useState("");


    const valorationOptions = [
        { value: "me-encanto", label: "Me encantó" },
        { value: "cumple", label: "Cumple con mis expectativas" },
        { value: "podria", label: "Podría ser mejor" },
        { value: "mala", label: "Mala" },
        { value: "lamentable", label: "Lamentable" },
    ];

    const getValoracionLabel = (slug: string) =>
        valorationOptions.find((o) => o.value === slug)?.label ?? slug;


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setName(v);
        if (v.trim()) setNameError("");
    };

    const handleNameBlur = () => {
        setTouchedName(true);
        if (!name.trim()) setNameError("Requerido");
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setLastName(v);
        if (v.trim()) setLastNameError("");
    };

    const handleLastNameBlur = () => {
        setTouchedLastName(true);
        if (!lastName.trim()) setLastNameError("Requerido");
    };

    const handleBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setBirthDay(v);
        if (v.trim()) setBirthDayError("");
    };

    const handleBirthDayBlur = () => {
        setTouchedBirthDay(true);
        if (!birthDay.trim()) setBirthDayError("Requerido");
    };

    const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        setSex(v);
        if (v.trim()) setSexError("");
    };

    const handleSexBlur = () => {
        setTouchedSex(true);
        if (!sex.trim()) setSexError("Requerido");
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setEmail(v);
        if (v.trim()) setEmailError("");
    };
    const handleEmailBlur = () => {
        setTouchedEmail(true);
        if (!email.trim()) {
            setEmailError("Requerido");
            return;
        }
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValidation.test(email)) setEmailError("Formato inválido");
    };

    const handleValoracionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValoracion(v);
        setTouchedValoracion(true);
        if (v.trim()) setValoracionError("");
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setTouchedName(true);
        setTouchedLastName(true);
        setTouchedBirthDay(true);
        setTouchedSex(true);
        setTouchedEmail(true);
        setTouchedValoracion(true);

        let ok = true

        if (!name.trim()) {
            setNameError("Requerido");
            return;
        }
        if (!lastName.trim()) {
            setLastNameError("Requerido");
            return;
        }
        if (!birthDay.trim()) {
            setBirthDayError("Requerido");
            return;
        }        
        if (!sex.trim()) {
            setSexError("Requerido");
            return;
        }        
        if (!email.trim()) {
            setEmailError("Requerido");
            return;
        }        
        if (!valoracion.trim()) {
        setValoracionError("Requerido");
        ok = false;
        }

        if(!ok) return;

        setShowModal(true);
    };






  const handleConfirm = () => {
    alert("Enviado");
    setShowModal(false);

    handleReset();
  };

  const handleCancel = () => {
    const ok = window.confirm("¿Deseas volver a la página anterior?");
    if (ok) {
      if (onClose) onClose();
      else window.history.back();
    }
  };

  const handleReset = () => {
    setName("");
    setTouchedName(false);
    setNameError("");

    setLastName(""); 
    setTouchedLastName(false); 
    setLastNameError("");

    setBirthDay(""); 
    setTouchedBirthDay(false); 
    setBirthDayError("");

    setSex(""); 
    setTouchedSex(false); 
    setSexError("");

    setEmail(""); 
    setTouchedEmail(false); 
    setEmailError("");
  };

  return (
    <>
        <section className='form-section'>
            <h2>Dejenos su opinion</h2>
            <form action="" onSubmit={handleSubmit} >
                <fieldset className='personal-data'>
                <legend>Datos personales</legend>
                <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="name">Nombre</label>
                        {touchedName && nameError && (
                            <div className="error" >
                                {nameError}
                            </div>
                        )}                          
                    </div>
  
                    <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder='Ingresá tu nombre' 
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    />
                    
                </div>

                <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="lastName">Apellido</label>
                        {touchedLastName && lastNameError && <div className="error">{lastNameError}</div>}
                    </div>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder='Ingresá tu apellido'
                        value={lastName}
                        onChange={handleLastNameChange}
                        onBlur={handleLastNameBlur}
                    />
                </div>

                <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="birthDay">Fecha de nacimiento</label>
                        {touchedBirthDay && birthDayError && <div className="error">{birthDayError}</div>}
                    </div>
                    <input
                        id="birthDay"
                        name="birthDay"
                        type="date"
                        value={birthDay}
                        onChange={handleBirthDayChange}
                        onBlur={handleBirthDayBlur}
                    />
                    </div>

                    <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="sex">Sexo</label>
                        {touchedSex && sexError && <div className="error">{sexError}</div>}
                    </div>
                    <select
                        name="sex"
                        id="sex"
                        value={sex}
                        onChange={handleSexChange}
                        onBlur={handleSexBlur}
                    >
                        <option value="">Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="email">Email</label>
                        {touchedEmail && emailError && <div className="error">{emailError}</div>}
                    </div>
                    <input
                        id='email'
                        name='email'
                        type="email"
                        placeholder='tuemail@mail.com'
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                    />
                </div>


                </fieldset>



                

                <fieldset className="valoration">
                <legend>Valoración</legend>

                {valorationOptions.map((opt) => (
                    <div className="valoration-option" key={opt.value}>
                    <label htmlFor={opt.value}>

                        {opt.label}
                    </label>
                    <input
                        id={opt.value}
                        type="radio"
                        name="valoracion"
                        value={opt.value}
                        checked={valoracion === opt.value}
                        onChange={handleValoracionChange}
                        />
                    </div>
                ))}

                {touchedValoracion && valoracionError && (
                    <div className="error" style={{ marginTop: 8 }}>{valoracionError}</div>
                )}
                </fieldset>

                <fieldset className='field'>
                    <legend>Comentario</legend>
                    <textarea name="comentario" id="comentario" rows={4} placeholder='Opcional: Ingrese un comentario'></textarea> 
                </fieldset>


                <div className='buttons'>
                    <button type='submit' >Enviar</button>
                    <button type='button' onClick={handleCancel}>Cancelar</button>
                    <button type='button' onClick={handleReset}>Restablecer valores</button>    
    
                </div>


            </form>


            {/*modal */}
            <div className={`modal ${showModal ? "open" : ""}`}>
                <div className='modal-container'>
                    <div className='modal-header'>
                    <h2>Confirmar envio</h2>
                    <div className='close-modal'>
                        <button type='button' onClick={() => setShowModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                </div>

                <p>Nombre: {name}</p>
                <p>Apellido: {lastName}</p>
                <p>Fecha de nacimiento: {birthDay}</p>
                <p>Sexo: {sex}</p>
                <p>Email: {email}</p>
                <p>Valoración: {getValoracionLabel(valoracion)}</p>
                <p>Comentario:</p>

                <div className='confirm-send'>
                    <button onClick={handleConfirm}>Confirmar</button>


                </div>

                </div>
                





            </div>





        </section>
    </>
   
  )
}
