import { createElement } from '@lwc/engine-dom';
import LearningLdsComponentLwc04Wire from 'c/learningLdsComponentLwc04Wire';

describe('c-learning-lds-component-lwc04-wire', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-learning-lds-component-lwc04-wire', {
            is: LearningLdsComponentLwc04Wire
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});