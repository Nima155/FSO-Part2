const Notification = ({
	message,
	theme,
}: {
	message: string;
	theme: string;
}) => {
	if (!message) {
		return null;
	}

	return (
		<div
			style={{
				padding: "10px",
				border: `5px solid ${theme}`,
				color: `${theme}`,
				backgroundColor: "lightgray",
				margin: "5px 0px",
				borderRadius: "5px",
			}}
		>
			<p>{message}</p>
		</div>
	);
};
export default Notification;
