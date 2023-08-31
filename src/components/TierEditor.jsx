import React, { useState,  useContext } from 'react';
import { TierContext } from '../context/TierContext'


function TierEditor({ tierId, closeEvent })
{

    var tierName = "";
    var tierCant = 1;
    const { getTierId } = useContext(TierContext);
    const { setTiers } = useContext(TierContext)
    if (tierId != 0) {
        var tier = getTierId(tierId);
        tierName = tier.rowName;
        tierCant = tier.numCells;
    }
    const [tierCurrName, setTierCurrName] = useState(tierName);
    const [tierCurrCant, settierCantCantidad] = useState(tierCant);
    const handleSubmit = (e) => {
        e.preventDefault();
        setTiers(tierId, tierCurrName, tierCurrCant);
        closeEvent();
    };

    const closeEventInner = (() => closeEvent());

    //El close va en el container asi cierra cuando tocas cualquier lado de la pantalla
    return (<div className="modalContainer" onClick={closeEventInner}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
                    <div key="nm" className="filaInput">
                        <h4 key="nombreTier" className="editfield">Nombre</h4>
                        <input type="text" id="tiername" placeholder="nombre Tier" maxLength="20" value={tierCurrName} onChange={(e) => setTierCurrName(e.target.value)} />
                    </div>
                    <div key="cnt" className="filaInput">
                        <h4 key="cllsTier" className="editfield">Celdas</h4>
                        <input type="number" id="cantCeldas" min="1" max="8" value={tierCurrCant} onChange={(e) => settierCantCantidad(e.target.value)} />
                    </div>
                    <div key="ninpum" className="filaInput">
                        <button id="saveTier" className='button-deco'>Guardar</button>
                        <button id="closeTier" className='button-deco' onClick={closeEventInner}>Cancelar</button>
                    </div>
            </form>
            </div>
        </div>);
}
export default TierEditor