import './App.css'
import BaseLayout from "./layouts/BaseLayout.tsx";
import CardForm from "./components/CardForm.tsx";
import MainForm from "./components/MainForm.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import ExistCardForm from "./components/ExistCardForm.tsx";
import OrdersList from "./components/OrdersList.tsx";

function App() {
	const mode = useSelector((state: RootState) => state.general.mode);

	return (
		<BaseLayout>
			{mode === 'newCard' && <CardForm/>}
			{mode === 'existCard' && <ExistCardForm/>}
			{mode === 'mainCard' && <MainForm/>}
			{mode === 'ordersList' && <OrdersList/>}
		</BaseLayout>
	)
}

export default App
