import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Type";
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class RecordEditFormDemo extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;

    fields = {
        name: ACCOUNT_NAME_FIELD,
        industry: ACCOUNT_INDUSTRY_FIELD,
        type: TYPE_FIELD
    };

    successHandler(event) {
        let pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        }
        this[NavigationMixin.Navigate](pageReference);
    }

    errorHandler(event) {
        console.log(JSON.stringify(event.detail));
        const toastEvent = new ShowToastEvent({
            title: 'Error',
            variant: "error",
            message: event.detail.message,
        });
        this.dispatchEvent(toastEvent);
    }

    submitHandler(event){
        event.preventDefault();
        console.log(event.detail);
        console.log(JSON.stringify(event.detail));
        const fields = event.detail.fields;
        if(!fields.Industry){
            fields.Industry = "Energy";
        }
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    clickHandler(event){
        let inputFields = this.template.querySelectorAll("lightning-input-field");
        inputFields.forEach(currentItem => currentItem.reset());
    }

}

