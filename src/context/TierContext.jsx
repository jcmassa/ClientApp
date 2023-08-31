//import axios from 'axios';
import { createContext, useState, useEffect } from "react"
import rankingApi from '../api/RankingAPI'
//import * as AxiosLogger from 'axios-logger';
//import {baseURL} from '../EndPoints';
export const TierContext = createContext(); //El nombre del contexto

//Se podría considerar separar la implementación del contexto para Tiers e Items y poner el de Tiers
//dentro del de Items(dado que los tiers a traer tienen un tipo de Item al que responden y no al reves)
//Para simplificar al ser una practica, se manejan los dos aca.

export function ContextProvider(props) {

    const [tierItems, setTierItems] = useState([]);
    const [movieItems, setMovieItems] = useState([]);

    function getTiersFromApi() {  

        //rankingApi.interceptors.request.use((request) => {
            // write down your request intercept.
        //     return AxiosLogger.requestLogger(request, {
        //         prefixText: 'your prefix',
        //         dateFormat: 'HH:MM:ss',
        //         status: false,
        //         headers: true
        //     });
        // });
        // rankingApi.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

        rankingApi.get(`TierModels`)
        .then((response) => response.data)
        .then((json) => {  
            //console.log("json", json);  
            //console.log("json", json.sort(ordernar));           
            setTierItems(json.sort(ordernar));          
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getItemsFromApi()
    {  
        rankingApi.get(`ItemModels`)
        .then((response) => response.data)
        .then((json) => {
          setMovieItems(json);          
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function changeItemRank(idItem, rankItem, idTierNew)
    {
        rankingApi.patch(`ItemModels/${idItem}/tierId/${idTierNew}/${rankItem}`).then(()=> {return rankingApi.get(`ItemModels`)}).then(res=> {setMovieItems(res.data)});
        
        //const transformedCollection = movieItems.map((item) => (item.id === idItem) ?
        //    { ...item, ranking: rankItem, tierId: idTierNew } : { ...item, ranking: item.ranking, tierId: item.tierId });
        //setMovieItems(transformedCollection);
    }

    function createEditTier(tierId, nombre, cantidad)
    {
        if (tierId == 0)
        { 
            //var newId = tierItems.reduce((max, current) => Math.max(max, current.id), 0) +1;
            //var nroFila = tierItems.reduce((max, current) => Math.max(max, current.rowNumber), 0) +1;
            let data =
            {
                //id: newId,
                rowName: nombre,
                numCells: parseInt(cantidad)
                //RowNumber: nroFila
            }
             //console.log("json", data);
            rankingApi.post(`TierModels`, data).then(()=> {return rankingApi.get(`TierModels`)}).then(res=> {setTierItems(res.data.sort(ordernar))});
        }
        else
        {
            let dataEdit =
            {
                id: tierId,
                rowName: nombre,
                numCells: parseInt(cantidad)
            }
            rankingApi.patch(`TierModels/${tierId}`,dataEdit).then(()=> {return rankingApi.get(`TierModels`)}).then(res=> {setTierItems(res.data.sort(ordernar))});
            //limpiarSueltos(tierId, cantidad)
            reloadItems()
        }
    }

    function setItems()
    {

    }

    function limpiarSueltos(id, tierId, rankId) {
        //const transformedCollection = movieItems.map((item) => (item.tierId === tierId && item.ranking > rankId) ?
        //    { ...item, ranking: 0, tierId: 0 } : { ...item, ranking: item.ranking, tierId: item.tierId });
        //set       MovieItems(transformedCollection);


        ///VER
        rankingApi.patch(`ItemModels/${id}/tierId/${tierId}/${rankId}`).then(()=> {return rankingApi.get(`ItemModels`)}).then(res=> {setMovieItems(res.data)});    
    }

    function ordernar(a, b)
    {
        return  (a.rowNumber-b.rowNumber);
    }

    function deleteTier(tierId)
    {
        rankingApi.delete(`TierModels/${tierId}`).then(()=> {return rankingApi.get(`TierModels`)}).then(res=> {setTierItems(res.data.sort(ordernar))});
        reloadItems()
        //limpiarSueltos(tierId, -1);
    }

    function functionCleanType(idType)
    {
        rankingApi.get(`ItemModels/ResetType/${idType}`).then(()=> {return rankingApi.get(`ItemModels`)}).then(res=> {setMovieItems(res.data)}); 
    }

    function reloadItems()
    {
        getItemsFromApi();
    }

    function getTierById(idTier)
    {
        return tierItems.find(t=>t.id === idTier);
    }

    useEffect(() => {
        if (movieItems == null || movieItems.length == 0) {
            getItemsFromApi();
        }
    });

    useEffect(() => {
        if (tierItems == null || tierItems.length == 0)
        {
            getTiersFromApi();
        }
    });


    //useEffect(() => {getTiersAPI().then(tiers => setTierItems(tiers))},[]);

    return (
        <TierContext.Provider value={{
            tiers: tierItems, items: movieItems, setTiers: createEditTier,
            dlTier: deleteTier, setFunc: setItems, rlItems: reloadItems,
            rankChg: changeItemRank, getTierId: getTierById, cleanFc: functionCleanType
        }} >{props.children}
        </TierContext.Provider>
    );
}



