import "./App.css";
import { useEffect, useState } from "react";
import { capitalize, cleanText } from "./utils";
import Snips from "./snips";
import SendButton from "./SendButton";
import Counter from "./counter";

function App() {
	return (
		<div>

			<TextEditor />
		</div>
	);
}

export default App;

const TextEditor = () => {
	const [text, setText] = useState("");
	const [clipboardHistory, setClipboardHistory] = useState([])
	const [showHistory, setShowHistory] = useState(false)
	const [isReady, setReady] = useState(false);
	const [copied, setCopied] = useState(false);
	const [isHidden, setHidden] = useState(true);
	const [txtArea, setTxtArea] = useState(undefined)
	const [counter, setCounter] = useState(0)
	const [day, setDay] = useState()

	const changeText = (e) => {
		const newText = cleanText(e.target.value);
		setText(capitalize(newText));
		setCopied(false);
		navigator.clipboard.readText().then(
			(clipText) => {
				if (clipText !== '' && clipText.length > newText.length ) {
					navigator.clipboard.writeText('').then( (t)=> console.log('clipboard zeroed'))
					
				}
			}
		)
	};

	useEffect(() => {
		if (txtArea === undefined) {
			const txtArea = document.querySelector('#txt')

			if (txtArea !== undefined) {
				setTxtArea(txtArea)
				txtArea.focus();
			}

		}

	}, [txtArea])

	useEffect(() => {
		if (!isHidden) {
			setTimeout(() => {
				setHidden(true);
			}, 3000);
		}
	}, [isHidden]);

	useEffect(() => {
		const input = document.getElementById("txt");
		const handleEnter = (event) => {
			// If the user presses the "Enter" key on the keyboard
			if (event.key === "Enter") {
				// Cancel the default action, if needed
				event.preventDefault();
				// Trigger the button element with a click

				if (input.value.length > 70) {

					document.getElementById("clipB").click();
				} else {

					setText(s => {
						const txt = input.value
						const start = input.selectionStart
						return txt.slice(0, start) + '\n' + txt.slice(start)
					}
					)
				}
			}
		}
		// // Execute a function when the user presses a key on the keyboard
		input.addEventListener("keypress", handleEnter);

		return () => input.removeEventListener("keypress", handleEnter)
	}, [])

	useEffect(() => {
		const c = localStorage.getItem('counter')
		if (c != null) {
			 c.counter == null ? setCounter(0) : setCounter(Number(c.counter)) 

			setDay(Number(c.date))
		} else {
			setDay(new Date().getDate())
		}
		console.log('c = ', c)
	}, [])



	const setClipboard = () => {
		setHidden(false);
		if (copied === false) {
			setClipboardHistory(s => {
				const t = [...s, text]
				if (t.length > 10) {
					return t.slice(-10)

				}
				return t
			})
		}
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopied(true);

				setText("");
				console.log('counter = ', counter)
				// debugger

				let c = counter
				if (counter == null) { c = 0 }
				const d = new Date().getDate()
				if (day == null) {
					setDay(d)
					c = c + 1
				} else {
					if (d !== day) {
						c = 1
					}
				}
				const obj = {
					counter: c,
					date: d
				}
				console.log(obj)
				localStorage.setItem('counter', JSON.stringify(obj))
				setCounter(s => s + 1)

				// Success!
			})
			.catch((err) => {
				console.log("Something went wrong", err);
			})
			.finally(() => {
				txtArea.focus()
			})

	};

	useEffect(() => {
		if (text.length > 70) {
			setReady(true);
		} else {
			if (isReady) {
				setReady(false);
			}
		}
	}, [text, isReady]);

	return (
		<div className="flex flex-col flex-1 items-center mt-1">

			<div className="flex">
				<div >
					<textarea
						// id={"input"}
						tabIndex={0}
						id='txt'

						// rome-ignore lint/a11y/noAutofocus: <explanation>
						autoFocus
						rows="6"
						cols="35"
						className={`border-2 border-black  rounded-md p-3 text-2xl ${isReady ? "bg-green-300" : "bg-red-200"
							}`}
						onChange={changeText}
						value={text}
					/>
				</div>
				<div className="ml-5">
					<span className="font-bold" onClick={() => setShowHistory(s => !s)}>{showHistory ? 'Εμφάνιση Ιστορικού' : 'Απόκρυψη Ιστορικού'}</span>
					<div hidden={showHistory}>
						<ul>
							{clipboardHistory.map((l, idx) => <li key={idx}> <ShortText text={`${idx}. ${l}`} /></li>)}
						</ul></div>

				</div>
			</div>
			<Counter counter={counter} day={day} />

			<SendButton text={text} isReady={isReady} setClipboard={setClipboard} />
			<label
				className="mt-5 text-3xl p-2 pb-5 px-3 rounded text-white bg-green-400"
				hidden={isHidden}
			>
				{copied ? "Αντιγράφηκε το κείμενο" : "Νέο κείμενο"}
			</label>
			<Snips />

		</div>
	);
};


// function shuffle(array) {
// 	let currentIndex = array.length
// 	let randomIndex;

// 	// While there remain elements to shuffle.
// 	while (currentIndex !== 0) {

// 	  // Pick a remaining element.
// 	  randomIndex = Math.floor(Math.random() * currentIndex);
// 	  currentIndex--;

// 	  // And swap it with the current element.
// 	  [array[currentIndex], array[randomIndex]] = [
// 		array[randomIndex], array[currentIndex]];
// 	}

// 	return array;
//   }

const ShortText = ({ text }) => {

	const [shortText, setShortText] = useState('')
	const [showShort, setShowShort] = useState(true)

	useEffect(() => {
		if (text.length > 75) {
			setShortText(text.slice(0, 59) + '…')
		} else {
			setShortText('')
		}
	}, [text])
	return <div onClick={() => {
		setShowShort(s => !s)
	}}>{showShort ? shortText : text}</div>
}