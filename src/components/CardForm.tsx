import React, {useEffect, useRef, useState} from 'react';
import FormGroup from "../layouts/FormGroup.tsx";
import {RootState} from "../store";
import {useSelector, useDispatch} from "react-redux";
import {generalActions} from "../store/general.ts";
import {fetchSessionToken, verifyAuthorization} from "../store/auth.ts";
import {getUnipaasInstance} from '../utils/unipaasInstance';
import initTokenize from "../utils/initTokenize";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSterlingSign} from '@fortawesome/free-solid-svg-icons';
import {faUndo} from '@fortawesome/free-solid-svg-icons';

function CardForm() {
	const isCheckboxCheckedRef = useRef(false);
	const authState = useSelector((state: RootState) => state.auth);
	const amount = authState.amount;

	const dispatch = useDispatch();
	const sessionToken = useSelector((state: RootState) => state.auth.sessionToken);

	useEffect(() => {
		dispatch(fetchSessionToken(null) as any);
	}, [
		dispatch
	]);

	useEffect(() => {
		if (!sessionToken) return;

		const unipaas = getUnipaasInstance();
		initTokenize(unipaas, sessionToken);

		unipaas.on('onSuccess', function (data: any) {
			console.log('Success:', data);

			if (isCheckboxCheckedRef.current) {
				data.saveCard = true;
			}

			dispatch(verifyAuthorization(data) as any);
			handleSuccess();
			disableButtonOnSuccess(true);
		})
		unipaas.on('onError', function (err: any) {
			console.log('Error:', err);
			handleError(err.status || 'An error occurred');
		})

	}, [sessionToken]);


	const handleBackButtonClick = () => {
		dispatch(generalActions.setMode('mainCard'));
	};

	function disableButtonOnSuccess(toDisable: boolean) {
		var sendButton = window.document.getElementById('submit-form');
		if (sendButton && toDisable) {
			sendButton.disabled = true;
		}
	}

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		isCheckboxCheckedRef.current = event.target.checked;
	};


	const [showPopup, setShowPopup] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const handleSuccess = () => {
		setPaymentSuccess(true);
		setShowPopup(true);
	};
	const handleError = (error) => {
		setErrorMessage(error);
		setShowPopup(true);
	};
	const closePopup = () => {
		setShowPopup(false);
		// Optionally reset success and error states here
		// setPaymentSuccess(false);
		// setErrorMessage('');
	};

	return (
		<div className={'card-form-container'}>
			<FontAwesomeIcon icon={faUndo} onClick={handleBackButtonClick} title={'Return to main screen'}
							 className={'back-icon'}/>
			<div className="amount-container">
				<div className="amount-icon">
					<FontAwesomeIcon icon={faSterlingSign}/>
				</div>
				<div className="amount-value">{amount}</div>
			</div>
			<form>
				<FormGroup label={'Card number'} id={'card-number'}>
					<div className="secure-field" id="card-number"></div>
				</FormGroup>
				<FormGroup label={'Expiry date'} id={'expiry-date'}>
					<div className="secure-field" id="expiry-date"></div>
				</FormGroup>
				<FormGroup label={'CVC/CVV'} id={'cvv-number'}>
					<div className="secure-field" id="cvv-number"></div>
				</FormGroup>
				<FormGroup label={'Cardholder name'} id={'holdername'}>
					<div className="card-holder" id="holdername"></div>
				</FormGroup>
				<div className="payment-checkbox">
					<input type="checkbox" name="save-card" onChange={handleCheckboxChange}></input>
					<label htmlFor="save-card">Save my credit card details securly for future purchases</label>
				</div>
				{/*<button id="submit-payment">Pay now</button>*/}
				<button id="submit-form">Pay now</button>
			</form>

			{showPopup && (
				<div className="popup-overlay">
					<div className="popup">
						{paymentSuccess ? (
							<div className="success-message">
								Payment successful!
							</div>
						) : (
							<div className="error-message">
								{errorMessage}
							</div>
						)}
						<button onClick={closePopup}>Close</button>
					</div>
				</div>
			)}

		</div>
	)
}

export default CardForm;