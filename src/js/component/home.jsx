import React, { useState, useEffect } from "react";
import "../../styles/index.css";

//create your first component
const Home = () => {
	const [table, setTable] = useState([
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
	]);
	const [turn, setTurn] = useState("x");

	// const CheckMayorDiagonal = () => {
	// 	let i = 1;
	// 	let ctrl = false;

	// 	while (ctrl && i < table.length) {
	// 		if (table[i][i] != table[i - 1][i - 1]) {
	// 			ctrl = true;
	// 		} else {
	// 			i += 1;
	// 		}
	// 	}
	// 	return ctrl;
	// };

	const CheckRow = () => {
		let i = 0;
		let ctrl = true;

		while (ctrl && i < table.length) {
			console.log(`i value: ${i}`);
			// recorrer columnas => buscar NO coincidencias
			let j = 1;
			let ctrl2 = true;
			while (ctrl2 && j < table[i].length) {
				if (
					table[i][j] !== table[i][j - 1] ||
					typeof table[i][j] === "undefined"
				) {
					ctrl2 = false;
				} else {
					j += 1;
				}
			}

			ctrl = !ctrl2;
			i += 1;
		}

		return !ctrl;
	};
	const CheckColumnns = () => {
		let j = 0;
		let ctrl = true;

		while (ctrl && j < table.length) {
			console.log(`j value: ${j}`);
			// recorrer columnas => buscar NO coincidencias
			let i = 1;
			let ctrl2 = true;
			while (ctrl2 && i < table[j].length) {
				if (
					table[i][j] !== table[i - 1][j] ||
					typeof table[i][j] === "undefined"
				) {
					ctrl2 = false;
				} else {
					i += 1;
				}
			}

			ctrl = !ctrl2;
			j += 1;
		}

		return !ctrl;
	};

	const CheckWinner = () => {
		if (CheckRow() || CheckColumnns()) {
			alert("Hay un ganador");
			window.location.reload(true);
		}
	};
	const ChangeTurn = () => setTurn(turn === "x" ? "o" : "x");

	const SetValue = (i, j) => {
		if (typeof table[i][j] === "undefined") {
			if (!CheckWinner()) {
				const tmp = table;
				tmp[i][j] = turn;
				setTable(table);
				ChangeTurn();
			}
		} else {
			alert("Hey esta posicion ya estaba ocupada");
		}
	};
	if (CheckWinner()) {
		const tmp = table;
		tmp[i][j] = turn;
		setTable(table);
		ChangeTurn();
	}
	return (
		<>
			<table>
				<tbody>
					{table.map((row, i) => (
						<tr key={i}>
							{row.map((column, j) => (
								<td onClick={() => SetValue(i, j)} key={j}>
									<div className="item">{column}</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Home;
