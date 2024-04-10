import { snips } from "./snip";
export const clearNewLines = {
	searchValue: /\s*\n/g,
	replaceValue: "\n",
};

export const spaceDotSpaces = {
	searchValue: /(\s*[.])+\s*/g,
	replaceValue: "$1",
};

export const spaceBeforeEndStiksi = {
	searchValue: / +([,.;!])/g,
	replaceValue: "$1",
};

export const emptySpacesAtTheStart = {
	searchValue: /^ +/gm,
	replaceValue: "",
};

export const clearTheStart = {
	searchValue: /^[, ;!?'"΄¨]+/gm,
	replaceValue: "",
};

// function restore_options() {
// 	// Use default value color = 'red' and likesColor = true.
// 	chrome.storage.sync.get(
// 		{
// 			favoriteColor: "red",
// 			likesColor: true,
// 			snips: "",
// 		},
// 		function (items) {
// 			console.log(items);
// 		},
// 	);
// }

// restore_options()
export const replaceEnglishQuestionMark = {
	searchValue: /([α-ω]|[Α-Ω]|[άέήίόύϋϊΐΰ]|[ΆΈΉΊΌΎΫΪ])(\?+)/g,
	replaceValue: "$1;",
};

export const repairExclamations = {
	searchValue: /[,.; +]+([!;?])+/g, //[;,\ .]{1,}(!)
	replaceValue: "$1",
};

export const repairDotAfterExclamations = {
	searchValue: /([!;?])+[,.; +]+\n/g, //[;,\ .]{1,}(!)
	replaceValue: "$1\n",
};

export const repairDotAfterExclamationsWithNoReturn = {
	searchValue: /([!;?])+[,.; +]+\s+/g, //[;,\ .]{1,}(!)
	replaceValue: "$1 ",
};

export const capitalizeInSentence = {
	searchValue: /[.!;?] ([ά-ώa-z])/g,
	replaceValue: (c) => c.toUpperCase(),
};

export const correctTwoOrMoreCapital = {
	searchValue: /([A-ZΆ-Ω]{2,})/g,
	replaceValue: (c) => c.toLowerCase(),
};

export const correctCommaBeforeGreekQuestion = {
	searchValue: /[ ,]+\s*;+/g,
	replaceValue: ";",
};

export const correctCommaAtTheEnd = {
	searchValue: /(\s*[,])+\s*\n\B/gm,
	replaceValue: ".\n",
};

export const correctDotAtTheEndWithNoNL = {
	searchValue: /(\s*[,])+\s*\.+s*\B/gm,
	replaceValue: ".",
};

export const correctDotAtTheEnd = {
	searchValue: /(\s*[,])+\s*\.+\s*\n*\B/gm,
	replaceValue: ".\n",
};

export const correctDotBetweenWords = {
	searchValue:
		/([a-zα-ωάέήίϊόύϋΑ-ΩΆΈΉΊΪΌΎΫ]\.)([a-zA-Zα-ωάέήίϊόύϋΑ-ΩΆΈΉΊΪΌΎΫ])/g,
	replaceValue: (c, a, b) => `${a}. ${b.toUpperCase()}`,
};

export const correctQuestionMarkBetweenWords = {
	searchValue:
		/([a-zα-ωάέήίϊόύϋΑ-ΩΆΈΉΊΪΌΎΫ];)([a-zA-Zα-ωάέήίϊόύϋΑ-ΩΆΈΉΊΪΌΎΫ])/g,
	replaceValue: (c, a, b) => `${a}; ${b.toUpperCase()}`,
};

export const correctExclamationMarkBetweenWords = {
	searchValue:
		/([a-zα-ωάέήίϊόύϋΑ-ΩΆΈΉΊΪΌΎΫ]!)([a-zA-Zα-ωάέήίϊόύϋΑ-ΩΆΈΉΊΪΌΎΫ])/g,
	replaceValue: (c, a, b) => `${a}! ${b.toUpperCase()}`,
};

export const bugQuestionDot = {
	searchValue: /;\./gm,
	replaceValue: ";",
};

export const capitalize = (theTxt) => {
	const txt = String(theTxt);
	// let newText = txtArea.value.replaceAll(/^([a-zα-ωάέήίϊόύϋ])|(\n[a-zα-ωάέήίϊόύϋ])/g, c => c.toUpperCase())
	return txt.replace(/^([a-zα-ωάέήίϊόύϋ])|(\n[a-zα-ωάέήίϊόύϋ])/g, (c) =>
		c.toUpperCase(),
	);
};

// export const correctAll = txt => {
//   txt.value = checkForMistakes(txt.value)
//   txt.value = capitalize(txt.value)
// }

export const cleanText = (
	txt,
	rules = [
		clearNewLines,
		emptySpacesAtTheStart,
		repairExclamations,
		repairDotAfterExclamations,
		repairDotAfterExclamationsWithNoReturn,
		clearTheStart,
		spaceBeforeEndStiksi,
		replaceEnglishQuestionMark,
		correctCommaBeforeGreekQuestion,
		correctCommaAtTheEnd,
		correctDotAtTheEndWithNoNL,
		correctDotAtTheEnd,
		correctTwoOrMoreCapital,
		correctDotBetweenWords,
		correctQuestionMarkBetweenWords,
		correctExclamationMarkBetweenWords,
		bugQuestionDot,

		capitalizeInSentence,
	],
) => {
	let retVal = String(txt);
	const numOfRules = rules ? rules.length : 0;
	for (let i = 0; i !== numOfRules; ++i) {
		// console.log('(before)',retVal)o
		// const before = retVal
		retVal = retVal.replace(rules[i].searchValue, rules[i].replaceValue);
		// // console.log('(after)',retVal)
		// if (retVal !== before){
		//   console.log('before->',before,'\after->', retVal,'\n by->',JSON.stringify(rules[i],null,2))
		// }
	}
	retVal = removeManySames(retVal);

	return replaceSnips(retVal);
};

export const rplObj = (text, obj) => {
	return text.replace(obj.searchValue, obj.replaceValue);
};

export const removeManySames = (txt) => {
	const manys = ["!", ".", " ", ";", ":", ",", "΄", "¨", '"', "?", "'"];
	let retVal = String(txt);
	for (let i = 0; i < manys.length; ++i) {
		const r = new RegExp(`([${manys[i]}]){2,}`, "g");
		retVal = retVal.replace(r, "$1");
	}
	return retVal;
};

export const lowerStringButStart = (s) => {
	const retVal = String(s)
		.split("")
		.map((a, idx) => (idx !== 0 ? a.toLowerCase() : a));
	return retVal.join("");
};

export const replaceSnips = (txt) => {
	const local = String(txt);
	const wordsWithNL = local.split("\n");
	const correctedWordsWithNL = wordsWithNL.map((word) => formatSnip(word));

	const newLocal = correctedWordsWithNL.join("\n");
	const words = newLocal.split(" ");
	const correctedWords = words.map((word) => formatSnip(word));
	const retVal = correctedWords.join(" ");
	return retVal;
};

export const isCapital = (letter) => {
	const letters = /[A-ZΑ-ΩΆΈΉΊΊΥΎΫΏ]/g;
	if (!letter || letter.length === 0) return false;
	return letters.test(letter[0]);
};

export const formatSnip = (snp) => {
	if (snips[myLowerCase(snp)]) {
		const isFirstCapital = snp.length > 0 ? isCapital(snp) : false;
		const isSecondCapital = snp.length > 1 ? isCapital(snp[1]) : false;
		const needCapitalize = isFirstCapital || isSecondCapital;
		if (needCapitalize) {
			if (isSecondCapital) {
				return snips[myLowerCase(snp)].toUpperCase();
			}
			return capitalize(snips[myLowerCase(snp)]);
		}
		return snips[snp];
	}
	return snp;
};

export const getInnermostHovered = () => {
	let n = document.querySelector(":hover");

	let nn;
	while (n) {
		nn = n;
		n = nn.querySelector(":hover");
	}
	return nn;
};


// export const snips = [
//   πχ:"που χάθηκες "},
//   κδ:"καλή εβδομάδα "},
//   μτκ:"ματάκια "},
//   μκα:"μια όμορφη καλημέρα "},
//   ψλ:"ψωλαρά μου  "},
//   κρλ:"καριόλη άντρα "},
//   μμ:"μηνυματα "},
//   μκσ:"μια όμορφη καλησπέρα "},
//   κσ:"καλησπέρα  "},
//   δθ:"δεν θέλω να "},
//   αγμ:"αγορίνα μου "},
//   φσ:"ποια είναι η φαντασίωση σου"},
//   δσ:"δεν συνηθίζω να "},
//   επφ", full:"σε ευχαριστώ πολύ για το όμορφο φιλάκι σου "},
//   πσ:"προσωπικά μου στοιχεία "},
//   στμ:"στειλε μου ενα μηνυμα "},
//   φγ:"φωτογραφία στο προφίλ σου "},
//   //", full:"%dd%/%mm%: "},
//   κβκ", full:"καλό Σαββατοκύριακο "},
//   κμ:"καλημερα "},
//   πτσ:"πουτσαρά μου "},
//   κρδ:"καρδούλα μου "},
//   γμσ", full:"γάμησε με "},
//   κβλ:"καυλιάρη μου  "},
//   δξ", full:"δεν θα ξαναμπαίνεις πια; "},
//   ενξ", full:"ΕΝΑΡΞΗ: %dd%/%mm%/%yyyy% "},
//   νμσ:"να μου στείλεις "},
//   σβκ:"σαββατοκύριακο"},
//   χπ:"χρόνια πολλά "},
//   μσ:"μόλις συνδεθείς να "}
// ]

export const myLowerCase = (txt) => {
	const local = String(txt);
	return local
		.split("")
		.map((letter) => (letter === "Σ" ? "σ" : letter.toLowerCase()))
		.join("");
};
