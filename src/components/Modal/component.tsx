import React, { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button';
import styles from './index.module.css'

interface IModal {
	children: JSX.Element,
	isOpen: boolean,
	onClose: () => void
}

const modalRootElement = document.getElementById("modal");

const Modal: React.FC<IModal> = ({ children, isOpen, onClose }) => {
	const element = useMemo(() => document.createElement("div"), []);

	useEffect(() => {
		modalRootElement?.appendChild(element)

		return () => {
			modalRootElement?.removeChild(element)
		}
	 }
		, [])
	
	if (!isOpen) return null
	
	return createPortal(
		<>
			<div className={styles.background} onClick={onClose}></div>
			<div className={styles.content}>
				{children}
				<div>
					<Button type='button' onClick={onClose}>close</Button>
				</div>
			</div>
		</>,
		element
	)
}

export default Modal