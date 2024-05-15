let unipaasInstance = null;

export function getUnipaasInstance() {
	if (!unipaasInstance) {
		unipaasInstance = new Unipaas();
		// use polyfiils for IE11
		unipaasInstance.usePolyfills();
	}

	return unipaasInstance;
}