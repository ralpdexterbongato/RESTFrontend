import { Injectable } from '@angular/core';
declare var toastr:any
@Injectable()
export class ToasterService {

  constructor() {
    this.setting();
    }
  Success(title :string, message?:string){
    toastr.success(title,message);
  }
  Info(title :string, message?:string){
    toastr.info(title,message);
  }
  Warning(title :string, message?:string){
    toastr.warning(title,message);
  }
  Error(title :string, message?:string){
    toastr.error(title,message);
  }
  setting()
  {
    toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "5000",
    "hideDuration": "5000",
    "timeOut": "5000",
    "extendedTimeOut": "7000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    }
  }
}
