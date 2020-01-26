import { ANSIAttr } from "../@types/Colors";

const _aBlack = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}30m`;
const _aRed = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}31m`;
const _aGreen = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}32m`;
const _aYellow = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}33m`;
const _aBlue = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}34m`;
const _aMagenta = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}35m`;
const _aCyan = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}36m`;
const _aWhite = (attr?: ANSIAttr[]) => `\u001b[${attr ? attr.join(";") + ";" : ""}37m`;
const _aEsc = "\u001b[0m";


const _wBlack = () => `<span style="color:black;">`;
const _wRed = () => `<span style="color:red;">`;
const _wGreen = () => `<span style="color:lime;">`;
const _wYellow = () => `<span style="color:yellow;">`;
const _wBlue = () => `<span style="color:blue;">`;
const _wMagenta = () => `<span style="color:magenta;">`;
const _wCyan = () => `<span style="color:cyan;">`;
const _wWhite = () => `<span style="color:white;">`;
const _wEsc = "</span>";


const aBlack = (str: string, attr?: ANSIAttr[]): string => {
	return _aBlack(attr) + str + _aEsc;
};
const aRed = (str: string, attr?: ANSIAttr[]): string => {
	return _aRed(attr) + str + _aEsc;
};

const aGreen = (str: string, attr?: ANSIAttr[]): string => {
	return _aGreen(attr) + str + _aEsc;
};

const aYellow = (str: string, attr?: ANSIAttr[]): string => {
	return _aYellow(attr) + str + _aEsc;
};

const aBlue = (str: string, attr?: ANSIAttr[]): string => {
	return _aBlue(attr) + str + _aEsc;
};

const aMagenta = (str: string, attr?: ANSIAttr[]): string => {
	return _aMagenta(attr) + str + _aEsc;
};

const aCyan = (str: string, attr?: ANSIAttr[]): string => {
	return _aCyan(attr) + str + _aEsc;
};

const aWhite = (str: string, attr?: ANSIAttr[]): string => {
	return _aWhite(attr) + str + _aEsc;
};


const wBlack = (str: string): string => {
	return _wBlack() + str + _wEsc;
};
const wRed = (str: string): string => {
	return _wRed() + str + _wEsc;
};

const wGreen = (str: string): string => {
	return _wGreen() + str + _wEsc;
};

const wYellow = (str: string): string => {
	return _wYellow() + str + _wEsc;
};

const wBlue = (str: string): string => {
	return _wBlue() + str + _wEsc;
};

const wMagenta = (str: string): string => {
	return _wMagenta() + str + _wEsc;
};

const wCyan = (str: string): string => {
	return _wCyan() + str + _wEsc;
};

const wWhite = (str: string): string => {
	return _wWhite() + str + _wEsc;
};


const c = {
	aBlack,
	aRed,
	aGreen,
	aYellow,
	aBlue,
	aMagenta,
	aCyan,
	aWhite,
	wBlack,
	wRed,
	wGreen,
	wYellow,
	wBlue,
	wMagenta,
	wCyan,
	wWhite,
};

export default c;
