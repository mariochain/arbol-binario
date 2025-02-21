export class TreeNode {
    value: string;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: string) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Función para verificar si un valor es un operador
const isOperator = (char: string) => ["+", "-", "*", "/", "^"].includes(char);

// Función para verificar si es un número o una variable
const isOperand = (char: string) => /\d+|[a-zA-Z]+/.test(char); // Números o letras (variables)

// Función para construir el árbol desde una expresión en notación infija
export const buildExpressionTree = (expression: string): TreeNode | null => {
    const tokens = expression.match(/\d+|[a-zA-Z]+|[+\-*/^()]/g); // Permitir números, variables y operadores
    if (!tokens) return null;

    const outputStack: TreeNode[] = [];
    const operatorStack: string[] = [];

    const precedence: { [key: string]: number } = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };

    tokens.forEach((token) => {
        if (isOperand(token)) {
            outputStack.push(new TreeNode(token)); // Si es un operando (número o variable), agrégalo al stack de salida
        } else if (isOperator(token)) {
            // Procesar los operadores según su precedencia
            while (
                operatorStack.length &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                const right = outputStack.pop()!;
                const left = outputStack.pop()!;
                const operator = operatorStack.pop()!;
                const node = new TreeNode(operator);
                node.left = left;
                node.right = right;
                outputStack.push(node);
            }
            operatorStack.push(token); // Agregar el operador al stack de operadores
        } else if (token === "(") {
            operatorStack.push(token); // Si es un paréntesis izquierdo, agregamos al stack de operadores
        } else if (token === ")") {
            // Procesar los operadores hasta encontrar el paréntesis izquierdo
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                const right = outputStack.pop()!;
                const left = outputStack.pop()!;
                const operator = operatorStack.pop()!;
                const node = new TreeNode(operator);
                node.left = left;
                node.right = right;
                outputStack.push(node);
            }
            operatorStack.pop(); // Eliminar el paréntesis izquierdo
        }
    });

    // Procesar los operadores restantes
    while (operatorStack.length) {
        const right = outputStack.pop()!;
        const left = outputStack.pop()!;
        const operator = operatorStack.pop()!;
        const node = new TreeNode(operator);
        node.left = left;
        node.right = right;
        outputStack.push(node);
    }

    return outputStack[0] || null;
};

// Resolver RPN paso a paso
export const solveRPN = (rpnExpression: string[]): string[] => {
    const stack: string[] = [];
    const steps: string[] = [];

    rpnExpression.forEach((token) => {
        if (isOperand(token)) {
            stack.push(token); // Apilar operando
        } else if (isOperator(token)) {
            const right = stack.pop()!;
            const left = stack.pop()!;
            const expression = `(${left} ${token} ${right})`;
            stack.push(expression);
            steps.push(expression); // Guardar cada paso
        }
    });

    return steps; // Devuelve los pasos
};