import {html, LitElement} from 'lit-element/lit-element';
import {store} from '../../../../store';
import {connect} from 'pwa-helpers';
import {fetchAddresses} from './UChartStreets.actions';
import {chartStreets} from "./UChartStreets.reducer";
import props from './UChartStreets.props';
import styles from './UChartStreets.styles';

store.addReducers({chartStreets});

export class UChartStreets extends connect(store)(LitElement) {
    /*
        List of required methods
        Needed for initialization, rendering, fetching and setting default values
    */
    static get properties() {
        return props;
    }

    static get styles() {
        return styles;
    }

    render() {
        return html`
          <div class="u-chart-streets">
            <div class="chart">
                <div class="chart__title" @click="${this.back}">
                    <div class="chart__title-text">Улицы, по количеству домов на них</div>
                    <div class="chart__title-back"></div>
                </div>
                <div class="chart__graphic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%"></svg>
                </div>
            </div>
          </div>
      `
    }

    constructor() {
        super();
        this._setDefaults();
    }

    stateChanged(state) {
        const addresses = state.chartStreets;
        if (addresses !== this._addresses) this.renderAddressesChart(addresses);
        this._addresses = state.chartStreets;
    }

    firstUpdated() {
        this._init();
    }

    _init() {
        this._setStore();
        this._setReferences();
        this._setListeners();
    }

    _setStore() {
        store.dispatch(fetchAddresses());
    }

    _setReferences() {
        this.$container = this.shadowRoot.querySelector('.u-smart-template');
        this.$svg = this.shadowRoot.querySelector('.chart__graphic svg');
    }

    _setListeners() {
        this.addEventListener('click', e => e.stopPropagation());
    }

    _setDefaults() {

    }

    /*
        List of custom component's methods
        Any other methods
    */
    renderAddressesChart(addresses) {
        if (addresses) {
            const streets = d3.nest()
                .key(address => address.street)
                .entries(addresses);

            streets.sort((a,b) => b.values.length - a.values.length);

            const max = d3.max(streets, street => street.values.length);
            const yScale = d3.scaleLinear().domain([0, max]).range([0,100]);
            const ybRamp = d3.scaleLinear().interpolate(d3.interpolateHcl).domain([0, max]).range(['#315386', '#933735']);

            const g = d3.select(this.$svg)
                .html('')
                .selectAll('g')
                .data(streets, d => d.id)
                .enter()
                .append('g');

            g.append('rect')
                // .transition()
                // .delay((d,i) => i*50)
                // .duration(500)
                .attr('class', 'line')
                .attr('width', d => `calc(${parseFloat(yScale(d.values.length)).toFixed(2)}%)`)
                .attr('x', '0')
                .attr('y', (d, i) => i*12)
                .attr('fill', d => ybRamp(d.values.length))
                .on('click', function (a,b,c) { debugger; });

            g.append('text')
                .attr('class', 'label')
                .attr('x', '5')
                .attr('y', (d, i) => i*12+9)
                .text(d => d.values.length)

            // auto resize svg height
            if (this.$svg) this.$svg.style.height = `${this.$svg.getBBox().height}px`;
        }
    }

    back() {
        this.dispatchEvent(new CustomEvent('u-nav-stats::clear', {
            composed: true,
            bubbles: true
        }));
    }
}

window.customElements.define('u-chart-streets', UChartStreets);