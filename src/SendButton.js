const SendButton = ({text, setClipboard, isReady}) => {
    return <div className="flex items-center mt-2">
        <div className="mr-10">
            <label>Χαρακτήρες: {text.length}</label>{" "}
        </div>
        <div>
            <button
                id={"clipB"}
                tabIndex={-1}
                type="button"
                onClick={setClipboard}
                disabled={!isReady}
                className={
                    isReady
                        ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        : "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                }
            >
                Αντιγραφή
            </button>
        </div>
    </div>
}

export default SendButton