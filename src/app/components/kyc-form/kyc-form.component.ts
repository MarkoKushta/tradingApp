import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-kyc-form',
  templateUrl: './kyc-form.component.html',
  styleUrls: ['./kyc-form.component.scss']
})
export class KycFormComponent implements OnInit {

  kycForm!: FormGroup;
  userId: any;
  constructor(private fb : FormBuilder, private userServices : UserServicesService, private router: Router) { }

  ngOnInit(): void {
    this.kycForm = this.fb.group({
      PhoneNumber:['', Validators.required],
      Address:['', Validators.required],
      CardNumber:['', Validators.required],
      CardHolderName:['', Validators.required],
      ExpirationDate:['', Validators.required],
      CVV:['', Validators.required]
    })
    this.userId = localStorage.getItem('userId');
  }

  onKyc(){
    if(this.kycForm.valid){
      // sign up logic
      this.userServices.postKYC(this.userId, this.kycForm.value)
      .subscribe({
        next:(res=>{

          this.kycForm.reset();
          this.router.navigate(['/options']);

        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
      console.log(this.kycForm.value)
      const isKycCompleted = "True";
      localStorage.setItem('isKycCompleted', isKycCompleted);

    }
    else{
      ValidateForm.validateAllFormFields(this.kycForm);
      // error logic
    }
  }

  navigateToSettings() {
    this.router.navigate(['/options']);
  }
}


