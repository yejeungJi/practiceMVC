'use strict';

import view from './view.js';

const tag = '[formView]';

const formView = Object.create(view);

formView.setup = (objElementArg) => {
	formView.init(objElementArg);
	formView.inputElement = objElementArg.querySelector('[type=text]');
	formView.resetElement = objElementArg.querySelector('[type=reset');
	formView.showResetButton(false);
	formView.bindEvents();
	return formView;
};

formView.showResetButton = (boolArg = true) => {
	formView.resetElement.style.display = boolArg ? 'block' : 'none';
};

formView.bindEvents = () => {
	formView.inputElement.addEventListener('keyup', (event) => formView.onKeyup(event));
	formView.resetElement.addEventListener('click', () => formView.onClickReset());
};

formView.onKeyup = (eventArg) => {
	formView.showResetButton(formView.inputElement.value.length);
	if (!formView.inputElement.value.length) {
		formView.emit('@reset');
	}
	formView.emit('@submit', { input: formView.inputElement.value });
	if (eventArg.keyCode !== 13) return;
};

formView.onClickReset = () => {
	formView.emit('@reset');
	formView.showResetButton(false);
};

export default formView;
