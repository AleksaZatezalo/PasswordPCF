import { Console } from "console";
import {IInputs, IOutputs} from "./generated/ManifestTypes";

// To Do: Fix Toggle Functionality & Add Bi-Eye Class Styling
export class PasswordInputControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _notifyOutputChanged: () => void;
	private _inputElement: HTMLInputElement;
	private _eye: HTMLButtonElement;
	private _inputValue?: string;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{

		this._notifyOutputChanged = notifyOutputChanged;

		// Create HTML text input element
		this._inputElement = document.createElement("input");
		this._inputElement.setAttribute("type", "password");
		this._inputElement.setAttribute("class", "passwordControl");
		this._inputElement.setAttribute("placeholder", "password");


		// Extract the input value and update the input element
		this._inputValue = context.parameters.inputValue.raw || "";
		this._inputElement.value = this._inputValue;

		// Attach on change event handler
		this._inputElement.addEventListener("blur", this.onBlur);

		// Creating a Button that will Toggle Password Input
		// this._eye = document.createElement("button");
		// this._eye.addEventListener("click", function () {
		// 	const type = this._inputElement.getAttribute("type") === "password" ? "text" : "password";
		// 	this._inputElement.setAttribute("type", type);
				
		// 	// toggle the icon
		// });


		// Add the text input to the DOM
		container.appendChild(this._inputElement);
		container.appendChild(this._eye);
	}


	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Extract the input value and update the input element
		this._inputValue = context.parameters.inputValue.raw || "";
		this._inputElement.value = this._inputValue;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {
			inputValue: this._inputValue
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}

	public onBlur = (event: Event): void => {
		this._inputValue = this._inputElement.value;
		this._notifyOutputChanged();
	}
}