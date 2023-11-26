import { Outlet } from 'react-router-dom';

import './Auth.css';

export default () => {
  return (
    <div id='auth'>
      <Outlet />
    </div>
  )
}
