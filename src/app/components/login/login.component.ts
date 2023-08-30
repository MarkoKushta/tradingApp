import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          // Extract userId from response
          const userId = res.userId;
          const userName = res.userName;
          const email = res.email;
          const isKycCompleted = "False";

          // Store userId in local storage
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          localStorage.setItem('email', email);
          localStorage.setItem('isKycCompleted', isKycCompleted);
          console.log(userId);
          console.log(userName);
          console.log(email);


          this.loginForm.reset();
          this.router.navigate(['stocks-dashboard']);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your form is invalid');
    }
  }

}
