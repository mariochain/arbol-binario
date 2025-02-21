// Definimos la estructura de un nodo del árbol binario
import { TreeNode } from "./parser"; // Asegúrate de importar tu estructura de nodo

// 🔹 Recorrido Preorden (Raíz → Izquierda → Derecha)
export const preOrderTraversal = (node: TreeNode | null, result: string[] = []): string[] => {
    if (!node) return result;
    result.push(node.value); // Visita la raíz
    preOrderTraversal(node.left, result); // Recorre la izquierda
    preOrderTraversal(node.right, result); // Recorre la derecha
    return result;
};

// 🔹 Recorrido Inorden (Izquierda → Raíz → Derecha)
export const inOrderTraversal = (node: TreeNode | null, result: string[] = []): string[] => {
    if (!node) return result;
    inOrderTraversal(node.left, result); // Recorre la izquierda
    result.push(node.value); // Visita la raíz
    inOrderTraversal(node.right, result); // Recorre la derecha
    return result;
};

// 🔹 Recorrido Postorden (Izquierda → Derecha → Raíz)
export const postOrderTraversal = (node: TreeNode | null, result: string[] = []): string[] => {
    if (!node) return result;
    postOrderTraversal(node.left, result); // Recorre la izquierda
    postOrderTraversal(node.right, result); // Recorre la derecha
    result.push(node.value); // Visita la raíz
    return result;
};