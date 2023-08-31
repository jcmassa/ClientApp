import { TierContext } from '../context/TierContext'
import { useContext } from 'react';
const RankingRow = ({ items, imgArr, drag, orderRow, allowDrop, drop, rowName, numCells, idTier, tierEditFunc }) => {

    const rankingGrid = [];
    const cellCollectionRow = [];

    const { dlTier } = useContext(TierContext)
    const { setTiers } = useContext(TierContext)

    const editTier = (e) => {
        tierEditFunc(idTier);
    };

    function pushCellMarkupToArr(cellCollection, rankNum) {
        if (rankNum > 0) {
            var item = items.find(o => (o.ranking === rankNum) && (o.tierId === idTier));
            cellCollection.push(<div id={`rank-${idTier}-${rankNum}`} key={`rank-${idTier}-${rankNum}`} data-ranknum={rankNum} data-idtier={idTier } onDrop={drop} onDragOver={allowDrop} className="rank-cell">
                {(item != null) ? <img id={`item-${item.id}`} key={`item-${item.id}`} src={imgArr.find(o => o.id === item.imageId)?.image} draggable="true" onDragStart={drag} />
                    : null}
            </div>);
        }
    }

    function createCellsForRow() {  
        var rankNum = 0;
        var currCollection = [];
        cellCollectionRow.push(<div className="row-labeltp" id={rowName.replace(/\s/g, '') + 'tp'} key= { rowName.replace(/\s/g, '') + 'tp' } ><h4 id={rowName.replace(/\s/g, '') + "lbl"} key={rowName.replace(/\s/g, '') + "lbl"}>{rowName}</h4></div>)
        for (var a = 1; a <= numCells; a++)
        {
            rankNum = a;
            currCollection = cellCollectionRow;
            pushCellMarkupToArr(currCollection, rankNum);
        }
        cellCollectionRow.push(<div className = "botonera" id={rowName.replace(/\s/g, '') + 'bt'} key = {rowName.replace(/\s/g, '') + 'bt'}>
            <button id={rowName.replace(/\s/g, '') + "ee"} key={rowName.replace(/\s/g, '') + "ee"} className='button-deco' onClick={editTier}>
                Editar Tier
            </button>
            <button id={rowName.replace(/\s/g, '') + "eliminar"} key={rowName.replace(/\s/g, '') + "eliminar"} className='button-deco' onClick={() => dlTier(idTier)}>
                Eliminar Tier
            </button>
        </div>)
    }

    function createRowsForGrid() {
        rankingGrid.push(<div className="rank-row top-tier" id={rowName.replace(/\s/g, '')} key={rowName.replace(/\s/g, '') + orderRow}>{cellCollectionRow}</div>);
        return rankingGrid;
    }

    function createRankingGrid() {
        createCellsForRow();  
        return createRowsForGrid();
    }

    return (
        <div className="rankings" id={`rankingBase-${idTier}`} key={`rankingBase-${idTier}`} >
            {createRankingGrid()}
        </div>
    )
}


export default RankingRow;