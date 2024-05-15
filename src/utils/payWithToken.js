export const payWithToken = (unipaas, SESSION_TOKEN) => {
	unipaas.payWithToken(
		SESSION_TOKEN,
		{
			mode: 'test'
		}
	);
};