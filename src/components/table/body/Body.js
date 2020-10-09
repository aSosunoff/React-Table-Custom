import { cloneDeep } from "lodash";
import React, { useCallback } from "react";
import { v4 } from "uuid";
import isEmptyObject from "../utils/isEmptyObject";
import styles from "./Body.module.css";
import Row from "./row";

const Body = ({ list = [], header, rowsBtn = [], onRowClick }) => {
	const row = useCallback(
		(record) =>
			Object.keys(header).map((key) => {
				const btns = cloneDeep(header[key].btns || []);
				const { format = () => record[key] } = header[key];
				return {
					key,
					value: format(record[key], record),
					btns: btns.map((btn) => ({
						uuid: v4(),
						btn: typeof btn === "function" ? btn(record) : btn,
					})),
				};
			}),
		[header]
	);

	const rowHandler = useCallback(
		(indexRecord, record) => {
			onRowClick(isEmptyObject(record) ? null : indexRecord, record);
		},
		[onRowClick]
	);

	return (
		<div className={styles.table__body}>
			{list.map(({ uuid, ...record }, indexRecord) => (
				<Row
					key={uuid}
					row={row(record)}
					rowsBtn={rowsBtn}
					indexRecord={indexRecord}
					record={record}
					onRowClick={() => rowHandler(indexRecord, record)}
				/>
			))}
		</div>
	);
};

export default Body;
