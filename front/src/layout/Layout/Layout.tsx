import Header from "../Header/Header"
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Toast from '../Toast/Toast';

import './Layout.css';

export default () => {
	return (
		<>
			<Header />
			<Main />
			<Footer />
			<Toast />
		</>
	)
}