'use client'

import { useState } from 'react'

type Operation = '+' | '-' | '*' | '/' | null

export default function Calculator() {
    const [display, setDisplay] = useState('0')
    const [previousValue, setPreviousValue] = useState<number | null>(null)
    const [operation, setOperation] = useState<Operation>(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [history, setHistory] = useState('')

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(String(digit))
            setWaitingForOperand(false)
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit)
        }
    }

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.')
            setWaitingForOperand(false)
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.')
        }
    }

    const clear = () => {
        setDisplay('0')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(false)
        setHistory('')
    }

    const deleteLast = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1))
        } else {
            setDisplay('0')
        }
    }

    const performOperation = (nextOperation: Operation) => {
        const inputValue = parseFloat(display)

        if (previousValue === null) {
            setPreviousValue(inputValue)
            setHistory(`${inputValue} ${nextOperation || ''}`)
        } else if (operation) {
            const currentValue = previousValue || 0
            const newValue = calculate(currentValue, inputValue, operation)

            setDisplay(String(newValue))
            setPreviousValue(newValue)
            setHistory(`${history} ${inputValue} = ${newValue} ${nextOperation || ''}`)
        }

        setWaitingForOperand(true)
        setOperation(nextOperation)
    }

    const calculate = (firstValue: number, secondValue: number, operation: Operation): number => {
        switch (operation) {
            case '+':
                return firstValue + secondValue
            case '-':
                return firstValue - secondValue
            case '*':
                return firstValue * secondValue
            case '/':
                return firstValue / secondValue
            default:
                return secondValue
        }
    }

    const handleEquals = () => {
        const inputValue = parseFloat(display)

        if (previousValue !== null && operation) {
            const newValue = calculate(previousValue, inputValue, operation)
            setDisplay(String(newValue))
            setHistory(`${history} ${inputValue} = ${newValue}`)
            setPreviousValue(null)
            setOperation(null)
            setWaitingForOperand(true)
        }
    }

    const buttonBaseClasses = "h-14 text-lg font-semibold rounded-lg transition-all duration-150 active:scale-95 shadow-md hover:shadow-lg"
    const digitButtonClasses = `${buttonBaseClasses} bg-gray-700 hover:bg-gray-600 text-white border border-gray-600`
    const operationButtonClasses = `${buttonBaseClasses} bg-orange-500 hover:bg-orange-400 text-white border border-orange-400`
    const clearButtonClasses = `${buttonBaseClasses} bg-red-500 hover:bg-red-400 text-white border border-red-400`
    const deleteButtonClasses = `${buttonBaseClasses} bg-yellow-500 hover:bg-yellow-400 text-white border border-yellow-400`
    const equalsButtonClasses = `${buttonBaseClasses} bg-green-500 hover:bg-green-400 text-white border border-green-400`

    const buttons = [
        // Row 1
        { label: 'C', onClick: clear, className: clearButtonClasses, colSpan: 2 },
        { label: '⌫', onClick: deleteLast, className: deleteButtonClasses },
        { label: '÷', onClick: () => performOperation('/'), className: operationButtonClasses },

        // Row 2
        { label: '7', onClick: () => inputDigit('7'), className: digitButtonClasses },
        { label: '8', onClick: () => inputDigit('8'), className: digitButtonClasses },
        { label: '9', onClick: () => inputDigit('9'), className: digitButtonClasses },
        { label: '×', onClick: () => performOperation('*'), className: operationButtonClasses },

        // Row 3
        { label: '4', onClick: () => inputDigit('4'), className: digitButtonClasses },
        { label: '5', onClick: () => inputDigit('5'), className: digitButtonClasses },
        { label: '6', onClick: () => inputDigit('6'), className: digitButtonClasses },
        { label: '-', onClick: () => performOperation('-'), className: operationButtonClasses },

        // Row 4
        { label: '1', onClick: () => inputDigit('1'), className: digitButtonClasses },
        { label: '2', onClick: () => inputDigit('2'), className: digitButtonClasses },
        { label: '3', onClick: () => inputDigit('3'), className: digitButtonClasses },
        { label: '+', onClick: () => performOperation('+'), className: operationButtonClasses },

        // Row 5
        { label: '0', onClick: () => inputDigit('0'), className: digitButtonClasses, colSpan: 2 },
        { label: '.', onClick: inputDecimal, className: digitButtonClasses },
        { label: '=', onClick: handleEquals, className: equalsButtonClasses },
    ]

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-2xl">
            {/* History Display */}
            <div className="mb-2 h-6 text-sm text-gray-400 text-right overflow-hidden">
                {history || ' '}
            </div>

            {/* Main Display */}
            <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                <div className="text-right text-3xl font-mono text-white overflow-hidden">
                    {display}
                </div>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-3">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.onClick}
                        className={`${button.className} ${button.colSpan === 2 ? 'col-span-2' : ''}`}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    )
}