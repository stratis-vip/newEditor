import { useEffect } from "react"

const Counter = ({counter,day}) => {



    return (<>{isNaN(day)? new Date().getDate() : day}: {counter}</>)
}


export default Counter