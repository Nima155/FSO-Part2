const Header = ({ course }: any) => {
	return <h2>{course.name}</h2>;
};

const Total = ({ course }: any) => {
	return (
		<p style={{ fontWeight: "bold" }}>
			Number of exercises{" "}
			{course.parts.reduce(
				(prev: any, cur: { exercises: any }) => prev + cur.exercises,
				0
			)}
		</p>
	);
};

const Part = (props: any) => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>
	);
};

const Content = ({ course }: any) => {
	return (
		<div>
			{course.parts.map((ele: any) => (
				<Part part={ele} key={ele.id} />
			))}
		</div>
	);
};
export const Course = ({ course }: { course: any }) => {
	return (
		<div>
			<h1>Web development curriculum</h1>
			{course.map((ele: any) => {
				// one key encapsulating all the other children, cannot use a fragment here?
				return (
					<div key={ele.id}>
						<Header course={ele} />
						<Content course={ele} />
						<Total course={ele} />
					</div>
				);
			})}
		</div>
	);
};
