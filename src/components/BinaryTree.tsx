import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { TreeNode } from "../utils/parser";

interface BinaryTreeProps {
    tree: TreeNode | null;
}

const BinaryTree: React.FC<BinaryTreeProps> = ({ tree }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!tree || !svgRef.current) return;

        const width = 600;
        const height = 400;

        const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
        svg.selectAll("*").remove(); // Limpiar antes de renderizar

        const root = d3.hierarchy(tree, (d) => {
            const children = [];
            if (d.left) children.push(d.left);
            if (d.right) children.push(d.right);
            return children.length > 0 ? children : null;
        });

        const treeLayout = d3.tree<TreeNode>().size([width - 100, height - 100]);
        const treeData = treeLayout(root);

        const g = svg.append("g").attr("transform", "translate(50, 50)");

        g.selectAll("line")
            .data(treeData.links())
            .enter()
            .append("line")
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y)
            .attr("stroke", "black");

        g.selectAll("circle")
            .data(treeData.descendants())
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 20)
            .attr("fill", "lightblue")
            .attr("stroke", "black");

        g.selectAll("text")
            .data(treeData.descendants())
            .enter()
            .append("text")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("dy", 5)
            .attr("text-anchor", "middle")
            .text((d) => d.data.value);
    }, [tree]);

    return <svg ref={svgRef}></svg>;
};

export default BinaryTree;
