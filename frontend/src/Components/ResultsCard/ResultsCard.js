
export default function ResultsCard(props) {
    return(
        <div>
            <h1>Results</h1>
            <div className="results--preferred">
                <h2>Preferred</h2>
                <div></div>
            </div>
            <div className="results--disqualified">
                <h2>Disqualified</h2>
                <div></div>
            </div>
            <button className="closeBtn">X</button>
        </div>
    )
}