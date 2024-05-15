import {faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {generalActions} from "../store/general.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";

function OrdersList() {
	const dispatch = useDispatch();
	const authState = useSelector((state: RootState) => state.auth);
	const authorizations = authState.authorizations;
	const handleBackButtonClick = () => {
		dispatch(generalActions.setMode('mainCard'));
	};
	return (
		<div className={'card-form-container order-list'}>
			<div className={'title'}>Order List</div>
			<FontAwesomeIcon icon={faUndo} onClick={handleBackButtonClick} title={'Return to main screen'} className={'back-icon'}/>
			<ul>
				{authorizations.map((authorization: {authorizationId: string, authorizationStatus: string}) => (
					<li key={authorization.authorizationId}>
						Authorization ID: {authorization.authorizationId}, Authorization
						Status: {authorization.authorizationStatus}
					</li>
				))}
			</ul>

		</div>
	)
}

export default OrdersList;