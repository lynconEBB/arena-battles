import {Renderer} from "./Renderer.js";
import InputControls from "./controls.js";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const inputControls = new InputControls(canvas);
const renderer = new Renderer(canvas);
renderer.init();