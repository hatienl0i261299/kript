import Header from "./components/Header";

const App = (props: any) => {

    return (
        <div className="container">
            <Header/>
            <div className={ 'row pt-5' }>
                {props.children}
            </div>
        </div>
    )
}

export default App;
