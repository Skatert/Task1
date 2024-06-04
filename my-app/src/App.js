import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	let isValueValid = true;
	if (value.length < 3) {
		isValueValid = false;
	}

	const onInputButtonClick = () => {
		let promptValue = prompt();
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			const id = Date.now();
			const updatedList = [...list, { id, value }];
			setList(updatedList);
			setValue('');
			setError('');
		}
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles.pageHeading}>Ввод значения</h1>
				<p className={styles.noMarginText}>
					Текущее значение <code>value</code>:
					<output className={styles.currentValue}>"{value}"</output>
				</p>
				{error !== '' && <div className={styles.error}>{error}</div>}
				<div className={styles.buttonsContainer}>
					<button
						onClick={() => onInputButtonClick()}
						className={styles.button}
					>
						Ввести новое
					</button>
					<button
						onClick={() => onAddButtonClick()}
						disabled={!isValueValid}
						className={styles.button}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles.listContainer}>
					<h2 className={styles.listHeading}>Список</h2>
					<p className={styles.noMarginText}>
						{list.length > 0 ? '' : 'Нет добавленных элементов'}
					</p>
					<ul className={styles.list}>
						{list.map(({ id, value }) => (
							<li key={id} className={styles.listItem}>
								{value}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
