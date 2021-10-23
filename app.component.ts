import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
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
    this.contextMenuItems = [
      { text: 'Edit', target: '.e-content', id: 'redit' },
      { text: 'New', target: '.e-content', id: 'rnew' },
      { text: 'Delete', target: '.e-content', id: 'rdelete' },
      { text: 'Multi-Select', target: '.e-content', id: 'rmultiSelect' },
      { text: 'Copy', target: '.e-content', id: 'rcopy' },
      { text: 'Cut', target: '.e-content', id: 'rcut' },
      { text: 'Paste Sibling', target: '.e-content', id: 'rsibling' },
      { text: 'Paste Child', target: '.e-content', id: 'rchild' },

      { text: 'Style', target: '.e-headercontent', id: 'style' },

      { text: 'New', target: '.e-headercontent', id: 'new' },

      { text: 'Delete', target: '.e-headercontent', id: 'delete' },

      { text: 'Edit', target: '.e-headercontent', id: 'edit' },

      { text: 'Show', target: '.e-headercontent', id: 'show' },
      { text: 'Freeze', target: '.e-headercontent', id: 'freeze' },

      { text: 'Filter', target: '.e-headercontent', id: 'filter' },
      { text: 'Multi-Sort', target: '.e-headercontent', id: 'multiSort' },
    ];
    this.filterSettings = {
      type: 'FilterBar',
      hierarchyMode: 'Parent',
      mode: 'Immediate',
    };
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
            if (value !== 'All') {
              this.treegrid.filterByColumn(id, 'equal', valuenum);
            } else {
              this.treegrid.removeFilteredColsByField(id);
            }
          },
        });
        this.dropDownFilter.appendTo('#duration');
      },
    };
  }

  contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    let elem: Element = arg.event.target as Element;
    let row: Element = elem.closest('.e-row');
    let uid: string = row && row.getAttribute('data-uid');
    let items: Array<HTMLElement> = [].slice.call(
      document.querySelectorAll('.e-menu-item')
    );
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute('style', 'display: none;');
    }
    if (elem.closest('.e-row')) {
      if (
        isNullOrUndefined(uid) ||
        isNullOrUndefined(
          getValue(
            'hasChildRecords',
            this.treegrid.grid.getRowObjectFromUID(uid).data
          )
        )
      ) {
        arg.cancel = true;
      } else {
        let flag: boolean = getValue(
          'expanded',
          this.treegrid.grid.getRowObjectFromUID(uid).data
        );
        document
          .querySelectorAll('li#rnew')[0]
          .setAttribute('style', 'display: block;');

        document
          .querySelectorAll('li#rdelete')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#redit')[0]
          .setAttribute('style', 'display: block;');

        document
          .querySelectorAll('li#rmultiSelect')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#rcopy')[0]
          .setAttribute('style', 'display: block;');

        document
          .querySelectorAll('li#rcut')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#rsibling')[0]
          .setAttribute('style', 'display: block;');

        document
          .querySelectorAll('li#rchild')[0]
          .setAttribute('style', 'display: block;');
      }
    } else {
      let len =
        this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
      if (len !== 0) {
        document
          .querySelectorAll('li#style')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#new')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#delete')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#edit')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#freeze')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#filter')[0]
          .setAttribute('style', 'display: block;');
        document
          .querySelectorAll('li#multiSort')[0]
          .setAttribute('style', 'display: block;');
      } else {
        document
          .querySelectorAll('li#expandall')[0]
          .setAttribute('style', 'display: block;');
      }
    }
  }
  contextMenuClick(args?: MenuEventArgs): void {
    if (args.item.id === 'collapserow') {
      this.treegrid.collapseRow(
        this.treegrid.getSelectedRows()[0] as HTMLTableRowElement,
        this.treegrid.getSelectedRecords()[0]
      );
    } else if (args.item.id === 'expandrow') {
      this.treegrid.expandRow(
        this.treegrid.getSelectedRows()[0] as HTMLTableRowElement,
        this.treegrid.getSelectedRecords()[0]
      );
    } else if (args.item.id === 'collapseall') {
      this.treegrid.collapseAll();
    } else if (args.item.id === 'expandall') {
      this.treegrid.expandAll();
    } else if (args.item.id === 'rcopy') {
      this.treegrid.copy(false);
    }
  }
}
