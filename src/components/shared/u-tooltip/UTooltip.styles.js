import {css} from 'lit-element/lit-element';

export default css`
:host {
    position: fixed;
    z-index: 200;
    transform: scale(1);
    transition: transform .3s;
    background-size: cover;
    box-sizing: border-box;
}

:host(.tooltip--dot) {
  width: 120px;
  height: 120px;
}

:host(.tooltip--path) {
  width: 300px;
  height: 30px;
}

:host(.tooltip--object) {
  width: 300px;
  height: 30px;
}

:host([hidden]) {
    display: block !important;
    transform: scale(0);
}
        
.thumbnail {
    object-fit: cover;
    border-radius: 50%;
}

.thumbnail--gold {
    border: 3px solid rgb(214,183,98);
}

.thumbnail--regular {
    border: 3px solid #91B64A;
}

.path-tooltip {
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  font-size: 18px;
}
`;