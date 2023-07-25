const getRandColourValue = () => {
	return (Math.floor(Math.random() * 6) + 4) * 20;
};

const getRandRGB = () => {
	const r = getRandColourValue();
	const g = getRandColourValue();
	const b = getRandColourValue();

	return `${r}, ${g}, ${b}`;
};

export {
	getRandRGB,
};
