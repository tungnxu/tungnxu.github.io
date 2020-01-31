import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Constants, Font } from '../../constants/constants';
import { LayoutService } from 'src/app/core/services/layout-service.service';


@Component({
  selector: 'app-stype-panel',
  templateUrl: './stype-panel.component.html',
  styleUrls: ['./stype-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StypePanelComponent implements OnInit {

  public fontList: Font[] = Constants.FONT_LIBRARY;
  constructor(private _layoutService: LayoutService) { }

  ngOnInit() {
  }

  public changeFont(font: Font){
    this._layoutService.changeFont(font);
    this._layoutService.currentFont = font;
  }

}
