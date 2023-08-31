const Item = ({ item, drag, itemImgObj }) => {
    return (
        <div className="unranked-cell" key ={`itemdiv-${item.id}`}>
            <img id={`item-${item.id}`} key ={`item-${item.id}`} src={itemImgObj.image}
                style={{ cursor: "pointer" }} draggable="true" onDragStart={drag}
                data-itemid={item.id}
            />
        </div>
    )
}
export default Item;