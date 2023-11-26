import { useEffect } from 'react'
import Offer from './Offer/Offer'

import './Suggestion.css';
import { Suggestion, getSuggestions } from '@/store/reducers/suggestion';
import { useSelector } from 'react-redux';
import { RootState, useStoreDispatch } from '@/store/store';

export default () => {
    const dispatch = useStoreDispatch();
    const suggestion:Suggestion = useSelector((state: RootState) => state.suggestion);

    useEffect(() => {
        dispatch(getSuggestions());
    }, [])

    return (
        <div id="home__suggestion">
            {suggestion.offers.map(offer => 
                (
                    <Offer 
                        key={`offer_${offer.id}`}
                        img={offer.img}
                        title={offer.title}
                        text={offer.text}
                        link={offer.link}
                    />
                )
            )}
        </div>
    )
}
