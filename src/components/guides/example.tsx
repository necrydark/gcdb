interface CompletionProps {
    completion?: boolean;
}

export default function example({completion}: CompletionProps) {
    return (
        <div className={completion ? "text-green-500" : "text-red-500"}>
            {completion ? "Yes" : "No"}
        </div>
    )
}