import {useDispatch, useSelector} from "react-redux";
import {generalActions} from "../store/general.ts";
import {useEffect} from "react";
import {getInitData} from "../store/auth.ts";
import {RootState} from "../store";
import paymentImage from '../assets/payment.webp';


function MainForm() {
	const dispatch = useDispatch();
	const authState = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(getInitData() as any);
	}, [
		dispatch
	]);

	const handleButtonClick = (newMode: string) => {
		dispatch(generalActions.setMode(newMode));
	};


	return (
		<div className={'card-form-container main-form-container'}>
			<img src={paymentImage} alt="Credit Card"/>
			{authState.paymentOptions?.paymentOptionId ?
				<button onClick={() => handleButtonClick('existCard')}>Pay by saved card</button> : null}
			<button onClick={() => handleButtonClick('newCard')}>Pay by new card</button>
			<button onClick={() => handleButtonClick('ordersList')}>Orders</button>
		</div>
	)
}

export default MainForm;