import React, {useEffect, useState} from 'react';
import {RootState} from "../store";
import {useSelector, useDispatch} from "react-redux";
import {generalActions} from "../store/general.ts";
import {fetchSessionToken, verifyAuthorization} from "../store/auth.ts";
import {getUnipaasInstance} from '../utils/unipaasInstance';
import {payWithToken} from "../utils/payWithToken";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSterlingSign, faUndo} from "@fortawesome/free-solid-svg-icons";
import {faCreditCard} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faHashtag} from '@fortawesome/free-solid-svg-icons';

function ExistCardForm() {

	const authState = useSelector((state: RootState) => state.auth);
	const amount = authState.amount;
	let unipaas = null;

	const dispatch = useDispatch();
	const sessionToken = useSelector((state: RootState) => state.auth.sessionToken);
	const paymentOptions = authState.paymentOptions;

	useEffect(() => {
		dispatch(fetchSessionToken(authState.consumerId) as any);
	}, [
		dispatch
	]);

	useEffect(() => {
		if (!authState.sessionToken) return;

		unipaas = getUnipaasInstance();
		payWithToken(unipaas, authState.sessionToken);

		unipaas.on('onSuccess', function (data: any) {
			console.log('Success:', data);
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

	const handleButtonClick = () => {
		disableButtonOnSuccess(true);
		if (!unipaas) return;
		const paymentOptions = authState.paymentOptions
		unipaas.makePayment(paymentOptions.paymentOptionId);
	};

	function disableButtonOnSuccess(toDisable: boolean) {
		var sendButton = window.document.getElementById('pay-button');
		if (sendButton && toDisable) {
			sendButton.disabled = true;
		}
	}

	const [showPopup, setShowPopup] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const handleSuccess = () => {
		setPaymentSuccess(true);
		setShowPopup(true);
	};
	const handleError = (error: any) => {
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
		<div className={'card-form-container exist-card'}>
			<FontAwesomeIcon icon={faUndo} onClick={handleBackButtonClick} title={'Return to main screen'}
							 className={'back-icon'}/>
			<div className="amount-container">
				<div className="amount-icon">
					<FontAwesomeIcon icon={faSterlingSign}/>
				</div>
				<div className="amount-value">{amount || 0}</div>
			</div>
			<div className={'form'}>

				<div className={'payment-field card-number'}>
					<label>Brand</label>
					<div className={'content'}>
						<FontAwesomeIcon icon={faCreditCard} className={'icon'}/>
						<div className={'data'}>{paymentOptions?.brand || 'Card'}</div>
					</div>
				</div>
				<div className={'payment-field card-number'}>
					<label>last 4 digits card number</label>
					<div className={'content'}>
						<FontAwesomeIcon icon={faHashtag} className={'icon'}/>
						<div className={'data'}>{paymentOptions?.last4digits || '****'}</div>
					</div>
				</div>
				<div className={'payment-field card-holder'}>
					<label>Cardholder name</label>
					<div className={'content'}>
						<FontAwesomeIcon icon={faUser} className={'icon'}/>
						<div className={'data'}>{paymentOptions?.nameOnCard || '**** ****'}</div>
					</div>
				</div>
			</div>
			<button id={'pay-button'} onClick={handleButtonClick}>Pay</button>


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

export default ExistCardForm;