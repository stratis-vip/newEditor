import { useEffect, useState } from "react";
import { snips } from "./snip";

const Snips = () => {
    const [snipTable, setSnipTable] = useState([]);
    const [snippetToLearn, setSnippetToLearn] = useState([])
    const [snipHidden, setSnipHidden] = useState(true)
    
    useEffect(() => {
        if (snipTable.length === 0) {
            setSnipTable(Object.entries(snips));
        }
    }, [snipTable]);

    useEffect(() => {
        if (snipTable.length > 0) {
            setSnippetToLearn(snipTable[randomIntFromInterval(0, snipTable.length - 1)])
        }

        const interval = setInterval(() => {
            setSnippetToLearn(snipTable[randomIntFromInterval(0, snipTable.length - 1)])
        }, 10000);
        return () => clearInterval(interval);
    }, [snipTable])

    return (<div className="mt-10">
        <div className="text-center">
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <label onClick={() => setSnippetToLearn(snipTable[randomIntFromInterval(0, snipTable.length - 1)])} className="text-xl italic">Random Snippet: <span className="font-bold">{snippetToLearn && snippetToLearn[0]}</span> => <span className="font-bold">{snippetToLearn && snippetToLearn[1]}</span></label>
        </div>
        {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <h1 className="text-center font-bold text-2xl mt-3"
            onClick={() => { setSnipHidden(!snipHidden) }}>
            Κατάλογος ενεργών snippets
        </h1>
        <table className="text-xl" hidden={snipHidden}>
            <tbody>
                {snipTable.map((t) => (
                    <tr key={t[0]} className="border">
                        <td className="border px-2">{t[0]}</td>
                        <td className="px-2">{t[1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}

export default Snips


function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}