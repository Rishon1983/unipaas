import {faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {generalActions} from "../store/general.ts";
import {useDispatch} from "react-redux";

function OrdersList() {
	const dispatch = useDispatch();
	const handleBackButtonClick = () => {
		dispatch(generalActions.setMode('mainCard'));
	};
	return (
		<div className={'card-form-container order-list'}>
			<div className={'title'}>Order List</div>
			<FontAwesomeIcon icon={faUndo} onClick={handleBackButtonClick} title={'Return to main screen'}
							 className={'back-icon'}/>
		</div>
	)
}

export default OrdersList;