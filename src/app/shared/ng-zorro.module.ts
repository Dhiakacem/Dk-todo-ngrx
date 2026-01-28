import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const NZ_ZORRO_MODULES = [
  NzLayoutModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzIconModule,
  NzGridModule,
  NzDatePickerModule,
  NzSelectModule,
  NzTableModule,
  NzTagModule,
  NzDividerModule,
  NzTypographyModule
];

@NgModule({
  imports: NZ_ZORRO_MODULES,
  exports: NZ_ZORRO_MODULES
})
export class NgZorroSharedModule {}

