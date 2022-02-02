import React, { useState, useEffect } from "react";
import "../../styles/index.css";

//create your first component
const Home = () => {
	const [table, setTable] = useState([
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
	]);
	const [turn, setTurn] = useState("😸");
	const [winner, setWinner] = useState("");

	const ChangeTurn = () => setTurn(turn === "😸" ? "😿" : "😸");

	const SetValue = (i, j) => {
		if (typeof table[i][j] === "undefined") {
			if (!CheckWinner()) {
				const tmp = table;
				tmp[i][j] = turn;
				setTable(table);
				ChangeTurn();
			}
		} else {
		}
	};

	const CheckMayorDiagonal = () => {
		let i = 1;
		let j = 1;
		let ctrl = true;

		while (ctrl && i < table.length && j < table.length) {
			if (
				table[i][j] != table[i - 1][j - 1] ||
				typeof table[i][j] === "undefined"
			) {
				ctrl = false;
			} else {
				i += 1;
				j += 1;
			}
		}
		return ctrl;
	};
	const CheckMenorDiagonal = () => {
		let i = 1;
		let j = 1;
		let ctrl = true;

		while (ctrl && i < table.length && j < table.length) {
			if (
				table[i][j] != table[i + 1][j - 1] ||
				typeof table[i][j] === "undefined"
			) {
				ctrl = false;
			} else {
				i -= 1;
				j += 1;
			}
		}
		return ctrl;
	};

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
		if (
			CheckRow() ||
			CheckColumnns() ||
			CheckMayorDiagonal() ||
			CheckMenorDiagonal()
		) {
			if (winner == "") {
				setWinner(`${turn} ha ganado`);
			}
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
			<body>
				<h1 className="title">Tick Tack Toe</h1>
				<p className="quest">
					¿El gato de Schrödinger esta vivo o muerto?
				</p>
				<h1 className="winner">{winner}</h1>
				<table className="board">
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
			</body>
		</>
	);
};

export default Home;
