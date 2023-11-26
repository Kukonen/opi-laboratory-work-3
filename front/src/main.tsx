import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';

import { routing } from './routing/index.tsx';

import './styles/theme.css';
import './styles/index.css';
import './styles/blocks.css';
import './styles/elements.css';

import { store } from '@/store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={routing}/>
        </Provider>
    // </React.StrictMode>,
)
