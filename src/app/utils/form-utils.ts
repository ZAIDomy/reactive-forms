import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {

  return new Promise( resolve => {
    setTimeout(()=>{
      resolve(true)
    },2500);
  });
}

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

static getTextError(errors: ValidationErrors){
    for(const key of Object.keys(errors)){
        switch(key){
        case 'required':
            return 'Este campo es requerido';
        case 'minlength':
            return `Minimo de ${errors['minlength'].requiredLength } caracteres`;
        case 'min':
            return `Valor minimo de ${errors['min'].min }`;
        case 'email':
            return `Email no valido ${errors['email'].email }`;
        case 'emailTaken':
            return `Email proporcionado ya esta ocupado`;
        case 'userTaken':
            return `Usuario proporcionado ya esta tomado`;
        case 'pattern':
            if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
                return 'El valor agregado no es un mail valido';
            }
            return 'Error de patron contra expresion regular';
        default:
            return `Error no controlado ${key}`;
        }
    }
    return null;
}


static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (form.controls[fieldName].errors && form.controls[fieldName].touched);
}

static getFieldError(form: FormGroup, fieldName: string): string | null {

    if(!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
}

static isValidFieldInArray(formArray: FormArray, index: number){
    return (
        formArray.controls[index].errors && formArray.controls[index].touched
    );
}

static getFieldErrorInArray(formArray: FormArray, index: number): string | null {

    if(formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
}

static isFieldOneEqualFieldTwo(field1: string, field2: string){
    return(formGroup: AbstractControl)=>{
        const field1Value = formGroup.get(field1)?.value;
        const field2Value = formGroup.get(field2)?.value;

        return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
}

static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>  {

  await sleep(); // 2 seg y medio

  const formValue = control.value;

  if( formValue === 'hola@mundo.com'){
    return {
      emailTaken: true,
    }
  }

  return null;
}

static notUser(control: AbstractControl):ValidationErrors | null{

  const formValue = control.value;

  if( formValue === 'zaidomy'){
    return {
      userTaken: true,
    }
  }

  return null;

}

}
