import { createContext, useState } from "react";


export const QuoteFilterContext = createContext<any>(false);

export const QuoteFilterProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [dateQuote, setDateQuote] = useState<null | Date>(null)
    const [dateQuoteEnd, setDateQuoteEnd] = useState<null | Date>(null)
    const [status, setStatus] = useState<Number>(0)
    const [quoteCode, setQuoteCode] = useState('')
    const [shouldFetchData, setShouldFetchData] = useState(false)

    return (
        <QuoteFilterContext.Provider value={
            {
                dateQuote, setDateQuote,
                dateQuoteEnd, setDateQuoteEnd,
                status, setStatus,
                quoteCode, setQuoteCode,
                shouldFetchData, setShouldFetchData,
            }
        }
        >
            {children}
        </QuoteFilterContext.Provider>
    )
}