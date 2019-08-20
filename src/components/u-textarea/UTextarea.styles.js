import {css} from 'lit-element/lit-element';
export default css`
* { box-sizing: border-box }  

:host {
  display: inline-block;
}

.textarea__element {
    width: 100%;
    font-family: 'PT Serif', Helvetica, 'Times New Roman', serif;
    border: 1px dashed #ccc;
    background-color: #f9f9f9;
    font-size: 14px;
    padding: 10px;
    resize: none;
    outline: none;
}

.textarea__element:focus {
    border-color: #ccc;
    border-style: dashed;
}

.textarea__element::-webkit-input-placeholder {
    font-style: italic;
}

.textarea__element::-moz-placeholder {
    font-style: italic;
}

.textarea.textarea--is-updating .textarea__element {
    background-image: repeating-linear-gradient(
      -45deg,
       #eaeaea,
       #eaeaea 11px,
       #fff 10px,
       #fff 20px
    );
    background-size: 28px 28px;
    animation: move .5s linear infinite;
}

@keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 28px 0;
    }
}

.textarea__element.textarea__element--default {

}
`;