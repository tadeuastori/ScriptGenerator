import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ScriptService } from '../script.service';
import { ScriptInterface } from '../ScriptInterface';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService implements ScriptInterface {

  constructor(
    private scriptservice: ScriptService
  ) { }

  generateScript(form: FormGroup, translateList: FormArray) {

    var query = "";
    var isForce = "S";
    var isCreated = "N";

    if (form.value["getbeginend"]) { query += "Begin\n\n"; }

    for (let item of translateList.controls) {

      if (item.value["key"] != null &&
        item.value["portuguese"] != null &&
        item.value["english"] != null &&
        item.value["spanish"] != null) {
          
        if (item.value["force"]) { isForce = "S"; }
        else { isForce = "N"; }

        query += "\tPR_ATUALIZA_INT_MESSAGE('pt-BR', '" + item.value["key"] + "', '" + item.value["portuguese"] + "', '" + isForce + "'); \n";
        query += "\tPR_ATUALIZA_INT_MESSAGE('pt-PT', '" + item.value["key"] + "', '" + item.value["portuguese"] + "', '" + isForce + "'); \n";
        query += "\tPR_ATUALIZA_INT_MESSAGE('en-GB', '" + item.value["key"] + "', '" + item.value["english"] + "', '" + isForce + "'); \n";
        query += "\tPR_ATUALIZA_INT_MESSAGE('en-US', '" + item.value["key"] + "', '" + item.value["english"] + "', '" + isForce + "'); \n";
        query += "\tPR_ATUALIZA_INT_MESSAGE('zh-CN', '" + item.value["key"] + "', '" + item.value["english"] + "', '" + isForce + "'); \n";
        query += "\tPR_ATUALIZA_INT_MESSAGE('es-UY', '" + item.value["key"] + "', '" + item.value["spanish"] + "', '" + isForce + "'); \n";
        query += "\n";


        isCreated = "S";
      }

    }

    if (form.value["getcommit"]) { query += "\tCommit;\n\n"; }

    if (form.value["getbeginend"]) { query += "End;"; }

    if (isCreated == "S") { this.scriptservice.setScript(query); }
  }

  cleanScript() {
    this.scriptservice.setScript("");
  }
}
