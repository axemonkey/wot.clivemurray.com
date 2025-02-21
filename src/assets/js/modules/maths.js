const degToRad = deg => {
	return (Number.parseInt(deg, 10) * Math.PI) / 180;
};

const cosDeg = angle => {
	return Math.cos(degToRad(Number.parseInt(angle, 10)));
};

const sinDeg = angle => {
	return Math.sin(degToRad(Number.parseInt(angle, 10)));
};

export {
	degToRad,
	cosDeg,
	sinDeg,
};
