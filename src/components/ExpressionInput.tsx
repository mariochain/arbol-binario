import React, { useState } from "react";

interface ExpressionInputProps {
    onSubmit: (expression: string) => void;
}

const ExpressionInput: React.FC<ExpressionInputProps> = ({ onSubmit }) => {
    const [expression, setExpression] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (expression.trim()) {
            onSubmit(expression);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Ingresa una operación (Ej: 3 + 5 * 2)"
                className="border p-2 rounded"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded w-32">
                Generar Árbol
            </button>
        </form>
    );
};

export default ExpressionInput;
