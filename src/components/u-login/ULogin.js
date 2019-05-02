// Login page is a pure web component that doesn't require any library as a dependency
import { ENV } from '../../../environments/environments';

class ULogin extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
            <style>                
                :host {
                  position: fixed;
                  left: 0;
                  top: 0;
                  width: 100vw;
                  height: 100vh;
                  pointer-events: all;
                  background: url('../../../static/images/background.jpg') no-repeat 50% 50%;
                  background-size: cover;
                }
                
                .explore {
                  position: fixed;
                  right: 30px;
                  top: 30px;
                  display: flex;
                  align-content: center;
                  font-family: 'PT Serif', Helvetica, 'Times New Roman', serif;
                  font-size: 18px;
                  background: none;
                  text-decoration: none;
                  color: white;
                  outline: none;
                  border: none;
                  height: 50px;
                  width: 210px;
                  padding-left: 15px;
                  z-index: 2;
                  transition: .01s .23s ease-out all;
                  overflow: hidden;
                }
                .explore::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  height: 100%;
                  width: 175px;
                  background: #202020;
                  z-index: -1;
                  transition: .3s ease-in all;
                }
                .explore::after {
                  content: '';
                  position: absolute;
                  left: -5%;
                  top: 5%;
                  height: 90%;
                  width: 5%;
                  background: white;
                  z-index: -1;
                  transition: .4s .02s ease-in all;
                }
                .explore:hover {
                  cursor: pointer;
                  color: transparent;
                }
                .explore:hover::before {
                  left: 100%;
                  width: 25%;
                }
                .explore:hover::after {
                  left: 100%;
                  width: 70%;
                }
                .explore:hover .icon-right.after::after {
                  left: -105px;
                  color: white;
                  transition: .2s .2s ease all;
                }
                .explore:hover .icon-right.after::before {
                  left: -104px;
                  top: 14px;
                  opacity: 0.2;
                  color: white;
                }
                
                .icon-right {
                  position: absolute;
                  top: -3px;
                  right: 0;
                }
                .icon-right::after {
                  content: '\\2192';
                  font-size: 24px;
                  display: inline-block;
                  position: relative;
                  top: 26px;
                  -webkit-transform: translate3D(0, -50%, 0);
                          transform: translate3D(0, -50%, 0);
                }
                .icon-right.after::after {
                  left: -250px;
                  color: black;
                  transition: .15s .25s ease left, .5s .05s ease color;
                }
                .icon-right.after::before {
                  content: '';
                  position: absolute;
                  left: -230px;
                  top: 14px;
                  opacity: 0;
                  transition: .2s ease-in all;
                }
                
                .title {
                  display: flex;
                  align-items: center;
                }
                
                img {
                    position: relative;
                    top: 1px;
                    margin-left: 10px;
                }
                
                .copyright {
                  position: fixed;
                  font-weight: 100;
                  bottom: 10px;
                  left: 0;
                  font-family: 'PT Serif', Helvetica, 'Times New Roman', serif;
                  letter-spacing: 4px;
                  font-size: 10px;
                  width: 100vw;
                  text-align: center;
                  color: white;
                  text-transform: uppercase;
                  text-decoration: none;
                }
            </style>
            
            <a href="https://oauth.vk.com/authorize?client_id=4447151&display=page&redirect_uri=${ENV[window.ENV].static}&response_type=code&v=5.78" class="explore"">
                <span class="title">Войти через </span>
                <img src="static/images/vk_logo.svg" alt="">
                <span class="icon-right"></span><span class="icon-right after"></span>
            </a>
            
            <a class="copyright" href="http://user-experience.ru" target="_blank">Сделано с ♥ Студия Сергея Новикова</a>
        `;
  }
}

window.customElements.define('u-login', ULogin);