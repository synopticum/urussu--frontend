import { html, LitElement } from '@polymer/lit-element';
import { SharedStyles } from '../../shared-styles.js';
import { store } from '../../../store';
import { connect } from 'pwa-helpers/connect-mixin';

import { updateForm } from './redux';
import { putDot } from '../u-dot/redux';
import { toggleDotCreate } from '../u-map/redux';
import { createDot } from '../u-dot-create/redux';
store.addReducers({ createDot });

class UDotCreate extends connect(store)(LitElement) {

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

      _title: {
        type: String,
        attribute: false
      },
      _layer: {
        type: String,
        attribute: false
      },
      _type: {
        type: String,
        attribute: false
      }
    };
  }

  constructor() {
    super();
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
            background-color: #ffffff;
            z-index: 200;
            border: 1px solid blue;
            transform: scale(1);
            transition: transform .3s;
        }
        
        :host([hidden]) {
            display: block !important;
            transform: scale(0);
        }
        
        input[type="text"] {
            margin: 5px 0;
        }
      </style>
      
      <div class="create">
        <input type="text" .value="${this._title}" @input="${UDotCreate.inputTitle.bind(this)}" placeholder="Enter dot title"><br>
        <input type="text" .value="${this._layer}" @input="${UDotCreate.inputLayer.bind(this)}" placeholder="Enter dot layer"><br>
        
        <select @change="${UDotCreate.changeType.bind(this)}">
            <option value="global" ?selected="${this._type === 'global'}">Global</option>
            <option value="local1" ?selected="${this._type === 'local1'}">Local 1</option>
            <option value="local2" ?selected="${this._type === 'local2'}">Local 2</option>
        </select>
        
        <button type="submit" @click="${this.create.bind(this)}">ok</button>
      </div>
    `;
  }

  _stateChanged(state) {
    this._title = state.createDot.title;
    this._layer = state.createDot.layer;
    this._type = state.createDot.type;
  }

  create() {
    let dot = new Dot({
      title: this._title,
      layer: this._layer,
      type: this._type,
      coordinates: [this.lat, this.lng]
    });

    store.dispatch(putDot(dot));
    store.dispatch(toggleDotCreate(false));
    store.dispatch(updateForm({ title: '', layer: '', type: 'global' }));
  }

  static inputTitle(e) {
    store.dispatch(updateForm({ title: e.currentTarget.value }));
  }

  static inputLayer(e) {
    store.dispatch(updateForm({ layer: e.currentTarget.value }));
  }

  static changeType(e) {
    store.dispatch(updateForm({ type: e.currentTarget.value }));
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

window.customElements.define('u-dot-create', UDotCreate);