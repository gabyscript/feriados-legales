import { useState, useEffect } from "react";
import './DataSection.css';

const DataSection = () => {

    /* Estados y Hooks*/

    const [baseFeriados, setBaseFeriados] = useState([]);  
    const [diasFiltrados, setDiasFiltrados] = useState([]);
    const [feriadoAlfabetico, setFeriadoAlfabetico] = useState(false);  
    const [checkReligioso, setCheckReligioso] = useState(false);
    const [checkCivil, setCheckCivil] = useState(false);
    const [checkIrrenunciable, setCheckIrrenunciable] = useState(false);
    
    useEffect(() => {
        consultarInformacion();        
    }, []);

    /* Conección con la API*/

    const consultarInformacion = async () => {
        const url = 'https://api.victorsanmartin.com/feriados/en.json';
        const response = await fetch(url);
        const base = await response.json();            
        setBaseFeriados(base.data);
        setDiasFiltrados(base.data);
    }   
    
    /* Busqueda en Input*/

    const buscarFeriado = (e) => {
        console.log(baseFeriados) 
        console.log(e.target.value)        
        setDiasFiltrados([...baseFeriados.filter(diaBuscado => diaBuscado.title.toLowerCase().includes(e.target.value))]);
        console.log(diasFiltrados);        
    }

    /* Ordenar por alfabeto*/

    const ordenarPorAlfabeto = () => {
        setFeriadoAlfabetico(!feriadoAlfabetico); 
        if (feriadoAlfabetico !== true) {
            setDiasFiltrados([...baseFeriados.sort((a,b) => a.title > b.title ? 1 : -1)]);
        } else {
            setDiasFiltrados([...baseFeriados.sort((a,b) => a.date > b.date ? 1 : -1)]);
        }
    }

    /*Filtros con checkbox */

    const filtrarFeriadoIrrenunciable = () => {
        setCheckIrrenunciable(!checkIrrenunciable);        
        if (checkIrrenunciable !== true) {
            setDiasFiltrados([...baseFeriados.filter(diaIrrenunciable => diaIrrenunciable.inalienable === true)]);
        } else {
            setDiasFiltrados(baseFeriados)
        }        
    }

    const filtrarFeriadoSanto = () => {
        setCheckReligioso(!checkReligioso);        
        if (checkReligioso !== true) {
            setDiasFiltrados([...baseFeriados.filter(diaReligioso => diaReligioso.type.includes("Religioso"))]);
        } else {
            setDiasFiltrados(baseFeriados)
        }        
    }

    const filtrarFeriadoCivil = () => {
        setCheckCivil(!checkCivil);        
        if (checkCivil !== true) {
            setDiasFiltrados([...baseFeriados.filter(diaCivil => diaCivil.type.includes("Civil"))]);
        } else {
            setDiasFiltrados(baseFeriados)
        }        
    }

    return(
        <><header className='header-section'>
            <h1 className='header-title'>Feriados Legales Chile</h1>
        </header><section className="buscador-section">
            <div className="input-div">
                <label>Buscar por nombre de la fecha</label>
                <input type="text" name="" id="buscador-input"  onChange={buscarFeriado}/>
                    <div className="checkbox-div">
                        <div className="filtrar-label-div">
                            <label> Filtrar u ordenar por:</label>  
                        </div>                                      
                        <div className="checkbox-1-div">
                            <input type="checkbox" name="" id="checkboxes" checked={feriadoAlfabetico} onChange={ordenarPorAlfabeto}/>
                            <label>Orden alfabético</label>
                        </div>
                        <div className="checkbox-2-div">
                            <input type="checkbox" name="" id="checkboxes" checked={checkIrrenunciable} onChange={filtrarFeriadoIrrenunciable} />
                            <label>Días irrenunciables</label>
                        </div>
                        <div className="checkbox-3-div">
                            <input type="checkbox" name="" id="checkboxes" checked={checkReligioso} onChange={filtrarFeriadoSanto} />
                            <label>Feriados religiosos</label>
                        </div>
                        <div className="checkbox-4-div">
                            <input type="checkbox" name="" id="checkboxes" checked={checkCivil} onChange={filtrarFeriadoCivil} />
                            <label>Feriados civiles</label>
                        </div>                
                    </div>      
            </div>
                 
        </section><section className="data-section">
                {diasFiltrados.map(diaInd => <div className="dias-individuales-div">
                    <li>{diaInd.title}</li>
                    <li>{diaInd.date}</li>
                </div>
                )}
            </section></>
    )
}

export default DataSection;