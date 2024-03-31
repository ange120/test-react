import { Fragment, PureComponent, useEffect, useRef, useState } from "react"

export const CouterBTN = ({ getter = 5, setter }) => (
    <button
        onClick={() => setter((prev) => {
            localStorage.setItem('couterValue', prev + 1)
            return prev + 1
        })}
    >
        count is {getter}
    </button>
)

export const CouterBtnFunc = ({ initial = 3 }) => {
    const [counter, setCounter] = useState(initial)
    const counterRef = useRef();

    useEffect(() => {
        fetch('https://myfakeapi.com/api/cars')
    }, [])

    useEffect(() => {
        console.log(`update func: \ncurrent: ${counter}\nprev: ${counterRef.current}`)
        toLC()
        counterRef.current = counter
    }, [counter])

    const toLC = () => {
        localStorage.setItem('couterValue', counter)
    }

    const counterModifier = (sign, value) => eval(`${value}${sign}1`)

    return (<>
        <button
            onClick={() => setCounter(
                (prevState) => counterModifier('-', prevState)
            )}
        >
            -1
        </button>
        <span>{counter}</span>
        <button
            onClick={() => setCounter(
                (prevState) => counterModifier('+', prevState)
            )}
        >
            +1
        </button>
    </>)
}

export class CounterBtnClass extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            counter: props.initial || 3
        }
    }

    componentDidMount() {
        console.log('init class: ' + this.state.counter)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('update class: ' + this.state.counter)
    }

    toLC = () => {
        localStorage.setItem('couterValue', this.state.counter)
    }

    counterModifier = (sign, value) => eval(`${value}${sign}1`)

    render() {
        const { counter } = this.state;

        return (<Fragment>
            <button
                onClick={() => this.setState(
                    (prevState) => ({
                        counter: this.counterModifier('-', prevState.counter)
                    }),
                    this.toLC
                )}
            >
                -1
            </button>
            <span>{counter}</span>
            <button
                onClick={() => this.setState(
                    (prevState) => ({
                        counter: this.counterModifier('+', prevState.counter)
                    }),
                    this.toLC
                )}
            >
                +1
            </button>
        </Fragment>)
    }
}