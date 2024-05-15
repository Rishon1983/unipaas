import React from 'react';

interface BaseLayoutProps {
	children?: React.ReactNode;
}

function BaseLayout(props: BaseLayoutProps) {
	return (
		<section>
			{/* slot */}
			{props.children}
		</section>
	)
}

export default BaseLayout