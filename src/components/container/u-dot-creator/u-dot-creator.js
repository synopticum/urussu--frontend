import { html, LitElement } from 'lit-element';
import { SharedStyles } from '../../shared-styles.js';

import { store } from '../../../store';
import { connect } from 'pwa-helpers/connect-mixin';
import { putDot } from '../u-dot/redux';
import {toggleDotCreator, map, setCloudsVisibility} from '../u-map/redux';
import { ENV } from '../../../constants';
import { navigate } from "../u-app/redux";
import {getComments} from "../u-comments/redux";
store.addReducers({ map });

class UDotCreator extends connect(store)(LitElement) {

  static get properties() {
    return {
      x: {
        type: Number
      },
      y: {
        type: Number
      },
      lat: {
        type: Number
      },
      lng: {
        type: Number
      },

      _user: {
        type: Object
      },

      _isValid: {
        type: Boolean,
        attribute: false
      }
    };
  }

  constructor() {
    super();
    this._isValid = false;
  }

  render() {
    return html`
      ${SharedStyles}
      
      <style>
        :host {
            position: fixed;
            left: ${this.x}px;
            top: ${this.y}px;
            padding: 10px;
            z-index: 200;
            width: 100%;
            max-width: 300px;
            transform: scale(1);
            transition: transform .3s;
            border: 3px solid #6B9B29;
            border-radius: 3px;
            background-color: #f9f9f9;
            box-shadow: 4px 4px 4px rgba(0,0,0,.15);
        }
        
        :host([hidden]) {
            display: block !important;
            transform: scale(0);
        }
        
        @keyframes bounce { 
          0% {transform: scale(.2);}
          50% {transform: scale(1);}
        }
        
        .bounce {
            content: '';
            position: absolute;
            left: -7.5px;
            top: -7.5px;
            width: 15px;
            height: 15px;
            background-color: #f00;
            border-radius: 50%;
            user-select: none;
            animation: bounce 1s alternate infinite linear;
        }
        
        .cancel {
            cursor: pointer;
            position: absolute;
            right: 20px;
            bottom: -15px;
            width: 30px;
            height: 30px;
            border: 0;
            outline: none;
            background: url("static/images/close.svg") no-repeat 50% 50% #fff;
            border-radius: 50%;
        }
        
        .submit {
            cursor: pointer;
            position: absolute;
            right: -15px;
            bottom: -15px;
            width: 30px;
            height: 30px;
            border: 0;
            outline: none;
            background: url("static/images/ok.svg") no-repeat 50% 50% #fff;
            border-radius: 50%;
        }
        
        .submit:disabled {
            cursor: not-allowed;
            opacity: .3;
        }
        
        .textbox {
            margin: 5px 0;
            width: 100%;
            border: 0;
        }
      </style>
      
      <form class="form">
        <div class="bounce"></div>
        
        <input 
            type="text" 
            class="textbox"
            id="dot-title"
            value="" 
            @keyup="${this._validate}"
            placeholder="Введите название точки"
            required><br>
        
        <div class="advanced-controls" ?hidden="${!this._user.isAdmin}"">
          <select id="dot-layer">
              <option value="official" selected>Official</option>
              <option value="non-official">Non-official</option>
          </select>
          
          <select id="dot-type">
              <option value="global" selected>Global</option>
              <option value="local">Local</option>
          </select>
        </form>
        
        <button class="cancel" type="button" @click="${this._cancel.bind(this)}"></button>
        
        <button 
            class="submit" 
            type="submit" 
            ?disabled="${!this._isValid}" 
            @click="${this._create.bind(this)}"></button>
      </div>
    `;
  }

  firstUpdated() {
    this.$form = this.shadowRoot.querySelector('form');
    this.$title = this.shadowRoot.querySelector('#dot-title');
    this.$layer = this.shadowRoot.querySelector('#dot-layer');
    this.$type = this.shadowRoot.querySelector('#dot-type');
  }

  stateChanged(state) {
    this._user = state.app.user;
  }

  _create(e) {
    e.preventDefault();

    let dot = new Dot({
      title: this.$title.value,
      layer: this.$layer.value,
      type: this.$type.value,
      coordinates: [this.lat, this.lng]
    });

    store.dispatch(putDot(dot));
    store.dispatch(toggleDotCreator(false, { x: this.x, y: this.y }));
    store.dispatch(setCloudsVisibility('none'));

    this._resetState();
    store.dispatch(navigate(`/dots/${dot.id}`));
  }

  _cancel() {
    store.dispatch(toggleDotCreator(false, { x: this.x, y: this.y }));
    store.dispatch(setCloudsVisibility('none'));
  }

  _validate() {
    this.$form.checkValidity() ? this._isValid = true : this._isValid = false;
  }

  _resetState() {
    this.$title.value = '';
    this.$layer.value = 'official';
    this.$type.value = 'global';
  }
}

class Dot {
  constructor(options) {
    this.id = uuidv4();
    this.title = options.title;
    this.layer = options.layer;
    this.type = options.type;
    this.coordinates = options.coordinates;
  }
}

window.customElements.define('u-dot-creator', UDotCreator);
