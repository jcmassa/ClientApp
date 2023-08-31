import React, { useState, useEffect, useContext } from 'react';
import RankingGrid from "./RankingGrid";
import RankingRow from "./RankingRow";
import ItemCollection from "./ItemCollection";
import TierEditor from "./TierEditor";

export const RankItems = ({ items, imgArr, tiers, setTiers, reloadItems, rankChange, cleanfunc }) =>
{
    
    const [reload, setReload] = useState(false);
    const [newTier, setNewTier] = useState(false);
    const [tierEditId, setTierEditId] = useState(0);

    function Reload() {
        setReload(true);
    }

    const toggleTier = (() => setNewTier(!newTier));

    const addEditTier = ((i) => {
        toggleTier();
        setTierEditId(i);
    });

    function Resetear(){
        cleanfunc(1)
    }

    function drag(ev)
    {
        ev.dataTransfer.setData("text", ev.target.id)
    }
    function allowDrop(ev)
    {
        ev.preventDefault();
    }
    function drop(ev)
    {
        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") /*Si ya hay una imagen en donde voy a droppear es false*/ {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            var newRanking = parseInt(targetElm.getAttribute("data-ranknum"));
            var tier = parseInt(targetElm.getAttribute("data-idtier"));
            rankChange(data, newRanking, tier);
            //Reload(true);
        }
    }

    useEffect(() =>
    {
        if (reload === true)
        {
            reloadItems();
            setReload(false);
        }
    }, [reload])

    var lastCellRank = 0;
    var tierRowGrid = [];

    if(tiers.length > 0)
    {
        for (var i = 0; i < tiers.length; i++) {
            tierRowGrid.push(<RankingRow prevLastRank={lastCellRank} rowName={tiers[i].rowName}
                rowNumber={tiers[i].rowNumber} numCells={tiers[i].numCells}
                items={items} imgArr={imgArr} drag={drag} orderRow={tiers[i].rowNumber}
                allowDrop={allowDrop} drop={drop} idTier={tiers[i].id} tierEditFunc={addEditTier} 
                key={tiers[i].rowName.replace(/\s/g, '') + 'rowRanking'}/>);
            lastCellRank = lastCellRank + tiers[i].numCells + 1;
        }  
    }

    return (
        (items != null && items.length>0) ?
            <main>
                {tierRowGrid}
                {<ItemCollection items={items} drag={drag} imgArr={imgArr} />}
                <button className='button-deco' key = "rchgButton" onClick={Resetear} >Recargar</button>
                <button className='button-deco' key="nwButton"  onClick={() => addEditTier(0)} >Nuevo</button>
                {newTier ?
                    <TierEditor tierId={tierEditId} closeEvent={toggleTier} /> : null
                }
        </main> : <main>Loading...</main>
    )
}
export default RankItems;