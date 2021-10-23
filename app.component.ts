import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent} from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public data: Object[] = [];
    
  public dateformat: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    public contextMenuItems: Object;
    public templateOptions: object;
  
    public filterSettings: Object;
    public dropDownFilter: DropDownList;
    ngOnInit(): void {
        this.data = sampleData;
        this.dateformat = { type: 'dateTime', format: 'dd/MM/yyyy' };
        this.contextMenuItems= [
            {text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
            {text: 'Expand the Row', target: '.e-content', id: 'expandrow'},
            { text: 'Style', target: '.e-headercontent', id: 'collapseall' },
            
            { text: 'New', target: '.e-headercontent', id: 'collapseall' },
            
            { text: 'Delete', target: '.e-headercontent', id: 'collapseall' },
            
            { text: 'Edit', target: '.e-headercontent', id: 'collapseall' },
            
            { text: 'Show', target: '.e-headercontent', id: 'collapseall' },
            { text: 'Freeze', target: '.e-headercontent', id: 'collapseall' },
            
            { text: 'Filter', target: '.e-headercontent', id: 'collapseall' },
            { text: 'Multi-Sort', target: '.e-headercontent', id: 'collapseall' },

            { text: 'Expand All', target: '.e-headercontent', id: 'expandall' }
         ];
         this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
         this.templateOptions = {
          create: (args: { element: Element }) => {
              let dd: HTMLInputElement = document.createElement('input');
              dd.id = 'duration';
              return dd;
          },
          write: (args: { element: Element }) => {
              let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
              this.dropDownFilter = new DropDownList({
                  dataSource: dataSource,
                  value: 'All',
                  change: (e: ChangeEventArgs) => {
                      let valuenum: any = +e.value;
                      let id: any = <string>this.dropDownFilter.element.id;
                      let value: any = <string>e.value;
                      if ( value !== 'All') {
                          this.treegrid.filterByColumn( id, 'equal', valuenum );
                      } else {
                          this.treegrid.removeFilteredColsByField(id);
                      }
                  }
              });
              this.dropDownFilter.appendTo('#duration');
       }
      };
    }
    
    contextMenuOpen (arg?: BeforeOpenCloseEventArgs): void {
        let elem: Element = arg.event.target as Element;
        let row: Element = elem.closest('.e-row');
        let uid: string = row && row.getAttribute('data-uid');
        let items: Array<HTMLElement> = [].slice.call(document.querySelectorAll('.e-menu-item'));
        for (let i: number = 0; i < items.length; i++) {
          items[i].setAttribute('style','display: none;');
        }
        if (elem.closest('.e-row')) {
          if ( isNullOrUndefined(uid) || 
            isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
            arg.cancel = true;
          } else {
            let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
            let val: string = flag ? 'none' : 'block';
            document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
            val = !flag ? 'none' : 'block';
            document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
          }
        } else {
          let len = this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
          if (len !== 0) {
             document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
          } else {
            document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
          }
        }
    }
    contextMenuClick (args?: MenuEventArgs): void {
        if (args.item.id === 'collapserow') {
          this.treegrid.collapseRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
        } else if (args.item.id === 'expandrow') {
          this.treegrid.expandRow(this.treegrid.getSelectedRows()[0] as HTMLTableRowElement, this.treegrid.getSelectedRecords()[0]);
        } else if (args.item.id === 'collapseall') {
          this.treegrid.collapseAll();
        } else if (args.item.id === 'expandall') {
          this.treegrid.expandAll();
        }
    }
}
