import { Link } from 'react-router-dom';

import OfferDefault from '@/assets/offer.defaulf.svg';

import './Offer.css'

interface OfferProps {
    img?: string;
    title: string;
    text: string;
    link?: {
        text: string;
        path: string;
    };
}

export default ({img, title, text, link} : OfferProps) => {
    return (
        <div className='block home__suggestion__offer'>

            <img
                src={
                    img ?
                        img :
                        OfferDefault
                } 
                alt={title} 
            />
            <div className='home__suggestion__offer__description'>
               <strong>
                    {title}
                </strong>
                <p>
                    {text}
                </p>
                {
                    link ? 
                    <Link to={link.path} >
                        {link.text}
                    </Link> : null
                } 
            </div>
        </div>
  )
}
