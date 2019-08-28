import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GeneratorService } from '../generator.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from './parameter.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  public form: FormGroup;
  public parameterList: FormArray;

  constructor(
    private appcomponent: AppComponent,
    private generatorservice: GeneratorService,
    private parameterservice: ParameterService,
    private fb: FormBuilder
  ) { }

  generatorList = this.generatorservice.getGenerator("/parameter");

  ngOnInit() {
    this.appcomponent.pageTitle = this.generatorList.name;
    this.appcomponent.appVersion = this.generatorList.version;
    this.appcomponent.showCard = true;
    this.parameterservice.cleanScript();

    this.form = this.fb.group({
      getcommit: [true],
      getbeginend: [true],
      parameter: this.fb.array([this.createParameter()])
    });

    this.parameterList = this.form.get('parameter') as FormArray;

    this.appcomponent.cdrMethod();
  }

  //#########################################################################################

  createParameter(): FormGroup {
    return this.fb.group({
      parameter: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required])],      
      observation: [null, Validators.compose([Validators.required])],
      isreviewed: [true],
      globalparameter: [false]
    });
  }

  addParameter() {
    this.parameterList.push(this.createParameter());
    this.generateScript();
  }

  removeParameter(index) {
    if (confirm("Are you sure to delete this " + this.generatorList.name + "?")) {
      this.parameterList.removeAt(index);
      this.generateScript();
    }
  }

  getParameterFormGroup(index): FormGroup {
    const formGroup = this.parameterList.controls[index] as FormGroup;
    return formGroup;
  }

  get parameterFormGroup() {
    return this.form.get('parameter') as FormArray;
  }

  //#########################################################################################

  generateScript() {
    this.parameterservice.generateScript(this.form, this.parameterList);
  }

}
