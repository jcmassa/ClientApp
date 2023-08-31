import { useState, useContext  } from 'react';
import RankItems from './RankItem';
import { ContextProvider, TierContext } from '../context/TierContext'

const RankItemsContainer = ({ dataType, imgArr }) => {
    const { tiers } = useContext(TierContext);
    const { items } = useContext(TierContext);
    const { setFunc } = useContext(TierContext);
    const { setTiers } = useContext(TierContext);
    const { rlItems } = useContext(TierContext);
    const { rankChg } = useContext(TierContext);
    const { dlTier } = useContext(TierContext);
    const {cleanFc} = useContext(TierContext);

    return (
        
        <RankItems items={items} imgArr={imgArr}
            tiers={tiers} setTiers={setTiers}
             reloadItems={rlItems} rankChange={rankChg} cleanfunc = {cleanFc}/>        
        )


}
export default RankItemsContainer;