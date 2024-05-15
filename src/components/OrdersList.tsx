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
			<div className={'title'}>Orders List</div>
			<FontAwesomeIcon icon={faUndo} onClick={handleBackButtonClick} title={'Return to main screen'}
							 className={'back-icon'}/>
			<ul>
				{authorizations.map((authorization: { authorizationId: string, authorizationStatus: string }) => (
					<li key={authorization.authorizationId}>
						<div className={'row'}>
							<span className={'title'}>Authorization ID:</span>
							<span className={'data'}>{authorization.authorizationId}</span>
						</div>
						<div className={'row'}>
							<span className={'title'}>Status:</span>
							<span className={'data'}>{authorization.authorizationStatus}</span>
						</div>
					</li>
				))}
			</ul>

		</div>
	)
}

export default OrdersList;