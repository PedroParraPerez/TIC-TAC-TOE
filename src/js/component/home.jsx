import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../../styles/index.css";

const Home = () => {
	const [table, setTable] = useState([
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
	]);
	const [turn, setTurn] = useState("😸");
	const [winner, setWinner] = useState(null);

	const ChangeTurn = () => setTurn(turn === "😸" ? "😿" : "😸");

	useEffect(() => {
		CheckWinner();
		if (!winner) {
			ChangeTurn();
		}
	}, [table]);

	const SetValue = (i, j) => {
		if (typeof table[i][j] === "undefined") {
			let tmp = table;
			tmp[i][j] = turn;
			setTable([...table]);
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
			setWinner(`${turn} Ha ganado`);
		}
	};

	return (
		<>
			<div className="body">
				<h1 className="title">Tick Tack Toe</h1>
				<p className="quest">
					<b>¿El gato de Schrödinger esta vivo o muerto?</b>
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
			</div>
		</>
	);
};

export default Home;
