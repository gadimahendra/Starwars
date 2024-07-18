import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MovieService } from '../movie.service';
import { round } from 'lodash';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class FiltersComponent implements OnInit {
  @Input() uniqId = '';
  @Output() appendSelected = new EventEmitter();
  @Input() clearStatus: boolean = false;
  selectedOption: any = [];
  selectedOptionsArr: string = '';
  @ViewChild('ullist') ullist!: ElementRef;
  options: any[] = [];
  constructor(private _service: MovieService, private _eref: ElementRef) {}

  ngOnInit(): void {
    if (this.uniqId != 'birthYear') {
      this.getTypeOfFilter();
    } else {
      this.options = [
        { id: 'ALL', name: 'ALL' },
        { id: 'range', name: '30BBY ' },
      ];
    }
  }

  ngOnChanges(SimpleChange: SimpleChanges) {
    if (!SimpleChange['clearStatus']?.currentValue) {
      this.selectedOptionsArr = '';
      this.selectedOption = [];
      this.multipleOptions = [];
      this.options = [];
      this.getTypeOfFilter();
    }
  }

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      const selectBox: any = document.getElementById(this.uniqId);
      if (selectBox.classList.contains('active')) {
        selectBox?.classList.toggle('active');
      }
    }
  }

  multipleOptions: any = [];
  onSelectOption(option: any) {
    option.checked = !option.checked;
    if (option.checked) {
      this.selectedOption.push(option);
      this.selectedOption.length > 1 ? (this.selectedOptionsArr += ',') : '';
      this.selectedOptionsArr +=
        this.uniqId == 'films' ? option.title : option.name;
      this.multipleOptions.push(
        this.uniqId == 'films' ? option.title : option.name
      );
    } else {
      const index = this.multipleOptions.indexOf(
        this.uniqId == 'films' ? option.title : option.name
      );
      if (index !== -1) {
        this.multipleOptions.splice(index, 1);
        let splitString: any = this.selectedOptionsArr.split(',');
        splitString.splice(index, 1);
        this.selectedOptionsArr = '';
        this.selectedOption.splice(index, 1);
        splitString.forEach((name: any, i: any) => {
          this.selectedOptionsArr += name;
          this.selectedOptionsArr += i == splitString.length - 1 ? '' : ',';
        });
      }
    }
    this.appendSelected.emit(this.selectedOption);
  }

  onClickSelectBox() {
    // const selectBox: any = document.querySelector(".select-box");
    const selectBoxes = document.querySelectorAll('.select-box');
    selectBoxes.forEach((box) => {
      if (box.id !== this.uniqId) {
        box.classList.remove('active');
      }
    });
    const selectBox: any = document.getElementById(this.uniqId);
    selectBox?.classList.toggle('active');
    if (selectBox.classList.contains('active')) {
      this.ullist.nativeElement.addEventListener(
        'scroll',
        this.onScroll.bind(this)
      );
    }
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (
      round(element.scrollHeight - element.scrollTop) == element.clientHeight
    ) {
      this.triggerEvent();
    }
  }

  triggerEvent() {
    if (this.isNextApi) {
      let page: any = this.isNextApi.split('/');
      page = page[page.length - 1];
      this.getTypeOfFilter(page);
    }
  }

  toggleDropdown() {
    const selectBox: any = document.getElementById(this.uniqId);
    selectBox?.classList.toggle('active');
  }

  isNextApi: string = '';
  getTypeOfFilter(page: any = '') {
    this._service.getFiltersType(this.uniqId, page).subscribe(
      (res: any) => {
        this.options = this.options.concat(res.results);
        if (res.next) {
          this.isNextApi = res.next;
        } else {
          this.isNextApi = '';
        }
      },
      (err: any) => {
        console.log('err', err);
      }
    );
  }

  getOptionId(opt: any) {
    let splitOpt = opt.url.split('/');
    return splitOpt[splitOpt.length - 2];
  }
}
