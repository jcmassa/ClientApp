import Item from './Item';

const ItemCollection = ({ items, drag, imgArr, idTier }) => {
    return(<div className='items-not-ranked' key ={`itemcoldiv`}>
        { 
            items.map((item) =>(item.ranking === 0)
                ? <Item key={`item-${item.id}`} item={item} drag={drag} itemImgObj={imgArr.find(o => o.id === item.imageId)} />
            :null)
        }
    </div>)
    
}
export default ItemCollection;