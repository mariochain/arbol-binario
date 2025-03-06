import { useState, useEffect } from "react";
import { postOrderTraversal, inOrderTraversal, preOrderTraversal } from "./utils/treeTraversal";
import { buildExpressionTree, solveRPN, TreeNode } from "./utils/parser";
import ExpressionInput from "./components/ExpressionInput";
import BinaryTree from "./components/BinaryTree";

const App = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);  // Estado para almacenar el árbol
  const [postOrderResult, setPostOrderResult] = useState<string>("");  // Estado para almacenar el resultado
  const [inOrderResult, setInOrderResult] = useState<string>("");  // Estado para almacenar el resultado
  const [preOrderResult, setPreOrderResult] = useState<string>("");  // Estado para almacenar el resultado

  // Función para manejar la expresión ingresada
  const handleExpressionSubmit = (expression: string) => {
    const newTree = buildExpressionTree(expression);  // Convierte la expresión a un árbol
    setTree(newTree);  // Actualiza el árbol
  };

  // Recalcular el recorrido postorden cada vez que el árbol cambie
  useEffect(() => {
    if (tree) {
      const postorden = postOrderTraversal(tree);
      setPostOrderResult(postorden.join(" "));
      const inorden = inOrderTraversal(tree);
      setInOrderResult(inorden.join(" "));
      const preorden = preOrderTraversal(tree);
      setPreOrderResult(preorden.join(" "));

    }
  }, [tree]);  // Solo se ejecuta cuando el árbol cambia

  const [steps, setSteps] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expression = postOrderResult.split(' '); // Convertir el input a un array de tokens
    const result = solveRPN(expression); // Llamar a la función para resolver la expresión
    setSteps(result); // Guardar los pasos para mostrar
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mt-4 mb-6">Árbol Binario de Expresión Matemática</h1>
      <ExpressionInput onSubmit={handleExpressionSubmit} />
      {tree && <BinaryTree tree={tree} />}
      {/* Muestra el resultado del recorrido postorden */}
      <p className="mt-4 text-lg">Recorrido en Prorden: {preOrderResult}</p>
      <p className="mt-4 text-lg">Recorrido en Inorden: {inOrderResult}</p>
      <p className="mt-4 text-lg">Recorrido en Postorden: {postOrderResult}</p>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full max-w-xs"
        onClick={handleSubmit}
      >
        Resolver
      </button>
      <div className='separator separator-dashed text-white'></div>
      <h1 className="text-3xl font-bold my-4">Resolución de Expresión RPN</h1>
      <h3 className="text-xl font-semibold">Pasos de la resolución:</h3>
      <ul className="mt-4 space-y-2 text-left">
        {steps.map((step, index) => (
          <li key={step} className="text-lg">
            Paso {index + 1}: {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;