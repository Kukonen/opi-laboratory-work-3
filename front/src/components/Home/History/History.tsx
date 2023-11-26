import { useEffect } from 'react';
import Story from './Story/Story';

import './History.css';
import { useSelector } from 'react-redux';
import { RootState, useStoreDispatch } from '@/store/store';
import { getHistory } from '@/store/reducers/history';

export default () => {
    const dispatch = useStoreDispatch();
    const history = useSelector((state: RootState) => state.history).history[0];

    useEffect(() => {
        dispatch(getHistory());
    }, [])


    return (
        <div 
            id="home__history"
            className='block'
        >
            {
                // @ts-ignore
                history ? history.map(story =>  
                    <Story 
                        key={`story_${story.id}`}
                        description={story.description}
                        type={story.type}
                    />    
                ) : null
            }
        </div>
    )
}
