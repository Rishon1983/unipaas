export default function initTokenize(unipaas, SESSION_TOKEN) {
	unipaas.initTokenize(
		SESSION_TOKEN,
		{
			cardNumber: {
				selector: "#card-number",
				placeholder: "1234 5678 9012 3456 12"
			},
			cvv: {selector: "#cvv-number", placeholder: "123"},
			expiry: {
				selector: "#expiry-date",
				placeholder: "MM/YY"
			},

			// card holder field:
			cardHolder: {
				selector: "#holdername",
				placeholder: "A. Einstein"
			}
		},

		// submit button field will be sent in the third argument as additional field
		{
			additionalFields: {
				submitButton: {
					selector: "#submit-form"
				}
			},

			mode: 'test' //possible values: live (production) or test(sandbox)
		}
	);
}