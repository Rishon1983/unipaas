import React from 'react';

interface FormGroupProps {
	children?: React.ReactNode;
	label: string;
	id?: string;
}

function FormGroup(props: FormGroupProps) {
	//const [count, setCount] = useState(0)

	return (

		<div className={`payment-field ${props.id}`}>
			<label htmlFor={props.id}>
				{props.label}
				<div className={'secure-field--container'}>

					{/* slot */}
					{props.children}

					<i className="secure-field--icon"></i>
				</div>
			</label>
		</div>
	)
}

export default FormGroup