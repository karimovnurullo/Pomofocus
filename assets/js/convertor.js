// time = 1500, 1440
export function timeConvertor(time) {
	const minute = Math.floor(time / 60);
	const second = time % 60;

	let result = (minute < 10 ? "0" : "") + minute;
	result += ":" + (second < 10 ? "0" : "") + second;

	return result;
}