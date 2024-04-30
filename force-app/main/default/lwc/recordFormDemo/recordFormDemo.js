import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { NavigationMixin } from 'lightning/navigation';

export default class RecordFormExample extends NavigationMixin(LightningElement) {
    // Expose a field to make it available in the template
    fieldList = [NAME_FIELD, INDUSTRY_FIELD];

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;

    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            variant: 'success',
            message:
                'Record Updated Successfully.'
        });
        this.dispatchEvent(event);
    }

    navigateToRecordPage(event) {
        console.log("event.detail", event.detail);
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

}