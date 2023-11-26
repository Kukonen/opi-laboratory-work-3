import Person from './Person/Person'
import Balance from './Balance/Balance'

import './Profile.css';
import Navigation from './Navigation/Navigation';

export default () => {
  return (
    <div id="profile">
        <Person />
        <Balance />
        <Navigation />
    </div>
  )
}
