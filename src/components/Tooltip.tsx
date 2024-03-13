import React, { useState } from 'react';

function Tooltip({ tip, text, context }: { tip: string, text: string, context: string }) {
    const words = text.split(' ');
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <span>
            {words.map((word, index) => (
                <span key={index}>
                    {word === tip ? (
                        <span
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            {word}
                            {showTooltip && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        left: '0',
                                        background: 'black',
                                        color: 'white',
                                        padding: '5px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {context}
                                </span>
                            )}
                        </span>
                    ) : (
                        <span>{word}</span>
                    )}
                    {index !== words.length - 1 && <span> </span>}
                </span>
            ))}
        </span>
    );
}
    
export default Tooltip