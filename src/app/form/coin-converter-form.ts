import { FormControl, FormGroup } from '@angular/forms';

export const createCoinConverterFrom = () => {
  return new FormGroup({
    firstInitial: new FormControl(''),
    firstInitialValue: new FormControl(0),
    secondInitial: new FormControl(''),
    secondInitialValue: new FormControl(0),
  });
};
